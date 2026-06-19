import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Award, Clock, HardHat, Home, Mountain, Phone, Ruler } from "lucide-react";
import heroImage from "@/assets/hero-roofing.jpg";
import heroLayer2 from "@/assets/gallery/metal-009.jpg";
import heroLayer3 from "@/assets/gallery/asphalt-hero.webp";
import veluxLogo from "@/assets/logo-velux.png";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DRAMATIC_EASE = [0.16, 1, 0.3, 1] as any;

const trustItems = [
  { icon: Shield, label: "Licensed & Insured" },
  { icon: Award, label: "CertainTeed Master Applicator" },
  { icon: HardHat, label: "Licensed General Contractor" },
  { icon: Clock, label: "WNC · Since 2017" },
];

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const [layer, setLayer] = useState(0);

  // Layered still imagery — slow cinematic cross-fade across 3 real WNC roof photos.
  // 9s per layer, ease handled by CSS transition.
  useEffect(() => {
    const id = window.setInterval(() => setLayer((l) => (l + 1) % 3), 9000);
    return () => window.clearInterval(id);
  }, []);

  const layers = [heroImage, heroLayer2, heroLayer3];
  const layerAlts = [
    "Premium mountain home roof in Western North Carolina",
    "Standing seam metal roof on a WNC residence",
    "Premium dimensional asphalt roof on a Highlands-area home",
  ];

  return (
    <section ref={ref} className="relative min-h-[100svh] flex flex-col overflow-hidden">
      {/* === BACKGROUND — static, no parallax for smooth scroll === */}
      <div className="absolute inset-0">
        {/* Layered still imagery — premium cross-fade with continuous Ken-Burns drift.
            No video. All real WNC roof photography. */}
        {layers.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={layerAlts[i]}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "low"}
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: layer === i ? 1 : 0,
              transition: "opacity 1800ms cubic-bezier(0.22, 1, 0.36, 1)",
              transform: "translateZ(0)",
            }}
          />
        ))}

        {/* Multi-layer cinematic grading — lightened significantly for clarity */}
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.2)] via-[hsl(var(--hero-overlay)/0.05)] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.12)] via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.15)] to-transparent" />

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
            <span className="text-[10px] md:text-[11px] font-body font-bold uppercase tracking-[0.3em] text-primary-foreground/90 [writing-mode:vertical-lr] rotate-180">
              Roofing
            </span>
          </div>
          <div className="w-5 h-px bg-[hsl(var(--highland-gold)/0.3)]" />
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] md:text-[11px] font-body font-bold uppercase tracking-[0.3em] text-primary-foreground/90 [writing-mode:vertical-lr] rotate-180">
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
      <div className="relative z-10 flex-1 flex items-start md:items-end w-full">
        <div className="w-full px-6 md:px-10 lg:px-20 pb-20 md:pb-44 hero-clears-header">
          <div className="max-w-3xl">
            {/* Eyebrow — authority credential line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10"
            >
              <motion.div
                className="h-px"
                style={{ background: 'hsl(var(--highland-gold))' }}
                initial={{ width: 0 }}
                animate={{ width: 56 }}
                transition={{ duration: 1.2, delay: 0.5 }}
              />
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex items-center gap-2"
              >
                <Mountain className="w-3 h-3 text-[hsl(var(--highland-gold)/0.6)]" />
                <span className="text-[14px] md:text-[16px] font-body font-bold uppercase tracking-[0.22em] md:tracking-[0.3em] text-[hsl(var(--highland-gold))] drop-shadow-sm">
                   Western North Carolina · Since 2017
                 </span>
              </motion.div>
            </motion.div>

            {/* Headline — cinematic three-line reveal */}
            <div className="overflow-hidden mb-1 md:mb-2 pb-[0.35em]">
              <motion.h1
                initial={{ y: "120%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.5, ease: DRAMATIC_EASE }}
                className="text-[2.6rem] leading-[1.15] md:text-[3.8rem] lg:text-[4.8rem] xl:text-[5.8rem] font-heading font-bold text-primary-foreground tracking-[-0.035em]"
              >
                High-Elevation,
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-1 md:mb-2 pb-[0.35em]">
              <motion.h1
                initial={{ y: "120%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.65, ease: DRAMATIC_EASE }}
                className="text-[2.6rem] leading-[1.15] md:text-[3.8rem] lg:text-[4.8rem] xl:text-[5.8rem] font-heading font-bold text-primary-foreground tracking-[-0.035em]"
              >
                Built for the Peaks.
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8 md:mb-12 pb-[0.4em]">
              <motion.h1
                initial={{ y: "120%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.8, ease: DRAMATIC_EASE }}
                className="text-[2.6rem] leading-[1.15] md:text-[3.8rem] lg:text-[4.8rem] xl:text-[5.8rem] font-heading font-bold tracking-[-0.035em]"
              >
                <span className="text-[hsl(var(--highland-gold))]">Roofing, Construction &amp; Design</span>
                <span className="text-primary-foreground">.</span>
              </motion.h1>
            </div>


            {/* Subtext — refined positioning statement */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="text-[19px] md:text-[24px] text-white max-w-2xl mb-12 md:mb-16 leading-[1.6] font-body font-bold drop-shadow-lg"
            >
              Trusted roofing, repairs, construction, gutters, and outdoor living for Franklin, Highlands, Cashiers, Sylva, and Western North Carolina. Family-owned, locally run, and built for the mountains by a team of WNC craftspeople.
              <span className="block mt-6 text-[hsl(var(--highland-gold))] font-extrabold text-xl md:text-2xl drop-shadow-md">Licensed, Insured and CertainTeed ShingleMaster Credentialed Contractor.</span>
            </motion.p>


            {/* CTA Group — premium dual-action */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.35 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6"
            >
              <Link
                to="/consultation"
                className="group cta-gradient cta-glow text-accent-foreground font-body font-bold text-[15px] md:text-base px-10 md:px-14 py-4 md:py-5 rounded-none inline-flex items-center justify-center gap-3 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden tracking-[0.1em] uppercase shadow-xl min-h-[60px]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">Request a Free Estimate</span>
                <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <a
                href="tel:+18285247773"
                aria-label="Call Highlander Roofing & Construction at 828-524-7773"
                className="group bg-white/[0.08] backdrop-blur-md border-2 border-white/[0.15] text-primary-foreground font-body font-bold text-[15px] md:text-base px-8 md:px-12 py-4 md:py-5 rounded-none inline-flex items-center justify-center gap-3 hover:bg-white/[0.12] hover:border-white/[0.25] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 min-h-[60px] tracking-wide uppercase"
              >
                <Phone className="w-5 h-5 text-[hsl(var(--highland-gold))]" />
                <span>Call Highlander · (828) 524-7773</span>
              </a>
            </motion.div>

            {/* Micro proof — appears subtly after CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="mt-7 md:mt-9 flex items-center gap-5 md:gap-7"
            >
              <div className="flex items-center gap-2">
                <span className="text-[hsl(var(--highland-gold))] font-heading font-bold text-2xl md:text-3xl">4.9★</span>
                <span className="text-primary-foreground text-[15px] md:text-base font-body font-bold uppercase tracking-wider">Google Rating</span>
              </div>
              <div className="w-px h-6 bg-primary-foreground/40" />
              <span className="text-primary-foreground text-[15px] md:text-base font-body font-bold uppercase tracking-wider">150+ Verified Reviews</span>
              <div className="w-px h-6 bg-primary-foreground/40 hidden md:block" />
              <span className="text-primary-foreground text-[15px] md:text-base font-body font-bold uppercase tracking-wider hidden md:inline">Rapid Response Guarantee</span>
            </motion.div>

            {/* VELUX Certified Installer badge */}
            <motion.a
              href="/certifications"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="mt-6 inline-flex items-center gap-3 bg-white/[0.04] backdrop-blur-sm border border-[hsl(var(--highland-gold)/0.25)] pl-2 pr-4 py-2 rounded-none hover:bg-white/[0.08] hover:border-[hsl(var(--highland-gold)/0.5)] transition-all duration-300 group"
            >
              <div className="w-16 h-16 flex items-center justify-center flex-shrink-0 overflow-hidden bg-white shadow-sm border border-white/10">
                <img src={veluxLogo} alt="VELUX Certified Installer" className="w-full h-full object-contain p-2" />
              </div>
              <div className="flex flex-col leading-tight text-left">
                <span className="text-[11px] font-body font-semibold uppercase tracking-[0.18em] text-[hsl(var(--highland-gold))]">
                  VELUX Certified
                </span>
                <span className="text-[13px] font-body font-medium text-primary-foreground/95">
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
        className="absolute bottom-0 left-0 right-0 z-20"
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
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-5 gap-y-2.5 md:gap-x-8">
                {trustItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 2.2 + i * 0.1 }}
                    className="flex items-center gap-2 text-primary-foreground/95 text-[13px] md:text-base"
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
                  <Home className="w-3.5 h-3.5 text-[hsl(var(--highland-gold))]" />
                  <span className="text-[11px] font-body font-bold uppercase tracking-[0.18em] text-primary-foreground">Roofing</span>
                </div>
                <div className="w-3 h-px bg-[hsl(var(--highland-gold)/0.7)]" />
                <div className="flex items-center gap-1.5">
                  <HardHat className="w-3.5 h-3.5 text-[hsl(var(--highland-gold))]" />
                  <span className="text-[11px] font-body font-bold uppercase tracking-[0.18em] text-primary-foreground">Construction</span>
                </div>
                <div className="w-3 h-px bg-[hsl(var(--highland-gold)/0.7)]" />
                <div className="flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-[hsl(var(--highland-gold))]" />
                  <span className="text-[11px] font-body font-bold uppercase tracking-[0.18em] text-primary-foreground">Design</span>
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
