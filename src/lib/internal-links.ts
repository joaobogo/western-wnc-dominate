import { blogPosts } from "@/data/blogs";
import { counties } from "@/data/counties";
import { towns } from "@/data/towns";
import type { RelatedLinkItem } from "@/components/RelatedLinks";

/** Slug for a county name (e.g. "Macon County" -> "macon-county"). */
export const countySlug = (county: string) =>
  county.toLowerCase().trim().replace(/\s+/g, "-");

/** Returns the county hub link for a town, if the county hub exists. */
export const getCountyHubLink = (county?: string): RelatedLinkItem | null => {
  if (!county) return null;
  const slug = countySlug(county);
  const hub = counties.find((c) => c.slug === slug);
  if (!hub) return null;
  return {
    label: `${county} Roofing & Construction Hub`,
    href: `/service-areas/county/${slug}`,
    description: `Permitting, climate, and coverage details across ${county}.`,
  };
};

/** 2-3 blog posts most relevant to a town. */
export const getTownBlogLinks = (townName: string, limit = 3): RelatedLinkItem[] => {
  const local = blogPosts.filter((p) => p.town === townName);
  const rest = blogPosts.filter((p) => p.town !== townName);
  return [...local, ...rest].slice(0, limit).map((p) => ({
    label: p.title,
    href: `/blog/${p.slug}`,
    description: p.excerpt?.slice(0, 120),
  }));
};

/** 2-3 blog posts most relevant to a service, by keyword overlap. */
export const getServiceBlogLinks = (
  serviceTitle: string,
  serviceSlug: string,
  limit = 3,
): RelatedLinkItem[] => {
  const words = `${serviceTitle} ${serviceSlug}`
    .toLowerCase()
    .split(/[^a-z]+/)
    .filter((w) => w.length > 3);
  const scored = blogPosts
    .map((p) => {
      const hay = `${p.title} ${p.slug} ${p.category ?? ""}`.toLowerCase();
      const score = words.reduce((n, w) => (hay.includes(w) ? n + 1 : n), 0);
      return { p, score };
    })
    .sort((a, b) => b.score - a.score)
    .filter((x) => x.score > 0)
    .slice(0, limit);
  const picks = scored.length ? scored.map((x) => x.p) : blogPosts.slice(0, limit);
  return picks.map((p) => ({
    label: p.title,
    href: `/blog/${p.slug}`,
    description: p.excerpt?.slice(0, 120),
  }));
};

/** Top town landing pages to link from a service page. */
export const getServiceTownLinks = (limit = 4): RelatedLinkItem[] =>
  towns.slice(0, limit).map((t) => ({
    label: `${t.name}, NC`,
    href: `/service-areas/${t.slug}`,
    description: `Local crews serving ${t.name} in ${t.county}.`,
  }));

export const estimateLink: RelatedLinkItem = {
  label: "Request an Estimate",
  href: "/request-inspection",
  description: "Free, written scope from a Western NC team — 828-524-7773.",
};
