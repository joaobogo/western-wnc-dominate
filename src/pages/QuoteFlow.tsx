import { useState, useCallback } from "react";
import InlineFieldError from "@/components/forms/InlineFieldError";
import { useContactValidation } from "@/hooks/use-contact-validation";
import { useFormAutosave } from "@/hooks/use-form-autosave";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MultiStepForm, ConfirmationState } from "@/components/conversion";
import LeadConfirmationPanel from "@/components/forms/LeadConfirmationPanel";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { actionableError, errorTitle } from "@/lib/microcopy";
import { scoreLead } from "@/lib/lead-scoring";
import { fieldAttrs } from "@/lib/field-ergonomics";
import {
  Home, Building2, Hammer, CloudLightning, PlusCircle,
  Paintbrush, TreePine, Wrench, MapPin, Clock, User, FileText
} from "lucide-react";

/* ─── Types ─── */
interface FormData {
  serviceCategory: string;
  projectType: string;
  town: string;
  timeline: string;
  description: string;
  name: string;
  email: string;
  phone: string;
  propertyType: string;
}

const INITIAL: FormData = {
  serviceCategory: "", projectType: "", town: "", timeline: "",
  description: "", name: "", email: "", phone: "", propertyType: "",
};

/* ─── Options ─── */
const SERVICE_CATEGORIES = [
  { id: "roofing", label: "Roofing", icon: Home, desc: "Repair, replacement, storm damage, or specialty roofing" },
  { id: "construction", label: "Construction", icon: Hammer, desc: "Additions, renovations, exterior, or outdoor living" },
  { id: "both", label: "Both", icon: Building2, desc: "A project that involves roofing and construction" },
  { id: "planning", label: "Design", icon: Paintbrush, desc: "Layouts, floor plans, and project planning support" },
  { id: "not-sure", label: "Not Sure Yet", icon: Wrench, desc: "We'll help you figure out the right approach" },
];

const ROOFING_TYPES = [
  { id: "replacement", label: "Roof Replacement" },
  { id: "repair", label: "Roof Repair" },
  { id: "storm-damage", label: "Storm Damage" },
  { id: "commercial", label: "Commercial Roofing" },
  { id: "specialty", label: "Metal / Cedar / Slate" },
  { id: "inspection", label: "Roof Inspection" },
];

const CONSTRUCTION_TYPES = [
  { id: "addition", label: "Home Addition" },
  { id: "renovation", label: "Interior Renovation" },
  { id: "exterior", label: "Exterior Improvements" },
  { id: "outdoor-living", label: "Outdoor Living" },
  { id: "custom", label: "Custom Project" },
];

const PLANNING_TYPES = [
  { id: "layouts", label: "Layouts & Floor Plans" },
  { id: "scope", label: "Scope Development" },
  { id: "design-guidance", label: "Design Guidance" },
  { id: "preconstruction", label: "Preconstruction Review" },
  { id: "site-planning", label: "Site & Project Planning" },
];

const TOWNS = [
  "Highlands", "Cashiers", "Franklin", "Sylva",
  "Bryson City", "Waynesville", "Cullowhee", "Other WNC Area",
];

const TIMELINES = [
  { id: "emergency", label: "Emergency — ASAP", urgency: "high" },
  { id: "1-month", label: "Within 1 month", urgency: "medium" },
  { id: "1-3-months", label: "1–3 months", urgency: "medium" },
  { id: "3-6-months", label: "3–6 months", urgency: "low" },
  { id: "planning", label: "Just planning ahead", urgency: "low" },
];

/* ─── Card Selector ─── */
const CardSelect = ({ options, value, onChange, columns = 2 }: {
  options: Array<{ id: string; label: string; icon?: any; desc?: string }>;
  value: string;
  onChange: (id: string) => void;
  columns?: number;
}) => (
  <div className={`grid gap-3 ${columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 sm:grid-cols-3"}`}>
    {options.map(opt => {
      const Icon = opt.icon;
      const selected = value === opt.id;
      return (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(opt.id)}
          className={`text-left p-4 rounded-sm border transition-all ${
            selected
              ? "border-accent bg-accent/8 shadow-flat"
              : "border-border bg-card hover:border-accent/30 hover:bg-secondary/50"
          }`}
        >
          <div className="flex items-start gap-3">
            {Icon && <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${selected ? "text-[hsl(var(--gold-ink))]" : "text-muted-foreground"}`} aria-hidden="true" />}
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
        className={`text-sm font-body font-medium px-4 py-2 rounded-sm border transition-all ${
          value === opt.id
            ? "border-accent bg-accent/10 text-foreground"
            : "border-border bg-card text-muted-foreground hover:border-accent/30"
        }`}
      >
        {opt.label}
      </button>
    ))}
  </div>
);

/* ─── Main Component ─── */
export default function QuoteFlow() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const contact = useContactValidation({
    name: form.name,
    email: form.email,
    phone: form.phone,
    town: form.town,
    require: { name: true, email: true },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const autosave = useFormAutosave("quote-flow", form as unknown as Record<string, unknown>, {
    step,
    enabled: !submitted,
    onRestore: (saved, savedStep) => {
      setForm((f) => ({ ...f, ...(saved as Partial<FormData>) }));
      if (typeof savedStep === "number") setStep(savedStep);
    },
  });

  const navigate = useNavigate();

  const update = useCallback((field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const projectTypes = form.serviceCategory === "construction" ? CONSTRUCTION_TYPES :
    form.serviceCategory === "planning" ? PLANNING_TYPES :
    form.serviceCategory === "both" ? [...ROOFING_TYPES, ...CONSTRUCTION_TYPES, ...PLANNING_TYPES] : ROOFING_TYPES;

  const steps = [
    {
      id: "category",
      label: "Service",
      content: (
        <div className="space-y-4">
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground">What kind of project are you considering?</h3>
            <p className="text-sm text-muted-foreground font-body mt-1">This helps us assign the right advisor to your consultation.</p>
          </div>
          <CardSelect options={SERVICE_CATEGORIES} value={form.serviceCategory} onChange={v => update("serviceCategory", v)} />
        </div>
      ),
    },
    {
      id: "type",
      label: "Project",
      content: (
        <div className="space-y-4">
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground">What type of project?</h3>
            <p className="text-sm text-muted-foreground font-body mt-1">Select the option closest to what you need. We'll refine the details on a call.</p>
          </div>
          <PillSelect options={projectTypes} value={form.projectType} onChange={v => update("projectType", v)} />
        </div>
      ),
    },
    {
      id: "location",
      label: "Location",
      content: (
        <div className="space-y-4">
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground">Where is your property?</h3>
            <p className="text-sm text-muted-foreground font-body mt-1">We serve all of Western North Carolina. Knowing your location helps us plan for local conditions.</p>
          </div>
          <PillSelect options={TOWNS.map(t => ({ id: t, label: t }))} value={form.town} onChange={v => update("town", v)} />
        </div>
      ),
    },
    {
      id: "timeline",
      label: "Timeline",
      content: (
        <div className="space-y-4">
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground">When are you hoping to start?</h3>
            <p className="text-sm text-muted-foreground font-body mt-1">No commitment — this helps us prioritize and plan our schedule.</p>
          </div>
          <PillSelect options={TIMELINES} value={form.timeline} onChange={v => update("timeline", v)} />
        </div>
      ),
    },
    {
      id: "description",
      label: "Details",
      content: (
        <div className="space-y-4">
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground">Tell us a bit about your project</h3>
            <p className="text-sm text-muted-foreground font-body mt-1">A few sentences is perfect. What's prompting this project? What matters most to you?</p>
          </div>
          <textarea
            aria-label="Tell us a bit about your project"
            value={form.description}
            onChange={e => update("description", e.target.value)}
            placeholder="Example: We had some shingles blow off during the last storm, and we're thinking it might be time for a full replacement rather than another repair..."
            rows={4}
            className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
          />
          <p className="text-xs text-muted-foreground font-body">Optional — but the more context you share, the more prepared we'll be for your call.</p>
        </div>
      ),
    },
    {
      id: "contact",
      label: "Contact",
      content: (
        <div className="space-y-4">
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground">How should we reach you?</h3>
            <p className="text-sm text-muted-foreground font-body mt-1">We'll call you directly — typically rapidly — to discuss your project.</p>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-body font-medium text-foreground mb-1 block" htmlFor="f-full-name">Full Name *</label>
              <input id="f-full-name"
                {...fieldAttrs.name}
                value={form.name}
                onChange={e => update("name", e.target.value)}
                onBlur={() => contact.blur("name")}
                aria-invalid={Boolean(contact.errorFor("name")) || undefined}
                placeholder="e.g. John and Mary Davidson"
                className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
              />
              <InlineFieldError>{contact.errorFor("name")}</InlineFieldError>
            </div>
            <div>
              <label className="text-xs font-body font-medium text-foreground mb-1 block" htmlFor="f-email-address">Email Address *</label>
              <input id="f-email-address"
                {...fieldAttrs.email}
                value={form.email}
                onChange={e => update("email", e.target.value)}
                onBlur={() => contact.blur("email")}
                aria-invalid={Boolean(contact.errorFor("email")) || undefined}
                placeholder="you@email.com"
                className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
                maxLength={255}
              />
              <InlineFieldError>{contact.errorFor("email")}</InlineFieldError>
            </div>
            <div>
              <label className="text-xs font-body font-medium text-foreground mb-1 block" htmlFor="f-phone-number-optional-speeds-up-">Phone Number <span className="text-muted-foreground">(optional — speeds up our response)</span></label>
              <input id="f-phone-number-optional-speeds-up-"
                {...fieldAttrs.phoneLast}
                value={form.phone}
                onChange={e => update("phone", contact.formatPhoneInput(e.target.value))}
                onBlur={() => contact.blur("phone")}
                aria-invalid={Boolean(contact.errorFor("phone")) || undefined}
                placeholder="(828) 000-0000"
                className="w-full rounded-sm border border-input bg-background px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <InlineFieldError>{contact.errorFor("phone")}</InlineFieldError>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const canAdvance = () => {
    switch (step) {
      case 0: return !!form.serviceCategory;
      case 1: return !!form.projectType || form.serviceCategory === "not-sure";
      case 2: return !!form.town;
      case 3: return !!form.timeline;
      case 4: return true; // description is optional
      case 5: return contact.valid;
      default: return false;
    }
  };

  const handleNext = () => { if (canAdvance() && step < steps.length - 1) setStep(s => s + 1); };
  const handlePrev = () => { if (step > 0) setStep(s => s - 1); };

  const handleSubmit = async () => {
    if (!contact.markAttempted()) return;
    setIsSubmitting(true);

    // Shared 0–100 scoring model so every entry point is comparable.
    const score = scoreLead({
      serviceCategory: form.serviceCategory || "roofing",
      projectType: form.projectType,
      timeline: form.timeline,
      propertyType: form.propertyType,
      town: form.town,
      description: form.description,
      bonus: form.phone ? 6 : 0, // a phone number makes the lead reachable today
    });

    try {
      const consultId = (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now()}`;
      const { error } = await supabase.from("consultation_requests").insert({
        id: consultId,
        name: contact.values.name,
        email: contact.values.email,
        phone: contact.values.phone,
        town: contact.values.town,
        project_type: form.projectType || null,
        service_category: form.serviceCategory,
        timeline: form.timeline,
        urgency: TIMELINES.find(t => t.id === form.timeline)?.urgency || "low",
        project_description: form.description || null,
        source: "quote-flow",
        lead_score: score,
        property_type: form.propertyType || null,
      });

      if (error) throw error;

      // Mirror into the unified `leads` table using the canonical payload.
      try {
        const { submitLead, requireStoredLead } = await import("@/lib/leads");
        requireStoredLead(await submitLead({
          source: "quote_flow",
          lead_type: form.serviceCategory || "general_inquiry",
          full_name: contact.values.name,
          email: contact.values.email,
          phone: contact.values.phone,
          property_town: contact.values.town,
          property_state: "NC",
          property_type: form.propertyType || null,
          service_category: form.serviceCategory,
          project_type: form.projectType || null,
          timeline: form.timeline,
          urgency: TIMELINES.find(t => t.id === form.timeline)?.urgency || "low",
          project_description: form.description || null,
          lead_score: score,
          metadata: { consultation_request_id: consultId },
        }));
      } catch (e) { console.error("QuoteFlow submitLead failed:", e); throw e; }
      
      // Track successful submission
      trackEvent("form_submit", {
        label: "Quote Flow",
        elementId: "quote-flow-submission",
        metadata: {
          serviceCategory: form.serviceCategory,
          projectType: form.projectType,
          town: form.town,
          timeline: form.timeline,
        }
      });

      setSubmitted(true);
      autosave.clear();
    } catch (err) {
      console.error("Submit error:", err);
      toast({ title: errorTitle("lead"), description: actionableError(err, "lead"), variant: "destructive" });
    }
    setIsSubmitting(false);
  };

  if (submitted) {
    const isUrgent = form.timeline === "emergency" || form.timeline === "1-month";
    return (
      <>
        <SEOHead title="Consultation Requested | Highlander Building Services" description="Your project consultation request has been received." path="/consultation" noindex />
        <Header />
        <main id="main-content" className="pt-24 md:pt-32 pb-16">
          <div className="container-tight max-w-lg">
            <LeadConfirmationPanel
              heading={isUrgent ? "Your request is in — we'll prioritize it." : "Your request is in."}
              town={form.town}
              category={form.serviceCategory === "construction" || form.serviceCategory === "planning" ? "construction" : "roofing"}
              summary={[
                { label: "Name", value: form.name },
                { label: "Project", value: form.serviceCategory },
                { label: "Timeline", value: form.timeline },
                { label: "Town", value: form.town },
                { label: "We'll reach you at", value: form.phone || form.email },
              ]}
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
        title="Project Consultation in Western NC"
        description="Tell us about your roofing or construction project — we'll connect you with the right advisor. No pressure. Highlander Building Services, Western NC."
        path="/consultation"
        noindex
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Consultation", url: "/consultation" },
        ])}
      />
      <Header />
      <main id="main-content" className="pt-24 md:pt-32 pb-16">
        <div className="container-tight max-w-2xl">
          <div className="text-center mb-8">
            <p className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-[hsl(var(--gold-ink))] mb-2">Project Consultation</p>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Let's Talk About Your Project</h1>
            <p className="text-sm text-muted-foreground font-body mt-2 max-w-md mx-auto">
              No obligation. No pressure. Just a straightforward conversation with someone who knows these mountains.
            </p>
          </div>
          <MultiStepForm
            steps={steps}
            currentStep={step}
            onNext={handleNext}
            onPrev={handlePrev}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            draftRestored={autosave.restored}
            submitLabel="Request Consultation"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
