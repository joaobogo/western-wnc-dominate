import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

interface Testimonial {
  name: string;
  location: string;
  rating: 5;
  text: string;
  project: string;
  category: "Roofing" | "Construction" | "Storm" | "Commercial";
  outcome: string;
  featured?: boolean;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah M.", location: "Highlands, NC", rating: 5,
    text: "Highlander replaced our entire roof after storm damage. They handled the insurance paperwork, kept us informed daily, and finished in four days. The roof looks better than the original — and the warranty documentation was delivered at our walkthrough.",
    project: "Full Roof Replacement — Storm Damage", category: "Storm",
    outcome: "Insurance claim processed. New CertainTeed system installed in 4 days.", featured: true,
  },
  {
    name: "James T.", location: "Franklin, NC", rating: 5,
    text: "We had a leak during heavy rain. Highlander was on-site the next morning, found the problem, and had it permanently repaired by afternoon. No upsell, no drama — just honest, competent work at a fair price.",
    project: "Emergency Leak Repair", category: "Roofing",
    outcome: "Root cause identified and permanently resolved in one visit.",
  },
  {
    name: "Linda K.", location: "Cashiers, NC", rating: 5,
    text: "We've used Highlander for two properties now. Their standing seam metalwork is exceptional — these are the only crews I'd trust at 3,800 feet. They genuinely understand what mountain weather demands.",
    project: "Standing Seam Metal — Two Properties", category: "Roofing",
    outcome: "Both properties re-roofed with 50-year metal systems.", featured: true,
  },
  {
    name: "Robert & Anne P.", location: "Sylva, NC", rating: 5,
    text: "From inspection to final walkthrough, everything was documented and communicated clearly. The crew was respectful of our landscaping and finished ahead of schedule. We have the warranty binder to prove the quality.",
    project: "Roof Replacement & Gutter System", category: "Roofing",
    outcome: "Completed 2 days ahead of schedule. Full warranty package delivered.",
  },
  {
    name: "David R.", location: "Bryson City, NC", rating: 5,
    text: "Highlander built our covered porch and replaced the deck — the craftsmanship is outstanding. Having one team handle roofing and construction meant a single point of contact, one timeline, and zero coordination headaches.",
    project: "Deck & Covered Porch Build", category: "Construction",
    outcome: "New outdoor living space completed in 3 weeks.",
  },
  {
    name: "Mountain Properties LLC", location: "Franklin, NC", rating: 5,
    text: "We manage 14 rental properties across Macon County. Highlander handles all roofing maintenance, emergency repairs, and documentation. Their consistency and communication make our property management significantly easier.",
    project: "Multi-Property Maintenance Program", category: "Commercial",
    outcome: "14 properties under a single maintenance agreement.",
  },
];

const categoryColors: Record<string, string> = {
  Roofing: "bg-primary/10 text-primary",
  Construction: "bg-[hsl(var(--highland-gold)/0.12)] text-[hsl(var(--highland-gold))]",
  Storm: "bg-destructive/10 text-destructive",
  Commercial: "bg-secondary text-muted-foreground",
};

const Reviews = () => {
  const featured = testimonials.filter((t) => t.featured);
  const standard = testimonials.filter((t) => !t.featured);

  return (
    <section className="section-padding bg-background tartan-bg relative overflow-hidden">
      <div className="container-tight relative z-10">
        {/* Header */}
        <div className="text-center mb-14 md:mb-16">
          <ScrollReveal variant="fade">
            <span className="eyebrow mb-3 block">What Our Clients Say</span>
          </ScrollReveal>
          <HeadingReveal delay={0.1}>
            <h2 className="section-heading mb-5">
              The Work Speaks.<br className="hidden md:block" /> So Do the Homeowners.
            </h2>
          </HeadingReveal>
          <GoldLine width="3rem" centered delay={0.25} className="mb-6" />

          {/* Google badge — glass panel treatment */}
          <ScrollReveal variant="scale" delay={0.3}>
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-5 sm:px-7 py-3 sm:py-3.5 glass-panel rounded-none">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-accent text-accent" />
                  ))}
                </div>
                <div className="h-5 w-px bg-border hidden sm:block" />
                <span className="font-heading font-bold text-foreground text-lg">4.7</span>
                <span className="text-muted-foreground text-xs sm:text-sm font-body">122+ verified reviews</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Featured testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          {featured.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: HIGHLAND_EASE }}
              className="relative bg-card border border-border rounded-none p-6 md:p-10 hover:border-[hsl(var(--highland-gold)/0.2)] hover:shadow-[0_12px_40px_-10px_hsl(var(--heritage-charcoal)/0.08)] transition-all duration-500 quote-glyph"
              style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
            >
              <div className="h-px w-full absolute top-0 left-0 right-0 bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.3)] to-transparent" />

              <div className="flex items-center justify-between mb-5 relative z-10">
                <span className={`text-[9px] font-body font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-none ${categoryColors[t.category]}`}>
                  {t.category}
                </span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} className="w-3.5 h-3.5 fill-accent text-accent" />
                  ))}
                </div>
              </div>

              <p className="text-foreground text-[15px] md:text-base leading-[1.8] mb-7 font-body relative z-10">
                "{t.text}"
              </p>

              <div className="bg-secondary/50 rounded-none px-5 py-3.5 mb-7 relative z-10">
                <p className="text-[11px] font-body font-semibold uppercase tracking-[0.1em] text-muted-foreground/50 mb-1">Project Outcome</p>
                <p className="text-sm font-body font-medium text-foreground/80">{t.outcome}</p>
              </div>

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-none bg-primary/8 flex items-center justify-center text-primary font-heading font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-foreground text-sm">{t.name}</p>
                    <p className="text-muted-foreground text-xs font-body">{t.location}</p>
                  </div>
                </div>
                <span className="text-[10px] font-body font-medium text-muted-foreground/50 max-w-[140px] text-right leading-tight">
                  {t.project}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Standard testimonials */}
        <StaggerContainer stagger={0.07} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {standard.map((t) => (
            <StaggerItem key={t.name} variant="rise">
              <div className="group bg-card border border-border rounded-none p-5 md:p-6 hover:border-[hsl(var(--highland-gold)/0.12)] hover:shadow-[0_8px_28px_-8px_hsl(var(--heritage-charcoal)/0.06)] transition-all duration-500 h-full" style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[8px] font-body font-semibold uppercase tracking-[0.14em] px-2 py-0.5 rounded-none ${categoryColors[t.category]}`}>
                    {t.category}
                  </span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, si) => (
                      <Star key={si} className="w-2.5 h-2.5 fill-accent text-accent" />
                    ))}
                  </div>
                </div>

                <p className="text-foreground/80 text-[13px] leading-[1.7] mb-4 font-body line-clamp-4">
                  "{t.text}"
                </p>

                <p className="text-[11px] text-primary/60 font-body font-medium mb-4 leading-snug">
                  {t.outcome}
                </p>

                <div className="flex items-center gap-2.5 pt-3 border-t border-border">
                  <div className="w-8 h-8 rounded-none bg-primary/6 flex items-center justify-center text-primary font-heading font-bold text-[10px]">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-foreground text-xs">{t.name}</p>
                    <p className="text-muted-foreground text-[10px] font-body">{t.location}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Reviews;
