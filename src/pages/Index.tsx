import { FRANKLIN_NAP, PHONE_PLAIN, REVIEW_LINE, FRANKLIN, SYLVA, napLine } from "@/data/business";
import { Link } from "react-router-dom";
import { homeFaqs } from "@/data/home-faqs";
import AnswerBlock from "@/components/seo/AnswerBlock";
import { lazy, Suspense } from "react";
import SEOHead, { buildPageSchema, faqSchema } from "@/components/SEOHead";
import Section from "@/components/layout/Section";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CredibilityStrip from "@/components/home/CredibilityStrip";
import PriorityLocalLinks from "@/components/home/PriorityLocalLinks";
import TartanBackground from "@/components/TartanBackground";

import ThreeDivisionPathway from "@/components/DualPathway";

import StickyMobileCTA from "@/components/StickyMobileCTA";
import SectionDivider from "@/components/SectionDivider";

/* Below-the-fold homepage sections — code-split so the first load only ships
   the hero, trust strip and shell. Each fallback reserves height to keep CLS at 0. */
const FeaturedProjects = lazy(() => import("@/components/FeaturedProjects"));
const ReviewsCarousel = lazy(() => import("@/components/reviews/ReviewsCarousel"));
const ServiceAreaMap = lazy(() => import("@/components/ServiceAreaMap"));
const HomeFAQ = lazy(() => import("@/components/HomeFAQ"));
const PageCloseCTA = lazy(() => import("@/components/PageCloseCTA"));
const Footer = lazy(() => import("@/components/Footer"));

// data-prerender-pending: scripts/prerender.mjs waits until every placeholder
// has been replaced, so the snapshot always carries the lazy sections' SEO
// content (FAQ questions, town + footer links) — see P3.7.
const SectionFallback = ({ h = 480 }: { h?: number }) => (
  <div style={{ minHeight: h }} aria-hidden="true" data-prerender-pending="" />
);

const Index = () => {
  return (
    <>
      <SEOHead
        title="Roofing & Construction in Franklin, NC | Highlander"
        // P3.6 — the rating comes from REVIEW_LINE (single source), never typed.
        // "Western NC" and "&" keep the whole line under the 160-char guard so
        // normalizeDescription never trims the review sentence off the end.
        description={`Roofing in Franklin, Highlands, Cashiers, Sylva and Western NC, with construction for additions, renovations and outdoor living. ${REVIEW_LINE}.`}
        path="/"
        geo={{ lat: FRANKLIN.geo.lat, lng: FRANKLIN.geo.lng, region: FRANKLIN.region, placename: `${FRANKLIN.locality}, North Carolina` }}
        // No aggregateRating here — rating markup is only emitted on /reviews,
        // where the same live Google figure is visible on the page.
        // The homepage FAQPage rides in the same SEOHead graph (not a second
        // <script> inside HomeFAQ) so prerender's single data-seo-ld node
        // carries every schema for the page; the questions are visible below.
        jsonLd={[
          ...buildPageSchema({ type: "home" }),
          faqSchema(homeFaqs.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
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
          answer={`Highlander Building Services, Inc. is a roofing and construction company based at ${FRANKLIN_NAP}. Our roofers in Franklin, NC handle roof repair, roof replacement, metal roofing, gutters, and custom construction, and we are the roofing company serving Highlands, Cashiers and Sylva from two walk-in showrooms.`}
          points={[
            "Roofing, exteriors, and construction under one contractor",
            "Serving Western North Carolina mountain towns",
            `Call ${PHONE_PLAIN} for a direct answer`,
            "Estimates scoped on site",
          ]}
        />

        {/* Two showrooms — NAP lines from business.ts, each linking to its location page (P3.6) */}
        <section aria-labelledby="two-showrooms" className="bg-background border-y border-border/40">
          <div className="container-tight px-6 py-8 md:py-10 grid gap-4 md:grid-cols-[auto_1fr] md:items-center">
            <h2 id="two-showrooms" className="eyebrow text-primary">Two showrooms</h2>
            <ul className="flex flex-col md:flex-row md:flex-wrap gap-2 md:gap-8 font-body text-body-sm text-foreground/90">
              {[FRANKLIN, SYLVA].map((loc) => (
                <li key={loc.id}>
                  <Link to={`/locations/${loc.id}-nc`} className="hover:text-primary underline-offset-4 hover:underline">
                    {napLine(loc)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

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
            <ReviewsCarousel
              heading="What Western NC homeowners say"
              subheading="Published customer reviews, quoted word for word. Every one links to its source."
              tone="dark"
            />
          </Section>

          {/* 6. Local coverage (surface-raised) */}
          <ServiceAreaMap id="service-area" />

          {/* 6b. Descriptive internal links into priority towns + showrooms */}
          <PriorityLocalLinks />

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
