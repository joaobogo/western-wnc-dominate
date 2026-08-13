import { useLocation } from "react-router-dom";
import type { ReactNode } from "react";

/**
 * Paid landing discipline (Prompt 40): ad traffic should meet one offer and one
 * action. Global distractions (chatbot, exit-intent recovery) are suppressed on
 * /lp/* routes so nothing competes with the form or the call bar.
 */
export const useIsPaidLanding = () => useLocation().pathname.startsWith("/lp/");

const PaidLandingGate = ({ children }: { children: ReactNode }) => {
  const isPaidLanding = useIsPaidLanding();
  if (isPaidLanding) return null;
  return <>{children}</>;
};

export default PaidLandingGate;
