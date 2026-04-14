import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import ProofStrip from "@/components/ProofStrip";
import DualPathway from "@/components/DualPathway";
import NotJustRoofing from "@/components/NotJustRoofing";
import FeaturedProjects from "@/components/FeaturedProjects";
import OurProcess from "@/components/OurProcess";
import MeetTheTeam from "@/components/MeetTheTeam";
import Reviews from "@/components/Reviews";
import SilentObjections from "@/components/SilentObjections";
import TrustAndProof from "@/components/TrustAndProof";
import ServicesGrid from "@/components/ServicesGrid";
import RoofDesignerCTA from "@/components/roof-designer/RoofDesignerCTA";
import GuideLeadMagnet from "@/components/GuideLeadMagnet";
import BuiltForWNC from "@/components/BuiltForWNC";
import TownGrid from "@/components/TownGrid";
import BlogInsights from "@/components/BlogInsights";
import InstagramGrid from "@/components/InstagramGrid";
import InspectionForm from "@/components/InspectionForm";
import CTABlock from "@/components/CTABlock";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import SectionDivider from "@/components/SectionDivider";

const Index = () => {
  return (
    <>
      <Header />
      <main>
        {/* 1. HOOK — Hero + stat bar */}
        <Hero />
        <TrustStrip />

        {/* 2. PROVE SUBSTANCE — Why we're different */}
        <ProofStrip />

        <SectionDivider variant="diamond" />

        {/* 3. SELF-IDENTIFY — Roofing vs Construction */}
        <DualPathway />

        {/* 4. EVOLUTION STORY — Not just roofing */}
        <NotJustRoofing />

        <SectionDivider variant="gold-fade" />

        {/* 5. VISUAL PROOF — Featured projects */}
        <FeaturedProjects />

        <SectionDivider variant="wave" />

        {/* 6. HOW WE WORK — Process = professionalism */}
        <OurProcess />

        <SectionDivider variant="dot-line" />

        {/* 7. HUMAN CONNECTION — Meet the team */}
        <MeetTheTeam />

        <SectionDivider variant="gold-fade" />

        {/* 8. SOCIAL PROOF — Reviews close the trust gap */}
        <Reviews />

        <SectionDivider variant="diamond" />

        {/* 9. OBJECTION HANDLING — Answer silent concerns */}
        <SilentObjections />

        {/* 10. TRUST & PROOF — Credentials + reviews + warranty */}
        <TrustAndProof />

        <SectionDivider variant="gold-fade" />

        {/* 11. WHAT WE DO — Featured services */}
        <ServicesGrid />

        {/* 12. INTERACTIVE TOOLS — Engagement + lead capture */}
        <RoofDesignerCTA />
        <GuideLeadMagnet variant="banner" guide="storm" />

        <SectionDivider variant="dot-line" />

        {/* 13. LOCAL AUTHORITY — We know your region */}
        <BuiltForWNC />

        {/* 14. LOCAL AUTHORITY — We know your town */}
        <TownGrid />

        <SectionDivider variant="gold-fade" />

        {/* 15. EDITORIAL — Blog insights */}
        <BlogInsights />

        {/* 16. VISUAL PROOF — Field work gallery */}
        <InstagramGrid />

        {/* 17. CONVERT — Form + final CTA */}
        <InspectionForm />
        <CTABlock />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Index;
