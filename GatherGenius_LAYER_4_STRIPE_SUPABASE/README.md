# GatherGenius Layer 4 — Stripe + Supabase

Project name:

```text
gathergenius-lmh
```

## Replace Layer 3 with this ZIP

This is a complete working version. Do not merge manually.

## Layer 4 adds

- Everything from Layer 3
- Supabase admin helper
- Stripe helper
- Vendor save API route
- Booking save API route
- Vendor subscription checkout API route
- Database schema
- Live Setup tab
- Safe fallback mode if env vars are missing

## Deploy

1. Replace repo contents with this ZIP.
2. Redeploy on Vercel.
3. Confirm app still loads.
4. Run `docs/database.sql` in Supabase.
5. Add env vars from `.env.example`.
6. Redeploy again.

## Important

The app will not break if Stripe or Supabase keys are missing. It will run in safe-placeholder mode until keys are added.
