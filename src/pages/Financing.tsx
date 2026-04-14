import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle, DollarSign, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import InspectionForm from "@/components/InspectionForm";

const benefits = [
  { icon: DollarSign, title: "Low Monthly Payments", description: "Spread the cost of your new roof over manageable monthly payments." },
  { icon: Clock, title: "Quick Approval", description: "Simple application process with fast decisions — don't wait to protect your home." },
  { icon: Shield, title: "No Prepayment Penalties", description: "Pay off your balance early with no extra fees or penalties." },
];

const Financing = () => {
  return (
    <>
      <Header />
      <main>
        <section className="section-padding section-dark pt-32 md:pt-40">
          <div className="container-tight text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Financing</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
                Affordable Roofing Financing Options
              </h1>
              <p className="text-dark-section-foreground/70 max-w-2xl mx-auto text-base md:text-lg">
                A new roof is a smart investment. Our financing options make it affordable — so you don't have to delay protecting your home.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-tight">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {benefits.map((b) => (
                <div key={b.title} className="text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <b.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">{b.title}</h3>
                  <p className="text-muted-foreground text-sm">{b.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-secondary rounded-lg p-8 md:p-12 max-w-3xl mx-auto">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-4">How It Works</h2>
              <ol className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <div><h4 className="font-semibold text-foreground">Request a Roof Consultation</h4><p className="text-muted-foreground text-sm">We assess your roof and provide a transparent cost estimate.</p></div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <div><h4 className="font-semibold text-foreground">Apply for Financing</h4><p className="text-muted-foreground text-sm">Quick application with fast approval. We'll walk you through the options.</p></div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <div><h4 className="font-semibold text-foreground">Get Your New Roof</h4><p className="text-muted-foreground text-sm">We complete the work while you enjoy manageable monthly payments.</p></div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <InspectionForm />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default Financing;
