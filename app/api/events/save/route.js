import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req){
  const body=await req.json();
  if(!process.env.NEXT_PUBLIC_SUPABASE_URL||!process.env.SUPABASE_SERVICE_ROLE_KEY){
    return NextResponse.json({ok:false,mode:"placeholder",message:"Add Supabase keys to save full events.",event:body});
  }
  const supabase=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY);
  const {error}=await supabase.from("events").insert({
    name:body.eventName,
    business_name:body.businessName,
    location:body.location,
    event_date:body.eventDate,
    items:body.items,
    guest_list:body.guests,
    vendors:body.vendors
  });
  if(error) return NextResponse.json({ok:false,message:error.message});
  return NextResponse.json({ok:true,message:"Event saved to Supabase."});
}
