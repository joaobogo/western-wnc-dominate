import { PHONE_PLAIN } from "@/data/business";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";

interface ConsultationCTAProps {
  heading: string;
  subline: string;
  label?: string;
  id?: string;
}

/** Repeatable consultation CTA band for the roof replacement journey. */
const ConsultationCTA = ({ heading, subline, label = "Get My Replacement Scoped", id }: ConsultationCTAProps) => (
  <section id={id} className="bg-primary text-primary-foreground tartan-dark">
    <div className="container-tight px-5 md:px-8 py-9 md:py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <h2 className="font-heading font-bold text-xl md:text-2xl mb-1.5">{heading}</h2>
          <p className="text-primary-foreground text-sm font-body max-w-xl">{subline}</p>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:flex-shrink-0">
          <Link
            to="/consultation"
            className="btn btn-primary btn-md group"
          >
            <span>{label}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
          <a
            href="tel:+18285247773"
            className="btn btn-secondary btn-md btn-on-dark"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            {PHONE_PLAIN}
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default ConsultationCTA;