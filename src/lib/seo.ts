import { site } from '../data/site';
import { plain } from './text';
import { copy, routes, type Lang, type PageKey } from '../i18n';

const absolute = (path: string, base: URL) => new URL(path, base).href;

/* One graph per page: the company, the website, this page and where it sits.
   Every claim mirrors visible copy, so answer engines and search read the same facts people do. */
export function structuredData({ lang, page, base, image }: { lang: Lang; page: PageKey; base: URL; image: string }) {
  const t = copy[lang];
  const url = absolute(routes[lang][page], base);
  const orgId = absolute('/#organization', base);
  const siteId = absolute('/#website', base);
  const founders = site.profiles.map(({ name, linkedin }) => ({ '@type': 'Person', name, jobTitle: lang === 'it' ? 'Sviluppatore Shopify' : 'Shopify developer', sameAs: [linkedin], worksFor: { '@id': orgId } }));

  const organization = {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': orgId,
    name: site.name,
    alternateName: site.legalName,
    url: absolute('/', base),
    logo: { '@type': 'ImageObject', url: absolute('/logo.png', base), width: 512, height: 512 },
    image,
    email: site.email.value,
    slogan: t.footer.big,
    description: t.meta.home.description,
    foundingDate: site.founded,
    founder: founders,
    numberOfEmployees: { '@type': 'QuantitativeValue', value: site.facts.team },
    address: { '@type': 'PostalAddress', addressCountry: site.country.code },
    areaServed: [{ '@type': 'Country', name: site.country[lang] }, { '@type': 'Place', name: lang === 'it' ? 'Europa' : 'Europe' }],
    knowsLanguage: ['it', 'en'],
    knowsAbout: ['Shopify', 'E-commerce', lang === 'it' ? 'Sviluppo di temi Shopify' : 'Shopify theme development', lang === 'it' ? 'Agenti AI' : 'AI agents', 'Generative Engine Optimization', 'SEO', lang === 'it' ? 'Velocità dei siti' : 'Web performance', lang === 'it' ? 'Ottimizzazione del checkout' : 'Checkout optimization'],
    contactPoint: { '@type': 'ContactPoint', contactType: 'sales', email: site.email.value, availableLanguage: ['Italian', 'English'], url: absolute(routes[lang].contact, base) }
  };

  const website = {
    '@type': 'WebSite',
    '@id': siteId,
    url: absolute('/', base),
    name: site.name,
    alternateName: site.legalName,
    inLanguage: ['it', 'en'],
    publisher: { '@id': orgId }
  };

  const service = {
    '@type': 'Service',
    '@id': absolute(`${routes[lang].home}#service`, base),
    name: lang === 'it' ? 'Sviluppo e cura di negozi Shopify con agenti AI' : 'Shopify store development and care with AI agents',
    serviceType: lang === 'it' ? 'Sviluppo Shopify' : 'Shopify development',
    description: plain(t.home.sub),
    provider: { '@id': orgId },
    areaServed: site.country[lang],
    availableLanguage: ['it', 'en'],
    offers: {
      '@type': 'Offer',
      name: t.home.cta + t.home.ctaMore,
      description: t.contact.lead,
      price: 0,
      priceCurrency: 'EUR',
      url: absolute(routes[lang].contact, base)
    }
  };

  const crumbs = page === 'home' ? [] : [
    { '@type': 'ListItem', position: 1, name: site.name, item: absolute(routes[lang].home, base) },
    { '@type': 'ListItem', position: 2, name: t.pages[page], item: url }
  ];

  const webpage = {
    '@type': page === 'contact' ? 'ContactPage' : page === 'home' || page === 'services' ? 'WebPage' : 'AboutPage',
    '@id': `${url}#webpage`,
    url,
    name: t.meta[page].title,
    description: t.meta[page].description,
    inLanguage: lang,
    isPartOf: { '@id': siteId },
    about: { '@id': orgId },
    primaryImageOfPage: { '@type': 'ImageObject', url: image },
    ...(crumbs.length ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {}),
    ...(page === 'home' || page === 'contact' ? { mainEntity: { '@id': service['@id'] } } : {}),
    ...(page === 'services' ? { mainEntity: { '@id': `${url}#services` } } : {})
  };

  /* the services page: the four services, each one a Service by the same company */
  const catalog = {
    '@type': 'OfferCatalog',
    '@id': `${url}#services`,
    name: t.pages.services,
    itemListElement: t.services.items.map((item) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: item.chip, description: plain(item.p), provider: { '@id': orgId }, areaServed: site.country[lang] }
    }))
  };

  const graph: object[] = [organization, website, webpage];
  if (crumbs.length) graph.push({ '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: crumbs });
  if (page === 'home' || page === 'contact') graph.push(service);
  if (page === 'services') graph.push(catalog);
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}
