import React, { useState } from 'react';
import { BINDER_SCENES_MOCK, LEDGER_CHARACTER_MOCK } from '../data/content';
import {
  FileText,
  LayoutGrid,
  BookOpen,
  ShieldCheck,
  WifiOff,
  UserX,
  ArrowUpRight,
  History,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { SealCheckIcon, AntiqueLampIcon, BrassStarIcon } from './CustomIcons';

export const WorkspacesShowcase: React.FC = () => {

  // Binder interactive scene reorder preview state
  const [scenes, setScenes] = useState(BINDER_SCENES_MOCK);
  const [selectedSceneId, setSelectedSceneId] = useState('sc-1');
  const [activeLedgerTab, setActiveLedgerTab] = useState<'characters' | 'locations' | 'lore'>('characters');

  const moveScene = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= scenes.length) return;
    const updated = [...scenes];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;
    setScenes(updated);
  };

  return (
    <section id="workspaces" className="py-20 md:py-32 bg-[#FAF6F0] dark:bg-[#120e0b] relative overflow-hidden transition-colors duration-300" aria-label="Core Workspaces">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Intro Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <div className="inline-block text-xs font-sans-plex font-semibold tracking-[0.2em] text-[#B45309] dark:text-[#d4a244] uppercase mb-3">
            Three Unified Workspaces
          </div>
          <h2 className="font-display-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#232020] dark:text-[#FAF6F0] leading-tight mb-5">
            Everything your novel needs. <br />
            <span className="italic font-display-playfair text-[#8B261D] dark:text-[#d4a244]">Nothing to distract you.</span>
          </h2>
          <p className="font-newsreader text-lg text-[#232020]/80 dark:text-[#FAF6F0]/80 leading-relaxed">
            Move seamlessly between Workbench drafting, Binder planning, Storylines, and Ledger character tracking without losing your flow.
          </p>
        </div>

        {/* WORKSPACE 1: WORKBENCH */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-28 md:mb-36">
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-6 text-left order-2 lg:order-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-[#8B261D]/10 dark:bg-[#d4a244]/15 text-[#8B261D] dark:text-[#d4a244]">
                <FileText className="w-5 h-5" />
              </span>
              <span className="text-xs font-sans-plex font-bold tracking-[0.18em] uppercase text-[#8B261D] dark:text-[#d4a244]">
                Workspace 01 · The Workbench
              </span>
            </div>

            <h3 className="font-display-cormorant text-3xl sm:text-4xl font-bold text-[#232020] dark:text-[#FAF6F0] leading-snug">
              The page, and nothing else.
            </h3>

            <p className="font-newsreader text-lg text-[#232020]/85 dark:text-[#FAF6F0]/80 leading-relaxed">
              A distraction-free writing environment built on a custom TipTap engine. When you write, interface buttons gently dissolve away, leaving only your sentences centered in quiet focus.
            </p>

            <ul className="space-y-3 font-sans-plex text-sm text-[#232020]/80 dark:text-[#FAF6F0]/80 pt-1">
              <li className="flex items-start gap-2.5">
                <SealCheckIcon className="w-4 h-4 text-[#B45309] dark:text-[#d4a244] shrink-0 mt-0.5" />
                <span><strong>Typewriter scrolling:</strong> Your active cursor line stays strictly centered at eye level.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <SealCheckIcon className="w-4 h-4 text-[#B45309] dark:text-[#d4a244] shrink-0 mt-0.5" />
                <span><strong>Writing modes:</strong> Zen, Focus (current paragraph only), Distill, and Endless draft mode.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <SealCheckIcon className="w-4 h-4 text-[#B45309] dark:text-[#d4a244] shrink-0 mt-0.5" />
                <span><strong>Local snapshots:</strong> Crash-safe auto-snapshots before every single structural change.</span>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href="/inkwell/app/"
                className="inline-flex items-center gap-2 text-sm font-sans-plex font-semibold text-[#8B261D] dark:text-[#d4a244] hover:text-[#721e17] dark:hover:text-[#FAF6F0] transition-colors"
              >
                <span>Try the Workbench desk</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Right Mockup */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="book-cloth-card p-4 sm:p-6 border border-[#C49232]/40 dark:border-[#d4a244]/30 shadow-xl bg-gradient-to-br from-[#F3ECDD] to-[#eae0cd] dark:from-[#211812] dark:to-[#17110d]">
              <div className="bg-[#FAF6F0] dark:bg-[#16100c] rounded-xl border border-[#C49232]/25 dark:border-[#d4a244]/25 p-5 shadow-sm space-y-4">

                {/* Workbench Topbar */}
                <div className="flex items-center justify-between border-b border-[#C49232]/20 dark:border-[#d4a244]/20 pb-3">
                  <div className="flex items-center gap-2 font-display-cormorant text-lg font-bold text-[#8B261D] dark:text-[#d4a244]">
                    <span>Act I · Chapter 3: Tide at Midnight</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-sans-plex">
                    <span className="px-2 py-0.5 rounded bg-[#FAF6F0] dark:bg-[#1e1611] border border-[#C49232]/30 dark:border-[#d4a244]/30 text-[#B45309] dark:text-[#d4a244] font-medium">
                      Zen Mode Active
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#26382d]/10 dark:bg-[#14532d]/40 text-[#26382d] dark:text-[#86efac] border border-[#26382d]/25 dark:border-[#22c55e]/30 font-medium">
                      3,120 words
                    </span>
                  </div>
                </div>

                {/* Prose Body */}
                <div className="font-newsreader text-base sm:text-lg text-[#232020] dark:text-[#FAF6F0] leading-relaxed space-y-3 py-2">
                  <p className="opacity-40 transition-opacity">
                    The bells in the lower bailey struck midnight, their iron tongues muted by the thickening fog.
                  </p>
                  <p className="bg-[#8B261D]/5 dark:bg-[#8B261D]/20 p-3 rounded-lg border border-[#8B261D]/20 dark:border-[#d4a244]/35 shadow-xs font-medium">
                    Kaelen reached into the lining of his sea cloak, fingers brushing against the cold brass cylinder. Inside was the cipher key Maeve had deciphered by candlelight.
                  </p>
                  <p className="opacity-40 transition-opacity">
                    "If the lantern flashes twice," he whispered to the salt air, "the harbor is already lost."
                  </p>
                </div>

                {/* Status bottom bar */}
                <div className="flex items-center justify-between pt-2 border-t border-[#C49232]/15 dark:border-[#d4a244]/15 text-xs font-sans-plex text-[#232020]/75 dark:text-[#FAF6F0]/80">
                  <div className="flex items-center gap-2">
                    <History className="w-3.5 h-3.5 text-[#B45309] dark:text-[#d4a244]" />
                    <span>Snapshot taken 2 min ago</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#8B261D] dark:text-[#d4a244] font-medium">Autosave</span>
                    <span>·</span>
                    <span>Local snapshots</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* WORKSPACE 2: BINDER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-28 md:mb-36">
          {/* Left Mockup (alternating side) */}
          <div className="lg:col-span-7">
            <div className="book-cloth-card p-4 sm:p-6 border border-[#C49232]/40 dark:border-[#d4a244]/30 shadow-xl bg-gradient-to-br from-[#F3ECDD] to-[#eae0cd] dark:from-[#211812] dark:to-[#17110d]">

              {/* Binder Corkboard Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#C49232]/25 dark:border-[#d4a244]/25">
                <div className="flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 text-[#8B261D] dark:text-[#d4a244]" />
                  <span className="font-display-cormorant text-lg font-bold text-[#232020] dark:text-[#FAF6F0]">
                    Corkboard View — Act I: The Salt Watch
                  </span>
                </div>
                <span className="text-xs font-sans-plex text-[#B45309] dark:text-[#d4a244] bg-[#FAF6F0] dark:bg-[#16100c] px-2 py-0.5 rounded border border-[#C49232]/30 dark:border-[#d4a244]/30">
                  {scenes.length} Scenes · 7,440 Total Words
                </span>
              </div>

              {/* Interactive Index Cards Grid */}
              <div className="space-y-3">
                {scenes.map((sc, idx) => (
                  <div
                    key={sc.id}
                    onClick={() => setSelectedSceneId(sc.id)}
                    className={`p-4 rounded-xl transition-all border cursor-pointer ${
                      selectedSceneId === sc.id
                        ? 'bg-[#FAF6F0] dark:bg-[#16100c] border-[#8B261D] dark:border-[#d4a244] shadow-md ring-1 ring-[#8B261D]/30 dark:ring-[#d4a244]/30'
                        : 'bg-[#FAF6F0]/80 dark:bg-[#16100c]/70 border-[#C49232]/30 dark:border-[#d4a244]/25 hover:bg-[#FAF6F0] dark:hover:bg-[#16100c]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-sans-plex font-bold text-[#8B261D] dark:text-[#d4a244]">
                          {sc.chapter}
                        </span>
                        <span className="font-display-cormorant text-base font-bold text-[#232020] dark:text-[#FAF6F0]">
                          {sc.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-sans-plex uppercase font-semibold px-2 py-0.5 rounded-full ${
                            sc.status === 'Polished'
                              ? 'bg-[#26382d]/15 text-[#26382d] dark:bg-[#14532d]/40 dark:text-[#86efac] border border-[#26382d]/30 dark:border-[#22c55e]/30'
                              : sc.status === 'Revised'
                              ? 'bg-[#B45309]/15 text-[#B45309] dark:bg-[#78350f]/40 dark:text-[#fcd34d] border border-[#B45309]/30 dark:border-[#f59e0b]/40'
                              : 'bg-[#8B261D]/15 text-[#8B261D] dark:bg-[#7f1d1d]/40 dark:text-[#fca5a5] border border-[#8B261D]/30 dark:border-[#ef4444]/40'
                          }`}
                        >
                          {sc.status}
                        </span>

                        {/* Reorder Up/Down arrows */}
                        <div className="flex items-center gap-1 ml-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            disabled={idx === 0}
                            onClick={() => moveScene(idx, 'up')}
                            type="button"
                            className="p-1 rounded bg-[#F3ECDD] dark:bg-[#251c16] text-[#232020]/75 dark:text-[#FAF6F0]/80 hover:text-[#8B261D] dark:hover:text-[#d4a244] disabled:opacity-30 transition-colors"
                            title="Move scene up"
                            aria-label="Move scene up"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            disabled={idx === scenes.length - 1}
                            onClick={() => moveScene(idx, 'down')}
                            type="button"
                            className="p-1 rounded bg-[#F3ECDD] dark:bg-[#251c16] text-[#232020]/75 dark:text-[#FAF6F0]/80 hover:text-[#8B261D] dark:hover:text-[#d4a244] disabled:opacity-30 transition-colors"
                            title="Move scene down"
                            aria-label="Move scene down"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="font-newsreader text-xs sm:text-sm text-[#232020]/80 dark:text-[#FAF6F0]/80 line-clamp-2">
                      {sc.synopsis}
                    </p>

                    <div className="mt-2.5 pt-2 border-t border-[#C49232]/15 dark:border-[#d4a244]/15 flex items-center justify-between text-[11px] font-sans-plex text-[#232020]/70 dark:text-[#FAF6F0]/70">
                      <span>POV: <strong className="text-[#232020] dark:text-[#FAF6F0]">{sc.pov}</strong></span>
                      <span>{sc.wordCount.toLocaleString()} words</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 text-center text-xs font-sans-plex text-[#B45309] dark:text-[#d4a244] flex items-center justify-center gap-1.5">
                <AntiqueLampIcon className="w-3.5 h-3.5 text-[#B45309] dark:text-[#d4a244]" />
                <span>Click any card to select or use arrows to simulate drag-to-reorder</span>
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-[#B45309]/10 dark:bg-[#d4a244]/15 text-[#B45309] dark:text-[#d4a244]">
                <LayoutGrid className="w-5 h-5" />
              </span>
              <span className="text-xs font-sans-plex font-bold tracking-[0.18em] uppercase text-[#B45309] dark:text-[#d4a244]">
                Workspace 02 · The Binder
              </span>
            </div>

            <h3 className="font-display-cormorant text-3xl sm:text-4xl font-bold text-[#232020] dark:text-[#FAF6F0] leading-snug">
              See the whole book at a single glance.
            </h3>

            <p className="font-newsreader text-lg text-[#232020]/85 dark:text-[#FAF6F0]/80 leading-relaxed">
              Organize your novel as structural index cards pinned to a corkboard. Move chapters between Acts, split scenes, and tweak pacing without losing a single paragraph of text.
            </p>

            <ul className="space-y-3 font-sans-plex text-sm text-[#232020]/80 dark:text-[#FAF6F0]/80 pt-1">
              <li className="flex items-start gap-2.5">
                <SealCheckIcon className="w-4 h-4 text-[#B45309] dark:text-[#d4a244] shrink-0 mt-0.5" />
                <span><strong>Act & Chapter hierarchy:</strong> Nest scenes seamlessly under multi-act plot architectures.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <SealCheckIcon className="w-4 h-4 text-[#B45309] dark:text-[#d4a244] shrink-0 mt-0.5" />
                <span><strong>Draft status badges:</strong> Track Draft, Revised, and Polished status per scene.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <SealCheckIcon className="w-4 h-4 text-[#B45309] dark:text-[#d4a244] shrink-0 mt-0.5" />
                <span><strong>Inline synopsis cards:</strong> Keep plot promises and thematic beats visible while navigating.</span>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href="/inkwell/app/"
                className="inline-flex items-center gap-2 text-sm font-sans-plex font-semibold text-[#8B261D] dark:text-[#d4a244] hover:text-[#721e17] dark:hover:text-[#FAF6F0] transition-colors"
              >
                <span>Structure your novel in Binder</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* WORKSPACE 3: LEDGER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-20 md:mb-28">
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-6 text-left order-2 lg:order-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-[#26382d]/10 dark:bg-[#4E7A5A]/15 text-[#26382d] dark:text-[#4E7A5A]">
                <BookOpen className="w-5 h-5" />
              </span>
              <span className="text-xs font-sans-plex font-bold tracking-[0.18em] uppercase text-[#26382d] dark:text-[#4E7A5A]">
                Workspace 03 · Storylines & Ledger
              </span>
            </div>

            <h3 className="font-display-cormorant text-3xl sm:text-4xl font-bold text-[#232020] dark:text-[#FAF6F0] leading-snug">
              Every character, place, and secret.
            </h3>

            <p className="font-newsreader text-lg text-[#232020]/85 dark:text-[#FAF6F0]/80 leading-relaxed">
              A comprehensive entity database for your lore, worldbuilding, and character cast. Inkwell auto-scans your manuscript to detect mentions and verify continuity.
            </p>

            <ul className="space-y-3 font-sans-plex text-sm text-[#232020]/80 dark:text-[#FAF6F0]/80 pt-1">
              <li className="flex items-start gap-2.5">
                <SealCheckIcon className="w-4 h-4 text-[#B45309] dark:text-[#d4a244] shrink-0 mt-0.5" />
                <span><strong>Cast chips per scene:</strong> Tag characters as POV, Present, Setting, or Mentioned.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <SealCheckIcon className="w-4 h-4 text-[#B45309] dark:text-[#d4a244] shrink-0 mt-0.5" />
                <span><strong>Auto-scan mention detector:</strong> Instant pattern matcher surfaces suggested links with confidence %.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <SealCheckIcon className="w-4 h-4 text-[#B45309] dark:text-[#d4a244] shrink-0 mt-0.5" />
                <span><strong>Storylines & lore:</strong> Keep plot threads and world details visible while you move through the manuscript.</span>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href="/inkwell/app/"
                className="inline-flex items-center gap-2 text-sm font-sans-plex font-semibold text-[#8B261D] dark:text-[#d4a244] hover:text-[#721e17] dark:hover:text-[#FAF6F0] transition-colors"
              >
                <span>Explore Storylines & Ledger</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Right Mockup */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="book-cloth-card p-4 sm:p-6 border border-[#C49232]/40 dark:border-[#d4a244]/30 shadow-xl bg-gradient-to-br from-[#F3ECDD] to-[#eae0cd] dark:from-[#211812] dark:to-[#17110d]">

              {/* Ledger Tab Switcher */}
              <div className="flex items-center justify-between border-b border-[#C49232]/25 dark:border-[#d4a244]/25 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveLedgerTab('characters')}
                    type="button"
                    className={`px-3 py-1 rounded-lg text-xs font-sans-plex font-medium transition-colors ${
                      activeLedgerTab === 'characters'
                        ? 'bg-[#8B261D] text-[#FAF6F0] shadow-xs'
                        : 'bg-[#FAF6F0] dark:bg-[#19120e] text-[#232020]/80 dark:text-[#FAF6F0]/80 hover:bg-[#F3ECDD] dark:hover:bg-[#251b14] border border-[#C49232]/25 dark:border-[#d4a244]/20'
                    }`}
                  >
                    Cast (14)
                  </button>
                  <button
                    onClick={() => setActiveLedgerTab('locations')}
                    type="button"
                    className={`px-3 py-1 rounded-lg text-xs font-sans-plex font-medium transition-colors ${
                      activeLedgerTab === 'locations'
                        ? 'bg-[#8B261D] text-[#FAF6F0] shadow-xs'
                        : 'bg-[#FAF6F0] dark:bg-[#19120e] text-[#232020]/80 dark:text-[#FAF6F0]/80 hover:bg-[#F3ECDD] dark:hover:bg-[#251b14] border border-[#C49232]/25 dark:border-[#d4a244]/20'
                    }`}
                  >
                    Locations (8)
                  </button>
                  <button
                    onClick={() => setActiveLedgerTab('lore')}
                    type="button"
                    className={`px-3 py-1 rounded-lg text-xs font-sans-plex font-medium transition-colors ${
                      activeLedgerTab === 'lore'
                        ? 'bg-[#8B261D] text-[#FAF6F0] shadow-xs'
                        : 'bg-[#FAF6F0] dark:bg-[#19120e] text-[#232020]/80 dark:text-[#FAF6F0]/80 hover:bg-[#F3ECDD] dark:hover:bg-[#251b14] border border-[#C49232]/25 dark:border-[#d4a244]/20'
                    }`}
                  >
                    Lore Artifacts (19)
                  </button>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-sans-plex text-[#26382d] dark:text-[#86efac] bg-[#26382d]/10 dark:bg-[#14532d]/40 px-2 py-0.5 rounded-full border border-[#26382d]/25 dark:border-[#22c55e]/30">
                  <span>94% Confidence match</span>
                </div>
              </div>

              {/* Dossier Card */}
              <div className="bg-[#FAF6F0] dark:bg-[#16100c] rounded-xl border border-[#C49232]/25 dark:border-[#d4a244]/25 p-5 shadow-sm space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#8B261D]/15 dark:bg-[#d4a244]/20 border border-[#8B261D]/40 dark:border-[#d4a244]/40 flex items-center justify-center font-display-cormorant text-xl font-bold text-[#8B261D] dark:text-[#d4a244]">
                      M
                    </div>
                    <div>
                      <h4 className="font-display-cormorant text-2xl font-bold text-[#232020] dark:text-[#FAF6F0]">
                        {LEDGER_CHARACTER_MOCK.name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs font-sans-plex text-[#B45309] dark:text-[#d4a244]">
                        <span className="font-medium">{LEDGER_CHARACTER_MOCK.role}</span>
                        <span>·</span>
                        <span>{LEDGER_CHARACTER_MOCK.status}</span>
                      </div>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-xs font-sans-plex font-semibold bg-[#C49232]/15 dark:bg-[#d4a244]/20 text-[#B45309] dark:text-[#d4a244] border border-[#C49232]/30 dark:border-[#d4a244]/30">
                    {LEDGER_CHARACTER_MOCK.mentions} Scene Mentions
                  </span>
                </div>

                <p className="font-newsreader text-sm sm:text-base text-[#232020]/90 dark:text-[#FAF6F0]/90 leading-relaxed bg-[#F3ECDD]/70 dark:bg-[#221710] p-3 rounded-lg border border-[#C49232]/20 dark:border-[#d4a244]/20">
                  {LEDGER_CHARACTER_MOCK.bio}
                </p>

                {/* Trait tags */}
                <div className="space-y-2">
                  <div className="text-xs font-sans-plex font-semibold text-[#232020]/80 dark:text-[#FAF6F0]/80 uppercase tracking-wider">
                    Key Character Traits & Motifs:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {LEDGER_CHARACTER_MOCK.traits.map((trait, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-xs font-sans-plex bg-[#FAF6F0] dark:bg-[#19120e] border border-[#C49232]/30 dark:border-[#d4a244]/30 text-[#232020]/90 dark:text-[#FAF6F0]/90 shadow-2xs"
                      >
                        #{trait}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Auto-Scan Suggestion Strip */}
                <div className="p-2.5 rounded-lg bg-[#8B261D]/10 dark:bg-[#8B261D]/25 border border-[#8B261D]/20 dark:border-[#d4a244]/35 flex items-center justify-between text-xs font-sans-plex">
                  <div className="flex items-center gap-2 text-[#8B261D] dark:text-[#d4a244]">
                    <BrassStarIcon className="w-3.5 h-3.5 text-[#8B261D] dark:text-[#d4a244]" />
                    <span>Auto-Scan: Mentioned in Chapter 4 draft ("the archivist's kettle")</span>
                  </div>
                  <button type="button" className="text-[11px] font-bold text-[#8B261D] dark:text-[#d4a244] underline cursor-pointer hover:opacity-80">
                    Link Scene
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* FULL-WIDTH DARK POSITIONING STRIP (Espresso / Ink) */}
      <div
        className="w-full bg-[#18110c] dark:bg-[#0c0806] text-[#FAF6F0] py-16 md:py-20 border-y border-[#C49232]/30 dark:border-[#d4a244]/25 relative"
        id="privacy-strip"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-block text-xs font-sans-plex font-semibold tracking-[0.2em] text-[#C49232] dark:text-[#d4a244] uppercase mb-2">
              Privacy by Architecture
            </div>
            <h3 className="font-display-cormorant text-3xl sm:text-4xl font-bold text-[#FAF6F0]">
              A browser workspace that respects your draft.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Pillar 1 */}
            <div className="p-6 rounded-xl bg-[#241710] dark:bg-[#19110c] border border-[#C49232]/25 dark:border-[#d4a244]/20 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#8B261D]/30 border border-[#8B261D]/50 flex items-center justify-center text-[#FAF6F0]">
                <WifiOff className="w-5 h-5 text-[#C49232] dark:text-[#d4a244]" />
              </div>
              <h4 className="font-display-cormorant text-2xl font-bold text-[#FAF6F0]">
                Drafts stored locally
              </h4>
              <p className="font-newsreader text-base text-[#e8e0cf]/80 leading-relaxed">
                Inkwell keeps your working drafts in your browser’s local workspace, so your writing desk starts close to the page.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-xl bg-[#241710] dark:bg-[#19110c] border border-[#C49232]/25 dark:border-[#d4a244]/20 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#8B261D]/30 border border-[#8B261D]/50 flex items-center justify-center text-[#FAF6F0]">
                <UserX className="w-5 h-5 text-[#C49232] dark:text-[#d4a244]" />
              </div>
              <h4 className="font-display-cormorant text-2xl font-bold text-[#FAF6F0]">
                Account when you need it
              </h4>
              <p className="font-newsreader text-base text-[#e8e0cf]/80 leading-relaxed">
                Open the browser app to write. An account and payment are only needed for paid capabilities.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-xl bg-[#241710] dark:bg-[#19110c] border border-[#C49232]/25 dark:border-[#d4a244]/20 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#8B261D]/30 border border-[#8B261D]/50 flex items-center justify-center text-[#FAF6F0]">
                <ShieldCheck className="w-5 h-5 text-[#C49232] dark:text-[#d4a244]" />
              </div>
              <h4 className="font-display-cormorant text-2xl font-bold text-[#FAF6F0]">
                Your voice stays yours
              </h4>
              <p className="font-newsreader text-base text-[#e8e0cf]/80 leading-relaxed">
                Inkwell surfaces craft signals instead of generating your prose. You decide every revision.
              </p>
            </div>
          </div>

          {/* Single repeated CTA inside the dark band */}
          <div className="text-center">
            <a
              href="/inkwell/app/"
              className="btn-wax-seal px-8 py-3.5 rounded-xl text-base font-sans-plex font-medium tracking-wide inline-flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
              id="positioning-strip-cta"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Open Inkwell</span>
            </a>
          </div>

        </div>
      </div>

    </section>
  );
};
