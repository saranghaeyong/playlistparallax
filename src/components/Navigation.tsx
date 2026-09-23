import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Compass } from 'lucide-react';
import { CHAPTERS, OWNER_INFO } from '../data/portfolioData';
import { ambientAudio } from '../utils/ambientAudio';

interface NavigationProps {
  currentChapterIndex: number;
  scrollProgress: number;
  onNavigateToChapter: (index: number) => void;
  hoveredObjectName?: string | null;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentChapterIndex,
  scrollProgress,
  onNavigateToChapter,
  hoveredObjectName,
}) => {
  const [audioActive, setAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const active = ambientAudio.toggle();
    setAudioActive(active);
  };

  const currentCh = CHAPTERS[currentChapterIndex] || CHAPTERS[0];

  return (
    <>
      {/* Top Floating Bar: Brand + Quick Chapter Nav + Sound Toggle */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-5 md:px-10 flex items-center justify-between pointer-events-none">
        {/* Left: Brand Wordmark (Single text element adhering to constitution) */}
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            onClick={() => onNavigateToChapter(0)}
            className="text-left group cursor-pointer focus-visible:ring-1 focus-visible:ring-[#18181B] focus-visible:outline-none"
          >
            <span className="font-display font-semibold text-lg md:text-xl tracking-[0.12em] text-[#18181B] block transition-colors duration-200 group-hover:text-[#8C7A5B]">
              {OWNER_INFO.brandName}
            </span>
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#71717A] hidden sm:block">
              {OWNER_INFO.tagline}
            </span>
          </button>
        </div>

        {/* Center: Desktop Minimal Chapter Bar */}
        <nav
          aria-label="Cinematic Chapters"
          className="hidden lg:flex items-center gap-7 pointer-events-auto bg-[#FAF8F5]/80 backdrop-blur-md px-6 py-2.5 rounded-full border border-[#E8E2D8] shadow-xs"
        >
          {CHAPTERS.map((ch, idx) => {
            const isActive = currentChapterIndex === idx;
            return (
              <button
                key={ch.id}
                onClick={() => onNavigateToChapter(idx)}
                className={`relative text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-200 cursor-pointer py-1 ${
                  isActive ? 'text-[#18181B] font-semibold' : 'text-[#78716C] hover:text-[#18181B]'
                }`}
              >
                <span>{ch.id} {ch.title}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B8985B]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Audio Atmosphere & External Quicklinks */}
        <div className="pointer-events-auto flex items-center gap-3">
          {/* Ambient Soundscape Controller */}
          <button
            onClick={toggleSound}
            aria-label={audioActive ? 'Mute ambient sound' : 'Unmute cozy ambient vinyl sound'}
            title={audioActive ? 'Mute ambient tape audio' : 'Play cozy ambient tape audio'}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#FAF8F5]/85 hover:bg-[#F2ECE1] text-[#292524] border border-[#E5DFD4] text-xs transition-all duration-200 shadow-xs cursor-pointer focus-visible:ring-1 focus-visible:ring-[#18181B]"
          >
            {audioActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#A37E3E] animate-pulse" />
                <span className="hidden sm:inline font-sans text-[11px] uppercase tracking-wider text-[#78716C]">
                  Tape Audio • On
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#78716C]" />
                <span className="hidden sm:inline font-sans text-[11px] uppercase tracking-wider text-[#78716C]">
                  Sound Atmosphere
                </span>
              </>
            )}
          </button>

          {/* Mobile chapter menu drawer trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle chapter menu"
            className="lg:hidden p-2 rounded-full bg-[#FAF8F5]/85 border border-[#E5DFD4] text-[#292524] cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#78716C]" />
          </button>
        </div>
      </header>

      {/* Mobile Chapter Drawer Modal */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-lg flex flex-col justify-between p-8 lg:hidden animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="font-display text-lg tracking-wider text-[#18181B]">
              {OWNER_INFO.brandName}
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase tracking-widest text-[#78716C] p-2"
            >
              Close ✕
            </button>
          </div>

          <div className="flex flex-col gap-5 my-auto">
            {CHAPTERS.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => {
                  onNavigateToChapter(idx);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-xl font-display tracking-wider transition-colors ${
                  currentChapterIndex === idx ? 'text-[#A37E3E] font-bold' : 'text-[#44403C]'
                }`}
              >
                <span className="text-xs font-sans text-[#A8A29E] mr-3">{ch.id}</span>
                {ch.title}
              </button>
            ))}
          </div>

          <div className="text-xs text-[#78716C] flex items-center justify-between border-t border-[#E8E2D8] pt-4">
            <span>Curated by {OWNER_INFO.curator}</span>
            <span>{OWNER_INFO.qualification}</span>
          </div>
        </div>
      )}

      {/* Floating Bottom Left: Chapter Counter Indicator (01 / 06) */}
      <div className="fixed bottom-6 left-6 md:left-10 z-30 pointer-events-none select-none flex items-center gap-3">
        <div className="flex items-baseline gap-1 bg-[#FAF8F5]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#E5DFD4] shadow-xs">
          <span className="font-mono text-sm font-semibold text-[#18181B] tabular-nums">
            {currentCh.id}
          </span>
          <span className="text-xs text-[#A8A29E] font-mono">/ 06</span>
          <span className="text-[11px] uppercase tracking-wider text-[#78716C] ml-2 hidden sm:inline">
            {currentCh.title}
          </span>
        </div>

        {/* Dynamic Object Hover Hint Badge */}
        {hoveredObjectName && (
          <div className="animate-fade-in hidden md:flex items-center gap-1.5 bg-[#18181B] text-[#FAF8F5] text-xs px-3 py-1.5 rounded-full shadow-md">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E5C170] animate-ping" />
            <span className="truncate max-w-xs">{hoveredObjectName}</span>
            <span className="text-[10px] text-[#A1A1AA] ml-1">· Click to inspect</span>
          </div>
        )}
      </div>

      {/* Floating Right Edge: Subtle Scroll Progress Line */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-30 pointer-events-none hidden md:flex flex-col items-center gap-2">
        <div className="w-[2px] h-28 bg-[#E5DFD4] rounded-full relative overflow-hidden">
          <div
            className="w-full bg-[#A37E3E] rounded-full transition-all duration-150 ease-out"
            style={{
              height: `${Math.max(6, Math.min(100, scrollProgress * 100))}%`,
            }}
          />
        </div>
        <span className="text-[9px] font-mono text-[#A8A29E] tracking-tighter">
          {Math.round(scrollProgress * 100)}%
        </span>
      </div>
    </>
  );
};
