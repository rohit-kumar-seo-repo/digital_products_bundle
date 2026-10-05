"use client";

import Link from "next/link";
import { useCart } from "@/components/store";
import { getProduct } from "@/lib/products";
import { Reveal } from "@/components/motion";

export default function Cart() {
  const { cart, remove } = useCart();

  return (
    <main className="transactionV3">
      <div className="container">
        <div className="transactionHead">
          <span className="eyebrow">02 / CART</span>
          <h1>Your selected<br /><em>digital goods.</em></h1>
          <p>Review your selection before moving to checkout.</p>
        </div>

        {!cart.length ? (
          <div className="emptyV3">
            <span>YOUR CART / 00</span>
            <h2>Nothing here yet.</h2>
            <p>Find something useful and bring it back here.</p>
            <Link className="button buttonDark" href="/products">Browse the shop ↗</Link>
          </div>
        ) : (
          <div className="cartV3">
            <section>
              {cart.map((item, index) => {
                const product = getProduct(item.slug);
                if (!product) return null;

                const selectedPrice =
                  product.pricing?.find((plan) => plan.label === item.plan)?.price ??
                  product.pricing?.[0]?.price ??
                  "Digital";

                return (
                  <Reveal key={index} delay={index * 80}>
                    <article className="cartItemV3">
                      <div className="cartNumber">0{index + 1}</div>
                      <div className="cartVisual">{product.imageLabel}</div>
                      <div className="cartInfo">
                        <span>{product.category}</span>
                        <strong>{product.name}</strong>
                        <small>{item.plan}</small>
                      </div>
                      <b>{selectedPrice}</b>
                      <button type="button" onClick={() => remove(index)}>Remove</button>
                    </article>
                  </Reveal>
                );
              })}
            </section>

            <aside className="summaryV3">
              <span className="eyebrow">YOUR ORDER</span>
              <strong>{cart.length} ITEM{cart.length > 1 ? "S" : ""}</strong>
              <p>Final pricing follows the selected product plan during checkout.</p>
              <Link
                className="button buttonDark full"
                href={"/checkout?product=" + cart[0].slug + "&plan=" + encodeURIComponent(cart[0].plan || "Standard")}
              >
                Continue to checkout ↗
              </Link>
              <Link className="summaryBack" href="/products">← Keep shopping</Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
