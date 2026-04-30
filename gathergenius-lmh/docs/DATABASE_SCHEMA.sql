create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  name text,
  business_name text default 'LMH Enterprise LLC',
  owner_email text,
  location text,
  event_date text,
  event_type text,
  items jsonb,
  guest_list jsonb,
  vendors jsonb,
  created_at timestamptz default now()
);

create table if not exists vendors (
  id uuid primary key default gen_random_uuid(),
  business_name text,
  category text,
  location text,
  lat double precision,
  lng double precision,
  price_range text,
  email text,
  rating numeric,
  verified boolean default false,
  status text default 'pending',
  stripe_account_id text,
  created_at timestamptz default now()
);
