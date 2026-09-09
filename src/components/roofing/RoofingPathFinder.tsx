import { PHONE_DISPLAY, PHONE_TEL } from "@/data/business";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, HelpCircle } from "lucide-react";

type Option = {
  symptom: string;
  answer: string;
  to: string;
  cta: string;
};

const options: Option[] = [
  {
    symptom: "I see a stain, drip, or active leak inside",
    answer:
      "That's a repair diagnosis first. We find the actual entry point, document it, and fix the cause — not just the spot on the ceiling.",
    to: "/roofing/roof-repair",
    cta: "Go to Roof Repair",
  },
  {
    symptom: "A storm just hit and I may need insurance",
    answer:
      "Start with documented storm damage assessment. We photograph conditions, write the scope, and coordinate with your adjuster.",
    to: "/roofing/storm-damage",
    cta: "Go to Storm Damage",
  },
  {
    symptom: "My roof is old and I'm planning a replacement",
    answer:
      "You need a material and system plan for your elevation and exposure, plus a written scope with grouped costs.",
    to: "/roofing/residential",
    cta: "Go to Residential Roofing",
  },
  {
    symptom: "I want metal, cedar, slate, or copper",
    answer:
      "These are specialty systems with different detailing and lead times. We'll walk you through the trade-offs before you commit.",
    to: "/roofing/metal",
    cta: "Go to Metal & Specialty",
  },
  {
    symptom: "I manage a commercial building or HOA",
    answer:
      "Low-slope systems, maintenance programs, and multi-property scheduling are handled by our commercial team.",
    to: "/roofing/commercial",
    cta: "Go to Commercial Roofing",
  },
];

const RoofingPathFinder = () => {
  const [active, setActive] = useState<number | null>(null);
  const selected = active === null ? null : options[active];

  return (
    <section className="section-padding bg-secondary tartan-bg" id="not-sure">
      <div className="container-tight">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-10">
          <span className="eyebrow mb-3 block">Not Sure Which You Need?</span>
          <h2 className="section-heading mb-4">Tell Us What You're Seeing.</h2>
          <p className="text-muted-foreground text-base font-body max-w-xl mx-auto">
            Pick the line that sounds most like your situation. We'll point you to the right
            service — or you can skip it and call us directly.
          </p>
        </div>

        <div className="max-w-3xl mx-auto grid gap-2.5">
          {options.map((o, i) => (
            <button
              key={o.symptom}
              type="button"
              onClick={() => setActive(active === i ? null : i)}
              aria-pressed={active === i}
              className={`text-left w-full bg-card border px-5 py-4 font-body text-body-sm transition-all ${
                active === i
                  ? "border-primary/50 shadow-flat text-foreground"
                  : "border-border hover:border-primary/25 text-foreground/90"
              }`}
            >
              {o.symptom}
            </button>
          ))}
        </div>

        {selected && (
          <div className="max-w-3xl mx-auto mt-6 bg-card border border-primary/30 p-6 md:p-7">
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-body mb-5">
              {selected.answer}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to={selected.to}
                className="btn btn-primary btn-md"
              >
                {selected.cta}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/request-inspection"
                className="btn btn-secondary btn-md"
              >
                Get My Roof Assessed
              </Link>
            </div>
          </div>
        )}

        <div className="max-w-3xl mx-auto mt-6 flex items-center justify-center gap-2 text-sm font-body text-muted-foreground">
          <HelpCircle className="w-4 h-4 text-primary" aria-hidden="true" />
          <span>Still unsure?</span>
          <a
            href={PHONE_TEL}
            className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            Call {PHONE_DISPLAY}
          </a>
        </div>

      </div>
    </section>
  );
};

export default RoofingPathFinder;