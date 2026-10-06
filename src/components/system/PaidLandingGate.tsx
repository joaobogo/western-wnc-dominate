import { useLocation } from "react-router-dom";
import type { ReactNode } from "react";

/**
 * Paid landing discipline (Prompt 40): ad traffic should meet one offer and one
 * action. Global distractions (chatbot, exit-intent recovery) are suppressed on
 * /lp/* routes and the Lovable-safe root-query fallbacks so nothing competes
 * with the form or the call bar.
 */
export const useIsPaidLanding = () => {
  const { pathname, search } = useLocation();
  if (pathname.startsWith("/lp/")) return true;
  if (pathname !== "/") return false;
  const landing = new URLSearchParams(search).get("landing");
  return landing === "roofing" || landing === "construction" || landing === "roofing-construction" || landing === "combined";
};

const PaidLandingGate = ({ children }: { children: ReactNode }) => {
  const isPaidLanding = useIsPaidLanding();
  if (isPaidLanding) return null;
  return <>{children}</>;
};

export default PaidLandingGate;
