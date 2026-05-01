import { NextResponse } from "next/server";
export async function POST(req){
  const body=await req.json();
  if(!process.env.GOOGLE_MAPS_API_KEY){
    return NextResponse.json({ok:false,mode:"safe-placeholder",message:"Add GOOGLE_MAPS_API_KEY for live Google Places search.",results:[]});
  }
  const q=body.query||"event vendors";
  const lat=body.lat||38.4221,lng=body.lng||-77.4083;
  const url=`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(q)}&location=${lat},${lng}&radius=50000&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  const r=await fetch(url); const data=await r.json();
  const results=(data.results||[]).slice(0,10).map(p=>({name:p.name,address:p.formatted_address,rating:p.rating,lat:p.geometry?.location?.lat,lng:p.geometry?.location?.lng}));
  return NextResponse.json({ok:true,results,message:"Nearby map search complete."});
}
