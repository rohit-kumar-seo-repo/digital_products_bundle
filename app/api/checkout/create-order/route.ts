import crypto from "crypto";
import { NextResponse } from "next/server";
import { getProduct } from "@/lib/products";
import { createRazorpayPaymentLink, razorpayConfigured } from "@/lib/razorpay";
import { paymentUrl, siteUrl, supabaseKey, supabaseUrl } from "@/lib/store-config";

async function db(path: string, init: RequestInit = {}) {
  return fetch(supabaseUrl + "/rest/v1/" + path, {
    ...init,
    headers: {
      apikey: supabaseKey,
      Authorization: "Bearer " + supabaseKey,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const p = getProduct(String(body.product || ""));
    if (!p) return NextResponse.json({ error: "Product not found" }, { status: 404 });

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Checkout is being configured. Please try again shortly." }, { status: 503 });
    }

    const email = String(body.email || "").trim().toLowerCase();
    const name = String(body.name || "").trim();
    const phone = String(body.phone || "").trim();

    if (!email || !name) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    const plan = p.pricing?.find((x) => x.label === body.plan) || p.pricing?.[0];
    const amount = plan ? Number(plan.price.replace(/[^0-9]/g, "")) * 100 : 0;
    if (!amount) {
      return NextResponse.json({ error: "Product price is not configured." }, { status: 400 });
    }

    const orderNumber = "DPB-" + crypto.randomUUID().replace(/-/g, "").slice(0, 20).toUpperCase();

    const ins = await db("orders", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify({
        order_number: orderNumber,
        email,
        name,
        phone: phone || null,
        amount_paise: amount,
        currency: "INR",
        status: "PENDING",
        payment_reference: orderNumber,
      }),
    });

    if (!ins.ok) {
      return NextResponse.json({ error: "Unable to create your order." }, { status: 500 });
    }

    const order = (await ins.json())[0];

    const pr = await db("products?slug=eq." + encodeURIComponent(p.slug) + "&select=id");
    if (!pr.ok) {
      return NextResponse.json({ error: "Unable to prepare your order." }, { status: 500 });
    }

    const rows = await pr.json();
    if (!rows[0]?.id) {
      return NextResponse.json({ error: "Product is not available for checkout." }, { status: 400 });
    }

    const itemRes = await db("order_items", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        order_id: order.id,
        product_id: rows[0].id,
        product_name: p.name,
        variant_name: plan?.label || null,
        price_paise: amount,
        quantity: 1,
      }),
    });

    if (!itemRes.ok) {
      return NextResponse.json({ error: "Unable to prepare your order." }, { status: 500 });
    }

    let checkoutUrl = paymentUrl;

    if (razorpayConfigured()) {
      try {
        const link = await createRazorpayPaymentLink({
          amount,
          referenceId: orderNumber,
          description: p.name + (plan?.label ? " — " + plan.label : ""),
          customer: { name, email, phone },
          callbackUrl: siteUrl + "/payment/success?order=" + encodeURIComponent(orderNumber),
          notes: { order_number: orderNumber, product: p.slug, plan: plan?.label || "" },
        });

        checkoutUrl = link.short_url;

        const updated = await db("orders?id=eq." + encodeURIComponent(order.id), {
          method: "PATCH",
          headers: { Prefer: "return=minimal" },
          body: JSON.stringify({
            provider_order_id: link.id,
            payment_reference: orderNumber,
            updated_at: new Date().toISOString(),
          }),
        });

        if (!updated.ok) {
          return NextResponse.json({ error: "Unable to finish payment setup." }, { status: 500 });
        }
      } catch {
        return NextResponse.json(
          { error: "We could not create the secure payment link. Please try again." },
          { status: 502 }
        );
      }
    }

    if (!checkoutUrl) {
      return NextResponse.json({ error: "Payment is not configured yet." }, { status: 503 });
    }

    return NextResponse.json({
      orderNumber,
      paymentUrl: checkoutUrl,
      returnUrl: siteUrl + "/payment/success?order=" + encodeURIComponent(orderNumber),
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unable to start checkout." },
      { status: 500 }
    );
  }
}
