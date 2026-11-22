import type { ConstructionPageContent } from "./types";
import { awayFaq, constructionCrumb, financingFaq, permitFaq } from "./shared";

import heroImg from "@/assets/construction-examples/kitchen-example-1.webp?w=1280&quality=70&format=webp";
import heroAvif from "@/assets/construction-examples/kitchen-example-1.webp?w=640;960;1280&format=avif&quality=45&as=srcset";
import heroWebp from "@/assets/construction-examples/kitchen-example-1.webp?w=640;960;1280&format=webp&quality=70&as=srcset";
import example2 from "@/assets/construction-examples/kitchen-example-2.webp?w=800&format=webp";
import example2Set from "@/assets/construction-examples/kitchen-example-2.webp?w=480;800&format=webp&as=srcset";

/**
 * /construction/kitchen-remodeling (plan §4 row 6). No real Highlander kitchen
 * photos yet: the hero and gallery are labelled design examples (John, 21 Nov
 * 2026) until Robert supplies job photos. TODO(photos): real kitchen jobs.
 */
export const kitchenContent: ConstructionPageContent = {
  path: "/construction/kitchen-remodeling",
  title: "Kitchen Remodeling in Franklin, NC | Highlander",
  description:
    "Kitchen remodeling for mountain homes in Franklin, Highlands, Cashiers and Western NC: layout, cabinets, counters and lighting, with the price in writing.",
  serviceName: "kitchen",
  serviceKey: "kitchen",
  areaServed: [],
  breadcrumbs: [
    { name: "Home", url: "/" },
    constructionCrumb,
    { name: "Kitchen Remodeling", url: "/construction/kitchen-remodeling" },
  ],
  hero: {
    h1: "Kitchen Remodeling in Franklin & Western NC",
    subhead: "A kitchen planned around the house you already have, with the scope and price in writing before work begins.",
    image: {
      src: heroImg,
      avifSrcSet: heroAvif,
      webpSrcSet: heroWebp,
      width: 1600,
      height: 1067,
      alt: "Design example of a remodeled mountain-home kitchen (illustration, not a Highlander project)",
      example: true,
    },
  },
  quickAnswer: {
    question: "Who remodels kitchens in Franklin, NC?",
    answer:
      "Highlander Building Services is a licensed NC general contractor in Franklin. A kitchen remodel can cover a new layout, cabinets, counters, plumbing, electrical and finish work, and we check the structure before any wall comes out. The scope, selections and price are in writing before work begins.",
  },
  examples: {
    heading: "Design examples",
    body: "Illustrations of the kind of kitchen we plan with you. Photos of our own kitchen jobs are coming soon.",
    images: [
      { src: example2, srcSet: example2Set, alt: "Design example of a kitchen with painted cabinets and a butcher-block island (illustration, not a Highlander project)", example: true },
      {
        src: "/media/highlander-renovated-kitchen-living-640.webp",
        srcSet: "/media/highlander-renovated-kitchen-living-640.webp 640w, /media/highlander-renovated-kitchen-living-960.webp 960w",
        alt: "Design example of an open kitchen and living room (illustration, not a Highlander project)",
        example: true,
      },
    ],
  },
  included: {
    heading: "What's included",
    cards: [
      { icon: "ruler", title: "Layout changes", line: "Moving the sink, range or walls so the room works." },
      { icon: "home", title: "Cabinets and counters", line: "Planned together with the layout." },
      { icon: "layers", title: "Plumbing and electrical", line: "The systems behind the walls, updated." },
      { icon: "hammer", title: "Opening up the space", line: "Walls removed where the structure allows it." },
      { icon: "file", title: "Written scope", line: "Selections and price in writing before work starts." },
    ],
  },
  angle: {
    eyebrow: "Mountain kitchens",
    heading: "Opening the kitchen to the view",
    paragraphs: [
      "Many older mountain cabins have small, closed-in kitchens. Which walls can come out depends on what each one carries, so we check the structure first and put any beam the opening needs in the written scope.",
      "Steep driveways and narrow roads shape a remodel too: we plan how cabinets and counters reach the house before delivery day.",
    ],
    links: [{ label: "Plan the layout first: design & planning", href: "/construction/design" }],
  },
  cost: {
    heading: "What a kitchen remodel costs",
    ranges: [],
    factors: ["How much of the layout changes", "Whether plumbing or electrical moves", "Cabinet, counter and appliance selections", "Structural work if walls come out"],
  },
  faqs: [
    {
      question: "How much does a kitchen remodel cost in Western NC?",
      answer: "It depends on the layout, the systems that move and your selections. After we see the room you get a written scope with the price before you commit.",
    },
    permitFaq("kitchen remodels that move walls, plumbing or wiring"),
    awayFaq("kitchen"),
    {
      question: "Can you remove a wall to open my kitchen?",
      answer: "Often. It depends on what the wall carries. If it is load-bearing, the beam or support it needs is part of the written scope you approve.",
    },
    financingFaq,
  ],
  related: [
    { label: "All construction services", href: "/construction", description: "Additions, porches, decks and remodels" },
    { label: "Bathroom remodeling", href: "/construction/bathroom-remodeling", description: "Showers, tile and vanities" },
    { label: "Home renovations", href: "/construction/renovations", description: "Interior and whole-home updates" },
  ],
};
