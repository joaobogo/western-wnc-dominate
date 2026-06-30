import { cn } from "@/lib/utils";

interface TartanBackgroundProps {
  className?: string;
  opacity?: number;
  patternSize?: string;
  variant?: "dark" | "light" | "gold";
}

const TartanBackground = ({ 
  className, 
  opacity = 0.05, 
  patternSize = "320px auto",
  variant = "dark" 
}: TartanBackgroundProps) => {
  return (
    <div 
      className={cn("absolute inset-0 pointer-events-none transition-opacity duration-700", className)}
      style={{ 
        backgroundImage: "url('/tartan.png')",
        backgroundSize: patternSize,
        backgroundRepeat: "repeat",
        opacity: opacity,
        filter: variant === "gold" ? "sepia(1) saturate(5) hue-rotate(-10deg)" : variant === "light" ? "invert(1)" : "none"
      }} 
    />
  );
};

export default TartanBackground;
