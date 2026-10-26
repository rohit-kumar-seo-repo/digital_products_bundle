import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms for purchasing and using digital products from Digital Products Bundle, including licensing, payment, delivery and support.",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return (
    <main className="legalV3">
      <div className="container">
        <Reveal>
          <span className="eyebrow">LEGAL / 02</span>
          <h1>Terms &amp;<br /><em>Conditions</em></h1>
          <p>These terms explain how the Digital Products Bundle store operates, how orders are processed and the conditions that apply to digital products.</p>
          <p className="legalUpdatedV1">Last reviewed: 26 October 2026</p>
        </Reveal>
        <div className="legalBodyV3 legalBodyLongV1">
          <section>
            <h2>1. Store operator and contact</h2>
            <p>This website is maintained by R.K Digital Media. For product questions, order support or a concern about these terms, visit the <Link href="/contact">Contact page</Link>. Keep your order number and the email used at checkout available when requesting order help.</p>
            <p>The seller name and transaction details shown on your payment confirmation or invoice apply to that particular transaction. Please review those details and contact support promptly if they appear incorrect.</p>
          </section>
          <section>
            <h2>2. Product information and availability</h2>
            <p>Each product page should explain the product's contents, price, access method, requirements and available support. Digital products may include software, downloadable files, templates or access to third-party services. Check the specific product page and any supplied license before purchasing.</p>
            <p>We aim to keep listings accurate. File inventories, compatibility, third-party services and product features can change; where a material difference affects an existing order, contact support so it can be reviewed. A listing or preview should not be treated as a promise of a business result, search position, lead volume or revenue.</p>
          </section>
          <section>
            <h2>3. Prices, orders and payment</h2>
            <p>Prices are shown on the product page and at checkout. Unless a product page clearly states otherwise, the current store checkout is a one-time payment flow, not an automatic recurring subscription. Any product-specific term, license duration or renewal arrangement must be read before paying.</p>
            <p>An order may be created as pending while the payment provider processes the transaction. We treat an order as paid only after server-side payment verification. A payment-provider redirect or screenshot alone is not proof of a verified order. Do not submit a second payment simply because delivery appears delayed; contact support with the original order details first.</p>
            <p>If a listing or checkout displays an apparent pricing or technical error, please contact support before relying on the incorrect display. This does not affect consumer rights that cannot be excluded under applicable law.</p>
          </section>
          <section>
            <h2>4. Digital delivery and access</h2>
            <p>Delivery starts after successful payment verification. Depending on the product, access may be provided by a protected download, a file or folder link, a Canva link, or software activation instructions. Product-specific delivery estimates are stated on the relevant page where available; third-party service delays or manual activation may affect timing.</p>
            <p>Access links may be intended for the purchaser and may rely on a third-party account or platform. Keep them secure and do not publish or share private order links. If a link fails or the supplied access does not match the order, contact support instead of purchasing again.</p>
          </section>
          <section>
            <h2>5. License and acceptable use</h2>
            <p>The license supplied or linked for the specific product controls how that product may be used. Buying a file does not automatically transfer ownership of the underlying intellectual property or grant permission to resell, redistribute, sublicense or publish the original files. Confirm client-work, commercial-use, multi-site and redistribution rights in the applicable license before use.</p>
            <p>You are responsible for using products lawfully and following the rules of any connected platform. For messaging tools, contact lists, customer data and outreach, you are responsible for having the permissions and legal basis required for your communications. Do not use a product to send unlawful, deceptive or unwanted messages, or to bypass a platform's safeguards.</p>
          </section>
          <section>
            <h2>6. Third-party tools and services</h2>
            <p>Some products depend on services such as WordPress, Shopify, Canva, Google Drive or other platforms. Those services have their own terms, technical limits, account requirements and availability. We do not control their infrastructure, account decisions or future product changes. A reference to a third-party brand does not mean that the brand endorses this store or the product unless explicitly stated.</p>
          </section>
          <section>
            <h2>7. Support, updates and changes</h2>
            <p>Support scope varies by product and is described on its product page. Support may help with order access, delivery instructions and product questions; it does not automatically include custom development, installation, marketing services or troubleshooting of unrelated third-party systems.</p>
            <p>Updates are included only where the relevant listing or license says they are. Statements such as lifetime access should be interpreted alongside the specific product terms and any third-party dependencies described on the listing.</p>
          </section>
          <section>
            <h2>8. Refunds and consumer rights</h2>
            <p>Refund requests are handled under the published <Link href="/refund-policy">Refund Policy</Link>, the facts of the order and applicable law. Digital delivery may affect eligibility, but nothing in these terms is intended to remove a right or remedy that cannot legally be excluded.</p>
          </section>
          <section>
            <h2>9. Website availability and security</h2>
            <p>We use reasonable measures to operate the storefront and protect order access, but cannot promise uninterrupted access to the website or third-party services. Please report broken links, suspected unauthorized access or order discrepancies through the Contact page.</p>
          </section>
          <section>
            <h2>10. Changes to these terms</h2>
            <p>These terms may be updated as the store, products or legal requirements change. The page's review date indicates when it was last checked. The terms applicable to a purchase should be read together with its product listing, order confirmation and specific license. If a material concern affects an existing order, contact support.</p>
          </section>
          <section>
            <h2>Related policies</h2>
            <p>Read the <Link href="/privacy">Privacy Policy</Link>, <Link href="/refund-policy">Refund Policy</Link> and <Link href="/faq">FAQs</Link> before checkout.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
