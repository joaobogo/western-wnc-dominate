import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageCloseCTA from "@/components/PageCloseCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
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
        title="Free Roofing & Construction Planning Tools"
        description="Free interactive tools to plan your roofing or construction project — material comparison, damage assessment, cost estimator, and a virtual roof designer."
        path="/"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Free Tools", url: "/" },
        ])}
      />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section className="section-padding bg-primary text-primary-foreground hero-clears-header pb-24 md:pb-32">
          <div className="container-tight text-center">
            <ScrollReveal>
              <p className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-[hsl(var(--gold-ink))] mb-3">Project Planning Tools</p>
              <h1 className="font-heading text-3xl md:text-4xl font-bold mb-3">Plan Before You Build</h1>
              <p className="text-sm md:text-base font-body text-primary-foreground max-w-lg mx-auto">
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
      <PageCloseCTA eyebrow="Next Step" heading="Ready for a real set of eyes on your roof?" body="Tools are a starting point. A Highlander advisor can review your property and give you a clear, written scope." secondaryLabel="See the towns we serve" secondaryTo="/service-areas" context="free-tools" />
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default FreeTools;
