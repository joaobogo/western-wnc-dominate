import { motion } from "framer-motion";
import { Mountain, Users, ShieldCheck, Clock, Award } from "lucide-react";

const pillars = [
  {
    icon: Mountain,
    title: "Mountain Climate Expertise",
    description: "We understand WNC weather — heavy snow loads, high winds, and summer storms. Every installation is specified for elevation and exposure.",
  },
  {
    icon: Users,
    title: "Family-Owned. Locally Run. Team-Driven.",
    description: "Founded in 2017 and powered by a local team — from leadership and consultants to inspectors, project managers, repair specialists, and crews — each playing a role in the customer experience.",
  },
  {
    icon: ShieldCheck,
    title: "Licensed & Credentialed",
    description: "Licensed NC General Contractor, CertainTeed ShingleMaster PREMIER Credentialed Contractor, and VELUX Certified Installer with project-specific terms documented in writing.",
  },
  {
    icon: Clock,
    title: "Clear Communication",
    description: "Requests are reviewed during staffed business hours, with project scope, scheduling, and next steps documented as the work moves forward.",
  },
  {
    icon: Award,
    title: "Established in Western North Carolina",
    description: "Family-owned in Franklin since 2017, with showrooms in Franklin and Sylva and service across the mountain region.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-secondary tartan-bg relative overflow-hidden">
      <div className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="eyebrow mb-3 block">Why Highlander</span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="section-heading mb-4"
            >
              Precision. Integrity.<br /> Mountain Knowledge.
            </motion.h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="group flex gap-5 p-5 md:p-6 bg-card border border-border rounded-none hover:border-[hsl(var(--highland-gold)/0.15)] hover:shadow-flat transition-all duration-500 spotlight-hover"
              style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-none bg-primary/8 flex items-center justify-center mt-0.5 group-hover:bg-primary/12 transition-colors duration-300">
                <pillar.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-heading font-bold text-foreground mb-1.5 tracking-tight">{pillar.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-body">{pillar.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;