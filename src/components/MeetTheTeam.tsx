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
    bio: "20+ years in roofing and construction across Western NC. Licensed GC. CertainTeed Master Applicator. Leads every project estimate and final walkthrough personally.",
    image: ownerPhoto,
    featured: true,
  },
  {
    name: "Sarah Coleman",
    role: "Project Coordinator",
    bio: "Manages scheduling, client communication, and documentation. Your single point of contact from first call to warranty delivery.",
    image: pmPhoto,
    featured: false,
  },
  {
    name: "Marcus Rivera",
    role: "Crew Lead — Roofing",
    bio: "12 years on mountain roofs. Specializes in metal standing seam and complex multi-gable installations. Runs the tightest crew in the region.",
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
              <span className="eyebrow mb-3 block">Our Team</span>
            </ScrollReveal>
            <HeadingReveal delay={0.1}>
              <h2 className="section-heading mb-5">
                Real People.<br /> Real Accountability.
              </h2>
            </HeadingReveal>
            <GoldLine width="3rem" delay={0.3} className="mb-6" />
            <ScrollReveal variant="rise-subtle" delay={0.3}>
              <div>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-body mb-4">
                  Highlander isn't a franchise. It's a family-operated company where the owner answers 
                  the phone, walks your property, and shows up at your final walkthrough. Every crew 
                  member is trained, vetted, and accountable to the same standard.
                </p>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-body mb-8">
                  When you hire Highlander, you know exactly who's on your roof and who to call 
                  if you have a question. That's not a policy — it's how we've always worked.
                </p>
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors font-body"
                >
                  Learn Our Full Story
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — team cards with staggered slide-in */}
          <div className="space-y-4">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.5, ease: HIGHLAND_EASE }}
                className={`group flex gap-4 md:gap-5 p-4 md:p-5 rounded-sm border transition-all duration-300 ${
                  member.featured
                    ? "bg-card border-[hsl(var(--highland-gold)/0.2)] shadow-[0_4px_20px_-6px_hsl(var(--heritage-charcoal)/0.06)]"
                    : "bg-card/60 border-border hover:border-[hsl(var(--highland-gold)/0.15)] hover:bg-card"
                }`}
              >
                {/* Photo with subtle scale on hover */}
                <div className="flex-shrink-0 w-16 h-20 md:w-20 md:h-24 rounded-sm overflow-hidden">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    loading="lazy"
                    width={512}
                    height={640}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-heading font-semibold text-base text-foreground leading-snug">
                      {member.name}
                    </h3>
                    {member.featured && (
                      <span className="text-[8px] font-body font-semibold uppercase tracking-[0.15em] text-[hsl(var(--highland-gold))] bg-[hsl(var(--highland-gold)/0.08)] px-2 py-0.5 rounded-sm">
                        Leadership
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-body font-semibold uppercase tracking-[0.12em] text-accent mb-2">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-[13px] leading-relaxed font-body">
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
