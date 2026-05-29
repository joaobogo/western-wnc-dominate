import { motion } from "framer-motion";
import {
  Phone, ClipboardCheck, Eye, Ruler, Hammer, Sparkles,
  CalendarCheck, MessageSquare, PenTool, CheckCircle,
  type LucideIcon,
} from "lucide-react";

/* ═══════════════════════════════════════════
   PROCESS DATA
   ═══════════════════════════════════════════ */

export interface ProcessStep {
  number: string;
  title: string;
  icon: LucideIcon;
  description: string;
}

export const fullConstructionProcess: ProcessStep[] = [
  { number: "01", title: "Initial Consultation", icon: Phone, description: "We listen to what you want to accomplish — the goals, the constraints, and the vision. This conversation shapes every decision that follows and determines whether Highlander is the right fit for your project." },
  { number: "02", title: "Site Review & Assessment", icon: Eye, description: "We evaluate your property's existing conditions — structure, terrain, access, utilities, and any constraints that affect design or construction approach. Every finding is documented." },
  { number: "03", title: "Goal Clarification & Feasibility", icon: ClipboardCheck, description: "We clarify the project's scope, confirm what's structurally and logistically feasible, identify constraints early, and align expectations on timeline, budget range, and deliverables." },
  { number: "04", title: "Layout & Planning Coordination", icon: PenTool, description: "Conceptual design development, floor plan coordination if needed, and detailed scope documentation. Every element defined before moving forward." },
  { number: "05", title: "Material & Detail Alignment", icon: Ruler, description: "Material selections, finish specifications, color confirmations, and detail-level decisions finalized. Nothing proceeds to construction with open questions." },
  { number: "06", title: "Permitting & Scheduling", icon: CalendarCheck, description: "Permit applications prepared and submitted, inspections scheduled, materials ordered, and your project locked into the production calendar with a confirmed start date." },
  { number: "07", title: "Project Execution", icon: Hammer, description: "Construction with daily oversight, quality checkpoints, and real-time communication. If conditions change or we discover something unexpected, you're informed immediately with options." },
  { number: "08", title: "Communication Checkpoints", icon: MessageSquare, description: "Regular progress updates, milestone confirmations, and proactive issue communication throughout. You always know where your project stands and what's coming next." },
  { number: "09", title: "Cleanup & Site Restoration", icon: Sparkles, description: "Complete site cleanup, landscaping restoration, debris removal, and property returned to pre-construction condition — or better." },
  { number: "10", title: "Final Walk-Through & Closeout", icon: CheckCircle, description: "Comprehensive walk-through verifying every detail, punch list resolution, warranty documentation, maintenance guidance, and your project officially complete." },
];

/** Compact 6-step version for subpages */
export const compactConstructionProcess: ProcessStep[] = [
  fullConstructionProcess[0], // Consultation
  fullConstructionProcess[1], // Site Review
  fullConstructionProcess[3], // Design & Planning
  fullConstructionProcess[5], // Permitting & Scheduling
  fullConstructionProcess[6], // Execution
  fullConstructionProcess[9], // Walk-Through & Closeout
];

/** Additions-focused subset */
export const additionsProcess = fullConstructionProcess;

/** Renovations-focused subset */
export const renovationsProcess: ProcessStep[] = [
  fullConstructionProcess[0],
  fullConstructionProcess[1],
  fullConstructionProcess[4],
  fullConstructionProcess[5],
  fullConstructionProcess[6],
  fullConstructionProcess[9],
];

/* ═══════════════════════════════════════════
   PROCESS SECTION COMPONENT
   ═══════════════════════════════════════════ */

interface ConstructionProcessProps {
  steps?: ProcessStep[];
  heading?: string;
  subheading?: string;
  eyebrow?: string;
  className?: string;
  columns?: 2 | 3;
  variant?: "light" | "tartan";
}

const ConstructionProcess = ({
  steps = compactConstructionProcess,
  heading = "How a Project Works\nWith Highlander.",
  subheading = "A structured, transparent process from your first conversation to verified completion. No guesswork, no surprises.",
  eyebrow = "Our Process",
  className = "",
  columns = 3,
  variant = "tartan",
}: ConstructionProcessProps) => {
  const bgClass = variant === "tartan" ? "bg-secondary tartan-bg" : "bg-background";
  const colClass = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className={`section-padding bg-background/50 ${className}`}>
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-12 md:mb-16"
        >
          <span className="eyebrow mb-3 block">{eyebrow}</span>
          <h2 className="section-heading mb-4 whitespace-pre-line">{heading}</h2>
          {subheading && (
            <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">{subheading}</p>
          )}
        </motion.div>

        <div className={`grid grid-cols-1 ${colClass} gap-4 md:gap-5`}>
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group relative bg-card border border-border rounded-sm p-6 md:p-7 hover:border-primary/15 card-lift"
            >
              <span className="absolute top-4 right-5 text-4xl font-heading font-bold text-border/60 select-none group-hover:text-primary/10 transition-colors">
                {step.number}
              </span>
              <div className="w-10 h-10 rounded-sm bg-primary/6 flex items-center justify-center mb-5 group-hover:bg-primary/12 transition-colors">
                <step.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-foreground text-sm mb-2 group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-[13px] leading-relaxed font-body">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConstructionProcess;
