import { NextResponse } from "next/server";
import { saveCanvaTokens } from "@/lib/canva";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = new Map(cookieHeader.split(";").map((x) => x.trim().split("=")).filter((x) => x.length === 2) as [string,string][]);
  const expectedState = cookies.get("canva_oauth_state");
  const verifier = cookies.get("canva_oauth_verifier");

  const fail = (message: string) => NextResponse.redirect(new URL("/admin/canva?error=" + encodeURIComponent(message), request.url));
  if (error) return fail("Canva authorization was cancelled.");
  if (!code || !state || !expectedState || state !== expectedState || !verifier) return fail("Canva authorization could not be verified.");

  const clientId = process.env.CANVA_CLIENT_ID || "";
  const clientSecret = process.env.CANVA_CLIENT_SECRET || "";
  const redirectUri = process.env.CANVA_REDIRECT_URI || new URL("/api/integrations/canva/callback", request.url).toString();
  if (!clientId || !clientSecret) return fail("Canva credentials are not configured.");

  const basic = Buffer.from(clientId + ":" + clientSecret).toString("base64");
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code_verifier: verifier,
    code,
    redirect_uri: redirectUri,
  });

  const tokenResponse = await fetch("https://api.canva.com/rest/v1/oauth/token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + basic,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  });

  if (!tokenResponse.ok) {
    return fail("Canva token exchange failed. Check the app redirect URL, scopes and client secret.");
  }

  const data = await tokenResponse.json();
  await saveCanvaTokens(data);

  const response = NextResponse.redirect(new URL("/admin/canva?connected=1", request.url));
  response.cookies.delete("canva_oauth_state");
  response.cookies.delete("canva_oauth_verifier");
  return response;
}
