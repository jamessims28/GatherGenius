'use client';
import React, { useMemo, useState } from "react";

const stats = [
  ["Platform Capacity", "1.18M+", "Capacity / projection metric"],
  ["Global Templates", "177+", "Event playbooks included"],
  ["Vendor Categories", "40+", "Marketplace verticals"],
  ["Revenue Paths", "4", "Plans, bookings, tickets, AI"],
];

const vendors = [
  ["Elite Sound DJs", "DJ / Music", "Stafford, VA", "Featured"],
  ["Fresh Flame Catering", "Catering", "Fredericksburg, VA", "Elite"],
  ["Venue Luxe Hall", "Venue", "Stafford, VA", "Featured"],
];

const templates = [
  "Wedding Reception","Corporate Conference","Political Rally","Backyard BBQ","Luxury Gala","Music Festival",
  "Birthday Party","Baby Shower","Family Reunion","Graduation Party","Product Launch","Trade Show",
  "Charity Fundraiser","Town Hall","Food Festival","Pop-Up Shop",
];

const activity = [
  "AI premium event plan generated",
  "Vendor match simulated in Washington, DC",
  "Wedding template selected",
  "Featured vendor revenue path calculated",
];

export default function Page() {
  const [section, setSection] = useState("home");
  const [templateSearch, setTemplateSearch] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("Wedding Reception");
  const [bookings, setBookings] = useState([]);

  const filteredTemplates = useMemo(() => {
    return templates.filter((item) =>
      item.toLowerCase().includes(templateSearch.toLowerCase())
    );
  }, [templateSearch]);

  function createBooking(vendorName) {
    setBookings((current) => [
      { id: `BK-${current.length + 1001}`, vendor: vendorName, status: "Requested" },
      ...current,
    ]);
    setSection("investor");
  }

  return (
    <main className="min-h-screen bg-stone-100 text-stone-900 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-3xl bg-white p-6 shadow-xl flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-white shadow-2xl border" />
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-500">Premium Preview</p>
              <h1 className="text-4xl font-light">GatherGenius</h1>
              <p className="text-stone-500">AI event marketplace + vendor revenue engine</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              ["Templates", "templates"],
              ["Marketplace", "marketplace"],
              ["Map", "map"],
              ["AI Premium", "ai"],
              ["Investor", "investor"],
            ].map(([item, key]) => (
              <button
                key={item}
                onClick={() => setSection(key)}
                className={`rounded-full border px-4 py-2 text-sm ${
                  section === key ? "bg-stone-900 text-white" : "bg-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-12">
          <div className="rounded-3xl bg-white p-8 shadow-xl lg:col-span-7">
            <p className="mb-4 inline-block rounded-full border px-4 py-2 text-sm text-stone-600">
              AI event marketplace + vendor revenue engine
            </p>
            <h2 className="text-5xl font-light leading-tight">
              Plan any event. Match vendors. Build revenue.
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-stone-600">
              A premium marketplace experience with global event templates, GPS vendor discovery, AI planning, subscriptions, bookings, and investor-ready scale metrics.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => setSection("templates")} className="rounded-full bg-stone-900 px-6 py-3 text-white">
                Launch Event Builder
              </button>
              <button onClick={() => setSection("investor")} className="rounded-full border bg-white px-6 py-3">
                View Investor Dashboard
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-stone-900 p-6 text-white shadow-xl lg:col-span-5">
            <p className="mb-4 text-sm text-stone-300">Transparent Scale Mode</p>
            <div className="grid grid-cols-2 gap-3">
              {stats.map(([label, value, note]) => (
                <div key={label} className="rounded-2xl bg-white/10 p-4">
                  <p className="text-2xl font-light">{value}</p>
                  <p className="text-sm text-stone-300">{label}</p>
                  <p className="mt-1 text-xs text-stone-400">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {section === "templates" && (
          <section className="rounded-3xl bg-white p-6 shadow-xl">
            <h3 className="text-2xl font-light">Template Engine</h3>
            <input value={templateSearch} onChange={(e)=>setTemplateSearch(e.target.value)} placeholder="Search..." className="mb-4 w-full rounded-full border px-5 py-3" />
            <div className="grid gap-2 md:grid-cols-4">
              {filteredTemplates.map((item) => (
                <button key={item} onClick={() => setSelectedTemplate(item)} className="rounded-full border px-4 py-2 text-sm">
                  {item}
                </button>
              ))}
            </div>
            <div className="mt-5 border p-4">
              <p>{selectedTemplate}</p>
            </div>
          </section>
        )}

        {section === "marketplace" && (
          <section className="bg-white p-6 shadow-xl">
            {vendors.map(([name]) => (
              <button key={name} onClick={() => createBooking(name)}>{name}</button>
            ))}
          </section>
        )}

        {section === "investor" && (
          <section className="bg-white p-6 shadow-xl">
            {bookings.map((b)=>(<div key={b.id}>{b.vendor}</div>))}
          </section>
        )}

      </div>
    </main>
  );
}
