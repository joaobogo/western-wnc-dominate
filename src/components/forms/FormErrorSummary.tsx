import { useEffect, useRef, useState } from "react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/data/business";
import { AlertTriangle, Phone } from "lucide-react";

/**
 * Persistent submission-error summary.
 *
 * Shown when a submit attempt is blocked by validation or fails in transit.
 * It never clears what the visitor typed — it just names what to fix and
 * always offers the phone as a guaranteed fallback path to a human.
 *
 * On appearing it scrolls itself into view and takes focus, so someone who
 * hit submit at the bottom of a long form on a phone is never left staring
 * at a button that seemingly did nothing.
 *
 * Stuck-visitor escalation: the first error gets a quiet "prefer to skip the
 * form?" link. From the SECOND error onward the visitor is visibly struggling,
 * so the phone is promoted to a real button with a warmer line. Nobody should
 * wear themselves out on a form and leave without ever knowing they could
 * just call.
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
  const shown = Boolean(message) || unique.length > 0;
  const ref = useRef<HTMLDivElement>(null);
  const signature = `${message ?? ""}|${unique.join("|")}`;

  // Counts distinct error appearances so we can tell a first stumble from
  // someone genuinely stuck. Ref, not state, so counting never re-renders.
  const appearances = useRef(0);
  const [struggling, setStruggling] = useState(false);

  useEffect(() => {
    if (!shown) return;
    appearances.current += 1;
    if (appearances.current >= 2) setStruggling(true);
    const el = ref.current;
    if (!el) return;
    el.focus({ preventScroll: true });
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [shown, signature]);

  if (!shown) return null;

  const dark = tone === "dark";
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="alert"
      aria-live="assertive"
      className={`mt-5 border p-4 md:p-5 ${
        dark
          ? "border-[hsl(var(--highland-gold)/0.5)] bg-[hsl(var(--highland-gold)/0.1)]"
          : "border-destructive/40 bg-destructive/5"
      } ${className}`}
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${dark ? "text-[hsl(var(--gold-ink))]" : "text-destructive"}`} aria-hidden="true" />
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
          {struggling ? (
            <div
              className={`mt-3 flex flex-col gap-2.5 border-t pt-3 sm:flex-row sm:items-center sm:justify-between ${
                dark ? "border-[hsl(var(--highland-gold)/0.35)]" : "border-destructive/25"
              }`}
            >
              <p className={`text-body-xs font-body font-semibold ${dark ? "text-white" : "text-foreground"}`}>
                Stuck? Give us a call — we&apos;re happy to take it from here.
              </p>
              <a
                href={PHONE_TEL}
                className={`inline-flex min-h-[44px] flex-shrink-0 items-center justify-center gap-2 px-4 py-2 font-body text-body-xs font-bold uppercase tracking-[0.08em] transition-opacity hover:opacity-90 ${
                  dark
                    ? "bg-[hsl(var(--highland-gold))] text-[hsl(var(--heritage-green))]"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {PHONE_DISPLAY}
              </a>
            </div>
          ) : (
            <p className={`mt-3 text-body-xs md:text-body-xs font-body ${dark ? "text-white/85" : "text-muted-foreground"}`}>
              Prefer to skip the form?{" "}
              <a
                href={PHONE_TEL}
                className={`inline-flex items-center gap-1.5 font-bold underline underline-offset-2 ${dark ? "text-[hsl(var(--gold-ink))]" : "text-primary"}`}
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormErrorSummary;
