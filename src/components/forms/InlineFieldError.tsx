/**
 * Inline validation message shown directly under a form field.
 * Errors are never toast-only — this is the canonical renderer for forms
 * outside the intake kit (which has its own `FieldError`).
 */
const InlineFieldError = ({
  id,
  children,
  className = "text-destructive",
}: {
  id?: string;
  children?: React.ReactNode;
  /** Override the color/size when the field sits on a dark section. */
  className?: string;
}) =>
  children ? (
    <p id={id} role="alert" className={`mt-1.5 text-xs font-body leading-snug ${className}`}>
      {children}
    </p>
  ) : null;

export default InlineFieldError;
