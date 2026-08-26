import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QuillNibIcon, BrassStarIcon, SealCheckIcon, AntiqueReadingLampIcon } from './CustomIcons';
import { Sparkles, Eye, Scissors, MessageSquare, ArrowRight } from 'lucide-react';

export const ManuscriptDiffViewer: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(52);
  const [activeLayer, setActiveLayer] = useState<'all' | 'dialogue' | 'pacing' | 'marginalia'>('all');
  const [isDragging, setIsDragging] = useState(false);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section
      id="manuscript-evolution"
      className="py-20 md:py-32 bg-[#FAF6F0] dark:bg-[#120e0b] relative overflow-hidden border-t border-[#C49232]/25 dark:border-[#d4a244]/20 transition-colors duration-300"
      aria-label="Interactive Manuscript Evolution"
    >
      {/* Background ambient texture glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C49232]/5 dark:bg-[#d4a244]/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C49232]/15 dark:bg-[#d4a244]/15 border border-[#C49232]/30 dark:border-[#d4a244]/30 text-[#B45309] dark:text-[#d4a244] text-xs font-sans-plex font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Evolution Engine</span>
          </div>

          <h2 className="font-display-cormorant text-3xl sm:text-5xl font-bold text-[#232020] dark:text-[#FAF6F0] leading-tight">
            See the craft between <br className="hidden sm:inline" />
            <span className="font-display-playfair italic text-[#8B261D] dark:text-[#d4a244]">
              First Ink & Final Print.
            </span>
          </h2>

          <p className="font-newsreader text-base sm:text-lg text-[#232020]/80 dark:text-[#FAF6F0]/80 mt-4 leading-relaxed">
            Drag the brass divider below to scrub through raw draft thoughts versus polished structural prose. 
            Inkwell never hides your lineage—it preserves every layer of your intuition.
          </p>

          {/* Interactive Layer Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setActiveLayer('all')}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-sans-plex font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                activeLayer === 'all'
                  ? 'bg-[#8B261D] text-[#FAF6F0] shadow-sm'
                  : 'bg-[#F3ECDD] dark:bg-[#1e1611] text-[#232020]/80 dark:text-[#FAF6F0]/80 border border-[#C49232]/30 dark:border-[#d4a244]/25 hover:border-[#8B261D]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Full Split Comparison</span>
            </button>

            <button
              onClick={() => setActiveLayer('dialogue')}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-sans-plex font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                activeLayer === 'dialogue'
                  ? 'bg-[#8B261D] text-[#FAF6F0] shadow-sm'
                  : 'bg-[#F3ECDD] dark:bg-[#1e1611] text-[#232020]/80 dark:text-[#FAF6F0]/80 border border-[#C49232]/30 dark:border-[#d4a244]/25 hover:border-[#8B261D]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Dialogue Focus</span>
            </button>

            <button
              onClick={() => setActiveLayer('pacing')}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-sans-plex font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                activeLayer === 'pacing'
                  ? 'bg-[#8B261D] text-[#FAF6F0] shadow-sm'
                  : 'bg-[#F3ECDD] dark:bg-[#1e1611] text-[#232020]/80 dark:text-[#FAF6F0]/80 border border-[#C49232]/30 dark:border-[#d4a244]/25 hover:border-[#8B261D]'
              }`}
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>Pacing & Tightening</span>
            </button>
          </div>
        </div>

        {/* Interactive Dual-Panel Diff Card */}
        <div className="relative rounded-2xl bg-[#F3ECDD] dark:bg-[#1c1510] border-2 border-[#C49232]/40 dark:border-[#d4a244]/35 shadow-2xl p-4 sm:p-7 overflow-hidden transition-all duration-300">
          
          {/* Top Bar / Desk Tools Header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#C49232]/25 dark:border-[#d4a244]/20 font-sans-plex text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B261D]" />
              <span className="font-semibold text-[#8B261D] dark:text-[#d4a244]">
                Act I · Scene 3 · The Salt Sluice
              </span>
              <span className="text-[#232020]/40 dark:text-[#FAF6F0]/40 hidden sm:inline">|</span>
              <span className="text-[#232020]/75 dark:text-[#FAF6F0]/75 hidden sm:inline">
                Comparison: Draft 1.0 vs Polish 3.2
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden md:flex items-center gap-1 text-[11px] text-[#26382d] dark:text-[#86efac] bg-[#26382d]/10 dark:bg-[#14532d]/40 px-2.5 py-0.5 rounded-full border border-[#26382d]/20 dark:border-[#22c55e]/30">
                <SealCheckIcon className="w-3 h-3" />
                <span>Zero prose discarded</span>
              </span>
              <span className="text-[11px] font-bold text-[#8B261D] dark:text-[#d4a244] bg-[#8B261D]/10 dark:bg-[#d4a244]/15 px-2 py-0.5 rounded">
                {sliderPosition < 50 ? 'Examining Draft Lineage' : 'Examining Polished Lineage'}
              </span>
            </div>
          </div>

          {/* Diff Grid with Visual Divider */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
            
            {/* Left Panel: Raw Draft State */}
            <div 
              className={`p-5 rounded-xl bg-[#FAF6F0]/90 dark:bg-[#150f0c] border border-[#C49232]/30 dark:border-[#d4a244]/25 transition-all duration-300 relative ${
                sliderPosition > 70 ? 'opacity-40 grayscale-[40%]' : 'opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-sans-plex uppercase font-bold tracking-wider text-[#8B261D] dark:text-[#f87171] bg-[#8B261D]/10 dark:bg-[#8B261D]/25 px-2 py-0.5 rounded">
                  1. Raw First Ink (Session 1)
                </span>
                <span className="text-[11px] font-sans-plex text-[#232020]/60 dark:text-[#FAF6F0]/60">
                  482 words · Unfiltered
                </span>
              </div>

              <div className="font-newsreader text-base text-[#232020]/90 dark:text-[#FAF6F0]/90 leading-relaxed space-y-4">
                <p>
                  The bells in the harbor <span className="line-through text-[#8B261D]/70 dark:text-[#f87171]/70 decoration-[#8B261D]">started loudly ringing</span> struck midnight, their iron tongues muted by the fog. Kaelen felt very anxious because the boat hadn't arrived yet.
                </p>
                <p className="bg-[#8B261D]/5 dark:bg-[#8B261D]/15 p-2 rounded border-l-2 border-[#8B261D]/40">
                  "You're awake," Maeve said softly as she came up the ladder with tea. <br />
                  "The boat missed the tide," he replied quickly. "The wax seal is totally broken."
                </p>
                <p className="text-xs font-sans-plex text-[#8B261D] dark:text-[#fca5a5] italic mt-2">
                  ✍️ First Draft Note: Need to make Maeve's scent more distinctive here. Add the herb pouch.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#C49232]/20 dark:border-[#d4a244]/20 flex items-center justify-between text-xs font-sans-plex text-[#232020]/70 dark:text-[#FAF6F0]/70">
                <span className="flex items-center gap-1">
                  <QuillNibIcon className="w-3 h-3 text-[#8B261D]" />
                  Raw emotional capture
                </span>
                <span className="text-[#8B261D] dark:text-[#f87171] font-semibold">12 Adverbs flagged</span>
              </div>
            </div>

            {/* Right Panel: Polished Literary Prose */}
            <div 
              className={`p-5 rounded-xl bg-[#FAF6F0] dark:bg-[#18110d] border-2 border-[#C49232]/50 dark:border-[#d4a244]/45 shadow-md transition-all duration-300 relative ${
                sliderPosition < 30 ? 'opacity-40 grayscale-[40%]' : 'opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-sans-plex uppercase font-bold tracking-wider text-[#26382d] dark:text-[#86efac] bg-[#26382d]/10 dark:bg-[#14532d]/40 px-2 py-0.5 rounded border border-[#26382d]/20 dark:border-[#22c55e]/30">
                  2. Inkwell Polish (Active Draft)
                </span>
                <span className="text-[11px] font-sans-plex text-[#26382d] dark:text-[#86efac] font-bold">
                  340 words · Tightened
                </span>
              </div>

              <div className="font-newsreader text-base text-[#232020] dark:text-[#FAF6F0] leading-relaxed space-y-4">
                <p>
                  The bells in the lower bailey struck midnight, their iron tongues muted by the thickening fog. Kaelen reached into the lining of his sea cloak, fingers brushing against the cold brass cylinder.
                </p>
                <p className="bg-[#26382d]/5 dark:bg-[#14532d]/25 p-2 rounded border-l-2 border-[#26382d] dark:border-[#86efac] font-medium">
                  "You're awake," a voice murmured from the trapdoor. <br />
                  He did not turn. He knew the gait before the floorboards took her weight. "The messenger ship missed the tide, Maeve. The seal on the letter is broken."
                </p>
                <p className="text-xs font-sans-plex text-[#B45309] dark:text-[#d4a244] italic mt-2 flex items-center gap-1">
                  <BrassStarIcon className="w-3 h-3 text-[#d4a244]" />
                  <span>Tightened · 29% fewer words</span>
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#C49232]/20 dark:border-[#d4a244]/20 flex items-center justify-between text-xs font-sans-plex text-[#232020]/75 dark:text-[#FAF6F0]/80">
                <span className="flex items-center gap-1 text-[#26382d] dark:text-[#86efac] font-medium">
                  <SealCheckIcon className="w-3 h-3" />
                  Rhythm & tension preserved
                </span>
                <span className="text-[#26382d] dark:text-[#86efac] font-bold">+29% Pacing Efficiency</span>
              </div>
            </div>

          </div>

          {/* Interactive Scrub Control Bar */}
          <div className="mt-6 pt-4 border-t border-[#C49232]/25 dark:border-[#d4a244]/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans-plex">
              <div className="flex items-center gap-2 text-[#232020]/80 dark:text-[#FAF6F0]/80">
                <AntiqueReadingLampIcon className="w-4 h-4 text-[#8B261D] dark:text-[#d4a244]" />
                <span className="font-semibold">Interactive Scrub Balance:</span>
                <span className="font-mono text-[#8B261D] dark:text-[#d4a244] font-bold">{sliderPosition}% Polish</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-1/2">
                <span className="text-[10px] uppercase font-bold text-[#8B261D] dark:text-[#fca5a5]">Draft</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-[#FAF6F0] dark:bg-[#120e0b] rounded-lg appearance-none cursor-pointer accent-[#8B261D] dark:accent-[#d4a244] border border-[#C49232]/40"
                  aria-label="Scrub draft comparison balance"
                />
                <span className="text-[10px] uppercase font-bold text-[#26382d] dark:text-[#86efac]">Polish</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
