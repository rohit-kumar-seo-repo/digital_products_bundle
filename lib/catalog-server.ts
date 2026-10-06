import { products, Product } from "@/lib/products";
import { readCanvaImageManifest, CanvaImageManifest } from "@/lib/canva-assets";

export async function getCatalogProducts(): Promise<Product[]> {
  let overrides: CanvaImageManifest = {};
  try { overrides = await readCanvaImageManifest(); } catch {}
  return products.map((product) => ({
    ...product,
    image: overrides[product.slug]?.url || product.image,
  }));
}

export async function getCatalogProduct(slug: string): Promise<Product | undefined> {
  const product = products.find((item) => item.slug === slug);
  if (!product) return undefined;
  let overrides: CanvaImageManifest = {};
  try { overrides = await readCanvaImageManifest(); } catch {}
  return {
    ...product,
    image: overrides[slug]?.url || product.image,
  };
}
