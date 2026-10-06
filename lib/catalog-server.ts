import { products, Product } from "@/lib/products";
import { readCanvaImageManifest } from "@/lib/canva-assets";

export async function getCatalogProducts(): Promise<Product[]> {
  const overrides = await readCanvaImageManifest().catch(() => ({} as Record<string, { url: string; designId: string; updatedAt: string }>));
  return products.map((product) => ({
    ...product,
    image: overrides[product.slug]?.url || product.image,
  }));
}

export async function getCatalogProduct(slug: string): Promise<Product | undefined> {
  const product = products.find((item) => item.slug === slug);
  if (!product) return undefined;
  const overrides = await readCanvaImageManifest().catch(() => ({}));
  return {
    ...product,
    image: overrides[slug]?.url || product.image,
  };
}
