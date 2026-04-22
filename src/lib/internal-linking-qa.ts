import { blogPosts } from "@/data/blogs";
import { services } from "@/data/services";
import { towns } from "@/data/towns";

export type QASeverity = "pass" | "warning" | "fail";
export type QACategory = "service" | "town" | "blog" | "template";

export interface QAAuditItem {
  id: string;
  category: QACategory;
  name: string;
  path: string;
  severity: QASeverity;
  summary: string;
  recommendation: string;
  supportingLinks: string[];
}

export interface InternalLinkingReport {
  summary: {
    total: number;
    passes: number;
    warnings: number;
    failures: number;
  };
  countsByCategory: Record<QACategory, number>;
  items: QAAuditItem[];
}

const directServiceRoutes = new Set([
  "commercial-roofing",
  "commercial-maintenance",
  "gutters",
  "outdoor-living",
  "construction-services",
]);

const getServicePath = (slug: string) =>
  directServiceRoutes.has(slug) ? `/${slug}` : `/services/${slug}`;

const normalizePath = (path: string) => path.replace(/\/$/, "");

const severityRank: Record<QASeverity, number> = {
  fail: 0,
  warning: 1,
  pass: 2,
};

const getServiceAudits = (): QAAuditItem[] =>
  services.map((service) => {
    const path = getServicePath(service.slug);
    const linkedBlogs = blogPosts.filter((post) =>
      post.relatedServices?.some((related) => normalizePath(related.path) === normalizePath(path)),
    );

    let severity: QASeverity = "pass";
    let summary = `Supported by ${linkedBlogs.length} blog post${linkedBlogs.length === 1 ? "" : "s"} and already linked to towns plus sibling services in the template.`;
    let recommendation = "Keep at least two supporting blog links live before launch.";

    if (linkedBlogs.length === 0) {
      severity = "fail";
      summary = "No blog posts explicitly link into this service page.";
      recommendation = "Add 2–3 blog posts with contextual service links, or add this service to existing related service blocks.";
    } else if (linkedBlogs.length === 1) {
      severity = "warning";
      summary = "Only one blog post explicitly links into this service page.";
      recommendation = "Add another supporting article or strengthen topical coverage with a second contextual link.";
    }

    return {
      id: `service-${service.slug}`,
      category: "service",
      name: service.title,
      path,
      severity,
      summary,
      recommendation,
      supportingLinks: linkedBlogs.map((post) => `/blog/${post.slug}`),
    };
  });

const getTownAudits = (): QAAuditItem[] =>
  towns.map((town) => {
    const path = `/service-areas/${town.slug}`;
    const localBlogs = blogPosts.filter((post) => post.town === town.name);

    if (localBlogs.length === 0) {
      return {
        id: `town-${town.slug}`,
        category: "town",
        name: town.name,
        path,
        severity: "fail",
        summary: "No town-specific blog post currently supports this town page.",
        recommendation: "Publish at least one local article and link it back to this town page before launch.",
        supportingLinks: [],
      };
    }

    return {
      id: `town-${town.slug}`,
      category: "town",
      name: town.name,
      path,
      severity: "warning",
      summary: `${localBlogs.length} local blog post${localBlogs.length === 1 ? "" : "s"} exist, but the town page template does not currently surface article links.`,
      recommendation: "Add a local articles block on town pages so nearby blog content reinforces location authority.",
      supportingLinks: localBlogs.map((post) => `/blog/${post.slug}`),
    };
  });

const getBlogAudits = (): QAAuditItem[] =>
  blogPosts.map((post) => {
    const relatedServices = post.relatedServices ?? [];
    const supportingLinks = relatedServices.map((service) => service.path);
    const townPath = post.town
      ? `/service-areas/${towns.find((town) => town.name === post.town)?.slug ?? ""}`
      : null;

    if (relatedServices.length === 0 && !townPath) {
      return {
        id: `blog-${post.slug}`,
        category: "blog",
        name: post.title,
        path: `/blog/${post.slug}`,
        severity: "fail",
        summary: "This article does not expose any structured internal link target to a service or town page.",
        recommendation: "Add a related services module or direct in-article CTA to the most relevant service page.",
        supportingLinks: [],
      };
    }

    if (relatedServices.length === 0 && townPath) {
      return {
        id: `blog-${post.slug}`,
        category: "blog",
        name: post.title,
        path: `/blog/${post.slug}`,
        severity: "warning",
        summary: "This town-focused article mentions a location but only has implied town relevance, not an explicit service link module.",
        recommendation: "Add at least one related service CTA and a direct town page link for stronger internal-linking flow.",
        supportingLinks: [townPath],
      };
    }

    if (relatedServices.length === 1 || townPath) {
      return {
        id: `blog-${post.slug}`,
        category: "blog",
        name: post.title,
        path: `/blog/${post.slug}`,
        severity: "warning",
        summary: townPath
          ? "This article has service support, but town-specific relevance is not surfaced as a dedicated internal link module."
          : "This article only links to one service page through its related services block.",
        recommendation: townPath
          ? "Add a visible link to the matching town page and keep two service links when possible."
          : "Expand the related services block or add one more contextual service link in the article body.",
        supportingLinks: townPath ? [...supportingLinks, townPath] : supportingLinks,
      };
    }

    return {
      id: `blog-${post.slug}`,
      category: "blog",
      name: post.title,
      path: `/blog/${post.slug}`,
      severity: "pass",
      summary: "This article has strong service-link support and can feed internal authority into conversion pages.",
      recommendation: "Keep related services aligned with the article topic as content expands.",
      supportingLinks,
    };
  });

const getTemplateAudits = (): QAAuditItem[] => [
  {
    id: "template-service",
    category: "template",
    name: "Service page template",
    path: "/services/:slug",
    severity: "warning",
    summary: "Service pages link to towns and sibling services, but they do not currently surface supporting blog articles.",
    recommendation: "Add a supporting articles rail or contextual educational links near FAQs or the closing CTA.",
    supportingLinks: [],
  },
  {
    id: "template-town",
    category: "template",
    name: "Town page template",
    path: "/service-areas/:slug",
    severity: "fail",
    summary: "Town pages link to services and nearby towns, but they have no local article block to reinforce town-specific topical authority.",
    recommendation: "Add a local articles section on each town page before launch, especially where town-specific blog content already exists.",
    supportingLinks: [],
  },
  {
    id: "template-blog",
    category: "template",
    name: "Blog post template",
    path: "/blog/:slug",
    severity: "warning",
    summary: "Blog posts can show related services, but there is no dedicated town-page CTA pattern for location-specific articles.",
    recommendation: "For posts with a town value, add a visible town-page CTA or local service-area block.",
    supportingLinks: [],
  },
];

export const generateInternalLinkingReport = (): InternalLinkingReport => {
  const items = [
    ...getTemplateAudits(),
    ...getServiceAudits(),
    ...getTownAudits(),
    ...getBlogAudits(),
  ].sort((a, b) => {
    const severityDiff = severityRank[a.severity] - severityRank[b.severity];
    if (severityDiff !== 0) return severityDiff;
    return a.name.localeCompare(b.name);
  });

  const passes = items.filter((item) => item.severity === "pass").length;
  const warnings = items.filter((item) => item.severity === "warning").length;
  const failures = items.filter((item) => item.severity === "fail").length;

  return {
    summary: {
      total: items.length,
      passes,
      warnings,
      failures,
    },
    countsByCategory: {
      service: items.filter((item) => item.category === "service").length,
      town: items.filter((item) => item.category === "town").length,
      blog: items.filter((item) => item.category === "blog").length,
      template: items.filter((item) => item.category === "template").length,
    },
    items,
  };
};