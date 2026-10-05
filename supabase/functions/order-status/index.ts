import { withSupabase } from "npm:@supabase/server@1";

export default {
  fetch: withSupabase({ auth: "none" }, async (req, ctx) => {
    if (req.method !== "GET") return Response.json({ error: "Method not allowed" }, { status: 405 });

    const url = new URL(req.url);
    const orderNumber = (url.searchParams.get("order") || "").trim().toUpperCase();

    if (!/^DPB-[A-F0-9]{20}$/.test(orderNumber)) {
      return Response.json({ order: null }, { status: 200 });
    }

    const { data: order, error } = await ctx.supabaseAdmin
      .from("orders")
      .select("id,order_number,status,amount_paise,currency,paid_at,email_sent_at")
      .eq("order_number", orderNumber)
      .maybeSingle();

    if (error || !order) return Response.json({ order: null }, { status: 200 });

    const { data: item } = await ctx.supabaseAdmin
      .from("order_items")
      .select("product_id,product_name,variant_name")
      .eq("order_id", order.id)
      .limit(1)
      .maybeSingle();

    let product: any = null;
    if (item?.product_id) {
      const result = await ctx.supabaseAdmin
        .from("products")
        .select("drive_url,delivery,support")
        .eq("id", item.product_id)
        .maybeSingle();
      product = result.data;
    }

    return Response.json({
      order: {
        orderNumber: order.order_number,
        status: order.status,
        amountPaise: order.amount_paise,
        currency: order.currency,
        paidAt: order.paid_at,
        productName: item?.product_name || "Digital product",
        variantName: item?.variant_name || null,
        accessUrl: order.status === "PAID" ? product?.drive_url || null : null,
        delivery: product?.delivery || "Your digital product will be delivered after payment verification.",
        support: product?.support || null,
        emailSent: Boolean(order.email_sent_at),
      },
    });
  }),
};
