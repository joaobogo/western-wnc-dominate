import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertTriangle, XCircle, ArrowRight, RotateCcw } from "lucide-react";
import { ResultReveal } from "@/components/conversion";
import { ScrollReveal } from "@/components/motion";

/* ─── Repair vs Replace Guide ─── */
const REPAIR_QUESTIONS = [
  { id: "age", question: "How old is your current roof?", options: [
    { label: "Less than 10 years", score: 0 },
    { label: "10–20 years", score: 1 },
    { label: "Over 20 years", score: 3 },
    { label: "Not sure", score: 1 },
  ]},
  { id: "damage", question: "What kind of issue are you seeing?", options: [
    { label: "A few missing shingles", score: 0 },
    { label: "Visible leaks or water stains", score: 2 },
    { label: "Widespread shingle damage", score: 3 },
    { label: "Sagging or structural concern", score: 4 },
  ]},
  { id: "repairs", question: "How many times has your roof been repaired?", options: [
    { label: "Never / once", score: 0 },
    { label: "2–3 times", score: 2 },
    { label: "More than 3 times", score: 3 },
  ]},
  { id: "plans", question: "How long do you plan to stay in this home?", options: [
    { label: "Selling within 2 years", score: 0 },
    { label: "5–10 more years", score: 1 },
    { label: "Long-term / forever home", score: 2 },
  ]},
  { id: "energy", question: "Do you notice drafts or high energy bills?", options: [
    { label: "No issues", score: 0 },
    { label: "Some — seasonal", score: 1 },
    { label: "Yes — year-round", score: 2 },
  ]},
];

export function RepairVsReplaceGuide() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentQ, setCurrentQ] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const maxScore = 14;
  const pct = (totalScore / maxScore) * 100;

  const getResult = () => {
    if (pct < 30) return { verdict: "Repair is likely sufficient", icon: <CheckCircle className="w-8 h-8 text-green-600" />, color: "bg-green-50 border-green-200", desc: "Based on your answers, a targeted repair should address the issue and extend your roof's lifespan. We'd recommend a professional inspection to confirm." };
    if (pct < 65) return { verdict: "It depends — a closer look is needed", icon: <AlertTriangle className="w-8 h-8 text-amber-600" />, color: "bg-amber-50 border-amber-200", desc: "Your roof is showing signs that could go either way. A professional assessment will determine whether repair makes sense or if you're better served by a full replacement." };
    return { verdict: "Replacement is the stronger investment", icon: <XCircle className="w-8 h-8 text-red-600" />, color: "bg-red-50 border-red-200", desc: "Multiple factors suggest your roof is nearing end of life. A new roof system will be more cost-effective long-term than continued repairs." };
  };

  const handleAnswer = (score: number) => {
    const q = REPAIR_QUESTIONS[currentQ];
    setAnswers(prev => ({ ...prev, [q.id]: score }));
    if (currentQ < REPAIR_QUESTIONS.length - 1) {
      setCurrentQ(c => c + 1);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => { setAnswers({}); setCurrentQ(0); setShowResult(false); };

  return (
    <ScrollReveal>
      <div className="bg-card border border-border rounded-sm p-6 md:p-8">
        <h3 className="font-heading text-xl font-bold text-foreground mb-1">Should You Repair or Replace?</h3>
        <p className="text-sm text-muted-foreground font-body mb-6">Answer five quick questions and we'll give you an honest assessment.</p>

        {!showResult ? (
          <div>
            <div className="flex gap-1 mb-6">
              {REPAIR_QUESTIONS.map((_, i) => (
                <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= currentQ ? "bg-accent" : "bg-border"}`} />
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                <p className="font-heading font-semibold text-foreground mb-4">{REPAIR_QUESTIONS[currentQ].question}</p>
                <div className="space-y-2">
                  {REPAIR_QUESTIONS[currentQ].options.map(opt => (
                    <button key={opt.label} onClick={() => handleAnswer(opt.score)} className="w-full text-left px-4 py-3 rounded-sm border border-border bg-background hover:border-accent/30 hover:bg-secondary/50 transition-all text-sm font-body text-foreground">
                      {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <ResultReveal show={true}>
            <div className={`p-5 rounded-sm border ${getResult().color} mb-4`}>
              <div className="flex items-start gap-3">
                {getResult().icon}
                <div>
                  <p className="font-heading font-bold text-foreground text-lg">{getResult().verdict}</p>
                  <p className="text-sm text-muted-foreground font-body mt-1 leading-relaxed">{getResult().desc}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button onClick={reset} className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body inline-flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5" /> Start Over
              </button>
              <a href="/consultation" className="btn-primary-interactive text-sm px-5 py-2.5 inline-flex items-center gap-2">
                Discuss With an Advisor <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </ResultReveal>
        )}
      </div>
    </ScrollReveal>
  );
}

/* ─── Storm Damage Checklist ─── */
const STORM_ITEMS = [
  { id: "shingles", label: "Missing or lifted shingles visible from ground", critical: true },
  { id: "debris", label: "Tree limbs or debris on the roof" },
  { id: "gutters", label: "Gutters pulled away or filled with granules", critical: true },
  { id: "leaks", label: "Water stains on ceilings or walls", critical: true },
  { id: "flashing", label: "Damaged flashing around vents or chimney" },
  { id: "siding", label: "Dented or cracked siding" },
  { id: "skylight", label: "Skylight damage or leaking" },
  { id: "granules", label: "Excessive granules in downspouts or on ground" },
];

export function StormChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [showResult, setShowResult] = useState(false);

  const toggle = (id: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const criticalCount = STORM_ITEMS.filter(i => i.critical && checked.has(i.id)).length;
  const totalChecked = checked.size;

  const getUrgency = () => {
    if (criticalCount >= 2) return { level: "High — contact us today", color: "text-red-600", desc: "Multiple critical signs of storm damage. We recommend an inspection within 24-48 hours to prevent further damage and support your insurance claim." };
    if (totalChecked >= 3) return { level: "Moderate — schedule an inspection this week", color: "text-amber-600", desc: "Several signs of storm impact. A professional inspection will determine the extent of damage and whether an insurance claim is warranted." };
    if (totalChecked > 0) return { level: "Low — monitor and document", color: "text-green-600", desc: "Minor signs. Take photos, keep records, and consider a routine inspection at your convenience." };
    return null;
  };

  return (
    <ScrollReveal>
      <div className="bg-card border border-border rounded-sm p-6 md:p-8">
        <h3 className="font-heading text-xl font-bold text-foreground mb-1">Post-Storm Damage Checklist</h3>
        <p className="text-sm text-muted-foreground font-body mb-6">Check everything you can see from the ground. Never climb on a damaged roof.</p>

        <div className="space-y-2 mb-6">
          {STORM_ITEMS.map(item => (
            <label key={item.id} className={`flex items-start gap-3 p-3 rounded-sm border cursor-pointer transition-all ${checked.has(item.id) ? "border-accent/50 bg-accent/5" : "border-border hover:border-accent/20"}`}>
              <input type="checkbox" checked={checked.has(item.id)} onChange={() => toggle(item.id)} className="mt-0.5 accent-[hsl(var(--accent))]" />
              <span className="text-sm font-body text-foreground">
                {item.label}
                {item.critical && <span className="text-xs text-red-500 ml-1 font-medium">⚠ Critical</span>}
              </span>
            </label>
          ))}
        </div>

        {totalChecked > 0 && (
          <ResultReveal show={true}>
            <div className="bg-secondary/50 border border-border rounded-sm p-4 mb-4">
              <p className={`font-heading font-bold ${getUrgency()?.color}`}>{getUrgency()?.level}</p>
              <p className="text-sm text-muted-foreground font-body mt-1">{getUrgency()?.desc}</p>
            </div>
            <a href="/consultation" className="btn-primary-interactive text-sm px-5 py-2.5 inline-flex items-center gap-2 w-full justify-center">
              Request a Storm Assessment <ArrowRight className="w-4 h-4" />
            </a>
          </ResultReveal>
        )}
      </div>
    </ScrollReveal>
  );
}

/* ─── Materials Comparison ─── */
const MATERIALS = [
  {
    id: "dimensional-shingle",
    name: "Dimensional Shingles",
    lifespan: "25–30 years",
    priceRange: "$$",
    bestFor: "Most residential roofs, balanced value",
    windRating: "Up to 130 mph",
    mountainNote: "Standard choice. Reliable in WNC climate with proper ventilation.",
    pros: ["Affordable", "Wide color range", "Easy to repair"],
    cons: ["Shorter lifespan than premium options", "Can suffer in extreme freeze-thaw"],
  },
  {
    id: "standing-seam-metal",
    name: "Standing Seam Metal",
    lifespan: "50+ years",
    priceRange: "$$$$",
    bestFor: "Mountain homes, steep pitches, long-term value",
    windRating: "Up to 160 mph",
    mountainNote: "Our top recommendation for elevation. Sheds snow, resists ice dams, and lasts generations.",
    pros: ["Exceptional longevity", "Snow shedding", "Energy efficient", "Ice dam resistant"],
    cons: ["Higher upfront cost", "Requires expert installation"],
  },
  {
    id: "cedar-shake",
    name: "Cedar Shake",
    lifespan: "30–40 years",
    priceRange: "$$$",
    bestFor: "Mountain estates, historic character",
    windRating: "Up to 110 mph",
    mountainNote: "Beautiful and natural. Requires maintenance commitment but ages gracefully in mountain settings.",
    pros: ["Stunning aesthetics", "Natural insulation", "Ages beautifully"],
    cons: ["Maintenance required", "Fire rating considerations", "Moisture management"],
  },
  {
    id: "synthetic-slate",
    name: "Synthetic Slate",
    lifespan: "40–50 years",
    priceRange: "$$$",
    bestFor: "Luxury look without natural slate weight",
    windRating: "Up to 110 mph",
    mountainNote: "Excellent for homes where natural slate is desired but structural weight is a concern.",
    pros: ["Luxury appearance", "Lighter than slate", "Impact resistant"],
    cons: ["Premium pricing", "Fewer color options", "Newer product history"],
  },
];

export function MaterialsComparison() {
  const [selected, setSelected] = useState<string[]>(["dimensional-shingle", "standing-seam-metal"]);

  const toggle = (id: string) => {
    setSelected(prev => {
      if (prev.includes(id)) return prev.filter(m => m !== id);
      if (prev.length >= 3) return [...prev.slice(1), id];
      return [...prev, id];
    });
  };

  const selectedMaterials = MATERIALS.filter(m => selected.includes(m.id));

  return (
    <ScrollReveal>
      <div className="bg-card border border-border rounded-sm p-6 md:p-8">
        <h3 className="font-heading text-xl font-bold text-foreground mb-1">Roofing Materials for Mountain Homes</h3>
        <p className="text-sm text-muted-foreground font-body mb-6">Select up to 3 materials to compare side by side.</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {MATERIALS.map(m => (
            <button
              key={m.id}
              onClick={() => toggle(m.id)}
              className={`text-sm font-body font-medium px-4 py-2 rounded-sm border transition-all ${
                selected.includes(m.id)
                  ? "border-accent bg-accent/10 text-foreground"
                  : "border-border text-muted-foreground hover:border-accent/30"
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

        {selectedMaterials.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {selectedMaterials.map(m => (
              <motion.div key={m.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="border border-border rounded-sm p-4 bg-background">
                <h4 className="font-heading font-bold text-foreground text-sm mb-3">{m.name}</h4>
                <div className="space-y-2 text-xs font-body">
                  <div className="flex justify-between"><span className="text-muted-foreground">Lifespan</span><span className="font-medium text-foreground">{m.lifespan}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Wind Rating</span><span className="font-medium text-foreground">{m.windRating}</span></div>
                </div>
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground font-body mb-2"><strong className="text-foreground">Best for:</strong> {m.bestFor}</p>
                  <p className="text-xs text-accent/80 font-body italic">🏔 {m.mountainNote}</p>
                </div>
                <div className="mt-3 pt-3 border-t border-border grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-semibold">Pros</p>
                    {m.pros.map(p => <p key={p} className="text-xs text-green-700 font-body">+ {p}</p>)}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-semibold">Cons</p>
                    {m.cons.map(c => <p key={c} className="text-xs text-red-600 font-body">− {c}</p>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground font-body mb-3">Every roof is unique. We'll help you choose the right material for your home's specific conditions.</p>
          <a href="/consultation" className="btn-primary-interactive text-sm px-5 py-2.5 inline-flex items-center gap-2">
            Discuss Materials With an Advisor <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </ScrollReveal>
  );
}

/* ─── Construction Project Fit Guide ─── */
const FIT_QUESTIONS = [
  { id: "scope", question: "How would you describe the scope of your project?", options: [
    { label: "Targeted improvement (one room or area)", value: "small", next: "renovation" },
    { label: "Moderate expansion or update", value: "medium", next: "mixed" },
    { label: "Major addition or custom build", value: "large", next: "addition" },
    { label: "Not sure — I need guidance", value: "unsure", next: "consult" },
  ]},
  { id: "priority", question: "What matters most to you?", options: [
    { label: "More living space", value: "space" },
    { label: "Improved curb appeal and exterior", value: "exterior" },
    { label: "Better outdoor living", value: "outdoor" },
    { label: "Modernizing or updating finishes", value: "modernize" },
    { label: "Weather protection and durability", value: "protection" },
  ]},
];

const FIT_RESULTS: Record<string, { service: string; path: string; desc: string }> = {
  "small-modernize": { service: "Renovations", path: "/construction/renovations", desc: "A targeted renovation sounds right. We'll assess the space and discuss finish options." },
  "small-exterior": { service: "Exterior Improvements", path: "/construction/exterior", desc: "Exterior updates can transform how your home looks and performs." },
  "medium-space": { service: "Home Additions", path: "/construction/additions", desc: "A moderate expansion — we'll help you plan the right addition for your property." },
  "medium-outdoor": { service: "Outdoor Living", path: "/construction/outdoor-living", desc: "Covered porches, decks, and outdoor structures designed for mountain living." },
  "large-space": { service: "Home Additions", path: "/construction/additions", desc: "A major addition. Let's discuss design, structural, and permitting considerations." },
  "default": { service: "Custom Projects", path: "/construction/custom", desc: "Your project sounds unique. Let's have a conversation about what you're envisioning." },
};

export function ConstructionFitGuide() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQ, setCurrentQ] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: string) => {
    const q = FIT_QUESTIONS[currentQ];
    const updated = { ...answers, [q.id]: value };
    setAnswers(updated);
    if (currentQ < FIT_QUESTIONS.length - 1) {
      setCurrentQ(c => c + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResult = () => {
    const key = `${answers.scope}-${answers.priority}`;
    return FIT_RESULTS[key] || FIT_RESULTS["default"];
  };

  const reset = () => { setAnswers({}); setCurrentQ(0); setShowResult(false); };

  return (
    <ScrollReveal>
      <div className="bg-card border border-border rounded-sm p-6 md:p-8">
        <h3 className="font-heading text-xl font-bold text-foreground mb-1">Find the Right Construction Service</h3>
        <p className="text-sm text-muted-foreground font-body mb-6">A few questions to point you in the right direction.</p>

        {!showResult ? (
          <AnimatePresence mode="wait">
            <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <p className="font-heading font-semibold text-foreground mb-4">{FIT_QUESTIONS[currentQ].question}</p>
              <div className="space-y-2">
                {FIT_QUESTIONS[currentQ].options.map(opt => (
                  <button key={opt.label} onClick={() => handleAnswer(opt.value)} className="w-full text-left px-4 py-3 rounded-sm border border-border bg-background hover:border-accent/30 hover:bg-secondary/50 transition-all text-sm font-body text-foreground">
                    {opt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <ResultReveal show={true}>
            <div className="bg-primary/5 border border-primary/10 rounded-sm p-5 mb-4">
              <p className="font-heading font-bold text-foreground text-lg">We'd recommend: {getResult().service}</p>
              <p className="text-sm text-muted-foreground font-body mt-1">{getResult().desc}</p>
            </div>
            <div className="flex items-center justify-between">
              <button onClick={reset} className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body inline-flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5" /> Start Over
              </button>
              <a href="/consultation" className="btn-primary-interactive text-sm px-5 py-2.5 inline-flex items-center gap-2">
                Schedule a Consultation <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </ResultReveal>
        )}
      </div>
    </ScrollReveal>
  );
}

/* ─── Service Area Finder ─── */
const SERVICE_TOWNS = [
  { name: "Highlands", slug: "highlands-nc", primary: true },
  { name: "Cashiers", slug: "cashiers-nc", primary: true },
  { name: "Franklin", slug: "franklin-nc", primary: true },
  { name: "Sylva", slug: "sylva-nc", primary: true },
  { name: "Bryson City", slug: "bryson-city-nc", primary: true },
  { name: "Waynesville", slug: "waynesville-nc", primary: true },
  { name: "Cullowhee", slug: "cullowhee-nc", primary: false },
  { name: "Cherokee", slug: "cherokee-nc", primary: false },
  { name: "Brevard", slug: "brevard-nc", primary: false },
  { name: "Hendersonville", slug: "hendersonville-nc", primary: false },
];

export function ServiceAreaFinder() {
  const [search, setSearch] = useState("");

  const filtered = SERVICE_TOWNS.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollReveal>
      <div className="bg-card border border-border rounded-sm p-6 md:p-8">
        <h3 className="font-heading text-xl font-bold text-foreground mb-1">Do We Serve Your Area?</h3>
        <p className="text-sm text-muted-foreground font-body mb-6">We serve all of Western North Carolina. Find your community below.</p>

        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search your town…"
          className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring mb-4"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {filtered.map(t => (
            <a
              key={t.slug}
              href={`/service-areas/${t.slug}`}
              className={`px-3 py-2.5 rounded-sm border text-sm font-body transition-all hover:border-accent/30 hover:bg-secondary/50 ${
                t.primary ? "border-accent/20 bg-accent/5 font-medium text-foreground" : "border-border text-muted-foreground"
              }`}
            >
              {t.name}
              {t.primary && <span className="text-[10px] text-accent ml-1">★</span>}
            </a>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground font-body text-center py-4">
            Don't see your town? We likely still serve your area. <a href="/consultation" className="text-primary hover:text-accent transition-colors font-medium">Contact us to confirm.</a>
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}
