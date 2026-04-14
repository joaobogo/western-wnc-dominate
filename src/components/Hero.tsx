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

/* Mountain contour path — stylized WNC ridgeline */
const mountainPath = "M0,180 Q80,120 160,145 Q220,160 300,100 Q380,40 460,80 Q520,110 600,60 Q680,10 760,50 Q840,90 920,35 Q980,0 1060,30 Q1120,55 1200,20 L1200,200 L0,200 Z";

/* Roofline path — architectural gable forms */
const rooflinePath = "M0,160 L100,80 L200,160 L280,60 L380,160 L440,90 L520,160 L620,40 L720,160 L800,70 L900,160 L980,50 L1080,160 L1200,80";

/* Blueprint grid line positions */
const gridLines = {
  horizontal: [40, 80, 120, 160],
  vertical: [0, 150, 300, 450, 600, 750, 900, 1050, 1200],
};

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

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.95)] via-[hsl(var(--hero-overlay)/0.78)] to-[hsl(var(--hero-overlay)/0.35)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay))] via-[hsl(var(--hero-overlay)/0.1)] to-[hsl(var(--hero-overlay)/0.45)]" />

        {/* Grain */}
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />
      </div>

      {/* === ARCHITECTURAL SVG OVERLAYS === */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {/* Blueprint grid — very subtle */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" preserveAspectRatio="none" viewBox="0 0 1200 200">
          {gridLines.horizontal.map((y) => (
            <motion.line
              key={`h-${y}`}
              x1="0" y1={y} x2="1200" y2={y}
              stroke="hsl(var(--highland-gold))"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: 1.5 + y * 0.005, ease: "easeOut" }}
            />
          ))}
          {gridLines.vertical.map((x) => (
            <motion.line
              key={`v-${x}`}
              x1={x} y1="0" x2={x} y2="200"
              stroke="hsl(var(--highland-gold))"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 2 + x * 0.001, ease: "easeOut" }}
            />
          ))}
        </svg>

        {/* Mountain contour — bottom right */}
        <svg className="absolute bottom-0 right-0 w-[70%] h-[30%] opacity-[0.04]" preserveAspectRatio="none" viewBox="0 0 1200 200">
          <motion.path
            d={mountainPath}
            fill="none"
            stroke="hsl(var(--highland-gold))"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Filled version — even more subtle */}
          <motion.path
            d={mountainPath}
            fill="hsl(var(--highland-gold))"
            fillOpacity="0.06"
            stroke="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 3.5 }}
          />
        </svg>

        {/* Roofline architectural drawing — upper area */}
        <svg className="absolute top-[15%] left-[10%] w-[50%] h-[25%] opacity-[0.03] hidden md:block" preserveAspectRatio="none" viewBox="0 0 1200 200">
          <motion.path
            d={rooflinePath}
            fill="none"
            stroke="hsl(var(--primary-foreground))"
            strokeWidth="1"
            strokeDasharray="4 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 5, delay: 2, ease: "easeOut" }}
          />
          {/* Measurement tick marks */}
          {[100, 200, 280, 380, 440, 520, 620, 720, 800, 900].map((x, i) => (
            <motion.line
              key={x}
              x1={x} y1="155" x2={x} y2="170"
              stroke="hsl(var(--primary-foreground))"
              strokeWidth="0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 3 + i * 0.1 }}
            />
          ))}
        </svg>

        {/* Angle notation — architectural detail */}
        <svg className="absolute top-[20%] right-[15%] w-32 h-32 opacity-[0.04] hidden lg:block" viewBox="0 0 100 100">
          <motion.path
            d="M10,90 L50,20 L90,90"
            fill="none"
            stroke="hsl(var(--highland-gold))"
            strokeWidth="0.8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 3 }}
          />
          <motion.path
            d="M30,60 A25,25 0 0,1 42,42"
            fill="none"
            stroke="hsl(var(--highland-gold))"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 4 }}
          />
          <motion.text
            x="38" y="58"
            fill="hsl(var(--highland-gold))"
            fontSize="6"
            fontFamily="monospace"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 4.5 }}
          >
            22°
          </motion.text>
        </svg>
      </div>

      {/* === GOLD VERTICAL ACCENT === */}
      <motion.div
        className="absolute left-0 top-0 w-[2px] z-20"
        style={{ background: 'linear-gradient(to bottom, hsl(var(--highland-gold)), hsl(var(--highland-gold) / 0))' }}
        initial={{ height: "0%" }}
        animate={{ height: "100%" }}
        transition={{ duration: 2.5, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      />

      {/* === SPLIT VISUAL INDICATOR (right side) === */}
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

      {/* === MAIN CONTENT === */}
      <div className="relative z-10 w-full px-5 md:px-8 lg:px-16 pb-12 md:pb-16 pt-32 md:pt-40">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-4 mb-8"
          >
            <motion.div
              className="h-px"
              style={{ background: 'hsl(var(--highland-gold))' }}
              initial={{ width: 0 }}
              animate={{ width: 56 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-[10px] md:text-[11px] font-body font-semibold uppercase tracking-[0.2em] text-[hsl(var(--highland-gold))]"
            >
              Roofing & Construction · Western North Carolina
            </motion.span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-1 md:mb-2">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-primary-foreground leading-[1.05] tracking-tight"
            >
              Built for the Mountains.
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8 md:mb-10">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-primary-foreground leading-[1.05] tracking-tight"
            >
              Crafted for Generations.
            </motion.h1>
          </div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="text-base md:text-lg text-primary-foreground/55 max-w-lg mb-10 leading-relaxed font-body"
          >
            Expert roofing and construction across Highlands, Cashiers,
            Franklin, Sylva & the surrounding mountain communities. Precision workmanship. Certified. Warranty-backed.
          </motion.p>

          {/* CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-14 md:mb-16"
          >
            <Link
              to="/request-inspection"
              className="group cta-gradient text-accent-foreground font-semibold text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">Schedule a Quote Call</span>
              <ArrowRight className="w-4 h-4 relative group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/services"
              className="group bg-white/5 backdrop-blur-sm border border-white/15 text-primary-foreground font-medium text-base px-8 py-4 rounded-sm inline-flex items-center justify-center gap-2 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Explore Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Trust credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="flex flex-wrap gap-x-6 gap-y-3"
          >
            {trustItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.7 + i * 0.1 }}
                className="flex items-center gap-2 text-primary-foreground/40 text-xs md:text-sm"
              >
                <item.icon className="w-3.5 h-3.5 text-[hsl(var(--highland-gold)/0.7)]" />
                <span className="font-body">{item.label}</span>
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
