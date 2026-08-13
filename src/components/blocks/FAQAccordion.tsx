import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  items: FAQItem[];
  eyebrow?: string;
  heading?: string;
  intro?: string;
  className?: string;
}

export const FAQAccordion = ({ items, eyebrow = "Frequently Asked", heading = "Questions We Hear Most.", intro, className = "" }: Props) => (
  <section className={`section-padding bg-background ${className}`}>
    <div className="container-tight max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10 md:mb-12"
      >
        <span className="eyebrow mb-3 block">{eyebrow}</span>
        <h2 className="section-heading mb-4">{heading}</h2>
        {intro && <p className="text-muted-foreground text-base font-body">{intro}</p>}
      </motion.div>
      <Accordion type="single" collapsible className="space-y-2">
        {items.map((item, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-sm bg-card px-4">
            <AccordionTrigger className="text-left text-body-sm md:text-base font-heading font-bold text-foreground hover:no-underline py-4">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground font-body text-body-sm leading-relaxed pb-4">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);