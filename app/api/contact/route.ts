import { NextResponse } from "next/server";
import { emailFrom, resendApiKey } from "@/lib/store-config";

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (clean(body.website, 200)) return NextResponse.json({ ok: true });
    const name = clean(body.name, 100);
    const email = clean(body.email, 254).toLowerCase();
    const orderNumber = clean(body.orderNumber, 40);
    const message = clean(body.message, 3000);
    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
      return NextResponse.json({ error: "Enter a valid name, email address and message (at least 10 characters)." }, { status: 400 });
    }
    if (!resendApiKey) return NextResponse.json({ error: "The contact form is not connected to email yet. Please use the store phone contact while support email is configured." }, { status: 503 });
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: "Bearer " + resendApiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: emailFrom,
        to: ["support@digitalproductsbundle.in"],
        reply_to: email,
        subject: "Store support: " + name + (orderNumber ? " — " + orderNumber : ""),
        text: "Name: " + name + "\nEmail: " + email + "\nOrder: " + (orderNumber || "Not provided") + "\n\nMessage:\n" + message,
      }),
    });
    if (!response.ok) return NextResponse.json({ error: "We couldn't send your message right now. Please try again later or call store support." }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to process your message." }, { status: 400 });
  }
}