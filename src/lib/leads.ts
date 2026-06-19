import { supabase } from "@/integrations/supabase/client";

export const CONSENT_TEXT =
  "By submitting your information, you agree that Highlander Roofing Services, Inc. may contact you by phone, text, or email about your inquiry, services, scheduling, project follow-up, and review requests. Message and data rates may apply. Reply STOP to opt out of text messages. Reply HELP for help. See our Privacy Policy.";

function readQuery(name: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return new URLSearchParams(window.location.search).get(name);
  } catch {
    return null;
  }
}

function readStoredAttribution() {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem("hl_attribution");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function captureAttribution() {
  if (typeof window === "undefined") return;
  const current = readStoredAttribution();
  const next = {
    utm_source: current.utm_source ?? readQuery("utm_source"),
    utm_medium: current.utm_medium ?? readQuery("utm_medium"),
    utm_campaign: current.utm_campaign ?? readQuery("utm_campaign"),
    utm_content: current.utm_content ?? readQuery("utm_content"),
    utm_term: current.utm_term ?? readQuery("utm_term"),
    gclid: current.gclid ?? readQuery("gclid"),
    fbclid: current.fbclid ?? readQuery("fbclid"),
    li_fat_id: current.li_fat_id ?? readQuery("li_fat_id"),
    referrer: current.referrer ?? (document.referrer || null),
  };
  try {
    window.sessionStorage.setItem("hl_attribution", JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

export type LeadPayload = {
  source: string;
  lead_type?: string | null;
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  preferred_contact_method?: string | null;
  property_town?: string | null;
  property_address?: string | null;
  service_category?: string | null;
  project_type?: string | null;
  urgency?: string | null;
  project_description?: string | null;
  has_plans?: boolean | null;
  roofing_issue_type?: string | null;
  property_type?: string | null;
  photos_uploaded?: unknown;
  files_uploaded?: unknown;
  chat_summary?: string | null;
  full_chat_transcript?: unknown;
  consent_given?: boolean;
  metadata?: Record<string, unknown>;
};

/**
 * Inserts a row into the unified `leads` table.
 * Auto-captures page URL, referrer, user agent and any UTM/click-id values
 * stored in sessionStorage by captureAttribution().
 * Fire-and-forget safe: caller should not block the user on this.
 */
export async function submitLead(payload: LeadPayload) {
  const attribution = readStoredAttribution();
  const row = {
    ...payload,
    consent_given: payload.consent_given ?? true,
    consent_text: CONSENT_TEXT,
    page_url: typeof window !== "undefined" ? window.location.href : null,
    referrer:
      attribution.referrer ??
      (typeof document !== "undefined" ? document.referrer || null : null),
    user_agent:
      typeof navigator !== "undefined" ? navigator.userAgent : null,
    utm_source: attribution.utm_source ?? null,
    utm_medium: attribution.utm_medium ?? null,
    utm_campaign: attribution.utm_campaign ?? null,
    utm_content: attribution.utm_content ?? null,
    utm_term: attribution.utm_term ?? null,
    gclid: attribution.gclid ?? null,
    fbclid: attribution.fbclid ?? null,
    li_fat_id: attribution.li_fat_id ?? null,
  };
  const { data, error } = await supabase
    .from("leads")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .insert([row as any])
    .select("id")
    .single();
  if (error) {
    console.error("submitLead error:", error);
    return { id: null as string | null, error };
  }
  return { id: (data?.id as string) ?? null, error: null };
}

export async function logChatbotConversation(input: {
  lead_id?: string | null;
  session_id?: string | null;
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  property_town?: string | null;
  service_category?: string | null;
  project_type?: string | null;
  urgency?: string | null;
  summary?: string | null;
  full_transcript?: unknown;
  recommended_next_step?: string | null;
  contact_path?: string | null;
  converted_to_lead?: boolean;
}) {
  const attribution = readStoredAttribution();
  const row = {
    ...input,
    consent_given: true,
    consent_text: CONSENT_TEXT,
    page_url: typeof window !== "undefined" ? window.location.href : null,
    referrer:
      attribution.referrer ??
      (typeof document !== "undefined" ? document.referrer || null : null),
    utm_source: attribution.utm_source ?? null,
    utm_medium: attribution.utm_medium ?? null,
    utm_campaign: attribution.utm_campaign ?? null,
    utm_content: attribution.utm_content ?? null,
    utm_term: attribution.utm_term ?? null,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await supabase.from("chatbot_conversations").insert([row as any]);
  if (error) console.error("logChatbotConversation error:", error);
}