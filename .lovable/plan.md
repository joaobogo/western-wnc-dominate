I will demote the "Design & Planning" pillar to a supporting service role while adding it as a top-level tab in the header.

**1. Demote Design from the "Three Pillars" system**
- Rename `src/components/ThreePillars.tsx` to `src/components/TwoPillars.tsx` (or update its internal naming) to reflect only Roofing and Construction as the core pillars.
- Update the UI to show only two icons/columns for Roofing and Construction, with Design & Planning mentioned as a supporting service or a "how we start" phase.
- Update the homepage (`src/pages/Index.tsx`) to use the updated component.

**2. Update Navigation**
- Move "Design & Planning" (currently a dropdown in `Header.tsx`) to be its own top-level tab in the `secondaryLinks` or a dedicated "Design" link in the main nav.
- Update the `Footer.tsx` to ensure "Design & Planning" is listed under a "Services" or "Support" category rather than appearing as a third primary division if it was previously grouped that way.

**3. Visual Consistency**
- Ensure the "Two Pillars" language is used consistently across the site where it previously said "Three Pillars".
- Maintain the "Design Support" narrative—it is how projects are "intelligently mapped" but not one of the two main physical labor divisions.

**Technical Details**
- Use `lucide-react` icons (Shield for Roofing, Hammer for Construction).
- Ensure mobile responsiveness for the new "Two Pillars" layout (likely 1x2 or 2x1 grid).
- Verify all links to `/layouts-planning` and `/design-intake` remain functional.