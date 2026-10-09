import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import IntakeShell from "@/components/intake/IntakeShell";
import RoofingIntakeForm from "@/components/intake/RoofingIntakeForm";

const RoofingIntake = () => (
  <>
    <SEOHead
      title="Request a Roof Assessment | Highlander Building Services"
      description="Tell Highlander how to reach you about a roofing project in Western North Carolina. Requests are reviewed during staffed business hours."
      path="/roofing-intake"
      noindex
      jsonLd={breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Roofing Intake", url: "/roofing-intake" }])}
    />
    <Header />
    <main id="main-content">
      <IntakeShell
        eyebrow="Roofing Intake"
        title="Request a roof assessment."
        subhead="Replacement, repair, storm, metal, or synthetic — start with your contact details and Highlander will review the request during staffed business hours."
        sidebarBullets={[
          "A clear Highlander project contact and written scope before authorized work begins.",
          "CertainTeed ShingleMaster PREMIER Credentialed Contractor and Licensed NC General Contractor.",
          "Storm-damage assessment and repair support across the Western NC service area.",
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