import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle, DollarSign, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
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
      <SEOHead
        title="Roof Financing Options in Western NC | Highlander Roofing"
        description="Affordable roof financing for Western NC homeowners. Low monthly payments, fast approval, no prepayment penalties. Don't delay protecting your home."
        path="/financing"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Financing", url: "/financing" },
        ])}
      />
      <Header />
      <main>
        <section className="relative min-h-[60vh] md:min-h-[75vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&q=80&w=2000" 
              alt="Beautiful mountain home with premium roofing"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.6)] via-[hsl(var(--hero-overlay)/0.3)] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--hero-overlay)/0.5)] via-transparent to-transparent" />
          </div>
          
          <div className="container-tight relative z-10 pb-16 md:pb-24">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-[hsl(var(--highland-gold))] font-bold text-sm uppercase tracking-[0.25em] mb-4">Investment Support</p>
              <h1 className="text-display-lg md:text-display-xl font-heading font-bold text-white mb-6 leading-[0.95] tracking-tightest">
                Affordable <span className="text-[hsl(var(--highland-gold))]">Financing</span> Options
              </h1>
              <p className="text-body-lg md:text-body-xl text-white/85 max-w-2xl leading-relaxed font-medium drop-shadow-sm">
                A new roof is a smart investment in your property&apos;s permanence. Our financing options make it manageable — so you don&apos;t have to delay protecting your home.
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
