import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../../lib/supabaseAdmin";

export async function POST(req) {
  const body = await req.json();
  const supabase = getSupabaseAdmin();
  const booking = body.booking || {};

  if (!supabase) {
    return NextResponse.json({
      ok: false,
      mode: "safe-placeholder",
      message: "Booking created locally. Add Supabase env vars to save bookings permanently.",
      booking
    });
  }

  const { error } = await supabase.from("vendor_bookings").insert({
    booking_code: booking.id,
    customer_name: booking.customer || "",
    vendor_name: booking.vendor || "",
    event_name: "GatherGenius Event",
    amount: booking.amount || 0,
    commission: booking.commission || 0,
    status: booking.status || "Requested"
  });

  if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, message: "Booking saved to Supabase." });
}
