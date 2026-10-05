import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, X } from "lucide-react";
import { useLeadSubmit } from "@/hooks/use-lead-submit";
import { useContactValidation } from "@/hooks/use-contact-validation";
import { fieldAttrs } from "@/lib/field-ergonomics";
import FormConsent from "@/components/FormConsent";
import InlineFieldError from "@/components/forms/InlineFieldError";
import FormErrorSummary from "@/components/forms/FormErrorSummary";

/**
 * Homepage-only, low-friction lead bar requested after the Oct 2026 CRO audit.
 *
 * Desktop: fixed horizontal form after the visitor leaves the hero.
 * Mobile: intentionally omitted because StickyMobileCTA owns the bottom thumb
 * zone there. This avoids stacking two fixed controls on small screens.
 *
 * The bar steps out of the way around the closing CTA/footer and while any
 * other form is being used.
 */
export default function HomepageStickyLeadBar() {
  const { submitting, submit } = useLeadSubmit();
  const [form, setForm] = useState({ firstName: "", email: "", phone: "" });
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [issues, setIssues] = useState<string[]>([]);

  const contact = useContactValidation({
    name: form.firstName,
    email: form.email,
    phone: form.phone,
    require: { name: true, email: true, phone: true },
  });

  useEffect(() => {
    const sync = () => {
      const hero = document.querySelector<HTMLElement>("#hero, [data-hero], [data-hero-anchored]");
      if (!hero) {
        setVisible(window.scrollY > window.innerHeight * 0.45);
        return;
      }
      setVisible(hero.getBoundingClientRect().bottom < window.innerHeight * 0.35);
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  useEffect(() => {
    const watched = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) watched.add(entry.target);
          else watched.delete(entry.target);
        }
        setBlocked(watched.size > 0);
      },
      { threshold: 0.01 },
    );

    document.querySelectorAll("[data-final-cta], footer, [data-hide-sticky]").forEach((el) => {
      // Do not observe this component's own form.
      if (!(el instanceof HTMLElement) || el.dataset.homeStickyLead !== "true") observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  if (dismissed || !visible || blocked) return null;

  const fieldClass =
    "h-11 w-full min-w-0 border border-border bg-background px-3 text-sm font-body text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (submitting) return;

    if (!contact.markAttempted()) {
      setSubmitError("Please check the three fields below.");
      setIssues(Object.values(contact.errors).filter(Boolean) as string[]);
      return;
    }

    setSubmitError(null);
    setIssues([]);
    const result = await submit({
      source: "homepage_sticky_lead_bar",
      source_context: "sticky_desktop_homepage",
      lead_type: "general_inquiry",
      first_name: contact.values.name,
      email: contact.values.email,
      phone: contact.values.phone,
      consent_given: true,
    });

    if (!result) return;
    if (result.error) {
      setSubmitError("We couldn't send that just now. Your information is still here — please try again.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <aside
      className="fixed inset-x-0 bottom-0 z-40 hidden md:block border-t border-border bg-card/98 shadow-[0_-8px_28px_rgba(0,0,0,0.12)] backdrop-blur-xl"
      aria-label="Quick contact form"
      data-home-sticky-lead="true"
    >
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.55)] to-transparent" />
      <div className="container-wide px-6 py-3 lg:px-8">
        {submitted ? (
          <div className="flex min-h-[72px] items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden="true" />
              <div>
                <p className="font-heading text-base font-bold text-foreground">Thank you — we received it.</p>
                <p className="text-sm font-body text-muted-foreground">A Highlander project advisor will follow up with you.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="min-h-11 px-4 text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="mb-2 flex items-center justify-between gap-4">
              <div className="flex items-baseline gap-3">
                <p className="font-heading text-base font-bold text-foreground">Get in touch</p>
                <p className="text-sm font-body text-muted-foreground">Three fields. No long intake.</p>
              </div>
              <button
                type="button"
                onClick={() => setDismissed(true)}
                className="inline-flex h-11 w-11 items-center justify-center text-muted-foreground hover:text-foreground"
                aria-label="Close quick contact form"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate data-home-sticky-lead="true">
              <FormErrorSummary message={submitError} issues={issues} className="mb-2 mt-0" />
              <div className="grid grid-cols-[1fr_1.15fr_1fr_auto] gap-2">
                <div>
                  <label htmlFor="home-sticky-first-name" className="sr-only">First name</label>
                  <input
                    id="home-sticky-first-name"
                    {...fieldAttrs.name}
                    value={form.firstName}
                    onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))}
                    onBlur={() => contact.blur("name")}
                    aria-invalid={Boolean(contact.errorFor("name")) || undefined}
                    aria-describedby={contact.errorFor("name") ? "home-sticky-first-name-error" : undefined}
                    className={fieldClass}
                    placeholder="First name"
                    required
                  />
                  <InlineFieldError id="home-sticky-first-name-error">{contact.errorFor("name")}</InlineFieldError>
                </div>
                <div>
                  <label htmlFor="home-sticky-email" className="sr-only">Email</label>
                  <input
                    id="home-sticky-email"
                    {...fieldAttrs.email}
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    onBlur={() => contact.blur("email")}
                    aria-invalid={Boolean(contact.errorFor("email")) || undefined}
                    aria-describedby={contact.errorFor("email") ? "home-sticky-email-error" : undefined}
                    className={fieldClass}
                    placeholder="Email"
                    required
                  />
                  <InlineFieldError id="home-sticky-email-error">{contact.errorFor("email")}</InlineFieldError>
                </div>
                <div>
                  <label htmlFor="home-sticky-phone" className="sr-only">Phone</label>
                  <input
                    id="home-sticky-phone"
                    {...fieldAttrs.phoneLast}
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: contact.formatPhoneInput(e.target.value) }))}
                    onBlur={() => contact.blur("phone")}
                    aria-invalid={Boolean(contact.errorFor("phone")) || undefined}
                    aria-describedby={contact.errorFor("phone") ? "home-sticky-phone-error" : undefined}
                    className={fieldClass}
                    placeholder="Phone"
                    required
                  />
                  <InlineFieldError id="home-sticky-phone-error">{contact.errorFor("phone")}</InlineFieldError>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  aria-busy={submitting || undefined}
                  className="btn btn-primary btn-md min-w-[160px] self-start"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              </div>
              <FormConsent className="mt-2 max-w-[1120px] text-[11px] leading-snug" />
            </form>
          </>
        )}
      </div>
    </aside>
  );
}
