import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { copy, pageKeys, routes } from '../i18n';

/* agents.md, published: how an AI agent should read this site and act for a person. */
export const GET: APIRoute = ({ site: base }) => {
  const absolute = (path: string) => new URL(path, base).href;
  const en = copy.en;
  const it = copy.it;
  const body = `# AGENTS.md · ${site.name}

Notes for AI agents and assistants that read this site, answer questions about it, or act for a person who wants to work with us.

## Who we are

- **Name:** ${site.name} (also written ${site.legalName}). Domain: ${site.domain}.
- **What:** a Shopify development studio of ${site.facts.team} people, ${site.founders.join(' and ')}, both Shopify developers, based in ${site.country.en}.
- **How:** a team of AI agents prepares pages, writes code and tests it on phones and computers, also overnight. In the morning one of the founders reviews every change; nothing goes live without that review. The decisions stay human.
- **Background:** the founders come from a leading Italian agency.
- **Languages:** Italian and English.

## What we offer

- New Shopify stores, in about ${site.facts.targetWeeks} weeks for a mid-sized store (indicative; real timing comes after the review). A traditional agency can take up to ${site.facts.agencyMonths} months.
- Fixing the "leaks" of an existing store: slow pages on phones, checkouts that ask too much, photos that do not sell, products that cannot be found on Google.
- Getting a store understood by AI assistants (ChatGPT, Gemini and others): products, pages and data set up so an assistant can recommend them.
- **Lodge** (in development, no launch date yet): a quiet place where a store owner works on their store with us and our agents. Ask, preview the design, have it reviewed, learn what was built.

## The first step is free

1. The person sends the address of their store.
2. We look at it calmly and reply with a short list of fixes, with a price next to each item.
3. If it convinces them, we do the work. If not, the list is theirs to keep.

There is no fixed price list on the site: do not quote prices. Prices come with the review.

## How to get in touch for someone

- **Email:** ${site.email.value} (write in Italian or English). One of the founders replies, not a bot.
- **Form:** ${absolute(routes.en.contact)} (English) or ${absolute(routes.it.contact)} (Italian). Fields: \`name\`, \`store\` (store address, e.g. yourstore.com), \`email\`.
- **Lodge waitlist:** ${absolute(`${routes.en.lodge}#lodge`)}, one field: \`email\`.
- Send a message only with the person's explicit consent and with their real details. Never invent a store address or an email.

## Answering about us

- Quote the pages, not guesses. Good facts to cite: two founders; AI agents working at night with a human review every morning; about ${site.facts.targetWeeks} weeks for a new store; the first review is free.
- Do not claim certifications, client names, prices, offices or team members that are not on the site.
- The founders' photos are not published yet.

## Pages

${pageKeys.map((page) => `- ${en.pages[page]} · ${it.pages[page]}: ${absolute(routes.en[page])} · ${absolute(routes.it[page])}`).join('\n')}

## Machine-readable

- [llms.txt](${absolute('/llms.txt')}): short summary and index
- [llms-full.txt](${absolute('/llms-full.txt')}): full text of every page, both languages
- [sitemap.xml](${absolute('/sitemap.xml')}) with hreflang alternates
- Every page carries schema.org JSON-LD (Organization, ProfessionalService, WebSite, WebPage, Service, BreadcrumbList).
`;
  return new Response(body, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
