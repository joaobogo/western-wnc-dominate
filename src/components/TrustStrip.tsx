import { Shield, Award, FileCheck, Star } from "lucide-react";
import { motion } from "framer-motion";

const credentials = [
  { icon: Shield, title: "Licensed & Insured", description: "Full coverage, every project" },
  { icon: Award, title: "Best of Macon County", description: "5× readers' choice winner" },
  { icon: FileCheck, title: "Workmanship Guarantee", description: "Labor & material warranty" },
  { icon: Star, title: "4.7 ★ Google Rating", description: "122+ verified reviews" },
];

const TrustStrip = () => {
  return (
    <section className="bg-primary text-primary-foreground py-7 md:py-9 relative overflow-hidden tartan-dark">
      <div className="container-tight px-5 md:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {credentials.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex flex-col items-center text-center gap-1.5"
            >
              <div className="w-10 h-10 rounded-sm bg-primary-foreground/6 flex items-center justify-center mb-1">
                <item.icon className="w-4.5 h-4.5 text-[hsl(var(--highland-gold))]" />
              </div>
              <h3 className="font-heading font-semibold text-sm md:text-base">{item.title}</h3>
              <p className="text-primary-foreground/50 text-xs md:text-sm font-body">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;