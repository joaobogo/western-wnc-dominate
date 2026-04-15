import { Home, HardHat } from "lucide-react";

export type Division = "roofing" | "construction";

export interface DivisionTheme {
  division: Division;
  label: string;
  tagline: string;
  icon: typeof Home;
  accentVar: string; // CSS variable name
  accentClass: string; // tailwind text color
  accentBgClass: string; // tailwind bg color (subtle)
  badgeBgClass: string; // badge background
  badgeTextClass: string; // badge text
  borderHoverClass: string;
  checkClass: string; // check icon color
  heroAccentLine: string; // gradient for top accent
  /** Section texture class */
  textureBg: string;
  textureDark: string;
  /** Card system class */
  cardClass: string;
  /** Form field focus class */
  fieldClass: string;
  /** Tone descriptor for UI copy */
  tone: string;
}

export const divisionThemes: Record<Division, DivisionTheme> = {
  roofing: {
    division: "roofing",
    label: "Roofing Division",
    tagline: "Protection. Performance. Precision.",
    icon: Home,
    accentVar: "--heritage-green",
    accentClass: "text-primary",
    accentBgClass: "bg-primary/8",
    badgeBgClass: "bg-primary/10",
    badgeTextClass: "text-primary",
    borderHoverClass: "hover:border-primary/30",
    checkClass: "text-primary",
    heroAccentLine: "bg-gradient-to-r from-[hsl(var(--heritage-green)/0)] via-[hsl(var(--heritage-green)/0.5)] to-[hsl(var(--heritage-green)/0)]",
    textureBg: "tartan-bg",
    textureDark: "tartan-dark",
    cardClass: "card-premium",
    fieldClass: "field-premium",
    tone: "performance-driven",
  },
  construction: {
    division: "construction",
    label: "Construction Division",
    tagline: "Scope. Structure. Standards.",
    icon: HardHat,
    accentVar: "--highland-gold",
    accentClass: "text-[hsl(var(--highland-gold))]",
    accentBgClass: "bg-[hsl(var(--highland-gold)/0.08)]",
    badgeBgClass: "bg-[hsl(var(--highland-gold)/0.1)]",
    badgeTextClass: "text-[hsl(var(--highland-gold))]",
    borderHoverClass: "hover:border-[hsl(var(--highland-gold)/0.3)]",
    checkClass: "text-[hsl(var(--highland-gold))]",
    heroAccentLine: "bg-gradient-to-r from-[hsl(var(--highland-gold)/0)] via-[hsl(var(--highland-gold)/0.5)] to-[hsl(var(--highland-gold)/0)]",
    textureBg: "blueprint-bg",
    textureDark: "blueprint-dark",
    cardClass: "card-construction",
    fieldClass: "field-construction",
    tone: "architectural",
  },
};

export function getDivisionTheme(division: Division): DivisionTheme {
  return divisionThemes[division];
}
