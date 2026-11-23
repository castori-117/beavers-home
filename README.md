# Beavers · sito

Sito statico in Astro, bilingue (IT di default, EN sotto `/en/`), dal design "Beavers · sito", versione B (Natura).

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ statico
```

Variabili (vedi `.env.example`): `PUBLIC_SITE_URL` (canonical, hreflang, sitemap; default `https://www.thebeavers.company`) e `PUBLIC_FORM_ENDPOINT` (facoltativa: dove inviare i due moduli; senza, si apre una mail a ciao@thebeavers.company).

## Struttura

- `src/styles/tokens.css`: tutte le variabili CSS (colori, tipo, spazi, raggi, motion, livelli). Gli altri layer: `typography`, `global`, `utilities`, `motion`; ogni componente ha il suo file in `styles/components/`.
- `src/i18n/`: testi `it.ts` / `en.ts` (stessa forma, controllata dal tipo), rotte e pagina successiva.
- `src/views/`: una vista per pagina, condivisa dalle due lingue; `src/pages/` sono solo involucri.
- `src/elements/`: custom element piccoli, solo comportamento. Animazioni, stati e colori restano in CSS (scroll-driven animations, `:has()`, `color-mix()`, `<dialog>` con invoker commands, view transitions).
- SEO / GEO: `layouts/Base.astro` (meta, hreflang, Open Graph, JSON-LD da `lib/seo.ts`), `pages/sitemap.xml.ts`, `robots.txt.ts`, `llms.txt.ts`, `llms-full.txt.ts`, `agents.md.ts` (pubblicato su `/agents.md`).
- `npm run fonts` copia Schibsted Grotesk da `@fontsource-variable` in `public/fonts`.

## Privacy, statistiche, glossario

- `/privacy/` e `/en/privacy/`: testi in `i18n` (`privacy`). La P. IVA si aggiunge in `src/data/site.ts` (`legal.vat`) e compare da sola nel footer e nella privacy.
- Vercel Web Analytics e Speed Insights partono solo dopo il consenso (`components/Consent.astro`, `elements/site-consent.ts`); la scelta resta in `localStorage` (`tb-stats`) e si riapre da qualsiasi `[data-consent-open]`.
- Parole nuove: nei testi `[[agent|gli agenti]]` diventa un bottone con la spiegazione (`terms` in `i18n`, `elements/term-tips.ts`). Le definizioni stanno in `i18n`, una volta sola.

## Dominio e indicizzazione

- L'indirizzo principale è `www.thebeavers.company`. `vercel.json` porta `thebeavers.company` su www con un redirect permanente (308), così Google vede un solo sito. In Vercel, nelle impostazioni dei domini, non va attivato il redirect contrario (da www al dominio nudo): farebbe un giro infinito.
- Le intestazioni (cache, tipi di file, sicurezza) stanno in `vercel.json`: Vercel non legge i file `_headers`.
- Dopo ogni pubblicazione con pagine nuove o cambiate: `npm run indexnow` avvisa Bing (e gli altri motori che usano IndexNow).
