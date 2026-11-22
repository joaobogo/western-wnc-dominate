import type { ConstructionPageContent } from "./types";
import { awayFaq, constructionCrumb, financingFaq, permitFaq } from "./shared";

import kitchenImg from "@/assets/construction-examples/kitchen-example-1.webp?w=480&format=webp";
import kitchenSet from "@/assets/construction-examples/kitchen-example-1.webp?w=480;800&format=webp&as=srcset";
import bathImg from "@/assets/construction-examples/bath-example-1.webp?w=480&format=webp";
import bathSet from "@/assets/construction-examples/bath-example-1.webp?w=480;800&format=webp&as=srcset";
import basementImg from "@/assets/construction-examples/basement-example-1.webp?w=480&format=webp";
import basementSet from "@/assets/construction-examples/basement-example-1.webp?w=480;800&format=webp&as=srcset";

const HERO = "/media/highlander-renovated-kitchen-living.webp";

/**
 * /construction/renovations (plan §4 row 8 and note 8 & 9): leads with the
 * winter angle for seasonal Highlands and Cashiers owners. No real interior
 * photos yet: labelled design examples. TODO(photos): real renovation jobs.
 */
export const renovationsContent: ConstructionPageContent = {
  path: "/construction/renovations",
  title: "Home Renovations in Franklin, NC | Highlander",
  description:
    "Whole-home and interior renovations in Franklin, Highlands, Cashiers and Western NC. Indoor work runs all winter, while you're away for the season.",
  serviceName: "renovation",
  serviceKey: "renovation",
  areaServed: [],
  breadcrumbs: [{ name: "Home", url: "/" }, constructionCrumb, { name: "Renovations", url: "/construction/renovations" }],
  hero: {
    h1: "Whole-Home & Interior Renovations in Western NC",
    subhead: "Indoor projects run all winter, so plan your renovation for while you're away for the season.",
    image: {
      src: "/media/highlander-renovated-kitchen-living-960.webp",
      webpSrcSet: `/media/highlander-renovated-kitchen-living-640.webp 640w, /media/highlander-renovated-kitchen-living-960.webp 960w, ${HERO} 1600w`,
      width: 1600,
      height: 900,
      alt: "Design example of a renovated kitchen and living room (illustration, not a Highlander project)",
      example: true,
    },
  },
  quickAnswer: {
    question: "Who does home renovations in Highlands, Cashiers and Franklin, NC?",
    answer:
      "Highlander Building Services, a licensed NC general contractor in Franklin, renovates kitchens, baths, basements and whole homes across Western NC, including structural repairs found along the way. Indoor work carries on through the winter, so many seasonal owners plan it for the months they are away.",
  },
  serviceCards: {
    heading: "Renovation services",
    cards: [
      { title: "Kitchen remodeling", line: "Layouts, cabinets, counters and lighting.", href: "/construction/kitchen-remodeling", image: { src: kitchenImg, srcSet: kitchenSet, alt: "Design example of a remodeled kitchen (illustration, not a Highlander project)", example: true } },
      { title: "Bathroom remodeling", line: "Showers, tile, vanities and safer access.", href: "/construction/bathroom-remodeling", image: { src: bathImg, srcSet: bathSet, alt: "Design example of a remodeled bathroom (illustration, not a Highlander project)", example: true } },
      { title: "Basement finishing", line: "Family rooms, guest space and bonus rooms.", href: "/construction/basements", image: { src: basementImg, srcSet: basementSet, alt: "Design example of a finished basement (illustration, not a Highlander project)", example: true } },
    ],
  },
  included: {
    heading: "What's included",
    cards: [
      { icon: "ruler", title: "Walk-through and plan", line: "What stays, what changes and what the structure allows." },
      { icon: "hammer", title: "Structural repairs", line: "Framing and load-bearing work found along the way." },
      { icon: "layers", title: "Systems", line: "Plumbing and electrical updated to suit the new rooms." },
      { icon: "file", title: "Written scope", line: "The work, selections and price in writing first." },
    ],
  },
  angle: {
    eyebrow: "For seasonal owners",
    heading: "Renovate while you're away",
    paragraphs: [
      "Indoor work is not stopped by snow or rain, so winter is a good time to renovate a second home. Tell us how to reach the house and how you want updates, and we can send photos as the work moves along.",
    ],
    links: [{ label: "Plan the layout first: design & planning", href: "/construction/design" }],
  },
  cost: {
    heading: "What a renovation costs",
    ranges: [],
    factors: ["How many rooms change", "What we find once walls and floors are opened", "Plumbing and electrical that moves", "Finish selections"],
  },
  faqs: [
    {
      question: "How much does a home renovation cost in Western NC?",
      answer: "It depends on the rooms, the systems and what we find once things are opened up. After the walk-through you get a written scope with the price before you commit.",
    },
    awayFaq("renovation"),
    permitFaq("renovations that move walls, plumbing or wiring"),
    {
      question: "Can you renovate in winter?",
      answer: "Yes. Indoor work carries on through the winter. Deliveries on steep or icy driveways are planned ahead.",
    },
    financingFaq,
  ],
  related: [
    { label: "All construction services", href: "/construction", description: "Additions, porches, decks and remodels" },
    { label: "Home additions", href: "/construction/additions", description: "More room, tied into the roof" },
    { label: "Design & planning", href: "/construction/design", description: "Plan before you build" },
  ],
};
