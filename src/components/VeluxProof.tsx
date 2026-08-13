import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, FileCheck, Wrench, BadgeCheck, ArrowRight, Phone } from "lucide-react";
import veluxLogo from "@/assets/logo-velux.png";

const EASE = [0.22, 1, 0.36, 1] as const;

const benefits = [
  {
    icon: BadgeCheck,
    title: "Manufacturer-accredited crew",
    body: "Every skylight install is performed by a VELUX-trained team. We never subcontract this work to a general roofer.",
  },
  {
    icon: ShieldCheck,
    title: "Engineered flashing kit, every time",
    body: "We use the VELUX-engineered flashing system for your specific roof type. No field-fabricated workarounds.",
  },
  {
    icon: FileCheck,
    title: "Documented at handoff",
    body: "Unit model, serial, install date, and flashing kit are recorded so future service work is traceable.",
  },
  {
    icon: Wrench,
    title: "Coordinated with the roof",
    body: "Skylight and roof installed as a single scope under one warranty, with no finger-pointing between trades.",
  },
];

const warranties = [
  { label: "Glass / glazing", value: "Manufacturer coverage" },
  { label: "Skylight components", value: "Manufacturer coverage" },
  { label: "Flashing & insulating systems", value: "Manufacturer coverage" },
  { label: "Electric & solar operators", value: "Manufacturer coverage" },
  { label: "Highlander installation workmanship", value: "Workmanship coverage" },
];

const VeluxProof = () => {
  return (
    <section className="section-padding section-dark relative overflow-hidden">
      {/* subtle tartan watermark */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "url('/tartan.png')",
          backgroundSize: "400px auto",
          backgroundRepeat: "repeat",
        }}
      />
      <div className="container-tight relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease: EASE }}
          className="max-w-3xl mb-12"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-24 h-24 flex items-center justify-center overflow-hidden flex-shrink-0 bg-white shadow-flat border border-white/10">
              <img loading="lazy" decoding="async" src={veluxLogo} alt="VELUX Certified Installer" className="w-full h-full object-contain p-2" />
            </div>
            <span className="text-caption md:text-caption font-body font-semibold uppercase tracking-[0.25em] text-[hsl(var(--gold-ink))]">
              VELUX Certified Installer
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-5 text-balance">
            Manufacturer-accredited. Locally accountable.
          </h2>
          <p className="text-dark-section-foreground/90 text-body md:text-body-lg leading-relaxed font-bold">
            A VELUX Certified Installer is a contractor trained and accredited by VELUX to install their skylights to specification. That accreditation is what unlocks VELUX's installation warranty, not just the product warranty.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* What it means for you */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
            className="lg:col-span-3"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[hsl(var(--highland-gold))]" />
              <span className="text-caption font-body font-semibold uppercase tracking-[0.22em] text-[hsl(var(--gold-ink))]">
                What it means for you
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="bg-dark-section-foreground/[0.04] border border-dark-section-foreground/10 p-5 rounded-none hover:border-[hsl(var(--highland-gold)/0.4)] transition-colors"
                >
                  <b.icon className="w-5 h-5 text-[hsl(var(--gold-ink))] mb-3" />
                  <h3 className="text-base font-heading font-bold text-dark-section-foreground mb-1.5 leading-tight">
                    {b.title}
                  </h3>
                  <p className="text-body-sm text-dark-section-foreground/95 leading-relaxed font-medium">{b.body}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Warranty card */}
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: 0.2, ease: EASE }}
            className="lg:col-span-2"
          >
            <div className="border border-[hsl(var(--highland-gold)/0.3)] bg-dark-section-foreground/[0.03] p-6 md:p-8 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true">
                <span className="text-caption font-body font-semibold uppercase tracking-[0.22em] text-[hsl(var(--gold-ink))]">
                  Skylight Warranty
                </span>
              </div>
              <h3 className="font-heading font-bold text-2xl text-dark-section-foreground mb-5">
                What's covered, and for how long
              </h3>
              <ul className="space-y-3 mb-7 flex-1">
                {warranties.map((w) => (
                  <li
                    key={w.label}
                    className="flex items-baseline justify-between gap-4 pb-3 border-b border-dark-section-foreground/10 last:border-0 last:pb-0"
                  >
                    <span className="text-body-sm text-dark-section-foreground/85 font-body font-medium">{w.label}</span>
                    <span className="text-body-sm font-heading font-bold text-[hsl(var(--gold-ink))] whitespace-nowrap">
                      {w.value}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-caption text-dark-section-foreground/95 font-body leading-relaxed">
                Coverage reflects standard VELUX warranty terms on deck-mounted skylights. Highlander will review applicable product and workmanship details with you before construction begins; full terms documented at handoff.
              </p>
            </div>
          </motion.aside>
        </div>

        {/* CTA band */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.3, ease: EASE }}
          className="mt-12 md:mt-16 border-t border-dark-section-foreground/10 pt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div className="max-w-xl">
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2">Schedule a skylight inspection.</h3>
            <p className="text-dark-section-foreground/95 text-body-sm md:text-body font-bold">
              Free, no-pressure assessment of your existing skylights: leak diagnosis, flashing review, and replacement recommendations in writing.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              to="/consultation"
              className="btn btn-primary btn-lg"
            >
              Request Skylight Inspection <ArrowRight className="w-4 h-4" aria-hidden="true">
            </Link>
            <a
              href="tel:+18285247773"
              className="btn btn-secondary btn-md btn-on-dark"
            >
              <Phone className="w-4 h-4 text-[hsl(var(--highland-gold)/0.7)]" aria-hidden="true"> (828) 524-7773
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VeluxProof;