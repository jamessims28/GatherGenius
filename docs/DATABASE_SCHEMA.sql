create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  name text,
  business_name text default 'LMH Enterprise LLC',
  location text,
  event_date text,
  items jsonb,
  guest_list jsonb,
  vendors jsonb,
  created_at timestamptz default now()
);

create table if not exists rsvps (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete cascade,
  guest_name text,
  guest_email text,
  rsvp_status text,
  paid boolean default false,
  reminder_sent boolean default false,
  created_at timestamptz default now()
);

create table if not exists vendor_bookings (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete set null,
  vendor_name text,
  category text,
  status text default 'Requested',
  created_at timestamptz default now()
);

create table if not exists ticket_checkins (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete cascade,
  guest_name text,
  ticket_code text,
  checked_in_at timestamptz default now()
);
