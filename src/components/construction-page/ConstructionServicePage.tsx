import type { ReactNode } from "react";
import AnswerBlock from "@/components/seo/AnswerBlock";
import WorkGallerySection from "@/components/gallery/WorkGallerySection";
import RelatedLinks from "@/components/RelatedLinks";
import type { ConstructionPageContent } from "@/content/construction/types";
import ConstructionPageShell from "./ConstructionPageShell";
import ConstructionHero from "./ConstructionHero";
import ExampleGallery from "./ExampleGallery";
import ServiceCards from "./ServiceCards";
import IconCards from "./IconCards";
import AngleBlock from "./AngleBlock";
import CostSection from "./CostSection";
import HowItWorks from "./HowItWorks";
import ConstructionReviews from "./ConstructionReviews";
import FaqAccordion from "./FaqAccordion";
import FinalCtaBand from "./FinalCtaBand";

interface Props {
  c: ConstructionPageContent;
  /** schema.org serviceType, e.g. "Home Addition". */
  serviceType: string;
  /** The 3-field form for the final band (each page sets its service tag). */
  form: ReactNode;
  /** Featured project block (ProjectSpotlight), when the service has a documented job. */
  featured?: ReactNode;
  /** Anything after the related links, e.g. town links. */
  after?: ReactNode;
}

/**
 * A construction service page on the template, in the plan's order:
 * hero → quick answer → gallery (real photos) or labelled design examples →
 * service cards → what's included → page angle → featured project → cost
 * (hidden until approved) → how it works → reviews → FAQ → final band →
 * related. Two CTA blocks in the body plus the sticky bar.
 */
const ConstructionServicePage = ({ c, serviceType, form, featured, after }: Props) => (
  <ConstructionPageShell c={c} serviceType={serviceType}>
    <ConstructionHero hero={c.hero} />
    <AnswerBlock question={c.quickAnswer.question} answer={c.quickAnswer.answer} />
    {c.gallery && (
      <WorkGallerySection
        eyebrow="Real Highlander work"
        heading={c.gallery.heading}
        body={c.gallery.body}
        division="construction"
        ids={c.gallery.ids}
        limit={c.gallery.limit ?? 12}
        mobileTwoUp
      />
    )}
    {c.examples && <ExampleGallery {...c.examples} />}
    {c.serviceCards && <ServiceCards {...c.serviceCards} />}
    {c.included && <IconCards {...c.included} />}
    {c.angle && <AngleBlock {...c.angle} />}
    {featured}
    {c.cost && <CostSection {...c.cost} />}
    <HowItWorks />
    <ConstructionReviews />
    <FaqAccordion faqs={c.faqs} />
    <FinalCtaBand service={c.serviceName}>{form}</FinalCtaBand>
    <RelatedLinks eyebrow="Also from Highlander" heading="Related services" links={c.related} columns={3} />
    {after}
  </ConstructionPageShell>
);

export default ConstructionServicePage;
