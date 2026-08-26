import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HERO_WORD_SWAPS, WORKBENCH_SNIPPET } from '../data/content';
import { Download, Sparkles, Feather, Command, Compass, Volume2, Shield, Clock, BookOpen } from 'lucide-react';
import { QuillNibIcon, SealCheckIcon, AntiqueReadingLampIcon, BrassStarIcon } from './CustomIcons';

interface HeroProps {
  onOpenDownload: () => void;
  onOpenShortcuts: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDownload, onOpenShortcuts }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [typedContent, setTypedContent] = useState(WORKBENCH_SNIPPET);
  const [activeMode, setActiveMode] = useState<'zen' | 'focus' | 'distill'>('zen');
  const [liveWpm, setLiveWpm] = useState(68);
  const [lastKeystrokeTime, setLastKeystrokeTime] = useState<number>(Date.now());
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });

  // Rotating hero subtitle words
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % HERO_WORD_SWAPS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  // Compute live word count & character count
  const wordCount = typedContent.trim() ? typedContent.trim().split(/\s+/).length : 0;
  const charCount = typedContent.length;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTypedContent(e.target.value);
    const now = Date.now();
    const diff = now - lastKeystrokeTime;
    if (diff > 0 && diff < 3000) {
      setLiveWpm(Math.min(130, Math.max(45, Math.round(60000 / (diff * 4)))));
    }
    setLastKeystrokeTime(now);
  };

  // 3D Card Tilt on pointer movement (Toyfight style)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCardTilt({ x: x * 8, y: -y * 8 });
  };

  const handleMouseLeave = () => {
    setCardTilt({ x: 0, y: 0 });
  };

  return (
    <section 
      id="hero-section"
      className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-[#FAF6F0] dark:bg-[#120e0b] transition-colors duration-300"
      aria-label="Hero Section"
    >
      {/* Ambient background gradients and radial mesh */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#8B261D]/5 dark:from-[#d4a244]/10 via-[#C49232]/5 dark:via-[#1e1611] to-transparent blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Floating background decorative marginalia badge (hidden on mobile) */}
      <motion.div
        initial={{ opacity: 0, x: -30, rotate: -6 }}
        animate={{ opacity: 1, x: 0, rotate: -4 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-36 left-4 lg:left-12 hidden xl:flex items-center gap-2 bg-[#F3ECDD]/90 dark:bg-[#1c1510]/90 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-[#C49232]/35 dark:border-[#d4a244]/30 shadow-lg text-xs font-sans-plex pointer-events-none"
      >
        <QuillNibIcon className="w-4 h-4 text-[#8B261D] dark:text-[#d4a244]" />
        <span className="font-medium text-[#232020] dark:text-[#FAF6F0]">Act I: Chapter 1 Outline Loaded</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30, rotate: 6 }}
        animate={{ opacity: 1, x: 0, rotate: 3 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute top-44 right-4 lg:right-12 hidden xl:flex items-center gap-2 bg-[#F3ECDD]/90 dark:bg-[#1c1510]/90 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-[#C49232]/35 dark:border-[#d4a244]/30 shadow-lg text-xs font-sans-plex pointer-events-none"
      >
        <SealCheckIcon className="w-4 h-4 text-[#26382d] dark:text-[#86efac]" />
        <span className="font-medium text-[#26382d] dark:text-[#86efac]">0 Cloud Sync · 100% Offline IndexedDB</span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Hero Grid: Left Content, Right Interactive Desk */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & Intent (5 cols) */}
          <div className="lg:col-span-5 text-left space-y-6">
            
            {/* Top Eyebrow Chip */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C49232]/15 dark:bg-[#d4a244]/15 border border-[#C49232]/30 dark:border-[#d4a244]/30 text-[#B45309] dark:text-[#d4a244] text-xs font-sans-plex font-medium tracking-wider uppercase"
            >
              <AntiqueReadingLampIcon className="w-3.5 h-3.5 text-[#B45309] dark:text-[#d4a244]" />
              <span>Offline Novel Studio</span>
              <span className="text-[#8B261D] dark:text-[#d4a244] font-bold">v0.4.0</span>
            </motion.div>

            {/* Kinetic Serif Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display-cormorant text-4xl sm:text-5xl lg:text-[54px] font-bold leading-[1.08] tracking-tight text-[#232020] dark:text-[#FAF6F0]"
            >
              Write your novel, <br />
              <span className="font-display-playfair italic text-[#8B261D] dark:text-[#d4a244] relative inline-block min-w-[220px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="inline-block"
                  >
                    *{HERO_WORD_SWAPS[wordIndex]}*.
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            {/* Editorial Body Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-newsreader text-lg sm:text-xl text-[#232020]/85 dark:text-[#FAF6F0]/85 leading-relaxed"
            >
              An offline, privacy-first studio crafted for serious novelists. Corkboard plotting, character ledgers, and typewriter focus—living entirely on your computer.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <button
                onClick={onOpenDownload}
                type="button"
                className="btn-wax-seal px-6 py-3.5 rounded-xl text-base font-sans-plex font-medium tracking-wide flex items-center justify-center gap-2.5 shadow-lg cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 transition-transform"
                id="hero-download-btn"
              >
                <Download className="w-5 h-5" />
                <span>Download Inkwell Free</span>
              </button>

              <button
                onClick={onOpenShortcuts}
                type="button"
                className="px-4 py-3 rounded-xl border border-[#C49232]/40 dark:border-[#d4a244]/35 bg-[#F3ECDD]/60 dark:bg-[#1c1510] hover:bg-[#F3ECDD] dark:hover:bg-[#281e17] text-[#232020] dark:text-[#FAF6F0] text-sm font-sans-plex font-medium transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                id="hero-shortcuts-btn"
              >
                <Command className="w-4 h-4 text-[#8B261D] dark:text-[#d4a244]" />
                <span>Quick Tour (⌘K)</span>
              </button>
            </motion.div>

            {/* Key Differentiator Badges */}
            <div className="pt-4 border-t border-[#C49232]/20 dark:border-[#d4a244]/20 grid grid-cols-3 gap-2">
              <div className="p-2.5 rounded-lg bg-[#F3ECDD]/60 dark:bg-[#1a130e] border border-[#C49232]/25 dark:border-[#d4a244]/25 text-center sm:text-left">
                <div className="text-xs font-sans-plex font-bold uppercase text-[#8B261D] dark:text-[#d4a244] tracking-wider">IndexedDB</div>
                <div className="text-[11px] font-newsreader text-[#232020]/85 dark:text-[#FAF6F0]/80">100% Local storage</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F3ECDD]/60 dark:bg-[#1a130e] border border-[#C49232]/25 dark:border-[#d4a244]/25 text-center sm:text-left">
                <div className="text-xs font-sans-plex font-bold uppercase text-[#8B261D] dark:text-[#d4a244] tracking-wider">No Accounts</div>
                <div className="text-[11px] font-newsreader text-[#232020]/85 dark:text-[#FAF6F0]/80">No login or tracking</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F3ECDD]/60 dark:bg-[#1a130e] border border-[#C49232]/25 dark:border-[#d4a244]/25 text-center sm:text-left">
                <div className="text-xs font-sans-plex font-bold uppercase text-[#8B261D] dark:text-[#d4a244] tracking-wider">Pure Craft</div>
                <div className="text-[11px] font-newsreader text-[#232020]/85 dark:text-[#FAF6F0]/80">No AI writing sludge</div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Workbench Showcase (7 cols) */}
          <div 
            className="lg:col-span-7 perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div 
              style={{
                transform: `rotateY(${cardTilt.x}deg) rotateX(${cardTilt.y}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="rounded-2xl bg-[#F3ECDD] dark:bg-[#1c1510] border-2 border-[#C49232]/40 dark:border-[#d4a244]/35 shadow-2xl p-4 sm:p-6 text-left relative overflow-hidden transition-all duration-300"
            >
              
              {/* Studio Window Chrome Top Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#C49232]/20 dark:border-[#d4a244]/20">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#8B261D]/75 border border-[#8B261D]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#C49232]/75 border border-[#C49232]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#26382d]/60 border border-[#26382d]" />
                  <span className="ml-2 text-[11px] font-sans-plex font-medium text-[#232020]/75 dark:text-[#FAF6F0]/80 hidden sm:inline">
                    Inkwell Workbench — Act I: Chapter 1
                  </span>
                </div>

                {/* Mode Selector Pill Buttons */}
                <div className="flex items-center gap-1 bg-[#FAF6F0] dark:bg-[#150f0c] p-1 rounded-lg border border-[#C49232]/30 dark:border-[#d4a244]/25 text-xs font-sans-plex">
                  <button
                    onClick={() => setActiveMode('zen')}
                    type="button"
                    className={`px-2 py-0.5 rounded transition-colors ${
                      activeMode === 'zen'
                        ? 'bg-[#8B261D] text-[#FAF6F0]'
                        : 'text-[#232020]/80 dark:text-[#FAF6F0]/80 hover:text-[#232020] dark:hover:text-[#FAF6F0]'
                    }`}
                  >
                    Zen
                  </button>
                  <button
                    onClick={() => setActiveMode('focus')}
                    type="button"
                    className={`px-2 py-0.5 rounded transition-colors ${
                      activeMode === 'focus'
                        ? 'bg-[#8B261D] text-[#FAF6F0]'
                        : 'text-[#232020]/80 dark:text-[#FAF6F0]/80 hover:text-[#232020] dark:hover:text-[#FAF6F0]'
                    }`}
                  >
                    Focus
                  </button>
                  <button
                    onClick={() => setActiveMode('distill')}
                    type="button"
                    className={`px-2 py-0.5 rounded transition-colors ${
                      activeMode === 'distill'
                        ? 'bg-[#8B261D] text-[#FAF6F0]'
                        : 'text-[#232020]/80 dark:text-[#FAF6F0]/80 hover:text-[#232020] dark:hover:text-[#FAF6F0]'
                    }`}
                  >
                    Distill
                  </button>
                </div>
              </div>

              {/* Manuscript Document Header */}
              <div className="bg-[#FAF6F0] dark:bg-[#16100c] rounded-xl p-4 sm:p-6 border border-[#C49232]/30 dark:border-[#d4a244]/25 shadow-inner relative">
                
                <div className="flex items-center justify-between mb-4 border-b border-[#C49232]/15 dark:border-[#d4a244]/15 pb-2">
                  <div className="flex items-center gap-2 font-display-cormorant text-base font-semibold text-[#8B261D] dark:text-[#d4a244]">
                    <span>Chapter One: The Cold Hearth</span>
                  </div>
                  <div className="flex items-center gap-3 font-sans-plex text-[11px] text-[#232020]/75 dark:text-[#FAF6F0]/80">
                    <span className="flex items-center gap-1 text-[#B45309] dark:text-[#d4a244]">
                      <Clock className="w-3 h-3" />
                      Typewriter Scroll Active
                    </span>
                  </div>
                </div>

                {/* Live Interactive Editable Prose Area */}
                <div className="relative">
                  <textarea
                    value={typedContent}
                    onChange={handleTextChange}
                    rows={7}
                    className="w-full bg-transparent font-newsreader text-base sm:text-lg text-[#232020] dark:text-[#FAF6F0] leading-relaxed resize-none focus:outline-none focus:ring-0 border-0 p-0 selection:bg-[#8B261D]/20 dark:selection:bg-[#d4a244]/30"
                    placeholder="Type your manuscript thoughts here..."
                    aria-label="Interactive Manuscript Editor"
                  />

                  {/* Gentle interactive typing hint overlay */}
                  <div className="absolute bottom-1 right-2 text-[10px] font-sans-plex text-[#B45309] dark:text-[#d4a244] bg-[#FAF6F0]/95 dark:bg-[#1e1611]/95 px-2 py-0.5 rounded border border-[#C49232]/30 dark:border-[#d4a244]/30 pointer-events-none flex items-center gap-1 shadow-xs">
                    <QuillNibIcon className="w-3 h-3 text-[#B45309] dark:text-[#d4a244]" />
                    <span>Try typing in this live desk</span>
                  </div>
                </div>

                {/* Live Status Pill & Word Counter */}
                <div className="flex items-center justify-between pt-3 mt-2 border-t border-[#C49232]/15 dark:border-[#d4a244]/15 font-sans-plex text-xs text-[#232020]/75 dark:text-[#FAF6F0]/80">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-[#8B261D] dark:text-[#d4a244] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8B261D] dark:bg-[#d4a244]" />
                      <span>{wordCount} Words</span>
                    </span>
                    <span className="hidden sm:inline text-[#232020]/50 dark:text-[#FAF6F0]/50">·</span>
                    <span className="hidden sm:inline text-[#232020]/80 dark:text-[#FAF6F0]/80">
                      Live Pace: <strong>{liveWpm} WPM</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#26382d] dark:text-[#86efac] font-medium bg-[#26382d]/10 dark:bg-[#14532d]/40 px-2.5 py-0.5 rounded-full border border-[#26382d]/25 dark:border-[#22c55e]/30 flex items-center gap-1">
                      <SealCheckIcon className="w-3 h-3" />
                      <span>Auto-saved to Local IndexedDB</span>
                    </span>
                  </div>
                </div>

              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
