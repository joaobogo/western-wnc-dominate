import { blogPosts } from "@/data/blogs";
import { services } from "@/data/services";
import { towns } from "@/data/towns";

export type KeywordMapCategory = "service" | "town" | "blog";

export interface KeywordMapEntry {
  id: string;
  category: KeywordMapCategory;
  label: string;
  path: string;
  primary: string[];
  secondary: string[];
  longTail: string[];
}

const coreTowns = ["Highlands", "Cashiers", "Franklin", "Sylva"];
const directServiceRoutes = new Set([
  "commercial-roofing",
  "commercial-maintenance",
  "gutters",
  "outdoor-living",
  "construction-services",
]);

const titleCaseWords = ["NC", "WNC", "HOA"];

const getServicePath = (slug: string) => (directServiceRoutes.has(slug) ? `/${slug}` : `/services/${slug}`);

const unique = (values: Array<string | null | undefined>) =>
  Array.from(new Set(values.filter(Boolean).map((value) => value!.replace(/\s+/g, " ").trim())));

const toKeywordCase = (value: string) => {
  const normalized = value
    .replace(/[?]/g, "")
    .replace(/[’']/g, "'")
    .replace(/[-–—]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

  return normalized
    .split(" ")
    .map((word) => {
      const upper = word.toUpperCase();
      if (titleCaseWords.includes(upper)) return upper;
      if (["in", "for", "to", "a", "the", "and", "of", "vs"].includes(word)) return word;
      return word;
    })
    .join(" ");
};

const stripTrailingLocation = (title: string) =>
  title
    .replace(/\s+in\s+[A-Za-z\s]+,\s*NC$/i, "")
    .replace(/\s+for\s+[A-Za-z\s]+$/i, "")
    .replace(/\s+in\s+North Carolina$/i, "")
    .replace(/\?$/, "")
    .trim();

const getBlogTopic = (title: string) => toKeywordCase(stripTrailingLocation(title));

const getServiceEntries = (): KeywordMapEntry[] =>
  services.map((service) => {
    const serviceTerm = toKeywordCase(service.title);
    const regionalIntent = service.division === "construction" ? "western nc" : "western nc";

    return {
      id: `service-${service.slug}`,
      category: "service",
      label: service.title,
      path: getServicePath(service.slug),
      primary: unique([
        `${serviceTerm} ${regionalIntent}`,
        `${serviceTerm} contractor western north carolina`,
        `${serviceTerm} near me`,
      ]),
      secondary: unique([
        ...coreTowns.map((town) => `${serviceTerm} ${town.toLowerCase()} nc`),
        service.division === "roofing" ? `mountain ${serviceTerm} contractor` : `${serviceTerm} mountain homes`,
        service.slug.includes("storm") || service.slug.includes("repair") ? `emergency ${serviceTerm}` : `${serviceTerm} estimate western nc`,
      ]),
      longTail: unique([
        `how much does ${serviceTerm} cost in western nc`,
        `best ${serviceTerm} company in western nc`,
        `${serviceTerm} for mountain homes in western nc`,
        service.division === "roofing"
          ? `${serviceTerm} for wind rain and elevation in western nc`
          : `${serviceTerm} for steep lots and mountain properties in western nc`,
      ]),
    };
  });

const getTownEntries = (): KeywordMapEntry[] =>
  towns.map((town) => {
    const townTarget = `${town.name.toLowerCase()} nc`;
    const countyTarget = `${town.county.toLowerCase()}`;

    return {
      id: `town-${town.slug}`,
      category: "town",
      label: `${town.name}, ${town.state}`,
      path: `/service-areas/${town.slug}`,
      primary: unique([
        `roofer in ${townTarget}`,
        `roof repair ${townTarget}`,
        `roof replacement ${townTarget}`,
      ]),
      secondary: unique([
        `storm damage ${townTarget}`,
        `metal roofing ${townTarget}`,
        `construction contractor ${townTarget}`,
        `${town.name.toLowerCase()} roofing company`,
      ]),
      longTail: unique([
        `best roofing company in ${townTarget}`,
        `mountain roofing contractor in ${townTarget}`,
        `roof inspection for homes in ${townTarget}`,
        `${townTarget} roofer serving ${countyTarget}`,
      ]),
    };
  });

const getBlogEntries = (): KeywordMapEntry[] =>
  blogPosts.map((post) => {
    const topic = getBlogTopic(post.title);
    const townTarget = post.town ? `${post.town.toLowerCase()} nc` : null;
    const relatedServiceTerms = (post.relatedServices ?? []).map((service) => toKeywordCase(service.label));
    const firstServiceTerm = relatedServiceTerms[0] ?? null;
    const categoryTerm = `${post.category.toLowerCase()} roofing guide`;

    return {
      id: `blog-${post.slug}`,
      category: "blog",
      label: post.title,
      path: `/blog/${post.slug}`,
      primary: unique([
        townTarget ? `${topic} ${townTarget}` : `${topic} western nc`,
        `${topic} roofing guide`,
        `${topic} contractor advice`,
      ]),
      secondary: unique([
        townTarget ? `${topic} western nc` : null,
        firstServiceTerm ? `${firstServiceTerm} western nc` : null,
        townTarget ? `${topic} for mountain homes in ${townTarget}` : `${topic} for mountain homes`,
        categoryTerm,
      ]),
      longTail: unique([
        townTarget ? `how to handle ${topic} in ${townTarget}` : `how to handle ${topic} in western nc`,
        firstServiceTerm ? `${topic} before hiring a ${firstServiceTerm} contractor` : null,
        townTarget ? `${topic} for homeowners in ${townTarget}` : `${topic} for homeowners in western north carolina`,
        post.category.toLowerCase() === "storm"
          ? `${topic} after severe weather in western nc`
          : `${topic} for western nc mountain homes`,
      ]),
    };
  });

export const generateKeywordMap = (): KeywordMapEntry[] => [
  ...getServiceEntries(),
  ...getTownEntries(),
  ...getBlogEntries(),
];