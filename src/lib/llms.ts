import { site } from '../data/site';
import { copy, chapterKeys, languages, pageKeys, routes, type Lang, type PageKey } from '../i18n';
import { markdown, plain } from './text';

type Abs = (path: string) => string;

const label = { it: 'Italiano', en: 'English' } as const;

/* The short index (llms.txt spec: title, summary, details, link lists). */
export function llmsIndex(absolute: Abs) {
  const it = copy.it;
  const en = copy.en;
  const pages = (lang: Lang) => pageKeys.map((page) => `- [${copy[lang].pages[page]}](${absolute(routes[lang][page])}): ${copy[lang].meta[page].description}`).join('\n');
  return `# ${site.name} (${site.legalName})

> ${en.meta.home.description}

${site.name} is a two-person Shopify studio in ${site.country.en}: ${site.founders.join(' and ')}, both Shopify developers, working with a team of AI agents. The agents prepare pages, write code and test it on phones and computers, also at night; in the morning one of the two founders reviews every change before it goes live. A new store takes about ${site.facts.targetWeeks} weeks (indicative, for a mid-sized store), against up to ${site.facts.agencyMonths} months with a traditional agency. The first step is a free store review: a short list of what to fix. If the owner is interested, we talk it through and then give a price. One of the founders replies, not a bot. Contact: ${site.email.value}. The site is in Italian (default) and English.

In italiano: ${it.meta.home.description}

## ${label.it}

${pages('it')}

## ${label.en}

${pages('en')}

## Optional

- [Full text of every page, both languages](${absolute('/llms-full.txt')})
- [Notes for AI agents acting for a person](${absolute('/agents.md')})
- [Sitemap](${absolute('/sitemap.xml')})
`;
}

function pageText(lang: Lang, page: PageKey) {
  const t = copy[lang];
  const md = markdown;
  switch (page) {
    case 'home': {
      const h = t.home;
      return [
        `# ${plain(h.title)}`,
        md(h.sub),
        `## ${h.ai.k}`,
        md(h.ai.title),
        md(h.ai.p),
        `## ${h.prologue.k}: ${h.prologue.v}`,
        md(h.manifesto.join(' ')),
        h.manifestoFoot,
        `## ${h.us.k}`,
        md(h.us.title),
        ...h.us.p,
        `## ${h.index.k}`,
        ...[...chapterKeys, 'contact' as const].map((key) => `- **${t.chapters[key]} · ${t.pages[key]}**: ${h.index.items[key]}`)
      ];
    }
    case 'services': {
      const s = t.services;
      return [
        `# ${md(s.title)}`,
        md(s.lead),
        ...s.items.flatMap((item) => [
          `## ${md(item.title)}`,
          md(item.p),
          ...item.list.map((line) => `- ${line}`),
          ...('meta' in item && item.meta ? [`${item.meta[0]}: ${item.meta[1]}`] : [])
        ]),
        `## ${md(s.more.title)}`,
        s.more.p,
        ...s.more.items.map((line) => `- ${line}`),
        `## ${s.call.k}`,
        md(s.call.title),
        `${s.call.cta}: ${site.email.value}`
      ];
    }
    case 'night': {
      const n = t.night;
      return [
        `# ${md(n.title)}`,
        md(n.intro),
        ...n.caps.map((caption, index) => `${index + 1}. ${caption}`),
        `## ${n.duo.k}`,
        md(n.duo.title),
        `### ${n.duo.agents}`,
        ...n.duo.agentsList.map((item) => `- ${item}`),
        `### ${n.duo.us}`,
        ...n.duo.usList.map((item) => `- ${item}`),
        `## ${n.weeks.k}`,
        md(n.weeks.title),
        n.weeks.p,
        `- ${n.weeks.agency.join(': ')}`,
        `- ${n.weeks.us.join(': ')}`,
        n.weeks.note
      ];
    }
    case 'beavers': {
      const b = t.beavers;
      return [
        `# ${md(b.title)}`,
        b.lead,
        `## ${b.story.k}`,
        md(b.story.lead),
        md(b.story.us),
        ...b.story.leaks.map((leak) => `- ${leak}`),
        `## ${b.traits.k}`,
        ...b.traits.items.map((item) => `### ${item.t}\n${md(item.p)}`),
        `## ${b.facts.k}`,
        ...b.facts.items.map((fact) => `- ${fact}`)
      ];
    }
    case 'lodge': {
      const l = t.lodge;
      return [
        `# ${md(l.title)}`,
        md(l.p),
        ...l.chat.asks.flatMap((ask) => [`> ${ask.q}`, `> ${ask.a} ${ask.product}, ${ask.price}`]),
        l.chat.note,
        `## ${l.next.k}: ${l.next.v}`,
        md(l.lodgeTitle),
        l.lodgeP,
        l.note,
        ...l.verbs.map((verb) => `- **${verb.v}**: ${verb.t}`),
        l.waitlist.label
      ];
    }
    case 'contact': {
      const c = t.contact;
      return [
        `# ${md(c.title)}`,
        c.lead,
        `${c.mailK}: ${site.email.value}. ${c.mailP}`,
        ...c.steps.map((step, index) => `${index + 1}. ${step}`),
        c.or,
        c.form.reply
      ];
    }
  }
}

/* Every page, in both languages, as Markdown. */
export function llmsFull(absolute: Abs) {
  const sections = languages.flatMap((lang) => pageKeys.map((page) => [
    `---\n\nURL: ${absolute(routes[lang][page])}\nLanguage: ${label[lang]}\nTitle: ${copy[lang].meta[page].title}\n`,
    ...pageText(lang, page)
  ].join('\n\n')));
  return `# ${site.name} · full text\n\n> ${copy.en.meta.home.description}\n\n${sections.join('\n\n')}\n`;
}
