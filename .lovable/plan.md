# Plano Completo de SEO — Highlander Roofing & Construction

Objetivo: dominar buscas orgânicas em Western North Carolina (Highlands, Cashiers, Franklin e vizinhos) para roofing + construction, converter tráfego em leads qualificados e criar defesa competitiva de longo prazo.

Status atual: 129 rotas, 19 páginas de cidade, 64+ artigos de blog, sitemap com ~168 URLs, schema LocalBusiness/Breadcrumb/WebPage/FAQ por cidade, tracking de atribuição por town já ativo. O site publicado ainda não tem histórico no Google (Semrush sem dados), então a prioridade #1 é indexação + medição.

---

## Fase 1 — Fundação Técnica e Indexação (Semana 1)

O que fazer:
1. Conectar Google Search Console via connector (OAuth), verificar `https://western-wnc-dominate.lovable.app/` pelo método META, submeter `/sitemap.xml`.
2. Criar propriedade também em Bing Webmaster Tools (importar de GSC).
3. Auditar `sitemap.xml` contra as 129 rotas: remover redirects (`Navigate`), landing pages `/lp/*` (noindex), rotas internas; adicionar `lastmod` real por post.
4. Migrar `sitemap.xml` estático para gerador `scripts/generate-sitemap.ts` (predev/prebuild) que lê `blogs.ts` + `towns.ts` — hoje é editado à mão e perde sincronia.
5. Adicionar `noindex` por rota em `/lp/*`, `/request-inspection` (após envio), `/thank-you` via `react-helmet-async`.
6. Auditoria de Core Web Vitals (LCP, INP, CLS) com PageSpeed em Home, TownPage e Blog. Lazy-load de imagens abaixo da dobra, `width`/`height` explícitos, `preload` do hero image.
7. Configurar Google Analytics 4 real (`VITE_GA_ID`) + linkar com GSC.
8. Registrar Google Business Profile (se ainda não existir): endereço, telefone 828-524-7773, horário, fotos, serviços — pilar #1 de local SEO.

Saída: site 100% indexável, mensurável e monitorado.

---

## Fase 2 — On-Page e Schema (Semanas 2-3)

Money pages (Home, `/roofing`, `/roofing/roof-replacement`, `/roofing/metal`, `/construction`, `/construction/additions`):
- Title < 60 chars com keyword + geo ("Metal Roofing in Highlands, NC | Highlander").
- Meta description < 160 chars com CTA e telefone.
- H1 único por página, H2/H3 semânticos com variações de keyword.
- Bloco FAQ com `FAQPage` schema (2-4 perguntas de busca real).
- Bloco "Serving" com links internos para as 19 cidades.
- Imagens: alt descritivo com keyword + cidade, WebP, `loading="lazy"` fora da dobra.

Schema a adicionar/refinar:
- `Organization` + `WebSite` (com `SearchAction`) no `index.html`.
- `Service` schema em cada página de serviço (`/roofing/*`, `/construction/*`).
- `Article` + `BreadcrumbList` em cada post do blog (hoje faltam alguns).
- `Review`/`AggregateRating` se houver reviews reais (não inventar).

Limpezas obrigatórias (varredura completa):
- Zerar "architectural shingles" nos 14 posts legados sinalizados no QA anterior.
- Confirmar zero ocorrências de: GAF, "24/7", 828-397-9211, "architect*".

---

## Fase 3 — Autoridade Local (Semanas 3-6)

Pilar de local SEO — é onde este site ganha ou perde.

1. Google Business Profile: 3 posts/semana, fotos de projetos reais georreferenciadas, Q&A preenchido, categoria primária = Roofing Contractor + secundárias.
2. NAP consistency: nome, endereço e telefone idênticos em ~30 diretórios (Yelp, BBB, Angi, HomeAdvisor, Nextdoor, Houzz, Chamber of Commerce de Highlands/Cashiers/Franklin, Nicerh, Facebook, Apple Maps, Bing Places).
3. Reviews: fluxo automatizado pós-projeto pedindo Google Review com link direto; meta = 2 reviews/mês.
4. Link building local: parceria com Chamber of Commerce, patrocínio de eventos locais (Highlands Festival, Cashiers Designer Showhouse), guest posts em blogs regionais (Highlander Newspaper, Laurel Magazine).
5. Expandir de 19 para 30 páginas de cidade priorizando: Brevard, Waynesville, Hendersonville, Asheville, Sylva, Bryson City, Murphy, Robbinsville, Andrews, Hayesville, Blowing Rock.

---

## Fase 4 — Conteúdo e Cluster SEO (Semanas 4-16)

Roadmap de 50 posts já publicado; próximo movimento é aprofundar autoridade por cluster.

Novos hubs (pillar pages de 2000+ palavras):
- `/roofing/gutters` e `/roofing/skylights` — hoje são "thin content" (identificado no QA anterior).
- `/guides/mountain-roofing-guide` — guia definitivo para casas em altitude WNC.
- `/guides/insurance-claims-storm-damage` — captura busca de alto valor pós-tempestade.
- `/guides/roof-material-comparison` — comparador metal vs. synthetic vs. asphalt.

Cadência editorial:
- 2 posts/semana durante 12 semanas (24 novos posts), cada um linkando a 1 money page + 2 cidades + 1 hub.
- Atualizar 10 posts legados/trimestre (refresh de data + adicionar seção FAQ + novo internal link).

Formatos que rendem em local:
- "Cost of X in [Town], NC" (busca comercial alta).
- "Best roofers in [Town]" (marca própria + comparativo honesto).
- Case studies com foto antes/depois georreferenciada.

---

## Fase 5 — Mensuração, Iteração e Defesa (Contínuo)

Dashboards a construir dentro do app (Lovable Cloud já tem `conversion_events` + atribuição `source_town`):
- Ranking por town: clicks no dropdown → form_submit → phone_click.
- Funil por money page.
- CTR real vs. impressions do GSC (via connector).

Rotina mensal:
- Puxar top queries no GSC, identificar posições 4-15 e otimizar títulos/H1 (quick wins).
- Semrush: rodar `domain_analysis` + `competitive_analysis` vs. 3 concorrentes regionais para achar gaps.
- Auditar 404s no GSC e criar redirects 301.
- Novos backlinks: 2-4/mês (parceiros, imprensa local, diretórios de nicho).

Sinais de sucesso (6 meses):
- 500+ keywords rankeadas no US database do Semrush.
- Top 3 em "roofing highlands nc", "roofing cashiers nc", "metal roofing western nc".
- 40+ reviews no Google Business Profile com média ≥ 4.8.
- 20+ leads orgânicos/mês atribuídos a cidades específicas via tracking já instalado.

---

## Detalhes técnicos (para minha execução)

- Sitemap: migrar de estático para `scripts/generate-sitemap.ts` (predev/prebuild), fonte = `src/data/{blogs,towns}.ts` + rotas de `App.tsx` filtradas.
- Per-route SEO: `SEOHead.tsx` já usa Helmet; expandir para adicionar `Service` schema nas rotas `/roofing/*` e `/construction/*`.
- GSC: usar `standard_connectors--connect` com `connector_id: "google_search_console"`, depois fluxo META de verificação já documentado.
- CWV: rodar Playwright + Lighthouse-CI local, priorizar hero image `preload` e conversão para WebP.
- Noindex de LP: `<Helmet><meta name="robots" content="noindex" /></Helmet>` nas rotas `/lp/*` (elas convertem paid, não devem competir com money pages orgânicas).

---

## Ordem de execução se aprovado

1. Fase 1 completa (fundação + GSC + sitemap dinâmico + noindex de LPs).
2. Fase 2 on-page nas 6 money pages + schema Service.
3. Fase 3 kickoff (checklist NAP + template de review request).
4. Fase 4 novos hubs (`gutters`, `skylights`, mountain guide).
5. Fase 5 dashboard interno de atribuição.

Aprova este plano? Posso começar pela Fase 1 agora — é o que destrava todo o resto.
