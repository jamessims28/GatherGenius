# GatherGenius Production-Ready Setup

## Project name
Use this exact lowercase Vercel project name:

```text
gathergenius-lmh-enterprise
```

## Included
- Production-ready Next.js app shell
- Calm light SaaS design
- Embedded dashboard image assets
- Stripe checkout directed to LMH Enterprise LLC
- Guest RSVP + split payment links
- Vendor marketplace scaffolds
- QR ticketing/check-in scaffold
- AI planner route
- AI missing-items checker
- Supabase event-save scaffold
- Hotel/venue search scaffold
- Notification scaffolds
- Legal/trust center scaffold

## Included images
- dashboard-preview-1.png
- dashboard-preview-2.png

## Local run
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Vercel deploy
1. Unzip this package.
2. Upload the folder named `gathergenius-lmh-enterprise`.
3. Use project name: `gathergenius-lmh-enterprise`.
4. Add environment variables from `.env.example`.
5. Redeploy.

## Payments
Use LMH Enterprise LLC's Stripe secret key for:

```env
STRIPE_SECRET_KEY=
```

Money goes to the Stripe account that owns that secret key.
