import { Hammer, RotateCcw, CloudLightning, Layers, Building2, Wrench } from "lucide-react";

export interface ServiceData {
  slug: string;
  title: string;
  headline: string;
  subheadline: string;
  description: string;
  icon: any;
  features: string[];
  faqs: { question: string; answer: string }[];
  metaTitle: string;
  metaDescription: string;
}

export const services: ServiceData[] = [
  {
    slug: "roof-repair",
    title: "Roof Repair",
    headline: "Fast, Reliable Roof Repairs Across Western NC",
    subheadline: "Leak fixes, shingle replacement, and damage repair — done right the first time by a local team that knows mountain roofing.",
    description: "Whether it's a small leak or significant storm damage, our repair crews respond fast and fix it properly. We serve homeowners across Franklin, Sylva, Highlands, Cashiers, and surrounding WNC communities with honest assessments and lasting repairs.",
    icon: Hammer,
    features: [
      "Same-week emergency repair scheduling",
      "Leak detection and waterproofing",
      "Shingle, flashing, and ridge cap repair",
      "Chimney and skylight flashing repair",
      "Gutter and soffit repair",
      "Full photo documentation for insurance",
      "Free inspection before any work begins",
    ],
    faqs: [
      { question: "How quickly can you repair my roof?", answer: "We typically schedule repair inspections within 24–48 hours and complete most repairs within a week, depending on scope and weather conditions." },
      { question: "Do you work with insurance companies?", answer: "Yes. We document all damage with photos and detailed reports to support your insurance claim process from start to finish." },
      { question: "How much does a roof repair cost in WNC?", answer: "Repair costs vary based on damage extent, materials, and accessibility. Most minor repairs range from $300–$1,500. We provide a free inspection and transparent estimate before any work begins." },
      { question: "Can you repair just a section of my roof?", answer: "Absolutely. We specialize in targeted repairs that address the problem area without unnecessary full replacements. We'll always recommend the most cost-effective solution." },
    ],
    metaTitle: "Roof Repair in Western NC | Highlander Roofing",
    metaDescription: "Fast, reliable roof repair services across Highlands, Cashiers, Franklin, Sylva, and Western North Carolina. Free inspections. Licensed & insured since 2017.",
  },
  {
    slug: "roof-replacement",
    title: "Roof Replacement",
    headline: "Full Roof Replacement Built for Mountain Weather",
    subheadline: "Premium tear-off and installation with materials engineered for WNC's elevation, wind, and moisture — backed by manufacturer warranties.",
    description: "When repair isn't enough, our full replacement service delivers a new roof system designed for the unique demands of Western North Carolina. From tear-off to final inspection, we manage every detail with CertainTeed-certified craftsmanship.",
    icon: RotateCcw,
    features: [
      "Complete tear-off and disposal",
      "Ice & water shield underlayment for mountain climates",
      "CertainTeed Master Shingle Applicator quality",
      "Architectural and designer shingle options",
      "Ridge vent and attic ventilation optimization",
      "Manufacturer warranty registration",
      "Financing options available",
    ],
    faqs: [
      { question: "How long does a roof replacement take?", answer: "Most residential roof replacements are completed in 2–5 days depending on size, complexity, and weather. We keep you informed every step of the way." },
      { question: "How much does a new roof cost in Western NC?", answer: "A typical residential roof replacement in WNC ranges from $8,000–$25,000+ depending on size, materials, and complexity. We provide detailed estimates after a free inspection." },
      { question: "What materials do you recommend for mountain homes?", answer: "We typically recommend architectural shingles or metal roofing for WNC homes. Both handle high winds, heavy rain, and snow loads. We'll recommend the best option for your specific situation." },
      { question: "Do you offer financing for roof replacement?", answer: "Yes, we offer flexible financing options to make a new roof affordable. Ask us about payment plans during your free inspection." },
    ],
    metaTitle: "Roof Replacement in Western NC | Highlander Roofing",
    metaDescription: "Full roof replacement for mountain homes in Highlands, Franklin, Sylva, Cashiers & WNC. CertainTeed certified. Financing available. Free inspections.",
  },
  {
    slug: "storm-damage",
    title: "Storm Damage",
    headline: "Storm Damage Response for WNC Homeowners",
    subheadline: "Wind, hail, and fallen trees don't wait — and neither do we. Emergency inspections, full documentation, and insurance support when you need it most.",
    description: "Western NC sees severe storms, high winds, and heavy snowfall that can devastate roofs. Our storm damage team responds quickly with emergency tarping, detailed damage documentation, and full insurance claim support to get your home protected fast.",
    icon: CloudLightning,
    features: [
      "24–48 hour emergency response",
      "Emergency tarping to prevent further damage",
      "Comprehensive storm damage inspection",
      "Detailed photo and video documentation",
      "Insurance claim filing assistance",
      "Direct communication with adjusters",
      "Full repair or replacement coordination",
    ],
    faqs: [
      { question: "What should I do right after storm damage?", answer: "Call us immediately for an emergency inspection. Don't climb on your roof. We'll tarp any exposed areas to prevent further damage and begin documenting everything for your insurance claim." },
      { question: "Will my insurance cover storm damage repairs?", answer: "Most homeowner's insurance policies cover storm damage. We work directly with your insurance company, providing documentation and meeting with adjusters to maximize your claim." },
      { question: "How do I know if my roof has storm damage?", answer: "Signs include missing or lifted shingles, dents in metal flashing, granule loss, water stains on ceilings, and debris on the roof. We provide free storm damage inspections." },
      { question: "Do you handle the insurance process?", answer: "We assist with the entire process — from initial documentation to adjuster meetings to final repairs. Our team has extensive experience navigating roofing insurance claims in WNC." },
    ],
    metaTitle: "Storm Damage Roof Repair in Western NC | Highlander Roofing",
    metaDescription: "Emergency storm damage response across Western North Carolina. Insurance claim support, tarping, and fast repairs. Call Highlander Roofing — (828) 397-9211.",
  },
  {
    slug: "metal-roofing",
    title: "Metal Roofing",
    headline: "Metal Roofing Designed for Mountain Climates",
    subheadline: "Durable, energy-efficient, and built to last 50+ years — metal roofing is the premium choice for WNC homeowners who want long-term protection.",
    description: "Metal roofing outperforms traditional shingles in virtually every category that matters for mountain living: wind resistance, snow shedding, energy efficiency, and lifespan. Our metal roofing installations are engineered specifically for Western NC conditions.",
    icon: Layers,
    features: [
      "Standing seam and exposed fastener options",
      "50+ year lifespan with minimal maintenance",
      "Superior wind resistance (up to 140 mph)",
      "Energy-efficient reflective coatings",
      "Snow and ice shedding design",
      "Fire-resistant (Class A rating)",
      "Wide range of colors and profiles",
    ],
    faqs: [
      { question: "Is metal roofing worth the investment?", answer: "Yes. While the upfront cost is higher than shingles, metal roofing lasts 2–3x longer, requires less maintenance, and can reduce energy costs by 10–25%. It's the best long-term value for mountain homes." },
      { question: "Will a metal roof be noisy in rain?", answer: "No. Modern metal roofing installed over solid sheathing and underlayment is no louder than any other roofing material during rain." },
      { question: "Can you install metal roofing over existing shingles?", answer: "In some cases, yes. We evaluate each roof individually. Installing over existing shingles can save on tear-off costs, but we'll only recommend it if it's the right solution for your home." },
      { question: "How does metal roofing handle snow in WNC?", answer: "Metal roofing sheds snow more efficiently than shingles, reducing ice dam risk. We install snow guards where needed to control snow slide and protect walkways below." },
    ],
    metaTitle: "Metal Roofing Installation in Western NC | Highlander Roofing",
    metaDescription: "Premium metal roofing for WNC mountain homes. 50+ year lifespan, energy efficient, wind resistant. Free inspection from Highlander Roofing.",
  },
  {
    slug: "commercial-roofing",
    title: "Commercial Roofing",
    headline: "Commercial Roofing for WNC Properties",
    subheadline: "Inspections, repairs, replacements, and maintenance programs for property managers, facility managers, and business owners across Western North Carolina.",
    description: "Commercial roofs have different demands — larger scale, stricter timelines, and compliance requirements. Highlander Roofing provides professional commercial roofing services tailored to WNC's property managers, HOAs, and business owners.",
    icon: Building2,
    features: [
      "Flat and low-slope roofing systems",
      "TPO, EPDM, and modified bitumen installations",
      "Preventative maintenance programs",
      "Roof condition assessments and reporting",
      "Emergency leak response",
      "Tenant-sensitive scheduling",
      "Multi-property service agreements",
    ],
    faqs: [
      { question: "Do you service multi-property portfolios?", answer: "Yes. We offer multi-property agreements with consistent pricing, priority scheduling, and centralized reporting for property managers overseeing multiple WNC properties." },
      { question: "What commercial roofing systems do you install?", answer: "We install TPO, EPDM, modified bitumen, and standing seam metal systems. We recommend the best system based on your building type, budget, and long-term goals." },
      { question: "Do you offer maintenance programs for commercial roofs?", answer: "Yes. Our preventative maintenance programs include bi-annual inspections, minor repairs, drainage checks, and detailed condition reports to extend your roof's lifespan and avoid costly emergencies." },
      { question: "Can you work around tenant schedules?", answer: "Absolutely. We coordinate work schedules to minimize disruption to tenants and business operations. We're experienced with occupied buildings and sensitive environments." },
    ],
    metaTitle: "Commercial Roofing Services in Western NC | Highlander Roofing",
    metaDescription: "Commercial roofing services for property managers, HOAs & businesses in Western NC. Inspections, repairs, maintenance programs. Licensed & insured.",
  },
  {
    slug: "commercial-maintenance",
    title: "Maintenance Programs",
    headline: "Preventative Roof Maintenance for Commercial Properties",
    subheadline: "Extend your roof's lifespan, avoid emergency repairs, and protect your investment with scheduled maintenance from a trusted WNC roofing contractor.",
    description: "Most commercial roof failures are preventable. Our maintenance programs catch small issues before they become expensive problems — saving you money, extending roof life, and giving you documentation for warranty and insurance compliance.",
    icon: Wrench,
    features: [
      "Bi-annual comprehensive roof inspections",
      "Debris removal and drainage clearing",
      "Sealant and flashing maintenance",
      "Detailed condition reports with photos",
      "Priority emergency response",
      "Warranty compliance documentation",
      "Customizable service tiers",
    ],
    faqs: [
      { question: "How often should a commercial roof be inspected?", answer: "We recommend at minimum bi-annual inspections — typically in spring and fall. Additional inspections should follow any major storm event." },
      { question: "What does a maintenance visit include?", answer: "Each visit includes a full roof inspection, drainage check, debris removal, sealant assessment, flashing check, and a written condition report with photos." },
      { question: "Will maintenance really save money long-term?", answer: "Studies show preventative maintenance can extend roof life by 25–50% and reduce total lifecycle costs significantly by catching issues early before they require major repairs." },
      { question: "Can you maintain roofs installed by other contractors?", answer: "Yes. We service all commercial roofing systems regardless of who installed them. We'll assess current condition and create a maintenance plan tailored to your roof." },
    ],
    metaTitle: "Commercial Roof Maintenance Programs | Highlander Roofing WNC",
    metaDescription: "Preventative commercial roof maintenance in Western NC. Bi-annual inspections, condition reports, priority repairs. Protect your investment.",
  },
];

export const getServiceBySlug = (slug: string) => services.find(s => s.slug === slug);
