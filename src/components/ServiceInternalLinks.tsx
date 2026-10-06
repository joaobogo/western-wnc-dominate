import { PHONE_PLAIN } from "@/data/business";
import RelatedLinks from "@/components/RelatedLinks";
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
