import Link from "next/link";
import { Reveal } from "@/components/motion";

const groups = [
  {
    label: "BEFORE YOU BUY",
    title: "Shopping questions",
    items: [
      ["What kind of products do you sell?", "Digital Products Bundle offers downloadable resources, software and digital bundles. Each product page explains exactly what is included, how it is delivered and what support is available."],
      ["Do I need an account to buy?", "No. The current store uses a guest checkout, so you can purchase without creating an account. We use the details you provide to process your order and deliver your product."],
      ["Can I see what I am getting before I pay?", "Yes. Product pages are designed to explain the product, features, pricing, delivery method and support before checkout. For products with a demo, the demo is available directly on the product page."],
    ],
  },
  {
    label: "PAYMENT & DELIVERY",
    title: "After you place an order",
    items: [
      ["What payment methods are supported?", "Checkout uses the store's configured Razorpay payment experience. The payment methods available to you are shown by Razorpay during checkout."],
      ["How do I receive my digital product?", "Delivery happens electronically after successful payment verification. The exact method depends on the product: some products provide an access link, while software products may require activation or support."],
      ["When will I receive my product?", "Most digital products are designed for fast delivery after payment verification. If a product requires manual activation or support, its product page will explain the expected delivery process."],
    ],
  },
  {
    label: "SUPPORT & REFUNDS",
    title: "If something goes wrong",
    items: [
      ["What if my payment was successful but I did not receive access?", "Do not purchase again. Contact support with your order number and the email used at checkout. We can check the order status and help complete the delivery."],
      ["Can I get a refund?", "Refund eligibility depends on the product, delivery status and the published refund terms. Digital products that have already been successfully delivered may not be eligible for an automatic refund. Review the Refund Policy before purchasing."],
      ["How do I contact support?", "For order or product help, use the Contact page or the support details shown on the relevant product page. Include your order number so we can identify the purchase quickly."],
    ],
  },
];

export const metadata = {
  title: "Help & FAQs | Digital Products Bundle",
  description: "Clear answers about digital products, payment, delivery, refunds and customer support.",
};

export default function FAQ() {
  let number = 1;

  return (
    <main className="helpPageV4">
      <div className="container">
        <Reveal>
          <div className="helpHeroV4">
            <div>
              <span className="eyebrow">04 / HELP CENTRE</span>
              <h1>Answers before<br /><em>you buy.</em></h1>
            </div>
            <div className="helpHeroSideV4">
              <p>Everything you need to know about purchasing, receiving and getting support for a digital product.</p>
              <div className="helpHeroLinksV4">
                <Link href="/products">Browse products →</Link>
                <Link href="/contact">Contact support →</Link>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="helpQuickV4">
          <div><span>01</span><strong>Choose</strong><p>Review the product page and what is included.</p></div>
          <div><span>02</span><strong>Pay</strong><p>Complete checkout through the configured payment flow.</p></div>
          <div><span>03</span><strong>Receive</strong><p>Get your digital access after payment is verified.</p></div>
        </div>

        <div className="helpGroupsV4">
          {groups.map((group) => (
            <section key={group.label} className="helpGroupV4">
              <div className="helpGroupHeadV4">
                <span className="eyebrow">{group.label}</span>
                <h2>{group.title}</h2>
              </div>
              <div className="helpQuestionsV4">
                {group.items.map(([question, answer]) => {
                  const current = String(number).padStart(2, "0");
                  number += 1;
                  return (
                    <Reveal key={question}>
                      <details>
                        <summary>
                          <span className="helpQuestionNoV4">{current}</span>
                          <strong>{question}</strong>
                          <b aria-hidden="true">+</b>
                        </summary>
                        <div className="helpAnswerV4"><p>{answer}</p></div>
                      </details>
                    </Reveal>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <Reveal>
          <section className="helpBottomV4">
            <div>
              <span className="eyebrow">STILL NEED HELP?</span>
              <h2>Ask us before<br /><em>you order.</em></h2>
            </div>
            <div>
              <p>If your question is product-specific, send us the product name and what you need to know. We would rather clarify it before purchase than leave you guessing.</p>
              <Link className="button buttonDark" href="/contact">Contact support →</Link>
            </div>
          </section>
        </Reveal>
      </div>
    </main>
  );
}