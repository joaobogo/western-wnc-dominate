import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  ChevronDown,
  Clock,
  Hammer,
  Home,
  Layers,
  MapPin,
  Mountain,
  Phone,
  Quote,
  Sofa,
  Sprout,
  Star,
  Wrench,
  Compass,
  Maximize2,
} from "lucide-react";
import SEOHead, { breadcrumbSchema, serviceSchema } from "@/components/SEOHead";
import { BUSINESS, FRANKLIN_NAP, PHONE_DISPLAY, PHONE_TEL, PRIMARY_HOURS_LABEL, REVIEW_RATING } from "@/data/business";
import { REVIEWS, reviewDateLabel } from "@/data/reviews";
import logo from "@/assets/logo.svg";
import type { IntentId, LandingConfig, LandingImage } from "./config";
import { LandingFormProvider, useLandingForm } from "./LandingFormContext";
import LeadForm, { trackCall } from "./LeadForm";
import Lightbox from "./Lightbox";

/* ───────────────────────── motion + small helpers ───────────────────────── */

const LANDING_CSS = `
.lp-reveal{opacity:0;transform:translateY(18px);transition:opacity .45s ease,transform .45s ease;transition-delay:var(--lp-delay,0ms)}
.lp-reveal.lp-in{opacity:1;transform:none}
.lp-no-io .lp-reveal{opacity:1;transform:none}
.lp-line{transform-origin:top;transform:scaleY(0);transition:transform .9s cubic-bezier(.2,.7,.2,1)}
.lp-in .lp-line,.lp-line.lp-in{transform:scaleY(1)}
.lp-tartan{background-image:url(/tartan.png);background-size:auto 100%;background-repeat:repeat-x}
@media (prefers-reduced-motion:reduce){
 .lp-reveal,.lp-line{opacity:1!important;transform:none!important;transition:none!important}
}
`;

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      document.documentElement.classList.add("lp-no-io");
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("lp-in");
            io.unobserve(entry.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    el.querySelectorAll(".lp-reveal, .lp-line").forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);
  return ref;
}

const Reveal = ({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) => (
  <div className={`lp-reveal ${className}`} style={{ ["--lp-delay" as string]: `${delay}ms` }}>
    {children}
  </div>
);

const intentIcon: Partial<Record<IntentId, typeof Wrench>> = {
  roof_repair: Wrench,
  roof_replacement: Layers,
  metal_roofing: Mountain,
  addition: Home,
  renovation: Hammer,
  outdoor_living: Sofa,
  roofing: Layers,
  construction: Hammer,
  not_sure: Compass,
};

const Img = ({
  image,
  className,
  eager,
  sizes,
}: {
  image: LandingImage;
  className?: string;
  eager?: boolean;
  sizes?: string;
}) => (
  <img
    src={image.src}
    srcSet={image.srcSet}
    sizes={sizes}
    alt={image.alt}
    width={image.width}
    height={image.height}
    className={className}
    loading={eager ? "eager" : "lazy"}
    {...(eager ? ({ fetchpriority: "high" } as Record<string, string>) : {})}
    decoding="async"
  />
);

const Stars = () => (
  <span className="inline-flex" aria-hidden="true">
    {[0, 1, 2, 3, 4].map((i) => (
      <Star key={i} className="h-4 w-4 fill-[hsl(var(--highland-gold))] text-[hsl(var(--highland-gold))]" />
    ))}
  </span>
);

/* ───────────────────────────── page body ───────────────────────────── */

function LandingBody() {
  const { config, submitted, intent, setIntent } = useLandingForm();
  const rootRef = useReveal();
  const heroFormWrap = useRef<HTMLDivElement>(null);
  const finalFormWrap = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(true);
  const [finalVisible, setFinalVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [railFocused, setRailFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [expandedReview, setExpandedReview] = useState<string | null>(null);

  const reviews = config.reviews.ids
    .map((id) => REVIEWS.find((review) => review.id === id))
    .filter((review): review is NonNullable<typeof review> => Boolean(review));

  /* Where the visitor is on the page decides which rail may show. */
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const watch = (el: Element | null, set: (v: boolean) => void, threshold: number) => {
      if (!el) return () => undefined;
      const io = new IntersectionObserver(([entry]) => set(entry.isIntersecting), { threshold });
      io.observe(el);
      return () => io.disconnect();
    };
    const stops = [
      watch(heroFormWrap.current, setHeroVisible, 0.15),
      watch(finalFormWrap.current, setFinalVisible, 0.15),
      watch(footerRef.current, setFooterVisible, 0.05),
    ];
    return () => stops.forEach((stop) => stop());
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Mobile bar hides while a keyboard is up; the desktop rail never unmounts mid-entry. */
  useEffect(() => {
    const onIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select")) {
        setKeyboardOpen(true);
        setRailFocused(Boolean(railRef.current?.contains(target)));
      }
    };
    const onOut = () =>
      window.setTimeout(() => {
        const active = document.activeElement as HTMLElement | null;
        const stillTyping = Boolean(active?.matches("input, textarea, select"));
        setKeyboardOpen(stillTyping);
        setRailFocused(Boolean(stillTyping && railRef.current?.contains(active)));
      }, 120);
    window.addEventListener("focusin", onIn);
    window.addEventListener("focusout", onOut);
    return () => {
      window.removeEventListener("focusin", onIn);
      window.removeEventListener("focusout", onOut);
    };
  }, []);

  const scrollToNearestForm = useCallback(() => {
    const targets = [heroFormWrap.current, finalFormWrap.current].filter(Boolean) as HTMLDivElement[];
    const mid = window.innerHeight / 2;
    const distance = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      return Math.abs(rect.top + rect.height / 2 - mid);
    };
    const target = targets.sort((a, b) => distance(a) - distance(b))[0];
    if (!target) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    // Focus the form heading (not a field) so the mobile keyboard stays closed.
    window.setTimeout(() => target.querySelector<HTMLElement>("[data-form-heading]")?.focus({ preventScroll: true }), reduce ? 0 : 450);
  }, []);

  const chooseIntent = (id: IntentId) => {
    setIntent(id);
    scrollToNearestForm();
  };

  const railVisible = !submitted && (railFocused || (!heroVisible && !finalVisible && !footerVisible));
  const barVisible = railVisible && !keyboardOpen;
  const emphasis = config.intents.find((card) => card.id === intent)?.emphasis;
  const hero = config.hero;

  const callLink = (label: string, location: string, className: string, ariaLabel?: string) => (
    <a href={PHONE_TEL} onClick={() => trackCall(location)} className={className} aria-label={ariaLabel ?? `${label} at ${PHONE_DISPLAY}`}>
      <Phone className="h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  );

  const primaryCta = (extra = "") => (
    <button type="button" onClick={scrollToNearestForm} className={`btn btn-primary btn-md group min-h-14 whitespace-nowrap ${extra}`}>
      {config.primaryCta}
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
    </button>
  );

  const eyebrow = (text: string, light = false) => (
    <div className={`mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] ${light ? "text-[hsl(var(--highland-gold))]" : "text-primary"}`}>
      <span aria-hidden="true" className="h-px w-8 bg-current" />
      {text}
    </div>
  );

  return (
    <div ref={rootRef} className="min-h-screen bg-background text-foreground">
      <style>{LANDING_CSS}</style>
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-sm bg-background px-4 py-3 text-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        Skip to main content
      </a>

      {/* Header: non-linked logo + call. No navigation by design. */}
      <header
        className={`sticky top-0 z-40 border-b bg-background/95 backdrop-blur transition-shadow duration-200 ${
          scrolled ? "border-border shadow-[0_10px_30px_-20px_hsl(var(--foreground)/0.4)]" : "border-transparent"
        }`}
      >
        <div aria-hidden="true" className="lp-tartan h-1.5 w-full bg-primary" />
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-4 py-2.5 sm:px-5 md:px-8 md:py-3">
          <img src={logo} alt="Highlander Building Services" width={176} height={54} className="h-9 w-auto shrink-0 sm:h-12" loading="eager" decoding="sync" />
          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-1.5 text-sm text-muted-foreground lg:inline-flex">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {PRIMARY_HOURS_LABEL}
            </span>
            {callLink(`Call ${PHONE_DISPLAY}`, `lp_${config.key}_header`, "btn btn-secondary min-h-11 shrink-0 px-3.5 text-[0.8rem] font-bold sm:min-h-12 sm:px-5 sm:text-sm")}
          </div>
        </div>
      </header>

      <main id="main-content">
        {/* ───────────── Hero ───────────── */}
        <section className="relative overflow-hidden bg-[hsl(var(--muted))] !py-0">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_85%_0%,hsl(var(--highland-gold)/0.14),transparent_60%),radial-gradient(60%_50%_at_0%_100%,hsl(var(--primary)/0.10),transparent_60%)]"
          />
          <div className="relative mx-auto grid max-w-[1200px] gap-8 px-4 py-9 sm:px-5 md:px-8 md:py-14 lg:grid-cols-[1.28fr_1fr] lg:gap-12 lg:py-14">
            <div className="order-1 lg:row-span-1">
              <Reveal>
                {eyebrow(config.eyebrow)}
                <h1 className="max-w-3xl font-heading text-[2.15rem] font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
                  {config.h1}
                </h1>
                <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-muted-foreground md:text-lg">{config.support}</p>
                <p className="mt-5 inline-flex flex-wrap gap-2 font-semibold text-foreground">
                  {config.serviceLine
                    .split(".")
                    .map((part) => part.trim())
                    .filter(Boolean)
                    .map((part) => (
                      <span key={part} className="rounded-full border border-primary/20 bg-background px-3.5 py-1.5 text-sm shadow-sm">
                        {part}
                      </span>
                    ))}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                  <span className="inline-flex items-center gap-2 font-semibold text-foreground">
                    <Stars />
                    {REVIEW_RATING}/5 on Google
                  </span>
                  <span aria-hidden="true" className="text-border">|</span>
                  <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                    <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                    Based in Franklin, NC
                  </span>
                </div>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {primaryCta()}
                  {callLink(`Call ${PHONE_DISPLAY}`, `lp_${config.key}_hero`, "btn btn-secondary btn-md min-h-14 whitespace-nowrap", `Call Highlander at ${PHONE_DISPLAY}`)}
                </div>
              </Reveal>
            </div>

            <div ref={heroFormWrap} data-main-form className="order-2 lg:row-span-2 lg:pt-1">
              <div id="estimate-form" className="lg:sticky lg:top-28">
                <LeadForm instance="hero" />
              </div>
            </div>

            {/* Photography comes after the form on mobile so it never delays first contact. */}
            <Reveal className="order-3" delay={80}>
              {hero.secondary ? (
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { image: hero.primary, tag: hero.primaryTag, on: emphasis !== "construction" },
                    { image: hero.secondary, tag: hero.secondaryTag ?? "", on: emphasis !== "roofing" },
                  ].map((tile, i) => (
                    <figure
                      key={tile.tag}
                      className={`group relative overflow-hidden rounded-sm border border-border bg-card shadow-[0_26px_60px_-34px_hsl(var(--foreground)/0.55)] transition-all duration-300 ${
                        tile.on ? "opacity-100" : "opacity-60 saturate-50"
                      }`}
                    >
                      <Img image={tile.image} eager={i === 0} sizes="(min-width:1024px) 340px, 46vw" className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 to-transparent px-3 pb-3 pt-10 text-xs font-semibold text-white sm:text-sm">
                        {tile.tag}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ) : (
                <figure className="group relative">
                  <span aria-hidden="true" className="absolute -bottom-3 -right-3 hidden h-full w-full border-2 border-[hsl(var(--highland-gold))] sm:block" />
                  <div className="relative overflow-hidden rounded-sm border border-border bg-card shadow-[0_30px_70px_-34px_hsl(var(--foreground)/0.6)]">
                    <Img image={hero.primary} eager sizes="(min-width:1024px) 640px, 100vw" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    <figcaption className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-background/95 px-3.5 py-1.5 text-xs font-bold text-foreground shadow-md">
                      <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                      {hero.primaryTag}
                    </figcaption>
                  </div>
                </figure>
              )}
            </Reveal>
          </div>
        </section>

        {/* ───────────── Trust band ───────────── */}
        <section aria-label="Why homeowners start here" className="bg-primary text-primary-foreground !py-0">
          <ul className="mx-auto grid max-w-[1200px] grid-cols-2 gap-x-4 gap-y-3 px-4 py-5 text-sm font-semibold sm:px-5 md:grid-cols-4 md:px-8">
            <li className="flex items-center gap-2.5">
              <Stars />
              <span>{REVIEW_RATING}/5 on Google</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[hsl(var(--highland-gold))]" aria-hidden="true" />
              Based in Franklin, NC
            </li>
            <li className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-[hsl(var(--highland-gold))]" aria-hidden="true" />
              Written scope before work begins
            </li>
            <li className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-[hsl(var(--highland-gold))]" aria-hidden="true" />
              Serving Western North Carolina
            </li>
          </ul>
        </section>

        {/* ───────────── Proof ───────────── */}
        <section className="!py-0">
          <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-5 md:px-8 md:py-24">
            <Reveal className="max-w-2xl">
              {eyebrow(config.key === "construction" ? "Real project imagery" : "Real work")}
              <h2 className="font-heading text-3xl font-bold leading-tight md:text-5xl">{config.proofHeading}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{config.proofIntro}</p>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {config.proof.map((item, i) => {
                const on = !emphasis || emphasis === "both" || item.id === emphasis;
                return (
                  <Reveal key={item.id} delay={i * 90}>
                    <button
                      type="button"
                      onClick={() => setLightbox(i)}
                      aria-label={`Enlarge photo: ${item.title}, ${item.tag}`}
                      className={`group relative block w-full overflow-hidden rounded-sm border border-border bg-card text-left shadow-[0_24px_55px_-34px_hsl(var(--foreground)/0.55)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_34px_70px_-34px_hsl(var(--foreground)/0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                        on ? "" : "opacity-60 saturate-50"
                      }`}
                    >
                      <div className="relative overflow-hidden">
                        <Img image={item.image} sizes="(min-width:768px) 560px, 100vw" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/95 px-3 py-1 text-xs font-bold shadow">
                          <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                          {item.tag}
                        </span>
                        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/95 opacity-0 shadow transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                          <Maximize2 className="h-4 w-4" aria-hidden="true" />
                        </span>
                      </div>
                      <div className="border-t-4 border-[hsl(var(--highland-gold))] p-5">
                        <h3 className="font-heading text-xl font-bold md:text-2xl">{item.title}</h3>
                        <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">{item.detail}</p>
                      </div>
                    </button>
                  </Reveal>
                );
              })}
            </div>
            <Reveal className="mt-9 flex flex-col gap-3 sm:flex-row">
              {primaryCta()}
              {callLink(`Call ${PHONE_DISPLAY}`, `lp_${config.key}_proof`, "btn btn-secondary btn-lg min-h-14", `Call Highlander at ${PHONE_DISPLAY}`)}
            </Reveal>
          </div>
        </section>

        {/* ───────────── Recognize your project (informational cards) ───────────── */}
        <section className="bg-[hsl(var(--muted))] !py-0">
          <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-5 md:px-8 md:py-24">
            <Reveal className="max-w-3xl">
              {eyebrow(config.intentEyebrow)}
              <h2 className="font-heading text-3xl font-bold leading-tight md:text-5xl">{config.intentHeading}</h2>
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {config.intents.map((card, i) => {
                const Icon = intentIcon[card.id] ?? Sprout;
                const active = intent === card.id;
                return (
                  <Reveal key={card.id} delay={i * 80}>
                    <article
                      className={`group relative flex h-full flex-col rounded-sm border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-34px_hsl(var(--primary)/0.55)] ${
                        active ? "border-primary ring-2 ring-primary/25" : "border-border"
                      }`}
                    >
                      <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors duration-300 group-hover:bg-[hsl(var(--highland-gold))] group-hover:text-foreground">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="font-heading text-xl font-bold leading-snug">{card.title}</h3>
                      <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">{card.text}</p>
                      <button
                        type="button"
                        onClick={() => chooseIntent(card.id)}
                        aria-pressed={active}
                        className="mt-5 inline-flex min-h-12 items-center gap-2 self-start font-bold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        Discuss this
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                      </button>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ───────────── Why + process ───────────── */}
        <section className="!py-0">
          <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-16 sm:px-5 md:px-8 md:py-24 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              {eyebrow(config.whyEyebrow)}
              <h2 className="font-heading text-3xl font-bold leading-tight md:text-4xl">{config.whyHeading}</h2>
              <ul className="mt-8 space-y-6">
                {config.why.map((item, i) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--highland-gold))] font-body text-sm font-bold text-primary">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-heading text-lg font-bold">{item.title}</h3>
                      <p className="mt-1 leading-relaxed text-muted-foreground">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={100}>
              <div className="relative h-full overflow-hidden rounded-sm bg-primary p-7 text-primary-foreground md:p-9">
                <div aria-hidden="true" className="lp-tartan absolute inset-y-0 left-0 w-1.5" />
                {eyebrow("The process", true)}
                <ol className="relative mt-4 space-y-8">
                  <span aria-hidden="true" className="lp-line absolute bottom-3 left-[1.15rem] top-3 w-px bg-primary-foreground/30" />
                  {config.steps.map((step, i) => (
                    <li key={step.title} className="relative flex gap-5">
                      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--highland-gold))] font-body text-base font-bold text-foreground shadow-lg">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-heading text-xl font-bold">{step.title}</h3>
                        <p className="mt-1 leading-relaxed text-primary-foreground/85">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ───────────── Reviews ───────────── */}
        {reviews.length > 0 && (
          <section className="bg-[hsl(var(--muted))] !py-0">
            <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-5 md:px-8 md:py-24">
              <Reveal className="max-w-3xl">
                {eyebrow(config.reviews.eyebrow)}
                <h2 className="font-heading text-3xl font-bold leading-tight md:text-4xl">{config.reviews.heading}</h2>
                {config.reviews.note && <p className="mt-3 text-sm text-muted-foreground">{config.reviews.note}</p>}
              </Reveal>
              <div className={`mt-10 grid gap-5 ${reviews.length > 2 ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
                {reviews.map((review, i) => {
                  const open = expandedReview === review.id;
                  const long = review.text.length > 190;
                  const date = reviewDateLabel(review);
                  return (
                    <Reveal key={review.id} delay={i * 80}>
                      <blockquote className="relative flex h-full flex-col rounded-sm border border-border bg-card p-6 shadow-sm">
                        <Quote aria-hidden="true" className="absolute right-5 top-5 h-8 w-8 text-[hsl(var(--highland-gold))]/50" />
                        <Stars />
                        <p className={`mt-3 text-[1.02rem] leading-relaxed text-foreground ${open || !long ? "" : "line-clamp-5"}`}>“{review.text}”</p>
                        {long && (
                          <button
                            type="button"
                            onClick={() => setExpandedReview(open ? null : review.id)}
                            aria-expanded={open}
                            className="mt-2 inline-flex min-h-11 items-center gap-1 self-start text-sm font-bold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          >
                            {open ? "Show less" : "Read the full review"}
                          </button>
                        )}
                        <footer className="mt-auto pt-4 text-sm text-muted-foreground">
                          <span className="font-bold text-foreground">{review.name}</span>
                          {date ? ` · ${date}` : ""} · {review.source} review
                          {config.key === "combined" ? " · Roofing" : ""}
                        </footer>
                      </blockquote>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ───────────── FAQ ───────────── */}
        <section className="!py-0">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-5 md:px-8 md:py-24">
            <Reveal className="text-center">
              <div className="flex justify-center">{eyebrow(config.faqEyebrow)}</div>
              <h2 className="font-heading text-3xl font-bold leading-tight md:text-4xl">{config.faqHeading}</h2>
            </Reveal>
            <div className="mt-9 divide-y divide-border overflow-hidden rounded-sm border border-border bg-card shadow-sm">
              {config.faqs.map((faq, i) => {
                const open = openFaq === i;
                return (
                  <div key={faq.question}>
                    <h3>
                      <button
                        type="button"
                        id={`faq-q-${i}`}
                        aria-expanded={open}
                        aria-controls={`faq-a-${i}`}
                        onClick={() => setOpenFaq(open ? null : i)}
                        className="flex min-h-[3.5rem] w-full items-center justify-between gap-4 px-5 py-4 text-left font-heading text-lg font-bold transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                      >
                        {faq.question}
                        <ChevronDown className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
                      </button>
                    </h3>
                    <div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 leading-relaxed text-muted-foreground">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ───────────── Final conversion ───────────── */}
        <section className="relative overflow-hidden bg-primary text-primary-foreground !py-0">
          <div aria-hidden="true" className="lp-tartan absolute inset-x-0 top-0 h-1.5" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[hsl(var(--highland-gold))]/10 blur-3xl" />
          <div className="relative mx-auto grid max-w-[1200px] gap-10 px-4 py-16 sm:px-5 md:px-8 md:py-24 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
            <Reveal>
              <h2 className="font-heading text-3xl font-bold leading-tight md:text-5xl">{config.finalHeading}</h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-primary-foreground/90">{config.finalBody}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                {callLink(`Call ${PHONE_DISPLAY}`, `lp_${config.key}_final`, "btn btn-primary btn-lg min-h-14", `Call Highlander at ${PHONE_DISPLAY}`)}
                <button
                  type="button"
                  onClick={scrollToNearestForm}
                  className="btn btn-lg min-h-14 border border-primary-foreground/50 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 lg:hidden"
                >
                  {config.primaryCta}
                </button>
              </div>
              <p className="mt-6 flex items-start gap-2 text-sm text-primary-foreground/80">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--highland-gold))]" aria-hidden="true" />
                {config.serviceLocalLine}
              </p>
            </Reveal>
            <div ref={finalFormWrap} data-main-form className="text-foreground">
              <LeadForm instance="final" />
            </div>
          </div>
        </section>
      </main>

      {/* ───────────── Footer: legal only ───────────── */}
      <footer ref={footerRef} className="border-t border-border bg-background py-8 pb-28 xl:pb-32">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 text-sm text-muted-foreground sm:px-5 md:px-8 lg:flex-row lg:items-center lg:justify-between">
          <address className="not-italic">
            <div className="font-semibold text-foreground">{BUSINESS.legalName}</div>
            <div>{FRANKLIN_NAP}</div>
            <div>{PRIMARY_HOURS_LABEL}, Eastern Time</div>
          </address>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href={PHONE_TEL} onClick={() => trackCall(`lp_${config.key}_footer`)} className="min-h-11 content-center underline underline-offset-2 hover:text-foreground">
              {PHONE_DISPLAY}
            </a>
            <a href="/privacy-policy" target="_blank" rel="noopener" className="min-h-11 content-center underline underline-offset-2 hover:text-foreground">
              Privacy policy
            </a>
            <a href="/accessibility" target="_blank" rel="noopener" className="min-h-11 content-center underline underline-offset-2 hover:text-foreground">
              Accessibility
            </a>
          </div>
        </div>
      </footer>

      <Lightbox items={config.proof} index={lightbox} onIndexChange={setLightbox} onClose={() => setLightbox(null)} />

      {/* Desktop rail (≥1280px): same form, same state. Hidden, not unmounted, so typing is never lost. */}
      {!submitted && (
        <div
          ref={railRef}
          data-sticky-cta="desktop"
          aria-hidden={!railVisible}
          // @ts-expect-error `inert` is valid HTML; React 18 types lag behind.
          inert={!railVisible ? "" : undefined}
          className={`fixed inset-x-0 bottom-0 z-50 hidden border-t border-border bg-background/98 px-5 py-3 shadow-[0_-18px_40px_-24px_hsl(var(--foreground)/0.45)] backdrop-blur transition-transform duration-300 xl:block ${
            railVisible ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <LeadForm instance="rail" />
        </div>
      )}

      {/* Tablet / mobile bar: two buttons only, never three tiny inputs. */}
      {!submitted && barVisible && (
        <div
          data-sticky-cta="mobile"
          className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-border bg-background/98 p-3 shadow-[0_-18px_40px_-24px_hsl(var(--foreground)/0.45)] backdrop-blur xl:hidden"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          {callLink("Call Highlander", `lp_${config.key}_sticky`, "btn btn-secondary min-h-12 w-full justify-center whitespace-nowrap px-2 text-[0.8rem] sm:text-sm", `Call Highlander at ${PHONE_DISPLAY}`)}
          <button type="button" onClick={scrollToNearestForm} className="btn btn-primary min-h-12 w-full justify-center whitespace-nowrap px-2 text-[0.8rem] sm:text-sm">
            {config.mobileCta}
          </button>
        </div>
      )}
    </div>
  );
}

/* ───────────────────────────── entry ───────────────────────────── */

export default function LandingTemplate({ config }: { config: LandingConfig }) {
  return (
    <>
      <SEOHead
        title={config.seoTitle}
        description={config.seoDescription}
        path={config.path}
        jsonLd={[
          serviceSchema({ name: config.schemaName, description: config.seoDescription, url: config.path }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: config.breadcrumbName, url: config.path },
          ]),
        ]}
        noindex="follow"
      />
      <LandingFormProvider config={config} initialIntent={config.defaultIntent}>
        <LandingBody />
      </LandingFormProvider>
    </>
  );
}
