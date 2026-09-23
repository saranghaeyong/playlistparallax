import React, { useEffect } from 'react';
import { X, ExternalLink, Disc, Film, Instagram, BookOpen } from 'lucide-react';
import { SelectedObjectPayload } from './CinematicCanvas';
import { OWNER_INFO } from '../data/portfolioData';

interface DetailModalProps {
  payload: SelectedObjectPayload | null;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ payload, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (payload) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [payload, onClose]);

  if (!payload) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/40 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-[#FAF8F5] rounded-2xl border border-[#E5DFD4] shadow-2xl p-6 md:p-8 overflow-hidden max-h-[90vh] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close detail dialog"
          className="absolute top-5 right-5 p-2 rounded-full text-[#78716C] hover:text-[#18181B] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Body Based on Type */}
        <div className="overflow-y-auto pr-1">
          {/* MUSIC ITEM */}
          {payload.type === 'music' && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xs text-[#8C7A5B] font-mono tracking-widest uppercase">
                <Disc className="w-4 h-4 text-[#A37E3E]" />
                <span>Chapter 02 · Music Selection</span>
              </div>

              <div>
                <h3 className="font-display text-2xl md:text-3xl text-[#18181B] tracking-tight">
                  {payload.data.track}
                </h3>
                <p className="text-sm font-editorial italic text-[#57534E] text-base mt-1">
                  {payload.data.artist} — {payload.data.filmOrAlbum} ({payload.data.year})
                </p>
              </div>

              {/* Zero-Pill Metadata */}
              <div className="flex items-center gap-2 text-xs text-[#78716C] border-y border-[#E8E2D8] py-2.5">
                <span>Mood: {payload.data.mood}</span>
                <span aria-hidden="true">·</span>
                <span>Year: {payload.data.year}</span>
                <span aria-hidden="true">·</span>
                <span>Stereo 33⅓ RPM</span>
              </div>

              {payload.data.quote && (
                <blockquote className="font-editorial text-lg italic text-[#44403C] border-l-2 border-[#C2A36B] pl-4 py-1 leading-relaxed">
                  "{payload.data.quote}"
                </blockquote>
              )}

              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#8C7A5B] block mb-1">
                  Curator Note
                </span>
                <p className="text-sm text-[#44403C] leading-relaxed">
                  {payload.data.personalNote}
                </p>
              </div>
            </div>
          )}

          {/* CINEMA ITEM */}
          {payload.type === 'cinema' && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xs text-[#8C7A5B] font-mono tracking-widest uppercase">
                <Film className="w-4 h-4 text-[#A37E3E]" />
                <span>Chapter 03 · Cinema Archive</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <img
                  src={payload.data.posterImage}
                  alt={payload.data.title}
                  className="w-24 sm:w-28 h-36 sm:h-40 object-cover rounded-lg shadow-sm border border-[#E8E2D8] shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-2">
                  <h3 className="font-display text-2xl md:text-3xl text-[#18181B]">
                    {payload.data.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#78716C]">
                    <span>{payload.data.director}</span>
                    <span aria-hidden="true">·</span>
                    <span>{payload.data.year}</span>
                    <span aria-hidden="true">·</span>
                    <span>{payload.data.genre}</span>
                  </div>
                  <div className="text-xs text-[#57534E] pt-1">
                    <span className="font-semibold text-[#8C7A5B]">Memorable Sequence: </span>
                    {payload.data.favoriteScene}
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#8C7A5B] block mb-1">
                  Personal Reflection
                </span>
                <p className="text-sm text-[#44403C] leading-relaxed">
                  {payload.data.personalNote}
                </p>
              </div>
            </div>
          )}

          {/* SCENES / INSTAGRAM EDIT ITEM */}
          {payload.type === 'scene' && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xs text-[#8C7A5B] font-mono tracking-widest uppercase">
                <Instagram className="w-4 h-4 text-[#A37E3E]" />
                <span>Chapter 04 · Instagram Edit Reel</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <img
                  src={payload.data.thumbnailImage}
                  alt={payload.data.title}
                  className="w-28 sm:w-32 aspect-[9/16] object-cover rounded-lg shadow-sm border border-[#E8E2D8] shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-2">
                  <h3 className="font-display text-xl md:text-2xl text-[#18181B]">
                    {payload.data.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#78716C]">
                    <span>{payload.data.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{payload.data.audioTrack}</span>
                  </div>
                  <p className="text-sm text-[#44403C] leading-relaxed pt-1">
                    {payload.data.caption}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* LETTERBOXD DIARY ITEM */}
          {payload.type === 'diary' && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xs text-[#8C7A5B] font-mono tracking-widest uppercase">
                <BookOpen className="w-4 h-4 text-[#A37E3E]" />
                <span>Chapter 05 · Cinema Diary</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <img
                  src={payload.data.coverImage}
                  alt={payload.data.filmTitle}
                  className="w-24 sm:w-28 h-36 object-cover rounded-lg shadow-sm border border-[#E8E2D8] shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-2">
                  <h3 className="font-display text-2xl md:text-3xl text-[#18181B]">
                    {payload.data.filmTitle}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#78716C]">
                    <span>{payload.data.year}</span>
                    <span aria-hidden="true">·</span>
                    <span>Logged: {payload.data.watchedDate}</span>
                    <span aria-hidden="true">·</span>
                    <span>{payload.data.rewatchCount} rewatches</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#A37E3E] text-sm pt-1">
                    {'★'.repeat(Math.floor(payload.data.rating))}
                    {payload.data.rating % 1 !== 0 ? '½' : ''}
                    <span className="text-xs text-[#78716C] ml-1.5">
                      ({payload.data.rating} / 5.0)
                    </span>
                  </div>
                </div>
              </div>

              <blockquote className="font-editorial text-base italic text-[#44403C] bg-[#F5EFE6]/60 p-3.5 rounded-lg border border-[#E8E2D8] leading-relaxed">
                "{payload.data.reviewExcerpt}"
              </blockquote>
            </div>
          )}
        </div>

        {/* Modal Actions Footer */}
        <div className="mt-6 pt-4 border-t border-[#E8E2D8] flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-[#78716C]">
            <span>Curated by {OWNER_INFO.curator}</span>
            <span className="mx-1.5">·</span>
            <span>{OWNER_INFO.qualification}</span>
          </div>

          <div className="flex items-center gap-2">
            {payload.type === 'scene' && (
              <a
                href={OWNER_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#18181B] hover:bg-[#27272A] rounded-lg transition-colors cursor-pointer"
              >
                <span>Watch on Instagram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {payload.type === 'diary' && (
              <a
                href={OWNER_INFO.letterboxdUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#18181B] hover:bg-[#27272A] rounded-lg transition-colors cursor-pointer"
              >
                <span>View on Letterboxd</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {(payload.type === 'music' || payload.type === 'cinema') && (
              <div className="flex items-center gap-2">
                <a
                  href={OWNER_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#44403C] hover:text-[#18181B] bg-[#F0EBE1] hover:bg-[#E8E0D2] rounded-lg transition-colors"
                >
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={OWNER_INFO.letterboxdUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#44403C] hover:text-[#18181B] bg-[#F0EBE1] hover:bg-[#E8E0D2] rounded-lg transition-colors"
                >
                  <span>Letterboxd</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
