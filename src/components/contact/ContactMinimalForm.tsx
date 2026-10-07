import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PHONE_DISPLAY, PHONE_PLAIN, PHONE_TEL } from "@/data/business";
import { useContactValidation } from "@/hooks/use-contact-validation";
import { useFormAutosave } from "@/hooks/use-form-autosave";
import { submitLead } from "@/lib/leads";
import { trackFormError, trackFormStart, trackPhoneClick } from "@/lib/gtm";
import InlineFieldError from "@/components/forms/InlineFieldError";
import FormErrorSummary from "@/components/forms/FormErrorSummary";
import FormSavedNote from "@/components/forms/FormSavedNote";
import LeadConfirmationPanel from "@/components/forms/LeadConfirmationPanel";
import FormConsent from "@/components/FormConsent";
import { fieldAttrs } from "@/lib/field-ergonomics";
import { microcopy } from "@/lib/microcopy";

const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as const;
const FORM_ID = "contact-minimal-form";
const CONSENT =
  "By submitting, you ask Highlander Building Services, Inc. to contact you about this project by phone or email.";

/**
 * Shared low-friction first-contact form.
 *
 * First contact is deliberately limited to first name, email and
 * phone. Property/service qualification happens after the durable lead exists.
 */
const ContactMinimalForm = () => {
  const [form, setForm] = useState({ firstName: "", phone: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [issues, setIssues] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const contact = useContactValidation({
    name: form.firstName,
    email: form.email,
    phone: form.phone,
    require: { name: true, email: true, phone: true },
  });

  const autosave = useFormAutosave(FORM_ID, form, {
    enabled: !submitted,
    onRestore: (saved) => {
      const d = saved as Record<string, string>;
      setForm((current) => ({
        firstName: d.firstName || current.firstName,
        phone: d.phone || current.phone,
        email: d.email || current.email,
      }));
    },
  });

  const markStart = () =>
    trackFormStart({
      form_name: "contact_form",
      form_id: FORM_ID,
      service_category: "general",
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    markStart();

    if (!contact.markAttempted()) {
      setSubmitError("Please check the highlighted fields.");
      setIssues(Object.values(contact.errors).filter(Boolean) as string[]);
      trackFormError({
        form_name: "contact_form",
        form_id: FORM_ID,
        error_type: "validation",
      });
      return;
    }

    setSubmitError(null);
    setIssues([]);
    setIsSubmitting(true);

    try {
      const result = await submitLead({
        source: "contact_form",
        lead_type: "general_inquiry",
        first_name: contact.values.name,
        full_name: contact.values.name,
        email: contact.values.email,
        phone: contact.values.phone,
        project_type: "general_inquiry",
        service_category: "general",
        preferred_contact_method: "phone",
        source_context: "contact_page_minimal",
        landing_page: "contact",
        consent_given: true,
        consent_text: CONSENT,
        metadata: {
          service_intent: "general",
          form_location: "contact_page",
          consent_notice_version: "contact-minimal-2026-10-06",
        },
      });

      if (result.error || (!result.id && !result.duplicate)) {
        trackFormError({
          form_name: "contact_form",
          form_id: FORM_ID,
          error_type: "delivery",
        });
        setSubmitError(
          `We could not confirm your request. Please try again or call ${PHONE_DISPLAY}.`,
        );
        return;
      }

      setSubmitted(true);
      autosave.clear();
    } catch (err) {
      console.error("Contact minimal form submit failed:", err);
      trackFormError({
        form_name: "contact_form",
        form_id: FORM_ID,
        error_type: "network",
      });
      setSubmitError(
        `We could not confirm your request. Please try again or call ${PHONE_DISPLAY}.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: HIGHLAND_EASE }}
        tabIndex={-1}
        role="status"
        aria-live="polite"
      >
        <LeadConfirmationPanel
          heading={`Thank you, ${form.firstName || "there"} — your request is in.`}
          category="general"
          summary={[
            { label: "First name", value: form.firstName },
            { label: "We'll reach you at", value: form.phone || form.email },
          ]}
        />
      </motion.div>
    );
  }

  const inputClasses = "field-input";
  const labelClasses = "field-label";

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="space-y-5"
      data-hide-sticky
      data-gtm-form-name="contact_form"
      data-gtm-form-id={FORM_ID}
      data-gtm-service-category="general"
    >
      <FormErrorSummary message={submitError} issues={issues} className="mt-0 mb-2" />
      <FormSavedNote show={autosave.restored} className="mb-2" />

      <div className="rounded-sm border border-border bg-secondary/40 px-4 py-3 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">Three fields. One first step.</span>{" "}
        You can explain the property and project when the team follows up.
      </div>

      <div>
        <label htmlFor="cm-first-name" className={labelClasses}>
          First name <span className="text-alert">*</span>
        </label>
        <input
          id="cm-first-name"
          required
          autoComplete="given-name"
          name="first_name"
          type="text"
          value={form.firstName}
          onFocus={markStart}
          onChange={(e) => setForm((current) => ({ ...current, firstName: e.target.value }))}
          onBlur={() => contact.blur("name")}
          aria-invalid={Boolean(contact.errorFor("name")) || undefined}
          aria-describedby={contact.errorFor("name") ? "cm-first-name-error" : undefined}
          placeholder="First name"
          className={inputClasses}
          maxLength={100}
        />
        <InlineFieldError id="cm-first-name-error">{contact.errorFor("name")}</InlineFieldError>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cm-email" className={labelClasses}>
            Email
          </label>
          <input
            id="cm-email"
            {...fieldAttrs.email}
            value={form.email}
            onFocus={markStart}
            onChange={(e) => setForm((current) => ({ ...current, email: e.target.value }))}
            onBlur={() => contact.blur("email")}
            aria-invalid={Boolean(contact.errorFor("email")) || undefined}
            aria-describedby={contact.errorFor("email") ? "cm-email-error" : undefined}
            placeholder="you@email.com"
            className={inputClasses}
            maxLength={255}
          />
          <InlineFieldError id="cm-email-error">{contact.errorFor("email")}</InlineFieldError>
        </div>

        <div>
          <label htmlFor="cm-phone" className={labelClasses}>
            Phone number <span className="text-alert">*</span>
          </label>
          <input
            id="cm-phone"
            required
            {...fieldAttrs.phone}
            value={form.phone}
            onFocus={markStart}
            onChange={(e) =>
              setForm((current) => ({
                ...current,
                phone: contact.formatPhoneInput(e.target.value),
              }))
            }
            onBlur={() => contact.blur("phone")}
            aria-invalid={Boolean(contact.errorFor("phone")) || undefined}
            aria-describedby={contact.errorFor("phone") ? "cm-phone-error" : undefined}
            placeholder="(828) 555-0123"
            className={inputClasses}
            maxLength={20}
          />
          <InlineFieldError id="cm-phone-error">{contact.errorFor("phone")}</InlineFieldError>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={PHONE_TEL}
          onClick={() =>
            trackPhoneClick({
              phone_number: PHONE_PLAIN,
              link_url: PHONE_TEL,
              click_location: "contact_form",
              page_type: "contact",
            })
          }
          className="inline-flex min-h-12 items-center gap-2 font-semibold text-primary underline underline-offset-4"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call {PHONE_DISPLAY}
        </a>
        <Button
          type="submit"
          size="lg"
          loading={isSubmitting}
          loadingText={microcopy.loading.submitting}
          disabled={isSubmitting}
        >
          Request My Estimate
          <ArrowRight aria-hidden="true" />
        </Button>
      </div>

      <FormConsent />
    </form>
  );
};

export default ContactMinimalForm;
