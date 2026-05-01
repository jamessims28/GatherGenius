import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req){
  const body=await req.json();
  if(!process.env.OPENAI_API_KEY){
    return NextResponse.json({ok:true,mode:"safe-placeholder",message:"Premium AI fallback generated. Add OPENAI_API_KEY for live AI.",plan:[
      `Create a ${body.category||"custom"} event timeline for ${body.eventName||"your event"}.`,
      `Budget target: $${body.eventBudget||0}. Reserve 60% for venue/vendors, 25% food, 15% logistics.`,
      "Book venue, DJ/AV, catering, rentals, and backup support.",
      "Send vendor requests and confirm deposits.",
      "Use dashboard to track bookings and commissions."
    ]});
  }
  const openai=new OpenAI({apiKey:process.env.OPENAI_API_KEY});
  const prompt=`Create a concise premium event plan for ${body.eventName} in ${body.eventLocation}, category ${body.category}, budget ${body.eventBudget}. Return 5 bullet points.`;
  const completion=await openai.chat.completions.create({model:process.env.OPENAI_MODEL||"gpt-4.1-mini",messages:[{role:"user",content:prompt}]});
  const text=completion.choices?.[0]?.message?.content||"";
  return NextResponse.json({ok:true,message:"Premium AI plan generated.",plan:text.split("\n").filter(Boolean).slice(0,8)});
}
