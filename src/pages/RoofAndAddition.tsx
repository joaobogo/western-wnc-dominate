import FastLeadForm from "@/components/FastLeadForm";
import { ConstructionServicePage } from "@/components/construction-page";
import ProjectSpotlight from "@/components/conversion/ProjectSpotlight";
import { roofAndAdditionContent as c } from "@/content/construction/roof-and-addition";

/** /construction/roof-and-addition on the construction template (John's plan, Phase 4, 22 Nov 2026). Words live in src/content/construction/roof-and-addition.ts. */
const RoofAndAddition = () => (
  <ConstructionServicePage
    c={c}
    serviceType="Home Addition with Roof Tie-In"
    form={<FastLeadForm ctaLabel="Get My Written Scope" serviceLabel="Roof and Addition" serviceCategory="construction" eyebrow="Written scope · no obligation" heading="Get My Written Scope" />}
    featured={<ProjectSpotlight eyebrow="Documented project" heading={c.featuredProjects!.heading} slugs={["living-room-addition-franklin"]} />}
  />
);

export default RoofAndAddition;
