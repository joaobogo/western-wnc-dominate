import { motion } from "framer-motion";
import { Mountain, Users, ShieldCheck, Clock } from "lucide-react";

const pillars = [
  {
    icon: Mountain,
    title: "Mountain Climate Expertise",
    description: "We understand WNC weather — heavy snow loads, high winds, and summer storms. Every installation is specified for elevation and exposure.",
  },
  {
    icon: Users,
    title: "Family-Owned Since 2017",
    description: "40+ years of combined experience, serving our neighbors across Franklin, Highlands, Cashiers, Sylva, and beyond.",
  },
  {
    icon: ShieldCheck,
    title: "Warranty-Backed Workmanship",
    description: "Every project carries full labor and material warranties. CertainTeed Master Shingle Applicator certified.",
  },
  {
    icon: Clock,
    title: "Rapid Response, Clear Communication",
    description: "We respond within 24 hours with clear next steps. Emergency tarping, insurance documentation, and priority scheduling when storms hit.",
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
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="eyebrow mb-3 block">Why Highlander</span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="section-heading mb-4"
            >
              Precision. Integrity.<br /> Mountain Knowledge.
            </motion.h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex gap-5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-primary/8 flex items-center justify-center mt-0.5">
                <pillar.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{pillar.title}</h3>
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