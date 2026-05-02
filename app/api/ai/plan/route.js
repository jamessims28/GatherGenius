import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  const body = await req.json();

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      ok: true,
      mode: "local-fallback",
      message: "AI fallback generated. Add OPENAI_API_KEY for live AI.",
      plan: [
        `Plan: ${body.eventName || "GatherGenius Event"} using the ${body.selectedTemplate || "Event"} template.`,
        `Budget target: $${body.eventBudget || 0}. Reserve 60% for venue/vendors, 25% for food, 15% for logistics.`,
        "Suggested vendors: venue, catering, sound/AV, photography, support staff.",
        "Timeline: vendor booking, layout planning, final confirmations, event execution, follow-up.",
        "Premium upsell path: AI plan + vendor matches + booking workflow."
      ]
    });
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const prompt = `Create a concise event plan for ${body.eventName}, template ${body.selectedTemplate}, budget ${body.eventBudget}. Return 5 bullet points.`;

  const completion = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
    messages: [{ role: "user", content: prompt }]
  });

  const text = completion.choices?.[0]?.message?.content || "";
  return NextResponse.json({
    ok: true,
    message: "AI plan generated.",
    plan: text.split("\n").filter(Boolean).slice(0, 8)
  });
}
