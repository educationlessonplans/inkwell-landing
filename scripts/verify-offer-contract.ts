/** Self-contained verifier: Netlify has no adjacent application source checkout. */
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { ANALYSIS_PRICE, PRICING_PLANS, PRO_PRICE, SUBSCRIPTION_PRICE } from '../src/data/content.ts';

const read = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8');
const plans = new Map(PRICING_PLANS.map(plan => [plan.id, plan]));
const price = (text: string) => {
  const value = Number.parseFloat(text.replace(/[^0-9.]/g, ''));
  assert(Number.isFinite(value), `Invalid public price: ${text}`);
  return value;
};

// Explicit public product contract: updating any amount or availability
// requires a separate product decision, never an incidental app release.
const expectedOffers = [
  { plan: 'pro', amount: 120, capability: 'Unlimited projects', status: 'coming-soon' },
  { plan: 'analysis', amount: 30, capability: 'current major Analysis version', status: 'coming-soon' },
  { plan: 'subscription', amount: 5, capability: 'Current and future Analysis releases', status: 'active' },
] as const;
assert.equal(price(PRO_PRICE.amount), 120);
assert.equal(price(ANALYSIS_PRICE.amount), 30);
assert.equal(price(SUBSCRIPTION_PRICE.amount), 5);
for (const offer of expectedOffers) {
  const plan = plans.get(offer.plan);
  assert(plan, `Missing landing offer: ${offer.plan}`);
  assert.equal(price(plan.price), offer.amount, `${offer.plan} price drift`);
  assert.match([plan.tagline, plan.ctaNote, ...plan.features].join(' '), new RegExp(offer.capability, 'i'));
  if (offer.status === 'coming-soon') {
    assert.equal(plan.ctaLabel, 'Coming soon', `${offer.plan} must remain gated`);
    assert.equal(plan.ctaHref, '#pricing', `${offer.plan} must not enter checkout`);
    assert.match(plan.ctaNote, /currently unavailable/i);
  } else {
    assert.match(plan.ctaLabel, /subscribe/i, 'Active subscription must retain its CTA');
    assert.equal(plan.ctaHref, '/inkwell/app/', 'Subscription must enter the app');
    assert.match(plan.ctaNote, /server-verified/i, 'Subscription must be account verified');
  }
}
const config = read('../netlify.toml');
assert.match(config, /from\s*=\s*"\/inkwell\/app\/\*"/);
assert.match(config, /to\s*=\s*"\/inkwell\/app\/index\.html"/);
for (const path of ['/api/auth/session', '/api/entitlement', '/api/catalog', '/api/capabilities']) {
  assert(config.includes(`from = "${path}"`), `Missing production API proxy: ${path}`);
}
for (const path of ['/api/purchase-start', '/api/paypal/webhook']) {
  assert(!config.includes(`from = "${path}"`), `Disabled path unexpectedly configured: ${path}`);
}
const release = JSON.parse(read('../app-dist/release.json')) as {
  source_commit?: string;
  public_base?: string;
  index_sha256?: string;
};
assert.match(release.source_commit ?? '', /^[a-f0-9]{40}$/);
assert.equal(release.public_base, '/inkwell/app/');
const indexBytes = readFileSync(new URL('../app-dist/index.html', import.meta.url));
assert.equal(createHash('sha256').update(indexBytes).digest('hex'), release.index_sha256);
const appHtml = indexBytes.toString('utf8');
assert.match(appHtml, /\/inkwell\/app\/assets\//);
assert.match(appHtml, /\/inkwell\/app\/manifest\.webmanifest/);
const manifest = JSON.parse(read('../app-dist/manifest.webmanifest')) as { start_url?: string; scope?: string; name?: string };
assert.equal(manifest.start_url, '/inkwell/app/');
assert.equal(manifest.scope, '/inkwell/app/');
assert.equal(manifest.name, 'Inkwell');
assert(existsSync(new URL('../app-dist/sw.js', import.meta.url)));
const marketing = [read('../src/data/content.ts'), read('../src/components/PricingSection.tsx'), read('../src/components/FinalCta.tsx')].join('\n');
assert.match(marketing, /without an account|no account is needed for local writing/i);
assert.match(marketing, /server.verif/i);
assert.match(marketing, /Pro does not include Analysis/i);
console.log(`Offer, mounted-app and API verification passed (${expectedOffers.length} offers, app ${release.source_commit.slice(0, 12)}).`);
