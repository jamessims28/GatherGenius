import { NextResponse } from "next/server";
export async function POST(req){
  const body=await req.json();
  return NextResponse.json({ok:false,mode:"placeholder",message:"Add SendGrid or Twilio keys to send real invitations.",invitation:body});
}
