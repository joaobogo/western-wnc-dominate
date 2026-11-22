import FastLeadForm from "@/components/FastLeadForm";
import { ConstructionServicePage } from "@/components/construction-page";
import { screenedPorchesContent as c } from "@/content/construction/screened-porches";

/** /construction/screened-porches on the construction template (John's plan, Phase 3, 22 Nov 2026). Words live in src/content/construction/screened-porches.ts. */
const ScreenedPorches = () => (
  <ConstructionServicePage
    c={c}
    serviceType="Screened Porch Construction"
    form={<FastLeadForm ctaLabel="Get My Written Scope" serviceLabel="Screened Porch" serviceCategory="construction" eyebrow="Written scope · no obligation" heading="Get My Written Scope" />}
  />
);

export default ScreenedPorches;
