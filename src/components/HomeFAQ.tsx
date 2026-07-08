import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqSchema } from "@/components/SEOHead";

const faqs = [
  {
    q: "What areas does Highlander Roofing serve in Western NC?",
    a: "Highlander Roofing & Construction serves Franklin, Highlands, Cashiers, Sylva, Waynesville, Brevard, Bryson City, Asheville, and the surrounding Western North Carolina mountain communities — including Macon, Jackson, Buncombe, Haywood, Swain, and Transylvania counties. If you're searching for a roofing contractor near Franklin, Highlands, or Cashiers NC, we cover it.",
  },
  {
    q: "Do you offer free roofing estimates in Western North Carolina?",
    a: "Yes. We provide free, on-site estimates for every roofing and construction project across Western NC. Call (828) 524-7773 or request one through our contact form and a Highlander advisor will schedule a visit — usually within a few business days.",
  },
  {
    q: "Do you handle both roof repair and roof replacement in Western NC?",
    a: "Yes. From a single failed pipe boot to a full tear-off and roof replacement, our roofing crews handle the full range. We diagnose honestly: if a targeted roof repair will solve the problem and protect the home, that's what we recommend — not a replacement you don't need.",
  },
  {
    q: "Do you install metal roofing on mountain homes?",
    a: "Yes. Metal roofing is one of the most requested systems for Western NC mountain homes because it sheds snow, resists wind uplift at elevation, and lasts 40–70 years. We install standing seam and exposed-fastener metal roofing sized and detailed for high-elevation weather.",
  },
  {
    q: "Do you help with storm damage and insurance claims?",
    a: "Yes. We provide emergency tarping, drone-documented damage assessments, and direct coordination with your insurance adjuster. We document the scope so your claim moves cleanly and the repair is done right.",
  },
  {
    q: "Are you a roofing company or a full construction company?",
    a: "Both. Highlander is a licensed roofing contractor and a licensed North Carolina General Contractor — a true roofing and construction company serving Western NC. That means the same team builds your addition, sunroom, garage, porch, deck, outdoor living space, or full renovation, all held to the same documented standard as our roofing work.",
  },
  {
    q: "Do you offer financing?",
    a: "Financing may be available for major roofing and construction projects. Ask your project advisor during your consultation and they will walk you through the current options. Specific terms come from the lender at the time of application.",
  },
  {
    q: "How quickly will a Highlander roofing advisor contact me?",
    a: "During business hours we typically respond within a few hours. After-hours requests are answered the next business morning. For an active roof leak or storm emergency anywhere in Western NC, call (828) 524-7773 directly for the fastest response.",
  },
];

const HomeFAQ = () => {
  return (
    <section id="faq" className="section-padding bg-secondary/30 relative overflow-hidden">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(faqs.map((f) => ({ question: f.q, answer: f.a })))),
        }}
      />

      <div className="container-tight max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="eyebrow mb-3 block">Common Questions</span>
          <h2 className="section-heading mb-4">
            Answers Before You{" "}
            <span className="text-[hsl(var(--highland-gold))]">Pick Up the Phone.</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg font-body max-w-2xl mx-auto">
            Short answers to the questions homeowners ask most. For anything specific to your property, call us or send a message and we will answer plainly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-card border border-border rounded-sm p-2 md:p-4 shadow-sm"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`faq-${i}`}
                className="border-b border-border/60 last:border-b-0"
              >
                <AccordionTrigger className="text-left font-heading font-bold text-foreground text-base md:text-lg hover:text-primary py-5 px-3 md:px-4 hover:no-underline">
                  <span className="flex items-start gap-3">
                    <HelpCircle className="w-4 h-4 text-primary/60 flex-shrink-0 mt-1.5" />
                    <span>{faq.q}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base font-body leading-relaxed pb-5 px-3 md:px-4 pl-10 md:pl-11">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/contact"
            className="group cta-gradient text-accent-foreground font-semibold text-sm px-7 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:opacity-90 transition-all min-h-11"
          >
            Request a Free Quote
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="tel:+18285247773"
            className="group bg-card border border-border text-foreground font-semibold text-sm px-7 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:border-primary/40 transition-all min-h-11"
          >
            <Phone className="w-4 h-4 text-primary" /> (828) 524-7773
          </a>
          <Link
            to="/faq"
            className="text-sm font-heading font-bold text-primary hover:text-primary/80 inline-flex items-center gap-1.5 transition-colors min-h-11 px-3"
          >
            See all FAQs <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeFAQ;
