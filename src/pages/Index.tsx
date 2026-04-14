import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import ProofStrip from "@/components/ProofStrip";
import DualPathway from "@/components/DualPathway";
import NotJustRoofing from "@/components/NotJustRoofing";
import FeaturedProjects from "@/components/FeaturedProjects";
import ServicesGrid from "@/components/ServicesGrid";
import OurProcess from "@/components/OurProcess";
import MeetTheTeam from "@/components/MeetTheTeam";
import Reviews from "@/components/Reviews";
import SilentObjections from "@/components/SilentObjections";
import RoofDesignerCTA from "@/components/roof-designer/RoofDesignerCTA";
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
        {/* ═══ ACT I: HOOK & CREDIBILITY ═══ */}
        <Hero />
        <TrustStrip />
        <ProofStrip />

        <SectionDivider variant="diamond" />

        {/* ═══ ACT II: IDENTITY & SCOPE ═══ */}
        <DualPathway />
        <NotJustRoofing />

        {/* ═══ ACT III: PROOF & SERVICES ═══ */}
        <FeaturedProjects />
        <ServicesGrid />

        <SectionDivider variant="gold-fade" />

        {/* ═══ ACT IV: TRUST & PROCESS ═══ */}
        <OurProcess />
        <MeetTheTeam />
        <Reviews />

        <SectionDivider variant="dot-line" />

        {/* ═══ ACT V: OBJECTIONS & AUTHORITY ═══ */}
        <SilentObjections />
        <BuiltForWNC />
        <TownGrid />

        <SectionDivider variant="gold-fade" />

        {/* ═══ ACT VI: ENGAGE & EDUCATE ═══ */}
        <RoofDesignerCTA />
        <BlogInsights />
        <InstagramGrid />

        {/* ═══ ACT VII: CONVERT ═══ */}
        <InspectionForm />
        <CTABlock />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Index;
