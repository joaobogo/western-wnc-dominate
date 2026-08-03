import { useCallback, useRef, useState } from "react";
import { submitLead, type LeadPayload, type SubmitLeadResult } from "@/lib/leads";

/**
 * Wraps submitLead with a double-submit guard.
 *
 * `submitting` drives the button's disabled state and spinner; a second call
 * while a submission is in flight is ignored outright, so a fast double click
 * can never create two leads.
 */
export function useLeadSubmit() {
  const [submitting, setSubmitting] = useState(false);
  const inFlight = useRef(false);

  const submit = useCallback(
    async (payload: LeadPayload): Promise<SubmitLeadResult | null> => {
      if (inFlight.current) return null;
      inFlight.current = true;
      setSubmitting(true);
      try {
        return await submitLead(payload);
      } catch (err) {
        console.error("submitLead failed:", err);
        return { id: null, error: err };
      } finally {
        inFlight.current = false;
        setSubmitting(false);
      }
    },
    [],
  );

  return { submitting, submit };
}
