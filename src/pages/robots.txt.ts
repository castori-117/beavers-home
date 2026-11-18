import type { APIRoute } from 'astro';

/* Search engines and answer engines are welcome: being found by AI assistants is part of what we sell. */
const AI_AGENTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Meta-ExternalAgent', 'MistralAI-User', 'DuckAssistBot', 'CCBot'];

export const GET: APIRoute = ({ site }) => {
  const absolute = (path: string) => new URL(path, site).href;
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    '# Answer engines and AI assistants: welcome.',
    ...AI_AGENTS.map((agent) => `User-agent: ${agent}`),
    'Allow: /',
    '',
    `# A plain summary for language models: ${absolute('/llms.txt')}`,
    `# Full text of every page: ${absolute('/llms-full.txt')}`,
    `# Notes for AI agents acting for a person: ${absolute('/agents.md')}`,
    '',
    `Sitemap: ${absolute('/sitemap.xml')}`,
    ''
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
