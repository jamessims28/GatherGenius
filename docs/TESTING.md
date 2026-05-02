# GatherGenius Backend Test Checklist

1. Deploy the ZIP to Vercel.
2. Open `/api/health`.
3. Click System Check inside the app.
4. Test without keys first:
   - Add Vendor
   - Request Booking
   - Generate AI Plan
   - Search Nearby Vendors
   - Checkout Featured/Elite
5. Add Supabase variables and run `docs/database.sql`.
6. Retest vendor and booking persistence.
7. Add Stripe price IDs.
8. Retest checkout.
9. Add OpenAI and Google Maps keys.
10. Retest AI and nearby search.

All backend routes include fallback mode so the app should build and run even before keys are added.
