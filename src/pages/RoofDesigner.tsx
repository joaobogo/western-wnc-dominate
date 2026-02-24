import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import RoofDesignerHero from "@/components/roof-designer/RoofDesignerHero";
import RoofDesignerWorkspace from "@/components/roof-designer/RoofDesignerWorkspace";
import LeadCaptureModal from "@/components/roof-designer/LeadCaptureModal";
import { motion } from "framer-motion";

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
      <Header />
      <main className="pt-16 md:pt-20">
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
