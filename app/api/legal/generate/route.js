import { NextResponse } from "next/server";
export async function POST(req){
  const body=await req.json();
  return NextResponse.json({ok:true,mode:"placeholder",message:"Legal draft scaffolds ready. Have an attorney review before live use.",businessName:body.businessName});
}
