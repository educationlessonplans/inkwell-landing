import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ShieldLockIcon } from './CustomIcons';
import { PRO_PRICE, ANALYSIS_PRICE, SUBSCRIPTION_PRICE } from '../data/content';

export const FinalCta: React.FC = () => {
  return (
    <section
      id="open-app"
      className="relative w-full py-24 px-6 bg-gradient-to-b from-[#FAF6F0] via-[#F2E8D5] to-[#E8DAB5] dark:from-[#1a1a1a] dark:via-[#1f1d1a] dark:to-[#25221d]"
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Eyebrow */}
        <div className="text-xs font-sans-plex font-bold tracking-[0.22em] text-[#B45309] dark:text-[#d4a244] uppercase mb-3">
          Free to start · Pro when you’re ready
        </div>

        {/* Headline */}
        <h2 className="font-display-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold text-[#232020] dark:text-[#FAF6F0] leading-tight mb-6">
          Your novel is waiting.
        </h2>

        {/* Subhead — free writing is local; paid plans are coming soon */}
        <p className="font-newsreader text-lg sm:text-xl text-[#232020]/85 dark:text-[#FAF6F0]/80 max-w-xl mx-auto leading-relaxed mb-8">
          Start writing locally in your browser; no account is needed for local writing. Pro ({PRO_PRICE.amount} one-time) is for unlimited projects; current-major-version Analysis is {ANALYSIS_PRICE.amount} one time; Subscription is {SUBSCRIPTION_PRICE.amount} for current and future Analysis releases. Paid sales are coming soon and require an account with server-verified access.
        </p>

        {/* Primary CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5">
          <a
            href="/inkwell/app/"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#232020] text-[#FAF6F0] dark:bg-[#FAF6F0] dark:text-[#232020] font-sans-plex font-semibold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <ArrowUpRight className="w-5 h-5" />
            <span>Open the writing app</span>
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-[#232020]/20 dark:border-[#FAF6F0]/20 text-[#232020] dark:text-[#FAF6F0] font-sans-plex font-semibold text-base hover:bg-[#232020]/5 dark:hover:bg-[#FAF6F0]/5 transition-all duration-200"
          >
            See plans
          </a>
        </div>

        {/* Trust microcopy — paid access is account and server verified when available */}
        <p className="text-sm font-sans-plex text-[#3a2a1f] dark:text-[#e7e0d6]/80 mt-6 max-w-md mx-auto leading-relaxed">
          Your drafts stay in your local browser workspace. Inkwell does not currently provide cloud storage or Google Drive sync. Pro is {PRO_PRICE.amount} one-time for unlimited projects, Analysis is {ANALYSIS_PRICE.amount} one time for the current major version, and Subscription is {SUBSCRIPTION_PRICE.amount}; all are coming soon.
        </p>

        {/* Browser support microcopy */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-sans-plex text-[#232020]/70 dark:text-[#FAF6F0]/70 mt-8">
          <span className="font-medium text-[#232020] dark:text-[#FAF6F0]">Runs in your browser</span>
          <span>·</span>
          <span className="font-medium text-[#232020] dark:text-[#FAF6F0]">No account for local writing</span>
          <span>·</span>
          <span className="font-medium text-[#232020] dark:text-[#FAF6F0]">Paid offers coming soon</span>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs font-sans-plex text-[#26382d] dark:text-[#86efac]">
          <ShieldLockIcon className="w-4 h-4 text-[#26382d] dark:text-[#86efac]" />
          <span>Private by design · Safe single-file backup</span>
        </div>

      </div>
    </section>
  );
};
