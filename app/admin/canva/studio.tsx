"use client";

import { useEffect, useState } from "react";

type Design = {
  id: string;
  title?: string;
  thumbnail?: { url?: string };
  urls?: { edit_url?: string; view_url?: string };
  updated_at?: number;
};

const products = [
  { slug: "wa-sender", name: "WA Sender" },
  { slug: "digital-website-bundle", name: "Digital Website Bundle" },
];

export default function CanvaStudio() {
  const [connected, setConnected] = useState(false);
  const [designs, setDesigns] = useState<Design[]>([]);
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(products[0].slug);
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState("");

  async function loadStatus() {
    const r = await fetch("/api/integrations/canva/status", { cache: "no-store" });
    const d = await r.json();
    setConnected(Boolean(d.connected));
  }

  async function loadDesigns() {
    setBusy("Loading Canva designs…");
    setMessage("");
    const r = await fetch("/api/integrations/canva/designs?query=" + encodeURIComponent(query), { cache: "no-store" });
    const d = await r.json();
    setBusy("");
    if (!r.ok) return setMessage(d.error || "Could not load Canva designs.");
    setDesigns(d.items || []);
  }

  async function publish(designId: string) {
    setBusy("Exporting and publishing…");
    setMessage("");
    const r = await fetch("/api/integrations/canva/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ designId, productSlug: selectedProduct }),
    });
    const d = await r.json();
    setBusy("");
    if (!r.ok) return setMessage(d.error || "Publish failed.");
    setMessage("Published to " + selectedProduct + ". The live product image now uses the Canva export.");
  }

  async function disconnect() {
    setBusy("Disconnecting…");
    await fetch("/api/integrations/canva/disconnect", { method: "POST" });
    setConnected(false);
    setDesigns([]);
    setBusy("");
    setMessage("Canva disconnected.");
  }

  useEffect(() => { loadStatus(); }, []);

  return (
    <main style={{minHeight:"70vh",background:"#f5f3ef",padding:"64px 20px"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",gap:24,alignItems:"flex-end",marginBottom:36}}>
          <div>
            <p style={{letterSpacing:".14em",fontSize:12,fontWeight:700}}>DIGITAL PRODUCTS BUNDLE / CANVA STUDIO</p>
            <h1 style={{fontSize:"clamp(42px,7vw,82px)",lineHeight:.95,margin:"14px 0"}}>Create in Canva.<br/><i>Publish here.</i></h1>
            <p style={{maxWidth:700,lineHeight:1.7,color:"#555"}}>Connect your Canva account, choose a product design and publish a clean PNG directly to the live product page. Future Canva updates replace the same product asset automatically.</p>
          </div>
          {connected ? <button onClick={disconnect} style={button("light")}>Disconnect Canva</button> : <a href="/api/integrations/canva/connect" style={button("dark")}>Connect Canva</a>}
        </div>

        {!connected ? (
          <section style={panel}>
            <strong>Canva is not connected.</strong>
            <p style={{color:"#666",lineHeight:1.7}}>Click Connect Canva and approve the requested REST API permissions. You will return here after authorization.</p>
            <a href="/api/integrations/canva/connect" style={button("dark")}>Connect Canva</a>
          </section>
        ) : (
          <>
            <section style={{...panel,display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}}>
              <select value={selectedProduct} onChange={e=>setSelectedProduct(e.target.value)} style={input}>
                {products.map(p=><option key={p.slug} value={p.slug}>{p.name}</option>)}
              </select>
              <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search Canva designs" style={{...input,flex:1,minWidth:220}} />
              <button onClick={loadDesigns} style={button("dark")}>Load designs</button>
            </section>

            {busy && <p style={{margin:"18px 0"}}>{busy}</p>}
            {message && <div style={{...panel,marginTop:18}}>{message}</div>}

            <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:18,marginTop:24}}>
              {designs.map(d=>(
                <article key={d.id} style={{background:"#fff",border:"1px solid #ddd",padding:14}}>
                  {d.thumbnail?.url ? <img src={d.thumbnail.url} alt="" style={{width:"100%",aspectRatio:"1/1",objectFit:"cover",background:"#eee"}} /> : <div style={{aspectRatio:"1/1",background:"#eee"}} />}
                  <div style={{padding:"14px 2px 4px"}}>
                    <strong style={{display:"block"}}>{d.title || "Untitled Canva design"}</strong>
                    <small style={{display:"block",color:"#777",margin:"7px 0 14px"}}>{d.id}</small>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                      <button onClick={()=>publish(d.id)} style={button("dark")}>Publish to {products.find(p=>p.slug===selectedProduct)?.name}</button>
                      {d.urls?.edit_url && <a href={d.urls.edit_url} target="_blank" rel="noopener noreferrer" style={button("light")}>Edit in Canva</a>}
                    </div>
                  </div>
                </article>
              ))}
            </section>

            {!designs.length && !busy && <section style={{...panel,marginTop:24}}><strong>No designs loaded.</strong><p style={{color:"#666"}}>Create or edit your square product artwork in Canva, then return here and load designs. Use a 1:1 design for product thumbnails.</p></section>}
          </>
        )}

        <section style={{...panel,marginTop:36}}>
          <strong>Publishing workflow</strong>
          <p style={{color:"#666",lineHeight:1.7,marginBottom:0}}>1. Create the artwork in Canva. 2. Load it here. 3. Publish it to a product. 4. The export is stored on Vercel Blob and the product uses that live asset. Canva export links themselves expire, so the site stores its own copy.</p>
        </section>
      </div>
    </main>
  );
}

const panel: React.CSSProperties = {background:"#fff",border:"1px solid #ddd",padding:24};
const input: React.CSSProperties = {border:"1px solid #ccc",background:"#fff",padding:"12px 14px",fontSize:14};
function button(kind:"dark"|"light"): React.CSSProperties {
  return {display:"inline-flex",alignItems:"center",justifyContent:"center",padding:"12px 16px",border:"1px solid #111",background:kind==="dark"?"#111":"#fff",color:kind==="dark"?"#fff":"#111",textDecoration:"none",fontWeight:700,cursor:"pointer",fontSize:13};
}
