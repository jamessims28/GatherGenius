# GatherGenius Layer 4.1 — No-Alias Import Fixed

Project name:

```text
gathergenius-lmh
```

## Fix included

This version fixes:

```text
Module not found: can't resolve '@/lib/stripe'
```

and avoids backend alias problems by using relative imports:

```js
../../../../lib/stripe
../../../../lib/supabaseAdmin
```

Also includes:

- `lib/stripe.js`
- `lib/supabaseAdmin.js`
- `jsconfig.json`
- Next.js `14.2.30`
- Full Layer 4.1 UI
- Live Setup checks
- Supabase routes
- Stripe route
- Database schema

## Replace repo contents

Do not merge manually. Replace current repo files with this ZIP contents, then redeploy.
