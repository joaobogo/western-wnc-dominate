import { PHONE_DISPLAY, PHONE_TEL } from "@/data/business";
import { homeFaqs } from "@/data/home-faqs";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { ReactNode } from "react";

/**
 * Richer, linked versions of the plain answers in src/data/home-faqs.ts, keyed
 * by the exact question text. The question list and the plain answers (used for
 * the FAQPage JSON-LD that src/pages/Index.tsx passes to SEOHead) live in that
 * data file — this component only renders them. No JSON-LD is emitted here.
 */
const linkClass = "text-primary underline underline-offset-4 hover:no-underline";
const richAnswers: Record<string, ReactNode> = {
  "What roofing services does Highlander provide in Western North Carolina?": (
    <>
      Highlander provides a full range of <Link to="/roofing" className={linkClass}>roofing services across Western NC</Link> — including <Link to="/roofing/roof-repair" className={linkClass}>roof repair</Link>, <Link to="/roofing/roof-replacement" className={linkClass}>roof replacement</Link>, <Link to="/roofing/metal" className={linkClass}>metal roofing</Link>, <Link to="/roofing/gutters" className={linkClass}>gutters</Link>, <Link to="/roofing/skylights" className={linkClass}>skylights</Link>, and storm damage response. We also handle asphalt shingle, cedar and slate roofs, commercial roofing, and siding. Every system is specified for durability in severe weather: mountain elevation, wind exposure, and moisture conditions.
    </>
  ),
  "Does Highlander provide both roof repair and roof replacement?": (
    <>
      Yes. Our crews handle everything from a single leak or failed pipe boot on a <Link to="/roofing/residential" className={linkClass}>residential roof</Link> to full tear-off and <Link to="/roofing/roof-replacement" className={linkClass}>roof replacement for mountain homes</Link>. We diagnose the actual problem first — if a targeted <Link to="/roofing/roof-repair" className={linkClass}>roof repair in Western North Carolina</Link> will protect the home, that's what we recommend rather than a replacement you don't need. If you see curling shingles, missing shingles, flashing issues or one failed vent, repair is usually enough; widespread leaks, aging underlayment, a sag in the roofline or missing sections across several slopes point to replacement.
    </>
  ),
  "Does Highlander install metal roofing?": (
    <>
      Yes. <Link to="/roofing/metal" className={linkClass}>Metal roofing options</Link> are among our most-installed systems for Western NC mountain homes. We install standing seam and exposed-fastener metal roofing with flashing details, fastening schedules, and underlayments sized for high-elevation wind, snow, and ice loading. Homeowners choose it for snow-shedding performance, high-wind protection, heat protection in summer, and long-lasting installations. For a deeper comparison, see our guide to <Link to="/blog/metal-vs-shingle-roof-western-nc" className={linkClass}>metal vs. shingle roofs in Western NC</Link>.
    </>
  ),
  "Does Highlander serve Franklin, Highlands, Cashiers, and Sylva?": (
    <>
      Yes. Franklin is our home base, and we regularly work in <Link to="/service-areas/highlands-nc" className={linkClass}>Highlands</Link>, Cashiers, Sylva, Waynesville, Bryson City, Hayesville, Murphy, and the surrounding mountain communities including Scaly Mountain, Otto, and Lake Glenville. See our <Link to="/blog/best-roofing-materials-highlands-nc" className={linkClass}>guide to the best roofing materials for Highlands NC</Link> for a local material breakdown.
    </>
  ),
  "Can Highlander help with construction and design services?": (
    <>
      Yes. Highlander is a licensed North Carolina General Contractor and BBB accredited, as well as a roofing company. Explore our <Link to="/construction" className={linkClass}>construction and design services</Link>, including <Link to="/construction/design" className={linkClass}>in-house design</Link> (floor plans, elevations, material planning) and <Link to="/construction/outdoor-living" className={linkClass}>outdoor living projects</Link>.
    </>
  ),
  "How do I request an inspection or quote?": (
    <>
      Call {PHONE_DISPLAY}, <Link to="/request-inspection" className={linkClass}>request an inspection</Link>, or reach us through our <Link to="/request-inspection" className={linkClass}>contact form</Link>. A Highlander advisor will use your contact information to follow up, gather project details, confirm your service area, and schedule an on-site visit. On-site estimates for roofing and construction projects across Western NC are free, and pricing reflects roof size, home size, materials, design preferences and local labor rates.
    </>
  ),
  "When is the best time for gutter maintenance in the mountains?": (
    <>
      A two-stage approach works best for wooded WNC properties. Schedule a baseline inspection and cleaning before heavy leaf fall begins, then a follow-up after the main canopy has dropped. Seasonal maintenance and inspections help catch small problems before winter. For a complete guide and printable schedule, see our <Link to="/blog/pre-fall-gutter-maintenance-checklist-mountain-homeowners" className={linkClass}>Pre-Fall Gutter Maintenance Checklist for Mountain Homeowners</Link>.
    </>
  ),
};

const HomeFAQ = () => {
  return (
    <section id="faq" className="section-padding bg-background relative overflow-hidden">
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
            Frequently Asked Questions Before You{" "}
            <span className="text-[hsl(var(--gold-ink))]">Contact a Roofer.</span>
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
            {homeFaqs.map((faq, i) => (
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
                  {richAnswers[faq.q] ?? faq.a}
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
            to="/request-inspection"
            className="btn btn-primary btn-md group"
          >
            Get My Written Estimate
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
          <a
            href={PHONE_TEL}
            className="btn btn-secondary btn-md group"
          >
            <Phone className="w-4 h-4 text-primary" aria-hidden="true" /> {PHONE_DISPLAY}
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
