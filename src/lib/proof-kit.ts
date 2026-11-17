import { REVIEWS, type Review, type ServiceTag } from "@/data/reviews";
import { blogIndex, type BlogIndexEntry } from "@/data/blog-index.generated";

/** Selection logic for components/conversion/ProofKit (kept here so the component file only exports components). */
export type ProofTopic =
  | "roofing"
  | "replacement"
  | "repair"
  | "metal"
  | "gutters"
  | "storm"
  | "skylights"
  | "commercial"
  | "construction"
  | "additions"
  | "renovations"
  | "outdoor"
  | "siding"
  | "design"
  | "handyman"
  | "all";

export const REVIEW_TAGS: Partial<Record<ProofTopic, ServiceTag[]>> = {
  replacement: ["roof-replacement"],
  repair: ["roof-repair", "storm-damage"],
  metal: ["metal-roofing"],
  gutters: ["gutters"],
  storm: ["storm-damage"],
};

const ARTICLE_MATCH: Record<ProofTopic, RegExp> = {
  roofing: /roof|shingle|metal/i,
  replacement: /replac|new roof|shingle|roof cost|underlayment|tear/i,
  repair: /repair|leak|flashing|stain|vent/i,
  metal: /metal|standing seam|copper/i,
  gutters: /gutter|downspout|drainage|fascia/i,
  storm: /storm|hail|wind|insurance|tree/i,
  skylights: /skylight|light|attic|ventilation/i,
  commercial: /commercial|flat|low-slope|membrane|roof/i,
  construction: /addition|renovat|remodel|deck|porch|construction|permit/i,
  additions: /addition|permit|sunroom|room/i,
  renovations: /renovat|remodel|kitchen|bath|interior|basement/i,
  outdoor: /deck|porch|patio|outdoor|sunroom|pergola/i,
  siding: /siding|exterior|trim|fascia|paint/i,
  design: /design|plan|layout|permit|addition/i,
  handyman: /repair|maintenance|checklist|gutter|deck|fascia|leak/i,
  all: /./,
};

const byNewest = <T extends { date: string }>(a: T, b: T) => (a.date < b.date ? 1 : -1);

/** Service-matched reviews first, then the rest of the company's reviews, newest first. */
export function pickReviews(topic: ProofTopic, limit = 3): Review[] {
  const tags = REVIEW_TAGS[topic] ?? [];
  const matched = REVIEWS.filter((r) => r.service.some((s) => tags.includes(s))).sort(byNewest);
  const rest = REVIEWS.filter((r) => !matched.includes(r)).sort(byNewest);
  return [...matched, ...rest].slice(0, limit);
}

/** Three posts on the topic, newest first; folded (redirected) posts are skipped. */
export function pickArticles(topic: ProofTopic, limit = 3): BlogIndexEntry[] {
  const live = blogIndex.filter((p) => !p.canonicalTo);
  const re = ARTICLE_MATCH[topic];
  const matched = live.filter((p) => re.test(`${p.title} ${p.category} ${p.slug}`)).sort(byNewest);
  const filler = live.filter((p) => !matched.includes(p)).sort(byNewest);
  return [...matched, ...filler].slice(0, limit);
}

