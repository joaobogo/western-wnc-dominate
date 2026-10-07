import metalRoof from "@/assets/gallery/metal-005.webp";
import metalRoofSet from "@/assets/gallery/metal-005.webp?w=480;800;1200&format=webp&as=srcset";
import shingleRoof from "@/assets/gallery/asphalt-hero.webp";
import shingleRoofSet from "@/assets/gallery/asphalt-hero.webp?w=480;800;1200&format=webp&as=srcset";
import heroSky from "@/assets/gallery/asphalt-007.webp";
import heroSkySet from "@/assets/gallery/asphalt-007.webp?w=800;1280;1800&format=webp&as=srcset";
import stripShingleA from "@/assets/gallery/asphalt-003.webp";
import stripShingleASet from "@/assets/gallery/asphalt-003.webp?w=480;800;1200&format=webp&as=srcset";
import stripShingleB from "@/assets/gallery/asphalt-004.webp";
import stripShingleBSet from "@/assets/gallery/asphalt-004.webp?w=480;800;1200&format=webp&as=srcset";
import stripCedar from "@/assets/gallery/cedar-001.webp";
import stripCedarSet from "@/assets/gallery/cedar-001.webp?w=480;800;1200&format=webp&as=srcset";
import stripMetalGreen from "@/assets/gallery/metal-006.webp";
import stripMetalGreenSet from "@/assets/gallery/metal-006.webp?w=480;800;1200&format=webp&as=srcset";
import { PHONE_DISPLAY, REVIEW_RATING } from "@/data/business";

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
  /** Primary CTA wording (button text + submit label). */
  primaryCta: string;
  /** Mobile bar second button. */
  mobileCta: string;
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

const stripImage = (src: string, srcSet: string, alt: string, width: number, height: number): LandingImage => ({ src, srcSet, alt, width, height });

const roofingStrip = {
  heading: "From above: shingle, metal and cedar roofs on Western NC mountain homes.",
  items: [
    { image: stripImage(stripShingleA, stripShingleASet, "Aerial view of a gray dimensional shingle roof on a wooded mountain home", 1600, 1200), label: "Slate-gray shingle" },
    { image: stripImage(stripMetalGreen, stripMetalGreenSet, "Aerial view of a green standing seam metal roof on a log mountain home", 1400, 1050), label: "Standing seam metal", position: "0% 50%" },
    { image: stripImage(stripCedar, stripCedarSet, "Aerial view of a cedar shake roof on a shingle-style mountain home", 1500, 1000), label: "Cedar shake" },
    { image: stripImage(stripShingleB, stripShingleBSet, "Aerial view of a tan dimensional shingle roof with a stone chimney", 1200, 900), label: "Tan shingle" },
  ],
};

/**
 * Construction photography slots.
 *
 * LAUNCH BLOCKER (prompt 02, page 10): the only construction/outdoor-living
 * images currently in the repo are blog illustrations whose job, location and
 * ownership are not documented. They are used here as stand-ins with neutral
 * captions and alt text (no location or scope claims). Replace the two files
 * with documented Highlander project photographs before ad spend goes live.
 */
const constructionPrimary: LandingImage = {
  src: "/media/9860ca9e-outdoor-living-cashiers.webp",
  srcSet:
    "/media/9860ca9e-outdoor-living-cashiers-640.webp 640w, /media/9860ca9e-outdoor-living-cashiers-960.webp 960w, /media/9860ca9e-outdoor-living-cashiers.webp 1600w",
  alt: "Covered outdoor living space with a stone fireplace and mountain views, featured by Highlander Building Services",
  width: 1600,
  height: 900,
};

const constructionSecondary: LandingImage = {
  src: "/media/85aa1f15-construction-project-highlands.webp",
  srcSet:
    "/media/85aa1f15-construction-project-highlands-640.webp 640w, /media/85aa1f15-construction-project-highlands-960.webp 960w, /media/85aa1f15-construction-project-highlands.webp 1600w",
  alt: "Timber-framed mountain home under construction, featured by Highlander Building Services",
  width: 1600,
  height: 900,
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
      "The price depends on the roof, materials, access and scope. Request an assessment so the proposed work can be put in writing; this form does not generate an instant quote.",
  },
  {
    question: "What if my roof is leaking now?",
    answer: `Call ${PHONE_DISPLAY} during office hours and explain what is happening. Outside office hours, send a request for follow-up. Do not climb onto a wet or damaged roof.`,
  },
  {
    question: "What happens after I send the form?",
    answer:
      "A Highlander team member will contact you to discuss the property, confirm the service area and arrange the next step. Sending a request does not book an appointment or authorize work.",
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
    question: "Can you give me a price or start date from this form?",
    answer:
      "Not reliably. Scope, materials, site conditions and scheduling need to be reviewed first. This short request starts the conversation; it is not an instant quote or confirmed booking.",
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
      "No. You can choose a category when it is useful, or send the form without one. Highlander will help clarify the appropriate next step.",
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
      "A reliable proposal depends on the property and the scope. This form starts the conversation; it does not generate an instant quote or reserve a project date.",
  },
  {
    question: "What happens after I send my details?",
    answer:
      "A Highlander team member will contact you to discuss the property, confirm the service area and arrange the next step with the appropriate team.",
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
  h1: "Roof repair & replacement in Western NC.",
  support:
    "Not sure whether your roof needs a repair or a replacement? Start with a local team that can assess the problem, explain the options and put the proposed work in writing.",
  serviceLine: "Roof repair. Roof replacement. Metal roofing.",
  primaryCta: "Request My Roofing Estimate",
  mobileCta: "Get My Estimate",
  formHeading: "Get a clear next step for your roof.",
  formHelper: "Leave your details. Highlander will contact you to discuss the roof and arrange the next step.",
  finalFormHeading: "Request your roofing estimate.",
  successHeading: "Your roofing request is in.",
  successBody:
    "Thank you. Highlander will contact you to discuss your roof and the next step. Prefer to speak with the team? Call {phone} during office hours.",
  hero: { backdrop: heroSkyImage, position: "50% 22%" },
  finalBackdrop: { image: stripImage(stripShingleA, stripShingleASet, "", 1600, 1200), position: "50% 35%" },
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
  ],

  intentEyebrow: "What are you seeing?",
  intentHeading: "Start with the roof you have, not a diagnosis.",
  intents: [
    {
      id: "roof_repair",
      title: "Roof repair",
      label: "Roof repair",
      projectType: "roof_repair",
      text: "Leaks, damaged areas or flashing concerns? Have the roof assessed before deciding how much work is needed.",
    },
    {
      id: "roof_replacement",
      title: "Roof replacement",
      label: "Roof replacement",
      projectType: "roof_replacement",
      text: "Planning for an aging roof? Compare the proposed system, materials and scope before making your decision.",
    },
    {
      id: "metal_roofing",
      title: "Metal roofing",
      label: "Metal roofing",
      projectType: "metal_roofing",
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
      title: "Make contact.",
      text: "Call or send the three-field form. You do not need to know the roof material or the cause of the problem.",
    },
    { title: "Review the roof.", text: "The team discusses the property and arranges the appropriate assessment." },
    {
      title: "Decide with a written scope.",
      text: "Review the recommended work, materials and price before deciding how to proceed.",
    },
  ],

  reviews: {
    eyebrow: "Roofing experiences",
    heading: "What customers have said about Highlander roofing work.",
    ids: ["david-christopher-2026", "zary-m-2024", "nate-yoder-2023"],
  },

  faqEyebrow: "Roofing questions",
  faqHeading: "Useful answers before you reach out.",
  faqs: roofingFaqs,

  finalHeading: "A roof question should not become a guessing game.",
  finalBody:
    "Tell us how to reach you. We will talk through what is happening at your property and the next step toward a written roofing estimate.",
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
    "More room. Better flow. More time outside. Talk with Highlander about improving the home you already love, with design guidance, a defined scope and one local point of contact.",
  serviceLine: "Home additions. Renovations. Decks and porches.",
  primaryCta: "Discuss My Construction Project",
  mobileCta: "Discuss My Project",
  formHeading: "Your project can start with a conversation.",
  formHelper: "No finished plans needed to get in touch. Leave your details and Highlander will discuss the next step with you.",
  finalFormHeading: "Discuss your construction project.",
  successHeading: "Your project request is in.",
  successBody:
    "Thank you. Highlander will contact you to discuss your project and the next step. Prefer to speak with the team? Call {phone} during office hours.",
  hero: { backdrop: { ...constructionPrimary, alt: "" }, position: "50% 55%" },
  finalBackdrop: { image: { ...constructionSecondary, alt: "" }, position: "50% 45%" },

  proofHeading: "See the work. Understand the standard.",
  proofIntro: "Start from what a finished space can feel like.",
  proof: [
    {
      id: "outdoor-living",
      title: "Outdoor living space",
      detail: "Outdoor living imagery featured by Highlander's construction team.",
      tag: "Outdoor living",
      image: constructionPrimary,
    },
    {
      id: "framing",
      title: "Mountain home construction",
      detail: "Mountain-home construction imagery featured by Highlander's construction team.",
      tag: "Construction",
      image: constructionSecondary,
    },
  ],

  intentEyebrow: "What are you picturing?",
  intentHeading: "Start with the way you want to live in the space.",
  intents: [
    {
      id: "addition",
      title: "Add space without changing your address.",
      label: "Home addition",
      projectType: "addition",
      text: "Explore a home addition, expanded living area, guest space or sunroom that fits how you want to live.",
    },
    {
      id: "renovation",
      title: "Make the space you have work better.",
      label: "Renovation",
      projectType: "renovation",
      text: "Discuss a renovation that improves the layout, finishes and everyday function of your home.",
    },
    {
      id: "outdoor_living",
      title: "Bring more living outside.",
      label: "Deck, porch or outdoor living",
      projectType: "outdoor_living",
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
    { title: "Tell us the idea.", text: "Call or send your details. You do not need finished drawings to make an initial inquiry." },
    {
      title: "Review the home and the scope.",
      text: "Discuss the existing space, site conditions and planning needs with Highlander.",
    },
    {
      title: "Agree the next step.",
      text: "Understand the proposed scope, planning requirements and estimate process before moving forward.",
    },
  ],

  reviews: {
    eyebrow: "Company reputation",
    heading: "Reviews of Highlander's roofing work.",
    ids: ["david-christopher-2026", "zary-m-2024"],
    note: "These reviews describe Highlander's roofing work. They are shown as company-reputation context, not as feedback on additions or renovations.",
  },

  faqEyebrow: "Construction questions",
  faqHeading: "Useful answers before you reach out.",
  faqs: constructionFaqs,

  finalHeading: "Keep the home you love. Make it work better.",
  finalBody:
    "An idea is enough to start the conversation. Leave your details and Highlander will help you understand the next step for your addition, renovation or outdoor space.",
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
  h1: "Roofing & construction for your Western NC home.",
  support:
    "Fix the roof. Add the space. Improve the way home feels. Start with Highlander for roofing, additions, renovations and outdoor living, with one local point of contact for the next step.",
  serviceLine: "Roofing. Construction. One conversation to get started.",
  primaryCta: "Discuss My Home Project",
  mobileCta: "Discuss My Project",
  formHeading: "One simple place to start.",
  formHelper: "Roofing, construction or a little of both? Leave your details and Highlander will help you find the right next step.",
  finalFormHeading: "Discuss your home project.",
  successHeading: "Your home-project request is in.",
  successBody:
    "Thank you. Highlander will contact you to discuss your project and the next step. Prefer to speak with the team? Call {phone} during office hours.",
  hero: {
    backdrop: heroSkyImage,
    position: "40% 22%",
    secondary: { ...constructionPrimary, alt: "" },
    secondaryPosition: "60% 55%",
  },
  finalBackdrop: { image: { ...constructionSecondary, alt: "" }, position: "50% 45%" },
  strip: roofingStrip,

  proofHeading: "See the work. Understand the standard.",
  proofIntro: "Two separate Highlander services, shown as separate examples.",
  proof: [
    {
      id: "roofing",
      title: "Roofing",
      detail: "A documented Highlander standing seam metal-roof project in Highlands, NC.",
      tag: "Roofing · Highlands, NC",
      image: roofHighlands,
    },
    {
      id: "construction",
      title: "Construction",
      detail: "Outdoor living imagery featured by Highlander's construction team.",
      tag: "Construction",
      image: constructionPrimary,
    },
  ],

  intentEyebrow: "What does your home need?",
  intentHeading: "Roofing, construction or both. You do not have to sort it out first.",
  intents: [
    {
      id: "roofing",
      title: "Roofing: protect what is already there.",
      label: "Roofing",
      projectType: "roofing",
      emphasis: "roofing",
      text: "Discuss roof repair, roof replacement or metal roofing. Start with the condition of the roof and the work it may need.",
    },
    {
      id: "construction",
      title: "Construction: make more of your home.",
      label: "Construction",
      projectType: "construction",
      emphasis: "construction",
      text: "Explore an addition, renovation, deck or porch. Start with the way you want to use the space.",
    },
    {
      id: "not_sure",
      title: "Need both, or not sure?",
      label: "Need both, or not sure",
      projectType: "general",
      emphasis: "both",
      text: "You do not have to sort the trades before you contact us. Highlander can discuss the project and help identify the appropriate next step.",
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
      title: "Start with the home.",
      text: "Call or send your contact details. Choose a service only when you already know what you need.",
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
    heading: "What customers have said about Highlander roofing work.",
    ids: ["david-christopher-2026", "zary-m-2024"],
    note: `Reviews describe roofing work. The ${REVIEW_RATING} Google rating is company-wide.`,
  },

  faqEyebrow: "Common questions",
  faqHeading: "Useful answers before you reach out.",
  faqs: combinedFaqs,

  finalHeading: "One home. A clear next step.",
  finalBody:
    "Whether it is the roof, the living space or both, start with a conversation. Send your details and Highlander will help route your request to the right team.",
  serviceLocalLine: SERVICE_LOCAL_LINE,
};
