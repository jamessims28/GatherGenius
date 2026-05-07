import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../../lib/supabaseAdmin";

export async function GET() {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ ok: true, mode: "safe-preview", status: { eventLocks: 1, activeExecutions: 1, vendorResponses: 0, replacements: 0, avgConfidence: 94, customerDecisions: 1 } });
  }

  const [locks, executions, responses, replacements] = await Promise.all([
    supabase.from("event_locks").select("*").limit(10000),
    supabase.from("event_executions").select("*").limit(10000),
    supabase.from("vendor_execution_responses").select("*").limit(10000),
    supabase.from("vendor_replacements").select("*").limit(10000)
  ]);

  const lockRows = locks.data || [];
  const avgConfidence = lockRows.length ? Math.round(lockRows.reduce((sum, row) => sum + Number(row.confidence_score || 0), 0) / lockRows.length) : 0;

  return NextResponse.json({ ok: true, mode: "live", status: {
    eventLocks: lockRows.length,
    activeExecutions: (executions.data || []).length,
    vendorResponses: (responses.data || []).length,
    replacements: (replacements.data || []).length,
    avgConfidence,
    customerDecisions: 1
  }});
}
