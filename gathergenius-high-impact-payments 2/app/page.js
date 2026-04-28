"use client";

import React, { useMemo, useState } from "react";
import { Gem, Wallet, Users, CreditCard, Loader2, Check, ArrowRight, ReceiptText } from "lucide-react";

const members0 = ["Tanya", "Tyronne", "Joshua", "James", "Nicole", "Calvin", "Lori", "Jonathan", "Jason", "Justin"];

const plans = [
  { name: "Starter", key: "starter", price: "$9", amount: 900 },
  { name: "Premium", key: "premium", price: "$29", amount: 2900 },
  { name: "Planner Pro", key: "planner_pro", price: "$99", amount: 9900 }
];

function money(v) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(v || 0));
}

export default function Page() {
  const [totalCost, setTotalCost] = useState(3935);
  const [members, setMembers] = useState(members0.map((name) => ({ name, email: "", paid: false })));
  const [loading, setLoading] = useState("");
  const [status, setStatus] = useState("High-impact payment system ready");

  const splitAmount = useMemo(() => members.length ? totalCost / members.length : 0, [members, totalCost]);
  const collected = members.filter((m) => m.paid).length * splitAmount;
  const remaining = totalCost - collected;

  function updateEmail(name, email) {
    setMembers((list) => list.map((m) => m.name === name ? { ...m, email } : m));
  }

  async function createGuestPayment(member) {
    setLoading(member.name);
    const res = await fetch("/api/payments/create-guest-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guestName: member.name, guestEmail: member.email, amount: Math.round(splitAmount * 100), eventName: "GatherGenius Event" })
    });
    const data = await res.json();
    setLoading("");
    if (data.url) window.location.href = data.url;
    else setStatus(data.message || "Stripe guest checkout scaffold ready");
  }

  async function createSubscription(plan) {
    setLoading(plan.key);
    const res = await fetch("/api/payments/create-subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: plan.key, planName: plan.name })
    });
    const data = await res.json();
    setLoading("");
    if (data.url) window.location.href = data.url;
    else setStatus(data.message || "Subscription scaffold ready");
  }

  async function savePayment(member) {
    setLoading("save-" + member.name);
    const res = await fetch("/api/payments/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventName: "GatherGenius Event", payerName: member.name, payerEmail: member.email, amount: splitAmount, status: "Paid" })
    });
    const data = await res.json();
    setMembers((list) => list.map((m) => m.name === member.name ? { ...m, paid: true } : m));
    setStatus(data.message || member.name + " marked paid");
    setLoading("");
  }

  async function sendReceipt(member) {
    setLoading("receipt-" + member.name);
    const res = await fetch("/api/receipts/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: member.email || "guest@example.com", guestName: member.name, amount: splitAmount, eventName: "GatherGenius Event" })
    });
    const data = await res.json();
    setStatus(data.message || "Receipt route called");
    setLoading("");
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,.2),transparent_35%)]" />
      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-yellow-300 to-yellow-700"><Gem className="text-black" /></div>
            <div><h1 className="text-3xl font-black">GatherGenius</h1><p className="text-yellow-200/70">Payment Upgrade</p></div>
          </div>
          <p className="text-sm text-yellow-200/70">{status}</p>
        </header>

        <section className="grid md:grid-cols-4 gap-4 mb-8">
          <Metric icon={Wallet} label="Total Event Cost" value={money(totalCost)} />
          <Metric icon={Users} label="Family Members" value={members.length} />
          <Metric icon={CreditCard} label="Split Each" value={money(splitAmount)} />
          <Metric icon={ReceiptText} label="Remaining" value={money(remaining)} />
        </section>

        <section className="grid lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 rounded-[2rem] bg-gray-950/80 border border-gray-800 p-6">
            <h2 className="text-3xl font-black mb-2">Auto Guest Split Payments</h2>
            <p className="text-gray-400 mb-6">Create Stripe links, save payments to database, and send receipts.</p>
            <input value={totalCost} onChange={(e) => setTotalCost(Number(e.target.value || 0))} className="mb-5 rounded-2xl bg-black border border-white/10 p-4 text-white" />
            <div className="space-y-3">
              {members.map((member) => (
                <div key={member.name} className="grid lg:grid-cols-6 gap-3 items-center rounded-2xl border border-gray-800 bg-black/40 p-4">
                  <div><p className="font-black">{member.name}</p><p className={member.paid ? "text-emerald-300 text-xs" : "text-gray-500 text-xs"}>{member.paid ? "Paid" : "Unpaid"}</p></div>
                  <input value={member.email} onChange={(e) => updateEmail(member.name, e.target.value)} placeholder="email optional" className="lg:col-span-2 rounded-xl bg-black/50 border border-white/10 p-3 text-sm" />
                  <p className="font-black text-yellow-400">{money(splitAmount)}</p>
                  <button onClick={() => createGuestPayment(member)} className="rounded-xl bg-yellow-400 text-black px-3 py-2 font-black text-sm">{loading === member.name ? <Loader2 className="animate-spin mx-auto" size={16} /> : "Pay Link"}</button>
                  <div className="flex gap-2">
                    <button onClick={() => savePayment(member)} className="rounded-xl border border-white/10 px-3 py-2 text-xs">Mark Paid</button>
                    <button onClick={() => sendReceipt(member)} className="rounded-xl border border-white/10 px-3 py-2 text-xs">Receipt</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-yellow-500/10 border border-yellow-400/20 p-6">
            <h2 className="text-2xl font-black mb-5">Summary</h2>
            <Summary label="Total Cost" value={money(totalCost)} />
            <Summary label="Split Each" value={money(splitAmount)} gold />
            <Summary label="Collected" value={money(collected)} />
            <Summary label="Remaining" value={money(remaining)} gold />
          </div>
        </section>

        <section className="rounded-[2rem] bg-gray-950/80 border border-gray-800 p-6">
          <h2 className="text-3xl font-black mb-6">Monthly Subscription Billing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.key} className="rounded-[2rem] border border-white/10 bg-white/[.04] p-6">
                <h3 className="text-2xl font-black">{plan.name}</h3>
                <div className="my-4"><span className="text-4xl font-black">{plan.price}</span><span className="text-gray-500 ml-2">/mo</span></div>
                <div className="space-y-2 mb-6">
                  <div className="flex gap-2 text-sm text-gray-300"><Check className="text-yellow-400" size={16} /> Stripe subscription checkout</div>
                  <div className="flex gap-2 text-sm text-gray-300"><Check className="text-yellow-400" size={16} /> Webhook scaffold</div>
                </div>
                <button onClick={() => createSubscription(plan)} className="w-full rounded-2xl bg-white text-black py-3 font-black flex items-center justify-center">Subscribe <ArrowRight className="ml-2" size={16} /></button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Metric({ icon: Icon, label, value }) {
  return <div className="rounded-2xl bg-white/[.045] border border-white/10 p-5"><Icon className="text-yellow-400 mb-3" /><p className="text-gray-500 text-sm">{label}</p><p className="text-2xl font-black">{value}</p></div>;
}
function Summary({ label, value, gold }) {
  return <div className="flex justify-between py-3 border-b border-white/10"><span className="text-gray-400">{label}</span><span className={`font-black ${gold ? "text-yellow-400" : ""}`}>{value}</span></div>;
}
