import { useState, useEffect } from "react";
import SEOHead, { buildPageSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import TartanBackground from "@/components/TartanBackground";

import ThreeDivisionPathway from "@/components/DualPathway";

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
import ProjectConcierge from "@/components/ProjectConcierge";
import TrustedMaterials from "@/components/TrustedMaterials";
import HomeFAQ from "@/components/HomeFAQ";
import RegionalAuthority from "@/components/RegionalAuthority";

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
        title="Roofing & Construction Company in Western NC | Highlander Roofing Services"
        description="Highlander Roofing Services provides roofing, roof repair, roof replacement, metal roofing, gutters, skylights, construction, and design services across Franklin, Highlands, Cashiers, Sylva, and Western North Carolina."
        path="/"
        keywords="Highlander Roofing Services, Highlander Roofing, roofing company Western NC, roofing contractor Western NC, roofing services Western North Carolina, roofing company Franklin NC, roof repair Western NC, roof replacement Western NC, metal roofing Western NC, roofing and construction Western NC, construction and roofing company Western NC, roofing company near Franklin NC, roofing contractor near Highlands NC, roofing contractor near Cashiers NC"
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
        {/* 1. Hero — The Highland standard */}
        <section id="hero" className="min-h-[100svh]" data-hero-anchored="bottom">
          <Hero />
        </section>

        {/* 2. TrustStrip — Immediate proof anchors */}
        <section id="trust">
          <TrustStrip />
        </section>

        <div className="relative overflow-hidden bg-background">
          <TartanBackground opacity={0.02} />
          <SectionDivider variant="diamond" />
        </div>

        {/* Three Division Pathway — Roofing | Construction | Design */}
        <ThreeDivisionPathway />

        {/* 4. Inspection Form — Fast lead capture */}
        <InspectionForm />

        {/* 5. Services Grid — Detailed pathways */}
        <ServicesGrid />

        <SectionDivider variant="tartan-trim" />

        {/* 6. Trusted Materials — Product partners & material suppliers */}
        <TrustedMaterials />

        {/* 7. Featured Projects — Visual proof */}
        <FeaturedProjects />

        <SectionDivider variant="heritage-bar" />

        {/* 8. Built for WNC — Local relevance */}
        <div className="relative overflow-hidden">
          <TartanBackground opacity={0.015} patternSize="600px auto" />
          <BuiltForWNC />
        </div>

        {/* 9. Our Process — How we work */}
        <OurProcess />

        {/* 9.5 Regional Authority — SEO-rich Western NC positioning */}
        <RegionalAuthority />

        {/* 10. Proof Moment — Highest impact review */}
        <ProofMoment variant="social" id="proof" />

        {/* 11. Project Concierge — Guidance for new clients */}
        <ProjectConcierge id="concierge" />

        {/* 12. Town Grid — Service area footprint */}
        <TownGrid id="areas" />

        {/* 13. Homepage FAQ — Conversion-focused answers */}
        <HomeFAQ />

        <SectionDivider variant="gold-fade" />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Index;
