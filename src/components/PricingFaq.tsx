import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { PRICING_FAQ } from '../data/content';

const easeOut = [0.16, 1, 0.3, 1] as const;

export function PricingFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative w-full px-6 py-20 md:py-24"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="mb-10 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--ink-accent,#a8743a)]">
            Purchase & accounts
          </p>
          <h2
            id="faq-heading"
            className="font-serif text-3xl font-light tracking-tight text-[var(--ink-text,#1a1614)] md:text-4xl"
          >
            The questions we hear most.
          </h2>
        </motion.div>

        <div className="divide-y divide-[var(--ink-border,#e6dccd)] rounded-2xl border border-[var(--ink-border,#e6dccd)] bg-[var(--ink-surface-1,#faf6ef)]">
          {PRICING_FAQ.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink-accent,#a8743a)]"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${idx}`}
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                >
                  <span className="font-serif text-lg text-[var(--ink-text,#1a1614)] md:text-xl">
                    {item.question}
                  </span>
                  <span
                    className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[var(--ink-border,#d8c8b0)] text-[var(--ink-text-muted,#5a4f48)]"
                    aria-hidden="true"
                  >
                    {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: easeOut }}
                      className="overflow-hidden"
                      role="region"
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-[var(--ink-text-muted,#5a4f48)] md:text-base">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
