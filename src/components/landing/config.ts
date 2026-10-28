import metalRoof from "@/assets/gallery/metal-005.webp";
import metalRoofSet from "@/assets/gallery/metal-005.webp?w=480;800;1200&format=webp&as=srcset";
import shingleRoof from "@/assets/gallery/asphalt-hero.webp";
import shingleRoofSet from "@/assets/gallery/asphalt-hero.webp?w=480;800;1200&format=webp&as=srcset";
import heroSky from "@/assets/gallery/asphalt-007.webp";
import heroSkySet from "@/assets/gallery/asphalt-007.webp?w=800;1280;1800&format=webp&as=srcset";
import additionRoom from "@/assets/gallery/addition-franklin-vaulted-room.webp";
import additionRoomSet from "@/assets/gallery/addition-franklin-vaulted-room.webp?w=480;800;1200&format=webp&as=srcset";
import dormerCabin from "@/assets/gallery/shingle-dormer-cabin-aerial.webp";
import dormerCabinSet from "@/assets/gallery/shingle-dormer-cabin-aerial.webp?w=800;1280&format=webp&as=srcset";
import additionWindows from "@/assets/gallery/addition-franklin-gable-windows.webp";
import additionWindowsSet from "@/assets/gallery/addition-franklin-gable-windows.webp?w=800;1200&format=webp&as=srcset";
import stripCharcoal from "@/assets/work/roof-charcoal-garage-mountains.webp";
import stripCharcoalSet from "@/assets/work/roof-charcoal-garage-mountains.webp?w=480;800;1200&format=webp&as=srcset";
import stripCopper from "@/assets/work/roof-copper-dormer-cabin-front.webp";
import stripCopperSet from "@/assets/work/roof-copper-dormer-cabin-front.webp?w=480;800;1200&format=webp&as=srcset";
import stripBrava from "@/assets/gallery/brava-glenville-aerial.webp";
import stripBravaSet from "@/assets/gallery/brava-glenville-aerial.webp?w=480;800;1200&format=webp&as=srcset";
import stripTan from "@/assets/work/roof-tan-dormers-aerial.webp";
import stripTanSet from "@/assets/work/roof-tan-dormers-aerial.webp?w=480;800;1200&format=webp&as=srcset";
import patioPorch from "@/assets/work/patio-cashiers-screened-porch.webp";
import patioPorchSet from "@/assets/work/patio-cashiers-screened-porch.webp?w=480;800;1200;1600&format=webp&as=srcset";
import cardChimney from "@/assets/work/roof-chimney-flashing-detail.webp";
import cardChimneySet from "@/assets/work/roof-chimney-flashing-detail.webp?w=480;800&format=webp&as=srcset";
import cardRidge from "@/assets/work/roof-charcoal-dormer-ridge.webp";
import cardRidgeSet from "@/assets/work/roof-charcoal-dormer-ridge.webp?w=480;800&format=webp&as=srcset";
import cardMetal from "@/assets/gallery/metal-006.webp";
import cardMetalSet from "@/assets/gallery/metal-006.webp?w=480;800&format=webp&as=srcset";
import cardAdditionExt from "@/assets/work/addition-franklin-exterior-windows.webp";
import cardAdditionExtSet from "@/assets/work/addition-franklin-exterior-windows.webp?w=480;800&format=webp&as=srcset";
import cardPatioWide from "@/assets/work/patio-cashiers-wide.webp";
import cardPatioWideSet from "@/assets/work/patio-cashiers-wide.webp?w=480;800&format=webp&as=srcset";
import cardDeckView from "@/assets/work/patio-cashiers-deck-view.webp";
import cardDeckViewSet from "@/assets/work/patio-cashiers-deck-view.webp?w=480;800&format=webp&as=srcset";
import cardCullowhee from "@/assets/work/addition-cullowhee-roofline.webp";
import cardCullowheeSet from "@/assets/work/addition-cullowhee-roofline.webp?w=480;800&format=webp&as=srcset";
import proofBrava from "@/assets/gallery/brava-glenville-chimney-valley.webp";
import proofBravaSet from "@/assets/gallery/brava-glenville-chimney-valley.webp?w=480;800;1200&format=webp&as=srcset";
import proofDeck from "@/assets/gallery/deck-sylva-doors-wide.webp";
import proofDeckSet from "@/assets/gallery/deck-sylva-doors-wide.webp?w=480;800;1200&format=webp&as=srcset";
import { PHONE_DISPLAY } from "@/data/business";

/**
 * Copy and proof for the three paid landing pages. All public text comes from
 * the approved 5 Oct 2026 implementation prompts (01 Roofing, 02 Construction,
 * 03 Roofing + Construction). Interaction, tracking and lead delivery live in
 * the shared template so the three pages cannot drift apart.
 *
 * PROOF RULES (from the prompts): only photographs whose job is documented may
 * carry a location or scope. Never relabel one job as several, never infer a
 * job from a filename. Image slots below are the ONLY place to swap photos.
 */

export type LandingKey = "roofing" | "construction" | "combined";

/** What the visitor may optionally pick; never a required form step. */
export type IntentId =
  | "general"
  | "roofing"
  | "construction"
  | "both"
  | "not_sure"
  | "roof_repair"
  | "roof_replacement"
  | "metal_roofing"
  | "addition"
  | "renovation"
  | "outdoor_living";

export interface LandingImage {
  src: string;
  srcSet?: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProofItem {
  id: string;
  title: string;
  /** One factual sentence. */
  detail: string;
  /** Short label chip over the photo, e.g. "Highlands, NC". */
  tag: string;
  image: LandingImage;
}

export interface IntentCard {
  id: IntentId;
  title: string;
  text: string;
  /** Short label used in the form chip, e.g. "Roof repair". */
  label: string;
  /** What lead payload `project_type` becomes when this card is chosen. */
  projectType: string;
  /** Combined page only: proof emphasis when this card is chosen. */
  emphasis?: "roofing" | "construction" | "both";
  /** Photo at the top of the card (must not repeat elsewhere on the page). */
  image?: LandingImage;
  imagePosition?: string;
  /** Tap-to-call link on the card, e.g. "Call about a repair". */
  callLabel: string;
}

export interface LandingConfig {
  key: LandingKey;
  path: string;
  formId: string;
  /** lead.service_category / lead_type default. */
  defaultCategory: string;
  defaultProjectType: string;
  defaultIntent: IntentId;
  noticeVersion: string;
  seoTitle: string;
  seoDescription: string;
  schemaName: string;
  breadcrumbName: string;

  eyebrow: string;
  h1: string;
  support: string;
  serviceLine: string;
  /** Form CTA wording: the outline hero button that scrolls to the form. */
  primaryCta: string;
  /** Mobile bar second button. */
  mobileCta: string;
  /**
   * Main hero call button. Calls lead on every landing page (call plan,
   * 28 Oct 2026); the number stays in the label so Google's forwarding-number
   * swap still replaces it for ad visitors.
   */
  heroCallLabel: string;
  /** Why to call, in plain words, under the hero buttons. */
  callReason: string;
  /** Header line beside the call button (replaces the office hours). */
  headerTagline: string;
  /** Roofing only: "Leak right now?" strip under the hero. */
  urgentStrip?: { heading: string; body: string };
  /** Construction only: what a short planning call covers. */
  callTopics?: { heading: string; items: string[] };
  /** Show the "Visit the Franklin showroom" block. */
  showroom?: boolean;
  formHeading: string;
  formHelper: string;
  finalFormHeading: string;
  successHeading: string;
  successBody: string;
  /**
   * Full-bleed hero photography. Decorative: it carries no location or scope
   * claim (documented projects live in `proof`). The combined page adds a
   * second image that is split diagonally against the first.
   */
  hero: { backdrop: LandingImage; position?: string; secondary?: LandingImage; secondaryPosition?: string };
  /** Full-bleed backdrop behind the closing call to action. */
  finalBackdrop: { image: LandingImage; position?: string };
  /** Optional aerial photo band under the hero. Material names only, no places. */
  strip?: { heading: string; items: Array<{ image: LandingImage; label: string; position?: string }> };

  proofHeading: string;
  proofIntro: string;
  proof: ProofItem[];

  intentEyebrow: string;
  intentHeading: string;
  intents: IntentCard[];

  whyEyebrow: string;
  whyHeading: string;
  why: Array<{ title: string; text: string }>;
  steps: Array<{ title: string; text: string }>;

  reviews: {
    eyebrow: string;
    heading: string;
    ids: string[];
    /** Honest label shown with every review. */
    note?: string;
  };

  faqEyebrow: string;
  faqHeading: string;
  faqs: Array<{ question: string; answer: string }>;

  finalHeading: string;
  finalBody: string;
  serviceLocalLine: string;
}

export const SERVICE_LOCAL_LINE =
  "Serving Franklin, Highlands, Cashiers, Sylva and surrounding Western North Carolina communities.";

/** Intent-card photos: Highlander work, no place claims in the alt text. */
const img = (src: string, srcSet: string, alt: string, width: number, height: number): LandingImage => ({ src, srcSet, alt, width, height });
const cardImg = {
  chimney: img(cardChimney, cardChimneySet, "Stone chimney with new black metal counter-flashing on a shingle roof", 1600, 1200),
  ridge: img(cardRidge, cardRidgeSet, "New charcoal dimensional shingles on a hip roof with a dormer, mountains behind", 1600, 900),
  metal: img(cardMetal, cardMetalSet, "Green standing seam metal roof on a log mountain home", 1400, 1050),
  additionExt: img(cardAdditionExt, cardAdditionExtSet, "Cedar shake gable with tall windows on a living room addition", 1600, 1200),
  patioWide: img(cardPatioWide, cardPatioWideSet, "Open trellis converted into a covered patio with a metal roof", 1500, 1125),
  deckView: img(cardDeckView, cardDeckViewSet, "View from a screened porch onto a new wood deck", 1600, 1200),
  cullowhee: img(cardCullowhee, cardCullowheeSet, "Cedar shake addition with its shingle roof tied into the original roof", 1125, 1500),
};

/** Documented job 26-00564: Brava synthetic shake re-roof at Lake Glenville, NC. */
const roofGlenville: LandingImage = img(
  proofBrava,
  proofBravaSet,
  "Brava synthetic cedar shake roof and stone chimney installed by Highlander on a lakeside home at Lake Glenville, North Carolina",
  1280,
  960,
);

/** Documented job 26-00436: deck and railing rebuild in Sylva, NC. */
const deckSylva: LandingImage = img(
  proofDeck,
  proofDeckSet,
  "Rebuilt elevated deck with new boards and railing by Highlander in Sylva, North Carolina",
  1125,
  633,
);

const roofHighlands: LandingImage = {
  src: metalRoof,
  srcSet: metalRoofSet,
  alt: "Dark bronze standing seam metal roof installed by Highlander Building Services on a mountain home in Highlands, North Carolina",
  width: 1400,
  height: 1047,
};

const roofWaynesville: LandingImage = {
  src: shingleRoof,
  srcSet: shingleRoofSet,
  alt: "Weathered Wood dimensional shingle roof installed by Highlander Building Services on a mountain home in Waynesville, North Carolina",
  width: 1400,
  height: 788,
};

const heroSkyImage: LandingImage = {
  src: heroSky,
  srcSet: heroSkySet,
  alt: "",
  width: 1800,
  height: 1477,
};

/**
 * Backdrops are decorative (empty alt) and chosen so that no landing page shows
 * the same photo twice: none of these appear in that page's proof cards or strip.
 */
const dormerCabinBackdrop: LandingImage = { src: dormerCabin, srcSet: dormerCabinSet, alt: "", width: 1280, height: 720 };
const mountainBuildBackdrop: LandingImage = {
  src: "/media/d35d81a4-construction-project-highlands.webp",
  srcSet:
    "/media/d35d81a4-construction-project-highlands-640.webp 640w, /media/d35d81a4-construction-project-highlands-960.webp 960w, /media/d35d81a4-construction-project-highlands.webp 1600w",
  alt: "",
  width: 1600,
  height: 900,
};
const additionWindowsBackdrop: LandingImage = { src: additionWindows, srcSet: additionWindowsSet, alt: "", width: 1200, height: 1600 };

const stripImage = (src: string, srcSet: string, alt: string, width: number, height: number): LandingImage => ({ src, srcSet, alt, width, height });

const roofingStrip = {
  heading: "Shingle, metal and synthetic shake roofs on Western NC mountain homes.",
  items: [
    { image: stripImage(stripCharcoal, stripCharcoalSet, "Charcoal dimensional shingle roof with dormers overlooking the Western North Carolina mountains", 1600, 900), label: "Charcoal shingle", position: "50% 90%" },
    { image: stripImage(stripCopper, stripCopperSet, "Mountain cabin with charcoal shingles and a copper-tone metal porch roof", 1500, 1125), label: "Shingle + metal porch roof" },
    { image: stripImage(stripBrava, stripBravaSet, "Brava synthetic cedar shake roof on a lakeside home near Lake Glenville, North Carolina", 1600, 900), label: "Brava synthetic shake" },
    { image: stripImage(stripTan, stripTanSet, "Light tan dimensional shingle roof with dormers on a wooded mountain cottage", 1280, 720), label: "Tan shingle" },
  ],
};

/**
 * Construction photography slots.
 *
 * Both construction images are documented Highlander jobs: the Cashiers
 * screened porch (26-00424) and the Franklin living room addition (26-00035).
 */
/** Documented job 26-00424: covered patio and screened porch in Cashiers, NC (May 2026). */
const constructionPrimary: LandingImage = {
  src: patioPorch,
  srcSet: patioPorchSet,
  alt: "Screened porch with a stained wood ceiling, stone fireplace and a view of the new deck, built by Highlander in Cashiers, North Carolina",
  width: 1600,
  height: 1200,
};

/** Documented job 26-00035: living room addition in Franklin, NC (Feb–Aug 2026). */
const constructionSecondary: LandingImage = {
  src: additionRoom,
  srcSet: additionRoomSet,
  alt: "Living room addition by Highlander Building Services in Franklin, North Carolina, with a stained vaulted wood ceiling and a wall of mountain-view windows",
  width: 1500,
  height: 844,
};

const roofingFaqs = [
  {
    question: "Do I need a repair or a new roof?",
    answer:
      "That depends on the condition and extent of the damage. Highlander can assess the roof and explain the appropriate options before you decide.",
  },
  {
    question: "Can you help with both shingle and metal roofs?",
    answer:
      "Yes. Highlander offers roof repair and replacement, including shingle and metal roofing. The team can discuss which approach fits your property.",
  },
  {
    question: "How much will the work cost?",
    answer:
      "The price depends on the roof, materials, access and scope, and you get it in writing before any work. Call and we'll give you a straight answer on what drives the price for your roof.",
  },
  {
    question: "What if my roof is leaking now?",
    answer: `Call ${PHONE_DISPLAY} and tell us what is happening. Put a bucket under the drip and stay off the roof: never climb onto a wet or damaged roof.`,
  },
  {
    question: "What happens after I send the form?",
    answer:
      "A Highlander team member calls you back to talk about the property and book a free on-site look. Calling is the fastest way to get on the schedule.",
  },
];

const constructionFaqs = [
  {
    question: "Do I need finished plans before I contact you?",
    answer:
      "No. Start with the idea and what you want to change. Highlander can discuss design guidance and planning needs. Detailed planning services and their scope are agreed separately.",
  },
  {
    question: "What types of construction projects can I discuss?",
    answer:
      "Home additions, renovations, decks, porches and outdoor living improvements. The team will confirm project fit, location and the appropriate next step.",
  },
  {
    question: "Can an addition work with my existing home?",
    answer:
      "That is part of the planning conversation. The existing structure, layout, roofline and site conditions influence the approach; feasibility needs to be assessed for your property.",
  },
  {
    question: "How do I get a price?",
    answer:
      "Call and we'll walk you through what drives the cost of your project and set up a site visit. Scope, materials and site conditions decide the price, and you get it in writing.",
  },
  {
    question: "Will you discuss planning and permit requirements?",
    answer:
      "Yes. The team can explain the planning, specialist input and permit coordination relevant to the proposed scope. The responsibilities and included services should be confirmed in writing.",
  },
];

const combinedFaqs = [
  {
    question: "Do I need to choose roofing or construction first?",
    answer:
      "No. That is exactly what the call is for: tell us what is going on and we'll tell you whether it is roofing, construction or both.",
  },
  {
    question: "Can I ask about both in one request?",
    answer:
      "Yes. Tell the team you are considering both. The combined scope, project fit and coordination requirements can be discussed together.",
  },
  {
    question: "What services does Highlander offer?",
    answer:
      "Roof repair, roof replacement and metal roofing, alongside additions, renovations, decks, porches and outdoor living improvements.",
  },
  {
    question: "Can I get a price without a site assessment?",
    answer:
      "A reliable price depends on the property and the scope. Call and we'll tell you what we need to see and book the visit.",
  },
  {
    question: "What happens after I send my details?",
    answer:
      "A Highlander team member calls you back to talk about the property and set up the next step with the right team. Calling is the fastest way.",
  },
];

export const ROOFING_CONFIG: LandingConfig = {
  key: "roofing",
  path: "/lp/roofing",
  formId: "landing-roofing",
  defaultCategory: "roofing",
  defaultProjectType: "roofing",
  defaultIntent: "roofing",
  noticeVersion: "roofing-lp-2026-10-06",
  seoTitle: "Roof Repair & Replacement in Western NC | Highlander",
  seoDescription:
    "Roof repair, replacement and metal roofing in Western North Carolina. Call Highlander or send a short request to discuss your roof.",
  schemaName: "Roof Repair & Replacement",
  breadcrumbName: "Roofing Estimate",

  eyebrow: "Highlander Building Services | Western North Carolina",
  h1: "Roof leaking or wearing out? Talk to a Franklin roofer today.",
  support:
    "Call and describe what you're seeing. We'll tell you if it sounds like a repair or a replacement and book a free on-site look, with the price in writing before any work.",
  serviceLine: "Roof repair. Roof replacement. Metal roofing.",
  primaryCta: "Request My Estimate",
  mobileCta: "Estimate",
  heroCallLabel: `Call ${PHONE_DISPLAY} · Free estimate`,
  callReason:
    "A 5-minute call: tell us what you're seeing, we'll tell you the likely next step and book your free on-site look.",
  headerTagline: "Talk to a local roofer",
  urgentStrip: {
    heading: "Leak right now?",
    body: `Put a bucket under it, stay off the roof, and call ${PHONE_DISPLAY}. We'll tell you what to do now and get you on the schedule.`,
  },
  formHeading: "Get a clear next step for your roof.",
  formHelper: "Leave your details and we'll call you to talk through the roof and book the next step.",
  finalFormHeading: "Prefer a call back? Leave your details.",
  successHeading: "Your roofing request is in.",
  successBody:
    "Thank you. Highlander will call you to talk through your roof and the next step. Want to talk now? Call {phone}.",
  hero: { backdrop: heroSkyImage, position: "50% 22%" },
  finalBackdrop: { image: dormerCabinBackdrop, position: "50% 45%" },
  strip: roofingStrip,

  proofHeading: "See the work. Understand the standard.",
  proofIntro:
    "Before you choose a roofer, look at actual work. These are documented Highlander roofing projects, not stock photography.",
  proof: [
    {
      id: "metal-highlands",
      title: "Standing seam metal roof",
      detail: "A documented Highlander metal-roof project in Highlands, NC.",
      tag: "Highlands, NC",
      image: roofHighlands,
    },
    {
      id: "shingle-waynesville",
      title: "Dimensional shingle replacement",
      detail: "A documented Highlander shingle-roof project in Waynesville, NC.",
      tag: "Waynesville, NC",
      image: roofWaynesville,
    },
    {
      id: "brava-glenville",
      title: "Brava synthetic shake re-roof",
      detail: "A documented Highlander synthetic cedar shake roof on a lakeside home at Lake Glenville, NC.",
      tag: "Lake Glenville, NC",
      image: roofGlenville,
    },
  ],

  intentEyebrow: "What are you seeing?",
  intentHeading: "Start with the roof you have, not a diagnosis.",
  intents: [
    {
      id: "roof_repair",
      image: cardImg.chimney,
      imagePosition: "50% 40%",
      title: "Roof repair",
      label: "Roof repair",
      projectType: "roof_repair",
      callLabel: "Call about a repair",
      text: "Leaks, damaged areas or flashing concerns? Have the roof assessed before deciding how much work is needed.",
    },
    {
      id: "roof_replacement",
      image: cardImg.ridge,
      imagePosition: "50% 60%",
      title: "Roof replacement",
      label: "Roof replacement",
      projectType: "roof_replacement",
      callLabel: "Call about a new roof",
      text: "Planning for an aging roof? Compare the proposed system, materials and scope before making your decision.",
    },
    {
      id: "metal_roofing",
      image: cardImg.metal,
      title: "Metal roofing",
      label: "Metal roofing",
      projectType: "metal_roofing",
      callLabel: "Call about metal",
      text: "Considering metal for your home? Discuss the roof shape, appearance and installation details with Highlander.",
    },
  ],

  whyEyebrow: "Why the next step matters",
  whyHeading: "Make the decision with a written starting point.",
  why: [
    { title: "A decision you can understand.", text: "Talk through the roof condition, the proposed work and the available options." },
    {
      title: "A written starting point.",
      text: "Review the scope and price before authorizing the work. Ask about materials and applicable warranty terms.",
    },
    {
      title: "A local point of contact.",
      text: "Work with a Franklin-based business serving Western North Carolina, with a named contact for your project.",
    },
  ],
  steps: [
    {
      title: "Call us.",
      text: "A 5-minute conversation. You don't need to know the roof material or the cause of the problem.",
    },
    { title: "Review the roof.", text: "The team discusses the property and arranges the appropriate assessment." },
    {
      title: "Decide with a written scope.",
      text: "Review the recommended work, materials and price before deciding how to proceed.",
    },
  ],

  reviews: {
    eyebrow: "Roofing experiences",
    heading: "What happened when customers called Highlander.",
    ids: ["willard-armes-2024", "jh-dillsboro-2019", "david-christopher-2026", "zary-m-2024"],
  },

  faqEyebrow: "Roofing questions",
  faqHeading: "Useful answers before you reach out.",
  faqs: roofingFaqs,

  finalHeading: "A roof question should not become a guessing game.",
  finalBody:
    "Call and talk to the Franklin team about what is happening at your property. We'll tell you the next step toward a written roofing estimate.",
  serviceLocalLine: SERVICE_LOCAL_LINE,
};

export const CONSTRUCTION_CONFIG: LandingConfig = {
  key: "construction",
  path: "/lp/construction",
  formId: "landing-construction",
  defaultCategory: "construction",
  defaultProjectType: "construction",
  defaultIntent: "construction",
  noticeVersion: "construction-lp-2026-10-06",
  seoTitle: "Additions & Renovations in Western NC | Highlander",
  seoDescription:
    "Plan an addition, renovation, deck or porch with Highlander in Western North Carolina. Call the team or send a simple project request.",
  schemaName: "Additions, Renovations & Outdoor Living",
  breadcrumbName: "Construction Project Request",

  eyebrow: "Highlander Building Services | Construction Division",
  h1: "Additions, renovations & outdoor living in Western NC.",
  support:
    "More room. Better flow. More time outside. Call for a 10-minute talk with our construction team about your idea. No plans needed.",
  serviceLine: "Home additions. Renovations. Decks and porches.",
  primaryCta: "Send My Details",
  mobileCta: "Details",
  heroCallLabel: `Talk Through My Project · ${PHONE_DISPLAY}`,
  callReason:
    "A 10-minute call: tell us what you want the space to do, and we'll tell you the next step, an on-site visit or a design meeting.",
  headerTagline: "Talk to our construction team",
  callTopics: {
    heading: "What we'll cover on a 10-minute call.",
    items: [
      "What you want the space to do",
      "Rough size and budget range",
      "Site and permit questions",
      "The next step: an on-site visit or a design meeting",
    ],
  },
  showroom: true,
  formHeading: "Your project can start with a conversation.",
  formHelper: "No finished plans needed. Leave your details and we'll call you to talk through the idea.",
  finalFormHeading: "Prefer a call back? Leave your details.",
  successHeading: "Your project request is in.",
  successBody:
    "Thank you. Highlander will call you to talk through your project and the next step. Want to talk now? Call {phone}.",
  // The proof cards already show the Franklin room, so the hero uses the separate
  // gable-window photo and the closing band a different mountain-home image.
  hero: { backdrop: additionWindowsBackdrop, position: "50% 45%" },
  finalBackdrop: { image: mountainBuildBackdrop, position: "50% 50%" },

  proofHeading: "See the work. Understand the standard.",
  proofIntro: "Start from what a finished space can feel like.",
  proof: [
    {
      id: "outdoor-living",
      title: "Screened porch and covered patio, Cashiers",
      detail: "An open trellis rebuilt as a covered patio with a metal roof and stained wood ceiling, beside a screened porch with a stone fireplace.",
      tag: "Outdoor living",
      image: constructionPrimary,
    },
    {
      id: "framing",
      title: "Living room addition, Franklin",
      detail: "An engineered vaulted gable, a stone fireplace and a wall of mountain-view windows, built on a new block foundation.",
      tag: "Home addition",
      image: constructionSecondary,
    },
    {
      id: "deck-sylva",
      title: "Deck and railing rebuild, Sylva",
      detail: "Worn boards, a tired railing and framing that needed attention, rebuilt as a solid elevated deck.",
      tag: "Deck rebuild",
      image: deckSylva,
    },
  ],

  intentEyebrow: "What are you picturing?",
  intentHeading: "Start with the way you want to live in the space.",
  intents: [
    {
      id: "addition",
      image: cardImg.additionExt,
      imagePosition: "50% 45%",
      title: "Add space without changing your address.",
      label: "Home addition",
      projectType: "addition",
      callLabel: "Call about an addition",
      text: "Explore a home addition, expanded living area, guest space or sunroom that fits how you want to live.",
    },
    {
      id: "renovation",
      image: cardImg.patioWide,
      imagePosition: "50% 70%",
      title: "Make the space you have work better.",
      label: "Renovation",
      projectType: "renovation",
      callLabel: "Call about a renovation",
      text: "Discuss a renovation that improves the layout, finishes and everyday function of your home.",
    },
    {
      id: "outdoor_living",
      image: cardImg.deckView,
      title: "Bring more living outside.",
      label: "Deck, porch or outdoor living",
      projectType: "outdoor_living",
      callLabel: "Call about a deck or porch",
      text: "Plan a deck, porch or outdoor living area that feels connected to your home and the way you use it.",
    },
  ],

  whyEyebrow: "Why the next step matters",
  whyHeading: "Keep the home you love. Make it work better.",
  why: [
    { title: "Start with the way you live.", text: "Discuss what is missing today and what you want the finished space to do." },
    {
      title: "Understand the project before committing.",
      text: "Work toward a defined scope, material choices and proposed next steps rather than an unexplained headline price.",
    },
    {
      title: "Keep responsibility clear.",
      text: "A local Highlander point of contact helps you navigate the conversation from planning toward construction.",
    },
  ],
  steps: [
    { title: "Call and tell us the idea.", text: "A 10-minute conversation. You don't need finished drawings to get started." },
    {
      title: "Review the home and the scope.",
      text: "Discuss the existing space, site conditions and planning needs with Highlander.",
    },
    {
      title: "Agree the next step.",
      text: "Understand the proposed scope, planning requirements and estimate process before moving forward.",
    },
  ],

  // No construction reviews on file yet (ask Luke for 2–3); the three
  // documented project stories above carry the proof until then.
  reviews: {
    eyebrow: "Company reputation",
    heading: "What customers say about Highlander.",
    ids: [],
  },

  faqEyebrow: "Construction questions",
  faqHeading: "Useful answers before you reach out.",
  faqs: constructionFaqs,

  finalHeading: "Keep the home you love. Make it work better.",
  finalBody:
    "An idea is enough to start. Call and talk it through with the construction team, and we'll tell you the next step for your addition, renovation or outdoor space.",
  serviceLocalLine: SERVICE_LOCAL_LINE,
};

export const COMBINED_CONFIG: LandingConfig = {
  key: "combined",
  path: "/lp/roofing-construction",
  formId: "landing-combined",
  defaultCategory: "general",
  defaultProjectType: "general",
  defaultIntent: "general",
  noticeVersion: "combined-lp-2026-10-06",
  seoTitle: "Roofing & Construction in Western NC | Highlander",
  seoDescription:
    "Roofing, additions, renovations and outdoor living in Western North Carolina. Call Highlander or send one short request for your home project.",
  schemaName: "Roofing & Construction",
  breadcrumbName: "Home Project Request",

  eyebrow: "Highlander Building Services | Western North Carolina",
  h1: "Roof, addition or both? One call to Highlander sorts it out.",
  support:
    "Fix the roof. Add the space. Improve the way home feels. Call and tell us what is going on; one local team handles roofing, additions, renovations and outdoor living.",
  serviceLine: "Roofing. Construction. One call to get started.",
  primaryCta: "Send My Details",
  mobileCta: "Details",
  heroCallLabel: `Call ${PHONE_DISPLAY} · One call, one team`,
  callReason:
    "A 5-minute call: tell us what you're seeing or planning, and we'll tell you which team you need and book the next step.",
  headerTagline: "Talk to a local roofer or builder",
  formHeading: "One simple place to start.",
  formHelper: "Roofing, construction or a little of both? Leave your details and we'll call you to sort out the next step.",
  finalFormHeading: "Prefer a call back? Leave your details.",
  successHeading: "Your home-project request is in.",
  successBody:
    "Thank you. Highlander will call you to talk through your project and the next step. Want to talk now? Call {phone}.",
  hero: {
    backdrop: heroSkyImage,
    position: "40% 22%",
    secondary: { ...constructionPrimary, alt: "" },
    secondaryPosition: "60% 55%",
  },
  finalBackdrop: { image: additionWindowsBackdrop, position: "50% 60%" },
  strip: roofingStrip,

  proofHeading: "See the work. Understand the standard.",
  proofIntro: "Documented Highlander jobs: roofing, construction, and one that needed both.",
  proof: [
    {
      id: "roofing",
      title: "Standing seam metal, Highlands",
      detail: "A documented Highlander standing seam metal-roof project in Highlands, NC.",
      tag: "Roofing · Highlands, NC",
      image: roofHighlands,
    },
    {
      id: "roofing-glenville",
      title: "Brava synthetic shake, Lake Glenville",
      detail: "A documented Highlander Brava synthetic shake re-roof on a lakeside home at Lake Glenville, NC.",
      tag: "Roofing · Lake Glenville, NC",
      image: roofGlenville,
    },
    {
      id: "construction",
      title: "Living room addition, Franklin",
      detail: "A documented Highlander living room addition in Franklin, NC: engineered vaulted gable, stone fireplace and mountain-view windows.",
      tag: "Construction · Franklin, NC",
      image: constructionSecondary,
    },
    {
      id: "both-cullowhee",
      title: "Addition tied into the roof, Cullowhee",
      detail: "A documented Highlander cedar shake addition in Cullowhee, NC, with its shingle roof tied into the original roofline: both trades on one job.",
      tag: "Roofing + construction · Cullowhee, NC",
      image: cardImg.cullowhee,
    },
  ],

  intentEyebrow: "What does your home need?",
  intentHeading: "Roofing, construction or both. You do not have to sort it out first.",
  intents: [
    {
      id: "roofing",
      image: cardImg.ridge,
      imagePosition: "50% 60%",
      title: "Roofing: protect what is already there.",
      label: "Roofing",
      projectType: "roofing",
      emphasis: "roofing",
      callLabel: "Call about the roof",
      text: "Discuss roof repair, roof replacement or metal roofing. Start with the condition of the roof and the work it may need.",
    },
    {
      id: "construction",
      image: cardImg.additionExt,
      imagePosition: "50% 45%",
      title: "Construction: make more of your home.",
      label: "Construction",
      projectType: "construction",
      emphasis: "construction",
      callLabel: "Call about a project",
      text: "Explore an addition, renovation, deck or porch. Start with the way you want to use the space.",
    },
    {
      id: "not_sure",
      image: cardImg.chimney,
      imagePosition: "50% 40%",
      title: "Need both, or not sure?",
      label: "Need both, or not sure",
      projectType: "general",
      emphasis: "both",
      callLabel: "Call, not sure yet",
      text: "You do not have to sort the trades before you call. Tell us what is going on and we'll point you to the right next step.",
    },
  ],

  whyEyebrow: "Why the next step matters",
  whyHeading: "One home. A clear next step.",
  why: [
    {
      title: "One starting point.",
      text: "No need to complete separate roofing and construction applications to explain one home project.",
    },
    {
      title: "A clearer view of the work.",
      text: "Discuss how the roof, the existing home and the proposed improvement fit together.",
    },
    {
      title: "A written scope before work begins.",
      text: "Review the proposed work and price, with a Highlander point of contact for the project.",
    },
  ],
  steps: [
    {
      title: "Call us.",
      text: "A 5-minute conversation about the home. You don't need to know yet whether it is roofing or construction.",
    },
    {
      title: "Talk with the right team.",
      text: "Highlander reviews the request and discusses the roofing, construction or combined scope.",
    },
    {
      title: "Understand the next step.",
      text: "Arrange the relevant assessment and review the proposed work before deciding to proceed.",
    },
  ],

  reviews: {
    eyebrow: "Roofing experiences",
    heading: "What happened when customers called Highlander.",
    ids: ["willard-armes-2024", "jh-dillsboro-2019", "lorrie-contino-2024"],
  },

  faqEyebrow: "Common questions",
  faqHeading: "Useful answers before you reach out.",
  faqs: combinedFaqs,

  finalHeading: "One home. A clear next step.",
  finalBody:
    "Whether it is the roof, the living space or both, one call to Highlander gets it to the right team.",
  serviceLocalLine: SERVICE_LOCAL_LINE,
};
