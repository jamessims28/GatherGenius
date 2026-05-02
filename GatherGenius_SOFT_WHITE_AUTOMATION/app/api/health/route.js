import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "GatherGenius",
    layer: "soft-white-automation",
    project: "gathergenius-lmh"
  });
}
