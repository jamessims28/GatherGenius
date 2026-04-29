import { NextResponse } from "next/server";

export async function POST(req){
  const body = await req.json();

  if(!process.env.SENDGRID_API_KEY && !process.env.TWILIO_ACCOUNT_SID){
    return NextResponse.json({
      ok:false,
      mode:"placeholder",
      message:"Add SendGrid or Twilio keys to send real invitations.",
      invitation:body
    });
  }

  return NextResponse.json({ok:true,mode:"ready",message:"Invitation provider scaffold ready.",invitation:body});
}
