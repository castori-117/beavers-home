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
    night: 'How we work',
    beavers: 'Why beavers',
    lodge: 'Looking ahead',
    contact: 'Write to us'
  },
  chapters: {
    home: 'Prologue',
    night: 'Chapter one',
    beavers: 'Chapter two',
    lodge: 'Chapter three',
    contact: 'Epilogue'
  },
  meta: {
    home: {
      title: 'Beavers · Shopify developers with AI agents, from Italy',
      description: 'We’re Andrea and Lorenzo, two Shopify developers. With a team of AI agents that keeps working through the night, a new store arrives in about three weeks. Free store review.'
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
  copy: { idle: 'Copy', done: 'Copied' },
  footer: {
    write: 'Write to us',
    reply: 'One of us replies, not a bot.',
    story: 'The story',
    who: 'Who we are',
    whoLines: ['Andrea and Lorenzo,', 'plus a team of agents.'],
    country: 'Italy',
    lodge: 'Lodge',
    lodgeLines: ['The den where your store takes shape.', 'Under construction.'],
    notify: 'Notify me when it opens',
    big: 'The first step is free.',
    privacy: 'Privacy [to be added]',
    top: 'Back to top'
  },
  home: {
    opening: 'Opening',
    skipIntro: 'Skip the intro',
    skip: 'Skip',
    heroAlt: 'A northern lake at dawn, the forest mirrored in still water',
    title: '<b>There are two of us.</b><br> We work like a whole team.',
    sub: 'Two Shopify developers and a team of AI agents that keeps working through the night. In the morning, one of us checks everything.',
    hintHover: 'Skim the water',
    hintTouch: 'Tap the water',
    cta: 'Free store review',
    ctaMore: '',
    prologue: { k: 'Prologue', v: 'How we work, in two lines' },
    manifesto: ['While you sleep', ', <b>the agents get the work ready.</b> In the morning', ' <b>we check it ourselves.</b>'],
    manifestoFoot: 'That’s how a new store arrives in weeks, not months. And no change goes live before we’ve looked at it.',
    manifestoLink: 'See how we work',
    us: {
      k: 'Who we are',
      title: 'Hi, we’re <b>Andrea and Lorenzo.</b>',
      p: [
        'We come from a leading Italian agency, where we learned what works and what doesn’t. Today we work our own way: the two of us, with a team of agents that does the heavy lifting.',
        'One of us talks with you, the other guides the agents. No hand-offs: you always talk to the people actually working on your store.'
      ],
      sign: 'Andrea and Lorenzo',
      photos: [
        { name: 'Photo of Andrea', hint: 'Natural light, looking into the camera' },
        { name: 'Photo of Lorenzo', hint: 'Same light, same place' }
      ]
    },
    index: {
      k: 'The story',
      title: 'Three chapters <b>and an epilogue.</b>',
      items: {
        night: 'Agents at night, us in the morning. And weeks, not months.',
        beavers: 'They hear where it leaks, and they close the gap. We do the same with your store.',
        lodge: 'The new AI shop windows, and the lodge we’re building.',
        contact: 'The first step is free. One of us replies.'
      }
    }
  },
  night: {
    title: 'Beavers work at night. <b>So do our agents.</b>',
    intro: 'While you sleep, the agents get the work ready. In the morning, we check it ourselves. Drag the sun along the line, or let the night go by on its own.',
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
        { t: 'They work at night.', p: 'Beavers do most of their work after dark. It’s the same with us: the agents take the night shift, we take the morning one.', link: 'See a night of work' },
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
    p: 'More and more people ask an assistant like ChatGPT or Gemini for advice before they buy. We set up your store’s products, pages and data so the assistant understands them well, and can recommend them.',
    chat: {
      k: 'Example · someone asks an assistant',
      q: 'I’m looking for a handmade ceramic mug as a gift. Under 30 euros.',
      replies: 'The assistant replies',
      a: 'I’d suggest this one, from a small Italian workshop:',
      product: 'Stoneware mug, forest glaze',
      store: 'yourstore.com',
      price: '€28',
      note: 'Assistants choose on their own what to recommend. We make sure they understand your products well.',
      again: 'Ask again'
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
      'We look at it calmly and send you a short list, with a price next to each item.',
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
    mail: 'Prefer email?',
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
