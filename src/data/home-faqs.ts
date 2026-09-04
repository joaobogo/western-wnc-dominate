import { PHONE_DISPLAY } from "@/data/business";

/**
 * Homepage FAQ — the single source for BOTH the visible accordion
 * (src/components/HomeFAQ.tsx) and the FAQPage JSON-LD that
 * src/pages/Index.tsx passes to SEOHead via `jsonLd`. Keeping the data here
 * (not inside the lazy-loaded HomeFAQ component) lets the page head carry the
 * schema without pulling the below-the-fold section into the first load, and
 * guarantees every Question.name in the schema is a question visible on the page.
 *
 * `a` is the plain-text answer used in the schema; HomeFAQ renders a richer
 * linked version of the same answer where one exists.
 */
export interface HomeFaq {
  q: string;
  a: string;
}

export const homeFaqs: HomeFaq[] = [
  {
    q: "What roofing services does Highlander provide in Western North Carolina?",
    a: "Highlander provides a full range of roofing services across Western NC — including roof repair, roof replacement, metal roofing, gutters, skylights, and storm damage response. Every system is specified for mountain elevation, wind exposure, and moisture conditions.",
  },
  {
    q: "Does Highlander provide both roof repair and roof replacement?",
    a: "Yes. Our crews handle everything from a single leak or failed pipe boot to full tear-off and roof replacement for mountain homes. We diagnose the actual problem first — if a targeted roof repair will protect the home, that's what we recommend rather than a replacement you don't need.",
  },
  {
    q: "Does Highlander install metal roofing?",
    a: "Yes. Metal roofing is among our most-installed systems for Western NC mountain homes. We install standing seam and exposed-fastener metal roofing with flashing details, fastening schedules, and underlayments sized for high-elevation wind, snow, and ice loading.",
  },
  {
    q: "Does Highlander serve Franklin, Highlands, Cashiers, and Sylva?",
    a: "Yes. Franklin is our home base, and we regularly work in Highlands, Cashiers, Sylva, Waynesville, Bryson City, Hayesville, Murphy, and the surrounding mountain communities including Scaly Mountain, Otto, and Lake Glenville.",
  },
  {
    q: "Can Highlander help with construction and design services?",
    a: "Yes. Highlander is a licensed North Carolina General Contractor as well as a roofing company. We handle construction, in-house design, home additions, renovations, and outdoor living projects.",
  },
  {
    q: "What should I do if water is coming into my home?",
    a: `Contain the water safely — move belongings, place a bucket under the drip, and if you can do so safely, take a photo of the affected area. Then call us at ${PHONE_DISPLAY} during business hours and we'll schedule the fastest inspection we can arrange. For an active storm event, coordinate with your insurance carrier as well.`,
  },
  {
    q: "How do I request an inspection or quote?",
    a: `Call ${PHONE_DISPLAY}, request an inspection, or reach us through our contact form. A Highlander advisor will follow up to gather project details, confirm your service area, and schedule an on-site visit. On-site estimates for roofing and construction projects across Western NC are free.`,
  },
  {
    q: "When is the best time for gutter maintenance in the mountains?",
    a: "A two-stage approach works best for wooded WNC properties: a baseline cleaning before heavy leaf fall, and a follow-up after the canopy drops.",
  },
];
