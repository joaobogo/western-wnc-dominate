I will perform a comprehensive sitewide audit and repair pass to address all the issues mentioned in the prompts, focusing on visual brightness, typography, broken images, and branding consistency.

### 1. Global Readability & Typography
- **Increase Font Sizes**: Ensure all body text, navigation items, and labels are legible for older users.
- **Contrast Pass**: Audit all dark sections to ensure text contrast meets accessibility standards (WCAG).
- **Mobile Readability**: Optimize spacing and font sizes specifically for mobile devices.

### 2. Visual Brightness & Image Clarity
- **Reduce Overlays**: Lighten the `--hero-overlay` and other dark gradients that obscure images.
- **Hero Brightness**: Adjust hero components to ensure background images are the primary focus, not the overlays.
- **Section Rebalancing**: Lighten sections that feel "muddy" or "too dark," especially on construction pages.

### 3. Broken Image Audit & Repair
- **Waynesville Page**: Fix the logo/image issue in the hero.
- **Construction & About Heroes**: Add high-quality images where they are currently missing or blank.
- **Team Section**: Replace "Photo Coming Soon" placeholders with professional fallbacks or refined treatments.
- **Sitewide Check**: Use an automated scan to identify and fix any other broken image paths.

### 4. Branding & Logo Consistency
- **Standardize Logo**: Ensure the premium Highlander logo is used consistently across all pages.
- **Logo Sizing**: Enlarge logos in the header and hero sections as requested.
- **Tartan/Plaid Accents**: Reposition tartan/plaid as a subtle, premium secondary accent (trim, dividers) rather than a dominant background.

### 5. Messaging & Structural Alignment
- **3 Pillars Correction**: Audit the site to ensure all references to the service structure reflect the 3 pillars: Roofing, Construction, and Design & Planning.
- **Pillar Hierarchy**: Maintain the brand hierarchy where Roofing and Construction are primary, and Design is a supporting branch.

### 6. CTA & Button Visibility
- **Pop & Contrast**: Enhance button colors and contrast ratios.
- **Button Sizing**: Increase button text size and padding for better tap targets and visibility.

### Technical Implementation Details:
- **CSS Variables**: Update `index.css` to refine the global color palette and typography system.
- **Hero Component**: Refactor the `Hero` component and location-specific heroes to be more flexible and image-led.
- **Image Fallbacks**: Implement a robust fallback system for images that fail to load.

### QA Pass:
- **Responsive Testing**: Verify all fixes on desktop, tablet, and mobile.
- **Readability Score**: Ensure all major pages are "Strong" for older-user readability.
- **Image Load Verification**: Confirm every page is free of broken images.
