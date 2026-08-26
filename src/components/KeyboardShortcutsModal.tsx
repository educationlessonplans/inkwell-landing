import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { KeyCommandIcon, SearchLensIcon } from './CustomIcons';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const shortcuts = [
    { key: '⌘ + E', label: 'Toggle Zen / Distraction-Free Mode', category: 'Workbench' },
    { key: '⌘ + T', label: 'Toggle Typewriter Centered Scrolling', category: 'Workbench' },
    { key: '⌘ + S', label: 'Take Local Manuscript Snapshot Now', category: 'Safety' },
    { key: '⌘ + B', label: 'Switch to Binder (Corkboard Overview)', category: 'Navigation' },
    { key: '⌘ + L', label: 'Switch to Ledger (Character & Lore)', category: 'Navigation' },
    { key: '⌘ + Shift + S', label: 'Start 25-Min Writing Sprint Timer', category: 'Focus' },
    { key: '⌘ + F', label: 'Full-Text Find & Replace in Scene', category: 'Workbench' },
    { key: '⌘ + Shift + E', label: 'Export Single-File JSON Rescue Bundle', category: 'Backup' },
  ];

  const filtered = shortcuts.filter((s) =>
    s.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18110c]/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-title"
      onClick={onClose}
    >
      <div
        className="bg-[#FAF6F0] dark:bg-[#19120e] rounded-2xl border-2 border-[#C49232]/40 dark:border-[#d4a244]/30 shadow-2xl max-w-xl w-full p-6 relative transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-lg text-[#232020]/60 dark:text-[#FAF6F0]/60 hover:text-[#232020] dark:hover:text-[#FAF6F0] hover:bg-[#F3ECDD] dark:hover:bg-[#251b14] transition-colors cursor-pointer"
          aria-label="Close command palette"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <KeyCommandIcon className="w-5 h-5 text-[#8B261D] dark:text-[#d4a244]" />
          <h3 id="shortcuts-title" className="font-display-cormorant text-2xl font-bold text-[#232020] dark:text-[#FAF6F0]">
            Inkwell Command Palette & Keystrokes
          </h3>
        </div>

        {/* Search Input */}
        <div className="relative mb-4">
          <SearchLensIcon className="w-4 h-4 text-[#B45309] dark:text-[#d4a244] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search commands, views, or shortcuts..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F3ECDD]/70 dark:bg-[#221812] border border-[#C49232]/35 dark:border-[#d4a244]/30 text-sm font-sans-plex text-[#232020] dark:text-[#FAF6F0] placeholder-[#232020]/50 dark:placeholder-[#FAF6F0]/50 outline-none focus:border-[#8B261D] dark:focus:border-[#d4a244] focus:ring-1 focus:ring-[#8B261D] dark:focus:ring-[#d4a244]"
            autoFocus
          />
        </div>

        {/* List of shortcuts */}
        <div className="space-y-2 max-h-[300px] overflow-y-auto parchment-scroll pr-1">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-[#FAF6F0] dark:bg-[#1f1610] hover:bg-[#F3ECDD] dark:hover:bg-[#291e16] border border-[#C49232]/20 dark:border-[#d4a244]/20 flex items-center justify-between transition-colors"
            >
              <div className="space-y-0.5">
                <span className="text-sm font-sans-plex font-medium text-[#232020] dark:text-[#FAF6F0]">
                  {item.label}
                </span>
                <div className="text-[10px] font-sans-plex uppercase tracking-wider text-[#B45309] dark:text-[#d4a244]">
                  {item.category}
                </div>
              </div>
              <kbd className="px-2.5 py-1 rounded bg-[#F3ECDD] dark:bg-[#2c1f17] border border-[#C49232]/30 dark:border-[#d4a244]/30 text-xs font-mono font-semibold text-[#8B261D] dark:text-[#d4a244] shadow-2xs">
                {item.key}
              </kbd>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-6 text-sm font-newsreader text-[#232020]/60 dark:text-[#FAF6F0]/60">
              No matching commands found.
            </div>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-[#C49232]/20 dark:border-[#d4a244]/20 flex items-center justify-between text-xs font-sans-plex text-[#232020]/60 dark:text-[#FAF6F0]/60">
          <span>Tip: Press <kbd className="font-mono bg-[#F3ECDD] dark:bg-[#251b14] px-1.5 py-0.5 rounded border border-[#C49232]/30 dark:border-[#d4a244]/30">ESC</kbd> to exit</span>
          <span className="text-[#8B261D] dark:text-[#d4a244]">Sub-millisecond keyboard navigation</span>
        </div>
      </div>
    </div>
  );
};
