"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { buildPermissionDefaults, getApprovedContextSummary, permissionCatalog } from "../lib/permissions/permissionCatalog";

const STORAGE_KEY = "gathergenius-data-permissions";

export default function DataPermissionCenter({ compact = false, onPermissionsChange }) {
  const [permissions, setPermissions] = useState(buildPermissionDefaults());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (existing) setPermissions({ ...buildPermissionDefaults(), ...JSON.parse(existing) });
    } catch {}
  }, []);

  useEffect(() => {
    onPermissionsChange?.(permissions);
  }, [permissions, onPermissionsChange]);

  const approvedSummary = useMemo(() => getApprovedContextSummary(permissions), [permissions]);

  function toggle(id) {
    setSaved(false);
    setPermissions((current) => ({ ...current, [id]: !current[id] }));
  }

  async function savePermissions() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(permissions));
      await fetch("/api/permissions/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ permissions })
      }).catch(() => null);
      setSaved(true);
    } catch {
      setSaved(true);
    }
  }

  function approveRecommended() {
    const next = buildPermissionDefaults();
    setPermissions(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSaved(true);
  }

  function denyAll() {
    const next = permissionCatalog.reduce((acc, item) => {
      acc[item.id] = false;
      return acc;
    }, {});
    setPermissions(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSaved(true);
  }

  return (
    <div className="gg-card gg-permission-card">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div>
          <span className="gg-status good">Data Permission Center</span>
          <h2 style={{ marginTop: 16 }}>Let GatherGenius know you before it responds.</h2>
          <p className="gg-note">
            Approve which data points the AI can use for voice, suggestions, provider matching, pricing, and autonomous execution.
          </p>
        </div>
        <div className="gg-permission-summary">
          <span>Approved Context</span>
          <strong>{approvedSummary}</strong>
        </div>
      </div>

      <div className={compact ? "gg-permission-grid compact" : "gg-permission-grid"}>
        {permissionCatalog.map((item) => (
          <motion.button
            type="button"
            key={item.id}
            className={`gg-permission-tile ${permissions[item.id] ? "active" : ""}`}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggle(item.id)}
            aria-pressed={permissions[item.id]}
          >
            <div className="gg-permission-top">
              <strong>{item.title}</strong>
              <span className={`gg-risk ${item.riskLevel.toLowerCase()}`}>{item.riskLevel}</span>
            </div>
            <p>{item.description}</p>
            {!compact && <small>{item.dataExamples.join(" · ")}</small>}
            <div className="gg-switch">
              <span>{permissions[item.id] ? "Approved" : "Not approved"}</span>
              <b>{permissions[item.id] ? "ON" : "OFF"}</b>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="gg-permission-actions">
        <button type="button" className="gg-btn green" onClick={savePermissions}>SAVE PERMISSIONS</button>
        <button type="button" className="gg-btn secondary" onClick={approveRecommended}>APPROVE RECOMMENDED</button>
        <button type="button" className="gg-btn secondary" onClick={denyAll}>DENY ALL</button>
      </div>

      <p className="gg-note">
        {saved ? "Permissions saved. GatherGenius will only personalize using approved data points." : "You control what data GatherGenius can use."}
      </p>
    </div>
  );
}
