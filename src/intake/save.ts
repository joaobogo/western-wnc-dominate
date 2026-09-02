import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { getGbpTouch } from "@/lib/attribution";
import { trackGbpLeadRecorded } from "@/lib/gtm";
import { locationTier, townLabel, type LeadDraft, type ScoreResult } from "./scoring";

/** "Franklin showroom" / "sylva" → the canonical listing id used in GA4. */
function normalizeShowroom(detail: string | null | undefined): string | null {
  const t = (detail ?? "").toLowerCase();
  if (t.includes("franklin")) return "franklin";
  if (t.includes("sylva")) return "sylva";
  return null;
}


/** The generated types file does not know about the internal intake table. */
export const db = supabase as unknown as SupabaseClient;

export const TABLE = "intake_leads";

export type IntakeRow = {
  id: string;
  created_at: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  email: string | null;
  preferred_contact: string | null;
  best_time: string | null;
  address: string | null;
  town: string | null;
  location_tier: string | null;
  relationship: string | null;
  owner_name: string | null;
  owner_contact: string | null;
  property_type: string | null;
  job_type: string | null;
  details: string | null;
  timing: string | null;
  budget_range: string | null;
  source: string | null;
  source_detail: string | null;
  channel: string | null;
  taken_by: string | null;
  spoke_live: boolean;
  vendor_call: boolean;
  not_offered: boolean;
  appointment: Record<string, string>;
  score: number | null;
  grade: "A" | "B" | "C" | "D" | "DQ";
  breakdown: Record<string, number>;
  gates: { id: string; reason: string; say: string }[];
  flags: { id: string; text: string }[];
  call_by: string | null;
  score_version: string;
  status: string;
  payload: Record<string, unknown>;
};

export function toRow(lead: LeadDraft, result: ScoreResult) {
  return {
    first_name: lead.firstName.trim() || null,
    last_name: lead.lastName.trim() || null,
    phone: lead.phone.trim() || null,
    email: lead.email.trim() || null,
    preferred_contact: lead.preferredContact,
    best_time: lead.bestTime,
    address: lead.address.trim() || null,
    town: townLabel(lead) || null,
    location_tier: locationTier(lead.town),
    relationship: lead.relationship,
    owner_name: lead.ownerName.trim() || null,
    owner_contact: lead.ownerContact.trim() || null,
    property_type: lead.propertyType,
    job_type: lead.jobType,
    details: lead.details.trim() || null,
    timing: lead.timing,
    budget_range: lead.budget,
    source: lead.source,
    source_detail: lead.sourceDetail.trim() || null,
    channel: lead.channel,
    taken_by: lead.takenBy.trim() || null,
    spoke_live: lead.spokeLive,
    vendor_call: lead.vendorCall,
    not_offered: lead.notOffered,
    appointment: lead.appointment,
    score: result.gated ? null : result.score,
    grade: result.gated ? "DQ" : (result.grade ?? "D"),
    breakdown: result.breakdown,
    gates: result.gates,
    flags: result.flags,
    call_by: result.callBy ? result.callBy.toISOString() : null,
    score_version: result.scoreVersion,
    status: "new",
    payload: lead as unknown as Record<string, unknown>,
  };
}

export async function saveLead(lead: LeadDraft, result: ScoreResult) {
  const row = toRow(lead, result);

  // Google Business Profile attribution. A receptionist marks the call as
  // coming from the map listing; if the caller also browsed the site from a
  // tagged GBP link, the session's own touch fills in the showroom.
  const touch = getGbpTouch();
  const isGbp = lead.source === "gbp" || !!touch;
  const showroom = touch?.showroom ?? normalizeShowroom(lead.sourceDetail);
  const gbp = isGbp
    ? {
        showroom,
        entry: touch?.entry ?? "map_listing",
        landing_page: touch?.landing_page ?? null,
        first_seen_at: touch?.first_seen_at ?? null,
      }
    : null;

  if (gbp) {
    row.payload = { ...row.payload, gbp };
    row.source = row.source ?? "gbp";
    row.source_detail = row.source_detail ?? showroom;
  }

  const { data, error } = await db
    .from(TABLE)
    .insert(row)
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  // GA4 conversion signal: a recorded GBP lead, not just a click. Lets the
  // monthly GBP export (calls / website clicks) reconcile against GA4.
  if (gbp) {
    trackGbpLeadRecorded({
      lead_id: data.id as string,
      gbp_showroom: gbp.showroom,
      gbp_entry: gbp.entry,
      grade: row.grade,
      score: row.score,
      channel: row.channel,
    });
  }

  // Fire-and-forget CRM hand-off; the lead is already safely stored.
  db.functions
    .invoke("send-to-jobtread", { body: { lead_id: data.id, ...row } })
    .catch((err) => console.error("send-to-jobtread failed:", err));

  return data.id as string;
}

