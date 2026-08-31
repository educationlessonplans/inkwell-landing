import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export const DynamicBottomBar = () => {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const dismissedFlag = sessionStorage.getItem('inkwell:cta:dismissed') === '1';
    setDismissed(dismissedFlag);
    const handleScroll = () => {
      setShow(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('inkwell:cta:dismissed', '1');
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-[#232020]/95 dark:bg-[#1a1a1a]/95 backdrop-blur-md border-t border-[#FAF6F0]/10 shadow-2xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#FAF6F0]/10 text-[#FAF6F0] font-display-cormorant font-bold text-sm">
              I
            </span>
            <div className="min-w-0">
              <div className="text-[#FAF6F0] font-sans-plex font-semibold text-sm truncate">
                Ready to write?
              </div>
              <div className="text-[#FAF6F0]/70 text-xs font-sans-plex hidden sm:block">
                Open the app · local writing starts without an account · paid offers coming soon
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/inkwell/app/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FAF6F0] text-[#232020] font-sans-plex font-semibold text-sm hover:bg-white transition-colors"
            >
              <span className="hidden xs:inline">Open app</span>
              <span className="xs:hidden">Open</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#pricing"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#FAF6F0]/20 text-[#FAF6F0] font-sans-plex font-semibold text-sm hover:bg-[#FAF6F0]/10 transition-colors"
            >
              See plans
            </a>
            <button
              onClick={handleDismiss}
              aria-label="Dismiss bar"
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-[#FAF6F0]/70 hover:text-[#FAF6F0] hover:bg-[#FAF6F0]/10 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
