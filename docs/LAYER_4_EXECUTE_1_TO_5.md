# Layer 4 Execution Steps

## 1. Add Vercel environment variables

Add these to Vercel → Project → Settings → Environment Variables:

```env
NEXT_PUBLIC_APP_URL=https://gathergenius-lmh.vercel.app
NEXT_PUBLIC_BUSINESS_NAME=LMH Enterprise LLC
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_VENDOR_PRICE_FEATURED=
STRIPE_VENDOR_PRICE_ELITE=
```

Then redeploy.

## 2. Create Supabase database

Run:

```text
docs/database.sql
```

inside Supabase SQL Editor.

## 3. Stripe setup

Create monthly products/prices:

- Featured: $49/month
- Elite: $149/month

Copy the Stripe price IDs into Vercel:

```env
STRIPE_VENDOR_PRICE_FEATURED=
STRIPE_VENDOR_PRICE_ELITE=
```

## 4. End-to-end test

Open GatherGenius and go to Live Setup:

1. Run System Check.
2. Test Vendor Save.
3. Test Booking Save.
4. Click Featured Checkout.
5. Confirm Supabase rows exist.

## 5. Revenue execution

Add 5 real vendors and pitch:

“I can list you free, but Featured vendors get priority booking leads for $49/month.”
