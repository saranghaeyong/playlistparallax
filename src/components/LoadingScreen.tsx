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
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF8F5] transition-opacity duration-700 ease-out ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center max-w-sm px-6 text-center space-y-4">
        <span className="font-display font-medium text-2xl md:text-3xl tracking-[0.16em] text-[#18181B]">
          PLAYLIST_BGM
        </span>

        <p className="text-xs uppercase font-medium tracking-[0.2em] text-[#78716C] font-editorial italic text-sm">
          Loading the memories...
        </p>

        {/* Subtle minimalist progress line */}
        <div className="w-48 h-[2px] bg-[#E8E2D8] rounded-full overflow-hidden mt-4">
          <div
            className="h-full bg-[#A37E3E] transition-all duration-200 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-[10px] font-mono text-[#A8A29E] tabular-nums">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};
