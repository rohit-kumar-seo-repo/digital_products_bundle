import { NextResponse } from "next/server";
import { siteUrl, supabaseKey, supabaseUrl } from "@/lib/store-config";

export async function POST(req: Request) {
  const raw = await req.text();
  const signature = req.headers.get("x-razorpay-signature") || "";
  const eventId = req.headers.get("x-razorpay-event-id") || "";

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Webhook service is not configured." }, { status: 503 });
  }

  const endpoint =
    (process.env.SUPABASE_FUNCTIONS_URL || supabaseUrl) + "/functions/v1/razorpay-webhook";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      apikey: supabaseKey,
      "Content-Type": "application/json",
      "x-razorpay-signature": signature,
      "x-razorpay-event-id": eventId,
      "x-forwarded-host": new URL(siteUrl).host,
    },
    body: raw,
    cache: "no-store",
  });

  const text = await response.text();

  return new NextResponse(text || JSON.stringify({ received: response.ok }), {
    status: response.status,
    headers: { "Content-Type": response.headers.get("content-type") || "application/json" },
  });
}
