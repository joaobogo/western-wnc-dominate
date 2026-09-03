import { CREDENTIALS, VERIFIED_AWARDS, awardLabel } from "@/data/business";
import { ShieldCheck, Award, BadgeCheck, Home, Wrench, ExternalLink } from "lucide-react";

/**
 * Sitewide trust strip — ONLY items we can prove with a license lookup,
 * a public profile, or a manufacturer certificate.
 *
 * Source of truth: `BUSINESS.credentials` in `src/data/business.ts`.
 * Nothing here may be hard-coded, softened, or extended locally; unverified
 * claims (experience totals, response guarantees, warranty years) belong in
 * CLAIMS_AUDIT.md until the owner supplies proof.
 */

const ICONS = [ShieldCheck, Award, BadgeCheck, Wrench, Home];

interface Props {
  /** `dark` inverts for the footer/primary surfaces. */
  tone?: "default" | "dark";
  className?: string;
}

const VerifiableTrustStrip = ({ tone = "default", className = "" }: Props) => {
  const dark = tone === "dark";
  // Verified awards join the strip automatically; unverified ones render nowhere.
  const items = [
    ...CREDENTIALS,
    ...VERIFIED_AWARDS.map((a) => ({ label: awardLabel(a), detail: a.detail, href: a.href })),
  ];


  return (
    <section
      aria-label="Licensing, accreditation and certifications"
      className={`border-y ${dark ? "border-primary-foreground/10 bg-primary text-primary-foreground" : "border-border bg-secondary/40"} ${className}`}
    >
      <div className="container-tight px-6 md:px-10 py-6 md:py-8">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 lg:gap-6">
          {items.map((c, i) => {
            const Icon = ICONS[i % ICONS.length];
            const body = (
              <>
                <Icon
                  className={`w-4 h-4 mt-0.5 flex-shrink-0 ${dark ? "text-accent" : "text-[hsl(var(--gold-ink))]"}`}
                  aria-hidden="true"
                />
                <span>
                  <span className="block text-body-xs font-heading font-bold leading-snug">
                    {c.label}
                    {c.href && (
                      <ExternalLink className="inline-block w-3 h-3 ml-1 -mt-0.5 opacity-70" aria-hidden="true" />
                    )}
                  </span>
                  {c.detail && (
                    <span
                      className={`block text-body-xs font-body leading-relaxed mt-0.5 ${dark ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                    >
                      {c.detail}
                    </span>
                  )}
                </span>
              </>
            );

            return (
              <li key={c.label} className="flex items-start gap-3">
                {c.href ? (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="flex items-start gap-3 hover:opacity-80 transition-opacity"
                  >
                    {body}
                  </a>
                ) : (
                  body
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default VerifiableTrustStrip;
