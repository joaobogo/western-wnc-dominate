import type { ConstructionPageContent } from "./types";
import { constructionCrumb, financingFaq, permitFaq } from "./shared";

import heroImg from "@/assets/work/addition-cullowhee-roofline.webp?w=1125&quality=70&format=webp";
import heroAvif from "@/assets/work/addition-cullowhee-roofline.webp?w=640;960;1125&format=avif&quality=45&as=srcset";
import heroWebp from "@/assets/work/addition-cullowhee-roofline.webp?w=640;960;1125&format=webp&quality=70&as=srcset";

/**
 * /construction/roof-and-addition (plan §4 row 10, new): Highlander's unique
 * page. Photos: the Cullowhee laundry room addition tied into the roof and
 * the Franklin living room addition.
 */
export const roofAndAdditionContent: ConstructionPageContent = {
  path: "/construction/roof-and-addition",
  title: "Roof + Addition, One Contractor | Highlander",
  description:
    "Most additions leak where the new roof meets the old. Highlander builds the addition and ties in the roof under one scope, in Franklin and Western NC.",
  serviceName: "roof and addition",
  serviceKey: "addition",
  areaServed: ["Franklin", "Cullowhee"],
  breadcrumbs: [
    { name: "Home", url: "/" },
    constructionCrumb,
    { name: "Roof + Addition", url: "/construction/roof-and-addition" },
  ],
  hero: {
    h1: "One Contractor for the Roof and the Build",
    subhead: "Most additions leak where the new roof meets the old one. We build both, under one scope.",
    image: {
      src: heroImg,
      avifSrcSet: heroAvif,
      webpSrcSet: heroWebp,
      width: 1125,
      height: 1500,
      position: "50% 35%",
      alt: "Laundry room addition with its shingle roof tied into the original roofline by Highlander in Cullowhee, NC",
    },
  },
  quickAnswer: {
    question: "Who builds an addition and ties in the roof in Western NC?",
    answer:
      "Highlander Building Services is a roofing company and a licensed NC general contractor in Franklin, so one company frames the addition and ties its roof into the old one. In Cullowhee we tied a laundry room addition into the original roofline; in Franklin we built a living room addition with a vaulted gable.",
  },
  gallery: {
    heading: "Roof tie-ins we have built",
    body: "The Cullowhee laundry room addition and the Franklin living room addition. Tap a photo to see it full size.",
    ids: ["cullowhee-roofline", "addition-windows-ext", "addition-window-wall", "addition-room"],
  },
  included: {
    eyebrow: "Where additions leak",
    heading: "The details one scope covers",
    cards: [
      { icon: "droplets", title: "Valleys and step flashing", line: "Where the new roof meets the old walls and slopes." },
      { icon: "layers", title: "Matching roofing", line: "Shingles or metal chosen to match the existing roof." },
      { icon: "hammer", title: "Framing tied to the house", line: "New rafters and walls connected to the old structure." },
      { icon: "file", title: "One written scope", line: "Roof and addition priced together, one point of contact." },
    ],
  },
  angle: {
    eyebrow: "Why one contractor",
    heading: "No gap between the framer and the roofer",
    paragraphs: [
      "When one company frames the addition and another roofs it, the joint between them belongs to nobody. Water finds that joint first. With Highlander, the same scope covers the framing, the flashing and the roof, so there is no gap to argue over.",
    ],
    links: [
      { label: "Home additions", href: "/construction/additions" },
      { label: "Roof replacement", href: "/roofing/roof-replacement" },
    ],
  },
  featuredProjects: { heading: "A Franklin addition, start to finish", slugs: ["living-room-addition-franklin"] },
  cost: {
    heading: "What a roof and addition cost",
    ranges: [],
    factors: ["Size of the addition", "How much of the existing roof is redone", "Roofing material", "Foundation and slope of the site"],
  },
  faqs: [
    {
      question: "Should I replace my roof when I build an addition?",
      answer: "Sometimes. If the existing roof is near the end of its life, doing both at once can avoid tearing into new work later. We look at the roof during the site visit and tell you straight.",
    },
    {
      question: "Will the new roof match the old one?",
      answer: "We match the material and color where it is still made. If it isn't, we tell you the closest option, or whether re-roofing the whole house makes more sense.",
    },
    permitFaq("additions"),
    {
      question: "Who do I call if it leaks?",
      answer: "Us. One company built the addition and the roof over it, so there is one number to call.",
    },
    financingFaq,
  ],
  related: [
    { label: "Home additions", href: "/construction/additions", description: "More room, matched to the house" },
    { label: "Roof replacement", href: "/roofing/roof-replacement", description: "New roofs for mountain homes" },
    { label: "All construction services", href: "/construction", description: "Additions, porches, decks and remodels" },
  ],
};
