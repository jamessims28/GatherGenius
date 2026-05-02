create extension if not exists pgcrypto;

create table if not exists vendors (
  id uuid primary key default gen_random_uuid(),
  business_name text,
  category text,
  service text,
  city text,
  price_range text,
  plan text default 'Starter',
  badge text default 'New',
  rating text default 'New',
  created_at timestamptz default now()
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  booking_code text unique,
  vendor_name text,
  event_name text,
  customer_name text,
  amount numeric default 0,
  commission numeric default 0,
  status text default 'Requested',
  created_at timestamptz default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  event_name text,
  template_name text,
  budget numeric default 0,
  notes text,
  created_at timestamptz default now()
);
