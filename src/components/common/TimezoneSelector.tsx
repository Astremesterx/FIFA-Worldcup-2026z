import { useState, useRef, useEffect } from 'react';
import { useTimezone, TIMEZONES } from '../../contexts/TimezoneContext';

export default function TimezoneSelector() {
  const { timezone, setTimezone } = useTimezone();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 md:gap-1.5 text-secondary dark:text-secondary-fixed-dim hover:backdrop-blur-3xl transition-all duration-300 scale-95 active:scale-90 bg-white/5 border border-white/10 rounded-full px-2 py-1 md:px-2.5 md:py-1 shrink-0 whitespace-nowrap"
        aria-label="Select Region and Timezone"
      >
        <span className="material-symbols-outlined text-[16px] md:text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>language</span>
        <span className="font-label-caps text-[9px] md:text-[10px] hidden sm:inline-block tracking-widest mt-0.5">REGION/TIME</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-surface-container-high/90 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl overflow-y-auto max-h-80 z-50">
          <div className="flex flex-col py-1">
            {TIMEZONES.map((tz) => (
              <button
                key={tz.value}
                onClick={() => {
                  setTimezone(tz.value);
                  setIsOpen(false);
                }}
                className={`text-left px-4 py-2 text-sm font-body-md transition-colors ${
                  timezone === tz.value 
                    ? 'bg-secondary/20 text-secondary border-l-2 border-secondary' 
                    : 'text-on-surface hover:bg-white/10 border-l-2 border-transparent'
                }`}
              >
                {tz.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
