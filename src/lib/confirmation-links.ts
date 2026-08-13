import { blogPosts } from "@/data/blogs";
import { projectDetails } from "@/data/projects";

export type LeadCategory = "roofing" | "construction";

export interface ConfirmationLink {
  label: string;
  path: string;
  description: string;
}

const normalize = (v?: string | null) =>
  (v ?? "").toLowerCase().replace(/,.*$/, "").trim();

/** One relevant project story — matched on town first, then category. */
export function pickProjectLink(opts: {
  town?: string | null;
  category?: LeadCategory;
}): ConfirmationLink {
  const town = normalize(opts.town);
  const category = opts.category ?? "roofing";
  const byTown = town
    ? projectDetails.find(
        (p) => normalize(p.location).includes(town) && p.category === category,
      ) ?? projectDetails.find((p) => normalize(p.location).includes(town))
    : undefined;
  const project = byTown ?? projectDetails.find((p) => p.category === category);

  if (!project) {
    return {
      label: "See recent Highlander projects",
      path: "/recent-projects",
      description: "Completed work across Western North Carolina.",
    };
  }

  return {
    label: `Project story: ${project.title}`,
    path: `/projects/${project.slug}`,
    description: `${project.type} · ${project.location}`,
  };
}

/**
 * Two relevant local project stories — town matches first, then same-category
 * work elsewhere in the mountains. Never returns duplicates.
 */
export function pickProjectLinks(opts: {
  town?: string | null;
  category?: LeadCategory;
  count?: number;
}): ConfirmationLink[] {
  const town = normalize(opts.town);
  const category = opts.category ?? "roofing";
  const count = opts.count ?? 2;

  const score = (p: (typeof projectDetails)[number]) => {
    const sameTown = town ? normalize(p.location).includes(town) : false;
    const sameCategory = p.category === category;
    if (sameTown && sameCategory) return 0;
    if (sameTown) return 1;
    if (sameCategory) return 2;
    return 3;
  };

  const ranked = [...projectDetails]
    .sort((a, b) => score(a) - score(b))
    .slice(0, count);

  if (!ranked.length) {
    return [
      {
        label: "See recent Highlander projects",
        path: "/recent-projects",
        description: "Completed work across Western North Carolina.",
      },
    ];
  }

  return ranked.map((project) => ({
    label: project.title,
    path: `/projects/${project.slug}`,
    description: `${project.type} · ${project.location}`,
  }));
}

/** One relevant local guide — town-specific when we have one. */
export function pickGuideLink(opts: { town?: string | null }): ConfirmationLink {
  const town = normalize(opts.town);
  const post =
    (town
      ? blogPosts.find(
          (p) => normalize(p.town) === town && p.category === "Local Guide",
        ) ?? blogPosts.find((p) => normalize(p.town) === town)
      : undefined) ??
    blogPosts.find(
      (p) => p.slug === "metal-roof-vs-shingle-roof-western-north-carolina",
    ) ??
    blogPosts[0];

  if (!post) {
    return {
      label: "Read our roofing guides",
      path: "/blog",
      description: "Mountain-specific roofing and construction advice.",
    };
  }

  return {
    label: post.title,
    path: `/blog/${post.slug}`,
    description: post.excerpt.slice(0, 120),
  };
}
