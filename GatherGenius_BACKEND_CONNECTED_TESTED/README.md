# GatherGenius Backend Connected + Tested Build

Project:

```text
gathergenius-lmh
```

## Included

- Premium homepage
- Global templates
- Event builder
- Marketplace
- Vendor join
- Booking system
- Bookings dashboard
- Map/GPS + nearby vendors API route
- AI Premium planner API route
- Pricing plans + Stripe checkout route
- Investor mode
- Scale metrics
- Activity feed
- Outreach workflow
- Revenue projections
- Supabase routes for vendors, bookings, events
- Safe fallback mode if env vars are missing

## Deploy

```bash
npm install
npm run build
npm run start
```

## Environment

Copy `.env.example` into Vercel environment variables.

## Database

Run:

```text
docs/database.sql
```

inside Supabase SQL editor.
