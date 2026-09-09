import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContactValidation } from "@/hooks/use-contact-validation";
import { useFormAutosave } from "@/hooks/use-form-autosave";
import { submitLead } from "@/lib/leads";
import { trackEvent } from "@/lib/analytics";
import InlineFieldError from "@/components/forms/InlineFieldError";
import FormErrorSummary from "@/components/forms/FormErrorSummary";
import FormSavedNote from "@/components/forms/FormSavedNote";
import LeadConfirmationPanel from "@/components/forms/LeadConfirmationPanel";
import FormConsent from "@/components/FormConsent";
import { fieldAttrs } from "@/lib/field-ergonomics";
import { microcopy } from "@/lib/microcopy";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const NEED_OPTIONS = [
  { value: "", label: "Choose what best matches your project" },
  { value: "roof-repair", label: "Roof repair or leak" },
  { value: "roof-replacement", label: "Roof replacement" },
  { value: "metal-roofing", label: "Metal roofing" },
  { value: "storm-damage", label: "Storm or insurance damage" },
  { value: "commercial", label: "Commercial roofing" },
  { value: "addition", label: "Home addition or remodel" },
  { value: "outdoor-living", label: "Outdoor living / deck / porch" },
  { value: "siding-exterior", label: "Siding or exterior improvements" },
  { value: "not-sure", label: "Not sure yet — need guidance" },
];

/**
 * Minimum-viable contact form for the Contact page.
 *
 * The goal is to reduce friction on a decision page: only the fields we
 * absolutely need to route the lead and start a conversation. Everything
 * else is asked on the follow-up call.
 */
const ContactMinimalForm = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    town: "",
    need: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [issues, setIssues] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const contact = useContactValidation({
    name: form.name,
    email: form.email,
    phone: form.phone,
    town: form.town,
    require: { name: true, email: false, phone: true, town: true },
  });

  const autosave = useFormAutosave("contact-minimal-form", form, {
    enabled: !submitted,
    onRestore: (saved) => {
      const d = saved as Record<string, string>;
      setForm((p) => ({
        name: d.name || p.name,
        phone: d.phone || p.phone,
        email: d.email || p.email,
        town: d.town || p.town,
        need: d.need || p.need,
        message: d.message || p.message,
      }));
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.markAttempted()) {
      setSubmitError("We need a little more before we can send this.");
      setIssues(Object.values(contact.errors).filter(Boolean) as string[]);
      return;
    }
    if (!form.need) {
      setSubmitError("We need a little more before we can send this.");
      setIssues(["Let us know what type of project you're considering."]);      return;
    }

    setSubmitError(null);
    setIssues([]);
    setIsSubmitting(true);

    try {
      await submitLead({
        source: "contact_form",
        lead_type: "general_inquiry",
        full_name: contact.values.name,
        email: contact.values.email,
        phone: contact.values.phone,
        property_town: contact.values.town,
        property_state: "NC",
        project_type: form.need,
        project_description: form.message.trim() || null,
        preferred_contact_method: "phone",
        service_category:
          form.need.startsWith("roof") || form.need === "storm-damage" || form.need === "metal-roofing" || form.need === "commercial"
            ? "roofing"
            : "construction",
        source_context: "contact_page_minimal",
      });

      trackEvent("form_submit", {
        label: "Contact Page Minimal Form",
        elementId: "contact-minimal-form",
        metadata: {
          town: form.town,
          need: form.need,
        },
      });

      setSubmitted(true);
      autosave.clear();
    } catch (err) {
      console.error("Contact minimal form submit failed:", err);
      setSubmitError("We couldn't send your message just now. Nothing you typed was lost — try again in a moment.");
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
      >
        <LeadConfirmationPanel
          heading={`Thank you, ${form.name.split(" ")[0] || "friend"} — your message is in.`}
          town={form.town}
          category={
            form.need.startsWith("roof") || form.need === "storm-damage" || form.need === "metal-roofing" || form.need === "commercial"
              ? "roofing"
              : "construction"
          }
          summary={[
            { label: "Project", value: NEED_OPTIONS.find((o) => o.value === form.need)?.label },
            { label: "Town", value: form.town },
            { label: "Name", value: form.name },
            { label: "We'll reach you at", value: form.phone || form.email },
          ]}
        />
      </motion.div>
    );
  }

  const inputClasses = "field-input";
  const labelClasses = "field-label";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" data-hide-sticky>
      <FormErrorSummary message={submitError} issues={issues} className="mt-0 mb-2" />
      <FormSavedNote show={autosave.restored} className="mb-2" />

      <div>
        <label htmlFor="cm-name" className={labelClasses}>
          Your Name <span className="text-alert">*</span>
        </label>
        <input
          id="cm-name"
          required
          {...fieldAttrs.name}
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          onBlur={() => contact.blur("name")}
          aria-invalid={Boolean(contact.errorFor("name")) || undefined}
          aria-describedby={contact.errorFor("name") ? "cm-name-error" : undefined}
          placeholder="Full name"
          className={inputClasses}
          maxLength={100}
        />
        <InlineFieldError id="cm-name-error">{contact.errorFor("name")}</InlineFieldError>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cm-phone" className={labelClasses}>
            Phone <span className="text-alert">*</span>
          </label>
          <input
            id="cm-phone"
            required
            {...fieldAttrs.phone}
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: contact.formatPhoneInput(e.target.value) }))}
            onBlur={() => contact.blur("phone")}
            aria-invalid={Boolean(contact.errorFor("phone")) || undefined}
          aria-describedby={contact.errorFor("phone") ? "cm-phone-error" : undefined}
            placeholder="(828) 555-0123"
            className={inputClasses}
            maxLength={20}
          />
          <InlineFieldError id="cm-phone-error">{contact.errorFor("phone")}</InlineFieldError>
        </div>
        <div>
          <label htmlFor="cm-email" className={labelClasses}>
            Email <span className="font-normal normal-case tracking-normal opacity-70">(optional)</span>
          </label>
          <input
            id="cm-email"
            {...fieldAttrs.email}
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            onBlur={() => contact.blur("email")}
            aria-invalid={Boolean(contact.errorFor("email")) || undefined}
          aria-describedby={contact.errorFor("email") ? "cm-email-error" : undefined}
            placeholder="you@email.com"
            className={inputClasses}
            maxLength={255}
          />
          <InlineFieldError id="cm-email-error">{contact.errorFor("email")}</InlineFieldError>
        </div>
      </div>

      <div>
        <label htmlFor="cm-town" className={labelClasses}>
          Property Town or Address <span className="text-alert">*</span>
        </label>
        <input
          id="cm-town"
          required
          {...fieldAttrs.address}
          value={form.town}
          onChange={(e) => setForm((p) => ({ ...p, town: e.target.value }))}
          onBlur={() => contact.blur("town")}
          aria-invalid={Boolean(contact.errorFor("town")) || undefined}
          aria-describedby={contact.errorFor("town") ? "cm-town-error" : undefined}
          placeholder="e.g. Highlands, Cashiers, Franklin, or full address"
          className={inputClasses}
          maxLength={150}
        />
        <InlineFieldError id="cm-town-error">{contact.errorFor("town")}</InlineFieldError>
      </div>

      <div>
        <label htmlFor="cm-need" className={labelClasses}>
          What do you need help with? <span className="text-alert">*</span>
        </label>
        <select
          id="cm-need"
          value={form.need}
          onChange={(e) => setForm((p) => ({ ...p, need: e.target.value }))}
          className={inputClasses}
        >
          {NEED_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {form.need === "" && issues.length > 0 && !submitError && (
          <p className="text-body-xs text-alert font-body mt-1.5">Choose a project type so we route you to the right advisor.</p>
        )}
      </div>

      <div>
        <label htmlFor="cm-message" className={labelClasses}>
          Project Details <span className="normal-case tracking-normal font-normal text-muted-foreground">— optional</span>
        </label>
        <textarea
          id="cm-message"
          {...fieldAttrs.notes}
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          placeholder="Briefly describe the problem, timeline, or anything else that would help us prepare."
          rows={4}
          className={inputClasses}
          maxLength={2000}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-2 text-body-xs text-muted-foreground font-body">
          <Phone className="w-4 h-4 text-primary" aria-hidden="true" />
          <span>Personal response within 24 hours.</span>
        </div>
        <Button type="submit" size="lg" loading={isSubmitting} loadingText={microcopy.loading.submitting}>
          Send My Message
          <ArrowRight aria-hidden="true" />
        </Button>
      </div>

      <FormConsent />
    </form>
  );
};

export default ContactMinimalForm;
