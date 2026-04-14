import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

/* ═══════════════════════════════════════════
   FAQ DATA — Full Library
   ═══════════════════════════════════════════ */

export interface FAQ {
  q: string;
  a: string;
  categories: string[];
}

export const roofingFAQLibrary: FAQ[] = [
  // ── GENERAL / DIVISION LANDING ──
  { q: "How do I know if I need a roof repair or a full replacement?", a: "It depends on the scope, age, and condition of your roof. Isolated damage on a roof under 15 years old typically calls for repair. Widespread deterioration, multiple prior repairs, or a roof approaching 20+ years usually means replacement is the more cost-effective long-term path. We assess honestly and explain our reasoning.", categories: ["division", "residential", "repair", "replacement"] },
  { q: "How long does a roofing project typically take?", a: "Most residential repairs take 1–3 days. A standard residential replacement (tear-off and install) typically takes 2–5 days depending on size and complexity. Commercial projects are scoped individually. We provide a detailed timeline before work begins and communicate proactively if conditions change.", categories: ["division", "residential", "replacement", "commercial"] },
  { q: "What areas do you serve?", a: "We serve Western North Carolina including Buncombe, McDowell, Burke, Henderson, Rutherford, Transylvania, Haywood, Madison, and surrounding counties. Our crews are familiar with the specific climate and building conditions across the region — from valley floors to ridgeline elevations.", categories: ["division"] },
  { q: "Are you licensed and insured?", a: "Yes. Highlander Roofing & Construction is fully licensed and insured with comprehensive general liability and workers' compensation coverage. We're happy to provide certificates of insurance upon request.", categories: ["division", "commercial"] },
  { q: "Do you offer free inspections?", a: "We offer complimentary roof assessments for homeowners considering repair or replacement. Our assessment includes a full inspection, photo documentation, written findings, and a clear recommendation — at no cost and with no obligation.", categories: ["division", "residential"] },

  // ── RESIDENTIAL ROOFING ──
  { q: "What roofing materials do you recommend for homes in Western North Carolina?", a: "Architectural shingles are the most popular choice — they offer excellent value, 30–50 year warranties, and strong performance in our climate. Standing seam metal is ideal for homeowners who want maximum lifespan and minimal maintenance. Cedar shake suits architecturally distinctive mountain homes. We help you choose based on your home, budget, and goals.", categories: ["residential", "materials"] },
  { q: "How do I choose the right roofing style for my home?", a: "Consider your home's architecture, your neighborhood context, and your long-term plans. A craftsman-style home may suit architectural shingles in earth tones. A contemporary mountain home might call for standing seam metal. We provide material samples and can show you how different options look in context.", categories: ["residential", "materials"] },
  { q: "Will a new roof increase my home's value?", a: "Consistently, yes. A new roof is one of the highest-ROI home improvements, typically returning 60–70% of cost at resale. Beyond financial return, a new roof eliminates a major inspection concern for buyers and often accelerates sale timelines.", categories: ["residential", "replacement"] },

  // ── ROOF REPLACEMENT ──
  { q: "What are the signs I need a roof replacement?", a: "Common indicators include widespread granule loss, curling or buckling shingles, multiple areas of damage, daylight visible through decking, recurring leaks in different locations, and a roof age exceeding 20 years. If you're noticing any of these, a professional assessment will clarify your situation.", categories: ["replacement"] },
  { q: "What happens to my old roof during replacement?", a: "We perform a complete tear-off — removing all existing roofing material down to the decking. This allows us to inspect and repair the decking, install new underlayment, and ensure the new system starts on a sound foundation. All removed material is loaded into dumpsters and disposed of properly.", categories: ["replacement"] },
  { q: "Can I stay in my home during a roof replacement?", a: "Yes. Most homeowners remain in their home during replacement. Expect noise during working hours (typically 7 AM – 6 PM), vibration from tear-off, and temporary loss of access to certain areas near the house. We brief you on what to expect before work begins.", categories: ["replacement", "residential"] },

  // ── ROOF REPAIR ──
  { q: "How quickly can you respond to a roof leak?", a: "For active leaks and storm damage, we offer 24-hour emergency response including temporary tarping. Non-emergency repair assessments are typically scheduled within 24–48 hours of your call.", categories: ["repair", "storm"] },
  { q: "Will you try to sell me a full replacement when I only need a repair?", a: "No. We diagnose honestly and recommend based on what your roof actually needs. If a $400 repair will solve the problem, that's what we recommend — and we document our reasoning so you can verify our logic.", categories: ["repair"] },
  { q: "Do you warranty repair work?", a: "Yes. Every repair we perform comes with a Highlander labor warranty. The duration depends on the scope of the repair, and we specify it clearly before work begins.", categories: ["repair"] },

  // ── STORM DAMAGE ──
  { q: "How do I know if my roof has storm damage?", a: "After a storm, look for missing or displaced shingles, dented gutters or vents, granules accumulated in downspouts, fallen debris on the roof, and new interior water stains. Many forms of storm damage — especially hail bruising — are invisible from the ground and require professional inspection.", categories: ["storm"] },
  { q: "Will you help with my insurance claim?", a: "We provide thorough documentation — photographs, written damage reports, and material/labor scopes — that supports your claim. We'll meet with your insurance adjuster on-site and provide supplemental documentation if needed. We do not file claims on your behalf or act as public adjusters.", categories: ["storm"] },
  { q: "How do I avoid storm chasers after a major weather event?", a: "Work with a local company that has a permanent address, verifiable licensing and insurance, manufacturer certifications, and an established presence in Western North Carolina. Never sign contracts with door-knockers. If someone offers to 'waive your deductible,' that's illegal in North Carolina.", categories: ["storm"] },

  // ── COMMERCIAL ──
  { q: "What types of commercial buildings do you work on?", a: "Retail centers, office buildings, warehouses, industrial facilities, churches, schools, restaurants, multi-family residential, mixed-use buildings, and HOA-managed properties across Western North Carolina.", categories: ["commercial"] },
  { q: "Can you work around our business hours?", a: "Yes. We develop project-specific work plans that account for your operating schedule, noise sensitivities, and tenant requirements. Many commercial projects involve early-morning starts, phased execution, or weekend scheduling.", categories: ["commercial"] },
  { q: "Do you offer maintenance contracts?", a: "Yes. We offer bi-annual and quarterly maintenance programs including scheduled inspections, minor repairs, drain clearing, and condition reporting. These programs extend roof life, maintain warranty compliance, and provide documentation for ownership reporting.", categories: ["commercial"] },

  // ── MATERIALS ──
  { q: "What's the difference between 3-tab and architectural shingles?", a: "3-tab shingles are single-layer with a flat profile — reliable and affordable but lower wind resistance and shorter lifespan (15–25 years). Architectural shingles are multi-layer laminated with a dimensional profile, higher wind ratings (110–130 mph), and 30–50 year warranties. For most WNC homes, architectural shingles offer significantly better long-term value.", categories: ["materials", "residential"] },
  { q: "Is metal roofing worth the higher cost?", a: "For homeowners planning to stay in their home long-term, metal roofing often provides the best lifetime value. With a 40–70+ year lifespan, virtually zero maintenance, superior storm resistance, and energy efficiency — the higher upfront cost amortizes to less per year than most shingle options.", categories: ["materials", "residential"] },
  { q: "How does cedar shake perform in WNC's climate?", a: "Cedar performs beautifully in WNC with proper installation and maintenance. Its natural insulation properties provide thermal benefits, and the aesthetic complements mountain architecture perfectly. It requires periodic treatment for moss and insects, and proper ventilation is critical to prevent moisture issues in our humid summer months.", categories: ["materials"] },

  // ── TIMELINES & LOGISTICS ──
  { q: "When is the best time of year to replace a roof?", a: "Late spring through early fall offers the most consistent working conditions in WNC. However, modern materials can be installed year-round with proper technique. We schedule around weather windows and never compromise installation quality to meet a timeline.", categories: ["replacement", "residential"] },
  { q: "How do you handle cleanup after a roofing project?", a: "We run magnetic nail sweepers across the entire property — driveways, walkways, and yard areas. All debris is loaded into dumpsters daily. Landscaping disturbed during access is restored. We don't consider a project complete until the property looks better than when we arrived.", categories: ["division", "replacement"] },

  // ── WARRANTIES ──
  { q: "What warranties do you offer?", a: "We provide a Highlander workmanship warranty on all labor, plus manufacturer material warranties that vary by product — from 25-year limited to lifetime depending on the system. As CertainTeed certified installers, we can offer enhanced manufacturer warranty options that cover both materials and labor.", categories: ["division", "replacement", "materials"] },

  // ── QUALITY CONTROL ──
  { q: "How do you ensure quality during installation?", a: "Multi-point quality verification at critical stages: deck inspection after tear-off, underlayment placement, flashing installation, field shingle alignment, penetration sealing, ridge and hip completion, and final walkthrough. Each checkpoint is documented with photographs.", categories: ["division", "replacement", "residential"] },
];

/** Filter FAQs by category */
export const getFAQsByCategory = (category: string): FAQ[] =>
  roofingFAQLibrary.filter((faq) => faq.categories.includes(category));

/* ═══════════════════════════════════════════
   FAQ SECTION COMPONENT
   ═══════════════════════════════════════════ */

interface RoofingFAQsProps {
  category: string;
  heading?: string;
  eyebrow?: string;
  className?: string;
  variant?: "light" | "tartan";
  maxItems?: number;
}

const RoofingFAQs = ({
  category,
  heading = "Common Questions.",
  eyebrow = "FAQs",
  className = "",
  variant = "light",
  maxItems,
}: RoofingFAQsProps) => {
  const faqs = getFAQsByCategory(category);
  const displayFaqs = maxItems ? faqs.slice(0, maxItems) : faqs;
  const bgClass = variant === "tartan" ? "bg-secondary tartan-bg" : "bg-background";

  return (
    <section className={`section-padding ${bgClass} ${className}`}>
      <div className="container-tight max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-14">
          <span className="eyebrow mb-3 block">{eyebrow}</span>
          <h2 className="section-heading mb-4">{heading}</h2>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {displayFaqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
              <AccordionItem value={`faq-${i}`} className="bg-card border border-border rounded-sm px-5 md:px-7 data-[state=open]:border-primary/15 data-[state=open]:shadow-sm transition-all duration-300">
                <AccordionTrigger className="py-5 md:py-6 hover:no-underline gap-4">
                  <span className="font-heading font-semibold text-foreground text-[15px] leading-snug text-left">{faq.q}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pr-2">
                  <p className="text-muted-foreground text-sm leading-relaxed font-body">{faq.a}</p>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default RoofingFAQs;
