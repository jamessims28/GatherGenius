import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(req){
  const body = await req.json();

  if(!process.env.OPENAI_API_KEY){
    return NextResponse.json({
      ok:false,
      mode:"placeholder",
      message:"Add OPENAI_API_KEY to activate AI planning.",
      items:body.items || [],
      missing:["Add OpenAI key to generate live AI plan."]
    });
  }

  const client = new OpenAI({apiKey:process.env.OPENAI_API_KEY});
  const completion = await client.chat.completions.create({
    model:process.env.OPENAI_MODEL || "gpt-4.1-mini",
    response_format:{type:"json_object"},
    messages:[
      {role:"system",content:"Return JSON only with items array and missing array. Do not claim live verified pricing."},
      {role:"user",content:JSON.stringify(body)}
    ]
  });

  const parsed = JSON.parse(completion.choices[0].message.content);
  return NextResponse.json({
    ok:true,
    message:"AI plan generated. Confirm vendor prices.",
    items:parsed.items || body.items || [],
    missing:parsed.missing || []
  });
}
