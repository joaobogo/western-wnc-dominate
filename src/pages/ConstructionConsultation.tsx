import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ConfirmationState } from "@/components/conversion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  HardHat, Home, Paintbrush, TreePine, Wrench, Compass,
  ArrowRight, ArrowLeft, CheckCircle, Loader2,
  Calendar, MessageSquare, Target, Lightbulb,
  Building2, Ruler, DoorOpen, Mountain
} from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

/* ─── Types ─── */
interface ConstructionFormData {
  projectType: string;
  projectGoals: string[];
  propertyDescription: string;
  hasPlans: string;
  budgetRange: string;
  timeline: string;
  description: string;
  name: string;
  email: string;
  phone: string;
  town: string;
}

const INITIAL: ConstructionFormData = {
  projectType: "", projectGoals: [], propertyDescription: "",
  hasPlans: "", budgetRange: "", timeline: "",
  description: "", name: "", email: "", phone: "", town: "",
};

/* ─── Options ─── */
const PROJECT_TYPES = [
  { id: "addition", label: "Home Addition", icon: Home, desc: "Expanding your home with new living space" },
  { id: "renovation", label: "Renovation", icon: Paintbrush, desc: "Transforming existing spaces for better function and quality" },
  { id: "outdoor-living", label: "Outdoor Living", icon: TreePine, desc: "Porches, decks, patios, and outdoor structures" },
  { id: "exterior", label: "Exterior Improvements", icon: Building2, desc: "Siding, windows, trim, and building envelope upgrades" },
  { id: "custom", label: "Custom / Complex Project", icon: Compass, desc: "Multi-phase, design-sensitive, or specialty work" },
  { id: "not-sure", label: "I'd Like Guidance", icon: Lightbulb, desc: "We'll help you define the right scope and approach" },
];

const PROJECT_GOALS = [
  { id: "more-space", label: "More Living Space" },
  { id: "modernize", label: "Modernize / Update" },
  { id: "curb-appeal", label: "Curb Appeal" },
  { id: "energy-efficiency", label: "Energy Efficiency" },
  { id: "resale-value", label: "Resale Value" },
  { id: "weather-damage", label: "Repair Weather Damage" },
  { id: "aging-in-place", label: "Aging in Place" },
  { id: "lifestyle", label: "Lifestyle / Enjoyment" },
  { id: "structural", label: "Structural Improvements" },
];

const PLAN_STATUS = [
  { id: "yes-pro-plans", label: "Yes — professionally drawn plans or drawings ready" },
  { id: "yes-sketches", label: "Yes — rough sketches or ideas" },
  { id: "no-need-help", label: "No — I need planning & design help" },
  { id: "exploring", label: "Just exploring possibilities" },
];

const BUDGET_RANGES = [
  { id: "small", label: "Focused scope — single room or detail" },
  { id: "medium", label: "Mid-scope — addition, porch, or significant renovation" },
  { id: "large", label: "Large scope — multi-room or full guest suite" },
  { id: "estate", label: "Estate-level — whole-home or complex build" },
  { id: "guidance", label: "I'd like guidance on the right scope" },
  { id: "not-sure", label: "Not sure yet" },
];

const CONSTRUCTION_TIMELINES = [
  { id: "1-3-months", label: "Within 1–3 months" },
  { id: "3-6-months", label: "3–6 months" },
  { id: "6-12-months", label: "6–12 months" },
  { id: "next-year", label: "Next year" },
  { id: "planning", label: "Early planning — no rush" },
];

const WNC_TOWNS = [
  "Highlands", "Cashiers", "Franklin", "Sylva",
  "Bryson City", "Waynesville", "Cullowhee",
  "Asheville Area", "Hendersonville", "Brevard",
  "Other WNC Area",
];

/* ─── Shared UI ─── */
const CardSelect = ({ options, value, onChange }: {
  options: Array<{ id: string; label: string; icon?: any; desc?: string }>;
  value: string;
  onChange: (id: string) => void;
}) => (
  <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
    {options.map(opt => {
      const Icon = opt.icon;
      const selected = value === opt.id;
      return (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(opt.id)}
          className={`text-left p-4 rounded-sm border transition-all arch-corners ${
            selected
              ? "border-[hsl(var(--highland-gold)/0.5)] bg-[hsl(var(--highland-gold)/0.06)] shadow-sm"
              : "border-border bg-card hover:border-[hsl(var(--highland-gold)/0.2)] hover:bg-secondary/50"
          }`}
        >
          <div className="flex items-start gap-3">
            {Icon && <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${selected ? "text-[hsl(var(--highland-gold))]" : "text-muted-foreground"}`} />}
            <div>
              <p className={`font-heading text-sm font-semibold ${selected ? "text-foreground" : "text-foreground/80"}`}>{opt.label}</p>
              {opt.desc && <p className="text-xs text-muted-foreground mt-0.5 font-body">{opt.desc}</p>}
            </div>
          </div>
        </button>
      );
    })}
  </div>
);

const MultiSelect = ({ options, values, onChange }: {
  options: Array<{ id: string; label: string }>;
  values: string[];
  onChange: (values: string[]) => void;
}) => (
  <div className="flex flex-wrap gap-2">
    {options.map(opt => {
      const selected = values.includes(opt.id);
      return (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(
            selected ? values.filter(v => v !== opt.id) : [...values, opt.id]
          )}
          className={`text-sm font-body font-medium px-4 py-2.5 rounded-sm border transition-all ${
            selected
              ? "border-[hsl(var(--highland-gold)/0.5)] bg-[hsl(var(--highland-gold)/0.08)] text-foreground"
              : "border-border bg-card text-muted-foreground hover:border-[hsl(var(--highland-gold)/0.2)]"
          }`}
        >
          {selected && <CheckCircle className="w-3 h-3 inline mr-1.5 text-[hsl(var(--highland-gold))]" />}
          {opt.label}
        </button>
      );
    })}
  </div>
);

const PillSelect = ({ options, value, onChange }: {
  options: Array<{ id: string; label: string }>;
  value: string;
  onChange: (id: string) => void;
}) => (
  <div className="flex flex-wrap gap-2">
    {options.map(opt => (
      <button
        key={opt.id}
        type="button"
        onClick={() => onChange(opt.id)}
        className={`text-sm font-body font-medium px-4 py-2.5 rounded-sm border transition-all ${
          value === opt.id
            ? "border-[hsl(var(--highland-gold)/0.5)] bg-[hsl(var(--highland-gold)/0.08)] text-foreground"
            : "border-border bg-card text-muted-foreground hover:border-[hsl(var(--highland-gold)/0.2)]"
        }`}
      >
        {opt.label}
      </button>
    ))}
  </div>
);

/* ─── Step Variants ─── */
const stepVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

/* ─── Main Component ─── */
export default function ConstructionConsultation() {
  const [form, setForm] = useState<ConstructionFormData>(INITIAL);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const update = useCallback((field: keyof ConstructionFormData, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const steps = [
    {
      id: "project-type",
      label: "Project Type",
      icon: HardHat,
      question: "What kind of construction project are you considering?",
      hint: "This helps us connect you with the right project advisor on our team.",
      content: <CardSelect options={PROJECT_TYPES} value={form.projectType} onChange={v => update("projectType", v)} />,
      valid: !!form.projectType,
    },
    {
      id: "goals",
      label: "Goals",
      icon: Target,
      question: "What are your primary goals for this project?",
      hint: "Select all that apply. Understanding your goals helps us recommend the right approach.",
      content: <MultiSelect options={PROJECT_GOALS} values={form.projectGoals} onChange={v => update("projectGoals", v)} />,
      valid: form.projectGoals.length > 0,
    },
    {
      id: "plans",
      label: "Plans",
      icon: Ruler,
      question: "Do you have plans or drawings for this project?",
      hint: "No plans? No problem. We offer design-build services and can develop plans with you.",
      content: <PillSelect options={PLAN_STATUS} value={form.hasPlans} onChange={v => update("hasPlans", v)} />,
      valid: !!form.hasPlans,
    },
    {
      id: "budget",
      label: "Budget",
      icon: Compass,
      question: "What's your approximate budget range?",
      hint: "This is not a commitment — it helps us calibrate our recommendations to your investment level.",
      content: <PillSelect options={BUDGET_RANGES} value={form.budgetRange} onChange={v => update("budgetRange", v)} />,
      valid: !!form.budgetRange,
    },
    {
      id: "timeline",
      label: "Timeline",
      icon: Calendar,
      question: "When are you hoping to begin construction?",
      hint: "Construction projects benefit from early planning. There's no wrong answer here.",
      content: <PillSelect options={CONSTRUCTION_TIMELINES} value={form.timeline} onChange={v => update("timeline", v)} />,
      valid: !!form.timeline,
    },
    {
      id: "location",
      label: "Property Address",
      icon: Mountain,
      question: "What is the property address?",
      hint: "We serve all of Western North Carolina. A full address helps us account for elevation, terrain, and local conditions.",
      content: (
        <input 
          value={form.town} 
          onChange={e => update("town", e.target.value)} 
          placeholder="Street, city, and state" 
          className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--highland-gold)/0.3)]"
        />
      ),
      valid: !!form.town && form.town.length > 5,
    },
    {
      id: "vision",
      label: "Vision",
      icon: MessageSquare,
      question: "Tell us about your vision for this project.",
      hint: "What's driving this project? What does success look like? The more context you share, the better our first conversation will be.",
      content: (
        <div className="space-y-3">
          <textarea
            value={form.description}
            onChange={e => update("description", e.target.value)}
            placeholder="Example: We want to add a primary suite above our garage that matches the existing roofline and uses similar materials. We're also considering a covered porch on the south side..."
            rows={5}
            className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--highland-gold)/0.3)] resize-none field-construction"
          />
          <p className="text-xs text-muted-foreground/60 font-body">Optional — but projects with clear descriptions get more productive first calls.</p>
        </div>
      ),
      valid: true,
    },
    {
      id: "contact",
      label: "Contact",
      icon: DoorOpen,
      question: "How should we reach you?",
      hint: "A project advisor will call you rapidly to discuss your project in detail — no sales scripts, just a real conversation.",
      content: (
        <div className="space-y-4">
          <div>
            <label className="text-xs font-body font-semibold text-foreground mb-1.5 block">Full Name *</label>
            <input
              value={form.name}
              onChange={e => update("name", e.target.value)}
              placeholder="Your name"
              className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--highland-gold)/0.3)] field-construction"
              required
            />
          </div>
          <div>
            <label className="text-xs font-body font-semibold text-foreground mb-1.5 block">Email Address *</label>
            <input
              type="email"
              value={form.email}
              onChange={e => update("email", e.target.value)}
              placeholder="you@email.com"
              className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--highland-gold)/0.3)] field-construction"
              required
            />
          </div>
          <div>
            <label className="text-xs font-body font-semibold text-foreground mb-1.5 block">
              Phone Number <span className="text-muted-foreground font-normal">(recommended — our advisors prefer to call)</span>
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={e => update("phone", e.target.value)}
              placeholder="(828) 555-0123"
              className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--highland-gold)/0.3)] field-construction"
            />
          </div>

          {/* Privacy note */}
          <p className="text-[11px] text-muted-foreground/50 font-body leading-relaxed">
            Your information is never shared or sold. We use it solely to discuss your project.
          </p>
        </div>
      ),
      valid: !!form.name && !!form.email,
    },
  ];

  const currentStep = steps[step];
  const isLast = step === steps.length - 1;

  const handleNext = () => {
    if (currentStep.valid && step < steps.length - 1) {
      setDirection(1);
      setStep(s => s + 1);
    }
  };
  const handlePrev = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(s => s - 1);
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    setIsSubmitting(true);

    let score = 25;
    if (form.phone) score += 15;
    if (form.projectGoals.length >= 3) score += 10;
    if (form.hasPlans === "yes-pro-plans") score += 15; // premium lead signal from plans
    else if (form.hasPlans === "yes-sketches") score += 10;
    if (form.budgetRange === "100-200k" || form.budgetRange === "200k-plus") score += 15;
    else if (form.budgetRange === "50-100k") score += 10;
    if (form.description && form.description.length > 80) score += 10;
    const primaryTowns = ["Highlands", "Cashiers", "Franklin", "Sylva", "Asheville Area"];
    if (primaryTowns.includes(form.town)) score += 5;

    try {
      const { error } = await supabase.from("consultation_requests").insert({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        town: form.town,
        project_type: form.projectType,
        service_category: "construction",
        timeline: form.timeline,
        urgency: form.timeline === "1-3-months" ? "medium" : "low",
        project_description: form.description || null,
        source: "construction-consultation",
        lead_score: score,
        budget_range: form.budgetRange,
        has_plans: form.hasPlans === "yes-pro-plans" || form.hasPlans === "yes-sketches",
        metadata: {
          goals: form.projectGoals,
          planStatus: form.hasPlans,
          flow: "construction-consultation",
        },
      });

      if (error) throw error;
      try {
        const { submitLead } = await import("@/lib/leads");
        await submitLead({
          source: "construction_consultation_form",
          lead_type: "construction",
          name: form.name,
          email: form.email,
          phone: form.phone || null,
          property_town: form.town,
          service_category: "construction",
          project_type: form.projectType,
          urgency: form.timeline === "1-3-months" ? "medium" : "low",
          has_plans: form.hasPlans === "yes-pro-plans" || form.hasPlans === "yes-sketches",
          project_description: form.description || null,
          metadata: { goals: form.projectGoals, planStatus: form.hasPlans, budgetRange: form.budgetRange },
        });
      } catch (e) { console.error(e); }
      setSubmitted(true);
    } catch (err) {
      console.error("Submit error:", err);
      toast({ title: "Something went wrong", description: "Please try again or call us at (828) 524-7773.", variant: "destructive" });
    }
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <>
        <SEOHead title="Consultation Requested | Highlander Construction" description="Your construction project consultation has been received." path="/construction/consultation" />
        <Header />
        <main className="pt-24 md:pt-32 pb-16">
          <div className="container-tight max-w-lg">
            <ConfirmationState
              show={true}
              icon={<HardHat className="w-8 h-8 text-[hsl(var(--highland-gold))]" />}
              headline="Your project consultation is confirmed."
              message={`Thank you, ${form.name}. A construction project advisor will reach out rapidly to discuss your ${form.projectType === "not-sure" ? "project" : form.projectType.replace(/-/g, " ")} in detail.`}
              secondaryMessage="We'll come prepared with relevant questions and initial thoughts based on what you've shared."
              action={
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <button onClick={() => navigate("/gallery")} className="btn-ghost-interactive text-sm px-5 py-2.5 rounded-sm border border-border">View Our Work</button>
                  <button onClick={() => navigate("/construction")} className="btn-ghost-interactive text-sm px-5 py-2.5 rounded-sm border border-border">Explore Construction</button>
                </div>
              }
            />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="Construction Consultation in Western NC"
        description="Start a conversation about your home addition, renovation, outdoor living space, or custom construction project in Western North Carolina."
        path="/construction/consultation"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Construction", url: "/construction" },
          { name: "Consultation", url: "/construction/consultation" },
        ])}
      />
      <Header />
      <main className="pt-24 md:pt-32 pb-16 blueprint-bg min-h-screen">
        <div className="container-tight max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-sm bg-[hsl(var(--highland-gold)/0.1)] flex items-center justify-center">
                <HardHat className="w-4 h-4 text-[hsl(var(--highland-gold))]" />
              </div>
              <p className="text-[10px] font-body font-bold tracking-[0.25em] uppercase text-[hsl(var(--highland-gold))]">Construction Consultation</p>
            </div>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">Start Your Project Conversation</h1>
            <p className="text-sm text-muted-foreground font-body max-w-md mx-auto leading-relaxed">
              Tell us about your vision. We'll respond with a thoughtful call from someone who understands mountain construction — not a sales pitch.
            </p>
          </div>

          {/* Form Container */}
          <div className="interaction-construction p-6 md:p-8">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                {steps.map((s, i) => (
                  <div key={s.id} className="flex items-center gap-1.5">
                    <motion.div
                      animate={{
                        scale: i === step ? 1 : 0.85,
                        backgroundColor: i <= step
                          ? "hsl(var(--highland-gold))"
                          : "hsl(var(--border))",
                      }}
                      transition={{ duration: 0.3, ease: HIGHLAND_EASE }}
                      className="w-7 h-7 rounded-sm flex items-center justify-center text-[11px] font-body font-bold"
                    >
                      {i < step ? (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
                          <CheckCircle className="w-4 h-4 text-white" />
                        </motion.div>
                      ) : (
                        <span className={i <= step ? "text-white" : "text-muted-foreground"}>{i + 1}</span>
                      )}
                    </motion.div>
                    {i < steps.length - 1 && (
                      <div className="hidden sm:block w-4 md:w-8 h-px bg-border relative overflow-hidden">
                        <motion.div
                          className="absolute inset-y-0 left-0 bg-[hsl(var(--highland-gold))]"
                          animate={{ width: i < step ? "100%" : "0%" }}
                          transition={{ duration: 0.5, ease: HIGHLAND_EASE }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-body font-semibold uppercase tracking-[0.1em] text-[hsl(var(--highland-gold))]">
                  Step {step + 1} of {steps.length}
                </p>
                <p className="text-[11px] text-muted-foreground font-body">{currentStep.label}</p>
              </div>
            </div>

            {/* Step Content */}
            <div className="relative overflow-hidden min-h-[220px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: HIGHLAND_EASE }}
                >
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground">{currentStep.question}</h3>
                      <p className="text-sm text-muted-foreground font-body mt-1.5 leading-relaxed">{currentStep.hint}</p>
                    </div>
                    {currentStep.content}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <button
                onClick={handlePrev}
                disabled={step === 0}
                className={`inline-flex items-center gap-2 text-sm font-body font-medium btn-ghost-interactive px-4 py-2.5 rounded-sm ${
                  step === 0 ? "opacity-30 cursor-not-allowed" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                onClick={isLast ? handleSubmit : handleNext}
                disabled={isSubmitting || !currentStep.valid}
                className={`cta-construction text-white font-heading font-bold text-sm px-7 py-3.5 rounded-sm inline-flex items-center gap-2 transition-all ${
                  !currentStep.valid ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>{isLast ? "Schedule Your Consultation" : "Continue"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6"
          >
            {[
              "Licensed General Contractor",
              "In-House Crews",
              "WNC Specialists",
              "Design-Build Capable",
            ].map(item => (
              <div key={item} className="flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-[hsl(var(--highland-gold)/0.4)]" />
                <span className="text-muted-foreground/50 text-[11px] font-body font-medium">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
