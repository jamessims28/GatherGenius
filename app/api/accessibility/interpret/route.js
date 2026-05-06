import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const input = body.input || {};
  const eventType = input.eventType || "event";
  const vibe = input.vibe || "simple";
  const guests = Number(input.guests || 100);
  const budget = Number(input.budget || 15000);
  const location = input.location || "Virginia";
  const prompt = `Build a ${vibe} ${eventType} for ${guests} guests under $${budget} near ${location}.`;

  return NextResponse.json({ ok: true, message: "Accessibility input converted to event intent.", intent: { inputMode: body.mode || "tap", eventType, vibe, guests, budget, location, prompt } });
}
