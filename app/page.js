"use client";

import React, { useMemo, useState } from "react";
import { Search, Store, Star, MapPin, Sparkles, CalendarDays, LayoutDashboard, CheckCircle2, Wallet, Users, ClipboardList, Wand2 } from "lucide-react";

const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME || "LMH Enterprise LLC";

const categories = [
  { key: "all", label: "All", zones: ["Main area", "Guest flow", "Vendor zone", "Safety area"], checklist: ["Define event goal", "Set budget", "Add vendors", "Confirm timeline"] },
  { key: "wedding", label: "Wedding", zones: ["Ceremony aisle", "Reception seating", "Dance floor", "Photo area"], checklist: ["Confirm flowers", "Create seating chart", "Book DJ", "Plan weather backup"] },
  { key: "family", label: "Family & BBQ", zones: ["Grill zone", "Food line", "Games area", "Kids area"], checklist: ["Confirm grill fuel", "Add coolers and ice", "Add trash/recycling", "Confirm shade"] },
  { key: "corporate", label: "Corporate", zones: ["Registration", "Main room", "Breakouts", "Catering"], checklist: ["Prepare badges", "Confirm projector", "Add agenda", "Plan Wi-Fi"] },
  { key: "music", label: "Music & Concert", zones: ["Stage", "Sound booth", "Audience area", "Vendor row"], checklist: ["Confirm sound", "Add lighting", "Secure power", "Plan crowd control"] },
  { key: "political", label: "Political & Civic", zones: ["Podium", "Media zone", "VIP", "Security"], checklist: ["Confirm permits", "Review compliance", "Set media access", "Plan crowd flow"] }
];

const vendors = [
  { name: "Elite Sound DJs", category: "Music & Concert", service: "DJ / Music", city: "Stafford, VA", price: "$350 - $900", rating: 4.9, badge: "Featured" },
  { name: "Fresh Flame Catering", category: "Wedding", service: "Catering", city: "Fredericksburg, VA", price: "$15 - $45 / guest", rating: 4.8, badge: "Elite" },
  { name: "Venue Luxe Hall", category: "Corporate", service: "Venue", city: "Stafford, VA", price: "$800 - $5,000", rating: 4.9, badge: "Featured" },
  { name: "GlowPro Lighting", category: "Wedding", service: "Lighting / AV", city: "Washington, DC", price: "$300 - $1,500", rating: 4.7, badge: "Starter" },
  { name: "CivicStage Productions", category: "Political & Civic", service: "Stage / Civic Events", city: "Northern VA", price: "$1,500 - $7,500", rating: 4.6, badge: "Elite" },
  { name: "Premier Event Rentals", category: "Family & BBQ", service: "Tents / Tables", city: "Richmond, VA", price: "$500 - $2,500", rating: 4.8, badge: "Featured" }
];

function money(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(value || 0));
}

export default function Page() {
  const [tab, setTab] = useState("marketplace");
  const [query, setQuery] = useState("");
  const [activeKey, setActiveKey] = useState("all");
  const [eventName, setEventName] = useState("GatherGenius Event");
  const [eventLocation, setEventLocation] = useState("Stafford, VA");
  const [eventBudget, setEventBudget] = useState(5200);

  const activeCategory = categories.find((item) => item.key === activeKey) || categories[0];

  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => {
      const matchesCategory = activeCategory.label === "All" || vendor.category === activeCategory.label;
      const matchesQuery = `${vendor.name} ${vendor.service} ${vendor.city} ${vendor.category}`.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  const nav = [["marketplace", Store, "Marketplace"], ["builder", Wand2, "Event Builder"], ["dashboard", LayoutDashboard, "Dashboard"]];

  function chooseCategory(key) {
    setActiveKey(key);
    setTab("builder");
  }

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl">
        <header className="card mb-6 flex flex-wrap justify-between gap-6 items-center">
          <div className="flex gap-5 items-center">
            <div className="orb" />
            <div>
              <p className="text-sm uppercase tracking-[.25em] text-stone-500">Layer 2 AI Builder</p>
              <h1 className="text-4xl md:text-5xl font-light tracking-wide">GatherGenius</h1>
              <p className="text-stone-500 mt-2">Marketplace and event builder by {businessName}</p>
            </div>
          </div>
          <button onClick={() => setTab("builder")} className="btn primary">Create Event</button>
        </header>

        <nav className="card mb-6 flex gap-2 flex-wrap">
          {nav.map(([key, Icon, label]) => (
            <button key={key} onClick={() => setTab(key)} className={`btn ${tab === key ? "primary" : ""}`}>
              <Icon className="inline h-4 w-4 mr-2" />{label}
            </button>
          ))}
        </nav>

        {tab === "marketplace" && (
          <>
            <section className="card mb-6">
              <h2 className="text-4xl md:text-6xl font-light leading-tight">Find vendors and build your event instantly.</h2>
              <p className="text-stone-500 mt-4 max-w-2xl">Search vendors, choose a category, then generate an event layout with zones and checklists.</p>
            </section>

            <section className="card mb-6">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 rounded-full bg-white border border-stone-200 px-5 py-4 flex gap-3 items-center">
                  <Search className="text-stone-400" />
                  <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search vendors, venues, cities, services..." className="w-full bg-transparent outline-none" />
                </div>
                <button className="btn primary">Search</button>
              </div>

              <div className="flex flex-wrap gap-2 mt-5">
                {categories.map((category) => (
                  <button key={category.key} onClick={() => chooseCategory(category.key)} className={`btn ${activeKey === category.key ? "primary" : ""}`}>{category.label}</button>
                ))}
              </div>
            </section>

            <div className="flex flex-wrap justify-between gap-4 items-end mb-4">
              <div>
                <h2 className="text-3xl font-light flex items-center gap-2"><Store /> Marketplace Vendors</h2>
                <p className="text-stone-500 mt-1">Showing {filteredVendors.length} vendor{filteredVendors.length === 1 ? "" : "s"}</p>
              </div>
              <div className="text-sm text-stone-500 flex gap-2 items-center"><CalendarDays className="h-4 w-4" />Project: gathergenius-lmh</div>
            </div>
            <VendorGrid vendors={filteredVendors} />
          </>
        )}

        {tab === "builder" && (
          <section>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="card">
                <h2 className="text-3xl font-light mb-4">Event Builder</h2>
                <Field label="Event Name" value={eventName} set={setEventName} />
                <Field label="Location" value={eventLocation} set={setEventLocation} />
                <Field label="Budget" value={eventBudget} set={setEventBudget} type="number" />
                <label className="block mt-4">
                  <span className="text-sm text-stone-500">Event Category</span>
                  <select value={activeKey} onChange={(event) => setActiveKey(event.target.value)} className="mt-1 w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none bg-white">
                    {categories.filter((item) => item.key !== "all").map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                  </select>
                </label>
              </div>

              <div className="lg:col-span-2 space-y-5">
                <div className="grid md:grid-cols-3 gap-4">
                  <Metric icon={Wallet} label="Budget" value={money(eventBudget)} />
                  <Metric icon={Users} label="Suggested Vendors" value={filteredVendors.length} />
                  <Metric icon={ClipboardList} label="Checklist Items" value={activeCategory.checklist.length} />
                </div>

                <div className="card">
                  <h2 className="text-3xl font-light mb-2">{eventName}</h2>
                  <p className="text-stone-500 mb-6">{activeCategory.label} event in {eventLocation}</p>
                  <div className="grid md:grid-cols-2 gap-5">
                    <List title="Suggested Zones" items={activeCategory.zones} />
                    <List title="AI Checklist" items={activeCategory.checklist} checklist />
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-xl font-light mb-3">Matched Vendors</h3>
                  <VendorGrid vendors={filteredVendors.length ? filteredVendors : vendors.slice(0, 3)} />
                </div>
              </div>
            </div>
          </section>
        )}

        {tab === "dashboard" && (
          <section>
            <h2 className="text-3xl font-light mb-4 flex items-center gap-2"><LayoutDashboard /> Dashboard</h2>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <Metric icon={Wallet} label="Budget" value={money(eventBudget)} />
              <Metric icon={Store} label="Vendors" value={vendors.length} />
              <Metric icon={Users} label="Guests" value="10" />
              <Metric icon={CalendarDays} label="Category" value={activeCategory.label} />
            </div>
            <div className="card">
              <h3 className="text-2xl font-light">Layer 2 is live</h3>
              <p className="text-stone-500 mt-2">Marketplace, category selection, event builder, AI-style layout, checklist, and dashboard are now included.</p>
            </div>
          </section>
        )}

        <footer className="mt-10 text-sm text-stone-500">© 2026 GatherGenius. Revenue directed to {businessName}.</footer>
      </div>
    </main>
  );
}

function Field({ label, value, set, type = "text" }) {
  return (
    <label className="block mb-4">
      <span className="text-sm text-stone-500">{label}</span>
      <input type={type} value={value} onChange={(event) => set(event.target.value)} className="mt-1 w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none" />
    </label>
  );
}

function List({ title, items, checklist = false }) {
  return (
    <div>
      <h3 className="text-xl font-light mb-3">{title}</h3>
      {items.map((item) => (
        <div key={item} className="rounded-2xl border border-stone-200 bg-white px-4 py-3 mb-2">
          {checklist && <CheckCircle2 className="inline h-4 w-4 mr-2 text-emerald-700" />}
          {item}
        </div>
      ))}
    </div>
  );
}

function VendorGrid({ vendors }) {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
      {vendors.map((vendor) => (
        <div className="card" key={vendor.name}>
          <div className="flex justify-between gap-4">
            <div><h3 className="text-2xl font-light">{vendor.name}</h3><p className="text-stone-500">{vendor.service}</p></div>
            <span className="flex items-center gap-1 text-sm"><Star className="h-4 w-4" /> {vendor.rating}</span>
          </div>
          <p className="mt-4 text-sm text-stone-500 flex gap-1 items-center"><MapPin className="h-4 w-4" /> {vendor.city}</p>
          <p className="mt-3">{vendor.price}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="rounded-full bg-white border border-stone-200 px-3 py-1 text-sm">{vendor.category}</span>
            <span className="rounded-full bg-white border border-stone-200 px-3 py-1 text-sm">{vendor.badge}</span>
          </div>
          <button className="btn primary mt-5 w-full">Request Booking</button>
        </div>
      ))}
    </div>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="card">
      <Icon className="mb-3" />
      <p className="text-sm text-stone-500">{label}</p>
      <p className="text-2xl">{value}</p>
    </div>
  );
}
