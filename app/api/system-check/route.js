import { NextResponse } from "next/server";

export async function GET() {
  const checks = {
    NEXT_PUBLIC_APP_URL: Boolean(process.env.NEXT_PUBLIC_APP_URL),
    NEXT_PUBLIC_SUPABASE_URL: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    STRIPE_SECRET_KEY: Boolean(process.env.STRIPE_SECRET_KEY),
    STRIPE_PRICE_FEATURED: Boolean(process.env.STRIPE_PRICE_FEATURED),
    STRIPE_PRICE_ELITE: Boolean(process.env.STRIPE_PRICE_ELITE),
    STRIPE_PRICE_AI_PREMIUM: Boolean(process.env.STRIPE_PRICE_AI_PREMIUM),
    OPENAI_API_KEY: Boolean(process.env.OPENAI_API_KEY),
    GOOGLE_MAPS_API_KEY: Boolean(process.env.GOOGLE_MAPS_API_KEY)
  };
  return NextResponse.json({
    ok: true,
    connected: Object.values(checks).every(Boolean),
    checks,
    message: "System check complete. Missing keys use safe fallback mode."
  });
}
