"use client";
import { useState } from "react";
import type { Product } from "@/lib/products";

type CheckoutItem = { product: Product; plan: string; quantity?: number };
export default function CheckoutForm({ items }: { items: CheckoutItem[] }) {
  const [form, setForm] = useState({ email: "", name: "", phone: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setError(""); setBusy(true);
    try {
      const r = await fetch("/api/checkout/create-order", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: items.map((item) => ({ product: item.product.slug, plan: item.plan, quantity: item.quantity || 1 })), ...form }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Unable to start checkout.");
      window.location.href = d.paymentUrl + (d.paymentUrl.includes("?") ? "&" : "?") + "order=" + encodeURIComponent(d.orderNumber);
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to start checkout."); setBusy(false); }
  }
  return <form onSubmit={submit}>
    <div className="checkoutCard"><h3>Customer details</h3>
      <label>Email address<input required type="email" autoComplete="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com"/></label>
      <label>Full name<input required autoComplete="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name"/></label>
      <label>Phone <span className="optional">optional</span><input autoComplete="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91"/></label>
    </div>
    <div className="checkoutCard"><h3>Payment</h3><div className="paymentProvider"><span className="providerMark">R</span><div><b>Secure online payment</b><small>Available payment methods are shown by Razorpay.</small></div></div><p className="paymentNotice">You will be redirected to the configured payment page to complete your purchase.</p></div>
    {error && <p className="formError" role="alert">{error}</p>}
    <button className="button buttonDark full" disabled={busy}>{busy ? "Preparing checkout…" : "Continue to payment"}</button>
  </form>;
}