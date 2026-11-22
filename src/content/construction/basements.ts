import type { ConstructionPageContent } from "./types";
import { awayFaq, constructionCrumb, financingFaq, permitFaq } from "./shared";

import heroImg from "@/assets/construction-examples/basement-example-1.webp?w=1280&quality=70&format=webp";
import heroAvif from "@/assets/construction-examples/basement-example-1.webp?w=640;960;1280&format=avif&quality=45&as=srcset";
import heroWebp from "@/assets/construction-examples/basement-example-1.webp?w=640;960;1280&format=webp&quality=70&as=srcset";
import example2 from "@/assets/construction-examples/basement-example-2.webp?w=800&format=webp";
import example2Set from "@/assets/construction-examples/basement-example-2.webp?w=480;800&format=webp&as=srcset";

/**
 * /construction/basements (plan §4 row 9, new). Replaces the old
 * /construction/renovations#basements links. No real basement photos yet:
 * labelled design examples. TODO(photos): real basement jobs.
 */
export const basementsContent: ConstructionPageContent = {
  path: "/construction/basements",
  title: "Basement Finishing in Franklin, NC | Highlander",
  description:
    "Basement finishing and bonus rooms in Franklin and Western NC: family rooms, guest space and walk-out basements, with moisture checked first.",
  serviceName: "basement",
  serviceKey: "basement",
  areaServed: [],
  breadcrumbs: [
    { name: "Home", url: "/" },
    constructionCrumb,
    { name: "Renovations", url: "/construction/renovations" },
    { name: "Basements", url: "/construction/basements" },
  ],
  hero: {
    h1: "Basement Finishing & Bonus Rooms",
    subhead: "Turn the lower level into a family room or guest space, with the moisture checked before anything is closed in.",
    image: {
      src: heroImg,
      avifSrcSet: heroAvif,
      webpSrcSet: heroWebp,
      width: 1600,
      height: 1067,
      alt: "Design example of a finished walk-out basement family room (illustration, not a Highlander project)",
      example: true,
    },
  },
  quickAnswer: {
    question: "Who finishes basements in Franklin, NC?",
    answer:
      "Highlander Building Services, a licensed NC general contractor in Franklin, finishes basements and bonus rooms across Western NC. We check for water first, since many mountain basements are dug into a slope, then frame, insulate and finish the space. The scope and price are in writing before work begins.",
  },
  examples: {
    heading: "Design example",
    body: "An illustration of a finished lower level. Photos of our own basement jobs are coming soon.",
    images: [{ src: example2, srcSet: example2Set, alt: "Design example of a basement guest room and wet bar (illustration, not a Highlander project)", example: true }],
  },
  included: {
    heading: "What's included",
    cards: [
      { icon: "droplets", title: "Moisture check", line: "Where water gets in, fixed before anything is closed in." },
      { icon: "hammer", title: "Framing and insulation", line: "Walls, ceilings and insulation for a dry, warm room." },
      { icon: "layers", title: "Electrical and plumbing", line: "Lighting, outlets and a bathroom or wet bar if you want one." },
      { icon: "shield", title: "Egress and permits", line: "Bedroom windows and county permits handled in the scope." },
      { icon: "file", title: "Written scope", line: "The work, selections and price in writing first." },
    ],
  },
  angle: {
    eyebrow: "For seasonal owners",
    heading: "A winter project",
    paragraphs: [
      "Basement work is indoors, so it runs all winter. Many owners plan it for the months they're away and come back to a finished room.",
    ],
    links: [{ label: "All home renovations", href: "/construction/renovations" }],
  },
  cost: {
    heading: "What basement finishing costs",
    ranges: [],
    factors: ["Size of the space", "Water or moisture work needed first", "Bathroom or wet bar", "Finish selections"],
  },
  faqs: [
    {
      question: "How much does it cost to finish a basement in Western NC?",
      answer: "It depends on the size, any moisture work and whether you add a bathroom. After the walk-through you get a written scope with the price before you commit.",
    },
    {
      question: "My basement gets damp. Can it still be finished?",
      answer: "Often, once the water source is dealt with. We look at grading, gutters and the walls first, and put any fix in the written scope before we close anything in.",
    },
    permitFaq("basement finishes"),
    awayFaq("basement"),
    financingFaq,
  ],
  related: [
    { label: "Home renovations", href: "/construction/renovations", description: "Interior and whole-home updates" },
    { label: "Bathroom remodeling", href: "/construction/bathroom-remodeling", description: "Showers, tile and vanities" },
    { label: "All construction services", href: "/construction", description: "Additions, porches, decks and remodels" },
  ],
};
