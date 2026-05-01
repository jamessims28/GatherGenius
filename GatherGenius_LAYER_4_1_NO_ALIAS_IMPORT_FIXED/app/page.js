"use client";

import React, { useMemo, useState } from "react";
import {
  Search, Store, Star, MapPin, CalendarDays, LayoutDashboard,
  CheckCircle2, Wallet, Users, ClipboardList, Wand2, Crown, UserPlus,
  CreditCard, Building2, Send, DollarSign, Database, ShieldCheck, TestTube2
} from "lucide-react";

const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME || "LMH Enterprise LLC";

const categories = [
  { key: "all", label: "All", zones: ["Main area", "Guest flow", "Vendor zone", "Safety area"], checklist: ["Define event goal", "Set budget", "Add vendors", "Confirm timeline"] },
  { key: "wedding", label: "Wedding", zones: ["Ceremony aisle", "Reception seating", "Dance floor", "Photo area"], checklist: ["Confirm flowers", "Create seating chart", "Book DJ", "Plan weather backup"] },
  { key: "family", label: "Family & BBQ", zones: ["Grill zone", "Food line", "Games area", "Kids area"], checklist: ["Confirm grill fuel", "Add coolers and ice", "Add trash/recycling", "Confirm shade"] },
  { key: "corporate", label: "Corporate", zones: ["Registration", "Main room", "Breakouts", "Catering"], checklist: ["Prepare badges", "Confirm projector", "Add agenda", "Plan Wi-Fi"] },
  { key: "music", label: "Music & Concert", zones: ["Stage", "Sound booth", "Audience area", "Vendor row"], checklist: ["Confirm sound", "Add lighting", "Secure power", "Plan crowd control"] },
  { key: "political", label: "Political & Civic", zones: ["Podium", "Media zone", "VIP", "Security"], checklist: ["Confirm permits", "Review compliance", "Set media access", "Plan crowd flow"] }
];

const starterVendors = [
  { name: "Elite Sound DJs", category: "Music & Concert", service: "DJ / Music", city: "Stafford, VA", price: "$350 - $900", rating: 4.9, badge: "Featured", plan: "featured", revenue: 49, leads: 24 },
  { name: "Fresh Flame Catering", category: "Wedding", service: "Catering", city: "Fredericksburg, VA", price: "$15 - $45 / guest", rating: 4.8, badge: "Elite", plan: "elite", revenue: 149, leads: 36 },
  { name: "Venue Luxe Hall", category: "Corporate", service: "Venue", city: "Stafford, VA", price: "$800 - $5,000", rating: 4.9, badge: "Featured", plan: "featured", revenue: 49, leads: 18 },
  { name: "GlowPro Lighting", category: "Wedding", service: "Lighting / AV", city: "Washington, DC", price: "$300 - $1,500", rating: 4.7, badge: "Starter", plan: "starter", revenue: 0, leads: 12 },
  { name: "CivicStage Productions", category: "Political & Civic", service: "Stage / Civic Events", city: "Northern VA", price: "$1,500 - $7,500", rating: 4.6, badge: "Elite", plan: "elite", revenue: 149, leads: 29 },
  { name: "Premier Event Rentals", category: "Family & BBQ", service: "Tents / Tables", city: "Richmond, VA", price: "$500 - $2,500", rating: 4.8, badge: "Featured", plan: "featured", revenue: 49, leads: 20 }
];

const plans = [
  { key: "starter", name: "Starter", price: "$0/mo", amount: 0, features: ["Basic vendor card", "Marketplace listing", "Manual booking requests"] },
  { key: "featured", name: "Featured", price: "$49/mo", amount: 49, features: ["Priority ranking", "Featured badge", "More lead visibility"] },
  { key: "elite", name: "Elite", price: "$149/mo", amount: 149, features: ["Top placement", "Elite badge", "Homepage spotlight", "Priority leads"] }
];

function money(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(value || 0));
}

async function postJson(path, body = {}) {
  const res = await fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  return res.json();
}

async function getJson(path) {
  const res = await fetch(path);
  return res.json();
}

export default function Page() {
  const [tab, setTab] = useState("live");
  const [query, setQuery] = useState("");
  const [activeKey, setActiveKey] = useState("all");
  const [eventName, setEventName] = useState("GatherGenius Event");
  const [eventLocation, setEventLocation] = useState("Stafford, VA");
  const [eventBudget, setEventBudget] = useState(5200);
  const [vendors, setVendors] = useState(starterVendors);
  const [bookings, setBookings] = useState([
    { id: "BK-1001", customer: "James Sims", vendor: "Elite Sound DJs", amount: 850, commission: 85, status: "Requested" },
    { id: "BK-1002", customer: "Nicole", vendor: "Fresh Flame Catering", amount: 4200, commission: 420, status: "Confirmed" }
  ]);
  const [vendorForm, setVendorForm] = useState({ name: "", service: "", city: "", price: "", category: "Wedding", plan: "starter" });
  const [status, setStatus] = useState("Layer 4.1 no-alias import fixed ready.");
  const [systemCheck, setSystemCheck] = useState(null);

  const activeCategory = categories.find((item) => item.key === activeKey) || categories[0];

  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => {
      const matchesCategory = activeCategory.label === "All" || vendor.category === activeCategory.label;
      const matchesQuery = `${vendor.name} ${vendor.service} ${vendor.city} ${vendor.category}`.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory, vendors]);

  const vendorMRR = vendors.reduce((sum, vendor) => sum + Number(vendor.revenue || 0), 0);
  const bookingFees = bookings.reduce((sum, booking) => sum + Number(booking.commission || 0), 0);
  const totalRevenue = vendorMRR + bookingFees;

  const nav = [
    ["live", ShieldCheck, "Live Setup"],
    ["marketplace", Store, "Marketplace"],
    ["builder", Wand2, "Event Builder"],
    ["vendors", UserPlus, "Vendor Join"],
    ["plans", Crown, "Plans"],
    ["bookings", ClipboardList, "Bookings"],
    ["dashboard", LayoutDashboard, "Dashboard"]
  ];

  function chooseCategory(key) {
    setActiveKey(key);
    setTab("builder");
  }

  async function runSystemCheck() {
    const data = await getJson("/api/system-check");
    setSystemCheck(data);
    setStatus(data.message || "System check complete.");
  }

  async function addVendor() {
    if (!vendorForm.name.trim()) {
      setStatus("Add a vendor name first.");
      return;
    }

    const selectedPlan = plans.find((item) => item.key === vendorForm.plan) || plans[0];

    const newVendor = {
      name: vendorForm.name,
      service: vendorForm.service || "Event Vendor",
      city: vendorForm.city || "Local Area",
      category: vendorForm.category,
      price: vendorForm.price || "Contact for pricing",
      rating: "New",
      badge: selectedPlan.name,
      plan: selectedPlan.key,
      revenue: selectedPlan.amount,
      leads: 0
    };

    setVendors(prev => [newVendor, ...prev]);
    setVendorForm({ name: "", service: "", city: "", price: "", category: "Wedding", plan: "starter" });

    const data = await postJson("/api/vendors/create", { vendor: newVendor });
    setStatus(data.message || "Vendor added.");
  }

  function requestBooking(vendor) {
    const amount = 1000;
    const commission = 100;

    const booking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: "New Customer",
      vendor: vendor.name,
      amount,
      commission,
      status: "Requested"
    };

    setBookings(prev => [booking, ...prev]);
    postJson("/api/bookings/create", { booking }).then((data) => setStatus(data.message || `Booking request created for ${vendor.name}.`));
    setTab("bookings");
  }

  async function activatePlan(planKey) {
    const data = await postJson("/api/vendor-subscriptions/create", { plan: planKey, businessName });
    setStatus(data.message || "Plan activation route called.");
    if (data.url) window.location.href = data.url;
  }

  async function runTestVendor() {
    const data = await postJson("/api/test/seed-vendor", {});
    setStatus(data.message || "Test vendor route complete.");
  }

  async function runTestBooking() {
    const data = await postJson("/api/test/seed-booking", {});
    setStatus(data.message || "Test booking route complete.");
  }

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl">
        <header className="card mb-6 flex flex-wrap justify-between gap-6 items-center">
          <div className="flex gap-5 items-center">
            <div className="orb" />
            <div>
              <p className="text-sm uppercase tracking-[.25em] text-stone-500">Layer 4.1 No-Alias Import Fixed</p>
              <h1 className="text-4xl md:text-5xl font-light tracking-wide">GatherGenius</h1>
              <p className="text-stone-500 mt-2">Marketplace, vendor system, Stripe checks, and Supabase checks by {businessName}</p>
            </div>
          </div>
          <button onClick={runSystemCheck} className="btn primary"><TestTube2 className="inline h-4 w-4 mr-2" />Run System Check</button>
        </header>

        <nav className="card mb-6 flex gap-2 flex-wrap">
          {nav.map(([key, Icon, label]) => (
            <button key={key} onClick={() => setTab(key)} className={`btn ${tab === key ? "primary" : ""}`}>
              <Icon className="inline h-4 w-4 mr-2" />{label}
            </button>
          ))}
        </nav>

        {tab === "live" && (
          <section>
            <h2 className="text-3xl font-light mb-4 flex items-center gap-2"><ShieldCheck /> Execute Layer 4: Steps 1–5</h2>
            <div className="grid lg:grid-cols-2 gap-4 mb-4">
              <div className="card">
                <h3 className="text-2xl font-light mb-3">1. Environment Check</h3>
                <p className="text-stone-500 mb-4">Click system check after adding Vercel environment variables.</p>
                <button onClick={runSystemCheck} className="btn primary">Run System Check</button>
                {systemCheck && (
                  <div className="mt-4 space-y-2 text-sm">
                    {Object.entries(systemCheck.checks || {}).map(([key, value]) => (
                      <p key={key} className={value ? "good" : "warn"}>{value ? "✓" : "•"} {key}: {String(value)}</p>
                    ))}
                  </div>
                )}
              </div>

              <div className="card">
                <h3 className="text-2xl font-light mb-3">2. Supabase Database</h3>
                <p className="text-stone-500 mb-4">Run docs/database.sql in Supabase, then test inserts below.</p>
                <div className="flex gap-2 flex-wrap">
                  <button onClick={runTestVendor} className="btn">Test Vendor Save</button>
                  <button onClick={runTestBooking} className="btn">Test Booking Save</button>
                </div>
              </div>

              <div className="card">
                <h3 className="text-2xl font-light mb-3">3. Stripe Setup</h3>
                <p className="text-stone-500 mb-4">Add Stripe secret key and price IDs. Then click Activate on Featured or Elite.</p>
                <div className="flex gap-2 flex-wrap">
                  <button onClick={() => activatePlan("featured")} className="btn primary">Test Featured Checkout</button>
                  <button onClick={() => activatePlan("elite")} className="btn primary">Test Elite Checkout</button>
                </div>
              </div>

              <div className="card">
                <h3 className="text-2xl font-light mb-3">4. End-to-End Test</h3>
                <p className="text-stone-500 mb-4">Add a vendor, create a booking, then check Supabase tables.</p>
                <ol className="list-decimal ml-5 space-y-2 text-stone-600">
                  <li>Go to Vendor Join and add a vendor.</li>
                  <li>Go to Marketplace and request booking.</li>
                  <li>Go to Bookings to confirm pipeline update.</li>
                  <li>Check Supabase vendors and vendor_bookings tables.</li>
                </ol>
              </div>
            </div>

            <div className="card">
              <h3 className="text-2xl font-light mb-3">5. Revenue Execution</h3>
              <p className="text-stone-500 mb-4">Use the live site with 5 real vendors. Pitch Featured placement at $49/month.</p>
              <p className="text-sm">Status: {status}</p>
            </div>
          </section>
        )}

        {tab === "marketplace" && (
          <>
            <section className="card mb-6">
              <h2 className="text-4xl md:text-6xl font-light leading-tight">Find vendors and create booking requests.</h2>
              <p className="text-stone-500 mt-4 max-w-2xl">This version uses relative imports for backend helpers to avoid alias resolution errors.</p>
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

            <VendorGrid vendors={filteredVendors} requestBooking={requestBooking} />
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
              </div>
            </div>
          </section>
        )}

        {tab === "vendors" && (
          <section>
            <h2 className="text-3xl font-light mb-4 flex items-center gap-2"><UserPlus /> Vendor Join</h2>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-2xl font-light mb-4">Add Vendor</h3>
                <Field label="Business Name" value={vendorForm.name} set={(v) => setVendorForm({ ...vendorForm, name: v })} />
                <Field label="Service" value={vendorForm.service} set={(v) => setVendorForm({ ...vendorForm, service: v })} />
                <Field label="City" value={vendorForm.city} set={(v) => setVendorForm({ ...vendorForm, city: v })} />
                <Field label="Price Range" value={vendorForm.price} set={(v) => setVendorForm({ ...vendorForm, price: v })} />
                <label className="block mt-4">
                  <span className="text-sm text-stone-500">Category</span>
                  <select value={vendorForm.category} onChange={(event) => setVendorForm({ ...vendorForm, category: event.target.value })} className="mt-1 w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none bg-white">
                    {categories.filter((item) => item.key !== "all").map((item) => <option key={item.key}>{item.label}</option>)}
                  </select>
                </label>
                <label className="block mt-4">
                  <span className="text-sm text-stone-500">Plan</span>
                  <select value={vendorForm.plan} onChange={(event) => setVendorForm({ ...vendorForm, plan: event.target.value })} className="mt-1 w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none bg-white">
                    {plans.map((item) => <option key={item.key} value={item.key}>{item.name}</option>)}
                  </select>
                </label>
                <button onClick={addVendor} className="btn primary mt-5 w-full">Add Vendor</button>
              </div>
              <div className="card">
                <h3 className="text-2xl font-light mb-4">Live Database Ready</h3>
                <p className="text-stone-500 mb-4">When Supabase env vars are added, vendor applications and bookings are saved to your database.</p>
                <p><Database className="inline h-4 w-4 mr-2" />Supabase route: /api/vendors/create</p>
                <p><ClipboardList className="inline h-4 w-4 mr-2" />Booking route: /api/bookings/create</p>
                <p><CreditCard className="inline h-4 w-4 mr-2" />Stripe route: /api/vendor-subscriptions/create</p>
              </div>
            </div>
          </section>
        )}

        {tab === "plans" && (
          <section>
            <h2 className="text-3xl font-light mb-4 flex items-center gap-2"><Crown /> Pricing Tiers</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <div className="card" key={plan.key}>
                  <h3 className="text-2xl font-light">{plan.name}</h3>
                  <p className="text-4xl font-light my-4">{plan.price}</p>
                  <div className="space-y-2 min-h-28">
                    {plan.features.map((feature) => <p key={feature}><CheckCircle2 className="inline h-4 w-4 mr-2 text-emerald-700" />{feature}</p>)}
                  </div>
                  <button onClick={() => activatePlan(plan.key)} className="btn primary mt-5 w-full">Activate</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === "bookings" && (
          <section>
            <h2 className="text-3xl font-light mb-4 flex items-center gap-2"><ClipboardList /> Booking Pipeline</h2>
            <div className="grid gap-3">
              {bookings.map((booking) => (
                <div key={booking.id} className="card grid md:grid-cols-6 gap-3 items-center">
                  <p>{booking.id}</p><p>{booking.customer}</p><p>{booking.vendor}</p><p>{money(booking.amount)}</p><p className="text-emerald-700">{money(booking.commission)}</p><p>{booking.status}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === "dashboard" && (
          <section>
            <h2 className="text-3xl font-light mb-4 flex items-center gap-2"><LayoutDashboard /> Dashboard</h2>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <Metric icon={DollarSign} label="Platform Revenue" value={money(totalRevenue)} />
              <Metric icon={Crown} label="Vendor MRR" value={money(vendorMRR)} />
              <Metric icon={CreditCard} label="Booking Fees" value={money(bookingFees)} />
              <Metric icon={Building2} label="Vendors" value={vendors.length} />
            </div>
            <div className="card">
              <h3 className="text-2xl font-light">Layer 4.1 no-alias import-fixed is live</h3>
              <p className="text-stone-500 mt-2">Next.js 14.2.30 + relative backend imports + Live Setup checks are included.</p>
            </div>
          </section>
        )}

        <footer className="mt-10 text-sm text-stone-500">© 2026 GatherGenius. Revenue directed to {businessName}. {status}</footer>
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

function VendorGrid({ vendors, requestBooking }) {
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
          <button onClick={() => requestBooking(vendor)} className="btn primary mt-5 w-full"><Send className="inline h-4 w-4 mr-2" />Request Booking</button>
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
