import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

import ownerPhoto from "@/assets/team/owner-placeholder.jpg";
import pmPhoto from "@/assets/team/pm-placeholder.jpg";
import crewLeadPhoto from "@/assets/team/crew-lead-placeholder.jpg";

const team = [
  {
    name: "James McAllister",
    role: "Owner & General Contractor",
    bio: "20+ years across Western NC. Licensed GC. CertainTeed Master Applicator. Leads every project estimate and final walkthrough personally — because the owner's name is on the warranty.",
    image: ownerPhoto,
    featured: true,
  },
  {
    name: "Sarah Coleman",
    role: "Project Coordinator",
    bio: "Your single point of contact from first call to warranty delivery. Manages scheduling, client communication, and documentation so nothing falls through the cracks.",
    image: pmPhoto,
    featured: false,
  },
  {
    name: "Marcus Rivera",
    role: "Crew Lead — Roofing",
    bio: "12 years on mountain roofs. Specializes in standing seam metal and complex multi-gable work. Runs the most disciplined crew in the region — ask any homeowner who's watched them work.",
    image: crewLeadPhoto,
    featured: false,
  },
];

const MeetTheTeam = () => {
  return (
    <section className="section-padding bg-secondary tartan-bg relative overflow-hidden">
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left — narrative */}
          <div>
            <ScrollReveal variant="fade">
              <span className="eyebrow mb-3 block">The People Behind the Work</span>
            </ScrollReveal>
            <HeadingReveal delay={0.1}>
              <h2 className="section-heading mb-5">
                You'll Know Exactly<br /> Who's on Your Roof.
              </h2>
            </HeadingReveal>
            <GoldLine width="3rem" delay={0.3} className="mb-6" />
            <ScrollReveal variant="rise-subtle" delay={0.3}>
              <div>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-body mb-4">
                  Highlander isn't a franchise with rotating subcontractors. It's a family-operated company
                  where the owner answers the phone, walks your property, and personally signs off on 
                  every completed project.
                </p>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-body mb-4">
                  Every crew member is trained, vetted, and accountable to the same standard. When you 
                  hire Highlander, you know the names of the people on your property — and you know 
                  exactly who to call if you have a question.
                </p>
                <p className="text-foreground/70 text-sm font-body font-medium italic mb-8">
                  "Our reputation rides on every roof, every renovation, every handshake."
                </p>
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors font-body link-draw"
                >
                  Meet the Full Team
                  <ArrowRight className="w-3.5 h-3.5 btn-arrow-icon" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — team cards */}
          <div className="space-y-4">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.5, ease: HIGHLAND_EASE }}
                className={`group flex gap-4 md:gap-5 rounded-none border overflow-hidden transition-all duration-500 ${
                  member.featured
                    ? "bg-card border-[hsl(var(--highland-gold)/0.2)] shadow-[0_6px_28px_-8px_hsl(var(--heritage-charcoal)/0.06)] p-0 flex-col sm:flex-row"
                    : "bg-card/60 border-border hover:border-[hsl(var(--highland-gold)/0.12)] hover:bg-card hover:shadow-[0_6px_24px_-8px_hsl(var(--heritage-charcoal)/0.05)] p-4 md:p-5"
                }`}
                style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
              >
                {/* Photo — featured gets editorial treatment */}
                <div className={`flex-shrink-0 overflow-hidden ${
                  member.featured
                    ? "w-full sm:w-36 md:w-44 aspect-[3/4] sm:aspect-auto"
                    : "w-16 h-20 md:w-20 md:h-24 rounded-none"
                }`}>
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className={`w-full h-full object-cover ${member.featured ? 'img-zoom-dramatic' : 'team-card-photo'}`}
                    loading="lazy"
                    width={512}
                    height={640}
                  />
                </div>

                {/* Info */}
                <div className={`flex-1 min-w-0 ${member.featured ? 'p-5 md:p-7 flex flex-col justify-center' : ''}`}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className={`font-heading font-bold text-foreground leading-snug ${member.featured ? 'text-lg md:text-xl' : 'text-base'}`}>
                      {member.name}
                    </h3>
                    {member.featured && (
                      <span className="text-[8px] font-body font-semibold uppercase tracking-[0.15em] text-[hsl(var(--highland-gold))] bg-[hsl(var(--highland-gold)/0.08)] px-2.5 py-1 rounded-none">
                        Leadership
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-body font-semibold uppercase tracking-[0.14em] text-accent mb-2.5">
                    {member.role}
                  </p>
                  <p className={`text-muted-foreground leading-relaxed font-body ${member.featured ? 'text-sm' : 'text-[13px]'}`}>
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;
