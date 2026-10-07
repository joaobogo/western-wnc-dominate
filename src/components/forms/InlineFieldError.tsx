/**
 * Inline validation message shown directly under a form field.
 * Errors are never toast-only — this is the canonical renderer for forms
 * outside the intake kit (which has its own `FieldError`).
 */
const InlineFieldError = ({
  id,
  children,
  tone,
  className,
}: {
  id?: string;
  /** "dark" renders a lighter error color for dark sections. */
  tone?: "light" | "dark" | string;
  children?: React.ReactNode;
  /** Override the color/size when the field sits on a dark section. */
  className?: string;
}) =>
  children ? (
    <p id={id} role="alert" className={`mt-1.5 text-xs font-body leading-snug ${className ?? (tone === "dark" ? "text-destructive-foreground" : "text-destructive")}`}>
      {children}
    </p>
  ) : null;

export default InlineFieldError;
