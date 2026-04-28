# GatherGenius Vercel Ready Build

This version is packaged specifically for Vercel.

## Local preview
```bash
npm install
cp .env.example .env.local
npm run dev
```
Open http://localhost:3000

## Vercel upload
Upload/select the folder that contains `package.json` at the top level.

## Required later for live payments
Add these in Vercel > Settings > Environment Variables:
- STRIPE_SECRET_KEY
- NEXT_PUBLIC_APP_URL
- NEXT_PUBLIC_SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
