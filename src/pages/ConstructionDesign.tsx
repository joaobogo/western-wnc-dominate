import FastLeadForm from "@/components/FastLeadForm";
import { ConstructionServicePage } from "@/components/construction-page";
import { designContent as c } from "@/content/construction/design";

/** /construction/design on the construction template (John's plan, Phase 4, 22 Nov 2026). Words live in src/content/construction/design.ts. */
const ConstructionDesign = () => (
  <ConstructionServicePage
    c={c}
    serviceType="Home Addition & Remodel Design"
    form={<FastLeadForm ctaLabel="Get My Written Scope" serviceLabel="Design & Planning" serviceCategory="construction" eyebrow="Written scope · no obligation" heading="Get My Written Scope" />}
  />
);

export default ConstructionDesign;
