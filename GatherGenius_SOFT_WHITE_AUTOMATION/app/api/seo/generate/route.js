import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const city = body.city || "Stafford VA";
  const category = body.category || "event vendors";

  const slug = `${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-in-${city.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`.replace(/^-|-$/g, "");

  return NextResponse.json({
    ok: true,
    message: "SEO page draft generated.",
    page: {
      slug,
      title: `Best ${category} in ${city}`,
      headline: `Find trusted ${category} in ${city}`,
      description: `GatherGenius helps people discover ${category}, compare options, and request bookings for events in ${city}.`,
      sections: [
        "Top vendor categories",
        "How booking works",
        "Featured vendors",
        "Event planning checklist",
        "Request a quote"
      ]
    }
  });
}
