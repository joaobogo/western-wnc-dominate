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

const TrustStrip = () => {
  return (
    <section className="bg-primary text-primary-foreground py-8 md:py-12">
      <div className="container-tight px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {credentials.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex flex-col items-center text-center gap-2"
            >
              <item.icon className="w-8 h-8 text-accent mb-1" />
              <h3 className="font-heading font-semibold text-sm md:text-base">{item.title}</h3>
              <p className="text-primary-foreground/70 text-xs md:text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
