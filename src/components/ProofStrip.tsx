import { motion } from "framer-motion";
import { Mountain, ShieldCheck, Hammer, FileText, Users, Zap } from "lucide-react";

const tiles = [
  {
    icon: Mountain,
    title: "Mountain Climate Specialists",
    copy: "Every material and method is specified for elevation, snow load, and WNC wind exposure — not borrowed from a flatland manual.",
  },
  {
    icon: ShieldCheck,
    title: "CertainTeed Master Applicator",
    copy: "Top 1% of roofing contractors nationally. Factory-certified installation with the industry's strongest warranty coverage.",
  },
  {
    icon: Hammer,
    title: "Roofing + Construction",
    copy: "One team from ridge cap to foundation. Shingles, metal, cedar, additions, decks, siding — no subcontractors, no coordination headaches.",
  },
  {
    icon: FileText,
    title: "Documented. Transparent. Warranty-Backed.",
    copy: "Written scope, material specs, daily communication, and a full warranty package delivered at walkthrough. No surprises.",
  },
  {
    icon: Users,
    title: "Family-Operated Since 2017",
    copy: "40+ years combined experience across Macon, Jackson, and Swain counties. We live here. We build here. We stay here.",
  },
  {
    icon: Zap,
    title: "24-Hour Storm Response",
    copy: "Emergency tarping, insurance documentation, and priority scheduling when storms hit. Local crews — not out-of-state chasers.",
  },
];

const ProofStrip = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Subtle heritage accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-[hsl(var(--highland-gold)/0.3)]" />

      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-12 md:mb-14"
        >
          <span className="eyebrow mb-3 block">Why Highlander</span>
          <h2 className="section-heading mb-4">
            Not Every Contractor<br className="hidden md:block" /> Is Built for This.
          </h2>
          <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
            Premium roofing and construction in Western North Carolina requires mountain-specific expertise, 
            certified materials, and the kind of accountability that only comes from a team that lives where it builds.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {tiles.map((tile, i) => (
            <motion.div
              key={tile.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="group relative bg-card border border-border rounded-sm p-6 md:p-7 hover:border-[hsl(var(--highland-gold)/0.2)] hover:shadow-[0_8px_30px_-8px_hsl(var(--heritage-charcoal)/0.06)] transition-all duration-300"
            >
              {/* Gold top accent on hover */}
              <div className="absolute top-0 left-6 right-6 h-px bg-[hsl(var(--highland-gold)/0)] group-hover:bg-[hsl(var(--highland-gold)/0.3)] transition-colors duration-300" />

              <div className="w-9 h-9 rounded-sm bg-primary/8 flex items-center justify-center mb-4">
                <tile.icon className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-base font-heading font-semibold text-foreground mb-2 leading-snug">
                {tile.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-body">
                {tile.copy}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProofStrip;
