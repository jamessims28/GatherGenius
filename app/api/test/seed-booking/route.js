import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../../lib/supabaseAdmin";

export async function POST() {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return NextResponse.json({
      ok: false,
      mode: "safe-placeholder",
      message: "Supabase env vars missing. Add them in Vercel before testing database inserts."
    });
  }

  const code = `TEST-${Date.now()}`;

  const { error } = await supabase.from("vendor_bookings").insert({
    booking_code: code,
    customer_name: "Layer 4 Test Customer",
    vendor_name: "Layer 4 Test Vendor",
    event_name: "Layer 4 Test Event",
    amount: 1000,
    commission: 100,
    status: "Requested"
  });

  if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, message: "Test booking saved to Supabase.", booking_code: code });
}
