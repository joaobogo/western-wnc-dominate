import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DollarSign, Clock, Shield, MessageSquare, HardHat } from "lucide-react";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const objections = [
  { icon: DollarSign, question: "Why is your pricing higher than the other bids I'm getting?", answer: "Because the lowest bid usually means the shortest-lasting work. Our pricing reflects CertainTeed-certified materials selected for your specific elevation, full-time crews — not day laborers — and warranties we personally stand behind. We've rebuilt too many projects that were 'done right' by the cheapest option. We'd rather earn your trust once than inherit someone else's problems." },
  { icon: HardHat, question: "How much will this disrupt my family's daily life?", answer: "Less than you think. We stage materials carefully, contain debris daily, and communicate start times and noise windows before each phase. Most residential roofs are completed in 2–5 days. We treat your property like someone lives there — because someone does." },
  { icon: Shield, question: "I've been burned by contractors before. How is this different?", answer: "We're a licensed General Contractor and CertainTeed Master Applicator — top 1% nationally. But credentials aside: we live in these counties. The owner answers your call, walks your property, and personally signs off on every completed project. We provide written scope, photo documentation at every phase, and a warranty package you hold in your hands — not buried in an email." },
  { icon: Clock, question: "Is this actually urgent, or are you just trying to close a sale?", answer: "We'll tell you honestly. If you have an active leak or documented storm damage, waiting costs money. If it's cosmetic or preventative, we'll help you plan around weather windows, budget, and timing. There's no manufactured urgency here — just a candid assessment of what your property needs and when." },
  { icon: MessageSquare, question: "Will I actually be able to reach someone during the project?", answer: "You'll have a named point of contact assigned before work begins. You'll receive a written scope, daily progress updates during the build, and a final walkthrough when we're done. You will never have to call twice to get an answer." },
];

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
              We've heard these from hundreds of clients before signing.
              Here's what we tell them — every time, unedited.
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
              transition={{ delay: i * 0.07, duration: 0.45, ease: HIGHLAND_EASE }}
            >
              <AccordionItem
                value={`objection-${i}`}
                className="bg-card border border-border rounded-none px-5 md:px-7 data-[state=open]:border-[hsl(var(--highland-gold)/0.18)] data-[state=open]:shadow-[0_6px_24px_-6px_hsl(var(--heritage-charcoal)/0.06)] transition-all duration-500 spotlight-hover"
                style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
              >
                <AccordionTrigger className="py-5 md:py-6 hover:no-underline gap-4 [&[data-state=open]>div>.obj-icon]:bg-[hsl(var(--highland-gold)/0.1)] [&[data-state=open]>div>.obj-icon]:text-[hsl(var(--highland-gold))]">
                  <div className="flex items-center gap-4 text-left">
                    <div className="obj-icon w-9 h-9 rounded-none bg-secondary flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                      <item.icon className="w-4 h-4 text-muted-foreground transition-colors duration-300" />
                    </div>
                    <span className="font-heading font-semibold text-foreground text-[15px] leading-snug">
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
