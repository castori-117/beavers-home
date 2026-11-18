# Beavers · sito

Sito statico in Astro, bilingue (IT di default, EN sotto `/en/`), dal design "Beavers · sito", versione B (Natura).

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ statico
```

Variabili (vedi `.env.example`): `PUBLIC_SITE_URL` (canonical, hreflang, sitemap; default `https://thebeavers.company`) e `PUBLIC_FORM_ENDPOINT` (facoltativa: dove inviare i due moduli; senza, si apre una mail a ciao@thebeavers.company).

## Struttura

- `src/styles/tokens.css`: tutte le variabili CSS (colori, tipo, spazi, raggi, motion, livelli). Gli altri layer: `typography`, `global`, `utilities`, `motion`; ogni componente ha il suo file in `styles/components/`.
- `src/i18n/`: testi `it.ts` / `en.ts` (stessa forma, controllata dal tipo), rotte e pagina successiva.
- `src/views/`: una vista per pagina, condivisa dalle due lingue; `src/pages/` sono solo involucri.
- `src/elements/`: custom element piccoli, solo comportamento. Animazioni, stati e colori restano in CSS (scroll-driven animations, `:has()`, `color-mix()`, `<dialog>` con invoker commands, view transitions).
- SEO / GEO: `layouts/Base.astro` (meta, hreflang, Open Graph, JSON-LD da `lib/seo.ts`), `pages/sitemap.xml.ts`, `robots.txt.ts`, `llms.txt.ts`, `llms-full.txt.ts`, `agents.md.ts` (pubblicato su `/agents.md`).
- `npm run fonts` copia Schibsted Grotesk da `@fontsource-variable` in `public/fonts`.
