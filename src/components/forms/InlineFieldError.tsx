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
  children?: React.ReactNode;
  /** "dark" when the field sits on a dark section — keeps the error readable. */
  tone?: "dark";
  /** Override the color/size when the field sits on a dark section. */
  className?: string;
}) => {
  const color = className ?? (tone === "dark" ? "text-amber-300" : "text-destructive");
  return children ? (
    <p id={id} role="alert" className={`mt-1.5 text-xs font-body leading-snug ${color}`}>
      {children}
    </p>
  ) : null;
};

export default InlineFieldError;
