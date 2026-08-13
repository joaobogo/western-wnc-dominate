import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqSchema } from "@/components/SEOHead";

const faqs = [
  {
    q: "What roofing services does Highlander provide in Western North Carolina?",
    aNode: (
      <>
        Highlander provides a full range of <Link to="/roofing" className="text-primary underline underline-offset-4 hover:no-underline">roofing services across Western NC</Link> — including <Link to="/roofing/roof-repair" className="text-primary underline underline-offset-4 hover:no-underline">roof repair</Link>, <Link to="/roofing/roof-replacement" className="text-primary underline underline-offset-4 hover:no-underline">roof replacement</Link>, <Link to="/roofing/metal" className="text-primary underline underline-offset-4 hover:no-underline">metal roofing</Link>, <Link to="/roofing/gutters" className="text-primary underline underline-offset-4 hover:no-underline">gutters</Link>, <Link to="/roofing/skylights" className="text-primary underline underline-offset-4 hover:no-underline">skylights</Link>, and storm damage response. Every system is specified for mountain elevation, wind exposure, and moisture conditions.
      </>
    ),
    a: "Highlander provides a full range of roofing services across Western NC — including roof repair, roof replacement, metal roofing, gutters, skylights, and storm damage response. Every system is specified for mountain elevation, wind exposure, and moisture conditions.",
  },
  {
    q: "Does Highlander provide both roof repair and roof replacement?",
    aNode: (
      <>
        Yes. Our crews handle everything from a single leak or failed pipe boot on a <Link to="/roofing/residential" className="text-primary underline underline-offset-4 hover:no-underline">residential roof</Link> to full tear-off and <Link to="/roofing/roof-replacement" className="text-primary underline underline-offset-4 hover:no-underline">roof replacement for mountain homes</Link>. We diagnose the actual problem first — if a targeted <Link to="/roofing/roof-repair" className="text-primary underline underline-offset-4 hover:no-underline">roof repair in Western North Carolina</Link> will protect the home, that's what we recommend rather than a replacement you don't need.
      </>
    ),
    a: "Yes. Our crews handle everything from a single leak or failed pipe boot to full tear-off and roof replacement for mountain homes. We diagnose the actual problem first — if a targeted roof repair will protect the home, that's what we recommend rather than a replacement you don't need.",
  },
  {
    q: "Does Highlander install metal roofing?",
    aNode: (
      <>
        Yes. <Link to="/roofing/metal" className="text-primary underline underline-offset-4 hover:no-underline">Metal roofing options</Link> are among our most-installed systems for Western NC mountain homes. We install standing seam and exposed-fastener metal roofing with flashing details, fastening schedules, and underlayments sized for high-elevation wind, snow, and ice loading. For a deeper comparison, see our guide to <Link to="/blog/metal-vs-shingle-roof-western-nc" className="text-primary underline underline-offset-4 hover:no-underline">metal vs. shingle roofs in Western NC</Link>.
      </>
    ),
    a: "Yes. Metal roofing is among our most-installed systems for Western NC mountain homes. We install standing seam and exposed-fastener metal roofing with flashing details, fastening schedules, and underlayments sized for high-elevation wind, snow, and ice loading.",
  },
  {
    q: "Does Highlander serve Franklin, Highlands, Cashiers, and Sylva?",
    aNode: (
      <>
        Yes. Franklin is our home base, and we regularly work in <Link to="/service-areas/highlands-nc" className="text-primary underline underline-offset-4 hover:no-underline">Highlands</Link>, Cashiers, Sylva, Waynesville, Bryson City, Hayesville, Murphy, and the surrounding mountain communities including Scaly Mountain, Otto, and Lake Glenville. See our <Link to="/blog/best-roofing-materials-highlands-nc" className="text-primary underline underline-offset-4 hover:no-underline">guide to the best roofing materials for Highlands NC</Link> for a local material breakdown.
      </>
    ),
    a: "Yes. Franklin is our home base, and we regularly work in Highlands, Cashiers, Sylva, Waynesville, Bryson City, Hayesville, Murphy, and the surrounding mountain communities including Scaly Mountain, Otto, and Lake Glenville.",
  },
  {
    q: "Can Highlander help with construction and design services?",
    aNode: (
      <>
        Yes. Highlander is a licensed North Carolina General Contractor as well as a roofing company. Explore our <Link to="/construction" className="text-primary underline underline-offset-4 hover:no-underline">construction and design services</Link>, including <Link to="/construction/design" className="text-primary underline underline-offset-4 hover:no-underline">in-house design</Link> (floor plans, elevations, material planning) and <Link to="/construction/outdoor-living" className="text-primary underline underline-offset-4 hover:no-underline">outdoor living projects</Link>.
      </>
    ),
    a: "Yes. Highlander is a licensed North Carolina General Contractor as well as a roofing company. We handle construction, in-house design, home additions, renovations, and outdoor living projects.",
  },
  {
    q: "What should I do if water is coming into my home?",
    a: "Contain the water safely — move belongings, place a bucket under the drip, and if you can do so safely, take a photo of the affected area. Then call us at (828) 524-7773 during business hours and we'll schedule the fastest inspection we can arrange. For an active storm event, coordinate with your insurance carrier as well.",
  },
  {
    q: "How do I request an inspection or quote?",
    aNode: (
      <>
        Call (828) 524-7773, <Link to="/request-inspection" className="text-primary underline underline-offset-4 hover:no-underline">request an inspection</Link>, or reach us through our <Link to="/contact" className="text-primary underline underline-offset-4 hover:no-underline">contact form</Link>. A Highlander advisor will follow up to gather project details, confirm your service area, and schedule an on-site visit. On-site estimates for roofing and construction projects across Western NC are free.
      </>
    ),
    a: "Call (828) 524-7773, request an inspection, or reach us through our contact form. A Highlander advisor will follow up to gather project details, confirm your service area, and schedule an on-site visit. On-site estimates for roofing and construction projects across Western NC are free.",
  },
];

const HomeFAQ = () => {
  return (
    <section id="faq" className="section-padding bg-background relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(faqs.map((f) => ({ question: f.q, answer: f.a })))),
        }}
      />

      <div className="container-tight max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <span className="eyebrow mb-3 block">Common Questions</span>
          <h2 className="section-heading mb-4">
            Answers Before You{" "}
            <span className="text-[hsl(var(--gold-ink))]">Pick Up the Phone.</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg font-body max-w-2xl mx-auto">
            Short answers to the questions homeowners ask most. For anything specific to your property, call us or send a message and we will answer plainly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-card border border-border rounded-sm p-2 md:p-4 shadow-flat"
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
                    <HelpCircle className="w-4 h-4 text-primary/80 flex-shrink-0 mt-1.5" aria-hidden="true" />
                    <span>{faq.q}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base font-body leading-relaxed pb-5 px-3 md:px-4 pl-10 md:pl-11">
                  {faq.aNode ?? faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/contact"
            className="btn btn-primary btn-md group"
          >
            Request an Estimate
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
          <a
            href="tel:+18285247773"
            className="btn btn-secondary btn-md group"
          >
            <Phone className="w-4 h-4 text-primary" aria-hidden="true" /> (828) 524-7773
          </a>
          <Link
            to="/faq"
            className="text-sm font-heading font-bold text-primary hover:text-primary/80 inline-flex items-center gap-1.5 transition-colors min-h-11 px-3"
          >
            See all FAQs <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeFAQ;
