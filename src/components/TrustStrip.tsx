import { Shield, Award, FileCheck, Star } from "lucide-react";
import { motion } from "framer-motion";

const credentials = [
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Full coverage on every project",
  },
  {
    icon: Award,
    title: "5x Best of Macon County",
    description: "Franklin's Press Readers' Choice",
  },
  {
    icon: FileCheck,
    title: "Labor & Material Warranty",
    description: "Your investment, protected",
  },
  {
    icon: Star,
    title: "4.7 ★ Google Rating",
    description: "122+ verified reviews",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const } },
};

const TrustStrip = () => {
  return (
    <section className="bg-primary text-primary-foreground py-8 md:py-12">
      <div className="container-tight px-4 md:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {credentials.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="group flex flex-col items-center text-center gap-2"
            >
              <div className="w-14 h-14 rounded-full bg-primary-foreground/10 flex items-center justify-center mb-1 group-hover:bg-primary-foreground/20 group-hover:scale-110 transition-all duration-300">
                <item.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-sm md:text-base">{item.title}</h3>
              <p className="text-primary-foreground/70 text-xs md:text-sm">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustStrip;
