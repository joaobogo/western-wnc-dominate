import FastLeadForm from "@/components/FastLeadForm";
import { ConstructionServicePage } from "@/components/construction-page";
import { basementsContent as c } from "@/content/construction/basements";

/** /construction/basements on the construction template (John's plan, Phase 4, 22 Nov 2026). Words live in src/content/construction/basements.ts. */
const Basements = () => (
  <ConstructionServicePage
    c={c}
    serviceType="Basement Finishing"
    form={<FastLeadForm ctaLabel="Get My Written Scope" serviceLabel="Basement Finishing" serviceCategory="construction" eyebrow="Written scope · no obligation" heading="Get My Written Scope" />}
  />
);

export default Basements;
