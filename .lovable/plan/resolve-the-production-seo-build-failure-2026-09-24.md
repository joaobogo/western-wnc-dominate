# Resolve the production SEO build failure

## Approach
- Preserve every existing SEO requirement and article rule.
- Make the consolidated SEO checker repeat its actionable failure details at the end of the log so deployment diagnostics cannot truncate the cause.
- Use the next automated production check to identify and correct only the failing rule.
- Confirm the final production check passes without weakening any validation.

## Technical details
- Change only the report formatting in `scripts/seo-check.mjs` during diagnosis; no SEO rule will be disabled or relaxed.
- Once the exact failure is visible, apply the narrow source-content or checker correction it requires.
