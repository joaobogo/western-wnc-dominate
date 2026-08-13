import * as React from "react";
import InlineFieldError from "@/components/forms/InlineFieldError";
import { cn } from "@/lib/utils";

/**
 * THE form field system.
 *
 * Every input, select, textarea and tap-select card in the app renders
 * through these primitives so that we get, for free:
 *   • a visible label (never placeholder-only)
 *   • 16px minimum font size (no iOS zoom-on-focus)
 *   • helper text wired with aria-describedby
 *   • inline validation shown on blur, wired with aria-invalid
 *   • 48px+ tap targets
 *
 * Visual definitions live in `src/index.css` (`.field-*`, `.tap-card`).
 */

type FieldProps = {
  id: string;
  label: React.ReactNode;
  /** Adds the required marker and `required` semantics to the control. */
  required?: boolean;
  /** Quiet guidance shown under the control when there is no error. */
  help?: React.ReactNode;
  /** Validation message — show it on blur, not on every keystroke. */
  error?: string | null;
  /** Renders label/help in light-on-dark colors. */
  onDark?: boolean;
  className?: string;
  children: (props: {
    id: string;
    "aria-invalid": true | undefined;
    "aria-describedby": string | undefined;
    className: string;
  }) => React.ReactNode;
};

export const Field = ({ id, label, required, help, error, onDark, className, children }: FieldProps) => {
  const helpId = help ? `${id}-help` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, helpId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn(onDark && "field-on-dark", className)}>
      <label htmlFor={id} className="field-label">
        {label}
        {required ? (
          <span className="text-alert" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="field-label-note"> — optional</span>
        )}
      </label>

      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
        className: "field-input",
      })}

      {error ? (
        <InlineFieldError id={errorId}>{error}</InlineFieldError>
      ) : help ? (
        <p id={helpId} className="field-help">
          {help}
        </p>
      ) : null}
    </div>
  );
};

/** Tap-select card — a large, thumb-friendly alternative to a radio group. */
export const TapSelectCard = ({
  selected,
  onSelect,
  children,
  className,
  ...rest
}: {
  selected: boolean;
  onSelect: () => void;
  children: React.ReactNode;
  className?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onSelect">) => (
  <button type="button" aria-pressed={selected} onClick={onSelect} className={cn("tap-card", className)} {...rest}>
    {children}
  </button>
);

export default Field;
