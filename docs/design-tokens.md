# Design Token Scale (audited & consolidated)

Single source of truth: `src/index.css` (`:root` / `.dark`), surfaced to Tailwind in `tailwind.config.ts`.

## Core scale

| Token | CSS var | Tailwind | Use |
|---|---|---|---|
| Surface | `--surface` | `bg-surface` / `bg-background` | Page background |
| Surface raised | `--surface-raised` | `bg-surface-raised` / `bg-card` (dark) | Cards, panels |
| Ink | `--ink` | `text-ink` / `text-foreground` | Primary text |
| Ink muted | `--ink-muted` | `text-ink-muted` / `text-muted-foreground` | Secondary text (AA) |
| Heritage green | `--heritage-green` | `text-primary`, `bg-primary` | Brand primary, roofing division, positive states |
| Highland gold | `--highland-gold` | `bg-highland-gold`, `text-highland-gold` | Accent, construction division, warning states |
| Gold ink | `--gold-ink` | `text-[hsl(var(--gold-ink))]` | Gold **as text** on light surfaces (AA-safe) |
| Alert | `--alert` | `bg-alert`, `text-alert`, `border-alert` | The one alert tone (aliases `--destructive`) |

## Aliases (kept for shadcn compatibility, now derived — no duplicate values)

- `--background`, `--card` → `--surface`
- `--secondary` → `--surface-raised`
- `--foreground`, `--card-foreground`, `--popover-foreground`, `--secondary-foreground` → `--ink`
- `--muted-foreground` → `--ink-muted`
- `--destructive` / `--destructive-foreground` → `--alert` / `--alert-foreground`
- `--primary` / `--ring` = heritage green, `--accent` = highland gold

## Duplicates removed in this audit

- Hardcoded Tailwind palette tones (`red-500/600/900/50`, `amber-100…950`, `green-50…700`, `emerald-*`) across
  `StormDamage`, `StormCenter`, `StormResponseGuide`, `AdminLeads`, `PrivacyPolicy`, `RealWorkDiagnostics`,
  `InteractiveTools`, `ui/toast` → mapped to `alert` (critical), `highland-gold` / `gold-ink` (warning),
  `primary` (positive).
- Hex literals in `SiteLoader.tsx` (`#184613`, `#2D9123`, `#F7F3EA`, `#0a1f08`) and `LayoutsPlanning.tsx` (`#fff`)
  → token references.
- Only remaining hex is `SEOHead` `theme-color` meta, which must be a literal.

## Rules

1. Never introduce a Tailwind palette color utility (`text-red-600`, `bg-amber-50`, …).
2. Gold as text uses `--gold-ink`; gold as fill uses `--highland-gold`.
3. One alert tone only — no separate danger/warning/success palettes.
4. Radius is a single token (`--radius`, currently `0rem`); shadows come from the `shadow-*` utilities in `index.css`.
5. `text-white` / `bg-white` remain allowed **only** over photography/dark hero overlays where the color is
   fixed by the image, not by the theme.

## Spacing rhythm (8pt)

All vertical rhythm is a multiple of 8px, expressed through three section densities:

| Density | Mobile | Tablet | Desktop | Utility |
| --- | --- | --- | --- | --- |
| compact | 32 | 48 | 64 | `.section-compact` |
| default | 48 | 80 | 96 | `.section-default` (`.section-padding` alias) |
| feature | 64 | 112 | 128 | `.section-feature` |

Horizontal gutters: 16 / 24 / 32 via `.container-rhythm`.
Stack gaps: `.stack-sm` 16, `.stack-md` 24, `.stack-lg` 32, `.stack-xl` 48.
Card interiors: `.card-pad` = 24 mobile / 32 desktop.

Use `<Section>` (`src/components/layout/Section.tsx`) instead of hand-rolled
`<section class="py-…"><div class="container-…">` markup:

```tsx
<Section density="feature" width="tight" className="bg-background">…</Section>
```

Widths: `narrow` max-w-3xl · `tight` max-w-4xl · `wide` max-w-6xl · `full`.

## Image treatment system

One primitive: `src/components/media/AppImage.tsx`. Hero LCP images use
`HeroPicture`/`HeroImage` (AVIF/WebP srcsets, eager + high priority).

### Fixed aspect ratios (Tailwind tokens)

| Token             | Ratio | Context                         |
| ----------------- | ----- | ------------------------------- |
| `aspect-hero`     | 16:9  | Hero / full-bleed banners       |
| `aspect-project`  | 4:3   | Project and gallery cards       |
| `aspect-crew`     | 1:1   | Crew headshots, social tiles    |
| `aspect-portrait` | 4:5   | Vertical team portraits         |
| `aspect-panorama` | 21:9  | Wide feature strips             |

Never use `aspect-[a/b]` arbitrary values — pick the context token.

### Scrim tokens (text over image)

Defined in `src/index.css` (light + dark), exposed as Tailwind
background images:

- `bg-scrim-bottom` — caption/overlay wash on cards
- `bg-scrim-hero` — bottom-heavy hero wash for headline legibility
- `bg-scrim-side` — left-anchored hero copy on wide viewports
- `bg-[color:var(--scrim-flat)]` — even wash for logos/thumbnails

Scrim layers are always `aria-hidden` and `pointer-events-none`.

### Loading + alt rules

- Every image lazy-loads with `decoding="async"` except the single LCP
  image per page (`priority` / `HeroPicture priority`).
- Intrinsic `width`/`height` must match the ratio token so no layout
  shift occurs.
- `alt` is a required prop. Describe the roof system, place, or person
  ("Standing seam metal roof on a Highlands, NC mountain home"), not the
  file. Purely decorative images use `alt=""` plus `aria-hidden="true"`.

## Buttons (Phase 4)

Exactly four variants exist. Anything else is a bug.

| Variant | Class | Use |
| --- | --- | --- |
| Primary | `btn btn-primary` | Gold fill. The money action — one per view. |
| Secondary | `btn btn-secondary` | Outlined. Supporting action next to a primary. |
| Ghost | `btn btn-ghost` | No chrome. Tertiary / in-place actions. |
| Destructive | `btn btn-destructive` | Irreversible actions only. |

Sizes: `btn-sm` (44px), `btn-md` (48–56px, default), `btn-lg` (56–64px), `btn-icon`.
Modifiers: `btn-block` (full width), `btn-on-dark` (outlined/ghost on forest sections).
States: focus ring is global, `disabled` dims to 50%, `data-loading="true"` blocks clicks.

In React use `<Button variant="primary" size="lg" loading={...} loadingText="Sending…">`.
For a link, use the same classes on the `<a>`/`<Link>` — never invent CTA styling inline.

## Form fields (Phase 4)

| Piece | Class |
| --- | --- |
| Label | `field-label` (+ `field-label-note` for “— optional”) |
| Input / select / textarea | `field-input` (16px min font, 48px min height) |
| Helper text | `field-help` |
| Error | `<InlineFieldError>` + `aria-invalid` on the control |
| Tap-select card | `tap-card` with `aria-pressed` |
| Dark panels | add `field-on-dark` |

Use `<Field>` from `src/components/forms/Field.tsx` to get label, help, error and
aria wiring in one place, and spread a `fieldAttrs.*` preset on every control for
the correct `inputmode`, `autocomplete` and `enterkeyhint`. Validate on blur, and
render a single `<FormErrorSummary>` at the top of the form on submit.
