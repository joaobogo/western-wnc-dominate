import FastLeadForm from "@/components/FastLeadForm";
import { ConstructionServicePage } from "@/components/construction-page";
import ProjectSpotlight from "@/components/conversion/ProjectSpotlight";
import { decksContent as c } from "@/content/construction/decks";

/** /construction/decks on the construction template (John's plan, Phase 3, 22 Nov 2026). Words live in src/content/construction/decks.ts. */
const Decks = () => (
  <ConstructionServicePage
    c={c}
    serviceType="Deck Construction"
    form={<FastLeadForm ctaLabel="Get My Written Scope" serviceLabel="Deck" serviceCategory="construction" eyebrow="Written scope · no obligation" heading="Get My Written Scope" />}
    featured={<ProjectSpotlight eyebrow="Documented project" heading={c.featuredProjects!.heading} slugs={["deck-railing-rebuild-sylva"]} />}
  />
);

export default Decks;
