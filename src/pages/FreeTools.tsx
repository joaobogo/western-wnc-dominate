import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import RoofCostEstimator from "@/components/RoofCostEstimator";
import RoofAssessmentQuiz from "@/components/RoofAssessmentQuiz";
import GuideLeadMagnet from "@/components/GuideLeadMagnet";

const FreeTools = () => {
  return (
    <>
      <Header />
      <main className="pt-20 md:pt-28">
        <RoofCostEstimator />

        <section className="section-padding bg-secondary">
          <div className="container-tight">
            <div className="grid md:grid-cols-2 gap-8">
              <GuideLeadMagnet variant="inline" guide="storm" />
              <GuideLeadMagnet variant="inline" guide="maintenance" />
            </div>
          </div>
        </section>

        <RoofAssessmentQuiz />

        <section className="section-padding bg-background">
          <div className="container-tight max-w-lg">
            <GuideLeadMagnet variant="inline" guide="checklist" />
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default FreeTools;
