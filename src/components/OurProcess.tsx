import { motion } from "framer-motion";
import { Phone, Search, FileText, Layers, HardHat, CheckCircle, Shield } from "lucide-react";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const steps = [
  { number: "01", icon: Phone, title: "Discovery Call", description: "We listen before we prescribe. Tell us about your property, your concerns, and your timeline — we'll outline exactly what happens next." },
  { number: "02", icon: Search, title: "On-Site Property Assessment", description: "Our team walks every surface, documents conditions with photos and measurements, and identifies issues you may not see from the ground." },
  { number: "03", icon: FileText, title: "Written Scope & Transparent Pricing", description: "You receive a detailed proposal: full scope of work, material specifications, realistic timeline, and line-item pricing — no hidden costs, no ambiguity." },
  { number: "04", icon: Layers, title: "Material & Design Alignment", description: "We present samples, color options, and performance data so every choice is informed by your home's architecture, elevation, and long-term goals." },
  { number: "05", icon: HardHat, title: "Precision Execution", description: "Our crews follow documented procedures, protect your property and landscaping, and provide daily progress updates throughout the build." },
  { number: "06", icon: CheckCircle, title: "Final Walkthrough & Quality Review", description: "Before we consider a project complete, we inspect every detail with you. If it doesn't meet our standard, it doesn't meet yours." },
  { number: "07", icon: Shield, title: "Warranty Delivery & Ongoing Support", description: "You receive complete documentation — manufacturer warranties, labor coverage, maintenance guidance, and direct access to our team for years to come." },
];

const OurProcess = () => {
  return (
    <section className="section-padding bg-secondary/40 relative overflow-hidden">
      {/* Background decorative number watermark */}
      <div className="absolute top-20 right-0 text-[20rem] font-heading font-bold text-foreground/[0.015] leading-none select-none pointer-events-none hidden lg:block">
        07
      </div>

      <div className="container-tight relative z-10">
        <div className="text-center mb-14 md:mb-18">
          <ScrollReveal variant="fade">
            <span className="eyebrow mb-3 block">Our Process</span>
          </ScrollReveal>
          <HeadingReveal delay={0.1}>
            <h2 className="section-heading mb-4">
              From Discovery Call<br className="hidden md:block" /> to Warranty Delivery.
            </h2>
          </HeadingReveal>
          <ScrollReveal variant="rise-subtle" delay={0.25}>
            <p className="text-muted-foreground max-w-xl mx-auto text-base font-body">
              Seven documented steps. Zero guesswork. Every project follows the same disciplined sequence — because consistent process is how you deliver consistent quality.
            </p>
          </ScrollReveal>
          <GoldLine width="3rem" centered delay={0.35} className="mt-6" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line with animated draw */}
          <motion.div
            className="hidden md:block absolute left-1/2 top-0 w-px -translate-x-1/2"
            style={{ background: "linear-gradient(to bottom, hsl(var(--highland-gold) / 0.15), hsl(var(--highland-gold) / 0.35), hsl(var(--highland-gold) / 0.15))" }}
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: HIGHLAND_EASE }}
          />

          <div className="space-y-6 md:space-y-0">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: HIGHLAND_EASE }}
                  className={`relative md:flex md:items-start md:gap-8 md:py-7 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`md:w-[calc(50%-2rem)] ${isLeft ? "md:text-right" : "md:text-left"}`}>
                    <div className="bg-card border border-border rounded-none p-5 md:p-7 shadow-sm hover:shadow-md hover:border-[hsl(var(--highland-gold)/0.2)] transition-all duration-400 group spotlight-hover">
                      <div className={`flex items-center gap-3.5 mb-3 ${isLeft ? "md:justify-end" : ""}`}>
                        <div className="w-10 h-10 rounded-none bg-primary/8 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/14 transition-colors duration-300">
                          <step.icon className="w-4.5 h-4.5 text-primary" />
                        </div>
                        <h3 className="text-base font-heading font-bold text-foreground tracking-tight">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm leading-[1.75] font-body relative z-10">{step.description}</p>
                    </div>
                  </div>

                  {/* Center number badge — gold ring pulse */}
                  <motion.div
                    className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-7 w-11 h-11 rounded-full bg-primary text-primary-foreground items-center justify-center z-10 glow-ring-gold"
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2, duration: 0.4, type: "spring", stiffness: 280, damping: 18 }}
                  >
                    <span className="font-heading font-bold text-xs">{step.number}</span>
                  </motion.div>

                  <div className="md:hidden absolute -left-1 top-5 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center glow-ring-gold">
                    <span className="font-heading font-bold text-[10px]">{step.number}</span>
                  </div>

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
