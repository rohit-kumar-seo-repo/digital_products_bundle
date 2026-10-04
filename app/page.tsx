const products = [
  {title:"Creator Launch Kit",type:"Templates",price:"₹799",tag:"Bestseller",tone:"Launch"},
  {title:"Social Media Content Vault",type:"Content",price:"₹599",tag:"Popular",tone:"Content"},
  {title:"Business Growth Bundle",type:"Bundle",price:"₹1,499",tag:"Save 40%",tone:"Growth"},
  {title:"Notion Productivity OS",type:"Notion",price:"₹499",tag:"New",tone:"System"},
];

const categories = [
  ["Templates","Ready-to-use files for faster execution"],
  ["Marketing","Campaign assets, prompts and growth tools"],
  ["Business","Systems, documents and operational kits"],
  ["Bundles","Curated collections with better value"],
];

function Arrow(){return <span aria-hidden="true">↗</span>}

export default function Home(){
  return <main>
    <div className="container">
      <nav className="nav">
        <a className="brand" href="#"><span className="brandMark">DP</span><span>Digital Products Bundle</span></a>
        <div className="navLinks"><a href="#shop">Shop</a><a href="#categories">Categories</a><a href="#bundles">Bundles</a><a href="#about">Why us</a></div>
        <div className="navActions"><button className="iconBtn" aria-label="Search">⌕</button><button className="iconBtn" aria-label="Cart">Bag</button></div>
      </nav>

      <section className="hero">
        <div>
          <div className="eyebrow">Digital tools for people who ship</div>
          <h1>Buy once.<br/>Build faster.</h1>
          <p>Premium templates, content kits, business systems and digital bundles designed to remove repetitive work and help you get to the result faster.</p>
          <div className="actions"><a className="btn btnDark" href="#shop">Explore products <Arrow/></a><a className="btn btnLight" href="#bundles">View bundles</a></div>
          <div className="trust"><span>Instant access</span><span className="dot"/><span>Secure checkout</span><span className="dot"/><span>Built for practical use</span></div>
        </div>
        <div className="heroVisual" aria-label="Featured digital products">
          <div className="orbit"/>
          <div className="productStack"><div className="mock"><small>FEATURED DROP / 001</small><h3>Creator Launch Kit</h3><small>Templates · 42 assets · Instant access</small></div></div>
          <div className="floatCard float1"><b>42 assets</b><br/><span>ready to customize</span></div>
          <div className="floatCard float2"><b>Instant delivery</b><br/><span>after successful payment</span></div>
        </div>
      </section>

      <section className="section" id="shop">
        <div className="sectionHead"><div><div className="eyebrow">Featured</div><h2>Products worth opening.</h2></div><a className="btn btnLight" href="/products">View all <Arrow/></a></div>
        <div className="grid">{products.map((p)=><a className="card" href="#" key={p.title}><div className="cover"><span className="badge">{p.tag}</span><div className="coverInner"><span className="coverLabel">{p.type}</span><span className="coverTitle">{p.tone}<br/>Kit</span><span className="coverLabel">DIGITAL PRODUCTS BUNDLE</span></div></div><div className="cardBody"><div className="cardTitle">{p.title}</div><div className="meta"><span>{p.type}</span><span className="price">{p.price}</span></div></div></a>)}</div>
      </section>

      <section className="section" id="categories">
        <div className="sectionHead"><div><div className="eyebrow">Browse by need</div><h2>Start with a category.</h2></div></div>
        <div className="categories">{categories.map(([name,desc])=><a className="category" href="#" key={name}><b>{name} <Arrow/></b><span>{desc}</span></a>)}</div>
      </section>

      <section className="band" id="bundles">
        <div><div className="eyebrow" style={{color:"#888"}}>Better together</div><h2>Bundles that save time and money.</h2><p>Curated packs combine complementary products into one practical workflow.</p></div>
        <a className="btn btnLight" href="/bundles">Explore bundles <Arrow/></a>
      </section>

      <footer className="footer" id="about"><div><strong>Digital Products Bundle</strong><br/>Practical digital products. Instant access.</div><div>© 2026 Digital Products Bundle · <a href="#">Terms</a> · <a href="#">Privacy</a></div></footer>
    </div>
  </main>
}