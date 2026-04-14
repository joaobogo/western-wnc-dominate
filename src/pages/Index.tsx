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
import BuiltForWNC from "@/components/BuiltForWNC";
import ProjectConcierge from "@/components/ProjectConcierge";
import ProjectPathfinder from "@/components/ProjectPathfinder";

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
        {/* ═══ ACT I: HOOK — Cinematic first impression ═══ */}
        <Hero />

        {/* ═══ ACT II: PROOF — Editorial trust strip ═══ */}
        <TrustStrip />

        <SectionDivider variant="diamond" />

        {/* ═══ ACT III: CLARITY — Roofing vs Construction split ═══ */}
        <DualPathway />

        {/* ═══ ACT IV: VALUE — Why Highlander, silent objections ═══ */}
        <ValueProposition />
        <SilentObjections />

        <ProofMoment variant="credentials" />

        <SectionDivider variant="heritage-bar" />

        {/* ═══ ACT V: SERVICES — What we do ═══ */}
        <ServicesGrid />
        <NotJustRoofing />

        <ProofMoment variant="social" />

        {/* ═══ ACT VI: PROJECT PATHFINDER — Interactive guide ═══ */}
        <ProjectPathfinder />

        {/* ═══ ACT VII: LOCAL AUTHORITY — Built for WNC ═══ */}
        <BuiltForWNC />

        {/* ═══ ACT VII: PROCESS — How Highlander thinks ═══ */}
        <OurProcess />

        <SectionDivider variant="diamond" />

        {/* ═══ ACT VIII: VISUAL PROOF — Project showcase ═══ */}
        <FeaturedProjects />

        <ProofMoment variant="stats" />

        {/* ═══ ACT IX: PEOPLE — Team preview ═══ */}
        <MeetTheTeam />

        <SectionDivider variant="gold-fade" />

        {/* ═══ ACT X: EDITORIAL — Blog + local trust ═══ */}
        <BlogInsights />
        <HomepageTrust />
        <TownGrid />

        <ProofMoment variant="warranty" />

        {/* ═══ ACT XI: PROJECT CONCIERGE — Premium CTA ═══ */}
        <ProjectConcierge />

        {/* ═══ ACT XII: CLOSING — Final capture ═══ */}
        <InspectionForm />
        <CTABlock />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Index;
