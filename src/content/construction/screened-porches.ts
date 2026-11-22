import type { ConstructionPageContent } from "./types";
import { constructionCrumb, financingFaq, permitFaq } from "./shared";

import heroImg from "@/assets/work/patio-cashiers-screened-porch.webp?w=1280&quality=70&format=webp";
import heroAvif from "@/assets/work/patio-cashiers-screened-porch.webp?w=640;960;1280&format=avif&quality=45&as=srcset";
import heroWebp from "@/assets/work/patio-cashiers-screened-porch.webp?w=640;960;1280&format=webp&quality=70&as=srcset";

/** /construction/screened-porches (plan §4 row 3, new). Photos: the Cashiers porch and patio job. */
export const screenedPorchesContent: ConstructionPageContent = {
  path: "/construction/screened-porches",
  title: "Screened Porch Builder in Franklin, NC | Highlander",
  description:
    "Screened porches and porch enclosures for mountain homes in Franklin, Cashiers and Western NC, roofed and flashed by our own roofers. Written scope first.",
  serviceName: "screened porch",
  serviceKey: "screened-porch",
  areaServed: ["Cashiers"],
  breadcrumbs: [
    { name: "Home", url: "/" },
    constructionCrumb,
    { name: "Outdoor Living", url: "/construction/outdoor-living" },
    { name: "Screened Porches", url: "/construction/screened-porches" },
  ],
  hero: {
    h1: "Screened Porches & Sunrooms in Western NC",
    subhead: "A porch you can use from spring to late fall, roofed and flashed by the same company that builds it.",
    image: {
      src: heroImg,
      avifSrcSet: heroAvif,
      webpSrcSet: heroWebp,
      width: 1600,
      height: 1200,
      alt: "Screened porch with stained wood ceiling and stone fireplace built by Highlander in Cashiers, NC",
    },
  },
  quickAnswer: {
    question: "Who builds screened porches in Franklin and Cashiers, NC?",
    answer:
      "Highlander Building Services, a licensed NC general contractor and roofing company in Franklin, builds screened porches and porch enclosures across Western NC, including a screened porch with a stone fireplace in Cashiers. Our own roofers handle the porch roof and its tie-in to the house, and the scope is in writing first.",
  },
  gallery: {
    heading: "A Cashiers porch and patio we built",
    body: "Screened porch, covered patio and the view to the deck. Tap a photo to see it full size.",
    ids: ["patio-porch", "patio-deck-view", "patio-wide", "patio-cover"],
  },
  included: {
    heading: "What's included",
    cards: [
      { icon: "ruler", title: "Site and framing check", line: "Footings, slope and how the porch attaches to the house." },
      { icon: "droplets", title: "Porch roof and tie-in", line: "Roofed and flashed into the house by our own roofers." },
      { icon: "home", title: "Screens and ceiling", line: "Screen system, ceiling and trim chosen with you." },
      { icon: "file", title: "Written scope", line: "The work, materials and price in writing before work starts." },
      { icon: "shield", title: "Permits", line: "Coordinated with the county for the work we're hired to do." },
    ],
  },
  angle: {
    eyebrow: "Built for mountain weather",
    heading: "Screened porch or sunroom?",
    paragraphs: [
      "A screened porch keeps the bugs out and the breeze in, and usually costs less to build. A sunroom adds glass and heat so you can use it longer each year. Rain, freeze-thaw and the slope of the lot shape both, so we look at the site before we recommend one.",
    ],
    links: [
      { label: "Screened porch vs sunroom", href: "/blog/screened-porch-vs-sunroom" },
      { label: "Deck or porch? Planning in Western NC", href: "/blog/deck-vs-porch-planning-wnc" },
    ],
  },
  cost: {
    heading: "What a screened porch costs",
    ranges: [],
    factors: ["Size and height off the ground", "New porch or enclosing an existing deck", "Roof style and tie-in to the house", "Screens, ceiling and finish choices"],
  },
  faqs: [
    {
      question: "How much does a screened porch cost in Western NC?",
      answer:
        "It depends on the size, whether we build new or enclose an existing deck, and the roof tie-in. After the site visit you get a written scope with the price before you commit.",
    },
    {
      question: "Can you screen in my existing deck?",
      answer: "Often, yes. We check the deck framing and footings first, because a roof and screens add load the deck may not have been built for.",
    },
    permitFaq("porches"),
    {
      question: "Do you handle the roof tie-in?",
      answer: "Yes. Highlander is a roofing company as well as a general contractor, so the porch roof is flashed into the house by our own roofing side, under the same scope.",
    },
    financingFaq,
  ],
  related: [
    { label: "Porches, decks & patios", href: "/construction/outdoor-living", description: "All outdoor living work" },
    { label: "Deck builders", href: "/construction/decks", description: "Decks for mountain lots" },
    { label: "Home additions", href: "/construction/additions", description: "More room, tied into the roof" },
  ],
};
