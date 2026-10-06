import { Link } from "react-router-dom";
import { Layers, Ruler, Mountain, FileText } from "lucide-react";

interface Props {
  /** What the scope tiers describe, e.g. "additions" or "outdoor living". */
  scopeLabel?: string;
  className?: string;
}

const TIERS = [
  {
    label: "Focused scope",
    body: "A single room, a detail-level upgrade, or one exterior element. Shortest planning cycle and the fewest trades on site.",
  },
  {
    label: "Mid scope",
    body: "A porch, a modest addition, or a significant renovation. Design coordination, permitting, and multiple trades in sequence.",
  },
  {
    label: "Large scope",
    body: "Multi-room work, a guest suite, or structural changes. Engineering input, longer lead times, phased scheduling.",
  },
  {
    label: "Estate level",
    body: "Whole-home or complex builds. Full design documentation, long procurement windows, and a dedicated project schedule.",
  },
];

const DRIVERS = [
  { icon: Mountain, label: "Site and access", body: "Slope, driveway access, and staging room change labor hours more than most homeowners expect in Western North Carolina." },
  { icon: Layers, label: "Structural work", body: "Foundations, load changes, and engineering review move a project into a different planning and cost tier." },
  { icon: Ruler, label: "Finish level", body: "Materials and detailing carry a wide range. The same footprint can land in very different places depending on selections." },
  { icon: FileText, label: "Permitting and design", body: "Drawings, county review, and inspection sequencing add real calendar time and belong in the budget conversation early." },
];

/**
 * CRO Prompt 33 — budget-range context for a consultative sale. We frame
 * scope tiers and the drivers behind the number rather than publishing prices
 * we cannot honor sight-unseen.
 */
const BudgetRangeContext = ({ scopeLabel = "construction projects", className = "" }: Props) => (
  <section className={`section-padding bg-muted/20 border-y border-border ${className}`}>
    <div className="container-tight">
      <span className="eyebrow mb-3 block">Budget Context</span>
      <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
        Where your project likely lands
      </h2>
      <p className="text-muted-foreground max-w-2xl mb-10 font-body">
        We don't publish a price per square foot for {scopeLabel} — it would be a guess, and guesses cost
        homeowners money. Instead, here is how we talk about scope and what actually drives the number, so the
        first consultation starts from a realistic place.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {TIERS.map((t) => (
          <div key={t.label} className="bg-card border border-border p-6">
            <p className="font-heading font-bold mb-2">{t.label}</p>
            <p className="text-sm text-foreground/80 leading-relaxed">{t.body}</p>
          </div>
        ))}
      </div>

      <h3 className="text-xl md:text-2xl font-heading font-bold mb-6">What moves the budget</h3>
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {DRIVERS.map(({ icon: Icon, label, body }) => (
          <div key={label} className="flex gap-4">
            <span className="mt-1 shrink-0 w-9 h-9 rounded-sm bg-primary/10 flex items-center justify-center">
              <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
            </span>
            <div>
              <p className="font-heading font-bold text-sm uppercase tracking-wide mb-1">{label}</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{body}</p>
            </div>
          </div>
        ))}
      </div>

      <Link
        to="/request-inspection?context=construction_budget&type=construction"
        className="text-primary font-semibold hover:underline"
        data-gtm-location="budget_context"
      >
        Start a project conversation
      </Link>
    </div>
  </section>
);

export default BudgetRangeContext;