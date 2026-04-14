import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";

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
    text: "Highlander replaced our entire roof after storm damage. They handled our insurance claim paperwork, kept us informed daily, and the crew was professional from start to finish. The roof looks better than the original.",
    project: "Full Roof Replacement", category: "Storm",
    outcome: "Insurance claim processed. New roof installed in 4 days.", featured: true,
  },
  {
    name: "James T.", location: "Franklin, NC", rating: 5,
    text: "Fast response when we had a leak during heavy rain. They came out the next morning, found the issue, and had it repaired by afternoon. Fair pricing and honest work — exactly what you want from a local contractor.",
    project: "Emergency Leak Repair", category: "Roofing",
    outcome: "Leak identified and permanently repaired in one visit.",
  },
  {
    name: "Linda K.", location: "Cashiers, NC", rating: 5,
    text: "We've used Highlander for two properties now. Their standing seam metal work is exceptional and they genuinely understand the mountain climate challenges. Five stars every time.",
    project: "Standing Seam Metal — Two Properties", category: "Roofing",
    outcome: "Both properties re-roofed with 50-year metal systems.", featured: true,
  },
  {
    name: "Robert & Anne P.", location: "Sylva, NC", rating: 5,
    text: "From the initial inspection to the final walkthrough, everything was documented and communicated clearly. The crew was respectful of our property and finished ahead of schedule. We couldn't be happier.",
    project: "Roof Replacement & Gutters", category: "Roofing",
    outcome: "Completed 2 days ahead of schedule. Full warranty package delivered.",
  },
  {
    name: "David R.", location: "Bryson City, NC", rating: 5,
    text: "Highlander built a covered porch and replaced our deck — the craftsmanship is outstanding. Same attention to detail as their roofing work. Having one team handle both saved us time and hassle.",
    project: "Deck & Covered Porch Build", category: "Construction",
    outcome: "New outdoor living space completed in 3 weeks.",
  },
  {
    name: "Mountain Properties LLC", location: "Franklin, NC", rating: 5,
    text: "We manage 14 rental properties across Macon County. Highlander handles all our roofing maintenance and emergency repairs. Their documentation and communication make our job easier.",
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
        <div className="text-center mb-12 md:mb-14">
          <ScrollReveal variant="fade">
            <span className="eyebrow mb-3 block">Client Testimonials</span>
          </ScrollReveal>
          <HeadingReveal delay={0.1}>
            <h2 className="section-heading mb-5">
              Trusted by Homeowners<br className="hidden md:block" /> Across Western NC.
            </h2>
          </HeadingReveal>

          {/* Google badge */}
          <ScrollReveal variant="scale" delay={0.3}>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-card border border-border rounded-sm">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <div className="h-4 w-px bg-border" />
              <span className="font-semibold text-foreground text-sm">4.7</span>
              <span className="text-muted-foreground text-sm font-body">from 122+ Google Reviews</span>
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
              className="relative bg-card border border-border rounded-sm p-7 md:p-9 hover:border-[hsl(var(--highland-gold)/0.2)] hover:shadow-sm transition-all duration-300"
            >
              <div className="h-px w-full absolute top-0 left-0 right-0 bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.25)] to-transparent" />

              <div className="flex items-center justify-between mb-5">
                <span className={`text-[9px] font-body font-semibold uppercase tracking-[0.14em] px-2.5 py-1 rounded-sm ${categoryColors[t.category]}`}>
                  {t.category}
                </span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} className="w-3 h-3 fill-accent text-accent" />
                  ))}
                </div>
              </div>

              <Quote className="w-7 h-7 text-[hsl(var(--highland-gold)/0.15)] mb-4 rotate-180" />

              <p className="text-foreground text-[15px] leading-relaxed mb-6 font-body">
                "{t.text}"
              </p>

              <div className="bg-secondary/60 rounded-sm px-4 py-3 mb-6">
                <p className="text-[11px] font-body font-semibold uppercase tracking-[0.1em] text-muted-foreground/50 mb-1">Project Outcome</p>
                <p className="text-sm font-body font-medium text-foreground/80">{t.outcome}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-sm bg-primary/8 flex items-center justify-center text-primary font-heading font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{t.name}</p>
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
        <StaggerContainer stagger={0.07} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {standard.map((t) => (
            <StaggerItem key={t.name} variant="rise">
              <div className="group bg-card border border-border rounded-sm p-5 hover:border-primary/15 hover:shadow-sm transition-all duration-300 h-full">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[8px] font-body font-semibold uppercase tracking-[0.14em] px-2 py-0.5 rounded-sm ${categoryColors[t.category]}`}>
                    {t.category}
                  </span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, si) => (
                      <Star key={si} className="w-2.5 h-2.5 fill-accent text-accent" />
                    ))}
                  </div>
                </div>

                <p className="text-foreground/80 text-[13px] leading-relaxed mb-4 font-body line-clamp-4">
                  "{t.text}"
                </p>

                <p className="text-[11px] text-primary/60 font-body font-medium mb-4 leading-snug">
                  {t.outcome}
                </p>

                <div className="flex items-center gap-2.5 pt-3 border-t border-border">
                  <div className="w-7 h-7 rounded-sm bg-primary/6 flex items-center justify-center text-primary font-heading font-bold text-[10px]">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-xs">{t.name}</p>
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
