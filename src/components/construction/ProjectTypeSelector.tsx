import { Link } from "react-router-dom";
import {
  Home, Paintbrush, TreePine, Building2, Compass, Lightbulb, ArrowRight,
  type LucideIcon,
} from "lucide-react";

interface ProjectType {
  id: string;
  label: string;
  icon: LucideIcon;
  desc: string;
}

/** Mirrors the project types in the construction consultation intake. */
export const constructionProjectTypes: ProjectType[] = [
  { id: "addition", label: "Home Addition", icon: Home, desc: "New living space, guest suites, garages, and sunrooms." },
  { id: "renovation", label: "Renovation", icon: Paintbrush, desc: "Reworking existing rooms for better function and finish." },
  { id: "outdoor-living", label: "Outdoor Living", icon: TreePine, desc: "Porches, decks, patios, and covered outdoor rooms." },
  { id: "exterior", label: "Exterior Improvements", icon: Building2, desc: "Siding, windows, trim, and building-envelope upgrades." },
  { id: "custom", label: "Custom / Complex", icon: Compass, desc: "Multi-phase, design-sensitive, or specialty builds." },
  { id: "not-sure", label: "I'd Like Guidance", icon: Lightbulb, desc: "We'll help define the right scope before any numbers." },
];

interface Props {
  heading?: string;
  subheading?: string;
  eyebrow?: string;
  /** Optional pre-emphasized type for a subpage (e.g. "outdoor-living"). */
  highlight?: string;
  className?: string;
}

/**
 * CRO Prompt 33 — construction buyers self-select the project type before any
 * form. Each card deep-links into the consultation intake with the type
 * pre-selected, so the conversation starts already scoped.
 */
const ProjectTypeSelector = ({
  heading = "What kind of project are you planning?",
  subheading = "Pick the closest fit. We'll start the consultation there — you can change it at any point.",
  eyebrow = "Start Here",
  highlight,
  className = "",
}: Props) => (
  <section className={`section-padding bg-background ${className}`}>
    <div className="container-tight">
      <span className="eyebrow mb-3 block">{eyebrow}</span>
      <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">{heading}</h2>
      <p className="text-muted-foreground max-w-2xl mb-10 font-body">{subheading}</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {constructionProjectTypes.map(({ id, label, icon: Icon, desc }) => (
          <Link
            key={id}
            to={`/request-inspection?context=construction_project_type&type=construction-${id}`}
            data-gtm-location="project_type_selector"
            className={`group border p-6 flex flex-col gap-3 transition-all hover:shadow-raised ${
              highlight === id
                ? "border-accent bg-accent/5"
                : "border-border bg-card hover:border-accent/50"
            }`}
          >
            <span className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center">
              <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
            </span>
            <span className="font-heading font-bold text-lg leading-tight">{label}</span>
            <span className="text-sm text-muted-foreground font-body flex-grow">{desc}</span>
            <span className="text-caption uppercase tracking-widest font-bold text-primary inline-flex items-center gap-2 group-hover:gap-3 transition-all">
              Start the conversation <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectTypeSelector;