import { createClient } from "npm:@supabase/supabase-js@2";

const API_BASE = "https://api.babylovegrowth.ai/api/integrations";
const PAGE_SIZE = 50;
const MAX_PAGES = 20;
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type RecordValue = Record<string, unknown>;

function jsonResponse(body: RecordValue, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function asRecord(value: unknown): RecordValue {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as RecordValue
    : {};
}

function asText(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function asJson(value: unknown): unknown {
  if (typeof value !== "string") return value ?? null;
  try { return JSON.parse(value); } catch { return value; }
}

function articleList(payload: unknown): RecordValue[] {
  if (Array.isArray(payload)) return payload.map(asRecord);
  const root = asRecord(payload);
  for (const key of ["articles", "data", "results", "items"]) {
    if (Array.isArray(root[key])) return (root[key] as unknown[]).map(asRecord);
  }
  return [];
}

async function providerGet(path: string, apiKey: string): Promise<unknown> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "X-API-Key": apiKey, "Content-Type": "application/json" },
  });
  if (!response.ok) {
    const message = (await response.text()).slice(0, 500);
    throw new Error(`BabyLoveGrowth returned ${response.status}${message ? `: ${message}` : ""}`);
  }
  return response.json();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) return jsonResponse({ error: "Sign in required" }, 401);

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const apiKey = Deno.env.get("BABYLOVEGROWTH_API_KEY");
    if (!supabaseUrl || !anonKey || !serviceKey || !apiKey) {
      return jsonResponse({ error: "Import service is not configured" }, 500);
    }

    const authClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false },
    });
    const { data: userData, error: userError } = await authClient.auth.getUser();
    if (userError || !userData.user) return jsonResponse({ error: "Invalid session" }, 401);

    const { data: isAdmin, error: roleError } = await authClient.rpc("has_role", {
      _user_id: userData.user.id,
      _role: "admin",
    });
    if (roleError || !isAdmin) return jsonResponse({ error: "Admin access required" }, 403);

    const summaries: RecordValue[] = [];
    for (let page = 0; page < MAX_PAGES; page += 1) {
      const offset = page * PAGE_SIZE;
      const payload = await providerGet(`/v1/articles?limit=${PAGE_SIZE}&offset=${offset}`, apiKey);
      const batch = articleList(payload);
      summaries.push(...batch);
      if (batch.length < PAGE_SIZE) break;
    }

    const admin = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
    let imported = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (const summary of summaries) {
      const sourceId = asText(summary.id);
      if (!sourceId) { skipped += 1; continue; }
      try {
        const detailPayload = await providerGet(`/v1/articles/${encodeURIComponent(sourceId)}`, apiKey);
        const detailRoot = asRecord(detailPayload);
        const detail = Object.keys(asRecord(detailRoot.data)).length ? asRecord(detailRoot.data) : detailRoot;
        const merged = { ...summary, ...detail };
        const title = asText(merged.title);
        if (!title) { skipped += 1; continue; }

        const keywords = Array.isArray(merged.keywords) ? merged.keywords : [];
        const { error } = await admin.from("blog_drafts").upsert({
          source: "babylovegrowth",
          source_article_id: sourceId,
          title,
          slug: asText(merged.slug),
          excerpt: asText(merged.excerpt),
          meta_description: asText(merged.meta_description ?? merged.metaDescription),
          hero_image_url: asText(merged.hero_image_url ?? merged.heroImageUrl),
          language_code: asText(merged.languageCode ?? merged.language_code),
          organization_website: asText(merged.orgWebsite ?? merged.organization_website),
          seed_keyword: asText(merged.seedKeyword ?? merged.seed_keyword),
          keywords,
          content_markdown: asText(merged.content_markdown ?? merged.contentMarkdown),
          content_html: asText(merged.content_html ?? merged.contentHtml),
          json_ld: asJson(merged.jsonLd ?? merged.json_ld),
          faq_json_ld: asJson(merged.faqJsonLd ?? merged.faq_json_ld),
          source_created_at: asText(merged.created_at ?? merged.createdAt),
          source_payload: merged,
          imported_at: new Date().toISOString(),
        }, { onConflict: "source,source_article_id" });
        if (error) throw error;
        imported += 1;
      } catch (error) {
        errors.push(`${sourceId}: ${error instanceof Error ? error.message : "Import failed"}`);
      }
    }

    return jsonResponse({ imported, skipped, failed: errors.length, errors: errors.slice(0, 10) });
  } catch (error) {
    return jsonResponse({ error: error instanceof Error ? error.message : "Import failed" }, 502);
  }
});
