create extension if not exists pgcrypto;

create table if not exists vendors (
  id uuid primary key default gen_random_uuid(),
  business_name text,
  category text,
  location text,
  price_range text,
  plan text default 'starter',
  verified boolean default false,
  created_at timestamptz default now()
);

create table if not exists vendor_bookings (
  id uuid primary key default gen_random_uuid(),
  booking_code text unique,
  customer_name text,
  vendor_name text,
  event_name text,
  amount numeric default 0,
  commission numeric default 0,
  status text default 'Requested',
  created_at timestamptz default now()
);

create table if not exists vendor_subscriptions (
  id uuid primary key default gen_random_uuid(),
  vendor_name text,
  plan text,
  stripe_subscription_id text,
  status text default 'active',
  created_at timestamptz default now()
);
