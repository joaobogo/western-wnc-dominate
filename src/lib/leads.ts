import { supabase } from "@/integrations/supabase/client";
import {
  trackFormSuccess,
  trackFormError,
  trackChatbotLeadSubmit,
} from "@/lib/gtm";
import { scoreLead } from "@/lib/lead-scoring";
import { parsePersonName } from "@/lib/name-parser";
import { getAttribution, currentPagePath } from "@/lib/attribution";

export { captureAttribution } from "@/lib/attribution";
export type { Attribution } from "@/lib/attribution";

export const CONSENT_TEXT =
  "By submitting your information, you agree that Highlander Roofing Services, Inc. may contact you by phone, text, or email about your inquiry, services, scheduling, project follow-up, and review requests. Message and data rates may apply. Reply STOP to opt out of text messages. Reply HELP for help. See our Privacy Policy.";

/** A single uploaded file attached to a lead. */
export type LeadAttachment = {
  path: string;
  name?: string | null;
  size?: number | null;
  type?: string | null;
};

/**
 * THE canonical lead payload.
 *
 * Every form, widget, calculator and CTA in the app builds this exact shape
 * and passes it to submitLead(). Nothing else should insert into `leads`.
 * Field names match the `leads` table columns 1:1 so the JobTread mapper can
 * rely on a single, predictable structure.
 */
export type CanonicalLeadPayload = {
  /** Required. Stable machine identifier for the entry point, e.g. "roofing_intake_form". */
  source: string;
  /** Optional coarse bucket, e.g. "roofing" | "construction" | "design_services". */
  lead_type?: string | null;

  // ----- Identity -----
  first_name?: string | null;
  last_name?: string | null;
  /** Derived from first+last when omitted; split into first/last when provided alone. */
  full_name?: string | null;
  /** Set automatically when the submitted name looks like a business. */
  is_company?: boolean | null;
  /** Business/organization name. Auto-detected from `full_name` when omitted. */
  company_name?: string | null;
  email?: string | null;
  phone?: string | null;
  preferred_contact_method?: string | null;

  // ----- Property -----
  property_address?: string | null;
  property_town?: string | null;
  property_state?: string | null;
  property_zip?: string | null;
  property_type?: string | null;

  // ----- Project -----
  service_category?: string | null;
  project_type?: string | null;
  roofing_issue_type?: string | null;
  timeline?: string | null;
  /** Derived from timeline when omitted. */
  urgency?: string | null;
  budget_range?: string | null;
  insurance_status?: string | null;
  has_plans?: boolean | null;
  project_description?: string | null;

  // ----- Scoring & context -----
  /** Computed from the other fields when omitted. */
  lead_score?: number | null;
  /** Defaults to window.location.pathname. */
  page_path?: string | null;

  // ----- Attachments -----
  attachments?: Array<string | LeadAttachment> | null;
  /** Files the customer selected that failed to upload. Never blocks the lead. */
  attachment_errors?: Array<{ name: string; reason: string }> | null;

  // ----- Conversational -----
  chat_summary?: string | null;
  full_chat_transcript?: unknown;

  // ----- Attribution overrides (auto-captured when omitted) -----
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  gclid?: string | null;
  fbclid?: string | null;
  msclkid?: string | null;
  li_fat_id?: string | null;
  referrer?: string | null;
  landing_page?: string | null;
  landing_url?: string | null;

  consent_given?: boolean;
  metadata?: Record<string, unknown>;
};

/** @deprecated Use CanonicalLeadPayload. Kept so older call sites still compile. */
export type LeadPayload = CanonicalLeadPayload & {
  /** @deprecated use full_name */
  name?: string | null;
  /** @deprecated use attachments */
  files_uploaded?: unknown;
  /** @deprecated use attachments */
  photos_uploaded?: unknown;
};

function clean(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim().replace(/\s+/g, " ");
  return t.length ? t : null;
}

/**
 * Splits a display name into first / last using the shared name parser.
 * Company names return `{ first: null, last: null }` — read `parsePersonName`
 * directly when you need the `is_company` / `company_name` fields.
 */
export function splitFullName(full?: string | null): { first: string | null; last: string | null } {
  const parsed = parsePersonName(full);
  return { first: parsed.first_name, last: parsed.last_name };
}

/** Canonical timeline -> urgency mapping. Used whenever a form omits `urgency`. */
export function urgencyFromTimeline(timeline?: string | null): string | null {
  const t = (timeline || "").toLowerCase();
  if (!t) return null;
  if (t.includes("emergency") || t.includes("asap") || t.includes("immediate")) return "high";
  if (t.includes("30days") || t.includes("1-month") || t.includes("30 days")) return "medium";
  if (t.includes("1-3-months") || t.includes("90days")) return "medium";
  return "low";
}

function normalizeAttachments(
  input: CanonicalLeadPayload["attachments"],
): LeadAttachment[] {
  if (!Array.isArray(input)) return [];
  return input
    .map<LeadAttachment | null>((a) =>
      typeof a === "string"
        ? { path: a, name: a.split("/").pop() ?? a, size: null, type: null }
        : a && typeof a.path === "string"
          ? { path: a.path, name: a.name ?? null, size: a.size ?? null, type: a.type ?? null }
          : null,
    )
    .filter((a): a is LeadAttachment => a !== null);
}

/**
 * Fills in every derived field so the row written to `leads` is always the
 * same shape regardless of which form produced it.
 */
export function normalizeLeadPayload(input: LeadPayload) {
  // Name: accept first/last, full_name, or the legacy `name` field.
  const providedFull = clean(input.full_name) ?? clean(input.name);
  const parsed = parsePersonName(providedFull);
  let first = clean(input.first_name);
  let last = clean(input.last_name);
  if (!first && !last && providedFull) {
    first = parsed.first_name;
    last = parsed.last_name;
  }
  const fullName = providedFull ?? clean([first, last].filter(Boolean).join(" "));
  const isCompany = input.is_company ?? parsed.is_company;
  const companyName = clean(input.company_name) ?? parsed.company_name;

  const timeline = clean(input.timeline);
  const urgency = clean(input.urgency) ?? urgencyFromTimeline(timeline);

  // Attachments: canonical `attachments`, falling back to the legacy arrays.
  const attachments = normalizeAttachments(
    input.attachments ??
      (input.files_uploaded as CanonicalLeadPayload["attachments"]) ??
      (input.photos_uploaded as CanonicalLeadPayload["attachments"]),
  );

  const leadScore =
    typeof input.lead_score === "number"
      ? input.lead_score
      : scoreLead({
          serviceCategory: clean(input.service_category) ?? undefined,
          projectType: clean(input.project_type) ?? undefined,
          timeline: timeline ?? undefined,
          hasPhotos: attachments.length > 0,
          hasPlans: input.has_plans ?? null,
          insuranceStatus: clean(input.insurance_status) ?? undefined,
          propertyType: clean(input.property_type) ?? undefined,
          town: clean(input.property_town) ?? undefined,
          budgetReadiness: clean(input.budget_range) ?? undefined,
          description: clean(input.project_description) ?? undefined,
        });

  const pagePath = clean(input.page_path) ?? currentPagePath();

  return {
    source: input.source,
    lead_type: clean(input.lead_type),

    first_name: first,
    last_name: last,
    is_company: isCompany,
    company_name: companyName,
    // `name` is the existing full-name column the JobTread mapper reads.
    name: fullName,
    email: clean(input.email),
    phone: clean(input.phone),
    preferred_contact_method: clean(input.preferred_contact_method),

    property_address: clean(input.property_address),
    property_town: clean(input.property_town),
    property_state: clean(input.property_state),
    property_zip: clean(input.property_zip),
    property_type: clean(input.property_type),

    service_category: clean(input.service_category),
    project_type: clean(input.project_type),
    roofing_issue_type: clean(input.roofing_issue_type),
    timeline,
    urgency,
    budget_range: clean(input.budget_range),
    insurance_status: clean(input.insurance_status),
    has_plans: input.has_plans ?? null,
    project_description: clean(input.project_description),

    lead_score: leadScore,
    page_path: pagePath,

    attachments,
    // Legacy columns kept in sync so existing dashboards/mappers keep working.
    files_uploaded: attachments.map((a) => a.path),
    photos_uploaded: attachments.map((a) => a.path),

    chat_summary: clean(input.chat_summary),
    full_chat_transcript: input.full_chat_transcript ?? null,

    consent_given: input.consent_given ?? true,
    metadata: input.metadata ?? {},
  };
}

/**
 * Inserts a row into the unified `leads` table.
 * Auto-captures page URL, referrer, user agent and any UTM/click-id values
 * stored in sessionStorage by captureAttribution().
 * Fire-and-forget safe: caller should not block the user on this.
 */
export async function submitLead(payload: LeadPayload) {
  // getAttribution() captures on the spot if the session never did, so a lead
  // is never sent without page / referrer / campaign context.
  const attribution = getAttribution();
  const normalized = normalizeLeadPayload(payload);
  // Generate the id client-side so we don't need SELECT-after-INSERT
  // permission (anon can INSERT but cannot SELECT the leads table).
  const leadId =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const row = {
    id: leadId,
    ...normalized,
    consent_text: CONSENT_TEXT,
    jobtread_sync_status: "pending",
    jobtread_synced: false,
    jobtread_retry_count: 0,
    page_url: typeof window !== "undefined" ? window.location.href : null,
    referrer:
      payload.referrer ??
      attribution.referrer ??
      (typeof document !== "undefined" ? document.referrer || null : null),
    landing_page: payload.landing_page ?? attribution.landing_page ?? null,
    landing_url: payload.landing_url ?? attribution.landing_url ?? null,
    first_seen_at: attribution.first_seen_at ?? null,
    user_agent:
      typeof navigator !== "undefined" ? navigator.userAgent : null,
    utm_source: payload.utm_source ?? attribution.utm_source ?? null,
    utm_medium: payload.utm_medium ?? attribution.utm_medium ?? null,
    utm_campaign: payload.utm_campaign ?? attribution.utm_campaign ?? null,
    utm_content: payload.utm_content ?? attribution.utm_content ?? null,
    utm_term: payload.utm_term ?? attribution.utm_term ?? null,
    gclid: payload.gclid ?? attribution.gclid ?? null,
    fbclid: payload.fbclid ?? attribution.fbclid ?? null,
    msclkid: payload.msclkid ?? attribution.msclkid ?? null,
    li_fat_id: payload.li_fat_id ?? attribution.li_fat_id ?? null,
  };
  const { error } = await supabase
    .from("leads")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .insert([row as any]);
  if (error) {
    console.error("submitLead error:", error);
    trackFormError({
      form_name: payload.source,
      form_id: payload.source,
      error_type: (error as { code?: string })?.code || "insert_failed",
    });
    return { id: null as string | null, error };
  }
  trackFormSuccess({
    form_name: payload.source,
    form_id: payload.source,
    lead_type: normalized.lead_type,
    service_category: normalized.service_category,
    property_town: normalized.property_town,
    lead_id: leadId,
  });
  // Fire-and-forget JobTread sync. Never block the visitor on this.
  void supabase.functions
    .invoke("jobtread-sync", { body: { lead_id: leadId } })
    .catch((err) => console.warn("jobtread-sync invoke failed:", err));
  notifyTeams({ lead_id: leadId });
  return { id: leadId, error: null };
}

/**
 * Fire-and-forget Microsoft Teams notification. Never blocks the visitor and
 * never surfaces errors to the UI — Teams is a notification channel only.
 */
export function notifyTeams(body: Record<string, unknown>) {
  void supabase.functions
    .invoke("teams-notify", { body })
    .catch((err) => console.warn("teams-notify invoke failed:", err));
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
  // getAttribution() captures on the spot if the session never did, so a lead
  // is never sent without page / referrer / campaign context.
  const attribution = getAttribution();
  const convId =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const row = {
    id: convId,
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
  const { error } = await supabase
    .from("chatbot_conversations")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .insert([row as any]);
  if (error) {
    console.error("logChatbotConversation error:", error);
    return;
  }
  // Only sync chatbot rows that actually captured contact info.
  if (input.phone || input.email || input.name) {
    trackChatbotLeadSubmit({
      service_category: input.service_category ?? null,
      property_town: input.property_town ?? null,
      lead_id: convId,
    });
    void supabase.functions
      .invoke("jobtread-sync", { body: { chatbot_conversation_id: convId } })
      .catch((err) => console.warn("jobtread-sync invoke failed:", err));
    notifyTeams({ chatbot_conversation_id: convId });
  }
}

/**
 * Fire-and-forget JobTread sync for a consultation_requests row.
 * Callers pass the id returned from the insert. Safe to call in a `.then()`
 * on the insert promise — errors are logged, never thrown.
 */
export function syncConsultationRequestToJobTread(id: string | null | undefined) {
  if (!id) return;
  void supabase.functions
    .invoke("jobtread-sync", { body: { consultation_request_id: id } })
    .catch((err) => console.warn("jobtread-sync (consultation) invoke failed:", err));
  notifyTeams({ consultation_request_id: id });
}

/**
 * Fire-and-forget JobTread sync for a designer_leads row.
 */
export function syncDesignerLeadToJobTread(id: string | null | undefined) {
  if (!id) return;
  void supabase.functions
    .invoke("jobtread-sync", { body: { designer_lead_id: id } })
    .catch((err) => console.warn("jobtread-sync (designer) invoke failed:", err));
  notifyTeams({ designer_lead_id: id });
}