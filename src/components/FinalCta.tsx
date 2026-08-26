import React from 'react';
import { WaxSealLogo } from './WaxSealLogo';
import { Download } from 'lucide-react';
import { ShieldLockIcon } from './CustomIcons';

interface FinalCtaProps {
  onOpenDownload: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenDownload }) => {
  return (
    <section 
      id="download" 
      className="py-24 md:py-32 bg-gradient-to-b from-[#F3ECDD] to-[#FAF6F0] dark:from-[#17110d] dark:to-[#120e0b] relative overflow-hidden border-b border-[#C49232]/25 dark:border-[#d4a244]/20 transition-colors duration-300"
      aria-label="Download Call to Action"
    >
      {/* Subtle background ornamentation */}
      <div 
        className="w-[450px] h-[450px] rounded-full bg-[#8B261D]/5 dark:bg-[#d4a244]/10 blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Centered Wax Seal Crest */}
        <div className="flex justify-center mb-6">
          <div className="p-3 rounded-full bg-[#FAF6F0] dark:bg-[#1e1611] border-2 border-[#C49232]/50 dark:border-[#d4a244]/40 shadow-md">
            <WaxSealLogo size="lg" showText={false} />
          </div>
        </div>

        {/* Eyebrow */}
        <div className="text-xs font-sans-plex font-bold tracking-[0.22em] text-[#B45309] dark:text-[#d4a244] uppercase mb-3">
          Zero Barriers to Begin
        </div>

        {/* Headline */}
        <h2 className="font-display-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold text-[#232020] dark:text-[#FAF6F0] leading-tight mb-6">
          Your novel is waiting.
        </h2>

        {/* Subhead */}
        <p className="font-newsreader text-lg sm:text-xl text-[#232020]/85 dark:text-[#FAF6F0]/80 max-w-xl mx-auto leading-relaxed mb-8">
          No signups, no cloud sync timeouts, no corporate trackers. Set up your writing desk in thirty seconds and stay immersed in your story.
        </p>

        {/* Primary CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5">
          <button
            onClick={onOpenDownload}
            type="button"
            className="btn-wax-seal px-9 py-4 rounded-xl text-lg font-sans-plex font-medium tracking-wide flex items-center gap-3 cursor-pointer shadow-xl hover:scale-105 transition-all"
            id="final-download-cta"
          >
            <Download className="w-5 h-5" />
            <span>Download Inkwell 0.4.0 — Free</span>
          </button>
        </div>

        {/* Platform support microcopy */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-sans-plex text-[#232020]/70 dark:text-[#FAF6F0]/70">
          <span className="font-medium text-[#232020] dark:text-[#FAF6F0]">macOS (Silicon & Intel)</span>
          <span>·</span>
          <span className="font-medium text-[#232020] dark:text-[#FAF6F0]">Windows 10 / 11</span>
          <span>·</span>
          <span className="font-medium text-[#232020] dark:text-[#FAF6F0]">Linux AppImage & .deb</span>
          <span>·</span>
          <span className="font-bold text-[#8B261D] dark:text-[#d4a244]">Instant Offline PWA</span>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs font-sans-plex text-[#26382d] dark:text-[#86efac]">
          <ShieldLockIcon className="w-4 h-4 text-[#26382d] dark:text-[#86efac]" />
          <span>Local IndexedDB Database · Free during development · Safe single-file backup</span>
        </div>

      </div>
    </section>
  );
};
