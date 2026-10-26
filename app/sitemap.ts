import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { articles } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://digitalproductsbundle.in";
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, priority: 1, changeFrequency: "weekly" },
    { url: base + "/products", priority: 0.9, changeFrequency: "weekly" },
    { url: base + "/blog", priority: 0.7, changeFrequency: "weekly" },
    { url: base + "/faq", priority: 0.5, changeFrequency: "monthly" },
    { url: base + "/about", priority: 0.4, changeFrequency: "monthly" },
    { url: base + "/contact", priority: 0.4, changeFrequency: "monthly" },
    { url: base + "/refund-policy", priority: 0.3, changeFrequency: "monthly" },
    { url: base + "/terms", priority: 0.3, changeFrequency: "monthly" },
    { url: base + "/privacy", priority: 0.3, changeFrequency: "monthly" },
  ];
  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: base + "/products/" + product.slug,
    priority: 0.8,
    changeFrequency: "weekly",
  }));
  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: base + "/blog/" + article.slug,
    priority: 0.7,
    changeFrequency: "monthly",
    lastModified: new Date(article.published + "T12:00:00Z"),
  }));
  return [...staticRoutes, ...productRoutes, ...articleRoutes];
}
