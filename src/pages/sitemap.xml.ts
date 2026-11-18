import type { APIRoute } from 'astro';
import { defaultLang, languages, pageKeys, privacyRoutes, routes } from '../i18n';

const priority = { home: '1.0', contact: '0.9', night: '0.8', beavers: '0.8', lodge: '0.8' } as const;

export const GET: APIRoute = ({ site }) => {
  const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const absolute = (path: string) => escape(new URL(path, site).href);
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = pageKeys.flatMap((page) => languages.map((lang) => [
    '<url>',
    `<loc>${absolute(routes[lang][page])}</loc>`,
    `<lastmod>${lastmod}</lastmod>`,
    `<priority>${priority[page]}</priority>`,
    ...languages.map((alternate) => `<xhtml:link rel="alternate" hreflang="${alternate}" href="${absolute(routes[alternate][page])}"/>`),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${absolute(routes[defaultLang][page])}"/>`,
    '</url>'
  ].join('')));
  urls.push(...languages.map((lang) => [
    '<url>',
    `<loc>${absolute(privacyRoutes[lang])}</loc>`,
    `<lastmod>${lastmod}</lastmod>`,
    '<priority>0.3</priority>',
    ...languages.map((alternate) => `<xhtml:link rel="alternate" hreflang="${alternate}" href="${absolute(privacyRoutes[alternate])}"/>`),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${absolute(privacyRoutes[defaultLang])}"/>`,
    '</url>'
  ].join('')));
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
