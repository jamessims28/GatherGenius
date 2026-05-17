import BackButton from "../../components/BackButton";
import DataPermissionCenter from "../../components/DataPermissionCenter";

export default function PermissionsPage() {
  return (
    <main className="gg-shell">
      <nav className="gg-nav">
        <div className="gg-brand"><div className="gg-logo" /><div><h1>Permissions</h1><span>Data Control Center</span></div></div>
        <div className="gg-actions"><BackButton /><a className="gg-pill" href="/">Home</a></div>
      </nav>
      <section className="gg-section">
        <DataPermissionCenter />
      </section>
    </main>
  );
}
