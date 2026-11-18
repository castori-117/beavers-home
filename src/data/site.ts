export const site = {
  name: 'Beavers',
  legalName: 'The Beavers Company',
  domain: 'thebeavers.company',
  email: { value: 'ciao@thebeavers.company', href: 'mailto:ciao@thebeavers.company' },
  founders: ['Andrea', 'Lorenzo'],
  /* where each of us can be found; also the sameAs of each founder in the structured data */
  profiles: [
    { name: 'Andrea', linkedin: 'https://www.linkedin.com/in/andrea-cazzato-it/' },
    { name: 'Lorenzo', linkedin: 'https://www.linkedin.com/in/lorenzo-sanseverino-138105385/' }
  ],
  country: { code: 'IT', it: 'Italia', en: 'Italy' },
  timeZone: 'Europe/Rome',
  founded: '2026',
  themeColor: '#eef1ec',
  /* fill in once the business is registered: it appears in the footer and on the privacy page */
  legal: { vat: '' as string },
  formEndpoint: import.meta.env.PUBLIC_FORM_ENDPOINT || '',
  /* every agent claim on the site, kept in one place so llms.txt and agents.md stay in step with the pages */
  facts: {
    team: 2,
    targetWeeks: 3,
    agencyMonths: 6,
    platform: 'Shopify'
  }
} as const;
