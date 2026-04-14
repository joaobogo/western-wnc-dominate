import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import ProofStrip from "@/components/ProofStrip";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import ServicesGrid from "@/components/ServicesGrid";
import TownGrid from "@/components/TownGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import Reviews from "@/components/Reviews";
import InstagramGrid from "@/components/InstagramGrid";
import CTABlock from "@/components/CTABlock";
import InspectionForm from "@/components/InspectionForm";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import GuideLeadMagnet from "@/components/GuideLeadMagnet";
import RoofDesignerCTA from "@/components/roof-designer/RoofDesignerCTA";
import OurProcess from "@/components/OurProcess";

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

        {/* 3. VISUAL PROOF — Project showcase */}
        <BeforeAfterGallery />

        {/* 3. WHAT WE DO — Dual roofing + construction */}
        <ServicesGrid />

        {/* 4. HOW WE WORK — Process = professionalism */}
        <OurProcess />

        {/* 5. WHY US — Differentiation pillars */}
        <WhyChooseUs />

        {/* 6. SOCIAL PROOF — Reviews close the trust gap */}
        <Reviews />

        {/* 7. INTERACTIVE TOOLS — Engagement + lead capture */}
        <RoofDesignerCTA />
        <GuideLeadMagnet variant="banner" guide="storm" />

        {/* 8. LOCAL AUTHORITY — We know your town */}
        <TownGrid />

        {/* 9. VISUAL PROOF — Field work gallery */}
        <InstagramGrid />

        {/* 10. CONVERT — Form + final CTA */}
        <InspectionForm />
        <CTABlock />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Index;