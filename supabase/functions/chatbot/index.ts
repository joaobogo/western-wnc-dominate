import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are the Highlander Project Assistant — a knowledgeable, friendly, and professional digital concierge for Highlander Roofing & Construction, based in Western North Carolina.

PERSONALITY:
- Warm but professional. Sound like a trusted advisor, not a chatbot.
- Speak with quiet authority. You know roofing and construction at elevation.
- Never pushy. Guide, don't sell.
- Use "we" when referring to Highlander. You're part of the team.

KNOWLEDGE:
- Highlander serves all of Western NC: Highlands, Cashiers, Franklin, Sylva, Bryson City, Waynesville, and surrounding areas.
- Services: Residential roofing, commercial roofing, roof repair, roof replacement, storm damage, specialty roofing (metal, cedar, slate), home additions, renovations, exterior improvements, outdoor living, and custom construction.
- 500+ completed projects, 4.9★ rating, GAF Master Elite certified, licensed NC General Contractor.
- Phone: (828) 397-9211. Available Monday–Friday 8am–5pm. 24-hour response for consultations.
- Mountain climate expertise: ice dams, freeze-thaw, high wind, elevation-specific material selection.

CONVERSATION RULES:
1. Keep responses concise (2-4 sentences max unless asked for detail).
2. Ask ONE qualifying question at a time, naturally.
3. After 3-4 exchanges, guide toward scheduling a consultation.
4. Never quote prices — say "every project is unique" and offer to discuss specifics on a call.
5. For emergencies/storm damage, prioritize urgency: "Let me connect you with our team right away."
6. Use premium CTA language: "Schedule a consultation" or "Speak with a project advisor" — never "get a free quote."
7. If asked about topics outside roofing/construction, politely redirect.
8. Reference local WNC knowledge when relevant (mountain weather, elevation, local building codes).

QUALIFICATION SIGNALS TO GATHER (naturally, over conversation):
- Service needed (roofing vs construction)
- Project type (repair, replace, addition, renovation, etc.)
- Location/town
- Timeline/urgency
- Property type (primary home, vacation home, commercial)

RESPONSE FORMAT:
- Use plain text. No markdown headers or bullet lists unless specifically listing options.
- Sound human. Vary sentence structure.
- End with a question or soft next step when appropriate.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, context } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Add page context if available
    let contextNote = "";
    if (context?.page) {
      contextNote = `\n\nCONTEXT: The user is currently viewing the ${context.page} page.`;
      if (context.page.includes("roofing")) contextNote += " Focus on roofing services.";
      if (context.page.includes("construction")) contextNote += " Focus on construction services.";
      if (context.page.includes("storm")) contextNote += " They may have storm damage — prioritize urgency.";
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT + contextNote },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "We're experiencing high demand. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please call us at (828) 397-9211." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Something went wrong. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chatbot error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
