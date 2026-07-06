-- =========================================================
-- User Information Management System — Supabase Schema
-- Run this in the Supabase SQL editor (Project → SQL Editor)
-- =========================================================

-- 1. Extensions -------------------------------------------------
create extension if not exists "uuid-ossp";

-- 2. Table: submissions ------------------------------------------
create table if not exists public.submissions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  mobile_number text not null,
  department text not null,
  address text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.submissions is 'Personal records entered by each authenticated user.';

-- 3. Indexes -------------------------------------------------------
create index if not exists submissions_user_id_idx on public.submissions (user_id);
create index if not exists submissions_created_at_idx on public.submissions (created_at desc);

-- 4. updated_at trigger --------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_submissions_updated_at on public.submissions;
create trigger trg_submissions_updated_at
  before update on public.submissions
  for each row
  execute function public.set_updated_at();

-- 5. Row Level Security ---------------------------------------------
alter table public.submissions enable row level security;

drop policy if exists "Select own records" on public.submissions;
create policy "Select own records"
  on public.submissions for select
  using (auth.uid() = user_id);

drop policy if exists "Insert own records" on public.submissions;
create policy "Insert own records"
  on public.submissions for insert
  with check (auth.uid() = user_id);

drop policy if exists "Update own records" on public.submissions;
create policy "Update own records"
  on public.submissions for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Delete own records" on public.submissions;
create policy "Delete own records"
  on public.submissions for delete
  using (auth.uid() = user_id);

-- =========================================================
-- Notes:
-- * Email verification, password reset, and email templates are
--   configured in the Supabase Dashboard under Authentication → Settings
--   and Authentication → Email Templates — no SQL required.
-- * Set "Site URL" and "Redirect URLs" in Authentication → URL Configuration
--   to your Render frontend URL (and http://localhost:5173 for local dev)
--   so email confirmation / password reset links redirect correctly.
-- =========================================================
