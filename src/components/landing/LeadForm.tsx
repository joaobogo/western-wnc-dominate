import { useEffect, useRef } from "react";
import { ArrowRight, CheckCircle2, Phone, ShieldCheck, X } from "lucide-react";
import { trackPhoneClick } from "@/lib/gtm";
import { PHONE_DISPLAY, PHONE_PLAIN, PHONE_TEL, PRIMARY_HOURS_LABEL } from "@/data/business";
import { useLandingForm } from "./LandingFormContext";
import type { IntentId } from "./config";

export type FormInstance = "hero" | "final" | "rail";

const inputClass =
  "min-h-12 w-full rounded-sm border border-input bg-background px-3.5 text-base text-foreground shadow-sm outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted-foreground/60 focus:border-primary focus:ring-4 focus:ring-primary/15";

export function trackCall(location: string) {
  trackPhoneClick({
    phone_number: PHONE_PLAIN,
    link_url: PHONE_TEL,
    click_location: location,
    page_type: "paid_landing",
  });
}

const COMBINED_OPTIONS: Array<{ id: IntentId; label: string; helper: string }> = [
  { id: "roofing", label: "Roofing", helper: "We’ll route your request to the roofing team." },
  { id: "construction", label: "Construction", helper: "We’ll route your request to the construction team." },
  { id: "both", label: "Both", helper: "We’ll keep this as one coordinated request for both scopes." },
  { id: "not_sure", label: "Not sure", helper: "That is completely fine — the team will help identify the right next step." },
];

/**
 * The single three-field form. Hero, final and desktop-rail instances all read
 * the same provider state, so a value typed in one is never lost in another.
 */
export default function LeadForm({ instance }: { instance: FormInstance }) {
  const form = useLandingForm();
  const { config, values, errors, setField, intent, setIntent, submitted, submitting, submitError, markStart, submit } = form;
  const compact = instance === "rail";
  const prefix = `${config.key}-${instance}`;
  const successRef = useRef<HTMLDivElement>(null);
  const wasSubmitted = useRef(false);

  // Move focus to the confirmation exactly once, on the instance the visitor can see.
  useEffect(() => {
    if (submitted && !wasSubmitted.current) {
      wasSubmitted.current = true;
      const el = successRef.current;
      if (el && el.getClientRects().length) window.setTimeout(() => el.focus(), 0);
    }
  }, [submitted]);

  if (submitted) {
    return (
      <div
        ref={successRef}
        data-success-panel
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className={
          compact
            ? "mx-auto flex max-w-3xl items-center gap-3 px-4 py-3"
            : "rounded-sm border border-primary/25 bg-card p-7 shadow-[0_24px_60px_-30px_hsl(var(--primary)/0.45)] outline-none"
        }
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <h2 className={compact ? "font-heading text-lg font-bold" : "font-heading text-2xl font-bold text-foreground"}>
            {config.successHeading}
          </h2>
          {!compact && (
            <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">
              {config.successBody.split("{phone}")[0]}
              <a
                className="font-semibold text-foreground underline underline-offset-2"
                href={PHONE_TEL}
                onClick={() => trackCall(`lp_${config.key}_success`)}
              >
                {PHONE_DISPLAY}
              </a>
              {config.successBody.split("{phone}")[1]}
            </p>
          )}
        </div>
      </div>
    );
  }

  const selectedCard = config.intents.find((card) => card.id === intent);
  const combined = config.key === "combined";

  const field = (
    name: keyof typeof values,
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement>,
  ) => {
    const id = `${prefix}-${name}`;
    const error = errors[name];
    return (
      <div className={compact ? "min-w-0" : undefined}>
        <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-foreground">
          {label}
        </label>
        <input
          id={id}
          name={name === "firstName" ? "first_name" : name}
          value={values[name]}
          onFocus={markStart}
          onChange={(event) => setField(name, event.target.value)}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${inputClass} ${error ? "border-destructive focus:border-destructive focus:ring-destructive/15" : ""}`}
          {...props}
        />
        {error && (
          <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs font-medium text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  };

  return (
    <form
      noValidate
      data-landing-form={instance}
      data-gtm-form-name="highlander_landing_page"
      data-gtm-form-id={config.formId}
      className={
        compact
          ? "mx-auto w-full max-w-[1200px]"
          : "relative rounded-sm border border-border bg-card p-5 shadow-[0_30px_70px_-36px_hsl(var(--primary)/0.5)] sm:p-7"
      }
      onSubmit={(event) => {
        event.preventDefault();
        markStart();
        void submit(instance);
      }}
    >
      {!compact && (
        <>
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary to-[hsl(var(--highland-gold))]" />
          <div className="mb-5">
            <h2
              id={`${prefix}-heading`}
              data-form-heading
              tabIndex={-1}
              className="font-heading text-[1.65rem] font-bold leading-tight text-foreground outline-none sm:text-3xl"
            >
              {instance === "hero" ? config.formHeading : config.finalFormHeading}
            </h2>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">{config.formHelper}</p>
          </div>
        </>
      )}

      {combined && !compact && (
        <fieldset className="mb-5">
          <legend className="mb-2 text-sm font-semibold text-foreground">
            What do you need? <span className="font-normal text-muted-foreground">(optional)</span>
          </legend>
          <div role="radiogroup" aria-label="Service interest" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {COMBINED_OPTIONS.map((option) => {
              const active = intent === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setIntent(active ? "general" : option.id)}
                  className={`min-h-11 rounded-sm border px-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    active
                      ? "border-primary bg-primary text-primary-foreground shadow-md"
                      : "border-border bg-background text-foreground hover:-translate-y-px hover:border-primary/60"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          <p className="mt-2 min-h-[1.25rem] text-xs text-muted-foreground" aria-live="polite">
            {COMBINED_OPTIONS.find((option) => option.id === intent)?.helper ?? "Choosing a category is optional."}
          </p>
        </fieldset>
      )}

      {!combined && selectedCard && !compact && (
        <p className="mb-4 flex items-center justify-between gap-2 rounded-sm bg-secondary px-3 py-2 text-sm">
          <span>
            <span className="text-muted-foreground">Interested in: </span>
            <span className="font-semibold text-foreground">{selectedCard.label}</span>
          </span>
          <button
            type="button"
            onClick={() => setIntent(config.defaultIntent)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-sm text-muted-foreground hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={`Clear ${selectedCard.label} selection`}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </p>
      )}

      {submitError && (
        <div role="alert" className="mb-4 rounded-sm border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {submitError}
        </div>
      )}

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${prefix}-website`}>Website</label>
        <input
          id={`${prefix}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.honeypot}
          onChange={(event) => form.setHoneypot(event.target.value)}
        />
      </div>

      <div className={compact ? "grid grid-cols-[1fr_1.2fr_1fr_auto] items-start gap-3" : "space-y-4"}>
        {field("firstName", "First name", {
          type: "text",
          autoComplete: "given-name",
          required: true,
          placeholder: "Jane",
        })}
        {field("email", "Email (optional)", {
          type: "email",
          autoComplete: "email",
          placeholder: "jane@example.com",
        })}
        {field("phone", "Phone number", {
          type: "tel",
          inputMode: "tel",
          autoComplete: "tel",
          required: true,
          placeholder: "(828) 555-0123",
        })}
        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting || undefined}
          className={
            compact
              ? "btn btn-primary min-h-12 self-end whitespace-nowrap px-5"
              : "btn btn-primary btn-lg btn-block min-h-14 text-base"
          }
        >
          {submitting ? "Sending your request..." : config.primaryCta}
          {!submitting && <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />}
        </button>
      </div>

      <p className={compact ? "mt-2 text-[11px] leading-snug text-muted-foreground" : "mt-4 text-xs leading-relaxed text-muted-foreground"}>
        By submitting, you ask Highlander to contact you about this project by phone or email.{" "}
        <a
          href="/privacy-policy"
          target="_blank"
          rel="noopener"
          className="underline underline-offset-2 hover:text-foreground"
        >
          Privacy policy.
        </a>
      </p>

      {!compact && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-border pt-4 text-sm">
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
            Free estimate. Sending a request does not authorize work.
          </span>
          <a
            href={PHONE_TEL}
            onClick={() => trackCall(`lp_${config.key}_${instance}_form`)}
            className="inline-flex min-h-10 items-center gap-2 font-bold text-primary underline-offset-4 hover:underline"
            aria-label={`Call Highlander Building Services at ${PHONE_DISPLAY}`}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {PHONE_DISPLAY}
          </a>
          <span className="w-full text-xs text-muted-foreground">{PRIMARY_HOURS_LABEL}, Eastern Time</span>
        </div>
      )}
    </form>
  );
}
