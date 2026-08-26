import React from 'react';
import { PRO_FEAT_TEASERS } from '../data/content';
import { Lock, AlertCircle } from 'lucide-react';
import { BrassStarIcon, SealCheckIcon, SpeedometerIcon } from './CustomIcons';

export const ProTeaser: React.FC = () => {
  return (
    <section 
      id="pro-teaser" 
      className="py-20 md:py-28 bg-[#F3ECDD]/60 dark:bg-[#16100c] relative border-b border-[#C49232]/30 dark:border-[#d4a244]/25 transition-colors duration-300"
      aria-label="Inkwell Pro Teaser"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brass Rule Divider Header */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-16 h-[1px] bg-[#C49232]/50 dark:bg-[#d4a244]/40" />
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6F0] dark:bg-[#1e1611] border border-[#C49232]/40 dark:border-[#d4a244]/35 text-[#B45309] dark:text-[#d4a244] text-xs font-sans-plex font-bold tracking-[0.2em] uppercase">
            <BrassStarIcon className="w-3.5 h-3.5 text-[#8B261D] dark:text-[#d4a244]" />
            Inkwell Pro · Coming Soon
          </span>
          <div className="w-16 h-[1px] bg-[#C49232]/50 dark:bg-[#d4a244]/40" />
        </div>

        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#232020] dark:text-[#FAF6F0] leading-tight mb-4">
            Craft tools for the finished manuscript.
          </h2>
          <p className="font-newsreader text-lg sm:text-xl text-[#232020]/80 dark:text-[#FAF6F0]/80 leading-relaxed">
            When drafting ends and the painstaking labor of structural revision begins, Inkwell Pro provides on-device developmental diagnostics.
          </p>
          
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#FAF6F0] dark:bg-[#1e1611] border border-[#C49232]/30 dark:border-[#d4a244]/25 text-xs font-sans-plex text-[#8B261D] dark:text-[#d4a244]">
            <AlertCircle className="w-4 h-4 text-[#8B261D] dark:text-[#d4a244] shrink-0" />
            <span><strong>Developmental Notice:</strong> All features are free during 0.4.0 development. Pro unlocks when ready—your drafts always remain 100% yours.</span>
          </div>
        </div>

        {/* 3 Teased Locked Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PRO_FEAT_TEASERS.map((pro) => (
            <div
              key={pro.id}
              className="relative rounded-2xl bg-[#FAF6F0]/90 dark:bg-[#1d1510] border border-[#C49232]/40 dark:border-[#d4a244]/30 p-6 sm:p-7 shadow-md flex flex-col justify-between overflow-hidden group select-none transition-colors duration-200"
              aria-label={`${pro.title} (Coming Soon - Locked Feature)`}
            >
              {/* Locked Watermark Badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#232020]/5 dark:bg-[#FAF6F0]/10 border border-[#232020]/15 dark:border-[#FAF6F0]/15 text-[#232020]/60 dark:text-[#FAF6F0]/70 text-xs font-sans-plex font-semibold">
                <Lock className="w-3 h-3 text-[#B45309] dark:text-[#d4a244]" />
                <span>LOCKED</span>
              </div>

              <div>
                {/* Eyebrow */}
                <div className="text-[11px] font-sans-plex font-bold tracking-[0.18em] uppercase text-[#B45309] dark:text-[#d4a244] mb-2">
                  {pro.eyebrow}
                </div>

                {/* Title */}
                <h3 className="font-display-cormorant text-2xl font-bold text-[#232020] dark:text-[#FAF6F0] mb-3">
                  {pro.title}
                </h3>

                {/* Description */}
                <p className="font-newsreader text-sm sm:text-[15px] text-[#232020]/85 dark:text-[#FAF6F0]/85 leading-relaxed mb-5">
                  {pro.description}
                </p>

                {/* Metric Preview Pill */}
                <div className="p-2.5 rounded-lg bg-[#F3ECDD] dark:bg-[#251b14] border border-[#C49232]/30 dark:border-[#d4a244]/25 font-sans-plex text-xs font-semibold text-[#8B261D] dark:text-[#d4a244] mb-5 flex items-center gap-2">
                  <SpeedometerIcon className="w-4 h-4 text-[#8B261D] dark:text-[#d4a244] shrink-0" />
                  <span>{pro.metricDemo}</span>
                </div>

                {/* Bullet list */}
                <ul className="space-y-2 font-sans-plex text-xs text-[#232020]/85 dark:text-[#FAF6F0]/80">
                  {pro.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <SealCheckIcon className="w-3.5 h-3.5 text-[#B45309] dark:text-[#d4a244] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer Badge */}
              <div className="mt-6 pt-4 border-t border-[#C49232]/20 dark:border-[#d4a244]/15 flex items-center justify-between text-xs font-sans-plex text-[#232020]/75 dark:text-[#FAF6F0]/75">
                <span>{pro.badge}</span>
                <span className="italic text-[#8B261D] dark:text-[#d4a244] font-medium">Coming in v1.0</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
