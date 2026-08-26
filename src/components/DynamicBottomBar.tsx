import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Command, Sun, Moon, Feather, Layers, BookOpen, GitCompare } from 'lucide-react';
import { WaxSealLogo } from './WaxSealLogo';

interface DynamicBottomBarProps {
  onOpenDownload: () => void;
  onOpenShortcuts: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const DynamicBottomBar: React.FC<DynamicBottomBarProps> = ({
  onOpenDownload,
  onOpenShortcuts,
  theme,
  onToggleTheme,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, Math.round((window.scrollY / totalHeight) * 100)));
        setScrollProgress(progress);
      }
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[92vw] sm:max-w-fit"
          aria-label="Floating Navigation Island"
        >
          <div className="bg-[#FAF6F0]/95 dark:bg-[#18110d]/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border-2 border-[#C49232]/45 dark:border-[#d4a244]/35 shadow-[0_12px_36px_rgba(0,0,0,0.2)] flex items-center gap-2 sm:gap-3 text-xs font-sans-plex">
            
            {/* Scroll Progress Ring / Percentage */}
            <div className="flex items-center gap-1.5 pl-1 pr-2 border-r border-[#C49232]/25 dark:border-[#d4a244]/25">
              <div className="w-4 h-4 rounded-full border-2 border-[#C49232]/30 dark:border-[#d4a244]/30 border-t-[#8B261D] dark:border-t-[#d4a244] animate-spin" style={{ animationDuration: '3s' }} />
              <span className="font-mono font-bold text-[#8B261D] dark:text-[#d4a244] text-[11px]">
                {scrollProgress}%
              </span>
            </div>

            {/* Quick Workspace Anchor Links */}
            <div className="hidden sm:flex items-center gap-1 text-[#232020]/80 dark:text-[#FAF6F0]/80">
              <a
                href="#hero-section"
                className="px-2 py-1 rounded-md hover:bg-[#F3ECDD] dark:hover:bg-[#251a13] hover:text-[#8B261D] dark:hover:text-[#d4a244] transition-colors flex items-center gap-1"
                title="Jump to Top"
              >
                <Feather className="w-3.5 h-3.5" />
                <span>Desk</span>
              </a>
              <a
                href="#craft-in-motion"
                className="px-2 py-1 rounded-md hover:bg-[#F3ECDD] dark:hover:bg-[#251a13] hover:text-[#8B261D] dark:hover:text-[#d4a244] transition-colors flex items-center gap-1"
                title="Jump to Craft in Motion"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Stages</span>
              </a>
              <a
                href="#manuscript-evolution"
                className="px-2 py-1 rounded-md hover:bg-[#F3ECDD] dark:hover:bg-[#251a13] hover:text-[#8B261D] dark:hover:text-[#d4a244] transition-colors flex items-center gap-1"
                title="Jump to Diff Evolution"
              >
                <GitCompare className="w-3.5 h-3.5" />
                <span>Evolution</span>
              </a>
            </div>

            {/* ⌘K Command Trigger */}
            <button
              onClick={onOpenShortcuts}
              type="button"
              className="p-1.5 rounded-lg border border-[#C49232]/30 dark:border-[#d4a244]/30 bg-[#F3ECDD]/80 dark:bg-[#221711] text-[#232020] dark:text-[#FAF6F0] hover:bg-[#F3ECDD] transition-all flex items-center gap-1 cursor-pointer"
              title="Open Command Palette (⌘K)"
              aria-label="Open Command Palette"
            >
              <Command className="w-3.5 h-3.5 text-[#8B261D] dark:text-[#d4a244]" />
              <span className="hidden md:inline font-mono text-[10px]">⌘K</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleTheme}
              type="button"
              className="p-1.5 rounded-lg border border-[#C49232]/30 dark:border-[#d4a244]/30 bg-[#F3ECDD]/80 dark:bg-[#221711] text-[#232020] dark:text-[#FAF6F0] hover:bg-[#F3ECDD] transition-all cursor-pointer"
              title="Toggle Theme"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-[#d4a244]" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-[#8B261D]" />
              )}
            </button>

            {/* Direct Download Action */}
            <button
              onClick={onOpenDownload}
              type="button"
              className="btn-wax-seal px-3 py-1.5 rounded-xl text-xs font-sans-plex font-medium flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Get Free</span>
            </button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
