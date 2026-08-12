import RelatedLinks from "@/components/RelatedLinks";
import {
  getServiceBlogLinks,
  getServiceTownLinks,
  estimateLink,
} from "@/lib/internal-links";

interface ServiceInternalLinksProps {
  title: string;
  slug: string;
}

/**
 * Contextual internal-linking block for service pages:
 * related blogs, top town landing pages, and the estimate form.
 */
const ServiceInternalLinks = ({ title, slug }: ServiceInternalLinksProps) => (
  <RelatedLinks
    eyebrow="Keep Exploring"
    heading={`Related reading and local coverage for ${title}`}
    columns={2}
    links={[
      ...getServiceBlogLinks(title, slug, 3),
      ...getServiceTownLinks(4),
      {
        label: "All Service Areas",
        href: "/service-areas",
        description: "Every Western North Carolina town we cover.",
      },
      estimateLink,
    ]}
  />
);

export default ServiceInternalLinks;
