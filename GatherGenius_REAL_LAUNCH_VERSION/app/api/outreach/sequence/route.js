import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const audience = body.audience || "vendor";

  const vendorSequence = [
    { day: 0, subject: "Free listing on GatherGenius", message: "I can list your business for free on GatherGenius so customers can find you for events." },
    { day: 2, subject: "Featured placement for more leads", message: "Featured vendors get higher visibility and more lead opportunities for $49/month." },
    { day: 5, subject: "Want more event booking requests?", message: "GatherGenius is built to send vendors event booking requests and help customers compare services." }
  ];

  const investorSequence = [
    { day: 0, subject: "GatherGenius launch version", message: "GatherGenius is a premium event marketplace and AI planning platform with vendor monetization." },
    { day: 3, subject: "Business model: visibility + leads", message: "Revenue paths include vendor subscriptions, lead generation, AI premium, bookings, and sponsored placement." },
    { day: 7, subject: "Strategic partnership or funding discussion", message: "I would like to discuss funding, partnerships, advisory support, or launch strategy." }
  ];

  return NextResponse.json({
    ok: true,
    message: `${audience} outreach sequence generated.`,
    sequence: audience === "investor" ? investorSequence : vendorSequence
  });
}
