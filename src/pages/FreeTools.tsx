import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import SEOHead from "@/components/SEOHead";
import RoofCostEstimator from "@/components/RoofCostEstimator";
import RoofAssessmentQuiz from "@/components/RoofAssessmentQuiz";
import GuideLeadMagnet from "@/components/GuideLeadMagnet";
import StormResponseGuide from "@/components/StormResponseGuide";
import {
  RepairVsReplaceGuide,
  StormChecklist,
  MaterialsComparison,
  ConstructionFitGuide,
  ServiceAreaFinder,
} from "@/components/tools";
import { ScrollReveal } from "@/components/motion";
import { ArrowRight } from "lucide-react";

const FreeTools = () => {
  return (
    <>
      <SEOHead
        title="Roofing & Construction Tools | Highlander Roofing & Construction"
        description="Interactive tools to help you plan your roofing or construction project. Compare materials, assess damage, estimate costs, and find the right service."
        path="/free-tools"
      />
      <Header />
      <main className="pt-20 md:pt-28">
        {/* Hero */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-tight text-center">
            <ScrollReveal>
              <p className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-accent mb-3">Project Planning Tools</p>
              <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">Plan Before You Build</h1>
              <p className="text-sm md:text-base font-body text-primary-foreground/70 max-w-lg mx-auto">
                Use these tools to explore options, assess your situation, and prepare for a productive consultation. No pressure — just clarity.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Cost Estimator */}
        <RoofCostEstimator />

        {/* Repair vs Replace */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-2xl">
            <RepairVsReplaceGuide />
          </div>
        </section>

        {/* Materials Comparison */}
        <section className="section-padding bg-secondary">
          <div className="container-tight max-w-4xl">
            <MaterialsComparison />
          </div>
        </section>

        {/* Storm Response Guide */}
        <StormResponseGuide />

        {/* Storm Checklist (legacy) */}
        <section className="section-padding bg-secondary">
          <div className="container-tight max-w-2xl">
            <StormChecklist />
          </div>
        </section>

        {/* Guides */}
        <section className="section-padding bg-secondary">
          <div className="container-tight">
            <div className="grid md:grid-cols-2 gap-8">
              <GuideLeadMagnet variant="inline" guide="storm" />
              <GuideLeadMagnet variant="inline" guide="maintenance" />
            </div>
          </div>
        </section>

        {/* Construction Fit */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-2xl">
            <ConstructionFitGuide />
          </div>
        </section>

        {/* Roof Assessment Quiz */}
        <RoofAssessmentQuiz />

        {/* Service Area Finder */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-2xl">
            <ServiceAreaFinder />
          </div>
        </section>

        {/* Checklist Guide */}
        <section className="section-padding bg-secondary">
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
