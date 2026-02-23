import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah M.",
    location: "Highlands, NC",
    rating: 5,
    text: "Highlander replaced our entire roof after storm damage. They handled our insurance claim paperwork and the crew was professional from start to finish. Highly recommend.",
  },
  {
    name: "James T.",
    location: "Franklin, NC",
    rating: 5,
    text: "Fast response when we had a leak during heavy rain. They came out the next morning, found the issue, and had it repaired by afternoon. Fair pricing and honest work.",
  },
  {
    name: "Linda K.",
    location: "Cashiers, NC",
    rating: 5,
    text: "We've used Highlander for two properties now. Their metal roofing work is top notch and they really understand the mountain climate challenges. Five stars every time.",
  },
];

const Reviews = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Reviews</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Trusted by Homeowners
            <br className="hidden md:block" /> Across Western NC
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <span className="font-semibold text-foreground">4.7</span>
            <span className="text-muted-foreground text-sm">from 122+ Google Reviews</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="bg-card border border-border rounded-lg p-6 md:p-8"
            >
              <div className="flex mb-3">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground text-sm leading-relaxed mb-4">"{review.text}"</p>
              <div>
                <p className="font-semibold text-foreground text-sm">{review.name}</p>
                <p className="text-muted-foreground text-xs">{review.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
