import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { canvaRequest } from "@/lib/canva";
import { readCanvaImageManifest, writeCanvaImageManifest } from "@/lib/canva-assets";
import { getProduct } from "@/lib/products";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const designId = String(body.designId || "");
  const slug = String(body.productSlug || "");
  if (!designId || !slug) return NextResponse.json({ error: "designId and productSlug are required." }, { status: 400 });
  if (!getProduct(slug)) return NextResponse.json({ error: "Product not found." }, { status: 404 });

  const exportResponse = await canvaRequest("/exports", {
    method: "POST",
    body: JSON.stringify({
      design_id: designId,
      format: { type: "png", width: 1264, export_quality: "regular", lossless: true, as_single_image: true },
    }),
  });
  if (!exportResponse) return NextResponse.json({ error: "Canva is not connected." }, { status: 401 });
  const exportData = await exportResponse.json();
  if (!exportResponse.ok) return NextResponse.json(exportData, { status: exportResponse.status });

  let job = exportData.job;
  if (!job?.id) return NextResponse.json({ error: "Canva did not return an export job." }, { status: 502 });

  if (job.status !== "success") {
    const deadline = Date.now() + 15000;
    while (job.status === "in_progress" && Date.now() < deadline) {
      await new Promise((r) => setTimeout(r, 1200));
      const poll = await canvaRequest("/exports/" + encodeURIComponent(job.id));
      if (!poll) break;
      const pollData = await poll.json();
      job = pollData.job;
    }
  }

  if (job.status !== "success" || !job.urls?.[0]) {
    return NextResponse.json({ error: job.error?.message || "Canva export is still processing. Try again in a moment.", job }, { status: 502 });
  }

  const imageResponse = await fetch(job.urls[0], { cache: "no-store" });
  if (!imageResponse.ok) return NextResponse.json({ error: "Could not retrieve the Canva export." }, { status: 502 });
  const image = await imageResponse.arrayBuffer();

  const blob = await put("canva/products/" + slug + ".png", image, {
    access: "public",
    contentType: "image/png",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  });

  const manifest = await readCanvaImageManifest();
  manifest[slug] = { url: blob.url, designId, updatedAt: new Date().toISOString() };
  await writeCanvaImageManifest(manifest);

  return NextResponse.json({ ok: true, slug, designId, imageUrl: blob.url, updatedAt: manifest[slug].updatedAt });
}
