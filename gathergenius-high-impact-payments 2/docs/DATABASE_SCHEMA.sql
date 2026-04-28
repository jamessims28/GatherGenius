create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  event_name text,
  payer_name text,
  payer_email text,
  amount numeric default 0,
  status text default 'Pending',
  stripe_session_id text,
  payment_type text default 'guest_split',
  created_at timestamptz default now()
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  customer_email text,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text,
  status text,
  created_at timestamptz default now()
);

create table if not exists receipt_logs (
  id uuid primary key default gen_random_uuid(),
  recipient_email text,
  guest_name text,
  event_name text,
  amount numeric,
  status text,
  created_at timestamptz default now()
);
