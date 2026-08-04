import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, Loader2, Phone, Shield } from "lucide-react";
import FormConsent from "@/components/FormConsent";
import { useLeadSubmit } from "@/hooks/use-lead-submit";
import InlineFieldError from "@/components/forms/InlineFieldError";
import { useContactValidation } from "@/hooks/use-contact-validation";

interface FastLeadFormProps {
  ctaLabel: string;
  serviceLabel: string;
  urgencyOptions: string[];
}

const FastLeadForm = ({ ctaLabel, serviceLabel, urgencyOptions }: FastLeadFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const { submitting, submit } = useLeadSubmit();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    town: "",
    urgency: urgencyOptions[0] ?? "As soon as possible",
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
      <div className="border border-border bg-card px-6 py-7 shadow-sm rounded-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground">Request received.</h3>
            <p className="text-sm text-muted-foreground font-body">A local advisor will reach out shortly.</p>
          </div>
        </div>
        <div className="space-y-3 border-t border-border pt-4 text-sm text-muted-foreground font-body">
          <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Typical response rapidly</div>
          <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> No obligation and no pressure</div>
          <a href="tel:+18285247773" className="inline-flex items-center gap-2 font-semibold text-primary hover:opacity-80 transition-opacity">
            <Phone className="h-4 w-4" /> (828) 524-7773
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-border bg-card px-6 py-7 shadow-sm rounded-sm">
      <div className="mb-5">
        <div className="text-[10px] font-body font-semibold uppercase tracking-[0.18em] text-primary mb-2">
          Request a Free Quote
        </div>
        <h3 className="font-heading text-2xl font-bold text-foreground">Get help with {serviceLabel.toLowerCase()}.</h3>
        <p className="mt-2 text-sm text-muted-foreground font-body leading-relaxed">
          Four quick fields. A real local advisor follows up fast.
        </p>
      </div>

      <form
        className="space-y-4"
        onSubmit={async (event) => {
          event.preventDefault();
          if (submitting) return;
          if (!contact.markAttempted()) return;
          await submit({
            source: "fast_lead_form",
            lead_type: serviceLabel,
            full_name: contact.values.name,
            phone: contact.values.phone,
            property_town: contact.values.town,
            property_state: "NC",
            timeline: formData.urgency,
            service_category: serviceLabel,
          });
          setSubmitted(true);
        }}
      >
        <div>
          <label htmlFor={`${serviceLabel}-name`} className="mb-2 block text-[10px] font-body font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Name
          </label>
          <input
            id={`${serviceLabel}-name`}
            required
            value={formData.name}
            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
            onBlur={() => contact.blur("name")}
            aria-invalid={Boolean(contact.errorFor("name")) || undefined}
            className={fieldClass(Boolean(contact.errorFor("name")))}
            placeholder="Your name"
          />
          <InlineFieldError>{contact.errorFor("name")}</InlineFieldError>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${serviceLabel}-phone`} className="mb-2 block text-[10px] font-body font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Phone
            </label>
            <input
              id={`${serviceLabel}-phone`}
              type="tel"
              inputMode="tel"
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
            <label htmlFor={`${serviceLabel}-town`} className="mb-2 block text-[10px] font-body font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Town
            </label>
            <input
              id={`${serviceLabel}-town`}
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
          <span className="mb-2 block text-[10px] font-body font-semibold uppercase tracking-[0.12em] text-muted-foreground">
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
                  className={`border px-4 py-3 text-left text-sm font-body transition-colors ${selected ? "border-primary bg-primary/10 text-foreground" : "border-border bg-background text-muted-foreground hover:border-primary/40"}`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <FormConsent />
        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2 bg-primary px-5 py-3.5 font-body text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {submitting ? (
            <>
              Sending…
              <Loader2 className="h-4 w-4 animate-spin" />
            </>
          ) : (
            <>
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </motion.button>
      </form>

      <div className="mt-5 grid gap-3 border-t border-border pt-4 text-xs text-muted-foreground font-body sm:grid-cols-3">
        <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-primary" /> Fast follow-up</div>
        <div className="flex items-center gap-2"><Shield className="h-3.5 w-3.5 text-primary" /> Warranty-backed work</div>
        <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-primary" /> Real local team</div>
      </div>
    </div>
  );
};

export default FastLeadForm;