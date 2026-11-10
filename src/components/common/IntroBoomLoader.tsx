import React, { useEffect, useState } from 'react';

interface IntroLoaderProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

export const IntroBoomLoader: React.FC<IntroLoaderProps> = ({ onComplete, forceShow = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [stage, setStage] = useState<'entering' | 'pulsing' | 'parting' | 'done'>('entering');

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('adecor_intro_seen');
    if (hasSeen && !forceShow) {
      if (onComplete) onComplete();
      return;
    }

    setIsVisible(true);

    // Cinematic, slow, artistic timing:
    // 0ms - 1200ms: subtle glowing aura & monogram line drawing
    // 1200ms - 2800ms: gentle breathing light & luxury brand typography
    // 2800ms - 4000ms: slow graceful fade out into website

    const pulseTimer = setTimeout(() => {
      setStage('pulsing');
    }, 1200);

    const partingTimer = setTimeout(() => {
      setStage('parting');
    }, 2900);

    const completeTimer = setTimeout(() => {
      setStage('done');
      setIsVisible(false);
      sessionStorage.setItem('adecor_intro_seen', 'true');
      if (onComplete) onComplete();
    }, 3900);

    return () => {
      clearTimeout(pulseTimer);
      clearTimeout(partingTimer);
      clearTimeout(completeTimer);
    };
  }, [forceShow, onComplete]);

  const handleSkip = () => {
    setStage('done');
    setIsVisible(false);
    sessionStorage.setItem('adecor_intro_seen', 'true');
    if (onComplete) onComplete();
  };

  if (!isVisible || stage === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#100F0E] text-[#FAF8F5] transition-opacity duration-1000 ease-in-out ${
        stage === 'parting' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background fine grain */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-30" />

      {/* Atmospheric breathing ambient golden glow */}
      <div
        className={`absolute w-[450px] h-[450px] rounded-full bg-[#C5A880]/15 blur-[120px] transition-all duration-1000 ease-out pointer-events-none ${
          stage === 'pulsing' ? 'scale-125 opacity-70' : 'scale-90 opacity-30'
        }`}
      />

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-8 right-8 z-10 px-5 py-2 rounded-full border border-white/15 text-[10px] tracking-[0.25em] text-[#D3D0C9] hover:text-white hover:border-[#C5A880] transition-all"
      >
        ENTER ATELIER
      </button>

      {/* Center Cinematic Monogram & Typography */}
      <div className="relative flex flex-col items-center z-10 px-6 text-center">
        
        {/* Architectural Framed Monogram Box */}
        <div
          className={`relative flex items-center justify-center w-24 h-24 border border-[#C5A880]/70 transition-all duration-1000 ease-out ${
            stage === 'pulsing'
              ? 'scale-105 shadow-[0_0_40px_rgba(197,168,128,0.25)]'
              : 'scale-95 opacity-80'
          }`}
        >
          {/* Inner hairline border */}
          <div className="absolute inset-1.5 border border-[#FAF8F5]/30" />

          {/* Monogram A */}
          <span className="font-editorial text-5xl font-light tracking-wider text-[#FAF8F5] select-none">
            A
          </span>
        </div>

        {/* Brand Name & Nandanam Chennai Subtitle */}
        <div className="mt-7 space-y-2">
          <p className="font-syne text-2xl sm:text-3xl tracking-[0.3em] font-semibold text-[#FAF8F5]">
            A - D E C O R
          </p>
          <div className="flex items-center justify-center gap-3 text-[10px] tracking-[0.4em] uppercase text-[#C5A880] font-medium pt-1">
            <span>Nandanam</span>
            <span>•</span>
            <span>Chennai</span>
            <span>•</span>
            <span>Est. 2004</span>
          </div>
          <p className="font-editorial italic text-sm text-[#D3D0C9]/70 pt-2 font-light">
            Curating Timeless Interior Sanctuaries
          </p>
        </div>

        {/* Slow delicate loading progress bar */}
        <div className="w-40 h-[1.5px] bg-white/10 rounded-full mt-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#C5A880] via-[#DEC8AA] to-[#C5A880] transition-all duration-[3000ms] ease-out rounded-full"
            style={{
              width: stage === 'parting' ? '100%' : stage === 'pulsing' ? '70%' : '15%',
            }}
          />
        </div>

      </div>
    </div>
  );
};
