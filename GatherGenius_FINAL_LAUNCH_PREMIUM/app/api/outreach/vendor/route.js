import { NextResponse } from "next/server";

function vendorMessage(vendor = {}) {
  return `Hey ${vendor.name || "there"},

I launched GatherGenius, a premium event marketplace that helps people find trusted vendors and send booking requests.

I can list your business for free. We also offer Featured placement for $49/month and Elite placement for $149/month to help vendors get more visibility and more lead opportunities.

Would you like me to add your business or send over the Featured vendor option?

- GatherGenius`;
}

export async function POST(req) {
  const body = await req.json();
  const vendor = body.vendor || {};
  const to = vendor.email || body.to;
  const text = body.message || vendorMessage(vendor);

  if (!to) return NextResponse.json({ ok: false, message: "Missing vendor email." }, { status: 400 });

  if (!process.env.RESEND_API_KEY || !process.env.OUTREACH_FROM_EMAIL) {
    return NextResponse.json({
      ok: true,
      mode: "safe-preview",
      message: "Vendor outreach prepared. Add RESEND_API_KEY and OUTREACH_FROM_EMAIL to send real emails.",
      to,
      subject: "Free vendor listing + Featured placement on GatherGenius",
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
      from: process.env.OUTREACH_FROM_EMAIL,
      to,
      subject: "Free vendor listing + Featured placement on GatherGenius",
      text
    })
  });

  const data = await response.json();
  return NextResponse.json({
    ok: response.ok,
    message: response.ok ? "Vendor outreach email sent." : "Vendor outreach email failed.",
    data
  }, { status: response.ok ? 200 : 500 });
}
