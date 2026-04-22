import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import { ScrollReveal } from "@/components/motion";
import HeadingReveal from "@/components/motion/HeadingReveal";
import GoldLine from "@/components/motion/GoldLine";
import { useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HIGHLAND_EASE = [0.22, 1, 0.36, 1] as any;

import ownerPhoto from "@/assets/team/owner-placeholder.jpg";
import pmPhoto from "@/assets/team/pm-placeholder.jpg";
import crewLeadPhoto from "@/assets/team/crew-lead-placeholder.jpg";

const team = [
  {
    name: "James McAllister",
    role: "Owner & General Contractor",
    credential: "Licensed GC · CertainTeed Master Applicator",
    years: "20+",
    bio: "Personally estimates every project and walks every completed surface. When your warranty has the owner's name on it, that means something different here.",
    image: ownerPhoto,
  },
  {
    name: "Sarah Coleman",
    role: "Project Coordinator",
    credential: "Client Communication Lead",
    years: "8",
    bio: "Your single point of contact from first call to warranty delivery. Scheduling, documentation, daily updates — nothing falls through because one person owns the entire communication chain.",
    image: pmPhoto,
  },
  {
    name: "Marcus Rivera",
    role: "Crew Lead — Roofing",
    credential: "Standing Seam & Complex Roof Specialist",
    years: "12",
    bio: "Specializes in standing seam and complex multi-gable work above 3,000 feet. Runs the tightest crew in the region — ask any property owner who's watched them work.",
    image: crewLeadPhoto,
  },
];

const TeamCard = ({ member, index }: { member: typeof team[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    cardRef.current.style.setProperty('--mouse-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: HIGHLAND_EASE }}
      className="group relative bg-card border border-border rounded-none overflow-hidden spotlight-hover hover:border-[hsl(var(--highland-gold)/0.18)] transition-all duration-500"
    >
      {/* Left gold accent on hover */}
      <div className="absolute left-0 top-0 w-[2px] h-0 bg-[hsl(var(--highland-gold))] group-hover:h-full transition-all duration-600 z-10" />

      {/* Photo — curtain reveal */}
      <div className="relative h-56 md:h-64 overflow-hidden">
        <motion.div
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          whileInView={{ clipPath: "inset(0 0 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.1, ease: HIGHLAND_EASE }}
          className="absolute inset-0"
        >
          <motion.img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-top"
            loading="lazy"
            initial={{ scale: 1.12 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, delay: index * 0.1 + 0.15, ease: HIGHLAND_EASE }}
          />
        </motion.div>
        {/* Cinematic gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

        {/* Years badge */}
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-1 group-hover:translate-y-0">
          <div className="bg-[hsl(var(--highland-gold)/0.12)] backdrop-blur-md border border-[hsl(var(--highland-gold)/0.2)] px-2.5 py-1.5 text-center">
            <span className="block text-lg font-heading font-bold text-[hsl(var(--highland-gold))] leading-none">{member.years}</span>
            <span className="block text-[7px] font-body uppercase tracking-[0.15em] text-[hsl(var(--highland-gold)/0.6)] mt-0.5">Years</span>
          </div>
        </div>

        {/* Name overlay at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 z-10">
          <h3 className="text-lg md:text-xl font-heading font-bold text-foreground leading-tight tracking-tight">
            {member.name}
          </h3>
          <span className="text-[11px] font-body font-semibold uppercase tracking-[0.15em] text-[hsl(var(--highland-gold)/0.7)]">
            {member.role}
          </span>
        </div>
      </div>

      {/* Gold accent line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[hsl(var(--highland-gold)/0.2)] to-transparent" />

      {/* Content */}
      <div className="p-5 md:p-6">
        {/* Credential tag */}
        <div className="mb-3">
          <span className="text-[9px] font-body font-bold uppercase tracking-[0.12em] text-muted-foreground/40 bg-secondary/60 px-2.5 py-1">
            {member.credential}
          </span>
        </div>

        {/* Bio */}
        <p className="text-muted-foreground text-[13px] leading-[1.75] font-body">
          {member.bio}
        </p>
      </div>
    </motion.div>
  );
};

const MeetTheTeam = () => {
  return (
    <section className="section-padding bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 tartan-bg opacity-30" />

      <div className="container-tight relative z-10">
        {/* Header — two column: narrative left, CTA right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-14 mb-14 md:mb-18">
          <div className="lg:col-span-3">
            <ScrollReveal variant="fade">
              <span className="eyebrow mb-3 block">Who Shows Up</span>
            </ScrollReveal>
            <HeadingReveal delay={0.1}>
              <h2 className="section-heading mb-5">
                The Same Crew.<br className="hidden md:block" />
                <span className="text-[hsl(var(--highland-gold))]"> Every Project. No Subcontractors.</span>
              </h2>
            </HeadingReveal>
            <GoldLine width="3rem" delay={0.25} className="mb-5" />
            <ScrollReveal variant="rise-subtle" delay={0.3}>
              <p className="text-muted-foreground text-[15px] leading-relaxed font-body max-w-lg">
                We're not a franchise with interchangeable crews. The owner answers the phone,
                walks your property, and personally signs off on every project. You'll work with
                real people who live in these counties and stake their name on the result.
              </p>
            </ScrollReveal>
          </div>

          {/* Right — owner quote */}
          <div className="lg:col-span-2 flex items-end">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6, ease: HIGHLAND_EASE }}
              className="relative bg-card border border-border rounded-none p-6 md:p-7 w-full"
            >
              <Quote className="absolute top-4 right-4 w-6 h-6 text-foreground/[0.04] rotate-180" />
              <p className="text-foreground/70 text-sm font-body italic leading-relaxed mb-4 relative z-10">
                "I sign every warranty because my family's name is on this company. That's the only quality control that actually works."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-none overflow-hidden">
                  <img src={ownerPhoto} alt="James McAllister" className="w-full h-full object-cover"  loading="lazy" decoding="async" />
                </div>
                <div>
                  <span className="text-xs font-heading font-bold text-foreground">James McAllister</span>
                  <span className="block text-[10px] font-body text-muted-foreground/50">Owner & General Contractor</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {team.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10 md:mt-14"
        >
          <Link
            to="/about"
            className="group inline-flex items-center gap-2.5 font-heading font-bold text-[13px] tracking-wide text-foreground hover:text-[hsl(var(--highland-gold))] transition-colors duration-300"
          >
            Meet the Full Team
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-[11px] text-muted-foreground/40 font-body mt-2">
            Every crew member trained, vetted, and accountable to one standard.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MeetTheTeam;
