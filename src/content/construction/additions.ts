import type { ConstructionPageContent } from "./types";
import { constructionCrumb, financingFaq, permitFaq } from "./shared";

import heroImg from "@/assets/work/addition-franklin-exterior-windows.webp?w=1280&quality=70&format=webp";
import heroAvif from "@/assets/work/addition-franklin-exterior-windows.webp?w=640;960;1280&format=avif&quality=45&as=srcset";
import heroWebp from "@/assets/work/addition-franklin-exterior-windows.webp?w=640;960;1280&format=webp&quality=70&as=srcset";

/** /construction/additions (plan §4 row 2). Photos: the documented Franklin and Cullowhee additions. */
export const additionsContent: ConstructionPageContent = {
  path: "/construction/additions",
  title: "Home Additions in Franklin, NC | Highlander",
  description:
    "Home additions in Franklin and Western NC, built to match the house and tied into the roof by our own roofers. Written scope before you commit.",
  serviceName: "addition",
  serviceKey: "addition",
  areaServed: ["Franklin", "Cullowhee"],
  breadcrumbs: [{ name: "Home", url: "/" }, constructionCrumb, { name: "Home Additions", url: "/construction/additions" }],
  hero: {
    h1: "Home Additions in Franklin & Western NC",
    subhead: "More room for the house you already love, built to match it and tied into the roof by our own roofers.",
    image: {
      src: heroImg,
      avifSrcSet: heroAvif,
      webpSrcSet: heroWebp,
      width: 1600,
      height: 1200,
      alt: "Living room addition with cedar shake gable and tall windows built by Highlander in Franklin, NC",
    },
  },
  quickAnswer: {
    question: "Who builds home additions in Franklin, NC?",
    answer:
      "Highlander Building Services is a licensed NC general contractor and roofer in Franklin. We build living room additions, laundry rooms and other added rooms across Western NC, matched to the existing house. Our own roofers tie the new roof into the old one, which is where most additions leak, and the scope is in writing first.",
  },
  gallery: {
    heading: "Additions we have built",
    body: "A living room addition in Franklin and a laundry room addition in Cullowhee. Tap a photo to see it full size.",
    ids: ["addition-windows-ext", "addition-window-wall", "addition-room", "cullowhee-roofline"],
  },
  included: {
    heading: "What's included",
    cards: [
      { icon: "ruler", title: "Site and structure check", line: "Foundation, slope, access and the existing framing, before design." },
      { icon: "file", title: "Drawings and written scope", line: "Layout, materials and price in writing before work starts." },
      { icon: "shield", title: "Permits and inspections", line: "Coordinated with the county for the work we're hired to do." },
      { icon: "hammer", title: "Foundation and framing", line: "Built on engineered plans where the addition needs them." },
      { icon: "droplets", title: "Roof tie-in", line: "New roof flashed into the old one by our own roofing crew." },
      { icon: "home", title: "Matching finishes", line: "Siding, trim and windows chosen to match the house." },
    ],
  },
  angle: {
    eyebrow: "Why a roofer",
    heading: "Most additions leak where the new roof meets the old",
    paragraphs: [
      "The joint between the new roof and the existing one takes the most water on a mountain home. We are a roofing company too, so that valley, the flashing and the drip edges are done by our own roofers under the same scope.",
      "Most additions also need drawings first. Our design and planning service can produce them before you build.",
    ],
    links: [
      { label: "Plan before you build: design & planning", href: "/construction/design" },
      { label: "Home addition permits in North Carolina", href: "/blog/home-addition-permits" },
    ],
  },
  featuredProjects: { heading: "A Franklin addition, start to finish", slugs: ["living-room-addition-franklin"] },
  cost: {
    heading: "What a home addition costs",
    ranges: [],
    factors: ["Size and number of rooms", "Foundation and slope of the site", "How the roof ties into the existing house", "Finish level inside and out"],
  },
  faqs: [
    {
      question: "How much does a home addition cost in Western NC?",
      answer:
        "It depends on the size, the site, the roof tie-in and the finishes, so we don't quote one per-foot number. After the site visit you get a written scope with the price before you commit.",
    },
    permitFaq("additions"),
    {
      question: "How long does an addition take?",
      answer:
        "Design, engineering, permits, materials and weather all set the schedule. We give you a schedule for your addition once those are known, rather than a one-size answer.",
    },
    {
      question: "Will the addition match my house?",
      answer:
        "That is the goal. We match the roofline, siding, trim and window style, and where an exact material is no longer made we tell you the closest option before you approve the scope.",
    },
    {
      question: "Do I need to move out during construction?",
      answer: "Usually not. We plan dust barriers and access so you can keep living in the house, and tell you ahead of time if a day will be disruptive.",
    },
    financingFaq,
  ],
  related: [
    { label: "All construction services", href: "/construction", description: "Additions, porches, decks and remodels" },
    { label: "Porches, decks & patios", href: "/construction/outdoor-living", description: "Outdoor rooms built for mountain weather" },
    { label: "Home renovations", href: "/construction/renovations", description: "Interior and whole-home updates" },
  ],
};

