import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DollarSign, Clock, Shield, MessageSquare, HardHat, Award } from "lucide-react";

const objections = [
  {
    icon: DollarSign,
    question: "Your prices seem higher than other contractors. Why should I pay more?",
    answer: "Because the lowest bid is rarely the best long-term decision. Our pricing reflects certified materials, experienced crews who work year-round in mountain conditions, documented processes, and warranties we actually stand behind. We've seen too many homeowners pay twice — once for the cheap job, and again to fix it. We'd rather do it right the first time and save you the second call.",
  },
  {
    icon: HardHat,
    question: "How much disruption will my family deal with during the project?",
    answer: "We take property protection seriously — drop cloths, debris containment, daily cleanup, and careful staging are standard on every job. We communicate start times, noise expectations, and access needs before work begins. Most residential roof projects are completed in 2–5 days. We work efficiently so your life gets back to normal as fast as possible.",
  },
  {
    icon: Shield,
    question: "How do I know I can trust you with a project this important?",
    answer: "We're a licensed general contractor, CertainTeed Master Shingle Applicator certified, and fully insured. We've completed 500+ projects across Western NC since 2017. But beyond credentials — we live here, we drive past your home every week, and our reputation is our business. We provide references, photo documentation, and written warranties on every project.",
  },
  {
    icon: Clock,
    question: "I'm not sure about timing. Is now really the right time to start?",
    answer: "That depends on your situation — and we'll tell you honestly. Some projects are urgent (active leaks, storm damage). Others benefit from strategic timing around weather windows. We'll assess your property, explain what's time-sensitive and what can wait, and help you plan around your schedule and budget. There's no pressure to start before you're ready.",
  },
  {
    icon: MessageSquare,
    question: "Will I actually hear from you during the project, or will I be left wondering?",
    answer: "You'll have a named point of contact from day one. We provide a written scope before work begins, daily progress updates during the project, and a final walkthrough when it's complete. You'll never have to chase us for information — that's a promise, not a policy.",
  },
  {
    icon: Award,
    question: "How do I know the materials and workmanship will actually last?",
    answer: "We specify materials for your property's specific elevation, exposure, and climate zone — not generic recommendations. Every installation follows manufacturer specifications to maintain full warranty coverage. You'll receive a complete warranty package including material certificates, labor warranty, and maintenance guidance. We build for decades, not just inspections.",
  },
];

const SilentObjections = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-tight max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="eyebrow mb-3 block">Honest Answers</span>
          <h2 className="section-heading mb-4">
            Questions You're<br className="hidden md:block" /> Already Thinking About.
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm font-body leading-relaxed">
            We know choosing a contractor is a serious decision. Here are the concerns we hear most
            — and the straightforward answers we think you deserve.
          </p>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {objections.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <AccordionItem
                value={`objection-${i}`}
                className="bg-card border border-border rounded-sm px-5 md:px-7 data-[state=open]:border-primary/15 data-[state=open]:shadow-sm transition-all duration-300"
              >
                <AccordionTrigger className="py-5 md:py-6 hover:no-underline gap-4 [&[data-state=open]>div>.obj-icon]:bg-primary/12 [&[data-state=open]>div>.obj-icon]:text-primary">
                  <div className="flex items-center gap-4 text-left">
                    <div className="obj-icon w-9 h-9 rounded-sm bg-secondary flex items-center justify-center flex-shrink-0 transition-colors duration-300">
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
