import { NextResponse } from "next/server";

export async function GET() {
  const checks = {
    NEXT_PUBLIC_APP_URL: Boolean(process.env.NEXT_PUBLIC_APP_URL),
    NEXT_PUBLIC_BUSINESS_NAME: Boolean(process.env.NEXT_PUBLIC_BUSINESS_NAME),
    NEXT_PUBLIC_SUPABASE_URL: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    STRIPE_SECRET_KEY: Boolean(process.env.STRIPE_SECRET_KEY),
    STRIPE_VENDOR_PRICE_FEATURED: Boolean(process.env.STRIPE_VENDOR_PRICE_FEATURED),
    STRIPE_VENDOR_PRICE_ELITE: Boolean(process.env.STRIPE_VENDOR_PRICE_ELITE)
  };

  const complete = Object.values(checks).every(Boolean);

  return NextResponse.json({
    ok: true,
    complete,
    checks,
    message: complete ? "All Layer 4 live environment variables are present." : "Some live environment variables are missing."
  });
}
