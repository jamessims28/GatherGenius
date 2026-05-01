import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "GatherGenius",
    layer: "Layer 4.1 Full Patched",
    next: "14.2.30",
    project: "gathergenius-lmh"
  });
}
