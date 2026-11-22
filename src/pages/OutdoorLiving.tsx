import FastLeadForm from "@/components/FastLeadForm";
import { ConstructionServicePage } from "@/components/construction-page";
import ProjectSpotlight from "@/components/conversion/ProjectSpotlight";
import TownServiceLinks from "@/components/seo/TownServiceLinks";
import { outdoorLivingContent as c } from "@/content/construction/outdoor-living";

/** /construction/outdoor-living on the construction template (John's plan, Phase 3, 22 Nov 2026). Words live in src/content/construction/outdoor-living.ts. */
const OutdoorLiving = () => (
  <ConstructionServicePage
    c={c}
    serviceType="Outdoor Living Construction"
    form={<FastLeadForm ctaLabel="Get My Written Scope" serviceLabel="Outdoor Living Project" serviceCategory="construction" eyebrow="Written scope · no obligation" heading="Get My Written Scope" />}
    featured={<ProjectSpotlight eyebrow="Documented project" heading={c.featuredProjects!.heading} slugs={["deck-railing-rebuild-sylva"]} />}
    after={<TownServiceLinks service="outdoor-living" label="outdoor living" heading="Porches and decks by town" intro="Local building conditions, permit notes and the nearest showroom for each town." />}
  />
);

export default OutdoorLiving;
