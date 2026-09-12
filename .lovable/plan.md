# Roofing-First Metadata Refactor

## Goal
Make Google search snippets consistently present Highlander as a roofing-first company that also provides construction, without diluting pages built around one specific service or topic.

## Changes
1. **Homepage positioning**
   - Lead the title and description with roofing.
   - Add construction as the secondary service within the existing title and description length limits.

2. **General and company pages**
   - Update metadata on broad pages such as service areas, locations, about, contact, reviews, projects, and financing where both divisions are relevant.
   - Use the consistent order “roofing and construction,” not construction first.

3. **Local pages**
   - Keep each town or county’s strongest roofing keyword first.
   - Mention construction naturally in descriptions where the page already represents both divisions.

4. **Intent-specific exceptions**
   - Keep roofing service pages, roofing articles, and roofing tools focused only on roofing.
   - Keep construction service pages and construction-specific articles focused only on construction.
   - Leave legal, privacy, accessibility, careers, internal, paid, and noindex pages alone unless their current metadata is inaccurate.

5. **Quality controls**
   - Preserve unique page intent and avoid repetitive boilerplate.
   - Keep titles at 60 characters or fewer and descriptions at 155 characters or fewer.
   - Update matching social metadata automatically through the existing shared metadata system.
   - Run metadata, banned-language, SEO, and build checks. Do not send form or CRM data.

## Technical details
- Edit metadata at its existing sources rather than adding a global forced suffix that could damage specific search intent.
- Preserve canonical URLs, structured data, layout, styling, and routing.
- Add or extend regression coverage for roofing-first ordering on broad pages and the intentional single-division exceptions.
