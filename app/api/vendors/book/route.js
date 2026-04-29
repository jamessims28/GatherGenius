import { NextResponse } from "next/server";
export async function POST(req){
  const body=await req.json();
  return NextResponse.json({ok:true,mode:"placeholder",message:"Vendor booking request created. Add Supabase + email to notify vendor.",booking:body});
}
