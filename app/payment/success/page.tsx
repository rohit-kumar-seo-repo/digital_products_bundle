import Link from "next/link";
import { supabaseUrl } from "@/lib/store-config";

type OrderStatus = {
  order: {
    orderNumber: string;
    status: string;
    amountPaise: number;
    currency: string;
    paidAt: string | null;
    productName: string;
    variantName: string | null;
    accessUrl: string | null;
    delivery: string;
    support: string | null;
    emailSent: boolean;
  } | null;
};

async function getOrderStatus(orderNumber: string): Promise<OrderStatus["order"] | null> {
  if (!supabaseUrl) return null;

  const response = await fetch(
    supabaseUrl + "/functions/v1/order-status?order=" + encodeURIComponent(orderNumber),
    {
      headers: { "Cache-Control": "no-store" },
      cache: "no-store",
    }
  );

  if (!response.ok) return null;

  const data = (await response.json()) as OrderStatus;
  return data.order || null;
}

export default async function Success({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const q = await searchParams;
  const order = q.order ? await getOrderStatus(q.order) : null;

  return (
    <main className="successV3">
      <div className="container">
        {order?.status === "PAID" ? (
          <div className="successV3Card">
            <span className="successOrb">✓</span>
            <span className="eyebrow">PAYMENT CONFIRMED / {order.orderNumber}</span>
            <h1>
              You're all
              <br />
              <em>set.</em>
            </h1>
            <p>
              Your payment for <b>{order.productName}</b>
              {order.variantName ? <> — {order.variantName}</> : null} has been confirmed.
            </p>

            {order.accessUrl ? (
              <a
                className="button buttonDark"
                href={order.accessUrl}
                target="_blank"
                rel="noreferrer"
              >
                Access your product ↗
              </a>
            ) : (
              <div className="successDelivery">
                <strong>Delivery instructions</strong>
                <p>{order.delivery}</p>
                {order.support ? <p>Support: {order.support}</p> : null}
              </div>
            )}

            <small>
              {order.emailSent
                ? "Your confirmation email has been sent."
                : "Your order is confirmed. If email delivery is enabled, your confirmation will arrive shortly."}
            </small>
            <Link href="/products">Continue shopping →</Link>
          </div>
        ) : (
          <div className="successV3Card pending">
            <span className="successOrb">...</span>
            <span className="eyebrow">ORDER / {q.order || "PENDING"}</span>
            <h1>
              We're checking
              <br />
              <em>your payment.</em>
            </h1>
            <p>
              Your order is waiting for verified payment confirmation. Access will appear here
              after Razorpay confirms the payment.
            </p>
            <Link className="button buttonDark" href="/products">
              Back to shop ↗
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
