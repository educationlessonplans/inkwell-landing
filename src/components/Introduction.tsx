import React, { useState } from 'react';
import { motion } from 'motion/react';
import { WHO_ITS_FOR } from '../data/content';
import { Feather, Compass, ShieldCheck, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { QuillNibIcon, AntiqueReadingLampIcon, SealCheckIcon, CompassRoseIcon } from './CustomIcons';

export const Introduction: React.FC = () => {
  const [ambientSound, setAmbientSound] = useState<'rain' | 'hearth' | 'silence'>('silence');

  const getIcon = (name: string) => {
    switch (name) {
      case 'Feather':
        return <QuillNibIcon className="w-5 h-5 text-[#8B261D] dark:text-[#d4a244]" />;
      case 'Compass':
        return <CompassRoseIcon className="w-5 h-5 text-[#B45309] dark:text-[#d4a244]" />;
      case 'ShieldCheck':
        return <SealCheckIcon className="w-5 h-5 text-[#26382d] dark:text-[#86efac]" />;
      default:
        return <QuillNibIcon className="w-5 h-5 text-[#8B261D] dark:text-[#d4a244]" />;
    }
  };

  return (
    <section 
      id="philosophy"
      className="py-24 md:py-36 bg-[#FAF6F0] dark:bg-[#120e0b] relative border-t border-[#C49232]/20 dark:border-[#d4a244]/20 transition-colors duration-300 overflow-hidden"
      aria-label="Introduction to Inkwell"
    >
      {/* Centered Editorial Column */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Eyebrow */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C49232]/15 dark:bg-[#d4a244]/15 border border-[#C49232]/30 dark:border-[#d4a244]/30 text-xs font-sans-plex font-semibold tracking-[0.2em] text-[#B45309] dark:text-[#d4a244] uppercase mb-6"
        >
          <AntiqueReadingLampIcon className="w-3.5 h-3.5" />
          <span>The Human Manifesto</span>
        </motion.div>

        {/* Serif Headline with dynamic staggered animation */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display-cormorant text-3xl sm:text-5xl lg:text-6xl font-bold text-[#232020] dark:text-[#FAF6F0] leading-tight mb-8"
        >
          A novel is made of human intention, <br className="hidden sm:inline" />
          <span className="italic font-display-playfair text-[#8B261D] dark:text-[#d4a244] underline decoration-[#C49232]/40 decoration-wavy underline-offset-8">
            not synthetic shortcuts.
          </span>
        </motion.h2>

        {/* Narrative Body Copy */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-[760px] mx-auto space-y-6 text-left sm:text-center"
        >
          <p className="font-newsreader text-lg sm:text-2xl text-[#232020] dark:text-[#FAF6F0] leading-[1.7] font-medium">
            Inkwell is a novel-writing studio that honors your words and guards your privacy. No login walls. No telemetry. No cloud subscription to hold your unfinished manuscript hostage.
          </p>
          <p className="font-newsreader text-base sm:text-lg text-[#232020]/80 dark:text-[#FAF6F0]/80 leading-[1.75]">
            While modern tools race to generate prose for you, Inkwell is built strictly for the author who loves the tactile labor of drafting, plotting, and refining every line of human truth.
          </p>
        </motion.div>

        {/* Ambient Atmosphere Sound Preview Strip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="my-10 p-3 rounded-2xl bg-[#F3ECDD] dark:bg-[#1c1510] border border-[#C49232]/30 dark:border-[#d4a244]/25 max-w-lg mx-auto flex items-center justify-between shadow-xs"
        >
          <div className="flex items-center gap-2 text-xs font-sans-plex text-[#232020]/80 dark:text-[#FAF6F0]/80">
            {ambientSound === 'silence' ? (
              <VolumeX className="w-4 h-4 text-[#8B261D] dark:text-[#d4a244]" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#26382d] dark:text-[#86efac] animate-pulse" />
            )}
            <span className="font-semibold">Desk Atmosphere:</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-sans-plex">
            {[
              { id: 'silence', label: 'Quiet Room' },
              { id: 'rain', label: 'Window Rain' },
              { id: 'hearth', label: 'Hearthfire' },
            ].map((snd) => (
              <button
                key={snd.id}
                onClick={() => setAmbientSound(snd.id as any)}
                type="button"
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  ambientSound === snd.id
                    ? 'bg-[#8B261D] text-[#FAF6F0] shadow-xs'
                    : 'bg-[#FAF6F0] dark:bg-[#150f0c] text-[#232020]/80 dark:text-[#FAF6F0]/80 hover:bg-[#F3ECDD]'
                }`}
              >
                {snd.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Brass divider rule */}
        <div className="w-24 h-[1px] bg-[#C49232]/40 dark:bg-[#d4a244]/40 mx-auto my-12" aria-hidden="true" />

        {/* 3-Item "Who It's For" Row with 3D Hover Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {WHO_ITS_FOR.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 * idx }}
              className="book-cloth-card p-6 sm:p-7 flex flex-col justify-between hover:border-[#C49232]/70 dark:hover:border-[#d4a244]/70 transition-all hover:-translate-y-1.5 duration-300 group shadow-md"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] dark:bg-[#16100c] border border-[#C49232]/35 dark:border-[#d4a244]/35 flex items-center justify-center mb-5 shadow-xs group-hover:scale-110 transition-transform">
                  {getIcon(item.icon)}
                </div>
                <h3 className="font-display-cormorant text-2xl font-bold text-[#232020] dark:text-[#FAF6F0] mb-2.5">
                  {item.label}
                </h3>
                <p className="font-newsreader text-sm sm:text-[15px] text-[#232020]/85 dark:text-[#FAF6F0]/85 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#C49232]/20 dark:border-[#d4a244]/20 flex items-center justify-between text-xs font-sans-plex font-medium text-[#8B261D] dark:text-[#d4a244]">
                <span>Engineered for your instinct</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
