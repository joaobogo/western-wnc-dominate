import type { ConstructionPageContent } from "./types";
import { FRANKLIN, SYLVA } from "@/data/business";
import { awayFaq, financingFaq } from "./shared";

import franklinImg from "@/assets/work/addition-franklin-exterior-windows.webp?w=1280&quality=70&format=webp";
import franklinAvif from "@/assets/work/addition-franklin-exterior-windows.webp?w=640;960;1280&format=avif&quality=45&as=srcset";
import franklinWebp from "@/assets/work/addition-franklin-exterior-windows.webp?w=640;960;1280&format=webp&quality=70&as=srcset";
import porchImg from "@/assets/work/patio-cashiers-screened-porch.webp?w=1280&quality=70&format=webp";
import porchAvif from "@/assets/work/patio-cashiers-screened-porch.webp?w=640;960;1280&format=avif&quality=45&as=srcset";
import porchWebp from "@/assets/work/patio-cashiers-screened-porch.webp?w=640;960;1280&format=webp&quality=70&as=srcset";
import patioImg from "@/assets/work/patio-cashiers-wide.webp?w=1280&quality=70&format=webp";
import patioAvif from "@/assets/work/patio-cashiers-wide.webp?w=640;960;1280&format=avif&quality=45&as=srcset";
import patioWebp from "@/assets/work/patio-cashiers-wide.webp?w=640;960;1280&format=webp&quality=70&as=srcset";
import deckImg from "@/assets/gallery/deck-sylva-doors-wide.webp?w=1125&quality=70&format=webp";
import deckAvif from "@/assets/gallery/deck-sylva-doors-wide.webp?w=640;960;1125&format=avif&quality=45&as=srcset";
import deckWebp from "@/assets/gallery/deck-sylva-doors-wide.webp?w=640;960;1125&format=webp&quality=70&as=srcset";

/**
 * Town construction pages (plan §4 rows 12–15, note 12–15): local building
 * conditions, only the jobs actually done in that town, the nearest showroom
 * and the three most relevant service pages. Highlands and Cashiers copy is
 * for second-home owners (renovations while away, porches, additions), never
 * new custom homes. Elevations and county offices come from towns.ts and
 * counties.ts.
 */

export interface TownConstructionContent extends ConstructionPageContent {
  townSlug: string;
  /** Documented project for this town, if there is one. */
  projectSlug?: string;
}

const crumbs = (town: string, slug: string) => [
  { name: "Home", url: "/" },
  { name: "Service Areas", url: "/service-areas" },
  { name: `${town}, NC`, url: `/service-areas/${slug}` },
  { name: "Construction", url: `/service-areas/${slug}/construction` },
];

const roofTieInFaq = {
  question: "Do you handle the roof tie-in?",
  answer: "Yes. Highlander is a roofing company as well as a general contractor, so the roof over a new addition or porch is tied into the existing one by our own roofing side.",
};

export const franklinConstruction: TownConstructionContent = {
  townSlug: "franklin-nc",
  projectSlug: "living-room-addition-franklin",
  path: "/service-areas/franklin-nc/construction",
  title: "Contractor in Franklin, NC: Local Projects | Highlander",
  description:
    `Additions, porches, decks and remodels in Franklin, NC from the licensed general contractor at ${FRANKLIN.streetAddress}. See a Franklin addition, start to finish.`,
  serviceName: "Franklin project",
  serviceKey: "construction",
  areaServed: ["Franklin"],
  breadcrumbs: crumbs("Franklin", "franklin-nc"),
  hero: {
    h1: "Construction in Franklin, NC",
    subhead: "Additions, porches, decks and remodels from the contractor down the street, with the scope in writing first.",
    image: { src: franklinImg, avifSrcSet: franklinAvif, webpSrcSet: franklinWebp, width: 1600, height: 1200, alt: "Living room addition with cedar shake gable built by Highlander in Franklin, NC" },
  },
  quickAnswer: {
    question: "Who builds additions and remodels in Franklin, NC?",
    answer:
      `Highlander Building Services is a licensed NC general contractor and roofer based at ${FRANKLIN.streetAddress} in Franklin. We build additions, porches, decks and remodels across Macon County, including a living room addition with a vaulted gable here in Franklin. Our own roofers tie new roofs into old ones.`,
  },
  gallery: {
    heading: "A Franklin addition we built",
    body: "Living room addition with a vaulted gable and window wall. Tap a photo to see it full size.",
    ids: ["addition-windows-ext", "addition-window-wall", "addition-room"],
  },
  angle: {
    eyebrow: "Building in Franklin",
    heading: "Local building conditions",
    paragraphs: [
      "Franklin sits at about 2,119 feet in the Little Tennessee River valley, where wind channels through the valley and many homes sit on sloped lots. We check the slope, footings and drainage before design.",
      "Permits come from the Macon County Building Inspections department in Franklin. We coordinate the permits and inspections for the work we're hired to do.",
    ],
  },
  faqs: [
    {
      question: "Do I need a permit for an addition in Franklin?",
      answer: "Most additions, porches and decks need one. Macon County Building Inspections in Franklin issues them, and we confirm what your project needs during planning.",
    },
    roofTieInFaq,
    { question: "Can I visit your showroom?", answer: `Yes. The Franklin showroom is at ${FRANKLIN.streetAddress}, open ${FRANKLIN.hours[0].label}.` },
    financingFaq,
  ],
  related: [
    { label: "Home additions", href: "/construction/additions", description: "More room, tied into the roof" },
    { label: "Kitchen remodeling", href: "/construction/kitchen-remodeling", description: "Layouts, cabinets and counters" },
    { label: "Decks", href: "/construction/decks", description: "New decks and rebuilds" },
  ],
};

export const highlandsConstruction: TownConstructionContent = {
  townSlug: "highlands-nc",
  path: "/service-areas/highlands-nc/construction",
  title: "Remodeling Contractor in Highlands, NC | Highlander",
  description:
    "Renovations, porches and additions for Highlands, NC homes, including second homes renovated while you're away. Licensed NC general contractor.",
  serviceName: "Highlands project",
  serviceKey: "construction",
  areaServed: ["Highlands"],
  breadcrumbs: crumbs("Highlands", "highlands-nc"),
  hero: {
    h1: "Renovations, Porches & Additions in Highlands, NC",
    subhead: "Have the work done while you're away for the season, with photo updates and the scope in writing first.",
    image: { src: porchImg, avifSrcSet: porchAvif, webpSrcSet: porchWebp, width: 1600, height: 1200, alt: "Screened porch built by Highlander in nearby Cashiers, NC, on the same plateau" },
  },
  quickAnswer: {
    question: "Who remodels and adds porches to homes in Highlands, NC?",
    answer:
      "Highlander Building Services, a licensed NC general contractor and roofer in Franklin, renovates homes and builds porches and additions on the Highlands plateau. Many owners here are seasonal, so indoor work is often planned for the months they are away, with photo updates along the way.",
  },
  angle: {
    eyebrow: "Building on the plateau",
    heading: "Local building conditions",
    paragraphs: [
      "Highlands sits at about 4,118 feet and gets 80 inches of rain or more a year, with heavy ice in winter. Porch roofs, flashing and drainage have to be built for that.",
      "Work inside town limits is permitted by the Town of Highlands, and the rest by Macon County. Club and gated communities usually add a design review step.",
    ],
  },
  faqs: [
    {
      question: "Who issues permits in Highlands?",
      answer: "The Town of Highlands handles work inside town limits and Macon County handles the rest. Many communities also have their own design review, which we plan for in the schedule.",
    },
    awayFaq("project"),
    roofTieInFaq,
    financingFaq,
  ],
  related: [
    { label: "Home renovations", href: "/construction/renovations", description: "Renovate while you're away" },
    { label: "Screened porches", href: "/construction/screened-porches", description: "Porches and enclosures" },
    { label: "Home additions", href: "/construction/additions", description: "More room, tied into the roof" },
  ],
};

export const cashiersConstruction: TownConstructionContent = {
  townSlug: "cashiers-nc",
  path: "/service-areas/cashiers-nc/construction",
  title: "Contractor in Cashiers, NC | Highlander",
  description:
    "Porches, additions and renovations for Cashiers, NC homes, from a licensed NC general contractor and roofer. See the Cashiers porch and patio we built.",
  serviceName: "Cashiers project",
  serviceKey: "construction",
  areaServed: ["Cashiers"],
  breadcrumbs: crumbs("Cashiers", "cashiers-nc"),
  hero: {
    h1: "Porches, Additions & Renovations in Cashiers, NC",
    subhead: "Outdoor rooms and renovations for plateau homes, roofed and flashed by the same company that builds them.",
    image: { src: patioImg, avifSrcSet: patioAvif, webpSrcSet: patioWebp, width: 1500, height: 1125, alt: "Covered patio built by Highlander in Cashiers, NC" },
  },
  quickAnswer: {
    question: "Who builds porches and additions in Cashiers, NC?",
    answer:
      "Highlander Building Services, a licensed NC general contractor and roofer in Franklin, builds porches, additions and renovations in Cashiers. Here we built a screened porch with a stone fireplace and converted an open trellis into a covered patio with a metal roof. Many owners are seasonal, so we can work while you're away.",
  },
  gallery: {
    heading: "A Cashiers porch and patio we built",
    body: "Screened porch, covered patio and the view to the deck. Tap a photo to see it full size.",
    ids: ["patio-porch", "patio-wide", "patio-cover", "patio-deck-view"],
  },
  angle: {
    eyebrow: "Building on the plateau",
    heading: "Local building conditions",
    paragraphs: [
      "Cashiers sits at about 3,484 feet in a temperate rainforest, with 80 inches of rain or more a year and fog that keeps wood damp. Porch roofs, ledgers and drainage are where that water has to be managed.",
      "Permits come from Jackson County Permitting and Code Enforcement in Sylva, and many Cashiers communities add their own design review.",
    ],
  },
  faqs: [
    {
      question: "Who issues permits in Cashiers?",
      answer: "Jackson County Permitting and Code Enforcement in Sylva. Many Cashiers communities also have design review, which we plan for in the schedule.",
    },
    awayFaq("project"),
    roofTieInFaq,
    financingFaq,
  ],
  related: [
    { label: "Screened porches", href: "/construction/screened-porches", description: "Porches and enclosures" },
    { label: "Home additions", href: "/construction/additions", description: "More room, tied into the roof" },
    { label: "Home renovations", href: "/construction/renovations", description: "Renovate while you're away" },
  ],
};

export const sylvaConstruction: TownConstructionContent = {
  townSlug: "sylva-nc",
  projectSlug: "deck-railing-rebuild-sylva",
  path: "/service-areas/sylva-nc/construction",
  title: "Contractor in Sylva, NC | Highlander",
  description:
    "Construction and remodeling in Sylva, NC: decks, porches, additions and remodels from the licensed contractor with a showroom in Sylva.",
  serviceName: "Sylva project",
  serviceKey: "construction",
  areaServed: ["Sylva"],
  breadcrumbs: crumbs("Sylva", "sylva-nc"),
  hero: {
    h1: "Construction & Remodeling in Sylva, NC",
    subhead: "Decks, porches, additions and remodels, with a showroom in Sylva and the scope in writing first.",
    image: { src: deckImg, avifSrcSet: deckAvif, webpSrcSet: deckWebp, width: 1125, height: 633, alt: "Rebuilt elevated deck built by Highlander in Sylva, NC" },
  },
  quickAnswer: {
    question: "Who builds decks and remodels homes in Sylva, NC?",
    answer:
      `Highlander Building Services, a licensed NC general contractor and roofer with a showroom at ${SYLVA.streetAddress} in Sylva, builds decks, porches, additions and remodels across Jackson County. In Sylva we rebuilt an elevated deck from new joists up, with about 270 new balusters.`,
  },
  gallery: {
    heading: "A Sylva deck we rebuilt",
    body: "New joists, new boards and a railing rebuilt from the posts up. Tap a photo to see it full size.",
    ids: ["deck-doors", "deck-run", "deck-joists"],
  },
  angle: {
    eyebrow: "Building in Sylva",
    heading: "Local building conditions",
    paragraphs: [
      "Sylva sits at about 2,037 feet, and many homes are on steep hillside lots where decks stand high off the ground. Footings, joists and the ledger at the house take the most wear.",
      "Permits come from Jackson County Permitting and Code Enforcement in Sylva, where steep-slope and stormwater rules often apply.",
    ],
  },
  faqs: [
    {
      question: "Who issues permits in Sylva?",
      answer: "Jackson County Permitting and Code Enforcement, in Sylva. We confirm what your project needs during planning and coordinate the permits and inspections for our work.",
    },
    roofTieInFaq,
    { question: "Can I visit your Sylva showroom?", answer: `Yes. The Sylva showroom is at ${SYLVA.streetAddress}, open ${SYLVA.hours[0].label}.` },
    financingFaq,
  ],
  related: [
    { label: "Decks", href: "/construction/decks", description: "New decks and rebuilds" },
    { label: "Screened porches", href: "/construction/screened-porches", description: "Porches and enclosures" },
    { label: "Home additions", href: "/construction/additions", description: "More room, tied into the roof" },
  ],
};

export const TOWN_CONSTRUCTION = [franklinConstruction, highlandsConstruction, cashiersConstruction, sylvaConstruction];
