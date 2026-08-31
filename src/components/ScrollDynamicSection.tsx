import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { MARGINALIA_NOTES, MARQUEE_QUOTES } from '../data/content';
import { Quote, Sparkles, Layers, BookOpen, Network, Feather, CheckCircle, ArrowRight } from 'lucide-react';
import { QuillNibIcon, SealCheckIcon, BookCoverEmblem, BrassStarIcon, AntiqueReadingLampIcon } from './CustomIcons';

export const ScrollDynamicSection: React.FC = () => {
  const [statementWordIndex, setStatementWordIndex] = useState(0);
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const statementWords = ['scenes', 'characters', 'choices', 'revisions', 'human truth'];

  const stages = [
    {
      id: 'typewriter',
      title: '01. Raw Ink Drafting',
      subtitle: 'Typewriter Flow & Zen Focus',
      description: 'Zero distractions. Your sentences stay in your browser workspace while you write, without prompt fatigue.',
      badge: 'Flow State',
      icon: Feather,
    },
    {
      id: 'binder',
      title: '02. Structural Binder',
      subtitle: '3D Corkboard & Scene Topology',
      description: 'Reorganize chapters and scenes with drag-to-reorder and inline synopses.',
      badge: 'Novel Architecture',
      icon: Layers,
    },
    {
      id: 'ledger',
      title: '03. World Ledger',
      subtitle: 'Living Character Constellations',
      description: 'Every mention of a character, location, or lore relic is scanned and indexed with pinpoint confidence.',
      badge: 'Lore Concordance',
      icon: Network,
    },
    {
      id: 'hardcover',
      title: '04. Bound Novel',
      subtitle: 'Production-Ready Typesetting',
      description: 'Export pristine JSON archive — yours to keep, migrate, or print anywhere.',
      badge: 'Publishing Grade',
      icon: BookOpen,
    },
  ];

  // Mid-page word swap timer
  useEffect(() => {
    const timer = setInterval(() => {
      setStatementWordIndex((prev) => (prev + 1) % statementWords.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Auto-cycle stages gently if not interacted with
  useEffect(() => {
    const stageTimer = setInterval(() => {
      setActiveStageIndex((prev) => (prev + 1) % stages.length);
    }, 6000);
    return () => clearInterval(stageTimer);
  }, [stages.length]);

  return (
    <section 
      id="craft-in-motion"
      ref={containerRef}
      className="py-24 md:py-36 bg-[#FAF6F0] dark:bg-[#120e0b] relative overflow-hidden border-b border-[#C49232]/25 dark:border-[#d4a244]/20 transition-colors duration-300"
      aria-label="The Literary Craft in Motion"
    >
      {/* Decorative Parallax Marginalia Notes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {MARGINALIA_NOTES.map((note, i) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            className="parallax-item absolute hidden xl:flex flex-col bg-[#F3ECDD]/90 dark:bg-[#1e1611]/95 backdrop-blur-xs p-3.5 rounded-lg border border-[#C49232]/40 dark:border-[#d4a244]/30 shadow-md max-w-[210px] text-left transition-transform duration-700 ease-out hover:scale-105"
            style={{
              top: note.top,
              left: note.left,
              right: note.right,
              transform: `rotate(${note.rotation})`,
            }}
          >
            <p className="font-handwriting text-base text-[#8B261D] dark:text-[#d4a244] leading-snug font-bold">
              {note.text}
            </p>
            <span className="font-sans-plex text-[10px] text-[#B45309] dark:text-[#FAF6F0]/70 uppercase tracking-wider mt-1 font-medium">
              — {note.author}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Ink Spread Radial Glow */}
        <div 
          className="w-[300px] h-[300px] sm:w-[550px] sm:h-[550px] rounded-full bg-[#8B261D]/5 dark:bg-[#d4a244]/10 blur-3xl absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none"
          aria-hidden="true"
        />

        {/* 1. Large Kinetic Word-Swap Statement */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C49232]/15 dark:bg-[#d4a244]/15 border border-[#C49232]/30 dark:border-[#d4a244]/30 text-xs font-sans-plex font-semibold tracking-[0.22em] text-[#B45309] dark:text-[#d4a244] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dynamic Novel Metamorphosis</span>
          </div>

          <h2 className="font-display-cormorant text-3xl sm:text-5xl lg:text-6xl font-bold text-[#232020] dark:text-[#FAF6F0] leading-tight">
            Stories are built from <br className="hidden sm:inline" />
            <span className="inline-block relative min-w-[200px] sm:min-w-[320px] text-[#8B261D] dark:text-[#d4a244] font-display-playfair italic underline decoration-[#C49232]/50 dark:decoration-[#d4a244]/40 underline-offset-8">
              <AnimatePresence mode="wait">
                <motion.span
                  key={statementWordIndex}
                  initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="inline-block"
                >
                  *{statementWords[statementWordIndex]}*
                </motion.span>
              </AnimatePresence>
            </span>
          </h2>
          
          <p className="font-newsreader text-lg sm:text-xl text-[#232020]/80 dark:text-[#FAF6F0]/80 mt-6 max-w-xl mx-auto leading-relaxed">
            From the raw flicker of inspiration to a 90,000-word leatherbound volume, witness how Inkwell transforms your manuscript into a masterwork.
          </p>
        </motion.div>

        {/* 2. Interactive Scroll & Stage Matrix (Ellipsus / ToyFight style) */}
        <div className="mb-20">
          
          {/* Stage Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {stages.map((stg, idx) => {
              const Icon = stg.icon;
              const isActive = activeStageIndex === idx;
              return (
                <button
                  key={stg.id}
                  onClick={() => setActiveStageIndex(idx)}
                  type="button"
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-sans-plex font-medium transition-all flex items-center gap-2 cursor-pointer relative ${
                    isActive
                      ? 'bg-[#8B261D] text-[#FAF6F0] shadow-lg scale-105 ring-2 ring-[#C49232]/50 dark:ring-[#d4a244]/50'
                      : 'bg-[#F3ECDD] dark:bg-[#1e1611] text-[#232020]/80 dark:text-[#FAF6F0]/80 border border-[#C49232]/30 dark:border-[#d4a244]/25 hover:border-[#8B261D] hover:scale-102'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#FAF6F0]' : 'text-[#8B261D] dark:text-[#d4a244]'}`} />
                  <span>{stg.title}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Dynamic 3D Stage Showcase */}
          <div className="max-w-4xl mx-auto rounded-2xl bg-[#F3ECDD] dark:bg-[#1c1510] border-2 border-[#C49232]/40 dark:border-[#d4a244]/35 shadow-2xl p-6 sm:p-10 relative overflow-hidden transition-all duration-300">
            
            {/* Top Stage Info Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-[#C49232]/25 dark:border-[#d4a244]/20 text-left">
              <div>
                <span className="text-[11px] font-sans-plex uppercase font-bold tracking-widest text-[#B45309] dark:text-[#d4a244] bg-[#C49232]/15 dark:bg-[#d4a244]/15 px-2 py-0.5 rounded">
                  {stages[activeStageIndex].badge}
                </span>
                <h3 className="font-display-cormorant text-2xl sm:text-3xl font-bold text-[#232020] dark:text-[#FAF6F0] mt-1">
                  {stages[activeStageIndex].subtitle}
                </h3>
              </div>
              <p className="text-xs sm:text-sm font-newsreader text-[#232020]/80 dark:text-[#FAF6F0]/80 max-w-sm">
                {stages[activeStageIndex].description}
              </p>
            </div>

            {/* Dynamic Interactive Stage Renderers */}
            <div className="min-h-[340px] flex items-center justify-center relative">
              <AnimatePresence mode="wait">
                
                {/* Stage 1: Raw Typewriter Drafting */}
                {activeStageIndex === 0 && (
                  <motion.div
                    key="stage-0"
                    initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    exit={{ opacity: 0, scale: 0.95, rotateX: -10 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-2xl bg-[#FAF6F0] dark:bg-[#16100c] rounded-xl border border-[#C49232]/40 dark:border-[#d4a244]/30 shadow-xl p-6 sm:p-8 text-left relative"
                  >
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#C49232]/20 dark:border-[#d4a244]/20 text-xs font-sans-plex">
                      <span className="flex items-center gap-1.5 text-[#8B261D] dark:text-[#d4a244] font-semibold">
                        <QuillNibIcon className="w-4 h-4" />
                        Focus Mode · Zen Typewriter
                      </span>
                      <span className="text-[#26382d] dark:text-[#86efac] font-mono font-medium">
                        1,420 words (Session Net)
                      </span>
                    </div>

                    <div className="font-newsreader text-base sm:text-lg text-[#232020] dark:text-[#FAF6F0] leading-relaxed space-y-3">
                      <p className="opacity-40">
                        The fog had swallowed the salt towers three hours before the evening bells.
                      </p>
                      <p className="font-medium bg-[#8B261D]/5 dark:bg-[#8B261D]/20 p-3 rounded-lg border border-[#8B261D]/20 dark:border-[#d4a244]/35">
                        Kaelen drew the bolt back with a sharp metallic clatter. The wax seal was cold in his palm, stamped with the mark of the salt chancellor.
                        <span className="inline-block w-2 h-5 bg-[#8B261D] dark:bg-[#d4a244] ml-1 animate-pulse" />
                      </p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-[#C49232]/20 dark:border-[#d4a244]/20 flex items-center justify-between text-xs font-sans-plex text-[#232020]/70 dark:text-[#FAF6F0]/70">
                      <span>Cadence: <strong>72 WPM</strong></span>
                      <span className="text-[#26382d] dark:text-[#86efac] flex items-center gap-1">
                        <SealCheckIcon className="w-3.5 h-3.5" />
                        Saved to Local IndexedDB
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Stage 2: Structural Binder */}
                {activeStageIndex === 1 && (
                  <motion.div
                    key="stage-1"
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4"
                  >
                    {[
                      { act: 'Act I', title: 'The Cold Hearth', pov: 'Kaelen', words: '2,430w', status: 'Polished', badgeColor: 'bg-[#26382d]/15 text-[#26382d] dark:bg-[#14532d]/40 dark:text-[#86efac]' },
                      { act: 'Act I', title: 'Maeve\'s Kettle', pov: 'Maeve', words: '1,890w', status: 'Revised', badgeColor: 'bg-[#B45309]/15 text-[#B45309] dark:bg-[#78350f]/40 dark:text-[#fcd34d]' },
                      { act: 'Act II', title: 'Tide at Midnight', pov: 'Kaelen', words: '3,120w', status: 'Drafting', badgeColor: 'bg-[#8B261D]/15 text-[#8B261D] dark:bg-[#7f1d1d]/40 dark:text-[#fca5a5]' },
                    ].map((card, i) => (
                      <div
                        key={i}
                        className="bg-[#FAF6F0] dark:bg-[#16100c] rounded-xl border border-[#C49232]/35 dark:border-[#d4a244]/30 shadow-md p-4 text-left flex flex-col justify-between transform hover:-translate-y-1 transition-transform"
                      >
                        <div>
                          <div className="flex items-center justify-between text-[11px] font-sans-plex mb-2">
                            <span className="font-bold text-[#8B261D] dark:text-[#d4a244] uppercase">{card.act}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${card.badgeColor}`}>
                              {card.status}
                            </span>
                          </div>
                          <h4 className="font-display-cormorant text-lg font-bold text-[#232020] dark:text-[#FAF6F0] mb-1">
                            {card.title}
                          </h4>
                          <p className="text-xs font-newsreader text-[#232020]/75 dark:text-[#FAF6F0]/75 line-clamp-2">
                            POV: {card.pov} · Key dramatic beat with courier seal betrayal.
                          </p>
                        </div>
                        <div className="mt-3 pt-2 border-t border-[#C49232]/20 dark:border-[#d4a244]/20 flex justify-between text-[11px] font-sans-plex font-medium text-[#232020]/70 dark:text-[#FAF6F0]/70">
                          <span>{card.words}</span>
                          <span className="text-[#8B261D] dark:text-[#d4a244] font-bold">Scene #{i + 1}</span>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Stage 3: World Ledger */}
                {activeStageIndex === 2 && (
                  <motion.div
                    key="stage-2"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-2xl bg-[#FAF6F0] dark:bg-[#16100c] rounded-xl border border-[#C49232]/40 dark:border-[#d4a244]/30 shadow-xl p-6 text-left"
                  >
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#C49232]/20 dark:border-[#d4a244]/20 text-xs font-sans-plex">
                      <span className="font-bold text-[#8B261D] dark:text-[#d4a244] uppercase tracking-wider">
                        Character & Lore Concordance
                      </span>
                      <span className="text-[11px] text-[#26382d] dark:text-[#86efac] bg-[#26382d]/10 dark:bg-[#14532d]/40 px-2 py-0.5 rounded font-medium">
                        94% Semantic Mention Match
                      </span>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#8B261D] text-[#FAF6F0] flex items-center justify-center font-display-cormorant text-2xl font-bold shadow-md shrink-0">
                        M
                      </div>
                      <div>
                        <h4 className="font-display-cormorant text-xl font-bold text-[#232020] dark:text-[#FAF6F0]">
                          Maeve of Oakhaven
                        </h4>
                        <p className="text-xs font-sans-plex text-[#B45309] dark:text-[#d4a244] font-medium">
                          Protagonist · 48 manuscript mentions · Chapters 1, 2, 4, 7
                        </p>
                        <p className="font-newsreader text-sm text-[#232020]/80 dark:text-[#FAF6F0]/80 mt-2 leading-relaxed">
                          Former archivist of the Old Abbey. Holds the only surviving concordance of the High Ciphers.
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {['#Herbalist', '#IronKettle', '#CipherFluent', '#LeftHanded'].map((t, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded text-[11px] font-sans-plex bg-[#F3ECDD] dark:bg-[#1e1611] border border-[#C49232]/30 dark:border-[#d4a244]/30 text-[#232020]/90 dark:text-[#FAF6F0]/90">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Stage 4: Bound Hardcover Novel */}
                {activeStageIndex === 3 && (
                  <motion.div
                    key="stage-3"
                    initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                    transition={{ duration: 0.5 }}
                    className="w-68 sm:w-76 h-96 bg-gradient-to-br from-[#2c1a0e] via-[#232020] to-[#120e0b] dark:from-[#1d1109] dark:via-[#140c06] dark:to-[#0a0603] rounded-r-2xl rounded-l-sm border border-[#C49232]/50 dark:border-[#d4a244]/50 shadow-[0_25px_60px_rgba(0,0,0,0.5)] p-6 text-center flex flex-col justify-between relative overflow-hidden"
                  >
                    {/* Spine highlight */}
                    <div className="absolute left-0 top-0 bottom-0 w-3.5 bg-gradient-to-r from-black/50 via-transparent to-transparent border-r border-[#C49232]/40" />

                    <div className="pt-6">
                      <div className="w-11 h-11 mx-auto rounded-full bg-[#8B261D] border-2 border-[#C49232] flex items-center justify-center text-[#FAF6F0] mb-4 shadow-md">
                        <BookCoverEmblem className="w-6 h-6 text-[#FAF6F0]" />
                      </div>
                      <div className="font-display-playfair text-2xl font-bold text-[#FAF6F0] tracking-wide">
                        THE SALT WATCH
                      </div>
                      <div className="font-display-cormorant text-xs text-[#C49232] uppercase tracking-[0.25em] mt-2 font-semibold">
                        A Novel in Three Acts
                      </div>
                    </div>

                    <div className="pb-4">
                      <div className="w-16 h-[1px] bg-[#C49232]/60 mx-auto my-3" />
                      <div className="font-newsreader text-xs italic text-[#e8e0cf]/90">
                        84,200 Words · Fully Realized Manuscript
                      </div>
                      <div className="text-[10px] font-sans-plex font-bold uppercase tracking-widest text-[#d4a244] mt-2">
                        Export JSON Archive
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Bottom Stepper Indicator */}
            <div className="mt-8 pt-4 border-t border-[#C49232]/25 dark:border-[#d4a244]/20 flex items-center justify-between text-xs font-sans-plex">
              <span className="text-[#232020]/70 dark:text-[#FAF6F0]/70">
                Phase {activeStageIndex + 1} of {stages.length}
              </span>
              
              <div className="flex items-center gap-2">
                {stages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStageIndex(idx)}
                    type="button"
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeStageIndex === idx
                        ? 'w-8 bg-[#8B261D] dark:bg-[#d4a244]'
                        : 'w-2 bg-[#C49232]/30 dark:bg-[#d4a244]/30 hover:bg-[#C49232]/60'
                    }`}
                    aria-label={`Jump to stage ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveStageIndex((prev) => (prev + 1) % stages.length)}
                type="button"
                className="text-[#8B261D] dark:text-[#d4a244] font-bold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span>Next Phase</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* 3. Horizontal Kinetic Marquee Quote Strip */}
      <div 
        className="w-full bg-[#F3ECDD] dark:bg-[#1b140f] border-y border-[#C49232]/35 dark:border-[#d4a244]/25 py-4.5 marquee-container overflow-hidden relative shadow-xs transition-colors duration-300"
        tabIndex={0}
        aria-label="Literary quotes marquee. Focus or hover to pause."
      >
        <div className="animate-marquee flex items-center gap-12 text-[#232020] dark:text-[#FAF6F0]">
          {[...MARQUEE_QUOTES, ...MARQUEE_QUOTES].map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="flex items-center gap-4 shrink-0 px-4">
              <Quote className="w-4 h-4 text-[#8B261D] dark:text-[#d4a244] shrink-0" />
              <span className="font-display-cormorant text-lg sm:text-xl font-semibold tracking-wide text-[#232020] dark:text-[#FAF6F0]">
                "{item.quote}"
              </span>
              <span className="font-sans-plex text-xs font-medium text-[#B45309] dark:text-[#d4a244] uppercase tracking-wider">
                — {item.author} ({item.context})
              </span>
              <BrassStarIcon className="w-3.5 h-3.5 text-[#C49232] dark:text-[#d4a244] ml-4" />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
