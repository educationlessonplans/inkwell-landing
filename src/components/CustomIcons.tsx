import React from 'react';

/**
 * Bespoke Hand-Crafted Vector Icons & Visual Motifs for Inkwell
 * Replaces generic emojis with custom-rendered literary SVG artwork.
 */

export const QuillNibIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L3 12.5V21h8.5l8.74-8.76z" />
    <path d="M16 8L2 22" />
    <path d="M17.5 15H9" />
  </svg>
);

export const BrassStarIcon: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <polygon points="12,2 15,9 22,12 15,15 12,22 9,15 2,12 9,9" opacity="0.95" />
    <circle cx="12" cy="12" r="1.8" fill="#FAF6F0" />
  </svg>
);

export const InkDropIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    <circle cx="12" cy="14" r="2.5" fill="currentColor" fillOpacity="0.25" />
  </svg>
);

export const AntiqueLampIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 2h6l2 7H7L9 2z" />
    <path d="M12 9v7" />
    <path d="M8 20h8" />
    <path d="M10 16h4v4h-4z" />
    <circle cx="12" cy="5.5" r="1" fill="currentColor" />
  </svg>
);

export const AntiqueReadingLampIcon = AntiqueLampIcon;

export const ManuscriptScrollIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 17V5a2 2 0 0 0-2-2H4" />
    <path d="M8 21h12a2 2 0 0 0 2-2v-2H10a2 2 0 0 0-2 2v2z" />
    <path d="M4 19a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h15" />
    <line x1="8" y1="8" x2="15" y2="8" />
    <line x1="8" y1="12" x2="13" y2="12" />
  </svg>
);

export const SealCheckIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" strokeWidth="2.2" />
  </svg>
);

export const CraftCompassIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

export const CompassRoseIcon = CraftCompassIcon;

export const AnalyticsGraphIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
    <circle cx="19" cy="9" r="1.5" fill="currentColor" />
  </svg>
);

export const BookCoverEmblem: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 32 32" fill="currentColor" className={className}>
    <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="16" cy="16" r="10" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    <polygon points="16,6 18.5,13.5 26,16 18.5,18.5 16,26 13.5,18.5 6,16 13.5,13.5" />
  </svg>
);

export const HourglassIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 22h14" />
    <path d="M5 2h14" />
    <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
    <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
    <circle cx="12" cy="17" r="1" fill="currentColor" />
  </svg>
);

export const SpeedometerIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2a10 10 0 0 0-7.07 17.07l1.41-1.41A8 8 0 1 1 19.66 17.66l1.41 1.41A10 10 0 0 0 12 2z" />
    <line x1="12" y1="12" x2="16" y2="8" strokeWidth="2.2" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

export const SnapshotCameraIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3.5" strokeWidth="1.8" />
    <circle cx="17.5" cy="10" r="1" fill="currentColor" />
  </svg>
);

export const DiskBackupIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M8 3v5h8V3" />
    <path d="M8 21v-7h8v7" />
    <circle cx="12" cy="17.5" r="1.5" fill="currentColor" />
  </svg>
);

export const KeyCommandIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
  </svg>
);

export const TrashPapyrusIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

export const ShieldLockIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <rect x="9.5" y="10" width="5" height="4.5" rx="1" strokeWidth="1.5" />
    <path d="M10.5 10V8.5a1.5 1.5 0 0 1 3 0V10" strokeWidth="1.5" />
  </svg>
);

export const SearchLensIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2.2" />
  </svg>
);
