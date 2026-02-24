import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Paintbrush, Eraser, RotateCcw, Save, ChevronLeft, Loader2, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import MaterialPanel from "./MaterialPanel";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface RoofDesignerWorkspaceProps {
  imageUrl: string;
  onSave: (canvas: HTMLCanvasElement, designId: string) => void;
  onReset: () => void;
}

interface RoofMaterial {
  id: string;
  name: string;
  category: string;
  color_name: string;
  color_hex: string;
  finish: string;
}

type Tool = "brush" | "eraser";

const RoofDesignerWorkspace = ({ imageUrl, onSave, onReset }: RoofDesignerWorkspaceProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [materials, setMaterials] = useState<RoofMaterial[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<RoofMaterial | null>(null);
  const [tool, setTool] = useState<Tool>("brush");
  const [brushSize, setBrushSize] = useState(30);
  const [isDrawing, setIsDrawing] = useState(false);
  const [opacity, setOpacity] = useState(70);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [aiPolygon, setAiPolygon] = useState<number[][] | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const sessionId = useRef(
    sessionStorage.getItem("roof-session") || (() => {
      const id = `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      sessionStorage.setItem("roof-session", id);
      return id;
    })()
  ).current;

  // Load materials
  useEffect(() => {
    supabase
      .from("roof_materials")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => {
        if (data) {
          setMaterials(data as unknown as RoofMaterial[]);
          setSelectedMaterial(data[0] as unknown as RoofMaterial);
        }
      });
  }, []);

  // Load image and set canvas
  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imageRef.current = img;
      
      const container = containerRef.current;
      if (!container) return;
      
      const maxW = container.clientWidth;
      const maxH = window.innerHeight - 200;
      const ratio = Math.min(maxW / img.width, maxH / img.height, 1);
      const w = Math.round(img.width * ratio);
      const h = Math.round(img.height * ratio);
      
      setCanvasSize({ width: w, height: h });

      // Draw image on main canvas
      requestAnimationFrame(() => {
        const canvas = canvasRef.current;
        const maskCanvas = maskCanvasRef.current;
        const overlayCanvas = overlayCanvasRef.current;
        if (!canvas || !maskCanvas || !overlayCanvas) return;

        [canvas, maskCanvas, overlayCanvas].forEach(c => {
          c.width = w;
          c.height = h;
        });

        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, w, h);

        // Trigger AI analysis
        analyzeRoof(img);
      });
    };
    img.src = imageUrl;
  }, [imageUrl]);

  // AI analysis
  const analyzeRoof = useCallback(async (img: HTMLImageElement) => {
    setIsAnalyzing(true);
    try {
      // Compress to small for AI
      const tempCanvas = document.createElement("canvas");
      const maxDim = 800;
      let w = img.width, h = img.height;
      const ratio = Math.min(maxDim / w, maxDim / h, 1);
      tempCanvas.width = Math.round(w * ratio);
      tempCanvas.height = Math.round(h * ratio);
      const tempCtx = tempCanvas.getContext("2d")!;
      tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
      
      const base64 = tempCanvas.toDataURL("image/jpeg", 0.7).split(",")[1];

      const { data, error } = await supabase.functions.invoke("analyze-roof", {
        body: { imageBase64: base64 },
      });

      if (error) throw error;

      if (data?.detected && data?.polygonPoints?.length > 2) {
        setAiPolygon(data.polygonPoints);
        // Auto-draw the detected roof mask
        drawPolygonMask(data.polygonPoints);
        toast.success(`Roof detected! (${data.roofType || "standard"} roof, ${Math.round((data.confidence || 0.8) * 100)}% confidence)`);
      } else {
        toast.info("Use the brush tool to paint over your roof area.");
      }
    } catch (err) {
      console.error("AI analysis error:", err);
      toast.info("Auto-detection unavailable. Use the brush tool to mark your roof.");
    } finally {
      setIsAnalyzing(false);
    }
  }, [canvasSize]);

  const drawPolygonMask = useCallback((points: number[][]) => {
    const maskCanvas = maskCanvasRef.current;
    if (!maskCanvas) return;
    const ctx = maskCanvas.getContext("2d")!;
    
    // Convert percentage points to canvas coordinates
    const canvasPoints = points.map(([x, y]) => [
      (x / 100) * maskCanvas.width,
      (y / 100) * maskCanvas.height,
    ]);

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(canvasPoints[0][0], canvasPoints[0][1]);
    for (let i = 1; i < canvasPoints.length; i++) {
      ctx.lineTo(canvasPoints[i][0], canvasPoints[i][1]);
    }
    ctx.closePath();
    ctx.fill();

    applyOverlay();
  }, []);

  // Apply color overlay based on mask (uses compositing instead of pixel loop)
  const applyOverlay = useCallback(() => {
    const overlayCanvas = overlayCanvasRef.current;
    const maskCanvas = maskCanvasRef.current;
    if (!overlayCanvas || !maskCanvas || !selectedMaterial) return;

    const ctx = overlayCanvas.getContext("2d")!;
    ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

    // Step 1: Draw the mask onto the overlay canvas
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(maskCanvas, 0, 0);

    // Step 2: Use "source-in" to paint color ONLY where the mask exists
    ctx.globalCompositeOperation = "source-in";
    ctx.globalAlpha = opacity / 100;
    ctx.fillStyle = selectedMaterial.color_hex;
    ctx.fillRect(0, 0, overlayCanvas.width, overlayCanvas.height);

    // Step 3: Add gloss gradient on top of existing content
    if (selectedMaterial.finish === "gloss") {
      ctx.globalCompositeOperation = "source-atop";
      ctx.globalAlpha = 0.15;
      const gradient = ctx.createLinearGradient(0, 0, overlayCanvas.width, overlayCanvas.height);
      gradient.addColorStop(0, "rgba(255,255,255,0.3)");
      gradient.addColorStop(0.5, "rgba(255,255,255,0.6)");
      gradient.addColorStop(1, "rgba(255,255,255,0.2)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, overlayCanvas.width, overlayCanvas.height);
    }

    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
  }, [selectedMaterial, opacity]);

  // Re-apply overlay when material or opacity changes
  useEffect(() => {
    applyOverlay();
  }, [applyOverlay]);

  // Drawing handlers
  const getCanvasPos = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = maskCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    return {
      x: ((clientX - rect.left) / rect.width) * canvas.width,
      y: ((clientY - rect.top) / rect.height) * canvas.height,
    };
  }, []);

  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const maskCanvas = maskCanvasRef.current;
    if (!maskCanvas) return;
    const ctx = maskCanvas.getContext("2d")!;
    const pos = getCanvasPos(e);

    ctx.globalCompositeOperation = tool === "brush" ? "source-over" : "destination-out";
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, brushSize, 0, Math.PI * 2);
    ctx.fill();

    applyOverlay();
  }, [isDrawing, tool, brushSize, getCanvasPos, applyOverlay]);

  const startDrawing = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  }, [draw]);

  const stopDrawing = useCallback(() => setIsDrawing(false), []);

  const clearMask = useCallback(() => {
    const maskCanvas = maskCanvasRef.current;
    if (!maskCanvas) return;
    const ctx = maskCanvas.getContext("2d")!;
    ctx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
    applyOverlay();
  }, [applyOverlay]);

  const redetect = useCallback(() => {
    if (aiPolygon) {
      clearMask();
      drawPolygonMask(aiPolygon);
    }
  }, [aiPolygon, clearMask, drawPolygonMask]);

  const handleSave = useCallback(async () => {
    const canvas = canvasRef.current;
    const overlayCanvas = overlayCanvasRef.current;
    if (!canvas || !overlayCanvas || !selectedMaterial) return;

    setIsSaving(true);
    try {
      // Composite final image
      const resultCanvas = document.createElement("canvas");
      resultCanvas.width = canvas.width;
      resultCanvas.height = canvas.height;
      const ctx = resultCanvas.getContext("2d")!;
      ctx.drawImage(canvas, 0, 0);
      ctx.drawImage(overlayCanvas, 0, 0);

      // Upload result
      const blob = await new Promise<Blob>((resolve) =>
        resultCanvas.toBlob((b) => resolve(b!), "image/jpeg", 0.9)
      );
      const resultPath = `results/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`;
      
      await supabase.storage
        .from("roof-designs")
        .upload(resultPath, blob, { contentType: "image/jpeg" });

      // Extract original path from URL
      const originalPath = imageUrl.split("/roof-designs/")[1] || imageUrl;

      // Save design record
      const { data: design, error } = await supabase
        .from("roof_designs")
        .insert({
          original_image_path: originalPath,
          result_image_path: resultPath,
          material_id: selectedMaterial.id,
          material_name: `${selectedMaterial.name} - ${selectedMaterial.color_name}`,
          color_hex: selectedMaterial.color_hex,
          finish: selectedMaterial.finish,
          session_id: sessionId,
        })
        .select("id")
        .single();

      if (error) throw error;

      // Track metric
      await supabase.from("designer_metrics").insert({
        event_type: "design_complete",
        design_id: design.id,
        session_id: sessionId,
      });

      onSave(resultCanvas, design.id);
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Failed to save design. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }, [imageUrl, selectedMaterial, sessionId, onSave]);

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-5rem)] bg-muted/30">
      {/* Canvas area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 bg-background border-b border-border">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onReset} className="gap-1.5 text-muted-foreground">
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">New Photo</span>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={tool === "brush" ? "default" : "outline"}
              size="sm"
              onClick={() => setTool("brush")}
              className="gap-1.5"
            >
              <Paintbrush className="w-4 h-4" />
              <span className="hidden sm:inline">Paint Roof</span>
            </Button>
            <Button
              variant={tool === "eraser" ? "default" : "outline"}
              size="sm"
              onClick={() => setTool("eraser")}
              className="gap-1.5"
            >
              <Eraser className="w-4 h-4" />
              <span className="hidden sm:inline">Erase</span>
            </Button>
            {aiPolygon && (
              <Button variant="outline" size="sm" onClick={redetect} className="gap-1.5">
                <Wand2 className="w-4 h-4" />
                <span className="hidden sm:inline">Re-detect</span>
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={clearMask} className="gap-1.5">
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Clear</span>
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <span>Brush</span>
              <Slider
                value={[brushSize]}
                onValueChange={([v]) => setBrushSize(v)}
                min={5}
                max={80}
                step={1}
                className="w-24"
              />
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div
          ref={containerRef}
          className="flex-1 flex items-center justify-center p-4 overflow-auto relative"
        >
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="relative">
                  <Loader2 className="w-10 h-10 text-primary animate-spin" />
                  <Wand2 className="w-5 h-5 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">Analyzing Your Roof</p>
                  <p className="text-sm text-muted-foreground">AI is detecting the roof region...</p>
                </div>
              </div>
            </motion.div>
          )}

          <div
            className="relative select-none touch-none"
            style={{ width: canvasSize.width, height: canvasSize.height }}
          >
            <canvas
              ref={canvasRef}
              className="absolute inset-0 rounded-lg shadow-lg"
              style={{ width: canvasSize.width, height: canvasSize.height }}
            />
            <canvas
              ref={overlayCanvasRef}
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{ width: canvasSize.width, height: canvasSize.height, mixBlendMode: "multiply" }}
            />
            <canvas
              ref={maskCanvasRef}
              className="absolute inset-0 rounded-lg opacity-0"
              style={{ width: canvasSize.width, height: canvasSize.height, cursor: tool === "brush" ? "crosshair" : "cell" }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
            {/* Visible mask outline - thin dashed border over the mask */}
          </div>
        </div>

        {/* Opacity control */}
        <div className="flex items-center justify-between px-4 py-3 bg-background border-t border-border">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>Color Intensity</span>
            <Slider
              value={[opacity]}
              onValueChange={([v]) => setOpacity(v)}
              min={20}
              max={100}
              step={5}
              className="w-32"
            />
            <span className="w-8 text-right">{opacity}%</span>
          </div>
          <Button
            onClick={handleSave}
            disabled={isSaving || !selectedMaterial}
            className="gap-2 cta-gradient text-accent-foreground border-0 font-semibold"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save & See Pricing
          </Button>
        </div>
      </div>

      {/* Material panel */}
      <MaterialPanel
        materials={materials}
        selectedMaterial={selectedMaterial}
        onSelectMaterial={setSelectedMaterial}
      />
    </div>
  );
};

export default RoofDesignerWorkspace;
