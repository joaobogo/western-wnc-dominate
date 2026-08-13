import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, BookOpen, ListChecks } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import CTAProofPoints from "@/components/trust/CTAProofPoints";

type Offer = { label: string; to: string; description: string };

interface TieredOfferProps {
  /** Ready-now visitors — visually dominant. */
  primaryLabel?: string;
  primaryTo?: string;
  primaryDescription?: string;
  /** Researching visitors — a relevant local guide. */
  secondary?: Offer;
  /** Early-stage visitors — a checklist or cost-driver explainer. */
  tertiary?: Offer;
  /** Analytics context, e.g. "roof-repair". */
  context: string;
  className?: string;
}

/**
 * Tiered offer band: one dominant action for ready-now visitors, plus two
 * lighter paths for researchers and early-stage planners.
 */
const TieredOffer = ({
  primaryLabel = "Get My Roof Assessed",
  primaryTo = "/request-inspection",
  primaryDescription = "On-site look, photo documentation, and a written scope you can compare line by line.",
  secondary = {
    label: "Read the local guides",
    to: "/blog",
    description: "Material, weather, and maintenance guidance written for Western North Carolina roofs.",
  },
  tertiary = {
    label: "See the common questions",
    to: "/faq",
    description: "What drives cost here, how long work takes, and what to ask any contractor before signing.",
  },
  context,
  className = "",
}: TieredOfferProps) => (
  <section className={`section-padding bg-muted/20 ${className}`} aria-label="Choose your next step">
    <div className="container-tight">
      <div className="max-w-2xl mb-8">
        <span className="eyebrow mb-3 block">Where You Are Right Now</span>
        <h2 className="section-heading mb-3">Pick the next step that fits</h2>
        <p className="text-muted-foreground font-body">
          Some people need someone on the roof this week. Others are six months out and still gathering
          information. Both are welcome — start wherever you actually are.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1.25fr,1fr] gap-5 items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="bg-card border-2 border-[hsl(var(--gold-ink))]/40 rounded-sm p-6 md:p-8 shadow-raised"
        >
          <span className="text-caption font-body font-semibold uppercase tracking-[0.25em] text-[hsl(var(--gold-ink))]">
            Ready now
          </span>
          <h3 className="font-heading font-bold text-foreground text-xl md:text-2xl mt-3 mb-2">
            Get eyes on it and a number in writing
          </h3>
          <p className="text-sm font-body text-muted-foreground mb-6 max-w-md">{primaryDescription}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to={primaryTo}
              onClick={() => trackEvent("cta_click", { label: primaryLabel, elementId: `tiered-primary-${context}` })}
              className="cta-gradient text-accent-foreground font-body font-bold text-sm px-7 py-4 inline-flex items-center justify-center gap-2 uppercase tracking-[0.1em] hover:opacity-90 transition-all min-h-[56px]"
            >
              {primaryLabel} <ArrowRight className="w-4 h-4" aria-hidden="true">
            </Link>
            <a
              href="tel:+18285247773"
              onClick={() => trackEvent("phone_click", { label: "Tiered offer call", elementId: `tiered-call-${context}` })}
              className="border-2 border-border text-foreground font-body font-bold text-sm px-7 py-4 inline-flex items-center justify-center gap-2 hover:bg-muted transition-all min-h-[56px]"
            >
              <Phone className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true"> Call Direct: 828-524-7773
            </a>
          </div>
          <CTAProofPoints align="start" className="mt-6" />
        </motion.div>

        <div className="grid gap-5 content-start">
          {[
            { tier: "Still researching", icon: BookOpen, offer: secondary, id: "secondary" },
            { tier: "Planning ahead", icon: ListChecks, offer: tertiary, id: "tertiary" },
          ].map(({ tier, icon: Icon, offer, id }) => (
            <Link
              key={id}
              to={offer.to}
              onClick={() => trackEvent("cta_click", { label: offer.label, elementId: `tiered-${id}-${context}` })}
              className="group bg-card border border-border rounded-sm p-5 hover:border-primary/40 transition-colors block"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-primary" aria-hidden="true">
                <span className="text-caption font-body font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  {tier}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-foreground text-base mb-1.5 group-hover:text-primary transition-colors">
                {offer.label}
              </h3>
              <p className="text-body-xs leading-relaxed font-body text-muted-foreground mb-3">{offer.description}</p>
              <span className="text-primary text-body-xs font-body font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Continue <ArrowRight className="w-4 h-4" aria-hidden="true">
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TieredOffer;