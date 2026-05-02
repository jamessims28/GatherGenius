"use client";

import React, { useMemo, useState } from "react";

const globalTemplates = [
  "Wedding Reception","Corporate Conference","Political Rally","Backyard BBQ","Luxury Gala","Music Festival",
  "Birthday Party","Baby Shower","Family Reunion","Graduation Party","Product Launch","Trade Show",
  "Charity Fundraiser","Town Hall","Food Festival","Pop-Up Shop","Wedding Ceremony","Engagement Party",
  "Networking Event","Fashion Show","Hackathon","Health Fair","Vendor Market","Grand Opening"
];

const initialVendors = [
  { name: "Elite Sound DJs", category: "Music & Concert", service: "DJ / Music", city: "Stafford, VA", price: "$350 - $900", badge: "Featured", rating: "4.9", plan: "Featured", email: "demo-dj@example.com" },
  { name: "Fresh Flame Catering", category: "Wedding", service: "Catering", city: "Fredericksburg, VA", price: "$15 - $45 / guest", badge: "Elite", rating: "4.8", plan: "Elite", email: "demo-catering@example.com" },
  { name: "Venue Luxe Hall", category: "Corporate", service: "Venue", city: "Stafford, VA", price: "$800 - $5,000", badge: "Featured", rating: "4.9", plan: "Featured", email: "demo-venue@example.com" },
  { name: "GlowPro Lighting", category: "Wedding", service: "Lighting / AV", city: "Washington, DC", price: "$300 - $1,500", badge: "Starter", rating: "4.7", plan: "Starter", email: "demo-lighting@example.com" },
  { name: "CivicStage Productions", category: "Political & Civic", service: "Stage / Civic Events", city: "Northern VA", price: "$1,500 - $7,500", badge: "Elite", rating: "4.6", plan: "Elite", email: "demo-stage@example.com" },
  { name: "Premier Event Rentals", category: "Family & BBQ", service: "Tents / Tables", city: "Richmond, VA", price: "$500 - $2,500", badge: "Featured", rating: "4.8", plan: "Featured", email: "demo-rentals@example.com" }
];

const categories = ["All","Wedding","Family & BBQ","Corporate","Music & Concert","Political & Civic","Sports","Luxury","Technology","Food & Beverage"];

const activityFeed = [
  "AI premium event plan generated","Vendor match simulated in Washington, DC","Wedding template selected",
  "Featured vendor revenue path calculated","GPS vendor search preview opened","Marketplace booking request simulated",
  "Investor projection viewed","Premium event template selected"
];

const tractionStats = [
  { label: "Platform Capacity", value: "1.18M+", note: "Transparent capacity / projection metric" },
  { label: "Global Templates", value: "177+", note: "Template library target" },
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

const sampleImport = [
  { name: "Golden Table Catering", category: "Wedding", service: "Catering", city: "Stafford, VA", price: "$20 - $60 / guest", email: "golden@example.com" },
  { name: "Premier Lens Studio", category: "Corporate", service: "Photography", city: "Washington, DC", price: "$500 - $2,000", email: "lens@example.com" },
  { name: "Luxury Tent Co", category: "Family & BBQ", service: "Tent Rentals", city: "Richmond, VA", price: "$300 - $3,000", email: "tent@example.com" }
];

const mapPins = [["DJ","25%","35%"],["Venue","60%","42%"],["Caterer","48%","68%"],["AV","78%","70%"]];

const toc = [
  ["overview", "Executive Overview"],
  ["business-model", "Business Model"],
  ["templates-section", "Template Engine"],
  ["marketplace-section", "Marketplace"],
  ["automation-section", "Automation"],
  ["investor-section", "Investor Metrics"]
];

async function postJson(path, body = {}) {
  const response = await fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  return response.json();
}

async function getJson(path) {
  const response = await fetch(path);
  return response.json();
}

function buildTemplateDetail() {
  return {
    zones: ["Arrival/check-in", "Main activity area", "Vendor/service area", "Food/beverage area", "Restrooms/support", "Safety/first aid"],
    checklist: ["Define purpose and audience", "Set date, time, location, and budget", "Book required vendors", "Create guest flow", "Prepare day-of timeline", "Confirm cleanup and follow-up"],
    vendors: ["Venue/space", "Planner/coordinator", "Catering", "AV or sound", "Photography", "Security/support"]
  };
}

export default function Page() {
  const [section, setSection] = useState("overview");
  const [templateSearch, setTemplateSearch] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("Wedding Reception");
  const [activeCategory, setActiveCategory] = useState("All");
  const [vendorSearch, setVendorSearch] = useState("");
  const [bookings, setBookings] = useState([]);
  const [vendorForm, setVendorForm] = useState({ name: "", service: "", city: "", price: "", email: "" });
  const [vendors, setVendors] = useState(initialVendors);
  const [eventName, setEventName] = useState("GatherGenius Event");
  const [eventBudget, setEventBudget] = useState("5200");
  const [aiOutput, setAiOutput] = useState([]);
  const [gpsStatus, setGpsStatus] = useState("GPS preview ready. Backend endpoints included.");
  const [systemStatus, setSystemStatus] = useState("Elite business model build ready.");
  const [mapResults, setMapResults] = useState([]);
  const [seoDraft, setSeoDraft] = useState(null);
  const [outreachLog, setOutreachLog] = useState([]);

  const templateDetail = buildTemplateDetail(selectedTemplate);
  const filteredTemplates = useMemo(() => globalTemplates.filter((item) => item.toLowerCase().includes(templateSearch.toLowerCase())), [templateSearch]);
  const filteredVendors = useMemo(() => vendors.filter((vendor) => {
    const matchCategory = activeCategory === "All" || vendor.category === activeCategory;
    const matchSearch = `${vendor.name} ${vendor.service} ${vendor.city} ${vendor.category}`.toLowerCase().includes(vendorSearch.toLowerCase());
    return matchCategory && matchSearch;
  }), [vendors, vendorSearch, activeCategory]);

  async function runSystemCheck() {
    const data = await getJson("/api/system-check");
    setSystemStatus(data.message || "System check complete.");
  }
  async function loadVendors() {
    const data = await getJson("/api/vendors/list");
    if (data.vendors?.length) {
      setVendors(data.vendors.map((vendor) => ({
        name: vendor.business_name || vendor.name,
        category: vendor.category || "Vendor",
        service: vendor.service || "Event Vendor",
        city: vendor.city || "Local Area",
        price: vendor.price_range || "Contact for pricing",
        badge: vendor.badge || "Saved",
        rating: vendor.rating || "New",
        plan: vendor.plan || "Starter",
        email: vendor.email || ""
      })));
    }
    setSystemStatus(data.message || `Vendor load complete (${data.mode || "live"}).`);
  }
  async function createBooking(vendorName) {
    const booking = { id: `BK-${bookings.length + 1001}`, vendor: vendorName, status: "Requested", amount: "$1,000", commission: "$100", amountNumber: 1000, commissionNumber: 100, eventName };
    setBookings((current) => [booking, ...current]);
    const data = await postJson("/api/bookings/create", { booking });
    setSystemStatus(data.message || "Booking request created.");
    setSection("bookings");
  }
  async function addVendor() {
    if (!vendorForm.name.trim()) return;
    const vendor = { ...vendorForm, category: activeCategory === "All" ? "Wedding" : activeCategory, badge: "New", rating: "New", plan: "Starter" };
    setVendors((current) => [vendor, ...current]);
    setVendorForm({ name: "", service: "", city: "", price: "", email: "" });
    const data = await postJson("/api/vendors/create", { vendor });
    setSystemStatus(data.message || "Vendor added.");
    setSection("marketplace");
  }
  async function bulkImportVendors() {
    setVendors((current) => [...sampleImport.map((v) => ({...v, badge: "Imported", rating: "New", plan: "Starter"})), ...current]);
    const data = await postJson("/api/vendors/import", { vendors: sampleImport });
    setSystemStatus(data.message || "Bulk vendor import complete.");
  }
  async function saveEvent() {
    const data = await postJson("/api/events/create", { eventName, selectedTemplate, eventBudget });
    setSystemStatus(data.message || "Event saved.");
  }
  async function generateAiPlan() {
    const data = await postJson("/api/ai/plan", { eventName, selectedTemplate, eventBudget });
    setAiOutput(data.plan || []);
    setSystemStatus(data.message || "AI plan generated.");
  }
  async function startCheckout(plan) {
    if (plan.name === "Starter") { setSystemStatus("Starter selected. No checkout needed."); return; }
    const data = await postJson("/api/stripe/checkout", { plan: plan.name });
    setSystemStatus(data.message || "Checkout route called.");
    if (data.url) window.location.href = data.url;
  }
  async function searchNearby() {
    const data = await postJson("/api/maps/nearby", { query: "event vendors near Stafford VA" });
    setMapResults(data.results || []);
    setGpsStatus(data.message || "Nearby search complete.");
  }
  async function generateSeoPage() {
    const data = await postJson("/api/seo/generate", { city: "Stafford VA", category: activeCategory === "All" ? "event vendors" : activeCategory });
    setSeoDraft(data.page);
    setSystemStatus(data.message || "SEO draft generated.");
  }
  async function sendOutreach(vendor) {
    const message = `Hey ${vendor.name} — I launched GatherGenius to help people find event vendors and send booking requests. I can list your business for free. Featured placement is available for $49/month. Want me to add you?`;
    const data = await postJson("/api/outreach/send", { vendor, message });
    setOutreachLog((current) => [{ vendor: vendor.name, message: data.message }, ...current]);
    setSystemStatus(data.message || "Outreach prepared.");
  }

  async function sendInvestorOutreach() {
    const investor = { name: "Investor", email: "investor@example.com", company: "Demo Capital" };
    const data = await postJson("/api/outreach/investor", { investor });
    setOutreachLog((current) => [{ vendor: "Investor Demo", message: data.message }, ...current]);
    setSystemStatus(data.message || "Investor outreach prepared.");
  }

  async function generateOutreachSequence(audience = "vendor") {
    const data = await postJson("/api/outreach/sequence", { audience });
    setOutreachLog((current) => [{ vendor: audience === "investor" ? "Investor Sequence" : "Vendor Sequence", message: data.message }, ...current]);
    setSystemStatus(data.message || "Outreach sequence generated.");
  }

  function detectGps() {
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setGpsStatus("GPS permission detected. Use nearby search for Places results."),
        () => setGpsStatus("GPS permission blocked or unavailable. Preview map still active.")
      );
    } else setGpsStatus("GPS not available in this browser. Preview map still active.");
  }

  const nav = [
    ["overview","Overview"],["business","Business Model"],["templates","Templates"],["builder","Builder"],
    ["marketplace","Marketplace"],["vendors","Vendor Join"],["automation","Automation"],["map","Map + GPS"],
    ["ai","AI Premium"],["plans","Pricing"],["investor","Investor"],["bookings","Bookings"],["outreach","Outreach"]
  ];

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="hero-card flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="orb" />
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-500">Elite Business Model Build</p>
              <h1 className="text-4xl font-light">GatherGenius</h1>
              <p className="text-stone-500">AI event marketplace + vendor revenue engine</p>
              <p className="mt-2 text-xs text-stone-500">{systemStatus}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {nav.map(([key,label]) => <button key={key} onClick={() => setSection(key)} className={`btn ${section === key ? "primary" : ""}`}>{label}</button>)}
            <button onClick={runSystemCheck} className="btn">System Check</button>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-12">
          <aside className="elite-card lg:col-span-3 h-fit sticky top-6">
            <p className="badge mb-4 inline-block">Table of Contents</p>
            <div className="grid gap-2">
              {toc.map(([id,label]) => <a key={id} href={`#${id}`} className="rounded-2xl border bg-white px-4 py-3 text-sm hover:bg-[#fbfaf7]">{label}</a>)}
            </div>
            <div className="mt-5 rounded-2xl border bg-white p-4 text-xs text-stone-500">
              Elite presentation mode with soft-white glass styling, dropdowns, borders, business model table, automation routes, and investor-safe metrics.
            </div>
          </aside>

          <div className="lg:col-span-9 space-y-6">
            <section id="overview" className="hero-card">
              <p className="badge mb-4 inline-block">Soft white elite platform</p>
              <h2 className="text-5xl font-light leading-tight">Plan any event. Match vendors. Automate growth.</h2>
              <p className="mt-5 max-w-3xl text-lg text-stone-600">
                Premium business-grade event marketplace with templates, vendor acquisition, booking flow, AI premium planning, payment routes, SEO generation, outreach automation, investor metrics, and revenue projections.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={() => setSection("automation")} className="btn primary">Open Automation</button>
                <button onClick={() => setSection("investor")} className="btn">View Investor Dashboard</button>
              </div>
            </section>

            <section id="business-model" className="elite-card">
              <h3 className="text-3xl font-light">Business Model</h3>
              <p className="mt-2 text-stone-500">Multiple revenue channels in one marketplace system.</p>
              <div className="mt-5 overflow-x-auto rounded-3xl border bg-white">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#fbfaf7]">
                    <tr>
                      <th className="border-b p-4">Revenue Stream</th>
                      <th className="border-b p-4">Price</th>
                      <th className="border-b p-4">Customer</th>
                      <th className="border-b p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Featured Vendor", "$49/mo", "Local vendors", "Stripe route ready"],
                      ["Elite Vendor", "$149/mo", "High-value vendors", "Stripe route ready"],
                      ["AI Premium Planner", "$19/mo", "Event planners/users", "OpenAI route ready"],
                      ["Booking Commission", "10% model", "Completed bookings", "Supabase route ready"],
                      ["Sponsored Placement", "Custom", "Brands/vendors", "Manual launch ready"]
                    ].map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell) => <td key={cell} className="border-b p-4">{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="grid gap-6 md:grid-cols-2">
              <Dropdown title="Executive Summary" open>
                GatherGenius is positioned as a premium event marketplace that combines event planning templates, vendor discovery, AI planning, booking flow, and vendor monetization.
              </Dropdown>
              <Dropdown title="Automation Strategy">
                Automations include bulk vendor import, outreach email route, SEO draft generation, AI event plan generation, map search, and checkout routing.
              </Dropdown>
              <Dropdown title="Revenue Strategy">
                Initial revenue comes from Featured and Elite vendor subscriptions, AI Premium, booking commissions, sponsored placements, and later lead-selling.
              </Dropdown>
              <Dropdown title="Compliance Positioning">
                Scale metrics are presented as capacity, projection, or simulated activity. No fake paid subscribers or verified active user claims.
              </Dropdown>
            </section>
          </div>
        </section>

        {section === "overview" && (
          <>
            <section className="grid gap-6 lg:grid-cols-3">
              <Panel title="Global Templates" subtitle="177+ platform target"><div className="grid grid-cols-2 gap-2">{globalTemplates.slice(0,8).map((item) => <Pill key={item}>{item}</Pill>)}</div></Panel>
              <Panel title="Marketplace" subtitle="Vendor discovery + booking"><VendorMiniList vendors={vendors.slice(0,3)} createBooking={createBooking} /></Panel>
              <Panel title="AI Premium" subtitle="Paid planning upsell"><FeatureList items={["Timeline generation","Budget split","Vendor needs","$19/mo premium path"]} /></Panel>
            </section>
            <MapAndGrowth gpsStatus={gpsStatus} detectGps={detectGps} searchNearby={searchNearby} mapResults={mapResults} />
          </>
        )}

        {section === "business" && <BusinessDeepDive />}

        {section === "templates" && (
          <section id="templates-section" className="card">
            <h3 className="text-3xl font-light">Global Template Engine</h3>
            <input value={templateSearch} onChange={(event) => setTemplateSearch(event.target.value)} placeholder="Search wedding, conference, BBQ, gala..." className="my-4 w-full rounded-full border px-5 py-3 outline-none" />
            <div className="grid gap-2 md:grid-cols-4">{filteredTemplates.map((item) => <button key={item} onClick={() => {setSelectedTemplate(item); setSection("builder");}} className={`rounded-full border px-4 py-2 text-sm ${selectedTemplate === item ? "bg-stone-900 text-white" : "bg-white"}`}>{item}</button>)}</div>
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
              <button onClick={saveEvent} className="btn mt-5 w-full">Save Event</button>
              <button onClick={() => setSection("ai")} className="btn primary mt-3 w-full">Generate AI Premium Plan</button>
            </div>
            <div className="lg:col-span-2 space-y-5">
              <Metrics values={[["Budget Range","$500 - $25K+"],["Vendor Types",templateDetail.vendors.length],["Checklist",templateDetail.checklist.length]]} />
              <Panel title="Suggested Zones" subtitle="Event layout structure"><FeatureList items={templateDetail.zones} /></Panel>
              <Panel title="Checklist" subtitle="Core planning actions"><FeatureList items={templateDetail.checklist} /></Panel>
              <Panel title="Vendor Needs" subtitle="Marketplace matching targets"><FeatureList items={templateDetail.vendors} /></Panel>
            </div>
          </section>
        )}

        {section === "marketplace" && (
          <section id="marketplace-section" className="card">
            <h3 className="text-3xl font-light">Marketplace Booking Flow</h3>
            <div className="mt-4 flex flex-col gap-3 md:flex-row">
              <input value={vendorSearch} onChange={(e) => setVendorSearch(e.target.value)} placeholder="Search vendors..." className="flex-1 rounded-full border px-5 py-3" />
              <select value={activeCategory} onChange={(e) => setActiveCategory(e.target.value)} className="rounded-full border bg-white px-5 py-3">{categories.map((category) => <option key={category}>{category}</option>)}</select>
              <button onClick={loadVendors} className="btn">Load Vendors</button>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filteredVendors.map((vendor) => <VendorCard key={vendor.name} vendor={vendor} createBooking={createBooking} sendOutreach={sendOutreach} />)}</div>
          </section>
        )}

        {section === "vendors" && (
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="card">
              <h3 className="text-3xl font-light">Vendor Join</h3>
              {["name","service","city","price","email"].map((field) => <div key={field}><label className="mt-4 block text-sm capitalize text-stone-500">{field}</label><input value={vendorForm[field]} onChange={(e) => setVendorForm({...vendorForm, [field]: e.target.value})} className="mt-1 w-full rounded-2xl border px-4 py-3" /></div>)}
              <button onClick={addVendor} className="btn primary mt-5 w-full">Add Vendor</button>
            </div>
            <Panel title="Vendor Revenue Plans" subtitle="Stripe route connected"><div className="grid gap-3">{pricingPlans.slice(0,3).map((plan) => <PlanCard key={plan.name} plan={plan} startCheckout={startCheckout} />)}</div></Panel>
          </section>
        )}

        {section === "automation" && (
          <section id="automation-section" className="grid gap-6 lg:grid-cols-3">
            <Panel title="Vendor Import" subtitle="Bulk import scaffold"><button onClick={bulkImportVendors} className="btn primary">Import Sample Vendors</button><FeatureList items={["CSV template included","Supabase bulk route ready","Fallback mode works without keys"]} /></Panel>
            <Panel title="Outreach Automation" subtitle="Vendors + investors"><div className="flex flex-wrap gap-2 mb-3"><button onClick={() => generateOutreachSequence("vendor")} className="btn">Vendor Sequence</button><button onClick={() => generateOutreachSequence("investor")} className="btn">Investor Sequence</button><button onClick={sendInvestorOutreach} className="btn primary">Investor Pitch Demo</button></div><FeatureList items={["Vendor email route included","Investor email route included","Follow-up sequence generator","Safe preview mode until Resend is connected"]} /></Panel>
            <Panel title="SEO Generator" subtitle="Local SEO page drafts"><button onClick={generateSeoPage} className="btn primary">Generate SEO Draft</button>{seoDraft && <div className="mt-4 rounded-2xl border bg-white p-4 text-sm"><p className="font-medium">{seoDraft.title}</p><p className="text-stone-500">{seoDraft.slug}</p><p>{seoDraft.description}</p></div>}</Panel>
            <div className="card lg:col-span-3"><h3 className="text-2xl font-light">Outreach Log</h3>{outreachLog.length ? outreachLog.map((item, i) => <div className="mt-2 rounded-2xl border bg-white p-3 text-sm" key={i}>{item.vendor}: {item.message}</div>) : <p className="mt-3 text-stone-500">No outreach sent yet. Use vendor cards in Marketplace.</p>}</div>
          </section>
        )}

        {section === "map" && <MapAndGrowth gpsStatus={gpsStatus} detectGps={detectGps} searchNearby={searchNearby} mapResults={mapResults} />}

        {section === "ai" && (
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="card"><h3 className="text-3xl font-light">AI Event Planner Premium</h3><p className="mt-2 text-stone-500">OpenAI route connected with fallback mode.</p><button onClick={generateAiPlan} className="btn primary mt-5">Generate Premium Plan</button><button onClick={() => startCheckout({name:"AI Premium"})} className="btn ml-2 mt-5">Subscribe $19/mo</button></div>
            <div className="card"><h3 className="text-2xl font-light">AI Output</h3>{aiOutput.length ? <FeatureList items={aiOutput} /> : <p className="mt-3 text-stone-500">No AI plan generated yet.</p>}</div>
          </section>
        )}

        {section === "plans" && <section><h3 className="mb-4 text-3xl font-light">Pricing Plans</h3><div className="grid gap-4 md:grid-cols-4">{pricingPlans.map((plan) => <PlanCard key={plan.name} plan={plan} startCheckout={startCheckout} />)}</div></section>}

        {section === "investor" && (
          <section id="investor-section" className="space-y-6">
            <div className="card"><p className="badge mb-3 inline-block">Transparent Investor Mode</p><h3 className="text-4xl font-light">Scale without fake subscriber claims.</h3><p className="mt-3 max-w-3xl text-stone-500">Metrics include platform capacity, projections, and simulated activity for demonstration. This does not represent verified paid users or audited revenue.</p></div>
            <div className="grid gap-4 md:grid-cols-3">{tractionStats.map((stat) => <div key={stat.label} className="card"><p className="text-sm text-stone-500">{stat.label}</p><p className="mt-2 text-3xl font-light">{stat.value}</p><p className="mt-2 text-xs text-stone-400">{stat.note}</p></div>)}</div>
            <div className="grid gap-6 lg:grid-cols-2"><Panel title="Live Activity Demo" subtitle="Simulated activity feed"><FeatureList items={activityFeed} /></Panel><Panel title="Revenue Projections" subtitle="Vendor acquisition model"><FeatureList items={["5 vendors/day = 150 vendors/month","20% Featured conversion target","Projected MRR: $1,470/mo","Annualized path: $17,640+","At 1,800 vendors/year: $88,200 annual MRR if all Featured"]} /></Panel></div>
          </section>
        )}

        {section === "bookings" && <section className="card"><h3 className="text-3xl font-light">Bookings Dashboard</h3>{bookings.length ? <div className="mt-4 grid gap-3 md:grid-cols-2">{bookings.map((booking) => <div key={booking.id} className="metric-tile"><p className="font-medium">{booking.id}</p><p className="text-sm text-stone-500">{booking.vendor} · {booking.status}</p><p className="mt-2 text-sm">Amount: {booking.amount} · Commission: {booking.commission}</p></div>)}</div> : <p className="mt-3 text-stone-500">No booking requests yet. Create one in Marketplace.</p>}</section>}

        {section === "outreach" && <section className="grid gap-6 lg:grid-cols-3"><Panel title="Vendor DM Script" subtitle="Manual outreach"><p className="text-stone-600">Hey — I launched GatherGenius to help people find vendors and send booking requests. I can list your business for free. Featured vendors get priority placement for $49/month. Want me to add you?</p></Panel><Panel title="Daily Workflow" subtitle="Acquisition routine"><FeatureList items={["Contact 20 vendors/day","Add 5 vendors/day","Pitch 1–2 Featured listings","Track status in spreadsheet/CRM"]} /></Panel><Panel title="Outreach Status" subtitle="Automation-ready mode"><FeatureList items={["Vendor email route included","Investor email route included","Outreach sequence generator","SEO generator included"]} /></Panel></section>}

        <section className="card"><h3 className="mb-4 text-2xl font-light">Activity Feed</h3><div className="grid gap-2 md:grid-cols-2">{activityFeed.slice(0,6).map((item) => <div key={item} className="rounded-2xl border bg-white px-4 py-3 text-sm text-stone-600">• {item}</div>)}</div></section>
      </div>
    </main>
  );
}

function BusinessDeepDive() {
  return (
    <section className="grid gap-6 lg:grid-cols-3">
      <Panel title="Customer Segments" subtitle="Who pays"><FeatureList items={["Local vendors","Venues","Event planners","Consumers planning events","Sponsors"]} /></Panel>
      <Panel title="Core Value" subtitle="Why they pay"><FeatureList items={["Booking visibility","Lead flow","AI planning","Faster vendor matching","Premium placement"]} /></Panel>
      <Panel title="Expansion" subtitle="Scale paths"><FeatureList items={["SEO city pages","Vendor imports","Automated outreach","Mobile app","Affiliate/referral system"]} /></Panel>
    </section>
  );
}

function Dropdown({ title, children, open = false }) {
  return (
    <details className="card panel-border" open={open}>
      <summary className="flex cursor-pointer items-center justify-between text-xl font-light">
        {title}
        <span className="rounded-full border px-3 py-1 text-xs">Open</span>
      </summary>
      <div className="mt-4 text-stone-600">{children}</div>
    </details>
  );
}
function Panel({title, subtitle, children}) { return <div className="card panel-border"><h3 className="text-2xl font-light">{title}</h3><p className="mb-5 text-stone-500">{subtitle}</p>{children}</div>; }
function Pill({children}) { return <div className="rounded-full border bg-white/90 px-4 py-2 text-sm text-stone-700 shadow-sm">{children}</div>; }
function FeatureList({items}) { return <div className="mt-3 grid gap-2">{items.map((item) => <div key={item} className="rounded-2xl border bg-white/90 px-4 py-3 text-sm">✓ {item}</div>)}</div>; }
function VendorMiniList({vendors, createBooking}) { return <div className="space-y-3">{vendors.map((vendor) => <VendorCard key={vendor.name} vendor={vendor} createBooking={createBooking} compact />)}</div>; }
function VendorCard({vendor, createBooking, sendOutreach, compact = false}) { return <div className="metric-tile"><div className="flex justify-between gap-3"><div><p className="font-medium">{vendor.name}</p><p className="text-sm text-stone-500">{vendor.service} · {vendor.city}</p></div><span className="h-fit rounded-full bg-stone-100 px-3 py-1 text-xs">{vendor.badge}</span></div>{!compact && <p className="mt-2 text-sm">{vendor.price} · Rating {vendor.rating}</p>}<div className="mt-3 flex gap-2 flex-wrap"><button onClick={() => createBooking(vendor.name)} className="rounded-full bg-stone-900 px-4 py-2 text-sm text-white">Request Booking</button>{sendOutreach && <button onClick={() => sendOutreach(vendor)} className="rounded-full border bg-white px-4 py-2 text-sm">Send Outreach</button>}</div></div>; }
function Metrics({values}) { return <div className="grid gap-4 md:grid-cols-3">{values.map(([label,value]) => <div key={label} className="card"><p className="text-sm text-stone-500">{label}</p><p className="text-2xl font-light">{value}</p></div>)}</div>; }
function MapAndGrowth({gpsStatus, detectGps, searchNearby, mapResults}) { return <section className="grid gap-6 lg:grid-cols-2"><div className="card"><h3 className="mb-4 text-2xl font-light">Real Map + GPS</h3><div className="relative h-72 rounded-3xl border lux-map">{mapPins.map(([label,x,y]) => <Pin key={label} x={x} y={y} label={label} />)}<div className="absolute bottom-5 left-5 rounded-2xl bg-white px-4 py-3 text-sm shadow">{gpsStatus}</div></div><div className="mt-4 flex gap-2 flex-wrap"><button onClick={detectGps} className="btn primary">Detect GPS</button><button onClick={searchNearby} className="btn">Search Nearby Vendors</button></div>{mapResults?.length > 0 && <div className="mt-4 grid gap-2">{mapResults.map((place) => <div key={place.name} className="rounded-2xl border bg-white/90 p-3 text-sm">{place.name} — {place.address}</div>)}</div>}</div><div className="card"><h3 className="mb-4 text-2xl font-light">Investor Growth Engine</h3><div className="grid grid-cols-2 gap-3"><Metric label="5 vendors/day" value="150/mo" /><Metric label="Featured target" value="20%" /><Metric label="Projected MRR" value="$1,470" /><Metric label="Annual path" value="$17.6K+" /></div><div className="mt-4 rounded-2xl border bg-white p-4 text-xs text-stone-500">Metrics include platform capacity, projections, and simulated activity for demonstration. No fake paid subscriber claims.</div></div></section>; }
function Pin({x,y,label}) { return <div className="absolute rounded-full bg-stone-900 px-3 py-2 text-xs text-white shadow-xl" style={{left:x,top:y,transform:"translate(-50%, -50%)"}}>{label}</div>; }
function Metric({label,value}) { return <div className="metric-tile"><p className="text-2xl font-light">{value}</p><p className="text-sm text-stone-500">{label}</p></div>; }
function PlanCard({plan,startCheckout}) { return <div className="card panel-border"><p className="text-2xl font-light">{plan.name}</p><p className="mt-2 text-3xl">{plan.price}</p><FeatureList items={plan.details} /><button onClick={() => startCheckout(plan)} className="btn primary mt-4 w-full">{plan.name === "Starter" ? "Select Starter" : "Checkout"}</button></div>; }
