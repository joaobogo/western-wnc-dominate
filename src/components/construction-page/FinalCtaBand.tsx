import type { ReactNode } from "react";
import { Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/data/business";
import { officeHoursShort } from "@/lib/office-hours";
import { CALL_MICROCOPY, FORM_ANCHOR } from "./ConstructionHero";

/**
 * Final band (plan §3.2.10): "Talk to Highlander about your {service}", the
 * call button and the 3-field form (passed in as children so each page
 * chooses the form's service tag).
 */
const FinalCtaBand = ({ service, children }: { service: string; children: ReactNode }) => (
  <section id={FORM_ANCHOR} className="scroll-mt-24 bg-primary py-14 text-primary-foreground md:py-20" aria-labelledby="final-cta-heading">
    <div className="container-tight grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
      <div>
        <h2 id="final-cta-heading" className="font-heading text-3xl font-bold leading-tight md:text-4xl">
          Talk to Highlander about your {service}
        </h2>
        <p className="mt-4 max-w-md font-body text-body text-white/90">{CALL_MICROCOPY}</p>
        <a href={PHONE_TEL} data-gtm-location="final_cta" className="btn btn-lg mt-6 bg-[hsl(var(--highland-gold))] text-[hsl(var(--heritage-charcoal))] hover:bg-[hsl(var(--highland-gold)/0.9)]">
          <Phone className="h-4 w-4" aria-hidden="true" /> Call {PHONE_DISPLAY}
        </a>
        <p className="mt-4 font-body text-body-sm text-white/80">
          Prefer a call back? Send the form and we call you back as soon as possible during business hours ({officeHoursShort()}).
        </p>
      </div>
      <div className="text-foreground">{children}</div>
    </div>
  </section>
);

export default FinalCtaBand;
