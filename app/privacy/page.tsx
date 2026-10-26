import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Digital Products Bundle uses order, contact and technical information to operate the store and deliver digital purchases.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <main className="legalV3">
      <div className="container">
        <Reveal>
          <span className="eyebrow">LEGAL / 03</span>
          <h1>Privacy<br /><em>Policy</em></h1>
          <p>This policy explains what information may be processed when you browse the store, place an order, receive digital access or contact support.</p>
          <p className="legalUpdatedV1">Last reviewed: 26 October 2026</p>
        </Reveal>
        <div className="legalBodyV3 legalBodyLongV1">
          <section>
            <h2>1. Who operates this store</h2>
            <p>Digital Products Bundle is maintained by R.K Digital Media. For a privacy question or request concerning an order, visit the <Link href="/contact">Contact page</Link>. Include only the information needed to identify your request; do not send passwords, full payment-card details or authentication codes.</p>
          </section>
          <section>
            <h2>2. Information we may collect</h2>
            <ul>
              <li><strong>Order and contact details:</strong> name, email address, phone number if supplied, order number, product or plan selected, order total and payment status.</li>
              <li><strong>Support information:</strong> messages or details you choose to share when asking about a product, payment, refund or delivery.</li>
              <li><strong>Technical and security information:</strong> information needed to keep the website and checkout operating, troubleshoot errors, protect order access and prevent abuse.</li>
              <li><strong>Transaction records:</strong> payment references and order status returned through the configured payment provider. The payment provider handles payment credentials through its own checkout flow.</li>
            </ul>
          </section>
          <section>
            <h2>3. How information is used</h2>
            <p>Information is used to prepare and verify orders, process payments, deliver the purchased product, respond to support requests, investigate payment or access problems, maintain service security, keep accounting records and meet applicable legal obligations.</p>
            <p>We do not ask you to provide information that is unrelated to an order or support request. Please do not include sensitive personal information in a message unless it is necessary and support has asked for it through an appropriate channel.</p>
          </section>
          <section>
            <h2>4. Service providers and sharing</h2>
            <p>Information may be processed by service providers needed to run the store, such as the payment provider, website hosting and database providers, transactional-email services where configured, or a third-party platform used to deliver a product. We share information with a provider only to the extent needed for its relevant service, security or legal obligation.</p>
            <p>We do not sell customer personal information. A third-party product platform may process information under its own terms and privacy notice when you create or use an account there. Review that platform's terms before connecting an account or opening an access link.</p>
          </section>
          <section>
            <h2>5. Payments and order security</h2>
            <p>Payments are handled through the configured payment provider. The store records the order details and payment references needed to confirm whether an order has been paid and which product should be delivered; it is not intended to store your full payment-card credentials.</p>
            <p>Protected product links may be checked against order status before a download is provided. Do not share order-specific access links publicly. If you believe someone else has accessed your order, contact support and include the order number.</p>
          </section>
          <section>
            <h2>6. Cookies and browser storage</h2>
            <p>The website may use essential browser storage or similar technologies to remember a shopping-cart selection, maintain basic site functionality and support security. Blocking browser storage may affect parts of the shopping or checkout experience. Third-party payment pages may use their own technologies under their own privacy terms.</p>
          </section>
          <section>
            <h2>7. Retention and security</h2>
            <p>Order, payment and support records are kept for as long as reasonably needed to deliver purchases, resolve disputes, maintain security and meet accounting or legal requirements. Retention periods may differ depending on the type of record and applicable requirements.</p>
            <p>Reasonable technical and organizational safeguards are used to protect information. No internet transmission or storage system can be guaranteed completely secure, so please use a unique password for third-party accounts and do not send secrets in support messages.</p>
          </section>
          <section>
            <h2>8. Your choices and requests</h2>
            <p>You may contact us to ask what order information is associated with your purchase or to request correction or deletion where applicable law allows. We may need to verify your identity and may need to keep some records where required for transactions, dispute handling, fraud prevention or law.</p>
            <p>Where you use a third-party service to access a product, requests about information held by that service may need to be directed to that provider.</p>
          </section>
          <section>
            <h2>9. Children's information</h2>
            <p>This store is intended for people able to make a digital purchase or use the products under the applicable terms. Please contact us if you believe a child has provided personal information improperly, so we can review the request and take appropriate steps subject to applicable law.</p>
          </section>
          <section>
            <h2>10. Changes to this policy</h2>
            <p>This policy may be updated when the store's data practices or legal requirements change. The review date above indicates when the page was last checked. Please return to this page when making a new purchase.</p>
          </section>
          <section>
            <h2>Questions about privacy</h2>
            <p>For privacy questions, access or correction requests, or concerns about order information, contact support through the <Link href="/contact">Contact page</Link>. Please provide your order number only when it is relevant to your request.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
