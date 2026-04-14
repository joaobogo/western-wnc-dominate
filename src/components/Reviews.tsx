import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Sarah M.",
    location: "Highlands, NC",
    rating: 5,
    text: "Highlander replaced our entire roof after storm damage. They handled our insurance claim paperwork and the crew was professional from start to finish. Highly recommend.",
    project: "Full Roof Replacement",
  },
  {
    name: "James T.",
    location: "Franklin, NC",
    rating: 5,
    text: "Fast response when we had a leak during heavy rain. They came out the next morning, found the issue, and had it repaired by afternoon. Fair pricing and honest work.",
    project: "Emergency Leak Repair",
  },
  {
    name: "Linda K.",
    location: "Cashiers, NC",
    rating: 5,
    text: "We've used Highlander for two properties now. Their metal roofing work is top notch and they really understand the mountain climate challenges. Five stars every time.",
    project: "Metal Roofing – Two Properties",
  },
  {
    name: "Robert & Anne P.",
    location: "Sylva, NC",
    rating: 5,
    text: "From the initial inspection to the final walkthrough, everything was documented and communicated clearly. The crew was respectful of our property and finished ahead of schedule.",
    project: "Roof Replacement & Gutters",
  },
];

const Reviews = () => {
  return (
    <section className="section-padding bg-background tartan-bg relative overflow-hidden">
      <div className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="eyebrow mb-3 block">Client Testimonials</span>
          <h2 className="section-heading mb-5">
            Trusted by Homeowners<br className="hidden md:block" /> Across Western NC
          </h2>
          
          {/* Google rating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 bg-card border border-border rounded-sm"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
            <div className="h-4 w-px bg-border" />
            <span className="font-semibold text-foreground text-sm">4.7</span>
            <span className="text-muted-foreground text-sm font-body">from 122+ Google Reviews</span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card-premium p-6 md:p-7"
            >
              <div className="relative z-10">
                {/* Quote mark */}
                <Quote className="w-6 h-6 text-[hsl(var(--highland-gold)/0.3)] mb-3 rotate-180" />
                
                <p className="text-foreground text-sm leading-relaxed mb-5 font-body">"{review.text}"</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-sm bg-primary/8 flex items-center justify-center text-primary font-heading font-bold text-sm">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{review.name}</p>
                      <p className="text-muted-foreground text-xs font-body">{review.location}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-body font-medium uppercase tracking-[0.15em] text-muted-foreground bg-secondary px-2.5 py-1 rounded-sm">
                    {review.project}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;