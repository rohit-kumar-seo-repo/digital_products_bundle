import { withSupabase } from "npm:@supabase/server@1";

const hex = (bytes: Uint8Array) =>
  Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");

async function verifyWebhook(raw: string, signature: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const digest = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(raw))
  );
  const expected = hex(digest);
  return expected.length === signature.length &&
    crypto.subtle.timingSafeEqual
      ? crypto.subtle.timingSafeEqual(new TextEncoder().encode(expected), new TextEncoder().encode(signature))
      : expected === signature;
}

async function sendConfirmationEmail(order: any, product: any, orderNumber: string) {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey || !order?.email) return false;

  const from = Deno.env.get("EMAIL_FROM") || "orders@digitalproductsbundle.in";
  const accessUrl = product?.drive_url
    ? Deno.env.get("SITE_URL") + "/payment/success?order=" + encodeURIComponent(orderNumber)
    : Deno.env.get("SITE_URL") + "/payment/success?order=" + encodeURIComponent(orderNumber);

  const html = product?.drive_url
    ? `<div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;padding:32px"><h1>Payment confirmed</h1><p>Your order <strong>${orderNumber}</strong> for <strong>${product.name}</strong> is confirmed.</p><p><a href="${accessUrl}" style="display:inline-block;padding:12px 18px;background:#111;color:#fff;text-decoration:none;border-radius:8px">Open your order</a></p><p>Your product access is available from the order page after verification.</p></div>`
    : `<div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;padding:32px"><h1>Payment confirmed</h1><p>Your order <strong>${orderNumber}</strong> for <strong>${product?.name || "your digital product"}</strong> is confirmed.</p><p><a href="${accessUrl}" style="display:inline-block;padding:12px 18px;background:#111;color:#fff;text-decoration:none;border-radius:8px">View delivery instructions</a></p></div>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + apiKey,
      "Content-Type": "application/json",
      "Idempotency-Key": "order-confirmation-" + order.id,
    },
    body: JSON.stringify({
      from,
      to: [order.email],
      subject: "Payment confirmed — " + orderNumber,
      html,
    }),
  });

  return response.ok;
}

export default {
  fetch: withSupabase({ auth: "none" }, async (req, ctx) => {
    if (req.method !== "POST") return Response.json({ error: "Method not allowed" }, { status: 405 });

    const raw = await req.text();
    const signature = req.headers.get("x-razorpay-signature") || "";
    const eventId = req.headers.get("x-razorpay-event-id") || "";
    const webhookSecret = Deno.env.get("RAZORPAY_WEBHOOK_SECRET") || "";

    if (!webhookSecret) {
      return Response.json({ error: "Webhook secret is not configured." }, { status: 503 });
    }

    if (!(await verifyWebhook(raw, signature, webhookSecret))) {
      return Response.json({ error: "Invalid webhook signature." }, { status: 401 });
    }

    let event: any;
    try {
      event = JSON.parse(raw);
    } catch {
      return Response.json({ error: "Invalid JSON payload." }, { status: 400 });
    }

    if (!eventId) return Response.json({ error: "Missing event id." }, { status: 400 });

    const eventInsert = await ctx.supabaseAdmin.from("webhook_events").insert({
      provider: "razorpay",
      event_id: eventId,
      event_type: event.event || "unknown",
      payload: event,
    });

    if (eventInsert.error) {
      if (eventInsert.error.code === "23505") {
        return Response.json({ received: true, duplicate: true });
      }
      return Response.json({ error: "Unable to record webhook." }, { status: 500 });
    }

    if (event.event !== "payment_link.paid") {
      return Response.json({ received: true });
    }

    const link = event?.payload?.payment_link?.entity;
    const payment = event?.payload?.payment?.entity;
    const referenceId = String(link?.reference_id || "");
    const paymentLinkId = String(link?.id || "");
    const paymentId = String(payment?.id || "");

    if (!referenceId || !paymentLinkId || !paymentId) {
      return Response.json({ error: "Payment payload is incomplete." }, { status: 400 });
    }

    const { data: order, error: orderError } = await ctx.supabaseAdmin
      .from("orders")
      .select("id,order_number,email,name,amount_paise,currency,status,email_sent_at")
      .or(`order_number.eq.${referenceId},provider_order_id.eq.${paymentLinkId}`)
      .limit(1)
      .maybeSingle();

    if (orderError || !order) {
      return Response.json({ error: "Order not found." }, { status: 404 });
    }

    if (order.status !== "PAID") {
      const paidAmount = Number(payment?.amount ?? link?.amount_paid ?? 0);
      if (paidAmount && paidAmount < order.amount_paise) {
        return Response.json({ error: "Payment amount is lower than the order amount." }, { status: 400 });
      }

      const { error: updateError } = await ctx.supabaseAdmin
        .from("orders")
        .update({
          status: "PAID",
          provider_order_id: paymentLinkId,
          provider_payment_id: paymentId,
          payment_reference: referenceId,
          paid_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", order.id);

      if (updateError) {
        return Response.json({ error: "Unable to mark order paid." }, { status: 500 });
      }
    }

    const { data: item } = await ctx.supabaseAdmin
      .from("order_items")
      .select("product_id,product_name,variant_name,price_paise")
      .eq("order_id", order.id)
      .limit(1)
      .maybeSingle();

    let product: any = null;
    if (item?.product_id) {
      const result = await ctx.supabaseAdmin
        .from("products")
        .select("id,name,drive_url,delivery,support")
        .eq("id", item.product_id)
        .maybeSingle();
      product = result.data;
    }

    if (!order.email_sent_at && product) {
      const sent = await sendConfirmationEmail(order, product, order.order_number);
      if (sent) {
        await ctx.supabaseAdmin
          .from("orders")
          .update({ email_sent_at: new Date().toISOString(), updated_at: new Date().toISOString() })
          .eq("id", order.id);
      }
    }

    return Response.json({ received: true, orderNumber: order.order_number, status: "PAID" });
  }),
};
