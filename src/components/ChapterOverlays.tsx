import React from 'react';
import { ExternalLink, Disc, Film, Sparkles, ChevronDown } from 'lucide-react';
import {
  OWNER_INFO,
  musicItems,
  cinemaItems,
  instagramItems,
  letterboxdItems,
} from '../data/portfolioData';
import { SelectedObjectPayload } from './CinematicCanvas';

interface ChapterOverlaysProps {
  scrollProgress: number; // 0 to 1
  onSelectObject: (payload: SelectedObjectPayload) => void;
  onScrollNext: () => void;
}

// Calculate smooth opacity curve for each chapter section
const getChapterOpacity = (progress: number, center: number, span: number = 0.12): number => {
  const dist = Math.abs(progress - center);
  if (dist > span) return 0;
  return Math.cos((dist / span) * (Math.PI / 2));
};

export const ChapterOverlays: React.FC<ChapterOverlaysProps> = ({
  scrollProgress,
  onSelectObject,
  onScrollNext,
}) => {
  // Center targets for each chapter
  const op1 = getChapterOpacity(scrollProgress, 0.02, 0.12);
  const op2 = getChapterOpacity(scrollProgress, 0.20, 0.13);
  const op3 = getChapterOpacity(scrollProgress, 0.40, 0.13);
  const op4 = getChapterOpacity(scrollProgress, 0.60, 0.13);
  const op5 = getChapterOpacity(scrollProgress, 0.80, 0.13);
  const op6 = getChapterOpacity(scrollProgress, 0.98, 0.12);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* =====================================================================
          CHAPTER 01 — PLAYLIST_BGM (Opening Scene)
      ====================================================================== */}
      <div
        style={{
          opacity: op1,
          transform: `translateY(${(1 - op1) * 24}px)`,
          pointerEvents: op1 > 0.15 ? 'auto' : 'none',
        }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-opacity duration-300 select-none"
      >
        <div className="max-w-2xl space-y-4">
          <p className="text-xs md:text-sm uppercase tracking-[0.24em] text-[#78716C] font-medium">
            {OWNER_INFO.tagline}
          </p>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider text-[#18181B] font-semibold text-balance leading-none">
            {OWNER_INFO.brandName}
          </h1>

          <p className="font-editorial italic text-lg sm:text-xl md:text-2xl text-[#57534E] max-w-lg mx-auto pt-2 leading-relaxed">
            "{OWNER_INFO.subheading}"
          </p>

          <div className="pt-8 flex flex-col items-center gap-3">
            <button
              onClick={onScrollNext}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#78716C] hover:text-[#18181B] transition-colors cursor-pointer py-2 px-4 rounded-full border border-[#E5DFD4] bg-[#FAF8F5]/70 backdrop-blur-xs"
            >
              <span>Begin Journey</span>
              <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
            <span className="text-[10px] text-[#A8A29E] tracking-wider uppercase font-mono">
              Scroll or swipe to explore
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================================
          CHAPTER 02 — MUSIC
      ====================================================================== */}
      <div
        style={{
          opacity: op2,
          transform: `translateY(${(1 - op2) * 24}px)`,
          pointerEvents: op2 > 0.15 ? 'auto' : 'none',
        }}
        className="absolute inset-0 flex flex-col justify-between p-8 md:p-14 lg:p-20 transition-opacity duration-300"
      >
        <div className="max-w-xl space-y-2 pointer-events-auto">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#8C7A5B] block">
            02 • Music
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-[#18181B] tracking-tight">
            MUSIC
          </h2>
          <p className="font-editorial italic text-base sm:text-xl text-[#57534E]">
            "Songs that stay after the scene ends."
          </p>
        </div>

        {/* Floating Quick Drawer Cards at Bottom */}
        <div className="pointer-events-auto max-w-4xl w-full">
          <div className="text-xs text-[#78716C] mb-2 flex items-center gap-2">
            <Disc className="w-3.5 h-3.5 text-[#A37E3E]" />
            <span>Interactive 3D Vinyls & Cassettes · Click 3D objects or select below</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {musicItems.map((track) => (
              <button
                key={track.id}
                onClick={() => onSelectObject({ type: 'music', data: track })}
                className="text-left p-3 rounded-xl bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] border border-[#E5DFD4] hover:border-[#C2A36B] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group"
              >
                <span className="font-display text-xs font-semibold text-[#18181B] group-hover:text-[#8C7A5B] block truncate">
                  {track.track}
                </span>
                <span className="text-[11px] text-[#78716C] block truncate">
                  {track.artist}
                </span>
                <span className="text-[10px] font-mono text-[#A8A29E] mt-1 block">
                  {track.mood}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================================
          CHAPTER 03 — CINEMA
      ====================================================================== */}
      <div
        style={{
          opacity: op3,
          transform: `translateY(${(1 - op3) * 24}px)`,
          pointerEvents: op3 > 0.15 ? 'auto' : 'none',
        }}
        className="absolute inset-0 flex flex-col justify-between p-8 md:p-14 lg:p-20 transition-opacity duration-300"
      >
        <div className="max-w-xl space-y-2 pointer-events-auto">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#8C7A5B] block">
            03 • Cinema
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-[#18181B] tracking-tight">
            CINEMA
          </h2>
          <p className="font-editorial italic text-base sm:text-xl text-[#57534E]">
            "Stories I keep coming back to."
          </p>
        </div>

        {/* Film Quick Bar */}
        <div className="pointer-events-auto max-w-4xl w-full">
          <div className="text-xs text-[#78716C] mb-2 flex items-center gap-2">
            <Film className="w-3.5 h-3.5 text-[#A37E3E]" />
            <span>3D Film Reels & Depth Posters · Click in 3D world to reveal notes</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {cinemaItems.map((cinema) => (
              <button
                key={cinema.id}
                onClick={() => onSelectObject({ type: 'cinema', data: cinema })}
                className="text-left p-3 rounded-xl bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] border border-[#E5DFD4] hover:border-[#C2A36B] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group"
              >
                <span className="font-display text-xs font-semibold text-[#18181B] group-hover:text-[#8C7A5B] block truncate">
                  {cinema.title}
                </span>
                <span className="text-[11px] text-[#78716C] block truncate">
                  {cinema.director} · {cinema.year}
                </span>
                <span className="text-[10px] text-[#8C7A5B] mt-1 block truncate">
                  {cinema.genre}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================================
          CHAPTER 04 — SCENES & EDITS
      ====================================================================== */}
      <div
        style={{
          opacity: op4,
          transform: `translateY(${(1 - op4) * 24}px)`,
          pointerEvents: op4 > 0.15 ? 'auto' : 'none',
        }}
        className="absolute inset-0 flex flex-col justify-between p-8 md:p-14 lg:p-20 transition-opacity duration-300"
      >
        <div className="max-w-xl space-y-2 pointer-events-auto">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#8C7A5B] block">
            04 • Scenes & Edits
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-[#18181B] tracking-tight">
            SCENES
          </h2>
          <p className="font-editorial italic text-base sm:text-xl text-[#57534E]">
            "Frames that deserve another replay."
          </p>
        </div>

        {/* Link Out + Edit Reel Deck */}
        <div className="pointer-events-auto max-w-4xl w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 flex-1 w-full">
            {instagramItems.map((edit) => (
              <button
                key={edit.id}
                onClick={() => onSelectObject({ type: 'scene', data: edit })}
                className="text-left p-3 rounded-xl bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] border border-[#E5DFD4] hover:border-[#C2A36B] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group"
              >
                <span className="font-display text-xs font-semibold text-[#18181B] group-hover:text-[#8C7A5B] block truncate">
                  {edit.title}
                </span>
                <span className="text-[11px] text-[#78716C] block truncate">
                  {edit.category}
                </span>
              </button>
            ))}
          </div>

          <a
            href={OWNER_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#18181B] hover:bg-[#27272A] text-white text-xs font-medium tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
          >
            <span>Visit Instagram</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* =====================================================================
          CHAPTER 05 — LETTERBOXD DIARY
      ====================================================================== */}
      <div
        style={{
          opacity: op5,
          transform: `translateY(${(1 - op5) * 24}px)`,
          pointerEvents: op5 > 0.15 ? 'auto' : 'none',
        }}
        className="absolute inset-0 flex flex-col justify-between p-8 md:p-14 lg:p-20 transition-opacity duration-300"
      >
        <div className="max-w-xl space-y-2 pointer-events-auto">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#8C7A5B] block">
            05 • Film Diary
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-[#18181B] tracking-tight">
            MY CINEMA DIARY
          </h2>
          <p className="font-editorial italic text-base sm:text-xl text-[#57534E]">
            "Films I've watched, loved, remembered and revisited."
          </p>
        </div>

        {/* Diary Showcase & Open Letterboxd button */}
        <div className="pointer-events-auto max-w-4xl w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 flex-1 w-full">
            {letterboxdItems.map((diary) => (
              <button
                key={diary.id}
                onClick={() => onSelectObject({ type: 'diary', data: diary })}
                className="text-left p-3 rounded-xl bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] border border-[#E5DFD4] hover:border-[#C2A36B] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group"
              >
                <span className="font-display text-xs font-semibold text-[#18181B] group-hover:text-[#8C7A5B] block truncate">
                  {diary.filmTitle}
                </span>
                <span className="text-[11px] text-[#A37E3E] block">
                  {'★'.repeat(Math.floor(diary.rating))} {diary.year}
                </span>
              </button>
            ))}
          </div>

          <a
            href={OWNER_INFO.letterboxdUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#18181B] hover:bg-[#27272A] text-white text-xs font-medium tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
          >
            <span>Open My Letterboxd</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* =====================================================================
          CHAPTER 06 — ARRIVE (Final Cinematic Scene)
      ====================================================================== */}
      <div
        style={{
          opacity: op6,
          transform: `translateY(${(1 - op6) * 24}px)`,
          pointerEvents: op6 > 0.15 ? 'auto' : 'none',
        }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-opacity duration-300 select-none"
      >
        <div className="max-w-2xl space-y-6">
          <span className="text-xs uppercase tracking-[0.24em] text-[#8C7A5B] font-mono block">
            Chapter 06 • The Horizon
          </span>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider text-[#18181B] font-semibold">
            {OWNER_INFO.brandName}
          </h2>

          <div className="flex items-center justify-center gap-4 text-base sm:text-lg font-display tracking-widest text-[#44403C]">
            <span>Music.</span>
            <span aria-hidden="true" className="text-[#C2A36B]">·</span>
            <span>Cinema.</span>
            <span aria-hidden="true" className="text-[#C2A36B]">·</span>
            <span>Memories.</span>
          </div>

          <p className="font-editorial italic text-base sm:text-xl text-[#57534E] max-w-md mx-auto">
            "{OWNER_INFO.closingNote}"
          </p>

          {/* Social Call to Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href={OWNER_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#18181B] hover:bg-[#27272A] text-white text-xs font-medium tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
            >
              <span>Instagram</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={OWNER_INFO.letterboxdUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FAF8F5] hover:bg-[#F2ECE1] text-[#18181B] border border-[#E5DFD4] text-xs font-medium tracking-wider uppercase transition-colors shadow-sm cursor-pointer"
            >
              <span>Letterboxd</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Owner Credit Required by Brief */}
          <div className="pt-8 border-t border-[#E8E2D8] max-w-xs mx-auto text-xs text-[#78716C] space-y-1">
            <p className="font-medium text-[#292524]">
              Made by {OWNER_INFO.curator}
            </p>
            <p className="text-[11px] text-[#A8A29E] tracking-wider uppercase">
              {OWNER_INFO.qualification}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
