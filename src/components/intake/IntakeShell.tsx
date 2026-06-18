import { ReactNode } from "react";
import { Phone, Shield, Award, Clock, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";


type Props = {
  eyebrow: string;
  title: string;
  subhead: string;
  sidebarBullets: string[];
  otherIntakeLabel: string;
  otherIntakeHref: string;
  children: ReactNode;
};

/**
 * Premium two-column intake layout shared by Roofing + Construction intake.
 * Left = brand/trust panel. Right = the form. On mobile, brand collapses
 * into a slim header above the form.
 */
const IntakeShell = ({
  eyebrow, title, subhead, sidebarBullets, otherIntakeLabel, otherIntakeHref, children,
}: Props) => {
  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* === Brand / trust column === */}
          <aside className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="flex items-center gap-2 mb-5">
              <div className="h-px w-8 bg-[hsl(var(--highland-gold))]" />
              <span className="text-[10px] font-body font-semibold uppercase tracking-[0.3em] text-[hsl(var(--highland-gold))]">
                {eyebrow}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-[-0.02em] leading-[1.05] mb-5">
              {title}
            </h1>

            <p className="text-foreground/65 text-[15px] md:text-[16px] font-body leading-[1.75] mb-8 max-w-md">
              {subhead}
            </p>

            {/* What to expect */}
            <div className="border-l-2 border-[hsl(var(--highland-gold)/0.35)] pl-5 mb-8 space-y-3">
              {sidebarBullets.map((b) => (
                <p key={b} className="text-foreground/70 text-[13.5px] font-body leading-relaxed">
                  {b}
                </p>
              ))}
            </div>

            {/* Trust strip */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { icon: Shield,  text: "Licensed GC" },
                { icon: Award,   text: "Master Applicator" },
                { icon: Clock,   text: "24-hr Storm Response" },
                { icon: MapPin,  text: "8 WNC Counties" },
              ].map((t) => (
                <div key={t.text} className="flex items-center gap-2 text-foreground/55 text-[12px] font-body">
                  <t.icon className="w-3.5 h-3.5 text-[hsl(var(--highland-gold)/0.7)] flex-shrink-0" />
                  <span>{t.text}</span>
                </div>
              ))}
            </div>

            {/* Phone alt path */}
            <div className="mt-8 pt-6 border-t border-border/60">
              <p className="text-[11px] font-body uppercase tracking-[0.18em] text-foreground/40 mb-2">
                Prefer to talk?
              </p>
              <a
                href="tel:8285247773"
                className="inline-flex items-center gap-2.5 text-foreground hover:text-[hsl(var(--highland-gold))] transition-colors font-heading font-semibold text-[14px]"
              >
                <Phone className="w-4 h-4 text-[hsl(var(--highland-gold))]" />
                (828) 524-7773
              </a>
            </div>

            {/* Cross-link to other intakes */}
            <div className="mt-6 pt-6 border-t border-border/60">
              <p className="text-[11px] font-body uppercase tracking-[0.18em] text-foreground/40 mb-3">
                Need a different form?
              </p>
              <div className="flex flex-col gap-2">
                <Link
                  to="/roofing-intake"
                  className="text-[13px] font-body font-medium text-foreground/70 hover:text-[hsl(var(--highland-gold))] transition-colors inline-flex items-center gap-2"
                >
                  Roofing Intake <ArrowRight className="w-3 h-3" />
                </Link>
                <Link
                  to="/construction-intake"
                  className="text-[13px] font-body font-medium text-foreground/70 hover:text-[hsl(var(--highland-gold))] transition-colors inline-flex items-center gap-2"
                >
                  Construction Intake <ArrowRight className="w-3 h-3" />
                </Link>
                <Link
                  to="/design-intake?mode=long"
                  className="text-[13px] font-body font-medium text-foreground/70 hover:text-[hsl(var(--highland-gold))] transition-colors inline-flex items-center gap-2"
                >
                  Design Intake <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

          </aside>

          {/* === Form column === */}
          <div className="lg:col-span-7">
            <div className="bg-card border border-border rounded-lg shadow-sm p-6 md:p-9 relative overflow-hidden">
              {/* Highland Heritage Accent */}
              <div 
                className="absolute top-0 left-0 right-0 h-1 opacity-[0.25]" 
                style={{ 
                  backgroundImage: "url('/tartan.png')",
                  backgroundSize: "80px auto",
                  backgroundRepeat: "repeat"
                }} 
              />
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntakeShell;