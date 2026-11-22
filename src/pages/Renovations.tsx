import FastLeadForm from "@/components/FastLeadForm";
import { ConstructionServicePage } from "@/components/construction-page";
import TownServiceLinks from "@/components/seo/TownServiceLinks";
import { renovationsContent as c } from "@/content/construction/renovations";

/** /construction/renovations on the construction template (John's plan, Phase 4, 22 Nov 2026). Words live in src/content/construction/renovations.ts. */
const Renovations = () => (
  <ConstructionServicePage
    c={c}
    serviceType="Home Renovation"
    form={<FastLeadForm ctaLabel="Get My Written Scope" serviceLabel="Home Renovation" serviceCategory="construction" eyebrow="Written scope · no obligation" heading="Get My Written Scope" />}
    after={<TownServiceLinks service="construction" label="construction" heading="Construction by town" intro="Local building conditions, permit notes and the nearest showroom for each town." />}
  />
);

export default Renovations;
