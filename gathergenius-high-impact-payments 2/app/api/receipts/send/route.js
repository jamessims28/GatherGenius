import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const to = body.to;

  if (!to) return NextResponse.json({ ok: false, message: "Missing recipient email." });

  if (!process.env.SENDGRID_API_KEY) {
    return NextResponse.json({
      ok: false,
      mode: "placeholder",
      message: "Add SENDGRID_API_KEY to send receipt emails.",
      receipt: body
    });
  }

  // Add SendGrid API call here.
  return NextResponse.json({ ok: true, mode: "ready", message: "Receipt email provider scaffold ready.", receipt: body });
}
