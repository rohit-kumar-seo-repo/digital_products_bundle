import { NextResponse } from "next/server";
import { CANVA_SCOPES, createPkceChallenge, createPkceVerifier, randomBase64Url } from "@/lib/canva";

export async function GET(request: Request) {
  const clientId = process.env.CANVA_CLIENT_ID || "";
  const redirectUri = process.env.CANVA_REDIRECT_URI || new URL("/api/integrations/canva/callback", request.url).toString();
  if (!clientId || !process.env.CANVA_CLIENT_SECRET) {
    return NextResponse.json({ error: "Canva credentials are not configured on the website yet." }, { status: 503 });
  }

  const state = randomBase64Url(32);
  const verifier = createPkceVerifier();
  const challenge = createPkceChallenge(verifier);

  const url = new URL("https://www.canva.com/api/oauth/authorize");
  url.searchParams.set("code_challenge", challenge);
  url.searchParams.set("code_challenge_method", "s256");
  url.searchParams.set("scope", CANVA_SCOPES.join(" "));
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("state", state);
  url.searchParams.set("redirect_uri", redirectUri);

  const response = NextResponse.redirect(url);
  response.cookies.set("canva_oauth_state", state, {
    httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 600,
  });
  response.cookies.set("canva_oauth_verifier", verifier, {
    httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 600,
  });
  return response;
}
