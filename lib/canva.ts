import crypto from "node:crypto";
import { get, put } from "@vercel/blob";

export const CANVA_SCOPES = [
  "asset:read",
  "asset:write",
  "brandtemplate:content:read",
  "brandtemplate:meta:read",
  "design:content:read",
  "design:content:write",
  "design:meta:read",
  "profile:read",
];

const tokenPath = "canva/private-token.json.enc";
const tokenKey = process.env.CANVA_TOKEN_ENCRYPTION_KEY || "";

type TokenRecord = {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  scope?: string;
};

function keyBytes() {
  if (!tokenKey) throw new Error("CANVA_TOKEN_ENCRYPTION_KEY is not configured.");
  return crypto.createHash("sha256").update(tokenKey).digest();
}

export function randomBase64Url(bytes = 32) {
  return crypto.randomBytes(bytes).toString("base64url");
}

export function createPkceVerifier() {
  return randomBase64Url(48);
}

export function createPkceChallenge(verifier: string) {
  return crypto.createHash("sha256").update(verifier).digest("base64url");
}

export function encryptSecret(value: string) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", keyBytes(), iv);
  const ciphertext = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [iv.toString("base64url"), tag.toString("base64url"), ciphertext.toString("base64url")].join(".");
}

export function decryptSecret(payload: string) {
  const [ivRaw, tagRaw, dataRaw] = payload.split(".");
  if (!ivRaw || !tagRaw || !dataRaw) throw new Error("Invalid encrypted Canva token.");
  const decipher = crypto.createDecipheriv("aes-256-gcm", keyBytes(), Buffer.from(ivRaw, "base64url"));
  decipher.setAuthTag(Buffer.from(tagRaw, "base64url"));
  return Buffer.concat([
    decipher.update(Buffer.from(dataRaw, "base64url")),
    decipher.final(),
  ]).toString("utf8");
}

async function readTokenRecord(): Promise<TokenRecord | null> {
  const result = await get(tokenPath, { access: "public" });
  if (!result || result.statusCode !== 200 || !result.stream) return null;
  const encrypted = await new Response(result.stream).text();
  return JSON.parse(decryptSecret(encrypted)) as TokenRecord;
}

async function writeTokenRecord(record: TokenRecord) {
  await put(tokenPath, encryptSecret(JSON.stringify(record)), {
    access: "public",
    contentType: "text/plain",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  });
}

export async function saveCanvaTokens(data: {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
  scope?: string;
}) {
  await writeTokenRecord({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Date.now() + Math.max(60, Number(data.expires_in || 14400) - 60) * 1000,
    scope: data.scope,
  });
}

async function refreshCanvaToken(record: TokenRecord) {
  const clientId = process.env.CANVA_CLIENT_ID || "";
  const clientSecret = process.env.CANVA_CLIENT_SECRET || "";
  if (!clientId || !clientSecret) throw new Error("Canva credentials are not configured.");

  const basic = Buffer.from(clientId + ":" + clientSecret).toString("base64");
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: record.refresh_token,
  });

  const response = await fetch("https://api.canva.com/rest/v1/oauth/token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + basic,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Canva authorization expired. Please reconnect Canva.");
  const data = await response.json();
  await saveCanvaTokens(data);
  return data.access_token as string;
}

export async function getCanvaAccessToken() {
  const record = await readTokenRecord();
  if (!record) return null;
  if (record.expires_at > Date.now()) return record.access_token;
  return refreshCanvaToken(record);
}

export async function canvaRequest(path: string, init: RequestInit = {}) {
  const token = await getCanvaAccessToken();
  if (!token) return { response: null, data: null };

  const response = await fetch("https://api.canva.com/rest/v1" + path, {
    ...init,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    cache: "no-store",
  });

  if (response.status === 401) {
    const record = await readTokenRecord();
    if (record) {
      const refreshed = await refreshCanvaToken(record);
      return fetch("https://api.canva.com/rest/v1" + path, {
        ...init,
        headers: {
          Authorization: "Bearer " + refreshed,
          "Content-Type": "application/json",
          ...(init.headers || {}),
        },
        cache: "no-store",
      });
    }
  }

  return response;
}

export async function isCanvaConnected() {
  try {
    return Boolean(await readTokenRecord());
  } catch {
    return false;
  }
}

export async function revokeCanvaConnection() {
  const record = await readTokenRecord();
  const clientId = process.env.CANVA_CLIENT_ID || "";
  const clientSecret = process.env.CANVA_CLIENT_SECRET || "";
  if (record && clientId && clientSecret) {
    const basic = Buffer.from(clientId + ":" + clientSecret).toString("base64");
    await fetch("https://api.canva.com/rest/v1/oauth/revoke", {
      method: "POST",
      headers: {
        Authorization: "Basic " + basic,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ token: record.refresh_token }),
    }).catch(() => {});
  }
  await put(tokenPath, "", {
    access: "public",
    contentType: "text/plain",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  });
}
