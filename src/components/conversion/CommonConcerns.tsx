import { motion } from "framer-motion";
import { DollarSign, FileText, CalendarClock, Users, Sparkles } from "lucide-react";

export interface ConcernItem {
  icon: typeof DollarSign;
  concern: string;
  answer: string;
}

/**
 * The five objections we actually hear. Answers describe concrete process only —
 * no guarantees, no warranty claims, no timing we cannot honor.
 */
export const defaultConcerns: ConcernItem[] = [
  {
    icon: DollarSign,
    concern: "\"I don't know what this will cost.\"",
    answer:
      "We measure your roof on site and send a written, grouped-cost scope that names materials, quantities, and labor line by line. You see what drives the number before you decide anything, and nothing is added later without a signed change order.",
  },
  {
    icon: FileText,
    concern: "\"I don't want to fight my insurance company.\"",
    answer:
      "We document the damage with dated photos and a written condition report you can submit with your claim, and we can meet the adjuster on site so everyone is reading the same roof. We do not decide your claim, but we make sure the evidence is complete and the scope language is clear.",
  },
  {
    icon: CalendarClock,
    concern: "\"Contractors always run behind.\"",
    answer:
      "Mountain weather moves schedules, so we build the calendar around real weather windows and tell you the plan in writing before materials are ordered. If a date shifts, you hear it from your project contact the same day rather than finding out from an empty driveway.",
  },
  {
    icon: Users,
    concern: "\"Who is actually showing up at my house?\"",
    answer:
      "Our crews are Franklin-based and led by a foreman you meet before work starts, not a rotating pool of day labor. You get one named point of contact for the whole project and daily progress updates while the crew is on your property.",
  },
  {
    icon: Sparkles,
    concern: "\"I'll be cleaning up nails for a year.\"",
    answer:
      "We tarp landscaping and staging areas, keep debris moving to the dumpster through the day, and run magnetic sweeps of the drive and lawn before we leave each evening. The final walkthrough is done with you, and anything you spot gets handled before we call it complete.",
  },
];

interface CommonConcernsProps {
  heading?: string;
  intro?: string;
  concerns?: ConcernItem[];
  className?: string;
}

const CommonConcerns = ({
  heading = "Common concerns, answered straight",
  intro = "The five questions we hear most often — and exactly what we do about each one.",
  concerns = defaultConcerns,
  className = "",
}: CommonConcernsProps) => (
  <section className={`section-padding bg-background ${className}`} aria-label="Common concerns">
    <div className="container-tight">
      <div className="max-w-2xl mb-10">
        <span className="eyebrow mb-3 block">Straight Answers</span>
        <h2 className="section-heading mb-3">{heading}</h2>
        <p className="text-muted-foreground font-body">{intro}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {concerns.map((c, i) => (
          <motion.div
            key={c.concern}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.45 }}
            className="card-premium p-5 md:p-6 rounded-sm"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-sm bg-primary/8 flex items-center justify-center flex-shrink-0">
                <c.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{c.concern}</h3>
                <p className="text-[13px] md:text-sm leading-relaxed font-body text-muted-foreground">
                  {c.answer}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CommonConcerns;
