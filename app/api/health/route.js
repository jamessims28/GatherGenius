import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "GatherGenius",
    layer: "Layer 4 Stripe + Supabase",
    project: "gathergenius-lmh"
  });
}
