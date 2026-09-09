import { PHONE_PLAIN, PHONE_TEL } from "@/data/business";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";
import {
  TriangleRight, Truck, Layers, PackageSearch, Wind, ArrowRight, Phone, CheckCircle,
  Ruler, FileText, Hammer, Building2, ClipboardList, Droplets, Sun, Home,
} from "lucide-react";

type Driver = { icon: typeof Truck; title: string; detail: string };

const siteAccess: Driver = {
  icon: Truck,
  title: "Site access",
  detail:
    "Narrow gravel drives, steep grades, and tight tree lines change how materials get staged and how debris comes off the property — sometimes by hand instead of by truck.",
};

const roofingDrivers: Driver[] = [
  {
    icon: TriangleRight,
    title: "Pitch and complexity",
    detail:
      "Steeper mountain roofs need staging, fall protection, and slower production rates. Valleys, dormers, and multiple planes add cut waste and flashing labor.",
  },
  siteAccess,
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

const roofingIncludes = [
  "On-site measurement and photo documentation of current conditions",
  "Grouped-cost scope: tear-off, decking allowance, underlayment, roofing system, flashing, ventilation, cleanup",
  "Named material specifications and color selections, not generic allowances",
  "A per-sheet decking rate so hidden rot has a known price before we open the roof",
  "Projected schedule window and the weather assumptions behind it",
];

const repairDrivers: Driver[] = [
  {
    icon: PackageSearch,
    title: "How far the water traveled",
    detail:
      "A lifted shingle is a short visit. Water that reached decking, insulation, or drywall turns a repair into layered work, and that is what moves the number most.",
  },
  {
    icon: TriangleRight,
    title: "Where the failure sits",
    detail:
      "Field repairs are straightforward. Valleys, chimney and wall flashing, and steep upper planes need staging and slower, detail-heavy labor.",
  },
  siteAccess,
  {
    icon: Layers,
    title: "Matching what is already there",
    detail:
      "Discontinued colors and older profiles sometimes mean sourcing close-match material or reworking a full plane rather than patching a few courses.",
  },
  {
    icon: ClipboardList,
    title: "Repair versus replace math",
    detail:
      "If a roof is near the end of its service life, we say so and price both paths, so you are not spending repair money twice inside two years.",
  },
];

const stormDrivers: Driver[] = [
  {
    icon: ClipboardList,
    title: "What the documentation shows",
    detail:
      "Insurance work is priced against documented damage. Photo evidence, measurements, and test squares determine what gets approved and what does not.",
  },
  {
    icon: FileText,
    title: "Your policy terms",
    detail:
      "Deductible, replacement-cost versus actual-cash-value coverage, and code-upgrade coverage change your out-of-pocket far more than our labor rate does.",
  },
  {
    icon: Droplets,
    title: "Emergency stabilization",
    detail:
      "Tarping, water intrusion control, and temporary protection are separate line items handled before permanent repairs begin.",
  },
  siteAccess,
  {
    icon: Layers,
    title: "Hidden structural damage",
    detail:
      "Impact damage to decking, fascia, and framing is often found after tear-off. We document it and submit it as a supplement rather than absorbing or hiding it.",
  },
];

const stormIncludes = [
  "Photo-documented damage report you can hand directly to your adjuster",
  "Line-item scope written in the format carriers expect",
  "Clear separation of emergency stabilization from permanent repair",
  "Supplement handling if hidden damage appears after tear-off",
  "Your deductible and coverage stated plainly, with no surprise balances at the end",
];

const constructionDrivers: Driver[] = [
  {
    icon: Ruler,
    title: "Size, layout, and structure",
    detail:
      "Square footage matters less than what the structure has to do. Load-bearing changes, roof tie-ins, and foundation work drive far more cost than added floor area.",
  },
  siteAccess,
  {
    icon: Hammer,
    title: "Finish level",
    detail:
      "The same footprint can double in price between builder-grade and custom millwork, tile, and cabinetry. Selections are where budgets move most.",
  },
  {
    icon: Building2,
    title: "Site and terrain",
    detail:
      "Mountain lots bring grade changes, rock, drainage, and septic and well constraints. Sitework is priced from what the lot actually is, not an average.",
  },
  {
    icon: FileText,
    title: "Permits and existing conditions",
    detail:
      "County review, engineering when required, and whatever we find behind older walls — wiring, plumbing, framing — are scoped honestly rather than buried in an allowance.",
  },
];

const constructionIncludes = [
  "On-site walkthrough with measurements and photo documentation",
  "Line-item scope by phase: sitework, structure, envelope, mechanicals, finishes",
  "Named selections and allowances stated in dollars, not vague placeholders",
  "What is excluded, spelled out, so bids can be compared honestly",
  "Projected schedule with the sequencing and inspection points behind it",
];

const exteriorDrivers: Driver[] = [
  {
    icon: Ruler,
    title: "Wall area and detail count",
    detail:
      "Corners, gables, windows, and trim returns take more labor than open wall runs. Two homes with the same square footage can be very different jobs.",
  },
  {
    icon: PackageSearch,
    title: "Material system",
    detail:
      "Fiber cement, engineered wood, cedar, and vinyl carry different material, fastener, and labor costs, along with different maintenance over time.",
  },
  {
    icon: Layers,
    title: "What is behind the current surface",
    detail:
      "Sheathing rot, missing housewrap, and failed flashing are common on older mountain homes and are found only after removal. We price the repair rate up front.",
  },
  siteAccess,
  {
    icon: Home,
    title: "Height and staging",
    detail:
      "Two- and three-story elevations on sloped lots need scaffolding and slower production, which shows up in labor rather than materials.",
  },
];

const gutterDrivers: Driver[] = [
  {
    icon: Ruler,
    title: "Linear footage and downspout runs",
    detail:
      "Pricing follows the run length plus how many downspouts and how far water has to be carried away from the foundation.",
  },
  {
    icon: PackageSearch,
    title: "Gutter size and material",
    detail:
      "Five-inch versus six-inch, aluminum versus copper, and guard systems all sit at different price points. Steep mountain roofs often need the larger profile.",
  },
  {
    icon: Home,
    title: "Height and fascia condition",
    detail:
      "Multi-story elevations and rotted fascia boards add staging and carpentry before anything gets hung.",
  },
  siteAccess,
  {
    icon: Droplets,
    title: "Drainage at the discharge point",
    detail:
      "On graded lots, where the water goes after it leaves the downspout is part of the job — underground runs and splash management are scoped, not assumed.",
  },
];

const skylightDrivers: Driver[] = [
  {
    icon: Sun,
    title: "Unit type",
    detail:
      "Fixed, manual venting, solar venting, and tubular units differ substantially in unit cost before any labor is added.",
  },
  {
    icon: Layers,
    title: "New opening versus replacement",
    detail:
      "Replacing in the existing curb is far simpler than cutting a new opening, which brings framing, drywall, and interior finish work.",
  },
  {
    icon: Wind,
    title: "Flashing and roof system",
    detail:
      "The flashing kit has to match the roofing material. Metal and synthetic details take longer than shingle and are priced accordingly.",
  },
  {
    icon: Home,
    title: "Interior shaft work",
    detail:
      "Deep attics need a finished light shaft, which adds framing, insulation, drywall, and paint to what looks like a roofing job.",
  },
  siteAccess,
];

const commercialDrivers: Driver[] = [
  {
    icon: Ruler,
    title: "Square footage and roof system",
    detail:
      "TPO, EPDM, modified bitumen, and metal price differently per square, and assembly requirements change with building use and deck type.",
  },
  {
    icon: Layers,
    title: "Tear-off versus recover",
    detail:
      "Existing layers, saturated insulation, and deck condition decide whether a recover is legitimate or whether full removal is the honest recommendation.",
  },
  {
    icon: Building2,
    title: "Penetrations and curbs",
    detail:
      "Rooftop units, vents, drains, and curbs are where commercial roofs fail. Detail count drives labor more than open field area does.",
  },
  {
    icon: ClipboardList,
    title: "Operating around your business",
    detail:
      "Night or weekend phasing, occupied-space protection, and staged sections cost more than an empty-building schedule, and we say which one we are quoting.",
  },
  siteAccess,
];

const variants = {
  roofing: { drivers: roofingDrivers, includes: roofingIncludes },
  repair: { drivers: repairDrivers, includes: roofingIncludes },
  storm: { drivers: stormDrivers, includes: stormIncludes },
  construction: { drivers: constructionDrivers, includes: constructionIncludes },
  exterior: { drivers: exteriorDrivers, includes: constructionIncludes },
  gutters: { drivers: gutterDrivers, includes: roofingIncludes },
  skylights: { drivers: skylightDrivers, includes: roofingIncludes },
  commercial: { drivers: commercialDrivers, includes: roofingIncludes },
} as const;

export type CostContextVariant = keyof typeof variants;

const walkCopy: Record<CostContextVariant, string> = {
  roofing: "Tell us the address and what you are seeing. We measure the roof, walk the variables above with you, and send a written scope you can compare line by line against any other bid.",
  repair: "Tell us the address and what you are seeing. We inspect it in person, show you photos of what is actually failing, and send a written scope you can compare line by line against any other bid.",
  storm: "Tell us the address and the date of the storm. We document the damage on site, give you the photo report and line-item scope, and walk your claim with you from there.",
  construction: "Tell us what you are planning and where. We walk the property with you, talk through the variables above, and put a written phase-by-phase scope in your hands before anyone commits.",
  exterior: "Tell us the address and what you want changed. We measure the elevations, check what is behind the current surface where we can, and send a written scope with named materials.",
  gutters: "Tell us the address. We measure the runs, look at fascia condition and where water needs to go, and send a written scope with sizes and materials named.",
  skylights: "Tell us what you are picturing and where. We check the roof system, attic depth, and framing, then price the unit and the labor separately so nothing is hidden.",
  commercial: "Tell us the building and the roof system. We assess it on site, document conditions and penetrations, and send a line-item scope with phasing options for an occupied building.",
};

interface CostContextBlockProps {
  serviceLabel?: string;
  variant?: CostContextVariant;
  className?: string;
}

const CostContextBlock = ({
  serviceLabel = "roofing",
  variant = "roofing",
  className = "",
}: CostContextBlockProps) => {
  const { drivers: priceDrivers, includes: estimateIncludes } = variants[variant];

  return (
  <section className={`section-padding bg-muted/20 ${className}`} aria-label="What drives cost">
    <div className="container-tight">
      <div className="max-w-2xl mb-10">
        <span className="eyebrow mb-3 block">Cost Transparency</span>
        <h2 className="section-heading mb-3">What actually drives {serviceLabel} cost here</h2>
        <p className="text-muted-foreground font-body">
          We do not publish a headline price, because a number pulled off a chart is not an estimate — and
          in Western North Carolina, two properties on the same street can price very differently. What we
          can do is show you every variable that moves the number, then put a written scope in your hands.
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
                <CheckCircle className="w-4 h-4 text-[hsl(var(--gold-ink))] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-secondary/40 border border-border rounded-sm p-6">
          <h3 className="font-heading font-bold text-foreground mb-2">Want a real number?</h3>
          <p className="text-body-xs md:text-sm font-body text-muted-foreground mb-5">
            {walkCopy[variant]}
          </p>
          <div className="flex flex-col gap-3">
            <Link
              to={variant === "construction" ? "/construction/consultation" : "/request-inspection"}
              onClick={() => trackEvent("cta_click", { label: "Request a written scope", elementId: "cost-context-scope" })}
              className="btn btn-primary btn-md w-full"
            >
              Get My Written Scope <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href={PHONE_TEL}
              onClick={() => trackEvent("phone_click", { label: "Cost context call", elementId: "cost-context-call" })}
              className="btn btn-secondary btn-md w-full"
            >
              <Phone className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true" /> {PHONE_PLAIN}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default CostContextBlock;
