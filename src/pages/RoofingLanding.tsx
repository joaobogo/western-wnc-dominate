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
import shingleRoof from "@/assets/gallery/asphalt-hero.webp";
import logo from "@/assets/logo.svg";

const PATH = "/lp/roofing";
const SOURCE = "highlander_landing_page";
const FORM_ID = "landing-roofing";
const CONSENT =
  "By submitting, you ask Highlander to contact you about this project by phone or email. Privacy policy.";

type FormState = {
  firstName: string;
  email: string;
  phone: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const roofingReviews = ["david-christopher-2026", "zary-m-2024"]
  .map((id) => REVIEWS.find((review) => review.id === id))
  .filter((review): review is NonNullable<typeof review> => Boolean(review));

const projectCards = [
  {
    title: "Standing seam metal roof",
    detail: "A documented Highlander metal-roof project in Highlands, NC.",
    image: metalRoof,
    alt: "Dark bronze standing seam metal roof installed by Highlander Building Services on a mountain home in Highlands, North Carolina",
  },
  {
    title: "Dimensional shingle replacement",
    detail: "A documented Highlander shingle-roof project in Waynesville, NC.",
    image: shingleRoof,
    alt: "Weathered Wood dimensional shingle roof installed by Highlander Building Services on a mountain home in Waynesville, North Carolina",
  },
];

const faqs = [
  {
    question: "Do I need a repair or a new roof?",
    answer:
      "That depends on the condition and extent of the damage. Highlander can assess the roof and explain the appropriate options before you decide.",
  },
  {
    question: "Can you help with both shingle and metal roofs?",
    answer:
      "Yes. Highlander offers roof repair and replacement, including shingle and metal roofing. The team can discuss which approach fits your property.",
  },
  {
    question: "How much will the work cost?",
    answer:
      "The price depends on the roof, materials, access and scope. Request an assessment so the proposed work can be put in writing; this form does not generate an instant quote.",
  },
  {
    question: "What if my roof is leaking now?",
    answer:
      `Call ${PHONE_DISPLAY} during office hours and explain what is happening. Outside office hours, send a request for follow-up. Do not climb onto a wet or damaged roof.`,
  },
  {
    question: "What happens after I send the form?",
    answer:
      "A Highlander team member will contact you to discuss the property, confirm the service area and arrange the next step. Sending a request does not book an appointment or authorize work.",
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

type SharedFormProps = {
  instance: "hero" | "final" | "rail";
  values: FormState;
  setValues: Dispatch<SetStateAction<FormState>>;
  errors: FormErrors;
  setErrors: Dispatch<SetStateAction<FormErrors>>;
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
  submitted,
  submitError,
  onSubmit,
  submitting,
}: SharedFormProps) {
  const compact = instance === "rail";
  const prefix = `roofing-${instance}`;
  const markStart = () =>
    trackFormStart({
      form_name: SOURCE,
      form_id: FORM_ID,
      service_category: "roofing",
    });

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
              Your roofing request is in.
            </h2>
            {!compact && (
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Thank you. Highlander will contact you to discuss your roof and the next step. Prefer to speak with the team? Call{" "}
                <a className="font-semibold underline underline-offset-2" href={PHONE_TEL}>
                  {PHONE_DISPLAY}
                </a>{" "}
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
      data-gtm-service-category="roofing"
      className={compact ? "w-full" : "rounded-sm border border-border bg-card p-5 shadow-flat sm:p-6"}
      onSubmit={(event) => {
        event.preventDefault();
        void onSubmit(instance);
      }}
    >
      {!compact && (
        <div className="mb-5">
          <h2 id={`${prefix}-heading`} tabIndex={-1} className="font-heading text-2xl font-bold text-foreground">
            {instance === "hero" ? "Get a clear next step for your roof." : "Request your roofing estimate."}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Leave your details. Highlander will contact you to discuss the roof and arrange the next step.
          </p>
        </div>
      )}

      {submitError && (
        <div role="alert" className="mb-4 rounded-sm border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {submitError}
        </div>
      )}

      <div className={compact ? "grid grid-cols-[1fr_1.2fr_1fr_auto] items-end gap-3" : "space-y-4"}>
        <div>
          <label htmlFor={`${prefix}-first-name`} className="mb-1.5 block text-sm font-semibold text-foreground">
            First name
          </label>
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
          {errors.firstName && (
            <p id={`${prefix}-first-name-error`} className="mt-1 text-xs text-destructive">
              {errors.firstName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${prefix}-email`} className="mb-1.5 block text-sm font-semibold text-foreground">
            Email (optional)
          </label>
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
          {errors.email && (
            <p id={`${prefix}-email-error`} className="mt-1 text-xs text-destructive">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${prefix}-phone`} className="mb-1.5 block text-sm font-semibold text-foreground">
            Phone number
          </label>
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
          {errors.phone && (
            <p id={`${prefix}-phone-error`} className="mt-1 text-xs text-destructive">
              {errors.phone}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting || undefined}
          className={compact ? "btn btn-primary min-h-12 whitespace-nowrap px-5" : "btn btn-primary btn-md btn-block min-h-12"}
        >
          {submitting ? "Sending your request..." : "Request My Roofing Estimate"}
          {!submitting && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
        </button>
      </div>

      <p className={compact ? "mt-2 text-[11px] leading-snug text-muted-foreground" : "mt-4 text-xs leading-relaxed text-muted-foreground"}>
        By submitting, you ask Highlander to contact you about this project by phone or email.{" "}
        <a href="/privacy-policy" className="underline underline-offset-2 hover:text-foreground">
          Privacy policy.
        </a>
      </p>
    </form>
  );
}

export default function RoofingLanding() {
  const [values, setValues] = useState<FormState>({ firstName: "", email: "", phone: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [heroVisible, setHeroVisible] = useState(true);
  const [finalVisible, setFinalVisible] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const { submitting, submit } = useLeadSubmit();
  const heroFormWrap = useRef<HTMLDivElement>(null);
  const finalFormWrap = useRef<HTMLDivElement>(null);

  const formProps = useMemo(
    () => ({ values, setValues, errors, setErrors, submitted, submitError, submitting }),
    [values, errors, submitted, submitError, submitting],
  );

  useEffect(() => {
    const hero = heroFormWrap.current;
    const final = finalFormWrap.current;
    if (!hero || !final || typeof IntersectionObserver === "undefined") return;
    const heroObserver = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), { threshold: 0.15 });
    const finalObserver = new IntersectionObserver(([entry]) => setFinalVisible(entry.isIntersecting), { threshold: 0.15 });
    heroObserver.observe(hero);
    finalObserver.observe(final);
    return () => {
      heroObserver.disconnect();
      finalObserver.disconnect();
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
    window.setTimeout(() => {
      (document.querySelector("[data-success-panel]") as HTMLElement | null)?.focus();
    }, 0);
  }, [submitted]);

  const handleSubmit = async (location: string) => {
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setSubmitError(null);
    if (Object.keys(nextErrors).length) {
      trackFormError({ form_name: SOURCE, form_id: FORM_ID, error_type: "validation" });
      return;
    }

    const result = await submit({
      source: SOURCE,
      lead_type: "roofing",
      first_name: values.firstName.trim(),
      email: values.email.trim() || null,
      phone: values.phone.trim(),
      service_category: "roofing",
      project_type: "roofing",
      page_path: PATH,
      source_context: location,
      landing_page: "roofing",
      consent_given: true,
      consent_text: CONSENT,
      metadata: {
        service_intent: "roofing",
        form_location: location,
        consent_notice_version: "roofing-lp-2026-10-06",
      },
    });

    if (!result) return;
    if (result.error || !result.id) {
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
      onClick={() =>
        trackPhoneClick({
          phone_number: PHONE_PLAIN,
          link_url: PHONE_TEL,
          click_location: location,
          page_type: "paid_landing",
        })
      }
      aria-label={`${label} at ${PHONE_DISPLAY}`}
    >
      <Phone className="h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  );

  const stickyVisible = !submitted && !heroVisible && !finalVisible;

  return (
    <>
      <SEOHead
        title="Roof Repair & Replacement in Western NC | Highlander"
        description="Roof repair, replacement and metal roofing in Western North Carolina. Call Highlander or send a short request to discuss your roof."
        path={PATH}
        jsonLd={[
          serviceSchema({ name: "Roof Repair & Replacement", description: "Roof repair, replacement and metal roofing in Western North Carolina. Call Highlander or send a short request to discuss your roof.", url: PATH }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Roofing Estimate", url: PATH },
          ]),
        ]}
        noindex="follow"
      />

      <a
        href="#main-content"
        className="sr-only z-[100] rounded-sm bg-background px-4 py-3 text-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        Skip to main content
      </a>

      <main id="main-content" className="min-h-screen bg-background pb-24 lg:pb-32">
        <header className="border-b border-border bg-background">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4 md:px-8">
            <img
              src={logo}
              alt="Highlander Building Services logo"
              width={176}
              height={54}
              className="h-11 w-auto"
              loading="eager"
              decoding="sync"
            />
            {phoneLink("Call " + PHONE_DISPLAY, "lp_roofing_header", "btn btn-secondary btn-sm min-h-12")}
          </div>
        </header>

        <section className="bg-[hsl(var(--secondary))]">
          <div className="mx-auto grid max-w-[1200px] gap-6 px-5 py-9 md:px-8 md:py-12 lg:grid-cols-12 lg:gap-10 lg:py-16">
            <div className="order-1 lg:col-span-7">
              <div className="eyebrow mb-4">Highlander Building Services | Western North Carolina</div>
              <h1 className="max-w-3xl font-heading text-[2.2rem] font-bold leading-[1.04] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Roof repair &amp; replacement in Western NC.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Not sure whether your roof needs a repair or a replacement? Start with a local team that can assess the problem,
                explain the options and put the proposed work in writing.
              </p>
              <p className="mt-4 font-semibold text-foreground">Roof repair. Roof replacement. Metal roofing.</p>
              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                  <Star className="h-4 w-4 fill-current text-primary" aria-hidden="true" />
                  {REVIEW_RATING}/5 on Google
                </span>
                <span aria-hidden="true">|</span>
                <span className="text-muted-foreground">Based in Franklin, NC</span>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={scrollToNearestForm} className="btn btn-primary btn-md min-h-12">
                  Request My Roofing Estimate
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                {phoneLink("Call " + PHONE_DISPLAY, "lp_roofing_hero", "btn btn-secondary btn-md min-h-12")}
              </div>
            </div>

            <div ref={heroFormWrap} className="order-2 lg:col-span-5 lg:row-span-2" data-main-form>
              <SharedForm instance="hero" {...formProps} onSubmit={handleSubmit} />
            </div>

            <figure className="order-3 overflow-hidden rounded-sm border border-border bg-card lg:col-span-7">
              <img
                src={metalRoof}
                alt="Dark bronze standing seam metal roof installed by Highlander Building Services on a Western North Carolina mountain home"
                width={1200}
                height={760}
                className="aspect-[16/9] w-full object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
              <figcaption className="px-4 py-3 text-xs text-muted-foreground">
                Documented Highlander standing-seam roofing work in Western North Carolina.
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8">
            <div className="max-w-2xl">
              <div className="eyebrow mb-3">Real roofing work</div>
              <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">See the work. Understand the standard.</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Before you choose a roofer, look at actual work. These examples come from documented Highlander roofing projects rather than stock photography.
              </p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {projectCards.map((project) => (
                <article key={project.title} className="overflow-hidden rounded-sm border border-border bg-card">
                  <img
                    src={project.image}
                    alt={project.alt}
                    width={900}
                    height={600}
                    className="aspect-[3/2] w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="p-5">
                    <h3 className="font-heading text-xl font-bold text-foreground">{project.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.detail}</p>
                  </div>
                </article>
              ))}
            </div>
            <button type="button" onClick={scrollToNearestForm} className="btn btn-primary btn-md mt-7 min-h-12">
              Request My Roofing Estimate
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </section>

        <section className="bg-secondary py-14 md:py-20">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8">
            <div className="max-w-2xl">
              <div className="eyebrow mb-3">What are you seeing?</div>
              <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">Start with the roof you have, not a diagnosis.</h2>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ["Roof repair", "Leaks, damaged areas or flashing concerns? Have the roof assessed before deciding how much work is needed."],
                ["Roof replacement", "Planning for an aging roof? Compare the proposed system, materials and scope before making your decision."],
                ["Metal roofing", "Considering metal for your home? Discuss the roof shape, appearance and installation details with Highlander."],
              ].map(([title, text]) => (
                <article key={title} className="rounded-sm border border-border bg-card p-6">
                  <h3 className="font-heading text-xl font-bold text-foreground">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
                  <button type="button" onClick={scrollToNearestForm} className="mt-5 min-h-12 font-semibold text-primary underline underline-offset-4">
                    Discuss this
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="mx-auto grid max-w-[1200px] gap-8 px-5 md:px-8 lg:grid-cols-2">
            <div>
              <div className="eyebrow mb-3">Why the next step matters</div>
              <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">Make the decision with a written starting point.</h2>
              <div className="mt-7 space-y-5">
                {[
                  ["A decision you can understand.", "Talk through the roof condition, the proposed work and the available options."],
                  ["A written starting point.", "Review the scope and price before authorizing the work. Ask about materials and applicable warranty terms."],
                  ["A local point of contact.", "Work with a Franklin-based business serving Western North Carolina, with a named contact for your project."],
                ].map(([title, text]) => (
                  <div key={title} className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <h3 className="font-heading text-lg font-bold text-foreground">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-sm border border-border bg-card p-6">
              <div className="eyebrow mb-3">The process</div>
              <ol className="space-y-5">
                {[
                  ["1. Make contact.", "Call or send the three-field form. You do not need to know the roof material or the cause of the problem."],
                  ["2. Review the roof.", "The team discusses the property and arranges the appropriate assessment."],
                  ["3. Decide with a written scope.", "Review the recommended work, materials and price before deciding how to proceed."],
                ].map(([title, text]) => (
                  <li key={title}>
                    <h3 className="font-heading text-lg font-bold text-foreground">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {roofingReviews.length > 0 && (
          <section className="bg-secondary py-14 md:py-20">
            <div className="mx-auto max-w-[1200px] px-5 md:px-8">
              <div className="max-w-2xl">
                <div className="eyebrow mb-3">Roofing experiences</div>
                <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">What customers have said about Highlander roofing work.</h2>
              </div>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {roofingReviews.map((review) => (
                  <blockquote key={review.id} className="rounded-sm border border-border bg-card p-6">
                    <p className="text-base leading-relaxed text-foreground">“{review.text}”</p>
                    <footer className="mt-4 text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">{review.name}</span>
                      {reviewDateLabel(review) ? ` · ${reviewDateLabel(review)}` : ""} · {review.source}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-4xl px-5 md:px-8">
            <div className="text-center">
              <div className="eyebrow mb-3">Roofing questions</div>
              <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">Useful answers before you reach out.</h2>
            </div>
            <div className="mt-8 divide-y divide-border rounded-sm border border-border bg-card">
              {faqs.map((faq) => (
                <details key={faq.question} className="group p-5">
                  <summary className="cursor-pointer list-none font-heading text-lg font-bold text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary py-14 text-primary-foreground md:py-16">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8">
            <div className="max-w-2xl">
              <h2 className="font-heading text-3xl font-bold md:text-4xl">A roof question should not become a guessing game.</h2>
              <p className="mt-4 leading-relaxed text-primary-foreground/90">
                Tell us how to reach you. We will talk through what is happening at your property and the next step toward a written roofing estimate.
              </p>
              <p className="mt-4 text-sm text-primary-foreground/80">
                Serving Franklin, Highlands, Cashiers, Sylva and surrounding Western North Carolina communities.
              </p>
            </div>
            <div ref={finalFormWrap} className="mt-8 max-w-3xl" data-main-form>
              <SharedForm instance="final" {...formProps} onSubmit={handleSubmit} />
            </div>
          </div>
        </section>

        <footer className="border-t border-border bg-background py-8">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-5 text-sm text-muted-foreground md:px-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="font-semibold text-foreground">{BUSINESS.legalName}</div>
              <div>{FRANKLIN_NAP}</div>
              <div>{PRIMARY_HOURS_LABEL}, Eastern Time</div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a href={PHONE_TEL} className="underline underline-offset-2 hover:text-foreground">
                {PHONE_DISPLAY}
              </a>
              <a href="/privacy-policy" className="underline underline-offset-2 hover:text-foreground">
                Privacy policy
              </a>
              <a href="/accessibility" className="underline underline-offset-2 hover:text-foreground">
                Accessibility
              </a>
            </div>
          </div>
        </footer>

        {stickyVisible && (
          <>
            <div
              data-sticky-cta
              className="fixed inset-x-0 bottom-0 z-50 hidden border-t border-border bg-background/98 px-5 py-3 shadow-lg backdrop-blur lg:block"
            >
              <div className="mx-auto max-w-[1200px]">
                <SharedForm instance="rail" {...formProps} onSubmit={handleSubmit} />
              </div>
            </div>

            {!keyboardOpen && (
              <div
                data-sticky-cta
                className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-border bg-background/98 p-3 shadow-lg backdrop-blur lg:hidden"
                style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
              >
                {phoneLink("Call Highlander", "lp_roofing_sticky", "btn btn-secondary min-h-12 w-full justify-center")}
                <button type="button" onClick={scrollToNearestForm} className="btn btn-primary min-h-12 w-full justify-center">
                  Get My Estimate
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
