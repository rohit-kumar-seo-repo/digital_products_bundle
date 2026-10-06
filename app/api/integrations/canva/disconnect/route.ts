import { NextResponse } from "next/server";
import { revokeCanvaConnection } from "@/lib/canva";
export async function POST() {
  await revokeCanvaConnection();
  return NextResponse.json({ ok: true });
}
