import { NextResponse } from "next/server";
export async function POST(req){
  const body=await req.json();
  return NextResponse.json({ok:true,mode:"placeholder",message:`Ticket ${body.ticket} scanned. Add Supabase to persist check-in.`,scan:body});
}
