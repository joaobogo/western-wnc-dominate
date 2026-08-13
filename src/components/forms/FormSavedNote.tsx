import { Check } from "lucide-react";

/**
 * Subtle confirmation shown when an in-progress draft was restored from
 * sessionStorage. Stored values are cleared once the lead is submitted.
 */
const FormSavedNote = ({ show, className = "", tone = "light" }: { show: boolean; className?: string; tone?: "light" | "dark" }) => {
  if (!show) return null;
  return (
    <p
      role="status"
      className={`flex items-center gap-2 text-body-xs font-body ${
        tone === "dark" ? "text-white/70" : "text-muted-foreground"
      } ${className}`}
    >
      <Check className="h-4 w-4 text-primary" aria-hidden="true" />
      We saved your answers from earlier — pick up where you left off.
    </p>
  );
};

export default FormSavedNote;
