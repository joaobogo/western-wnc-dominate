import { useCallback, useState } from "react";

/** State for the shared lead-form honeypot (see components/forms/Honeypot). */
export function useHoneypot() {
  const [value, setValue] = useState("");
  const tripped = useCallback(() => value.trim().length > 0, [value]);
  return { value, setValue, tripped };
}
