create extension if not exists pgcrypto;

create table if not exists public.event_locks (
  id uuid primary key default gen_random_uuid(),
  lock_code text unique,
  prompt text,
  event_type text,
  location text,
  guests integer default 0,
  budget numeric default 0,
  total numeric default 0,
  deposit numeric default 0,
  confidence_score numeric default 0,
  guarantee_status text default 'draft',
  status text default 'ready_to_lock',
  event_lock_data jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists public.event_executions (
  id uuid primary key default gen_random_uuid(),
  lock_code text,
  status text default 'deposit_pending',
  event_type text,
  total numeric default 0,
  deposit numeric default 0,
  confidence_score numeric default 0,
  execution_data jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);
