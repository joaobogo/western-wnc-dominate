/**
 * Inline validation message shown directly under a form field.
 * Errors are never toast-only — this is the canonical renderer for forms
 * outside the intake kit (which has its own `FieldError`).
 */
const InlineFieldError = ({
  id,
  children,
  tone = "light",
  className,
}: {
  id?: string;
  children?: React.ReactNode;
  /** "dark" = the field sits on a dark section. */
  tone?: "light" | "dark";
  /** Override the color/size. Wins over `tone`. */
  className?: string;
}) =>
  children ? (
    <p id={id} role="alert" className={`mt-1.5 text-xs font-body leading-snug ${className ?? (tone === "dark" ? "text-[hsl(var(--highland-gold))]" : "text-destructive")}`}>
      {children}
    </p>
  ) : null;

export default InlineFieldError;
