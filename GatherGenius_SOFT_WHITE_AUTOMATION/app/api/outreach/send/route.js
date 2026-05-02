import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const vendor = body.vendor || {};
  const message = body.message || "";

  if (!process.env.RESEND_API_KEY || !process.env.OUTREACH_FROM_EMAIL) {
    return NextResponse.json({
      ok: true,
      mode: "local-fallback",
      message: "Outreach prepared. Add RESEND_API_KEY and OUTREACH_FROM_EMAIL to send real emails.",
      vendor,
      outreachMessage: message || `Hey ${vendor.name || "there"} — I can list your business on GatherGenius for free. Featured placement is available for more visibility.`
    });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: process.env.OUTREACH_FROM_EMAIL,
      to: vendor.email,
      subject: "Free listing on GatherGenius",
      text: message || `Hey ${vendor.name || "there"} — I can list your business on GatherGenius for free. Featured placement is available for more visibility.`
    })
  });

  const data = await response.json();
  return NextResponse.json({ ok: response.ok, message: response.ok ? "Outreach email sent." : "Email send failed.", data });
}
