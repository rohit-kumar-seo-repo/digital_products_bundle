import { get, put } from "@vercel/blob";

const manifestPath = "canva/product-images.json";

export type CanvaImageManifest = Record<string, { url: string; designId: string; updatedAt: string }>;

export async function readCanvaImageManifest(): Promise<CanvaImageManifest> {
  const result = await get(manifestPath, { access: "public" });
  if (!result || result.statusCode !== 200 || !result.stream) return {};
  try {
    return JSON.parse(await new Response(result.stream).text()) as CanvaImageManifest;
  } catch {
    return {};
  }
}

export async function writeCanvaImageManifest(manifest: CanvaImageManifest) {
  await put(manifestPath, JSON.stringify(manifest), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  });
}

export async function getProductImageOverrides() {
  return readCanvaImageManifest();
}
