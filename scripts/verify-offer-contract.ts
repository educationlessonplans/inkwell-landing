import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { CANONICAL_OFFER_CONTRACT } from '../../inkwell-remote/src/services/catalog.ts';
import {
  ANALYSIS_PRICE,
  PRICING_PLANS,
  PRO_PRICE,
  SUBSCRIPTION_PRICE,
} from '../src/data/content.ts';

const planById: Record<string, (typeof PRICING_PLANS)[number]> = Object.fromEntries(
  PRICING_PLANS.map((plan) => [plan.id, plan]),
);

const priceValue = (amount: string): number => {
  const value = Number.parseFloat(amount.replace(/[^0-9.]/g, ''));
  assert(Number.isFinite(value), `Invalid landing price: ${amount}`);
  return value;
};

const expectedLanding = {
  'inkwell-pro': {
    planId: 'pro',
    amount: priceValue(PRO_PRICE.amount),
    billing: 'one_time',
    capability: 'projects.unlimited',
    requiredText: 'Pro does not include Analysis',
  },
  'inkwell-sub': {
    planId: 'subscription',
    amount: priceValue(SUBSCRIPTION_PRICE.amount),
    billing: 'monthly',
    capability: 'analysis.all_future',
    requiredText: 'Current and future Analysis releases while active',
  },
  'inkwell-analysis': {
    planId: 'analysis',
    amount: priceValue(ANALYSIS_PRICE.amount),
    billing: 'one_time',
    capability: 'analysis.current',
    requiredText: 'current major Analysis version',
  },
} as const;

for (const offer of CANONICAL_OFFER_CONTRACT) {
  const expected = expectedLanding[offer.id];
  const plan = planById[expected.planId];

  assert(plan, `Missing landing plan for canonical offer ${offer.id}`);
  assert.equal(priceValue(plan.price), offer.price, `${offer.id} price drift`);
  assert.equal(expected.amount, offer.price, `${offer.id} price variable drift`);
  assert.equal(expected.billing, offer.billing, `${offer.id} billing drift`);
  assert.equal(
    offer.capabilities.some((capability) => capability === expected.capability),
    true,
    `${offer.id} capability drift`,
  );
  assert.match(`${plan.tagline} ${plan.priceSubtext} ${plan.ctaNote} ${plan.features.join(' ')}`, new RegExp(expected.requiredText, 'i'));
}
for (const paidPlanId of ['pro', 'analysis', 'subscription'] as const) {
  const paidPlan = planById[paidPlanId];
  assert.equal(paidPlan.ctaLabel, 'Coming soon', `${paidPlanId} CTA must remain gated`);
  assert.equal(paidPlan.ctaHref, '#pricing', `${paidPlanId} CTA must not link to checkout while sales are closed`);
  assert.match(paidPlan.ctaNote, /currently unavailable/i, `${paidPlanId} CTA must explain that sales are unavailable`);
}


assert.equal(priceValue(PRO_PRICE.amount), 120, 'Pro must remain $120');
assert.equal(priceValue(ANALYSIS_PRICE.amount), 30, 'Analysis must remain $30');
assert.equal(priceValue(SUBSCRIPTION_PRICE.amount), 5, 'Subscription must remain $5/month');
const netlifyConfig = readFileSync(new URL('../netlify.toml', import.meta.url), 'utf8');
assert.match(netlifyConfig, /Approved dedicated production Worker target for session and entitlement routes/i, 'Dedicated session/entitlement routes must remain explicitly attached');
assert.match(netlifyConfig, /Approved dedicated production Worker target for catalog and capability reads/i, 'Dedicated catalog/capability routes must remain explicitly attached');
for (const disabledPath of ['/api/inkwell-purchase-start', '/api/purchase-start', '/api/paypal/webhook']) {
  assert.doesNotMatch(netlifyConfig, new RegExp(`^\\s*from\\s*=\\s*\"${disabledPath}\"`, 'mi'), `Paid route must remain absent from Netlify config: ${disabledPath}`);
}

const landingPurchaseGuardSourceEntries = [
  {
    relativePath: '../src/components/PricingSection.tsx',
    requiredPatterns: [
      /href=\{plan\.ctaHref\}/,
      /\{plan\.ctaLabel\}/,
      /\{plan\.ctaNote\}/,
      /Paid sales are currently unavailable/i,
    ],
  },
  {
    relativePath: '../src/components/FinalCta.tsx',
    requiredPatterns: [/href="#pricing"[\s\S]*?See plans/i, /Paid sales are coming soon/i],
  },
  {
    relativePath: '../src/components/DynamicBottomBar.tsx',
    requiredPatterns: [/href="#pricing"[\s\S]*?See plans/i, /paid offers coming soon/i],
  },
  {
    relativePath: '../src/components/Navigation.tsx',
    requiredPatterns: [
      /href="#pricing"[\s\S]*?id="nav-link-pro"[\s\S]*?Plans · Pro/i,
      /href="#pricing"[\s\S]*?onClick=\{\(\) => setMobileMenuOpen\(false\)\}[\s\S]*?Plans coming soon[\s\S]*?Coming soon/i,
    ],
  },
].map((entry) => ({
  ...entry,
  source: readFileSync(new URL(entry.relativePath, import.meta.url), 'utf8'),
}));
const landingPurchaseGuardSources = landingPurchaseGuardSourceEntries.map((entry) => entry.source).join('\n');

for (const { relativePath, source, requiredPatterns } of landingPurchaseGuardSourceEntries) {
  for (const requiredPattern of requiredPatterns) {
    assert.match(source, requiredPattern, `Paid CTA safety text/target drifted in ${relativePath}`);
  }
}

const forbiddenPurchaseIntegrations = [
  /paypal|stripe|paddle|lemonsqueezy|braintree|square|adyen/i,
  /\/api\/[\w/-]*(?:buy|subscribe|billing|purchase|checkout|payment|paypal)[\w/-]*/i,
  /\b(?:start|begin|initiate|launch|redirect|create)\w*(?:purchase|checkout|payment|subscription)\w*/i,
  /\b\w*(?:purchase|checkout|payment|paypal)\w*\s*\(/i,
  /onClick\s*=\s*\{[^}]*?(?:purchase|checkout|payment|paypal|subscribe)/i,
];
for (const forbiddenPattern of forbiddenPurchaseIntegrations) {
  assert.doesNotMatch(landingPurchaseGuardSources, forbiddenPattern, 'Landing CTA sources must not initiate a payment/provider flow');
}

const forbiddenActiveSaleWording =
  /\b(?:buy|purchase|subscribe|pay|order|enroll)\b(?:\s+(?:now|today|here))?|\b(?:sales?|plans?)\s+(?:are\s+)?(?:open|live|available)|\b(?:now|currently)\s+available|\b(?:available|open)\s+for\s+(?:purchase|sale)|\b(?:unlock|get|activate)\s+(?:Inkwell\s+)?(?:Pro|Analysis|Subscription|access|plans?)\b/i;
assert.doesNotMatch(landingPurchaseGuardSources, forbiddenActiveSaleWording, 'Landing CTA sources must retain the paid-sales hold');
assert.match(landingPurchaseGuardSources, /Paid sales are currently unavailable|Paid offers coming soon|Plans coming soon/i, 'Landing must explain the paid-sales hold');
const appViteConfig = readFileSync(new URL('../../inkwell-remote/vite.config.ts', import.meta.url), 'utf8');
assert.match(appViteConfig, /description:\s*'Inkwell — a private, local-first writing studio for serious fiction writers/i, 'Canonical app manifest description drifted');
assert.match(appViteConfig, /theme_color:\s*'#8B261D'/i, 'Canonical app manifest theme color drifted');
const unifiedBuild = readFileSync(new URL('../build.sh', import.meta.url), 'utf8');
assert.equal(unifiedBuild.includes('rm -f "$SITE_ROOT/dist/inkwell/app/manifest.json"'), true, 'Unified build must remove stale legacy manifest output');
assert.equal(existsSync(new URL('../../inkwell-remote/public/manifest.json', import.meta.url)), false, 'Obsolete static app manifest must not be restored');

const marketingSources = [
  '../index.html',
  '../src/data/content.ts',
  '../src/components/DynamicBottomBar.tsx',
  '../src/components/FinalCta.tsx',
  '../src/components/ProTeaser.tsx',
].map((relativePath) => readFileSync(new URL(relativePath, import.meta.url), 'utf8')).join('\n');

assert.match(marketingSources, /local writing without an account|no account is needed for local writing/i, 'Landing must explain account-free local writing');
assert.match(marketingSources, /paid (?:access|sales).*account.*server/i, 'Landing must explain account and server verification for paid access');
assert.match(marketingSources, /Analysis is a separate paid capability, not included with Pro/i, 'Landing must distinguish Pro from paid Analysis');
for (const staleClaim of [/no signup/i, /no account required/i, /no subscriptions/i, /unlimited offline analyses/i]) {
  assert.doesNotMatch(marketingSources, staleClaim, `Stale landing claim remains: ${staleClaim}`);
}

console.log('Marketing account-boundary copy verified.');
console.log(`Offer contract verified: ${CANONICAL_OFFER_CONTRACT.length} canonical offers match landing data.`);
