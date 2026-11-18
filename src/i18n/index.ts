import { it } from './it';
import { en } from './en';

export type Lang = 'it' | 'en';
export type PageKey = 'home' | 'night' | 'beavers' | 'lodge' | 'contact';

export const languages: Lang[] = ['it', 'en'];
export const defaultLang: Lang = 'it';
export const pageKeys: PageKey[] = ['home', 'night', 'beavers', 'lodge', 'contact'];
/* the three chapters, in reading order */
export const chapterKeys = ['night', 'beavers', 'lodge'] as const;

export const copy = { it, en };

export const routes: Record<Lang, Record<PageKey, string>> = {
  it: { home: '/', night: '/come-lavoriamo/', beavers: '/perche-castori/', lodge: '/guardiamo-avanti/', contact: '/scrivici/' },
  en: { home: '/en/', night: '/en/how-we-work/', beavers: '/en/why-beavers/', lodge: '/en/looking-ahead/', contact: '/en/write-to-us/' }
};

/* pages outside the story */
export const privacyRoutes: Record<Lang, string> = { it: '/privacy/', en: '/en/privacy/' };

/* the chapter that follows each page, for the big link at the end */
export const nextPage: Record<PageKey, PageKey> = { home: 'night', night: 'beavers', beavers: 'lodge', lodge: 'contact', contact: 'home' };

export const meta = (lang: Lang, page: PageKey) => copy[lang].meta[page];
