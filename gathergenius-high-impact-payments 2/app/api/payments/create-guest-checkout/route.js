import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req) {
  const body = await req.json();
  const amount = Number(body.amount || 0);
  const guestName = body.guestName || "Guest";
  const guestEmail = body.guestEmail || undefined;
  const eventName = body.eventName || "GatherGenius Event";

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ ok: false, mode: "placeholder", message: "Add STRIPE_SECRET_KEY to activate guest checkout.", amount, guestName });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: guestEmail,
    line_items: [{
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: amount,
        product_data: { name: `${eventName} contribution - ${guestName}` }
      }
    }],
    metadata: { guestName, eventName, type: "guest_split_payment" },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}?payment=success&guest=${encodeURIComponent(guestName)}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}?payment=cancel`
  });

  return NextResponse.json({ ok: true, url: session.url });
}
