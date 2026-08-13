import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import CTAProofPoints from "@/components/trust/CTAProofPoints";

interface Props {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  primaryLabel?: string;
  primaryHref?: string;
  phone?: string;
  telHref?: string;
  className?: string;
}

export const FinalCTA = ({
  eyebrow = "Ready When You Are",
  heading,
  subheading,
  primaryLabel = "Get My Written Estimate",
  primaryHref = "/consultation",
  phone = "(828) 524-7773",
  telHref = "tel:+18285247773",
  className = "",
}: Props) => (
  <section className={`section-padding bg-primary text-primary-foreground ${className}`}>
    <div className="container-tight max-w-3xl text-center">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
        <span className="text-caption font-body font-semibold uppercase tracking-[0.2em] text-[hsl(var(--gold-ink))] mb-4 block">
          {eyebrow}
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-[1.15] text-balance mb-5">
          {heading}
        </h2>
        {subheading && (
          <p className="text-base md:text-lg text-primary-foreground font-body max-w-xl mx-auto mb-8">{subheading}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link
            to={primaryHref}
            className="btn btn-primary btn-md"
          >
            {primaryLabel}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <a
            href={telHref}
            className="btn btn-secondary btn-lg btn-on-dark"
          >
            <Phone className="w-4 h-4" aria-hidden="true" /> {phone}
          </a>
        </div>
        <CTAProofPoints tone="dark" className="mt-6" />
      </motion.div>
    </div>
  </section>
);