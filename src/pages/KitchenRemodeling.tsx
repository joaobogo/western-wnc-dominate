import FastLeadForm from "@/components/FastLeadForm";
import { ConstructionServicePage } from "@/components/construction-page";
import { kitchenContent as c } from "@/content/construction/kitchen";

/** /construction/kitchen-remodeling on the construction template (John's plan, Phase 3, 22 Nov 2026). Words live in src/content/construction/kitchen.ts. */
const KitchenRemodeling = () => (
  <ConstructionServicePage
    c={c}
    serviceType="Kitchen Remodeling"
    form={<FastLeadForm ctaLabel="Get My Written Scope" serviceLabel="Kitchen Remodeling" serviceCategory="construction" eyebrow="Written scope · no obligation" heading="Get My Written Scope" />}
  />
);

export default KitchenRemodeling;
