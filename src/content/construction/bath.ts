import type { ConstructionPageContent } from "./types";
import { awayFaq, constructionCrumb, financingFaq, permitFaq } from "./shared";

import heroImg from "@/assets/construction-examples/bath-example-1.webp?w=1280&quality=70&format=webp";
import heroAvif from "@/assets/construction-examples/bath-example-1.webp?w=640;960;1280&format=avif&quality=45&as=srcset";
import heroWebp from "@/assets/construction-examples/bath-example-1.webp?w=640;960;1280&format=webp&quality=70&as=srcset";
import example2 from "@/assets/construction-examples/bath-example-2.webp?w=800&format=webp";
import example2Set from "@/assets/construction-examples/bath-example-2.webp?w=480;800&format=webp&as=srcset";

/**
 * /construction/bathroom-remodeling (plan §4 row 7). No real Highlander bath
 * photos yet: labelled design examples (John, 21 Nov 2026).
 * TODO(photos): real bathroom jobs.
 */
export const bathContent: ConstructionPageContent = {
  path: "/construction/bathroom-remodeling",
  title: "Bathroom Remodeling in Franklin, NC | Highlander",
  description:
    "Bathroom remodeling in Franklin and Western NC: showers, tub conversions, tile, vanities and safer access, with the waterproofing done right behind it.",
  serviceName: "bathroom",
  serviceKey: "bathroom",
  areaServed: [],
  breadcrumbs: [
    { name: "Home", url: "/" },
    constructionCrumb,
    { name: "Bathroom Remodeling", url: "/construction/bathroom-remodeling" },
  ],
  hero: {
    h1: "Bathroom Remodeling in Franklin & Western NC",
    subhead: "Showers, tile, vanities and safer access, with the moisture and ventilation details done right behind the finishes.",
    image: {
      src: heroImg,
      avifSrcSet: heroAvif,
      webpSrcSet: heroWebp,
      width: 1600,
      height: 1067,
      alt: "Design example of a remodeled bathroom with a walk-in shower (illustration, not a Highlander project)",
      example: true,
    },
  },
  quickAnswer: {
    question: "Who remodels bathrooms in Franklin, NC?",
    answer:
      "Highlander Building Services is a licensed NC general contractor in Franklin. A bathroom remodel can cover showers and tub conversions, tile, vanities, plumbing and a fan that actually moves moisture out of the house. The scope and price are in writing before work begins.",
  },
  examples: {
    heading: "Design example",
    body: "An illustration of the kind of bathroom we plan with you. Photos of our own bathroom jobs are coming soon.",
    images: [{ src: example2, srcSet: example2Set, alt: "Design example of a hall bathroom with a tub-shower and wood vanity (illustration, not a Highlander project)", example: true }],
  },
  included: {
    heading: "What's included",
    cards: [
      { icon: "droplets", title: "Showers and tub conversions", line: "Including turning a tub into a walk-in shower." },
      { icon: "layers", title: "Tile and waterproofing", line: "Planned together, so the framing stays dry." },
      { icon: "home", title: "Vanities and storage", line: "Sized for the room." },
      { icon: "mountain", title: "Ventilation", line: "A fan that moves moisture out of the house." },
      { icon: "shield", title: "Safer access", line: "Grab bars in the framing, low-threshold showers." },
      { icon: "file", title: "Written scope", line: "Selections and price in writing before work starts." },
    ],
  },
  angle: {
    eyebrow: "Mountain bathrooms",
    heading: "A better bathroom starts behind the tile",
    paragraphs: [
      "Humid mountain summers put moisture into every bathroom. A remodel is the time to make sure the fan vents outside and the waterproofing behind the tile is done properly.",
      "Homes that sit empty in winter carry a frozen-pipe risk, so when a bathroom is opened up we look at where the supply lines run.",
    ],
  },
  cost: {
    heading: "What a bathroom remodel costs",
    ranges: [],
    factors: ["Whether fixtures stay or move", "Shower, tub and tile selections", "Condition of the floor and framing once opened", "Ventilation that needs upgrading"],
  },
  faqs: [
    {
      question: "Can you convert my tub into a walk-in shower?",
      answer: "In most bathrooms, yes. It depends on the floor framing and where the drain can go, which we check before writing the scope.",
    },
    {
      question: "Will my bathroom be usable during the remodel if it's my only one?",
      answer: "Tell us at the start if it is the only bathroom in the home. We plan the schedule around that and tell you in advance which days the room will be out of use.",
    },
    permitFaq("bathroom remodels that move plumbing or wiring"),
    awayFaq("bathroom"),
    financingFaq,
  ],
  related: [
    { label: "All construction services", href: "/construction", description: "Additions, porches, decks and remodels" },
    { label: "Kitchen remodeling", href: "/construction/kitchen-remodeling", description: "Layouts, cabinets and counters" },
    { label: "Home renovations", href: "/construction/renovations", description: "Interior and whole-home updates" },
  ],
};
