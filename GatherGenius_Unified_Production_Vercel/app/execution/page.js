export default function ExecutionPage() {
  return (
    <main className="gg-shell">
      <nav className="gg-nav">
        <div className="gg-brand"><div className="gg-logo" /><div><h1>Execution</h1><span>Event in motion</span></div></div>
        <div className="gg-actions"><a className="gg-pill" href="/">Home</a><a className="gg-pill" href="/vendor">Vendor</a><a className="gg-pill" href="/investor">Investor</a></div>
      </nav>
      <section className="gg-section">
        <div className="gg-card">
          <span className="gg-status good">Execution Control</span>
          <h2 style={{ marginTop: 16, fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 54, letterSpacing: "-.06em" }}>You do nothing now. We execute.</h2>
          <p className="gg-note">Vendors are contacted, backups are held, SLA timers are active, and the event outcome is protected.</p>
          <div className="gg-grid4" style={{ marginTop: 22 }}>
            <div className="gg-metric"><span>Deposit</span><strong>Prepared</strong></div>
            <div className="gg-metric"><span>Vendors</span><strong>5 Sent</strong></div>
            <div className="gg-metric"><span>Backups</span><strong>5 Held</strong></div>
            <div className="gg-metric"><span>Confidence</span><strong>94%</strong></div>
          </div>
        </div>
      </section>
    </main>
  );
}
