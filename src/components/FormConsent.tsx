import { Link } from "react-router-dom";

/**
 * Narrow project-inquiry disclosure used on forms that collect contact details.
 * Submitting a project request is not blanket SMS or marketing consent.
 */
const FormConsent = ({ className = "" }: { className?: string }) => (
  <p
    className={`text-body-xs md:text-body-xs leading-relaxed text-muted-foreground font-body ${className}`}
  >
    By submitting, you ask Highlander Building Services, Inc. to contact you
    about this project by phone or email. See our{" "}
    <Link
      to="/privacy-policy"
      className="text-primary [.section-dark_&]:text-[hsl(var(--gold-ink))] [.dark-surface_&]:text-[hsl(var(--gold-ink))] underline hover:no-underline"
    >
      Privacy Policy
    </Link>
    .
  </p>
);

export default FormConsent;
