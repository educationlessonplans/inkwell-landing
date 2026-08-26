import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  variant?: 'light' | 'dark' | 'brass';
}

export const WaxSealLogo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  variant = 'light',
}) => {
  const sizeMap = {
    sm: { icon: 24, text: 'text-lg', subtext: 'text-[9px]' },
    md: { icon: 32, text: 'text-2xl', subtext: 'text-[10px]' },
    lg: { icon: 44, text: 'text-3xl', subtext: 'text-xs' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`} id="inkwell-brand-logo">
      {/* Wax Seal Emblemed Mark */}
      <div 
        className="relative flex items-center justify-center shrink-0 shadow-sm"
        style={{ width: currentSize.icon, height: currentSize.icon }}
        aria-hidden="true"
      >
        {/* Wax seal organic outline */}
        <svg
          viewBox="0 0 40 40"
          className="w-full h-full text-[#8B261D] filter drop-shadow-[0_2px_4px_rgba(139,38,29,0.3)] transition-transform hover:scale-105"
          fill="currentColor"
        >
          <path d="M20 2C9.5 2 2 9.5 2 20c0 4.2 1.4 8.1 3.8 11.2C5.3 32.5 5 34.5 5 36c0 1.1.9 2 2 2 1.5 0 3.5-.3 4.8-.8C14.9 38.6 17.3 39 20 39c10.5 0 19-7.5 19-19S30.5 2 20 2zm0 30c-6.6 0-12-5.4-12-12s5.4-12 12-12 12 5.4 12 12-5.4 12-12 12z" />
          {/* Inner ring */}
          <circle cx="20" cy="20" r="13" fill="#721E17" opacity="0.8" />
          {/* Stylized nib / drop */}
          <path
            d="M20 10l3.5 8.5c.3.8-.2 1.5-1 1.5h-5c-.8 0-1.3-.7-1-1.5L20 10zm-1.5 11h3v4.5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5V21z"
            fill="#FAF6F0"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-display-cormorant font-bold tracking-tight ${currentSize.text} ${
                variant === 'dark'
                  ? 'text-[#FAF6F0]'
                  : 'text-[#232020] dark:text-[#FAF6F0]'
              }`}
            >
              Inkwell
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-sans-plex font-medium tracking-wider uppercase bg-[#C49232]/15 dark:bg-[#d4a244]/20 text-[#B45309] dark:text-[#d4a244] border border-[#C49232]/30 dark:border-[#d4a244]/30">
              v0.4.0
            </span>
          </div>
          <span
            className={`font-sans-plex tracking-[0.14em] uppercase font-medium ${currentSize.subtext} ${
              variant === 'dark'
                ? 'text-[#e8e0cf]/80'
                : 'text-[#8B261D]/80 dark:text-[#d4a244]/90'
            }`}
          >
            Offline Novel Studio
          </span>
        </div>
      )}
    </div>
  );
};
