import AnswerBlock from "@/components/seo/AnswerBlock";
import { useState, lazy, Suspense } from "react";
import SEOHead, { buildPageSchema } from "@/components/SEOHead";
import Section from "@/components/layout/Section";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CredibilityStrip from "@/components/home/CredibilityStrip";
import TartanBackground from "@/components/TartanBackground";

import ThreeDivisionPathway from "@/components/DualPathway";

import StickyMobileCTA from "@/components/StickyMobileCTA";
import SectionDivider from "@/components/SectionDivider";
import SiteLoader from "@/components/SiteLoader";
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
  const [showLoader, setShowLoader] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem("hl_loader_seen");
  });

  const handleLoaderComplete = () => {
    sessionStorage.setItem("hl_loader_seen", "1");
    setShowLoader(false);
  };

  return (
    <>
      {showLoader && <SiteLoader onComplete={handleLoaderComplete} />}
      <SEOHead
        title="Roofing & Construction in Western NC | Highlander"
        description="Highlander Building Services: roofing, repairs, metal roofs, gutters, and custom builds across Franklin, Highlands, Cashiers & Western NC."
        path="/"
        keywords="Highlander Building Services, Highlander Building Services, roofing company Western NC, roofing contractor Western NC, roofing services Western North Carolina, roofing company Franklin NC, roof repair Western NC, roof replacement Western NC, metal roofing Western NC, roofing and construction Western NC, construction and roofing company Western NC, roofing company near Franklin NC, roofing contractor near Highlands NC, roofing contractor near Cashiers NC"
        jsonLd={buildPageSchema({
          type: "home",
          reviews: customerReviews.map((review) => ({
            author: review.authorName,
            rating: review.ratingValue,
            body: review.reviewBody,
            datePublished: review.datePublished,
            location: review.location,
            })),
          aggregate: GOOGLE_REVIEW_AGGREGATE,
        })}
      />
      <Header />
      <main id="main-content">
        {/* 1. Hero — The Highland standard */}
        <section id="hero" className="min-h-[100svh]" data-hero-anchored="bottom">
          <Hero />
        </section>

        {/* 2. Tight three-item proof band */}
        <CredibilityStrip />

        <AnswerBlock
          question="Who is Highlander Building Services?"
          answer="Highlander Building Services, Inc. is a roofing and construction company based at 76 Creative Dr, Franklin, NC 28734, serving Franklin, Highlands, Cashiers, Sylva, and the wider Western North Carolina mountains with roof repair, roof replacement, metal roofing, gutters, and custom construction."
          points={[
            "Roofing, exteriors, and construction under one contractor",
            "Serving Western North Carolina mountain towns",
            "Call 828-524-7773 for a direct answer",
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
          <Section density="compact" width="tight" className="section-dark">
            <AttributedReviews heading="What Western NC homeowners say" tone="dark" />
          </Section>

          {/* 6. Local coverage (surface-raised) */}
          <ServiceAreaMap id="service-area" />

          {/* 7. FAQ (light) */}
          <HomeFAQ />

          {/* 8. One closing CTA */}
          <PageCloseCTA
            context="homepage"
            eyebrow="Next Step"
            heading="Roof or build — start with one conversation"
            body="Tell us what's going on and a Franklin-based advisor will follow up with a clear next step and a written scope. No obligation."
            primaryLabel="Get My Written Estimate"
            secondaryLabel="See Our Service Areas"
            secondaryTo="/service-areas"
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
