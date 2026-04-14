import { motion } from "framer-motion";
import { ClipboardCheck, Ruler, HardHat, FileCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Consultation & Site Assessment",
    description: "We walk your property, document conditions, take measurements, and discuss your goals — roofing, construction, or both.",
  },
  {
    number: "02",
    icon: Ruler,
    title: "Detailed Proposal & Material Selection",
    description: "You receive a written scope of work, material options with samples, timeline, and transparent pricing. No surprises.",
  },
  {
    number: "03",
    icon: HardHat,
    title: "Precision Execution",
    description: "Our crews follow documented procedures, protect your property, and maintain daily communication. We don't cut corners.",
  },
  {
    number: "04",
    icon: FileCheck,
    title: "Final Walkthrough & Warranty",
    description: "We inspect every detail with you, document the completed work, and deliver your full warranty package.",
  },
];

const OurProcess = () => {
  return (
    <section className="section-padding bg-background tartan-bg">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="eyebrow mb-3 block">Our Process</span>
          <h2 className="section-heading mb-4">
            How We Work.<br className="hidden md:block" /> What to Expect.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base font-body">
            Every project follows the same disciplined process — because consistency is how you deliver quality at scale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative"
            >
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-border z-0" style={{ width: 'calc(100% - 2.5rem)' }} />
              )}
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[hsl(var(--highland-gold))] font-heading font-bold text-2xl leading-none">{step.number}</span>
                  <div className="w-9 h-9 rounded-sm bg-primary/8 flex items-center justify-center">
                    <step.icon className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <h3 className="text-base font-heading font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-body">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProcess;