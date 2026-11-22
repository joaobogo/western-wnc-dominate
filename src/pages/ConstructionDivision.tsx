import SEOHead, { serviceSchema, faqSchema, breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import AnswerBlock from "@/components/seo/AnswerBlock";
import WorkGallerySection from "@/components/gallery/WorkGallerySection";
import ProjectSpotlight from "@/components/conversion/ProjectSpotlight";
import TownServiceLinks from "@/components/seo/TownServiceLinks";
import RelatedLinks from "@/components/RelatedLinks";
import FastLeadForm from "@/components/FastLeadForm";
import {
  ConstructionHero,
  ServiceCards,
  IconCards,
  HowItWorks,
  ConstructionReviews,
  FaqAccordion,
  FinalCtaBand,
} from "@/components/construction-page";
import { hubContent as c } from "@/content/construction/hub";

/**
 * /construction hub, rebuilt on the construction template (John's plan,
 * Phase 2, 22 Nov 2026). Order: hero → quick answer → gallery → service
 * cards → "roofer that builds" cards → two documented projects → how it
 * works → reviews → FAQ → final call band → related. Two CTA blocks in the
 * body (hero + final band) plus the sticky call bar. All words live in
 * src/content/construction/hub.ts.
 */
const ConstructionDivision = () => (
  <>
    <SEOHead
      title={c.title}
      description={c.description}
      path={c.path}
      jsonLd={[
        serviceSchema({
          name: "General Contractor",
          description: "Home additions, porches, decks, kitchens, baths and renovations in Franklin and Western NC.",
          url: c.path,
          areaServedCities: c.areaServed,
        }),
        breadcrumbSchema(c.breadcrumbs),
        faqSchema(c.faqs),
      ]}
    />
    <Header />
    <PageBreadcrumbs items={c.breadcrumbs} />
    <main id="main-content">
      <ConstructionHero hero={c.hero} />
      <AnswerBlock question={c.quickAnswer.question} answer={c.quickAnswer.answer} />
      {c.gallery && (
        <WorkGallerySection
          eyebrow="Recent construction"
          heading={c.gallery.heading}
          body={c.gallery.body}
          division="construction"
          limit={c.gallery.limit}
          mobileTwoUp
        />
      )}
      {c.serviceCards && <ServiceCards {...c.serviceCards} />}
      {c.included && <IconCards {...c.included} />}
      {c.featuredProjects && (
        <ProjectSpotlight eyebrow="Documented projects" heading={c.featuredProjects.heading} slugs={["living-room-addition-franklin", "deck-railing-rebuild-sylva"]} />
      )}
      <HowItWorks />
      <ConstructionReviews />
      <FaqAccordion faqs={c.faqs} />
      <FinalCtaBand service={c.serviceName}>
        <FastLeadForm
          ctaLabel="Get My Written Scope"
          serviceLabel="Construction project"
          serviceCategory="construction"
          eyebrow="Written scope · no obligation"
          heading="Get My Written Scope"
        />
      </FinalCtaBand>
      <RelatedLinks eyebrow="Also from Highlander" heading="More construction services" links={c.related} columns={3} />
      <TownServiceLinks
        service="construction"
        label="construction"
        heading="Construction by town"
        intro="Local building conditions, permit notes and the nearest showroom for each town."
      />
    </main>
    <Footer />
    <StickyMobileCTA />
  </>
);

export default ConstructionDivision;
