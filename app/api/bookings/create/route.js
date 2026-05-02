import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../../lib/supabaseAdmin";
export async function POST(req) {
  const body = await req.json(); const booking = body.booking || {}; const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: true, mode: "local-fallback", message: "Booking accepted locally. Add Supabase keys to save permanently.", booking });
  const { data, error } = await supabase.from("bookings").insert({ booking_code: booking.id || `BK-${Date.now()}`, vendor_name: booking.vendor || "", event_name: booking.eventName || "GatherGenius Event", customer_name: booking.customer || "New Customer", amount: booking.amountNumber || 1000, commission: booking.commissionNumber || 100, status: booking.status || "Requested" }).select().single();
  if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, message: "Booking saved to Supabase.", booking: data });
}
