import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqSchema } from "@/components/SEOHead";

const faqs = [
  {
  {
    q: "What roofing services does Highlander provide in Western North Carolina?",
    a: "Highlander provides a full range of roofing services across Western NC — roof repair, roof replacement, metal roofing, synthetic shake, cedar, gutters, skylights, storm damage response, and commercial roofing. Every system is specified for mountain elevation, wind exposure, and moisture conditions.",
  },
  {
    q: "Does Highlander provide both roof repair and roof replacement?",
    a: "Yes. Our crews handle everything from a single leak, failed pipe boot, or flashing repair to full tear-off and roof replacement. We diagnose the actual problem first — if a targeted repair will protect the home, that's what we recommend rather than a replacement you don't need.",
  },
  {
    q: "Does Highlander install metal roofing?",
    a: "Yes. Metal roofing is one of our most-installed systems for Western NC mountain homes. We install standing seam and exposed-fastener metal roofing with flashing details, fastening schedules, and underlayments sized for high-elevation wind, snow, and ice loading.",
  },
  {
    q: "Does Highlander serve Franklin, Highlands, Cashiers, and Sylva?",
    a: "Yes. Franklin is our home base, and we regularly work in Highlands, Cashiers, Sylva, Waynesville, Bryson City, Hayesville, Murphy, and the surrounding mountain communities including Scaly Mountain, Otto, and Lake Glenville. See our Service Areas page for the full footprint.",
  },
  {
    q: "Can Highlander help with construction and design services?",
    a: "Yes. Highlander is a licensed North Carolina General Contractor as well as a roofing company. We handle home additions, renovations, outdoor living, siding, and in-house design work — floor plans, elevations, and material planning that carry straight into the build.",
  },
  {
    q: "What should I do if water is coming into my home?",
    a: "Contain the water safely — move belongings, place a bucket under the drip, and if you can do so safely, take a photo of the affected area. Then call us at (828) 524-7773 during business hours and we'll schedule the fastest inspection we can arrange. For an active storm event, coordinate with your insurance carrier as well.",
  },
  {
    q: "How do I request an inspection or quote?",
    a: "Call (828) 524-7773 or submit a request through our inspection or contact form. A Highlander advisor will follow up to gather project details, confirm your service area, and schedule an on-site visit. On-site estimates for roofing and construction projects across Western NC are free.",
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
