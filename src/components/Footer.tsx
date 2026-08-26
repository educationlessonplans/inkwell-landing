import React from 'react';
import { WaxSealLogo } from './WaxSealLogo';
import { QuillNibIcon } from './CustomIcons';

interface FooterProps {
  onOpenDownload: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDownload }) => {
  return (
    <footer 
      id="main-footer"
      className="bg-[#18110c] dark:bg-[#0c0806] text-[#FAF6F0] pt-16 pb-12 border-t border-[#C49232]/30 dark:border-[#d4a244]/25 transition-colors duration-300"
      aria-label="Inkwell Footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#FAF6F0]/15">
          
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4 text-left">
            <WaxSealLogo size="md" variant="dark" />
            <p className="font-newsreader text-base text-[#e8e0cf]/80 leading-relaxed max-w-sm">
              Inkwell is an offline-first novel writing studio. Built to restore the quiet joy of human prose, protected by local-only storage.
            </p>
            <div className="text-xs font-sans-plex text-[#C49232] dark:text-[#d4a244] flex items-center gap-1.5">
              <span>Version 0.4.0 (Development Preview)</span>
              <span>·</span>
              <span className="text-[#FAF6F0]/60">Pure IndexedDB</span>
            </div>
          </div>

          {/* Links Column 1: Product */}
          <div className="md:col-span-2 sm:col-span-4 space-y-3 text-left">
            <div className="font-sans-plex text-xs font-bold tracking-[0.18em] uppercase text-[#C49232] dark:text-[#d4a244]">
              Product
            </div>
            <ul className="space-y-2 text-sm font-sans-plex text-[#FAF6F0]/75">
              <li>
                <a href="#workspaces" className="hover:text-[#FAF6F0] transition-colors">Workbench & Binder</a>
              </li>
              <li>
                <button onClick={onOpenDownload} type="button" className="hover:text-[#FAF6F0] transition-colors text-left cursor-pointer">
                  Download Packages
                </button>
              </li>
              <li>
                <a href="#features" className="hover:text-[#FAF6F0] transition-colors">Capability Specs</a>
              </li>
              <li>
                <a href="#pro-teaser" className="hover:text-[#FAF6F0] transition-colors flex items-center gap-1">
                  <span>Pro Roadmap</span>
                  <span className="text-[10px] bg-[#8B261D] dark:bg-[#8B261D]/80 px-1 py-0.2 rounded text-[#FAF6F0]">Soon</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Resources */}
          <div className="md:col-span-2 sm:col-span-4 space-y-3 text-left">
            <div className="font-sans-plex text-xs font-bold tracking-[0.18em] uppercase text-[#C49232] dark:text-[#d4a244]">
              Resources
            </div>
            <ul className="space-y-2 text-sm font-sans-plex text-[#FAF6F0]/75">
              <li>
                <a href="#philosophy" className="hover:text-[#FAF6F0] transition-colors">Craft Manifesto</a>
              </li>
              <li>
                <a href="#privacy-strip" className="hover:text-[#FAF6F0] transition-colors">Privacy Architecture</a>
              </li>
              <li>
                <a href="#workspaces" className="hover:text-[#FAF6F0] transition-colors">
                  Single-File JSON Backup
                </a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-[#FAF6F0] transition-colors">
                  Open Source Ethics
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Community & Desk */}
          <div className="md:col-span-3 sm:col-span-4 space-y-3 text-left">
            <div className="font-sans-plex text-xs font-bold tracking-[0.18em] uppercase text-[#C49232] dark:text-[#d4a244]">
              Writer Circle
            </div>
            <p className="text-xs font-newsreader text-[#e8e0cf]/75 leading-relaxed">
              Join thousands of fiction writers drafting in distraction-free solitude.
            </p>
            <div className="flex items-center gap-3 pt-1 text-sm text-[#FAF6F0]/80">
              <span className="text-xs font-sans-plex text-[#C49232] dark:text-[#d4a244]">
                Discord Community
              </span>
              <span>·</span>
              <span className="text-xs font-sans-plex text-[#C49232] dark:text-[#d4a244]">
                GitHub Studio
              </span>
            </div>
          </div>

        </div>

        {/* Middle: Literary Quote */}
        <div className="py-8 text-center border-b border-[#FAF6F0]/10">
          <p className="font-display-cormorant text-xl sm:text-2xl italic text-[#FAF6F0]/90 max-w-2xl mx-auto leading-relaxed">
            "A desk, a lamp, a clean sheet of paper, and the stubborn belief that your words matter."
          </p>
          <span className="font-sans-plex text-xs text-[#C49232] dark:text-[#d4a244] uppercase tracking-[0.2em] mt-2 block">
            — The Inkwell Manifesto
          </span>
        </div>

        {/* Bottom Bar: Copyright & Craft Statement */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-sans-plex text-[#FAF6F0]/60 gap-4">
          <div>
            © 2026 Inkwell Novel Studio. All rights reserved. Your words belong to you.
          </div>

          <div className="flex items-center gap-1.5 text-[#e8e0cf]/70">
            <QuillNibIcon className="w-3.5 h-3.5 text-[#8B261D] dark:text-[#d4a244]" />
            <span>Made for writers, by writers.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
