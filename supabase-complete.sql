-- ============================================
-- OnChain Korea — Complete Database Setup
-- Safe to run on fresh DB or existing DB
-- All statements are idempotent
-- ============================================

-- 0. Extensions
create extension if not exists pgcrypto;

-- ============================================
-- 1. TABLES
-- ============================================

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  email text,
  is_admin boolean not null default false,
  lang text default 'ko' check (lang in ('ko', 'en')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Add columns if table already existed without them
alter table public.profiles add column if not exists email text;
alter table public.profiles add column if not exists is_admin boolean not null default false;

create table if not exists public.user_progress (
  id uuid primary key references auth.users(id) on delete cascade,
  completed_lessons text[] default '{}',
  completed_actions text[] default '{}',
  read_hidden_topics int[] default '{}',
  current_week int default 1,
  updated_at timestamptz default now()
);

create table if not exists public.quiz_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  quiz_type text not null,
  quiz_id text not null,
  score int not null default 0,
  total int not null default 0,
  passed boolean not null default false,
  attempted_at timestamptz default now()
);

create table if not exists public.enrollment_stats (
  id int primary key default 1 check (id = 1),
  total_users int default 0,
  week1_completions int default 0,
  week2_completions int default 0,
  week3_completions int default 0,
  week4_completions int default 0,
  certificate_count int default 0,
  updated_at timestamptz default now()
);

-- Seed enrollment_stats singleton
insert into public.enrollment_stats (id) values (1) on conflict (id) do nothing;

-- ============================================
-- 2. INDEXES
-- ============================================

create index if not exists idx_profiles_email_lower on public.profiles (lower(email));
create index if not exists idx_profiles_is_admin on public.profiles (is_admin);
create index if not exists idx_quiz_results_user on public.quiz_results (user_id);

-- ============================================
-- 3. ENABLE RLS
-- ============================================

alter table public.profiles enable row level security;
alter table public.user_progress enable row level security;
alter table public.quiz_results enable row level security;
alter table public.enrollment_stats enable row level security;

-- ============================================
-- 4. ADMIN HELPER (avoids RLS recursion on profiles)
-- ============================================

create or replace function public.is_admin_user(user_id uuid)
returns boolean
language sql
security definer
stable
as $$
  select coalesce(
    (select is_admin from public.profiles where id = user_id),
    false
  );
$$;

-- ============================================
-- 5. RLS POLICIES — profiles
-- ============================================

drop policy if exists "Users read own profile" on public.profiles;
create policy "Users read own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Admins read all profiles" on public.profiles;
create policy "Admins read all profiles"
  on public.profiles for select
  using (public.is_admin_user(auth.uid()));

drop policy if exists "Users insert own profile" on public.profiles;
create policy "Users insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "Users update own profile" on public.profiles;
create policy "Users update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id and is_admin = (select p.is_admin from public.profiles p where p.id = auth.uid()));

drop policy if exists "Admins update all profiles" on public.profiles;
create policy "Admins update all profiles"
  on public.profiles for update
  using (public.is_admin_user(auth.uid()))
  with check (true);

-- ============================================
-- 6. RLS POLICIES — user_progress
-- ============================================

drop policy if exists "Users read own progress" on public.user_progress;
create policy "Users read own progress"
  on public.user_progress for select
  using (auth.uid() = id);

drop policy if exists "Admins read all progress" on public.user_progress;
create policy "Admins read all progress"
  on public.user_progress for select
  using (public.is_admin_user(auth.uid()));

drop policy if exists "Users update own progress" on public.user_progress;
create policy "Users update own progress"
  on public.user_progress for update
  using (auth.uid() = id);

drop policy if exists "Users insert own progress" on public.user_progress;
create policy "Users insert own progress"
  on public.user_progress for insert
  with check (auth.uid() = id);

-- ============================================
-- 7. RLS POLICIES — quiz_results
-- ============================================

drop policy if exists "Users read own results" on public.quiz_results;
create policy "Users read own results"
  on public.quiz_results for select
  using (auth.uid() = user_id);

drop policy if exists "Admins read all quiz results" on public.quiz_results;
create policy "Admins read all quiz results"
  on public.quiz_results for select
  using (public.is_admin_user(auth.uid()));

drop policy if exists "Users insert own results" on public.quiz_results;
create policy "Users insert own results"
  on public.quiz_results for insert
  with check (auth.uid() = user_id);

-- ============================================
-- 7. RLS POLICIES — enrollment_stats
-- ============================================

drop policy if exists "Anyone can read stats" on public.enrollment_stats;
create policy "Anyone can read stats"
  on public.enrollment_stats for select
  using (true);

-- ============================================
-- 8. FUNCTIONS
-- ============================================

-- Backfill emails from auth.users
update public.profiles p
set email = u.email
from auth.users u
where p.id = u.id
  and (p.email is null or p.email = '');

-- Trigger: auto-create profile + progress on signup
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

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Refresh enrollment stats
create or replace function public.refresh_enrollment_stats()
returns void as $$
begin
  update public.enrollment_stats set
    total_users = (select count(*) from auth.users),
    week1_completions = (select count(*) from public.user_progress where array_length(completed_lessons, 1) >= 3),
    week2_completions = (select count(*) from public.user_progress where array_length(completed_lessons, 1) >= 8),
    week3_completions = (select count(*) from public.user_progress where array_length(completed_lessons, 1) >= 13),
    week4_completions = (select count(*) from public.user_progress where array_length(completed_lessons, 1) >= 17),
    certificate_count = (
      select count(*) from public.user_progress
      where array_length(completed_lessons, 1) >= 16
        and array_length(completed_actions, 1) >= 3
        and array_length(read_hidden_topics, 1) >= 2
    ),
    updated_at = now()
  where id = 1;
end;
$$ language plpgsql security definer;

-- Delete own account
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

-- Admin self-promotion with password
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
    email = coalesce(email, (select au.email from auth.users au where au.id = target_user_id)),
    updated_at = now()
  where id = target_user_id;

  return true;
end;
$$;

revoke all on function public.claim_admin_role(text) from public;
grant execute on function public.claim_admin_role(text) to authenticated;

-- ============================================
-- 9. MARK ADMIN ACCOUNTS
-- ============================================

update public.profiles set is_admin = true where lower(email) = 'dentway.official@gmail.com';
update public.profiles set is_admin = true where lower(email) = 'min9.mark@gmail.com';
