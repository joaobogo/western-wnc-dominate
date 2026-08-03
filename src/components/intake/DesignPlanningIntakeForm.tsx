import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Loader2, Sparkles, Layout, ClipboardCheck, FileText } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";
import { uploadIntakeFiles, newSessionFolder } from "@/lib/intake-uploads";
import { Input, Textarea, Label, Helper, ChipGroup, FieldRow, StepDots, FieldError } from "./IntakeFieldKit";
import { useContactValidation } from "@/hooks/use-contact-validation";
import FileDrop from "./FileDrop";
import IntakeConfirmation from "./IntakeConfirmation";
import FormConsent from "@/components/FormConsent";

const PROJECT_TYPE_OPTIONS = [
  { value: "addition",   label: "Addition",        sub: "Master suite, guest wing, room extension" },
  { value: "outdoor",    label: "Outdoor Living",  sub: "Covered porch, deck, screened room" },
  { value: "renovation", label: "Major Renovation", sub: "Kitchen, bath, or interior overhaul" },
  { value: "multi-phase", label: "Multi-Phase",    sub: "Long-term property master plan" },
  { value: "other",      label: "Other Project",   sub: "Structural or unique build" },
];

const PLANNING_NEED_OPTIONS = [
  { value: "layouts",   label: "Layouts",         sub: "Need floor plan thinking" },
  { value: "scope",     label: "Scope",           sub: "Need technical build specs" },
  { value: "both",      label: "Layouts & Scope",  sub: "Starting from scratch" },
  { value: "guidance",  label: "Guidance",        sub: "Just need project advice" },
];

const STAGE_OPTIONS = [
  { value: "dreaming",  label: "Dreaming",        sub: "Just starting to think about it" },
  { value: "planning",  label: "Planning",        sub: "Have ideas, need a roadmap" },
  { value: "decided",   label: "Ready to Build",   sub: "Know what I want, need final plan" },
];

const TIMELINE_OPTIONS = [
  { value: "asap",      label: "ASAP",            sub: "Ready to start planning now" },
  { value: "3-6months", label: "3–6 Months",      sub: "Planning for later this year" },
  { value: "6months+",  label: "6+ Months",       sub: "Early stage research" },
];

const DesignPlanningIntakeForm = ({ mode = "long" }: { mode: "short" | "long" }) => {
  const [params] = useSearchParams();
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    projectType: params.get("type") || "",
    planningNeed: "",
    timeline: "",
    description: "",
    currentStage: "",
    hasExistingPlans: "no",
    budgetReadiness: "researching",
    decisionMakers: "self",
  });

  const set = <K extends keyof typeof data>(k: K, v: (typeof data)[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const contact = useContactValidation({
    name: data.name,
    email: data.email,
    phone: data.phone,
    address: data.address,
    town: data.address,
    require: { name: true, address: true },
  });

  const totalSteps = mode === "short" ? 2 : 4;

  const stepValid = useMemo(() => {
    if (step === 0) return Boolean(data.projectType && data.planningNeed);
    if (mode === "short") {
      if (step === 1) return contact.valid;
    } else {
      if (step === 1) return Boolean(data.currentStage && data.timeline);
      if (step === 2) return data.description.trim().length >= 10;
      if (step === 3) return contact.valid;
    }
    return false;
  }, [step, data, mode, contact.valid]);

  const next = () => stepValid && setStep((s) => Math.min(totalSteps - 1, s + 1));
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

      const { error: insertErr } = await supabase.from("consultation_requests").insert({
        name: contact.values.name,
        email: contact.values.email,
        phone: contact.values.phone,
        town: contact.values.town,
        project_type: data.projectType,
        service_category: "design_planning",
        timeline: data.timeline || "exploring",
        urgency: "medium",
        project_description: data.description,
        source: mode === "short" ? "design_intake_short" : "design_intake_long",
        metadata: {
          planning_need: data.planningNeed,
          current_stage: data.currentStage,
          has_existing_plans: data.hasExistingPlans,
          budget_readiness: data.budgetReadiness,
          decision_makers: data.decisionMakers,
          upload_folder: folder,
          upload_paths: uploadedPaths,
          upload_errors: uploadErrors,
          mode: mode,
        },
      });
      try {
        const { submitLead } = await import("@/lib/leads");
        await submitLead({
          source: "design_intake_form",
          lead_type: "design_services",
          full_name: contact.values.name,
          email: contact.values.email,
          phone: contact.values.phone,
          property_address: contact.values.address,
          property_state: "NC",
          service_category: "design_planning",
          project_type: data.projectType,
          timeline: data.timeline || "exploring",
          budget_range: data.budgetReadiness || null,
          has_plans: data.hasExistingPlans === "yes",
          project_description: data.description,
          attachments: uploadedPaths,
          attachment_errors: uploadErrors,
          metadata: {
            mode,
            planning_need: data.planningNeed,
            current_stage: data.currentStage,
            decision_makers: data.decisionMakers,
            upload_folder: folder,
          },
        });
      } catch (e) { console.error(e); }

      if (insertErr) throw insertErr;

      trackEvent("form_submit", {
        label: `Design Planning Intake (${mode})`,
        elementId: `design-intake-${mode}`,
        metadata: { project: data.projectType, files: uploadedPaths.length },
      });

      setSubmitted(true);
    } catch (e: any) {
      setError(e?.message || "Something went wrong. Please call (828) 524-7773.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <IntakeConfirmation
        title="Planning brief received."
        body="A design advisor will personally review your ideas and reach out within 2 business days to schedule your planning discovery call."
        nextSteps={[
          "We review your project goals and any shared files.",
          "We'll reach out to schedule a 30-minute planning session.",
          "We'll discuss layouts, structural logic, and build sequencing."
        ]}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <p className="text-[10.5px] font-body font-bold uppercase tracking-[0.22em] text-foreground/80 mb-1">
            Step {step + 1} of {totalSteps}
          </p>
          <h2 className="text-[20px] md:text-[22px] font-heading font-bold text-foreground tracking-tight">
            {step === 0 && "Project & Planning Needs"}
            {mode === "short" ? (
              step === 1 && "Contact & Location"
            ) : (
              <>
                {step === 1 && "Stage & Timeline"}
                {step === 2 && "The Vision & Details"}
                {step === 3 && "Contact & Location"}
              </>
            )}
          </h2>
        </div>
        <StepDots total={totalSteps} current={step} />
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
                <Label required>What are you building?</Label>
                <ChipGroup options={PROJECT_TYPE_OPTIONS} value={data.projectType} onChange={(v) => set("projectType", v)} columns={2} />
              </div>
              <div>
                <Label required>What help do you need most?</Label>
                <ChipGroup options={PLANNING_NEED_OPTIONS} value={data.planningNeed} onChange={(v) => set("planningNeed", v)} columns={2} />
              </div>
            </>
          )}

          {mode === "long" && step === 1 && (
            <>
              <div>
                <Label required>Where are you in your thinking?</Label>
                <ChipGroup options={STAGE_OPTIONS} value={data.currentStage} onChange={(v) => set("currentStage", v)} columns={3} />
              </div>
              <div>
                <Label required>Preferred timing</Label>
                <ChipGroup options={TIMELINE_OPTIONS} value={data.timeline} onChange={(v) => set("timeline", v)} columns={3} />
              </div>
              <FieldRow>
                <div>
                  <Label>Budget readiness</Label>
                  <ChipGroup 
                    options={[
                      { value: "researching", label: "Researching" },
                      { value: "budgeted", label: "Budget Defined" }
                    ]} 
                    value={data.budgetReadiness} 
                    onChange={(v) => set("budgetReadiness", v)} 
                  />
                </div>
                <div>
                  <Label>Existing plans?</Label>
                  <ChipGroup 
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" }
                    ]} 
                    value={data.hasExistingPlans} 
                    onChange={(v) => set("hasExistingPlans", v)} 
                  />
                </div>
              </FieldRow>
            </>
          )}

          {mode === "long" && step === 2 && (
            <>
              <div>
                <Label required>Project goals & description</Label>
                <Textarea
                  rows={5}
                  placeholder="Describe your must-haves, concerns, or rough size (e.g. 500sqft deck, 2-story guest addition)..."
                  value={data.description}
                  onChange={(e) => set("description", e.target.value)}
                />
              </div>
              <div>
                <Label>Inspiration or site photos</Label>
                <FileDrop
                  files={files}
                  onChange={setFiles}
                  accept="image/*,application/pdf"
                  helper="Upload sketches, inspiration images, or current property photos. Max 8 files."
                />
              </div>
            </>
          )}

          {((mode === "short" && step === 1) || (mode === "long" && step === 3)) && (
            <>
              {mode === "short" && (
                <div>
                  <Label>Describe the help you need</Label>
                  <Textarea
                    rows={3}
                    placeholder="Short description of your project..."
                    value={data.description}
                    onChange={(e) => set("description", e.target.value)}
                  />
                </div>
              )}
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
              </div>
              <div>
                <Label required>Property Address / Town</Label>
                <Input
                  placeholder="e.g. Highlands, Franklin, Cashiers"
                  value={data.address}
                  onChange={(e) => set("address", e.target.value)}
                  onBlur={() => contact.blur("address")}
                  invalid={Boolean(contact.errorFor("address"))}
                />
                <FieldError>{contact.errorFor("address")}</FieldError>
                <Helper>Helps us account for local terrain and codes.</Helper>
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

        {step < totalSteps - 1 ? (
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
            {submitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending…</> : <>Submit Planning Brief <ArrowRight className="w-5 h-5" /></>}
          </button>
        )}
      </div>
      {step === totalSteps - 1 && <FormConsent className="mt-4" />}
    </div>
  );
};

export default DesignPlanningIntakeForm;
