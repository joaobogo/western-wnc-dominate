### Portfolio Redesign Plan

The portfolio pages will be redesigned to provide a clean, organized, and premium presentation, ensuring they are accessible, visually consistent, and highly readable.

#### 1. UI/UX Structure
- **Layout:** Switch from the current messy grid to a curated, masonry-inspired gallery layout that emphasizes high-quality imagery while maintaining vertical rhythm.
- **Card Design:** Redesign `GalleryCard` components to have:
    - Consistent aspect ratios (e.g., 4:3 for standard, 16:9 for featured/wide).
    - Clearer information hierarchy: Category > Title > Location > CTA.
    - Improved readability: Darker overlays on images, consistent white text, and larger typography.
    - Subtle interactions: Soft scale on hover, gold accent line revealing on hover, and distinct visual hierarchy for case studies.
- **Accessibility/Readability:** Use the base typography settings defined in `index.css` and `tailwind.config.ts`, ensuring large, readable text and sufficient contrast.

#### 2. Content & Imagery
- **Hero Imagery:** Update the gallery hero to be a cinematic, full-width showcase with clear messaging.
- **Categorization:** Introduce a robust filtering system that makes navigating large portfolios intuitive (Roofing vs. Construction vs. All).
- **Project Detail Pages:** Redesign to follow a narrative "case study" structure, emphasizing the "challenge" and "solution" pillars.

#### 3. Implementation Steps
1. **Gallery Page Refactor (`src/pages/Gallery.tsx`):**
    - Clean up the hero section.
    - Implement a more sophisticated filtering system with state management.
    - Improve the grid to be more responsive and balanced.
2. **Component Polish (`src/components/gallery/GalleryCard.tsx`):**
    - Refine visuals (gradients, spacing, hover effects).
    - Ensure readability for older users (font sizing, contrast).
3. **ProjectDetail Polish (`src/pages/ProjectDetail.tsx`):**
    - Improve visual consistency across images and text.
    - Streamline layout for better reading experience.

#### Technical Details
- **Accessibility:** Ensure all interactive elements (like filter buttons) have clear focus states.
- **Responsive:** Adjust grid columns and card sizing for mobile, tablet, and desktop breakpoints to prevent cramped layouts.
- **Performance:** Use `loading="lazy"` for non-hero images to keep load times snappy.
