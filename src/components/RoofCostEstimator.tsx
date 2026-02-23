import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, ArrowLeft, DollarSign, Home } from "lucide-react";

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
  { label: "Small (< 1,500 sq ft)", value: "small", multiplier: 1 },
  { label: "Medium (1,500–2,500 sq ft)", value: "medium", multiplier: 1.6 },
  { label: "Large (2,500–4,000 sq ft)", value: "large", multiplier: 2.4 },
  { label: "Very Large (4,000+ sq ft)", value: "xlarge", multiplier: 3.2 },
];

const materialOptions = [
  { label: "Architectural Shingles", value: "shingle", baseCost: 8500, description: "Most popular · 25–30 year lifespan" },
  { label: "Standing Seam Metal", value: "metal", baseCost: 16000, description: "Premium durability · 50+ year lifespan" },
  { label: "Synthetic Slate", value: "slate", baseCost: 22000, description: "Luxury aesthetic · 50+ year lifespan" },
  { label: "Not Sure Yet", value: "unsure", baseCost: 12000, description: "We'll recommend the best option" },
];

const conditionOptions = [
  { label: "Minor Issues", value: "minor", description: "A few missing shingles or small leak", adjustment: -2000 },
  { label: "Moderate Wear", value: "moderate", description: "Multiple problem areas, aging roof", adjustment: 0 },
  { label: "Major Damage", value: "major", description: "Significant storm damage or structural issues", adjustment: 3000 },
  { label: "Full Replacement Needed", value: "replace", description: "Roof is at end of life", adjustment: 2000 },
];

const towns = ["Highlands", "Cashiers", "Franklin", "Sylva", "Bryson City", "Waynesville", "Cullowhee", "Dillsboro", "Other"];

const RoofCostEstimator = () => {
  const [step, setStep] = useState<Step>("size");
  const [data, setData] = useState<EstimateData>({
    size: "", material: "", condition: "", name: "", email: "", phone: "", town: "",
  });

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
      console.log("Estimator lead:", data);
      setStep("result");
    }
  };

  const progress = { size: 25, material: 50, condition: 75, contact: 90, result: 100 };

  return (
    <section className="section-padding bg-background" id="cost-estimator">
      <div className="container-tight max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Calculator className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">Free Roof Cost Estimator</h2>
          <p className="text-muted-foreground">Answer 3 quick questions to get your personalized estimate in under 60 seconds.</p>
        </motion.div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-muted rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress[step]}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="bg-card border border-border rounded-lg p-6 md:p-8">
          {step === "size" && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-1">Step 1: Home Size</h3>
              <p className="text-sm text-muted-foreground mb-6">Approximate square footage of your home.</p>
              <div className="space-y-3">
                {sizeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setData({ ...data, size: opt.value }); setStep("material"); }}
                    className={`w-full text-left px-5 py-4 rounded-lg border transition-all flex items-center gap-4 ${
                      data.size === opt.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/30 hover:bg-muted/50"
                    }`}
                  >
                    <Home className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-medium text-foreground">{opt.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "material" && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-1">Step 2: Roofing Material</h3>
              <p className="text-sm text-muted-foreground mb-6">What material are you considering?</p>
              <div className="space-y-3">
                {materialOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setData({ ...data, material: opt.value }); setStep("condition"); }}
                    className={`w-full text-left px-5 py-4 rounded-lg border transition-all ${
                      data.material === opt.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/30 hover:bg-muted/50"
                    }`}
                  >
                    <span className="font-medium text-foreground">{opt.label}</span>
                    <p className="text-xs text-muted-foreground mt-1">{opt.description}</p>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep("size")} className="mt-4 text-sm text-primary font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            </motion.div>
          )}

          {step === "condition" && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-1">Step 3: Current Roof Condition</h3>
              <p className="text-sm text-muted-foreground mb-6">What best describes your roof right now?</p>
              <div className="space-y-3">
                {conditionOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setData({ ...data, condition: opt.value }); setStep("contact"); }}
                    className={`w-full text-left px-5 py-4 rounded-lg border transition-all ${
                      data.condition === opt.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/30 hover:bg-muted/50"
                    }`}
                  >
                    <span className="font-medium text-foreground">{opt.label}</span>
                    <p className="text-xs text-muted-foreground mt-1">{opt.description}</p>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep("material")} className="mt-4 text-sm text-primary font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            </motion.div>
          )}

          {step === "contact" && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-1">Almost There!</h3>
              <p className="text-sm text-muted-foreground mb-6">Enter your info to see your personalized estimate and receive a detailed breakdown by email.</p>
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <input type="text" placeholder="Your Name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} required className="w-full px-4 py-3 rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
                <input type="email" placeholder="Your Email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} required className="w-full px-4 py-3 rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
                <input type="tel" placeholder="Your Phone" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} required className="w-full px-4 py-3 rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
                <select value={data.town} onChange={(e) => setData({ ...data, town: e.target.value })} required className="w-full px-4 py-3 rounded-md bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm">
                  <option value="">Select Your Town</option>
                  {towns.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <button type="submit" className="w-full cta-gradient text-accent-foreground font-bold py-3 rounded-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  See My Estimate <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-xs text-muted-foreground text-center">No spam. We'll follow up with a detailed estimate.</p>
              </form>
              <button onClick={() => setStep("condition")} className="mt-4 text-sm text-primary font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            </motion.div>
          )}

          {step === "result" && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">Your Estimated Range</h3>
              <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">
                ${getEstimate().low.toLocaleString()} – ${getEstimate().high.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                This is a rough estimate for your {data.town || "WNC"} home. Actual cost depends on roof complexity, accessibility, and current condition.
              </p>
              <div className="bg-secondary rounded-lg p-4 mb-6 text-left">
                <h4 className="font-semibold text-foreground text-sm mb-2">Want an Exact Quote?</h4>
                <p className="text-muted-foreground text-sm">
                  Schedule a free on-site inspection for a detailed, no-obligation estimate. We'll assess your roof in person and provide a written quote within 24 hours.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="/request-inspection" className="cta-gradient text-accent-foreground font-bold px-8 py-3 rounded-md inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  Schedule Free Inspection <ArrowRight className="w-4 h-4" />
                </a>
                <a href="tel:8283979211" className="border border-border text-foreground font-semibold px-8 py-3 rounded-md inline-flex items-center justify-center gap-2 hover:bg-muted transition-colors">
                  Call (828) 397-9211
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RoofCostEstimator;
