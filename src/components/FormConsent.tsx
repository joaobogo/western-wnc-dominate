import { Link } from "react-router-dom";

/**
 * Inline TCPA / privacy consent shown directly above the submit button on
 * any form that collects a phone number or email. Keep it readable, not tiny.
 */
const FormConsent = ({ className = "" }: { className?: string }) => (
  <p
    className={`text-[12px] md:text-[12.5px] leading-relaxed text-muted-foreground font-body ${className}`}
  >
    By submitting this form, you agree that Highlander Roofing Services, Inc.
    may contact you by phone, text, or email about your inquiry, services,
    scheduling, project follow-up, and review requests. Message and data rates
    may apply. Reply <strong>STOP</strong> to opt out of text messages. Reply{" "}
    <strong>HELP</strong> for help. See our{" "}
    <Link to="/privacy-policy" className="text-primary underline hover:no-underline">
      Privacy Policy
    </Link>
    .
  </p>
);

export default FormConsent;