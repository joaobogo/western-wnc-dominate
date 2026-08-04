import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Hammer, FileText, Ruler, Cloud,
  ShieldCheck, Sparkles, type LucideIcon,
} from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

interface DisciplineItem {
  icon: LucideIcon;
  title: string;
  roofing: string;
  construction: string;
  detail: string;
}

const disciplineItems: DisciplineItem[] = [
  {
    icon: Hammer,
    title: "Craftsmanship",
    roofing: "Manufacturer-certified installation",
    construction: "Craft-grade building & finishing",
    detail: "Our crews learned precision on roofs — where a misaligned shingle invites water into a home. That same intolerance for sloppy work defines how we frame walls, hang doors, and set trim.",
  },
  {
    icon: FileText,
    title: "Project Management",
    roofing: "Documented scope, photo milestones",
    construction: "Multi-phase scheduling & oversight",
    detail: "Our extensive roofing background taught us that the quality of the plan determines the quality of the result. Every construction project gets the same written scope, sequenced phases, and daily accountability.",
  },
  {
    icon: Ruler,
    title: "Technical Understanding",
    roofing: "Load ratings & drainage engineering",
    construction: "Layout planning & building science",
    detail: "Understanding how a roof distributes loads, sheds water, and manages thermal movement gave us structural intelligence that most general contractors never develop. We think in systems, not surfaces.",
  },
  {
    icon: Cloud,
    title: "Weather Protection",
    roofing: "Waterproofing & flashing mastery",
    construction: "Complete building envelope integrity",
    detail: "Nobody understands how water infiltrates buildings better than experienced roofers. We bring that knowledge to every wall transition, window integration, and exterior junction — the places where most construction leaks start.",
  },
  {
    icon: ShieldCheck,
    title: "Structural Thinking",
    roofing: "Mountain-rated specifications",
    construction: "Elevation-calibrated building science",
    detail: "Years of engineering roofs for WNC's wind loads, snow accumulation, and freeze-thaw cycling taught us how structures must perform at elevation. We apply that same mountain-specific engineering to every construction project.",
  },
  {
    icon: Sparkles,
    title: "Finish Quality",
    roofing: "Clean walk-throughs, zero callbacks",
    construction: "Detail-perfect handoffs & final 5%",
    detail: "The discipline of leaving a homeowner's property cleaner than we found it, with every detail verified and documented — that's not a roofing skill. It's a company standard that now defines our construction work.",
  },
];

interface DisciplinesBridgeProps {
  heading?: string;
  subheading?: string;
  eyebrow?: string;
  className?: string;
}

/**
 * Premium editorial section for the Construction hub.
 * Shows how each roofing discipline transfers to construction — 
 * making the expansion feel natural, not random.
 */
const DisciplinesBridge = ({
  heading = "Six Disciplines.\nOne Standard.",
  subheading = "Every skill that makes Highlander exceptional at roofing transfers directly to construction. This isn't a company trying something new — it's a company applying what it already does best.",
  eyebrow = "Roofing Built This",
  className = "",
}: DisciplinesBridgeProps) => {
  return (
    <section className={`section-padding bg-secondary tartan-bg ${className}`}>
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-12 md:mb-14"
        >
          <span className="eyebrow mb-3 block">{eyebrow}</span>
          <h2 className="section-heading mb-4 whitespace-pre-line">{heading}</h2>
          <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">{subheading}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {disciplineItems.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: HIGHLAND_EASE }}
              className="group bg-card border border-border rounded-sm p-6 hover:border-[hsl(var(--highland-gold)/0.25)] card-lift transition-all"
            >
              <div className="w-10 h-10 rounded-sm bg-[hsl(var(--highland-gold)/0.06)] flex items-center justify-center mb-4 group-hover:bg-[hsl(var(--highland-gold)/0.12)] transition-colors border border-[hsl(var(--highland-gold)/0.1)]">
                <d.icon className="w-5 h-5 text-[hsl(var(--gold-ink))]" />
              </div>

              <h3 className="font-heading font-bold text-foreground text-sm mb-3 group-hover:text-[hsl(var(--gold-ink))] transition-colors">{d.title}</h3>

              {/* Transfer labels */}
              <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                <span className="text-[10px] font-body font-semibold uppercase tracking-[0.08em] text-muted-foreground bg-muted px-2 py-0.5 rounded-sm">{d.roofing}</span>
                <ArrowRight className="w-3 h-3 text-[hsl(var(--highland-gold)/0.85)] flex-shrink-0" />
                <span className="text-[10px] font-body font-semibold uppercase tracking-[0.08em] text-[hsl(var(--highland-gold)/0.7)] bg-[hsl(var(--highland-gold)/0.06)] px-2 py-0.5 rounded-sm">{d.construction}</span>
              </div>

              <p className="text-muted-foreground text-[13px] leading-relaxed font-body">{d.detail}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <p className="text-muted-foreground/60 text-sm font-body italic max-w-xl mx-auto">
            "We didn't learn construction in a classroom. We learned it on rooftops — where precision isn't optional and weather doesn't wait."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DisciplinesBridge;
