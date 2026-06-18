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

  /** Roofing division pages — confidence & planning language */
  roofingConsult: "Request a Roof Consultation",
  roofingHero: "Plan Your Roof With Confidence",
  roofingMid: "Talk With a Roofing Advisor",
  roofingClosing: "Let's Protect What Matters Most",

  /** Construction division pages — build & project language */
  constructionConsult: "Schedule a Project Consultation",
  constructionHero: "Let's Plan Your Build",
  constructionMid: "Discuss Your Project Scope",
  constructionClosing: "Your Home Deserves a Real Builder",

  /** About page — trust & exploration language */
  aboutHero: "Talk With Our Team",
  aboutClosing: "See What We've Built — Then Decide",
  aboutExplore: "Explore Our Work",

  /** Gallery / Projects page — "your project" language */
  galleryMid: "Imagine This for Your Home",
  galleryClosing: "Your Project Could Be Next",
  galleryInline: "Start a Similar Project",

  /** Blog page — education → service bridge language */
  blogClosing: "Have a Question About Your Roof or Project?",
  blogInline: "Need Expert Advice on This?",
  blogService: "Talk to the Team That Wrote This",

  /** Contact page — direct & premium */
  contactSubmit: "Start the Conversation",

  /** Generic consultation — Reviews, Certifications */
  consultation: "Talk With Our Team",

  /** Commercial / B2B contexts */
  commercial: "Discuss Your Building",

  /** Footer CTA strip */
  footer: "Discuss Your Project",

  /** Storm / emergency context */
  storm: "Request an Assessment",

  /** Roof designer lead capture */
  designer: "Request a Project Consultation",

  /** Mobile sticky bar */
  mobileSticky: "Start Project",
} as const;

/* ─── SECONDARY CTA LABELS ─── */
export const CTA_SECONDARY = {
  call: "(828) 524-7773",
  callLabel: "Call Direct",
} as const;

/* ─── SUPPORTING COPY — Page-specific ─── */
export const CTA_SUBTEXT = {
  /** Roofing pages */
  roofing: "Whether you need a repair assessment, a replacement consultation, or just an honest opinion — we're here to help you plan with confidence.",
  roofingClosing: "Your roof is the single most important investment protecting your home. Let's make sure it's right.",

  /** Construction pages */
  construction: "Whether you're planning an addition, a renovation, or a custom build — let's have a straightforward conversation about what's possible.",
  constructionClosing: "We're selective about the projects we take on — because the work we do reflects who we are.",

  /** About page */
  about: "Start a conversation with our team. No pressure, no upselling — just honest advice from people who build in these mountains every day.",
  aboutClosing: "Browse our projects, read what homeowners say, or start a conversation. We'll earn your trust the same way we've earned everyone else's.",

  /** Gallery page */
  gallery: "Every project here started the same way yours could — with a conversation about what's possible.",
  galleryClosing: "Schedule a consultation and let's discuss what's possible for your home. Every great project starts with a conversation.",

  /** Blog page */
  blog: "Our team is happy to answer questions — no commitment required. Just honest, expert advice.",
  blogClosing: "Written by the crew that builds in these mountains. If you have questions, we have answers — and there's no obligation.",

  /** Contact page */
  contact: "No call centers. No automated systems. A Highlander project advisor will personally reach out rapidly.",

  /** Under primary CTAs */
  noObligation: "No-obligation conversation about your property.",
  response24h: "We respond rapidly with a direct call — not a form email.",
  localTeam: "You'll speak with a project advisor who knows these mountains, not a call center.",

  /** Planning / not sure where to start */
  planningCallout: "Describe what you're thinking, and we'll help you evaluate feasibility, approach, and budget range — before you commit to anything.",
} as const;

/* ─── EYEBROW LABELS — Page-specific ─── */
export const CTA_EYEBROW = {
  roofing: "Your Roof, Our Expertise",
  roofingClosing: "Discuss Your Roof With Our Team",
  construction: "Start Planning",
  constructionClosing: "Start the Conversation",
  about: "Built for These Mountains. Built for You.",
  aboutClosing: "Ready to Meet the Team?",
  gallery: "Your Project Could Be Our Next Showcase",
  galleryClosing: "Start Your Own Story",
  blog: "Need Expert Advice?",
  blogClosing: "From Knowledge to Action",
  contact: "Project Concierge",
  general: "Built for These Mountains. Built for You.",
} as const;

/* ─── PROOF LANGUAGE — Page-specific trust signals ─── */
export const PROOF_CONTEXT = {
  /** Roofing: materials + weather + project proof */
  roofing: [
    "CertainTeed Master Shingle Applicator — Top 1%",
    "500+ mountain roofs installed",
    "Rapid storm response",
    "Full warranty documentation on every project",
  ],
  /** Construction: process + planning + finish quality */
  construction: [
    "Licensed General Contractor",
    "In-house crews — never subcontracted",
    "Design-build capable",
    "Written scope on every project",
  ],
  /** About: story + values + team credibility */
  about: [
    "Family-owned since 2017",
    "20+ local professionals",
    "4.9★ average across Google & Facebook",
    "2024 Best of Macon County",
  ],
  /** Gallery: transformation + visual proof */
  gallery: [
    "Every project owner-inspected",
    "Before/after documentation standard",
    "Real WNC homes — not stock photos",
    "Full case studies available",
  ],
  /** Blog: expertise + local authority */
  blog: [
    "Written by our team, not AI",
    "Mountain-specific guidance",
    "Seasonal updates for WNC",
    "No sales pitch — just knowledge",
  ],
  /** Contact: reassurance + professionalism */
  contact: [
    "Rapid personal response",
    "Licensed & fully insured",
    "No automated systems",
    "Real advisor, not a salesperson",
  ],
} as const;

/* ─── FORBIDDEN LANGUAGE ─── */
// NEVER use these in any CTA context:
// "Free inspection" / "Free estimate" / "Free quote"
// "Get started" / "Get a free..." / "Claim your..."
// "Book now" / "Buy now" / "Act now"
// "Limited time" / "Don't miss out" / "Hurry"
// "Call now" (use "Call Direct" instead)
// "Click here"
