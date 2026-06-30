import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const MAX_IMAGE_BASE64_BYTES = 10_000_000; // ~7.5MB image
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 10;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const { imageBase64 } = await req.json().catch(() => ({}));

    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: "No image provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (typeof imageBase64 !== "string" || imageBase64.length > MAX_IMAGE_BASE64_BYTES) {
      return new Response(
        JSON.stringify({ error: "Image is too large." }),
        { status: 413, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Rate limit by client IP using designer_metrics
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const clientIp =
      (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";

    let supabaseAdmin: ReturnType<typeof createClient> | null = null;
    if (supabaseUrl && serviceRoleKey) {
      supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      });
      const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
      const { count } = await supabaseAdmin
        .from("designer_metrics")
        .select("id", { count: "exact", head: true })
        .eq("event_type", "ai_analysis")
        .eq("metadata->>ip", clientIp)
        .gte("created_at", since);
      if ((count ?? 0) >= RATE_LIMIT_MAX) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      await supabaseAdmin
        .from("designer_metrics")
        .insert({ event_type: "ai_analysis", metadata: { ip: clientIp } });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a roof detection AI for a roofing company's virtual roof designer tool. 
Analyze the provided house photo and identify the roof region.

Return a JSON object with:
- "detected": boolean - whether a roof was clearly detected
- "roofType": string - detected roof type (gable, hip, flat, mansard, gambrel, shed, or unknown)
- "roofRegion": object with "top", "left", "width", "height" as percentages (0-100) of the image dimensions describing the bounding box of the roof area
- "polygonPoints": array of [x, y] percentage coordinate pairs (0-100) outlining the roof edges (provide 4-8 key points tracing the roof outline)
- "confidence": number 0-1
- "angle": string - perspective angle (front, angled-left, angled-right, aerial)
- "suggestion": string - brief tip for the user if detection quality is low

Be precise with polygon points - they should trace the actual roof edges visible in the photo.
Only return the JSON object, nothing else.`
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this house photo and detect the roof region. Return only JSON."
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`
                }
              }
            ]
          }
        ],
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limited. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI analysis failed");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No response from AI");
    }

    // Parse the JSON from the AI response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse AI response");
    }

    let roofData: Record<string, unknown>;
    try {
      roofData = JSON.parse(jsonMatch[0]);
    } catch (parseErr) {
      console.error("AI response JSON parse error:", parseErr);
      throw new Error("Could not parse AI response");
    }

    if (
      !roofData ||
      typeof roofData !== "object" ||
      typeof (roofData as { detected?: unknown }).detected !== "boolean"
    ) {
      console.error("AI response failed schema validation:", roofData);
      throw new Error("Invalid AI response structure");
    }

    return new Response(
      JSON.stringify(roofData),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("analyze-roof error:", error);
    // Return generic message to client; details remain in server logs
    return new Response(
      JSON.stringify({ error: "Roof analysis failed. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
