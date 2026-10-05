import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DollarSign, Clock, Shield, MessageSquare, HardHat } from "lucide-react";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const objections = [
  { icon: DollarSign, question: "Why can roofing bids be so different?", answer: "Roofing proposals can differ because the material system, tear-off assumptions, flashing details, ventilation, access, decking allowances, cleanup, and warranty eligibility are not always scoped the same way. Highlander puts the proposed scope and material direction in writing so you can compare what is actually included." },
  { icon: HardHat, question: "How much will the work disrupt my home?", answer: "Roofing is noisy and active work, so we do not pretend otherwise. Before mobilization, the project team explains staging, access, expected work windows, property-protection steps, and the schedule for your specific roof." },
  { icon: Shield, question: "I've been burned by contractors before. How is this different?", answer: "Highlander is a licensed North Carolina General Contractor, CertainTeed Credentialed Contractor, and VELUX Certified Installer. More importantly, your project starts with a written scope and clear contact path, so the work being discussed is documented before it begins." },
  { icon: Clock, question: "Is this actually urgent, or are you just trying to close a sale?", answer: "An active leak or exposed storm damage deserves prompt attention, while cosmetic or preventative work may allow more planning time. Highlander documents what is visible, explains the risk, and lets the condition of the property drive the recommendation." },
  { icon: MessageSquare, question: "How will communication work during the project?", answer: "The project documentation identifies the Highlander contact and the planned communication path. Schedule changes, scope questions, and any material changes should be documented so you are not relying on vague verbal promises." },
]

const SilentObjections = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-tight max-w-4xl">
        <div className="text-center mb-10 md:mb-14">
          <ScrollReveal variant="fade">
            <span className="eyebrow mb-3 block">Before You Decide</span>
          </ScrollReveal>
          <HeadingReveal delay={0.1}>
            <h2 className="section-heading mb-4">
              Five Concerns Every<br className="hidden md:block" /> Homeowner Has.
            </h2>
          </HeadingReveal>
          <ScrollReveal variant="rise-subtle" delay={0.25}>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm font-body leading-relaxed">
              These are common questions homeowners raise before signing.
              The answers below explain how Highlander approaches them.
            </p>
          </ScrollReveal>
          <GoldLine width="3rem" centered delay={0.35} className="mt-6" />
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {objections.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4, ease: HIGHLAND_EASE }}
            >
              <AccordionItem
                value={`objection-${i}`}
                className="bg-card border border-border rounded-none px-5 md:px-7 data-[state=open]:border-[hsl(var(--highland-gold)/0.18)] data-[state=open]:shadow-flat transition-all duration-500 spotlight-hover"
                style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
              >
                <AccordionTrigger className="py-5 md:py-6 hover:no-underline gap-4 [&[data-state=open]>div>.obj-icon]:bg-[hsl(var(--highland-gold)/0.1)] [&[data-state=open]>div>.obj-icon]:text-[hsl(var(--gold-ink))]">
                  <div className="flex items-center gap-4 text-left">
                    <div className="obj-icon w-9 h-9 rounded-none bg-secondary flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                      <item.icon className="w-4 h-4 text-muted-foreground transition-colors duration-300" />
                    </div>
                    <span className="font-heading font-semibold text-foreground text-body-sm leading-snug">
                      {item.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pl-[3.25rem] pr-2">
                  <p className="text-muted-foreground text-sm leading-relaxed font-body">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default SilentObjections;
