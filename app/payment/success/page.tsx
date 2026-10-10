import { supabaseUrl } from "@/lib/store-config";
import PaymentStatus from "@/components/payment-status";

type Order = { orderNumber: string; status: string; amountPaise: number; currency: string; paidAt: string | null; productName: string; variantName: string | null; accessUrl: string | null; delivery: string; support: string | null; emailSent: boolean };
async function getOrderStatus(orderNumber: string): Promise<Order | null> {
  if (!supabaseUrl || !/^DPB-[A-Z0-9]{20}$/.test(orderNumber)) return null;
  try {
    const response = await fetch(supabaseUrl + "/functions/v1/order-status?order=" + encodeURIComponent(orderNumber), { headers: { "Cache-Control": "no-store" }, cache: "no-store" });
    if (!response.ok) return null;
    const data = await response.json();
    return data.order || null;
  } catch { return null; }
}
export default async function Success({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const q = await searchParams;
  const orderNumber = q.order || "";
  const order = orderNumber ? await getOrderStatus(orderNumber) : null;
  return <main className="successV3"><div className="container"><PaymentStatus orderNumber={orderNumber} initialOrder={order}/></div></main>;
}