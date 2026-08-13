import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Palette } from "lucide-react";

interface RoofMaterial {
  id: string;
  name: string;
  category: string;
  color_name: string;
  color_hex: string;
  finish: string;
}

interface MaterialPanelProps {
  materials: RoofMaterial[];
  selectedMaterial: RoofMaterial | null;
  onSelectMaterial: (material: RoofMaterial) => void;
}

const CATEGORIES = [
  { key: "shingle", label: "Premium Dimensional Shingles" },
  { key: "metal", label: "Metal Roofing" },
  { key: "standing_seam", label: "Standing Seam" },
  { key: "flat", label: "Flat Roofing" },
];

const MaterialPanel = ({ materials, selectedMaterial, onSelectMaterial }: MaterialPanelProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string>("shingle");

  return (
    <aside className="w-full lg:w-80 bg-background border-t lg:border-t-0 lg:border-l border-border overflow-y-auto max-h-[50vh] lg:max-h-none">
      <div className="p-4 border-b border-border">
        <h3 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          Roof Material & Color
        </h3>
        {selectedMaterial && (
          <p className="text-sm text-muted-foreground mt-1">
            {selectedMaterial.name} · {selectedMaterial.color_name}
          </p>
        )}
      </div>

      <div className="divide-y divide-border">
        {CATEGORIES.map((cat) => {
          const catMaterials = materials.filter((m) => m.category === cat.key);
          if (catMaterials.length === 0) return null;

          return (
            <div key={cat.key}>
              <button
                onClick={() => setExpandedCategory(expandedCategory === cat.key ? "" : cat.key)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
              >
                {cat.label}
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                    expandedCategory === cat.key ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {expandedCategory === cat.key && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-3 gap-2 p-3">
                      {catMaterials.map((mat) => (
                        <button
                          key={mat.id}
                          onClick={() => onSelectMaterial(mat)}
                          className={`group relative flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all duration-200 ${
                            selectedMaterial?.id === mat.id
                              ? "bg-primary/10 ring-2 ring-primary"
                              : "hover:bg-muted/60"
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-lg border-2 transition-transform group-hover:scale-110 ${
                              selectedMaterial?.id === mat.id ? "border-primary shadow-md" : "border-border"
                            } ${mat.finish === "gloss" ? "ring-1 ring-white/30" : ""}`}
                            style={{ backgroundColor: mat.color_hex }}
                          />
                          <span className="text-caption leading-tight text-center text-muted-foreground font-medium line-clamp-2">
                            {mat.color_name}
                          </span>
                          {mat.finish === "gloss" && (
                            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent" title="Gloss finish" />
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Finish info */}
      {selectedMaterial && (
        <div className="p-4 border-t border-border">
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs font-medium text-foreground mb-1">Selected Finish</p>
            <p className="text-sm text-muted-foreground capitalize">
              {selectedMaterial.finish} · {selectedMaterial.name}
            </p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default MaterialPanel;
