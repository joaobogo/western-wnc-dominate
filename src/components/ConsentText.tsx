import { Link } from "react-router-dom";

/**
 * Carrier/TCPA-style consent notice shown under every form that
 * collects phone/email contact details.
 */
export default function ConsentText({ className = "" }: { className?: string }) {
  return (
    <p className={`text-caption leading-relaxed text-muted-foreground font-body ${className}`}>
      By submitting your information, you agree that Highlander Building Services, Inc. may
      contact you by phone, text, or email about your inquiry, services, scheduling,
      project follow-up, and review requests. Message and data rates may apply. Reply STOP
      to opt out of text messages. Reply HELP for help. See our{" "}
      <Link to="/privacy-policy" className="underline hover:text-foreground">
        Privacy Policy
      </Link>
      .
    </p>
  );
}