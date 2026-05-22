import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

/* ═══════════════════════════════════════════
   CONSTRUCTION FAQ LIBRARY
   ═══════════════════════════════════════════ */

export interface FAQ {
  q: string;
  a: string;
  categories: string[];
}

export const constructionFAQLibrary: FAQ[] = [
  // ── PLANNING & SCOPE ──
  { q: "How does a construction project with Highlander begin?", a: "Every project starts with a conversation — not a sales pitch. We listen to what you want to accomplish, evaluate your property, and determine whether Highlander is the right fit. If we proceed, you receive a written proposal with defined scope, specified materials, a confirmed timeline, and transparent cost groupings before any commitment.", categories: ["division", "additions", "renovations", "outdoor", "custom"] },
  { q: "How do you determine the scope and cost of a project?", a: "Through site assessment, design development, and detailed scope documentation. We don't estimate from photographs or guess over the phone. Every proposal includes specified materials, defined deliverables, and a realistic timeline — so you know exactly what you're getting and what you're investing.", categories: ["division", "additions", "renovations", "custom"] },
  { q: "Do you provide free estimates?", a: "We offer complimentary initial consultations to discuss your project goals and evaluate feasibility. For projects that proceed to detailed design and proposal, we invest significant time in site assessment, scope development, and material specification. This ensures the proposal you receive is accurate and comprehensive — not a rough guess that changes later.", categories: ["division"] },

  // ── TIMELINE ──
  { q: "How long does a typical construction project take?", a: "Timelines vary by scope. A focused renovation may take 2–4 weeks. A home addition typically runs 3–6 months. Complex custom projects can take 6–12 months. We provide a specific, detailed schedule during the proposal phase and update it proactively throughout the project.", categories: ["division", "additions", "renovations", "custom"] },
  { q: "What causes construction delays, and how do you handle them?", a: "Weather, material lead times, permit review timing, and unexpected site conditions are the most common causes. We mitigate these through thorough planning, early material ordering, and scheduling buffers for weather-sensitive work. When delays occur, you're notified immediately with an updated timeline and our plan to recover.", categories: ["division", "additions", "renovations", "outdoor", "custom"] },
  { q: "When is the best time of year to start a construction project in WNC?", a: "Spring through early fall offers the most consistent working conditions. However, interior-focused work and planning phases can proceed year-round. We recommend starting the planning and permitting process 2–3 months before your ideal construction start date.", categories: ["division", "additions", "outdoor"] },

  // ── DISRUPTION & LIVING CONDITIONS ──
  { q: "Can I stay in my home during construction?", a: "In most cases, yes. We plan construction phasing to maintain livable conditions — with dust barriers, dedicated access routes, and coordinated scheduling for noisy or disruptive work. For major whole-home renovations that affect essential living areas like kitchens and bathrooms, we'll discuss temporary relocation options during planning.", categories: ["additions", "renovations", "custom"] },
  { q: "How do you minimize disruption to daily life?", a: "Through phasing, scheduling, and communication. We identify which phases generate noise, dust, or access disruption and schedule them to minimize impact. Dust barriers are installed between work zones and living areas. We communicate daily about what to expect and coordinate around your schedule when possible.", categories: ["additions", "renovations", "custom"] },
  { q: "How do you protect my existing home and property?", a: "Finished surfaces are covered with protective materials. Floors along access routes are protected. Landscaping near work areas is documented and restored. We maintain clean work zones, remove debris daily, and treat your property with the same care we'd want for our own homes.", categories: ["additions", "renovations", "outdoor", "custom"] },

  // ── DESIGN COORDINATION ──
  { q: "Do you work with designers and project planners?", a: "Yes. For complex or design-forward projects, we collaborate with local designers and planners. We can work from plans you've developed with your design team or participate in the planning process from the beginning. Our design-build capability also handles many projects that don't require external design services.", categories: ["additions", "custom"] },
  { q: "Will an addition match my existing home?", a: "This is one of our primary focuses. We match rooflines, siding profiles, trim details, window proportions, and exterior materials to ensure the addition looks like it was always part of the home. When exact matches aren't available, we source the closest alternatives or recommend approaches that create intentional, attractive transitions.", categories: ["additions"] },
  { q: "How do you handle design decisions during the project?", a: "All major design decisions are made during the planning phase — before construction begins. When field conditions require design adjustments, we present options, explain implications, and document the agreed-upon change before proceeding. No decisions are made without your input.", categories: ["additions", "renovations", "custom"] },

  // ── PERMITS & REGULATIONS ──
  { q: "Do construction projects require permits?", a: "Most construction projects in WNC require permits — additions, structural modifications, electrical work, plumbing changes, and covered outdoor structures all typically require review and approval. We handle the entire permitting process as part of our standard scope, including application preparation, submission, and inspection coordination.", categories: ["division", "additions", "outdoor"] },
  { q: "How long does permitting take in WNC?", a: "Permit review timelines vary by county and project complexity. Simple projects may be approved in 1–2 weeks. Complex additions or custom work may take 4–8 weeks including any required engineering review. We factor permitting timelines into project scheduling and begin the process early to minimize delays.", categories: ["additions", "outdoor", "custom"] },

  // ── MATERIALS ──
  { q: "How do you select materials for WNC conditions?", a: "We specify materials rated for the specific conditions your property faces — UV intensity at elevation, freeze-thaw cycling, moisture exposure, and wind loads. We don't use piedmont or coastal specifications. Material selections are presented with performance data, maintenance requirements, and warranty details so you can make informed decisions.", categories: ["division", "additions", "renovations", "outdoor"] },
  { q: "Can I choose my own materials?", a: "Yes — within structural and performance parameters. We'll evaluate your preferred materials for suitability, provide honest feedback on performance expectations, and confirm compatibility with the project design. If a preferred material isn't suitable, we'll explain why and offer alternatives that achieve the same aesthetic.", categories: ["renovations", "custom"] },

  // ── COMMUNICATION ──
  { q: "How will I know what's happening on my project?", a: "You'll have a single dedicated project manager who provides daily updates during active construction, milestone confirmations at key stages, and proactive notification of any changes. You'll never have to chase us for information or wonder what's happening.", categories: ["division", "additions", "renovations", "outdoor", "custom"] },
  { q: "What happens if something unexpected is discovered during construction?", a: "We stop, document the finding, assess the implications, and contact you immediately with options. Every unexpected discovery is handled through a written change order that describes the scope, cost impact, and timeline impact — approved by you before work proceeds.", categories: ["division", "renovations", "custom"] },
  { q: "Who is my point of contact during the project?", a: "Your dedicated project manager — from initial planning through final walk-through. This person knows every detail of your scope, schedule, and preferences. You'll have their direct phone number and can reach them during business hours for any question.", categories: ["division", "additions", "custom"] },

  // ── SITE CLEANLINESS ──
  { q: "How do you handle cleanup during and after construction?", a: "Work areas are cleaned daily. Debris is removed or contained in designated areas. At project completion, we perform a comprehensive cleanup including debris removal, dust cleaning, surface restoration, and landscape repair. We run magnetic sweepers across driveways and walkways. Your property is returned to pre-construction condition — or better.", categories: ["division", "additions", "renovations", "outdoor"] },

  // ── PROJECT PHASING ──
  { q: "Can a project be done in phases to spread out cost?", a: "Yes. Many projects are well-suited to phased execution — completing foundational or structural work first, then finishing additional areas over time. We design phasing plans that leave clean stopping points between stages, so each phase is usable and complete rather than half-finished.", categories: ["additions", "renovations", "custom"] },
  { q: "How do you coordinate multiple trades on a complex project?", a: "Through detailed scheduling and proactive trade management. We sequence work so trades aren't competing for space, materials arrive when needed, and inspections are scheduled at the right milestones. Our project managers coordinate daily trade schedules and resolve conflicts before they cause delays.", categories: ["additions", "custom"] },

  // ── CUSTOM WORK ──
  { q: "What makes a project 'custom' versus standard construction?", a: "Custom projects involve non-standard design requirements, unusual materials, complex structural work, visually sensitive details, or high coordination demands. They require more planning, more communication, and more supervision — and they're priced accordingly. We're selective about custom work because quality at this level requires commitment.", categories: ["custom"] },
  { q: "Do you take on every project that comes to you?", a: "No. We're selective about the projects we accept — particularly for custom and complex work. We look for projects where our skills, experience, and approach are genuinely the right fit, and where scope, timeline, and budget are aligned. This selectivity protects our quality standards and your investment.", categories: ["custom"] },

  // ── OUTDOOR LIVING ──
  { q: "What decking material do you recommend for WNC?", a: "For most WNC homeowners, composite decking offers the best balance of appearance, durability, and low maintenance at elevation. Cedar and hardwoods are excellent for clients who prefer natural materials and accept periodic maintenance. We recommend based on your elevation, exposure, usage patterns, and maintenance tolerance.", categories: ["outdoor"] },
  { q: "Can outdoor spaces be used year-round in WNC?", a: "With the right design, many outdoor spaces can be used 8–10 months per year. Screened porches extend summer. Covered structures with heaters extend into fall and spring. Four-season rooms with insulation and HVAC work year-round. We design for extended usability — not just peak-season aesthetics.", categories: ["outdoor"] },
  { q: "Do outdoor structures need permits?", a: "Most covered structures, decks above a certain height, and anything with electrical or plumbing require permits in WNC. We handle the entire permitting process as part of our standard scope — including engineering if required for covered structures or elevated platforms.", categories: ["outdoor"] },

  // ── QUALITY CONTROL ──
  { q: "How do you ensure construction quality?", a: "Through daily oversight, documented quality checkpoints at critical stages, and a project management system that tracks every detail. Our project managers verify work quality against specifications before crews move to each new phase. We don't rely on final inspection to catch problems — we prevent them throughout the build.", categories: ["division", "additions", "renovations", "custom"] },
  { q: "What warranties do you offer on construction work?", a: "Every project includes a Highlander workmanship warranty. Duration varies by project type and scope, and is specified clearly in your proposal. Material warranties from manufacturers are provided separately. We stand behind our work — and we're still here in Western North Carolina when you need us.", categories: ["division", "additions", "renovations", "outdoor"] },

  // ── VALUE & INVESTMENT ──
  { q: "Will construction work increase my home's value?", a: "Well-designed, well-executed construction work consistently increases home value. Additions typically return 50–70% of cost at resale. Exterior renovations return 60–80%. Beyond financial return, quality construction eliminates the need to move and the associated costs and disruption — often the most valuable return of all.", categories: ["division", "additions", "renovations"] },
  { q: "How does Highlander's pricing compare to other contractors?", a: "We're not the cheapest option — and we're transparent about why. Our pricing reflects in-house crews (not anonymous subcontractors), detailed project management, specified materials, documented quality checkpoints, and the planning discipline that prevents the cost overruns that make 'cheap' contractors expensive. We compete on value delivered, not price quoted.", categories: ["division"] },
];

/** Filter FAQs by category */
export const getConstructionFAQsByCategory = (category: string): FAQ[] =>
  constructionFAQLibrary.filter((faq) => faq.categories.includes(category));

/* ═══════════════════════════════════════════
   FAQ SECTION COMPONENT
   ═══════════════════════════════════════════ */

interface ConstructionFAQsProps {
  category: string;
  heading?: string;
  eyebrow?: string;
  className?: string;
  variant?: "light" | "tartan";
  maxItems?: number;
}

const ConstructionFAQs = ({
  category,
  heading = "Common Questions.",
  eyebrow = "FAQs",
  className = "",
  variant = "light",
  maxItems,
}: ConstructionFAQsProps) => {
  const faqs = getConstructionFAQsByCategory(category);
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

export default ConstructionFAQs;
