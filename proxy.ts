import { NextRequest, NextResponse } from "next/server";

const COOKIE = "dpb_admin_session";
const encoder = new TextEncoder();

async function signature(value: string, secret: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const bytes = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return Array.from(new Uint8Array(bytes)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function validSession(token: string, secret: string) {
  const [expires, supplied] = token.split(".");
  if (!expires || !supplied || !/^\d+$/.test(expires) || Number(expires) < Date.now()) return false;
  const expected = await signature(expires, secret);
  if (expected.length !== supplied.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ supplied.charCodeAt(i);
  return diff === 0;
}

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const protectedPage = pathname.startsWith("/admin/canva") && pathname !== "/admin/canva/login";
  const protectedApi = pathname.startsWith("/api/integrations/canva/");
  if (!protectedPage && !protectedApi) return NextResponse.next();

  const secret = process.env.CANVA_ADMIN_SESSION_SECRET;
  const token = req.cookies.get(COOKIE)?.value;
  if (secret && token && await validSession(token, secret)) return NextResponse.next();

  if (protectedApi) return NextResponse.json({ error: "Admin authentication required." }, { status: 401 });
  const login = new URL("/admin/canva/login", req.url);
  login.searchParams.set("next", pathname);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/admin/canva/:path*", "/api/integrations/canva/:path*"],
};