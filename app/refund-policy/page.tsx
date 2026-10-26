import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "How to request review of a refund, duplicate payment, missing digital access or product-delivery issue at Digital Products Bundle.",
  alternates: { canonical: "/refund-policy" },
};

export default function Refund() {
  return (
    <main className="legalV3">
      <div className="container">
        <Reveal>
          <span className="eyebrow">LEGAL / 01</span>
          <h1>Refund<br /><em>Policy</em></h1>
          <p>This policy explains how we review refund and payment issues for software, downloadable files, templates and other digital products.</p>
          <p className="legalUpdatedV1">Last reviewed: 26 October 2026</p>
        </Reveal>
        <div className="legalBodyV3 legalBodyLongV1">
          <section>
            <h2>1. Review the product before purchase</h2>
            <p>Before paying, check the product description, included files or access, platform requirements, license, price, delivery method and support details. If an important requirement or license term is unclear, contact us through the <Link href="/contact">Contact page</Link> before checkout.</p>
          </section>
          <section>
            <h2>2. When to contact support</h2>
            <p>Please contact us if you believe any of the following has happened:</p>
            <ul>
              <li>You were charged more than once for the same order.</li>
              <li>Payment appears successful but the order remains unconfirmed or the product is unavailable.</li>
              <li>A download or access link is broken, points to the wrong item or cannot be used as described.</li>
              <li>The delivered files or access materially differ from the description that applied when you purchased.</li>
              <li>A software activation or other product-specific delivery step has not been completed as described.</li>
            </ul>
            <p>We may ask for information reasonably needed to locate the transaction and understand the issue. Do not send full card details, passwords or one-time verification codes.</p>
          </section>
          <section>
            <h2>3. How requests are reviewed</h2>
            <p>Each request is considered against the order record, the product description and license at the time of purchase, the delivery or activation status, the evidence provided and applicable law. We may first offer a practical fix, such as restoring access or supplying a missing file, where that resolves the issue and is appropriate.</p>
            <p>Digital delivery or access may affect refund eligibility, but it does not mean every request is automatically rejected. A change of mind, compatibility issue or mistaken selection will be reviewed according to the circumstances and the applicable product terms and law.</p>
          </section>
          <section>
            <h2>4. How to make a request</h2>
            <p>Use the <Link href="/contact">Contact page</Link> or the support contact shown on your product page. Include:</p>
            <ul>
              <li>Your order number and the email used at checkout.</li>
              <li>The product or plan purchased and the date of payment, if known.</li>
              <li>A concise description of the issue and what you have already tried.</li>
              <li>Relevant evidence, such as an error message or payment reference, with sensitive payment credentials removed.</li>
            </ul>
          </section>
          <section>
            <h2>5. Approved refunds and payment timing</h2>
            <p>Where a refund is approved, it will normally be requested through the original payment route where that route supports it. The time for funds to appear can depend on the payment provider, bank or payment method. We cannot guarantee the processing time controlled by those providers.</p>
            <p>If a payment appears to have failed but money was debited, do not immediately repeat the payment. Contact support so the original transaction can be checked first.</p>
          </section>
          <section>
            <h2>6. Product-specific conditions and legal rights</h2>
            <p>Some software or third-party access products have specific activation, compatibility or license conditions stated on their product page. Read those conditions before purchase. They do not remove rights or remedies that cannot legally be excluded under applicable law.</p>
          </section>
          <section>
            <h2>Need help?</h2>
            <p>We will review the details available and respond with the next step or applicable resolution. For order support, include your order number so we can identify the purchase. See also the <Link href="/faq">FAQs</Link> and <Link href="/terms">Terms and Conditions</Link>.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
