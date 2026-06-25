/* Midnight partnership marketing kit — content */

/* ---------------------------------------------------------------- */
/* Personas — benefits breakdown                                     */
/* ---------------------------------------------------------------- */
const PERSONAS = [
  {
    id: 'institutions',
    label: 'Institutions',
    sub: 'Banks · asset managers',
    hero: 'Predictable & familiar term structure, with onchain benefits.',
    proofs: [
      'Full control over rate, risk, maturity, and market-level compliance',
      'Rate and fee certainty from day one',
      'Tap into Morpho\'s network without building & bootstrapping your own',
    ],
  },
  {
    id: 'enterprises',
    label: 'Fintechs',
    sub: 'Fintechs · neobanks · product teams',
    hero: 'Offer fixed-rate products alongside variable-rate.',
    proofs: [
      'Scalable customization to build predictable credit products based on user needs',
      'No need to build a credit engine from scratch',
    ],
  },
  {
    id: 'curators',
    label: 'Curators',
    sub: 'Vault curators · risk strategists',
    hero: 'New dimensions to differentiate on: risk and rate',
    proofs: [
      'Duration management becomes an important part of curator strategy',
      'Multi-market offers and callbacks maximize capital efficiency of deposits',
      'Access gates for lenders to satisfy any compliance needs',
    ],
  },
  {
    id: 'lenders-borrowers',
    label: 'Lenders & borrowers',
    sub: 'End users',
    hero: 'Predictable rates and terms for the life of the loan.',
    proofs: [
      'Flexibility: one offer can quote across multiple markets',
      'Capital keeps earning variable yield on Blue while waiting for a fixed-rate match on Midnight',
    ],
  },
];

/* ---------------------------------------------------------------- */
/* Announcement plan                                                 */
/* ---------------------------------------------------------------- */
const TIMELINE = [
  {
    day: 'D −7',
    title: 'The ticking clock',
    body: 'An animated clock ticking towards Midnight, posted by @morpho.',
    support: 'RT the teaser from @morpho.',
    tone: 'tease',
  },
  {
    day: 'D −1',
    title: '🕛 Midnight is coming',
    body: 'A stand-alone @morpho post of a single emoji: 🕛',
    support: "QT with 🕛 from your brand and/or exec accounts.",
    tone: 'tease',
  },
  {
    day: 'Launch Day',
    title: 'Midnight goes live',
    body: 'Announcement with animation and a CTA towards the Morpho Midnight app.',
    support: "QT the announcement with a line on what Midnight unlocks for you.",
    cta: 'Core benefit for you',
    ctaHref: '#messaging',
    tone: 'launch',
  },
];

/* ---------------------------------------------------------------- */
/* How you can support                                               */
/* ---------------------------------------------------------------- */
const SUPPORT = [
  {
    tag: 'Teaser 1 · D −7',
    kind: 'clock',
    title: 'RT the teaser',
    body: 'Repost the teasing post from @morpho — the animated clock ticking towards Midnight.',
  },
  {
    tag: 'Teaser 2 · D −1',
    kind: 'emoji',
    title: 'QT with 🕛',
    body: "Quote @morpho's 🕛 post with 🕛 from your brand account and/or exec accounts.",
  },
  {
    tag: 'Announcement · Launch Day',
    kind: 'announce',
    title: 'QT the announcement',
    body: "Quote @morpho's announcement post with a line on what Midnight unlocks for what you're building. Core messaging is in the next section.",
    cta: 'Customize your visual',
  },
];

/* ---------------------------------------------------------------- */
/* Introduction to Morpho Midnight                                   */
/* ---------------------------------------------------------------- */
const WHY_MIDNIGHT = {
  proved: [
    'Isolated markets',
    'The vault & curator model',
    'The value of full control over risk',
  ],
  revealed: [
    'Liquidity fragmentation is still a challenge — especially with onchain compliance',
    'Users demand more predictability',
    'Participants benefit from controlling both risk and rate',
  ],
};

const WHAT_IS_MIDNIGHT = {
  definition: 'Morpho Midnight is a noncustodial protocol for fixed-rate, fixed-term credit markets that enables lenders and borrowers to be matched on their own terms.',
  complement: 'Midnight complements Morpho Blue, Morpho\'s protocol for variable-rate lending. While Blue supports open-term, variable-rate borrowing, Midnight introduces fixed term credit markets with pricing set directly by lenders and borrowers.',
  links: [
    { label: 'Code base', href: 'https://t.co/mhHwMqClmn' },
    { label: 'Whitepaper', href: 'https://morpho.org/whitepapers/midnight-whitepaper.pdf' },
    { label: 'Deck', href: 'https://morpho.docsend.com/view/adaad8gmujszedvm' },
    { label: 'One pager', href: '#', soon: true },
  ],
};

window.MIDNIGHT = { PERSONAS, TIMELINE, SUPPORT, WHY_MIDNIGHT, WHAT_IS_MIDNIGHT };
