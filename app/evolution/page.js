import BackButton from "../../components/BackButton";
import EvolutionStackPanel from "../../components/EvolutionStackPanel";

export default function EvolutionPage() {
  return (
    <main className="gg-shell">
      <nav className="gg-nav">
        <div className="gg-brand"><div className="gg-logo" /><div><h1>Evolution</h1><span>20-Year AI Stack</span></div></div>
        <div className="gg-actions"><BackButton /><a className="gg-pill" href="/">Home</a><a className="gg-pill" href="/voice">Voice</a></div>
      </nav>
      <section className="gg-section">
        <EvolutionStackPanel />
      </section>
    </main>
  );
}
