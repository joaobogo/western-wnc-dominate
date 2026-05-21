import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, SlidersHorizontal, Camera, Layers, Sparkles } from "lucide-react";

interface BuilderPromoBlockProps {
  /** Pre-select a project type when entering the builder */
  preset?: "replacement" | "metal_upgrade" | "synthetic_upgrade" | "repair" | "";
  /** Pre-fill the town field */
  town?: string;
  /** Visual variant — "panel" sits inside a section, "band" is a full-bleed band */
  variant?: "panel" | "band";
  /** Override heading copy per page context */
  eyebrow?: string;
  title?: string;
  body?: string;
  ctaLabel?: string;
}

const BuilderPromoBlock = ({
  preset = "",
  town = "",
  variant = "panel",
  eyebrow = "Optional · Advanced Builder",
  title = "Build Your Roofing Project",
  body = "An optional, deeper pathway for homeowners who want to specify their roof in detail. Material, system features, priorities, photos — all in one guided flow. We respond personally with a written proposal, not an instant quote.",
  ctaLabel = "Start the Builder",
}: BuilderPromoBlockProps) => {
  const qs = new URLSearchParams();
  if (preset) qs.set("type", preset);
  if (town) qs.set("town", town);
  const href = `/roofing-builder${qs.toString() ? `?${qs.toString()}` : ""}`;

  const Wrapper = variant === "band" ? "section" : "div";
  const wrapperClass =
    variant === "band"
      ? "section-padding bg-gradient-to-br from-secondary/10 via-background to-accent/5"
      : "py-10 md:py-14";

  return (
    <Wrapper className={wrapperClass}>
      <div className={variant === "band" ? "container-tight" : ""}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-sm border border-border/60 bg-card shadow-sm"
        >
          {/* Decorative tartan stripe */}
          <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-accent via-secondary to-accent" />
          <div className="grid md:grid-cols-[1.4fr_1fr] gap-0">
            <div className="p-7 md:p-10">
              <div className="flex items-center gap-2 text-accent text-[11px] font-semibold uppercase tracking-[0.16em] mb-4">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                {eyebrow}
              </div>
              <h3 className="font-heading font-bold text-foreground text-[26px] md:text-[32px] leading-[1.1] tracking-tight mb-3">
                {title}
              </h3>
              <p className="text-foreground/65 text-[14.5px] md:text-[15px] font-body leading-relaxed max-w-xl mb-6">
                {body}
              </p>

              <ul className="grid sm:grid-cols-3 gap-3 mb-7">
                {[
                  { icon: Layers, label: "Material & system" },
                  { icon: Sparkles, label: "Priorities & tier" },
                  { icon: Camera, label: "Photos & notes" },
                ].map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-2 text-[12.5px] font-body text-foreground/70 border border-border/60 rounded-sm px-3 py-2 bg-background/60"
                  >
                    <Icon className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    {label}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to={href}
                  className="group cta-gradient text-accent-foreground font-semibold text-[14px] px-7 py-3.5 rounded-sm inline-flex items-center gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  {ctaLabel}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  to="/roofing-intake"
                  className="text-foreground/70 hover:text-accent text-[13px] font-semibold underline underline-offset-4 decoration-border hover:decoration-accent transition-colors"
                >
                  Prefer the short intake form
                </Link>
              </div>

              <p className="mt-5 text-[11.5px] text-foreground/45 font-body">
                Not an instant quote. A real scope brief reviewed by a Highlander advisor within one business day.
              </p>
            </div>

            <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-secondary/15 via-secondary/5 to-accent/10 border-l border-border/60 p-8">
              <div className="space-y-4">
                {[
                  { n: "01", t: "Choose a project path" },
                  { n: "02", t: "Pick a material system" },
                  { n: "03", t: "Set priorities & timeline" },
                  { n: "04", t: "Upload photos, share notes" },
                ].map(({ n, t }) => (
                  <div key={n} className="flex items-start gap-3">
                    <span className="font-heading text-accent text-[13px] font-bold tracking-wider mt-0.5">
                      {n}
                    </span>
                    <span className="text-foreground/75 text-[13.5px] font-body leading-snug">
                      {t}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-foreground/50 text-[11px] font-body uppercase tracking-[0.18em] mt-6">
                ~3 minutes · Optional
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Wrapper>
  );
};

export default BuilderPromoBlock;