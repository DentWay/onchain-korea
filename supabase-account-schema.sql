-- ============================================
-- Onchain Korea — Account Settings Migration
-- Apply this to an existing Supabase project
-- ============================================

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
