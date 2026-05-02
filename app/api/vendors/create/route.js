import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../../lib/supabaseAdmin";
export async function POST(req) {
  const body = await req.json(); const vendor = body.vendor || {}; const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: true, mode: "local-fallback", message: "Vendor accepted locally. Add Supabase keys to save permanently.", vendor });
  const { data, error } = await supabase.from("vendors").insert({ business_name: vendor.name || "", category: vendor.category || "", service: vendor.service || "", city: vendor.city || "", price_range: vendor.price || "", email: vendor.email || "", plan: vendor.plan || "Starter", badge: vendor.badge || "New", rating: vendor.rating || "New", outreach_status: vendor.outreachStatus || "new" }).select().single();
  if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, message: "Vendor saved to Supabase.", vendor: data });
}
