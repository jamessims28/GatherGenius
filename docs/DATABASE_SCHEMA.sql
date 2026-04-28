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
