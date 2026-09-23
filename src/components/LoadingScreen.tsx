import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoaded: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setFadeOut(true), 300);
          setTimeout(() => onLoaded(), 900);
          return 100;
        }
        const step = Math.random() * 18 + 12;
        return Math.min(100, prev + step);
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onLoaded]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center warm-cinema-bg transition-opacity duration-700 ease-out ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="text-safe p-8 sm:p-10 flex flex-col items-center max-w-sm mx-4 text-center space-y-4 shadow-xl border border-[rgba(73,59,50,0.16)]">
        <span className="font-display font-medium text-2xl md:text-3xl tracking-[0.04em] text-[#493B32] warm-text-shadow">
          PLAYLIST_BGM
        </span>

        <p className="font-editorial italic text-base sm:text-lg text-[#76685D]">
          Loading the memories...
        </p>

        {/* Minimalist progress line in terracotta & cream */}
        <div className="w-52 h-[3px] bg-[#F4E8D5] rounded-full overflow-hidden mt-4 border border-[rgba(73,59,50,0.1)]">
          <div
            className="h-full bg-[#C98B6B] transition-all duration-200 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-xs font-mono text-[#76685D] tabular-nums font-semibold">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};
