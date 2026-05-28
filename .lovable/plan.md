I will implement the "Design & Planning" branch as a secondary, supporting capability that strengthens Highlander’s construction offering. This includes selecting a final branch name, updating the site navigation, footer, and landing page, and integrating supporting copy across key pages.

### Final Decisions
- **Branch Name**: Design & Planning
- **Nav Label**: Design & Planning
- **Dropdown Wording**: "Design & Planning: Layouts, floor plans, and project planning support"
- **Landing Page URL**: `/layouts-planning` (existing)
- **Landing Page H1**: "Intelligent **Design & Planning** for Your Home."
- **CTAs**:
    - Primary: "Start Your Project Plan"
    - Secondary: "Talk With Highlander"

### Technical Section

**1. Site Navigation (Header)**
- Update `src/components/Header.tsx` to ensure "Design & Planning" is clearly nested under the Construction division but with its own distinct identity.
- Ensure the label is "Design & Planning" with the description "Layouts, floor plans, and project planning support".

**2. Footer Structure**
- Update `src/components/Footer.tsx` to place "Design & Planning" under the Construction column.
- Update the bottom CTA to include "layouts & planning" in the list of services.

**3. Landing Page Refinement**
- Update `src/pages/LayoutsPlanning.tsx` to align with the "secondary support" hierarchy.
- Ensure no "architectural" or "design-build" language is used.
- Finalize section order: 1. Hero, 2. Intro Block, 3. Core Support Areas, 4. Early Guidance, 5. Build Connection, 6. The Process, 7. Who This Is For, 8. FAQ.

**4. Supporting Copy Integration**
- **Homepage (`src/pages/Index.tsx`)**: Add a reference to Design & Planning in the TwoPillars or Services section.
- **Construction Hub (`src/pages/ConstructionDivision.tsx`)**: Integrate a copy block explaining how Design & Planning supports the build.
- **Additions (`src/pages/HomeAdditions.tsx`)**: Add a link/note about pre-construction planning support.
- **Outdoor Living (`src/pages/OutdoorLiving.tsx`)**: Add a section on layout and terrain-responsive planning.
- **Town Pages (`src/pages/TownPage.tsx`)**: Ensure the "Construction" column mentions project planning as an available local service.

**5. Intake & Builder Flow**
- Update `src/components/InspectionForm.tsx` to include "Project Planning & Layouts" in the project type dropdown.
- Update confirmation messages to reflect "project planning" terminology.
- Update `src/data/services.ts` (if it exists) to include the new branch details for dynamic rendering.
