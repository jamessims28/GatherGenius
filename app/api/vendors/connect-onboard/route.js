import { NextResponse } from "next/server";
export async function POST(req){
  const body=await req.json();
  return NextResponse.json({ok:false,mode:"placeholder",message:"Add Stripe Connect setup to onboard vendors and automate payouts.",vendor:body.vendor});
}
