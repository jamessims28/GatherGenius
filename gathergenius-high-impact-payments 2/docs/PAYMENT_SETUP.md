# Payment Setup

## Guest Split Payments

Add:

```bash
STRIPE_SECRET_KEY=
NEXT_PUBLIC_APP_URL=
```

Route:

```bash
/api/payments/create-guest-checkout
```

## Monthly Subscriptions

Create Stripe products/prices and add:

```bash
STRIPE_PRICE_STARTER=
STRIPE_PRICE_PREMIUM=
STRIPE_PRICE_PLANNER_PRO=
```

Route:

```bash
/api/payments/create-subscription
```

## Save Payments

Run:

```bash
docs/DATABASE_SCHEMA.sql
```

Add:

```bash
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

## Receipts

Add:

```bash
SENDGRID_API_KEY=
FROM_EMAIL=
```

Route:

```bash
/api/receipts/send
```
