# Local Town Page Optimization

1. **Town Data Cleanup (`src/data/towns.ts`):** 
   - Update `heroImage` for all towns to high-quality, realistic, mountain-home focused Unsplash URLs. 
   - Ensure all towns have complete fields for `marketAuthorityAngle`, `constructionContext`, etc.

2. **Town Proof Expansion (`src/data/town-proof.ts`):**
   - Ensure every town has exactly 3 `jobHighlights`.
   - Update `jobHighlights` to ensure they all have valid `image` URLs.
   - Improve FAQ content for depth.

3. **New UI Component (`src/components/TownServiceSections.tsx`):**
   - Create a component that renders dedicated "Roofing in [Town]" and "Construction in [Town]" sections.
   - Each section will contain: 
     - Localized copy referencing specific geography/challenges.
     - A high-quality visual representation (placeholder or dynamic).
     - A relevant CTA.

4. **Template Update (`src/pages/TownPage.tsx`):**
   - Replace or augment `TwoPillars` with the new `TownServiceSections`.
   - Ensure the hero section is visually premium and fully responsive.
   - Ensure all town pages are internally linked via `NearbyTowns` and properly supported by `relevantBlogs`.

5. **QA & Audit:**
   - Review each town page to ensure no broken imagery.
   - Final audit table in the report.