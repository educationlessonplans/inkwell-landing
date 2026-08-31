import React, { useState, useEffect } from 'react';
import { WaxSealLogo } from './WaxSealLogo';
import { Menu, X, Moon, Sun, ArrowUpRight } from 'lucide-react';
import { PRO_PRICE, ANALYSIS_PRICE, SUBSCRIPTION_PRICE } from '../data/content';

interface NavigationProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  theme,
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress((window.scrollY / total) * 100);
      }
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF6F0]/90 dark:bg-[#120e0b]/90 backdrop-blur-md border-b border-[#C49232]/25 dark:border-[#d4a244]/20 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.08)]'
          : 'bg-transparent py-5'
      }`}
    >
      {/* Precision Scroll Progress Line at very top */}
      <div 
        className="absolute top-0 left-0 h-[2.5px] bg-gradient-to-r from-[#8B261D] via-[#C49232] to-[#d4a244] transition-all duration-100 ease-out pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <nav 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4"
        aria-label="Main Navigation"
      >
        {/* Left: Logo & Wordmark */}
        <a 
          href="#" 
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B261D] rounded-md transition-opacity hover:opacity-90 shrink-0"
          aria-label="Inkwell Home"
          id="nav-brand-link"
        >
          <WaxSealLogo size="md" variant={theme === 'dark' ? 'dark' : 'light'} />
        </a>

        {/* Center: Section Navigation Links */}
        <div className="hidden md:flex items-center gap-3.5 lg:gap-5 xl:gap-6 min-w-0">
          <a
            href="#workspaces"
            className="whitespace-nowrap font-sans-plex text-sm font-medium text-[#232020]/80 dark:text-[#FAF6F0]/80 hover:text-[#8B261D] dark:hover:text-[#d4a244] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#8B261D] dark:after:bg-[#d4a244] hover:after:w-full after:transition-all"
            id="nav-link-workspaces"
          >
            Workspaces
          </a>
          <a
            href="#craft-in-motion"
            className="whitespace-nowrap font-sans-plex text-sm font-medium text-[#232020]/80 dark:text-[#FAF6F0]/80 hover:text-[#8B261D] dark:hover:text-[#d4a244] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#8B261D] dark:after:bg-[#d4a244] hover:after:w-full after:transition-all"
            id="nav-link-motion"
          >
            Metamorphosis
          </a>
          <a
            href="#manuscript-evolution"
            className="whitespace-nowrap font-sans-plex text-sm font-medium text-[#232020]/80 dark:text-[#FAF6F0]/80 hover:text-[#8B261D] dark:hover:text-[#d4a244] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#8B261D] dark:after:bg-[#d4a244] hover:after:w-full after:transition-all flex items-center gap-1"
            id="nav-link-evolution"
          >
            <span>Evolution</span>
            <span className="hidden xl:inline-block w-1.5 h-1.5 rounded-full bg-[#8B261D] dark:bg-[#d4a244]" />
          </a>
          <a
            href="#philosophy"
            className="whitespace-nowrap font-sans-plex text-sm font-medium text-[#232020]/80 dark:text-[#FAF6F0]/80 hover:text-[#8B261D] dark:hover:text-[#d4a244] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#8B261D] dark:after:bg-[#d4a244] hover:after:w-full after:transition-all"
            id="nav-link-philosophy"
          >
            Philosophy
          </a>
          <a
            href="#features"
            className="whitespace-nowrap font-sans-plex text-sm font-medium text-[#232020]/80 dark:text-[#FAF6F0]/80 hover:text-[#8B261D] dark:hover:text-[#d4a244] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#8B261D] dark:after:bg-[#d4a244] hover:after:w-full after:transition-all"
            id="nav-link-features"
          >
            Capabilities
          </a>
          <a
            href="#pricing"
            className="whitespace-nowrap inline-flex items-center gap-1 font-sans-plex text-sm font-medium text-[#B45309] dark:text-[#d4a244] hover:text-[#8B261D] transition-colors py-1 shrink-0"
            id="nav-link-pro"
          >
            <span>Plans · Pro {PRO_PRICE.amount} / Analysis {ANALYSIS_PRICE.amount} / Subscription {SUBSCRIPTION_PRICE.amount}</span>
          </a>
        </div>

        {/* Right: Actions (Theme Toggle & CTA) */}
        <div className="hidden sm:flex items-center gap-3 shrink-0 ml-2">
          {/* Dark / Light Theme Toggle */}
          <button
            onClick={onToggleTheme}
            type="button"
            className="p-2 rounded-lg border border-[#C49232]/30 dark:border-[#d4a244]/30 text-[#232020]/80 dark:text-[#FAF6F0]/90 bg-[#F3ECDD]/70 dark:bg-[#1e1611] hover:bg-[#F3ECDD] dark:hover:bg-[#2a2018] transition-all flex items-center gap-1.5 text-xs font-sans-plex font-medium cursor-pointer"
            title={theme === 'dark' ? 'Switch to Parchment (Light) mode' : 'Switch to Midnight Ink (Dark) mode'}
            aria-label="Toggle dark mode"
            id="nav-theme-toggle"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-[#d4a244]" />
                <span className="hidden lg:inline text-[#FAF6F0]/80">Parchment</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-[#8B261D]" />
                <span className="hidden lg:inline text-[#232020]/80">Midnight Ink</span>
              </>
            )}
          </button>

          {/* Primary repeated CTA */}
          <a
            href="/inkwell/app/"
            className="btn-wax-seal px-4 py-2 rounded-lg text-sm font-sans-plex font-medium tracking-wide flex items-center gap-2 shadow-sm hover:scale-102 transition-transform"
            id="nav-primary-cta"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Open the writing app</span>
          </a>
        </div>

        {/* Mobile Menu Button & Theme Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onToggleTheme}
            type="button"
            className="p-1.5 rounded-lg border border-[#C49232]/30 dark:border-[#d4a244]/30 text-[#232020] dark:text-[#FAF6F0] bg-[#F3ECDD]/80 dark:bg-[#1e1611]"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#d4a244]" /> : <Moon className="w-4 h-4 text-[#8B261D]" />}
          </button>

          <a
            href="/inkwell/app/"
            className="btn-wax-seal px-3 py-1.5 rounded-lg text-xs font-sans-plex font-medium flex items-center gap-1"
            aria-label="Open Inkwell writing app"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Open app</span>
          </a>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="p-2 rounded-lg text-[#232020] dark:text-[#FAF6F0] hover:bg-[#F3ECDD] dark:hover:bg-[#1e1611] border border-[#C49232]/25 dark:border-[#d4a244]/25"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          className="sm:hidden bg-[#FAF6F0] dark:bg-[#16100c] border-b border-[#C49232]/30 dark:border-[#d4a244]/30 px-5 pt-3 pb-6 space-y-3 shadow-xl"
          id="mobile-menu-drawer"
        >
          <div className="flex flex-col space-y-3 pt-2">
            <a
              href="#workspaces"
              onClick={() => setMobileMenuOpen(false)}
              className="font-sans-plex text-base font-medium text-[#232020] dark:text-[#FAF6F0] hover:text-[#8B261D] dark:hover:text-[#d4a244] py-1.5 border-b border-[#C49232]/15 dark:border-[#d4a244]/15"
            >
              Workspaces (Workbench, Binder, Storylines, Ledger)
            </a>
            <a
              href="#craft-in-motion"
              onClick={() => setMobileMenuOpen(false)}
              className="font-sans-plex text-base font-medium text-[#232020] dark:text-[#FAF6F0] hover:text-[#8B261D] dark:hover:text-[#d4a244] py-1.5 border-b border-[#C49232]/15 dark:border-[#d4a244]/15"
            >
              Metamorphosis Sequence
            </a>
            <a
              href="#manuscript-evolution"
              onClick={() => setMobileMenuOpen(false)}
              className="font-sans-plex text-base font-medium text-[#232020] dark:text-[#FAF6F0] hover:text-[#8B261D] dark:hover:text-[#d4a244] py-1.5 border-b border-[#C49232]/15 dark:border-[#d4a244]/15"
            >
              Evolution Diff Scrubber
            </a>
            <a
              href="#philosophy"
              onClick={() => setMobileMenuOpen(false)}
              className="font-sans-plex text-base font-medium text-[#232020] dark:text-[#FAF6F0] hover:text-[#8B261D] dark:hover:text-[#d4a244] py-1.5 border-b border-[#C49232]/15 dark:border-[#d4a244]/15"
            >
              Philosophy & Privacy
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="font-sans-plex text-base font-medium text-[#232020] dark:text-[#FAF6F0] hover:text-[#8B261D] dark:hover:text-[#d4a244] py-1.5 border-b border-[#C49232]/15 dark:border-[#d4a244]/15"
            >
              Writer Capabilities
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between font-sans-plex text-base font-medium text-[#B45309] dark:text-[#d4a244] hover:text-[#8B261D] py-1.5 border-b border-[#C49232]/15 dark:border-[#d4a244]/15"
            >
              <span>Plans coming soon</span>
              <span className="px-2 py-0.5 rounded text-xs bg-[#C49232]/20 dark:bg-[#d4a244]/20 text-[#B45309] dark:text-[#d4a244] border border-[#C49232]/30 dark:border-[#d4a244]/30">Coming soon</span>
            </a>
            <a
              href="/inkwell/app/"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-wax-seal w-full py-2.5 rounded-lg text-sm font-sans-plex font-medium flex items-center justify-center gap-2"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Open the writing app</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
