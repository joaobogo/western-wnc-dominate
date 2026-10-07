import { motion } from "framer-motion";
import { Droplets, Thermometer, Home } from "lucide-react";

type Variant = "repair" | "storm" | "gutters";

const COPY: Record<Variant, { lead: string; detail: string; points: { icon: typeof Droplets; title: string; text: string }[] }> = {
  repair: {
    lead:
      "A small leak that waits through one more winter rarely stays small. Freeze-thaw cycles at elevation widen the same opening every night, and each cycle pushes water further into the deck.",
    detail:
      "By spring, what was a flashing or fastener fix is often plywood replacement, wet insulation, and drywall work — the same roof, with three trades involved instead of one.",
    points: [
      { icon: Droplets, title: "Decking rot", text: "Sustained moisture softens OSB and plywood, so sheets that could have stayed get cut out at tear-off." },
      { icon: Thermometer, title: "Insulation loss", text: "Wet blown-in and batt insulation compresses and stops performing, raising winter heating load until it is replaced." },
      { icon: Home, title: "Interior damage", text: "Water tracks along rafters before it shows on a ceiling, so staining usually means the framing cavity has been wet for a while." },
    ],
  },
  storm: {
    lead:
      "Storm-loosened shingles and bent flashing often shed water fine in light rain, which is why damage gets postponed. The next wind-driven rain or ice event is what drives water under the courses that were lifted.",
    detail:
      "Waiting a season also complicates the claim: carriers expect damage to be documented and mitigated close to the date of loss, and later interior damage can be attributed to delayed repair rather than the storm.",
    points: [
      { icon: Droplets, title: "Decking rot", text: "Lifted shingles let repeated intrusion soak the deck under an otherwise intact-looking roof." },
      { icon: Thermometer, title: "Insulation loss", text: "Attic insulation absorbs the intrusion first and quietly loses R-value before anything is visible below." },
      { icon: Home, title: "Interior damage", text: "Ceilings, trim, and finishes are the last thing to show — and the most expensive part to put back." },
    ],
  },
  gutters: {
    lead:
      "In these mountains, gutters carry more than rain: hemlock and oak debris, grit off aging shingles, and snowmelt off steep pitches. Once they hold water instead of moving it, the overflow lands where it does the most harm.",
    detail:
      "One more season of overflow typically means saturated fascia and soffit, water against the foundation and crawl space, and ice building at the eave during freeze-thaw weeks.",
    points: [
      { icon: Droplets, title: "Fascia and decking rot", text: "Water backing behind the gutter line keeps the fascia board and roof edge wet through the wettest months." },
      { icon: Thermometer, title: "Ice at the eave", text: "Standing water in a clogged run freezes, adds weight, and forces melt back under the first course of shingles." },
      { icon: Home, title: "Foundation and crawl space", text: "Concentrated runoff at the wall drives moisture into crawl spaces and basements instead of away from the house." },
    ],
  },
};

interface CostOfWaitingProps {
  variant?: Variant;
  className?: string;
}

/**
 * Factual cost-of-inaction framing for repair, storm, and gutter pages.
 * Specific to Western NC conditions — no alarmism, no scarcity, no discounts.
 */
const CostOfWaiting = ({ variant = "repair", className = "" }: CostOfWaitingProps) => {
  const c = COPY[variant];
  return (
    <section className={`section-padding bg-background ${className}`} aria-label="What waiting costs">
      <div className="container-tight">
        <div className="max-w-2xl mb-8">
          <span className="eyebrow mb-3 block">What Waiting Costs</span>
          <h2 className="section-heading mb-3">{variant === "repair" ? "What one more season of mountain weather usually changes" : "What one more season usually changes"}</h2>
          <p className="text-muted-foreground font-body mb-3">{c.lead}</p>
          <p className="text-muted-foreground font-body">{c.detail}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {c.points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="bg-card border border-border rounded-sm p-5"
            >
              <p.icon className="w-5 h-5 text-primary mb-3" />
              <h3 className="font-heading font-semibold text-foreground text-sm mb-2">{p.title}</h3>
              <p className="text-body-xs leading-relaxed font-body text-muted-foreground">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CostOfWaiting;