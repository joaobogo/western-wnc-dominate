import { useState, useEffect } from "react";
import SEOHead, { buildPageSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import TartanBackground from "@/components/TartanBackground";

import DualPathway from "@/components/DualPathway";
import TwoPillars from "@/components/TwoPillars";

import FeaturedProjects from "@/components/FeaturedProjects";
import ServicesGrid from "@/components/ServicesGrid";
import OurProcess from "@/components/OurProcess";

import TownGrid from "@/components/TownGrid";
import InspectionForm from "@/components/InspectionForm";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import SectionDivider from "@/components/SectionDivider";
import SiteLoader from "@/components/SiteLoader";
import ProofMoment from "@/components/ProofMoment";
import BuiltForWNC from "@/components/BuiltForWNC";
import BuilderPromoBlock from "@/components/builder/BuilderPromoBlock";
import { customerReviews, GOOGLE_REVIEW_AGGREGATE } from "@/data/reviews";

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
        title="Roofing & Construction in Western NC"
        description="Premium roofing and construction in Western North Carolina. Licensed, insured, and 4.9★ rated. Shingle, metal & cedar roofing plus additions, renovations & outdoor living. Request a consultation."
        path="/"
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
      <main>
        {/* 1. Hero */}
        <Hero />

        {/* 2. TrustStrip — proof anchors */}
        <TrustStrip />

        <div className="relative overflow-hidden">
          <TartanBackground opacity={0.03} />
          <SectionDivider variant="diamond" />
        </div>


        {/* 3. Two Pillars · One Standard — resolves roofing+construction question */}
        <TwoPillars />

        {/* Short intake form - moved higher up for better accessibility */}
        <InspectionForm />

        {/* 4. DualPathway — Roofing | Construction */}

        {/* 4. PriorityServices — focused 6-card grid (using existing ServicesGrid for now) */}
        <ServicesGrid />


        {/* 5. FeaturedProjects — real WNC work */}
        <FeaturedProjects />

        <SectionDivider variant="heritage-bar" />

        <div className="relative overflow-hidden">
          <TartanBackground opacity={0.02} patternSize="600px auto" />
          <BuiltForWNC />
        </div>


        {/* 7. OurProcess — how we work */}
        <OurProcess />


        {/* 8. ProofMoment — single best testimonial block */}
        <ProofMoment variant="social" />

        {/* 9. TownGrid — service areas */}
        <TownGrid />

        <SectionDivider variant="gold-fade" />


      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Index;
