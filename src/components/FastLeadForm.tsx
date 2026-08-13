import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import FormConsent from "@/components/FormConsent";
import { useLeadSubmit } from "@/hooks/use-lead-submit";
import InlineFieldError from "@/components/forms/InlineFieldError";
import FormErrorSummary from "@/components/forms/FormErrorSummary";
import { useContactValidation } from "@/hooks/use-contact-validation";
import { fieldAttrs } from "@/lib/field-ergonomics";
import WhatHappensNext from "@/components/forms/WhatHappensNext";
import FormSavedNote from "@/components/forms/FormSavedNote";
import { useFormAutosave } from "@/hooks/use-form-autosave";
import LeadConfirmationPanel from "@/components/forms/LeadConfirmationPanel";
import CTAProofPoints from "@/components/trust/CTAProofPoints";

interface FastLeadFormProps {
  ctaLabel: string;
  serviceLabel: string;
  urgencyOptions: string[];
}

const FastLeadForm = ({ ctaLabel, serviceLabel, urgencyOptions }: FastLeadFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [issues, setIssues] = useState<string[]>([]);
  const { submitting, submit } = useLeadSubmit();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    town: "",
    urgency: urgencyOptions[0] ?? "As soon as possible",
  });

  const autosave = useFormAutosave(`fast-lead-${serviceLabel}`, formData, {
    enabled: !submitted,
    onRestore: (saved) => setFormData((d) => ({ ...d, ...(saved as typeof d) })),
  });

  const contact = useContactValidation({
    name: formData.name,
    phone: formData.phone,
    town: formData.town,
    // No email field on this form, so a valid phone is the only way to reach us.
    require: { name: true, phone: true, town: true },
  });

  const fieldClass = (invalid?: boolean) =>
    `w-full border bg-background px-4 py-3 text-sm font-body text-foreground outline-none transition-colors placeholder:text-muted-foreground ${
      invalid ? "border-destructive focus:border-destructive" : "border-input focus:border-primary"
    }`;

  if (submitted) {
    return (
      <div className="border border-border bg-card px-6 py-7 shadow-flat rounded-sm">
        <LeadConfirmationPanel
          heading="Request received."
          town={formData.town}
          summary={[
            { label: "Service", value: serviceLabel },
            { label: "Town", value: formData.town },
            { label: "We'll reach you at", value: formData.phone },
            { label: "Timing", value: formData.urgency },
          ]}
        />
      </div>
    );
  }

  return (
    <div className="border border-border bg-card px-6 py-7 shadow-flat rounded-sm">
      <div className="mb-5">
        <div className="text-caption font-body font-semibold uppercase tracking-[0.18em] text-primary mb-2">
          Request an Estimate
        </div>
        <h2 className="font-heading text-2xl font-bold text-foreground">Get help with {serviceLabel.toLowerCase()}.</h2>
        <p className="mt-2 text-sm text-muted-foreground font-body leading-relaxed">
          Four quick fields. A real local advisor follows up fast.
        </p>
      </div>

      <form
        className="space-y-4"
        onSubmit={async (event) => {
          event.preventDefault();
          if (submitting) return;
          if (!contact.markAttempted()) {
            setSubmitError("We need a little more before we can send this.");
            setIssues(Object.values(contact.errors).filter(Boolean) as string[]);
            return;
          }
          setSubmitError(null);
          setIssues([]);
          const result = await submit({
            source: "fast_lead_form",
            lead_type: serviceLabel,
            full_name: contact.values.name,
            phone: contact.values.phone,
            property_town: contact.values.town,
            property_state: "NC",
            timeline: formData.urgency,
            service_category: serviceLabel,
          });
          if (!result) return; // a submit was already in flight
          if (result.error) {
            setSubmitError("We couldn't send that just now. Everything you typed is still here — try again in a moment.");
            return;
          }
          setSubmitted(true);
          autosave.clear();
        }}
      >
        <FormErrorSummary message={submitError} issues={issues} className="mt-0" />
        <div>
          <label htmlFor={`${serviceLabel}-name`} className="field-label">
            Name
          </label>
          <input
            id={`${serviceLabel}-name`}
            {...fieldAttrs.name}
            required
            value={formData.name}
            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
            onBlur={() => contact.blur("name")}
            aria-invalid={Boolean(contact.errorFor("name")) || undefined}
            className={fieldClass(Boolean(contact.errorFor("name")))}
            placeholder="e.g. John and Mary Davidson"
          />
          <InlineFieldError>{contact.errorFor("name")}</InlineFieldError>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${serviceLabel}-phone`} className="field-label">
              Phone
            </label>
            <input
              id={`${serviceLabel}-phone`}
              {...fieldAttrs.phone}
              required
              value={formData.phone}
              onChange={(event) => setFormData({ ...formData, phone: contact.formatPhoneInput(event.target.value) })}
              onBlur={() => contact.blur("phone")}
              aria-invalid={Boolean(contact.errorFor("phone")) || undefined}
              className={fieldClass(Boolean(contact.errorFor("phone")))}
              placeholder="(828) 555-0123"
            />
            <InlineFieldError>{contact.errorFor("phone")}</InlineFieldError>
          </div>
          <div>
            <label htmlFor={`${serviceLabel}-town`} className="field-label">
              Town
            </label>
            <input
              id={`${serviceLabel}-town`}
              {...fieldAttrs.town}
              required
              value={formData.town}
              onChange={(event) => setFormData({ ...formData, town: event.target.value })}
              onBlur={() => contact.blur("town")}
              aria-invalid={Boolean(contact.errorFor("town")) || undefined}
              className={fieldClass(Boolean(contact.errorFor("town")))}
              placeholder="Franklin, Highlands, Sylva…"
            />
            <InlineFieldError>{contact.errorFor("town")}</InlineFieldError>
          </div>
        </div>

        <div>
          <span className="field-label">
            Timing
          </span>
          <div className="grid gap-2 sm:grid-cols-2">
            {urgencyOptions.map((option) => {
              const selected = formData.urgency === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFormData({ ...formData, urgency: option })}
                  aria-pressed={selected}
                  className="tap-card"
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <FormSavedNote show={autosave.restored} />
        <WhatHappensNext />
        <FormConsent />
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
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true">
              Sending…
            </>
          ) : (
            <>
              {ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true">
            </>
          )}
        </motion.button>
      </form>

      <div className="mt-5 border-t border-border pt-4">
        <CTAProofPoints align="start" />
      </div>
    </div>
  );
};

export default FastLeadForm;