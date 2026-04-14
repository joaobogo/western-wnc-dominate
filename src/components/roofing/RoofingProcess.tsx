import { motion } from "framer-motion";
import {
  Phone, ClipboardCheck, Eye, Search, Hammer, Sparkles,
  CalendarCheck, Truck, CheckCircle, MessageSquare, Shield,
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

export const fullProcess: ProcessStep[] = [
  { number: "01", title: "Initial Consultation", icon: Phone, description: "We listen first. You describe what you're seeing, what concerns you, and what your goals are. We ask targeted questions to understand scope and urgency — then schedule an on-site visit." },
  { number: "02", title: "Site Review & Documentation", icon: Eye, description: "Our team inspects the full roof system — slopes, penetrations, flashings, valleys, ridges, ventilation, gutters, and interior spaces. Every finding is photographed and documented." },
  { number: "03", title: "Condition Assessment", icon: Search, description: "We evaluate the overall condition of your roofing system — not just the visible symptoms. We identify root causes, assess remaining useful life, and note any structural or ventilation concerns." },
  { number: "04", title: "Recommendations & Options", icon: ClipboardCheck, description: "You receive a clear, written recommendation — repair, replace, or monitor — with reasoning, material options, timeline, and cost. No ambiguity, no upselling, no pressure." },
  { number: "05", title: "Scope & Material Alignment", icon: CalendarCheck, description: "Once you approve the direction, we finalize material selections, confirm colors and profiles, order materials, and lock your project into the production schedule." },
  { number: "06", title: "Scheduling & Pre-Work Coordination", icon: Truck, description: "We confirm your start date, coordinate material delivery, and brief you on what to expect — access needs, noise, timeline, and daily communication protocol." },
  { number: "07", title: "Installation or Repair Execution", icon: Hammer, description: "Our crews execute with daily oversight, quality checkpoints, and real-time communication. If conditions change or we discover something unexpected, you're informed immediately." },
  { number: "08", title: "Cleanup & Site Restoration", icon: Sparkles, description: "We don't consider a project complete until every nail, shingle scrap, and piece of packaging is removed. We run magnetic sweepers across the property and restore landscaping disturbed during access." },
  { number: "09", title: "Final Walk-Through & Review", icon: CheckCircle, description: "We walk the completed project with you — verifying every detail, answering questions, and ensuring you're completely satisfied before we close the project." },
  { number: "10", title: "Documentation & Follow-Up", icon: MessageSquare, description: "You receive a complete project package: warranty documentation, before/after photographs, maintenance recommendations, and our direct line for any future questions." },
];

/** Subset for repair-focused pages */
export const repairProcess = fullProcess.filter((_, i) => [0, 1, 2, 3, 6, 8].includes(i));

/** Subset for replacement-focused pages */
export const replacementProcess = fullProcess;

/** Compact 5-step version for landing pages */
export const compactProcess: ProcessStep[] = [
  fullProcess[0], // Consultation
  fullProcess[1], // Site Review
  fullProcess[3], // Recommendations
  fullProcess[6], // Execution
  fullProcess[8], // Final Walk-Through
];

/* ═══════════════════════════════════════════
   PROCESS SECTION COMPONENT
   ═══════════════════════════════════════════ */

interface RoofingProcessProps {
  steps?: ProcessStep[];
  heading?: string;
  subheading?: string;
  eyebrow?: string;
  className?: string;
  columns?: 2 | 3;
  variant?: "light" | "tartan";
}

const RoofingProcess = ({
  steps = compactProcess,
  heading = "How a Project Works\nWith Highlander.",
  subheading = "A structured, transparent process from your first call to verified completion. No guesswork, no surprises.",
  eyebrow = "Our Process",
  className = "",
  columns = 3,
  variant = "tartan",
}: RoofingProcessProps) => {
  const bgClass = variant === "tartan" ? "bg-secondary tartan-bg" : "bg-background";
  const colClass = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className={`section-padding ${bgClass} ${className}`}>
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

export default RoofingProcess;
