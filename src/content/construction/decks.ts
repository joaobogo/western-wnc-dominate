import type { ConstructionPageContent } from "./types";
import { constructionCrumb, financingFaq, permitFaq } from "./shared";

import heroImg from "@/assets/gallery/deck-sylva-doors-wide.webp?w=1125&quality=70&format=webp";
import heroAvif from "@/assets/gallery/deck-sylva-doors-wide.webp?w=640;960;1125&format=avif&quality=45&as=srcset";
import heroWebp from "@/assets/gallery/deck-sylva-doors-wide.webp?w=640;960;1125&format=webp&quality=70&as=srcset";

/** /construction/decks (plan §4 row 4, new). Photos: the documented Sylva deck rebuild. */
export const decksContent: ConstructionPageContent = {
  path: "/construction/decks",
  title: "Deck Builder in Franklin, NC | Highlander",
  description:
    "Deck builders for mountain lots in Franklin, Sylva and Western NC: new decks and full rebuilds, with ledger flashing done by roofers. Written scope first.",
  serviceName: "deck",
  serviceKey: "deck",
  areaServed: ["Sylva"],
  breadcrumbs: [
    { name: "Home", url: "/" },
    constructionCrumb,
    { name: "Outdoor Living", url: "/construction/outdoor-living" },
    { name: "Decks", url: "/construction/decks" },
  ],
  hero: {
    h1: "Deck Builders for Mountain Lots in Western NC",
    subhead: "New decks and full rebuilds on sloped lots, with the ledger flashed by roofers so the house stays dry.",
    image: {
      src: heroImg,
      avifSrcSet: heroAvif,
      webpSrcSet: heroWebp,
      width: 1125,
      height: 633,
      alt: "Rebuilt elevated deck with new boards and railing built by Highlander in Sylva, NC",
    },
  },
  quickAnswer: {
    question: "Who builds and rebuilds decks in Franklin and Sylva, NC?",
    answer:
      "Highlander Building Services, a licensed NC general contractor and roofing company in Franklin, builds and rebuilds decks across Western NC. On a recent Sylva deck we replaced the rotten joists before laying new boards and rebuilt the railing from new posts up. The scope and price are in writing first.",
  },
  gallery: {
    heading: "Decks we have built and rebuilt",
    body: "The Sylva rebuild from framing to railing, and a new deck off a Cashiers porch. Tap a photo to see it full size.",
    ids: ["deck-doors", "deck-run", "deck-joists", "patio-deck-view"],
  },
  included: {
    heading: "What's included",
    cards: [
      { icon: "ruler", title: "Framing check", line: "We look under the boards before we price the job." },
      { icon: "droplets", title: "Ledger flashing", line: "Where the deck meets the house, flashed by roofers." },
      { icon: "hammer", title: "Joists, posts and footings", line: "Replaced or built new, not hidden under fresh boards." },
      { icon: "home", title: "Boards and railings", line: "Decking and railings chosen with you." },
      { icon: "file", title: "Written scope", line: "The work, materials and price in writing first." },
    ],
  },
  angle: {
    eyebrow: "Built for mountain weather",
    heading: "Rain, freeze-thaw and slopes",
    paragraphs: [
      "Mountain decks sit high off steep ground and take heavy rain and freeze-thaw every winter. The weak point is usually the ledger, where the deck bolts to the house. We flash it like a roof detail, because that is our everyday work.",
    ],
    links: [
      { label: "Deck ledger flashing explained", href: "/blog/deck-ledger-flashing" },
      { label: "Under-deck drainage", href: "/blog/under-deck-drainage" },
    ],
  },
  featuredProjects: { heading: "A Sylva deck rebuild, start to finish", slugs: ["deck-railing-rebuild-sylva"] },
  cost: {
    heading: "What a deck costs",
    ranges: [],
    factors: ["Size and height off the ground", "Condition of the framing and footings", "Decking and railing materials", "Access to the site"],
  },
  faqs: [
    {
      question: "How much does a new deck cost in Western NC?",
      answer:
        "It depends on the size, height, framing and materials, so we don't quote one per-foot number. After the site visit you get a written scope with the price before you commit.",
    },
    {
      question: "Should I rebuild my deck or just replace the boards?",
      answer:
        "It depends on the framing. On the Sylva rebuild the joists were rotten, so new boards alone would have hidden the problem. We check under the boards before we write the scope.",
    },
    permitFaq("new decks"),
    {
      question: "Why does ledger flashing matter?",
      answer: "The ledger is where the deck bolts to the house. If water gets behind it, the rim of the house rots. We flash it the way we flash a roof.",
    },
    financingFaq,
  ],
  related: [
    { label: "Porches, decks & patios", href: "/construction/outdoor-living", description: "All outdoor living work" },
    { label: "Screened porches", href: "/construction/screened-porches", description: "Porches and porch enclosures" },
    { label: "Home additions", href: "/construction/additions", description: "More room, tied into the roof" },
  ],
};
