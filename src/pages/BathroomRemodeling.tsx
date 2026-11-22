import FastLeadForm from "@/components/FastLeadForm";
import { ConstructionServicePage } from "@/components/construction-page";
import { bathContent as c } from "@/content/construction/bath";

/** /construction/bathroom-remodeling on the construction template (John's plan, Phase 3, 22 Nov 2026). Words live in src/content/construction/bath.ts. */
const BathroomRemodeling = () => (
  <ConstructionServicePage
    c={c}
    serviceType="Bathroom Remodeling"
    form={<FastLeadForm ctaLabel="Get My Written Scope" serviceLabel="Bathroom Remodeling" serviceCategory="construction" eyebrow="Written scope · no obligation" heading="Get My Written Scope" />}
  />
);

export default BathroomRemodeling;
