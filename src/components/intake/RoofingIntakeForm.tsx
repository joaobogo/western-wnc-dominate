import { PHONE_DISPLAY } from "@/data/business";
import { useMemo, useState } from "react";
import { trackFormStepComplete } from "@/lib/gtm";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";
import { scoreLead } from "@/lib/lead-scoring";
import { deriveRoofingRouting } from "@/lib/lead-routing";
import { uploadIntakeFiles, newSessionFolder, ACCEPTED_UPLOAD_TYPES } from "@/lib/intake-uploads";
import { Input, Textarea, Label, Helper, ChipGroup, FieldRow, StepDots, FieldError } from "./IntakeFieldKit";
import { useContactValidation } from "@/hooks/use-contact-validation";
import { useFormAutosave } from "@/hooks/use-form-autosave";
import WhatHappensNext from "@/components/forms/WhatHappensNext";
import FormSavedNote from "@/components/forms/FormSavedNote";
import FileDrop from "./FileDrop";
import IntakeConfirmation from "./IntakeConfirmation";
import FormConsent from "@/components/FormConsent";
import FormErrorSummary from "@/components/forms/FormErrorSummary";
import { actionableError } from "@/lib/microcopy";

type Step = number;

const PROJECT_OPTIONS = [
  { value: "replacement", label: "Roof Replacement", sub: "Full system, end-of-life" },
  { value: "repair",      label: "Roof Repair",      sub: "Active leak or known issue" },
  { value: "storm",       label: "Storm Damage",     sub: "Recent weather event" },
  { value: "metal",       label: "Metal Roofing",    sub: "Standing seam / metal system" },
  { value: "synthetic",   label: "Brava / Synthetic", sub: "Premium synthetic shake or slate" },
  { value: "inspection",  label: "Inspection Only",  sub: "Pre-purchase or peace-of-mind" },
];
const TIMELINE_OPTIONS = [
  { value: "emergency", label: "Emergency",       sub: "Active leak now" },
  { value: "30days",    label: "Within 30 days",  sub: "Ready to move" },
  { value: "90days",    label: "Within 90 days",  sub: "Planning ahead" },
  { value: "6months",   label: "3–6 months",      sub: "Researching" },
];
const INSURANCE_OPTIONS = [
  { value: "none",          label: "No claim", sub: "Out of pocket" },
  { value: "considering",   label: "Considering filing" },
  { value: "active_claim",  label: "Active claim", sub: "Adjuster involved" },
];
const PROPERTY_OPTIONS = [
  { value: "primary",     label: "Primary residence" },
  { value: "second_home", label: "Second home" },
  { value: "rental",      label: "Rental / investment" },
  { value: "commercial",  label: "Commercial building" },
];

const initial = {
  projectType: "",
  timeline: "",
  insuranceStatus: "",
  propertyType: "",
  town: "",
  description: "",
  name: "",
  email: "",
  phone: "",
};

const RoofingIntakeForm = () => {
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
  const [issues, setIssues] = useState<string[]>([]);

  const set = <K extends keyof typeof data>(k: K, v: (typeof data)[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  // Partial answers survive a refresh or accidental back-navigation.
  const autosave = useFormAutosave("roofing-intake", data, {
    step,
    enabled: !submitted,
    onRestore: (saved, savedStep) => {
      setData((d) => ({ ...d, ...saved }));
      if (typeof savedStep === "number") setStep(savedStep);
    },
  });

  const contact = useContactValidation({
    name: data.name,
    email: data.email,
    phone: data.phone,
    town: data.town,
    require: { name: true, town: true },
  });

  const stepValid = useMemo(() => {
    if (step === 0) return Boolean(data.projectType && data.timeline);
    if (step === 1) return Boolean(data.propertyType) && !contact.errors.town;
    if (step === 2) return true; // photos + description optional
    if (step === 3) return contact.valid;
    return false;
  }, [step, data, contact.valid, contact.errors.town]);

  const next = () => {
    if (!stepValid) return;
    trackFormStepComplete({
      form_name: "Roofing Intake",
      form_id: "roofing-intake",
      step_index: step,
      total_steps: 4,
    });
    setStep((s) => Math.min(3, (s + 1) as Step));
  };
  const back = () => setStep((s) => Math.max(0, (s - 1) as Step));

  const submit = async () => {
    if (!contact.markAttempted()) {
      setError("We need a little more before we can send this.");
      setIssues(Object.values(contact.errors).filter(Boolean) as string[]);
      return;
    }
    setIssues([]);
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

      const score = scoreLead({
        serviceCategory: "roofing",
        projectType: data.projectType,
        timeline: data.timeline,
        insuranceStatus: data.insuranceStatus,
        propertyType: data.propertyType,
        town: data.town,
        hasPhotos: uploadedPaths.length > 0,
        description: data.description,
      });

      const { routing, jobtread } = deriveRoofingRouting({
        source: "roofing_intake",
        score,
        contact: { name: data.name, email: data.email, phone: data.phone },
        projectType: data.projectType,
        timeline: data.timeline,
        propertyType: data.propertyType,
        town: data.town,
        hasPhotos: uploadedPaths.length > 0,
        insuranceStatus: data.insuranceStatus,
      });

      const { error: insertErr } = await supabase.from("consultation_requests").insert({
        name: contact.values.name,
        email: contact.values.email,
        phone: contact.values.phone,
        town: contact.values.town,
        project_type: data.projectType,
        service_category: "roofing",
        timeline: data.timeline,
        urgency: data.timeline === "emergency" ? "high" : data.timeline === "30days" ? "medium" : "low",
        insurance_status: data.insuranceStatus || null,
        property_type: data.propertyType,
        project_description: data.description || null,
        source: "roofing_intake",
        lead_score: score,
        status: routing.lane === "emergency" ? "urgent" : "new",
        metadata: ({
          routing,
          jobtread,
          upload_folder: folder,
          upload_paths: uploadedPaths,
          upload_errors: uploadErrors,
          referrer: typeof document !== "undefined" ? document.referrer : null,
          utm: Object.fromEntries(params.entries()),
        } as any),
      });
      if (insertErr) throw insertErr;

      // Mirror into unified leads table
      try {
        const { submitLead } = await import("@/lib/leads");
        await submitLead({
          source: "roofing_intake_form",
          lead_type: "roofing",
          full_name: contact.values.name,
          email: contact.values.email,
          phone: contact.values.phone,
          property_town: contact.values.town,
          property_state: "NC",
          service_category: "roofing",
          project_type: data.projectType,
          timeline: data.timeline,
          urgency: data.timeline === "emergency" ? "high" : data.timeline === "30days" ? "medium" : "low",
          insurance_status: data.insuranceStatus || null,
          roofing_issue_type: data.projectType,
          property_type: data.propertyType,
          project_description: data.description || null,
          lead_score: score,
          attachments: uploadedPaths,
          attachment_errors: uploadErrors,
          metadata: { routing, jobtread, upload_folder: folder },
        });
      } catch (e) { console.error(e); }

      trackEvent("form_submit", {
        label: "Roofing Intake",
        elementId: "roofing-intake",
        metadata: { project: data.projectType, timeline: data.timeline, score, photos: uploadedPaths.length },
      });

      setSubmitted(true);
      autosave.clear();
    } catch (e: any) {
      setError(actionableError(e, "lead"));
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <IntakeConfirmation
        title="Your request is in good hands."
        town={data.town}
        category="roofing"
        summary={[
          { label: "Project", value: PROJECT_OPTIONS.find((o) => o.value === data.projectType)?.label },
          { label: "Timeline", value: TIMELINE_OPTIONS.find((o) => o.value === data.timeline)?.label },
          { label: "Property", value: PROPERTY_OPTIONS.find((o) => o.value === data.propertyType)?.label },
          { label: "Town", value: data.town },
          { label: "We'll reach you at", value: data.phone || data.email },
        ]}
        body={data.timeline === "emergency"
          ? "An advisor will contact you within hours. If you have active interior leaking, place a bucket and avoid touching ceiling drywall."
          : "A Highlander project advisor will personally review your request and reach out as soon as possible."}
      />
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); step < 3 ? next() : void submit(); }} noValidate>
      <div className="flex items-center justify-between mb-7">
        <div>
          <p className="text-caption font-body font-bold uppercase tracking-[0.22em] text-foreground/80 mb-1">
            Step {step + 1} of 4
          </p>
          <h2 className="text-body md:text-body-lg font-heading font-bold text-foreground tracking-tight">
            {step === 0 && "Tell us about the roof"}
            {step === 1 && "Where & what type of property"}
            {step === 2 && "Photos & details (optional)"}
            {step === 3 && "How should we reach you"}
          </h2>
        </div>
        <StepDots total={4} current={step} />
      </div>

      <FormSavedNote show={autosave.restored} className="mb-5" />

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
                <Label required id="lbl-what-kind-of-roofing-project">What kind of roofing project</Label>
                <ChipGroup labelledBy="lbl-what-kind-of-roofing-project" options={PROJECT_OPTIONS} value={data.projectType} onChange={(v) => set("projectType", v)} columns={2} />
              </div>
              <div>
                <Label required id="lbl-timeline">Timeline</Label>
                <ChipGroup labelledBy="lbl-timeline" options={TIMELINE_OPTIONS} value={data.timeline} onChange={(v) => set("timeline", v)} columns={2} />
              </div>
              {data.timeline === "emergency" && (
                <p className="text-body-xs font-body text-[hsl(var(--gold-ink))] bg-[hsl(var(--highland-gold)/0.06)] border border-[hsl(var(--highland-gold)/0.25)] rounded-md px-4 py-3">
                  Emergency response: complete the form and we'll call you directly — or dial <a className="underline font-semibold" href="tel:+18285247773">{PHONE_DISPLAY}</a> now.
                </p>
              )}
            </>
          )}

          {step === 1 && (
            <>
              <div>
                <Label required id="lbl-property-type">Property type</Label>
                <ChipGroup labelledBy="lbl-property-type" options={PROPERTY_OPTIONS} value={data.propertyType} onChange={(v) => set("propertyType", v)} columns={2} />
              </div>
              <div className="space-y-4">
                <div>
                  <Label required htmlFor="fld-property-address">Property address</Label>
                  <Input id="fld-property-address"
                    placeholder="e.g. 120 Chestnut St, Highlands, NC"
                    value={data.town}
                    onChange={(e) => set("town", e.target.value)}
                    onBlur={() => contact.blur("town")}
                    invalid={Boolean(contact.errorFor("town"))}
                  />
                  <FieldError>{contact.errorFor("town")}</FieldError>
                  <Helper>Full address allows us to prepare a more accurate assessment.</Helper>
                </div>
                <div>
                  <Label id="lbl-insurance-claim-status">Insurance claim status</Label>
                  <ChipGroup labelledBy="lbl-insurance-claim-status" options={INSURANCE_OPTIONS} value={data.insuranceStatus} onChange={(v) => set("insuranceStatus", v)} columns={3} />
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <Label id="lbl-roof-photos">Roof photos</Label>
                <FileDrop
                  labelledBy="lbl-roof-photos"
                  files={files}
                  onChange={setFiles}
                  accept={ACCEPTED_UPLOAD_TYPES}
                  helper="A few photos help us prepare. Phone photos are fine. Max 8 files, 8MB each."
                />
              </div>
              <div>
                <Label htmlFor="fld-roofing-notes">Anything specific we should know?</Label>
                <Textarea id="fld-roofing-notes"
                  rows={5}
                  placeholder="Roof age, known leaks, recent storm, prior repairs, specific design concerns…"
                  value={data.description}
                  onChange={(e) => set("description", e.target.value)}
                />
                <Helper>Optional. The more we know, the better-prepared your advisor will be.</Helper>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <FieldRow>
                <div>
                  <Label required htmlFor="fld-full-name">Full name</Label>
                  <Input id="fld-full-name"
                    value={data.name}
                    onChange={(e) => set("name", e.target.value)}
                    onBlur={() => contact.blur("name")}
                    invalid={Boolean(contact.errorFor("name"))}
                    autoComplete="name"
                  />
                  <FieldError>{contact.errorFor("name")}</FieldError>
                </div>
                <div>
                  <Label required htmlFor="fld-phone">Phone</Label>
                  <Input id="fld-phone"
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
                <Label required htmlFor="fld-email">Email</Label>
                <Input id="fld-email"
                  type="email"
                  value={data.email}
                  onChange={(e) => set("email", e.target.value)}
                  onBlur={() => contact.blur("email")}
                  invalid={Boolean(contact.errorFor("email"))}
                  autoComplete="email"
                  maxLength={255}
                />
                <FieldError>{contact.errorFor("email")}</FieldError>
                <Helper>Used for proposal documents and project updates. No marketing list.</Helper>
              </div>
            </>
          )}

          <FormErrorSummary message={error} issues={issues} />
        </motion.div>
      </AnimatePresence>

      {step === 3 && <WhatHappensNext className="mt-8" />}
      <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-border">
        {step > 0 ? (
          <button
            type="button"
            onClick={back}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-body-xs font-body transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back
          </button>
        ) : <span />}

        {step < 3 ? (
          <button
            type="submit"
            disabled={!stepValid}
            className="cta-gradient text-accent-foreground font-body font-bold text-base px-10 py-4 rounded-none inline-flex items-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-95 transition-all uppercase tracking-widest shadow-raised"
          >
            Continue <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="cta-gradient text-accent-foreground font-body font-bold text-base px-10 py-4 rounded-none inline-flex items-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-95 transition-all uppercase tracking-widest shadow-raised"
          >
            {submitting ? <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Sending…</> : <>Get My Roof Assessed <ArrowRight className="w-4 h-4" aria-hidden="true" /></>}
          </button>
        )}
      </div>
      {step === 3 && <FormConsent className="mt-4" />}
    </form>
  );
};

export default RoofingIntakeForm;