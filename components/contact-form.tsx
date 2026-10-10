"use client";
import { useState } from "react";

export default function ContactForm() {
  const [state, setState] = useState<"idle"|"sending"|"sent"|"error">("idle");
  const [message, setMessage] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setState("sending"); setMessage("");
    const form = new FormData(e.currentTarget);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form.entries())) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to send your message.");
      setState("sent"); setMessage("Your message has been sent. Keep your order number handy if you need to follow up."); formElement.reset();
    } catch (error) { setState("error"); setMessage(error instanceof Error ? error.message : "Unable to send your message."); }
  }
  return <form className="checkoutCard" onSubmit={submit}>
    <h3>Send a message</h3>
    <label>Your name<input name="name" required maxLength={100} autoComplete="name" placeholder="Full name"/></label>
    <label>Email address<input name="email" required type="email" maxLength={254} autoComplete="email" placeholder="you@example.com"/></label>
    <label>Order number <span className="optional">optional</span><input name="orderNumber" maxLength={40} placeholder="DPB-…"/></label>
    <label>How can we help?<textarea name="message" required minLength={10} maxLength={3000} rows={5} placeholder="Tell us what you need help with."/></label>
    <label aria-hidden="true" style={{position:"absolute",width:1,height:1,overflow:"hidden",clipPath:"inset(50%)"}}>Leave this empty<input name="website" tabIndex={-1} autoComplete="off"/></label>
    {message && <p role="status" className={state==="error"?"formError":""}>{message}</p>}
    <button className="button buttonDark full" disabled={state==="sending"}>{state==="sending"?"Sending…":"Send message"}</button>
    <small>Messages are sent to store support. Never include passwords or payment card details.</small>
  </form>;
}