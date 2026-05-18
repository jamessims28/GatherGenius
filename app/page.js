"use client";

import BackButton from "../components/BackButton";
import RealtimeConversationCore from "../components/RealtimeConversationCore";
import LivePricingPanel from "../components/LivePricingPanel";
import MultiSourceAnswerPanel from "../components/MultiSourceAnswerPanel";
import SourceAwareCodeForge from "../components/SourceAwareCodeForge";

export default function Page() {
  return (
    <main className="gg-shell">
      <nav className="gg-nav">
        <div className="gg-brand">
          <div className="gg-logo" />
          <div>
            <h1>GeniusGather</h1>
            <span>by GatherGenius</span>
          </div>
        </div>
        <div className="gg-actions">
          <BackButton />
          <a className="gg-pill" href="/conversation">Voice</a>
          <a className="gg-pill" href="/permissions">Privacy</a>
          <a className="gg-pill" href="/pricing">Pricing</a>
          <a className="gg-pill" href="/security">Shield</a>
          <a className="gg-pill" href="/intelligence">Sources</a>
          <a className="gg-pill" href="/codeforge">Code</a>
        </div>
      </nav>

      <section className="gg-clear-landing">
        <div className="gg-clear-copy">
          <span className="gg-status good">Voice-first experience assistant</span>
          <h2>GeniusGather asks. You answer. It builds the result.</h2>
          <p>
            No templates on the screen. No long forms. No planning overload.
            Just a calm conversation that turns your answers into a ready experience.
          </p>
        </div>

        <RealtimeConversationCore />

        <LivePricingPanel />
        <MultiSourceAnswerPanel />
        <SourceAwareCodeForge />
      </section>
    </main>
  );
}
