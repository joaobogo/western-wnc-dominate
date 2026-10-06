import { useEffect, useMemo, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { ArrowRight, CheckCircle2, Phone, Star } from "lucide-react";
import SEOHead, { breadcrumbSchema, serviceSchema } from "@/components/SEOHead";
import { useLeadSubmit } from "@/hooks/use-lead-submit";
import { trackFormError, trackFormStart, trackPhoneClick } from "@/lib/gtm";
import {
  BUSINESS,
  FRANKLIN_NAP,
  PHONE_DISPLAY,
  PHONE_PLAIN,
  PHONE_TEL,
  PRIMARY_HOURS_LABEL,
  REVIEW_RATING,
} from "@/data/business";
import { REVIEWS, reviewDateLabel } from "@/data/reviews";
import metalRoof from "@/assets/gallery/metal-005.webp";
import logo from "@/assets/logo.svg";

const PATH = "/lp/roofing-construction";
const SOURCE = "highlander_landing_page";
const FORM_ID = "landing-combined";
const CONSENT =
  "By submitting, you ask Highlander to contact you about this project by phone or email. Privacy policy.";

type Intent = "general" | "roofing" | "construction" | "both" | "not_sure";
type FormState = { firstName: string; email: string; phone: string };
type FormErrors = Partial<Record<keyof FormState, string>>;

const roofingReview = REVIEWS.find((review) => review.id === "david-christopher-2026");

const faqs = [
  {
    question: "Do I need to choose roofing or construction first?",
    answer:
      "No. You can choose a category when it is useful, or send the form without one. Highlander will help clarify the appropriate next step.",
  },
  {
    question: "Can I ask about both in one request?",
    answer:
      "Yes. Tell the team you are considering both. The combined scope, project fit and coordination requirements can be discussed together.",
  },
  {
    question: "What services does Highlander offer?",
    answer:
      "Roof repair, roof replacement and metal roofing, alongside additions, renovations, decks, porches and outdoor living improvements.",
  },
  {
    question: "Can I get a price without a site assessment?",
    answer:
      "A reliable proposal depends on the property and the scope. This form starts the conversation; it does not generate an instant quote or reserve a project date.",
  },
  {
    question: "What happens after I send my details?",
    answer:
      "A Highlander team member will contact you to discuss the property, confirm the service area and arrange the next step with the appropriate team.",
  },
];

const validate = (values: FormState): FormErrors => {
  const errors: FormErrors = {};
  if (!values.firstName.trim()) errors.firstName = "Please enter your first name.";
  const digits = values.phone.replace(/\D/g, "");
  if (!values.phone.trim()) errors.phone = "Please enter a phone number.";
  else if (digits.length < 7) errors.phone = "Please enter a valid phone number.";
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address or leave this field blank.";
  }
  return errors;
};

const intentHelper = (intent: Intent) => {
  if (intent === "roofing") return "We’ll route your request to the roofing team.";
  if (intent === "construction") return "We’ll route your request to the construction team.";
  if (intent === "both") return "We’ll keep this as one coordinated request for both scopes.";
  if (intent === "not_sure") return "That is completely fine — the team will help identify the right next step.";
  return "Choosing a category is optional.";
};

type SharedFormProps = {
  instance: "hero" | "final" | "rail";
  values: FormState;
  setValues: Dispatch<SetStateAction<FormState>>;
  errors: FormErrors;
  setErrors: Dispatch<SetStateAction<FormErrors>>;
  intent: Intent;
  setIntent: Dispatch<SetStateAction<Intent>>;
  submitted: boolean;
  submitError: string | null;
  onSubmit: (location: string) => Promise<void>;
  submitting: boolean;
};

function SharedForm({
  instance,
  values,
  setValues,
  errors,
  setErrors,
  intent,
  setIntent,
  submitted,
  submitError,
  onSubmit,
  submitting,
}: SharedFormProps) {
  const compact = instance === "rail";
  const prefix = `combined-${instance}`;
  const markStart = () =>
    trackFormStart({ form_name: SOURCE, form_id: FORM_ID, service_category: intent === "general" ? "general" : intent });

  if (submitted) {
    return (
      <div
        data-success-panel
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className={compact ? "min-w-[340px] rounded-sm bg-card px-4 py-3" : "rounded-sm border border-border bg-card p-6 shadow-flat"}
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <div>
            <h2 className={compact ? "font-heading text-lg font-bold" : "font-heading text-2xl font-bold"}>
              Your home-project request is in.
            </h2>
            {!compact && (
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Thank you. Highlander will contact you to discuss your project and the next step. Prefer to speak with the team? Call{" "}
                <a className="font-semibold underline underline-offset-2" href={PHONE_TEL}>{PHONE_DISPLAY}</a>{" "}
                during office hours.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      data-landing-form={instance}
      data-gtm-form-name={SOURCE}
      data-gtm-form-id={FORM_ID}
      className={compact ? "w-full" : "rounded-sm border border-border bg-card p-5 shadow-[0_18px_50px_-28px_hsl(var(--foreground)/0.35)] sm:p-6"}
      onSubmit={(event) => {
        event.preventDefault();
        markStart();
        void onSubmit(instance);
      }}
    >
      {!compact && (
        <div className="mb-5">
          <h2 id={`${prefix}-heading`} tabIndex={-1} className="font-heading text-2xl font-bold text-foreground">
            One simple place to start.
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Roofing, construction or a little of both? Leave your details and Highlander will help you find the right next step.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-sm bg-secondary px-3 py-2.5 text-sm">
            <span className="font-semibold text-foreground">Prefer to talk now?</span>
            <a
              href={PHONE_TEL}
              className="inline-flex min-h-10 items-center gap-2 font-bold text-primary underline underline-offset-4"
              aria-label={`Call Highlander Building Services at ${PHONE_DISPLAY}`}
              onClick={() =>
                trackPhoneClick({
                  phone_number: PHONE_PLAIN,
                  link_url: PHONE_TEL,
                  click_location: `lp_combined_${instance}_form`,
                  page_type: "paid_landing",
                })
              }
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>
            <span className="text-xs text-muted-foreground">{PRIMARY_HOURS_LABEL}</span>
          </div>

          <fieldset className="mt-5">
            <legend className="mb-2 text-sm font-semibold text-foreground">What are you thinking about? <span className="font-normal text-muted-foreground">(optional)</span></legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {([
                ["roofing", "Roofing"],
                ["construction", "Construction"],
                ["both", "Both"],
                ["not_sure", "Not sure"],
              ] as Array<[Intent, string]>).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={intent === value}
                  onClick={() => setIntent((current) => current === value ? "general" : value)}
                  className={`min-h-12 rounded-sm border px-3 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    intent === value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:border-primary/60"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{intentHelper(intent)}</p>
          </fieldset>
        </div>
      )}

      {submitError && (
        <div role="alert" className="mb-4 rounded-sm border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {submitError}
        </div>
      )}

      <div className={compact ? "grid grid-cols-[1fr_1.2fr_1fr_auto] items-end gap-3" : "space-y-4"}>
        <div>
          <label htmlFor={`${prefix}-first-name`} className="mb-1.5 block text-sm font-semibold text-foreground">First name</label>
          <input
            id={`${prefix}-first-name`}
            name="first_name"
            type="text"
            autoComplete="given-name"
            required
            value={values.firstName}
            onFocus={markStart}
            onChange={(e) => {
              setValues((current) => ({ ...current, firstName: e.target.value }));
              if (errors.firstName) setErrors((current) => ({ ...current, firstName: undefined }));
            }}
            aria-invalid={Boolean(errors.firstName) || undefined}
            aria-describedby={errors.firstName ? `${prefix}-first-name-error` : undefined}
            className="min-h-12 w-full rounded-sm border border-input bg-background px-3 text-base text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="First name"
          />
          {errors.firstName && <p id={`${prefix}-first-name-error`} className="mt-1 text-xs text-destructive">{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor={`${prefix}-email`} className="mb-1.5 block text-sm font-semibold text-foreground">Email (optional)</label>
          <input
            id={`${prefix}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onFocus={markStart}
            onChange={(e) => {
              setValues((current) => ({ ...current, email: e.target.value }));
              if (errors.email) setErrors((current) => ({ ...current, email: undefined }));
            }}
            aria-invalid={Boolean(errors.email) || undefined}
            aria-describedby={errors.email ? `${prefix}-email-error` : undefined}
            className="min-h-12 w-full rounded-sm border border-input bg-background px-3 text-base text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="you@example.com"
          />
          {errors.email && <p id={`${prefix}-email-error`} className="mt-1 text-xs text-destructive">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor={`${prefix}-phone`} className="mb-1.5 block text-sm font-semibold text-foreground">Phone number</label>
          <input
            id={`${prefix}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            value={values.phone}
            onFocus={markStart}
            onChange={(e) => {
              setValues((current) => ({ ...current, phone: e.target.value }));
              if (errors.phone) setErrors((current) => ({ ...current, phone: undefined }));
            }}
            aria-invalid={Boolean(errors.phone) || undefined}
            aria-describedby={errors.phone ? `${prefix}-phone-error` : undefined}
            className="min-h-12 w-full rounded-sm border border-input bg-background px-3 text-base text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="(828) 555-0123"
          />
          {errors.phone && <p id={`${prefix}-phone-error`} className="mt-1 text-xs text-destructive">{errors.phone}</p>}
        </div>
        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting || undefined}
          className={compact ? "btn btn-primary min-h-12 whitespace-nowrap px-5" : "btn btn-primary btn-md btn-block min-h-12"}
        >
          {submitting ? "Sending your request..." : "Discuss My Home Project"}
          {!submitting && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
        </button>
      </div>

      <p className={compact ? "mt-2 text-[11px] leading-snug text-muted-foreground" : "mt-4 text-xs leading-relaxed text-muted-foreground"}>
        By submitting, you ask Highlander to contact you about this project by phone or email.{" "}
        <a href="/privacy-policy" className="underline underline-offset-2 hover:text-foreground">Privacy policy.</a>
      </p>
    </form>
  );
}

export default function CombinedLanding() {
  const [values, setValues] = useState<FormState>({ firstName: "", email: "", phone: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [intent, setIntent] = useState<Intent>("general");
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [heroVisible, setHeroVisible] = useState(true);
  const [finalVisible, setFinalVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const { submitting, submit } = useLeadSubmit();
  const heroFormWrap = useRef<HTMLDivElement>(null);
  const finalFormWrap = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  const formProps = useMemo(
    () => ({ values, setValues, errors, setErrors, intent, setIntent, submitted, submitError, submitting }),
    [values, errors, intent, submitted, submitError, submitting],
  );

  useEffect(() => {
    const hero = heroFormWrap.current;
    const final = finalFormWrap.current;
    const footer = footerRef.current;
    if (!hero || !final || !footer || typeof IntersectionObserver === "undefined") return;
    const heroObserver = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), { threshold: 0.15 });
    const finalObserver = new IntersectionObserver(([entry]) => setFinalVisible(entry.isIntersecting), { threshold: 0.15 });
    const footerObserver = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting), { threshold: 0.05 });
    heroObserver.observe(hero);
    finalObserver.observe(final);
    footerObserver.observe(footer);
    return () => {
      heroObserver.disconnect();
      finalObserver.disconnect();
      footerObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const onFocusIn = (event: FocusEvent) => {
      if ((event.target as HTMLElement)?.matches("input, textarea, select")) setKeyboardOpen(true);
    };
    const onFocusOut = () => window.setTimeout(() => setKeyboardOpen(false), 120);
    window.addEventListener("focusin", onFocusIn);
    window.addEventListener("focusout", onFocusOut);
    return () => {
      window.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  useEffect(() => {
    if (!submitted) return;
    window.setTimeout(() => (document.querySelector("[data-success-panel]") as HTMLElement | null)?.focus(), 0);
  }, [submitted]);

  const handleSubmit = async (location: string) => {
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setSubmitError(null);
    if (Object.keys(nextErrors).length) {
      trackFormError({ form_name: SOURCE, form_id: FORM_ID, error_type: "validation" });
      return;
    }

    const serviceCategory =
      intent === "roofing" ? "roofing" :
      intent === "construction" ? "construction" :
      intent === "both" ? "roofing_and_construction" :
      "general";

    const result = await submit({
      source: SOURCE,
      lead_type: serviceCategory,
      first_name: values.firstName.trim(),
      email: values.email.trim() || null,
      phone: values.phone.trim(),
      service_category: serviceCategory,
      project_type: serviceCategory,
      page_path: PATH,
      source_context: location,
      landing_page: "combined",
      consent_given: true,
      consent_text: CONSENT,
      metadata: {
        service_intent: intent,
        form_location: location,
        consent_notice_version: "combined-lp-2026-10-06",
      },
    });
    if (!result) return;
    if (result.error || (!result.id && !result.duplicate)) {
      trackFormError({ form_name: SOURCE, form_id: FORM_ID, error_type: "delivery" });
      setSubmitError(`We could not confirm your request. Please try again or call ${PHONE_DISPLAY}.`);
      return;
    }
    setSubmitted(true);
  };

  const scrollToNearestForm = () => {
    const targets = [heroFormWrap.current, finalFormWrap.current].filter(Boolean) as HTMLDivElement[];
    const target = targets.sort((a, b) => Math.abs(a.getBoundingClientRect().top) - Math.abs(b.getBoundingClientRect().top))[0];
    target?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => target?.querySelector<HTMLElement>("h2")?.focus(), 450);
  };

  const phoneLink = (label: string, location: string, className: string) => (
    <a
      href={PHONE_TEL}
      className={className}
      onClick={() => trackPhoneClick({ phone_number: PHONE_PLAIN, link_url: PHONE_TEL, click_location: location, page_type: "paid_landing" })}
      aria-label={label.includes(PHONE_DISPLAY) ? label : `${label} at ${PHONE_DISPLAY}`}
    >
      <Phone className="h-4 w-4" aria-hidden="true" />{label}
    </a>
  );

  const stickyVisible = !submitted && !heroVisible && !finalVisible && !footerVisible;

  return (
    <>
      <SEOHead
        title="Roofing & Construction in Western NC | Highlander"
        description="Roofing, additions, renovations and outdoor living in Western North Carolina. Call Highlander or send one short request for your home project."
        path={PATH}
        jsonLd={[
          serviceSchema({ name: "Roofing & Construction", description: "Roofing, additions, renovations and outdoor living in Western North Carolina. Call Highlander or send one short request for your home project.", url: PATH }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Roofing & Construction", url: PATH },
          ]),
        ]}
        noindex="follow"
      />
      <a href="#main-content" className="sr-only z-[100] rounded-sm bg-background px-4 py-3 text-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:outline-none focus:ring-2 focus:ring-primary">Skip to main content</a>
      <main id="main-content" className="min-h-screen bg-background pb-24 lg:pb-32">
        <header className="border-b border-border bg-background">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4 md:px-8">
            <img src={logo} alt="Highlander Building Services logo" width={176} height={54} className="h-8 w-auto shrink-0 sm:h-11" loading="eager" decoding="sync" />
            {phoneLink("Call " + PHONE_DISPLAY, "lp_combined_header", "btn btn-secondary min-h-11 shrink-0 px-3 text-xs sm:min-h-12 sm:px-4 sm:text-sm")}
          </div>
        </header>

        <section className="bg-[hsl(var(--secondary))]">
          <div className="mx-auto grid max-w-[1200px] gap-6 px-5 py-9 md:px-8 md:py-12 lg:grid-cols-12 lg:gap-10 lg:py-16">
            <div className="order-1 lg:col-span-7">
              <div className="eyebrow mb-4">Highlander Building Services | Western North Carolina</div>
              <h1 className="max-w-3xl font-heading text-[2.2rem] font-bold leading-[1.04] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Roofing &amp; construction for your Western NC home.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Fix the roof. Add the space. Improve the way home feels. Start with Highlander for roofing, additions, renovations and outdoor living, with one local point of contact for the next step.
              </p>
              <p className="mt-4 font-semibold text-foreground">Roofing. Construction. One conversation to get started.</p>
              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-1.5 font-semibold text-foreground"><Star className="h-4 w-4 fill-current text-primary" aria-hidden="true" />{REVIEW_RATING}/5 on Google</span>
                <span aria-hidden="true">|</span><span className="font-medium text-foreground">Based in Franklin, NC</span>
                <span aria-hidden="true" className="hidden sm:inline">|</span><span className="text-muted-foreground">One short request</span>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={scrollToNearestForm} className="btn btn-primary btn-md min-h-12">Discuss My Home Project <ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
                {phoneLink("Call Highlander: " + PHONE_DISPLAY, "lp_combined_hero", "btn btn-secondary btn-md min-h-12")}
              </div>
            </div>

            <div ref={heroFormWrap} className="order-2 lg:col-span-5 lg:row-span-2 lg:pt-1" data-main-form>
              <div className="mb-3 hidden items-center justify-between gap-3 lg:flex">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Short form · 3 fields</span>
                <span className="text-xs text-muted-foreground">Service choice is optional</span>
              </div>
              <SharedForm instance="hero" {...formProps} onSubmit={handleSubmit} />
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Prefer a conversation? Call <a
                  href={PHONE_TEL}
                  className="font-semibold text-foreground underline underline-offset-2"
                  onClick={() =>
                    trackPhoneClick({
                      phone_number: PHONE_PLAIN,
                      link_url: PHONE_TEL,
                      click_location: "lp_combined_form_helper",
                      page_type: "paid_landing",
                    })
                  }
                >{PHONE_DISPLAY}</a>.
              </p>
            </div>

            <div className="order-3 grid gap-4 sm:grid-cols-2 lg:col-span-7">
              <figure className={`overflow-hidden rounded-sm border bg-card transition-colors ${intent === "roofing" || intent === "both" ? "border-primary ring-2 ring-primary/20" : "border-border"}`}>
                <img src={metalRoof} alt="Dark bronze standing seam metal roof installed by Highlander Building Services in Western North Carolina" width={760} height={520} className="aspect-[4/3] w-full object-cover" loading="eager" fetchPriority="high" decoding="async" />
                <figcaption className="px-4 py-3 text-xs text-muted-foreground">Documented Highlander roofing work.</figcaption>
              </figure>
              <figure className={`overflow-hidden rounded-sm border bg-card transition-colors ${intent === "construction" || intent === "both" ? "border-primary ring-2 ring-primary/20" : "border-border"}`}>
                <img src="/media/85aa1f15-construction-project-highlands.webp" alt="Mountain-home construction project image featured by Highlander Building Services in Western North Carolina" width={760} height={520} className="aspect-[4/3] w-full object-cover" loading="lazy" decoding="async" />
                <figcaption className="px-4 py-3 text-xs text-muted-foreground">Construction work featured on Highlander's current Western North Carolina website.</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8">
            <div className="max-w-2xl">
              <div className="eyebrow mb-3">One accountable team</div>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">See the work. Understand the standard.</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">Roofing and construction stay distinct in the proof shown here, while the first conversation stays simple.</p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ["Roofing", "Protect what is already there. Discuss roof repair, roof replacement or metal roofing. Start with the condition of the roof and the work it may need."],
                ["Construction", "Make more of your home. Explore an addition, renovation, deck or porch. Start with the way you want to use the space."],
                ["Need both, or not sure?", "You do not have to sort the trades before you contact us. Highlander can discuss the project and help identify the appropriate next step."],
              ].map(([title, text], index) => (
                <article key={title} className="rounded-sm border border-border bg-card p-6">
                  <h3 className="font-heading text-xl font-bold">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setIntent(index === 0 ? "roofing" : index === 1 ? "construction" : "not_sure");
                      scrollToNearestForm();
                    }}
                    className="mt-5 min-h-12 font-semibold text-primary underline underline-offset-4"
                  >
                    Discuss this
                  </button>
                </article>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={scrollToNearestForm} className="btn btn-primary btn-md min-h-12">
                Discuss My Home Project <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              {phoneLink("Call " + PHONE_DISPLAY, "lp_combined_proof", "btn btn-secondary btn-md min-h-12")}
            </div>
          </div>
        </section>

        <section className="bg-secondary py-14 md:py-20">
          <div className="mx-auto grid max-w-[1200px] gap-8 px-5 md:px-8 lg:grid-cols-2">
            <div>
              <div className="eyebrow mb-3">Why the next step matters</div>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">One starting point for the whole home.</h2>
              <div className="mt-7 space-y-5">
                {[
                  ["One starting point.", "No need to complete separate roofing and construction applications to explain one home project."],
                  ["A clearer view of the work.", "Discuss how the roof, the existing home and the proposed improvement fit together."],
                  ["A written scope before work begins.", "Review the proposed work and price, with a Highlander point of contact for the project."],
                ].map(([title, text]) => (
                  <div key={title} className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <div><h3 className="font-heading text-lg font-bold">{title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-sm border border-border bg-card p-6">
              <div className="eyebrow mb-3">The process</div>
              <ol className="space-y-5">
                {[
                  ["1. Start with the home.", "Call or send your contact details. Choose a service only when you already know what you need."],
                  ["2. Talk with the right team.", "Highlander reviews the request and discusses the roofing, construction or combined scope."],
                  ["3. Understand the next step.", "Arrange the relevant assessment and review the proposed work before deciding to proceed."],
                ].map(([title, text]) => (
                  <li key={title}><h3 className="font-heading text-lg font-bold">{title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p></li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {roofingReview && (
          <section className="py-14 md:py-20">
            <div className="mx-auto max-w-3xl px-5 md:px-8">
              <div className="eyebrow mb-3">Company reputation · roofing experience</div>
              <blockquote className="rounded-sm border border-border bg-card p-6">
                <p className="text-base leading-relaxed text-foreground">“{roofingReview.text}”</p>
                <footer ref={footerRef} className="mt-4 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{roofingReview.name}</span>
                  {reviewDateLabel(roofingReview) ? ` · ${reviewDateLabel(roofingReview)}` : ""} · {roofingReview.source}
                </footer>
              </blockquote>
              <p className="mt-3 text-xs text-muted-foreground">This review describes Highlander roofing work and is shown as company-reputation proof, not as a construction testimonial.</p>
            </div>
          </section>
        )}

        <section className="bg-secondary py-14 md:py-20">
          <div className="mx-auto max-w-4xl px-5 md:px-8">
            <div className="text-center"><div className="eyebrow mb-3">Project questions</div><h2 className="font-heading text-3xl font-bold md:text-4xl">Useful answers before you reach out.</h2></div>
            <div className="mt-8 divide-y divide-border rounded-sm border border-border bg-card">
              {faqs.map((faq) => (
                <details key={faq.question} className="group p-5">
                  <summary className="cursor-pointer list-none font-heading text-lg font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">{faq.question}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary py-14 text-primary-foreground md:py-16">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8">
            <div className="max-w-2xl">
              <h2 className="font-heading text-3xl font-bold md:text-4xl">One home. A clear next step.</h2>
              <p className="mt-4 leading-relaxed text-primary-foreground/90">Whether it is the roof, the living space or both, start with a conversation. Send your details and Highlander will help route your request to the right team.</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                {phoneLink("Call " + PHONE_DISPLAY, "lp_combined_final", "btn btn-secondary btn-md min-h-12")}
                <button type="button" onClick={scrollToNearestForm} className="btn btn-md min-h-12 border border-primary-foreground/50 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                  Discuss My Home Project
                </button>
              </div>
              <p className="mt-4 text-sm text-primary-foreground/80">Serving Franklin, Highlands, Cashiers, Sylva and surrounding Western North Carolina communities.</p>
            </div>
            <div ref={finalFormWrap} className="mt-8 max-w-3xl" data-main-form>
              <SharedForm instance="final" {...formProps} onSubmit={handleSubmit} />
            </div>
          </div>
        </section>

        <footer className="border-t border-border bg-background py-8">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-5 text-sm text-muted-foreground md:px-8 lg:flex-row lg:items-center lg:justify-between">
            <div><div className="font-semibold text-foreground">{BUSINESS.legalName}</div><div>{FRANKLIN_NAP}</div><div>{PRIMARY_HOURS_LABEL}, Eastern Time</div></div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={PHONE_TEL}
                className="underline underline-offset-2 hover:text-foreground"
                onClick={() => trackPhoneClick({ phone_number: PHONE_PLAIN, link_url: PHONE_TEL, click_location: "lp_combined_footer", page_type: "paid_landing" })}
              >{PHONE_DISPLAY}</a>
              <a href="/privacy-policy" className="underline underline-offset-2 hover:text-foreground">Privacy policy</a>
              <a href="/accessibility" className="underline underline-offset-2 hover:text-foreground">Accessibility</a>
            </div>
          </div>
        </footer>

        {stickyVisible && (
          <>
            <div data-sticky-cta className="fixed inset-x-0 bottom-0 z-50 hidden border-t border-border bg-background/98 px-5 py-3 shadow-lg backdrop-blur xl:block">
              <div className="mx-auto max-w-[1200px]"><SharedForm instance="rail" {...formProps} onSubmit={handleSubmit} /></div>
            </div>
            {!keyboardOpen && (
              <div data-sticky-cta className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-border bg-background/98 p-3 shadow-lg backdrop-blur xl:hidden" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
                {phoneLink("Call Highlander", "lp_combined_sticky", "btn btn-secondary min-h-12 w-full justify-center")}
                <button type="button" onClick={scrollToNearestForm} className="btn btn-primary min-h-12 w-full justify-center">Discuss My Project</button>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
