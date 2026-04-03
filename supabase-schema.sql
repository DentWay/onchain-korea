-- ============================================
-- Onchain Korea — Supabase Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Profiles table
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  email text,
  is_admin boolean not null default false,
  lang text default 'ko' check (lang in ('ko', 'en')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;
create policy "Users read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Admins read all profiles" on public.profiles for select using (
  exists (
    select 1
    from public.profiles me
    where me.id = auth.uid()
      and me.is_admin = true
  )
);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users insert own profile" on public.profiles for insert with check (auth.uid() = id);

-- 2. User progress table
create table public.user_progress (
  id uuid primary key references auth.users(id) on delete cascade,
  completed_lessons text[] default '{}',
  completed_actions text[] default '{}',
  read_hidden_topics int[] default '{}',
  current_week int default 1,
  updated_at timestamptz default now()
);

alter table public.user_progress enable row level security;
create policy "Users read own progress" on public.user_progress for select using (auth.uid() = id);
create policy "Admins read all progress" on public.user_progress for select using (
  exists (
    select 1
    from public.profiles me
    where me.id = auth.uid()
      and me.is_admin = true
  )
);
create policy "Users update own progress" on public.user_progress for update using (auth.uid() = id);
create policy "Users insert own progress" on public.user_progress for insert with check (auth.uid() = id);

-- 3. Enrollment stats (singleton)
create table public.enrollment_stats (
  id int primary key default 1 check (id = 1),
  total_users int default 0,
  week1_completions int default 0,
  week2_completions int default 0,
  week3_completions int default 0,
  week4_completions int default 0,
  certificate_count int default 0,
  updated_at timestamptz default now()
);

alter table public.enrollment_stats enable row level security;
create policy "Anyone can read stats" on public.enrollment_stats for select using (true);

-- Seed the singleton row
insert into public.enrollment_stats (id) values (1);

-- 4. Auto-create profile + progress on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, avatar_url, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'avatar_url', null),
    new.email
  );
  insert into public.user_progress (id) values (new.id);
  update public.enrollment_stats set total_users = total_users + 1, updated_at = now() where id = 1;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 5. Refresh stats function (call periodically)
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

-- 6. Self-service account deletion
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

  delete from auth.users
  where id = target_user_id;

  perform public.refresh_enrollment_stats();
end;
$$;

revoke all on function public.delete_my_account() from public;
grant execute on function public.delete_my_account() to authenticated;
