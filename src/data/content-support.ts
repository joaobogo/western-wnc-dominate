import { linkableBlogPosts } from "./blogs";
import { towns } from "./towns";

/**
 * Scalable content support logic for all town pages.
 * Ensures every town has relevant knowledge-base connections.
 */
export const getRelevantBlogsForTown = (townName: string) => {
  const town = towns.find(t => t.name === townName);
  if (!town) return linkableBlogPosts().slice(0, 3);

  // 1. Direct matches
  const directMatches = linkableBlogPosts().filter(b => b.town === town.name);
  
  // 2. Thematic/Environmental matches
  const elevationValue = parseInt(town.elevation.replace(/[^0-9]/g, ''));
  const isHighElevation = elevationValue > 3000;
  
  const thematicMatches = linkableBlogPosts().filter(b => {
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

  // 3. High-authority general fallback
  const fallbacks = ["storm-damage-checklist-western-nc", "metal-vs-shingle-roof-western-nc", "insurance-claim-roof-damage-nc"];
  const fallbackPosts = linkableBlogPosts().filter(b => 
    fallbacks.includes(b.slug) && !combined.find(c => c.slug === b.slug)
  );

  const final = [...combined, ...fallbackPosts];
  
  // Ensure exactly 3 unique posts
  const uniquePosts = Array.from(new Set(final.map(p => p.slug)))
    .map(slug => final.find(p => p.slug === slug))
    .filter(Boolean)
    .slice(0, 3);

  if (uniquePosts.length >= 3) return uniquePosts;

  // 4. Ultimate safety slice
  const safety = linkableBlogPosts().filter(b => !uniquePosts.find(f => f?.slug === b.slug)).slice(0, 3 - uniquePosts.length);
  return [...uniquePosts, ...safety] as any[];
};
