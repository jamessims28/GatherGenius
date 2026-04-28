export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAdminClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export async function POST(req) {
  const body = await req.json();
  const supabase = getAdminClient();
  if (!supabase) return NextResponse.json({ ok: false, mode: "placeholder", message: "Add Supabase service role key to save payments.", payment: body });
  const { error } = await supabase.from("payments").insert({ event_name: body.eventName, payer_name: body.payerName, payer_email: body.payerEmail, amount: body.amount, status: body.status || "Paid" });
  if (error) return NextResponse.json({ ok: false, message: error.message });
  return NextResponse.json({ ok: true, message: "Payment saved to database." });
}
