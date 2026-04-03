-- ============================================
-- Onchain Korea — Auth / Admin Hardening
-- Apply this in Supabase SQL Editor
-- ============================================

create extension if not exists pgcrypto;

-- Keep user self-profile updates, but do not let users change is_admin directly.
drop policy if exists "Users update own profile" on public.profiles;
create policy "Users update own profile"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    and is_admin = (
      select p.is_admin
      from public.profiles p
      where p.id = auth.uid()
    )
  );

-- Allow real admins to update profiles when needed.
drop policy if exists "Admins update all profiles" on public.profiles;
create policy "Admins update all profiles"
  on public.profiles
  for update
  using (
    exists (
      select 1
      from public.profiles me
      where me.id = auth.uid()
        and me.is_admin = true
    )
  )
  with check (true);

-- Server-verified self-promotion path.
-- Password: onchainkorea@@
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
