import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ValueProposition from "@/components/ValueProposition";
import TrustAndProof from "@/components/TrustAndProof";
import TrustStrip from "@/components/TrustStrip";
import ProofStrip from "@/components/ProofStrip";
import DualPathway from "@/components/DualPathway";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import ServicesGrid from "@/components/ServicesGrid";
import TownGrid from "@/components/TownGrid";
import Reviews from "@/components/Reviews";
import InstagramGrid from "@/components/InstagramGrid";
import CTABlock from "@/components/CTABlock";
import InspectionForm from "@/components/InspectionForm";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import GuideLeadMagnet from "@/components/GuideLeadMagnet";
import RoofDesignerCTA from "@/components/roof-designer/RoofDesignerCTA";
import OurProcess from "@/components/OurProcess";
import MeetTheTeam from "@/components/MeetTheTeam";

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

        {/* 3. SELF-IDENTIFY — Roofing vs Construction */}
        <DualPathway />

        {/* 4. VISUAL PROOF — Project showcase */}
        <BeforeAfterGallery />

        {/* 5. HOW WE WORK — Process = professionalism */}
        <OurProcess />

        {/* 6. HUMAN CONNECTION — Meet the team */}
        <MeetTheTeam />

        {/* 7. SOCIAL PROOF — Reviews close the trust gap */}
        <Reviews />

        {/* 9. TRUST & PROOF — Credentials + reviews + warranty */}
        <TrustAndProof />

        {/* 10. WHAT WE DO — Featured services */}
        <ServicesGrid />

        {/* 8. INTERACTIVE TOOLS — Engagement + lead capture */}
        <RoofDesignerCTA />
        <GuideLeadMagnet variant="banner" guide="storm" />

        {/* 9. LOCAL AUTHORITY — We know your town */}
        <TownGrid />

        {/* 10. VISUAL PROOF — Field work gallery */}
        <InstagramGrid />

        {/* 11. CONVERT — Form + final CTA */}
        <InspectionForm />
        <CTABlock />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Index;
