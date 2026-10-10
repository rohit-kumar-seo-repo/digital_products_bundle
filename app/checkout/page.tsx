import Link from "next/link";
import { getProduct } from "@/lib/products";
import CheckoutForm from "@/components/checkout-form";
import { Reveal } from "@/components/motion";

type QueryItem = { product?: string; plan?: string; quantity?: number };
export default async function Checkout({ searchParams }: { searchParams: Promise<{ product?: string; plan?: string; items?: string }> }) {
  const q = await searchParams;
  let requested: QueryItem[] = [];
  if (q.items) {
    try { const parsed = JSON.parse(q.items); if (Array.isArray(parsed)) requested = parsed.slice(0, 20); } catch {}
  }
  if (!requested.length && q.product) requested = [{ product: q.product, plan: q.plan }];
  const items = requested.map((item) => {
    const product = getProduct(String(item.product || ""));
    if (!product) return null;
    const plan = product.pricing?.find((p) => p.label === item.plan) || product.pricing?.[0];
    const rupees = plan ? Number(plan.price.replace(/[^0-9]/g, "")) : 0;
    const quantity = Number.isSafeInteger(Number(item.quantity)) && Number(item.quantity) > 0 && Number(item.quantity) <= 10 ? Number(item.quantity) : 1;
    if (!plan || !rupees) return null;
    return { product, plan: plan.label, price: plan.price, amount: rupees * quantity, quantity };
  }).filter((item): item is NonNullable<typeof item> => Boolean(item));
  const total = items.reduce((sum, item) => sum + item.amount, 0);
  const valid = items.length > 0 && items.length === requested.length;
  return <main className="checkoutV3"><div className="container"><div className="checkoutNav"><Link href="/cart">← Cart</Link><span>CHECKOUT / SECURE</span></div>
    {!valid ? <div className="emptyV3"><h2>Select a valid product first.</h2><p>We couldn't verify every item in this checkout. Your cart has not been charged.</p><Link className="button buttonDark" href="/products">Browse products ↗</Link></div> :
      <div className="checkoutV3Grid"><Reveal><span className="eyebrow">03 / CHECKOUT</span><h1>Almost there.<br/><em>Let's make it simple.</em></h1><CheckoutForm items={items.map(({ product, plan, quantity }) => ({ product, plan, quantity }))}/></Reveal>
      <Reveal className="checkoutCardV3" delay={120}><span className="eyebrow">ORDER SUMMARY</span>
        {items.map((item, index) => <div className="checkoutProductV3" key={item.product.slug + item.plan + index}><div>{item.product.imageLabel}</div><section><b>{item.product.name}</b><span>{item.plan}{item.quantity > 1 ? " × " + item.quantity : ""}</span></section><strong>{item.price}</strong></div>)}
        <div className="checkoutLine"><span>{items.length} line item{items.length === 1 ? "" : "s"}</span><b>INR</b></div><div className="checkoutTotal"><span>Total</span><strong>₹{total.toLocaleString("en-IN")}</strong></div>
        <p>Payment is handled by the configured payment provider. Digital access is provided only after successful payment confirmation.</p>
        <div className="checkoutBadgesV3"><span>SECURE</span><span>DIGITAL</span><span>SUPPORT</span></div><small>By continuing, you agree to our <Link href="/terms">Terms</Link> and <Link href="/privacy">Privacy Policy</Link>.</small>
      </Reveal></div>}
  </div></main>;
}