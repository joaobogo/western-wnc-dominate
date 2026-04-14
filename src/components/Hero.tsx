import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Award, Banknote, Clock } from "lucide-react";
import heroImage from "@/assets/hero-roofing.jpg";
import heroVideo from "@/assets/hero-video.mp4";
import { useRef, useState } from "react";

const trustItems = [
  { icon: Shield, label: "Licensed & Insured" },
  { icon: Award, label: "CertainTeed Master Applicator" },
  { icon: Banknote, label: "Financing Available" },
  { icon: Clock, label: "24-Hour Response" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section ref={ref} className="relative min-h-[100svh] flex items-end overflow-hidden">
      {/* === BACKGROUND LAYERS === */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Mountain home with premium roof in Western North Carolina"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? "opacity-0" : "opacity-100"}`}
          loading="eager"
        />
        <video
          autoPlay muted loop playsInline preload="auto"
          // @ts-ignore
          webkit-playsinline="true"
          onCanPlay={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? "opacity-100" : "opacity-0"}`}
          ref={(el) => { if (el) el.play().catch(() => {}); }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* Cinematic overlays — optimized for mobile readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.97)] via-[hsl(var(--hero-overlay)/0.85)] to-[hsl(var(--hero-overlay)/0.35)] md:to-[hsl(var(--hero-overlay)/0.3)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay))] via-[hsl(var(--hero-overlay)/0.1)] to-[hsl(var(--hero-overlay)/0.5)]" />

        {/* Grain */}
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />
      </div>

      {/* === GOLD VERTICAL ACCENT === */}
      <motion.div
        className="absolute left-0 top-0 w-[2px] z-20"
        style={{ background: 'linear-gradient(to bottom, hsl(var(--highland-gold)), hsl(var(--highland-gold) / 0))' }}
        initial={{ height: "0%" }}
        animate={{ height: "100%" }}
        transition={{ duration: 2.5, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      />

      {/* === SPLIT VISUAL INDICATOR (right side — desktop only) === */}
      <div className="absolute right-0 top-0 bottom-0 hidden lg:flex flex-col items-center justify-center z-10 pr-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-px h-16 bg-gradient-to-b from-transparent to-primary-foreground/20" />
            <span className="text-[9px] font-body font-semibold uppercase tracking-[0.25em] text-primary-foreground/30 [writing-mode:vertical-lr] rotate-180">
              Roofing
            </span>
          </div>
          <div className="w-6 h-px bg-[hsl(var(--highland-gold)/0.4)]" />
          <div className="flex flex-col items-center gap-2">
            <span className="text-[9px] font-body font-semibold uppercase tracking-[0.25em] text-primary-foreground/30 [writing-mode:vertical-lr] rotate-180">
              Construction
            </span>
            <div className="w-px h-16 bg-gradient-to-b from-primary-foreground/20 to-transparent" />
          </div>
        </motion.div>
      </div>

      {/* === MAIN CONTENT — mobile-optimized spacing === */}
      <div className="relative z-10 w-full px-5 md:px-10 lg:px-20 pb-28 md:pb-20 pt-32 md:pt-44">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-3 md:gap-4 mb-7 md:mb-10"
          >
            <motion.div
              className="h-px"
              style={{ background: 'hsl(var(--highland-gold))' }}
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-[9px] md:text-[11px] font-body font-semibold uppercase tracking-[0.2em] md:tracking-[0.25em] text-[hsl(var(--highland-gold))]"
            >
              Roofing & Construction · Western North Carolina
            </motion.span>
          </motion.div>

          {/* Headline — responsive sizing */}
          <div className="overflow-hidden mb-1">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: HIGHLAND_EASE }}
              className="text-[2.25rem] md:text-[3.5rem] lg:text-[4.25rem] xl:text-[5rem] font-heading font-bold text-primary-foreground leading-[1.04] tracking-[-0.02em]"
            >
              Not Just Another Roofer.
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8 md:mb-12">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.65, ease: HIGHLAND_EASE }}
              className="text-[2.25rem] md:text-[3.5rem] lg:text-[4.25rem] xl:text-[5rem] font-heading font-bold text-primary-foreground leading-[1.04] tracking-[-0.02em]"
            >
              Not Just Another Contractor.
            </motion.h1>
          </div>

          {/* Subtext — premium authority positioning */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="text-[14px] md:text-lg text-primary-foreground/45 max-w-lg mb-10 md:mb-12 leading-[1.7] font-body"
          >
            500+ roofs across Western NC. Licensed General Contractor. CertainTeed Master Applicator.
            One company for your roof, your renovation, and your peace of mind — built for these mountains.
          </motion.p>

          {/* CTA Group — mobile: full-width stacked, larger touch targets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 md:mb-20"
          >
            <Link
              to="/request-inspection"
              className="group cta-gradient text-accent-foreground font-heading font-bold text-[14px] md:text-[15px] px-8 md:px-10 py-4 md:py-[18px] rounded-none inline-flex items-center justify-center gap-2.5 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden tracking-wide"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">Get a Free Assessment</span>
              <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/services"
              className="group bg-white/[0.04] backdrop-blur-sm border border-white/[0.12] text-primary-foreground font-medium text-[14px] md:text-[15px] px-8 md:px-10 py-4 md:py-[18px] rounded-none inline-flex items-center justify-center gap-2.5 hover:bg-white/[0.08] hover:border-white/[0.2] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Explore Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Trust credentials — mobile: 2-column grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-5 gap-y-2.5 md:gap-x-6 md:gap-y-3"
          >
            {trustItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.7 + i * 0.1 }}
                className="flex items-center gap-2 text-primary-foreground/35 text-[11px] md:text-sm"
              >
                <item.icon className="w-3 md:w-3.5 h-3 md:h-3.5 text-[hsl(var(--highland-gold)/0.6)]" />
                <span className="font-body leading-tight">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* === BOTTOM EDGE === */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, hsl(var(--highland-gold) / 0), hsl(var(--highland-gold) / 0.3), hsl(var(--highland-gold) / 0))' }} />
      </div>
    </section>
  );
};

export default Hero;
