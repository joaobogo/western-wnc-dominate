import { FRANKLIN_NAP, PHONE_PLAIN } from "@/data/business";
import AnswerBlock from "@/components/seo/AnswerBlock";
import { lazy, Suspense } from "react";
import SEOHead, { buildPageSchema } from "@/components/SEOHead";
import Section from "@/components/layout/Section";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CredibilityStrip from "@/components/home/CredibilityStrip";
import TartanBackground from "@/components/TartanBackground";

import ThreeDivisionPathway from "@/components/DualPathway";

import StickyMobileCTA from "@/components/StickyMobileCTA";
import SectionDivider from "@/components/SectionDivider";
import { customerReviews, GOOGLE_REVIEW_AGGREGATE } from "@/data/reviews";

/* Below-the-fold homepage sections — code-split so the first load only ships
   the hero, trust strip and shell. Each fallback reserves height to keep CLS at 0. */
const FeaturedProjects = lazy(() => import("@/components/FeaturedProjects"));
const AttributedReviews = lazy(() => import("@/components/trust/AttributedReviews"));
const ServiceAreaMap = lazy(() => import("@/components/ServiceAreaMap"));
const HomeFAQ = lazy(() => import("@/components/HomeFAQ"));
const PageCloseCTA = lazy(() => import("@/components/PageCloseCTA"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionFallback = ({ h = 480 }: { h?: number }) => (
  <div style={{ minHeight: h }} aria-hidden="true" />
);

const Index = () => {
  return (
    <>
      <SEOHead
        title="Roofing & Construction in Western NC | Highlander"
        description="Highlander Building Services: roofing, repairs, metal roofs, gutters, and custom builds across Franklin, Highlands, Cashiers & Western NC."
        path="/"
        keywords="Highlander Building Services, Highlander Building Services, roofing company Western NC, roofing contractor Western NC, roofing services Western North Carolina, roofing company Franklin NC, roof repair Western NC, roof replacement Western NC, metal roofing Western NC, roofing and construction Western NC, construction and roofing company Western NC, roofing company near Franklin NC, roofing contractor near Highlands NC, roofing contractor near Cashiers NC"
        // No aggregateRating here — rating markup is only emitted on /reviews,
        // where the same live Google figure is visible on the page.
        jsonLd={buildPageSchema({ type: "home" })}
      />
      <Header />
      <main id="main-content">
        {/* 1. Hero — The Highland standard */}
        <section id="hero" className="min-h-[100svh] no-header-pad">
          <Hero />
        </section>

        {/* 2. Tight three-item proof band */}
        <CredibilityStrip />

        <AnswerBlock
          question="Who is Highlander Building Services?"
          answer={`Highlander Building Services, Inc. is a roofing and construction company based at ${FRANKLIN_NAP}, serving Franklin, Highlands, Cashiers, Sylva, and the wider Western North Carolina mountains with roof repair, roof replacement, metal roofing, gutters, and custom construction.`}
          points={[
            "Roofing, exteriors, and construction under one contractor",
            "Serving Western North Carolina mountain towns",
            `Call ${PHONE_PLAIN} for a direct answer`,
            "Estimates scoped on site",
          ]}
        />

        <div className="relative overflow-hidden bg-background">
          <TartanBackground opacity={0.02} />
          <SectionDivider variant="diamond" />
        </div>

        {/* 3. Two-division split (surface-raised) */}
        <ThreeDivisionPathway paths="two" />

        <Suspense fallback={<SectionFallback h={1800} />}>
          {/* 4. Project showcase (light) */}
          <FeaturedProjects />

          {/* 5. Local proof band — dark tone, two attributable quotes */}
          <Section
            density="compact"
            width="tight"
            className="bg-[hsl(var(--dark-section))] text-dark-section-foreground"
          >
            <AttributedReviews heading="What Western NC homeowners say" tone="dark" />
          </Section>

          {/* 6. Local coverage (surface-raised) */}
          <ServiceAreaMap id="service-area" />

          {/* 7. FAQ (light) */}
          <HomeFAQ />

          {/* 8. One closing CTA */}
          <PageCloseCTA
            context="homepage"
            eyebrow="Gutter Season Resource"
            heading="Is your mountain home ready for fall?"
            body="Get the Pre-Fall Gutter Checklist for WNC homeowners or request an inspection to ensure your water-management system is clear and functional before the first heavy rain."
            primaryLabel="Read the Gutter Checklist"
            primaryTo="/blog/pre-fall-gutter-maintenance-checklist-mountain-homeowners"
            secondaryLabel="Get a Written Inspection Estimate"
            secondaryTo="/request-inspection"
          />
        </Suspense>

        <SectionDivider variant="gold-fade" />
      </main>
      <Suspense fallback={<SectionFallback h={600} />}>
        <Footer />
      </Suspense>
      <StickyMobileCTA />
    </>
  );
};

export default Index;
