import { PHONE_DISPLAY } from "@/data/business";
import { Phone, Clock, AlertTriangle } from "lucide-react";

interface Props {
  variant: "repair" | "storm";
}

const content = {
  repair: {
    eyebrow: "Active Leak?",
    heading: "What To Do Right Now",
    steps: [
      "Put a bucket or bin under the drip and move furniture, rugs, and electronics clear.",
      "If the ceiling is bulging, pierce the low point with a small hole to release trapped water.",
      "Photograph the stain, the drip, and anything damaged — timestamped photos help later.",
      "Do not climb on a wet roof. Steep mountain pitches are the most common injury cause.",
      "Call us with what you're seeing. We triage on the phone and schedule the inspection.",
    ],
    expectation:
      "Calls during business hours are answered by our team, and active water intrusion is prioritized ahead of routine estimates.",
  },
  storm: {
    eyebrow: "Storm Just Hit?",
    heading: "What To Do Right Now",
    steps: [
      "Stay clear of downed limbs, loose metal, and any hanging debris — safety before assessment.",
      "From the ground, photograph the roof, yard debris, siding, gutters, and any interior damage.",
      "Write down the date and time of the storm — your insurer will ask for the date of loss.",
      "Do not sign anything a door-knocking storm chaser hands you. Local contractors don't need pressure tactics.",
      "Call us for an emergency tarp and a documented damage assessment before the next rain.",
    ],
    expectation:
      "After a named storm we run a triage list: tarping and open-roof conditions first, then full documented assessments.",
  },
};

const UrgentActionSteps = ({ variant }: Props) => {
  const c = content[variant];

  return (
    <section className="section-padding bg-secondary tartan-bg">
      <div className="container-tight max-w-3xl">
        <div className="mb-6 md:mb-8">
          <span className="eyebrow mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-primary" aria-hidden="true" />
            {c.eyebrow}
          </span>
          <h2 className="section-heading">{c.heading}</h2>
        </div>

        <ol className="space-y-2.5">
          {c.steps.map((s, i) => (
            <li
              key={s}
              className="flex gap-3.5 bg-card border border-border px-4 py-3.5 md:px-5 md:py-4"
            >
              <span className="shrink-0 w-6 h-6 bg-primary/10 text-primary font-heading font-bold text-xs flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-body-xs md:text-body-sm leading-snug font-body text-foreground/90">
                {s}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-5 bg-card border border-primary/30 px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-body-xs md:text-sm font-body text-muted-foreground leading-snug">
              {c.expectation}
            </p>
          </div>
          <a
            href="tel:+18285247773"
            className="btn btn-primary btn-md shrink-0"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
};

export default UrgentActionSteps;