import { motion } from "framer-motion";
import { Check } from "lucide-react";

const included = [
  "Full tear-off of existing layers and disposal",
  "Decking inspection with any rotted sheathing itemized before replacement",
  "Ice-and-water shield at eaves, valleys, and penetrations",
  "Synthetic underlayment across the full deck",
  "New drip edge, pipe boots, and flashing at walls and chimneys",
  "Named material product line, color, and fastener pattern",
  "Ridge ventilation and intake assessment",
  "Daily debris removal and magnetic nail sweeps",
  "Final walkthrough with photo documentation",
];

const excluded = [
  "Structural framing repairs discovered after tear-off (priced and approved separately)",
  "Gutter replacement unless listed as a line item",
  "Interior drywall or paint repairs from prior leaks",
];

/** Explains exactly what the written replacement scope covers — and what it does not. */
const WrittenScopeIncludes = () => (
  <section className="section-padding bg-secondary tartan-bg">
    <div className="container-tight max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
        <span className="eyebrow mb-3 block">Your Written Scope</span>
        <h2 className="section-heading mb-4">What the Estimate Actually Includes.</h2>
        <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
          Comparing bids only works when you know what is inside each one. Every Highlander replacement proposal spells out these lines.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-card border border-border rounded-sm p-6 md:p-7">
          <h3 className="font-heading font-bold text-foreground text-base mb-4">Included on every replacement</h3>
          <ul className="space-y-2.5">
            {included.map((item) => (
              <li key={item} className="flex gap-2.5 text-[13px] font-body text-muted-foreground leading-relaxed">
                <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-card border border-border rounded-sm p-6 md:p-7">
          <h3 className="font-heading font-bold text-foreground text-base mb-4">Quoted separately, never buried</h3>
          <ul className="space-y-2.5">
            {excluded.map((item) => (
              <li key={item} className="text-[13px] font-body text-muted-foreground leading-relaxed border-l-2 border-border pl-3">
                {item}
              </li>
            ))}
          </ul>
          <p className="text-[13px] font-body text-foreground/80 leading-relaxed mt-5">
            If a condition shows up after tear-off, you see photos and a written change amount before we proceed.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default WrittenScopeIncludes;