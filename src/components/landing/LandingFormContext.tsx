import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLeadSubmit } from "@/hooks/use-lead-submit";
import { trackFormError, trackFormStart } from "@/lib/gtm";
import { PHONE_DISPLAY } from "@/data/business";
import { isObviouslyFakeEmail, normalizePhoneE164 } from "@/lib/lead-validation";
import type { IntentId, LandingConfig } from "./config";

export const LANDING_SOURCE = "highlander_landing_page";

export const CONSENT_TEXT =
  "By submitting, you ask Highlander to contact you about this project by phone or email. Privacy policy.";

export type FormValues = { firstName: string; email: string; phone: string };
export type FormErrors = Partial<Record<keyof FormValues, string>>;

/**
 * Same rules the database enforces on insert (see `validate_lead_contact`), so a
 * visitor is told what to fix on the form instead of getting a generic failure.
 */
export const validateLanding = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};
  if (!values.firstName.trim()) errors.firstName = "Please enter your first name.";
  if (!values.phone.trim()) errors.phone = "Please enter a phone number.";
  else {
    const phone = normalizePhoneE164(values.phone);
    if (phone.ok === false) errors.phone = "Please enter a valid 10-digit US phone number.";
  }
  const email = values.email.trim();
  if (!email) errors.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address.";
  else if (isObviouslyFakeEmail(email)) errors.email = "Please enter a real email address we can reply to.";
  return errors;
};

/** Turns a database rejection into a field message the visitor can act on. */
export const fieldErrorFromDatabase = (error: unknown): FormErrors | null => {
  const text = `${(error as { message?: string } | null)?.message ?? ""} ${(error as { details?: string } | null)?.details ?? ""}`;
  if (/invalid us phone/i.test(text)) return { phone: "Please enter a valid 10-digit US phone number." };
  if (/fake or disposable|invalid email/i.test(text)) return { email: "Please enter a real email address we can reply to." };
  return null;
};

const newKey = () =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `lp-${Date.now()}-${Math.random().toString(36).slice(2)}`;

interface LandingFormState {
  config: LandingConfig;
  values: FormValues;
  setField: (field: keyof FormValues, value: string) => void;
  errors: FormErrors;
  intent: IntentId;
  setIntent: (intent: IntentId) => void;
  submitted: boolean;
  submitting: boolean;
  submitError: string | null;
  honeypot: string;
  setHoneypot: (value: string) => void;
  markStart: () => void;
  submit: (location: string) => Promise<void>;
}

const Ctx = createContext<LandingFormState | null>(null);

export const useLandingForm = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLandingForm must be used inside <LandingFormProvider>");
  return ctx;
};

/** How a chosen intent becomes the lead's category / project type. */
function resolveRouting(config: LandingConfig, intent: IntentId) {
  if (config.key === "combined") {
    if (intent === "roofing") return { category: "roofing", projectType: "roofing" };
    if (intent === "construction") return { category: "construction", projectType: "construction" };
    if (intent === "both") return { category: "roofing_and_construction", projectType: "roofing_and_construction" };
    // "not_sure" and no selection both go to general triage.
    return { category: "general", projectType: "general" };
  }
  const card = config.intents.find((item) => item.id === intent);
  return { category: config.defaultCategory, projectType: card?.projectType ?? config.defaultProjectType };
}

export function LandingFormProvider({
  config,
  initialIntent,
  children,
}: {
  config: LandingConfig;
  initialIntent: IntentId;
  children: ReactNode;
}) {
  const [values, setValues] = useState<FormValues>({ firstName: "", email: "", phone: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [intent, setIntentState] = useState<IntentId>(initialIntent);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const { submitting, submit: submitLeadOnce } = useLeadSubmit();
  // One idempotency key for every retry of this visitor's request.
  const idempotencyKey = useRef<string>(newKey());

  const setField = useCallback((field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
  }, []);

  const setIntent = useCallback((next: IntentId) => setIntentState(next), []);

  const markStart = useCallback(() => {
    // trackFormStart is already once-per-form for the whole session.
    const routing = resolveRouting(config, intent);
    trackFormStart({ form_name: LANDING_SOURCE, form_id: config.formId, service_category: routing.category });
  }, [config, intent]);

  const submit = useCallback(
    async (location: string) => {
      const nextErrors = validateLanding(values);
      setErrors(nextErrors);
      setSubmitError(null);
      if (Object.keys(nextErrors).length) {
        trackFormError({ form_name: LANDING_SOURCE, form_id: config.formId, error_type: "validation" });
        return;
      }
      // Honeypot: bots fill hidden fields. Behave as if it worked, store nothing.
      if (honeypot.trim()) {
        setSubmitted(true);
        return;
      }

      const routing = resolveRouting(config, intent);
      const result = await submitLeadOnce({
        source: LANDING_SOURCE,
        lead_type: routing.category,
        first_name: values.firstName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        service_category: routing.category,
        project_type: routing.projectType,
        page_path: config.path,
        source_context: location,
        landing_page: config.key,
        consent_given: true,
        consent_text: CONSENT_TEXT,
        idempotency_key: idempotencyKey.current,
        metadata: {
          service_intent: intent,
          form_location: location,
          landing_page_id: config.formId,
          consent_notice_version: config.noticeVersion,
          experiment_variant: "control",
          is_test: Boolean(import.meta.env.DEV),
          // The visitor never has to choose; record that explicitly for triage.
          intent_selected: intent !== config.defaultIntent && intent !== "general",
        },
      });

      // A second call while one is in flight returns null; ignore it.
      if (!result) return;
      if (result.error || (!result.id && !result.duplicate)) {
        const fieldErrors = fieldErrorFromDatabase(result.error);
        if (fieldErrors) {
          setErrors(fieldErrors);
          trackFormError({ form_name: LANDING_SOURCE, form_id: config.formId, error_type: "validation" });
          return;
        }
        trackFormError({ form_name: LANDING_SOURCE, form_id: config.formId, error_type: "delivery" });
        setSubmitError(`We could not confirm your request. Please try again or call ${PHONE_DISPLAY}.`);
        return;
      }
      setSubmitted(true);
    },
    [config, honeypot, intent, submitLeadOnce, values],
  );

  const value = useMemo<LandingFormState>(
    () => ({
      config,
      values,
      setField,
      errors,
      intent,
      setIntent,
      submitted,
      submitting,
      submitError,
      honeypot,
      setHoneypot,
      markStart,
      submit,
    }),
    [config, values, setField, errors, intent, setIntent, submitted, submitting, submitError, honeypot, markStart, submit],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
