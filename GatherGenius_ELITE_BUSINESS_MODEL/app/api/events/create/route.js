import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../../lib/supabaseAdmin";
export async function POST(req) {
  const body = await req.json(); const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: true, mode: "local-fallback", message: "Event accepted locally. Add Supabase keys to save permanently.", event: body });
  const { data, error } = await supabase.from("events").insert({ event_name: body.eventName || "GatherGenius Event", template_name: body.selectedTemplate || "", budget: Number(body.eventBudget || 0), notes: body.notes || "" }).select().single();
  if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, message: "Event saved to Supabase.", event: data });
}
