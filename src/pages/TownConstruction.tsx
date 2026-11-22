import FastLeadForm from "@/components/FastLeadForm";
import { ConstructionServicePage } from "@/components/construction-page";
import ProjectSpotlight from "@/components/conversion/ProjectSpotlight";
import ShowroomVisitBlock from "@/components/locations/ShowroomVisitBlock";
import { nearestShowroom } from "@/data/showrooms";
import { TOWN_CONSTRUCTION } from "@/content/construction/towns";

/**
 * /service-areas/{franklin,highlands,cashiers,sylva}-nc/construction on the
 * construction template (John's plan, Phase 5, 22 Nov 2026): local building
 * conditions, only this town's jobs, the nearest showroom, and the three most
 * relevant service pages. Words live in src/content/construction/towns.ts.
 */
const TownConstruction = ({ slug }: { slug: string }) => {
  const c = TOWN_CONSTRUCTION.find((t) => t.townSlug === slug)!;
  return (
    <ConstructionServicePage
      c={c}
      serviceType="General Contractor"
      form={<FastLeadForm ctaLabel="Get My Written Scope" serviceLabel={`Construction in ${c.breadcrumbs[2].name}`} serviceCategory="construction" eyebrow="Written scope · no obligation" heading="Get My Written Scope" />}
      featured={c.projectSlug ? <ProjectSpotlight eyebrow="Documented project" heading="A local project, start to finish" slugs={[c.projectSlug]} /> : undefined}
      after={<ShowroomVisitBlock location={nearestShowroom(slug).location} />}
    />
  );
};

export default TownConstruction;
