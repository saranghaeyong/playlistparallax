/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CinematicCanvas, SelectedObjectPayload } from './components/CinematicCanvas';
import { Navigation } from './components/Navigation';
import { ChapterOverlays } from './components/ChapterOverlays';
import { DetailModal } from './components/DetailModal';
import { LoadingScreen } from './components/LoadingScreen';
import { ambientAudio } from './utils/ambientAudio';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [selectedPayload, setSelectedPayload] = useState<SelectedObjectPayload | null>(null);
  const [hoveredObjectName, setHoveredObjectName] = useState<string | null>(null);
  const lastChapterRef = useRef(0);

  // Synchronize window scroll with scroll progress (0 to 1)
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const progress = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
      setScrollProgress(progress);

      // Determine current chapter (0 to 5)
      const chapterIdx = Math.min(5, Math.floor(progress * 5.999));
      setCurrentChapterIndex(chapterIdx);

      // Play soft harmonic audio chime when crossing into a new chapter
      if (chapterIdx !== lastChapterRef.current) {
        lastChapterRef.current = chapterIdx;
        ambientAudio.playChapterChime();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth programmatic navigation to a specific chapter index
  const navigateToChapter = useCallback((index: number) => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = (index / 5) * scrollHeight;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  }, []);

  const handleScrollNext = useCallback(() => {
    navigateToChapter(Math.min(5, currentChapterIndex + 1));
  }, [currentChapterIndex, navigateToChapter]);

  const handleHoverObject = useCallback((hovered: boolean, name?: string) => {
    setHoveredObjectName(hovered && name ? name : null);
  }, []);

  return (
    <div className="relative min-h-screen warm-cinema-bg bg-[#FFF8EE] text-[#493B32]">
      {/* Loading Sequence */}
      {isLoading && <LoadingScreen onLoaded={() => setIsLoading(false)} />}

      {/* Cinematic 3D Viewport (Fixed in background) */}
      <CinematicCanvas
        scrollProgress={scrollProgress}
        onSelectObject={setSelectedPayload}
        onHoverObject={handleHoverObject}
        currentChapterIndex={currentChapterIndex}
      />

      {/* Atmospheric Film Grain & Warm Soft Vignette Layer */}
      <div className="fixed inset-0 film-grain pointer-events-none z-20 opacity-30" />
      <div className="fixed inset-0 vignette-overlay pointer-events-none z-20" />

      {/* Floating Minimal Navigation & Status HUD */}
      <Navigation
        currentChapterIndex={currentChapterIndex}
        scrollProgress={scrollProgress}
        onNavigateToChapter={navigateToChapter}
        hoveredObjectName={hoveredObjectName}
      />

      {/* Editorial Chapter Typography Overlays */}
      <ChapterOverlays
        scrollProgress={scrollProgress}
        onSelectObject={setSelectedPayload}
        onScrollNext={handleScrollNext}
      />

      {/* Detail Lightbox Modal */}
      <DetailModal
        payload={selectedPayload}
        onClose={() => setSelectedPayload(null)}
      />

      {/* Virtual Scroll Height Track: 600vh drives the camera journey across 6 chapters */}
      <div className="relative w-full h-[600vh] pointer-events-none" aria-hidden="true" />
    </div>
  );
}
