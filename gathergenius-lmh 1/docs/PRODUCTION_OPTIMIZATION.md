# GatherGenius Production Optimization

## What was optimized

- Added Node 20+ engine target
- Added Vercel config
- Added dependency overrides for deprecated transitive package warning
- Added optimized Next.js config
- Added `.npmrc` for cleaner installs
- Added `.gitignore`
- Added production environment template
- Kept dependencies limited to packages used by the app

## Vercel project name

Use:

```text
gathergenius-lmh
```

## Recommended Vercel settings

Build command:

```bash
npm run build
```

Install command:

```bash
npm install
```

Node version:

```text
20.x
```

## About the node-domexception warning

The warning is from a transitive dependency. It does not break the build. This package includes a package override and Node 20 engine target to keep deployment cleaner.

## Production checklist

1. Upload the unzipped project folder to GitHub.
2. Deploy the GitHub repo on Vercel.
3. Add all environment variables from `.env.production.example`.
4. Add Google Maps browser and server keys.
5. Run `docs/DATABASE_SCHEMA.sql` in Supabase.
6. Redeploy after environment variables are added.
