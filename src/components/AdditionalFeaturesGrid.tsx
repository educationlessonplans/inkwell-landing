import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ADDITIONAL_FEATURES } from '../data/content';
import { 
  HourglassIcon,
  SpeedometerIcon,
  SnapshotCameraIcon,
  DiskBackupIcon,
  KeyCommandIcon,
  TrashPapyrusIcon,
  ShieldLockIcon,
  SealCheckIcon
} from './CustomIcons';
import { Sparkles } from 'lucide-react';

interface AdditionalFeaturesGridProps {
  onOpenShortcuts: () => void;
}

export const AdditionalFeaturesGrid: React.FC<AdditionalFeaturesGridProps> = ({ onOpenShortcuts }) => {
  const getFeatureIcon = (name: string) => {
    const iconClass = "w-5 h-5 text-[#8B261D] dark:text-[#d4a244]";
    switch (name) {
      case 'Timer': return <HourglassIcon className={iconClass} />;
      case 'Gauge': return <SpeedometerIcon className={iconClass} />;
      case 'Camera': return <SnapshotCameraIcon className={iconClass} />;
      case 'HardDriveDownload': return <DiskBackupIcon className={iconClass} />;
      case 'Command': return <KeyCommandIcon className={iconClass} />;
      case 'History': return <HourglassIcon className={iconClass} />;
      case 'Trash2': return <TrashPapyrusIcon className={iconClass} />;
      case 'WifiOff': return <ShieldLockIcon className={iconClass} />;
      default: return <HourglassIcon className={iconClass} />;
    }
  };

  return (
    <section 
      id="features" 
      className="py-24 md:py-36 bg-[#FAF6F0] dark:bg-[#120e0b] relative border-b border-[#C49232]/25 dark:border-[#d4a244]/20 transition-colors duration-300 overflow-hidden"
      aria-label="Additional Capabilities"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C49232]/15 dark:bg-[#d4a244]/15 border border-[#C49232]/30 dark:border-[#d4a244]/30 text-xs font-sans-plex font-semibold tracking-[0.2em] text-[#B45309] dark:text-[#d4a244] uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tactile Writer Ergonomics</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#232020] dark:text-[#FAF6F0] leading-tight mb-4"
          >
            A tool that stays out of your way.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-newsreader text-lg text-[#232020]/80 dark:text-[#FAF6F0]/80"
          >
            Crafted with deep respect for the novelist's routine, muscle memory, and sacred focus hours.
          </motion.p>
        </div>

        {/* 8-Card Responsive Bento Grid with Stagger Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ADDITIONAL_FEATURES.map((feat, idx) => (
            <motion.div
              key={feat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="book-cloth-card p-6 flex flex-col justify-between hover:border-[#C49232]/70 dark:hover:border-[#d4a244]/70 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
            >
              {/* Subtle card sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#C49232]/0 via-[#C49232]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#FAF6F0] dark:bg-[#16100c] border border-[#C49232]/35 dark:border-[#d4a244]/30 flex items-center justify-center shadow-xs group-hover:rotate-3 transition-transform">
                    {getFeatureIcon(feat.iconName)}
                  </div>
                  <span className="text-[10px] font-sans-plex font-bold tracking-[0.16em] uppercase text-[#B45309] dark:text-[#d4a244] bg-[#FAF6F0] dark:bg-[#16100c] px-2 py-0.5 rounded border border-[#C49232]/25 dark:border-[#d4a244]/25">
                    {feat.eyebrow}
                  </span>
                </div>

                <h3 className="font-display-cormorant text-xl font-bold text-[#232020] dark:text-[#FAF6F0] mb-2">
                  {feat.title}
                </h3>

                <p className="font-newsreader text-sm sm:text-[15px] text-[#232020]/85 dark:text-[#FAF6F0]/85 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#C49232]/15 dark:border-[#d4a244]/15 flex items-center justify-between text-xs font-sans-plex text-[#8B261D] dark:text-[#d4a244]">
                <span className="font-medium">{feat.detail}</span>
                {feat.id === 'scene-search' ? (
                  <button
                    onClick={onOpenShortcuts}
                    type="button"
                    className="underline text-[11px] font-semibold hover:text-[#721e17] dark:hover:text-[#FAF6F0] cursor-pointer"
                  >
                    View ⌘K
                  </button>
                ) : (
                  <SealCheckIcon className="w-4 h-4 text-[#B45309] dark:text-[#d4a244]" />
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
