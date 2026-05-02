import React from "react";

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
  "Wedding Reception",
  "Corporate Conference",
  "Political Rally",
  "Backyard BBQ",
  "Luxury Gala",
  "Music Festival",
];

const activity = [
  "AI premium event plan generated",
  "Vendor match simulated in Washington, DC",
  "Wedding template selected",
  "Featured vendor revenue path calculated",
];

export default function Page() {
  return (
    <main className="min-h-screen bg-stone-100 text-stone-900 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-3xl bg-white p-6 shadow-xl flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-white shadow-2xl border" />
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-500">Premium Homepage</p>
              <h1 className="text-4xl font-light">GatherGenius</h1>
              <p className="text-stone-500">AI event marketplace + vendor revenue engine</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Templates","Marketplace","Map","AI Premium","Investor"].map((item) => (
              <span key={item} className="rounded-full border bg-white px-4 py-2 text-sm">{item}</span>
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
              <button className="rounded-full bg-stone-900 px-6 py-3 text-white">Launch Event Builder</button>
              <button className="rounded-full border bg-white px-6 py-3">View Investor Dashboard</button>
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

        <section className="grid gap-6 lg:grid-cols-3">
          <Panel title="Global Templates" subtitle="177+ event playbooks">
            <div className="grid grid-cols-2 gap-2">
              {templates.map((item) => <Pill key={item}>{item}</Pill>)}
            </div>
          </Panel>

          <Panel title="Marketplace" subtitle="Vendor discovery + booking">
            <div className="space-y-3">
              {vendors.map(([name, type, city, badge]) => (
                <div key={name} className="rounded-2xl border bg-white p-4">
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="font-medium">{name}</p>
                      <p className="text-sm text-stone-500">{type} · {city}</p>
                    </div>
                    <span className="h-fit rounded-full bg-stone-100 px-3 py-1 text-xs">{badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="AI Premium" subtitle="Paid planning upsell">
            <div className="space-y-2 text-sm text-stone-600">
              {["Timeline generation","Budget split and vendor needs","Checklist by event category","Premium $19/mo subscription path"].map((item) => (
                <div key={item} className="rounded-2xl border bg-white px-4 py-3">✓ {item}</div>
              ))}
            </div>
          </Panel>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-2xl font-light">Real Map + GPS Preview</h3>
            <div className="relative h-72 rounded-3xl border bg-stone-200">
              <Pin x="25%" y="35%" label="DJ" />
              <Pin x="60%" y="42%" label="Venue" />
              <Pin x="48%" y="68%" label="Caterer" />
              <Pin x="78%" y="70%" label="AV" />
              <div className="absolute bottom-5 left-5 rounded-2xl bg-white px-4 py-3 text-sm shadow">
                GPS + Google Places ready
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-2xl font-light">Investor Growth Engine</h3>
            <div className="grid grid-cols-2 gap-3">
              <Metric label="5 vendors/day" value="150/mo" />
              <Metric label="Featured target" value="20%" />
              <Metric label="Projected MRR" value="$1,470" />
              <Metric label="Annual path" value="$17.6K+" />
            </div>
            <div className="mt-4 rounded-2xl border bg-white p-4 text-xs text-stone-500">
              Metrics include platform capacity, projections, and simulated activity for demonstration. No fake paid subscriber claims.
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-xl">
          <h3 className="mb-4 text-2xl font-light">Live Activity Demo</h3>
          <div className="grid gap-2 md:grid-cols-2">
            {activity.map((item) => (
              <div key={item} className="rounded-2xl border bg-white px-4 py-3 text-sm text-stone-600">• {item}</div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Panel({ title, subtitle, children }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-xl">
      <h3 className="text-2xl font-light">{title}</h3>
      <p className="mb-5 text-stone-500">{subtitle}</p>
      {children}
    </div>
  );
}

function Pill({ children }) {
  return <div className="rounded-full border bg-white px-4 py-2 text-sm text-stone-700">{children}</div>;
}

function Pin({ x, y, label }) {
  return (
    <div className="absolute rounded-full bg-stone-900 px-3 py-2 text-xs text-white shadow-xl" style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}>
      {label}
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <p className="text-2xl font-light">{value}</p>
      <p className="text-sm text-stone-500">{label}</p>
    </div>
  );
}
