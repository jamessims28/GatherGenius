import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  return NextResponse.json({
    ok: false,
    mode: "safe-placeholder",
    message: `Layer 3 safe mode: ${body.plan || "vendor"} plan selected. Stripe goes live in Layer 4.`
  });
}
