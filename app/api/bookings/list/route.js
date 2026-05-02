import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../../lib/supabaseAdmin";

export async function GET() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: true, mode: "local-fallback", bookings: [], message: "Fallback bookings loaded." });

  const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false }).limit(100);
  if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, bookings: data || [], message: "Bookings loaded from Supabase." });
}
