import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, Camera, Image, Sparkles, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { actionableError } from "@/lib/microcopy";

interface RoofDesignerHeroProps {
  onImageUploaded: (imageUrl: string) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/heic", "image/heif", "image/webp"];

const RoofDesignerHero = ({ onImageUploaded }: RoofDesignerHeroProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImage = useCallback((file: File): Promise<Blob> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      const img = new window.Image();
      img.onload = () => {
        const maxDim = 1920;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          const ratio = Math.min(maxDim / w, maxDim / h);
          w = Math.round(w * ratio);
          h = Math.round(h * ratio);
        }
        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);
        canvas.toBlob((blob) => resolve(blob!), "image/jpeg", 0.85);
      };
      img.src = URL.createObjectURL(file);
    });
  }, []);

  const handleFile = useCallback(async (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type) && !file.name.toLowerCase().endsWith(".heic")) {
      toast.error("Please upload a JPG, PNG, or HEIC image.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Image must be under 10MB.");
      return;
    }

    setIsUploading(true);
    try {
      const compressed = await compressImage(file);
      const fileName = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`;
      
      const { error: uploadError } = await supabase.storage
        .from("roof-designs")
        .upload(fileName, compressed, { contentType: "image/jpeg" });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("roof-designs")
        .getPublicUrl(fileName);

      onImageUploaded(urlData.publicUrl);
      toast.success("Photo uploaded! Analyzing your roof...");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(actionableError(err, "upload"));
    } finally {
      setIsUploading(false);
    }
  }, [compressImage, onImageUploaded]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const features = [
    { icon: Sparkles, label: "AI-Powered Detection" },
    { icon: Shield, label: "100% Private & Secure" },
    { icon: Zap, label: "Instant Results" },
  ];

  return (
    <section className="min-h-[calc(100vh-5rem)] flex items-center justify-center section-padding bg-gradient-to-b from-secondary via-background to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container-tight relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              Virtual Roof Designer
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 text-balance"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            See Your New Roof{" "}
            <span className="text-primary">Before</span> You Install It
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Upload a photo of your home, choose your roof style, and see a realistic preview instantly.
          </motion.p>
        </div>

        {/* Upload zone */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-12 md:p-16 transition-all duration-300 group ${
              isDragging
                ? "border-primary bg-primary/5 scale-[1.02]"
                : "border-border hover:border-primary/50 hover:bg-muted/30"
            } ${isUploading ? "pointer-events-none opacity-70" : ""}`}
          >
            <input
              ref={fileInputRef}
              aria-hidden="true"
              tabIndex={-1}
              type="file"
              accept="image/jpeg,image/png,image/heic,image/heif,image/webp"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />

            <div className="text-center">
              {isUploading ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                  <p className="text-lg font-medium text-foreground">Uploading & compressing...</p>
                </div>
              ) : (
                <>
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Upload className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <p className="text-xl font-semibold text-foreground mb-2">
                    Upload Your Home Photo
                  </p>
                  <p className="text-muted-foreground mb-6">
                    Drag & drop or click to browse · JPG, PNG, HEIC · Max 10MB
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button size="lg" className="gap-2 cta-gradient text-accent-foreground border-0 font-semibold">
                      <Image className="w-4 h-4" aria-hidden="true" />
                      Choose Photo
                    </Button>
                    <Button size="lg" variant="outline" className="gap-2 sm:flex hidden">
                      <Camera className="w-4 h-4" aria-hidden="true" />
                      Take Photo
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Feature badges */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {features.map((f) => (
            <div key={f.label} className="flex items-center gap-2 text-sm text-muted-foreground">
              <f.icon className="w-4 h-4 text-primary" />
              {f.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RoofDesignerHero;
