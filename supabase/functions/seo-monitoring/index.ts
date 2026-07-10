import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-secret",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const adminSecret = Deno.env.get("SEO_ADMIN_SECRET");
  const provided = req.headers.get("x-admin-secret");
  if (!adminSecret || provided !== adminSecret) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    if (!supabaseUrl) throw new Error("SUPABASE_URL is not configured");

    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!serviceRoleKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured");

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const [
      { data: recent404s, error: recent404sError }, 
      { data: latestReports, error: latestReportsError },
      { data: conversions, error: conversionsError }
    ] = await Promise.all([
      supabase
        .from("seo_404_log")
        .select("path, created_at, referrer, metadata")
        .order("created_at", { ascending: false })
        .limit(50),
      supabase
        .from("seo_reports")
        .select("id, created_at, period_start, period_end, sitemap_status, sitemap_url_count, top_404_paths, total_404s, gsc_indexed_pages, gsc_top_keywords, gsc_top_pages, raw_data, errors")
        .order("period_end", { ascending: false })
        .limit(8),
      supabase
        .from("conversion_events")
        .select("event_type, path, label, created_at")
        .order("created_at", { ascending: false })
        .limit(100),
    ]);

    if (recent404sError) throw recent404sError;
    if (latestReportsError) throw latestReportsError;
    if (conversionsError) throw conversionsError;

    return new Response(
      JSON.stringify({
        recent404s: recent404s ?? [],
        latestReports: latestReports ?? [],
        conversions: conversions ?? [],
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});