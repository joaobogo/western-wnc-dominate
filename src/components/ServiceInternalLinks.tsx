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
  /** Construction pages lead with a consultation, never a roofing estimate. */
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
      ...(intent === "estimate"
        ? [
            {
              label: "Virtual Roof Designer",
              href: "/roof-designer",
              description: "Upload a photo of your home and preview roofing materials and colors before you decide.",
            },
          ]
        : []),
      intent === "consultation"
        ? {
            label: "Get My Project Scoped",
            href: "/construction/consultation",
            description: `A working session on scope, feasibility, and budget range — ${PHONE_PLAIN}.`,
          }
        : estimateLink,
    ]}
  />
);

export default ServiceInternalLinks;
