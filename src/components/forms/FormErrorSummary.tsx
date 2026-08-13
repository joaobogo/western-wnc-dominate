import { AlertTriangle, Phone } from "lucide-react";

/**
 * Persistent submission-error summary.
 *
 * Shown when a submit attempt is blocked by validation or fails in transit.
 * It never clears what the visitor typed — it just names what to fix and
 * always offers the phone as a guaranteed fallback path to a human.
 */
const FormErrorSummary = ({
  message,
  issues = [],
  tone = "light",
  className = "",
}: {
  /** Headline explanation. Omit to use the default. */
  message?: string | null;
  /** Specific fix-it messages, one per problem field. */
  issues?: string[];
  /** `dark` for gold-on-forest sections. */
  tone?: "light" | "dark";
  className?: string;
}) => {
  const unique = Array.from(new Set(issues.filter(Boolean)));
  if (!message && unique.length === 0) return null;

  const dark = tone === "dark";
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`mt-5 border p-4 md:p-5 ${
        dark
          ? "border-[hsl(var(--highland-gold)/0.5)] bg-[hsl(var(--highland-gold)/0.1)]"
          : "border-destructive/40 bg-destructive/5"
      } ${className}`}
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${dark ? "text-[hsl(var(--gold-ink))]" : "text-destructive"}`} />
        <div className="min-w-0">
          <p className={`font-body font-bold text-body-xs md:text-body-sm ${dark ? "text-white" : "text-foreground"}`}>
            {message || "We couldn't send this yet — nothing you typed was lost."}
          </p>
          {unique.length > 0 && (
            <ul className={`mt-2 space-y-1 text-body-xs md:text-body-xs font-body list-disc pl-4 ${dark ? "text-white/85" : "text-muted-foreground"}`}>
              {unique.map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ul>
          )}
          <p className={`mt-3 text-body-xs md:text-body-xs font-body ${dark ? "text-white/85" : "text-muted-foreground"}`}>
            Prefer to skip the form?{" "}
            <a
              href="tel:+18285247773"
              className={`inline-flex items-center gap-1.5 font-bold underline underline-offset-2 ${dark ? "text-[hsl(var(--gold-ink))]" : "text-primary"}`}
            >
              <Phone className="w-3.5 h-3.5" />
              (828) 524-7773
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormErrorSummary;
