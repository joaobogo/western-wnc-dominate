import type { ConstructionPageContent } from "./types";
import { constructionCrumb } from "./shared";

import heroImg from "@/assets/work/addition-franklin-window-wall.webp?w=1280&quality=70&format=webp";
import heroAvif from "@/assets/work/addition-franklin-window-wall.webp?w=640;960;1280&format=avif&quality=45&as=srcset";
import heroWebp from "@/assets/work/addition-franklin-window-wall.webp?w=640;960;1280&format=webp&quality=70&as=srcset";

/**
 * TODO(Luke-approved): set to true only if Highlander wants to say it takes a
 * limited number of design projects each season (plan note 11). Off until then.
 */
export const DESIGN_CAPACITY_LIMITED = false;

/**
 * /construction/design (plan §4 row 11, rewrite): "Plan Before You Build".
 * The paid-design and agreement wording appears once, in the FAQ "How does
 * paid design work?". No fee ranges or dollar amounts (Highlander policy).
 * Approved vocabulary only: never "architect" or "free design".
 */
export const designContent: ConstructionPageContent = {
  path: "/construction/design",
  title: "Home Addition & Remodel Design in WNC | Highlander",
  description:
    "See your addition or remodel before it's built: layouts, 3D views and permit-ready drawings from Highlander's in-house design team in Franklin, NC.",
  serviceName: "plans",
  serviceKey: "design",
  areaServed: [],
  breadcrumbs: [{ name: "Home", url: "/" }, constructionCrumb, { name: "Design & Planning", url: "/construction/design" }],
  hero: {
    h1: "Plan Before You Build",
    subhead: "See your addition or remodel before it's built: layouts, 3D views and permit-ready drawings from our in-house design team.",
    image: {
      src: heroImg,
      avifSrcSet: heroAvif,
      webpSrcSet: heroWebp,
      width: 1600,
      height: 1200,
      alt: "Window wall under a wood vault on a living room addition built by Highlander in Franklin, NC",
    },
  },
  quickAnswer: {
    question: "Who designs home additions and remodels in Western NC?",
    answer:
      "Highlander's in-house design team in Franklin plans additions, remodels and outdoor living projects across Western NC. You see measured layouts and 3D views before anything is built, then get permit-ready drawings and, for bigger jobs, full construction documents. Start with a phone call about what you want to build.",
  },
  included: {
    eyebrow: "Three phases",
    heading: "From idea to permit to build",
    cards: [
      { icon: "ruler", title: "Schematic Design", line: "Measured layouts, concept plans, 3D views and budget guidance." },
      { icon: "file", title: "Permit Set", line: "Dimensioned, permit-ready drawings with engineering coordination." },
      { icon: "layers", title: "Construction Documents", line: "The full set, specifications and trade scopes for larger jobs." },
    ],
  },
  angle: {
    eyebrow: "Why plan first",
    heading: "Decide on paper, not on site",
    paragraphs: [
      "Changes cost the least while the project is still a drawing. Seeing the layout and the 3D views first lets you move a wall or a window before anyone frames it.",
      ...(DESIGN_CAPACITY_LIMITED ? ["We take a limited number of design projects each season."] : []),
    ],
    links: [
      { label: "Home additions", href: "/construction/additions" },
      { label: "Home renovations", href: "/construction/renovations" },
    ],
  },
  faqs: [
    {
      question: "How does paid design work?",
      answer:
        "Design is a separate paid service, done in phases. Before each phase starts, the scope, price, schedule, deliverables and your rights to use the drawings are set out in a signed Design & Consultation Agreement, and nothing is promised beyond what that agreement says.",
    },
    {
      question: "Do I need design for every project?",
      answer: "No. Smaller, well-defined jobs like many porches and decks can start from a site visit. Additions, major remodels and new rooms usually need drawings first.",
    },
    {
      question: "What if I already have plans?",
      answer: "Send them over. If they are complete and permit-ready, we can move toward a written scope; if not, we'll say which design phase fills the gap.",
    },
    {
      question: "What is a permit set?",
      answer: "A coordinated set of drawings prepared for the county's review. The county decides whether it needs more information or engineering before it issues the permit.",
    },
    {
      question: "How long does design take?",
      answer: "It depends on the size of the project, revisions, engineering and county review. We confirm the schedule before each phase begins.",
    },
  ],
  related: [
    { label: "All construction services", href: "/construction", description: "Additions, porches, decks and remodels" },
    { label: "Home additions", href: "/construction/additions", description: "More room, tied into the roof" },
    { label: "Home renovations", href: "/construction/renovations", description: "Interior and whole-home updates" },
  ],
};
