import { blogPosts } from "./blogs";
import { towns } from "./towns";

/**
 * Scalable content support logic for all town pages.
 * Ensures every town has relevant knowledge-base connections.
 */
export const getRelevantBlogsForTown = (townName: string) => {
  const town = towns.find(t => t.name === townName);
  if (!town) return blogPosts.slice(0, 3);

  // 1. Direct matches
  const directMatches = blogPosts.filter(b => b.town === town.name);
  if (directMatches.length >= 3) return directMatches.slice(0, 3);

  // 2. Thematic/Environmental matches
  const elevationValue = parseInt(town.elevation.replace(/[^0-9]/g, ''));
  const isHighElevation = elevationValue > 3000;
  
  const thematicMatches = blogPosts.filter(b => {
    if (directMatches.find(dm => dm.slug === b.slug)) return false;

    // Elevation relevance
    if (isHighElevation && (b.slug.includes('high-elevation') || b.title.toLowerCase().includes('highlands'))) return true;
    
    // Service mix relevance
    if (town.serviceDemandMix.some(s => b.category.includes(s) || b.title.includes(s))) return true;
    
    // Climate relevance
    if (town.climateExposure.toLowerCase().includes('rain') && b.title.toLowerCase().includes('moisture')) return true;
    if (town.climateExposure.toLowerCase().includes('storm') && b.category === "Storm") return true;

    return false;
  });

  const combined = [...directMatches, ...thematicMatches];
  if (combined.length >= 3) return combined.slice(0, 3);

  // 3. High-authority general fallback
  const fallbacks = ["mountain-roofing-maintenance-checklist", "wnc-construction-permitting-guide", "storm-damage-checklist-western-nc"];
  const fallbackPosts = blogPosts.filter(b => 
    fallbacks.includes(b.slug) && !combined.find(c => c.slug === b.slug)
  );

  const final = [...combined, ...fallbackPosts];
  if (final.length >= 3) return final.slice(0, 3);

  // 4. Ultimate safety slice
  const safety = blogPosts.filter(b => !final.find(f => f.slug === b.slug)).slice(0, 3 - final.length);
  return [...final, ...safety];
};
