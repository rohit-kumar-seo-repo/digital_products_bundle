"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { ProductCard } from "@/components/store";
import { Reveal } from "@/components/motion";

type Category = { name: string; description: string; slug: string };

export default function ProductDiscovery({ products, categories }: { products: Product[]; categories: Category[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = products.filter((p) => {
      const matchesQuery = !q || [p.name, p.shortDescription, p.category, ...p.features].join(" ").toLowerCase().includes(q);
      const matchesCategory = category === "all" || p.category === category;
      return matchesQuery && matchesCategory;
    });
    if (sort === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "price-low" || sort === "price-high") filtered.sort((a, b) => {
      const price = (p: Product) => Number((p.pricing?.[0]?.price || "").replace(/[^0-9]/g, "")) || 0;
      return sort === "price-low" ? price(a) - price(b) : price(b) - price(a);
    });
    return filtered;
  }, [products, query, category, sort]);

  return <>
    <div className="discoveryControls" aria-label="Product search and filters">
      <label className="discoverySearch"><span>Search products</span><input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try templates, WhatsApp, plugins…" /></label>
      <label className="discoverySelect"><span>Category</span><select value={category} onChange={(e) => setCategory(e.target.value)}><option value="all">All categories</option>{categories.map((c) => <option key={c.slug} value={c.name}>{c.name}</option>)}</select></label>
      <label className="discoverySelect"><span>Sort by</span><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Featured</option><option value="name">Name A–Z</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label>
    </div>
    <div className="shopResultsHead"><div><span className="eyebrow">THE CURRENT DROP</span><h2>{visible.length} product{visible.length === 1 ? "" : "s"} <em>{query || category !== "all" ? "matching your search" : "available now"}</em></h2></div><span className="shopCount">{String(visible.length).padStart(2, "0")} RESULTS</span></div>
    {visible.length ? <div className="shopGridV3">{visible.map((p, i) => <div key={p.slug}><Reveal delay={i * 60}><ProductCard product={p} index={i} /></Reveal></div>)}</div> : <div className="emptyV3"><h2>No matching products.</h2><p>Try a different search or clear your category filter.</p><button type="button" className="button buttonDark" onClick={() => { setQuery(""); setCategory("all"); setSort("featured"); }}>Clear filters</button></div>}
    <div className="shopCategoryRows" id="categories">{categories.map((c, i) => <div id={"category-" + c.slug} className="shopCategoryRow" key={c.slug}><span>0{i + 1}</span><div><small>{c.name}</small><h3>{c.description}</h3></div><Link href={"/products?category=" + encodeURIComponent(c.name)}>Explore ↗</Link></div>)}</div>
  </>;
}