import { NextResponse } from "next/server";
import { isCanvaConnected } from "@/lib/canva";
export async function GET() {
  return NextResponse.json({ connected: await isCanvaConnected() });
}
