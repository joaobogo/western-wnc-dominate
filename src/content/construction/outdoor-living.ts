import type { ConstructionPageContent } from "./types";
import { constructionCrumb, financingFaq, permitFaq } from "./shared";

import heroImg from "@/assets/work/patio-cashiers-deck-view.webp?w=1280&quality=70&format=webp";
import heroAvif from "@/assets/work/patio-cashiers-deck-view.webp?w=640;960;1280&format=avif&quality=45&as=srcset";
import heroWebp from "@/assets/work/patio-cashiers-deck-view.webp?w=640;960;1280&format=webp&quality=70&as=srcset";

import porchImg from "@/assets/work/patio-cashiers-screened-porch.webp";
import porchSet from "@/assets/work/patio-cashiers-screened-porch.webp?w=480;800&format=webp&as=srcset";
import deckImg from "@/assets/gallery/deck-sylva-doors-wide.webp";
import deckSet from "@/assets/gallery/deck-sylva-doors-wide.webp?w=480;800&format=webp&as=srcset";
import patioImg from "@/assets/work/patio-cashiers-cover.webp";
import patioSet from "@/assets/work/patio-cashiers-cover.webp?w=480;800&format=webp&as=srcset";

/** /construction/outdoor-living, rebuilt as a short mini-hub (plan §4 row 5 and page notes 3 & 4). */
export const outdoorLivingContent: ConstructionPageContent = {
  path: "/construction/outdoor-living",
  title: "Outdoor Living Contractor in Western NC | Highlander",
  description:
    "Screened porches, decks and covered patios for mountain homes in Franklin, Cashiers, Sylva and Western NC, roofed and flashed by our own roofers.",
  serviceName: "porch, deck or patio",
  serviceKey: "outdoor-living",
  areaServed: ["Cashiers", "Sylva"],
  breadcrumbs: [{ name: "Home", url: "/" }, constructionCrumb, { name: "Outdoor Living", url: "/construction/outdoor-living" }],
  hero: {
    h1: "Porches, Decks & Covered Patios",
    subhead: "Outdoor rooms for mountain homes, built for rain, freeze-thaw and slopes, with the roof work done by roofers.",
    image: {
      src: heroImg,
      avifSrcSet: heroAvif,
      webpSrcSet: heroWebp,
      width: 1600,
      height: 1200,
      alt: "View from a screened porch onto a new deck built by Highlander in Cashiers, NC",
    },
  },
  quickAnswer: {
    question: "Who builds porches, decks and covered patios in Western NC?",
    answer:
      "Highlander Building Services, a licensed NC general contractor and roofing company in Franklin, builds screened porches, decks and covered patios across Western NC, including a screened porch and covered patio in Cashiers and a deck rebuild in Sylva. Porch and patio roofs are flashed into the house by our own roofers.",
  },
  gallery: {
    heading: "Porches, patios and decks we have built",
    body: "Real jobs in Cashiers and Sylva. Tap a photo to see it full size.",
    ids: ["patio-porch", "patio-wide", "patio-cover", "patio-deck-view", "deck-doors", "deck-run"],
  },
  serviceCards: {
    heading: "Choose your project",
    cards: [
      { title: "Screened porches", line: "Porches and porch enclosures, roofed and flashed by roofers.", href: "/construction/screened-porches", image: { src: porchImg, srcSet: porchSet, alt: "Screened porch built by Highlander in Cashiers, NC" } },
      { title: "Deck builders", line: "New decks and full rebuilds for sloped mountain lots.", href: "/construction/decks", image: { src: deckImg, srcSet: deckSet, alt: "Rebuilt elevated deck by Highlander in Sylva, NC" } },
      { title: "Covered patios", line: "Patio roofs and covers tied into the house.", href: "/construction/outdoor-living/patios", image: { src: patioImg, srcSet: patioSet, alt: "Covered patio with metal roof built by Highlander in Cashiers, NC" } },
    ],
  },
  featuredProjects: { heading: "A Sylva deck rebuild, start to finish", slugs: ["deck-railing-rebuild-sylva"] },
  faqs: [
    {
      question: "Should I build a deck or a screened porch?",
      answer:
        "A deck is open and usually costs less; a screened porch adds a roof and screens so you can sit out in rain and bug season. We look at the site and how you want to use it before we recommend one.",
    },
    permitFaq("decks, porches and patio roofs"),
    {
      question: "Do you handle the roof over a porch or patio?",
      answer: "Yes. Highlander is a roofing company as well as a general contractor, so porch and patio roofs are flashed into the house by our own roofing side.",
    },
    financingFaq,
  ],
  related: [
    { label: "All construction services", href: "/construction", description: "Additions, porches, decks and remodels" },
    { label: "Outdoor kitchens", href: "/construction/outdoor-living/outdoor-kitchens", description: "Cooking and dining outside" },
    { label: "Hardscape", href: "/construction/outdoor-living/hardscape", description: "Walls, steps and paths" },
  ],
};
