create extension if not exists pgcrypto;

create table if not exists event_locks (
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

create table if not exists event_executions (
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

create table if not exists vendor_execution_responses (
  id uuid primary key default gen_random_uuid(),
  request_code text,
  lock_code text,
  vendor_name text,
  role text,
  decision text check (decision in ('accepted','declined')) default 'accepted',
  reason text,
  sla_status text default 'within_sla',
  response_data jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists vendor_replacements (
  id uuid primary key default gen_random_uuid(),
  replacement_code text unique,
  lock_code text,
  role text,
  declined_vendor text,
  replacement_vendor text,
  status text default 'replacement_started',
  replacement_data jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists vendor_performance (
  id uuid primary key default gen_random_uuid(),
  vendor_name text,
  role text,
  total_requests integer default 0,
  accepted_requests integer default 0,
  declined_requests integer default 0,
  conversion_rate numeric default 0,
  cancellation_rate numeric default 0,
  avg_response_hours numeric default 0,
  placement_score numeric default 0,
  created_at timestamptz default now()
);

create table if not exists pricing_intelligence (
  id uuid primary key default gen_random_uuid(),
  event_type text,
  location text,
  guest_range text,
  avg_total_cost numeric,
  avg_vendor_cost jsonb default '{}'::jsonb,
  demand_score numeric default 0,
  created_at timestamptz default now()
);
