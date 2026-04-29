# GatherGenius True Final Calm Build

This package merges:
- Full working Next.js app shell
- Calm light SaaS redesign
- Embedded generated dashboard image(s) in `/public/images`
- LMH Enterprise LLC payment direction
- Guest RSVP/payment links
- Vendor marketplace scaffolds
- QR ticketing scaffold
- AI planner and missing-items checker routes
- Supabase event-save scaffold
- Stripe checkout route
- Legal/trust center scaffold
- Vercel redeploy guide

Included images:
- dashboard-preview-1.png
- dashboard-preview-2.png

## Run locally
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Redeploy
Upload the unzipped folder to Vercel and add environment variables from `.env.example`.
