The user wants a global audit and repair pass across the whole site, focusing on typography, readability, brightness, branding consistency, and fixing broken images. I have audited the codebase and identified several areas for improvement based on the specific prompts provided.

### Technical Details
- **Typography & Readability**: Standardize font sizes and contrast. Increase `body` font size (already 24px in `index.css`, but need to ensure it applies well). Fix dark text on dark backgrounds.
- **Brightness & Image Clarity**: Reduce excessive dark overlays in hero sections and background gradients.
- **Three Pillars Consistency**: Ensure all references to Highlander's service structure include Roofing, Construction, and Design & Planning.
- **Button & CTA Visibility**: Improve button contrast, size, and hover states globally.
- **Branding Consistency**: Standardize logo usage and tartan/plaid accents.
- **Broken Image Fixes**: Identify and replace broken image URLs with high-quality fallbacks.

### Implementation Plan

#### 1. Global Styles & Typography (`src/index.css`)
- Refine the typography system for better readability on mobile.
- Adjust accent colors (Highland Gold) for better accessibility.
- Reduce default hero overlay opacities.

#### 2. Three Pillars Alignment
- Audit and update `src/components/ThreePillars.tsx` and any other component mentioning "2 pillars".
- Ensure consistent naming: Roofing, Construction, Design & Planning.

#### 3. Component Visibility & CTA Pass
- Update `src/components/ui/button.tsx` or global button classes to "pop" more.
- Increase button text size and contrast.

#### 4. Page-Specific Readability & Brightness Fixes
- **Construction Pages**: Lighten backgrounds and improve text contrast in `src/pages/ConstructionDivision.tsx` and related components.
- **County/Town Pages**: Ensure hero images are clear and overlays aren't too dark in `src/pages/CountyPage.tsx` and `src/pages/TownPage.tsx`.

#### 5. Image Audit & Fallbacks
- Replace known broken URLs with reliable Unsplash placeholders or local assets if available.
- Specifically check `ConstructionDivision.tsx`, `About.tsx`, and `TownPage.tsx`.

#### 6. Branding & Logo Consistency
- Ensure logo sizing is consistent across header and footer.
- Apply tartan accents subtly in appropriate sections.

#### 7. Final QA Report
- Prepare a summary of changes as requested in the prompts.
