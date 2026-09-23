import React from 'react';
import { ExternalLink, Disc, Film, ChevronDown, BookOpen, Instagram, Sparkles } from 'lucide-react';
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
          Warm Ivory + Terracotta
      ====================================================================== */}
      <div
        style={{
          opacity: op1,
          transform: `translateY(${(1 - op1) * 20}px)`,
          pointerEvents: op1 > 0.15 ? 'auto' : 'none',
        }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6 transition-opacity duration-300 select-none"
      >
        <div className="text-safe px-7 py-9 sm:px-12 sm:py-12 max-w-2xl text-center space-y-4 shadow-xl border border-[rgba(73,59,50,0.16)]">
          <p className="text-sm uppercase tracking-[0.24em] text-[#76685D] font-semibold">
            {OWNER_INFO.tagline}
          </p>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-medium tracking-[0.04em] text-[#493B32] warm-text-shadow leading-tight">
            {OWNER_INFO.brandName}
          </h1>

          <div className="flex items-center justify-center gap-3 text-base sm:text-lg font-medium text-[#76685D] tracking-widest pt-1">
            <span>music</span>
            <span aria-hidden="true" className="text-[#C98B6B]">•</span>
            <span>cinema</span>
            <span aria-hidden="true" className="text-[#C98B6B]">•</span>
            <span>memories</span>
          </div>

          <p className="font-editorial italic text-lg sm:text-xl text-[#76685D] max-w-lg mx-auto pt-1 leading-relaxed">
            "{OWNER_INFO.subheading}"
          </p>

          <div className="pt-6 flex flex-col items-center gap-3">
            <button
              onClick={onScrollNext}
              className="inline-flex items-center gap-2.5 text-sm font-semibold tracking-wider text-[#FFF9F1] bg-[#C98B6B] hover:bg-[#b87c5d] active:scale-95 transition-all duration-200 cursor-pointer py-3 px-6 rounded-xl shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C98B6B]"
            >
              <span>Begin Journey</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </button>
            <span className="text-xs text-[#76685D] tracking-wider uppercase font-mono">
              Scroll or swipe to explore
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================================
          CHAPTER 02 — MUSIC
          Cream + Dusty Sage
      ====================================================================== */}
      <div
        style={{
          opacity: op2,
          transform: `translateY(${(1 - op2) * 20}px)`,
          pointerEvents: op2 > 0.15 ? 'auto' : 'none',
        }}
        className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-20 transition-opacity duration-300"
      >
        <div className="text-safe p-6 sm:p-7 max-w-xl space-y-2 pointer-events-auto border-l-4 border-l-[#8FA7A0]">
          <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#8FA7A0] font-bold block">
            02 • Music
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-[#493B32] font-medium tracking-tight warm-text-shadow">
            MUSIC
          </h2>
          <p className="font-editorial italic text-lg sm:text-xl text-[#76685D] leading-relaxed">
            "Songs that stay after the scene ends."
          </p>
        </div>

        {/* Floating Quick Drawer Cards at Bottom */}
        <div className="pointer-events-auto max-w-4xl w-full text-safe p-5 sm:p-6 space-y-3">
          <div className="text-sm font-medium text-[#76685D] flex items-center gap-2">
            <Disc className="w-4 h-4 text-[#8FA7A0]" />
            <span>Interactive 3D Vinyls & Cassettes · Click 3D objects or select below</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {musicItems.map((track) => (
              <button
                key={track.id}
                onClick={() => onSelectObject({ type: 'music', data: track })}
                className="text-left p-3.5 rounded-xl bg-[rgba(255,248,238,0.92)] hover:bg-[#FFF9F1] border border-[rgba(73,59,50,0.16)] hover:border-[#8FA7A0] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FA7A0]"
              >
                <span className="font-display text-sm font-semibold text-[#493B32] group-hover:text-[#C98B6B] block truncate">
                  {track.track}
                </span>
                <span className="text-xs text-[#76685D] block truncate mt-0.5">
                  {track.artist}
                </span>
                <span className="text-[11px] font-mono text-[#8FA7A0] font-semibold mt-1.5 block">
                  {track.mood}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================================
          CHAPTER 03 — CINEMA
          Warm Beige + Champagne
      ====================================================================== */}
      <div
        style={{
          opacity: op3,
          transform: `translateY(${(1 - op3) * 20}px)`,
          pointerEvents: op3 > 0.15 ? 'auto' : 'none',
        }}
        className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-20 transition-opacity duration-300"
      >
        <div className="text-safe p-6 sm:p-7 max-w-xl space-y-2 pointer-events-auto border-l-4 border-l-[#D6B46A]">
          <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#D6B46A] font-bold block">
            03 • Cinema
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-[#493B32] font-medium tracking-tight warm-text-shadow">
            CINEMA
          </h2>
          <p className="font-editorial italic text-lg sm:text-xl text-[#76685D] leading-relaxed">
            "Stories I keep coming back to."
          </p>
        </div>

        {/* Film Quick Bar */}
        <div className="pointer-events-auto max-w-4xl w-full text-safe p-5 sm:p-6 space-y-3">
          <div className="text-sm font-medium text-[#76685D] flex items-center gap-2">
            <Film className="w-4 h-4 text-[#D6B46A]" />
            <span>3D Film Reels & Staggered Posters · Click in 3D world to reveal notes</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {cinemaItems.map((cinema) => (
              <button
                key={cinema.id}
                onClick={() => onSelectObject({ type: 'cinema', data: cinema })}
                className="text-left p-3.5 rounded-xl bg-[rgba(255,248,238,0.92)] hover:bg-[#FFF9F1] border border-[rgba(73,59,50,0.16)] hover:border-[#D6B46A] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B46A]"
              >
                <span className="font-display text-sm font-semibold text-[#493B32] group-hover:text-[#C98B6B] block truncate">
                  {cinema.title}
                </span>
                <span className="text-xs text-[#76685D] block truncate mt-0.5">
                  {cinema.director} · {cinema.year}
                </span>
                <span className="text-[11px] text-[#D6B46A] font-semibold mt-1.5 block truncate">
                  {cinema.genre}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================================
          CHAPTER 04 — SCENES & EDITS
          Ivory + Muted Terracotta
      ====================================================================== */}
      <div
        style={{
          opacity: op4,
          transform: `translateY(${(1 - op4) * 20}px)`,
          pointerEvents: op4 > 0.15 ? 'auto' : 'none',
        }}
        className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-20 transition-opacity duration-300"
      >
        <div className="text-safe p-6 sm:p-7 max-w-xl space-y-2 pointer-events-auto border-l-4 border-l-[#C98B6B]">
          <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#C98B6B] font-bold block">
            04 • Scenes & Edits
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-[#493B32] font-medium tracking-tight warm-text-shadow">
            SCENES
          </h2>
          <p className="font-editorial italic text-lg sm:text-xl text-[#76685D] leading-relaxed">
            "Frames that deserve another replay."
          </p>
        </div>

        {/* Link Out + Edit Reel Deck */}
        <div className="pointer-events-auto max-w-4xl w-full text-safe p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1 w-full">
            {instagramItems.map((edit) => (
              <button
                key={edit.id}
                onClick={() => onSelectObject({ type: 'scene', data: edit })}
                className="text-left p-3.5 rounded-xl bg-[rgba(255,248,238,0.92)] hover:bg-[#FFF9F1] border border-[rgba(73,59,50,0.16)] hover:border-[#C98B6B] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C98B6B]"
              >
                <span className="font-display text-sm font-semibold text-[#493B32] group-hover:text-[#C98B6B] block truncate">
                  {edit.title}
                </span>
                <span className="text-xs text-[#76685D] block truncate mt-0.5">
                  {edit.category}
                </span>
              </button>
            ))}
          </div>

          <a
            href={OWNER_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#C98B6B] hover:bg-[#b87c5d] active:scale-95 text-[#FFF9F1] text-sm font-semibold tracking-wider transition-all shadow-sm hover:shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C98B6B]"
          >
            <Instagram className="w-4 h-4" />
            <span>Visit Instagram</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* =====================================================================
          CHAPTER 05 — LETTERBOXD DIARY
          Soft Cream + Dusty Sage
      ====================================================================== */}
      <div
        style={{
          opacity: op5,
          transform: `translateY(${(1 - op5) * 20}px)`,
          pointerEvents: op5 > 0.15 ? 'auto' : 'none',
        }}
        className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-20 transition-opacity duration-300"
      >
        <div className="text-safe p-6 sm:p-7 max-w-xl space-y-2 pointer-events-auto border-l-4 border-l-[#8FA7A0]">
          <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#8FA7A0] font-bold block">
            05 • Film Diary
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-[#493B32] font-medium tracking-tight warm-text-shadow">
            MY CINEMA DIARY
          </h2>
          <p className="font-editorial italic text-lg sm:text-xl text-[#76685D] leading-relaxed">
            "Films I've watched, loved, remembered and revisited."
          </p>
        </div>

        {/* Diary Showcase & Open Letterboxd button */}
        <div className="pointer-events-auto max-w-4xl w-full text-safe p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1 w-full">
            {letterboxdItems.map((diary) => (
              <button
                key={diary.id}
                onClick={() => onSelectObject({ type: 'diary', data: diary })}
                className="text-left p-3.5 rounded-xl bg-[rgba(255,248,238,0.92)] hover:bg-[#FFF9F1] border border-[rgba(73,59,50,0.16)] hover:border-[#8FA7A0] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FA7A0]"
              >
                <span className="font-display text-sm font-semibold text-[#493B32] group-hover:text-[#8FA7A0] block truncate">
                  {diary.filmTitle}
                </span>
                <span className="text-xs text-[#D6B46A] font-medium block mt-0.5">
                  {'★'.repeat(Math.floor(diary.rating))} {diary.year}
                </span>
              </button>
            ))}
          </div>

          <a
            href={OWNER_INFO.letterboxdUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#8FA7A0] hover:bg-[#7e9790] active:scale-95 text-[#FFF9F1] text-sm font-semibold tracking-wider transition-all shadow-sm hover:shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FA7A0]"
          >
            <BookOpen className="w-4 h-4" />
            <span>Open My Letterboxd</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* =====================================================================
          CHAPTER 06 — ARRIVE (Final Cinematic Scene)
          Warm Ivory + Champagne
      ====================================================================== */}
      <div
        style={{
          opacity: op6,
          transform: `translateY(${(1 - op6) * 20}px)`,
          pointerEvents: op6 > 0.15 ? 'auto' : 'none',
        }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6 transition-opacity duration-300 select-none"
      >
        <div className="text-safe px-7 py-9 sm:px-14 sm:py-12 max-w-2xl space-y-6 shadow-2xl border border-[rgba(73,59,50,0.16)]">
          <span className="text-xs uppercase tracking-[0.24em] text-[#D6B46A] font-mono font-bold block">
            Chapter 06 • The Horizon
          </span>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-medium tracking-[0.04em] text-[#493B32] warm-text-shadow">
            {OWNER_INFO.brandName}
          </h2>

          <div className="flex items-center justify-center gap-4 text-base sm:text-lg font-display tracking-widest text-[#493B32]">
            <span>Music.</span>
            <span aria-hidden="true" className="text-[#C98B6B]">•</span>
            <span>Cinema.</span>
            <span aria-hidden="true" className="text-[#C98B6B]">•</span>
            <span>Memories.</span>
          </div>

          <p className="font-editorial italic text-lg sm:text-xl text-[#76685D] max-w-md mx-auto leading-relaxed">
            "{OWNER_INFO.closingNote}"
          </p>

          {/* Social Call to Action Buttons with Requested Colors */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href={OWNER_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#C98B6B] hover:bg-[#b87c5d] active:scale-95 text-[#FFF9F1] text-sm font-semibold tracking-wider transition-all shadow-sm hover:shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C98B6B]"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={OWNER_INFO.letterboxdUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#8FA7A0] hover:bg-[#7e9790] active:scale-95 text-[#FFF9F1] text-sm font-semibold tracking-wider transition-all shadow-sm hover:shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FA7A0]"
            >
              <BookOpen className="w-4 h-4" />
              <span>Letterboxd</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Final Owner Credit Required by Brief in a Warm Ivory/Cream Text-Safe Zone */}
          <div className="pt-5 border-t border-[rgba(73,59,50,0.16)] text-safe-subtle p-3.5 max-w-xs mx-auto space-y-1">
            <p className="font-semibold text-base text-[#493B32]">
              Made by {OWNER_INFO.curator}
            </p>
            <p className="text-xs text-[#76685D] tracking-wider uppercase font-medium">
              {OWNER_INFO.qualification}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
