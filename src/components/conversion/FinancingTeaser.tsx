import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";
import { DollarSign, ArrowRight } from "lucide-react";

interface FinancingTeaserProps {
  serviceLabel?: string;
  className?: string;
}

const FinancingTeaser = ({ serviceLabel = "project", className = "" }: FinancingTeaserProps) => (
  <div className={`flex items-start sm:items-center gap-3 sm:gap-4 p-4 rounded-sm border border-[hsl(var(--highland-gold)/0.35)] bg-[hsl(var(--highland-gold)/0.06)] ${className}`}>
    <div className="w-10 h-10 rounded-full bg-[hsl(var(--highland-gold)/0.15)] flex items-center justify-center flex-shrink-0">
      <DollarSign className="w-4 h-4 text-[hsl(var(--gold-ink))]" aria-hidden="true">
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-body text-foreground leading-snug">
        Financing may be available for this {serviceLabel}.{" "}
        <Link
          to="/financing"
          onClick={() => trackEvent("cta_click", { label: "Financing teaser", elementId: "financing-teaser" })}
          className="inline-flex items-center gap-1 font-semibold text-[hsl(var(--gold-ink))] hover:underline underline-offset-2"
        >
          Ask about options <ArrowRight className="w-4 h-4" aria-hidden="true">
        </Link>
      </p>
      <p className="text-xs text-muted-foreground font-body mt-1">
        Subject to credit approval. Terms are set by the lender, not Highlander.
      </p>
    </div>
  </div>
);

export default FinancingTeaser;
