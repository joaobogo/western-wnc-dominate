import { PHONE_DISPLAY, PHONE_PLAIN, PHONE_TEL } from "@/data/business";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Phone,
  CheckCircle,
  TriangleRight,
  Layers,
  Truck,
  Mountain,
  Wrench,
  Scale,
  CreditCard,
} from "lucide-react";
import SEOHead, { buildPageSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import TrustStrip from "@/components/TrustStrip";
import InspectionForm from "@/components/InspectionForm";
import AnswerBlock from "@/components/seo/AnswerBlock";
import RelatedLinks from "@/components/RelatedLinks";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { metalSystems, metalCostAnswer, METAL_COST_YEAR } from "@/data/metal-roof-cost";

// T13 (15 Sep 2026 SEO spec): the ranges carry a visible review date. Bump this
// whenever the figures in src/data/metal-roof-cost.ts are re-checked — quarterly.
const COST_UPDATED = "September 2026";

type Material = {
  name: string;
  href: string;
  tier: string;
  lifespan: string;
  body: string;
  drives: string;
};

/**
 * Relative cost tiers only. No dollar figures are published anywhere on this
 * site because every mountain roof prices off pitch, access, decking and
 * detail count — numbers get quoted in writing after a measured inspection.
 */
const materials: Material[] = [
  {
    name: "Dimensional asphalt shingle",
    href: "/roofing/roof-replacement",
    tier: "Entry tier — lowest installed cost per square",
    lifespan: "Typically 25–30 years with correct installation and ventilation",
    body:
      "This is the baseline most Western North Carolina replacement quotes are measured against. It is the least expensive complete system we install, and on a straightforward roof with good access it is also the fastest, which keeps labor down. We install CertainTeed as a ShingleMaster credentialed contractor.",
    drives:
      "Shingle line (standard dimensional versus premium), ice-and-water coverage at eaves and valleys, and how much ridge and hip footage the roof carries.",
  },
  {
    name: "Standing seam metal",
    href: "/roofing/metal",
    tier: "Upper tier — one of the highest installed costs per square",
    lifespan: "Commonly 40+ years when detailed correctly",
    body:
      "Concealed-fastener panels with no exposed screws in the field. Panels are cut to the length of the run, so a long mountain rake is one continuous piece. It costs the most of the metal options because panel material, trim fabrication, and the labor to detail hips, valleys, and penetrations are all higher.",
    drives:
      "Panel gauge and finish, seam type, snow retention where the roof sheds onto walkways or drives, and the number of valleys, dormers, and roof-to-wall transitions.",
  },
  {
    name: "Exposed-fastener metal",
    href: "/roofing/metal",
    tier: "Mid tier — above shingle, well below standing seam",
    lifespan: "Long service life, with fastener and gasket maintenance over time",
    body:
      "Screw-down panels, most common on barns, outbuildings, cabins, and simple gable roofs. It gets you a metal roof at a materially lower price than standing seam. The trade-off is maintenance: the gaskets under those exposed screws are a wear item and need checking as the roof ages.",
    drives:
      "Panel profile and gauge, substrate (over decking versus purlins), and whether the roof is a simple gable or full of penetrations.",
  },
  {
    name: "Synthetic slate and shake",
    href: "/roofing/brava-synthetic",
    tier: "Upper tier — comparable to or above standing seam",
    lifespan: "Long-life composite system",
    body:
      "Molded composite that reads as slate or cedar from the ground without the weight of real slate or the maintenance of real cedar. We are a Brava Preferred Installer. This is frequently what design review committees in Highlands, Cashiers, and Sapphire will approve when a homeowner wants the look without the structural or upkeep burden.",
    drives:
      "Profile and color blend, hip and ridge treatment, and installation rate — these are installed piece by piece, so labor is a larger share of the number than on a panel roof.",
  },
  {
    name: "Cedar shake",
    href: "/roofing/specialty",
    tier: "Premium tier — highest maintenance cost over the life of the roof",
    lifespan: "Highly dependent on exposure, ventilation, and upkeep",
    body:
      "Real wood, and in our climate it is the material that most rewards or punishes site conditions. A cedar roof on a shaded, wooded north slope in Cashiers holds moisture and grows moss far faster than the same roof on an open southern exposure. We will quote it, and we will also tell you plainly when synthetic is the better long-term decision for a given lot.",
    drives:
      "Grade of shake, whether a breathable underlayment or batten system is used, and the realistic maintenance cycle for your specific exposure.",
  },
  {
    name: "Flat and low-slope (TPO)",
    href: "/roofing/commercial",
    tier: "Priced per square foot of membrane, not per roofing square",
    lifespan: "Service life tied to membrane thickness and detail quality",
    body:
      "Single-ply membrane for commercial buildings and for the low-slope sections that show up on residential additions, porches, and dormers. Cost tracks membrane thickness, insulation, and — more than anything — the number of curbs, drains, and rooftop penetrations, because that is where the labor and the failures both live.",
    drives:
      "Tear-off versus recover, wet insulation found during tear-off, deck type, and whether the building has to stay in operation while we work.",
  },
];

const repairs = [
  {
    title: "Small field repairs",
    body:
      "A handful of wind-lifted or missing shingles, one popped fastener, a single boot replacement. Short visit, one crew, lowest cost band we do. Often bundled if we are already scheduled nearby.",
  },
  {
    title: "Flashing and detail repairs",
    body:
      "Chimney, wall, valley, and skylight flashing. These cost more than they look like they should, because the work is slow, detail-heavy, and usually on the steepest part of the roof. Most 'leaking skylights' are actually this repair.",
  },
  {
    title: "Repairs with decking or interior damage",
    body:
      "Once water reaches decking, insulation, or drywall, it stops being a roofing repair and becomes layered work. This is the band with the widest spread, because nobody knows the extent until it is opened up.",
  },
  {
    title: "Emergency tarping and stabilization",
    body:
      "Priced as its own line item, separate from permanent repair, so you can see exactly what stopping the water cost versus what fixing the roof costs.",
  },
];

const drivers = [
  {
    icon: TriangleRight,
    title: "Pitch",
    body:
      "Past roughly 7/12 a crew can no longer simply walk the roof. Staging, fall protection, and a slower production rate get added to every square. Steep mountain roofs are the single most common reason two homes with identical square footage get very different numbers.",
  },
  {
    icon: Layers,
    title: "Decking condition",
    body:
      "Unknown until tear-off, every time. We quote a per-sheet decking rate up front, so if rot is found underneath, it is billed at a number you already agreed to instead of a number invented on the spot.",
  },
  {
    icon: Truck,
    title: "Access",
    body:
      "Narrow gravel drives, switchbacks, steep grades, and tight tree lines change how material gets staged and how debris comes off the property — sometimes by hand instead of by truck. On some lots this is a larger cost factor than the roofing material itself.",
  },
  {
    icon: Mountain,
    title: "Elevation and exposure",
    body:
      "Higher elevations bring ice loading, longer freeze-thaw cycles, and wind exposure. That means wider ice-and-water coverage, snow retention over entries and drives, and upgraded fastening patterns. A roof at 4,000 feet in Highlands is not specified the same way as one in the Franklin valley.",
  },
  {
    icon: Wrench,
    title: "Detail count",
    body:
      "Valleys, dormers, chimneys, skylights, roof-to-wall transitions, and ventilation corrections. Labor and flashing follow the detail count, not the footprint. Complex roofs cost more per square than simple ones of the same size.",
  },
];

const faqs = [
  {
    q: "Why doesn't this page list dollar amounts per square for every material?",
    a: "Because a published number would be wrong for most of the homes we quote. Metal is the exception — homeowners ask for it constantly, so we publish real installed ranges per square on the metal roofing cost page. Pitch, access, decking condition, elevation, and detail count move mountain roofing prices more than the material choice does. We would rather measure your roof and put a real number in writing than post an average that sets a false expectation.",
  },
  {
    q: "What is the cheapest roofing option in Western North Carolina?",
    a: "Dimensional asphalt shingle has the lowest installed cost per square of any complete system we install, and exposed-fastener metal is the least expensive way to get a metal roof. The cheapest roof over a 30-year window is not always the cheapest roof on quote day, so we will show you both paths.",
  },
  {
    q: "Should I repair or replace my roof?",
    a: "If the roof is well inside its service life, the damage is localized, and the decking is sound, repair is usually the right call. If it is near the end of its life, has had multiple repairs already, or the decking is compromised across planes, replacement is the honest answer. We price both when it is genuinely a close call so you are not spending repair money twice inside two years.",
  },
  {
    q: "Do you offer financing on a roof replacement?",
    a: "Yes, we offer financing options for qualified homeowners on most projects. Your estimator can walk you through what is available alongside your written estimate, and you can read more on our Financing page.",
  },
  {
    q: "Will my estimate change after work starts?",
    a: "Only for conditions that could not be seen before tear-off, and those are priced in advance. The most common one is decking replacement, which is why we agree on a per-sheet rate before the roof is opened. Anything else is documented, shown to you, and approved before it is performed.",
  },
];

const RoofingCostWNC = () => {
  return (
    <>
      <SEOHead
        title="Roof Replacement Cost in Western NC (2026)"
        description="A 2026 roofing cost guide for Western NC: material tiers, repair bands, what moves the price, financing, and how to decide between repair and replacement."
        path="/roofing-cost-western-nc"
        jsonLd={buildPageSchema({
          type: "service",
          service: {
            name: "Roof Replacement Cost Estimating",
            description:
              "Measured, written roofing estimates for homeowners across Western North Carolina, covering shingle, metal, synthetic, cedar, and low-slope systems.",
            url: "/roofing-cost-western-nc",
            areaServed: "Western North Carolina",
          },
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: "Roofing", url: "/roofing" },
            { name: "Roofing Costs", url: "/roofing-cost-western-nc" },
          ],
          faqs: faqs.map((f) => ({ question: f.q, answer: f.a })),
        })}
      />
      <Header />
      <PageBreadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Roofing", url: "/roofing" },
          { name: "Roofing Costs", url: "/roofing-cost-western-nc" },
        ]}
      />

      <main id="main-content">
        {/* HERO */}
        <section className="bg-heritage-charcoal hero-clears-header pb-14 md:pb-20 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "300px auto" }}
          />
          <div className="container-tight relative z-10">
            <span className="text-caption md:text-body-xs font-body font-bold uppercase tracking-[0.3em] text-[hsl(var(--gold-ink))] block mb-4">
              2026 Cost Guide · Updated {COST_UPDATED}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6 max-w-4xl">
              Roof Replacement Cost in{" "}
              <span className="text-[hsl(var(--gold-ink))]">Western North Carolina</span> (2026)
            </h1>
            <p className="text-white/95 text-lg md:text-xl max-w-2xl leading-relaxed font-body mb-8">
              How the materials rank against each other, what repair work actually involves, and the five
              conditions that move a mountain roofing price more than the shingle you pick.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/request-inspection" className="btn btn-primary btn-md">
                Get My Written Estimate <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href={PHONE_TEL}
                aria-label={`Call Highlander Building Services at ${PHONE_PLAIN}`}
                className="btn btn-secondary btn-md btn-on-dark"
              >
                <Phone className="w-4 h-4" aria-hidden="true" /> Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>

        <TrustStrip />

        {/* ANSWER */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl">
            <AnswerBlock
              question="How much does a new roof cost in Western North Carolina?"
              answer="A new roof in Western North Carolina is priced by pitch, site access, decking condition, elevation, and detail count as much as by material. Dimensional asphalt shingle is the least expensive complete system, exposed-fastener metal sits above it, and standing seam, synthetic slate, and cedar sit at the top. Highlander measures on site and writes a line-item number."
            />
          </div>
        </section>

        {/* MATERIALS */}
        <section className="section-padding bg-secondary">
          <div className="container-tight max-w-5xl">
            <span className="text-caption font-body font-bold uppercase tracking-[0.3em] text-primary block mb-3">
              Material by material
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              How the systems rank on cost
            </h2>
            <p className="text-muted-foreground font-body max-w-2xl mb-10 leading-relaxed">
              We publish tiers rather than dollar figures. A price per square that ignores your pitch, your
              driveway, and what is under the shingles is not information — it is a guess with a decimal point
              in it.
            </p>

            <div className="space-y-6">
              {materials.map((m, i) => (
                <motion.article
                  key={m.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="bg-background border border-border rounded-sm p-6 md:p-8"
                >
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-2">{m.name}</h3>
                  <p className="text-sm font-body font-bold uppercase tracking-wider text-primary mb-1">
                    {m.tier}
                  </p>
                  <p className="text-sm text-muted-foreground font-body mb-4">{m.lifespan}</p>
                  <p className="text-muted-foreground font-body leading-relaxed mb-4">{m.body}</p>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed mb-5">
                    <span className="font-bold text-foreground">What moves this number: </span>
                    {m.drives}
                  </p>
                  <Link
                    to={m.href}
                    className="inline-flex items-center gap-2 text-sm font-body font-bold text-primary hover:underline"
                  >
                    See the full {m.name.toLowerCase()} page <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* METAL COST — published ranges, deeper page linked */}
        <section className="section-padding bg-background" id="metal-roofing-cost">
          <div className="container-tight max-w-5xl">
            <span className="text-caption font-body font-bold uppercase tracking-[0.3em] text-primary block mb-3">
              Metal roofing
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
              Metal Roofing Cost in Western NC ({METAL_COST_YEAR})
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed max-w-3xl mb-8">
              {metalCostAnswer}
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {metalSystems.map((m) => (
                <div key={m.name} className="border border-border bg-secondary/40 p-6">
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2">{m.name}</h3>
                  <p className="font-body font-bold text-primary mb-1">{m.rangePerSquare}</p>
                  <p className="text-sm text-muted-foreground font-body mb-3">{m.rangePerSqFt}</p>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    Service life: {m.lifespan}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground font-body max-w-3xl leading-relaxed mb-6">
              Mountain homes move inside those ranges on pitch, driveway access, engineered snow retention
              over entries and drives, and decking found at tear-off.
            </p>
            <Link
              to="/roofing/metal/cost"
              className="inline-flex items-center gap-2 text-sm font-body font-bold text-primary hover:underline"
            >
              Read the full metal roofing cost guide for Western NC
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* REPAIRS */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-5xl">
            <span className="text-caption font-body font-bold uppercase tracking-[0.3em] text-primary block mb-3">
              Repair work
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-10">
              What repairs cost, by band
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {repairs.map((r) => (
                <div key={r.title} className="border-l-2 border-primary/30 pl-5 py-1">
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2">{r.title}</h3>
                  <p className="text-muted-foreground font-body leading-relaxed">{r.body}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground font-body mt-8 max-w-3xl leading-relaxed">
              Repair pricing follows how far the water traveled and where the failure sits — not the size of
              the roof. See{" "}
              <Link to="/roofing/roof-repair" className="text-primary font-bold hover:underline">
                roof repair
              </Link>{" "}
              or{" "}
              <Link to="/roofing/storm-damage" className="text-primary font-bold hover:underline">
                storm damage
              </Link>{" "}
              for scope and response times.
            </p>
          </div>
        </section>

        {/* PRICE DRIVERS */}
        <section className="section-padding bg-heritage-charcoal">
          <div className="container-tight max-w-5xl">
            <span className="text-caption font-body font-bold uppercase tracking-[0.3em] text-[hsl(var(--gold-ink))] block mb-3">
              What moves the price
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-10">
              Five conditions that change the number
            </h2>
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
              {drivers.map((d) => (
                <div key={d.title} className="flex gap-4">
                  <d.icon
                    className="w-5 h-5 text-[hsl(var(--gold-ink))] flex-shrink-0 mt-1"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white mb-2">{d.title}</h3>
                    <p className="text-white/80 font-body leading-relaxed">{d.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REPAIR OR REPLACE */}
        <section className="section-padding bg-secondary">
          <div className="container-tight max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-5 h-5 text-primary" strokeWidth={1.75} aria-hidden="true" />
              <span className="text-caption font-body font-bold uppercase tracking-[0.3em] text-primary">
                The honest math
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
              Repair or replace?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-background border border-border rounded-sm p-6">
                <h3 className="font-heading font-bold text-lg text-foreground mb-4">Repair is usually right when</h3>
                <ul className="space-y-3">
                  {[
                    "The roof is well inside its expected service life.",
                    "Damage is localized to one plane, one valley, or one detail.",
                    "Decking is sound everywhere we probe it.",
                    "Matching material for the existing profile and color is still available.",
                  ].map((t) => (
                    <li key={t} className="flex gap-3 text-muted-foreground font-body leading-relaxed">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-background border border-border rounded-sm p-6">
                <h3 className="font-heading font-bold text-lg text-foreground mb-4">
                  Replacement is the honest answer when
                </h3>
                <ul className="space-y-3">
                  {[
                    "The roof is near the end of its service life and has been repaired before.",
                    "Decking is soft across multiple planes, not just at one leak.",
                    "Failures are appearing in different areas within the same season.",
                    "Repair money would be spent twice inside two years.",
                  ].map((t) => (
                    <li key={t} className="flex gap-3 text-muted-foreground font-body leading-relaxed">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-muted-foreground font-body leading-relaxed mt-8">
              When it is genuinely close, we price both paths and hand you the comparison. You should be able to
              see what another five years of repairs costs against what replacing it now costs, and decide with
              the numbers in front of you.
            </p>
          </div>
        </section>

        {/* FINANCING */}
        <section className="section-padding bg-background">
          <div className="container-tight max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-5 h-5 text-primary" strokeWidth={1.75} aria-hidden="true" />
              <span className="text-caption font-body font-bold uppercase tracking-[0.3em] text-primary">
                Paying for it
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">Financing</h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-4">
              We offer financing options for qualified homeowners on most roofing and construction projects.
              Your estimator can walk you through what is available at the same visit you get your written
              estimate, so the payment conversation and the scope conversation happen together instead of weeks
              apart.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed mb-6">
              If the work is storm related, insurance may cover part or all of it depending on your policy,
              your deductible, and the cause of damage. We document the damage in the format carriers expect
              and let your carrier make the determination — we do not promise approvals we do not control.
            </p>
            <Link to="/financing" className="btn btn-secondary btn-md">
              See financing options <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding bg-secondary">
          <div className="container-tight max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8">
              Cost questions we get most
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`cost-faq-${i}`}>
                  <AccordionTrigger className="text-left font-heading font-bold text-base md:text-lg">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-body leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* QUOTE FORM */}
        <InspectionForm />

        <RelatedLinks
          eyebrow="Keep Exploring"
          heading="Related pages"
          columns={2}
          links={[
            { label: "Roofing Services Hub", href: "/roofing", description: "Every roofing service we offer" },
            { label: "Roof Replacement", href: "/roofing/roof-replacement", description: "Process, materials, and timeline" },
            { label: "Metal Roofing", href: "/roofing/metal", description: "Standing seam and exposed fastener" },
            { label: "Synthetic Slate & Shake", href: "/roofing/brava-synthetic", description: "Brava composite systems" },
            { label: "Roof Repair", href: "/roofing/roof-repair", description: "Leaks, flashing, and storm repairs" },
            { label: "Financing", href: "/financing", description: "Options for qualified homeowners" },
            { label: "All Questions Answered", href: "/faq", description: "The full FAQ hub" },
            { label: "Service Areas", href: "/service-areas", description: "Towns we cover across WNC" },
          ]}
        />
      </main>

      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default RoofingCostWNC;
