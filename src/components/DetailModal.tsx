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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-[#493B32]/35 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl text-safe bg-[#FFF8EE] rounded-2xl border border-[rgba(73,59,50,0.18)] shadow-2xl p-6 md:p-8 overflow-hidden max-h-[90vh] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close detail dialog"
          className="absolute top-5 right-5 p-2 rounded-full text-[#76685D] hover:text-[#493B32] hover:bg-[rgba(73,59,50,0.08)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C98B6B]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Body Based on Type */}
        <div className="overflow-y-auto pr-1 space-y-5">
          {/* MUSIC ITEM */}
          {payload.type === 'music' && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xs text-[#8FA7A0] font-mono tracking-widest uppercase font-bold">
                <Disc className="w-4 h-4 text-[#8FA7A0]" />
                <span>Chapter 02 · Music Selection</span>
              </div>

              <div>
                <h3 className="font-display text-2xl md:text-3xl text-[#493B32] font-medium tracking-tight warm-text-shadow">
                  {payload.data.track}
                </h3>
                <p className="font-editorial italic text-[#76685D] text-lg mt-1">
                  {payload.data.artist} — {payload.data.filmOrAlbum} ({payload.data.year})
                </p>
              </div>

              {/* Zero-Pill Metadata */}
              <div className="flex items-center gap-2.5 text-sm text-[#76685D] border-y border-[rgba(73,59,50,0.14)] py-2.5">
                <span>Mood: <strong className="text-[#493B32]">{payload.data.mood}</strong></span>
                <span aria-hidden="true">•</span>
                <span>Year: <strong className="text-[#493B32]">{payload.data.year}</strong></span>
                <span aria-hidden="true">•</span>
                <span>Stereo 33⅓ RPM</span>
              </div>

              {payload.data.quote && (
                <blockquote className="font-editorial text-lg italic text-[#493B32] border-l-3 border-[#C98B6B] pl-4 py-1 leading-relaxed bg-[rgba(244,232,213,0.4)] rounded-r-lg">
                  "{payload.data.quote}"
                </blockquote>
              )}

              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-[#8FA7A0] block mb-1.5">
                  Curator Note
                </span>
                <p className="text-base text-[#493B32] leading-relaxed">
                  {payload.data.personalNote}
                </p>
              </div>
            </div>
          )}

          {/* CINEMA ITEM */}
          {payload.type === 'cinema' && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xs text-[#D6B46A] font-mono tracking-widest uppercase font-bold">
                <Film className="w-4 h-4 text-[#D6B46A]" />
                <span>Chapter 03 · Cinema Archive</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <img
                  src={payload.data.posterImage}
                  alt={payload.data.title}
                  className="w-24 sm:w-28 h-36 sm:h-40 object-cover rounded-lg shadow-sm border border-[rgba(73,59,50,0.16)] shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-2">
                  <h3 className="font-display text-2xl md:text-3xl text-[#493B32] font-medium warm-text-shadow">
                    {payload.data.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-[#76685D]">
                    <span className="font-medium text-[#493B32]">{payload.data.director}</span>
                    <span aria-hidden="true">•</span>
                    <span>{payload.data.year}</span>
                    <span aria-hidden="true">•</span>
                    <span className="text-[#C98B6B] font-medium">{payload.data.genre}</span>
                  </div>
                  <div className="text-sm text-[#493B32] pt-1">
                    <span className="font-semibold text-[#8FA7A0]">Memorable Sequence: </span>
                    {payload.data.favoriteScene}
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-[#D6B46A] block mb-1.5">
                  Personal Reflection
                </span>
                <p className="text-base text-[#493B32] leading-relaxed">
                  {payload.data.personalNote}
                </p>
              </div>
            </div>
          )}

          {/* SCENES / INSTAGRAM EDIT ITEM */}
          {payload.type === 'scene' && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xs text-[#C98B6B] font-mono tracking-widest uppercase font-bold">
                <Instagram className="w-4 h-4 text-[#C98B6B]" />
                <span>Chapter 04 · Instagram Edit Reel</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <img
                  src={payload.data.thumbnailImage}
                  alt={payload.data.title}
                  className="w-28 sm:w-32 aspect-[9/16] object-cover rounded-lg shadow-sm border border-[rgba(73,59,50,0.16)] shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-2">
                  <h3 className="font-display text-xl md:text-2xl text-[#493B32] font-medium warm-text-shadow">
                    {payload.data.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-[#76685D]">
                    <span className="font-medium text-[#C98B6B]">{payload.data.category}</span>
                    <span aria-hidden="true">•</span>
                    <span>{payload.data.audioTrack}</span>
                  </div>
                  <p className="text-base text-[#493B32] leading-relaxed pt-1">
                    {payload.data.caption}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* LETTERBOXD DIARY ITEM */}
          {payload.type === 'diary' && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xs text-[#8FA7A0] font-mono tracking-widest uppercase font-bold">
                <BookOpen className="w-4 h-4 text-[#8FA7A0]" />
                <span>Chapter 05 · Cinema Diary</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <img
                  src={payload.data.coverImage}
                  alt={payload.data.filmTitle}
                  className="w-24 sm:w-28 h-36 object-cover rounded-lg shadow-sm border border-[rgba(73,59,50,0.16)] shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-2">
                  <h3 className="font-display text-2xl md:text-3xl text-[#493B32] font-medium warm-text-shadow">
                    {payload.data.filmTitle}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-[#76685D]">
                    <span>{payload.data.year}</span>
                    <span aria-hidden="true">•</span>
                    <span>Logged: {payload.data.watchedDate}</span>
                    <span aria-hidden="true">•</span>
                    <span>{payload.data.rewatchCount} rewatches</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#D6B46A] text-base pt-1 font-semibold">
                    {'★'.repeat(Math.floor(payload.data.rating))}
                    {payload.data.rating % 1 !== 0 ? '½' : ''}
                    <span className="text-sm text-[#76685D] ml-1">
                      ({payload.data.rating} / 5.0)
                    </span>
                  </div>
                </div>
              </div>

              <blockquote className="font-editorial text-lg italic text-[#493B32] bg-[rgba(244,232,213,0.5)] p-4 rounded-xl border border-[rgba(73,59,50,0.14)] leading-relaxed">
                "{payload.data.reviewExcerpt}"
              </blockquote>
            </div>
          )}
        </div>

        {/* Modal Actions Footer with Strong Contrast Buttons */}
        <div className="mt-6 pt-4 border-t border-[rgba(73,59,50,0.16)] flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-[#76685D]">
            <span>Curated by {OWNER_INFO.curator}</span>
            <span className="mx-1.5">•</span>
            <span>{OWNER_INFO.qualification}</span>
          </div>

          <div className="flex items-center gap-3">
            {payload.type === 'scene' && (
              <a
                href={OWNER_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#FFF9F1] bg-[#C98B6B] hover:bg-[#b87c5d] rounded-xl transition-all shadow-sm cursor-pointer"
              >
                <span>Watch on Instagram</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {payload.type === 'diary' && (
              <a
                href={OWNER_INFO.letterboxdUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#FFF9F1] bg-[#8FA7A0] hover:bg-[#7e9790] rounded-xl transition-all shadow-sm cursor-pointer"
              >
                <span>View on Letterboxd</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {(payload.type === 'music' || payload.type === 'cinema') && (
              <div className="flex items-center gap-2">
                <a
                  href={OWNER_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-[#FFF9F1] bg-[#C98B6B] hover:bg-[#b87c5d] rounded-xl transition-all shadow-sm"
                >
                  <span>Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={OWNER_INFO.letterboxdUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-[#FFF9F1] bg-[#8FA7A0] hover:bg-[#7e9790] rounded-xl transition-all shadow-sm"
                >
                  <span>Letterboxd</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
