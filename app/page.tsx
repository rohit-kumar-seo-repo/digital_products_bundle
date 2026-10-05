import Link from "next/link";
import {products,categories} from "@/lib/products";
import {ProductCard,TrustStrip} from "@/components/store";

export default function Home(){
  const featured=products.slice(0,4);
  return <main>
    <section className="heroEditorial">
      <div className="heroOrb" aria-hidden="true"/>
      <div className="container heroEditorialInner">
        <div className="heroEditorialCopy">
          <div className="eyebrowRow"><span className="statusDot"/><span>THE DIGITAL GOODS SHOP</span></div>
          <h1>Useful things.<br/><i>Beautifully packaged.</i></h1>
          <p>Software, templates and ready-to-use resources for people who want to spend less time setting things up and more time getting work done.</p>
          <div className="heroActions"><Link className="button buttonDark magnetic" href="/products">Explore products <span>↗</span></Link><Link className="textLink" href="#featured">See what’s new <span>↓</span></Link></div>
        </div>
        <div className="heroProductStage">
          <div className="heroStageLabel">01 / FEATURED</div>
          <Link href="/products/wa-sender" className="heroProductCard">
            <div className="heroCardTop"><span>SOFTWARE</span><b>POPULAR</b></div>
            <div className="heroCardCenter"><small>WA</small><strong>Sender</strong><span>Bulk WhatsApp marketing workflows</span></div>
            <div className="heroCardBottom"><span>Starting at</span><strong>₹149</strong><span className="circleArrow">↗</span></div>
          </Link>
          <div className="floatingNote noteA"><b>Instant</b><span>Digital delivery</span></div>
          <div className="floatingNote noteB"><b>01</b><span>Product in focus</span></div>
        </div>
      </div>
    </section>

    <TrustStrip/>

    <section className="ticker" aria-label="Store highlights"><div><span>SOFTWARE</span><i/> <span>TEMPLATES</span><i/> <span>BUNDLES</span><i/> <span>RESOURCES</span><i/> <span>SOFTWARE</span><i/> <span>TEMPLATES</span><i/></div></section>

    <section className="section editorialSection container" id="featured">
      <div className="sectionIntro editorialIntro"><div><span className="eyebrow">THE SHORTLIST</span><h2>Start with something<br/><i>actually useful.</i></h2></div><Link className="textLink" href="/products">View collection <span>↗</span></Link></div>
      <div className="editorialProducts">{featured.map((p,i)=><ProductCard key={p.slug} product={p} index={i}/>)}</div>
    </section>

    <section className="categoryFeature container" id="categories">
      <div className="categoryLead"><span className="eyebrow">SHOP BY NEED</span><h2>Find your<br/><i>next shortcut.</i></h2><p>Browse by the kind of work you are trying to make easier. The catalog is built to grow without making discovery harder.</p></div>
      <div className="categoryList">{categories.map((c,i)=><Link className="categoryRow" href={"/products#category-"+c.slug} key={c.slug}><span>0{i+1}</span><div><b>{c.name}</b><small>{c.description}</small></div><strong>↗</strong></Link>)}</div>
    </section>

    <section className="manifesto container">
      <div className="manifestoNumber">02</div>
      <div><span className="eyebrow light">THE IDEA</span><h2>Less hunting.<br/>More doing.</h2><p>Digital products should feel straightforward: know what is included, know what it costs, pay securely, and get access without unnecessary friction.</p><Link className="button buttonLight" href="/about">Why Digital Products Bundle <span>↗</span></Link></div>
      <div className="manifestoSide"><span>BUILT FOR</span><b>Creators<br/>Freelancers<br/>Businesses</b></div>
    </section>

    <section className="section container valueSection">
      <div className="sectionIntro"><div><span className="eyebrow">THE EXPERIENCE</span><h2>Clear from click<br/>to access.</h2></div></div>
      <div className="valueRail">
        <div><span>01</span><b>Choose</b><p>Detailed product pages make the decision easier before checkout.</p></div>
        <div><span>02</span><b>Pay</b><p>A focused checkout hands you over to the configured secure payment page.</p></div>
        <div><span>03</span><b>Access</b><p>After successful payment confirmation, digital delivery follows the product instructions.</p></div>
      </div>
    </section>

    <section className="faqBand newFaq"><div className="container"><div><span className="eyebrow">NEED TO KNOW</span><h2>Questions before<br/><i>you buy?</i></h2></div><Link className="button buttonDark" href="/faq">Read the FAQ <span>↗</span></Link></div></section>
  </main>
}