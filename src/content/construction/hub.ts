import { FRANKLIN_STREET, LICENSE_NUMBER } from "@/data/business";
import type { ConstructionPageContent } from "./types";

import heroImg from "@/assets/work/patio-cashiers-wide.webp?w=1280&quality=70&format=webp";
import heroAvif from "@/assets/work/patio-cashiers-wide.webp?w=640;960;1280&format=avif&quality=45&as=srcset";
import heroWebp from "@/assets/work/patio-cashiers-wide.webp?w=640;960;1280&format=webp&quality=70&as=srcset";

import additionImg from "@/assets/work/addition-franklin-exterior-windows.webp";
import additionSet from "@/assets/work/addition-franklin-exterior-windows.webp?w=480;800&format=webp&as=srcset";
import porchImg from "@/assets/work/patio-cashiers-screened-porch.webp";
import patioImg from "@/assets/work/patio-cashiers-cover.webp";
import patioSet from "@/assets/work/patio-cashiers-cover.webp?w=480;800&format=webp&as=srcset";
import deckImg from "@/assets/gallery/deck-sylva-doors-wide.webp";
import deckSet from "@/assets/gallery/deck-sylva-doors-wide.webp?w=480;800&format=webp&as=srcset";
import porchSet from "@/assets/work/patio-cashiers-screened-porch.webp?w=480;800&format=webp&as=srcset";
import designImg from "@/assets/work/addition-franklin-window-wall.webp";
import designSet from "@/assets/work/addition-franklin-window-wall.webp?w=480;800&format=webp&as=srcset";
import kitchenImg from "@/assets/construction-examples/kitchen-example-1.webp?w=480&format=webp";
import kitchenSet from "@/assets/construction-examples/kitchen-example-1.webp?w=480;800&format=webp&as=srcset";
import bathImg from "@/assets/construction-examples/bath-example-1.webp?w=480&format=webp";
import bathSet from "@/assets/construction-examples/bath-example-1.webp?w=480;800&format=webp&as=srcset";
import basementImg from "@/assets/construction-examples/basement-example-1.webp?w=480&format=webp";
import basementSet from "@/assets/construction-examples/basement-example-1.webp?w=480;800&format=webp&as=srcset";
import roofTieImg from "@/assets/work/addition-cullowhee-roofline.webp";
import roofTieSet from "@/assets/work/addition-cullowhee-roofline.webp?w=480;800&format=webp&as=srcset";

/**
 * /construction hub (plan §4 row 1 and the hub note): about a third of the
 * old page. Service cards list only pages that exist today; screened
 * porches, decks, basements and roof + addition were added in Phases 3–4.
 */
export const hubContent: ConstructionPageContent = {
  path: "/construction",
  title: "General Contractor in Franklin, NC | Highlander",
  description:
    "Licensed general contractor in Franklin, NC for home additions, porches, decks, kitchens, baths and renovations across Western NC. Written scope first.",
  serviceName: "project",
  serviceKey: "construction",
  areaServed: ["Franklin", "Cashiers", "Sylva", "Cullowhee"],
  breadcrumbs: [
    { name: "Home", url: "/" },
    { name: "Construction", url: "/construction" },
  ],
  hero: {
    h1: "General Contractor in Franklin, NC — Additions, Porches & Remodels",
    subhead: "We build additions, porches, decks and remodels for mountain homes, and put the scope in writing before you commit.",
    image: {
      src: heroImg,
      avifSrcSet: heroAvif,
      webpSrcSet: heroWebp,
      width: 1500,
      height: 1125,
      alt: "Covered patio built by Highlander in Cashiers, NC",
    },
  },
  quickAnswer: {
    question: "Who builds home additions and porches in Franklin, NC?",
    answer: `Highlander Building Services is a licensed North Carolina general contractor (${LICENSE_NUMBER}) at ${FRANKLIN_STREET} in Franklin. We build additions, screened porches, decks, kitchens, baths and renovations across Western NC. We are roofers too, so we tie the new roof into the old one ourselves, and every job starts with a written scope.`,
  },
  gallery: {
    heading: "Additions, porches and decks we have built",
    body: "Real Highlander jobs in Franklin, Cashiers, Sylva and Cullowhee. Tap a photo to see it full size.",
    limit: 8,
  },
  serviceCards: {
    heading: "What we build",
    cards: [
      {
        title: "Home additions",
        line: "More living space, built to match the house and tied into the roof.",
        href: "/construction/additions",
        image: { src: additionImg, srcSet: additionSet, alt: "Living room addition built by Highlander in Franklin, NC" },
      },
      {
        title: "Screened porches",
        line: "Porches and porch enclosures, roofed and flashed by roofers.",
        href: "/construction/screened-porches",
        image: { src: porchImg, srcSet: porchSet, alt: "Screened porch built by Highlander in Cashiers, NC" },
      },
      {
        title: "Deck builders",
        line: "New decks and full rebuilds for sloped mountain lots.",
        href: "/construction/decks",
        image: { src: deckImg, srcSet: deckSet, alt: "Rebuilt elevated deck by Highlander in Sylva, NC" },
      },
      {
        title: "Outdoor living & patios",
        line: "Covered patios and every porch and deck option in one place.",
        href: "/construction/outdoor-living",
        image: { src: patioImg, srcSet: patioSet, alt: "Covered patio with metal roof built by Highlander in Cashiers, NC" },
      },
      {
        title: "Kitchen remodeling",
        line: "New layouts, cabinets, counters and lighting.",
        href: "/construction/kitchen-remodeling",
        image: { src: kitchenImg, srcSet: kitchenSet, alt: "Design example of a remodeled mountain-home kitchen (illustration, not a Highlander project)", example: true },
      },
      {
        title: "Bathroom remodeling",
        line: "Showers, tile, vanities and easier access.",
        href: "/construction/bathroom-remodeling",
        image: { src: bathImg, srcSet: bathSet, alt: "Design example of a remodeled bathroom (illustration, not a Highlander project)", example: true },
      },
      {
        title: "Home renovations",
        line: "Interior and whole-home updates. Indoor work runs all winter.",
        href: "/construction/renovations",
        image: {
          src: "/media/highlander-renovated-kitchen-living-640.webp",
          srcSet: "/media/highlander-renovated-kitchen-living-640.webp 640w, /media/highlander-renovated-kitchen-living-960.webp 960w",
          alt: "Design example of a renovated kitchen and living room (illustration, not a Highlander project)",
          example: true,
        },
      },
      {
        title: "Basement finishing",
        line: "Family rooms, guest space and bonus rooms.",
        href: "/construction/basements",
        image: { src: basementImg, srcSet: basementSet, alt: "Design example of a finished basement (illustration, not a Highlander project)", example: true },
      },
      {
        title: "Roof + addition",
        line: "One contractor for the addition and the roof over it.",
        href: "/construction/roof-and-addition",
        image: { src: roofTieImg, srcSet: roofTieSet, alt: "Laundry room addition tied into the roofline by Highlander in Cullowhee, NC" },
      },
      {
        title: "Design & planning",
        line: "See the layout and drawings before you build.",
        href: "/construction/design",
        image: { src: designImg, srcSet: designSet, alt: "Window wall on a living room addition built by Highlander in Franklin, NC" },
      },
    ],
  },
  included: {
    eyebrow: "Why a roofer that builds",
    heading: "The roof is where most additions go wrong",
    cards: [
      { icon: "droplets", title: "Weather-tight details", line: "Flashing, drainage and roof tie-ins are our everyday work, so new work stays dry." },
      { icon: "layers", title: "One contractor for roof and structure", line: "One company builds the structure and the roof over it, under one scope." },
      { icon: "file", title: "Written scope", line: "The work, materials and price are in writing before anything starts." },
    ],
  },
  featuredProjects: {
    heading: "Two projects, start to finish",
    slugs: ["living-room-addition-franklin", "deck-railing-rebuild-sylva"],
  },
  faqs: [
    {
      question: "How much does an addition or porch cost in Western NC?",
      answer:
        "It depends on the size, the site and the finishes, so we don't quote one number for everyone. After the site visit you get a written scope with the price before you commit. Financing may be available, subject to credit approval.",
    },
    {
      question: "Do I need a permit in Macon or Jackson County?",
      answer:
        "Most additions, porches and decks need a county building permit. We confirm what your project needs during planning and coordinate the permits and inspections for the work we're hired to do.",
    },
    {
      question: "How long does a project take?",
      answer:
        "It depends on the design, permits, materials, weather and size of the job. Once those are known we give you a schedule for your project instead of a one-size answer.",
    },
    {
      question: "Do you handle the roof tie-in?",
      answer:
        "Yes. Highlander is a roofing company as well as a general contractor, so the new roof is tied into the existing one by our own roofing side, under the same scope.",
    },
    {
      question: "Do I need plans or design first?",
      answer:
        "Most additions need drawings, and our design and planning service can produce them before you build. Smaller porch and deck jobs can often start from the site visit and written scope.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "We work from our Franklin office and Sylva showroom across Western North Carolina, including Franklin, Highlands, Cashiers, Sylva and the towns around them.",
    },
  ],
  related: [
    { label: "Siding replacement", href: "/construction/siding", description: "Fiber cement siding for mountain homes" },
    { label: "Handyman services in Western NC", href: "/construction/handyman", description: "Small home repairs around the house" },
    { label: "Hardscape: walls, steps and paths", href: "/construction/outdoor-living/hardscape", description: "Retaining walls, steps and walkways" },
    { label: "Recent construction projects", href: "/recent-projects", description: "Photos and write-ups of finished jobs" },
  ],
};
