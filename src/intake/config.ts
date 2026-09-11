import { PHONE_PLAIN } from "@/data/business";
/**
 * Highlander receptionist call sheet — single tuning surface.
 * Every scoring number, option label and bucket lives here so the office can
 * adjust the model without touching component code.
 */

export const SCORE_VERSION = "V1.1";

export const COMPANY = {
  name: "Highlander Building Services Inc",
  serviceLine: "ROOFING • CONSTRUCTION • DESIGN",
  phone: `${PHONE_PLAIN}`,
  web: "HIGHLANDERNC.COM",
} as const;

export type Option = {
  id: string;
  label: string;
  points?: number;
  tone?: "danger" | "urgent";
};

/* ── Section maximums ─────────────────────────────────────────── */
export const MAX = {
  jobType: 30,
  urgency: 25,
  authority: 20,
  location: 15,
  reachability: 10,
} as const;

/* ── 1. Who ───────────────────────────────────────────────────── */
export const PREFERRED_CONTACT: Option[] = [
  { id: "call", label: "Call" },
  { id: "text", label: "Text" },
  { id: "email", label: "Email" },
];

export const BEST_TIME: Option[] = [
  { id: "morning", label: "Morning" },
  { id: "afternoon", label: "Afternoon" },
  { id: "early_evening", label: "Early evening" },
  { id: "anytime", label: "Anytime" },
];

/* ── 2. Where ─────────────────────────────────────────────────── */
export const CORE_TOWNS: Option[] = [
  "Franklin",
  "Highlands",
  "Cashiers",
  "Sylva",
  "Sapphire",
  "Glenville",
  "Cullowhee",
  "Dillsboro",
  "Otto",
  "Scaly Mountain",
  "Webster",
  "Whittier",
  "Balsam",
].map((label) => ({ id: label, label }));

export const CORE_OTHER: Option = {
  id: "__core_other",
  label: "Other core town…",
};

export const NEARBY_TOWNS: Option[] = [
  "Lake Toxaway",
  "Brevard",
  "Rosman",
  "Waynesville",
  "Bryson City",
  "Cherokee",
  "Hayesville",
  "Clayton GA",
  "Dillard GA",
  "Sky Valley GA",
  "Mountain City GA",
].map((label) => ({ id: label, label }));

export const NEARBY_OTHER: Option = {
  id: "__nearby_other",
  label: "Other nearby…",
};

export const OUTSIDE_AREA: Option = {
  id: "__outside",
  label: "Outside our area",
  tone: "danger",
};

export const LOCATION_POINTS = { core: 15, extended: 8 } as const;

export const RELATIONSHIPS: Option[] = [
  { id: "owner", label: "I own it", points: 20 },
  {
    id: "organization",
    label: "Business, church or organization that owns it",
    points: 18,
  },
  {
    id: "property_manager",
    label: "Property manager, HOA or caretaker",
    points: 15,
  },
  { id: "agent", label: "Family member or agent for the owner", points: 12 },
  { id: "buyer", label: "Buying it — under contract", points: 12 },
  { id: "renter", label: "Renter", points: 6 },
];

export const PROPERTY_TYPES: Option[] = [
  { id: "primary", label: "Primary home" },
  { id: "second", label: "Second home / cabin" },
  { id: "rental", label: "Rental they own" },
  { id: "commercial", label: "Commercial building" },
  { id: "hoa", label: "HOA / multi-family" },
];

/* ── 3. What & when ───────────────────────────────────────────── */
export const JOB_TYPES: Option[] = [
  { id: "roof_replacement", label: "Roof replacement or new roof", points: 30 },
  { id: "addition_remodel", label: "Addition or remodel", points: 30 },
  { id: "roof_repair", label: "Roof repair or leak", points: 22 },
  {
    id: "exterior",
    label: "Exterior: siding, deck, porch, windows",
    points: 21,
  },
  { id: "gutters", label: "Gutters only", points: 20 },
  {
    id: "storm_insurance",
    label: "Storm damage or insurance claim",
    points: 14,
  },
  { id: "new_build", label: "New home or custom build", points: 12 },
  { id: "inspection", label: "Inspection or not sure yet", points: 10 },
];

export const TIMINGS: Option[] = [
  {
    id: "emergency",
    label: "Emergency — active leak, storm damage, tarp needed now",
    points: 25,
    tone: "urgent",
  },
  { id: "asap", label: "As soon as possible — within 30 days", points: 22 },
  { id: "1_3_months", label: "1–3 months", points: 16 },
  { id: "3_6_months", label: "3–6 months", points: 10 },
  { id: "6_plus", label: "6+ months or just planning", points: 5 },
];

export const BUDGET_JOB_TYPES = ["new_build", "addition_remodel"];

export const BUDGETS: Option[] = [
  { id: "not_sure", label: "Not sure" },
  { id: "under_50k", label: "Under $50k" },
  { id: "50_150k", label: "$50k–$150k" },
  { id: "150_400k", label: "$150k–$400k" },
  { id: "400k_plus", label: "$400k+" },
];

export const SOURCES: Option[] = [
  { id: "google", label: "Google" },
  { id: "gbp", label: "Google Maps listing" },
  { id: "referral", label: "Referral" },
  { id: "past_customer", label: "Past customer" },
  { id: "social", label: "Facebook / Instagram" },
  { id: "yard_sign", label: "Yard sign / truck" },
  { id: "ad", label: "Ad or mailer" },
  { id: "trade", label: "Realtor / designer / PM" },
  { id: "other", label: "Other" },
];

export const SOURCE_DETAIL_TRIGGERS = ["referral", "past_customer", "trade", "gbp"];


/* ── 4. Office only ───────────────────────────────────────────── */
export const CHANNELS: Option[] = [
  { id: "phone", label: "Phone call" },
  { id: "website", label: "Website form" },
  { id: "walk_in", label: "Walk-in" },
  { id: "text_dm", label: "Text / DM" },
  { id: "email", label: "Email" },
];

export const ROOF_TYPES: Option[] = [
  { id: "shingle", label: "Shingle" },
  { id: "metal", label: "Metal" },
  { id: "wood_shake", label: "Wood shake" },
  { id: "slate_tile", label: "Slate / tile" },
  { id: "flat", label: "Flat" },
  { id: "unknown", label: "Unknown" },
];

export const STORIES: Option[] = [
  { id: "1", label: "1" },
  { id: "2", label: "2" },
  { id: "3_plus", label: "3+" },
];

export const YES_NO: Option[] = [
  { id: "yes", label: "Yes" },
  { id: "no", label: "No" },
];

export const GUTTER_STATE: Option[] = [
  { id: "fine", label: "Fine" },
  { id: "need_work", label: "Need work" },
  { id: "none", label: "None" },
];

export const HOME_FOR_APPT: Option[] = [
  { id: "yes", label: "Yes" },
  { id: "no_go_ahead", label: "No — go ahead" },
  { id: "needs_key", label: "Needs key / caretaker" },
];

export const APPOINTMENT_STATE: Option[] = [
  { id: "not_yet", label: "Not yet" },
  { id: "booked", label: "Booked" },
  { id: "wants_one", label: "Wants one" },
];

/* ── Reachability (computed, never asked) ─────────────────────── */
export const REACHABILITY = {
  validPhone: 5,
  validEmail: 2,
  contactPreference: 1,
  spokeLive: 2,
} as const;

/* ── Buckets ──────────────────────────────────────────────────── */
export type Grade = "A" | "B" | "C" | "D" | "DQ";

export const GRADE_COLORS: Record<Grade, { bg: string; fg: string }> = {
  A: { bg: "#C0913F", fg: "#12233A" },
  B: { bg: "#184613", fg: "#FCF5DF" },
  C: { bg: "#5C7F55", fg: "#FCF5DF" },
  D: { bg: "#9AA48F", fg: "#12233A" },
  DQ: { bg: "#A82C20", fg: "#FCF5DF" },
};

export const BUCKETS: {
  grade: Exclude<Grade, "DQ">;
  min: number;
  headline: string;
  action: string;
  cadence: string;
}[] = [
  {
    grade: "A",
    min: 80,
    headline: "Call within 15 minutes.",
    action:
      "Call now. Book the free assessment on the call. Text if no answer. Alert the estimator.",
    cadence: "Call, text, call again today; then daily for 3 days.",
  },
  {
    grade: "B",
    min: 60,
    headline: "Call same day.",
    action: "Call before the end of the business day and book the assessment.",
    cadence: "Three attempts over 48 hours, mixing call and text.",
  },
  {
    grade: "C",
    min: 40,
    headline: "Call within 24 hours.",
    action:
      "Call within one business day. Offer the assessment; if not ready, set a follow-up date.",
    cadence: "Follow up at 2 weeks and 6 weeks. Add to the seasonal list.",
  },
  {
    grade: "D",
    min: 0,
    headline: "One call, one text, archive.",
    action:
      "One call and one text. If no response or no fit, archive with the reason.",
    cadence: "Stays on the nurture list for seasonal outreach.",
  },
];

export const GATE_TEXT = {
  outside_area: {
    reason: "The property is outside our service area.",
    say: "Thank them, suggest a contractor local to them, and log the town.",
  },
  renter_no_owner: {
    reason: "Renter with no owner or property manager contact.",
    say: "Ask them to have the owner or property manager call us.",
  },
  vendor_call: {
    reason: "Vendor, sales or recruiting call.",
    say: "Not a lead. Take a message for the office manager.",
  },
  not_offered: {
    reason: "They want work we do not do.",
    say: "Refer out if we have a name.",
  },
} as const;

export const FLAG_TEXT = {
  no_owner_contact:
    "Get the owner's name and number on the first call.",
  low_budget: "Estimator reviews before booking.",
  after_hours:
    "Clock starts at opening — A-leads get the first call of the day.",
} as const;

/* ── Business hours ───────────────────────────────────────────── */
export const BUSINESS = {
  timeZone: "America/New_York",
  openHour: 8,
  closeHour: 17,
  workdays: [1, 2, 3, 4, 5], // Mon–Fri
} as const;
