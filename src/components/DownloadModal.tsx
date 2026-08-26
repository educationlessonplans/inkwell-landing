import React, { useState } from 'react';
import { DOWNLOAD_ACTIONS } from '../data/content';
import { WaxSealLogo } from './WaxSealLogo';
import { X, Download, Globe, Laptop, Terminal, Apple } from 'lucide-react';
import { SealCheckIcon, ShieldLockIcon } from './CustomIcons';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [downloadStarted, setDownloadStarted] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownload = (actionId: string) => {
    setDownloadStarted(actionId);
    setTimeout(() => {
      // simulate realistic download feedback
    }, 400);
  };

  const getPlatformIcon = (iconName: string) => {
    switch (iconName) {
      case 'Apple': return <Apple className="w-5 h-5 text-[#8B261D] dark:text-[#d4a244]" />;
      case 'Laptop': return <Laptop className="w-5 h-5 text-[#B45309] dark:text-[#d4a244]" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-[#26382d] dark:text-[#4E7A5A]" />;
      case 'Globe': return <Globe className="w-5 h-5 text-[#8B261D] dark:text-[#d4a244]" />;
      default: return <Download className="w-5 h-5 text-[#8B261D] dark:text-[#d4a244]" />;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18110c]/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-modal-title"
      onClick={onClose}
    >
      <div 
        className="bg-[#FAF6F0] dark:bg-[#19120e] rounded-2xl border-2 border-[#C49232]/40 dark:border-[#d4a244]/30 shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative overflow-hidden transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-lg text-[#232020]/60 dark:text-[#FAF6F0]/60 hover:text-[#232020] dark:hover:text-[#FAF6F0] hover:bg-[#F3ECDD] dark:hover:bg-[#251b14] transition-colors cursor-pointer"
          aria-label="Close download modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <WaxSealLogo size="sm" showText={false} />
          <div>
            <h3 id="download-modal-title" className="font-display-cormorant text-2xl sm:text-3xl font-bold text-[#232020] dark:text-[#FAF6F0]">
              Get Inkwell — Free
            </h3>
            <span className="text-xs font-sans-plex text-[#B45309] dark:text-[#d4a244] font-medium">
              Free during development · Fully private · No account needed
            </span>
          </div>
        </div>

        <p className="font-newsreader text-sm sm:text-base text-[#232020]/80 dark:text-[#FAF6F0]/80 mb-6 leading-relaxed">
          Open the Inkwell web app instantly in your browser, or explore the source code on GitHub. Your manuscript never touches our servers—everything runs 100% locally on your machine.
        </p>

        {/* Packages List */}
        <div className="space-y-3 max-h-[340px] overflow-y-auto parchment-scroll pr-1">
          {DOWNLOAD_ACTIONS.map((pkg, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#F3ECDD]/60 dark:bg-[#221812] hover:bg-[#F3ECDD] dark:hover:bg-[#291e16] border border-[#C49232]/30 dark:border-[#d4a244]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#FAF6F0] dark:bg-[#16100c] border border-[#C49232]/25 dark:border-[#d4a244]/25 flex items-center justify-center shrink-0 shadow-2xs">
                  {getPlatformIcon(pkg.icon)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-sans-plex text-sm font-bold text-[#232020] dark:text-[#FAF6F0]">
                      {pkg.os}
                    </span>
                    <span className="text-xs font-sans-plex text-[#8B261D] dark:text-[#d4a244] font-medium">
                      ({pkg.variant})
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-[#232020]/60 dark:text-[#FAF6F0]/60">
                    {pkg.filename} · {pkg.size}
                  </div>
                </div>
              </div>

              <div>
                <a
                  href={pkg.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleDownload(pkg.id)}
                  className={`w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-sans-plex font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    downloadStarted === pkg.id
                      ? 'bg-[#26382d] text-[#FAF6F0]'
                      : 'btn-wax-seal'
                  }`}
                >
                  {downloadStarted === pkg.id ? (
                    <>
                      <SealCheckIcon className="w-3.5 h-3.5 text-[#FAF6F0]" />
                      <span>Opened</span>
                    </>
                  ) : pkg.id === 'web-app' ? (
                    <>
                      <Globe className="w-3.5 h-3.5" />
                      <span>Open Inkwell — Free</span>
                    </>
                  ) : (
                    <>
                      <Terminal className="w-3.5 h-3.5" />
                      <span>View Source on GitHub</span>
                    </>
                  )}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance Footer in Modal */}
        <div className="mt-6 pt-4 border-t border-[#C49232]/20 dark:border-[#d4a244]/20 flex flex-col sm:flex-row items-center justify-between text-xs font-sans-plex text-[#232020]/70 dark:text-[#FAF6F0]/70 gap-2">
          <div className="flex items-center gap-1 text-[#26382d] dark:text-[#4E7A5A]">
            <ShieldLockIcon className="w-4 h-4 text-[#26382d] dark:text-[#4E7A5A]" />
            <span>SHA-256 Verified · 100% Client-Side IndexedDB</span>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="text-[#8B261D] dark:text-[#d4a244] font-medium hover:underline text-xs cursor-pointer"
          >
            Back to page
          </button>
        </div>

      </div>
    </div>
  );
};
