import { useState, useCallback } from "react";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import RoofDesignerHero from "@/components/roof-designer/RoofDesignerHero";
import RoofDesignerWorkspace from "@/components/roof-designer/RoofDesignerWorkspace";
import LeadCaptureModal from "@/components/roof-designer/LeadCaptureModal";
import { motion } from "framer-motion";
import { FlaskConical } from "lucide-react";

const RoofDesigner = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [designId, setDesignId] = useState<string | null>(null);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [resultCanvas, setResultCanvas] = useState<HTMLCanvasElement | null>(null);

  const handleImageUploaded = useCallback((imageUrl: string) => {
    setUploadedImage(imageUrl);
  }, []);

  const handleSaveDesign = useCallback((canvas: HTMLCanvasElement, id: string) => {
    setResultCanvas(canvas);
    setDesignId(id);
    setShowLeadModal(true);
  }, []);

  return (
    <>
      <SEOHead
        title="Virtual Roof Designer | Free Online Tool"
        description="Upload a photo of your home and visualize different roofing materials and colors instantly. Free AI-powered tool from Highlander Roofing — Western NC."
        path="/roof-designer"
        jsonLd={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Free Tools", url: "/free-tools" },
          { name: "Roof Designer", url: "/roof-designer" },
        ])}
      />
      <Header />
      <main className="pt-[88px] md:pt-[128px] relative">
        {/* Beta banner */}
        <div className="bg-accent/10 border-b border-accent/20 px-4 py-2 text-center">
          <p className="text-sm text-accent-foreground/80 flex items-center justify-center gap-2">
            <FlaskConical className="w-4 h-4 text-accent" />
            <span><strong>Beta</strong> — This tool is in early access. Results are approximate.</span>
          </p>
        </div>
        {!uploadedImage ? (
          <RoofDesignerHero onImageUploaded={handleImageUploaded} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <RoofDesignerWorkspace
              imageUrl={uploadedImage}
              onSave={handleSaveDesign}
              onReset={() => setUploadedImage(null)}
            />
          </motion.div>
        )}
      </main>

      <LeadCaptureModal
        open={showLeadModal}
        onOpenChange={setShowLeadModal}
        designId={designId}
        resultCanvas={resultCanvas}
      />

      {!uploadedImage && <Footer />}
      <StickyMobileCTA />
    </>
  );
};

export default RoofDesigner;
