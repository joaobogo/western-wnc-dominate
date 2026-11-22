/**
 * Content shape for construction pages built on the shared template
 * (John's Construction & Design plan, 21 Nov 2026, §3.2).
 *
 * One file per page under src/content/construction/ holds every word and
 * photo choice; the page component only arranges the template sections in
 * the plan's fixed order. Every section is optional except the hero, the
 * quick answer, the FAQ and the final call band.
 */

export interface ContentImage {
  src: string;
  /** Build-time srcset (vite-imagetools `?…&as=srcset`). */
  srcSet?: string;
  alt: string;
  /**
   * A generated design example, not a Highlander job (John, 21 Nov 2026:
   * realistic examples until Robert supplies real photos). Always labelled
   * "Design example" on the page and never captioned with a town.
   */
  example?: boolean;
}

export interface HeroContent {
  h1: string;
  /** One sentence. */
  subhead: string;
  image: ContentImage & { avifSrcSet?: string; webpSrcSet?: string; width: number; height: number; position?: string };
}

export interface ServiceCard {
  /** Keyword anchor text: the card title is the link. */
  title: string;
  line: string;
  href: string;
  image: ContentImage;
}

export interface IconCard {
  icon: "shield" | "layers" | "file" | "home" | "ruler" | "hammer" | "mountain" | "droplets";
  title: string;
  line: string;
}

export interface CostRange {
  label: string;
  /** Only ranges Luke has approved. Until then the cost section hides itself. */
  range: string;
}

export interface Faq {
  question: string;
  /** 2–3 sentences. The same text feeds the visible accordion and FAQPage schema. */
  answer: string;
}

export interface RelatedLink {
  label: string;
  href: string;
  description: string;
}

export interface ConstructionPageContent {
  path: string;
  /** ≤60 characters. */
  title: string;
  /** ≤155 characters. */
  description: string;
  /** Short service name used in "Talk to Highlander about your {service}" and in schema. */
  serviceName: string;
  /** Tracking/form tag, e.g. "construction" or "addition". */
  serviceKey: string;
  /** Towns with real Highlander projects for this service (Service.areaServed). */
  areaServed: string[];
  breadcrumbs: { name: string; url: string }[];
  hero: HeroContent;
  quickAnswer: { question: string; answer: string };
  gallery?: { heading: string; body?: string; limit?: number };
  serviceCards?: { heading: string; intro?: string; cards: ServiceCard[] };
  included?: { eyebrow?: string; heading: string; cards: IconCard[] };
  featuredProjects?: { heading: string; slugs: string[] };
  cost?: { heading: string; ranges: CostRange[]; factors: string[] };
  faqs: Faq[];
  related: RelatedLink[];
}
