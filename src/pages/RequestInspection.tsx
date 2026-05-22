import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import InspectionForm from "@/components/InspectionForm";

const RequestInspection = () => {
  return (
    <>
      <SEOHead
        title="Free Roof Inspection in Western NC"
        description="Schedule a free, no-obligation roof inspection or construction consultation. Rapid response across Western North Carolina. Highlander Roofing."
        path="/request-inspection"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Request Inspection", url: "/request-inspection" },
        ])}
      />
      <Header />
      <main className="pt-20 md:pt-28">
        <InspectionForm />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default RequestInspection;
