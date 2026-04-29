import { NextResponse } from "next/server";

export async function POST(req){
  const body = await req.json();

  if(!process.env.GOOGLE_MAPS_API_KEY){
    return NextResponse.json({
      ok:false,
      mode:"placeholder",
      message:"Add GOOGLE_MAPS_API_KEY to activate real hotel/venue searches.",
      results:[
        {name:`${body.type || "Venue"} placeholder`, address:`Near ${body.location || "your location"}`, rating:"N/A"}
      ]
    });
  }

  return NextResponse.json({
    ok:true,
    mode:"ready",
    message:"Google Places key detected. Add full Places API implementation here.",
    results:[
      {name:`Google Places ${body.type} search ready`, address:`Near ${body.location}`, rating:"API"}
    ]
  });
}
