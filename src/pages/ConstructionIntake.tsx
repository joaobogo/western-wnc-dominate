import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import IntakeShell from "@/components/intake/IntakeShell";
import ConstructionIntakeForm from "@/components/intake/ConstructionIntakeForm";
import { DesignProgramPromo } from "@/components/construction";
import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";

const ConstructionIntake = () => (
  <>
    <SEOHead
      title="Start a Construction Project | Highlander Construction"
      description="Additions, outdoor living, renovations, and custom builds across Western North Carolina. Tell us about your project — a project advisor responds within as soon as possible."
      path="/construction-intake"
      jsonLd={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Construction Intake", url: "/construction-intake" }])}
    />
    <Header />
    <main>
      {/* Planning expectation framing — sets the design-first tone before the form */}
      <section className="bg-background border-b border-border pt-32 md:pt-40">
        <div className="container-tight section-padding-sm pb-12 md:pb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <Compass className="w-4 h-4 text-[hsl(var(--highland-gold))]" />
              <span className="text-[11px] font-body font-bold uppercase tracking-[0.22em] text-[hsl(var(--highland-gold))]">
                Planning a Construction Project?
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground leading-[1.15] mb-5 text-balance">
              Serious projects start with design.
            </h1>
            <p className="text-foreground/85 text-base md:text-lg font-body leading-relaxed mb-4">
              If you are planning an addition, garage, porch, outdoor living space, remodel, or new construction project, Highlander may recommend starting with a paid <Link to="/construction/design" className="text-primary font-semibold hover:underline">Design &amp; Consultation Agreement</Link>. This helps define the scope, create useful drawings, understand realistic budget ranges, and prepare the project for estimating, permitting, and construction.
            </p>
            <p className="text-foreground/70 text-sm md:text-base font-body leading-relaxed mb-6">
              Still exploring? That is okay. Tell us what you are considering, and we will help you understand the right next step.
            </p>
            <Link
              to="/construction/design"
              className="group inline-flex items-center gap-2 text-[13px] font-body font-bold uppercase tracking-[0.18em] text-[hsl(var(--highland-gold))] hover:opacity-80 transition-opacity"
            >
              View the design phases
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <IntakeShell
        eyebrow="Construction Intake"
        title="Tell us about the project."
        subhead="For many construction projects, the first step is not an instant quote — it is defining the scope. Share what you are considering, any plans you already have, and your timeline. A Highlander project advisor will personally review and respond as soon as possible."
        sidebarBullets={[
          "Team-led from discovery through final walkthrough.",
          "Written scope and pricing approach before commitment.",
          "We say no honestly when a project isn't the right fit.",
          "Serious builds typically start with our paid Design & Consultation Agreement.",
        ]}
        otherIntakeLabel="Roofing Intake"
        otherIntakeHref="/roofing-intake"
      >
        <ConstructionIntakeForm />
      </IntakeShell>
      <DesignProgramPromo />
    </main>
    <Footer />
    <StickyMobileCTA />
  </>
);

export default ConstructionIntake;