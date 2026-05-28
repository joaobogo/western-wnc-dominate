import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import IntakeShell from "@/components/intake/IntakeShell";
import { useState } from "react";
import { ArrowRight, CheckCircle, FileText, Layout, MapPin } from "lucide-react";
import { toast } from "sonner";

const DesignIntake = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Design inquiry received. We'll be in touch soon!");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
      <SEOHead
        title="Start Your Project Plan | Design & Planning Intake"
        description="Planning an addition or major renovation in WNC? Share your vision and get a professional layout and scope assessment from Highlander."
        path="/design-intake"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Design & Planning", url: "/layouts-planning" },
          { name: "Project Intake", url: "/design-intake" }
        ])}
      />
      <Header />
      <main>
        <IntakeShell
          eyebrow="Design & Planning"
          title="Tell us about your vision."
          subhead="From initial floor-plan ideas to full project scope definition. Share what you're thinking, and our design advisors will help you map out the technical path forward."
          sidebarBullets={[
            "Clarify structural feasibility before committing to a build.",
            "Visual layout support for additions and outdoor living.",
            "Professional scope documentation for predictable results.",
          ]}
          otherIntakeLabel="Construction Intake"
          otherIntakeHref="/construction-intake"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground">Full Name</label>
                <input required type="text" className="w-full bg-secondary/50 border border-border p-3 text-sm focus:border-primary outline-none transition-colors" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground">Phone Number</label>
                <input required type="tel" className="w-full bg-secondary/50 border border-border p-3 text-sm focus:border-primary outline-none transition-colors" placeholder="(828) 000-0000" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground">Project Location (Town)</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                <input required type="text" className="w-full bg-secondary/50 border border-border p-3 pl-10 text-sm focus:border-primary outline-none transition-colors" placeholder="e.g. Highlands, Sylva, Cashiers" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground">Project Type</label>
              <select className="w-full bg-secondary/50 border border-border p-3 text-sm focus:border-primary outline-none transition-colors appearance-none">
                <option>Home Addition</option>
                <option>Outdoor Living (Deck/Porch)</option>
                <option>Interior Renovation / Layout Change</option>
                <option>Multi-Phase Master Plan</option>
                <option>Other / Not Sure Yet</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground">Describe Your Vision</label>
              <textarea rows={4} className="w-full bg-secondary/50 border border-border p-3 text-sm focus:border-primary outline-none transition-colors" placeholder="What are you hoping to achieve? Mention any specific needs or terrain challenges." />
            </div>

            <div className="space-y-4">
              <label className="text-xs font-heading font-bold uppercase tracking-wider text-muted-foreground">Do you have existing plans or sketches?</label>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="p-3 border border-border text-sm hover:bg-secondary transition-colors text-left flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" /> Yes, I have some files
                </button>
                <button type="button" className="p-3 border border-border text-sm hover:bg-secondary transition-colors text-left flex items-center gap-3 opacity-50">
                  <div className="w-2 h-2 rounded-full bg-muted" /> No, I'm starting from scratch
                </button>
              </div>
            </div>

            <button 
              disabled={isSubmitting}
              className="w-full cta-gradient text-accent-foreground font-bold py-4 flex items-center justify-center gap-2 group hover:scale-[1.01] transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Submit Project Details"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="text-[10px] text-center text-muted-foreground/60 font-body">
              By submitting, you agree to be contacted by a Highlander project advisor regarding your inquiry.
            </p>
          </form>
        </IntakeShell>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default DesignIntake;
