/**
 * Global CTA Architecture — Highlander Roofing & Construction
 * 
 * Premium CTA language system. No cheap/gimmicky language.
 * No "free inspections", "get started", "claim your", "book now".
 * 
 * HIERARCHY:
 * 1. Primary CTAs — Gold gradient buttons (conversion-critical)
 * 2. Secondary CTAs — Ghost/outline buttons (phone, secondary actions)
 * 3. Contextual CTAs — Inline text links within content
 */

/* ─── PRIMARY CTA LABELS ─── */
// Use these for gold gradient conversion buttons

export const CTA = {
  /** Homepage hero, sticky CTA, main nav */
  primary: "Start Your Project",

  /** Roofing division pages */
  roofingConsult: "Request a Roof Consultation",

  /** Construction division pages */
  constructionConsult: "Schedule a Project Consultation",

  /** Generic consultation — About, Reviews, Certifications, Blog */
  consultation: "Talk With Our Team",

  /** Commercial / B2B contexts */
  commercial: "Discuss Your Building",

  /** Footer CTA strip */
  footer: "Discuss Your Project",

  /** Mid-page CTA strips */
  midPageRoofing: "Talk With a Roofing Advisor",
  midPageConstruction: "Discuss Your Project",

  /** Blog sidebar / in-article */
  blogInline: "Request a Consultation",

  /** Storm / emergency context */
  storm: "Request an Assessment",

  /** Roof designer lead capture */
  designer: "Request a Project Consultation",

  /** Mobile sticky bar */
  mobileSticky: "Start Project",
} as const;

/* ─── SECONDARY CTA LABELS ─── */
export const CTA_SECONDARY = {
  call: "(828) 397-9211",
  callLabel: "Call Direct",
} as const;

/* ─── SUPPORTING COPY ─── */
export const CTA_SUBTEXT = {
  /** Under primary CTAs */
  noObligation: "No-obligation conversation about your property.",
  response24h: "We respond within 24 hours with a direct call — not a form email.",
  localTeam: "You'll speak with a project advisor who knows these mountains, not a call center.",

  /** For reassurance blocks */
  reassuranceRoofing: "Whether you need a repair assessment, a replacement consultation, or just an honest opinion — we're here to help you think it through.",
  reassuranceConstruction: "Whether you're planning an addition, a renovation, or a custom build — let's have a straightforward conversation about what's possible.",
  reassuranceGeneral: "Start a conversation with our team. No pressure, no upselling — just honest advice from people who build in these mountains every day.",

  /** Planning / not sure where to start */
  planningCallout: "Describe what you're thinking, and we'll help you evaluate feasibility, approach, and budget range — before you commit to anything.",
} as const;

/* ─── EYEBROW LABELS ─── */
export const CTA_EYEBROW = {
  roofing: "Your Roof, Our Expertise",
  construction: "Start Planning",
  general: "Built for These Mountains. Built for You.",
  blog: "Need Expert Advice?",
} as const;

/* ─── FORBIDDEN LANGUAGE ─── */
// NEVER use these in any CTA context:
// "Free inspection" / "Free estimate" / "Free quote"
// "Get started" / "Get a free..." / "Claim your..."
// "Book now" / "Buy now" / "Act now"
// "Limited time" / "Don't miss out" / "Hurry"
// "Call now" (use "Call Direct" instead)
// "Click here"
