import { PHONE_PLAIN } from "@/data/business";
import { towns, type TownData } from "@/data/towns";
import { counties } from "@/data/counties";
import { linkableBlogPosts, type BlogPost } from "@/data/blogs";
import { getServiceTownEntriesForTown, serviceTownHref } from "@/data/service-town-content";
import { projectDetails, type ProjectDetail } from "@/data/projects";
import type { RelatedLinkItem } from "@/components/RelatedLinks";
import { countySlug } from "@/lib/internal-links";

export interface LinkGroup {
  title: string;
  links: RelatedLinkItem[];
}

/**
 * Shared geographic adjacency for Western NC towns. Single source of truth so
 * the nearby-town module and every cross-linking block agree.
 */
export const TOWN_ADJACENCY: Record<string, string[]> = {
  "highlands-nc": ["cashiers-nc", "franklin-nc", "scaly-mountain-nc", "lake-glenville-nc"],
  "cashiers-nc": ["highlands-nc", "sapphire-nc", "lake-glenville-nc", "sylva-nc"],
  "franklin-nc": ["highlands-nc", "otto-nc", "sylva-nc", "cashiers-nc"],
  "sylva-nc": ["dillsboro-nc", "cullowhee-nc", "cashiers-nc", "waynesville-nc"],
  "dillsboro-nc": ["sylva-nc", "cullowhee-nc", "bryson-city-nc", "waynesville-nc"],
  "cullowhee-nc": ["sylva-nc", "dillsboro-nc", "cashiers-nc", "waynesville-nc"],
  "bryson-city-nc": ["cherokee-nc", "dillsboro-nc", "sylva-nc", "waynesville-nc"],
  "cherokee-nc": ["bryson-city-nc", "sylva-nc", "waynesville-nc", "dillsboro-nc"],
  "waynesville-nc": ["sylva-nc", "asheville-nc", "hendersonville-nc", "bryson-city-nc"],
  "asheville-nc": ["hendersonville-nc", "waynesville-nc", "brevard-nc", "sylva-nc"],
  "hendersonville-nc": ["asheville-nc", "brevard-nc", "waynesville-nc", "sapphire-nc"],
  "brevard-nc": ["hendersonville-nc", "lake-toxaway-nc", "sapphire-nc", "asheville-nc"],
  "lake-toxaway-nc": ["sapphire-nc", "cashiers-nc", "brevard-nc", "lake-glenville-nc"],
  "sapphire-nc": ["cashiers-nc", "lake-toxaway-nc", "highlands-nc", "lake-glenville-nc"],
  "lake-glenville-nc": ["cashiers-nc", "highlands-nc", "sylva-nc", "sapphire-nc"],
  "scaly-mountain-nc": ["highlands-nc", "franklin-nc", "otto-nc", "cashiers-nc"],
  "otto-nc": ["franklin-nc", "highlands-nc", "scaly-mountain-nc", "hayesville-nc"],
  "hayesville-nc": ["murphy-nc", "franklin-nc", "otto-nc", "cherokee-nc"],
  "murphy-nc": ["hayesville-nc", "cherokee-nc", "franklin-nc", "bryson-city-nc"],
};

export const getNeighborTowns = (townSlug: string, limit = 4): TownData[] => {
  const current = towns.find((t) => t.slug === townSlug);
  if (!current) return [];
  const curated = (TOWN_ADJACENCY[townSlug] ?? [])
    .map((s) => towns.find((t) => t.slug === s))
    .filter((t): t is TownData => !!t);
  const seen = new Set([townSlug, ...curated.map((t) => t.slug)]);
  const sameCounty = towns.filter(
    (t) => t.county === current.county && !seen.has(t.slug),
  );
  sameCounty.forEach((t) => seen.add(t.slug));
  const rest = towns.filter((t) => !seen.has(t.slug));
  return [...curated, ...sameCounty, ...rest].slice(0, limit);
};

const townLink = (t: TownData): RelatedLinkItem => ({
  label: `Roofing & Construction in ${t.name}, NC`,
  href: `/service-areas/${t.slug}`,
  description: `${t.county} · ${t.elevation}`,
});

// Link equity goes to pages we want ranked: an indexable service × town page
// links to itself, a noindex one (generated coverage page, or a hand-written
// page outside the map-pack radius) sends the link to its parent division page.
const serviceTownLinks = (townSlug: string, exclude?: string): RelatedLinkItem[] =>
  getServiceTownEntriesForTown(townSlug)
    .filter((e) => e.serviceSlug !== exclude)
    .map((e) => ({
      label: e.h1.replace(/\s+\|.*$/, ""),
      href: serviceTownHref(townSlug, e.serviceSlug),
      description: e.metaDescription?.slice(0, 110),
    }));

const blogLink = (p: BlogPost): RelatedLinkItem => ({
  label: p.title,
  href: `/blog/${p.slug}`,
  description: p.excerpt?.slice(0, 120),
});

/** Blog posts tied to a town, then to its county neighbors, then general. */
export const getLocalBlogLinks = (town: TownData, limit = 4): RelatedLinkItem[] => {
  const local = linkableBlogPosts().filter((p) => p.town === town.name);
  const neighborNames = getNeighborTowns(town.slug).map((t) => t.name);
  const neighborly = linkableBlogPosts().filter(
    (p) => p.town && neighborNames.includes(p.town) && !local.includes(p),
  );
  const general = linkableBlogPosts().filter((p) => !p.town);
  return [...local, ...neighborly, ...general].slice(0, limit).map(blogLink);
};

/**
 * P4.1 — every core town page links to at least one real project. The nearest
 * completed project is chosen (in town → neighbouring town → same county →
 * anywhere) and always labelled with its true location; nothing is relocated.
 */
export const nearestProjectLink = (town: TownData): RelatedLinkItem | null => {
  const inTown = (p: ProjectDetail) => p.location.startsWith(`${town.name},`);
  const neighborNames = getNeighborTowns(town.slug).map((t) => t.name);
  const isNeighbor = (p: ProjectDetail) => neighborNames.some((n) => p.location.startsWith(`${n},`));
  const project =
    projectDetails.find(inTown) ??
    projectDetails.find(isNeighbor) ??
    projectDetails.find((p) => p.county === town.county) ??
    projectDetails[0];
  if (!project) return null;
  return {
    label: `${project.title} — ${project.location}`,
    href: `/projects/${project.slug}`,
    description: inTown(project)
      ? `Completed in ${town.name}. ${project.highlight || project.summary.slice(0, 100)}`
      : `Nearest completed project to ${town.name} — ${project.location}.`,
  };
};

/**
 * P4.1 — related posts chosen by walking FORWARD through publication order
 * from the current post (wrapping around) within the posts that share its
 * town or category. Every post in a cluster is then linked from the posts
 * before it, instead of the first four posts soaking up every inbound link.
 */
export const relatedPostsRing = (post: BlogPost, limit: number): BlogPost[] => {
  const all = linkableBlogPosts();
  const pool = all.filter(
    (p) => p.slug !== post.slug && (p.town === post.town || p.category === post.category),
  );
  if (pool.length <= limit) return pool;
  const idx = all.findIndex((p) => p.slug === post.slug);
  const distance = (p: BlogPost) => (all.indexOf(p) - idx + all.length) % all.length;
  return [...pool].sort((a, b) => distance(a) - distance(b)).slice(0, limit);
};

const countyLink = (county: string): RelatedLinkItem | null => {
  const slug = countySlug(county);
  const hub = counties.find((c) => c.slug === slug);
  if (!hub) return null;
  return {
    label: `${county} Roofing & Construction Hub`,
    href: `/service-areas/county/${slug}`,
    description: `Permitting, climate, and coverage across ${county}.`,
  };
};

const dedupe = (groups: LinkGroup[], currentPath?: string): LinkGroup[] => {
  const seen = new Set<string>(currentPath ? [currentPath] : []);
  return groups
    .map((g) => ({
      title: g.title,
      links: g.links.filter((l) => {
        if (!l || seen.has(l.href)) return false;
        seen.add(l.href);
        return true;
      }),
    }))
    .filter((g) => g.links.length > 0);
};

/** Full cross-link web for a town landing page. */
export const getTownLinkWeb = (town: TownData): LinkGroup[] =>
  dedupe(
    [
      {
        title: `Services in ${town.name}`,
        links: serviceTownLinks(town.slug).slice(0, 6),
      },
      {
        title: "Nearby Towns We Serve",
        links: getNeighborTowns(town.slug, 4).map(townLink),
      },
      {
        title: `${town.name} Field Guides`,
        links: getLocalBlogLinks(town, 4),
      },
      {
        title: `Recent Work Near ${town.name}`,
        links: [nearestProjectLink(town)].filter(Boolean) as RelatedLinkItem[],
      },
      {
        title: "Regional Coverage",
        links: [
          countyLink(town.county),
          { label: "All Western NC Service Areas", href: "/service-areas", description: "Every town and county we cover." },
          { label: "Roofing Division", href: "/roofing", description: "Repair, replacement, metal, and specialty systems." },
          { label: "Construction Division", href: "/construction", description: "Additions, renovations, and outdoor living." },
        ].filter(Boolean) as RelatedLinkItem[],
      },
    ],
    `/service-areas/${town.slug}`,
  );

/** Cross-link web for a town + service page. */
export const getServiceTownLinkWeb = (
  town: TownData,
  serviceSlug: string,
  serviceLabel: string,
  currentPath: string,
): LinkGroup[] => {
  const sameServiceNearby = getNeighborTowns(town.slug, 4)
    .filter((t) => getServiceTownEntriesForTown(t.slug).some((e) => e.serviceSlug === serviceSlug))
    .map((t) => ({
      label: `${serviceLabel} in ${t.name}, NC`,
      href: serviceTownHref(t.slug, serviceSlug),
      description: `${t.county} · ${t.elevation}`,
    }));

  return dedupe(
    [
      {
        title: `More ${town.name} Services`,
        links: serviceTownLinks(town.slug, serviceSlug).slice(0, 6),
      },
      {
        title: `${serviceLabel} Nearby`,
        links: sameServiceNearby,
      },
      {
        title: `${town.name} Field Guides`,
        links: getLocalBlogLinks(town, 3),
      },
      {
        title: "Hubs & Next Steps",
        links: [
          { label: `${town.name} Service Area Overview`, href: `/service-areas/${town.slug}`, description: `Everything we do in ${town.name}.` },
          countyLink(town.county),
          { label: "Get My Written Estimate", href: "/request-inspection", description: `Written scope from a Western NC team — ${PHONE_PLAIN}.` },
        ].filter(Boolean) as RelatedLinkItem[],
      },
    ],
    currentPath,
  );
};

/** Cross-link web for a county hub page. */
export const getCountyLinkWeb = (countyName: string, townNames: string[]): LinkGroup[] => {
  const countyTowns = towns.filter(
    (t) => t.county === countyName || townNames.includes(t.name),
  );
  const flagship = countyTowns.slice(0, 3);
  return dedupe(
    [
      { title: `Towns in ${countyName}`, links: countyTowns.map(townLink) },
      {
        title: "Popular Local Service Pages",
        links: flagship.flatMap((t) => serviceTownLinks(t.slug).slice(0, 2)),
      },
      {
        title: "Local Field Guides",
        links: flagship.flatMap((t) => getLocalBlogLinks(t, 2)).slice(0, 4),
      },
      {
        title: "Divisions & Next Steps",
        links: [
          { label: "Roofing Division", href: "/roofing", description: "Repair, replacement, metal, and specialty roofing." },
          { label: "Construction Division", href: "/construction", description: "Additions, renovations, outdoor living." },
          { label: "All Service Areas", href: "/service-areas", description: "Every Western NC town we cover." },
          { label: "Get My Written Estimate", href: "/request-inspection", description: "Talk to a local project advisor." },
        ],
      },
    ],
    `/service-areas/county/${countySlug(countyName)}`,
  );
};

/** Cross-link web for a blog post, weighted to its town when it has one. */
export const getBlogLocalLinkWeb = (post: BlogPost): LinkGroup[] => {
  const town = towns.find((t) => t.name === post.town);
  const related = relatedPostsRing(post, 4).map(blogLink);

  if (!town) {
    return dedupe([
      { title: "Keep Reading", links: related },
      {
        title: "Where We Work",
        links: towns.slice(0, 4).map(townLink),
      },
      {
        title: "Services & Next Steps",
        links: [
          { label: "Roofing Division", href: "/roofing" },
          { label: "Construction Division", href: "/construction" },
          { label: "Get My Written Estimate", href: "/request-inspection" },
        ],
      },
    ], `/blog/${post.slug}`);
  }

  return dedupe(
    [
      { title: `${town.name} Services`, links: serviceTownLinks(town.slug).slice(0, 4) },
      { title: "Nearby Towns", links: getNeighborTowns(town.slug, 3).map(townLink) },
      { title: "Keep Reading", links: related },
      {
        title: "Hubs & Next Steps",
        links: [
          { label: `${town.name} Service Area`, href: `/service-areas/${town.slug}` },
          countyLink(town.county),
          { label: "Get My Written Estimate", href: "/request-inspection" },
        ].filter(Boolean) as RelatedLinkItem[],
      },
    ],
    `/blog/${post.slug}`,
  );
};
