import Link from "next/link";
import { Reveal } from "@/components/motion";
import ContactForm from "@/components/contact-form";

export const metadata = {
  title: "Contact | Digital Products Bundle",
  description: "Contact Digital Products Bundle for product questions, order help and pre-purchase support.",
};

export default function Contact() {
  return <main className="infoV3"><div className="container">
    <Reveal><span className="eyebrow">06 / SUPPORT</span><h1>Need a hand?<br/><em>We're here.</em></h1><p className="infoLead">Questions before purchase or help with an order? Send a message and include your order number when relevant.</p></Reveal>
    <div className="checkoutV3Grid" style={{alignItems:"start",marginTop:36}}>
      <Reveal><ContactForm /></Reveal>
      <Reveal className="contactV3" delay={100}><span className="eyebrow">DIGITAL PRODUCTS BUNDLE</span><h2>Product support<br/>Order help<br/>Pre-purchase questions</h2><p>For urgent access or activation questions, contact store support. WA Sender also has product-specific activation support listed on its product page.</p><div className="contactActions"><a className="button buttonLight" href="tel:+919871530594">Call +91 98715 30594 ↗</a><Link className="button buttonDark" href="/products">Browse products ↗</Link></div></Reveal>
    </div>
  </div></main>;
}