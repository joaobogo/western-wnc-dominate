/**
 * Global CTA Architecture — Highlander Building Services
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
  primary: "Get My Project Scoped",

  /** Roofing division pages — confidence & planning language */
  roofingConsult: "Get My Roof Assessed",
  roofingHero: "See What My Roof Needs",
  roofingMid: "Get My Roof Questions Answered",
  roofingClosing: "Get My Roof Protected",

  /** Construction division pages — build & project language */
  constructionConsult: "Get My Build Planned",
  constructionHero: "Get My Build Planned",
  constructionMid: "Get My Project Scoped",
  constructionClosing: "Your Home Deserves a Real Builder",

  /** Construction primary CTA — used across construction pages */
  constructionPlan: "Get My Project Scoped",

  /** Design & Consultation Agreement — paid design program */
  designAgreement: "Get My Plans Drawn",

  /** About page — trust & exploration language */
  aboutHero: "Get My Questions Answered",
  aboutClosing: "See What We've Built — Then Decide",
  aboutExplore: "Explore Our Work",

  /** Gallery / Projects page — "your project" language */
  galleryMid: "Imagine This for Your Home",
  galleryClosing: "Your Project Could Be Next",
  galleryInline: "Get My Project Scoped",

  /** Blog page — education → service bridge language */
  blogClosing: "Have a Question About Your Roof or Project?",
  blogInline: "Need Expert Advice on This?",
  blogService: "Get My Questions Answered",

  /** Contact page — direct & premium */
  contactSubmit: "Get My Questions Answered",

  /** Generic consultation — Reviews, Certifications */
  consultation: "Get My Questions Answered",

  /** Commercial / B2B contexts */
  commercial: "Get My Building Assessed",

  /** Footer CTA strip */
  footer: "Get My Project Scoped",

  /** Storm / emergency context */
  storm: "Get My Roof Assessed",

  /** Roof designer lead capture */
  designer: "Get My Project Scoped",

  /** Mobile sticky bar */
  mobileSticky: "Get My Written Estimate",
} as const;

/* ─── SECONDARY CTA LABELS ─── */
export const CTA_SECONDARY = {
  call: "(828) 524-7773",
  callLabel: "Call Direct: 828-524-7773",
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
    "CertainTeed ShingleMaster Credentialed Contractor — Top 1%",
    "500+ mountain roofs installed",
    "Rapid storm response",
    "Full warranty documentation on every project",
  ],
  /** Construction: process + planning + finish quality */
  construction: [
    "Licensed General Contractor",
    "In-house Highlander crews on every project",
    "Design-build capable",
    "Written scope on every project",
  ],
  /** About: story + values + team credibility */
  about: [
    "Family-owned, locally run since 2017",
    "20+ local team members behind every project",
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
