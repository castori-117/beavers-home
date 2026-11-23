import type { Dictionary } from './it';

/* Copy in English. Same shape as it.ts, checked by the type. */
export const en: Dictionary = {
  locale: 'en_US',
  skip: 'Skip to content',
  language: 'Lingua, language',
  nav: {
    home: 'Beavers, back to the start',
    chapters: 'Chapters',
    menu: 'Menu',
    close: 'Close',
    cta: 'Write to us',
    day: 'we’re at work',
    night: 'we sleep, the agents don’t'
  },
  pages: {
    home: 'Prologue',
    services: 'What we do',
    night: 'How we work',
    beavers: 'Why beavers',
    lodge: 'Looking ahead',
    contact: 'Write to us'
  },
  chapters: {
    home: 'Prologue',
    services: 'Chapter one',
    night: 'Chapter two',
    beavers: 'Chapter three',
    lodge: 'Chapter four',
    contact: 'Epilogue'
  },
  meta: {
    home: {
      title: 'Beavers · Shopify developers with AI agents, from Italy',
      description: 'We’re Andrea and Lorenzo, Shopify developers. With a team of AI agents, a new store arrives in about three weeks. Free store review, including whether ChatGPT and Gemini can find you.'
    },
    services: {
      title: 'What we do: Shopify stores, redesigns, SEO and GEO, custom development · Beavers',
      description: 'New Shopify stores in about three weeks, redesigns without stopping sales, SEO and GEO to get found on Google and by AI assistants, and custom development. Everything starts with the free review.'
    },
    night: {
      title: 'How we work: AI agents at night, us in the morning · Beavers',
      description: 'At night AI agents prepare pages and code and test them on phones and computers. In the morning one of us reviews every change. A Shopify store in weeks, not months.'
    },
    beavers: {
      title: 'Why beavers: we close the leaks in your Shopify store · Beavers',
      description: 'A store loses customers the way a dam loses water: slow pages, complicated checkouts, weak photos, products nobody finds on Google. We find the leaks and close them.'
    },
    lodge: {
      title: 'Looking ahead: be found by AI assistants · Beavers',
      description: 'More and more people ask ChatGPT or Gemini what to buy. We set up your Shopify store’s products, pages and data so assistants understand them. And we’re building Lodge.'
    },
    contact: {
      title: 'Write to us: a free review of your Shopify store · Beavers',
      description: 'The first step is free: send us your store’s address and we reply with a short list of fixes, with a price next to each item. One of us replies, not a bot.'
    },
    notFound: {
      title: 'Page not found · Beavers',
      description: 'This page isn’t here. Go back to the start of the story.'
    }
  },
  consent: {
    label: 'Analytics',
    text: 'Anonymous, no cookies, to see which pages help. We only turn them on if you say yes.',
    yes: 'Fine by me',
    no: 'No, thanks',
    more: 'Privacy'
  },
  /* words that are new for most people, explained on hover or tap where the copy marks them [[key|word]] */
  terms: {
    agent: { t: 'AI agent', d: 'A piece of artificial intelligence software we give one precise task, like building a page or testing it on a phone. It works through it on its own, step by step. Then we check it.' },
    assistant: { t: 'AI assistant', d: 'An app like ChatGPT or Gemini that you ask questions as you would a person. More and more people use it to decide what to buy, too.' },
    seo: { t: 'SEO', d: 'Everything that helps your store show up higher on Google: copy, page structure, speed, product data.' },
    geo: { t: 'GEO', d: 'Like SEO, but for AI assistants like ChatGPT and Gemini: it helps them understand your products and recommend them when someone asks.' },
    shopify: { t: 'Shopify', d: 'The platform many online stores run on: products, cart and payments in one place. It’s what we build on.' }
  },
  privacy: {
    meta: {
      title: 'Privacy · Beavers',
      description: 'What data we collect, why, how long we keep it and what you can ask us. Cookieless analytics, only if you say yes.'
    },
    k: 'Privacy',
    title: 'Your data, <b>in plain words.</b>',
    lead: 'We collect very little: what we need to reply to you and to see whether the site works. Here is what, why, and what you can ask us.',
    updated: 'Last updated: 18 November 2026',
    change: 'Change your analytics choice',
    sections: [
      {
        h: 'Who we are',
        p: ['This site belongs to Beavers: Andrea and Lorenzo, Shopify developers in Italy. We decide how the data you leave us is used: in legal terms, we are the data controllers.', 'For any question, write to <a href="mailto:ciao@thebeavers.company">ciao@thebeavers.company</a>.']
      },
      {
        h: 'What we collect',
        list: [
          'If you write to us through the “The first step is free” form: your name, your store’s address and your email.',
          'If you join the Lodge waitlist: your email.',
          'If you tell us your name on “What we do”: it stays in your browser and is only used to call you by name on the site. We don’t receive it unless you write to us through the form.',
          'If you email us: whatever you choose to send.',
          'Analytics, only if you say yes: pages viewed, the site you came from, country, device type and browser, page speed. We don’t know who you are.',
          'Like every website, the server briefly logs some technical data, such as the IP address, to run and protect itself.'
        ]
      },
      {
        h: 'Why',
        list: [
          'To reply to you and prepare the review you ask for: a step before a possible agreement (Art. 6(1)(b) GDPR).',
          'To tell you when Lodge opens: because you ask us to (consent, Art. 6(1)(a)).',
          'For analytics: only with your consent (Art. 6(1)(a)), which you can withdraw at any time.',
          'To run and protect the site: our legitimate interest (Art. 6(1)(f)).'
        ],
        p: ['We don’t sell data, we don’t use it for advertising and we don’t profile anyone.']
      },
      {
        h: 'Who else sees it',
        p: ['A few providers who process it on our behalf: Vercel Inc. for hosting and analytics, and the services we use to receive forms and email. Vercel is based in the United States: transfers rely on the safeguards the GDPR provides, such as standard contractual clauses or the EU-US Data Privacy Framework.']
      },
      {
        h: 'How long',
        list: [
          'Requests and reviews: up to 24 months if you don’t become a client. If you do, for as long as the work and the law require.',
          'Lodge waitlist: until Lodge opens, or until you ask us to remove you.',
          'Analytics: aggregated only. The session that links them is deleted after 24 hours.'
        ]
      },
      {
        id: 'statistiche',
        h: 'Cookies and analytics',
        p: ['This site uses no profiling or advertising cookies. For analytics we use Vercel Web Analytics and Speed Insights, which use no cookies, and they only start if you press “Fine by me” in the box at the bottom. Your choice is saved in your browser: it is technical data and doesn’t identify you. You can change it whenever you like.']
      },
      {
        h: 'Your rights',
        p: ['At any time you can ask to see your data, correct it, delete it, restrict its use, object, or receive it in a readable format. You can withdraw consent with no consequences. Just email <a href="mailto:ciao@thebeavers.company">ciao@thebeavers.company</a>: we reply within 30 days.', 'If you think we are not handling your data properly, you can complain to the Italian data protection authority, the Garante per la protezione dei dati personali, at <a href="https://www.garanteprivacy.it" rel="noopener">garanteprivacy.it</a>.']
      }
    ]
  },
  copy: { idle: 'Copy', done: 'Copied' },
  footer: {
    write: 'Write to us',
    reply: 'One of us replies, not a bot.',
    story: 'The story',
    who: 'Who we are',
    whoLines: ['Andrea and Lorenzo,', 'plus a team of agents.'],
    profile: '{n} on LinkedIn',
    country: 'Italy',
    lodge: 'Lodge',
    lodgeLines: ['The den where your store takes shape.', 'Under construction.'],
    notify: 'Notify me when it opens',
    big: 'The first step is free.',
    privacy: 'Privacy',
    consent: 'Analytics',
    top: 'Back to top'
  },
  home: {
    opening: 'Opening',
    skipIntro: 'Skip the intro',
    skip: 'Skip',
    heroAlt: 'A northern lake at dawn, the forest mirrored in still water',
    title: '<b>There are two of us.</b><br> We work like a whole team.',
    sub: 'Two [[shopify|Shopify]] developers and a team of [[agent|AI agents]] that keeps working through the night. In the morning, one of us checks everything.',
    hintHover: 'Skim the water',
    hintTouch: 'Tap the water',
    cta: 'Free store review',
    ctaMore: '',
    prologue: { k: 'Prologue', v: 'How we work, in two lines' },
    manifesto: ['While you sleep', ', <b>the agents get the work ready.</b> In the morning', ' <b>we check it ourselves.</b>'],
    manifestoFoot: 'That’s how a new store arrives in weeks, not months. And no change goes live before we’ve looked at it.',
    manifestoLink: 'See how we work',
    ai: {
      k: 'Get found by AI',
      v: 'Part of the free review',
      title: 'People ask AI now. <b>Is your store there?</b>',
      p: 'More and more people ask an [[assistant|AI assistant]] like ChatGPT or Gemini for advice before they buy. In the free review we check whether it finds and understands your products, and tell you what to fix.',
      cta: 'Check your store',
      more: 'How it works',
      numsK: 'Why it matters, in three numbers',
      nums: [
        { n: '4 in 10', t: 'Italians already use ChatGPT, Gemini or Claude to find information.', src: 'YouGov, September 2026', url: 'https://yougov.com/it-it/reports/55503-ricerca-online-e-ia-nel-2026' },
        { n: '+90%', t: 'likelier to buy: people who reach an online store from an AI assistant, compared with other visitors.', src: 'Adobe, US stores, September 2026', url: 'https://business.adobe.com/blog/ai-traffic-higher-revenue-per-visit-retail-holiday' },
        { n: '1 in 2', t: 'Google searches already shows a summary written by AI, before the links.', src: 'McKinsey, 2025', url: 'https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights/new-front-door-to-the-internet-winning-in-the-age-of-ai-search' }
      ]
    },
    us: {
      k: 'Who we are',
      title: 'Hi, we’re <b>Andrea and Lorenzo.</b>',
      p: [
        'We come from a leading Italian agency, where we learned what works and what doesn’t. Today we work our own way: the two of us, with a team of agents that does the heavy lifting.',
        'One of us talks with you, the other guides the agents. No hand-offs: you always talk to the people actually working on your store.'
      ],
      sign: 'Andrea and Lorenzo'
    },
    index: {
      k: 'The story',
      title: 'Four chapters <b>and an epilogue.</b>',
      items: {
        services: 'New stores, redesigns, SEO and GEO, custom development.',
        night: 'Agents at night, us in the morning. And weeks, not months.',
        beavers: 'They hear where it leaks, and they close the gap. We do the same with your store.',
        lodge: 'Get found by AI. And the lodge we’re building.',
        contact: 'The first step is free. One of us replies.'
      }
    }
  },
  services: {
    title: 'From the first sketch <b>to a store that sells.</b>',
    /* with the visitor's name: «Marta, here’s what <b>we can do for you.</b>» */
    named: ['here’s what', 'we can do for you.'],
    lead: 'Four things we do every day, always the two of us and the [[agent|agents]]. Each one starts with the free review: first we look, then we tell you what you actually need.',
    index: 'The four services',
    items: [
      {
        id: 'new-stores',
        chip: 'New stores',
        tag: '01',
        title: 'New <b>stores.</b>',
        p: 'We design and build your [[shopify|Shopify]] store, from the first page to the checkout. You tell us what you sell, we put it in the window.',
        list: ['A design made for your products, not a theme picked at random.', 'Pages that are fast on a phone, where most people buy.', 'Payments, shipping and taxes set up before you go live.'],
        meta: ['Timing', 'about three weeks, for a mid-sized store.']
      },
      {
        id: 'redesigns',
        chip: 'Redesigns',
        tag: '02',
        title: '<b>Redesigns.</b>',
        p: 'You already have a store, but it no longer looks like you or sells less than it could. We rebuild it piece by piece, without stopping sales.',
        list: ['Home page, product pages and checkout, in the order that matters most.', 'Your photos and your words, on a page that lets them breathe.', 'You see every change before it goes live.']
      },
      {
        id: 'getting-found',
        chip: 'SEO and GEO',
        tag: '03 · [[seo|SEO]] and [[geo|GEO]]',
        title: 'Getting <b>found.</b>',
        p: 'On Google and, more and more, on AI assistants like ChatGPT and Gemini. We fix copy, pages and product data so they find you and understand you.',
        list: ['The words your customers use, in the right places.', 'Complete product pages that an assistant can read and recommend.', 'A check every month: where you show up, and where you don’t.'],
        meta: ['Included', 'in the free review, we already check whether ChatGPT and Gemini find you.']
      },
      {
        id: 'custom',
        chip: 'Custom development',
        tag: '04',
        title: 'Custom <b>development.</b>',
        p: 'When the theme isn’t enough: new features, connections to the tools you already use, and everyday changes. You write us two lines in the evening, by morning it’s done and checked.',
        list: ['Features your theme doesn’t have, built for your store.', 'Your store talking to your stock, shipping and email.', 'Small changes when you need them, without waiting weeks.']
      }
    ],
    store: {
      shop: 'yourstore.com',
      site: '{s}shop.com',
      of: '{n}’s store.',
      cap1: ['Handmade,', 'close to you.'],
      cap1n: 'Handmade.',
      cap2: ['Lake ceramics.', 'Made by hand.'],
      cap2n: 'Redone.',
      weeks: ['Week 1 · design', 'Week 2 · build', 'Week 3 · live']
    },
    ba: {
      label: 'Before and after: move the line',
      before: 'Before',
      after: 'After',
      top: 'SALE!!! FREE SHIPPING OVER €49 · NEW IN · SALE!!!',
      logo: 'My Online Shop',
      menu: ['HOME', 'PRODUCTS', 'OFFERS', 'ABOUT', 'CONTACT', 'BLOG'],
      banner: 'WELCOME TO OUR SHOP!!'
    },
    serp: {
      q: 'handmade ceramic mug',
      ask: 'Where can I find a handmade mug?',
      answer: ['I’d suggest', ': a small workshop, hand-made glazes, under 30 euros.']
    },
    overnight: {
      k: 'Pick a request, and watch the night go by.',
      label: 'Example requests',
      picks: ['A colour filter', 'Sizes in a table', 'Free shipping over €49'],
      asks: ['Could you add a colour filter?', 'Can the sizes go in a table?', 'Free shipping over 49 euros?'],
      done: 'Done, and checked this morning. It’s already live.',
      doneN: 'Done, {n}, and checked this morning. It’s already live.',
      ship: '€12 to go for free shipping',
      category: 'Ceramics',
      count: '24 products',
      height: 'Height',
      litres: 'Litres'
    },
    more: {
      title: 'And much <b>more.</b>',
      p: 'What a store asks for after the first few months. We do them the same way: agents at night, us in the morning.',
      again: 'Run it again',
      items: ['Moves from WooCommerce', 'Multilingual stores', 'Selling abroad', 'Faster pages', 'Product pages', 'Filters and search', 'Campaign pages', 'Kits and bundles', 'Subscriptions', 'Reviews', 'Automated emails', 'Abandoned carts', 'Wholesale price lists', 'Google Shopping feeds', 'Structured data', 'Apps and integrations', 'Accessibility', 'Custom theme', 'Sales insights', 'Training for your team', 'Everyday changes'],
      end: '…and whatever you need.',
      endN: '…and whatever {n} needs.'
    },
    call: {
      k: 'Write to us',
      kN: 'Write to us, {n}',
      title: 'If you need something you don’t see here, ask. <b>If we can do it well we’ll say so, if not we’ll tell you who can.</b>',
      cta: 'Send us an email',
      subject: 'A question for Beavers',
      note: 'You’ll find us at ciao@thebeavers.company. One of us replies, within one working day.',
      write: 'Rather use the form?'
    },
    who: {
      lines: ['Hi, we’re Andrea and Lorenzo.', 'Before we tell you what we do, we’d like to know who we’re talking to.'],
      title: 'What’s <b>your name?</b>',
      label: 'Your name',
      placeholder: 'your name',
      go: 'Continue',
      skip: 'I’d rather not',
      note: 'We’ll use your name on this page and build the example store for you. It stays in your browser: we don’t receive it.',
      hello: 'Nice to meet you, {n}.',
      sub: 'Now let us tell you what we can do for you.'
    }
  },
  night: {
    title: 'Beavers work at night. <b>So do our agents.</b>',
    intro: 'While you sleep, the [[agent|agents]] get the work ready. In the morning, we check it ourselves. Drag the sun along the line, or let the night go by on its own.',
    nightAlt: 'Night on the lake: the moon, the forest and a beaver lodge on the water',
    dayAlt: 'The same lake in the morning, with someone on the jetty',
    caps: [
      'You tell us what you want to change. Two lines are enough.',
      'The agents get to work: they prepare the pages, write the code, and test it on phones and computers.',
      'One of us reviews every change, calmly. If something doesn’t convince us, it gets redone.',
      'Your store is up to date. You slept.'
    ],
    legend: 'The little lights are our agents',
    range: 'Time of night',
    goto: 'Go to ',
    duo: {
      k: 'Who does what',
      title: 'The agents do the heavy lifting. <b>The decisions stay ours.</b>',
      agents: 'The agents',
      agentsList: ['They prepare the pages.', 'They write the code.', 'They test everything on phones and computers.', 'They keep working through the night.'],
      us: 'Us',
      usList: ['We talk with you and decide together what to do.', 'We guide the agents.', 'We review every change, calmly.', 'We only put live what convinces us.']
    },
    weeks: {
      k: 'Timing',
      title: '<b>Weeks,</b> not months.',
      p: 'With a traditional agency, a new store can take up to six months. We aim for three weeks: we don’t rush, the work simply doesn’t stop at night.',
      chart: 'Comparison: up to 26 weeks with a traditional agency, about 3 weeks with us',
      agency: ['A traditional agency', 'up to 6 months'],
      us: ['With us', 'about 3 weeks'],
      free: 'The rest is time to sell.',
      note: 'Indicative timing for a mid-sized store. After the review we give you the real ones.'
    }
  },
  beavers: {
    hat: {
      q: 'Did you mean <b>why choose us?</b>',
      p: 'This page is about our name and the animal behind it. If you want to know what we can do for your store, start here.',
      cta: 'What we do'
    },
    title: 'We hear where it leaks. <b>And we close the gap.</b>',
    lead: 'A store loses customers the way a dam loses water: through small leaks nobody sees. We find them and close them, one by one. So you sell more.',
    damAlt: 'A dam of branches across the river, with a small leak letting water through',
    again: 'Watch again',
    story: {
      k: 'A true story',
      title: 'The story of Lars Wilsson',
      lead: 'In the 1960s, the Swedish biologist Lars Wilsson played his beavers the sound of running water through a loudspeaker. They covered the speaker with branches and mud: <b>they hear leaks, and they close them.</b>',
      us: 'We do the same with your store. <b>We find where customers walk away, and we close the gap.</b>',
      leaks: [
        'A page that loads slowly on a phone.',
        'A checkout that asks for too much.',
        'Photos that don’t make you want to buy.',
        'Products nobody can find on Google.'
      ]
    },
    traits: {
      k: 'Why beavers, exactly',
      title: 'They’re more like us <b>than you’d think.</b>',
      items: [
        { t: 'They work at night.', p: 'Beavers do most of their work after dark. It’s the same with us: the [[agent|agents]] take the night shift, we take the morning one.', link: 'See a night of work' },
        { t: 'They work as a family.', p: 'Two parents who stay together for life, and their young, who help with the dam and the lodge from their very first autumn. <b>A small team that knows each other well.</b>' },
        { t: 'They build to last.', p: 'The longest known beaver dam is in Canada, in Wood Buffalo National Park: about 850 metres, visible from space. Beavers have worked on it since the 1970s, one generation after another. <b>We build with what comes next in mind, too.</b>' }
      ]
    },
    facts: {
      label: 'Beaver facts',
      k: 'Did you know?',
      next: 'Another one',
      items: [
        'Beavers’ teeth are orange: the enamel contains iron.',
        'Their front teeth grow all their lives. Gnawing keeps them short.',
        'A beaver can stay underwater for 6 to 8 minutes.',
        'The beaver is the largest rodent in the world after the capybara.',
        'After about 500 years, the beaver is back in Italy. Even in the Marche.',
        'You enter the lodge from under the water. At the top there is a vent for air.',
        'Without sunlight, a beaver’s day stretches to 26 to 29 hours.'
      ]
    }
  },
  lodge: {
    title: 'Today people ask AI. <b>Be found.</b>',
    p: 'More and more people ask an [[assistant|assistant]] like ChatGPT or Gemini for advice before they buy. We set up your store’s products, pages and data so the assistant understands them well, and can recommend them.',
    chat: {
      k: 'Example · someone asks an assistant',
      replies: 'The assistant replies',
      store: 'yourstore.com',
      note: 'Assistants choose on their own what to recommend. We make sure they understand your products well.',
      asks: [
        { art: 'cup', q: 'I’m looking for a handmade ceramic mug as a gift. Under 30 euros.', a: 'I’d suggest this one, from a small Italian workshop:', product: 'Stoneware mug, forest glaze', price: '€28' },
        { art: 'oil', q: 'A good extra virgin olive oil to give as a gift, arriving by Friday.', a: 'This one comes from a small mill and ships today:', product: 'Extra virgin olive oil, 500 ml tin', price: '€18' },
        { art: 'pack', q: 'I need a waterproof city backpack for a 14-inch laptop.', a: 'This one has a padded sleeve and a waxed canvas base:', product: 'Waxed canvas backpack, forest green', price: '€89' },
        { art: 'candle', q: 'A scented candle that doesn’t smell fake, for a new home.', a: 'This one is soy wax, poured by hand:', product: 'Soy candle, wood and fig', price: '€24' },
        { art: 'sweater', q: 'A warm jumper that doesn’t itch, size M.', a: 'This one is merino wool, made in Italy:', product: 'Merino jumper, mist grey', price: '€79' },
        { art: 'book', q: 'A beautiful notebook for a graduation gift, with the name engraved.', a: 'This one can be personalised and arrives in three days:', product: 'Leather notebook, engraved', price: '€35' }
      ]
    },
    next: { k: 'Lodge', v: 'Our next thing' },
    lodgeTitle: 'We’re building Lodge. <b>The den where your store takes shape.</b>',
    lodgeP: 'The way people shop changes every year, and so does the way stores are built. Lodge will be your quiet place to work on yours, together with us and our agents.',
    alt: 'Cross-section of a beaver lodge: a dry room above the water, a vent at the top and the entrance underwater',
    parts: {
      vent: { label: 'the vent', note: 'There is always an airway through the top: the lodge breathes, even in winter.' },
      room: { label: 'the dry room', note: 'The room stays dry, above the water line. A calm place to work.' },
      water: { label: 'the water line', note: 'With its dam, the beaver keeps the water deep enough: even in winter, ice can’t block the entrance.' },
      door: { label: 'the entrance, from below', note: 'The way in is under the water: whoever doesn’t live there stays out.' }
    },
    note: 'A lodge is a beaver’s home: a dry room above the water, with the entrance from below. Sheltered, and always within reach.',
    verbs: [
      { v: 'Ask', t: 'Write what you want, the way you’d say it out loud.' },
      { v: 'See', t: 'Preview the design before it becomes real.' },
      { v: 'Get it reviewed', t: 'By one of us, or by a developer you choose.' },
      { v: 'Learn', t: 'If you like, we explain what we built.' }
    ],
    waitlist: {
      label: 'Under construction. We’ll let you know when it opens.',
      placeholder: 'your email',
      submit: 'Notify me',
      error: 'Check your email: something seems to be missing.',
      done: 'You’re in. We’ll write when the lodge is ready.',
      subject: 'Lodge: notify me when it opens'
    }
  },
  contact: {
    title: 'The first step <b>is free.</b>',
    lead: 'Three steps, no strings attached. At the end you know what to do, and what it costs.',
    steps: [
      'You send us your store’s address.',
      'We look at it calmly, through the eyes of ChatGPT and Gemini too, and send you a short list, with a price next to each item.',
      'If it convinces you, we fix it. If not, the list is yours to keep.'
    ],
    form: {
      s1: 'Hi, I’m',
      s2: 'My store is',
      s3: 'and you can reach me at',
      nameL: 'Your name',
      shopL: 'Your store’s address',
      emailL: 'Your email',
      nameP: 'your name',
      shopP: 'yourstore.com',
      emailP: 'your email',
      errors: {
        name: 'Write your name, so we know what to call you.',
        shop: 'We need your store’s address, for example yourstore.com.',
        email: 'Check your email: something seems to be missing.'
      },
      send: 'Send',
      reply: 'One of us replies, not a bot.',
      thx1: 'Thank you,',
      thx2: 'We’ll look at your store calmly and write back ourselves.',
      you: 'you',
      subject: 'Free store review'
    },
    mailK: 'Send us an email',
    mailP: 'Your store’s address and two lines on what you need are enough.',
    mailSubject: 'Free store review',
    or: 'Or leave your details here:',
    closeLabel: 'The lake in the morning',
    closeAlt: 'The lake in the morning, with the beaver lodge and someone on the jetty',
    closeCap: 'In the morning, we check it ourselves.',
    back: 'Back to the start'
  },
  notFound: {
    k: 'Off the trail',
    title: 'There’s <b>no lodge here.</b>',
    p: 'The page you’re looking for doesn’t exist, or has moved. The story starts again from the beginning.',
    cta: 'Back to the start'
  }
};
