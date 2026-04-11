-- ============================================
-- OnChain Korea — Migration for existing DB
-- Run in Supabase SQL Editor (2026-04-04)
-- Merges: admin-schema + auth-hardening + account-schema
-- ============================================

-- 0. Extension
create extension if not exists pgcrypto;

-- 1. Add missing columns to profiles
alter table public.profiles
  add column if not exists email text,
  add column if not exists is_admin boolean not null default false;

create index if not exists idx_profiles_email_lower on public.profiles (lower(email));
create index if not exists idx_profiles_is_admin on public.profiles (is_admin);

-- 2. Backfill email from auth.users
update public.profiles p
set email = u.email
from auth.users u
where p.id = u.id
  and (p.email is null or p.email = '');

-- 3. RLS policies — profiles
drop policy if exists "Users update own profile" on public.profiles;
create policy "Users update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    and is_admin = (select p.is_admin from public.profiles p where p.id = auth.uid())
  );

drop policy if exists "Admins read all profiles" on public.profiles;
create policy "Admins read all profiles"
  on public.profiles for select
  using (exists (select 1 from public.profiles me where me.id = auth.uid() and me.is_admin = true));

drop policy if exists "Admins update all profiles" on public.profiles;
create policy "Admins update all profiles"
  on public.profiles for update
  using (exists (select 1 from public.profiles me where me.id = auth.uid() and me.is_admin = true))
  with check (true);

-- 4. RLS policies — user_progress
drop policy if exists "Admins read all progress" on public.user_progress;
create policy "Admins read all progress"
  on public.user_progress for select
  using (exists (select 1 from public.profiles me where me.id = auth.uid() and me.is_admin = true));

-- 5. RLS policies — quiz_results
drop policy if exists "Admins read all quiz results" on public.quiz_results;
create policy "Admins read all quiz results"
  on public.quiz_results for select
  using (exists (select 1 from public.profiles me where me.id = auth.uid() and me.is_admin = true));

-- 6. Idempotent handle_new_user (replaces old version)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, avatar_url, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'avatar_url', null),
    new.email
  )
  on conflict (id) do update
  set
    display_name = coalesce(public.profiles.display_name, excluded.display_name),
    avatar_url = coalesce(public.profiles.avatar_url, excluded.avatar_url),
    email = coalesce(public.profiles.email, excluded.email);

  insert into public.user_progress (id)
  values (new.id)
  on conflict (id) do nothing;

  insert into public.enrollment_stats (id)
  values (1)
  on conflict (id) do nothing;

  update public.enrollment_stats
  set total_users = total_users + 1, updated_at = now()
  where id = 1;

  return new;
end;
$$ language plpgsql security definer;

-- 7. claim_admin_role
create or replace function public.claim_admin_role(admin_password text)
returns boolean
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  target_user_id uuid := auth.uid();
  provided_hash text;
  expected_hash constant text := encode(digest('onchainkorea@@:onchain-korea-admin-v1', 'sha256'), 'hex');
  target_email text;
begin
  if target_user_id is null then
    raise exception 'not_authenticated';
  end if;

  select lower(email) into target_email
  from auth.users
  where id = target_user_id;

  if target_email not in ('dentway.official@gmail.com', 'min9.mark@gmail.com') then
    raise exception 'admin_email_not_allowed';
  end if;

  provided_hash := encode(digest(coalesce(admin_password, '') || ':onchain-korea-admin-v1', 'sha256'), 'hex');

  if provided_hash <> expected_hash then
    raise exception 'admin_password_invalid';
  end if;

  update public.profiles
  set
    is_admin = true,
    email = coalesce(email, (select email from auth.users where id = target_user_id)),
    updated_at = now()
  where id = target_user_id;

  return true;
end;
$$;

revoke all on function public.claim_admin_role(text) from public;
grant execute on function public.claim_admin_role(text) to authenticated;

-- 8. delete_my_account
create or replace function public.delete_my_account()
returns void
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  target_user_id uuid := auth.uid();
begin
  if target_user_id is null then
    raise exception 'not_authenticated';
  end if;

  delete from auth.users where id = target_user_id;
  perform public.refresh_enrollment_stats();
end;
$$;

revoke all on function public.delete_my_account() from public;
grant execute on function public.delete_my_account() to authenticated;

-- 9. Mark admin accounts
update public.profiles set is_admin = true where lower(email) = 'dentway.official@gmail.com';
update public.profiles set is_admin = true where lower(email) = 'min9.mark@gmail.com';
