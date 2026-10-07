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
  ShieldCheck,
} from "lucide-react";
import SEOHead, { breadcrumbSchema, serviceSchema } from "@/components/SEOHead";
import { BUSINESS, FRANKLIN_NAP, PHONE_DISPLAY, PHONE_TEL, PRIMARY_HOURS_LABEL, REVIEW_RATING } from "@/data/business";
import { REVIEWS, reviewDateLabel } from "@/data/reviews";
import logo from "@/assets/logo.svg";
import teamPhoto from "@/assets/team-photo.webp";
import teamPhotoSet from "@/assets/team-photo.webp?w=640;1000;1440&format=webp&as=srcset";
import type { IntentId, LandingConfig, LandingImage } from "./config";
import { LandingFormProvider, useLandingForm } from "./LandingFormContext";
import LeadForm, { trackCall } from "./LeadForm";
import Lightbox from "./Lightbox";
import { openConsentPreferences } from "@/lib/consent";

/* ───────────────────────── motion + small helpers ───────────────────────── */

const LANDING_CSS = `
.lp-reveal{opacity:0;transform:translateY(18px);transition:opacity .45s ease,transform .45s ease;transition-delay:var(--lp-delay,0ms)}
.lp-reveal.lp-in{opacity:1;transform:none}
.lp-no-io .lp-reveal{opacity:1;transform:none}
.lp-par-far{transform:translateY(calc(var(--lp-py,0)*-34px))}
.lp-par-mid{transform:translateY(calc(var(--lp-py,0)*-18px))}
.lp-par-near{transform:translateY(calc(var(--lp-py,0)*-6px))}
.lp-shine{position:relative;overflow:hidden}
.lp-shine::after{content:"";position:absolute;inset:0;background:linear-gradient(105deg,transparent 35%,hsl(0 0% 100%/.38) 50%,transparent 65%);transform:translateX(-120%);transition:transform .7s ease;pointer-events:none}
.lp-shine:hover::after{transform:translateX(120%)}
.lp-hl{background-image:linear-gradient(transparent 62%,hsl(var(--highland-gold)/.38) 62%,hsl(var(--highland-gold)/.38) 92%,transparent 92%);padding:0 .08em}
.lp-line{transform-origin:top;transform:scaleY(0);transition:transform .9s cubic-bezier(.2,.7,.2,1)}
.lp-in .lp-line,.lp-line.lp-in{transform:scaleY(1)}
.lp-tartan{background-image:url(/tartan.png);background-size:auto 100%;background-repeat:repeat-x}
@keyframes lp-kb{from{transform:scale(1.03)}to{transform:scale(1.11)}}
.lp-kb{animation:lp-kb 30s ease-in-out infinite alternate;will-change:transform}
.lp-strip{scrollbar-width:none;-webkit-overflow-scrolling:touch}
.lp-strip::-webkit-scrollbar{display:none}
@media (prefers-reduced-motion:reduce){
 .lp-kb{animation:none!important}
 .lp-reveal,.lp-line{opacity:1!important;transform:none!important;transition:none!important}
 .lp-par-far,.lp-par-mid,.lp-par-near{transform:none!important}
 .lp-shine::after{display:none}
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
  style,
}: {
  image: LandingImage;
  className?: string;
  eager?: boolean;
  sizes?: string;
  style?: React.CSSProperties;
}) => (
  <img
    src={image.src}
    srcSet={image.srcSet}
    sizes={sizes}
    alt={image.alt}
    width={image.width}
    height={image.height}
    className={className}
    style={style}
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

/** Underline the place name in the H1 with a gold highlighter stroke; text content is unchanged. */
const highlightH1 = (text: string): ReactNode => {
  const match = text.match(/Western NC/);
  if (!match || match.index === undefined) return text;
  return (
    <>
      {text.slice(0, match.index)}
      <span className="lp-hl">{match[0]}</span>
      {text.slice(match.index + match[0].length)}
    </>
  );
};

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
  const heroSection = useRef<HTMLElement>(null);
  const progressBar = useRef<HTMLDivElement>(null);
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
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled((current) => (current === y > 8 ? current : y > 8));
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressBar.current && max > 0) progressBar.current.style.transform = `scaleX(${Math.min(1, y / max)})`;
      if (!reduce && heroSection.current) {
        const h = heroSection.current.offsetHeight || 1;
        heroSection.current.style.setProperty("--lp-py", String(Math.max(0, Math.min(1, y / h))));
      }
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
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
      <Mountain aria-hidden="true" className="h-4 w-4 text-[hsl(var(--highland-gold))]" strokeWidth={2.2} />
      <span aria-hidden="true" className="h-px w-6 bg-current opacity-60" />
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
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-transparent">
          <div ref={progressBar} className="h-full origin-left bg-[hsl(var(--highland-gold))]" style={{ transform: "scaleX(0)", transition: "transform .12s linear" }} />
        </div>
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
        {/* ───────────── Hero: full-bleed photography ───────────── */}
        <section ref={heroSection} className="relative isolate overflow-hidden bg-[hsl(var(--dark-section))] text-white !py-0">
          <div aria-hidden="true" className="lp-par-near absolute inset-0 -z-10">
            <Img
              image={{ ...hero.backdrop, alt: "" }}
              eager
              sizes="100vw"
              className="lp-kb absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: hero.position ?? "50% 50%" }}
            />
            {hero.secondary && (
              <div className="absolute inset-0 [clip-path:polygon(46%_0,100%_0,100%_100%,58%_100%)] max-md:hidden">
                <Img
                  image={{ ...hero.secondary, alt: "" }}
                  eager
                  sizes="60vw"
                  className="lp-kb absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: hero.secondaryPosition ?? "50% 50%" }}
                />
              </div>
            )}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(160_45%_6%/0.86)_0%,hsl(160_45%_6%/0.62)_36%,hsl(160_45%_6%/0.12)_70%,hsl(160_45%_6%/0)_100%)] max-lg:bg-[linear-gradient(180deg,hsl(160_45%_6%/0.82)_0%,hsl(160_45%_6%/0.6)_55%,hsl(160_45%_6%/0.42)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[hsl(160_45%_5%/0.7)] to-transparent" />
          </div>
          <div className="relative mx-auto grid max-w-[1200px] gap-9 px-4 py-10 sm:px-5 md:px-8 md:py-16 lg:min-h-[720px] lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-14 lg:py-20">
            <div className="order-1">
              <Reveal>
                {eyebrow(config.eyebrow, true)}
                <h1 className="max-w-3xl font-heading text-[2.25rem] font-bold leading-[1.04] tracking-tight text-white [text-shadow:0_2px_24px_hsl(160_45%_4%/0.5)] sm:text-5xl lg:text-[3.6rem]">
                  {highlightH1(config.h1)}
                </h1>
                <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-white/90 md:text-lg">{config.support}</p>
                <p className="mt-5 inline-flex flex-wrap gap-2 font-semibold">
                  {config.serviceLine
                    .split(".")
                    .map((part) => part.trim())
                    .filter(Boolean)
                    .map((part) => (
                      <span key={part} className="rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 text-sm text-white backdrop-blur-sm">
                        {part}
                      </span>
                    ))}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white">
                  <span className="inline-flex items-center gap-2 font-semibold">
                    <Stars />
                    {REVIEW_RATING}/5 on Google
                  </span>
                  <span aria-hidden="true" className="text-white/40">|</span>
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <MapPin className="h-4 w-4 text-[hsl(var(--highland-gold))]" aria-hidden="true" />
                    Based in Franklin, NC
                  </span>
                </div>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {primaryCta("lp-shine")}
                  {callLink(
                    `Call ${PHONE_DISPLAY}`,
                    `lp_${config.key}_hero`,
                    "btn btn-md min-h-14 whitespace-nowrap border-2 border-white/70 bg-white/5 text-white backdrop-blur-sm hover:bg-white hover:text-foreground",
                    `Call Highlander at ${PHONE_DISPLAY}`,
                  )}
                </div>
              </Reveal>
            </div>

            <div ref={heroFormWrap} data-main-form className="order-2">
              <div id="estimate-form" className="lg:sticky lg:top-28">
                <LeadForm instance="hero" />
              </div>
            </div>
          </div>
        </section>

        {/* ───────────── Trust band ───────────── */}
        <section aria-label="Why homeowners start here" className="relative bg-primary text-primary-foreground !py-0">
          <div aria-hidden="true" className="lp-tartan h-1 w-full" />
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
              <ShieldCheck className="h-4 w-4 text-[hsl(var(--highland-gold))]" aria-hidden="true" />
              Licensed and insured
            </li>
          </ul>
        </section>

        {/* ───────────── Aerial photo band ───────────── */}
        {config.strip && (
          <section aria-label="Roofs on Western North Carolina homes" className="bg-[hsl(var(--dark-section))] text-white !py-0">
            <div className="mx-auto max-w-[1200px] px-4 pb-3 pt-10 sm:px-5 md:px-8 md:pt-14">
              <Reveal>
                <p className="max-w-3xl font-heading text-2xl font-bold leading-snug !text-white md:text-3xl">{config.strip.heading}</p>
              </Reveal>
            </div>
            <ul className="lp-strip flex snap-x snap-mandatory gap-1 overflow-x-auto px-0 pb-0 pt-4 md:grid md:grid-cols-4 md:overflow-visible">
              {config.strip.items.map((item) => (
                <li key={item.label} className="group relative w-[78vw] shrink-0 snap-center overflow-hidden md:w-auto">
                  <Img image={item.image} sizes="(min-width:768px) 25vw, 78vw" style={{ objectPosition: item.position ?? "50% 50%" }} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.06] md:aspect-[3/4]" />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[hsl(160_45%_5%/0.78)] via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] !text-white">
                    <span aria-hidden="true" className="h-px w-6 bg-[hsl(var(--highland-gold))]" />
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

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

        {/* ───────────── The team ───────────── */}
        <section aria-label="The Highlander team" className="bg-[hsl(var(--dark-section))] text-white !py-0">
          <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-5 md:px-8 md:py-16">
            <Reveal className="mb-7 max-w-2xl">
              {eyebrow("The team", true)}
              <h2 className="font-heading text-3xl font-bold leading-tight !text-white md:text-4xl">Real people, based in Franklin.</h2>
              <p className="mt-3 text-base leading-relaxed text-white/80">Roofing, construction and design under one roof at {FRANKLIN_NAP}.</p>
            </Reveal>
            <Reveal delay={80}>
              <figure className="overflow-hidden rounded-sm border border-white/15 shadow-[0_30px_70px_-30px_hsl(0_0%_0%/0.7)]">
                <img
                  src={teamPhoto}
                  srcSet={teamPhotoSet}
                  sizes="(min-width:1200px) 1136px, 100vw"
                  alt="The Highlander Building Services team gathered in front of a Blue Ridge mountain view"
                  width={1440}
                  height={603}
                  className="h-auto w-full"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
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
        <section className="relative isolate overflow-hidden bg-[hsl(var(--dark-section))] text-primary-foreground !py-0">
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <Img
              image={{ ...config.finalBackdrop.image, alt: "" }}
              sizes="100vw"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: config.finalBackdrop.position ?? "50% 50%" }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(160_45%_6%/0.82)_0%,hsl(160_45%_6%/0.58)_50%,hsl(160_45%_6%/0.4)_100%)]" />
          </div>
          <div aria-hidden="true" className="lp-tartan h-1 w-full" />
          <div className="relative z-[2] mx-auto grid max-w-[1200px] gap-10 px-4 py-16 sm:px-5 md:px-8 md:py-24 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
            <Reveal>
              <h2 className="font-heading text-3xl font-bold leading-tight [text-shadow:0_2px_24px_hsl(160_45%_4%/0.5)] md:text-5xl">{config.finalHeading}</h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-primary-foreground/90">{config.finalBody}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                {callLink(`Call ${PHONE_DISPLAY}`, `lp_${config.key}_final`, "btn btn-primary lp-shine btn-lg min-h-14", `Call Highlander at ${PHONE_DISPLAY}`)}
                <button
                  type="button"
                  onClick={scrollToNearestForm}
                  className="btn btn-lg min-h-14 border-2 border-white/70 bg-white/5 text-primary-foreground backdrop-blur-sm hover:bg-white hover:text-foreground lg:hidden"
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

      {/* ───────────── Footer: complete, but no site navigation ───────────── */}
      <footer ref={footerRef} className="relative bg-[hsl(var(--dark-section))] text-[hsl(var(--dark-section-foreground))]">
        <div aria-hidden="true" className="lp-tartan h-1.5 w-full" />
        <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-12 sm:px-5 md:grid-cols-[1.3fr_1fr_1fr] md:px-8 md:py-16">
          <div>
            <span className="inline-block rounded-sm bg-background px-4 py-2.5 shadow-lg">
              <img src={logo} alt="Highlander Building Services" width={176} height={54} className="h-10 w-auto" loading="lazy" decoding="async" />
            </span>
            <p className="mt-5 max-w-sm font-heading text-xl leading-snug text-[hsl(var(--dark-section-foreground))]">
              Roofing and construction for Western North Carolina homes.
            </p>
            <p className="mt-3 inline-flex items-center gap-2 text-sm text-[hsl(var(--dark-section-muted))]">
              <Stars />
              <span>{REVIEW_RATING}/5 on Google</span>
            </p>
          </div>

          <address className="not-italic">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--highland-gold))]">Franklin showroom</h2>
            <div className="mt-4 space-y-2 text-[0.95rem] leading-relaxed text-[hsl(var(--dark-section-muted))]">
              <div className="font-semibold text-[hsl(var(--dark-section-foreground))]">{BUSINESS.legalName}</div>
              <div className="flex gap-2"><MapPin className="mt-1 h-4 w-4 shrink-0 text-[hsl(var(--highland-gold))]" aria-hidden="true" />{FRANKLIN_NAP}</div>
              <div className="flex gap-2"><Clock className="mt-1 h-4 w-4 shrink-0 text-[hsl(var(--highland-gold))]" aria-hidden="true" />{PRIMARY_HOURS_LABEL}, Eastern Time</div>
            </div>
          </address>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--highland-gold))]">Talk to the team</h2>
            <a
              href={PHONE_TEL}
              onClick={() => trackCall(`lp_${config.key}_footer`)}
              className="mt-4 inline-flex min-h-12 items-center gap-2.5 rounded-sm bg-[hsl(var(--highland-gold))] px-5 font-bold text-foreground shadow-lg transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--highland-gold))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--dark-section))]"
              aria-label={`Call Highlander at ${PHONE_DISPLAY}`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>
            <p className="mt-4 flex gap-2 text-sm leading-relaxed text-[hsl(var(--dark-section-muted))]">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--highland-gold))]" aria-hidden="true" />
              North Carolina licensed general contractor, {BUSINESS.licenseNumber.replace(/^NC GC\s*/, "license ")}
            </p>
          </div>
        </div>
        <div className="border-t border-[hsl(var(--dark-section-border))]">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-4 py-5 pb-28 text-sm text-[hsl(var(--dark-section-muted))] sm:px-5 md:flex-row md:items-center md:justify-between md:px-8 xl:pb-32">
            <span>© {new Date().getFullYear()} {BUSINESS.legalName} All rights reserved.</span>
            <span className="flex flex-wrap gap-x-6 gap-y-1">
              <a href="/privacy-policy" target="_blank" rel="noopener" className="min-h-11 content-center underline underline-offset-4 hover:text-[hsl(var(--dark-section-foreground))]">
                Privacy policy
              </a>
              <a href="/accessibility" target="_blank" rel="noopener" className="min-h-11 content-center underline underline-offset-4 hover:text-[hsl(var(--dark-section-foreground))]">
                Accessibility
              </a>
              <button type="button" onClick={openConsentPreferences} className="min-h-11 underline underline-offset-4 hover:text-[hsl(var(--dark-section-foreground))]">
                Cookie preferences
              </button>
            </span>
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
