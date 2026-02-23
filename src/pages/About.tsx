import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Shield, Users, Mountain, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import InspectionForm from "@/components/InspectionForm";

const values = [
  { icon: Shield, title: "Integrity First", description: "We give honest assessments. If your roof doesn't need replacing, we'll tell you." },
  { icon: Users, title: "Family-Owned", description: "Not a franchise. A local family business that lives and works in WNC." },
  { icon: Mountain, title: "Mountain Expertise", description: "We understand elevation, weather patterns, and the roofing challenges unique to this region." },
  { icon: Award, title: "Certified Quality", description: "CertainTeed Master Shingle Applicators. Licensed NC General Contractor. Fully insured." },
];

const About = () => {
  return (
    <>
      <Header />
      <main>
        <section className="section-padding section-dark pt-32 md:pt-40">
          <div className="container-tight">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
              <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">About Highlander</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
                Protecting Mountain Homes Since 2017
              </h1>
              <p className="text-dark-section-foreground/70 text-base md:text-lg">
                Highlander Roofing is a family-owned roofing company based in Franklin and Sylva, NC. We serve homeowners and commercial properties across Western North Carolina with honest assessments, quality materials, and work we stand behind.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-tight">
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">Our Story</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We started Highlander Roofing because we saw too many WNC homeowners getting poor service from out-of-state contractors who didn't understand mountain roofing. Storm chasers would roll in after every weather event, do questionable work, and disappear.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We're different. We live here. Our kids go to school here. When we put a roof on your home, we drive past it every day. That accountability shapes everything we do.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, we've completed hundreds of roofing projects across Macon, Jackson, Swain, and Haywood counties — from emergency storm repairs to full commercial maintenance programs.
                </p>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">What Sets Us Apart</h2>
                <div className="space-y-6">
                  {values.map((v) => (
                    <div key={v.title} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <v.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-foreground">{v.title}</h3>
                        <p className="text-muted-foreground text-sm">{v.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-primary rounded-lg p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground mb-4">Ready to Work With Us?</h2>
              <p className="text-primary-foreground/70 mb-6 max-w-xl mx-auto">Schedule a free inspection and see why hundreds of WNC homeowners trust Highlander with their roofs.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/request-inspection" className="cta-gradient text-accent-foreground font-bold px-8 py-4 rounded-md inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  Request Inspection <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="tel:8283979211" className="border border-primary-foreground/30 text-primary-foreground font-semibold px-8 py-4 rounded-md inline-flex items-center justify-center gap-2 hover:bg-primary-foreground/10 transition-colors">
                  <Phone className="w-5 h-5" /> (828) 397-9211
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default About;
