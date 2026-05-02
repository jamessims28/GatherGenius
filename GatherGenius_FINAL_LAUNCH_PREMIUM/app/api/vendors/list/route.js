import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../../lib/supabaseAdmin";
const fallbackVendors = [
  { business_name: "Elite Sound DJs", category: "Music & Concert", service: "DJ / Music", city: "Stafford, VA", price_range: "$350 - $900", badge: "Featured", rating: "4.9", plan: "Featured" },
  { business_name: "Fresh Flame Catering", category: "Wedding", service: "Catering", city: "Fredericksburg, VA", price_range: "$15 - $45 / guest", badge: "Elite", rating: "4.8", plan: "Elite" }
];
export async function GET() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: true, mode: "local-fallback", vendors: fallbackVendors, message: "Fallback vendors loaded." });
  const { data, error } = await supabase.from("vendors").select("*").order("created_at", { ascending: false }).limit(500);
  if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, vendors: data || [], message: "Vendors loaded from Supabase." });
}
