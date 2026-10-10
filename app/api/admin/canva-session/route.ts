import { NextRequest, NextResponse } from "next/server";

const COOKIE = "dpb_admin_session";
const encoder = new TextEncoder();

async function sign(value: string, secret: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const bytes = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return Array.from(new Uint8Array(bytes)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function POST(req: NextRequest) {
  const configuredPassword = process.env.CANVA_ADMIN_PASSWORD;
  const secret = process.env.CANVA_ADMIN_SESSION_SECRET;
  if (!configuredPassword || !secret) {
    return NextResponse.json({ error: "Admin login is not configured. Set CANVA_ADMIN_PASSWORD and CANVA_ADMIN_SESSION_SECRET in the deployment environment." }, { status: 503 });
  }
  let body: { password?: string } = {};
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const password = String(body.password || "");
  if (password.length > 512 || password !== configuredPassword) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }
  const expires = String(Date.now() + 8 * 60 * 60 * 1000);
  const token = expires + "." + await sign(expires, secret);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 8 * 60 * 60 });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 0 });
  return response;
}