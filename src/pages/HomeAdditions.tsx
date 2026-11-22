import FastLeadForm from "@/components/FastLeadForm";
import { ConstructionServicePage } from "@/components/construction-page";
import ProjectSpotlight from "@/components/conversion/ProjectSpotlight";
import { additionsContent as c } from "@/content/construction/additions";

/** /construction/additions on the construction template (John's plan, Phase 3, 22 Nov 2026). Words live in src/content/construction/additions.ts. */
const HomeAdditions = () => (
  <ConstructionServicePage
    c={c}
    serviceType="Home Addition"
    form={<FastLeadForm ctaLabel="Get My Written Scope" serviceLabel="Home Addition Construction" serviceCategory="construction" eyebrow="Written scope · no obligation" heading="Get My Written Scope" />}
    featured={<ProjectSpotlight eyebrow="Documented project" heading={c.featuredProjects!.heading} slugs={["living-room-addition-franklin"]} />}
  />
);

export default HomeAdditions;
