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
  'offline',
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
    description: 'Your unfinished draft is sacred. No corporate cloud training AI on your early chapters. Ever.',
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
    quote: 'Zero cloud latency, zero account prompts. Just me, my coffee, and 3,000 words before breakfast.',
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
    quote: 'Your manuscript lives on your SSD. Not in someone else\'s AI training pipeline.',
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
    iconName: 'HardDriveDownload',
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
    id: 'pwa-offline',
    title: 'Lightweight Desktop & PWA',
    eyebrow: 'RUNTIME',
    description: 'Under 20MB precache. Works completely on airplanes, cabins in the woods, or offline subway commutes.',
    iconName: 'WifiOff',
    detail: 'Zero network calls',
  },
];

export const PRO_FEAT_TEASERS: ProFeature[] = [
  {
    id: 'prose-analysis',
    title: 'Prose Analysis Engine',
    eyebrow: 'CRAFT METRICS',
    description: 'Deep mechanical analysis of your manuscript syntax: sentence variety graphs, readability grades (A–F), adverb density, and repeated crutch words.',
    metricDemo: 'Flesch 78.4 · Grade B+ · 2.1% Passive',
    badge: 'Prose Diagnostics',
    details: [
      'Letter grades A through F per scene',
      'One-click highlight of 400+ weak verbs & filter words',
      'Pacing rhythm visualizer (sentence length waves)',
      '100% computed on-device — no cloud analysis',
    ],
  },
  {
    id: 'tutor-layout',
    title: 'Tutor Pacing Layout',
    eyebrow: 'STRUCTURAL GRAPHS',
    description: 'Scene-by-scene tension arcs, act timing comparisons, and chapter summary sheets formatted for developmental editors and beta readers.',
    metricDemo: 'Act I Climax at 24.8% · 3 POVs Balanced',
    badge: 'Structure Analysis',
    details: [
      'Tension arc graphs mapped to Three-Act / Hero’s Journey',
      'POV distribution & screen-time balance',
      'Auto-generated manuscript synopsis matrix',
      'Direct export to developmental editor PDF notes',
    ],
  },
  {
    id: 'craft-layout',
    title: 'Author Fingerprint & Corpus',
    eyebrow: 'STYLE COMPARISON',
    description: 'Compare your vocabulary uniqueness, dialogue-to-narrative ratio, and descriptive cadence against a classic public-domain literary corpus.',
    metricDemo: '91% Lexical Richness · 62% Dialogue',
    badge: 'Stylometry Suite',
    details: [
      'Stylometric fingerprint vs Woolf, Austen, Hemingway',
      'Sensory balance detector (sight, sound, tactile, scent)',
      'Dialogue-to-exposition density heatmap',
      'Historical fiction vocabulary authenticity scanner',
    ],
  },
];


export const DOWNLOAD_ACTIONS = [
  {
    id: 'web-app',
    os: 'Inkwell Web App',
    variant: 'Free · v0.4.0 · Install as PWA',
    filename: 'https://getbacktoteaching.com/inkwell/app/',
    size: 'Runs in your browser',
    badge: 'Recommended',
    icon: 'Globe',
    href: 'https://getbacktoteaching.com/inkwell/app/',
    external: true,
  },
  {
    id: 'github',
    os: 'View Source on GitHub',
    variant: 'educationlessonplans/inkwell',
    filename: 'MIT Licensed',
    size: 'Open source',
    badge: 'For Developers',
    icon: 'Terminal',
    href: 'https://github.com/educationlessonplans/inkwell',
    external: true,
  },
];
