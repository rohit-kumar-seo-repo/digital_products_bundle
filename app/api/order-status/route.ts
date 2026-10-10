import { NextResponse } from "next/server";
import { supabaseUrl } from "@/lib/store-config";

export async function GET(req: Request) {
  const order = new URL(req.url).searchParams.get("order")?.trim() || "";
  if (!/^DPB-[A-Z0-9]{20}$/.test(order)) return NextResponse.json({ error: "Enter a valid order number." }, { status: 400 });
  if (!supabaseUrl) return NextResponse.json({ error: "Order status is temporarily unavailable." }, { status: 503 });
  try {
    const response = await fetch(supabaseUrl + "/functions/v1/order-status?order=" + encodeURIComponent(order), { headers: { "Cache-Control": "no-store" }, cache: "no-store" });
    if (!response.ok) return NextResponse.json({ error: "Unable to check order status right now." }, { status: 502 });
    const data = await response.json();
    return NextResponse.json(data, { headers: { "Cache-Control": "no-store, max-age=0" } });
  } catch {
    return NextResponse.json({ error: "Unable to check order status right now." }, { status: 502 });
  }
}