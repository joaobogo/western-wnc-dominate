import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export interface BenefitItem {
  icon: LucideIcon;
  title: string;
  detail: string;
}

interface Props {
  items: BenefitItem[];
  eyebrow?: string;
  heading?: string;
  intro?: string;
  columns?: 2 | 3;
  className?: string;
}

export const BenefitsGrid = ({ items, eyebrow, heading, intro, columns = 3, className = "" }: Props) => {
  const cols = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";
  return (
    <section className={`section-padding bg-secondary tartan-bg ${className}`}>
      <div className="container-tight">
        {(eyebrow || heading || intro) && (
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
            {eyebrow && <span className="eyebrow mb-3 block">{eyebrow}</span>}
            {heading && <h2 className="section-heading mb-4">{heading}</h2>}
            {intro && <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">{intro}</p>}
          </motion.div>
        )}
        <div className={`grid grid-cols-1 ${cols} gap-4 md:gap-5`}>
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="bg-card border border-border rounded-sm p-6 hover:shadow-lg transition-shadow"
            >
              <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-heading font-bold text-foreground mb-2 leading-tight">{item.title}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};