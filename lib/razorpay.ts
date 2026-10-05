import crypto from "crypto";

export function razorpayConfigured() {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
}

function basicAuth() {
  return Buffer.from(
    process.env.RAZORPAY_KEY_ID + ":" + process.env.RAZORPAY_KEY_SECRET
  ).toString("base64");
}

export async function createRazorpayPaymentLink(input: {
  amount: number;
  referenceId: string;
  description: string;
  customer: { name: string; email: string; phone?: string };
  callbackUrl: string;
  notes?: Record<string, string>;
}) {
  if (!razorpayConfigured()) {
    throw new Error("Razorpay API credentials are not configured.");
  }

  const response = await fetch("https://api.razorpay.com/v1/payment_links", {
    method: "POST",
    headers: {
      Authorization: "Basic " + basicAuth(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: input.amount,
      currency: "INR",
      reference_id: input.referenceId,
      description: input.description,
      customer: {
        name: input.customer.name,
        email: input.customer.email,
        ...(input.customer.phone ? { contact: input.customer.phone } : {}),
      },
      notify: { email: true, sms: false },
      reminder_enable: false,
      callback_url: input.callbackUrl,
      callback_method: "get",
      notes: input.notes || {},
    }),
  });

  const data = await response.json();

  if (!response.ok || !data?.id || !data?.short_url) {
    throw new Error(data?.error?.description || "Unable to create Razorpay payment link.");
  }

  return data as {
    id: string;
    short_url: string;
    status: string;
    reference_id: string;
  };
}

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
) {
  if (!process.env.RAZORPAY_KEY_SECRET || !signature) return false;

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(orderId + "|" + paymentId)
    .digest("hex");

  return expected.length === signature.length &&
    crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

export function verifyWebhook(rawBody: string, signature: string) {
  if (!process.env.RAZORPAY_WEBHOOK_SECRET || !signature) return false;

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");

  return expected.length === signature.length &&
    crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}
