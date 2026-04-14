import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import InspectionForm from "@/components/InspectionForm";

const RequestInspection = () => {
  return (
    <>
      <SEOHead
        title="Request a Free Roof Inspection | Highlander Roofing & Construction"
        description="Schedule your free, no-obligation roof inspection or construction consultation. 24-hour response across Western North Carolina."
        path="/request-inspection"
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
