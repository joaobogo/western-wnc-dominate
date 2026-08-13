import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export interface ProcessStep {
  number: string;
  title: string;
  icon: LucideIcon;
  description: string;
}

interface Props {
  steps: ProcessStep[];
  eyebrow?: string;
  heading?: string;
  intro?: string;
  className?: string;
}

export const ProcessSteps = ({ steps, eyebrow = "Our Process", heading = "How We Work.", intro, className = "" }: Props) => (
  <section className={`section-padding bg-background ${className}`}>
    <div className="container-tight">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12">
        <span className="eyebrow mb-3 block">{eyebrow}</span>
        <h2 className="section-heading mb-4">{heading}</h2>
        {intro && <p className="text-muted-foreground text-base font-body">{intro}</p>}
      </motion.div>
      <div className="grid gap-4 md:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.number}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="relative bg-card border border-border rounded-sm p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-caption font-body font-bold uppercase tracking-[0.2em] text-[hsl(var(--gold-ink))]">
                {s.number}
              </span>
              <div className="flex-1 h-px bg-border" />
              <div className="w-8 h-8 rounded-sm bg-primary/10 flex items-center justify-center">
                <s.icon className="w-4 h-4 text-primary" />
              </div>
            </div>
            <h3 className="text-lg font-heading font-bold text-foreground mb-2 leading-tight">{s.title}</h3>
            <p className="text-muted-foreground font-body text-sm leading-relaxed">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);