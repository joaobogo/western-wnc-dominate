import { motion } from "framer-motion";
import { Phone, Search, FileText, Layers, HardHat, CheckCircle, Shield } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Phone,
    title: "Initial Consultation",
    description: "We listen first. Tell us about your project, your concerns, and your timeline — we'll outline next steps clearly.",
  },
  {
    number: "02",
    icon: Search,
    title: "On-Site Assessment",
    description: "Our team walks every inch of your property — documenting conditions, taking precise measurements, and photographing key areas.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Scope & Proposal",
    description: "You receive a detailed written proposal: full scope of work, realistic timeline, material specifications, and transparent pricing.",
  },
  {
    number: "04",
    icon: Layers,
    title: "Material & Design Alignment",
    description: "We present material samples, color options, and product data so every decision is informed — no guesswork, no regrets.",
  },
  {
    number: "05",
    icon: HardHat,
    title: "Precision Execution",
    description: "Our crews follow documented procedures, protect your landscaping and property, and maintain daily communication throughout the build.",
  },
  {
    number: "06",
    icon: CheckCircle,
    title: "Quality Review & Walkthrough",
    description: "Before we call it done, we inspect every detail with you. If it doesn't meet our standard, it doesn't meet yours.",
  },
  {
    number: "07",
    icon: Shield,
    title: "Warranty & Completion",
    description: "You receive complete documentation — warranty certificates, material records, maintenance guidance, and direct access to our team.",
  },
];

const OurProcess = () => {
  return (
    <section className="section-padding bg-secondary/40">
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

        {/* Timeline layout */}
        <div className="relative">
          {/* Vertical center line — desktop only */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          <div className="space-y-6 md:space-y-0">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className={`relative md:flex md:items-start md:gap-8 md:py-6 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content card */}
                  <div className={`md:w-[calc(50%-2rem)] ${isLeft ? "md:text-right" : "md:text-left"}`}>
                    <div className="bg-card border border-border rounded-sm p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className={`flex items-center gap-3 mb-3 ${isLeft ? "md:justify-end" : ""}`}>
                        <div className="w-9 h-9 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <step.icon className="w-4 h-4 text-primary" />
                        </div>
                        <h3 className="text-base font-heading font-semibold text-foreground">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed font-body">{step.description}</p>
                    </div>
                  </div>

                  {/* Center node — desktop */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 w-10 h-10 rounded-full bg-primary text-primary-foreground items-center justify-center z-10">
                    <span className="font-heading font-bold text-xs">{step.number}</span>
                  </div>

                  {/* Mobile number badge */}
                  <div className="md:hidden absolute -left-1 top-5 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <span className="font-heading font-bold text-[10px]">{step.number}</span>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
