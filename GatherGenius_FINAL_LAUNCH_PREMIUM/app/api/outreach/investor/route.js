import { NextResponse } from "next/server";

function investorMessage(investor = {}) {
  return `Hello ${investor.name || "there"},

I am building GatherGenius, a premium event marketplace and AI planning platform designed to connect event customers with vendors, while monetizing through vendor visibility, lead generation, AI premium planning, booking commissions, and sponsored placement.

Current launch version includes:
- Premium event marketplace UI
- Vendor listing and booking flow
- AI event planner funnel
- Vendor import and outreach automation
- Stripe subscription routes
- Supabase-ready backend routes
- Investor-safe metrics and growth projections
- SEO page generation system

The initial revenue model focuses on Featured vendor placement at $49/month, Elite placement at $149/month, AI Premium at $19/month, and booking/lead monetization.

I would like to share the launch version and discuss strategic funding, partnerships, or advisory support.

Best,
GatherGenius`;
}

export async function POST(req) {
  const body = await req.json();
  const investor = body.investor || {};
  const to = investor.email || body.to;
  const text = body.message || investorMessage(investor);

  if (!to) return NextResponse.json({ ok: false, message: "Missing investor email." }, { status: 400 });

  if (!process.env.RESEND_API_KEY || !process.env.INVESTOR_FROM_EMAIL) {
    return NextResponse.json({
      ok: true,
      mode: "safe-preview",
      message: "Investor outreach prepared. Add RESEND_API_KEY and INVESTOR_FROM_EMAIL to send real emails.",
      to,
      subject: "GatherGenius launch version: event marketplace + AI planning platform",
      text
    });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: process.env.INVESTOR_FROM_EMAIL,
      to,
      subject: "GatherGenius launch version: event marketplace + AI planning platform",
      text
    })
  });

  const data = await response.json();
  return NextResponse.json({
    ok: response.ok,
    message: response.ok ? "Investor outreach email sent." : "Investor outreach email failed.",
    data
  }, { status: response.ok ? 200 : 500 });
}
