import crypto from "crypto";
import { NextResponse } from "next/server";
import { getProduct } from "@/lib/products";
import { createRazorpayPaymentLink, razorpayConfigured } from "@/lib/razorpay";
import { siteUrl, supabaseKey, supabaseUrl } from "@/lib/store-config";

type RequestedItem = { product: string; plan?: string; quantity?: number };
type PricedItem = { product: NonNullable<ReturnType<typeof getProduct>>; plan: string; amountPaise: number; quantity: number; productId?: string };

async function db(path: string, init: RequestInit = {}) {
  return fetch(supabaseUrl + "/rest/v1/" + path, {
    ...init,
    headers: { apikey: supabaseKey, Authorization: "Bearer " + supabaseKey, "Content-Type": "application/json", ...(init.headers || {}) },
    cache: "no-store",
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!supabaseUrl || !supabaseKey) return NextResponse.json({ error: "Checkout is being configured. Please try again shortly." }, { status: 503 });
    if (!razorpayConfigured()) return NextResponse.json({ error: "Secure checkout is temporarily unavailable. Please contact support rather than using a generic payment link." }, { status: 503 });
    const email = String(body.email || "").trim().toLowerCase();
    const name = String(body.name || "").trim();
    const phone = String(body.phone || "").trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !name) return NextResponse.json({ error: "Enter a valid name and email address." }, { status: 400 });

    const requested: RequestedItem[] = Array.isArray(body.items) ? body.items : [{ product: String(body.product || ""), plan: String(body.plan || "") }];
    if (!requested.length || requested.length > 20) return NextResponse.json({ error: "Your cart must contain between 1 and 20 items." }, { status: 400 });
    const priced: PricedItem[] = [];
    for (const item of requested) {
      const p = getProduct(String(item.product || ""));
      if (!p) return NextResponse.json({ error: "A product in your cart is no longer available." }, { status: 400 });
      const plan = p.pricing?.find((x) => x.label === item.plan) || p.pricing?.[0];
      const unitRupees = plan ? Number(plan.price.replace(/[^0-9]/g, "")) : 0;
      const quantity = Number(item.quantity || 1);
      if (!plan || !Number.isSafeInteger(quantity) || quantity < 1 || quantity > 10 || !Number.isSafeInteger(unitRupees) || unitRupees <= 0) return NextResponse.json({ error: "A product has an invalid plan, quantity or price." }, { status: 400 });
      priced.push({ product: p, plan: plan.label, amountPaise: unitRupees * 100, quantity });
    }
    const totalAmount = priced.reduce((sum, item) => sum + item.amountPaise * item.quantity, 0);
    if (!Number.isSafeInteger(totalAmount) || totalAmount <= 0 || totalAmount > 100000000) return NextResponse.json({ error: "Order total is invalid." }, { status: 400 });

    const slugs = [...new Set(priced.map((x) => x.product.slug))];
    const pr = await db("products?slug=in.(" + slugs.map(encodeURIComponent).join(",") + ")&select=id,slug");
    if (!pr.ok) return NextResponse.json({ error: "Unable to verify products for checkout." }, { status: 500 });
    const productRows = await pr.json() as { id: string; slug: string }[];
    for (const item of priced) {
      const row = productRows.find((x) => x.slug === item.product.slug);
      if (!row) return NextResponse.json({ error: "A product is not available for checkout." }, { status: 400 });
      item.productId = row.id;
    }

    const orderNumber = "DPB-" + crypto.randomUUID().replace(/-/g, "").slice(0, 20).toUpperCase();
    const ins = await db("orders", { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify({
      order_number: orderNumber, email, name, phone: phone || null, amount_paise: totalAmount, currency: "INR", status: "PENDING", payment_reference: orderNumber,
    }) });
    if (!ins.ok) return NextResponse.json({ error: "Unable to create your order." }, { status: 500 });
    const order = (await ins.json())[0];
    const itemRes = await db("order_items", { method: "POST", headers: { Prefer: "return=minimal" }, body: JSON.stringify(priced.map((item) => ({
      order_id: order.id, product_id: item.productId, product_name: item.product.name, variant_name: item.plan, price_paise: item.amountPaise, quantity: item.quantity,
    }))) });
    if (!itemRes.ok) return NextResponse.json({ error: "Unable to prepare your order. Please contact support before retrying if an order number was shown." }, { status: 500 });

    let checkoutUrl = paymentUrl;
    if (razorpayConfigured()) {
      try {
        const description = priced.length === 1 ? priced[0].product.name + " — " + priced[0].plan : "Digital Products Bundle order (" + priced.length + " items)";
        const link = await createRazorpayPaymentLink({
          amount: totalAmount, referenceId: orderNumber, description, customer: { name, email, phone },
          callbackUrl: siteUrl + "/payment/success?order=" + encodeURIComponent(orderNumber),
          notes: { order_number: orderNumber, item_count: String(priced.length), product_slugs: slugs.join(",").slice(0, 250) },
        });
        checkoutUrl = link.short_url;
        const updated = await db("orders?id=eq." + encodeURIComponent(order.id), { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ provider_order_id: link.id, payment_reference: orderNumber, updated_at: new Date().toISOString() }) });
        if (!updated.ok) return NextResponse.json({ error: "Unable to finish payment setup." }, { status: 500 });
      } catch {
        return NextResponse.json({ error: "We could not create the secure payment link. Please try again." }, { status: 502 });
      }
    }
    if (!checkoutUrl) return NextResponse.json({ error: "Payment is not configured yet." }, { status: 503 });
    return NextResponse.json({ orderNumber, paymentUrl: checkoutUrl, returnUrl: siteUrl + "/payment/success?order=" + encodeURIComponent(orderNumber) });
  } catch {
    return NextResponse.json({ error: "Unable to start checkout. Please try again." }, { status: 500 });
  }
}