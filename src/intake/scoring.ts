import {
  BUCKETS,
  BUDGET_JOB_TYPES,
  CORE_OTHER,
  CORE_TOWNS,
  FLAG_TEXT,
  GATE_TEXT,
  JOB_TYPES,
  LOCATION_POINTS,
  MAX,
  NEARBY_OTHER,
  NEARBY_TOWNS,
  REACHABILITY,
  RELATIONSHIPS,
  SCORE_VERSION,
  TIMINGS,
  type Grade,
} from "./config";
import { callByFor, isBusinessHours } from "./business-time";

export type LeadDraft = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  preferredContact: string | null;
  bestTime: string | null;

  address: string;
  town: string | null;
  townOther: string;
  relationship: string | null;
  ownerName: string;
  ownerContact: string;
  propertyType: string | null;

  jobType: string | null;
  details: string;
  timing: string | null;
  budget: string | null;
  source: string | null;
  sourceDetail: string;

  channel: string;
  takenBy: string;
  spokeLive: boolean;
  vendorCall: boolean;
  notOffered: boolean;

  appointment: Record<string, string>;
};

export const EMPTY_LEAD: LeadDraft = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  preferredContact: null,
  bestTime: null,
  address: "",
  town: null,
  townOther: "",
  relationship: null,
  ownerName: "",
  ownerContact: "",
  propertyType: null,
  jobType: null,
  details: "",
  timing: null,
  budget: null,
  source: null,
  sourceDetail: "",
  channel: "phone",
  takenBy: "",
  spokeLive: true,
  vendorCall: false,
  notOffered: false,
  appointment: {},
};

/* ── Helpers ──────────────────────────────────────────────────── */

export function digits(value: string) {
  return value.replace(/\D/g, "");
}

export function formatPhone(value: string) {
  const d = digits(value).slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
}

export function isValidPhone(value: string) {
  return digits(value).length === 10;
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export type LocationTier = "core" | "extended" | "outside" | null;

export function locationTier(town: string | null): LocationTier {
  if (!town) return null;
  if (town === "__outside") return "outside";
  if (town === CORE_OTHER.id || CORE_TOWNS.some((t) => t.id === town))
    return "core";
  if (town === NEARBY_OTHER.id || NEARBY_TOWNS.some((t) => t.id === town))
    return "extended";
  return null;
}

/** Human-readable town, resolving the three "other" text-box cases. */
export function townLabel(lead: LeadDraft): string {
  if (!lead.town) return "";
  if (
    lead.town === CORE_OTHER.id ||
    lead.town === NEARBY_OTHER.id ||
    lead.town === "__outside"
  ) {
    return lead.townOther.trim();
  }
  return lead.town;
}

function points(list: { id: string; points?: number }[], id: string | null) {
  if (!id) return 0;
  return list.find((o) => o.id === id)?.points ?? 0;
}

export function hasOwnerContact(lead: LeadDraft) {
  return Boolean(lead.ownerName.trim() || lead.ownerContact.trim());
}

/* ── Result ───────────────────────────────────────────────────── */

export type Breakdown = {
  jobType: number;
  urgency: number;
  authority: number;
  location: number;
  reachability: number;
};

export type Gate = { id: string; reason: string; say: string };
export type Flag = { id: string; text: string };

export type ScoreResult = {
  answered: number;
  remaining: number;
  ready: boolean;
  gated: boolean;
  gates: Gate[];
  flags: Flag[];
  breakdown: Breakdown;
  score: number | null;
  grade: Grade | null;
  headline: string;
  action: string;
  cadence: string;
  callBy: Date | null;
  scoreVersion: string;
};

/** The four scored questions the receptionist actually asks. */
function answeredCount(lead: LeadDraft) {
  return [lead.jobType, lead.timing, lead.relationship, lead.town].filter(
    Boolean,
  ).length;
}

export function scoreLead(lead: LeadDraft, receivedAt = new Date()): ScoreResult {
  const tier = locationTier(lead.town);
  const ownerContact = hasOwnerContact(lead);

  /* Gates */
  const gates: Gate[] = [];
  if (tier === "outside")
    gates.push({ id: "outside_area", ...GATE_TEXT.outside_area });
  if (lead.relationship === "renter" && !ownerContact)
    gates.push({ id: "renter_no_owner", ...GATE_TEXT.renter_no_owner });
  if (lead.vendorCall) gates.push({ id: "vendor_call", ...GATE_TEXT.vendor_call });
  if (lead.notOffered) gates.push({ id: "not_offered", ...GATE_TEXT.not_offered });

  /* Breakdown */
  const reachability = Math.min(
    MAX.reachability,
    (isValidPhone(lead.phone) ? REACHABILITY.validPhone : 0) +
      (isValidEmail(lead.email) ? REACHABILITY.validEmail : 0) +
      (lead.preferredContact || lead.bestTime
        ? REACHABILITY.contactPreference
        : 0) +
      (lead.spokeLive ? REACHABILITY.spokeLive : 0),
  );

  const breakdown: Breakdown = {
    jobType: points(JOB_TYPES, lead.jobType),
    urgency: points(TIMINGS, lead.timing),
    authority:
      lead.relationship === "renter" && !ownerContact
        ? 0
        : points(RELATIONSHIPS, lead.relationship),
    location:
      tier === "core"
        ? LOCATION_POINTS.core
        : tier === "extended"
          ? LOCATION_POINTS.extended
          : 0,
    reachability,
  };

  /* Flags */
  const flags: Flag[] = [];
  if (
    lead.relationship &&
    lead.relationship !== "owner" &&
    !ownerContact &&
    !gates.some((g) => g.id === "renter_no_owner")
  ) {
    flags.push({ id: "no_owner_contact", text: FLAG_TEXT.no_owner_contact });
  }
  const lowBudget =
    (lead.jobType === "new_build" &&
      (lead.budget === "under_50k" || lead.budget === "50_150k")) ||
    (lead.jobType === "addition_remodel" && lead.budget === "under_50k");
  if (lowBudget) flags.push({ id: "low_budget", text: FLAG_TEXT.low_budget });
  if (!isBusinessHours(receivedAt))
    flags.push({ id: "after_hours", text: FLAG_TEXT.after_hours });

  const answered = answeredCount(lead);
  const remaining = 4 - answered;
  const ready = remaining === 0;
  const gated = gates.length > 0;

  const total =
    breakdown.jobType +
    breakdown.urgency +
    breakdown.authority +
    breakdown.location +
    breakdown.reachability;

  if (gated) {
    return {
      answered,
      remaining,
      ready,
      gated: true,
      gates,
      flags,
      breakdown,
      score: null,
      grade: "DQ",
      headline: gates[0].reason,
      action: gates[0].say,
      cadence: "",
      callBy: null,
      scoreVersion: SCORE_VERSION,
    };
  }

  if (!ready) {
    return {
      answered,
      remaining,
      ready: false,
      gated: false,
      gates,
      flags,
      breakdown,
      score: total,
      grade: null,
      headline:
        answered === 0
          ? "Answer the four scored questions"
          : `Keep going — ${remaining} left`,
      action: "",
      cadence: "",
      callBy: null,
      scoreVersion: SCORE_VERSION,
    };
  }

  const bucket = BUCKETS.find((b) => total >= b.min)!;
  return {
    answered,
    remaining: 0,
    ready: true,
    gated: false,
    gates,
    flags,
    breakdown,
    score: total,
    grade: bucket.grade,
    headline: bucket.headline,
    action: bucket.action,
    cadence: bucket.cadence,
    callBy: callByFor(bucket.grade, receivedAt),
    scoreVersion: SCORE_VERSION,
  };
}

/* ── Validation (only what scoring needs) ─────────────────────── */

export type MissingField =
  | "name"
  | "contact"
  | "town"
  | "relationship"
  | "jobType"
  | "timing";

export function missingRequired(lead: LeadDraft): MissingField[] {
  const missing: MissingField[] = [];
  if (!lead.firstName.trim() && !lead.lastName.trim()) missing.push("name");
  if (!isValidPhone(lead.phone) && !isValidEmail(lead.email))
    missing.push("contact");
  if (!lead.town || (locationTier(lead.town) === null && !lead.townOther.trim()))
    missing.push("town");
  if (!lead.relationship) missing.push("relationship");
  if (!lead.jobType) missing.push("jobType");
  if (!lead.timing) missing.push("timing");
  return missing;
}

export const MISSING_LABEL: Record<MissingField, string> = {
  name: "a name",
  contact: "a phone number or email",
  town: "the town",
  relationship: "their relationship to the property",
  jobType: "what they need help with",
  timing: "when they need it done",
};

/* ── Plain-text summary for the clipboard ─────────────────────── */

export function leadSummary(lead: LeadDraft, result: ScoreResult, callBy: string) {
  const label = (list: { id: string; label: string }[], id: string | null) =>
    list.find((o) => o.id === id)?.label ?? "";
  const lines = [
    `${lead.firstName} ${lead.lastName}`.trim(),
    lead.phone && `Phone: ${lead.phone}`,
    lead.email && `Email: ${lead.email}`,
    townLabel(lead) && `Town: ${townLabel(lead)}`,
    lead.address && `Address: ${lead.address}`,
    `Job: ${label(JOB_TYPES, lead.jobType)}`,
    `Timing: ${label(TIMINGS, lead.timing)}`,
    `Relationship: ${label(RELATIONSHIPS, lead.relationship)}`,
    lead.details && `Notes: ${lead.details}`,
    result.gated
      ? `Grade: DQ — ${result.headline}`
      : `Grade: ${result.grade} (${result.score}/100)`,
    callBy && `Call by: ${callBy}`,
    lead.takenBy && `Taken by: ${lead.takenBy}`,
  ].filter(Boolean);
  return lines.join("\n");
}

export const BUDGET_VISIBLE_FOR = BUDGET_JOB_TYPES;
