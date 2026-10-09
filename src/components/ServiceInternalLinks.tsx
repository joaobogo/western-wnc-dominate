import { PHONE_PLAIN } from "@/data/business";
import RelatedLinks, { type RelatedLinkItem } from "@/components/RelatedLinks";
import {
  getServiceBlogLinks,
  getServiceTownLinks,
  estimateLink,
} from "@/lib/internal-links";

interface ServiceInternalLinksProps {
  title: string;
  slug: string;
  /** Construction pages use the same short first-contact form with construction intent preserved. */
  intent?: "estimate" | "consultation";
}

const ROOF_COST_LINK = {
  label: "Roof Replacement Cost in Western NC (2026)",
  href: "/roofing-cost-western-nc",
  description: "Material tiers, repair bands and what moves the price.",
};
const METAL_COST_LINK = {
  label: "Metal Roofing Cost in Western NC (2026)",
  href: "/roofing/metal/cost",
  description: "Price ranges per square for each metal system.",
};
const GUTTERS_LINK = {
  label: "Seamless Gutters & Gutter Guards",
  href: "/roofing/gutters",
  description: "Sized for mountain rainfall and installed with the roof.",
};
const RENOVATIONS_LINK = {
  label: "Home Renovations in Western NC",
  href: "/construction/renovations",
  description: "Kitchens, baths, basements and whole-home work.",
};

/** Hand-picked links that the generic blog/town picker would not surface (cost and renovation pages were under-linked). */
const EXTRA_LINKS: Record<string, RelatedLinkItem[]> = {
  "roof-replacement": [ROOF_COST_LINK, METAL_COST_LINK, GUTTERS_LINK],
  "roof-repair": [ROOF_COST_LINK, GUTTERS_LINK],
  "storm-damage": [ROOF_COST_LINK, GUTTERS_LINK],
  "metal-roofing": [ROOF_COST_LINK, GUTTERS_LINK],
  gutters: [ROOF_COST_LINK],
  "residential-roofing": [ROOF_COST_LINK, GUTTERS_LINK],
  additions: [RENOVATIONS_LINK],
  "outdoor-living": [RENOVATIONS_LINK],
  design: [RENOVATIONS_LINK],
  construction: [RENOVATIONS_LINK],
  siding: [RENOVATIONS_LINK],
};

/**
 * Contextual internal-linking block for service pages:
 * related blogs, top town landing pages, and the estimate form.
 */
const ServiceInternalLinks = ({ title, slug, intent = "estimate" }: ServiceInternalLinksProps) => (
  <RelatedLinks
    eyebrow="Keep Exploring"
    heading={`Related reading and local coverage for ${title}`}
    columns={2}
    links={[
      ...getServiceBlogLinks(title, slug, 3),
      ...getServiceTownLinks(title, 4),
      ...(EXTRA_LINKS[slug] ?? []),
      {
        label: "All Service Areas",
        href: "/service-areas",
        description: "Every Western North Carolina town we cover.",
      },
      intent === "consultation"
        ? {
            label: "Discuss My Project",
            href: "/request-inspection?context=construction_internal&type=construction",
            description: `Start with the short contact form or call ${PHONE_PLAIN}; scope and qualification follow after contact.`,
          }
        : estimateLink,
    ]}
  />
);

export default ServiceInternalLinks;
