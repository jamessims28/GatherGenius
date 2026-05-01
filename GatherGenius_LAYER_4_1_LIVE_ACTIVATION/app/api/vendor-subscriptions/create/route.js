import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST(req) {
  const body = await req.json();
  const stripe = getStripe();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  if (!stripe) {
    return NextResponse.json({
      ok: false,
      mode: "safe-placeholder",
      message: `Layer 4.1 safe mode: ${body.plan || "vendor"} plan selected. Add Stripe env vars to create live checkout.`
    });
  }

  const priceMap = {
    featured: process.env.STRIPE_VENDOR_PRICE_FEATURED,
    elite: process.env.STRIPE_VENDOR_PRICE_ELITE
  };

  const price = priceMap[body.plan];

  if (!price) {
    return NextResponse.json({
      ok: false,
      message: `Missing Stripe price ID for ${body.plan}. Add STRIPE_VENDOR_PRICE_FEATURED or STRIPE_VENDOR_PRICE_ELITE.`
    }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price, quantity: 1 }],
    metadata: {
      app: "GatherGenius",
      plan: body.plan,
      businessEntity: body.businessName || "LMH Enterprise LLC"
    },
    success_url: `${appUrl}?vendor_subscription=success`,
    cancel_url: `${appUrl}?vendor_subscription=cancel`
  });

  return NextResponse.json({ ok: true, url: session.url, message: "Stripe checkout session created." });
}
