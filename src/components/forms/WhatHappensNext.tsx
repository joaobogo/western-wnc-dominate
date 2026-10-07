import { Phone } from "lucide-react";

/**
 * Sets the expectation directly above a submit button: who calls, roughly
 * when, and that there is no obligation. Claims must stay within what we can
 * honor — a local advisor, business hours, no guaranteed timing, no warranty.
 */
const WhatHappensNext = ({
  className = "",
  tone = "light",
  variant = "call",
}: {
  className?: string;
  tone?: "light" | "dark";
  variant?: "call" | "email";
}) => {
  const base =
    tone === "dark"
      ? "border-white/15 bg-white/[0.04] text-white/85"
      : "border-border bg-muted/40 text-muted-foreground";

  return (
    <p
      className={`flex items-start gap-2.5 border ${base} px-4 py-3 text-body-xs font-body leading-relaxed ${className}`}
    >
      <Phone
        className={`mt-0.5 h-4 w-4 shrink-0 ${tone === "dark" ? "text-[hsl(var(--gold-ink))]" : "text-primary"}`}
        aria-hidden="true" />
      <span>
        <strong className="font-semibold">What happens next:</strong>{" "}
        {variant === "email"
          ? "a Highlander advisor from our Franklin office reviews your message and replies personally during business hours."
          : "a Highlander advisor from our Franklin office calls you at the number you provide during business hours."}{" "}
        It's a conversation about your project — no obligation and no sales pressure.
      </span>
    </p>
  );
};

export default WhatHappensNext;
