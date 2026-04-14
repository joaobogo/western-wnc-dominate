import { motion } from "framer-motion";
import { Mountain, ShieldCheck, Hammer, MessageSquare, Gem } from "lucide-react";

const pillars = [
  {
    icon: Gem,
    title: "Mountain-Grade Craftsmanship",
    copy: "Every cut, seam, and fastener is executed to a standard that outlasts the weather it was built for. No shortcuts at 4,000 feet.",
    stat: "500+",
    statLabel: "projects completed",
  },
  {
    icon: MessageSquare,
    title: "Clear, Consistent Communication",
    copy: "Named point of contact. Daily updates. Written scope before work begins. You'll never wonder what's happening on your project.",
    stat: "24hr",
    statLabel: "response time",
  },
  {
    icon: Mountain,
    title: "Regional Climate Expertise",
    copy: "Snow loads, wind exposure, elevation moisture — we specify every material and method for the actual conditions your property faces.",
    stat: "8",
    statLabel: "counties served",
  },
  {
    icon: ShieldCheck,
    title: "Certified Materials & Warranties",
    copy: "CertainTeed Master Applicator certified. Factory-backed warranties on materials. Full labor warranty on every installation.",
    stat: "Top 1%",
    statLabel: "nationally certified",
  },
  {
    icon: Hammer,
    title: "Roofing + Construction, One Team",
    copy: "Shingles, metal, cedar, additions, decks, siding — one crew, one process, one standard. No subcontractors you haven't met.",
    stat: "40+",
    statLabel: "years combined",
  },
];

const ProofStrip = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-[hsl(var(--highland-gold)/0.3)]" />

      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-12 md:mb-16"
        >
          <span className="eyebrow mb-3 block">Why Highlander</span>
          <h2 className="section-heading mb-4">
            The Standard We Set<br className="hidden md:block" /> — and Hold.
          </h2>
          <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
            Premium results demand more than labor and materials. They require
            expertise, accountability, and the kind of care that only comes
            from a team that stakes its name on every project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="group relative bg-card border border-border rounded-sm p-5 md:p-6 hover:border-[hsl(var(--highland-gold)/0.25)] card-lift overflow-hidden"
            >
              {/* Stat watermark */}
              <div className="absolute -right-1 -top-2 text-[48px] font-heading font-bold text-foreground/[0.03] leading-none select-none pointer-events-none">
                {pillar.stat}
              </div>

              <div className="relative z-10">
                <div className="w-9 h-9 rounded-sm bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/12 transition-colors duration-300">
                  <pillar.icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>

                <h3 className="text-sm font-heading font-semibold text-foreground mb-2 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground text-[13px] leading-relaxed font-body mb-4">
                  {pillar.copy}
                </p>

                <div className="flex items-center gap-2 pt-3 border-t border-border/60">
                  <span className="text-base font-heading font-bold text-[hsl(var(--highland-gold))] leading-none">
                    {pillar.stat}
                  </span>
                  <span className="text-[10px] font-body text-muted-foreground/60 uppercase tracking-[0.12em]">
                    {pillar.statLabel}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProofStrip;
