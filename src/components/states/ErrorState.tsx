import { PHONE_PLAIN } from "@/data/business";
import { AlertTriangle, Phone, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

/**
 * Human error message with a retry path. Never surfaces a raw stack or a bare
 * provider message as the headline — technical detail stays secondary.
 */
export default function ErrorState({
  title = "We couldn't load this right now",
  description = "The connection dropped or the data source is slow. Try again — if it keeps failing, call us and we'll help directly.",
  detail,
  onRetry,
  retryLabel = "Try again",
  showContact = true,
  className,
}: {
  title?: string;
  description?: string;
  detail?: string | null;
  onRetry?: () => void;
  retryLabel?: string;
  showContact?: boolean;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn("border border-border rounded-sm bg-card p-6 md:p-8", className)}
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 mt-0.5 text-[hsl(var(--heritage-green))] shrink-0" aria-hidden="true" />
        <div className="min-w-0">
          <h3 className="font-heading font-bold text-base md:text-lg text-foreground mb-2">{title}</h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{description}</p>
          {detail && (
            <p className="mt-2 text-caption text-muted-foreground/80 break-words">Details: {detail}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-5">
        {onRetry && (
          <button type="button" onClick={onRetry} className="btn btn-primary btn-sm">
            <RefreshCw className="w-4 h-4" aria-hidden="true" /> {retryLabel}
          </button>
        )}
        {showContact && (
          <>
            <Link to="/contact" className="btn btn-secondary btn-sm">
              Get My Questions Answered
            </Link>
            <a href="tel:+18285247773" className="btn btn-secondary btn-sm">
              <Phone className="w-4 h-4" aria-hidden="true" /> {PHONE_PLAIN}
            </a>
          </>
        )}
      </div>
    </div>
  );
}