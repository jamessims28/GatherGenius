# Payment Setup

## Vercel deploy tips

Upload/select the folder that contains `package.json` at the top level.

Set environment variables in Vercel Project Settings:

```bash
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
STRIPE_SECRET_KEY=sk_test_...
```

For subscriptions, create Stripe products and add price IDs:

```bash
STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_PREMIUM=price_...
STRIPE_PRICE_PLANNER_PRO=price_...
```

For database save:

```bash
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```
