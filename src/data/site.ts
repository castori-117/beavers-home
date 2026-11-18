export const site = {
  name: 'Beavers',
  legalName: 'The Beavers Company',
  domain: 'thebeavers.company',
  email: { value: 'ciao@thebeavers.company', href: 'mailto:ciao@thebeavers.company' },
  founders: ['Andrea', 'Lorenzo'],
  country: { code: 'IT', it: 'Italia', en: 'Italy' },
  timeZone: 'Europe/Rome',
  founded: '2026',
  themeColor: '#eef1ec',
  formEndpoint: import.meta.env.PUBLIC_FORM_ENDPOINT || '',
  /* every agent claim on the site, kept in one place so llms.txt and agents.md stay in step with the pages */
  facts: {
    team: 2,
    targetWeeks: 3,
    agencyMonths: 6,
    platform: 'Shopify'
  }
} as const;
