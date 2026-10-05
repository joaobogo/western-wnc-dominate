import { CheckCircle2, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PHONE_DISPLAY, PHONE_TEL } from "@/data/business";

export default function ThankYou() {
  return (
    <>
      <SEOHead
        title="Request Received | Highlander"
        description="Your request was received by Highlander Building Services. Review what happens next or call our Western North Carolina team directly."
        path="/thank-you"
        noindex
      />
      <Header />
      <main id="main-content" className="bg-background">
        <section className="min-h-[70vh] flex items-center pt-24 md:pt-32 pb-16">
          <div className="container-tight px-6">
            <div className="mx-auto max-w-2xl border border-border bg-card p-7 md:p-12 shadow-raised">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="eyebrow mb-3">Request received</p>
              <h1 className="font-heading text-3xl md:text-5xl font-bold leading-tight text-foreground">
                Thank you. Your project conversation is underway.
              </h1>
              <p className="mt-5 font-body text-base md:text-lg leading-relaxed text-muted-foreground">
                Your information has been sent to Highlander Building Services. A team member will review the request and contact you during business hours to confirm the next step.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  ["1", "We review", "A Highlander team member reviews the property and project details you sent."],
                  ["2", "We contact you", "We confirm the right next step and schedule a visit when one is needed."],
                  ["3", "You get clarity", "After we inspect or discuss the scope, we explain the recommended path in writing."],
                ].map(([n, title, body]) => (
                  <div key={n} className="border border-border bg-background p-4">
                    <span className="font-heading text-lg font-bold text-primary">{n}</span>
                    <h2 className="mt-1 font-heading text-base font-bold text-foreground">{title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={PHONE_TEL} className="btn btn-primary btn-md">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call {PHONE_DISPLAY}
                </a>
                <Link to="/recent-projects" className="btn btn-secondary btn-md">
                  See Recent Projects
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                If water is actively entering the home or there is a safety concern, call rather than waiting on the form response.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
