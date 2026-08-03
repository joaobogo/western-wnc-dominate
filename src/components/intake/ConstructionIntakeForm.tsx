import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";
import { scoreLead } from "@/lib/lead-scoring";
import { deriveConstructionRouting } from "@/lib/lead-routing";
import { uploadIntakeFiles, newSessionFolder } from "@/lib/intake-uploads";
import { Input, Textarea, Label, Helper, ChipGroup, FieldRow, StepDots, FieldError } from "./IntakeFieldKit";
import { useContactValidation } from "@/hooks/use-contact-validation";
import FileDrop from "./FileDrop";
import IntakeConfirmation from "./IntakeConfirmation";
import FormConsent from "@/components/FormConsent";

type Step = number;

const PROJECT_OPTIONS = [
  { value: "addition",   label: "Home Addition",        sub: "Bedroom, master suite, in-law" },
  { value: "outdoor",    label: "Outdoor Living",       sub: "Porch, deck, screened-in" },
  { value: "renovation", label: "Renovation",           sub: "Kitchen, bath, whole-home" },
  { value: "custom",     label: "Custom Build",         sub: "Ground-up new construction" },
  { value: "exterior",   label: "Exterior Improvement", sub: "Siding, windows, facade" },
  { value: "planning",   label: "Design",    sub: "Explore layouts & floor plans" },
];

const READINESS_OPTIONS = [
  { value: "ready",       label: "Ready to plan", sub: "Budget defined, want to start" },
  { value: "exploring",   label: "Exploring",     sub: "Gathering scope and numbers" },
  { value: "researching", label: "Researching",   sub: "Early stage" },
];
const TIMELINE_OPTIONS = [
  { value: "30days",  label: "30 days" },
  { value: "90days",  label: "60–90 days" },
  { value: "6months", label: "3–6 months" },
  { value: "exploring", label: "6 + months" },
];
const PLAN_OPTIONS = [
  { value: "yes",     label: "Yes, complete permit-ready plans", sub: "Drawings ready for estimating" },
  { value: "partial", label: "Rough sketches or inspiration only", sub: "Ideas, references, or concept sketches" },
  { value: "no",      label: "No, I need help creating a plan",    sub: "Likely starts with a Design Agreement" },
  { value: "unsure",  label: "I am not sure",                      sub: "We'll help determine the right next step" },
];
const DECISION_OPTIONS = [
  { value: "self",   label: "It's just me / spouse" },
  { value: "joint",  label: "Joint with partner" },
  { value: "board",  label: "HOA / board involved" },
];

const initial = {
  projectType: "",
  budgetReadiness: "",
  timeline: "",
  hasPlans: "",
  decisionMaker: "",
  propertyType: "primary",
  town: "",
  description: "",
  name: "",
  email: "",
  phone: "",
};

const ConstructionIntakeForm = () => {
  const [params] = useSearchParams();
  const [step, setStep] = useState<Step>(0);
  const [data, setData] = useState({
    ...initial,
    projectType: params.get("type") || "",
    town: params.get("town") || "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof typeof data>(k: K, v: (typeof data)[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const contact = useContactValidation({
    name: data.name,
    email: data.email,
    phone: data.phone,
    town: data.town,
    require: { name: true, town: true },
  });

  const stepValid = useMemo(() => {
    if (step === 0) return Boolean(data.projectType && data.budgetReadiness && data.timeline);
    if (step === 1) return Boolean(data.hasPlans && data.decisionMaker) && !contact.errors.town;
    if (step === 2) return data.description.trim().length >= 20;
    if (step === 3) return contact.valid;
    return false;
  }, [step, data, contact.valid, contact.errors.town]);

  const next = () => stepValid && setStep((s) => Math.min(3, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const submit = async () => {
    if (!contact.markAttempted()) return;
    setSubmitting(true);
    setError(null);
    try {
      const folder = newSessionFolder();
      let uploadedPaths: string[] = [];
      // Files that failed to upload must never block the lead — they travel
      // with the payload so the CRM note can name them.
      let uploadErrors: { name: string; reason: string }[] = [];
      if (files.length) {
        const u = await uploadIntakeFiles(folder, files);
        uploadedPaths = u.ok.map((f) => f.path);
        uploadErrors = u.errors;
      }

      const hasPlansBool =
        data.hasPlans === "yes" ? true : data.hasPlans === "no" ? false : null;

      const score = scoreLead({
        serviceCategory: "construction",
        projectType: data.projectType,
        timeline: data.timeline,
        budgetReadiness: data.budgetReadiness,
        decisionMakerOnSite: data.decisionMaker === "self",
        hasPlans: hasPlansBool,
        propertyType: data.propertyType,
        town: data.town,
        hasPhotos: uploadedPaths.length > 0,
        description: data.description,
      });

      const { routing, jobtread } = deriveConstructionRouting({
        source: "construction_intake",
        score,
        contact: { name: data.name, email: data.email, phone: data.phone },
        projectType: data.projectType,
        timeline: data.timeline,
        propertyType: data.propertyType,
        planningStage: hasPlansBool === true ? "full_plans" : hasPlansBool === false ? "have_ideas" : undefined,
        decisionMakers: data.decisionMaker === "self" ? "solo" : data.decisionMaker === "couple" ? "couple" : data.decisionMaker === "pro_design" ? "professional_design_lead" : undefined,
        hasPlans: hasPlansBool === true,
        hasPhotos: uploadedPaths.length > 0,
        town: data.town,
      });

      const { error: insertErr } = await supabase.from("consultation_requests").insert({
        name: contact.values.name,
        email: contact.values.email,
        phone: contact.values.phone,
        town: contact.values.town,
        project_type: data.projectType,
        service_category: "construction",
        timeline: data.timeline,
        urgency: routing.priority === "P1" ? "high" : routing.priority === "P2" ? "medium" : "low",
        property_type: data.propertyType,
        has_plans: hasPlansBool,
        project_description: data.description,
        source: "construction_intake",
        lead_score: score,
        status: routing.lane === "qualified" || routing.lane === "concierge" ? "qualified" : "new",
        metadata: ({
          routing,
          jobtread,
          budget_readiness: data.budgetReadiness,
          plan_status: data.hasPlans,
          decision_maker: data.decisionMaker,
          upload_folder: folder,
          upload_paths: uploadedPaths,
          upload_errors: uploadErrors,
          referrer: typeof document !== "undefined" ? document.referrer : null,
          utm: Object.fromEntries(params.entries()),
        } as any),
      });
      if (insertErr) throw insertErr;

      try {
        const { submitLead } = await import("@/lib/leads");
        await submitLead({
          source: "construction_intake_form",
          lead_type: "construction",
          full_name: contact.values.name,
          email: contact.values.email,
          phone: contact.values.phone,
          property_town: contact.values.town,
          property_state: "NC",
          service_category: "construction",
          project_type: data.projectType,
          timeline: data.timeline,
          urgency: routing.priority === "P1" ? "high" : routing.priority === "P2" ? "medium" : "low",
          property_type: data.propertyType,
          budget_range: data.budgetReadiness || null,
          has_plans: hasPlansBool ?? null,
          project_description: data.description,
          lead_score: score,
          attachments: uploadedPaths,
          attachment_errors: uploadErrors,
          metadata: {
            routing,
            jobtread,
            plan_status: data.hasPlans,
            decision_maker: data.decisionMaker,
            upload_folder: folder,
          },
        });
      } catch (e) { console.error(e); }

      trackEvent("form_submit", {
        label: "Construction Intake",
        elementId: "construction-intake",
        metadata: { project: data.projectType, readiness: data.budgetReadiness, score, files: uploadedPaths.length },
      });

      setSubmitted(true);
    } catch (e: any) {
      setError(e?.message || "Something went wrong. Please call (828) 524-7773 and we'll take it from there.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <IntakeConfirmation
        title="Thank you — we have what we need to start."
        body="A project advisor will personally review your scope and reach out as soon as possible to schedule the planning conversation."
        nextSteps={[
          "An advisor reviews scope, readiness, and any plans you shared.",
          "We schedule a 30-minute discovery call to align on direction and feasibility.",
          "If it's a fit, we visit the property and prepare a written scope and pricing approach.",
        ]}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <p className="text-[10.5px] font-body font-bold uppercase tracking-[0.22em] text-foreground/80 mb-1">
            Step {step + 1} of 4
          </p>
          <h2 className="text-[20px] md:text-[22px] font-heading font-bold text-foreground tracking-tight">
            {step === 0 && "Scope, readiness & timeline"}
            {step === 1 && "Plans, decision-makers & location"}
            {step === 2 && "Tell us about the project"}
            {step === 3 && "How should we reach you"}
          </h2>
        </div>
        <StepDots total={4} current={step} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          {step === 0 && (
            <>
              <div>
                <Label required>Project type</Label>
                <ChipGroup options={PROJECT_OPTIONS} value={data.projectType} onChange={(v) => set("projectType", v)} columns={2} />
              </div>
              <div>
                <Label required>Where are you in the process</Label>
                <ChipGroup options={READINESS_OPTIONS} value={data.budgetReadiness} onChange={(v) => set("budgetReadiness", v)} columns={3} />
                <Helper>We work best when both sides are honest about stage. No wrong answer.</Helper>
              </div>
              <div>
                <Label required>Ideal start window</Label>
                <ChipGroup options={TIMELINE_OPTIONS} value={data.timeline} onChange={(v) => set("timeline", v)} columns={4} />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div>
                <Label required>Do you already have plans?</Label>
                <ChipGroup options={PLAN_OPTIONS} value={data.hasPlans} onChange={(v) => set("hasPlans", v)} columns={2} />
                <Helper>If you don't have complete plans yet, that's okay — many serious projects begin with a paid Design &amp; Consultation Agreement.</Helper>
              </div>
              <div>
                <Label required>Who is the decision-maker</Label>
                <ChipGroup options={DECISION_OPTIONS} value={data.decisionMaker} onChange={(v) => set("decisionMaker", v)} columns={3} />
              </div>
              <div className="space-y-4">
                <div>
                  <Label required>Property address</Label>
                  <Input
                    placeholder="Street, city, and state"
                    value={data.town}
                    onChange={(e) => set("town", e.target.value)}
                    onBlur={() => contact.blur("town")}
                    invalid={Boolean(contact.errorFor("town"))}
                  />
                  <FieldError>{contact.errorFor("town")}</FieldError>
                  <Helper>Full address helps us account for terrain, slope, and local conditions.</Helper>
                </div>
                <div>
                  <Label>Property type</Label>
                  <ChipGroup
                    options={[
                      { value: "primary", label: "Primary" },
                      { value: "second_home", label: "Second home" },
                      { value: "rental", label: "Rental" },
                    ]}
                    value={data.propertyType}
                    onChange={(v) => set("propertyType", v)}
                    columns={3}
                  />
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <Label required>Describe the project</Label>
                <Textarea
                  rows={6}
                  placeholder="Square footage, rooms involved, finish level, lot constraints, anything you've already explored…"
                  value={data.description}
                  onChange={(e) => set("description", e.target.value)}
                />
                <Helper>Minimum a few sentences — this shapes the discovery conversation.</Helper>
              </div>
              <div>
                <Label>Plans, sketches, inspiration, site photos</Label>
                <FileDrop
                  files={files}
                  onChange={setFiles}
                  accept="image/*,application/pdf"
                  helper="Upload any plans, sketches, inspiration images, property photos, surveys, or documents that may help Highlander understand the project. Max 8 files, 8MB each."
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <FieldRow>
                <div>
                  <Label required>Full name</Label>
                  <Input
                    value={data.name}
                    onChange={(e) => set("name", e.target.value)}
                    onBlur={() => contact.blur("name")}
                    invalid={Boolean(contact.errorFor("name"))}
                    autoComplete="name"
                  />
                  <FieldError>{contact.errorFor("name")}</FieldError>
                </div>
                <div>
                  <Label required>Phone</Label>
                  <Input
                    type="tel"
                    inputMode="tel"
                    value={data.phone}
                    onChange={(e) => set("phone", contact.formatPhoneInput(e.target.value))}
                    onBlur={() => contact.blur("phone")}
                    invalid={Boolean(contact.errorFor("phone"))}
                    autoComplete="tel"
                    placeholder="(828) 555-0123"
                  />
                  <FieldError>{contact.errorFor("phone")}</FieldError>
                </div>
              </FieldRow>
              <div>
                <Label required>Email</Label>
                <Input
                  type="email"
                  value={data.email}
                  onChange={(e) => set("email", e.target.value)}
                  onBlur={() => contact.blur("email")}
                  invalid={Boolean(contact.errorFor("email"))}
                  autoComplete="email"
                  maxLength={255}
                />
                <FieldError>{contact.errorFor("email")}</FieldError>
                <Helper>Used for scope documents and scheduling. No marketing list.</Helper>
              </div>
            </>
          )}

          {error && <p className="text-[13px] font-body text-destructive">{error}</p>}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-border">
        {step > 0 ? (
          <button
            type="button"
            onClick={back}
            className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground text-[13px] font-body transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
        ) : <span />}

        {step < 3 ? (
          <button
            type="button"
            disabled={!stepValid}
            onClick={next}
            className="cta-gradient text-accent-foreground font-body font-bold text-base px-10 py-4 rounded-none inline-flex items-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-95 transition-all uppercase tracking-widest shadow-lg"
          >
            Continue <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            type="button"
            disabled={!stepValid || submitting}
            onClick={submit}
            className="cta-gradient text-accent-foreground font-body font-bold text-base px-10 py-4 rounded-none inline-flex items-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-95 transition-all uppercase tracking-widest shadow-lg"
          >
            {submitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending…</> : <>Plan Your Construction Project <ArrowRight className="w-5 h-5" /></>}
          </button>
        )}
      </div>
      {step === 3 && <FormConsent className="mt-4" />}
    </div>
  );
};

export default ConstructionIntakeForm;