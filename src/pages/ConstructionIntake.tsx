import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import IntakeShell from "@/components/intake/IntakeShell";
import ConstructionIntakeForm from "@/components/intake/ConstructionIntakeForm";
import { DesignProgramPromo } from "@/components/construction";

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
      <IntakeShell
        eyebrow="Construction Intake"
        title="Start the planning conversation."
        subhead="Additions, layouts, floor plans, and outdoor living. Share scope, timeline, and any plans you have. A Highlander project advisor will personally review and respond within as soon as possible."
        sidebarBullets={[
          "Owner-led from discovery through final walkthrough.",
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