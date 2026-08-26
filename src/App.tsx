/**
 * Inkwell — Offline-First Novel Writing Studio Marketing Landing Page
 * 
 * References:
 * - https://ellipsus.com: Literary tone, caps eyebrows, craft-first anti-AI stance,
 *   single repeated CTA, footer literary quote, generous whitespace, interactive diffs.
 * - https://toyfight.co: Dynamic typography with rotating word-swaps, scroll reveals,
 *   horizontal quote marquee, characterful microcopy, 3D tilt interactions, and rich workspace cards.
 */

import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Introduction } from './components/Introduction';
import { WorkspacesShowcase } from './components/WorkspacesShowcase';
import { ScrollDynamicSection } from './components/ScrollDynamicSection';
import { ManuscriptDiffViewer } from './components/ManuscriptDiffViewer';
import { AdditionalFeaturesGrid } from './components/AdditionalFeaturesGrid';
import { ProTeaser } from './components/ProTeaser';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { DownloadModal } from './components/DownloadModal';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { DynamicBottomBar } from './components/DynamicBottomBar';

export default function App() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  // Dark/Light Theme state with system preference & localStorage fallback
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('inkwell-theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  // Sync theme with <html> class & localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('inkwell-theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Global ⌘K / Ctrl+K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF6F0] dark:bg-[#120e0b] text-[#232020] dark:text-[#FAF6F0] font-newsreader selection:bg-[#8B261D]/20 dark:selection:bg-[#d4a244]/30 selection:text-[#8B261D] dark:selection:text-[#FAF6F0] relative overflow-x-hidden transition-colors duration-300">
      
      {/* 1. Top Navigation with Scroll Progress Bar */}
      <Navigation
        onOpenDownload={() => setIsDownloadOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main id="main-content" role="main">
        {/* 2. Hero Section with 3D Tilt Desk & Kinetic Headlines */}
        <Hero
          onOpenDownload={() => setIsDownloadOpen(true)}
          onOpenShortcuts={() => setIsShortcutsOpen(true)}
        />

        {/* 3. Introduction Section (Manifesto & Atmosphere Audio Visualizer) */}
        <Introduction />

        {/* 4. Feature Showcase (3 Workspaces + Dark Positioning Strip) */}
        <WorkspacesShowcase
          onOpenDownload={() => setIsDownloadOpen(true)}
        />

        {/* 5. Scroll-Driven Dynamic Section (Word-swap, Parallax Marginalia, 4-Stage Metamorphosis, Marquee) */}
        <ScrollDynamicSection />

        {/* 6. Interactive Manuscript Evolution & Version Diff Scrubber (Ellipsus-Style) */}
        <ManuscriptDiffViewer />

        {/* 7. Additional Features Grid (8 Compact Bento Capabilities with Sheen) */}
        <AdditionalFeaturesGrid
          onOpenShortcuts={() => setIsShortcutsOpen(true)}
        />

        {/* 8. Pro Tier Coming Soon Teaser */}
        <ProTeaser />

        {/* 9. Final CTA Band */}
        <FinalCta
          onOpenDownload={() => setIsDownloadOpen(true)}
        />
      </main>

      {/* 10. Footer with Literary Quote */}
      <Footer
        onOpenDownload={() => setIsDownloadOpen(true)}
      />

      {/* 11. Floating Dynamic Navigation Island */}
      <DynamicBottomBar
        onOpenDownload={() => setIsDownloadOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Download Modal Dialog */}
      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />

      {/* Keyboard Shortcuts / ⌘K Command Palette Modal */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
}
