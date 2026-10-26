import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Contact and Order Support",
  description: "Contact Digital Products Bundle for product questions, order access, payment discrepancies, privacy requests and pre-purchase support.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <main className="infoV3">
      <div className="container">
        <Reveal>
          <span className="eyebrow">SUPPORT / CONTACT</span>
          <h1>Need a hand?<br /><em>Let's sort it.</em></h1>
          <p className="infoLead">Get help with a product, an order, delivery access or a question before purchasing. Include your order number where relevant, but never send passwords or full payment-card details.</p>
        </Reveal>
        <div className="contactSupportGridV1">
          <Reveal className="contactSupportCardV1">
            <span className="eyebrow">ORDER AND PRODUCT HELP</span>
            <h2>Tell us what you need help with.</h2>
            <p>Use the phone contact below to ask about product contents, delivery status, a failed access link, activation or a payment discrepancy. Have your order number and purchase email ready so the transaction can be found.</p>
            <a className="button buttonDark" href="tel:+919871530594">Call +91 98715 30594 <span aria-hidden="true">↗</span></a>
          </Reveal>
          <Reveal className="contactSupportCardV1" delay={90}>
            <span className="eyebrow">BEFORE YOU BUY</span>
            <h2>Check the details first.</h2>
            <p>Review the product page for file formats, platform requirements, licensing, delivery and product-specific support. If a license or included asset is unclear, ask before paying.</p>
            <Link className="button buttonLight" href="/products">Browse all products <span aria-hidden="true">↗</span></Link>
          </Reveal>
        </div>
        <section className="contactSupportLinksV1">
          <span className="eyebrow">POLICIES AND ORDER INFORMATION</span>
          <div><Link href="/faq">Payment and delivery FAQs →</Link><Link href="/refund-policy">Refund policy →</Link><Link href="/privacy">Privacy requests →</Link><Link href="/terms">Terms and conditions →</Link></div>
        </section>
        <p className="contactSupportNoticeV1">Store maintained by R.K Digital Media. For order-specific help, use the same purchase email where possible. Do not share access tokens, passwords or one-time verification codes.</p>
      </div>
    </main>
  );
}
