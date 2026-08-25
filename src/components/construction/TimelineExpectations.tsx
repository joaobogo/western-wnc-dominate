import { PHONE_DISPLAY } from "@/data/business";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

interface Phase {
  label: string;
  window: string;
  body: string;
}

const DEFAULT_PHASES: Phase[] = [
  {
    label: "Consultation",
    window: "Week 1",
    body: "A working conversation about goals, constraints, and feasibility — on site where it matters. No pressure to commit.",
  },
  {
    label: "Planning and design",
    window: "Weeks 2–6",
    body: "Existing conditions measured, concepts developed, scope written down. Length depends on how much design the project needs.",
  },
  {
    label: "Permitting and scheduling",
    window: "Varies by county",
    body: "Applications submitted, materials ordered, and your project placed on the production calendar with a confirmed start.",
  },
  {
    label: "Construction",
    window: "Scope dependent",
    body: "Daily oversight, milestone checkpoints, and proactive communication when weather or conditions change the sequence.",
  },
  {
    label: "Walkthrough and closeout",
    window: "Final week",
    body: "Punch list resolved, site restored, documentation handed over, and a final walkthrough before we call it done.",
  },
];

interface Props {
  phases?: Phase[];
  heading?: string;
  intro?: string;
  className?: string;
}

/**
 * CRO Prompt 33 — construction buyers deliberate. Setting honest pace
 * expectations up front reduces drop-off and pre-qualifies the consultation.
 */
const TimelineExpectations = ({
  phases = DEFAULT_PHASES,
  heading = "How long this actually takes",
  intro = "Construction runs on a slower clock than a roof repair, and pretending otherwise helps nobody. Here is the realistic pace of a Highlander project in Western North Carolina.",
  className = "",
}: Props) => (
  <section className={`section-padding bg-background ${className}`}>
    <div className="container-tight">
      <span className="eyebrow mb-3 block">Timeline Expectations</span>
      <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">{heading}</h2>
      <p className="text-muted-foreground max-w-2xl mb-10 font-body">{intro}</p>

      <ol className="border-l border-border pl-6 space-y-8">
        {phases.map((p) => (
          <li key={p.label} className="relative">
            <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-accent" aria-hidden="true" />
            <p className="text-caption uppercase tracking-widest font-bold text-muted-foreground mb-1">
              {p.window}
            </p>
            <p className="font-heading font-bold text-lg mb-1">{p.label}</p>
            <p className="text-sm text-foreground/80 leading-relaxed max-w-2xl">{p.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Link
          to="/construction/consultation"
          className="btn btn-primary btn-md"
          data-gtm-location="timeline_expectations"
        >
          Get My Project Scoped
        </Link>
        <a
          href="tel:+18285247773"
          className="btn btn-secondary btn-md"
          aria-label={`Call Highlander at ${PHONE_DISPLAY}`}
        >
          <Phone className="w-4 h-4 text-primary" aria-hidden="true" /> {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  </section>
);

export default TimelineExpectations;