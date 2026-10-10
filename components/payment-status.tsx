"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type OrderItem = { productName: string; variantName: string | null; quantity: number; accessUrl: string | null; delivery: string; support: string | null };
type Order = { orderNumber: string; status: string; amountPaise: number; currency: string; paidAt: string | null; productName: string; variantName: string | null; accessUrl: string | null; delivery: string; support: string | null; emailSent: boolean; items?: OrderItem[] };
export default function PaymentStatus({ orderNumber, initialOrder }: { orderNumber: string; initialOrder: Order | null }) {
  const [order, setOrder] = useState<Order | null>(initialOrder);
  const [checking, setChecking] = useState(initialOrder?.status !== "PAID");
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!orderNumber || order?.status === "PAID" || attempts >= 12) { setChecking(false); return; }
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch("/api/order-status?order=" + encodeURIComponent(orderNumber), { cache: "no-store" });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Status check failed.");
        if (!cancelled) { setOrder(data.order || null); setError(""); setAttempts((n) => n + 1); }
      } catch (e) { if (!cancelled) { setError(e instanceof Error ? e.message : "Status check failed."); setAttempts((n) => n + 1); } }
    }, 2500);
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [orderNumber, order?.status, attempts]);
  return <div className={"successV3Card" + (order?.status === "PAID" ? "" : " pending")}>
    <span className="successOrb">{order?.status === "PAID" ? "✓" : "…"}</span>
    <span className="eyebrow">{order?.status === "PAID" ? "PAYMENT CONFIRMED" : "ORDER STATUS"} / {orderNumber || "UNKNOWN"}</span>
    <h1>{order?.status === "PAID" ? <>You're all<br/><em>set.</em></> : <>We're checking<br/><em>your payment.</em></>}</h1>
    {order?.status === "PAID" ? <>
      <p>Your payment for <b>{order.productName}</b>{order.variantName ? <> — {order.variantName}</> : null} has been confirmed.</p>
      {order.items && order.items.length > 1 ? <div className="successDelivery"><strong>Your digital products</strong>{order.items.map((item, index) => <div key={item.productName + index} style={{padding:"12px 0",borderBottom:"1px solid var(--line)"}}><p><b>{item.productName}</b>{item.variantName ? " — " + item.variantName : ""}{item.quantity > 1 ? " × " + item.quantity : ""}</p>{item.accessUrl ? <a className="button buttonDark" href={item.accessUrl} target="_blank" rel="noreferrer">Access product ↗</a> : <p>{item.delivery}</p>}{item.support && <small>{item.support}</small>}</div>)}</div> : order.accessUrl ? <a className="button buttonDark" href={order.accessUrl} target="_blank" rel="noreferrer">Access your product ↗</a> : <div className="successDelivery"><strong>Delivery instructions</strong><p>{order.delivery}</p>{order.support ? <p>Support: {order.support}</p> : null}</div>}
      <small>{order.emailSent ? "Your confirmation email has been sent." : "Your order is confirmed. If email delivery is enabled, your confirmation will arrive shortly."}</small>
    </> : <>
      <p>{checking ? "We are checking for verified payment confirmation. This page will update automatically. Please don't pay again while the status is pending." : "We couldn't confirm payment automatically yet. If you completed payment, wait a little and check again. Do not pay again for the same order."}</p>
      {error && <small role="status">{error}</small>}
      {!checking && <button className="button buttonDark" onClick={() => { setAttempts(0); setChecking(true); setError(""); }}>Check status again</button>}
    </>}
    <Link href="/products">Continue shopping →</Link>
  </div>;
}