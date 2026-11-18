/* Turns our small inline HTML (<b>, <br>) into plain text or Markdown, for llms.txt and agents.md. */
export const plain = (html: string) => html.replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
export const markdown = (html: string) => html.replace(/<br\s*\/?>/g, ' ').replace(/<b>(.*?)<\/b>/g, '**$1**').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
