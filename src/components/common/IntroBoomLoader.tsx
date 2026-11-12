import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ADecorLogo } from './ADecorLogo';

interface IntroLoaderProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

const shouldShowIntro = (forceShow: boolean): boolean => {
  if (forceShow) return true;
  if (typeof window === 'undefined') return true;
  try {
    return !sessionStorage.getItem('adecor_intro_seen');
  } catch {
    return true;
  }
};

export const IntroBoomLoader: React.FC<IntroLoaderProps> = ({ onComplete, forceShow = false }) => {
  const [isVisible, setIsVisible] = useState<boolean>(() => shouldShowIntro(forceShow));
  const [stage, setStage] = useState<'entering' | 'pulsing' | 'parting' | 'done'>('entering');
  const hasNotifiedRef = useRef(false);

  const notifyComplete = useCallback(() => {
    if (hasNotifiedRef.current) return;
    hasNotifiedRef.current = true;
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    // Remove HTML pre-paint boot curtain only after React has mounted this obsidian overlay
    const rafId = requestAnimationFrame(() => {
      document.getElementById('adecor-boot-curtain')?.remove();
    });

    if (!isVisible) {
      notifyComplete();
      return () => cancelAnimationFrame(rafId);
    }

    // Consistent slow, steady timing across both PC & Mobile:
    // 0ms -> 1000ms: crest glow & stroke draw
    // 1000ms -> 2300ms: gentle pulse & progress bar
    // 2300ms -> 3350ms: full 1000ms smooth opacity fade out before unmounting
    const pulseTimer = setTimeout(() => {
      setStage('pulsing');
    }, 1000);

    const partingTimer = setTimeout(() => {
      setStage('parting');
    }, 2300);

    const completeTimer = setTimeout(() => {
      setStage('done');
      setIsVisible(false);
      try {
        sessionStorage.setItem('adecor_intro_seen', 'true');
      } catch {
        // Ignore storage restrictions
      }
      window.dispatchEvent(new CustomEvent('adecor_intro_completed'));
      notifyComplete();
    }, 3350);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(pulseTimer);
      clearTimeout(partingTimer);
      clearTimeout(completeTimer);
    };
  }, [isVisible, notifyComplete]);

  const handleSkip = () => {
    setStage('done');
    setIsVisible(false);
    try {
      sessionStorage.setItem('adecor_intro_seen', 'true');
    } catch {
      // Ignore storage restrictions
    }
    window.dispatchEvent(new CustomEvent('adecor_intro_completed'));
    notifyComplete();
  };

  if (!isVisible || stage === 'done') return null;

  return (
    <div
      className={`adecor-preserve-motion fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#100F0E] text-[#FAF8F5] transition-opacity duration-1000 ease-in-out ${
        stage === 'parting' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background fine grain */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-30" />

      {/* Atmospheric breathing crimson + champagne gold studio halo */}
      <div
        className={`absolute w-[420px] h-[420px] rounded-full bg-[#D90B0B]/12 blur-[130px] transition-all duration-1000 ease-out pointer-events-none ${
          stage === 'pulsing' ? 'scale-125 opacity-80' : 'scale-90 opacity-30'
        }`}
      />
      <div
        className={`absolute w-[340px] h-[340px] rounded-full bg-[#C5A880]/15 blur-[110px] transition-all duration-1000 ease-out pointer-events-none ${
          stage === 'pulsing' ? 'scale-110 opacity-75' : 'scale-90 opacity-25'
        }`}
      />

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-8 right-8 z-10 px-5 py-2 rounded-full border border-white/15 text-[10px] tracking-[0.25em] text-[#D3D0C9] hover:text-white hover:border-[#D90B0B] transition-all"
      >
        ENTER ATELIER
      </button>

      {/* Center Cinematic Brand Lockup */}
      <div className="relative flex flex-col items-center z-10 px-6 text-center">
        {/* Animated Architectural Logo SVG with stroke-draw perimeter & [A] keystone */}
        <div
          className={`transition-transform duration-1000 ease-out ${
            stage === 'pulsing' ? 'scale-[1.03]' : 'scale-95'
          }`}
        >
          <ADecorLogo variant="obsidian" animated className="w-64 sm:w-80 h-auto drop-shadow-[0_14px_38px_rgba(217,11,11,0.22)]" />
        </div>

        {/* Anna Nagar Chennai Location Heritage Subtitle */}
        <div className="mt-7 space-y-2">
          <div className="flex items-center justify-center gap-3 text-[10px] tracking-[0.4em] uppercase text-[#C5A880] font-medium pt-1">
            <span>Anna Nagar</span>
            <span className="text-[#D90B0B]">•</span>
            <span>Chennai</span>
            <span className="text-[#D90B0B]">•</span>
            <span>Est. 2004</span>
          </div>
          <p className="font-editorial italic text-sm text-[#D3D0C9]/75 pt-1 font-light">
            Curating Timeless Interior Sanctuaries
          </p>
        </div>

        {/* Slow delicate loading progress bar */}
        <div className="w-44 h-[2px] bg-white/10 rounded-full mt-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#D90B0B] via-[#C5A880] to-[#DEC8AA] transition-all duration-[3000ms] ease-out rounded-full"
            style={{
              width: stage === 'parting' ? '100%' : stage === 'pulsing' ? '72%' : '18%',
            }}
          />
        </div>

      </div>
    </div>
  );
};
