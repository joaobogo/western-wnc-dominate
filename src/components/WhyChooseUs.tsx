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
    title: "Warranty-Backed Workmanship",
    description: "Every project carries full labor and material warranties. CertainTeed Master Shingle Applicator certified.",
  },
  {
    icon: Clock,
    title: "Rapid Response, Clear Communication",
    description: "We respond rapidly with clear next steps. Emergency tarping, insurance documentation, and priority scheduling when storms hit.",
  },
  {
    icon: Award,
    title: "Military Friendly Company",
    description: "We are proud to support our veterans and active-duty service members with dedicated discounts and priority support.",
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group flex gap-5 p-5 md:p-6 bg-card border border-border rounded-none hover:border-[hsl(var(--highland-gold)/0.15)] hover:shadow-[0_8px_28px_-8px_hsl(var(--heritage-charcoal)/0.06)] transition-all duration-500 spotlight-hover"
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