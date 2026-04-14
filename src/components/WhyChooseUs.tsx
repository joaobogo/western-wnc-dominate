import { motion } from "framer-motion";
import { Mountain, Users, ShieldCheck, Clock } from "lucide-react";

const pillars = [
  {
    icon: Mountain,
    title: "Mountain Climate Expertise",
    description:
      "We understand the demands of WNC weather — heavy snow loads, high winds, and summer storms. Every installation is specified for elevation and exposure.",
  },
  {
    icon: Users,
    title: "Family-Owned, Locally Operated",
    description:
      "40+ years of combined experience, serving our neighbors across Franklin, Highlands, Cashiers, Sylva, and beyond since 2017.",
  },
  {
    icon: ShieldCheck,
    title: "Warranty-Backed Workmanship",
    description:
      "Every project carries full labor and material warranties. CertainTeed Master Shingle Applicator certified — your investment is documented and protected.",
  },
  {
    icon: Clock,
    title: "Rapid Response, Clear Communication",
    description:
      "We respond within 24 hours with clear next steps. Emergency tarping, insurance documentation, and priority scheduling when storms hit.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-secondary relative overflow-hidden tartan-accent">
      <div className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-[0.15em] mb-3">Why Highlander</p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4"
            >
              Precision. Integrity.
              <br /> Mountain Knowledge.
            </motion.h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="group flex gap-4 md:gap-5"
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-sm bg-primary/8 flex items-center justify-center">
                <pillar.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-heading font-semibold text-foreground mb-2">{pillar.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;