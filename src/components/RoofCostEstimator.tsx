import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ArrowRight, ArrowLeft, DollarSign, Home, CheckCircle, Shield, Loader2 } from "lucide-react";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

type Step = "size" | "material" | "condition" | "contact" | "result";

interface EstimateData {
  size: string;
  material: string;
  condition: string;
  name: string;
  email: string;
  phone: string;
  town: string;
}

const sizeOptions = [
  { label: "Small", detail: "Under 1,500 sq ft", value: "small", multiplier: 1 },
  { label: "Medium", detail: "1,500–2,500 sq ft", value: "medium", multiplier: 1.6 },
  { label: "Large", detail: "2,500–4,000 sq ft", value: "large", multiplier: 2.4 },
  { label: "Estate", detail: "4,000+ sq ft", value: "xlarge", multiplier: 3.2 },
];

const materialOptions = [
  { label: "Dimensional Shingles", value: "shingle", baseCost: 8500, description: "Most popular · 25–30 year lifespan" },
  { label: "Standing Seam Metal", value: "metal", baseCost: 16000, description: "Premium durability · 50+ year lifespan" },
  { label: "Synthetic Slate", value: "slate", baseCost: 22000, description: "Luxury aesthetic · 50+ year lifespan" },
  { label: "Not Sure Yet", value: "unsure", baseCost: 12000, description: "We'll recommend the best option for your property" },
];

const conditionOptions = [
  { label: "Minor Issues", value: "minor", description: "A few missing shingles or a small leak", adjustment: -2000 },
  { label: "Moderate Wear", value: "moderate", description: "Multiple problem areas, visible aging", adjustment: 0 },
  { label: "Major Damage", value: "major", description: "Significant storm damage or structural concerns", adjustment: 3000 },
  { label: "Full Replacement", value: "replace", description: "Roof is at end of useful life", adjustment: 2000 },
];

const towns = ["Highlands", "Cashiers", "Franklin", "Sylva", "Bryson City", "Waynesville", "Cullowhee", "Dillsboro", "Other"];

const stepOrder: Step[] = ["size", "material", "condition", "contact", "result"];

const RoofCostEstimator = () => {
  const [step, setStep] = useState<Step>("size");
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<EstimateData>({
    size: "", material: "", condition: "", name: "", email: "", phone: "", town: "",
  });

  const currentIndex = stepOrder.indexOf(step);
  const progress = ((currentIndex + 1) / stepOrder.length) * 100;

  const goTo = (next: Step) => {
    const nextIdx = stepOrder.indexOf(next);
    setDirection(nextIdx > currentIndex ? 1 : -1);
    setStep(next);
  };

  const getEstimate = () => {
    const size = sizeOptions.find(s => s.value === data.size);
    const material = materialOptions.find(m => m.value === data.material);
    const condition = conditionOptions.find(c => c.value === data.condition);
    if (!size || !material || !condition) return { low: 0, high: 0 };
    const base = material.baseCost * size.multiplier + condition.adjustment;
    return { low: Math.round(base * 0.85), high: Math.round(base * 1.15) };
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.name && data.email && data.phone) {
      goTo("result");
    }
  };

  const stepVariants = {
    enter: (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0 }),
  };

  const optionClass = (selected: boolean) =>
    `w-full text-left px-5 py-4 rounded-none border transition-all duration-300 group/opt ${
      selected
        ? "border-[hsl(var(--highland-gold)/0.5)] bg-[hsl(var(--highland-gold)/0.04)] shadow-sm"
        : "border-border hover:border-[hsl(var(--highland-gold)/0.2)] hover:bg-secondary/30"
    }`;

  const inputClass = "w-full px-4 py-3.5 rounded-none bg-background border border-border text-foreground placeholder:text-muted-foreground/75 text-sm font-body field-premium";
  const labelClass = "block text-[10px] font-body font-semibold uppercase tracking-[0.12em] text-muted-foreground/60 mb-2";

  return (
    <section className="section-padding bg-background tartan-bg" id="cost-estimator">
      <div className="container-tight max-w-2xl">
        <div className="text-center mb-8">
          <ScrollReveal variant="fade">
            <span className="eyebrow mb-3 block">Planning Tool</span>
          </ScrollReveal>
          <HeadingReveal delay={0.1}>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
              Roof Cost Estimator
            </h2>
          </HeadingReveal>
          <ScrollReveal variant="rise-subtle" delay={0.2}>
            <p className="text-muted-foreground text-sm font-body max-w-md mx-auto">
              Three quick questions. Personalized estimate in under 60 seconds. No obligation, no pressure.
            </p>
          </ScrollReveal>
          <GoldLine width="3rem" centered delay={0.3} className="mt-4" />
        </div>

        {/* Progress */}
        <div className="w-full h-1 bg-border rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-[hsl(var(--highland-gold))] rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: HIGHLAND_EASE }}
          />
        </div>

        <div className="bg-card border border-border rounded-none p-6 md:p-8 spotlight-hover">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: HIGHLAND_EASE }}
            >
              {step === "size" && (
                <div>
                  <p className="text-[10px] font-body font-semibold uppercase tracking-[0.12em] text-[hsl(var(--highland-gold)/0.6)] mb-1">Step 1 of 3</p>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-1">Home Size</h3>
                  <p className="text-sm text-muted-foreground mb-6 font-body">Approximate square footage of your home.</p>
                  <div className="space-y-2.5">
                    {sizeOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setData({ ...data, size: opt.value }); goTo("material"); }}
                        className={optionClass(data.size === opt.value)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-9 h-9 rounded-none bg-primary/6 flex items-center justify-center flex-shrink-0 group-hover/opt:bg-primary/10 transition-colors">
                            <Home className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <span className="font-heading font-semibold text-foreground text-sm">{opt.label}</span>
                            <p className="text-muted-foreground text-xs font-body">{opt.detail}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === "material" && (
                <div>
                  <p className="text-[10px] font-body font-semibold uppercase tracking-[0.12em] text-[hsl(var(--highland-gold)/0.6)] mb-1">Step 2 of 3</p>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-1">Roofing Material</h3>
                  <p className="text-sm text-muted-foreground mb-6 font-body">What material are you considering?</p>
                  <div className="space-y-2.5">
                    {materialOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setData({ ...data, material: opt.value }); goTo("condition"); }}
                        className={optionClass(data.material === opt.value)}
                      >
                        <span className="font-heading font-semibold text-foreground text-sm">{opt.label}</span>
                        <p className="text-xs text-muted-foreground mt-0.5 font-body">{opt.description}</p>
                      </button>
                    ))}
                  </div>
                  <button onClick={() => goTo("size")} className="mt-5 text-sm text-muted-foreground font-medium inline-flex items-center gap-1.5 hover:text-foreground transition-colors font-body">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                </div>
              )}

              {step === "condition" && (
                <div>
                  <p className="text-[10px] font-body font-semibold uppercase tracking-[0.12em] text-[hsl(var(--highland-gold)/0.6)] mb-1">Step 3 of 3</p>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-1">Current Condition</h3>
                  <p className="text-sm text-muted-foreground mb-6 font-body">What best describes your roof right now?</p>
                  <div className="space-y-2.5">
                    {conditionOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setData({ ...data, condition: opt.value }); goTo("contact"); }}
                        className={optionClass(data.condition === opt.value)}
                      >
                        <span className="font-heading font-semibold text-foreground text-sm">{opt.label}</span>
                        <p className="text-xs text-muted-foreground mt-0.5 font-body">{opt.description}</p>
                      </button>
                    ))}
                  </div>
                  <button onClick={() => goTo("material")} className="mt-5 text-sm text-muted-foreground font-medium inline-flex items-center gap-1.5 hover:text-foreground transition-colors font-body">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                </div>
              )}

              {step === "contact" && (
                <div>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-1">Your Estimate Is Ready</h3>
                  <p className="text-sm text-muted-foreground mb-6 font-body">Enter your info to see your personalized range and receive a detailed breakdown.</p>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className={labelClass}>Your Name</label>
                      <input type="text" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} required className={inputClass} placeholder="First & last name" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Email</label>
                        <input type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} required className={inputClass} placeholder="you@email.com" />
                      </div>
                      <div>
                        <label className={labelClass}>Phone</label>
                        <input type="tel" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} required className={inputClass} placeholder="(828) 555-0123" />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Your Town</label>
                      <select value={data.town} onChange={(e) => setData({ ...data, town: e.target.value })} required className={inputClass}>
                        <option value="">Select your town</option>
                        {towns.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <button type="submit" className="w-full cta-gradient text-accent-foreground font-heading font-bold py-3.5 rounded-none flex items-center justify-center gap-2 btn-primary-interactive">
                      <span className="relative z-10">See My Estimate</span>
                      <ArrowRight className="w-4 h-4 relative z-10 btn-arrow-icon" />
                    </button>
                    <p className="text-[10px] text-muted-foreground/50 text-center font-body">No spam · We'll follow up with a detailed estimate by email.</p>
                  </form>
                  <button onClick={() => goTo("condition")} className="mt-5 text-sm text-muted-foreground font-medium inline-flex items-center gap-1.5 hover:text-foreground transition-colors font-body">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                </div>
              )}

              {step === "result" && (
                <div className="text-center">
                  <motion.div
                    className="w-14 h-14 rounded-full bg-[hsl(var(--highland-gold)/0.1)] flex items-center justify-center mx-auto mb-5"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <DollarSign className="w-7 h-7 text-[hsl(var(--highland-gold))]" />
                  </motion.div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2">Your Estimated Range</h3>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="text-3xl md:text-4xl font-heading font-bold text-[hsl(var(--highland-gold))] mb-3"
                  >
                    ${getEstimate().low.toLocaleString()} – ${getEstimate().high.toLocaleString()}
                  </motion.div>
                  <p className="text-sm text-muted-foreground mb-6 font-body max-w-md mx-auto">
                    This is a planning estimate for your {data.town || "WNC"} property. Actual cost depends on roof complexity, access, and current condition — which we'll assess in person.
                  </p>

                  <div className="bg-secondary rounded-none p-5 mb-6 text-left border border-border">
                    <div className="flex items-start gap-3 mb-3">
                      <Shield className="w-5 h-5 text-[hsl(var(--highland-gold))] flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-heading font-semibold text-foreground text-sm mb-1">Want an Exact, Written Quote?</h4>
                        <p className="text-muted-foreground text-[13px] font-body leading-relaxed">
                          Schedule an on-site assessment. We'll walk your property, document conditions, and deliver a detailed proposal with transparent cost groupings rapidly.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href="/consultation" className="cta-gradient text-accent-foreground font-heading font-bold px-8 py-3.5 rounded-none inline-flex items-center justify-center gap-2 btn-primary-interactive">
                      <span className="relative z-10">Request a Consultation</span>
                      <ArrowRight className="w-4 h-4 relative z-10 btn-arrow-icon" />
                    </a>
                    <a href="tel:+18285247773" className="border border-border text-foreground font-medium px-8 py-3.5 rounded-none inline-flex items-center justify-center gap-2 hover:bg-secondary transition-colors font-body">
                      Call (828) 524-7773
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default RoofCostEstimator;
