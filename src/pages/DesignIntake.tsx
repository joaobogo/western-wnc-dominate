import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import IntakeShell from "@/components/intake/IntakeShell";
import { useState } from "react";
import { ClipboardCheck, FileText, Layout, Sparkles } from "lucide-react";
import DesignPlanningIntakeForm from "@/components/intake/DesignPlanningIntakeForm";
import { useSearchParams } from "react-router-dom";

const DesignIntake = () => {
  const [params] = useSearchParams();
  const [mode, setMode] = useState<"short" | "long">((params.get("mode") as any) || "long");

  return (
    <>
      <SEOHead
        title="Start Your Project Plan | Design Intake"
        description="Planning an addition or major renovation in WNC? Share your vision and get professional layout and scope assessment from Highlander."
        path="/design-intake"
        noindex
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Design", url: "/layouts-planning" },
          { name: "Project Intake", url: "/design-intake" }
        ])}
      />
      <Header />
      <main id="main-content">
        <IntakeShell
          eyebrow="Design"
          title={mode === "short" ? "Start the conversation." : "Tell us about your vision."}
          subhead={mode === "short" 
            ? "Quickly share the basics of your project and what kind of planning help you need." 
            : "From initial floor-plan ideas to full project scope definition. Share what you're thinking, and our design advisors will help you map out the technical path forward."
          }
          sidebarBullets={mode === "short" ? [
            "Fast review of project basics.",
            "Identify if planning support is a fit.",
            "Direct phone follow-up."
          ] : [
            "Clarify structural feasibility before build.",
            "Visual layout support for additions.",
            "Professional scope documentation."
          ]}
          otherIntakeLabel="Construction Intake"
          trustCategory="construction"
        otherIntakeHref="/construction-intake"
        >
          <div className="mb-10 p-1.5 bg-secondary/50 border border-border rounded-lg inline-flex w-full">
            <button 
              onClick={() => setMode("long")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md text-[13px] font-heading font-bold transition-all ${mode === "long" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <FileText className="w-4 h-4" /> Detailed Planning Brief
            </button>
            <button 
              onClick={() => setMode("short")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md text-[13px] font-heading font-bold transition-all ${mode === "short" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Sparkles className="w-4 h-4" /> Quick Inquiry
            </button>
          </div>

          <DesignPlanningIntakeForm mode={mode} />
        </IntakeShell>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
};

export default DesignIntake;
