import { NextResponse } from "next/server";
import { canvaRequest } from "@/lib/canva";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const designId = String(body.designId || "");
  if (!designId) return NextResponse.json({ error: "designId is required." }, { status: 400 });

  const response = await canvaRequest("/exports", {
    method: "POST",
    body: JSON.stringify({
      design_id: designId,
      format: {
        type: "png",
        width: 1264,
        export_quality: "regular",
        lossless: true,
        as_single_image: true,
      },
    }),
  });
  if (!response) return NextResponse.json({ error: "Canva is not connected." }, { status: 401 });
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
