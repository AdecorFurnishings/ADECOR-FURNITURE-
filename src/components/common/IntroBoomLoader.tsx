import React, { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';

interface IntroBoomLoaderProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

export const IntroBoomLoader: React.FC<IntroBoomLoaderProps> = ({ onComplete, forceShow = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [stage, setStage] = useState<'pulsing' | 'bursting' | 'revealing' | 'done'>('pulsing');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check session storage unless forceShow is requested
    const hasSeen = sessionStorage.getItem('adecor_intro_seen');
    if (hasSeen && !forceShow) {
      if (onComplete) onComplete();
      return;
    }

    setIsVisible(true);

    // Sequence timing
    // 0ms - 800ms: pulse the 'A' monogram
    // 850ms: trigger particle burst & expansion
    // 1400ms: circular ripple reveal clip-path
    // 1900ms: mark done and unmount

    const burstTimer = setTimeout(() => {
      setStage('bursting');
      
      // Luxury soft particle burst in brand colours
      confetti({
        particleCount: 45,
        spread: 80,
        origin: { y: 0.5, x: 0.5 },
        colors: ['#C5A880', '#D3D0C9', '#8A8782', '#EAE7E1', '#B38E5D'],
        ticks: 200,
        gravity: 0.8,
        scalar: 0.9,
        shapes: ['circle'],
        disableForReducedMotion: true,
      });

      const revealTimer = setTimeout(() => {
        setStage('revealing');
      }, 350);

      const completeTimer = setTimeout(() => {
        setStage('done');
        setIsVisible(false);
        sessionStorage.setItem('adecor_intro_seen', 'true');
        if (onComplete) onComplete();
      }, 1300);

      return () => {
        clearTimeout(revealTimer);
        clearTimeout(completeTimer);
      };
    }, 900);

    return () => {
      clearTimeout(burstTimer);
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
      ref={containerRef}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#141312] text-[#FAF8F5] transition-all duration-1000 ease-in-out ${
        stage === 'revealing'
          ? 'opacity-0 scale-105 pointer-events-none'
          : 'opacity-100'
      }`}
      style={{
        clipPath:
          stage === 'revealing'
            ? 'circle(150% at 50% 50%)'
            : 'circle(100% at 50% 50%)',
      }}
    >
      {/* Background grain & ambient glow */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />
      <div
        className={`absolute w-72 h-72 rounded-full bg-[#C5A880]/20 blur-3xl transition-transform duration-700 ease-out ${
          stage === 'bursting' ? 'scale-150 opacity-90' : 'scale-100 opacity-40 animate-pulse'
        }`}
      />

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="absolute top-8 right-8 z-10 px-4 py-1.5 rounded-full border border-white/20 text-[11px] tracking-widest text-[#D3D0C9] hover:text-white hover:border-[#C5A880] transition-colors"
      >
        SKIP INTRO
      </button>

      {/* Center Logo Monogram Animation */}
      <div className="relative flex flex-col items-center z-10">
        <div
          className={`relative flex items-center justify-center w-24 h-24 border border-[#C5A880]/60 transition-all duration-700 ease-out ${
            stage === 'pulsing'
              ? 'scale-100 shadow-[0_0_25px_rgba(197,168,128,0.2)]'
              : 'scale-125 border-white shadow-[0_0_60px_rgba(197,168,128,0.8)]'
          }`}
        >
          {/* Inner fine border */}
          <div className="absolute inset-1.5 border border-[#D3D0C9]/40" />

          {/* Monogram A */}
          <span className="font-editorial text-5xl font-light tracking-wider text-[#FAF8F5]">
            A
          </span>

          {/* Expanding circular ripple wave */}
          {stage === 'bursting' && (
            <div className="absolute inset-0 rounded-full border-2 border-[#C5A880] animate-ping opacity-75 pointer-events-none" />
          )}
        </div>

        {/* Brand Name & Nandanam Subtitle */}
        <div className="mt-6 text-center overflow-hidden">
          <p className="font-editorial text-2xl tracking-[0.2em] text-[#FAF8F5]">
            A - D E C O R
          </p>
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C5A880] mt-1.5 font-medium">
            Nandanam, Chennai • Est. 2004
          </p>
        </div>
      </div>
    </div>
  );
};
