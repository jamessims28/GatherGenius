"use client";

import React, { useMemo, useState } from "react";
import { Search, Store, Star, MapPin, Sparkles, CalendarDays } from "lucide-react";

const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME || "LMH Enterprise LLC";

const categories = [
  "All",
  "Wedding",
  "Family & BBQ",
  "Corporate",
  "Music & Concert",
  "Political & Civic",
  "Graduation",
  "Sports"
];

const vendors = [
  {
    name: "Elite Sound DJs",
    category: "Music & Concert",
    service: "DJ / Music",
    city: "Stafford, VA",
    price: "$350 - $900",
    rating: 4.9,
    badge: "Featured"
  },
  {
    name: "Fresh Flame Catering",
    category: "Wedding",
    service: "Catering",
    city: "Fredericksburg, VA",
    price: "$15 - $45 / guest",
    rating: 4.8,
    badge: "Elite"
  },
  {
    name: "Venue Luxe Hall",
    category: "Corporate",
    service: "Venue",
    city: "Stafford, VA",
    price: "$800 - $5,000",
    rating: 4.9,
    badge: "Featured"
  },
  {
    name: "GlowPro Lighting",
    category: "Wedding",
    service: "Lighting / AV",
    city: "Washington, DC",
    price: "$300 - $1,500",
    rating: 4.7,
    badge: "Starter"
  },
  {
    name: "CivicStage Productions",
    category: "Political & Civic",
    service: "Stage / Civic Events",
    city: "Northern VA",
    price: "$1,500 - $7,500",
    rating: 4.6,
    badge: "Elite"
  },
  {
    name: "Premier Event Rentals",
    category: "Family & BBQ",
    service: "Tents / Tables",
    city: "Richmond, VA",
    price: "$500 - $2,500",
    rating: 4.8,
    badge: "Featured"
  }
];

export default function Page() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => {
      const matchesCategory = activeCategory === "All" || vendor.category === activeCategory;
      const matchesQuery = `${vendor.name} ${vendor.service} ${vendor.city} ${vendor.category}`
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl">
        <header className="card mb-6 flex flex-wrap justify-between gap-6 items-center">
          <div className="flex gap-5 items-center">
            <div className="orb" />
            <div>
              <p className="text-sm uppercase tracking-[.25em] text-stone-500">Layer 1 Marketplace</p>
              <h1 className="text-4xl md:text-5xl font-light tracking-wide">GatherGenius</h1>
              <p className="text-stone-500 mt-2">Event marketplace by {businessName}</p>
            </div>
          </div>

          <button className="btn primary">Create Event</button>
        </header>

        <section className="card mb-6">
          <div className="grid lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2">
              <h2 className="text-4xl md:text-6xl font-light leading-tight">
                Find vendors, venues, and event services faster.
              </h2>
              <p className="text-stone-500 mt-4 max-w-2xl">
                Start with a category, search by service or city, and discover vendors ready for weddings,
                BBQs, corporate events, civic events, graduations, and more.
              </p>
            </div>

            <div className="rounded-[2rem] bg-white/70 border border-stone-200 p-5">
              <Sparkles className="mb-4 text-stone-500" />
              <h3 className="text-2xl font-light">AI-ready foundation</h3>
              <p className="text-stone-500 mt-2">
                Layer 2 can add AI layout generation without breaking the working deploy.
              </p>
            </div>
          </div>
        </section>

        <section className="card mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 rounded-full bg-white border border-stone-200 px-5 py-4 flex gap-3 items-center">
              <Search className="text-stone-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search vendors, venues, cities, services..."
                className="w-full bg-transparent outline-none"
              />
            </div>
            <button className="btn primary">Search</button>
          </div>

          <div className="flex flex-wrap gap-2 mt-5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`btn ${activeCategory === category ? "primary" : ""}`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="flex flex-wrap justify-between gap-4 items-end mb-4">
            <div>
              <h2 className="text-3xl font-light flex items-center gap-2">
                <Store /> Marketplace Vendors
              </h2>
              <p className="text-stone-500 mt-1">
                Showing {filteredVendors.length} vendor{filteredVendors.length === 1 ? "" : "s"}
              </p>
            </div>

            <div className="text-sm text-stone-500 flex gap-2 items-center">
              <CalendarDays className="h-4 w-4" />
              Project: gathergenius-lmh
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredVendors.map((vendor) => (
              <div className="card" key={vendor.name}>
                <div className="flex justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-light">{vendor.name}</h3>
                    <p className="text-stone-500">{vendor.service}</p>
                  </div>

                  <span className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4" /> {vendor.rating}
                  </span>
                </div>

                <p className="mt-4 text-sm text-stone-500 flex gap-1 items-center">
                  <MapPin className="h-4 w-4" /> {vendor.city}
                </p>

                <p className="mt-3">{vendor.price}</p>

                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="rounded-full bg-white border border-stone-200 px-3 py-1 text-sm">
                    {vendor.category}
                  </span>
                  <span className="rounded-full bg-white border border-stone-200 px-3 py-1 text-sm">
                    {vendor.badge}
                  </span>
                </div>

                <button className="btn primary mt-5 w-full">Request Booking</button>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-10 text-sm text-stone-500">
          © 2026 GatherGenius. Revenue directed to {businessName}.
        </footer>
      </div>
    </main>
  );
}
