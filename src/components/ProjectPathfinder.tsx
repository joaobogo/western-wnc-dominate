import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, ArrowLeft, Home, HardHat, Layers, Wrench, CloudLightning,
  PlusSquare, Hammer, PaintBucket, Sun, Ruler, CheckCircle, Sparkles,
} from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EASE = [0.22, 1, 0.36, 1] as any;

interface PathOption {
  id: string;
  icon: typeof Home;
  label: string;
  description: string;
}

interface PathResult {
  title: string;
  description: string;
  href: string;
  cta: string;
  highlights: string[];
}

const roofingOptions: PathOption[] = [
  { id: "replace", icon: Layers, label: "Full Replacement", description: "Time for a new roof — material selection, tear-off, and installation" },
  { id: "repair", icon: Wrench, label: "Repair or Fix", description: "Leaks, missing shingles, flashing issues, or small damage areas" },
  { id: "storm", icon: CloudLightning, label: "Storm Damage", description: "Wind, hail, or fallen debris — need assessment and insurance help" },
  { id: "inspect", icon: Home, label: "Inspection", description: "Not sure what's needed — want a professional to take a look" },
];

const constructionOptions: PathOption[] = [
  { id: "addition", icon: PlusSquare, label: "Home Addition", description: "Add rooms, expand living space, or build upward" },
  { id: "renovation", icon: Hammer, label: "Renovation", description: "Update kitchens, bathrooms, or transform existing spaces" },
  { id: "exterior", icon: PaintBucket, label: "Exterior Upgrade", description: "Siding, windows, doors, or curb appeal improvements" },
  { id: "outdoor", icon: Sun, label: "Outdoor Living", description: "Decks, porches, patios, or screened-in spaces" },
  { id: "custom", icon: Ruler, label: "Custom Build", description: "Ground-up construction or major structural work" },
];

const results: Record<string, PathResult> = {
  replace: { title: "Roof Replacement", description: "We'll assess your current roof, recommend the right material for your elevation and exposure, and deliver a full replacement with manufacturer-backed warranty.", href: "/roofing/roof-replacement", cta: "Explore Roof Replacement", highlights: ["Material selection guidance", "CertainTeed warranty options", "Rapid response time"] },
  repair: { title: "Roof Repair", description: "Our team diagnoses accurately and repairs precisely — from single-shingle fixes to complex flashing repairs. We'll tell you honestly if repair is the right call.", href: "/roofing/roof-repair", cta: "Learn About Repairs", highlights: ["Honest diagnosis", "Same-day emergency service", "Transparent pricing"] },
  storm: { title: "Storm Damage Response", description: "We respond rapidly with professional documentation, insurance claim support, and emergency tarping if needed. Your roof is in good hands.", href: "/roofing/storm-damage", cta: "Get Storm Help Now", highlights: ["Rapid emergency response", "Insurance documentation", "Free damage assessment"] },
  inspect: { title: "Professional Roof Inspection", description: "A thorough 60-point inspection of your entire roof system — we'll document everything and give you a clear picture of your roof's condition.", href: "/consultation", cta: "Request an Inspection", highlights: ["Comprehensive 60-point check", "Photo documentation", "No-pressure report"] },
  addition: { title: "Home Additions", description: "From planning through permitting to build-out, we handle every phase of your addition with the same documented process that earned our roofing reputation.", href: "/construction/additions", cta: "Explore Home Additions", highlights: ["Licensed GC oversight", "Professionally coordinated", "Roof-to-structure integration"] },
  renovation: { title: "Renovations & Remodels", description: "Transform your existing spaces with precision craftsmanship. We manage every detail — from structural assessment to final finish.", href: "/construction/renovations", cta: "Explore Renovations", highlights: ["Full project management", "Structural expertise", "Design-build capability"] },
  exterior: { title: "Exterior Improvements", description: "Siding, windows, doors, and façade upgrades that protect your home and transform its appearance. Coordinated with roofing for weatherproofing continuity.", href: "/construction/exterior", cta: "Explore Exterior Work", highlights: ["Weatherproofing continuity", "Energy efficiency focus", "Curb appeal transformation"] },
  outdoor: { title: "Outdoor Living Spaces", description: "Decks, screened porches, covered patios, and outdoor kitchens built to handle WNC's mountain climate year-round.", href: "/construction/outdoor-living", cta: "Explore Outdoor Living", highlights: ["Climate-rated materials", "Covered roof integration", "Year-round usability"] },
  custom: { title: "Custom Construction", description: "Ground-up building and major structural projects executed with licensed GC oversight and the quality standards that define Highlander.", href: "/construction/custom", cta: "Explore Custom Builds", highlights: ["Full GC licensing", "Mountain building expertise", "Complete project delivery"] },
};

const ProjectPathfinder = () => {
  const [step, setStep] = useState<"start" | "roofing" | "construction" | "result">("start");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const result = selectedService ? results[selectedService] : null;

  const reset = () => { setStep("start"); setSelectedService(null); };

  return (
    <section className="section-padding bg-secondary tartan-bg relative overflow-hidden">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-10 md:mb-12"
        >
          <span className="eyebrow mb-3 block">Project Guide</span>
          <h2 className="section-heading mb-4">
            Not Sure Where to Start?<br className="hidden md:block" />
            <span className="text-[hsl(var(--gold-ink))]"> We'll Help You Find Your Path.</span>
          </h2>
          <p className="text-muted-foreground text-base font-body max-w-lg mx-auto">
            Answer one or two quick questions and we'll point you to exactly the right service, page, and next step.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {/* STEP 1: Roofing vs Construction */}
            {step === "start" && (
              <motion.div key="start" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35, ease: EASE }}>
                <p className="text-center text-sm font-body text-muted-foreground mb-6">What kind of project are you thinking about?</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: "roofing" as const, icon: Home, title: "Roofing", desc: "Replacement, repair, storm damage, or inspection", accent: "primary" },
                    { id: "construction" as const, icon: HardHat, title: "Construction", desc: "Additions, renovations, exterior, outdoor living", accent: "accent" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setStep(opt.id)}
                      className="group text-left bg-card border border-border rounded-sm p-6 md:p-8 hover:border-primary/20 card-lift spotlight-hover transition-all"
                    >
                      <div className="w-12 h-12 rounded-sm bg-primary/6 flex items-center justify-center mb-5 group-hover:bg-primary/12 transition-colors">
                        <opt.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-heading font-bold text-foreground text-xl mb-2 group-hover:text-primary transition-colors">{opt.title}</h3>
                      <p className="text-muted-foreground text-sm font-body">{opt.desc}</p>
                      <div className="mt-5 flex items-center gap-1.5 text-primary text-sm font-semibold">
                        Select <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-center mt-6">
                  <Link to="/consultation" className="text-xs font-body text-muted-foreground hover:text-primary transition-colors">
                    Not sure at all? <span className="underline">Talk to an advisor directly →</span>
                  </Link>
                </p>
              </motion.div>
            )}

            {/* STEP 2: Sub-service selection */}
            {(step === "roofing" || step === "construction") && (
              <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35, ease: EASE }}>
                <div className="flex items-center justify-between mb-6">
                  <button onClick={reset} className="flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <span className="text-xs font-body font-semibold uppercase tracking-[0.15em] text-primary/80">
                    {step === "roofing" ? "Roofing Services" : "Construction Services"}
                  </span>
                </div>
                <p className="text-center text-sm font-body text-muted-foreground mb-6">What describes your project best?</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(step === "roofing" ? roofingOptions : constructionOptions).map((opt, i) => (
                    <motion.button
                      key={opt.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => { setSelectedService(opt.id); setStep("result"); }}
                      className="group text-left bg-card border border-border rounded-sm p-5 hover:border-primary/20 card-lift transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-9 h-9 rounded-sm bg-primary/6 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/12 transition-colors">
                          <opt.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-heading font-bold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">{opt.label}</h4>
                          <p className="text-muted-foreground text-xs font-body leading-relaxed">{opt.description}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3: Result */}
            {step === "result" && result && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.97, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: EASE }}>
                <div className="bg-card border border-border rounded-sm overflow-hidden">
                  <div className="p-6 md:p-8 border-b border-border">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-4 h-4 text-[hsl(var(--gold-ink))]" />
                      <span className="text-caption font-body font-bold uppercase tracking-[0.15em] text-[hsl(var(--gold-ink))]">Recommended For You</span>
                    </div>
                    <h3 className="font-heading font-bold text-foreground text-2xl mb-3">{result.title}</h3>
                    <p className="text-muted-foreground text-sm font-body leading-relaxed max-w-xl">{result.description}</p>
                  </div>
                  <div className="px-6 md:px-8 py-5 bg-secondary/30">
                    <div className="flex flex-wrap gap-3 mb-6">
                      {result.highlights.map((h) => (
                        <span key={h} className="inline-flex items-center gap-1.5 text-xs font-body font-medium text-muted-foreground bg-background border border-border rounded-sm px-3 py-1.5">
                          <CheckCircle className="w-3 h-3 text-primary/80" /> {h}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link to={result.href} className="group cta-gradient text-accent-foreground font-semibold text-sm px-6 py-3.5 rounded-sm inline-flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden">
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        <span className="relative">{result.cta}</span>
                        <ArrowRight className="w-4 h-4 relative" />
                      </Link>
                      <Link to="/consultation" className="border border-border text-foreground font-medium text-sm px-6 py-3.5 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-secondary transition-all">
                        Request a Consultation
                      </Link>
                    </div>
                  </div>
                </div>
                <button onClick={reset} className="mx-auto mt-6 flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5" /> Start Over
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProjectPathfinder;
