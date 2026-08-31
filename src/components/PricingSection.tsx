import { motion } from 'motion/react';
import { Check, ExternalLink, ShieldCheck } from 'lucide-react';
import { PRICING_PLANS } from '../data/content';

const easeOut = [0.16, 1, 0.3, 1] as const;

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative w-full px-6 py-24 md:py-32"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="mb-12 text-center md:mb-16"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--ink-accent,#a8743a)]">
            Pricing
          </p>
          <h2
            id="pricing-heading"
            className="font-serif text-4xl font-light tracking-tight text-[var(--ink-text,#1a1614)] md:text-5xl"
          >
            Four ways to use the desk.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-[var(--ink-text-muted,#5a4f48)] md:text-lg">
            Free is local and includes one full Analysis run per day. Pro is $120 one time for unlimited projects; Analysis is $30 one time for the current major version; Subscription is $5/month for current and future Analysis releases. Paid access is coming soon and will be account + server verified.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-4">
          {PRICING_PLANS.map((plan, idx) => (
            <motion.article
              key={plan.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: easeOut }}
              className={
                plan.highlighted
                  ? 'relative flex flex-col rounded-2xl border border-[var(--ink-accent,#a8743a)] bg-gradient-to-br from-[var(--ink-surface-2,#fbf7f1)] to-[var(--ink-surface,#f4eee5)] p-8 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.45)] md:p-10'
                  : 'relative flex flex-col rounded-2xl border border-[var(--ink-border,#e6dccd)] bg-[var(--ink-surface-1,#faf6ef)] p-8 md:p-10'
              }
              aria-labelledby={`${plan.id}-plan-name`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--ink-accent,#a8743a)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white shadow">
                  Most popular
                </span>
              )}

              <header className="mb-6">
                <h3
                  id={`${plan.id}-plan-name`}
                  className="font-serif text-2xl font-light text-[var(--ink-text,#1a1614)] md:text-3xl"
                >
                  {plan.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-text-muted,#5a4f48)]">
                  {plan.tagline}
                </p>
              </header>

              <div className="mb-6 border-b border-[var(--ink-border,#e6dccd)] pb-6">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-5xl font-light text-[var(--ink-text,#1a1614)] md:text-6xl">
                    {plan.price}
                  </span>
                </div>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--ink-text-muted,#5a4f48)]">
                  {plan.priceSubtext}
                </p>
              </div>

              <ul className="mb-8 space-y-3" role="list">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-sm text-[var(--ink-text,#1a1614)]">
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--ink-accent,#a8743a)]"
                      strokeWidth={2.5}
                    />
                    <span className="leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto space-y-3">
                <a
                  href={plan.ctaHref}
                  className={
                    plan.highlighted
                      ? 'inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--ink-accent,#a8743a)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-sm transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[var(--ink-accent,#a8743a)] focus:ring-offset-2 focus:ring-offset-[var(--ink-surface-2,#fbf7f1)]'
                      : 'inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--ink-text,#1a1614)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-text,#1a1614)] transition hover:bg-[var(--ink-text,#1a1614)] hover:text-[var(--ink-surface-1,#faf6ef)] focus:outline-none focus:ring-2 focus:ring-[var(--ink-text,#1a1614)] focus:ring-offset-2 focus:ring-offset-[var(--ink-surface-1,#faf6ef)]'
                  }
                  aria-label={
                    /^https?:\/\//i.test(plan.ctaHref)
                      ? `${plan.ctaLabel} (opens in a new tab)`
                      : undefined
                  }
                  target={/^https?:\/\//i.test(plan.ctaHref) ? '_blank' : undefined}
                  rel={/^https?:\/\//i.test(plan.ctaHref) ? 'noopener noreferrer' : undefined}
                >
                  {/^https?:\/\//i.test(plan.ctaHref) && <ExternalLink aria-hidden="true" className="h-4 w-4" />}
                  {plan.ctaLabel}
                </a>
                <p className="text-xs leading-relaxed text-[var(--ink-text-muted,#5a4f48)]">
                  {plan.ctaNote}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
          className="mt-10 flex flex-col items-center gap-2 text-center text-xs text-[var(--ink-text-muted,#5a4f48)] md:flex-row md:justify-center md:gap-3"
        >
          <ShieldCheck aria-hidden="true" className="h-4 w-4 text-[var(--ink-accent,#a8743a)]" />
          <span>
            Paid sales are currently unavailable. Checkout details will be published when Pro, Analysis, and Subscription open.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
