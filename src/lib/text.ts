/* Our copy is small inline HTML (<b>, <br>) plus glossary marks: [[agent|gli agenti]] is the word "gli agenti",
   explained on hover or tap by the definition of "agent" (see i18n, terms). */
const TERM = /\[\[([a-z]+)\|([^\]]+)\]\]/g;

/* for the pages: each mark becomes a small button that the term-tips element explains */
export const terms = (html: string) => html.replace(TERM, (_, key: string, word: string) => `<button type="button" class="term" data-term="${key}">${word}</button>`);

/* for llms.txt and agents.md: the word alone */
const unmark = (html: string) => html.replace(TERM, '$2');
export const plain = (html: string) => unmark(html).replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
export const markdown = (html: string) => unmark(html).replace(/<br\s*\/?>/g, ' ').replace(/<b>(.*?)<\/b>/g, '**$1**').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
