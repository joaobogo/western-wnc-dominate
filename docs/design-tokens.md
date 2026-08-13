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
