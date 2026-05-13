-- GatherGenius Experience OS - Supabase Schema with Explicit Grants + RLS
-- Paste into Supabase SQL Editor and Run.

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

create table if not exists public.vendor_execution_responses (
  id uuid primary key default gen_random_uuid(),
  request_code text,
  lock_code text,
  vendor_name text,
  role text,
  decision text default 'accepted',
  reason text,
  sla_status text default 'within_sla',
  response_data jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'vendor_execution_responses_decision_check'
  ) then
    alter table public.vendor_execution_responses
    add constraint vendor_execution_responses_decision_check
    check (decision in ('accepted','declined'));
  end if;
end $$;

create table if not exists public.vendor_replacements (
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

create table if not exists public.vendor_performance (
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

create table if not exists public.pricing_intelligence (
  id uuid primary key default gen_random_uuid(),
  event_type text,
  location text,
  guest_range text,
  avg_total_cost numeric,
  avg_vendor_cost jsonb default '{}'::jsonb,
  demand_score numeric default 0,
  created_at timestamptz default now()
);

create index if not exists idx_event_locks_lock_code on public.event_locks(lock_code);
create index if not exists idx_event_locks_created_at on public.event_locks(created_at);
create index if not exists idx_event_executions_lock_code on public.event_executions(lock_code);
create index if not exists idx_vendor_execution_responses_lock_code on public.vendor_execution_responses(lock_code);
create index if not exists idx_vendor_replacements_lock_code on public.vendor_replacements(lock_code);
create index if not exists idx_vendor_performance_vendor_name on public.vendor_performance(vendor_name);
create index if not exists idx_pricing_intelligence_event_location on public.pricing_intelligence(event_type, location);

-- Explicit grants for Supabase Data API
grant select, insert, update, delete on public.event_locks to service_role;
grant select, insert, update, delete on public.event_executions to service_role;
grant select, insert, update, delete on public.vendor_execution_responses to service_role;
grant select, insert, update, delete on public.vendor_replacements to service_role;
grant select, insert, update, delete on public.vendor_performance to service_role;
grant select, insert, update, delete on public.pricing_intelligence to service_role;

-- Optional safe reads
grant select on public.pricing_intelligence to anon;
grant select on public.vendor_performance to authenticated;

-- Enable RLS
alter table public.event_locks enable row level security;
alter table public.event_executions enable row level security;
alter table public.vendor_execution_responses enable row level security;
alter table public.vendor_replacements enable row level security;
alter table public.vendor_performance enable row level security;
alter table public.pricing_intelligence enable row level security;

-- Policies
do $$
begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='event_locks' and policyname='service role full access event_locks') then
    create policy "service role full access event_locks"
    on public.event_locks for all to service_role using (true) with check (true);
  end if;

  if not exists (select 1 from pg_policies where schemaname='public' and tablename='event_executions' and policyname='service role full access event_executions') then
    create policy "service role full access event_executions"
    on public.event_executions for all to service_role using (true) with check (true);
  end if;

  if not exists (select 1 from pg_policies where schemaname='public' and tablename='vendor_execution_responses' and policyname='service role full access vendor_execution_responses') then
    create policy "service role full access vendor_execution_responses"
    on public.vendor_execution_responses for all to service_role using (true) with check (true);
  end if;

  if not exists (select 1 from pg_policies where schemaname='public' and tablename='vendor_replacements' and policyname='service role full access vendor_replacements') then
    create policy "service role full access vendor_replacements"
    on public.vendor_replacements for all to service_role using (true) with check (true);
  end if;

  if not exists (select 1 from pg_policies where schemaname='public' and tablename='vendor_performance' and policyname='service role full access vendor_performance') then
    create policy "service role full access vendor_performance"
    on public.vendor_performance for all to service_role using (true) with check (true);
  end if;

  if not exists (select 1 from pg_policies where schemaname='public' and tablename='pricing_intelligence' and policyname='service role full access pricing_intelligence') then
    create policy "service role full access pricing_intelligence"
    on public.pricing_intelligence for all to service_role using (true) with check (true);
  end if;

  if not exists (select 1 from pg_policies where schemaname='public' and tablename='pricing_intelligence' and policyname='public can read pricing intelligence') then
    create policy "public can read pricing intelligence"
    on public.pricing_intelligence for select to anon using (true);
  end if;
end $$;

insert into public.event_locks (
  lock_code, prompt, event_type, location, guests, budget, total, deposit,
  confidence_score, guarantee_status, status, event_lock_data
)
values (
  'TEST-LOCK-001',
  'Build my wedding for 120 guests under $20k in Virginia',
  'Wedding',
  'Virginia',
  120,
  20000,
  11880,
  1782,
  94,
  'guaranteed',
  'ready_to_lock',
  '{"test": true}'::jsonb
)
on conflict (lock_code) do nothing;

select * from public.event_locks where lock_code = 'TEST-LOCK-001';
