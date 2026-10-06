import { PHONE_DISPLAY, PHONE_PLAIN, PHONE_TEL } from "@/data/business";
import { Link } from "react-router-dom";
import { Phone, ClipboardCheck, CalendarClock, FileCheck2 } from "lucide-react";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import InspectionForm from "@/components/InspectionForm";

const steps = [
  {
    icon: ClipboardCheck,
    title: "You submit the form",
    body: "Send your first name, optional email, and phone. No budget, address, timeline, or project description is required to start.",
  },
  {
    icon: CalendarClock,
    title: "We discuss the next step",
    body: "A Highlander team member reviews the request during staffed business hours and contacts you to discuss the property and appropriate next step.",
  },
  {
    icon: FileCheck2,
    title: "You review the written scope",
    body: "When an on-site assessment is appropriate, Highlander documents the proposed work and provides the applicable written estimate or scope before you authorize work.",
  },
];

const RequestInspection = () => {
  return (
    <>
      <SEOHead
        title="Request a Free Estimate in Western NC | Highlander"
        description="Request a free roofing or construction estimate in Western North Carolina. Start with first name, optional email, and phone."
        path="/request-inspection"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Request Estimate", url: "/request-inspection" },
        ])}
      />
      <Header />
      <main id="main-content">
        {/* FORM — first thing on the page, no competing nav-heavy sections above */}
        <div id="inspection-form">
          <InspectionForm variant="page" />
        </div>

        {/* PHONE ALTERNATIVE — visible immediately under the form */}
        <section className="bg-secondary border-b border-border py-6">
          <div className="container-tight flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center">
            <p className="font-body font-semibold text-foreground text-body-sm">
              Would rather talk it through? Call the Franklin office directly.
            </p>
            <a
              href={PHONE_TEL}
              className="btn btn-secondary btn-sm"
            >
              <Phone className="w-4 h-4" aria-hidden="true" /> Call Direct: {PHONE_PLAIN}
            </a>
          </div>
        </section>

        {/* WHAT HAPPENS NEXT */}
        <section className="section-padding bg-background border-b border-border">
          <div className="container-tight">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="eyebrow block mb-3">What Happens After You Submit</span>
              <h2 className="section-heading">A simple, three-step process</h2>
              <p className="text-muted-foreground mt-3 font-body">
                No aggressive sales calls. No pressure. Just a clear path from your first message to a written recommendation for your property.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {steps.map((s, i) => (
                <div key={s.title} className="card-premium p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-sm bg-primary/10 text-primary flex items-center justify-center font-heading font-bold">
                      {i + 1}
                    </span>
                    <s.icon className="w-5 h-5 text-[hsl(var(--gold-ink))]" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-lg mb-2">{s.title}</h3>
                  <p className="text-muted-foreground font-body text-body-sm leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOT CTA */}
        <section className="section-padding bg-primary">
          <div className="container-tight text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
              Prefer to talk? Call a real person.
            </h2>
            <p className="text-primary-foreground mb-8 max-w-xl mx-auto">
              Call the Highlander office directly during staffed business hours.
            </p>
            <a href={PHONE_TEL} className="btn btn-secondary btn-md btn-on-dark">
              <Phone className="w-4 h-4" aria-hidden="true" /> Call {PHONE_DISPLAY}
            </a>
            <p className="text-dark-section-muted text-sm mt-6">
              By submitting the form on this page you agree to our{" "}
              <Link to="/privacy-policy" className="underline hover:text-primary-foreground">Privacy Policy</Link>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default RequestInspection;
