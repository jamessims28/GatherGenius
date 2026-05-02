import { NextResponse } from "next/server";
import { getStripe } from "../../../../lib/stripeServer";

export async function POST(req) {
  const body = await req.json();
  const stripe = getStripe();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const plan = body.plan || "Featured";

  if (!stripe) {
    return NextResponse.json({
      ok: true,
      mode: "local-fallback",
      message: `${plan} selected. Add Stripe keys and price IDs for live checkout.`
    });
  }

  const priceMap = {
    Featured: process.env.STRIPE_PRICE_FEATURED,
    Elite: process.env.STRIPE_PRICE_ELITE,
    "AI Premium": process.env.STRIPE_PRICE_AI_PREMIUM
  };

  const price = priceMap[plan];
  if (!price) return NextResponse.json({ ok: false, message: `Missing Stripe price ID for ${plan}.` }, { status: 400 });

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price, quantity: 1 }],
    metadata: { app: "GatherGenius", plan },
    success_url: `${appUrl}?checkout=success&plan=${encodeURIComponent(plan)}`,
    cancel_url: `${appUrl}?checkout=cancel`
  });

  return NextResponse.json({ ok: true, url: session.url, message: "Stripe checkout created." });
}
