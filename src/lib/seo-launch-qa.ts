import { blogPosts } from "@/data/blogs";
import { projectDetails } from "@/data/projects";
import { services } from "@/data/services";
import { towns } from "@/data/towns";

export type QAStatus = "pass" | "warning" | "fail";
export type QACheckKey = "meta" | "canonical" | "breadcrumbs" | "schema" | "performance";
export type SEOPageType = "home" | "service" | "town" | "blog" | "commercial" | "landing" | "company" | "tool" | "gallery";

export interface AuditRoute {
  path: string;
  label: string;
  pageType: SEOPageType;
}

export interface CheckResult {
  key: QACheckKey;
  label: string;
  status: QAStatus;
  detail: string;
}

export interface PageAuditResult {
  path: string;
  label: string;
  pageType: SEOPageType;
  title: string;
  status: QAStatus;
  checks: CheckResult[];
  schemaTypes: string[];
  performance: {
    loadMs: number | null;
    firstContentfulPaintMs: number | null;
    imageCount: number;
    eagerImageCount: number;
  };
}

const directServiceRoutes = new Set(["commercial-roofing", "commercial-maintenance", "gutters", "outdoor-living", "construction-services"]);

const severityRank: Record<QAStatus, number> = { fail: 0, warning: 1, pass: 2 };

const getServicePath = (slug: string) => (directServiceRoutes.has(slug) ? `/${slug}` : `/services/${slug}`);

const staticRoutes: AuditRoute[] = [
  { path: "/", label: "Homepage", pageType: "home" },
  { path: "/roofing", label: "Roofing Division", pageType: "service" },
  { path: "/roofing/residential", label: "Residential Roofing", pageType: "service" },
  { path: "/roofing/roof-replacement", label: "Roof Replacement", pageType: "service" },
  { path: "/roofing/roof-repair", label: "Roof Repair", pageType: "service" },
  { path: "/roofing/storm-damage", label: "Storm Damage", pageType: "service" },
  { path: "/roofing/commercial", label: "Commercial Roofing", pageType: "commercial" },
  { path: "/roofing/specialty", label: "Specialty Roofing", pageType: "service" },
  { path: "/construction", label: "Construction Division", pageType: "service" },
  { path: "/construction/additions", label: "Home Additions", pageType: "service" },
  { path: "/construction/renovations", label: "Renovations", pageType: "service" },
  { path: "/construction/exterior", label: "Exterior Improvements", pageType: "service" },
  { path: "/construction/outdoor-living", label: "Outdoor Living (Division)", pageType: "service" },
  { path: "/construction/custom", label: "Custom Construction", pageType: "service" },
  { path: "/services", label: "Services Overview", pageType: "service" },
  { path: "/service-areas", label: "Service Areas", pageType: "town" },
  { path: "/blog", label: "Blog Index", pageType: "blog" },
  { path: "/gallery", label: "Gallery", pageType: "gallery" },
  { path: "/about", label: "About", pageType: "company" },
  { path: "/team", label: "Team", pageType: "company" },
  { path: "/certifications", label: "Certifications", pageType: "company" },
  { path: "/reviews", label: "Reviews", pageType: "company" },
  { path: "/careers", label: "Careers", pageType: "company" },
  { path: "/financing", label: "Financing", pageType: "company" },
  { path: "/request-inspection", label: "Request Inspection", pageType: "tool" },
  { path: "/free-tools", label: "Free Tools", pageType: "tool" },
  { path: "/roof-designer", label: "Roof Designer", pageType: "tool" },
  { path: "/storm-center", label: "Storm Center", pageType: "tool" },
  { path: "/contact", label: "Contact", pageType: "company" },
  { path: "/lp/roof-repair", label: "Paid Ads: Roof Repair", pageType: "landing" },
  { path: "/lp/roof-replacement", label: "Paid Ads: Roof Replacement", pageType: "landing" },
  { path: "/lp/storm-damage", label: "Paid Ads: Storm Damage", pageType: "landing" },
];

const dynamicRoutes: AuditRoute[] = [
  ...services.map((service) => ({ path: getServicePath(service.slug), label: service.title, pageType: service.slug.includes("commercial") ? "commercial" : "service" as SEOPageType })),
  ...towns.map((town) => ({ path: `/service-areas/${town.slug}`, label: `${town.name}, ${town.state}`, pageType: "town" as SEOPageType })),
  ...blogPosts.map((post) => ({ path: `/blog/${post.slug}`, label: post.title, pageType: "blog" as SEOPageType })),
  ...projectDetails.map((project) => ({ path: `/projects/${project.slug}`, label: project.title, pageType: "gallery" as SEOPageType })),
];

export const seoAuditRoutes: AuditRoute[] = Array.from(
  new Map([...staticRoutes, ...dynamicRoutes].map((route) => [route.path, route])).values(),
);

const toArray = <T,>(value: T | T[] | undefined) => (Array.isArray(value) ? value : value ? [value] : []);

const getStatus = (...statuses: QAStatus[]): QAStatus =>
  statuses.sort((a, b) => severityRank[a] - severityRank[b])[0] ?? "pass";

const getExpectedBreadcrumbs = (pageType: SEOPageType) => pageType !== "home";

const getExpectedSchemaTypes = (pageType: SEOPageType) => {
  switch (pageType) {
    case "home":
      return ["RoofingContractor", "LocalBusiness", "WebSite", "BreadcrumbList"];
    case "service":
    case "commercial":
    case "landing":
      return ["Service", "BreadcrumbList"];
    case "town":
      return ["LocalBusiness", "BreadcrumbList"];
    case "blog":
      return ["Article", "BreadcrumbList"];
    case "tool":
      return ["BreadcrumbList"];
    default:
      return ["BreadcrumbList"];
  }
};

const getSchemaTypes = (parsed: Record<string, unknown>[]) =>
  parsed.flatMap((entry) => toArray(entry["@type"] as string | string[] | undefined)).filter(Boolean) as string[];

const parseJsonLd = (doc: Document) => {
  const scripts = Array.from(doc.querySelectorAll('script[type="application/ld+json"]'));
  const parsed: Record<string, unknown>[] = [];
  const errors: string[] = [];

  scripts.forEach((script) => {
    try {
      const data = JSON.parse(script.textContent || "null");
      if (Array.isArray(data)) {
        parsed.push(...data.filter(Boolean));
      } else if (data) {
        parsed.push(data);
      }
    } catch {
      errors.push("Invalid JSON-LD JSON detected.");
    }
  });

  return { parsed, errors };
};

export const auditRenderedPage = (doc: Document, page: AuditRoute, win?: Window): PageAuditResult => {
  const title = doc.title.trim();
  const description = (doc.querySelector('meta[name="description"]') as HTMLMetaElement | null)?.content?.trim() || "";
  const canonical = (doc.querySelector('link[rel="canonical"]') as HTMLLinkElement | null)?.href?.trim() || "";
  const h1Count = doc.querySelectorAll("h1").length;
  const visibleBreadcrumbs = Boolean(doc.querySelector("nav[aria-label*='breadcrumb' i], nav.breadcrumbs, [data-breadcrumbs='true']"));
  const { parsed, errors } = parseJsonLd(doc);
  const schemaTypes = getSchemaTypes(parsed);
  const breadcrumbSchemaPresent = schemaTypes.includes("BreadcrumbList");
  // Canonicals are emitted in the trailing-slash form the server serves.
  const expectedCanonical = `${window.location.origin}${page.path === "/" ? "/" : `${page.path.replace(/\/+$/, "")}/`}`;
  const images = Array.from(doc.images);
  const eagerImageCount = images.filter((image) => (image.getAttribute("loading") || "eager") !== "lazy").length;

  const navEntry = win?.performance?.getEntriesByType("navigation")?.[0] as PerformanceNavigationTiming | undefined;
  const paintEntries = win?.performance?.getEntriesByType("paint") || [];
  const firstContentfulPaint = paintEntries.find((entry) => entry.name === "first-contentful-paint")?.startTime ?? null;
  const loadMs = navEntry?.loadEventEnd ? Math.round(navEntry.loadEventEnd) : null;

  const metaStatus: QAStatus = !title || !description || h1Count !== 1
    ? "fail"
    : title.length > 60 || description.length > 160
      ? "warning"
      : "pass";

  const canonicalStatus: QAStatus = !canonical
    ? "fail"
    : canonical !== expectedCanonical
      ? "warning"
      : "pass";

  const breadcrumbStatus: QAStatus = getExpectedBreadcrumbs(page.pageType)
    ? breadcrumbSchemaPresent || visibleBreadcrumbs
      ? "pass"
      : "fail"
    : breadcrumbSchemaPresent
      ? "pass"
      : "warning";

  const expectedTypes = getExpectedSchemaTypes(page.pageType);
  const missingTypes = expectedTypes.filter((type) => !schemaTypes.includes(type));
  const invalidEntries = parsed.filter((entry) => !entry["@context"] || !entry["@type"]);
  const schemaStatus: QAStatus = errors.length > 0 || invalidEntries.length > 0 || missingTypes.length === expectedTypes.length
    ? "fail"
    : missingTypes.length > 0
      ? "warning"
      : "pass";

  const performanceStatus: QAStatus = loadMs === null
    ? eagerImageCount > 4
      ? "warning"
      : "pass"
    : loadMs > 4000 || eagerImageCount > 5
      ? "fail"
      : loadMs > 2500 || eagerImageCount > 3
        ? "warning"
        : "pass";

  const checks: CheckResult[] = [
    {
      key: "meta",
      label: "Meta tags",
      status: metaStatus,
      detail: !title || !description
        ? "Missing title or meta description."
        : h1Count !== 1
          ? `Expected exactly one H1, found ${h1Count}.`
          : title.length > 60 || description.length > 160
            ? `Title (${title.length}) or description (${description.length}) is longer than target limits.`
            : `Title, description, and single H1 look healthy.`,
    },
    {
      key: "canonical",
      label: "Canonical tag",
      status: canonicalStatus,
      detail: !canonical
        ? "Canonical tag is missing."
        : canonical !== expectedCanonical
          ? `Canonical points to ${canonical} instead of ${expectedCanonical}.`
          : "Canonical tag matches the audited URL.",
    },
    {
      key: "breadcrumbs",
      label: "Breadcrumb signal",
      status: breadcrumbStatus,
      detail: breadcrumbSchemaPresent
        ? "BreadcrumbList schema is present."
        : visibleBreadcrumbs
          ? "Visible breadcrumb navigation is present."
          : "No breadcrumb signal detected for this page.",
    },
    {
      key: "schema",
      label: "Schema presence & validity",
      status: schemaStatus,
      detail: errors.length > 0
        ? errors.join(" ")
        : invalidEntries.length > 0
          ? "One or more JSON-LD blocks are missing @context or @type."
          : missingTypes.length > 0
            ? `Missing expected schema type(s): ${missingTypes.join(", ")}.`
            : `Detected schema types: ${schemaTypes.join(", ")}.`,
    },
    {
      key: "performance",
      label: "Performance basics",
      status: performanceStatus,
      detail: `Load ${loadMs ?? "n/a"}ms · FCP ${firstContentfulPaint ? Math.round(firstContentfulPaint) : "n/a"}ms · ${images.length} image(s) · ${eagerImageCount} eager image(s).`,
    },
  ];

  return {
    path: page.path,
    label: page.label,
    pageType: page.pageType,
    title,
    status: getStatus(...checks.map((check) => check.status)),
    checks,
    schemaTypes,
    performance: {
      loadMs,
      firstContentfulPaintMs: firstContentfulPaint ? Math.round(firstContentfulPaint) : null,
      imageCount: images.length,
      eagerImageCount,
    },
  };
};

export const buildSEOAuditCsv = (results: PageAuditResult[]) => {
  const rows = [
    ["URL", "Label", "Page Type", "Overall Status", "Title", "Meta", "Canonical", "Breadcrumbs", "Schema", "Performance", "Schema Types", "Load (ms)", "FCP (ms)", "Images", "Eager Images"],
    ...results.map((result) => [
      result.path,
      result.label,
      result.pageType,
      result.status,
      result.title,
      result.checks.find((check) => check.key === "meta")?.status ?? "",
      result.checks.find((check) => check.key === "canonical")?.status ?? "",
      result.checks.find((check) => check.key === "breadcrumbs")?.status ?? "",
      result.checks.find((check) => check.key === "schema")?.status ?? "",
      result.checks.find((check) => check.key === "performance")?.status ?? "",
      result.schemaTypes.join(" | "),
      result.performance.loadMs ?? "",
      result.performance.firstContentfulPaintMs ?? "",
      result.performance.imageCount,
      result.performance.eagerImageCount,
    ]),
  ];

  return rows
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");
};