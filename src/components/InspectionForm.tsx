import { PHONE_DISPLAY, PHONE_TEL } from "@/data/business";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { towns } from "@/data/towns";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, ChevronDown, CheckCircle, Shield, Clock, Phone, Award, MapPin, Loader2, User, Paperclip, X, Home, Wrench, Layers, CloudLightning, Hammer, Building2, TreePine, HelpCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { trackFormStepComplete } from "@/lib/gtm";
import { fieldAttrs } from "@/lib/field-ergonomics";
import { projectTypeFromPage } from "@/lib/form-service-context";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";
import SectionDivider from "@/components/SectionDivider";
import FormConsent from "@/components/FormConsent";
import { submitLead } from "@/lib/leads";
import InlineFieldError from "@/components/forms/InlineFieldError";
import FormErrorSummary from "@/components/forms/FormErrorSummary";
import { useContactValidation } from "@/hooks/use-contact-validation";
import { useFormAutosave } from "@/hooks/use-form-autosave";
import WhatHappensNext from "@/components/forms/WhatHappensNext";
import CTAProofPoints from "@/components/trust/CTAProofPoints";
import LeadConfirmationPanel from "@/components/forms/LeadConfirmationPanel";
import FormSavedNote from "@/components/forms/FormSavedNote";
import { ACCEPTED_UPLOAD_TYPES, isAcceptedUpload, newSessionFolder, uploadIntakeFiles } from "@/lib/intake-uploads";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

/** Step 1 tap-select cards — one tap is the early micro-commitment. */
const PROJECT_CHOICES = [
  { value: "roof-repair", label: "Roof Repair or Leak", icon: Wrench },
  { value: "roof-replacement", label: "Roof Replacement", icon: Home },
  { value: "metal-roofing", label: "Metal Roofing", icon: Layers },
  { value: "storm-damage", label: "Storm or Insurance", icon: CloudLightning },
  { value: "addition", label: "Addition or Remodel", icon: Hammer },
  { value: "outdoor-living", label: "Deck, Porch, Outdoor", icon: TreePine },
  { value: "commercial", label: "Commercial Property", icon: Building2 },
  { value: "not-sure", label: "Not Sure Yet", icon: HelpCircle },
] as const;

/** A CTA can hand us a town slug (?town=highlands-nc) so the estimate form
 *  opens pre-filled with the visitor's town. */
function townFromQuery(): string {
  if (typeof window === "undefined") return "";
  try {
    const slug = new URLSearchParams(window.location.search).get("town");
    if (!slug) return "";
    const match = towns.find((t) => t.slug === slug);
    return match ? `${match.name}, ${match.state}` : "";
  } catch {
    return "";
  }
}

interface InspectionFormProps {
  /** "page" = dedicated conversion page: tight top spacing, form first on mobile. */
  variant?: "section" | "page";
  /**
   * Town + county the form sits on (town pages). Makes the intro copy specific
   * to the page instead of the same 67 words repeating on 145 pages (P3.4).
   */
  townName?: string;
  county?: string;
}

const InspectionForm = ({ variant = "section", townName, county }: InspectionFormProps) => {
  const isPage = variant === "page";
  // Where the visitor came from, e.g. ?context=town_faq_cta
  const contextFromQuery = (): string | null => {
    if (typeof window === "undefined") return null;
    try {
      return new URLSearchParams(window.location.search).get("context");
    } catch {
      return null;
    }
  };
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  /** Two-step flow: 1 = what you need + town, 2 = how to reach you. */
  const [step, setStep] = useState<1 | 2>(1);
  /** Optional fields stay collapsed so the visible form is only what we need. */
  const [showDetails, setShowDetails] = useState(false);
  /** Service type implied by the page — no need to ask again. */
  const presetProjectType = useRef<string>(projectTypeFromPage());
  const [showProjectChoices, setShowProjectChoices] = useState(!presetProjectType.current);
  const [townError, setTownError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [issues, setIssues] = useState<string[]>([]);
  const [projectError, setProjectError] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [fileNotice, setFileNotice] = useState<string | null>(null);
  const sessionFolder = useRef<string>(newSessionFolder());
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    town: townFromQuery(),
    projectType: presetProjectType.current,
    details: "",
    // Optional — revealed behind "Add details"
    address: "",
    timeline: "",
    insuranceStatus: "",
  });

  const autosave = useFormAutosave("inspection-form", formData, {
    enabled: !submitted,
    onRestore: (saved) => {
      setFormData((d) => ({ ...d, ...saved, town: saved.town || d.town }));
      if (saved.address || saved.timeline || saved.insuranceStatus || saved.email || saved.details) setShowDetails(true);
      if (saved.projectType) setShowProjectChoices(false);
    },
  });

  const contact = useContactValidation({
    name: formData.name,
    phone: formData.phone,
    email: formData.email,
    address: formData.address,
    town: formData.town,
    require: { name: true, phone: true },
  });

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const accepted: File[] = [];
    const rejected: string[] = [];
    Array.from(incoming).forEach((f) => (isAcceptedUpload(f) ? accepted.push(f) : rejected.push(f.name)));
    setFiles((prev) => [...prev, ...accepted].slice(0, 8));
    setFileNotice(rejected.length ? `We can't read ${rejected.join(", ")} — photos, PDFs and documents work best.` : null);
  };

  const removeFile = (name: string) => setFiles((prev) => prev.filter((f) => f.name !== name));

  const goToStepTwo = () => {
    const townOk = formData.town.trim().length >= 2;
    setTownError(townOk ? null : "Let us know the town so we route you to the right crew.");
    if (!formData.projectType) {
      setProjectError("Pick what you need help with so we send the right crew.");
      return;
    }
    setProjectError(null);
    if (!townOk) return;
    trackFormStepComplete({
      form_name: "Inspection Request",
      form_id: "inspection-form-main",
      step_index: 0,
      step_name: "need_and_town",
      total_steps: 2,
    });
    setStep(2);
  };

  const handleSubmit = async () => {
    const townOk = formData.town.trim().length >= 2;
    setTownError(townOk ? null : "Let us know the town so we route you to the right crew.");
    if (!townOk) {
      setSubmitError("We need a little more before we can send this.");
      setIssues(["Add the property town so we route you to the right crew."]);
      setStep(1);
      return;
    }
    if (!contact.markAttempted()) {
      setSubmitError("We need a little more before we can send this.");
      setIssues(Object.values(contact.errors).filter(Boolean) as string[]);
      return;
    }
    setSubmitError(null);
    setIssues([]);

    trackFormStepComplete({
      form_name: "Inspection Request",
      form_id: "inspection-form-main",
      step_index: 1,
      step_name: "contact_details",
      total_steps: 2,
    });

    setIsSubmitting(true);

    let attachments: { path: string; name: string; size: number; type: string }[] = [];
    if (files.length) {
      const result = await uploadIntakeFiles(sessionFolder.current, files);
      attachments = result.ok;
      if (result.errors.length) {
        setFileNotice(`${result.errors.length} file(s) could not be attached — we'll ask for them on the call.`);
      }
    }

    const result = await submitLead({
      source: "inspection_form",
      lead_type: "inspection_request",
      full_name: contact.values.name,
      phone: contact.values.phone,
      email: contact.values.email,
      property_address: formData.address || null,
      property_town: contact.values.town || formData.town || null,
      property_state: "NC",
      project_type: formData.projectType,
      timeline: formData.timeline,
      insurance_status: formData.insuranceStatus || null,
      project_description: formData.details,
      attachments,
      service_category: formData.projectType?.startsWith("roof") || formData.projectType === "storm-damage" || formData.projectType === "metal-roofing" ? "roofing" : "construction",
      source_context: contextFromQuery(),
    }).catch((err) => {
      console.error("InspectionForm submitLead failed:", err);
      return { id: null, error: err } as const;
    });

    if (result && "error" in result && result.error) {
      // Keep every entered value — the visitor only needs to retry or call.
      setIsSubmitting(false);
      setSubmitError("We couldn't send your request just now. Your answers are still here — try again in a moment.");
      setIssues([]);
      return;
    }

    trackEvent("form_submit", {
      label: "Inspection Request",
      elementId: "inspection-form-main",
      metadata: {
        town: formData.town,
        projectType: formData.projectType,
        timeline: formData.timeline,
        detailsExpanded: showDetails,
        attachments: attachments.length,
      },
    });

    setIsSubmitting(false);
    setSubmitted(true);
    autosave.clear();
  };

  /* ─── Confirmation State ─── */
  if (submitted) {
    return (
      <section className="section-padding section-dark tartan-dark" id="request-inspection">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: HIGHLAND_EASE }}
          >
            <LeadConfirmationPanel
              heading="Your project conversation has begun."
              tone="dark"
              town={formData.town}
              category={formData.projectType === "construction" ? "construction" : "roofing"}
              summary={[
                { label: "Project", value: formData.projectType },
                { label: "Town", value: formData.town },
                { label: "Name", value: formData.name },
                { label: "We'll reach you at", value: formData.phone || formData.email },
              ]}
            />
          </motion.div>
        </div>
      </section>
    );
  }

  const inputClasses = "field-input field-on-dark px-4 py-3 md:px-6 md:py-6";
  const labelClasses = "field-label text-white mb-2 md:mb-3 tracking-[0.18em]";
  const hintClasses = "text-dark-section-foreground text-body-sm md:text-body-sm font-body mt-3 leading-relaxed font-bold";


  return (
    <section className={`section-dark relative overflow-hidden interaction-quote ${isPage ? "!pt-0" : ""}`} id="request-inspection">
      <SectionDivider variant="tartan-trim" className="absolute top-0 left-0 right-0 z-20 opacity-30" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url('/tartan.png')", backgroundSize: "400px auto", backgroundRepeat: "repeat" }} />
      <GoldLine width="100%" centered delay={0} duration={1.2} className="absolute top-0 left-0 right-0 z-10" />

      <div className={isPage ? "pt-4 md:pt-28 pb-16 md:pb-20" : "section-padding"}>
        <div className="container-tight">
          {isPage && (
            <>
              <h1 className="text-[22px] md:text-4xl font-heading font-bold text-dark-section-foreground leading-tight mb-1.5 md:mb-4">
                Request your free roof inspection in Western North Carolina.
              </h1>
              <p className="text-white font-body font-semibold text-body-sm md:text-body mb-2 md:mb-10 leading-snug">
                Two questions now, a written scope after we walk your property.
              </p>
            </>
          )}
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">

            {/* Left — editorial trust content */}
            <div className={`lg:col-span-2 ${isPage ? "order-2 lg:order-1" : ""}`}>
              <ScrollReveal variant="fade">
                <span className="text-body-xs font-body font-bold uppercase tracking-[0.18em] text-[hsl(var(--gold-ink))] mb-4 block">
                  Begin Your Project
                </span>
              </ScrollReveal>
              {!isPage && (
                <HeadingReveal delay={0.1}>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark-section-foreground mb-5 leading-[1.15]">
                    Every Great Project<br /> Starts with a<br className="hidden lg:block" /> Conversation.
                  </h2>
                </HeadingReveal>
              )}
              <ScrollReveal variant="rise-subtle" delay={0.25}>
                <p className="text-white font-body text-lg md:text-xl leading-relaxed mb-10 font-bold drop-shadow-md">
                  {townName
                    ? `Share a few details about your ${townName} property and what you're looking to accomplish. A Highlander advisor who works ${county ?? "this part of Western North Carolina"} every week will review everything and follow up personally to discuss scope, timing, and next steps.`
                    : "Share a few details about your property and what you're looking to accomplish. A Highlander advisor — someone who knows these mountains, these materials, and these building conditions — will review everything and follow up personally to discuss scope, timing, and next steps."}
                </p>
              </ScrollReveal>
              <div className="space-y-5">
                {[
                  { icon: Clock, text: "A real person replies fast — never an auto-reply" },
                  { icon: MapPin, text: "We serve every community in Western North Carolina" },
                  { icon: Award, text: "CertainTeed ShingleMaster Credentialed Contractor certified" },
                  { icon: Shield, text: "Licensed GC · Fully insured · Written scope on every estimate" },
                ].map((item, i) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.4, ease: HIGHLAND_EASE }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-none bg-[hsl(var(--highland-gold)/0.22)] border border-[hsl(var(--highland-gold)/0.55)] flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-[hsl(var(--gold-ink))]" />
                    </div>
                    <span className="text-white text-body font-bold text-lg md:text-xl drop-shadow-md">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <ScrollReveal variant="fade" delay={0.5}>
                <div className="mt-8 pt-8 border-t border-dark-section-border">
                  <p className="text-white text-base font-body font-bold mb-2">Prefer to talk directly?</p>
                  <a href={PHONE_TEL} className="inline-flex items-center gap-2 text-dark-section-foreground font-heading font-bold text-lg hover:text-[hsl(var(--gold-ink))] transition-colors">
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    {PHONE_DISPLAY}
                  </a>
                  <p className="text-white text-sm font-body font-semibold mt-1.5">We answer our own phone — always a real person.</p>
                </div>
              </ScrollReveal>
            </div>

            {/* Right — short form, optional details tucked away */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12, duration: 0.4, ease: HIGHLAND_EASE }}
              className={`lg:col-span-3 ${isPage ? "order-1 lg:order-2" : ""}`}
            >
              <div className="bg-dark-section-foreground/[0.03] border border-dark-section-border rounded-none p-4 md:p-8 lg:p-10">
                {/* Slim progress indicator */}
                <div className="mb-4 md:mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-caption md:text-body-xs font-body font-bold uppercase tracking-[0.12em] text-[hsl(var(--gold-ink))] leading-tight">
                      Step {step} of 2 — {step === 1 ? "What you need" : "How we reach you"}
                    </p>
                    <span className="hidden md:inline text-white/70 text-body-xs font-body font-semibold">About a minute</span>
                  </div>
                  <div className="h-1 w-full bg-white/10 overflow-hidden" role="progressbar" aria-valuemin={1} aria-valuemax={2} aria-valuenow={step} aria-label="Form progress">
                    <motion.div
                      className="h-full bg-[hsl(var(--highland-gold))]"
                      initial={false}
                      animate={{ width: step === 1 ? "50%" : "100%" }}
                      transition={{ duration: 0.4, ease: HIGHLAND_EASE }}
                    />
                  </div>
                </div>

                <FormSavedNote show={autosave.restored} tone="dark" className="mb-5" />

                {step === 1 && (
                <form noValidate onSubmit={(e) => { e.preventDefault(); goToStepTwo(); }} className="space-y-4 md:space-y-6">
                  <div>
                    <div className="flex items-baseline justify-between gap-4 flex-wrap">
                      <span className={labelClasses}>What Do You Need Help With?</span>
                      {!showProjectChoices && (
                        <button
                          type="button"
                          onClick={() => setShowProjectChoices(true)}
                          className="text-body-xs font-body font-bold uppercase tracking-[0.12em] text-[hsl(var(--gold-ink))] hover:opacity-85 transition-opacity mb-3"
                        >
                          Change
                        </button>
                      )}
                    </div>
                    {!showProjectChoices && (
                      <div className="flex items-center gap-3 px-4 py-4 border border-[hsl(var(--highland-gold))] bg-[hsl(var(--highland-gold)/0.16)]">
                        <CheckCircle className="w-4 h-4 flex-shrink-0 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
                        <span className="text-white font-body font-bold text-body-sm md:text-body-sm">
                          {PROJECT_CHOICES.find((c) => c.value === formData.projectType)?.label ?? "Roof Repair or Leak"}
                        </span>
                      </div>
                    )}
                    {showProjectChoices && (
                    <div className="grid grid-cols-2 gap-1.5 md:gap-3">
                      {PROJECT_CHOICES.map((choice) => {
                        const active = formData.projectType === choice.value;
                        return (
                          <button
                            key={choice.value}
                            type="button"
                            aria-pressed={active}
                            onClick={() => { setFormData({ ...formData, projectType: choice.value }); setProjectError(null); }}
                            className={`flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-4 text-left border transition-all duration-200 ${
                              active
                                ? "border-[hsl(var(--highland-gold))] bg-[hsl(var(--highland-gold)/0.16)]"
                                : "border-white/20 bg-white/[0.06] hover:bg-white/[0.1]"
                            }`}
                          >
                            <choice.icon className={`hidden md:block w-4 h-4 md:w-5 md:h-5 flex-shrink-0 ${active ? "text-[hsl(var(--gold-ink))]" : "text-white/70"}`} />
                            <span className="text-white font-body font-bold text-caption md:text-body-sm leading-tight">{choice.label}</span>
                            {active && <CheckCircle className="hidden md:block w-4 h-4 ml-auto text-[hsl(var(--gold-ink))]" aria-hidden="true" />}
                          </button>
                        );
                      })}
                    </div>
                    )}
                    <InlineFieldError className="text-[hsl(var(--gold-ink))]">{projectError ?? undefined}</InlineFieldError>
                  </div>

                  <div>
                    <label htmlFor="town" className={labelClasses}>Property Town</label>
                    <input
                      id="town" type="text" required maxLength={120}
                      {...fieldAttrs.town}
                      list="hl-town-options"
                      value={formData.town}
                      onChange={(e) => { setFormData({ ...formData, town: e.target.value }); if (townError) setTownError(null); }}
                      aria-invalid={Boolean(townError) || undefined}
                      aria-describedby={townError ? "insp-town-error" : undefined}
                      className={inputClasses}
                      placeholder="Highlands, Cashiers, Franklin…"
                    />
                    <datalist id="hl-town-options">
                      {towns.map((t) => <option key={t.slug} value={`${t.name}, ${t.state}`} />)}
                    </datalist>
                    <InlineFieldError id="insp-town-error" className="text-[hsl(var(--gold-ink))]">{townError ?? undefined}</InlineFieldError>
                  </div>

                  <div className="pt-1 md:pt-2 flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4">
                    <button
                      type="submit"
                      className="cta-gradient text-accent-foreground font-heading font-bold text-sm px-8 py-4 md:px-10 rounded-none inline-flex items-center justify-center gap-2.5 btn-primary-interactive tracking-wide"
                    >
                      <span className="relative z-10">Continue — Last Step</span>
                      <ArrowRight className="w-4 h-4 relative z-10 btn-arrow-icon" aria-hidden="true" />
                    </button>
                    <a href={PHONE_TEL} className="inline-flex items-center justify-center gap-2 text-dark-section-foreground font-heading font-bold text-sm hover:text-[hsl(var(--gold-ink))] transition-colors">
                      <Phone className="w-4 h-4" aria-hidden="true" />
                      Or call {PHONE_DISPLAY}
                    </a>
                  </div>
                  <p className="text-white/80 font-body text-body-xs">
                    {townName
                      ? `Next step is just your name and phone. A Highlander advisor calls you back about your ${townName} project personally — typically within one business day.`
                      : "Next step is just your name and phone. After you send it, a Highlander advisor calls you personally — typically within one business day."}
                  </p>
                </form>
                )}

                {step === 2 && (
                <form noValidate onSubmit={(e) => { e.preventDefault(); void handleSubmit(); }}>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className={labelClasses}>Your Name</label>
                      <input
                        id="name" type="text" required maxLength={100}
                        {...fieldAttrs.name}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onBlur={() => contact.blur("name")}
                        aria-invalid={Boolean(contact.errorFor("name")) || undefined}
                        aria-describedby={contact.errorFor("name") ? "insp-name-error" : undefined}
                        className={inputClasses}
                        placeholder="e.g. John and Mary Davidson"
                      />
                      <InlineFieldError id="insp-name-error" className="text-[hsl(var(--gold-ink))]">{contact.errorFor("name")}</InlineFieldError>
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClasses}>Phone</label>
                      <input
                        id="phone" type="tel" required maxLength={20}
                        {...fieldAttrs.phone}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: contact.formatPhoneInput(e.target.value) })}
                        onBlur={() => contact.blur("phone")}
                        aria-invalid={Boolean(contact.errorFor("phone")) || undefined}
                        aria-describedby={contact.errorFor("phone") ? "insp-phone-error" : undefined}
                        className={inputClasses}
                        placeholder="(828) 555-0123"
                      />
                      <InlineFieldError id="insp-phone-error" className="text-[hsl(var(--gold-ink))]">{contact.errorFor("phone")}</InlineFieldError>
                      <p className={hintClasses}>Name and phone are all we need to get you scheduled.</p>
                    </div>
                  </div>
                </div>

                {/* ── Progressive disclosure: everything optional lives here ── */}
                <div className="mt-6 border-t border-dark-section-border pt-5">
                  <button
                    type="button"
                    onClick={() => setShowDetails((v) => !v)}
                    aria-expanded={showDetails}
                    aria-controls="inspection-optional-details"
                    className="inline-flex items-center gap-2 text-body-xs font-body font-bold uppercase tracking-[0.12em] text-[hsl(var(--gold-ink))] hover:opacity-85 transition-opacity"
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform ${showDetails ? "rotate-180" : ""}`} aria-hidden="true" />
                    {showDetails ? "Hide extra details" : "Add details (optional)"}
                  </button>
                  <p className="text-white/70 text-body-xs font-body mt-2">
                    Email, notes, address, timing, insurance and photos help us prepare — none of it is required.
                  </p>

                  <AnimatePresence initial={false}>
                    {showDetails && (
                      <motion.div
                        id="inspection-optional-details"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: HIGHLAND_EASE }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-5 pt-5">
                          <div>
                            <label htmlFor="email" className={labelClasses}>Email</label>
                            <input
                              id="email" type="email" maxLength={255}
                              {...fieldAttrs.emailLast}
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              onBlur={() => contact.blur("email")}
                              aria-invalid={Boolean(contact.errorFor("email")) || undefined}
                        aria-describedby={contact.errorFor("email") ? "insp-email-error" : undefined}
                              className={inputClasses}
                              placeholder="you@email.com"
                            />
                            <InlineFieldError id="insp-email-error" className="text-[hsl(var(--gold-ink))]">{contact.errorFor("email")}</InlineFieldError>
                          </div>
                          <div>
                            <label htmlFor="details" className={labelClasses}>Briefly, What's Going On?</label>
                            <textarea
                              id="details" rows={3} maxLength={1000}
                              {...fieldAttrs.notes}
                              value={formData.details}
                              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                              className={inputClasses}
                              placeholder="A leak over the kitchen, an aging roof, a porch we'd like to build…"
                            />
                          </div>
                          <div>
                            <label htmlFor="address" className={labelClasses}>Property Address</label>
                            <input
                              id="address" type="text" maxLength={200}
                              autoComplete="street-address"
                              value={formData.address}
                              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                              onBlur={() => contact.blur("address")}
                              className={inputClasses}
                              placeholder="e.g. 120 Chestnut St, Highlands, NC"
                            />
                            <InlineFieldError id="insp-address-error" className="text-[hsl(var(--gold-ink))]">{contact.errorFor("address")}</InlineFieldError>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                              <label htmlFor="timeline" className={labelClasses}>Timing</label>
                              <select
                                id="timeline" value={formData.timeline}
                                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                className={inputClasses}
                              >
                                <option value="">Select timeline</option>
                                <option value="urgent">As soon as possible</option>
                                <option value="1-month">Within the next month</option>
                                <option value="1-3-months">1–3 months</option>
                                <option value="3-6-months">3–6 months</option>
                                <option value="planning">Just planning ahead</option>
                              </select>
                            </div>
                            <div>
                              <label htmlFor="insuranceStatus" className={labelClasses}>Insurance Claim</label>
                              <select
                                id="insuranceStatus" value={formData.insuranceStatus}
                                onChange={(e) => setFormData({ ...formData, insuranceStatus: e.target.value })}
                                className={inputClasses}
                              >
                                <option value="">Select if it applies</option>
                                <option value="claim_filed">Claim already filed</option>
                                <option value="considering_claim">Considering a claim</option>
                                <option value="approved">Claim approved</option>
                                <option value="no_claim">Not an insurance job</option>
                                <option value="unsure">Not sure yet</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label htmlFor="attachments" className={labelClasses}>Photos or Documents</label>
                            <input
                              id="attachments" type="file" multiple
                              accept={ACCEPTED_UPLOAD_TYPES}
                              onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }}
                              className="block w-full text-body-sm text-white font-body file:mr-4 file:py-3 file:px-5 file:border file:border-white/25 file:bg-white/[0.08] file:text-white file:font-body file:font-bold file:uppercase file:tracking-wide file:cursor-pointer"
                            />
                            {files.length > 0 && (
                              <ul className="mt-3 space-y-2">
                                {files.map((f) => (
                                  <li key={f.name} className="flex items-center justify-between gap-3 text-body-xs text-white font-body bg-white/[0.06] px-3 py-2">
                                    <span className="inline-flex items-center gap-2 truncate">
                                      <Paperclip className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                                      <span className="truncate">{f.name}</span>
                                    </span>
                                    <button type="button" onClick={() => removeFile(f.name)} aria-label={`Remove ${f.name}`} className="text-white/70 hover:text-white">
                                      <X className="w-4 h-4" aria-hidden="true" />
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            )}
                            {fileNotice && <p className="text-[hsl(var(--gold-ink))] text-body-xs font-body mt-2">{fileNotice}</p>}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Submit */}
                <FormErrorSummary tone="dark" message={submitError} issues={issues} />
                <WhatHappensNext tone="dark" className="mt-6" />
                <CTAProofPoints tone="dark" align="start" className="mt-4" />
                <div className="mt-8 pt-6 border-t border-dark-section-border flex flex-col sm:flex-row sm:items-center gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cta-gradient text-accent-foreground font-heading font-bold text-sm px-8 py-4 md:px-10 rounded-none inline-flex items-center justify-center gap-2.5 btn-primary-interactive tracking-wide disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin relative z-10" aria-hidden="true" />
                        <span className="relative z-10">Sending...</span>
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">Get My Inspection Scheduled</span>
                        <ArrowRight className="w-4 h-4 relative z-10 btn-arrow-icon" aria-hidden="true" />
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center justify-center gap-2 text-white/80 font-body font-bold text-sm hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                    Back
                  </button>
                  <a href={PHONE_TEL} className="inline-flex items-center justify-center gap-2 text-dark-section-foreground font-heading font-bold text-sm hover:text-[hsl(var(--gold-ink))] transition-colors">
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    Or call {PHONE_DISPLAY}
                  </a>
                </div>
                <FormConsent className="mt-4 text-dark-section-foreground" />
                </form>
                )}

                {/* Bottom microcopy */}
                <p className="text-center text-white text-body-xs font-body font-semibold mt-5 tracking-wide">
                  No obligation · No sales pressure · Your information stays private
                </p>
              </div>
              {isPage && (
                <p className="text-center mt-4">
                  <Link
                    to="/consultation"
                    className="text-white/70 hover:text-[hsl(var(--gold-ink))] font-body text-body-xs underline underline-offset-2 transition-colors"
                  >
                    Planning a build or remodel instead? Start here
                  </Link>
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InspectionForm;