// IndexNow submission endpoint.
//
// POST { urls: string[] } — validates each URL, keeps only canonical
// https://highlandernc.com/... entries, strips tracking parameters and
// fragments, dedupes, and submits the resulting list to api.indexnow.org.
//
// The IndexNow key is public by design (Bing/Yandex verify it against a
// file hosted at /<key>.txt). It is intentionally hardcoded here so it
// stays in sync with public/<key>.txt.

import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const CANONICAL_HOST = "highlandernc.com";
const INDEXNOW_KEY = "ae41f9843d73e5c77badf85d990a91e65e0ebeacad1a93b7";
const KEY_LOCATION = `https://${CANONICAL_HOST}/${INDEXNOW_KEY}.txt`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

// Tracking parameters that must be stripped before submission.
const TRACKING_PARAMS = new Set([
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "gclid", "gbraid", "wbraid", "fbclid", "li_fat_id", "msclkid",
  "ttclid", "twclid", "mc_cid", "mc_eid", "yclid", "_ga", "_gl",
  "ref", "source",
]);

function normalizeUrl(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  let u: URL;
  try { u = new URL(raw); } catch { return null; }
  if (u.protocol !== "https:") return null;
  if (u.hostname !== CANONICAL_HOST) return null;
  // Strip tracking params and fragment.
  const clean = new URL(u.origin + u.pathname);
  for (const [k, v] of u.searchParams.entries()) {
    if (!TRACKING_PARAMS.has(k.toLowerCase())) clean.searchParams.append(k, v);
  }
  return clean.toString();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "method_not_allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let body: unknown;
  try { body = await req.json(); } catch {
    return new Response(JSON.stringify({ error: "invalid_json" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const rawUrls = (body as { urls?: unknown })?.urls;
  if (!Array.isArray(rawUrls) || rawUrls.length === 0 || rawUrls.length > 10_000) {
    return new Response(JSON.stringify({ error: "urls must be a non-empty array (max 10000)" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const cleaned = Array.from(
    new Set(rawUrls.map(normalizeUrl).filter((u): u is string => u !== null)),
  );

  if (cleaned.length === 0) {
    return new Response(
      JSON.stringify({ error: "no_valid_urls", note: `only https://${CANONICAL_HOST}/* accepted` }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  const payload = {
    host: CANONICAL_HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: cleaned,
  };

  const upstream = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  const text = await upstream.text().catch(() => "");
  const ok = upstream.status >= 200 && upstream.status < 300;

  // Structured log (no secrets — key is public by design).
  console.log(JSON.stringify({
    event: "indexnow_submit",
    status: upstream.status,
    ok,
    submitted: cleaned.length,
    sample: cleaned.slice(0, 3),
  }));

  return new Response(
    JSON.stringify({
      ok,
      indexnow_status: upstream.status,
      submitted: cleaned.length,
      urls: cleaned,
      upstream_body: text.slice(0, 500),
    }),
    {
      status: ok ? 200 : 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    },
  );
});