"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {products,Product} from "@/lib/products";
type CartItem={slug:string;plan?:string};
const key="dpb-cart";
export function useCart(){const [cart,setCart]=useState<CartItem[]>([]);useEffect(()=>{try{setCart(JSON.parse(localStorage.getItem(key)||"[]"))}catch{}},[]);const save=(next:CartItem[])=>{setCart(next);localStorage.setItem(key,JSON.stringify(next));window.dispatchEvent(new Event("cart-change"))};return {cart,add:(item:CartItem)=>save([...cart,item]),remove:(i:number)=>save(cart.filter((_,n)=>n!==i)),clear:()=>save([])}}
export function AddToCart({slug,plan="Standard"}:{slug:string;plan?:string}){const [added,setAdded]=useState(false);const cart=useCart();return <button className="button buttonDark" onClick={()=>{cart.add({slug,plan});setAdded(true);setTimeout(()=>setAdded(false),1400)}}>{added?"Added to cart":"Add to cart"} <span>↗</span></button>}
export function BuyNow({slug,plan="Standard"}:{slug:string;plan?:string}){return <Link className="button buttonDark" href={"/checkout?product="+encodeURIComponent(slug)+"&plan="+encodeURIComponent(plan)}>Buy now <span>↗</span></Link>}
export function CartButton(){const [count,setCount]=useState(0);useEffect(()=>{const update=()=>{try{setCount(JSON.parse(localStorage.getItem(key)||"[]").length)}catch{}};update();window.addEventListener("cart-change",update);return()=>window.removeEventListener("cart-change",update)},[]);return <Link className="cartButton" href="/cart">Cart {count>0&&<b>{count}</b>}</Link>}
export function Header(){const [open,setOpen]=useState(false);const [hidden,setHidden]=useState(false);useEffect(()=>{let previous=window.scrollY;const onScroll=()=>{const current=window.scrollY;if(Math.abs(current-previous)<6)return;if(current<96||current<previous){setHidden(false)}else{setHidden(true)}previous=current};window.addEventListener("scroll",onScroll,{passive:true});return()=>window.removeEventListener("scroll",onScroll)},[]);const close=()=>setOpen(false);return <header className={"siteHeader"+(hidden&&!open?" siteHeaderHidden":"")}><div className="headerInner"><Link className="brandLogo" href="/" aria-label="Digital Products Bundle home" onClick={close}><img src="https://d2ol7oe51mr4n9.cloudfront.net/user_3J2LfjzyqF75p1hw7z8VTckaj1A/67d61756-d4f7-4c01-ac3a-75e1742b8313.png" alt="Digital Products Bundle"/></Link><nav><Link href="/products">Shop</Link><Link href="/products#categories">Categories</Link><Link href="/products#bundles">Bundles</Link><Link href="/faq">Help</Link></nav><div className="headerRight"><Link className="searchLink" href="/products">Search <span>⌕</span></Link><CartButton/><button className={"mobileMenuButton "+(open?"isOpen":"")} type="button" aria-label={open?"Close menu":"Open menu"} aria-expanded={open} onClick={()=>setOpen(v=>!v)}><span/><span/></button></div></div>{open&&<div className="mobileMenu"><Link href="/products" onClick={close}>Shop</Link><Link href="/products#categories" onClick={close}>Categories</Link><Link href="/products#bundles" onClick={close}>Bundles</Link><Link href="/faq" onClick={close}>Help & FAQs</Link><Link href="/contact" onClick={close}>Contact</Link></div>}</header>}
export function TrustStrip(){return <div className="trustStrip"><div><span className="statusDot"/>Secure payment</div><div>Digital delivery</div><div>Clear product details</div><div>Support available</div></div>}
export function ProductCard({product,index=0}:{product:Product;index?:number}){return <article className={"productCard editorialCard card"+index}><Link href={"/products/"+product.slug} className="productVisual"><div className="visualMeta"><span>0{index+1}</span><span>{product.badge||"DIGITAL"}</span></div><div className="visualArtwork">{product.image ? <img src={product.image} alt="" loading="lazy" /> : <div className="visualIdentity"><small>{product.type}</small><strong>{product.imageLabel}</strong><span>{product.category}</span></div>}</div><div className="visualBottom"><span>Digital Products Bundle</span><span>↗</span></div></Link><div className="productCardBody"><div><div className="productCategory">{product.category}</div><Link href={"/products/"+product.slug} className="productName">{product.name}</Link></div><div className="cardBottom"><span>{product.pricing?.[0]?.note||"Digital product"}</span><strong>{product.pricing?.[0]?.price||"View"}</strong></div></div></article>}
export function SiteFooter(){return <footer className="siteFooter"><div className="footerContainer">
  <div className="footerMain">
    <div className="footerBrandBlock">
      <Link className="brandLogo footerBrandLogo" href="/" aria-label="Digital Products Bundle home"><img src="https://d2ol7oe51mr4n9.cloudfront.net/user_3J2LfjzyqF75p1hw7z8VTckaj1A/67d61756-d4f7-4c01-ac3a-75e1742b8313.png" alt="Digital Products Bundle"/></Link>
      <p>Practical digital products, tools and resources for people who want to work with less friction.</p>
      <span className="footerBrandNote">Useful tools. Clear details. Digital delivery.</span>
    </div>
    <nav className="footerLinkColumn" aria-label="Explore">
      <span className="footerLabel">Explore</span>
      <Link href="/products">All products</Link><Link href="/products#categories">Categories</Link><Link href="/products#bundles">Bundles</Link>
    </nav>
    <nav className="footerLinkColumn" aria-label="Help">
      <span className="footerLabel">Help</span>
      <Link href="/faq">FAQs</Link><Link href="/contact">Contact</Link><Link href="/refund-policy">Refund policy</Link>
    </nav>
    <nav className="footerLinkColumn" aria-label="Company">
      <span className="footerLabel">Company</span>
      <Link href="/about">About</Link><Link href="/blog">Resources</Link><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link>
    </nav>
  </div>
  <div className="footerMeta">
    <div className="footerMetaItem footerMetaOwner"><span className="footerLabel">Maintained by</span><strong>R.K Digital Media</strong><a href="tel:+919871530594">+91 98715 30594</a></div>
    <div className="footerMetaItem"><span className="footerLabel">Follow</span><a href="https://www.instagram.com/digital_products_bundle/" target="_blank" rel="noopener noreferrer">Instagram @digital_products_bundle <span aria-hidden="true">↗</span></a></div>
    <div className="footerMetaItem"><span className="footerLabel">Agency website</span><a href="https://rkdigitalmedia.in/" target="_blank" rel="sponsored nofollow noopener noreferrer">R.K Digital Media <span aria-hidden="true">↗</span></a></div>
  </div>
  <div className="footerBottom"><span>© 2026 Digital Products Bundle</span><div className="footerBottomLinks"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/refund-policy">Refunds</Link></div><span className="footerBottomNote">Built for digital delivery.</span></div>
</div></footer>}
