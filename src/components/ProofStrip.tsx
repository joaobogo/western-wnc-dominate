import { motion } from "framer-motion";
import { Mountain, ShieldCheck, Hammer, FileText, Users, Zap, MessageSquare, Gem } from "lucide-react";

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
    title: "Roofing + Construction Under One Roof",
    copy: "Shingles, metal, cedar, additions, decks, siding — one team, one process, one standard. No subcontractors you haven't met.",
    stat: "40+",
    statLabel: "years combined",
  },
  {
    icon: FileText,
    title: "Documented Quality Control",
    copy: "Photo documentation, progress reports, and a final walkthrough inspection. Every project closes with a warranty package in hand.",
    stat: "100%",
    statLabel: "documented projects",
  },
  {
    icon: Users,
    title: "Family-Operated. Locally Accountable.",
    copy: "We live in these mountains. We drive past your project every week. That changes how you build — and how you stand behind it.",
    stat: "2017",
    statLabel: "established",
  },
  {
    icon: Zap,
    title: "Emergency Storm Response",
    copy: "Tarping, insurance documentation, and priority scheduling within 24 hours. Local crews — not out-of-state chasers who vanish after the check clears.",
    stat: "24hr",
    statLabel: "storm response",
  },
];

const ProofStrip = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Subtle top accent */}
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
            Built Different.<br className="hidden md:block" /> On Purpose.
          </h2>
          <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
            Premium roofing and construction demands more than tools and labor. It requires 
            expertise, accountability, and the kind of care that only comes from a team with 
            something to prove — every single project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="group relative bg-card border border-border rounded-sm p-5 md:p-6 hover:border-[hsl(var(--highland-gold)/0.25)] transition-all duration-300 overflow-hidden"
            >
              {/* Gold top line — reveals on hover */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] bg-[hsl(var(--highland-gold))]"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                style={{ transformOrigin: "left" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Stat watermark */}
              <div className="absolute -right-1 -top-2 text-[48px] font-heading font-bold text-foreground/[0.03] leading-none select-none pointer-events-none">
                {pillar.stat}
              </div>

              <div className="relative z-10">
                {/* Icon with subtle scale on group hover */}
                <div className="w-9 h-9 rounded-sm bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/12 transition-colors duration-300">
                  <pillar.icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>

                <h3 className="text-sm font-heading font-semibold text-foreground mb-2 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground text-[13px] leading-relaxed font-body mb-4">
                  {pillar.copy}
                </p>

                {/* Stat badge */}
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
