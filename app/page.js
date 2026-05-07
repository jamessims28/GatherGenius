"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { eventTypes, styleVibes, findEventType, findVibe } from "../lib/accessibility/templates";
import BackButton from "../components/BackButton";

const steps = [
  "Understanding your experience",
  "Choosing the strongest provider stack",
  "Optimizing the price",
  "Securing backup providers",
  "Preparing your lock"
];

function AnimatedNumber({ value, prefix = "", suffix = "" }) {
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(value || 0);

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(value || 0);
      return;
    }

    let start = null;
    const duration = 700;
    const from = 0;
    const to = Number(value || 0);

    const run = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (progress < 1) requestAnimationFrame(run);
    };

    requestAnimationFrame(run);
  }, [value, reducedMotion]);

  return <>{prefix}{Number(display || 0).toLocaleString()}{suffix}</>;
}

export default function Page() {
  const reducedMotion = useReducedMotion();
  const [prompt, setPrompt] = useState("Build my wedding for 120 guests under $20k in Virginia");
  const [activeStep, setActiveStep] = useState(-1);
  const [isBuilding, setIsBuilding] = useState(false);
  const [eventLock, setEventLock] = useState(null);
  const [status, setStatus] = useState("Describe it once. We handle the rest.");
  const [input, setInput] = useState({ eventType: "wedding", vibe: "luxury", guests: 120, budget: 20000, location: "Virginia" });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("gathergenius-fixed-state");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.prompt) setPrompt(parsed.prompt);
        if (parsed.input) setInput(parsed.input);
        if (parsed.eventLock) setEventLock(parsed.eventLock);
        if (parsed.status) setStatus(parsed.status);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("gathergenius-fixed-state", JSON.stringify({ prompt, input, eventLock, status }));
    } catch {}
  }, [prompt, input, eventLock, status]);

  const selectedEvent = useMemo(() => findEventType(input.eventType), [input.eventType]);
  const selectedVibe = useMemo(() => findVibe(input.vibe), [input.vibe]);

  function updateInput(key, value) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  async function buildFromPrompt(customPrompt = prompt) {
    const cleanPrompt = String(customPrompt || "").trim();
    if (!cleanPrompt) {
      setStatus("Type one sentence or use the tap buttons first.");
      return;
    }

    setIsBuilding(true);
    setEventLock(null);
    setStatus("Building your experience correctly...");
    setActiveStep(-1);

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, reducedMotion ? 35 : 380));
      setActiveStep(i);
    }

    try {
      const response = await fetch("/api/engine/build-lock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: cleanPrompt })
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Build failed");
      }

      const lock = data.eventLock || data.experienceLock;
      setEventLock(lock);
      setStatus(data.message || "Experience built correctly. One decision left.");
    } catch (error) {
      setStatus(`Build error: ${error.message}`);
    } finally {
      setIsBuilding(false);
    }
  }

  async function buildFromTap() {
    try {
      setStatus("Converting taps into one sentence...");
      const response = await fetch("/api/accessibility/interpret", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "tap", input })
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Tap input failed");
      }

      const generatedPrompt = data.intent.prompt;
      setPrompt(generatedPrompt);
      await buildFromPrompt(generatedPrompt);
    } catch (error) {
      setStatus(`Tap build error: ${error.message}`);
    }
  }

  async function lockExperience() {
    if (!eventLock) return;

    try {
      setStatus("Locking your experience...");
      const response = await fetch("/api/engine/lock-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventLock })
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      setStatus(data.message || "Experience locked in preview mode.");
    } catch (error) {
      setStatus(`Lock error: ${error.message}`);
    }
  }

  return (
    <>
      <main className="gg-shell">
        <motion.nav className="gg-nav" initial={reducedMotion ? false : { opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <div className="gg-brand">
            <motion.div className="gg-logo" animate={reducedMotion ? {} : { scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }} transition={{ duration: 3.8, repeat: Infinity }} />
            <div>
              <h1>GatherGenius</h1>
              <span>Experience OS</span>
            </div>
          </div>
          <div className="gg-actions">
            <BackButton />
            <a className="gg-pill" href="/execution">Execution</a>
            <a className="gg-pill" href="/vendor">Provider</a>
            <a className="gg-pill" href="/investor">Investor</a>
          </div>
        </motion.nav>

        <section className="gg-hero">
          <div className="gg-inner">
            <motion.div className="gg-badge" initial={reducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <span className="gg-dot" /> Experiences that build and execute themselves
            </motion.div>

            <motion.h2 className="gg-title" initial={reducedMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}>
              Describe it once.
              <span>Then stop thinking.</span>
            </motion.h2>

            <p className="gg-sub">Use one sentence or tap the buttons below. Both paths now generate correctly and save your state.</p>

            <div className="gg-command">
              <div className="gg-command-label"><span>One sentence in</span><span>One outcome out</span></div>
              <div className="gg-command-row">
                <input className="gg-input" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                <motion.button className="gg-btn green" whileTap={reducedMotion ? {} : { scale: 0.96 }} onClick={() => buildFromPrompt()} disabled={isBuilding}>
                  {isBuilding ? "BUILDING..." : "BUILD IT"}
                </motion.button>
              </div>
            </div>

            <AnimatePresence>
              {isBuilding && (
                <motion.div className="gg-sequence" initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                  {steps.map((step, index) => (
                    <motion.div key={step} className="gg-step" animate={{ opacity: index <= activeStep ? 1 : 0.35, scale: index === activeStep && !reducedMotion ? 1.015 : 1 }}>
                      {index + 1}. {step}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <p className="gg-note" style={{ textAlign: "center" }}>{status}</p>

            <AnimatePresence>
              {eventLock && (
                <motion.div className="gg-panel" initial={reducedMotion ? false : { opacity: 0, y: 24, filter: "blur(12px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}>
                  <div className="gg-card">
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
                      <h2>Your experience is ready.</h2>
                      <span className="gg-status good">{eventLock.guaranteeStatus}</span>
                    </div>
                    <div className="gg-line"><span>Outcome</span><strong>{eventLock.name}</strong></div>
                    <div className="gg-line"><span>Execution Confidence</span><strong><AnimatedNumber value={eventLock.confidenceScore} suffix="%" /></strong></div>
                    <div className="gg-line"><span>Total Fixed Price</span><strong>$<AnimatedNumber value={eventLock.total} /></strong></div>
                    <div className="gg-line"><span>Backup Coverage</span><strong>{eventLock.backupCoverage}</strong></div>
                    <div className="gg-line"><span>Customer Decisions Left</span><strong>1</strong></div>
                    <div className="gg-total">
                      <div>
                        <span>Activation Deposit</span>
                        <strong>$<AnimatedNumber value={eventLock.deposit} /></strong>
                      </div>
                      <motion.button className="gg-btn green" whileTap={reducedMotion ? {} : { scale: 0.94 }} onClick={lockExperience}>LOCK EXPERIENCE</motion.button>
                    </div>
                  </div>

                  <div className="gg-card">
                    <h3>No planning required.</h3>
                    <p className="gg-note">We choose providers, hold backups, manage SLA, track execution, and protect the outcome.</p>
                    <div className="gg-grid2" style={{ marginTop: 16 }}>
                      <div className="gg-metric"><span>Primary</span><strong>{eventLock.primaryVendors.length}</strong></div>
                      <div className="gg-metric"><span>Backups</span><strong>{eventLock.backupVendors.length}</strong></div>
                      <div className="gg-metric"><span>Replacement</span><strong>{eventLock.replacementWindow}</strong></div>
                      <div className="gg-metric"><span>Thinking</span><strong>Removed</strong></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <section className="gg-section">
        <div className="gg-card">
          <span className="gg-status good">Tap Input Fixed</span>
          <h2 style={{ marginTop: 16 }}>No speaking. No typing. No thinking.</h2>
          <p className="gg-note">Selected: {selectedVibe.label} {selectedEvent.label}. Buttons now update state immediately and generate the correct one-sentence prompt.</p>

          <h3 style={{ marginTop: 22 }}>Experience Type</h3>
          <div className="gg-grid3" style={{ marginTop: 12 }}>
            {eventTypes.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={input.eventType === item.id}
                className={`gg-tile ${input.eventType === item.id ? "active" : ""}`}
                onClick={() => updateInput("eventType", item.id)}
              >
                <div style={{ fontSize: 28 }}>{item.icon}</div>{item.label}
              </button>
            ))}
          </div>

          <h3 style={{ marginTop: 22 }}>Vibe</h3>
          <div className="gg-grid3" style={{ marginTop: 12 }}>
            {styleVibes.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={input.vibe === item.id}
                className={`gg-tile ${input.vibe === item.id ? "active" : ""}`}
                onClick={() => updateInput("vibe", item.id)}
              >
                <div style={{ fontSize: 28 }}>{item.icon}</div>{item.label}
              </button>
            ))}
          </div>

          <div style={{ marginTop: 22 }}>
            <button type="button" className="gg-btn green" onClick={buildFromTap} disabled={isBuilding}>
              BUILD WITHOUT TYPING
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
