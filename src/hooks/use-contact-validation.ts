import { useCallback, useMemo, useState } from "react";
import {
  validateContact,
  formatPhoneInput,
  type ContactInput,
  type ContactErrors,
} from "@/lib/lead-validation";

export type ContactField = keyof ContactErrors;

/**
 * Shared inline-validation state for intake forms.
 *
 * Errors only surface after a field is blurred (or after a submit attempt),
 * so nobody sees a red message while they're still typing. Every message is
 * returned per-field for rendering under the input — never toast-only.
 */
export function useContactValidation(input: ContactInput) {
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [attempted, setAttempted] = useState(false);

  const result = useMemo(() => validateContact(input), [
    input.name, input.email, input.phone, input.town, input.zip, input.address,
    // `require` is a literal in call sites; compare by value.
    JSON.stringify(input.require ?? {}),
  ]);

  const blur = useCallback(
    (field: ContactField) => setTouched((t) => ({ ...t, [field]: true })),
    [],
  );

  /** Message to render under a field right now, or undefined. */
  const errorFor = useCallback(
    (field: ContactField) =>
      attempted || touched[field] ? result.errors[field] : undefined,
    [attempted, touched, result.errors],
  );

  /** Call on submit. Reveals every message and returns whether it's safe to send. */
  const markAttempted = useCallback(() => {
    setAttempted(true);
    return result.valid;
  }, [result.valid]);

  const reset = useCallback(() => {
    setTouched({});
    setAttempted(false);
  }, []);

  return {
    ...result,
    errorFor,
    blur,
    markAttempted,
    reset,
    attempted,
    formatPhoneInput,
  };
}
