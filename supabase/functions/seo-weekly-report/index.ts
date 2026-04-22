import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const DAY_MS = 24 * 60 * 60 * 1000;
const DEFAULT_SITE_URL = "https://western-wnc-dominate.lovable.app";

type RequestPayload = {
  dryRun?: boolean;
  force?: boolean;
  siteUrl?: string;
  periodStart?: string;
  periodEnd?: string;
  source?: string;
};

type TopPath = {
  path: string;
  hits: number;
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const startOfUtcDay = (value: Date) =>
  new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate()));

const isIsoDate = (value?: string) => {
  if (!value) return false;
  const parsed = new Date(value);
  return !Number.isNaN(parsed.getTime());
};

const computeWindow = (payload: RequestPayload) => {
  if (payload.periodStart || payload.periodEnd) {
    if (!isIsoDate(payload.periodStart) || !isIsoDate(payload.periodEnd)) {
      throw new Error("periodStart and periodEnd must be valid ISO timestamps when provided");
    }

    const periodStart = new Date(payload.periodStart!);
    const periodEnd = new Date(payload.periodEnd!);

    if (periodEnd.getTime() <= periodStart.getTime()) {
      throw new Error("periodEnd must be later than periodStart");
    }

    return { periodStart, periodEnd, mode: "custom" as const };
  }

  const now = new Date();
  const periodEnd = startOfUtcDay(now);
  const periodStart = new Date(periodEnd.getTime() - 7 * DAY_MS);
  return { periodStart, periodEnd, mode: "rolling_previous_7_full_days" as const };
};

const normalizePath = (value: string) => {
  try {
    const url = value.startsWith("http") ? new URL(value) : new URL(value, DEFAULT_SITE_URL);
    return `${url.pathname.replace(/\/$/, "") || "/"}${url.search}`;
  } catch {
    return value;
  }
};

const summarize404s = (rows: Array<{ path: string | null }>) => {
  const counts = new Map<string, number>();

  for (const row of rows) {
    const path = row.path ? normalizePath(row.path) : null;
    if (!path) continue;
    counts.set(path, (counts.get(path) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([path, hits]) => ({ path, hits }))
    .sort((a, b) => b.hits - a.hits)
    .slice(0, 10);
};

const fetchSitemapSummary = async (siteUrl: string) => {
  const sitemapUrl = `${siteUrl.replace(/\/$/, "")}/sitemap.xml`;
  const response = await fetch(sitemapUrl, { headers: { "Cache-Control": "no-cache" } });

  if (!response.ok) {
    return {
      status: `fetch_failed_${response.status}`,
      urlCount: null,
      sitemapUrl,
    };
  }

  const xml = await response.text();
  const count = Array.from(xml.matchAll(/<loc>/g)).length;

  return {
    status: "fetched",
    urlCount: count,
    sitemapUrl,
  };
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Backend environment is not configured for seo-weekly-report");
    }

    const payload = (await req.json().catch(() => ({}))) as RequestPayload;
    const { periodStart, periodEnd, mode } = computeWindow(payload);
    const siteUrl = payload.siteUrl?.trim() || Deno.env.get("PUBLIC_SITE_URL") || DEFAULT_SITE_URL;
    const source = payload.source?.trim() || "manual";

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const existingReportQuery = await supabase
      .from("seo_reports")
      .select("id, period_start, period_end, created_at")
      .eq("period_start", periodStart.toISOString())
      .eq("period_end", periodEnd.toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (existingReportQuery.error) throw existingReportQuery.error;

    if (payload.dryRun) {
      return json({
        ok: true,
        mode,
        source,
        siteUrl,
        period_start: periodStart.toISOString(),
        period_end: periodEnd.toISOString(),
        report_exists: Boolean(existingReportQuery.data),
      });
    }

    if (existingReportQuery.data && !payload.force) {
      return json({
        ok: true,
        skipped: true,
        reason: "report_window_already_exists",
        existing_report: existingReportQuery.data,
        period_start: periodStart.toISOString(),
        period_end: periodEnd.toISOString(),
      });
    }

    const [notFoundResult, sitemapSummary] = await Promise.all([
      supabase
        .from("seo_404_log")
        .select("path")
        .gte("created_at", periodStart.toISOString())
        .lt("created_at", periodEnd.toISOString()),
      fetchSitemapSummary(siteUrl),
    ]);

    if (notFoundResult.error) throw notFoundResult.error;

    const errors: Array<Record<string, string>> = [];
    if (!Deno.env.get("GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT_JSON") || !Deno.env.get("GOOGLE_SEARCH_CONSOLE_PROPERTY_URL")) {
      errors.push({
        source: "search_console",
        message: "Search Console credentials are not configured yet.",
      });
    }

    const top404Paths: TopPath[] = summarize404s(notFoundResult.data ?? []);
    const total404s = (notFoundResult.data ?? []).length;

    const rawData = {
      source,
      generated_at: new Date().toISOString(),
      window_mode: mode,
      site_url: siteUrl,
      sitemap: sitemapSummary,
      not_found: {
        total: total404s,
        top_paths: top404Paths,
      },
      search_console: {
        configured:
          Boolean(Deno.env.get("GOOGLE_SEARCH_CONSOLE_SERVICE_ACCOUNT_JSON")) &&
          Boolean(Deno.env.get("GOOGLE_SEARCH_CONSOLE_PROPERTY_URL")),
      },
    };

    const insertResult = await supabase
      .from("seo_reports")
      .insert({
        period_start: periodStart.toISOString(),
        period_end: periodEnd.toISOString(),
        sitemap_status: sitemapSummary.status,
        sitemap_url_count: sitemapSummary.urlCount,
        total_404s: total404s,
        top_404_paths: top404Paths,
        raw_data: rawData,
        errors,
      })
      .select("id, period_start, period_end, created_at")
      .single();

    if (insertResult.error) throw insertResult.error;

    return json({
      ok: true,
      report: insertResult.data,
      total_404s: total404s,
      sitemap_status: sitemapSummary.status,
      sitemap_url_count: sitemapSummary.urlCount,
      period_start: periodStart.toISOString(),
      period_end: periodEnd.toISOString(),
    });
  } catch (error) {
    console.error("seo-weekly-report error:", error);
    return json({ error: error instanceof Error ? error.message : "Unknown error" }, 500);
  }
});