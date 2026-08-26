export interface FeatureItem {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  bullets: string[];
  tag?: string;
}

export interface MarginaliaNote {
  id: string;
  text: string;
  author: string;
  rotation: string;
  top: string;
  left?: string;
  right?: string;
  type: 'critique' | 'craft' | 'praise';
}

export interface QuoteItem {
  id: string;
  quote: string;
  author: string;
  context: string;
  rating?: number;
}

export interface AdditionalFeature {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  iconName: string;
  detail?: string;
}

export interface ProFeature {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  metricDemo: string;
  badge: string;
  details: string[];
}

export interface CharacterLore {
  name: string;
  role: 'Protagonist' | 'Antagonist' | 'Foil' | 'Supporting';
  status: string;
  mentions: number;
  confidence: string;
  traits: string[];
  bio: string;
}

export interface BinderScene {
  id: string;
  act: string;
  chapter: string;
  title: string;
  pov: string;
  wordCount: number;
  status: 'Draft' | 'Revised' | 'Polished';
  synopsis: string;
}
