import { Link } from "react-router-dom";
import { GOOGLE_REVIEW_AGGREGATE } from "@/data/reviews";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Award, Clock, HardHat, Home, Mountain, Phone, Ruler } from "lucide-react";
import heroImage from "@/assets/hero-roofing.webp";
import heroLayer2 from "@/assets/gallery/metal-010.webp";
import heroLayer3 from "@/assets/gallery/asphalt-hero.webp";
import heroImageAvif from "@/assets/hero-roofing.webp?format=avif";
import heroImageAvifSet from "@/assets/hero-roofing.webp?w=640;1024;1600&format=avif&as=srcset";
import heroImageWebpSet from "@/assets/hero-roofing.webp?w=640;1024;1600&format=webp&as=srcset";
import heroLayer2Avif from "@/assets/gallery/metal-010.webp?format=avif";
import heroLayer3Avif from "@/assets/gallery/asphalt-hero.webp?format=avif";
import veluxLogo from "@/assets/logo-velux.png";
import HeroPicture from "@/components/media/HeroPicture";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useExperiment } from "@/hooks/use-experiment";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DRAMATIC_EASE = [0.16, 1, 0.3, 1] as any;

const trustItems = [
  { icon: Shield, label: "Licensed & Insured" },
  { icon: Award, label: "CertainTeed ShingleMaster Credentialed Contractor" },
  { icon: HardHat, label: "Licensed General Contractor" },
  { icon: Clock, label: "WNC · Since 2017" },
];

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  // Sequential test 1: outcome-first vs. current hero CTA copy.
  const heroCta = useExperiment("home_hero_cta");
  const [layer, setLayer] = useState(0);
  // Only the LCP image is in the DOM on first paint. The two cross-fade
  // layers mount after load so they never compete for bandwidth with the LCP.
  const [extraLayersReady, setExtraLayersReady] = useState(false);

  useEffect(() => {
    const mount = () => setExtraLayersReady(true);
    const id = window.setTimeout(mount, 2500);
    window.addEventListener("load", mount, { once: true });
    return () => window.clearTimeout(id);
  }, []);

  // Layered still imagery — slow cinematic cross-fade across 3 real WNC roof photos.
  // 9s per layer, ease handled by CSS transition.
  useEffect(() => {
    const id = window.setInterval(() => setLayer((l) => (l + 1) % 3), 9000);
    return () => window.clearInterval(id);
  }, []);

  const layers = [heroImage, heroLayer2, heroLayer3];
  const layersAvif = [heroImageAvif, heroLayer2Avif, heroLayer3Avif];
  const layerAlts = [
    "Premium mountain home roof in Western North Carolina",
    "Standing seam metal roof on a WNC residence",
    "Premium dimensional asphalt roof on a Highlands-area home",
  ];

  return (
    <section ref={ref} className="dark-surface relative min-h-[100svh] flex flex-col overflow-hidden">
      {/* === BACKGROUND — static, no parallax for smooth scroll === */}
      <div className="absolute inset-0">
        {/* Layered still imagery — premium cross-fade with continuous Ken-Burns drift.
            No video. All real WNC roof photography. */}
        {layers.map((src, i) => (i > 0 && !extraLayersReady ? null : (
          <HeroPicture
            key={src}
            src={src}
            avif={layersAvif[i]}
            alt={layerAlts[i]}
            width={1600}
            height={1067}
            priority={i === 0}
            avifSrcSet={i === 0 ? heroImageAvifSet : undefined}
            webpSrcSet={i === 0 ? heroImageWebpSet : undefined}
            className="absolute inset-0 w-full h-full object-cover object-[58%_18%] md:object-center"
            style={{
              opacity: layer === i ? 1 : 0,
              transition: "opacity 1800ms cubic-bezier(0.22, 1, 0.36, 1)",
              transform: "translateZ(0)",
            }}
          />
        )))}

        {/* Scrim tokens — side scrim behind left-anchored copy, hero scrim for headline legibility */}
        <div aria-hidden="true" className="absolute inset-0 bg-scrim-side opacity-50 md:opacity-35" />
        <div aria-hidden="true" className="absolute inset-0 md:hidden bg-scrim-hero" />
        <div aria-hidden="true" className="absolute inset-0 hidden md:block bg-scrim-hero opacity-40" />

        {/* Warm highlight wash — top-right, like golden hour light */}
        <div
          className="absolute inset-0 mix-blend-soft-light opacity-[0.08]"
          style={{
            background: "radial-gradient(ellipse 50% 50% at 80% 20%, hsl(var(--highland-gold)), transparent)",
          }}
        />

        {/* Grain texture */}
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />
      </div>

      {/* === LAYER INDICATOR — tiny premium ticks bottom-right of hero === */}
      <div className="absolute right-6 md:right-10 lg:right-20 bottom-32 md:bottom-36 z-20 hidden sm:flex items-center gap-1.5">
        {layers.map((_, i) => (
          <button
            key={i}
            onClick={() => setLayer(i)}
            aria-label={`Show hero image ${i + 1}`}
            className="h-px transition-all duration-500"
            style={{
              width: layer === i ? 28 : 14,
              background: layer === i ? "hsl(var(--highland-gold))" : "hsl(var(--highland-gold) / 0.25)",
            }}
          />
        ))}
      </div>

      {/* === GOLD VERTICAL ACCENT — left edge === */}
      <motion.div
        className="absolute left-0 top-0 w-[1.5px] z-20"
        style={{ background: 'linear-gradient(to bottom, hsl(var(--highland-gold) / 0.6), hsl(var(--highland-gold) / 0))' }}
        initial={{ height: "0%" }}
        animate={{ height: "65%" }}
        transition={{ duration: 4, delay: 0.5, ease: DRAMATIC_EASE }}
      />

      {/* === DESIGN PRECISION LINES — desktop only === */}
      <div className="absolute inset-0 hidden lg:block pointer-events-none z-[1]">
        {/* Thirds grid */}
        {[33.33, 66.66].map((pct, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary-foreground/[0.02] to-transparent"
            style={{ left: `${pct}%` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 + i * 0.3, duration: 2 }}
          />
        ))}

        {/* Horizontal datum at golden ratio */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.04)] to-transparent"
          style={{ top: "61.8%" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 3, duration: 2.5, ease: DRAMATIC_EASE }}
        />
      </div>

      {/* === RIGHT EDGE — Elevation indicator === */}
      <div className="absolute right-0 top-0 bottom-0 hidden xl:flex flex-col items-center justify-center z-10 pr-10">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.4, duration: 0.8, ease: HIGHLAND_EASE }}
          className="flex flex-col items-center gap-5"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-px h-20 bg-gradient-to-b from-transparent to-primary-foreground/15" />
            <div className="w-7 h-7 rounded-none border border-primary-foreground/10 flex items-center justify-center">
              <Home className="w-3 h-3 text-primary-foreground/90" />
            </div>
            <span className="text-caption md:text-caption font-body font-bold uppercase tracking-[0.3em] text-primary-foreground/90 [writing-mode:vertical-lr] rotate-180">
              Roofing
            </span>
          </div>
          <div className="w-5 h-px bg-[hsl(var(--highland-gold)/0.3)]" />
          <div className="flex flex-col items-center gap-2">
            <span className="text-caption md:text-caption font-body font-bold uppercase tracking-[0.3em] text-primary-foreground/90 [writing-mode:vertical-lr] rotate-180">
              Construction
            </span>
            <div className="w-7 h-7 rounded-none border border-[hsl(var(--highland-gold)/0.12)] flex items-center justify-center">
              <HardHat className="w-3 h-3 text-[hsl(var(--highland-gold)/0.75)]" />
            </div>
            <div className="w-px h-20 bg-gradient-to-b from-primary-foreground/15 to-transparent" />
          </div>
        </motion.div>
      </div>

      {/* === MAIN CONTENT === */}
      <div className="relative z-10 flex-1 flex items-end w-full">
        <div className="w-full px-5 md:px-10 lg:px-20 pb-24 md:pb-44 hero-clears-header">
          <div className="max-w-3xl">
            {/* Eyebrow — authority credential line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden md:flex items-center gap-2 md:gap-4 mb-3 md:mb-10"
            >
              <motion.div
                className="h-px"
                style={{ background: 'hsl(var(--highland-gold))' }}
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ duration: 1.2, delay: 0.5 }}
              />
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 bg-black/50 backdrop-blur-md border border-[hsl(var(--highland-gold)/0.3)] rounded-sm"
              >
                <Mountain className="w-2.5 h-2.5 md:w-3 md:h-3 text-[hsl(var(--highland-gold)/0.85)]" />
                <span className="text-caption md:text-body-sm font-body font-bold uppercase tracking-[0.16em] md:tracking-[0.3em] text-[hsl(var(--gold-ink))]">
                   Western North Carolina · Since 2017
                 </span>
              </motion.div>
            </motion.div>

            {/* Headline — single H1 revealed as three cinematic lines */}
            <h1 className="mb-3 md:mb-12">
              <span className="sr-only">
                Roofing &amp; Construction Built for Western NC Mountain Homes
              </span>
              <span aria-hidden="true" className="block">
                <span className="block overflow-hidden mb-0.5 md:mb-2 pb-[0.2em] md:pb-[0.35em]">
                  <motion.span
                    initial={{ y: "120%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.1, delay: 0.5, ease: DRAMATIC_EASE }}
                    className="block text-heading-sm leading-[1.08] md:text-display lg:text-display xl:text-display font-heading font-bold text-primary-foreground tracking-[-0.03em]"
                  >
                    Roofing &amp; Construction
                  </motion.span>
                </span>
                <span className="block overflow-hidden mb-0.5 md:mb-2 pb-[0.2em] md:pb-[0.35em]">
                  <motion.span
                    initial={{ y: "120%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.1, delay: 0.65, ease: DRAMATIC_EASE }}
                    className="block text-heading-sm leading-[1.08] md:text-display lg:text-display xl:text-display font-heading font-bold text-primary-foreground tracking-[-0.03em]"
                  >
                    Built for Western NC
                  </motion.span>
                </span>
                <span className="block overflow-hidden pb-[0.15em] md:pb-[0.4em]">
                  <motion.span
                    initial={{ y: "120%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.1, delay: 0.8, ease: DRAMATIC_EASE }}
                    className="block text-heading-sm leading-[1.08] md:text-display lg:text-display xl:text-display font-heading font-bold tracking-[-0.03em] text-[hsl(var(--gold-ink))]"
                  >
                    Mountain Homes.
                  </motion.span>
                </span>
              </span>
            </h1>


            {/* Subtext — refined positioning statement */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="text-body-xs md:text-body-lg text-white/95 max-w-2xl mb-4 md:mb-16 leading-[1.5] md:leading-[1.6] font-body font-medium md:font-bold drop-shadow-lg"
            >
              <span className="md:hidden">Roof repair, replacement, and custom builds for mountain homes in Franklin, Highlands, Cashiers and Sylva.</span>
              <span className="hidden md:inline">Leaking roof, storm damage, a roof near the end of its life, or an addition you&apos;re planning — tell us what&apos;s going on at your home in Franklin, Highlands, Cashiers, Sylva or anywhere in Western North Carolina. A local Highlander advisor reviews it, schedules an on-site look, and gives you a written scope and price before any work starts.</span>
              <span className="hidden md:block mt-2 md:mt-6 text-[hsl(var(--gold-ink))] font-bold text-caption md:text-2xl uppercase tracking-[0.08em] md:tracking-normal md:normal-case drop-shadow-md">Licensed · Insured · CertainTeed ShingleMaster</span>
            </motion.p>


            {/* CTA Group — premium dual-action */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.35 }}
              className="flex flex-col sm:flex-row gap-2.5 sm:gap-6"
            >
              <Link
                to="/consultation"
                data-gtm-experiment="home_hero_cta"
                data-gtm-variant={heroCta.variant}
                className="btn btn-primary btn-lg group md:text-base md:px-14 md:py-5 relative md:tracking-[0.1em] md:min-h-[60px] whitespace-nowrap"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">
                  {heroCta.pick("Request an Estimate", "See What My Roof Needs")}
                </span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 relative group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <a
                href="tel:+18285247773"
                aria-label="Call Highlander Building Services at 828-524-7773"
                className="btn btn-secondary btn-lg btn-on-dark group md:border-2 md:text-base md:px-12 md:py-5 md:min-h-[60px] whitespace-nowrap"
              >
                <Phone className="w-4 h-4 md:w-5 md:h-5 text-[hsl(var(--gold-ink))]" />
                <span className="md:hidden">Call · (828) 524-7773</span>
                <span className="hidden md:inline">Call Highlander · (828) 524-7773</span>
              </a>
            </motion.div>

            {/* Micro proof — appears subtly after CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="mt-4 md:mt-9 flex items-center flex-wrap gap-x-3 gap-y-2 md:gap-7"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-[hsl(var(--gold-ink))] font-heading font-bold text-base md:text-3xl leading-none">{GOOGLE_REVIEW_AGGREGATE.ratingValue}★</span>
                <span className="text-primary-foreground/90 text-caption md:text-base font-body font-semibold md:font-bold uppercase tracking-[0.12em] md:tracking-wider">Google · {GOOGLE_REVIEW_AGGREGATE.reviewCount}+ Reviews</span>
              </div>
              <div className="w-px h-3.5 md:h-6 bg-primary-foreground/30" />
              <span className="text-primary-foreground/90 text-caption md:text-base font-body font-semibold md:font-bold uppercase tracking-[0.12em] md:tracking-wider">Licensed &amp; Insured</span>
              <div className="w-px h-6 bg-primary-foreground/40 hidden md:block" />
              <span className="text-primary-foreground text-body-sm md:text-base font-body font-bold uppercase tracking-wider hidden md:inline">Crews Based in Franklin, NC</span>
            </motion.div>

            {/* VELUX Certified Installer badge — desktop only; keeps mobile hero clean */}
            <motion.a
              href="/certifications"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="mt-4 md:mt-6 hidden md:inline-flex items-center gap-2.5 md:gap-3 bg-white/[0.04] backdrop-blur-sm border border-[hsl(var(--highland-gold)/0.25)] pl-1.5 md:pl-2 pr-3 md:pr-4 py-1.5 md:py-2 rounded-none hover:bg-white/[0.08] hover:border-[hsl(var(--highland-gold)/0.5)] transition-all duration-300 group"
            >
              <div className="w-11 h-11 md:w-16 md:h-16 flex items-center justify-center flex-shrink-0 overflow-hidden bg-white shadow-flat border border-white/10">
                <img loading="lazy" decoding="async" src={veluxLogo} alt="VELUX Certified Installer" className="w-full h-full object-contain p-1.5 md:p-2" />
              </div>
              <div className="flex flex-col leading-tight text-left">
                <span className="text-caption md:text-caption font-body font-semibold uppercase tracking-[0.16em] md:tracking-[0.18em] text-[hsl(var(--gold-ink))]">
                  VELUX Certified
                </span>
                <span className="text-caption md:text-body-xs font-body font-medium text-primary-foreground/95">
                  Skylight Installer · Pro Accredited
                </span>
              </div>
            </motion.a>
          </div>
        </div>
      </div>

      {/* === BOTTOM AUTHORITY BAR === */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8, ease: HIGHLAND_EASE }}
        className="absolute bottom-0 left-0 right-0 z-20 hidden sm:block"
      >
        {/* Top gold line */}
        <motion.div
          className="h-px w-full"
          style={{ background: 'linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.35), hsl(var(--highland-gold) / 0))' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.2, duration: 1.5, ease: DRAMATIC_EASE }}
        />

        <div className="bg-[hsl(var(--hero-overlay)/0.9)] backdrop-blur-xl border-t border-primary-foreground/[0.03]">
          <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-20 py-4 md:py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
              {/* Trust badges */}
              <div className="hidden sm:flex sm:flex-wrap gap-x-5 gap-y-2.5 md:gap-x-8">
                {trustItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 2.2 + i * 0.1 }}
                    className="flex items-center gap-2 text-primary-foreground/95 text-body-xs md:text-base"
                  >
                    <item.icon className="w-3 md:w-3.5 h-3 md:h-3.5 text-[hsl(var(--highland-gold)/0.85)] flex-shrink-0" />
                    <span className="font-body font-medium leading-tight">{item.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Three division indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.6, duration: 0.6 }}
                className="hidden md:flex items-center gap-3"
              >
                <div className="flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-[hsl(var(--gold-ink))]" />
                  <span className="text-caption font-body font-bold uppercase tracking-[0.18em] text-primary-foreground">Roofing</span>
                </div>
                <div className="w-3 h-px bg-[hsl(var(--highland-gold)/0.7)]" />
                <div className="flex items-center gap-1.5">
                  <HardHat className="w-3.5 h-3.5 text-[hsl(var(--gold-ink))]" />
                  <span className="text-caption font-body font-bold uppercase tracking-[0.18em] text-primary-foreground">Construction</span>
                </div>
                <div className="w-3 h-px bg-[hsl(var(--highland-gold)/0.7)]" />
                <div className="flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-[hsl(var(--gold-ink))]" />
                  <span className="text-caption font-body font-bold uppercase tracking-[0.18em] text-primary-foreground">Design</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;