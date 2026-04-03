-- Quiz results table
create table public.quiz_results (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  quiz_type text not null check (quiz_type in ('article', 'weekly')),
  quiz_id text not null, -- lessonId for article, weekId for weekly
  score int not null,
  total int not null,
  passed boolean not null,
  attempted_at timestamptz default now()
);

alter table public.quiz_results enable row level security;

create policy "Users read own results"
  on public.quiz_results
  for select
  using (auth.uid() = user_id);

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

create policy "Users insert own results"
  on public.quiz_results
  for insert
  with check (auth.uid() = user_id);

-- Index for fast lookup
create index idx_quiz_results_user on public.quiz_results(user_id, quiz_type, quiz_id);
