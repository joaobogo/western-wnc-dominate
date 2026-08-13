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
    body: "Tell us about the property and what you're seeing. Two minutes, no pressure, no obligation.",
  },
  {
    icon: CalendarClock,
    title: "We schedule your visit",
    body: "A local Highlander team member reaches out — usually the same or next business day — to schedule an on-site inspection or consultation.",
  },
  {
    icon: FileCheck2,
    title: "You get a written report",
    body: "We walk the property, document conditions with photos, and send you a clear written summary with recommended next steps and a transparent estimate.",
  },
];

const RequestInspection = () => {
  return (
    <>
      <SEOHead
        title="Request a Free Roof Inspection or Consultation | Highlander"
        description="Book a free roof inspection or construction consultation in Highlands, Cashiers, Franklin, Sylva, and Western NC. Written report and clear estimate."
        path="/request-inspection"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Request Inspection", url: "/request-inspection" },
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
            <p className="font-body font-semibold text-foreground text-[15px]">
              Would rather talk it through? A Franklin-based team member answers.
            </p>
            <a
              href="tel:+18285247773"
              className="cta-gradient text-accent-foreground font-bold px-6 py-3 rounded-sm inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4" /> Call Direct: 828-524-7773
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
                  <p className="text-muted-foreground font-body text-[15px] leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICE OPTIONS */}
        <section className="section-padding bg-secondary">
          <div className="container-tight">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="eyebrow block mb-3">What Can We Help With?</span>
              <h2 className="section-heading">Roofing, gutters, skylights, construction, and design</h2>
              <p className="text-muted-foreground mt-3 font-body">
                Choose whatever fits — you can also just describe what you need in the form below.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {services.map((s) => (
                <Link
                  key={s.to}
                  to={s.to}
                  className="card-premium p-4 text-center font-heading font-bold text-foreground text-[15px] hover:border-primary/40 transition-colors"
                >
                  {s.label}
                </Link>
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
            <p className="text-primary-foreground/95 mb-8 max-w-xl mx-auto">
              When you call Highlander, a member of our Western NC team picks up.
            </p>
            <a href="tel:+18285247773" className="border border-primary-foreground/30 text-primary-foreground font-semibold px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-primary-foreground/10 transition-colors">
              <Phone className="w-5 h-5" /> Call (828) 524-7773
            </a>
            <p className="text-primary-foreground/70 text-sm mt-6">
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
