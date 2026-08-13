import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";
import {
  TriangleRight, Truck, Layers, PackageSearch, Wind, ArrowRight, Phone, CheckCircle,
} from "lucide-react";

const priceDrivers = [
  {
    icon: TriangleRight,
    title: "Pitch and complexity",
    detail:
      "Steeper mountain roofs need staging, fall protection, and slower production rates. Valleys, dormers, and multiple planes add cut waste and flashing labor.",
  },
  {
    icon: Truck,
    title: "Site access",
    detail:
      "Narrow gravel drives, steep grades, and tight tree lines change how materials get staged and how debris comes off the property — sometimes by hand instead of by truck.",
  },
  {
    icon: Layers,
    title: "Decking condition",
    detail:
      "Deck replacement is unknown until tear-off. We price a per-sheet rate up front so any rot found underneath is billed at a number you already agreed to.",
  },
  {
    icon: PackageSearch,
    title: "Material system",
    detail:
      "Dimensional shingle, standing-seam metal, synthetic, and cedar sit at very different price points, and each carries its own underlayment, fastener, and trim package.",
  },
  {
    icon: Wind,
    title: "Ventilation and details",
    detail:
      "Intake and exhaust corrections, chimney and skylight flashing, ice-and-water coverage, and snow retention at elevation are scope items, not afterthoughts.",
  },
];

const estimateIncludes = [
  "On-site measurement and photo documentation of current conditions",
  "Grouped-cost scope: tear-off, decking allowance, underlayment, roofing system, flashing, ventilation, cleanup",
  "Named material specifications and color selections, not generic allowances",
  "A per-sheet decking rate so hidden rot has a known price before we open the roof",
  "Projected schedule window and the weather assumptions behind it",
];

interface CostContextBlockProps {
  serviceLabel?: string;
  className?: string;
}

const CostContextBlock = ({
  serviceLabel = "roofing",
  className = "",
}: CostContextBlockProps) => (
  <section className={`section-padding bg-muted/20 ${className}`} aria-label="What drives cost">
    <div className="container-tight">
      <div className="max-w-2xl mb-10">
        <span className="eyebrow mb-3 block">Cost Transparency</span>
        <h2 className="section-heading mb-3">What actually drives {serviceLabel} cost here</h2>
        <p className="text-muted-foreground font-body">
          We do not publish a headline price, because a number pulled off a chart is not an estimate — and
          in Western North Carolina, two houses on the same street can price very differently. What we can
          do is show you every variable that moves the number, then put a written scope in your hands.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {priceDrivers.map((d, i) => (
          <motion.div
            key={d.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="bg-card border border-border rounded-sm p-5"
          >
            <d.icon className="w-5 h-5 text-primary mb-3" />
            <h3 className="font-heading font-semibold text-foreground text-sm mb-2">{d.title}</h3>
            <p className="text-body-xs leading-relaxed font-body text-muted-foreground">{d.detail}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.2fr,1fr] gap-6 items-start">
        <div className="bg-card border border-border rounded-sm p-6">
          <h3 className="font-heading font-bold text-foreground mb-4">What your written estimate includes</h3>
          <ul className="space-y-2.5">
            {estimateIncludes.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-body-xs md:text-sm font-body text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-[hsl(var(--gold-ink))] flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-secondary/40 border border-border rounded-sm p-6">
          <h3 className="font-heading font-bold text-foreground mb-2">Want a real number?</h3>
          <p className="text-body-xs md:text-sm font-body text-muted-foreground mb-5">
            Tell us the address and what you are seeing. We measure the roof, walk the variables above with
            you, and send a written scope you can compare line by line against any other bid.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/request-inspection"
              onClick={() => trackEvent("cta_click", { label: "Request a written scope", elementId: "cost-context-scope" })}
              className="cta-gradient text-accent-foreground font-body font-bold text-sm px-6 py-3.5 inline-flex items-center justify-center gap-2 uppercase tracking-[0.1em] hover:opacity-90 transition-all min-h-[52px]"
            >
              Get My Written Scope <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+18285247773"
              onClick={() => trackEvent("phone_click", { label: "Cost context call", elementId: "cost-context-call" })}
              className="border-2 border-border text-foreground font-body font-bold text-sm px-6 py-3.5 inline-flex items-center justify-center gap-2 hover:bg-muted transition-all min-h-[52px]"
            >
              <Phone className="w-4 h-4 text-[hsl(var(--gold-ink))]" /> 828-524-7773
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CostContextBlock;
