import { NextResponse } from "next/server";
import { canvaRequest } from "@/lib/canva";

export async function GET(_: Request, { params }: { params: Promise<{ exportId: string }> }) {
  const { exportId } = await params;
  const response = await canvaRequest("/exports/" + encodeURIComponent(exportId));
  if (!response) return NextResponse.json({ error: "Canva is not connected." }, { status: 401 });
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
