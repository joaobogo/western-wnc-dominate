import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_PLAIN, PHONE_TEL } from "@/data/business";
import FormConsent from "@/components/FormConsent";
import { useLeadSubmit } from "@/hooks/use-lead-submit";
import InlineFieldError from "@/components/forms/InlineFieldError";
import FormErrorSummary from "@/components/forms/FormErrorSummary";
import { useContactValidation } from "@/hooks/use-contact-validation";
import { fieldAttrs } from "@/lib/field-ergonomics";
import FormSavedNote from "@/components/forms/FormSavedNote";
import { useFormAutosave } from "@/hooks/use-form-autosave";
import LeadConfirmationPanel from "@/components/forms/LeadConfirmationPanel";
import CTAProofPoints from "@/components/trust/CTAProofPoints";
import { trackFormError, trackFormStart, trackPhoneClick } from "@/lib/gtm";

interface FastLeadFormProps {
  ctaLabel: string;
  serviceLabel: string;
  /** Kept for caller compatibility. Qualification happens after first contact. */
  urgencyOptions?: string[];
}

const FastLeadForm = ({ ctaLabel, serviceLabel }: FastLeadFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [issues, setIssues] = useState<string[]>([]);
  const { submitting, submit } = useLeadSubmit();
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
  });

  const serviceCategory =
    serviceLabel.toLowerCase().includes("construction") ? "construction" : "roofing";
  const formId = `fast-lead-${serviceCategory}`;

  const autosave = useFormAutosave(`fast-lead-${serviceLabel}`, formData, {
    enabled: !submitted,
    onRestore: (saved) => setFormData((d) => ({ ...d, ...(saved as typeof d) })),
  });

  const contact = useContactValidation({
    name: formData.firstName,
    email: formData.email,
    phone: formData.phone,
    require: { name: true, email: false, phone: true },
  });

  const markStart = () =>
    trackFormStart({
      form_name: "fast_lead_form",
      form_id: formId,
      service_category: serviceCategory,
    });

  const fieldClass = (invalid?: boolean) =>
    `min-h-12 w-full border bg-background px-4 py-3 text-base font-body text-foreground outline-none transition-colors placeholder:text-muted-foreground ${
      invalid ? "border-destructive focus:border-destructive" : "border-input focus:border-primary"
    }`;

  if (submitted) {
    return (
      <div className="border border-border bg-card px-6 py-7 shadow-flat rounded-sm">
        <LeadConfirmationPanel
          heading="Request received."
          category={serviceCategory}
          summary={[
            { label: "Service", value: serviceLabel },
            { label: "First name", value: formData.firstName },
            { label: "We'll reach you at", value: formData.phone || formData.email },
          ]}
        />
      </div>
    );
  }

  return (
    <div className="border border-border bg-card px-6 py-7 shadow-flat rounded-sm">
      <div className="mb-5">
        <div className="text-caption font-body font-semibold uppercase tracking-[0.18em] text-primary mb-2">
          Request a Free Estimate
        </div>
        <h2 className="font-heading text-2xl font-bold text-foreground">
          Get help with {serviceLabel.toLowerCase()}.
        </h2>
        <p className="mt-2 text-sm text-muted-foreground font-body leading-relaxed">
          Three quick fields. We will discuss the property and project details with you after the request is stored.
        </p>
      </div>

      <form
        noValidate
        className="space-y-4"
        data-hide-sticky
        data-gtm-form-name="fast_lead_form"
        data-gtm-form-id={formId}
        data-gtm-service-category={serviceCategory}
        onSubmit={async (event) => {
          event.preventDefault();
          if (submitting) return;
          markStart();
          if (!contact.markAttempted()) {
            setSubmitError("Please check the highlighted fields.");
            setIssues(Object.values(contact.errors).filter(Boolean) as string[]);
            trackFormError({
              form_name: "fast_lead_form",
              form_id: formId,
              error_type: "validation",
            });
            return;
          }
          setSubmitError(null);
          setIssues([]);
          const result = await submit({
            source: "fast_lead_form",
            lead_type: serviceCategory,
            first_name: contact.values.name,
            full_name: contact.values.name,
            email: contact.values.email,
            phone: contact.values.phone,
            project_type: serviceLabel,
            service_category: serviceCategory,
            consent_given: true,
            consent_text:
              "By submitting, you ask Highlander Building Services, Inc. to contact you about this project by phone or email.",
            metadata: {
              service_intent: serviceCategory,
              form_location: "fast_lead_form",
              consent_notice_version: "shared-fast-lead-2026-10-06",
            },
          });
          if (!result) return;
          if (result.error || (!result.id && !result.duplicate)) {
            setSubmitError(
              `We could not confirm your request. Please try again or call ${PHONE_DISPLAY}.`,
            );
            trackFormError({
              form_name: "fast_lead_form",
              form_id: formId,
              error_type: "delivery",
            });
            return;
          }
          setSubmitted(true);
          autosave.clear();
        }}
      >
        <FormErrorSummary message={submitError} issues={issues} className="mt-0" />

        <p className="text-sm font-body text-muted-foreground">
          Prefer to talk?{" "}
          <a
            href={PHONE_TEL}
            onClick={() =>
              trackPhoneClick({
                phone_number: PHONE_PLAIN,
                link_url: PHONE_TEL,
                click_location: "fast_lead_form",
                page_type: serviceCategory,
              })
            }
            className="inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-foreground underline underline-offset-2 hover:text-[hsl(var(--gold-ink))] transition-colors"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {PHONE_DISPLAY}
          </a>
        </p>

        <div>
          <label htmlFor={`${formId}-first-name`} className="field-label">
            First name
          </label>
          <input
            id={`${formId}-first-name`}
            name="first_name"
            type="text"
            autoComplete="given-name"
            required
            value={formData.firstName}
            onFocus={markStart}
            onChange={(event) => setFormData({ ...formData, firstName: event.target.value })}
            onBlur={() => contact.blur("name")}
            aria-invalid={Boolean(contact.errorFor("name")) || undefined}
            aria-describedby={contact.errorFor("name") ? `${formId}-first-name-error` : undefined}
            className={fieldClass(Boolean(contact.errorFor("name")))}
            placeholder="First name"
          />
          <InlineFieldError id={`${formId}-first-name-error`}>
            {contact.errorFor("name")}
          </InlineFieldError>
        </div>

        <div>
          <label htmlFor={`${formId}-email`} className="field-label">
            Email <span className="font-normal normal-case tracking-normal text-muted-foreground">(optional)</span>
          </label>
          <input
            id={`${formId}-email`}
            {...fieldAttrs.email}
            value={formData.email}
            onFocus={markStart}
            onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            onBlur={() => contact.blur("email")}
            aria-invalid={Boolean(contact.errorFor("email")) || undefined}
            aria-describedby={contact.errorFor("email") ? `${formId}-email-error` : undefined}
            className={fieldClass(Boolean(contact.errorFor("email")))}
            placeholder="you@email.com"
          />
          <InlineFieldError id={`${formId}-email-error`}>
            {contact.errorFor("email")}
          </InlineFieldError>
        </div>

        <div>
          <label htmlFor={`${formId}-phone`} className="field-label">
            Phone number
          </label>
          <input
            id={`${formId}-phone`}
            {...fieldAttrs.phone}
            required
            value={formData.phone}
            onFocus={markStart}
            onChange={(event) =>
              setFormData({
                ...formData,
                phone: contact.formatPhoneInput(event.target.value),
              })
            }
            onBlur={() => contact.blur("phone")}
            aria-invalid={Boolean(contact.errorFor("phone")) || undefined}
            aria-describedby={contact.errorFor("phone") ? `${formId}-phone-error` : undefined}
            className={fieldClass(Boolean(contact.errorFor("phone")))}
            placeholder="(828) 555-0123"
          />
          <InlineFieldError id={`${formId}-phone-error`}>
            {contact.errorFor("phone")}
          </InlineFieldError>
        </div>

        <FormSavedNote show={autosave.restored} />

        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={submitting}
          data-loading={submitting ? "true" : undefined}
          aria-busy={submitting || undefined}
          className="btn btn-primary btn-md btn-block"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending your request...
            </>
          ) : (
            <>
              {ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </motion.button>

        <FormConsent />
      </form>

      <div className="mt-5 border-t border-border pt-4">
        <CTAProofPoints align="start" />
      </div>
    </div>
  );
};

export default FastLeadForm;
