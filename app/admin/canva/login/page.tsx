"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function CanvaAdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError("");
    try {
      const response = await fetch("/api/admin/canva-session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to sign in.");
      const params = new URLSearchParams(window.location.search);
      const next = params.get("next") || "/admin/canva";
      window.location.assign(next.startsWith("/admin/canva") ? next : "/admin/canva");
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to sign in."); setBusy(false); }
  }
  return <main style={{ minHeight: "75vh", display: "grid", placeItems: "center", padding: 24, background: "#f5f3ef" }}>
    <section style={{ width: "min(440px,100%)", background: "#fff", border: "1px solid #deded8", borderRadius: 20, padding: 32 }}>
      <span style={{ fontSize: 11, letterSpacing: ".14em", fontWeight: 700, color: "#777" }}>DIGITAL PRODUCTS BUNDLE / ADMIN</span>
      <h1 style={{ fontSize: 36, lineHeight: 1, letterSpacing: "-.05em", margin: "18px 0" }}>Canva Studio<br/><i>Private access.</i></h1>
      <p style={{ color: "#666", lineHeight: 1.6 }}>Sign in to manage product artwork and Canva integration settings.</p>
      <form onSubmit={submit}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 650, margin: "22px 0 8px" }} htmlFor="admin-password">Admin password</label>
        <input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} style={{ width: "100%", padding: 14, border: "1px solid #ccc", borderRadius: 10 }} />
        {error && <p role="alert" style={{ color: "#b42318", fontSize: 13 }}>{error}</p>}
        <button disabled={busy} className="button buttonDark" style={{ width: "100%", marginTop: 16 }}>{busy ? "Signing in…" : "Sign in securely"}</button>
      </form>
      <Link href="/" style={{ display: "inline-block", marginTop: 20, fontSize: 12, color: "#666" }}>← Return to store</Link>
    </section>
  </main>;
}