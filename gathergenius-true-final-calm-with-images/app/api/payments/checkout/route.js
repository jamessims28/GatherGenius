import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req){
  const b=await req.json();
  const name=b.businessName||process.env.NEXT_PUBLIC_BUSINESS_NAME||"LMH Enterprise LLC";
  if(!process.env.STRIPE_SECRET_KEY){
    return NextResponse.json({ok:false,mode:"placeholder",message:`Add LMH Enterprise LLC's STRIPE_SECRET_KEY to activate checkout.`});
  }
  const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);
  const s=await stripe.checkout.sessions.create({
    mode:"payment",
    line_items:[{quantity:1,price_data:{currency:"usd",unit_amount:Number(b.amount||0),product_data:{name:`${b.description||"GatherGenius Payment"} — ${name}`}}}],
    metadata:{businessEntity:name,app:"GatherGenius",guestName:b.guestName||""},
    success_url:`${process.env.NEXT_PUBLIC_APP_URL||"http://localhost:3000"}?payment=success`,
    cancel_url:`${process.env.NEXT_PUBLIC_APP_URL||"http://localhost:3000"}?payment=cancel`
  });
  return NextResponse.json({ok:true,url:s.url});
}
