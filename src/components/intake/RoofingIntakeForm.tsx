import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";
import { scoreLead } from "@/lib/lead-scoring";
import { deriveRoofingRouting } from "@/lib/lead-routing";
import { uploadIntakeFiles, newSessionFolder } from "@/lib/intake-uploads";
import { Input, Textarea, Label, Helper, ChipGroup, FieldRow, StepDots } from "./IntakeFieldKit";
import FileDrop from "./FileDrop";
import IntakeConfirmation from "./IntakeConfirmation";

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

  const set = <K extends keyof typeof data>(k: K, v: (typeof data)[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const stepValid = useMemo(() => {
    if (step === 0) return Boolean(data.projectType && data.timeline);
    if (step === 1) return Boolean(data.propertyType && data.town.trim().length >= 2);
    if (step === 2) return true; // photos + description optional
    if (step === 3) return Boolean(data.name.trim() && data.phone.trim() && /\S+@\S+\.\S+/.test(data.email));
    return false;
  }, [step, data]);

  const next = () => stepValid && setStep((s) => Math.min(3, (s + 1) as Step));
  const back = () => setStep((s) => Math.max(0, (s - 1) as Step));

  const submit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const folder = newSessionFolder();
      let uploadedPaths: string[] = [];
      if (files.length) {
        const u = await uploadIntakeFiles(folder, files);
        uploadedPaths = u.ok.map((f) => f.path);
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
        name: data.name,
        email: data.email,
        phone: data.phone,
        town: data.town,
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
          referrer: typeof document !== "undefined" ? document.referrer : null,
          utm: Object.fromEntries(params.entries()),
        } as any),
      });
      if (insertErr) throw insertErr;

      trackEvent("form_submit", {
        label: "Roofing Intake",
        elementId: "roofing-intake",
        metadata: { project: data.projectType, timeline: data.timeline, score, photos: uploadedPaths.length },
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
        title="Your request is in good hands."
        body={data.timeline === "emergency"
          ? "An advisor will contact you within hours. If you have active interior leaking, place a bucket and avoid touching ceiling drywall."
          : "A Highlander project advisor will personally review your request and reach out as soon as possible."}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <p className="text-[10.5px] font-body font-bold uppercase tracking-[0.22em] text-foreground/45 mb-1">
            Step {step + 1} of 4
          </p>
          <h2 className="text-[20px] md:text-[22px] font-heading font-bold text-foreground tracking-tight">
            {step === 0 && "Tell us about the roof"}
            {step === 1 && "Where & what type of property"}
            {step === 2 && "Photos & details (optional)"}
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
                <Label required>What kind of roofing project</Label>
                <ChipGroup options={PROJECT_OPTIONS} value={data.projectType} onChange={(v) => set("projectType", v)} columns={2} />
              </div>
              <div>
                <Label required>Timeline</Label>
                <ChipGroup options={TIMELINE_OPTIONS} value={data.timeline} onChange={(v) => set("timeline", v)} columns={2} />
              </div>
              {data.timeline === "emergency" && (
                <p className="text-[12.5px] font-body text-[hsl(var(--highland-gold))] bg-[hsl(var(--highland-gold)/0.06)] border border-[hsl(var(--highland-gold)/0.25)] rounded-md px-4 py-3">
                  Emergency response: complete the form and we'll call you directly — or dial <a className="underline font-semibold" href="tel:8285247773">(828) 524-7773</a> now.
                </p>
              )}
            </>
          )}

          {step === 1 && (
            <>
              <div>
                <Label required>Property type</Label>
                <ChipGroup options={PROPERTY_OPTIONS} value={data.propertyType} onChange={(v) => set("propertyType", v)} columns={2} />
              </div>
              <div className="space-y-4">
                <div>
                  <Label required>Property address</Label>
                  <Input
                    placeholder="Street, city, and state"
                    value={data.town}
                    onChange={(e) => set("town", e.target.value)}
                  />
                  <Helper>Full address allows us to prepare a more accurate assessment.</Helper>
                </div>
                <div>
                  <Label>Insurance claim status</Label>
                  <ChipGroup options={INSURANCE_OPTIONS} value={data.insuranceStatus} onChange={(v) => set("insuranceStatus", v)} columns={3} />
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <Label>Roof photos</Label>
                <FileDrop
                  files={files}
                  onChange={setFiles}
                  accept="image/*"
                  helper="A few photos help us prepare. Phone photos are fine. Max 8 files, 8MB each."
                />
              </div>
              <div>
                <Label>Anything specific we should know?</Label>
                <Textarea
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
                  <Label required>Full name</Label>
                  <Input value={data.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
                </div>
                <div>
                  <Label required>Phone</Label>
                  <Input type="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" placeholder="(828) 555-0123" />
                </div>
              </FieldRow>
              <div>
                <Label required>Email</Label>
                <Input type="email" value={data.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
                <Helper>Used for proposal documents and project updates. No marketing list.</Helper>
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
            {submitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending…</> : <>Request Roof Assessment <ArrowRight className="w-5 h-5" /></>}
          </button>
        )}
      </div>
    </div>
  );
};

export default RoofingIntakeForm;