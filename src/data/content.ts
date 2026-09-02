/**
 * Inkwell Marketing Landing Page Content & Configurations
 * 
 * Design Reference Citations:
 * - https://ellipsus.com: Borrowed literary tone, caps eyebrow labels, warm human anti-AI stance,
 *   single repeated CTA throughout, literary quote in footer, generous whitespace and calm pacing.
 * - https://toyfight.co: Borrowed bold typography with animated rotating word-swaps, scroll-triggered reveals,
 *   horizontal marquee text strip, personality-driven microcopy, and prominent product cards, adapted
 *   to a calm parchment/ink literary aesthetic.
 */

import { AdditionalFeature, BinderScene, CharacterLore, MarginaliaNote, ProFeature, QuoteItem } from '../types';

export const HERO_WORD_SWAPS = [
  'only you',
  'your way',
  'in your browser',
  'by hand',
  'with craft',
  'in silence',
];

export const WHO_ITS_FOR = [
  {
    id: 'debut',
    label: 'Debut Novelists',
    description: 'Writers building their first 90,000 words who need clear structural view without clunky bloatware.',
    icon: 'Feather',
  },
  {
    id: 'plotters-pantsers',
    label: 'Plotters & Pantsers',
    description: 'Whether you outline every beat in the Binder or dive straight into the Workbench, Inkwell bends to your instinct.',
    icon: 'Compass',
  },
  {
    id: 'privacy-minded',
    label: 'Writers Who Value Privacy',
    description: 'Your unfinished draft is sacred. Keep it in Inkwell’s local browser workspace while you shape the story.',
    icon: 'ShieldCheck',
  },
];

export const WORKBENCH_SNIPPET = `The lantern in the watchtower had gone out three hours before dawn. 

Kaelen pressed the heel of his palm against the rough pine railing, feeling the damp chill of the harbor mist seeping through his wool tunic. Below him, the tide was turning against the stone pilings with a low, rhythmic thudding that sounded too much like a retreating army.

"You're awake," a voice murmured from the trapdoor.

He did not turn. He knew the gait before the floorboards took her weight. "The messenger ship missed the tide, Maeve. The seal on the letter is broken."

Maeve set down the iron kettle, its steam smelling faintly of dried thyme and birch bark. "Then we don't have till Michaelmas. We have until noon."`;

export const BINDER_SCENES_MOCK: BinderScene[] = [
  {
    id: 'sc-1',
    act: 'Act I: The Salt Watch',
    chapter: 'Chapter 1',
    title: 'The Cold Hearth',
    pov: 'Kaelen',
    wordCount: 2430,
    status: 'Polished',
    synopsis: 'Kaelen discovers the shattered courier beacon on the southern rampart. First sign of treason in the garrison.',
  },
  {
    id: 'sc-2',
    act: 'Act I: The Salt Watch',
    chapter: 'Chapter 2',
    title: 'Maeve\'s Thyme Kettle',
    pov: 'Maeve',
    wordCount: 1890,
    status: 'Revised',
    synopsis: 'Maeve deciphers the wax cipher left behind. The seal belongs to the high adjudicator.',
  },
  {
    id: 'sc-3',
    act: 'Act I: The Salt Watch',
    chapter: 'Chapter 3',
    title: 'Tide at Midnight',
    pov: 'Kaelen',
    wordCount: 3120,
    status: 'Draft',
    synopsis: 'A stealth skiff crosses the harbor under blackened sail. Confrontation at the lower dock sluice.',
  },
];

export const LEDGER_CHARACTER_MOCK: CharacterLore = {
  name: 'Maeve of Oakhaven',
  role: 'Protagonist',
  status: 'Active (Ch. 1, 2, 4, 7)',
  mentions: 48,
  confidence: '94% mention match in Ch. 4',
  traits: ['Herbalist apprentice', 'Keeps iron kettle', 'Cipher-fluent', 'Left-handed'],
  bio: 'Former archivist of the Old Abbey. Holds the only surviving concordance of the High Ciphers. Driven by an unspoken oath to Kaelen\'s late sister.',
};

export const MARGINALIA_NOTES: MarginaliaNote[] = [
  {
    id: 'm1',
    text: '“Cut this adverb. The cold speaks for itself.”',
    author: 'Editor note · Ch. 1',
    rotation: '-3deg',
    top: '12%',
    left: '4%',
    type: 'critique',
  },
  {
    id: 'm2',
    text: '“Pacing here is electric. Keep the sensory anchor with the thyme kettle.”',
    author: 'Beta Reader · Ch. 2',
    rotation: '2.5deg',
    top: '38%',
    right: '5%',
    type: 'praise',
  },
  {
    id: 'm3',
    text: '“Recall the broken wax seal from the ramparts here!”',
    author: 'Self note · Revision 3',
    rotation: '-1.8deg',
    top: '64%',
    left: '6%',
    type: 'craft',
  },
  {
    id: 'm4',
    text: '“Show the tide turning before he speaks. Great atmosphere.”',
    author: 'Workshop · Scene 3',
    rotation: '3.2deg',
    top: '82%',
    right: '4%',
    type: 'praise',
  },
];

export const MARQUEE_QUOTES: QuoteItem[] = [
  {
    id: 'q1',
    quote: 'Build worlds. Wrench hearts. Raise eyebrows.',
    author: 'The Inkwell Ethos',
    context: 'Craft Philosophy',
  },
  {
    id: 'q2',
    quote: 'An editor that feels like heavy cream stock paper and a good fountain pen.',
    author: '—The Inkwell Desk',
    context: 'Craft Philosophy',
  },
  {
    id: 'q3',
    quote: 'A quiet browser desk, a focused morning, and 3,000 words before breakfast.',
    author: '—The Inkwell Desk',
    context: 'Craft Philosophy',
  },
  {
    id: 'q4',
    quote: 'The Binder gave me my first whole-novel view without cluttering my brain.',
    author: '—The Inkwell Desk',
    context: 'Craft Philosophy',
  },
  {
    id: 'q5',
    quote: 'Your manuscript stays in your local workspace, ready for the next revision.',
    author: 'The Inkwell Manifesto',
    context: 'Privacy Guarantee',
  },
];

export const ADDITIONAL_FEATURES: AdditionalFeature[] = [
  {
    id: 'sprint-timer',
    title: 'Writing Sprint Timer',
    eyebrow: 'MOMENTUM',
    description: '15, 25, 45, 60, and 90-minute timed sprints with gentle brass chime signals. No dopamine traps.',
    iconName: 'Timer',
    detail: 'Pomodoro & custom bursts',
  },
  {
    id: 'wpm-tracker',
    title: 'Session Count & Live WPM',
    eyebrow: 'CADENCE',
    description: 'Subtle live word counters, net session gains, and active typing velocity without flashing gauges.',
    iconName: 'Gauge',
    detail: 'Silent status bar',
  },
  {
    id: 'snapshots',
    title: 'Automatic Snapshots',
    eyebrow: 'SAFETY',
    description: 'Crash-safe local snapshots taken every 10 minutes and before every structural chapter reorder.',
    iconName: 'Camera',
    detail: 'Never lose a line',
  },
  {
    id: 'backup-restore',
    title: 'Single-File JSON Backup',
    eyebrow: 'OWNERSHIP',
    description: 'Export your entire project—prose, synopsis, corkboard, ledger—into one plain JSON or plain-text rescue bundle.',
    iconName: 'Backup',
    detail: '100% human-readable',
  },
  {
    id: 'scene-search',
    title: 'Full-Text Command Palette',
    eyebrow: 'NAVIGATION',
    description: 'Press Ctrl+K (⌘K) to jump across chapters, search character mentions, or trigger editor modes instantly.',
    iconName: 'Command',
    detail: 'Sub-millisecond index',
  },
  {
    id: 'structural-undo',
    title: 'Structural Undo / Redo',
    eyebrow: 'INTEGRITY',
    description: 'Accidentally moved an entire Act? Robust multi-tier history tracks both sentence edits and scene reorders.',
    iconName: 'History',
    detail: 'Deep stack history',
  },
  {
    id: 'manuscript-trash',
    title: 'Soft Trash & 30-Day Purge',
    eyebrow: 'SECURITY',
    description: 'Deleted scenes go to a local manuscript attic before permanent destruction. No accidental cutoffs.',
    iconName: 'Trash2',
    detail: 'Recover cut drafts',
  },
  {
    id: 'browser-workspace',
    title: 'Private Browser Workspace',
    eyebrow: 'RUNTIME',
    description: 'Open Inkwell in your browser and return to a quiet desk with drafts stored in your local workspace.',
    iconName: 'Shield',
    detail: 'Local-first drafting',
  },
];

export const PRO_FEAT_TEASERS: ProFeature[] = [
  {
    id: 'analysis-signals',
    title: 'Find patterns in your prose',
    eyebrow: 'PROSE SIGNALS',
    description: 'Analysis surfaces repeated phrasing, sentence rhythm, readability, and other mechanical signals so revision starts with evidence.',
    metricDemo: 'Example report · rhythm · repetition · readability',
    badge: 'Analysis report',
    details: [
      'Sentence and paragraph-level signals',
      'Highlights for recurring patterns',
      'A focused scope for the work in front of you',
    ],
  },
  {
    id: 'analysis-evidence',
    title: 'Understand each finding',
    eyebrow: 'EVIDENCE',
    description: 'See the passage, metric, and explanation together instead of guessing what a score means.',
    metricDemo: 'Evidence view · passage · metric · explanation',
    badge: 'Evidence drawer',
    details: [
      'Trace every signal back to the manuscript',
      'Keep measured and suggested feedback distinct',
      'Review a scene without losing its context',
    ],
  },
  {
    id: 'analysis-revision',
    title: 'Revise with intention',
    eyebrow: 'REVISION',
    description: 'Review suggested fixes, keep your voice in charge, and make the final call on every line.',
    metricDemo: 'Revision queue · highlight · quick fix',
    badge: 'Author-led revision',
    details: [
      'Queue findings for a deliberate pass',
      'Apply an optional quick fix when it helps',
      'Dismiss or restore feedback as your draft changes',
    ],
  },
];





/**
 * Pricing & purchase data.
 *
 * Paid access is currently coming soon. When purchases open, paid access will
 * be granted only after server verification on the user's account. Inkwell's
 * writing workspace remains local-first; cloud storage and provider sync are
 * not currently part of the product. Prices and future checkout URLs remain
 * loaded from env so each deployment can configure them without changing this
 * data shape.
 */

const readEnvString = (key: string, fallback: string): string => {
  try {
    // Vite injects import.meta.env at build time. The landing page is
    // static, so we resolve once at module load and gracefully fall back
    // to placeholders so the page never renders blank if a variable is
    // missing in a preview deploy.
    const value = (import.meta as any)?.env?.[key];
    return typeof value === 'string' && value.length > 0 ? value : fallback;
  } catch {
    return fallback;
  }
};

export const PRO_PRICE = {
  amount: readEnvString('INKWELL_PRO_PRICE', '$120'),
  currency: readEnvString('INKWELL_PRO_CURRENCY', 'USD'),
  label: readEnvString('INKWELL_PRO_PRICE_LABEL', 'One-time purchase · unlimited projects'),
  // Retain the future checkout URL setting, but keep its fallback on-page
  // while sales are disabled so the landing CTA never opens an active checkout.
  checkoutUrl: readEnvString(
    'INKWELL_PAYPAL_CHECKOUT_URL',
    '#pricing'
  ),
};

export const ANALYSIS_PRICE = {
  amount: readEnvString('INKWELL_ANALYSIS_PRICE', '$30'),
  currency: readEnvString('INKWELL_ANALYSIS_CURRENCY', 'USD'),
  label: readEnvString('INKWELL_ANALYSIS_PRICE_LABEL', 'Current major version · one-time'),
};

export const SUBSCRIPTION_PRICE = {
  amount: readEnvString('INKWELL_SUBSCRIPTION_PRICE', '$5/month'),
  currency: readEnvString('INKWELL_SUBSCRIPTION_CURRENCY', 'USD'),
  label: readEnvString('INKWELL_SUBSCRIPTION_PRICE_LABEL', 'Billed monthly'),
};

export interface PricingPlan {
  id: 'free' | 'pro' | 'analysis' | 'subscription';
  name: string;
  tagline: string;
  price: string;
  priceSubtext: string;
  ctaLabel: string;
  ctaHref: string;
  ctaNote: string;
  features: string[];
  highlighted?: boolean;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Start locally with the writing desk. Paid access requires an account and server verification.',
    price: '$0',
    priceSubtext: 'No card for local writing; paid access requires an account.',
    ctaLabel: 'Open the writing app',
    ctaHref: '/inkwell/app/',
    ctaNote: 'Drafts stay in your local browser workspace. Free includes one full Analysis run per day.',
    features: [
      'Local Binder, Workbench, and manuscripts',
      'One full free Analysis run per day',
      'Distraction-free writing, full keyboard shortcut set',
      'Export to Markdown, DOCX, and PDF whenever you want',
      'Local writing stays in your browser; paid access requires an account',
    ],
  },
  {
    id: 'pro',
    name: 'Inkwell Pro',
    tagline: 'Unlimited projects for a $120 one-time purchase.',
    price: PRO_PRICE.amount,
    priceSubtext: PRO_PRICE.label,
    ctaLabel: 'Coming soon',
    ctaHref: '#pricing',
    ctaNote: 'Pro purchases are currently unavailable. When sales open, paid access will require an account and server verification.',
    features: [
      'Everything in Free',
      'Unlimited projects',
      'The writing desk stays local-first',
      'Pro does not include Analysis; choose Analysis or Subscription for paid Analysis access',
    ],
    highlighted: true,
  },
  {
    id: 'analysis',
    name: 'Analysis',
    tagline: 'Current-major-version Analysis access for $30 one time.',
    price: ANALYSIS_PRICE.amount,
    priceSubtext: ANALYSIS_PRICE.label,
    ctaLabel: 'Coming soon',
    ctaHref: '#pricing',
    ctaNote: 'Analysis purchases are currently unavailable. When sales open, access will be server-verified on your account.',
    features: [
      'Everything in Free',
      'Analysis access beyond the daily free allowance',
      'Access to the current major Analysis version',
      'Author-led reports that support your own revision decisions',
    ],
  },
  {
    id: 'subscription',
    name: 'Subscription',
    tagline: 'Current and future Analysis releases for $5/month.',
    price: SUBSCRIPTION_PRICE.amount,
    priceSubtext: SUBSCRIPTION_PRICE.label,
    ctaLabel: 'Subscribe ($5/mo)',
    ctaHref: '/inkwell/app/',
    ctaNote: 'Subscribe via PayPal in the app. Access is server-verified on your account.',
    features: [
      'Everything in Free',
      'Analysis access beyond the daily free allowance',
      'Current and future Analysis releases while active',
      'Server-verified access tied to your account',
    ],
  },
];

export interface PricingFaq {
  question: string;
  answer: string;
}

export const PRICING_FAQ: PricingFaq[] = [
  {
    question: 'Do I need an account to use Inkwell?',
    answer:
      'You can start local writing without an account. Free includes one full Analysis run per day, and your drafts stay in your browser. An account and server verification are required for paid access.',
  },
  {
    question: 'What are the paid options?',
    answer:
      'Inkwell Pro is $120 as a one-time purchase for unlimited projects. Current-major-version Analysis is $30 one time. Subscription is $5/month for current and future Analysis releases while active. Paid sales are currently coming soon.',
  },
  {
    question: 'Does Pro include full Analysis?',
    answer:
      'No. Pro covers unlimited projects. Analysis is a separate $30 one-time offer for the current major version, or you can choose the $5/month Subscription for current and future Analysis releases while active.',
  },
  {
    question: 'When can I purchase these offers?',
    answer:
      'Sales are currently disabled, so the purchase buttons are marked Coming soon. We will publish the live checkout details when Pro, Analysis, and Subscription become available.',
  },
  {
    question: 'What happens to my drafts if I never sign in?',
    answer:
      'They stay exactly where they are — in your browser. You can keep using Free locally, including one full Analysis run per day, and export or import your work yourself. Inkwell does not currently provide cloud storage or Google Drive sync.',
  },
  {
    question: 'Can I sync Inkwell with Google Drive or another provider?',
    answer:
      'Not currently. Google Drive and other storage integrations are future capabilities we may add, but they are not shipped. Today the safe path is local browser storage plus explicit export and import; do not treat a future sync plan as available until its account, OAuth, conflict handling, and privacy controls ship.'
  },
  {
    question: 'Can I get a refund?',
    answer:
      'Purchases are not open yet. Once sales launch, we will publish clear refund terms alongside the checkout details.',
  },
];
