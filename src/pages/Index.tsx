import { useState, useEffect } from "react";
import SEOHead, { localBusinessSchema, organizationSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";

import DualPathway from "@/components/DualPathway";
import NotJustRoofing from "@/components/NotJustRoofing";
import FeaturedProjects from "@/components/FeaturedProjects";
import ServicesGrid from "@/components/ServicesGrid";
import OurProcess from "@/components/OurProcess";
import MeetTheTeam from "@/components/MeetTheTeam";
import SilentObjections from "@/components/SilentObjections";
import ValueProposition from "@/components/ValueProposition";
import HomepageTrust from "@/components/HomepageTrust";
import TownGrid from "@/components/TownGrid";
import BlogInsights from "@/components/BlogInsights";
import InspectionForm from "@/components/InspectionForm";
import CTABlock from "@/components/CTABlock";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import SectionDivider from "@/components/SectionDivider";
import SiteLoader from "@/components/SiteLoader";
import ProofMoment from "@/components/ProofMoment";

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
        title="Highlander Roofing & Construction | Expert Roofing & Building in Western NC"
        description="Premium roofing and construction in Western North Carolina. 500+ projects, 4.9★ rated. Shingle, metal & cedar roofing plus additions, renovations & outdoor living. Request a consultation."
        path="/"
        jsonLd={[localBusinessSchema(), organizationSchema()]}
      />
      <Header />
      <main>
        {/* ═══ ACT I: HOOK ═══ */}
        <Hero />

        {/* ═══ ACT II: PROOF ═══ */}
        <TrustStrip />

        <SectionDivider variant="diamond" />

        {/* ═══ ACT III: ROOFING vs CONSTRUCTION SPLIT ═══ */}
        <DualPathway />

        {/* ═══ ACT IV: WHY HIGHLANDER ═══ */}
        <ValueProposition />
        <SilentObjections />

        {/* ── Proof: Credentials after value proposition ── */}
        <ProofMoment variant="credentials" />

        <SectionDivider variant="heritage-bar" />

        {/* ═══ ACT V: FEATURED SERVICES ═══ */}
        <ServicesGrid />
        <NotJustRoofing />

        {/* ── Proof: Social after services ── */}
        <ProofMoment variant="social" />

        {/* ═══ ACT VI: PROCESS ═══ */}
        <OurProcess />

        <SectionDivider variant="diamond" />

        {/* ═══ ACT VII: FEATURED PROJECTS ═══ */}
        <FeaturedProjects />

        {/* ── Proof: Stats after seeing the work ── */}
        <ProofMoment variant="stats" />

        {/* ═══ ACT VIII: TEAM PREVIEW ═══ */}
        <MeetTheTeam />

        <SectionDivider variant="gold-fade" />

        {/* ═══ ACT IX: BLOG PREVIEW ═══ */}
        <BlogInsights />

        {/* ═══ ACT X: TRUST ═══ */}
        <HomepageTrust />
        <TownGrid />

        {/* ═══ ACT XI: CLOSING CTA ═══ */}
        <InspectionForm />
        <CTABlock />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Index;
