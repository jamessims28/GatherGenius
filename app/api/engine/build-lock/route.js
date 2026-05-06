import { NextResponse } from "next/server";
import { buildEventLockFromPrompt } from "../../../../lib/engine/eventBuilder";
import { getSupabaseAdmin } from "../../../../lib/supabaseAdmin";

export async function POST(req) {
  const body = await req.json();
  const prompt = body.prompt || "Build my event";
  const eventLock = buildEventLockFromPrompt(prompt);
  const supabase = getSupabaseAdmin();

  if (supabase) {
    await supabase.from("event_locks").insert({
      lock_code: eventLock.lockCode,
      prompt,
      event_type: eventLock.intent.eventType,
      location: eventLock.intent.location,
      guests: eventLock.intent.guests,
      budget: eventLock.intent.budget,
      total: eventLock.total,
      deposit: eventLock.deposit,
      confidence_score: eventLock.confidenceScore,
      guarantee_status: eventLock.guaranteeStatus,
      status: eventLock.status,
      event_lock_data: eventLock
    });
  }

  return NextResponse.json({ ok: true, message: "Event built. One decision left.", eventLock });
}
