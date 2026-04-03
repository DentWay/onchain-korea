-- ============================================
-- Onchain Korea — Admin Access Migration
-- Apply this to an existing Supabase project
-- ============================================

alter table public.profiles
  add column if not exists email text,
  add column if not exists is_admin boolean not null default false;

create index if not exists idx_profiles_email_lower on public.profiles (lower(email));
create index if not exists idx_profiles_is_admin on public.profiles (is_admin);

update public.profiles p
set email = u.email
from auth.users u
where p.id = u.id
  and (p.email is null or p.email = '');

drop policy if exists "Admins read all profiles" on public.profiles;
create policy "Admins read all profiles"
  on public.profiles
  for select
  using (
    exists (
      select 1
      from public.profiles me
      where me.id = auth.uid()
        and me.is_admin = true
    )
  );

drop policy if exists "Admins read all progress" on public.user_progress;
create policy "Admins read all progress"
  on public.user_progress
  for select
  using (
    exists (
      select 1
      from public.profiles me
      where me.id = auth.uid()
        and me.is_admin = true
    )
  );

drop policy if exists "Admins read all quiz results" on public.quiz_results;
create policy "Admins read all quiz results"
  on public.quiz_results
  for select
  using (
    exists (
      select 1
      from public.profiles me
      where me.id = auth.uid()
        and me.is_admin = true
    )
  );

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

-- Mark an admin by email after applying the migration.
-- Example:
-- update public.profiles set is_admin = true where lower(email) = 'you@example.com';
