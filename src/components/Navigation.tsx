import React, { useState } from 'react';
import { Volume2, VolumeX, Compass, Sparkles } from 'lucide-react';
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
      {/* Top Floating Bar: Brand + Quick Chapter Nav + Sound Atmosphere */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-5 md:px-10 flex items-center justify-between pointer-events-none">
        {/* Left: Brand Wordmark */}
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            onClick={() => onNavigateToChapter(0)}
            className="text-left group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#C98B6B] focus-visible:outline-none px-3.5 py-2 rounded-xl bg-[rgba(255,248,238,0.86)] backdrop-blur-[14px] border border-[rgba(73,59,50,0.16)] shadow-xs transition-all hover:bg-[rgba(255,250,242,0.95)]"
          >
            <span className="font-display font-semibold text-lg md:text-xl tracking-[0.04em] text-[#493B32] block transition-colors duration-200 group-hover:text-[#C98B6B]">
              {OWNER_INFO.brandName}
            </span>
            <span className="text-[13px] tracking-wide text-[#76685D] hidden sm:block">
              {OWNER_INFO.tagline}
            </span>
          </button>
        </div>

        {/* Center: Desktop Chapter Nav with Guaranteed Contrast */}
        <nav
          aria-label="Cinematic Chapters"
          className="hidden lg:flex items-center gap-6 pointer-events-auto bg-[rgba(255,248,238,0.86)] backdrop-blur-[14px] px-6 py-2.5 rounded-full border border-[rgba(73,59,50,0.16)] shadow-xs"
        >
          {CHAPTERS.map((ch, idx) => {
            const isActive = currentChapterIndex === idx;
            return (
              <button
                key={ch.id}
                onClick={() => onNavigateToChapter(idx)}
                className={`relative text-[14px] font-medium tracking-wide transition-colors duration-200 cursor-pointer py-1 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C98B6B] rounded ${
                  isActive
                    ? 'text-[#C98B6B] font-semibold'
                    : 'text-[#493B32] hover:text-[#8FA7A0]'
                }`}
              >
                <span>{ch.id} {ch.title}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-1 right-1 h-[2px] bg-[#C98B6B] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Audio Atmosphere & Mobile Trigger */}
        <div className="pointer-events-auto flex items-center gap-3">
          {/* Ambient Soundscape Controller */}
          <button
            onClick={toggleSound}
            aria-label={audioActive ? 'Mute ambient sound' : 'Unmute cozy ambient vinyl sound'}
            title={audioActive ? 'Mute ambient tape audio' : 'Play cozy ambient tape audio'}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[rgba(255,248,238,0.86)] backdrop-blur-[14px] hover:bg-[rgba(255,250,242,0.96)] text-[#493B32] border border-[rgba(73,59,50,0.16)] text-sm font-medium transition-all duration-200 shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-[#C98B6B]"
          >
            {audioActive ? (
              <>
                <Volume2 className="w-4 h-4 text-[#C98B6B] animate-pulse" />
                <span className="hidden sm:inline text-xs tracking-wider uppercase text-[#493B32] font-semibold">
                  Audio • On
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-[#76685D]" />
                <span className="hidden sm:inline text-xs tracking-wider uppercase text-[#76685D]">
                  Soundscape
                </span>
              </>
            )}
          </button>

          {/* Mobile chapter menu drawer trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle chapter menu"
            className="lg:hidden p-2.5 rounded-full bg-[rgba(255,248,238,0.86)] backdrop-blur-[14px] border border-[rgba(73,59,50,0.16)] text-[#493B32] hover:text-[#C98B6B] cursor-pointer"
          >
            <Compass className="w-5 h-5 text-[#493B32]" />
          </button>
        </div>
      </header>

      {/* Mobile Chapter Drawer Modal */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[rgba(255,248,238,0.96)] backdrop-blur-xl flex flex-col justify-between p-8 lg:hidden animate-fade-in border border-[rgba(73,59,50,0.16)]">
          <div className="flex items-center justify-between">
            <span className="font-display text-xl font-semibold text-[#493B32]">
              {OWNER_INFO.brandName}
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold tracking-wider text-[#76685D] hover:text-[#493B32] p-2 rounded-lg bg-[rgba(244,232,213,0.6)]"
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
                className={`text-left text-2xl font-display tracking-wide transition-colors py-1 ${
                  currentChapterIndex === idx ? 'text-[#C98B6B] font-bold' : 'text-[#493B32] hover:text-[#8FA7A0]'
                }`}
              >
                <span className="text-sm font-sans text-[#76685D] mr-3">{ch.id}</span>
                {ch.title}
              </button>
            ))}
          </div>

          <div className="text-sm text-[#76685D] flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-[rgba(73,59,50,0.16)] pt-4 gap-1">
            <span className="font-medium text-[#493B32]">Curated by {OWNER_INFO.curator}</span>
            <span className="text-xs text-[#76685D]">{OWNER_INFO.qualification}</span>
          </div>
        </div>
      )}

      {/* Floating Bottom Left: Chapter Counter Indicator */}
      <div className="fixed bottom-6 left-6 md:left-10 z-30 pointer-events-none select-none flex items-center gap-3">
        <div className="flex items-baseline gap-1.5 bg-[rgba(255,248,238,0.88)] backdrop-blur-[14px] px-4 py-2 rounded-full border border-[rgba(73,59,50,0.16)] shadow-xs">
          <span className="font-mono text-base font-bold text-[#493B32] tabular-nums">
            {currentCh.id}
          </span>
          <span className="text-sm text-[#76685D] font-mono">/ 06</span>
          <span className="text-xs uppercase tracking-wider text-[#76685D] ml-2 hidden sm:inline font-semibold">
            {currentCh.title}
          </span>
        </div>

        {/* Dynamic Object Hover Hint Badge (Warm Espresso & Champagne) */}
        {hoveredObjectName && (
          <div className="animate-fade-in hidden md:flex items-center gap-2 bg-[#493B32] text-[#FFF9F1] text-sm px-3.5 py-1.5 rounded-full shadow-md border border-[#C98B6B]/40">
            <Sparkles className="w-3.5 h-3.5 text-[#D6B46A] animate-spin" />
            <span className="truncate max-w-xs font-medium">{hoveredObjectName}</span>
            <span className="text-xs text-[#F4E8D5] ml-1">· Click to inspect</span>
          </div>
        )}
      </div>

      {/* Floating Right Edge: Subtle Scroll Progress Line */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-30 pointer-events-none hidden md:flex flex-col items-center gap-2">
        <div className="w-[3px] h-28 bg-[rgba(73,59,50,0.14)] rounded-full relative overflow-hidden">
          <div
            className="w-full bg-[#C98B6B] rounded-full transition-all duration-150 ease-out"
            style={{
              height: `${Math.max(8, Math.min(100, scrollProgress * 100))}%`,
            }}
          />
        </div>
        <span className="text-xs font-mono text-[#76685D] font-semibold tabular-nums">
          {Math.round(scrollProgress * 100)}%
        </span>
      </div>
    </>
  );
};
