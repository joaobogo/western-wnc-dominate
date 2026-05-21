import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import IntakeShell from "@/components/intake/IntakeShell";
import RoofingIntakeForm from "@/components/intake/RoofingIntakeForm";

const RoofingIntake = () => (
  <>
    <SEOHead
      title="Request a Roof Assessment | Highlander Roofing"
      description="Tell us about your roof. A Highlander project advisor responds within one business day across Western North Carolina."
      path="/roofing-intake"
      jsonLd={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Roofing Intake", url: "/roofing-intake" }])}
    />
    <Header />
    <main>
      <IntakeShell
        eyebrow="Roofing Intake"
        title="Request a roof assessment."
        subhead="Replacement, repair, storm, metal, or synthetic — start with a few details and a Highlander advisor responds within one business day. No call centers, no high-pressure quotes."
        sidebarBullets={[
          "Owner-led team, local crews, written scope before any work begins.",
          "CertainTeed Master Applicator and Licensed General Contractor.",
          "24-hour storm response across 8 Western NC counties.",
        ]}
        otherIntakeLabel="Construction Intake"
        otherIntakeHref="/construction-intake"
      >
        <RoofingIntakeForm />
      </IntakeShell>
    </main>
    <Footer />
    <StickyMobileCTA />
  </>
);

export default RoofingIntake;