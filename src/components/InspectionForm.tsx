import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_PLAIN, PHONE_TEL } from "@/data/business";
import { towns } from "@/data/towns";
import { useLeadSubmit } from "@/hooks/use-lead-submit";
import { useContactValidation } from "@/hooks/use-contact-validation";
import { useFormAutosave } from "@/hooks/use-form-autosave";
import { projectTypeFromPage } from "@/lib/form-service-context";
import { trackFormError, trackFormStart, trackPhoneClick } from "@/lib/gtm";
import FormConsent from "@/components/FormConsent";
import InlineFieldError from "@/components/forms/InlineFieldError";
import FormErrorSummary from "@/components/forms/FormErrorSummary";
import FormSavedNote from "@/components/forms/FormSavedNote";
import LeadConfirmationPanel from "@/components/forms/LeadConfirmationPanel";
import CTAProofPoints from "@/components/trust/CTAProofPoints";

const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;
const FORM_ID = "inspection-form-main";
const CONSENT =
  "By submitting, you ask Highlander Building Services, Inc. to contact you about this project by phone or email.";

function contextFromQuery(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return new URLSearchParams(window.location.search).get("context");
  } catch {
    return null;
  }
}

function townFromQuery(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const slug = new URLSearchParams(window.location.search).get("town");
    if (!slug) return null;
    const match = towns.find((town) => town.slug === slug);
    return match ? match.name : null;
  } catch {
    return null;
  }
}

function categoryFor(projectType: string | null | undefined) {
  const value = (projectType ?? "").toLowerCase();
  if (
    value.includes("roof") ||
    value.includes("storm") ||
    value.includes("metal") ||
    value.includes("commercial")
  ) {
    return "roofing" as const;
  }
  if (
    value.includes("construction") ||
    value.includes("addition") ||
    value.includes("renov") ||
    value.includes("outdoor") ||
    value.includes("deck") ||
    value.includes("porch") ||
    value.includes("design")
  ) {
    return "construction" as const;
  }
  return "general" as const;
}

interface InspectionFormProps {
  variant?: "section" | "page";
  townName?: string;
  county?: string;
}

/**
 * Canonical first-contact estimate form.
 *
 * Only three fields are visible before durable storage: first name, optional
 * email and phone. Service/town/page context is inferred from the page and
 * attribution instead of blocking the homeowner with qualification questions.
 */
const InspectionForm = ({ variant = "section", townName, county }: InspectionFormProps) => {
  const navigate = useNavigate();
  const isPage = variant === "page";
  const presetProjectType = useRef<string>(projectTypeFromPage());
  const inferredTown = townName || townFromQuery();
  const category = categoryFor(presetProjectType.current);

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [issues, setIssues] = useState<string[]>([]);
  const { submitting, submit } = useLeadSubmit();

  const autosave = useFormAutosave("inspection-form", formData, {
    enabled: !submitted,
    onRestore: (saved) =>
      setFormData((current) => ({ ...current, ...(saved as typeof current) })),
  });

  const contact = useContactValidation({
    name: formData.firstName,
    email: formData.email,
    phone: formData.phone,
    require: { name: true, email: false, phone: true },
  });

  const markStart = () =>
    trackFormStart({
      form_name: "estimate_request",
      form_id: FORM_ID,
      service_category: category,
    });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    markStart();

    if (!contact.markAttempted()) {
      setSubmitError("Please check the highlighted fields.");
      setIssues(Object.values(contact.errors).filter(Boolean) as string[]);
      trackFormError({
        form_name: "estimate_request",
        form_id: FORM_ID,
        error_type: "validation",
      });
      return;
    }

    setSubmitError(null);
    setIssues([]);

    const result = await submit({
      source: "inspection_form",
      lead_type: category === "general" ? "general_inquiry" : category,
      first_name: contact.values.name,
      full_name: contact.values.name,
      email: contact.values.email,
      phone: contact.values.phone,
      property_town: inferredTown,
      property_state: inferredTown ? "NC" : null,
      project_type: presetProjectType.current || "general_inquiry",
      service_category: category,
      source_context: contextFromQuery(),
      landing_page: isPage ? "request_estimate" : "embedded_estimate",
      consent_given: true,
      consent_text: CONSENT,
      metadata: {
        service_intent: category,
        form_location: isPage ? "request_estimate_page" : "embedded_estimate",
        inferred_town: inferredTown,
        inferred_county: county ?? null,
        consent_notice_version: "estimate-first-contact-2026-10-06",
      },
    });

    if (!result) return;
    if (result.error || (!result.id && !result.duplicate)) {
      setSubmitError(
        `We could not confirm your request. Please try again or call ${PHONE_DISPLAY}.`,
      );
      trackFormError({
        form_name: "estimate_request",
        form_id: FORM_ID,
        error_type: "delivery",
      });
      return;
    }

    setSubmitted(true);
    autosave.clear();

    if (isPage) {
      navigate("/thank-you", { replace: true });
    }
  };

  if (submitted && !isPage) {
    return (
      <section className="section-padding section-dark tartan-dark" id="request-inspection">
        <div className="container-tight">
          <LeadConfirmationPanel
            heading="Your estimate request is in."
            tone="dark"
            town={inferredTown}
            category={category}
            summary={[
              { label: "First name", value: formData.firstName },
              { label: "We'll reach you at", value: formData.phone || formData.email },
            ]}
          />
        </div>
      </section>
    );
  }

  const inputClasses =
    "field-input field-on-dark min-h-12 px-4 py-3 text-base md:px-5 md:py-4";
  const labelClasses =
    "field-label text-white mb-2 tracking-[0.14em]";

  return (
    <section
      className={`section-dark relative overflow-hidden interaction-quote ${isPage ? "!pt-0" : ""}`}
      id="request-inspection"
    >
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "url('/tartan.png')",
          backgroundSize: "400px auto",
          backgroundRepeat: "repeat",
        }}
        aria-hidden="true"
      />

      <div className={isPage ? "pt-6 md:pt-28 pb-16 md:pb-20" : "section-padding"}>
        <div className="container-tight">
          <div className="grid items-start gap-8 lg:grid-cols-5 lg:gap-14">
            <div className={`lg:col-span-2 ${isPage ? "order-2 lg:order-1" : ""}`}>
              <span className="text-body-xs font-body font-bold uppercase tracking-[0.18em] text-[hsl(var(--gold-ink))] mb-4 block">
                Free Estimate Request
              </span>
              {isPage ? (
                <h1 className="text-3xl md:text-5xl font-heading font-bold text-dark-section-foreground leading-tight mb-5">
                  Request a free estimate in Western North Carolina.
                </h1>
              ) : (
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark-section-foreground leading-tight mb-5">
                  Start with three simple contact details.
                </h2>
              )}
              <p className="text-white font-body text-base md:text-lg leading-relaxed mb-7">
                {townName
                  ? `Tell us how to reach you about your ${townName} property. We will discuss the project details and appropriate next step after your request is stored.`
                  : "Roofing or construction, you do not need to diagnose the problem or finish a long intake first. Send your contact details and Highlander will discuss the project with you."}
              </p>

              <div className="space-y-3 text-white">
                {[
                  "First name and phone are required",
                  "Email is optional",
                  "No budget, address, timeline, or project description required",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--gold-ink))]" aria-hidden="true" />
                    <span className="text-sm font-body">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 border-t border-white/15 pt-6">
                <p className="mb-2 text-sm font-semibold text-white">Prefer to talk directly?</p>
                <a
                  href={PHONE_TEL}
                  onClick={() =>
                    trackPhoneClick({
                      phone_number: PHONE_PLAIN,
                      link_url: PHONE_TEL,
                      click_location: isPage ? "request_estimate_page" : "embedded_estimate",
                      page_type: category,
                    })
                  }
                  className="inline-flex min-h-12 items-center gap-2 font-heading text-lg font-bold text-[hsl(var(--gold-ink))] underline underline-offset-4"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: HIGHLAND_EASE }}
              className={`lg:col-span-3 ${isPage ? "order-1 lg:order-2" : ""}`}
            >
              <form
                noValidate
                onSubmit={handleSubmit}
                data-hide-sticky
                data-gtm-form-name="estimate_request"
                data-gtm-form-id={FORM_ID}
                data-gtm-service-category={category}
                className="border border-white/15 bg-white/[0.04] p-4 md:p-8"
              >
                <div className="mb-6">
                  <p className="text-caption font-body font-bold uppercase tracking-[0.16em] text-[hsl(var(--gold-ink))]">
                    Three fields · one step
                  </p>
                  <h2 className="mt-2 font-heading text-2xl font-bold text-white">
                    How should Highlander reach you?
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">
                    We will ask about the property and scope during follow-up.
                  </p>
                </div>

                <FormErrorSummary message={submitError} issues={issues} className="mb-4" tone="dark" />
                <FormSavedNote show={autosave.restored} tone="dark" className="mb-4" />

                <div className="space-y-5">
                  <div>
                    <label htmlFor="estimate-first-name" className={labelClasses}>
                      First name
                    </label>
                    <input
                      id="estimate-first-name"
                      name="first_name"
                      type="text"
                      autoComplete="given-name"
                      required
                      value={formData.firstName}
                      onFocus={markStart}
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          firstName: event.target.value,
                        }))
                      }
                      onBlur={() => contact.blur("name")}
                      aria-invalid={Boolean(contact.errorFor("name")) || undefined}
                      aria-describedby={
                        contact.errorFor("name") ? "estimate-first-name-error" : undefined
                      }
                      className={inputClasses}
                      placeholder="First name"
                      maxLength={100}
                    />
                    <InlineFieldError id="estimate-first-name-error" tone="dark">
                      {contact.errorFor("name")}
                    </InlineFieldError>
                  </div>

                  <div>
                    <label htmlFor="estimate-email" className={labelClasses}>
                      Email <span className="normal-case font-normal tracking-normal text-white/70">(optional)</span>
                    </label>
                    <input
                      id="estimate-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onFocus={markStart}
                      onChange={(event) =>
                        setFormData((current) => ({ ...current, email: event.target.value }))
                      }
                      onBlur={() => contact.blur("email")}
                      aria-invalid={Boolean(contact.errorFor("email")) || undefined}
                      aria-describedby={
                        contact.errorFor("email") ? "estimate-email-error" : undefined
                      }
                      className={inputClasses}
                      placeholder="you@email.com"
                      maxLength={255}
                    />
                    <InlineFieldError id="estimate-email-error" tone="dark">
                      {contact.errorFor("email")}
                    </InlineFieldError>
                  </div>

                  <div>
                    <label htmlFor="estimate-phone" className={labelClasses}>
                      Phone number
                    </label>
                    <input
                      id="estimate-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      required
                      value={formData.phone}
                      onFocus={markStart}
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          phone: contact.formatPhoneInput(event.target.value),
                        }))
                      }
                      onBlur={() => contact.blur("phone")}
                      aria-invalid={Boolean(contact.errorFor("phone")) || undefined}
                      aria-describedby={
                        contact.errorFor("phone") ? "estimate-phone-error" : undefined
                      }
                      className={inputClasses}
                      placeholder="(828) 555-0123"
                      maxLength={20}
                    />
                    <InlineFieldError id="estimate-phone-error" tone="dark">
                      {contact.errorFor("phone")}
                    </InlineFieldError>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  aria-busy={submitting || undefined}
                  className="btn btn-primary btn-md btn-block mt-6 min-h-12"
                >
                  {submitting ? "Sending your request..." : "Request My Free Estimate"}
                  {!submitting && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                </button>

                <FormConsent className="mt-4 text-white/75" />
              </form>

              <div className="mt-4">
                <CTAProofPoints align="start" tone="dark" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InspectionForm;
