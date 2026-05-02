"use client";

import React, { useMemo, useState } from "react";

const globalTemplates = [
  "Wedding Reception","Wedding Ceremony","Engagement Party","Bridal Shower","Bachelor Party","Bachelorette Party",
  "Birthday Party","Kids Birthday","Milestone Birthday","Baby Shower","Gender Reveal","Family Reunion","Backyard BBQ",
  "Graduation Party","Housewarming","Retirement Party","Memorial Gathering","Celebration of Life","Holiday Dinner",
  "Corporate Conference","Seminar","Workshop","Product Launch","Networking Event","Trade Show","Corporate Retreat",
  "Team Building","Board Meeting","Sales Kickoff","Investor Pitch Event","Awards Gala","Company Holiday Party","Hiring Fair",
  "Concert","Music Festival","Comedy Show","Open Mic","Club Night","Dance Party","Karaoke Night","Movie Screening",
  "Theater Premiere","Fashion Show","Art Exhibition","Gallery Opening","Pop-Up Experience","VIP Party",
  "Town Hall","Political Rally","Campaign Fundraiser","Voter Registration Drive","Public Forum","Community Festival",
  "Neighborhood Cleanup","Charity Fundraiser","Nonprofit Gala","Awareness Walk","Cultural Festival","Parade","Block Party",
  "Sports Tournament","5K Run","Marathon","Fitness Bootcamp","Yoga Retreat","Boxing Event","Basketball Game",
  "Football Watch Party","Golf Outing","Esports Tournament","Dance Competition","Wellness Expo",
  "School Fair","College Orientation","STEM Camp","Prom","Homecoming","Parent Teacher Night","Student Showcase",
  "Food Festival","Wine Tasting","Beer Festival","Cooking Class","Chef Pop-Up","Restaurant Opening","Farmers Market",
  "Food Truck Rally","Destination Retreat","Hotel Event","Resort Weekend","Travel Expo","Guest Welcome Reception",
  "Black Tie Gala","Luxury Brand Launch","Private Dinner","Celebrity Appearance","Red Carpet Event","VIP Lounge",
  "Charity Auction","Church Service Event","Baptism Reception","Eid Celebration","Diwali Celebration","Christmas Program",
  "Easter Event","Spiritual Retreat","New Year's Eve Party","Valentine Event","Easter Egg Hunt","Juneteenth Celebration",
  "Fourth of July Event","Halloween Party","Thanksgiving Dinner","Christmas Market","Holiday Toy Drive","Winter Festival",
  "Hackathon","Startup Demo Day","Tech Meetup","AI Workshop","Developer Conference","Product Demo","Cybersecurity Summit",
  "Health Fair","Mental Health Awareness Event","Blood Drive","Wellness Retreat","Medical Seminar","Senior Wellness Day",
  "Public Safety Fair","Emergency Preparedness Event","Fire Department Open House","Military Ceremony","Veterans Event",
  "Grand Opening","Pop-Up Shop","Vendor Market","Craft Fair","Flea Market","Luxury Sale Event","Mall Activation"
];

const initialVendors = [
  { name: "Elite Sound DJs", category: "Music & Concert", service: "DJ / Music", city: "Stafford, VA", price: "$350 - $900", badge: "Featured", rating: "4.9", plan: "Featured", lat: "38.4221", lng: "-77.4083" },
  { name: "Fresh Flame Catering", category: "Wedding", service: "Catering", city: "Fredericksburg, VA", price: "$15 - $45 / guest", badge: "Elite", rating: "4.8", plan: "Elite", lat: "38.3032", lng: "-77.4605" },
  { name: "Venue Luxe Hall", category: "Corporate", service: "Venue", city: "Stafford, VA", price: "$800 - $5,000", badge: "Featured", rating: "4.9", plan: "Featured", lat: "38.4331", lng: "-77.4100" },
  { name: "GlowPro Lighting", category: "Wedding", service: "Lighting / AV", city: "Washington, DC", price: "$300 - $1,500", badge: "Starter", rating: "4.7", plan: "Starter", lat: "38.9072", lng: "-77.0369" },
  { name: "CivicStage Productions", category: "Political & Civic", service: "Stage / Civic Events", city: "Northern VA", price: "$1,500 - $7,500", badge: "Elite", rating: "4.6", plan: "Elite", lat: "38.8048", lng: "-77.0469" },
  { name: "Premier Event Rentals", category: "Family & BBQ", service: "Tents / Tables", city: "Richmond, VA", price: "$500 - $2,500", badge: "Featured", rating: "4.8", plan: "Featured", lat: "37.5407", lng: "-77.4360" }
];

const categories = ["All","Wedding","Family & BBQ","Corporate","Music & Concert","Political & Civic","Sports","Luxury","Technology","Food & Beverage"];

const activityFeed = [
  "AI premium event plan generated",
  "Vendor match simulated in Washington, DC",
  "Wedding template selected",
  "Featured vendor revenue path calculated",
  "GPS vendor search preview opened",
  "Marketplace booking request simulated",
  "Investor projection viewed",
  "Premium event template selected"
];

const tractionStats = [
  { label: "Platform Capacity", value: "1.18M+", note: "Transparent capacity / projection metric" },
  { label: "Global Templates", value: "120+", note: "Included pre-backend templates" },
  { label: "Vendor Categories", value: "40+", note: "Marketplace service verticals" },
  { label: "Potential Vendor Matches", value: "50K+", note: "Modeled marketplace match capacity" },
  { label: "Simulated Activity", value: "1.18M", note: "Demo interactions, not paid users" },
  { label: "Revenue Paths", value: "4", note: "Subscriptions, booking fees, AI, sponsors" }
];

const pricingPlans = [
  { name: "Starter", price: "$0/mo", details: ["Basic vendor card", "Marketplace listing", "Manual booking requests"] },
  { name: "Featured", price: "$49/mo", details: ["Priority ranking", "Featured badge", "More lead visibility"] },
  { name: "Elite", price: "$149/mo", details: ["Top placement", "Elite badge", "Homepage spotlight"] },
  { name: "AI Premium", price: "$19/mo", details: ["Premium AI event plans", "Budget planning", "Timeline generation"] }
];

const mapPins = [
  ["DJ", "25%", "35%"],
  ["Venue", "60%", "42%"],
  ["Caterer", "48%", "68%"],
  ["AV", "78%", "70%"]
];

function buildTemplateDetail() {
  return {
    zones: ["Arrival/check-in", "Main activity area", "Vendor/service area", "Food/beverage area", "Restrooms/support", "Safety/first aid"],
    checklist: ["Define purpose and audience", "Set date, time, location, and budget", "Book required vendors", "Create guest flow", "Prepare day-of timeline", "Confirm cleanup and follow-up"],
    vendors: ["Venue/space", "Planner/coordinator", "Catering", "AV or sound", "Photography", "Security/support"],
    revenueIdeas: ["Featured vendor placement", "Booking commission", "Ticketing/registration fee", "Sponsor or ad placement"]
  };
}

export default function Page() {
  const [section, setSection] = useState("home");
  const [templateSearch, setTemplateSearch] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("Wedding Reception");
  const [activeCategory, setActiveCategory] = useState("All");
  const [vendorSearch, setVendorSearch] = useState("");
  const [bookings, setBookings] = useState([]);
  const [vendorForm, setVendorForm] = useState({ name: "", service: "", city: "", price: "" });
  const [vendors, setVendors] = useState(initialVendors);
  const [eventName, setEventName] = useState("GatherGenius Event");
  const [eventBudget, setEventBudget] = useState("5200");
  const [aiOutput, setAiOutput] = useState([]);
  const [gpsStatus, setGpsStatus] = useState("GPS preview ready. Backend connection comes next.");

  const templateDetail = buildTemplateDetail(selectedTemplate);

  const filteredTemplates = useMemo(() => {
    return globalTemplates.filter((item) =>
      item.toLowerCase().includes(templateSearch.toLowerCase())
    );
  }, [templateSearch]);

  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => {
      const matchCategory = activeCategory === "All" || vendor.category === activeCategory;
      const matchSearch = `${vendor.name} ${vendor.service} ${vendor.city} ${vendor.category}`.toLowerCase().includes(vendorSearch.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [vendors, vendorSearch, activeCategory]);

  function createBooking(vendorName) {
    setBookings((current) => [
      { id: `BK-${current.length + 1001}`, vendor: vendorName, status: "Requested", amount: "$1,000", commission: "$100" },
      ...current,
    ]);
    setSection("bookings");
  }

  function addVendor() {
    if (!vendorForm.name.trim()) return;
    setVendors((current) => [
      {
        name: vendorForm.name,
        category: activeCategory === "All" ? "Wedding" : activeCategory,
        service: vendorForm.service || "Event Vendor",
        city: vendorForm.city || "Local Area",
        price: vendorForm.price || "Contact for pricing",
        badge: "New",
        rating: "New",
        plan: "Starter",
        lat: "Preview",
        lng: "Preview"
      },
      ...current,
    ]);
    setVendorForm({ name: "", service: "", city: "", price: "" });
    setSection("marketplace");
  }

  function generateAiPlan() {
    setAiOutput([
      `Plan: ${eventName} using the ${selectedTemplate} template.`,
      `Budget target: $${eventBudget}. Reserve 60% for venue/vendors, 25% for food, 15% for logistics.`,
      "Suggested vendors: venue, catering, sound/AV, photography, support staff.",
      "Timeline: vendor booking, layout planning, final confirmations, event execution, follow-up.",
      "Premium upsell path: AI plan + vendor matches + booking workflow."
    ]);
  }

  function detectGps() {
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setGpsStatus("GPS permission detected. Real map API connects in backend phase."),
        () => setGpsStatus("GPS permission blocked or unavailable. Preview map still active.")
      );
    } else {
      setGpsStatus("GPS not available in this browser. Preview map still active.");
    }
  }

  const nav = [
    ["home", "Home"],
    ["templates", "Templates"],
    ["builder", "Builder"],
    ["marketplace", "Marketplace"],
    ["vendors", "Vendor Join"],
    ["map", "Map + GPS"],
    ["ai", "AI Premium"],
    ["plans", "Pricing"],
    ["investor", "Investor"],
    ["bookings", "Bookings"],
    ["outreach", "Outreach"]
  ];

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="card flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="orb" />
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-500">Complete Pre-Backend Premium Build</p>
              <h1 className="text-4xl font-light">GatherGenius</h1>
              <p className="text-stone-500">AI event marketplace + vendor revenue engine</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {nav.map(([key, label]) => (
              <button key={key} onClick={() => setSection(key)} className={`btn ${section === key ? "primary" : ""}`}>
                {label}
              </button>
            ))}
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-12">
          <div className="card lg:col-span-7">
            <p className="badge mb-4 inline-block">All requested pre-backend features included</p>
            <h2 className="text-5xl font-light leading-tight">Plan any event. Match vendors. Build revenue.</h2>
            <p className="mt-5 max-w-2xl text-lg text-stone-600">
              Premium homepage, global templates, event builder, marketplace, vendor join, booking simulation, bookings dashboard, map/GPS preview, AI premium, pricing plans, investor mode, outreach, activity feed, scale metrics, and revenue projections.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => setSection("builder")} className="btn primary">Launch Event Builder</button>
              <button onClick={() => setSection("investor")} className="btn">View Investor Dashboard</button>
            </div>
          </div>

          <div className="card bg-stone-900 text-white lg:col-span-5">
            <p className="mb-4 text-sm text-stone-300">Transparent Scale Mode</p>
            <div className="grid grid-cols-2 gap-3">
              {tractionStats.slice(0, 4).map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-white/10 p-4">
                  <p className="text-2xl font-light">{stat.value}</p>
                  <p className="text-sm text-stone-300">{stat.label}</p>
                  <p className="mt-1 text-xs text-stone-400">{stat.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {section === "home" && (
          <>
            <section className="grid gap-6 lg:grid-cols-3">
              <Panel title="Global Templates" subtitle="120+ included now / 177+ platform target">
                <div className="grid grid-cols-2 gap-2">
                  {globalTemplates.slice(0, 8).map((item) => <Pill key={item}>{item}</Pill>)}
                </div>
              </Panel>
              <Panel title="Marketplace" subtitle="Vendor discovery + booking simulation">
                <VendorMiniList vendors={vendors.slice(0, 3)} createBooking={createBooking} />
              </Panel>
              <Panel title="AI Premium" subtitle="Paid planning upsell">
                <FeatureList items={["Timeline generation", "Budget split", "Vendor needs", "$19/mo premium path"]} />
              </Panel>
            </section>
            <MapAndGrowth gpsStatus={gpsStatus} detectGps={detectGps} />
          </>
        )}

        {section === "templates" && (
          <section className="card">
            <h3 className="text-3xl font-light">Global Template Engine</h3>
            <p className="mb-4 text-stone-500">Search and select event templates to power the builder.</p>
            <input value={templateSearch} onChange={(event) => setTemplateSearch(event.target.value)} placeholder="Search wedding, conference, BBQ, gala..." className="mb-4 w-full rounded-full border px-5 py-3 outline-none" />
            <div className="grid gap-2 md:grid-cols-4">
              {filteredTemplates.map((item) => (
                <button key={item} onClick={() => { setSelectedTemplate(item); setSection("builder"); }} className={`rounded-full border px-4 py-2 text-sm ${selectedTemplate === item ? "bg-stone-900 text-white" : "bg-white"}`}>
                  {item}
                </button>
              ))}
            </div>
          </section>
        )}

        {section === "builder" && (
          <section className="grid gap-6 lg:grid-cols-3">
            <div className="card">
              <p className="badge mb-3 inline-block">Selected Template</p>
              <h3 className="text-3xl font-light">{selectedTemplate}</h3>
              <label className="mt-4 block text-sm text-stone-500">Event Name</label>
              <input value={eventName} onChange={(e) => setEventName(e.target.value)} className="mt-1 w-full rounded-2xl border px-4 py-3" />
              <label className="mt-4 block text-sm text-stone-500">Budget</label>
              <input value={eventBudget} onChange={(e) => setEventBudget(e.target.value)} className="mt-1 w-full rounded-2xl border px-4 py-3" />
              <button onClick={() => setSection("ai")} className="btn primary mt-5 w-full">Generate AI Premium Plan</button>
            </div>
            <div className="lg:col-span-2 space-y-5">
              <Metrics values={[
                ["Budget Range", "$500 - $25K+"],
                ["Vendor Types", templateDetail.vendors.length],
                ["Checklist", templateDetail.checklist.length]
              ]} />
              <Panel title="Suggested Zones" subtitle="Event layout structure"><FeatureList items={templateDetail.zones} /></Panel>
              <Panel title="Checklist" subtitle="Core planning actions"><FeatureList items={templateDetail.checklist} /></Panel>
              <Panel title="Vendor Needs" subtitle="Marketplace matching targets"><FeatureList items={templateDetail.vendors} /></Panel>
            </div>
          </section>
        )}

        {section === "marketplace" && (
          <section className="card">
            <h3 className="text-3xl font-light">Marketplace Booking Flow</h3>
            <div className="mt-4 flex flex-col gap-3 md:flex-row">
              <input value={vendorSearch} onChange={(e) => setVendorSearch(e.target.value)} placeholder="Search vendors..." className="flex-1 rounded-full border px-5 py-3" />
              <select value={activeCategory} onChange={(e) => setActiveCategory(e.target.value)} className="rounded-full border bg-white px-5 py-3">
                {categories.map((category) => <option key={category}>{category}</option>)}
              </select>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredVendors.map((vendor) => <VendorCard key={vendor.name} vendor={vendor} createBooking={createBooking} />)}
            </div>
          </section>
        )}

        {section === "vendors" && (
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="card">
              <h3 className="text-3xl font-light">Vendor Join</h3>
              {["name", "service", "city", "price"].map((field) => (
                <div key={field}>
                  <label className="mt-4 block text-sm capitalize text-stone-500">{field}</label>
                  <input value={vendorForm[field]} onChange={(e) => setVendorForm({ ...vendorForm, [field]: e.target.value })} className="mt-1 w-full rounded-2xl border px-4 py-3" />
                </div>
              ))}
              <button onClick={addVendor} className="btn primary mt-5 w-full">Add Vendor Locally</button>
            </div>
            <Panel title="Vendor Revenue Plans" subtitle="Pre-backend pricing display">
              <div className="grid gap-3">
                {pricingPlans.slice(0, 3).map((plan) => <PlanCard key={plan.name} plan={plan} />)}
              </div>
            </Panel>
          </section>
        )}

        {section === "map" && <MapAndGrowth gpsStatus={gpsStatus} detectGps={detectGps} />}

        {section === "ai" && (
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="card">
              <h3 className="text-3xl font-light">AI Event Planner Premium</h3>
              <p className="mt-2 text-stone-500">Pre-backend AI output simulation. OpenAI connects in backend phase.</p>
              <button onClick={generateAiPlan} className="btn primary mt-5">Generate Premium Plan</button>
              <button className="btn ml-2 mt-5">Subscribe $19/mo</button>
            </div>
            <div className="card">
              <h3 className="text-2xl font-light">AI Output</h3>
              {aiOutput.length ? <FeatureList items={aiOutput} /> : <p className="mt-3 text-stone-500">No AI plan generated yet.</p>}
            </div>
          </section>
        )}

        {section === "plans" && (
          <section>
            <h3 className="mb-4 text-3xl font-light">Pricing Plans</h3>
            <div className="grid gap-4 md:grid-cols-4">
              {pricingPlans.map((plan) => <PlanCard key={plan.name} plan={plan} />)}
            </div>
          </section>
        )}

        {section === "investor" && (
          <section className="space-y-6">
            <div className="card">
              <p className="badge mb-3 inline-block">Transparent Investor Mode</p>
              <h3 className="text-4xl font-light">Scale without fake subscriber claims.</h3>
              <p className="mt-3 max-w-3xl text-stone-500">Metrics include platform capacity, projections, and simulated activity for demonstration. This does not represent verified paid users or audited revenue.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {tractionStats.map((stat) => (
                <div key={stat.label} className="card">
                  <p className="text-sm text-stone-500">{stat.label}</p>
                  <p className="mt-2 text-3xl font-light">{stat.value}</p>
                  <p className="mt-2 text-xs text-stone-400">{stat.note}</p>
                </div>
              ))}
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <Panel title="Live Activity Demo" subtitle="Simulated activity feed"><FeatureList items={activityFeed} /></Panel>
              <Panel title="Revenue Projections" subtitle="Vendor acquisition model">
                <FeatureList items={["5 vendors/day = 150 vendors/month", "20% Featured conversion target", "Projected MRR: $1,470/mo", "Annualized path: $17,640+", "At 1,800 vendors/year: $88,200 annual MRR if all Featured"]} />
              </Panel>
            </div>
          </section>
        )}

        {section === "bookings" && (
          <section className="card">
            <h3 className="text-3xl font-light">Bookings Dashboard</h3>
            {bookings.length ? (
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {bookings.map((booking) => (
                  <div key={booking.id} className="rounded-2xl border bg-white p-4">
                    <p className="font-medium">{booking.id}</p>
                    <p className="text-sm text-stone-500">{booking.vendor} · {booking.status}</p>
                    <p className="mt-2 text-sm">Amount: {booking.amount} · Commission: {booking.commission}</p>
                  </div>
                ))}
              </div>
            ) : <p className="mt-3 text-stone-500">No booking requests yet. Create one in Marketplace.</p>}
          </section>
        )}

        {section === "outreach" && (
          <section className="grid gap-6 lg:grid-cols-3">
            <Panel title="Vendor DM Script" subtitle="Manual outreach">
              <p className="text-stone-600">Hey — I launched GatherGenius to help people find vendors and send booking requests. I can list your business for free. Featured vendors get priority placement for $49/month. Want me to add you?</p>
            </Panel>
            <Panel title="Daily Workflow" subtitle="Acquisition routine"><FeatureList items={["Contact 20 vendors/day", "Add 5 vendors/day", "Pitch 1–2 Featured listings", "Track status in spreadsheet/CRM"]} /></Panel>
            <Panel title="Outreach Status" subtitle="Pre-backend mode"><FeatureList items={["No email sending yet", "No CRM database yet", "Automation connects after backend", "Safe manual workflow included"]} /></Panel>
          </section>
        )}

        <section className="card">
          <h3 className="mb-4 text-2xl font-light">Activity Feed</h3>
          <div className="grid gap-2 md:grid-cols-2">
            {activityFeed.slice(0, 6).map((item) => <div key={item} className="rounded-2xl border bg-white px-4 py-3 text-sm text-stone-600">• {item}</div>)}
          </div>
        </section>
      </div>
    </main>
  );
}

function Panel({ title, subtitle, children }) {
  return <div className="card"><h3 className="text-2xl font-light">{title}</h3><p className="mb-5 text-stone-500">{subtitle}</p>{children}</div>;
}

function Pill({ children }) {
  return <div className="rounded-full border bg-white px-4 py-2 text-sm text-stone-700">{children}</div>;
}

function FeatureList({ items }) {
  return <div className="mt-3 grid gap-2">{items.map((item) => <div key={item} className="rounded-2xl border bg-white px-4 py-3 text-sm">✓ {item}</div>)}</div>;
}

function VendorMiniList({ vendors, createBooking }) {
  return <div className="space-y-3">{vendors.map((vendor) => <VendorCard key={vendor.name} vendor={vendor} createBooking={createBooking} compact />)}</div>;
}

function VendorCard({ vendor, createBooking, compact = false }) {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <div className="flex justify-between gap-3">
        <div>
          <p className="font-medium">{vendor.name}</p>
          <p className="text-sm text-stone-500">{vendor.service} · {vendor.city}</p>
        </div>
        <span className="h-fit rounded-full bg-stone-100 px-3 py-1 text-xs">{vendor.badge}</span>
      </div>
      {!compact && <p className="mt-2 text-sm">{vendor.price} · Rating {vendor.rating}</p>}
      <button onClick={() => createBooking(vendor.name)} className="mt-3 rounded-full bg-stone-900 px-4 py-2 text-sm text-white">Request Booking</button>
    </div>
  );
}

function Metrics({ values }) {
  return <div className="grid gap-4 md:grid-cols-3">{values.map(([label, value]) => <div key={label} className="card"><p className="text-sm text-stone-500">{label}</p><p className="text-2xl font-light">{value}</p></div>)}</div>;
}

function MapAndGrowth({ gpsStatus, detectGps }) {
  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <div className="card">
        <h3 className="mb-4 text-2xl font-light">Real Map + GPS Preview</h3>
        <div className="relative h-72 rounded-3xl border bg-stone-200">
          {mapPins.map(([label, x, y]) => <Pin key={label} x={x} y={y} label={label} />)}
          <div className="absolute bottom-5 left-5 rounded-2xl bg-white px-4 py-3 text-sm shadow">{gpsStatus}</div>
        </div>
        <button onClick={detectGps} className="btn primary mt-4">Detect GPS Preview</button>
      </div>
      <div className="card">
        <h3 className="mb-4 text-2xl font-light">Investor Growth Engine</h3>
        <div className="grid grid-cols-2 gap-3">
          <Metric label="5 vendors/day" value="150/mo" />
          <Metric label="Featured target" value="20%" />
          <Metric label="Projected MRR" value="$1,470" />
          <Metric label="Annual path" value="$17.6K+" />
        </div>
        <div className="mt-4 rounded-2xl border bg-white p-4 text-xs text-stone-500">Metrics include platform capacity, projections, and simulated activity for demonstration. No fake paid subscriber claims.</div>
      </div>
    </section>
  );
}

function Pin({ x, y, label }) {
  return <div className="absolute rounded-full bg-stone-900 px-3 py-2 text-xs text-white shadow-xl" style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}>{label}</div>;
}

function Metric({ label, value }) {
  return <div className="rounded-2xl border bg-white p-4"><p className="text-2xl font-light">{value}</p><p className="text-sm text-stone-500">{label}</p></div>;
}

function PlanCard({ plan }) {
  return <div className="card"><p className="text-2xl font-light">{plan.name}</p><p className="mt-2 text-3xl">{plan.price}</p><FeatureList items={plan.details} /></div>;
}
