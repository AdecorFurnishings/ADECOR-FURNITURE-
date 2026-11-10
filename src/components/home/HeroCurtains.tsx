import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowRight, MoveHorizontal, Sparkles, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE_CONTENT } from '../../data/content';

export const HeroCurtains: React.FC = () => {
  // openAmount is 0 (fully closed) to 1 (fully open)
  const isMobileInitial = typeof window !== 'undefined' && window.innerWidth < 640;
  const [openAmount, setOpenAmount] = useState(isMobileInitial ? 0.72 : 0.45);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);
  const startOpenRef = useRef<number>(0.45);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Auto-open slightly on load
  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    const timer = setTimeout(() => {
      setOpenAmount(isMobile ? 0.82 : 0.58);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Parallax on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 20, y: y * 15 });
  };

  // Drag logic
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    startXRef.current = clientX;
    startOpenRef.current = openAmount;
  };

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const deltaX = Math.abs(clientX - startXRef.current);
    const width = rect.width;
    
    // Calculate new opening based on drag direction
    const dragRatio = deltaX / (width * 0.45);
    const newAmount = Math.min(0.96, Math.max(0.12, startOpenRef.current + dragRatio));
    setOpenAmount(newAmount);
  }, [isDragging]);

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Global listeners for mouse move and up while dragging
  useEffect(() => {
    const onWindowMove = (e: MouseEvent) => {
      if (isDragging) handleDragMove(e.clientX);
    };
    const onWindowTouch = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) handleDragMove(e.touches[0].clientX);
    };
    const onWindowEnd = () => {
      if (isDragging) handleDragEnd();
    };

    if (isDragging) {
      window.addEventListener('mousemove', onWindowMove);
      window.addEventListener('mouseup', onWindowEnd);
      window.addEventListener('touchmove', onWindowTouch);
      window.addEventListener('touchend', onWindowEnd);
    }
    return () => {
      window.removeEventListener('mousemove', onWindowMove);
      window.removeEventListener('mouseup', onWindowEnd);
      window.removeEventListener('touchmove', onWindowTouch);
      window.removeEventListener('touchend', onWindowEnd);
    };
  }, [isDragging, handleDragMove]);

  // Width percentage for each curtain
  const curtainWidthPercent = (1 - openAmount) * 50;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[92vh] lg:min-h-screen overflow-hidden bg-[#141312] select-none flex items-center justify-center pt-20"
      data-cursor="Drag"
    >
      {/* 1. Behind the curtains: Room Reveal with Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 scale-105 transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0) scale(1.06)`,
          }}
        >
          <img
            src="/images/hero/hero_sofa_vortex.jpg"
            alt="A-Decor Interior Showroom Nandanam"
            className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05]"
          />
          {/* Subtle warm gradient scrim for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141312] via-black/40 to-black/30" />
        </div>

        {/* Content Reveal Inside the Room */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-center items-center text-center text-white pt-10 pb-20 sm:pt-12 sm:pb-24">
          {/* Top Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C5A880]/40 mb-4 sm:mb-6 animate-fade-in">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C5A880]" />
            <span className="label-caps text-[#EAE7E1] text-[9px] sm:text-[11px]">
              Nandanam, Chennai • Since 2004
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-editorial text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight leading-[0.98] text-[#FAF8F5] max-w-4xl drop-shadow-md">
            {SITE_CONTENT.brand.headline}
          </h1>

          {/* Tagline from PDF */}
          <p className="font-editorial italic text-lg sm:text-3xl md:text-4xl text-[#DEC8AA] mt-3 sm:mt-4 mb-3 sm:mb-4 font-normal tracking-wide px-2">
            "{SITE_CONTENT.brand.tagline}"
          </p>

          <p className="max-w-2xl text-xs sm:text-base md:text-lg text-[#D3D0C9] font-light leading-relaxed mb-6 sm:mb-8 px-4">
            Classic & innovative drapes, motorized Roman blinds, designer headboards, and master sofa refurbishing crafted for Tamil Nadu’s finest residences.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 z-20">
            <Link
              to="/curtain-styles"
              className="group px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#C5A880] text-[#141312] font-semibold text-[11px] sm:text-xs tracking-luxury uppercase flex items-center gap-2 hover:bg-[#FAF8F5] transition-all shadow-glow-gold"
            >
              <span>Explore Curtains</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/contact"
              className="px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-[#FAF8F5] font-medium text-[11px] sm:text-xs tracking-luxury uppercase hover:bg-white/20 hover:border-white transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Book Consultation</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Top Brass Curtain Track & Rings */}
      <div className="absolute top-16 sm:top-20 inset-x-0 h-8 z-30 pointer-events-none flex items-center px-4">
        {/* Rod */}
        <div className="w-full h-2.5 rounded-full bg-gradient-to-r from-[#5A4526] via-[#C5A880] to-[#5A4526] shadow-md border-t border-white/30" />
        {/* Left Finial */}
        <div className="absolute left-2 w-4 h-6 rounded-full bg-[#9A7A4F] shadow-lg" />
        {/* Right Finial */}
        <div className="absolute right-2 w-4 h-6 rounded-full bg-[#9A7A4F] shadow-lg" />
      </div>

      {/* 3. The Left Realistic Fabric Curtain */}
      <div
        className="absolute top-20 bottom-0 left-0 z-20 transition-all duration-300 ease-out origin-left shadow-[25px_0_50px_rgba(0,0,0,0.6)] cursor-grab active:cursor-grabbing"
        style={{
          width: `${curtainWidthPercent}%`,
          background: `
            repeating-linear-gradient(
              90deg,
              #2F3E48 0px,
              #4C5F6C 35px,
              #5D7382 70px,
              #3E505C 105px,
              #25323B 140px
            )
          `,
        }}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onTouchStart={(e) => e.touches[0] && handleDragStart(e.touches[0].clientX)}
      >
        {/* Top heading pleats */}
        <div className="absolute top-0 inset-x-0 h-10 bg-black/35 border-b border-black/40 flex justify-between px-3">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="w-2.5 h-7 rounded-b bg-gradient-to-b from-[#25323B] to-[#141A1F] shadow-inner" />
          ))}
        </div>

        {/* Soft fabric velvet texture sheen and vertical depth shadows */}
        <div
          className="absolute inset-0 opacity-80 pointer-events-none"
          style={{
            background: `
              repeating-linear-gradient(
                90deg,
                rgba(0, 0, 0, 0.45) 0%,
                rgba(255, 255, 255, 0.12) 30%,
                rgba(0, 0, 0, 0.55) 70%,
                rgba(0, 0, 0, 0.1) 100%
              )
            `,
          }}
        />

        {/* Bottom weighted hem */}
        <div className="absolute bottom-0 inset-x-0 h-12 bg-black/40 border-t border-white/10" />

        {/* Left Drag Pull Handle */}
        <div className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 w-6 sm:w-8 h-14 sm:h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex flex-col items-center justify-center gap-1 shadow-2xl">
          <MoveHorizontal className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-white" />
        </div>
      </div>

      {/* 4. The Right Realistic Fabric Curtain */}
      <div
        className="absolute top-20 bottom-0 right-0 z-20 transition-all duration-300 ease-out origin-right shadow-[-25px_0_50px_rgba(0,0,0,0.6)] cursor-grab active:cursor-grabbing"
        style={{
          width: `${curtainWidthPercent}%`,
          background: `
            repeating-linear-gradient(
              90deg,
              #25323B 0px,
              #3E505C 35px,
              #5D7382 70px,
              #4C5F6C 105px,
              #2F3E48 140px
            )
          `,
        }}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onTouchStart={(e) => e.touches[0] && handleDragStart(e.touches[0].clientX)}
      >
        {/* Top heading pleats */}
        <div className="absolute top-0 inset-x-0 h-10 bg-black/35 border-b border-black/40 flex justify-between px-3">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="w-2.5 h-7 rounded-b bg-gradient-to-b from-[#25323B] to-[#141A1F] shadow-inner" />
          ))}
        </div>

        {/* Soft fabric velvet sheen */}
        <div
          className="absolute inset-0 opacity-80 pointer-events-none"
          style={{
            background: `
              repeating-linear-gradient(
                90deg,
                rgba(0, 0, 0, 0.1) 0%,
                rgba(0, 0, 0, 0.55) 30%,
                rgba(255, 255, 255, 0.12) 70%,
                rgba(0, 0, 0, 0.45) 100%
              )
            `,
          }}
        />

        {/* Bottom weighted hem */}
        <div className="absolute bottom-0 inset-x-0 h-12 bg-black/40 border-t border-white/10" />

        {/* Right Drag Pull Handle */}
        <div className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 w-6 sm:w-8 h-14 sm:h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex flex-col items-center justify-center gap-1 shadow-2xl">
          <MoveHorizontal className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-white" />
        </div>
      </div>

      {/* 5. Bottom Interactive Controls Pill */}
      <div className="absolute bottom-6 inset-x-0 z-30 flex items-center justify-center px-4">
        <div className="px-5 py-2 rounded-full bg-[#141312]/85 backdrop-blur-lg border border-white/15 text-white/90 text-xs flex items-center gap-4 shadow-xl">
          <div className="flex items-center gap-1.5 text-[#C5A880]">
            <MoveHorizontal className="w-4 h-4 animate-pulse" />
            <span className="label-caps text-[10px] hidden sm:inline">Drag curtains or click:</span>
          </div>

          <button
            onClick={() => setOpenAmount(0.92)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              openAmount > 0.8
                ? 'bg-[#C5A880] text-black'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            Open Fully
          </button>

          <button
            onClick={() => setOpenAmount(0.55)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              openAmount >= 0.4 && openAmount <= 0.8
                ? 'bg-[#C5A880] text-black'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            Parted
          </button>

          <button
            onClick={() => setOpenAmount(0.15)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              openAmount < 0.4
                ? 'bg-[#C5A880] text-black'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            Draw Close
          </button>
        </div>
      </div>
    </section>
  );
};
