import { NextResponse } from "next/server";
import { canvaRequest } from "@/lib/canva";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query") || "";
  const params = new URLSearchParams({ limit: "50" });
  if (query) params.set("query", query);

  const response = await canvaRequest("/designs?" + params.toString());
  if (!response) return NextResponse.json({ error: "Canva is not connected." }, { status: 401 });
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
