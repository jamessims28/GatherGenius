import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  if (!process.env.GOOGLE_MAPS_API_KEY) {
    return NextResponse.json({
      ok: true,
      mode: "local-fallback",
      message: "Map fallback active. Add GOOGLE_MAPS_API_KEY for live Google Places.",
      results: [
        { name: "Elite Sound DJs", address: "Stafford, VA", rating: 4.9, lat: 38.4221, lng: -77.4083 },
        { name: "Fresh Flame Catering", address: "Fredericksburg, VA", rating: 4.8, lat: 38.3032, lng: -77.4605 }
      ]
    });
  }

  const query = body.query || "event vendors";
  const lat = body.lat || 38.4221;
  const lng = body.lng || -77.4083;
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&location=${lat},${lng}&radius=50000&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  const results = (data.results || []).slice(0, 10).map((place) => ({
    name: place.name,
    address: place.formatted_address,
    rating: place.rating,
    lat: place.geometry?.location?.lat,
    lng: place.geometry?.location?.lng
  }));

  return NextResponse.json({ ok: true, message: "Nearby search complete.", results });
}
