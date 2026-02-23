import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
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
import RoofCostEstimator from "@/components/RoofCostEstimator";
import RoofAssessmentQuiz from "@/components/RoofAssessmentQuiz";
import GuideLeadMagnet from "@/components/GuideLeadMagnet";

const Index = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <BeforeAfterGallery />
        <ServicesGrid />
        <GuideLeadMagnet variant="banner" guide="storm" />
        <TownGrid />
        <RoofCostEstimator />
        <WhyChooseUs />
        <RoofAssessmentQuiz />
        <Reviews />
        <InstagramGrid />
        <InspectionForm />
        <CTABlock />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Index;
