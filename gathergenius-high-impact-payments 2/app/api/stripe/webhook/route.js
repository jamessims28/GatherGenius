import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req) {
  const body = await req.text();

  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ ok: false, message: "Stripe webhook env vars missing." });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const signature = req.headers.get("stripe-signature");

  try {
    const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
    return NextResponse.json({ ok: true, received: true, type: event.type });
  } catch (err) {
    return NextResponse.json({ ok: false, message: err.message }, { status: 400 });
  }
}
