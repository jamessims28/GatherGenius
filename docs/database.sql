create extension if not exists pgcrypto;

create table if not exists vendors (
  id uuid primary key default gen_random_uuid(),
  business_name text,
  category text,
  service text,
  city text,
  price_range text,
  email text,
  plan text default 'Starter',
  badge text default 'New',
  rating text default 'New',
  outreach_status text default 'new',
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

create table if not exists outreach_contacts (
  id uuid primary key default gen_random_uuid(),
  contact_type text check (contact_type in ('vendor','investor')) default 'vendor',
  name text,
  email text,
  company text,
  status text default 'new',
  last_message text,
  last_contacted_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists outreach_logs (
  id uuid primary key default gen_random_uuid(),
  contact_type text,
  recipient_email text,
  subject text,
  message text,
  status text default 'prepared',
  created_at timestamptz default now()
);
