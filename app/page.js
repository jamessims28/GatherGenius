"use client";

import React, { useMemo, useState } from "react";
import {
  Sparkles, LayoutDashboard, CalendarDays, CreditCard, Users, Store, Ticket,
  QrCode, BarChart3, FileSignature, Upload, Brain, ShieldCheck, Search, Bell,
  CheckCircle2, Wallet, TrendingUp, Mail, Crown, Plus, ChevronDown
} from "lucide-react";

const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME || "LMH Enterprise LLC";
const heroImage = "dashboard-preview-1.png";

const initialGuests = ["Tanya","Tyronne","Joshua","James","Nicole","Calvin","Lori","Jonathan","Jason","Justin"].map((name, i) => ({
  name,
  email: "",
  rsvp: i < 4 ? "Yes" : "Pending",
  paid: i < 3,
  ticket: `GG-${name.toUpperCase()}-${1000+i}`
}));

const initialVendors = [
  { name:"Elite Sound DJs", category:"DJ / Music", price:"$350 - $900", booked:false },
  { name:"Premier Event Rentals", category:"Rentals", price:"$500 - $2,500", booked:false },
  { name:"Fresh Flame Catering", category:"Catering", price:"$15 - $45 per guest", booked:false },
  { name:"GlowPro Lighting", category:"Lighting / AV", price:"$300 - $1,500", booked:false },
  { name:"SafeGuard Event Security", category:"Security", price:"$40 - $85/hr", booked:false },
  { name:"CleanSweep Cleanup", category:"Cleanup", price:"$250 - $900", booked:false }
];

const initialItems = [
  { category:"Food", item:"Food stations and beverages", vendor:"Caterer / Costco / Sam's Club", cost:1850, status:"Estimate" },
  { category:"Games", item:"Cornhole, trivia, cards, kids games", vendor:"Retail / Rental", cost:450, status:"Estimate" },
  { category:"DJ", item:"DJ booth, emcee, music, announcements", vendor:"Local DJ", cost:350, status:"Quoted" },
  { category:"Lighting", item:"Uplighting, dance lights, pathway lighting", vendor:"Event rental", cost:300, status:"Needs quote" },
  { category:"Sound", item:"Speakers, microphones, mixer, projector", vendor:"AV vendor", cost:500, status:"Needs quote" },
  { category:"Venue", item:"Park, hall, field, arena, banquet room", vendor:"Venue", cost:800, status:"Needs quote" },
  { category:"Hotels", item:"Nearby hotels and room blocks", vendor:"Nearby hotels", cost:1200, status:"Optional" },
  { category:"Safety", item:"First aid, security, accessibility", vendor:"Safety / Security", cost:550, status:"Recommended" },
  { category:"Cleanup", item:"Trash, recycling, cleanup crew", vendor:"Cleanup vendor", cost:350, status:"Required" },
  { category:"Permits", item:"Permits and insurance", vendor:"Local government / insurer", cost:400, status:"Recommended" }
];

function money(v) {
  return new Intl.NumberFormat("en-US", { style:"currency", currency:"USD" }).format(Number(v || 0));
}

export default function Page() {
  const [tab, setTab] = useState("dashboard");
  const [guests, setGuests] = useState(initialGuests);
  const [vendors, setVendors] = useState(initialVendors);
  const [items, setItems] = useState(initialItems);
  const [eventName, setEventName] = useState("Johnson Family Event");
  const [location, setLocation] = useState("Stafford, Virginia");
  const [eventDate, setEventDate] = useState("August 22, 2026");
  const [status, setStatus] = useState("True final calm app build ready.");
  const [missing, setMissing] = useState(["Run the AI Missing Items Checker to audit this event."]);

  const total = useMemo(() => items.reduce((s, r) => s + Number(r.cost || 0), 0), [items]);
  const paidCount = guests.filter(g => g.paid).length;
  const rsvpYes = guests.filter(g => g.rsvp === "Yes").length;
  const collected = paidCount * (guests.length ? total / guests.length : 0);
  const platformFee = collected * 0.10;
  const bookedVendors = vendors.filter(v => v.booked).length;

  const tabs = [
    ["dashboard", LayoutDashboard, "Dashboard"],
    ["ai", Brain, "AI Planner"],
    ["guests", Users, "Guests"],
    ["vendors", Store, "Vendors"],
    ["tickets", Ticket, "Tickets"],
    ["analytics", BarChart3, "Analytics"],
    ["legal", FileSignature, "Legal"],
    ["redeploy", Upload, "Redeploy"]
  ];

  async function call(path, body) {
    const res = await fetch(path, {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify(body)
    });
    const data = await res.json();
    setStatus(data.message || "Route called.");
    return data;
  }

  async function checkout(amount, description, guestName) {
    const data = await call("/api/payments/checkout", { amount, description, businessName, guestName });
    if (data.url) window.location.href = data.url;
  }

  async function runMissingCheck() {
    const data = await call("/api/ai/missing-items", { items, guests, vendors, eventName, location, eventDate });
    setMissing(data.missing || missing);
  }

  async function saveEvent() {
    await call("/api/events/save", { eventName, location, eventDate, businessName, guests, vendors, items });
  }

  return (
    <main className="min-h-screen text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden lg:flex w-72 shrink-0 flex-col border-r border-slate-200/80 bg-white/70 backdrop-blur-xl px-5 py-6">
          <Logo />
          <nav className="mt-9 space-y-2">
            {tabs.map(([key, Icon, label]) => (
              <button key={key} onClick={() => setTab(key)} className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${tab === key ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-slate-600 hover:bg-slate-100"}`}>
                <Icon className="h-5 w-5" />{label}
              </button>
            ))}
          </nav>
          <div className="mt-auto rounded-3xl border border-slate-200 bg-white p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-indigo-50 p-3"><Crown className="h-5 w-5 text-indigo-600" /></div>
              <div><p className="font-semibold">Premium Plan</p><p className="text-xs text-slate-500">LMH Enterprise LLC</p></div>
            </div>
          </div>
        </aside>

        <section className="flex-1">
          <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/65 backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 px-6 lg:px-10 py-5">
              <div className="lg:hidden"><Logo compact /></div>
              <div className="hidden md:flex max-w-xl flex-1 items-center gap-3 rounded-3xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
                <Search className="h-5 w-5 text-slate-400" />
                <input placeholder="Search events, guests, vendors..." className="w-full bg-transparent outline-none text-sm text-slate-600" />
              </div>
              <div className="flex items-center gap-3">
                <button className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"><Bell className="h-5 w-5 text-slate-600" /></button>
                <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white text-sm">LMH</div>
                  <div className="hidden sm:block"><p className="text-sm font-semibold">{businessName}</p><p className="text-xs text-slate-500">Administrator</p></div>
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                </div>
              </div>
            </div>
          </header>

          <div className="px-6 lg:px-10 py-8">
            {tab === "dashboard" && (
              <DashboardView eventName={eventName} setEventName={setEventName} location={location} setLocation={setLocation} eventDate={eventDate} setEventDate={setEventDate} total={total} collected={collected} platformFee={platformFee} rsvpYes={rsvpYes} bookedVendors={bookedVendors} heroImage={heroImage} saveEvent={saveEvent} setTab={setTab} />
            )}

            {tab === "ai" && (
              <Panel title="AI Planner" icon={Brain} subtitle="Plan My Event and Missing Items Checker">
                <div className="grid lg:grid-cols-2 gap-5">
                  <Card><div className="flex gap-4"><div className="rounded-3xl bg-indigo-50 p-4 h-fit"><Sparkles className="text-indigo-600" /></div><div><h3 className="text-xl font-semibold">AI Plan My Event</h3><p className="text-slate-500 mt-2">Generate budget, timeline, checklist, vendor ideas, and layout recommendations.</p><button onClick={() => call("/api/ai/plan", { items, guests, vendors })} className="mt-5 rounded-2xl bg-indigo-600 text-white px-5 py-3 font-semibold">Generate Plan</button></div></div></Card>
                  <Card><div className="flex gap-4"><div className="rounded-3xl bg-emerald-50 p-4 h-fit"><ShieldCheck className="text-emerald-600" /></div><div><h3 className="text-xl font-semibold">Missing Items Checker</h3><p className="text-slate-500 mt-2">Find gaps before booking vendors or collecting payments.</p><button onClick={runMissingCheck} className="mt-5 rounded-2xl bg-emerald-100 text-emerald-800 px-5 py-3 font-semibold">Check Now</button></div></div></Card>
                </div>
                <div className="mt-5 grid gap-3">{missing.map((m, i) => <div key={i} className="rounded-2xl border border-slate-200 bg-white p-4 flex gap-3"><CheckCircle2 className="text-emerald-600 shrink-0" /> <p className="text-slate-600">{m}</p></div>)}</div>
              </Panel>
            )}

            {tab === "guests" && (
              <Panel title="Guests, RSVP, and Payments" icon={Users} subtitle="Invite guests, track RSVP, and collect split payments.">
                <div className="mb-5 grid md:grid-cols-4 gap-4">
                  <MetricCard icon={Users} label="Guests" value={guests.length} />
                  <MetricCard icon={CheckCircle2} label="RSVP Yes" value={rsvpYes} />
                  <MetricCard icon={CreditCard} label="Paid" value={paidCount} />
                  <MetricCard icon={Wallet} label="Split Amount" value={money(total / guests.length)} />
                </div>
                <div className="grid gap-3">
                  {guests.map((g, idx) => (
                    <div key={g.name} className="grid lg:grid-cols-6 gap-3 items-center rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div><p className="font-semibold">{g.name}</p><p className="text-xs text-slate-500">{g.rsvp} · {g.paid ? "Paid" : "Unpaid"}</p></div>
                      <input value={g.email} onChange={e => setGuests(prev => prev.map((x, i) => i === idx ? {...x, email:e.target.value} : x))} placeholder="email" className="lg:col-span-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none" />
                      <button onClick={() => setGuests(prev => prev.map(x => x.name === g.name ? {...x, rsvp:"Yes"} : x))} className="rounded-2xl bg-emerald-50 text-emerald-700 px-4 py-3 font-semibold">RSVP</button>
                      <button onClick={() => call("/api/invitations/send", { guest:g, eventName, eventDate, location })} className="rounded-2xl bg-slate-100 text-slate-700 px-4 py-3 font-semibold">Invite</button>
                      <button onClick={() => checkout(Math.round((total / guests.length) * 100), "Guest Contribution", g.name)} className="rounded-2xl bg-indigo-600 text-white px-4 py-3 font-semibold">Pay Link</button>
                    </div>
                  ))}
                </div>
              </Panel>
            )}

            {tab === "vendors" && (
              <Panel title="Vendor Marketplace" icon={Store} subtitle="Book vendors, start Stripe Connect onboarding, and prepare payout flows.">
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {vendors.map(v => (
                    <Card key={v.name}>
                      <div className="flex items-start justify-between gap-3"><div><h3 className="text-lg font-semibold">{v.name}</h3><p className="text-sm text-indigo-600 mt-1">{v.category}</p></div><div className={`rounded-full px-3 py-1 text-xs ${v.booked ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{v.booked ? "Booked" : "Available"}</div></div>
                      <p className="text-slate-500 mt-4">{v.price}</p>
                      <div className="grid grid-cols-2 gap-3 mt-5"><button onClick={() => call("/api/vendors/connect-onboard", {vendor:v, businessName})} className="rounded-2xl bg-slate-100 px-4 py-3 font-semibold text-slate-700">Connect</button><button onClick={() => setVendors(prev => prev.map(x => x.name === v.name ? {...x, booked:true} : x))} className="rounded-2xl bg-indigo-600 px-4 py-3 font-semibold text-white">Book</button></div>
                    </Card>
                  ))}
                </div>
              </Panel>
            )}

            {tab === "tickets" && (
              <Panel title="QR Ticketing" icon={Ticket} subtitle="Ticket IDs and check-in route scaffold.">
                <div className="grid gap-3">
                  {guests.map(g => (
                    <div key={g.ticket} className="grid md:grid-cols-4 gap-3 items-center rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                      <p className="font-semibold">{g.name}</p><p className="font-mono text-indigo-600"><QrCode className="inline h-4 w-4 mr-2" />{g.ticket}</p><p className={g.paid ? "text-emerald-600" : "text-slate-500"}>{g.paid ? "Paid" : "Unpaid"}</p><button onClick={() => call("/api/tickets/scan", { ticket:g.ticket, guest:g })} className="rounded-2xl bg-slate-100 px-4 py-3 font-semibold text-slate-700">Scan Ticket</button>
                    </div>
                  ))}
                </div>
              </Panel>
            )}

            {tab === "analytics" && (
              <Panel title="Admin Analytics" icon={BarChart3} subtitle="Owner view for revenue, RSVP, vendor activity, and platform fees.">
                <div className="grid md:grid-cols-3 xl:grid-cols-6 gap-4">
                  <MetricCard icon={Wallet} label="Projected Cost" value={money(total)} />
                  <MetricCard icon={CreditCard} label="Collected" value={money(collected)} />
                  <MetricCard icon={Users} label="RSVP Yes" value={rsvpYes} />
                  <MetricCard icon={Store} label="Booked Vendors" value={bookedVendors} />
                  <MetricCard icon={TrendingUp} label="Platform Fee" value={money(platformFee)} />
                  <MetricCard icon={CalendarDays} label="Event Date" value={eventDate} />
                </div>
              </Panel>
            )}

            {tab === "legal" && (
              <Panel title="Legal + Trust Center" icon={FileSignature} subtitle="Document scaffolds. Have an attorney review before live use.">
                <div className="grid md:grid-cols-4 gap-4">
                  {["Terms of Service","Privacy Policy","Refund Policy","Vendor Agreement"].map(doc => <Card key={doc}><FileSignature className="text-indigo-600 mb-3" /><h3 className="font-semibold">{doc}</h3><p className="text-sm text-slate-500 mt-2">Draft scaffold included.</p></Card>)}
                </div>
                <button onClick={() => call("/api/legal/generate", { businessName })} className="mt-5 rounded-2xl bg-indigo-600 text-white px-5 py-3 font-semibold">Generate Legal Drafts</button>
              </Panel>
            )}

            {tab === "redeploy" && (
              <Panel title="Redeploy Guide" icon={Upload} subtitle="Deploy this true final calm version on Vercel.">
                <Card><ol className="list-decimal ml-5 space-y-3 text-slate-600"><li>Download and unzip this package.</li><li>Upload the unzipped folder to Vercel.</li><li>Add the environment variables from <code>.env.example</code>.</li><li>Redeploy the project.</li><li>Use LMH Enterprise LLC Stripe keys so payments route to the business.</li></ol></Card>
              </Panel>
            )}

            <footer className="mt-10 text-sm text-slate-500 flex flex-wrap justify-between gap-3"><p>© 2026 GatherGenius. Payments directed to {businessName}.</p><p>{status}</p></footer>
          </div>
        </section>
      </div>
    </main>
  );
}

function Logo({compact=false}) {
  return <div className="flex items-center gap-3"><div className="rounded-2xl bg-indigo-600 text-white p-3 shadow-card"><Sparkles className="h-5 w-5" /></div>{!compact && <div><h1 className="text-xl font-bold tracking-tight">GatherGenius</h1><p className="text-xs text-slate-500">by LMH Enterprise LLC</p></div>}</div>;
}

function DashboardView({eventName,setEventName,location,setLocation,eventDate,setEventDate,total,collected,platformFee,rsvpYes,bookedVendors,heroImage,saveEvent,setTab}) {
  return <div>
    <div className="flex flex-wrap items-center justify-between gap-4 mb-7"><div><h2 className="text-3xl font-bold tracking-tight">Welcome back, LMH!</h2><p className="text-slate-500 mt-1">Here is what is happening with your events today.</p></div><button onClick={saveEvent} className="rounded-2xl bg-indigo-600 text-white px-5 py-3 font-semibold shadow-card flex items-center gap-2"><Plus className="h-5 w-5" />Save Event</button></div>
    <div className="grid lg:grid-cols-4 gap-5 mb-6"><MetricCard icon={CalendarDays} label="Event Budget" value={money(total)} tone="indigo" /><MetricCard icon={Users} label="RSVP Guests" value={rsvpYes} tone="green" /><MetricCard icon={CreditCard} label="Collected" value={money(collected)} tone="blue" /><MetricCard icon={Store} label="Booked Vendors" value={bookedVendors} tone="orange" /></div>
    <div className="grid xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2 space-y-6">
        <Card><h3 className="text-lg font-semibold mb-4">Event Setup</h3><div className="grid md:grid-cols-3 gap-3"><Field label="Event Name" value={eventName} setValue={setEventName} /><Field label="Location" value={location} setValue={setLocation} /><Field label="Event Date" value={eventDate} setValue={setEventDate} /></div></Card>
        <Card><h3 className="text-lg font-semibold mb-5">Quick Actions</h3><div className="grid grid-cols-2 md:grid-cols-5 gap-4"><Quick icon={Brain} label="AI Plan" onClick={() => setTab("ai")} /><Quick icon={Mail} label="Invite" onClick={() => setTab("guests")} /><Quick icon={Store} label="Vendors" onClick={() => setTab("vendors")} /><Quick icon={Ticket} label="Tickets" onClick={() => setTab("tickets")} /><Quick icon={BarChart3} label="Analytics" onClick={() => setTab("analytics")} /></div></Card>
        <Card><h3 className="text-lg font-semibold mb-5">AI Tools</h3><div className="grid md:grid-cols-2 gap-4"><div className="rounded-3xl bg-indigo-50 p-5 flex gap-4"><div className="rounded-2xl bg-white p-3 h-fit"><Sparkles className="text-indigo-600" /></div><div><h4 className="font-semibold">AI Plan My Event</h4><p className="text-sm text-slate-500 mt-1">Create event plan, budget, timeline, and checklist.</p></div></div><div className="rounded-3xl bg-emerald-50 p-5 flex gap-4"><div className="rounded-2xl bg-white p-3 h-fit"><ShieldCheck className="text-emerald-600" /></div><div><h4 className="font-semibold">Missing Items Checker</h4><p className="text-sm text-slate-500 mt-1">Find gaps before vendors and payments.</p></div></div></div></Card>
      </div>
      <div className="space-y-6">
        <Card><h3 className="text-lg font-semibold mb-4">Dashboard Preview</h3>{heroImage ? <img src={`/images/${heroImage}`} alt="GatherGenius dashboard preview" className="rounded-3xl border border-slate-200 shadow-card w-full" /> : <div className="rounded-3xl bg-slate-100 h-60 flex items-center justify-center text-slate-500">Preview image included when available</div>}</Card>
        <Card><h3 className="text-lg font-semibold mb-4">Revenue Overview</h3><div className="space-y-4"><Summary label="Collected" value={money(collected)} /><Summary label="Platform Fee Target" value={money(platformFee)} /><Summary label="Payment Entity" value={businessName} /></div></Card>
      </div>
    </div>
  </div>;
}

function Panel({title, icon:Icon, subtitle, children}) {
  return <section><div className="mb-6"><div className="flex items-center gap-3 mb-2"><Icon className="text-indigo-600" /><h2 className="text-3xl font-bold tracking-tight">{title}</h2></div><p className="text-slate-500">{subtitle}</p></div>{children}</section>;
}

function Card({children}) {
  return <div className="rounded-[1.75rem] border border-slate-200 bg-white/85 p-5 shadow-card backdrop-blur-md">{children}</div>;
}

function MetricCard({icon:Icon,label,value,tone="indigo"}) {
  const tones = { indigo:"bg-indigo-50 text-indigo-600", green:"bg-emerald-50 text-emerald-600", blue:"bg-blue-50 text-blue-600", orange:"bg-orange-50 text-orange-600" };
  return <Card><div className="flex items-center gap-4"><div className={`rounded-2xl p-4 ${tones[tone] || tones.indigo}`}><Icon className="h-6 w-6" /></div><div><p className="text-sm text-slate-500">{label}</p><p className="text-2xl font-bold tracking-tight">{value}</p></div></div></Card>;
}

function Field({label,value,setValue}) {
  return <label className="block"><span className="text-xs text-slate-500">{label}</span><input value={value} onChange={e => setValue(e.target.value)} className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-100" /></label>;
}

function Quick({icon:Icon,label,onClick}) {
  return <button onClick={onClick} className="rounded-3xl border border-slate-200 bg-white p-4 hover:shadow-card transition"><Icon className="mx-auto text-indigo-600 mb-2" /><p className="text-sm font-medium">{label}</p></button>;
}

function Summary({label,value}) {
  return <div className="flex justify-between gap-4 border-b border-slate-100 pb-3"><span className="text-slate-500">{label}</span><span className="font-semibold text-right">{value}</span></div>;
}
