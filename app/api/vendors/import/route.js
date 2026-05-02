import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../../lib/supabaseAdmin";

export async function POST(req) {
  const body = await req.json();
  const vendors = Array.isArray(body.vendors) ? body.vendors : [];
  const supabase = getSupabaseAdmin();

  if (!vendors.length) {
    return NextResponse.json({ ok: false, message: "No vendors provided." }, { status: 400 });
  }

  if (!supabase) {
    return NextResponse.json({
      ok: true,
      mode: "local-fallback",
      imported: vendors.length,
      message: `${vendors.length} vendors parsed locally. Add Supabase keys for bulk database import.`
    });
  }

  const rows = vendors.map((vendor) => ({
    business_name: vendor.name || vendor.business_name || "",
    category: vendor.category || "",
    service: vendor.service || "",
    city: vendor.city || "",
    price_range: vendor.price || vendor.price_range || "",
    email: vendor.email || "",
    plan: vendor.plan || "Starter",
    badge: vendor.badge || "Imported",
    rating: vendor.rating || "New",
    outreach_status: vendor.outreach_status || "new"
  }));

  const { data, error } = await supabase.from("vendors").insert(rows).select();

  if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, imported: data?.length || 0, message: "Vendor import completed.", vendors: data });
}
