import { PHONE_DISPLAY, PHONE_PLAIN, PHONE_TEL } from "@/data/business";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Users, MapPin, Phone, UserCircle } from "lucide-react";
import { teamMembers } from "@/data/team";

const luke = teamMembers.find((m) => m.slug === "luke-smith");
const kristy = teamMembers.find((m) => m.slug === "kristy-smith");

interface WhoShowsUpProps {
  town?: string;
  tone?: "light" | "dark";
  className?: string;
  showLink?: boolean;
}

/**
 * Compact team-and-locality proof block.
 *
 * Reuses the existing founder imagery from src/data/team and answers the
 * "who is actually showing up?" objection without inventing staff or
 * credentials. Intended to sit within one screen of a primary CTA on main
 * service and town pages.
 */
const WhoShowsUp = ({
  town,
  tone = "light",
  className = "",
  showLink = true,
}: WhoShowsUpProps) => {
  const isDark = tone === "dark";
  const textMain = isDark ? "text-dark-section-foreground" : "text-foreground";
  const textMuted = isDark ? "text-dark-section-foreground" : "text-muted-foreground";
  const cardBg = isDark ? "bg-dark-section-foreground/[0.04]" : "bg-card";
  const border = isDark ? "border-dark-section-border" : "border-border";

  return (
    <section
      className={`section-padding ${isDark ? "tartan-dark" : "bg-secondary/40"} ${className}`}
      aria-label="Who shows up from Highlander"
    >
      <div className="container-tight">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Founder photos — compact, side-by-side on desktop, stacked on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-5"
          >
            <div className="flex items-center justify-center sm:justify-start gap-4">
              {luke && (
                <div className="text-center">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 overflow-hidden rounded-sm border-2 border-[hsl(var(--highland-gold)/0.3)] shadow-raised">
                    <img
                      src={luke.image}
                      alt={luke.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                      width={320}
                      height={400}
                    />
                  </div>
                  <p className="mt-2.5 text-sm font-heading font-bold text-[hsl(var(--gold-ink))]">
                    {luke.name}
                  </p>
                  <p className="text-caption font-body text-muted-foreground uppercase tracking-wider">
                    {luke.role}
                  </p>
                </div>
              )}
              {luke && kristy && (
                <div className="hidden sm:block w-px h-24 bg-[hsl(var(--highland-gold)/0.2)]" />
              )}
              {kristy && (
                <div className="text-center">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 overflow-hidden rounded-sm border-2 border-[hsl(var(--highland-gold)/0.3)] shadow-raised">
                    <img
                      src={kristy.image}
                      alt={kristy.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                      width={320}
                      height={400}
                    />
                  </div>
                  <p className="mt-2.5 text-sm font-heading font-bold text-[hsl(var(--gold-ink))]">
                    {kristy.name}
                  </p>
                  <p className="text-caption font-body text-muted-foreground uppercase tracking-wider">
                    {kristy.role}
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Copy and proof points */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <span className="eyebrow mb-3 block">
              {town ? `Serving ${town}` : "Local People. Local Accountability."}
            </span>
            <h2 className={`section-heading mb-4 ${textMain}`}>
              Who shows up at your property.
            </h2>
            <p className={`text-base md:text-lg leading-relaxed font-body mb-6 ${textMuted}`}>
              {town ? (
                <>
                  Highlander Building Services is owned and operated by{" "}
                  <strong className={textMain}>Luke and Kristy Smith</strong>. For every{" "}
                  {town} project, you get a single named point of contact from inspection through
                  completion — backed by Western NC-based crews and a Franklin office that answers
                  the phone.
                </>
              ) : (
                <>
                  Highlander Building Services is owned and operated by{" "}
                  <strong className={textMain}>Luke and Kristy Smith</strong>. Every project gets a
                  single named point of contact from inspection through completion — backed by
                  Western NC-based crews and a Franklin office that answers the phone.
                </>
              )}
            </p>

            <div className={`grid sm:grid-cols-3 gap-4 p-5 rounded-sm border ${cardBg} ${border}`}>
              <div className="flex items-start gap-3">
                <UserCircle className="w-4 h-4 mt-0.5 text-[hsl(var(--gold-ink))] flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className={`text-body-xs font-heading font-bold ${textMain}`}>
                    One named contact
                  </p>
                  <p className={`text-body-xs font-body leading-relaxed ${textMuted}`}>
                    Same person from quote to final walkthrough.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-[hsl(var(--gold-ink))] flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className={`text-body-xs font-heading font-bold ${textMain}`}>
                    Western NC crews
                  </p>
                  <p className={`text-body-xs font-body leading-relaxed ${textMuted}`}>
                    Based in Franklin, not a traveling subcontractor network.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-4 h-4 mt-0.5 text-[hsl(var(--gold-ink))] flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className={`text-body-xs font-heading font-bold ${textMain}`}>
                    Owner-led
                  </p>
                  <p className={`text-body-xs font-body leading-relaxed ${textMuted}`}>
                    Luke and Kristy set the standards the team follows.
                  </p>
                </div>
              </div>
            </div>

            {showLink && (
              <div className="mt-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Link
                  to="/team"
                  className="group inline-flex items-center gap-2 text-sm font-heading font-bold text-primary hover:text-primary/80 transition-colors"
                >
                  Meet the Highlander team
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
                <span className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/40" />
                <a
                  href={PHONE_TEL}
                  className="inline-flex items-center gap-2 text-sm font-heading font-bold text-[hsl(var(--gold-ink))] hover:text-[hsl(var(--gold-ink))]/80 transition-colors"
                  aria-label={`Call Highlander Building Services at ${PHONE_PLAIN}`}
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  {PHONE_DISPLAY}
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoShowsUp;
