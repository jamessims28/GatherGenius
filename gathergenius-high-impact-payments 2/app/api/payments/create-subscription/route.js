import { NextResponse } from "next/server";
import Stripe from "stripe";

const priceMap = {
  starter: "STRIPE_PRICE_STARTER",
  premium: "STRIPE_PRICE_PREMIUM",
  planner_pro: "STRIPE_PRICE_PLANNER_PRO"
};

export async function POST(req) {
  const body = await req.json();
  const plan = body.plan || "premium";
  const envName = priceMap[plan];
  const priceId = envName ? process.env[envName] : null;

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ ok: false, mode: "placeholder", message: "Add STRIPE_SECRET_KEY to activate subscriptions.", plan });
  }

  if (!priceId) {
    return NextResponse.json({ ok: false, mode: "missing_price", message: `Add ${envName} from Stripe product price IDs.`, plan });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: { plan, type: "subscription" },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}?subscription=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}?subscription=cancel`
  });

  return NextResponse.json({ ok: true, url: session.url });
}
