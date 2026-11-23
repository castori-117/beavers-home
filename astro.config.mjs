import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), 'PUBLIC_');
const site = process.env.PUBLIC_SITE_URL || env.PUBLIC_SITE_URL || 'https://www.thebeavers.company';
const CSS_INLINE_LIMIT = 16 * 1024;
if (!/^https?:\/\//.test(site)) throw new Error('Set PUBLIC_SITE_URL to an absolute http(s) URL.');

export default defineConfig({
  site,
  trailingSlash: 'always',
  compressHTML: true,
  build: { format: 'directory', inlineStylesheets: 'auto' },
  vite: { build: { cssMinify: 'esbuild', assetsInlineLimit: (path, content) => path.endsWith('.css') && content.length < CSS_INLINE_LIMIT ? true : undefined } },
  i18n: {
    locales: ['it', 'en'],
    defaultLocale: 'it',
    routing: { prefixDefaultLocale: false }
  }
});
