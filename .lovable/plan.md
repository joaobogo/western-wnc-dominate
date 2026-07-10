# Refatoração — Componentes Reutilizáveis

Objetivo: quebrar arquivos gigantes (900–1130 linhas) em blocos pequenos, e extrair padrões repetidos entre páginas de serviço/divisão para uma biblioteca de blocos reutilizáveis.

## Diagnóstico

Top ofensores:
- `RoofingDivision.tsx` (1132), `ResidentialRoofing.tsx` (958), `Header.tsx` (936)
- Contact/About/Privacy (650–690), Storm/Blog/Repair/Replacement (530–580)
- Todas as páginas de serviço repetem o mesmo esqueleto: Hero → benefícios em 3 colunas → seções alternadas → FAQ → CTA final.

## Estrutura alvo

```text
src/
├── components/
│   ├── blocks/            # blocos de página reutilizáveis
│   │   ├── ServiceHero.tsx
│   │   ├── BenefitsGrid.tsx
│   │   ├── AlternatingFeature.tsx
│   │   ├── FAQAccordion.tsx
│   │   ├── FinalCTA.tsx
│   │   ├── StatsBar.tsx
│   │   └── ProcessSteps.tsx
│   ├── header/            # Header quebrado
│   │   ├── DesktopNav.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── ServiceAreasDropdown.tsx
│   │   └── ServiceAreasMobileList.tsx
│   ├── contact/           # Contact quebrado
│   │   ├── ContactHero.tsx
│   │   ├── ContactMethods.tsx
│   │   └── ContactMap.tsx
│   └── ... (existentes intactos)
└── pages/                 # páginas viram composição fina dos blocos
```

## Etapas

### Etapa 1 — Biblioteca de blocos (base)
Criar `components/blocks/` com props tipadas. Nenhuma página muda ainda; blocos ficam disponíveis.
- `ServiceHero` (título, subtítulo, imagem, CTA duplo, breadcrumb)
- `BenefitsGrid` (array de {icon, title, description})
- `AlternatingFeature` (imagem + texto, direção configurável)
- `FAQAccordion` (recebe items[])
- `FinalCTA`, `StatsBar`, `ProcessSteps`

### Etapa 2 — Migrar páginas de roofing
Refatorar em ordem de tamanho:
1. `RoofingDivision.tsx` → composição de blocos (~150 linhas)
2. `ResidentialRoofing.tsx` → idem
3. `RoofRepair.tsx`, `RoofReplacement.tsx`, `CommercialRoofing.tsx`, `StormDamage.tsx`
Dados estáticos movidos para `src/data/services/<slug>.ts`.

### Etapa 3 — Quebrar Header
`Header.tsx` (936 linhas) → `Header.tsx` shell (~120) + `header/*.tsx`. Mantém tracking de dropdown de service areas, acessibilidade, busca mobile — tudo já implementado, só realocado.

### Etapa 4 — Contact / About / Privacy
Extrair `contact/*`, `about/*`. Privacy vira MDX-like: conteúdo em `src/data/legal/privacy.ts`, layout em `LegalPage.tsx`.

### Etapa 5 — Consolidação e verificação
- Rodar typecheck + build a cada etapa.
- Playwright em `/`, `/roofing`, `/roofing/roof-repair`, `/contact`, `/service-areas/highlands-nc` para garantir paridade visual.
- Remover código morto pós-migração.

## Regras

- Zero mudança de UX/visual — só reorganização.
- Todo bloco novo tipado com interface exportada.
- Nenhum bloco pode ter mais de ~200 linhas; se passar, quebra de novo.
- SEO (`SEOHead`, JSON-LD, canonicals) e handlers de analytics preservados byte-a-byte.
- Rotas, imports públicos e nomes de arquivos de páginas inalterados.

## Entrega por etapa

Ao fim de cada etapa reporto: arquivos criados, linhas removidas das páginas, build/typecheck verdes, screenshots de paridade.

Começo pela Etapa 1 assim que aprovar (ou digo "vai" e sigo direto pelas 5 sem esperar confirmação, conforme sua preferência de não pedir permissão).
