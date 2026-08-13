import type { BlogPost } from "@/data/blogs";
import { blogPosts } from "@/data/blogs";
import { projectDetails, type ProjectDetail } from "@/data/projects";

export interface InternalLink {
  label: string;
  path: string;
  description: string;
}

export interface BlogInternalLinks {
  cityPage: InternalLink;
  servicePage: InternalLink;
  relatedBlog: InternalLink | null;
  relatedProject: InternalLink | null;
  estimatePage: InternalLink;
}

const townSlug = (town: string) =>
  `${town.toLowerCase().trim().replace(/\s+/g, "-")}-nc`;

/**
 * Pick the most relevant service page for a post based on category and content signals.
 * Categories map to primary service routes; content keywords are a fallback tiebreaker.
 */
const pickServicePage = (post: BlogPost): InternalLink => {
  const cat = (post.category || "").toLowerCase();
  const hay = `${post.title} ${post.slug}`.toLowerCase();

  if (cat === "replacement" || hay.includes("replacement")) {
    return {
      label: `Roof Replacement${post.town ? ` in ${post.town}` : ""}`,
      path: "/roofing/roof-replacement",
      description: "Full tear-off and installation built for mountain weather.",
    };
  }
  if (cat === "repair" || hay.includes("repair") || hay.includes("leak")) {
    return {
      label: `Roof Repair${post.town ? ` in ${post.town}` : ""}`,
      path: "/roofing/roof-repair",
      description: "Fast, reliable repairs done right the first time.",
    };
  }
  if (cat === "storm damage" || cat === "storm" || hay.includes("storm") || hay.includes("hail") || hay.includes("wind")) {
    return {
      label: `Storm Damage Response${post.town ? ` in ${post.town}` : ""}`,
      path: "/roofing/storm-damage",
      description: "Emergency response, tarping, and insurance-ready documentation.",
    };
  }
  if (cat === "materials" || hay.includes("metal") || hay.includes("standing seam")) {
    return {
      label: `Metal Roofing${post.town ? ` in ${post.town}` : ""}`,
      path: "/roofing/metal",
      description: "Standing seam and metal systems engineered for WNC.",
    };
  }
  if (cat === "inspection" || cat === "inspections" || hay.includes("inspection")) {
    return {
      label: `Schedule a Roof Inspection${post.town ? ` in ${post.town}` : ""}`,
      path: "/request-inspection",
      description: "Written, photo-documented inspections by a local team.",
    };
  }
  if (cat === "construction" || hay.includes("construction") || hay.includes("renovation") || hay.includes("addition")) {
    return {
      label: `Construction & Renovations${post.town ? ` in ${post.town}` : ""}`,
      path: "/construction",
      description: "Additions, renovations, and exterior construction across WNC.",
    };
  }
  if (hay.includes("gutter") || hay.includes("drainage")) {
    return {
      label: `Seamless Gutters${post.town ? ` in ${post.town}` : ""}`,
      path: "/roofing/gutters",
      description: "Correctly sized, properly draining gutter systems.",
    };
  }
  return {
    label: `Roofing Services${post.town ? ` in ${post.town}` : ""}`,
    path: "/roofing",
    description: "Full roofing division serving Western North Carolina.",
  };
};

const pickRelatedBlog = (post: BlogPost): InternalLink | null => {
  const sameTown = blogPosts.find(
    (p) => p.slug !== post.slug && p.town === post.town && p.category !== post.category,
  );
  const fallback =
    sameTown ||
    blogPosts.find((p) => p.slug !== post.slug && p.town === post.town) ||
    blogPosts.find((p) => p.slug !== post.slug && p.category === post.category) ||
    blogPosts.find((p) => p.slug !== post.slug);
  if (!fallback) return null;
  return {
    label: fallback.title,
    path: `/blog/${fallback.slug}`,
    description: fallback.excerpt,
  };
};

const pickRelatedProject = (post: BlogPost): InternalLink | null => {
  const townMatch: ProjectDetail | undefined = post.town
    ? projectDetails.find((p) =>
        p.location.toLowerCase().includes(post.town!.toLowerCase()),
      )
    : undefined;
  const project =
    townMatch ||
    projectDetails.find((p) => p.category === "roofing") ||
    projectDetails[0];
  if (!project) return null;
  return {
    label: `${project.title} — ${project.location}`,
    path: `/projects/${project.slug}`,
    description: project.highlight || project.summary.slice(0, 140),
  };
};

export const getBlogInternalLinks = (post: BlogPost): BlogInternalLinks => {
  const town = post.town || "Western NC";
  const cityPath = post.town
    ? `/service-areas/${townSlug(post.town)}`
    : "/service-areas";
  return {
    cityPage: {
      label: `Roofing & Construction in ${town}`,
      path: cityPath,
      description: `Local services, projects, and coverage details for ${town}.`,
    },
    servicePage: pickServicePage(post),
    relatedBlog: pickRelatedBlog(post),
    relatedProject: pickRelatedProject(post),
    estimatePage: {
      label: `Get My Written Estimate${post.town ? ` in ${post.town}` : ""}`,
      path: "/consultation",
      description: "Free consultation with our Western NC team — no pressure.",
    },
  };
};