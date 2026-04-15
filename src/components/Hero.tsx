import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Shield, Award, Clock, HardHat, Home, Mountain } from "lucide-react";
import heroImage from "@/assets/hero-roofing.jpg";
import heroVideo from "@/assets/hero-video.mp4";
import { useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DRAMATIC_EASE = [0.16, 1, 0.3, 1] as any;

const trustItems = [
  { icon: Shield, label: "Licensed & Insured" },
  { icon: Award, label: "CertainTeed Master Applicator" },
  { icon: HardHat, label: "Licensed General Contractor" },
  { icon: Clock, label: "24-Hour Response" },
];

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 60]);

  return (
    <section ref={ref} className="relative min-h-[100svh] flex flex-col overflow-hidden">
      {/* === BACKGROUND — Ken Burns parallax === */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <motion.img
          src={heroImage}
          alt="Mountain home with premium roof in Western North Carolina"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? "opacity-0" : "opacity-100"}`}
          loading="eager"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 14, ease: "linear" }}
        />
        <motion.video
          autoPlay muted loop playsInline preload="auto"
          // @ts-ignore
          webkit-playsinline="true"
          onCanPlay={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? "opacity-100" : "opacity-0"}`}
          ref={(el) => { if (el) el.play().catch(() => {}); }}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear" }}
        >
          <source src={heroVideo} type="video/mp4" />
        </motion.video>

        {/* Cinematic overlays — deeper, more dramatic */}
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.98)] via-[hsl(var(--hero-overlay)/0.92)] to-[hsl(var(--hero-overlay)/0.45)] md:to-[hsl(var(--hero-overlay)/0.15)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay))] via-[hsl(var(--hero-overlay)/0.03)] to-[hsl(var(--hero-overlay)/0.6)]" />
        <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[hsl(var(--hero-overlay))] to-transparent" />

        {/* Grain */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />
      </motion.div>

      {/* === GOLD VERTICAL ACCENT — left edge === */}
      <motion.div
        className="absolute left-0 top-0 w-[2px] z-20"
        style={{ background: 'linear-gradient(to bottom, hsl(var(--highland-gold)), hsl(var(--highland-gold) / 0))' }}
        initial={{ height: "0%" }}
        animate={{ height: "70%" }}
        transition={{ duration: 3.5, delay: 0.3, ease: DRAMATIC_EASE }}
      />

      {/* === ARCHITECTURAL GRID LINES — desktop only === */}
      <div className="absolute inset-0 hidden lg:block pointer-events-none z-[1]">
        <motion.div
          className="absolute left-[25%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary-foreground/[0.03] to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1.5 }}
        />
        <motion.div
          className="absolute left-[75%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary-foreground/[0.03] to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 1.5 }}
        />
        {/* Horizontal structural line */}
        <motion.div
          className="absolute top-[38%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-foreground/[0.02] to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 3, duration: 2, ease: DRAMATIC_EASE }}
        />
      </div>

      {/* === MOUNTAIN ELEVATION INDICATOR — right edge === */}
      <div className="absolute right-0 top-0 bottom-0 hidden xl:flex flex-col items-center justify-center z-10 pr-10">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.2, duration: 0.8, ease: HIGHLAND_EASE }}
          className="flex flex-col items-center gap-5"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-px h-20 bg-gradient-to-b from-transparent to-primary-foreground/15" />
            <div className="w-7 h-7 rounded-none border border-primary-foreground/10 flex items-center justify-center">
              <Home className="w-3 h-3 text-primary-foreground/25" />
            </div>
            <span className="text-[8px] font-body font-bold uppercase tracking-[0.3em] text-primary-foreground/20 [writing-mode:vertical-lr] rotate-180">
              Roofing
            </span>
          </div>
          <div className="w-5 h-px bg-[hsl(var(--highland-gold)/0.3)]" />
          <div className="flex flex-col items-center gap-2">
            <span className="text-[8px] font-body font-bold uppercase tracking-[0.3em] text-primary-foreground/20 [writing-mode:vertical-lr] rotate-180">
              Construction
            </span>
            <div className="w-7 h-7 rounded-none border border-[hsl(var(--highland-gold)/0.12)] flex items-center justify-center">
              <HardHat className="w-3 h-3 text-[hsl(var(--highland-gold)/0.3)]" />
            </div>
            <div className="w-px h-20 bg-gradient-to-b from-primary-foreground/15 to-transparent" />
          </div>
        </motion.div>
      </div>

      {/* === MAIN CONTENT === */}
      <motion.div
        className="relative z-10 flex-1 flex items-end w-full"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="w-full px-6 md:px-10 lg:px-20 pb-44 md:pb-40 pt-32 md:pt-48">
          <div className="max-w-3xl">
            {/* Eyebrow — authority credential line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center gap-3 md:gap-4 mb-5 md:mb-8"
            >
              <motion.div
                className="h-px"
                style={{ background: 'hsl(var(--highland-gold))' }}
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex items-center gap-2"
              >
                <Mountain className="w-3 h-3 text-[hsl(var(--highland-gold)/0.6)]" />
                <span className="text-[9px] md:text-[11px] font-body font-semibold uppercase tracking-[0.22em] md:tracking-[0.3em] text-[hsl(var(--highland-gold))]">
                  Western North Carolina · Since 2017
                </span>
              </motion.div>
            </motion.div>

            {/* Headline — three-line cinematic reveal with stronger copy */}
            <div className="overflow-hidden mb-1 md:mb-1.5">
              <motion.h1
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: DRAMATIC_EASE }}
                className="text-[2.5rem] leading-[1.02] md:text-[3.5rem] lg:text-[4.25rem] xl:text-[5rem] font-heading font-bold text-primary-foreground md:leading-[1.04] tracking-[-0.025em]"
              >
                Not Just a Roofer.
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-1 md:mb-1.5">
              <motion.h1
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.65, ease: DRAMATIC_EASE }}
                className="text-[2.5rem] leading-[1.02] md:text-[3.5rem] lg:text-[4.25rem] xl:text-[5rem] font-heading font-bold text-primary-foreground md:leading-[1.04] tracking-[-0.025em]"
              >
                Not Just a Contractor.
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-7 md:mb-10">
              <motion.h1
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: DRAMATIC_EASE }}
                className="text-[2.5rem] leading-[1.02] md:text-[3.5rem] lg:text-[4.25rem] xl:text-[5rem] font-heading font-bold md:leading-[1.04] tracking-[-0.025em]"
              >
                <span className="text-[hsl(var(--highland-gold))]">The Standard</span>
                <span className="text-primary-foreground">.</span>
              </motion.h1>
            </div>

            {/* Subtext — stronger positioning */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
              className="text-[14px] md:text-[17px] text-primary-foreground/40 max-w-xl mb-9 md:mb-12 leading-[1.75] font-body"
            >
              The only CertainTeed Master Applicator and licensed General Contractor
              in Western NC. Roofing, construction, and exterior work —
              under one company, one process, one warranty. 500+ projects. Zero shortcuts.
            </motion.p>

            {/* CTA Group — stronger primary action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link
                to="/consultation"
                className="group cta-gradient cta-glow text-accent-foreground font-heading font-bold text-[13px] md:text-[15px] px-8 md:px-10 py-[14px] md:py-[18px] rounded-none inline-flex items-center justify-center gap-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden tracking-wide min-h-[52px]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">Start Your Project</span>
                <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="group bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] text-primary-foreground font-medium text-[13px] md:text-[15px] px-8 md:px-10 py-[14px] md:py-[18px] rounded-none inline-flex items-center justify-center gap-2.5 hover:bg-white/[0.07] hover:border-white/[0.16] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 min-h-[52px]"
              >
                Explore Roofing & Construction
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* === BOTTOM AUTHORITY BAR — cinematic floating stats === */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8, ease: HIGHLAND_EASE }}
        className="absolute bottom-0 left-0 right-0 z-20"
      >
        {/* Top gold line */}
        <motion.div
          className="h-px w-full"
          style={{ background: 'linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.4), hsl(var(--highland-gold) / 0))' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2, duration: 1.2, ease: DRAMATIC_EASE }}
        />

        <div className="bg-[hsl(var(--hero-overlay)/0.88)] backdrop-blur-xl border-t border-primary-foreground/[0.04]">
          <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-20 py-4 md:py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
              {/* Trust badges */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-5 gap-y-2.5 md:gap-x-8">
                {trustItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 2 + i * 0.1 }}
                    className="flex items-center gap-2 text-primary-foreground/35 text-[10px] md:text-xs"
                  >
                    <item.icon className="w-3 md:w-3.5 h-3 md:h-3.5 text-[hsl(var(--highland-gold)/0.45)] flex-shrink-0" />
                    <span className="font-body font-medium leading-tight">{item.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Dual division indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.4, duration: 0.6 }}
                className="hidden md:flex items-center gap-3"
              >
                <div className="flex items-center gap-1.5">
                  <Home className="w-3 h-3 text-primary-foreground/20" />
                  <span className="text-[9px] font-body font-semibold uppercase tracking-[0.15em] text-primary-foreground/20">Roofing</span>
                </div>
                <div className="w-4 h-px bg-[hsl(var(--highland-gold)/0.25)]" />
                <div className="flex items-center gap-1.5">
                  <HardHat className="w-3 h-3 text-[hsl(var(--highland-gold)/0.25)]" />
                  <span className="text-[9px] font-body font-semibold uppercase tracking-[0.15em] text-[hsl(var(--highland-gold)/0.25)]">Construction</span>
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
