import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, PhoneCall, Palette, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE_CONTENT } from '../../data/content';

// Vibrant designer curtain fabric palettes with damask/rib gradients
const vibrantFabrics = [
  {
    name: 'Peacock Teal Velvet',
    base: '#264B59',
    gradient: 'repeating-linear-gradient(90deg, #17333E 0px, #264B59 35px, #366577 70px, #1D3D48 105px, #142B34 140px)',
  },
  {
    name: 'Imperial Brass Brocade',
    base: '#A8803E',
    gradient: 'repeating-linear-gradient(90deg, #7A5B27 0px, #A8803E 35px, #CCA056 70px, #8C6A30 105px, #5E4319 140px)',
  },
  {
    name: 'Royal Forest Emerald',
    base: '#1E4937',
    gradient: 'repeating-linear-gradient(90deg, #122F23 0px, #1E4937 35px, #2C664F 70px, #173D2D 105px, #0E241B 140px)',
  },
  {
    name: 'Madras Terracotta Rust',
    base: '#9E462F',
    gradient: 'repeating-linear-gradient(90deg, #6E2D1C 0px, #9E462F 35px, #BD5E45 70px, #7E3623 105px, #521F13 140px)',
  },
  {
    name: 'Midnight Indigo Silk',
    base: '#22344D',
    gradient: 'repeating-linear-gradient(90deg, #152233 0px, #22344D 35px, #334D70 70px, #1B2B3F 105px, #101B2A 140px)',
  },
  {
    name: 'Regal Ruby Wine',
    base: '#5C2233',
    gradient: 'repeating-linear-gradient(90deg, #3D1420 0px, #5C2233 35px, #7A3348 70px, #4A1A27 105px, #2C0C15 140px)',
  },
];

export const HeroCurtains: React.FC = () => {
  // Curtains start 100% fully closed (isOpen = false), then smoothly glide open ("removing curtains")
  const [isOpen, setIsOpen] = useState(false);
  const [fabricIndex, setFabricIndex] = useState(0);

  // Cinematic opening sequence: starts completely closed, then smoothly draws open
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('adecor_intro_seen');

    if (hasSeenIntro) {
      // User has already seen intro: stay closed for 1200ms so user clearly sees closed curtains, then glide open
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      // Intro is currently running: wait for intro to finish, then stay closed 1200ms, then glide open
      let openTimer: NodeJS.Timeout | null = null;
      const handleIntroDone = () => {
        openTimer = setTimeout(() => {
          setIsOpen(true);
        }, 1200);
      };

      window.addEventListener('adecor_intro_completed', handleIntroDone);

      // Safe fallback timer
      const fallbackTimer = setTimeout(() => {
        setIsOpen(true);
      }, 5200);

      return () => {
        window.removeEventListener('adecor_intro_completed', handleIntroDone);
        if (openTimer) clearTimeout(openTimer);
        clearTimeout(fallbackTimer);
      };
    }
  }, []);

  // Pointer hover on curtains automatically cycles to the next vibrant color
  const handleCurtainHover = () => {
    setFabricIndex((prev) => (prev + 1) % vibrantFabrics.length);
  };

  const currentFabric = vibrantFabrics[fabricIndex];

  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen overflow-hidden bg-[#100F0E] select-none flex items-center justify-center pt-20">
      
      {/* 1. Behind Curtains: Ultra High-Resolution Penthouse Living Room */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/images/hd/hero_penthouse.jpg"
          alt="A-Decor Luxury Interior Nandanam Chennai"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.05] transition-transform duration-1000 ease-out scale-105"
        />
        {/* Soft luxury film scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#100F0E] via-black/50 to-black/40" />

        {/* Crisp Editorial Headline & Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 h-full flex flex-col justify-center items-center text-center text-white pt-12 pb-24">
          
          {/* Subtle Tag Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#C5A880]/50 mb-5 animate-fade-in shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="label-caps text-[#FAF8F5] text-[10px] tracking-luxury">
              Nandanam, Chennai • Established 2004
            </span>
          </div>

          {/* High-Impact Modern Luxury Headline */}
          <h1 className="font-syne text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-[#FAF8F5] leading-[0.92] uppercase drop-shadow-2xl">
            {SITE_CONTENT.brand.headline}
          </h1>

          {/* Elegant Tagline */}
          <p className="font-editorial italic text-2xl sm:text-3xl md:text-4xl text-[#DEC8AA] mt-4 mb-3 font-normal tracking-wide">
            "{SITE_CONTENT.brand.tagline}"
          </p>

          {/* Crisp, Short Description */}
          <p className="max-w-xl text-sm sm:text-base text-[#D3D0C9] font-light leading-relaxed mb-8">
            Bespoke draperies, motorized Roman blinds, acoustic wall panels, and master sofa refurbishing crafted for Tamil Nadu’s finest residences.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 z-20">
            <Link
              to="/curtain-styles"
              className="px-8 py-4 rounded-full bg-[#C5A880] hover:bg-white text-[#100F0E] font-syne font-bold text-xs tracking-luxury uppercase flex items-center gap-2.5 transition-all duration-300 shadow-glow-gold hover:scale-105"
            >
              <span>Explore Collections</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/contact"
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-[#FAF8F5] font-syne font-semibold text-xs tracking-luxury uppercase transition-all duration-300 flex items-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Book Consultation</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Top Architectural Brass Track & Finials */}
      <div className="absolute top-16 sm:top-20 inset-x-0 h-6 z-30 pointer-events-none flex items-center px-4">
        <div className="w-full h-2 rounded-full bg-gradient-to-r from-[#694F2B] via-[#D4B07B] to-[#694F2B] shadow-md border-t border-white/30" />
        <div className="absolute left-2 w-3.5 h-5 rounded-full bg-[#9E7A4A] shadow-lg" />
        <div className="absolute right-2 w-3.5 h-5 rounded-full bg-[#9E7A4A] shadow-lg" />
      </div>

      {/* 3. The Left Vibrant Fabric Curtain (Width: 50.5%, slides from 0% when fully closed to -84% when opened) */}
      <div
        onMouseEnter={handleCurtainHover}
        onClick={() => setIsOpen((prev) => !prev)}
        className="absolute top-20 bottom-0 left-0 w-[50.5%] z-20 transition-transform duration-[2200ms] ease-[cubic-bezier(0.25,1,0.5,1)] origin-left shadow-[25px_0_50px_rgba(0,0,0,0.7)] cursor-pointer group"
        style={{
          transform: isOpen ? 'translateX(-84%)' : 'translateX(0%)',
          background: currentFabric.gradient,
        }}
        title="Move pointer to cycle vibrant fabric colors • Click to draw curtains open or closed"
      >
        {/* Header Heading Pleats */}
        <div className="absolute top-0 inset-x-0 h-9 bg-black/40 border-b border-black/40 flex justify-between px-2">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="w-2.5 h-6 rounded-b bg-black/60 shadow-inner" />
          ))}
        </div>

        {/* Woven Damask Sheen & Deep Vertical Fabric Shadow Ribs */}
        <div
          className="absolute inset-0 pointer-events-none opacity-85 transition-opacity duration-700"
          style={{
            background: `
              repeating-linear-gradient(
                90deg,
                rgba(0, 0, 0, 0.55) 0%,
                rgba(255, 255, 255, 0.22) 25%,
                rgba(0, 0, 0, 0.65) 65%,
                rgba(0, 0, 0, 0.2) 100%
              )
            `,
          }}
        />

        {/* Right Edge Shadow Overlap (when meeting the center) */}
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/70 to-transparent pointer-events-none" />

        {/* Bottom Hem Weight */}
        <div className="absolute bottom-0 inset-x-0 h-10 bg-black/40 border-t border-white/10" />
      </div>

      {/* 4. The Right Vibrant Fabric Curtain (Width: 50.5%, slides from 0% when fully closed to 84% when opened) */}
      <div
        onMouseEnter={handleCurtainHover}
        onClick={() => setIsOpen((prev) => !prev)}
        className="absolute top-20 bottom-0 right-0 w-[50.5%] z-20 transition-transform duration-[2200ms] ease-[cubic-bezier(0.25,1,0.5,1)] origin-right shadow-[-25px_0_50px_rgba(0,0,0,0.7)] cursor-pointer group"
        style={{
          transform: isOpen ? 'translateX(84%)' : 'translateX(0%)',
          background: currentFabric.gradient,
        }}
        title="Move pointer to cycle vibrant fabric colors • Click to draw curtains open or closed"
      >
        {/* Header Heading Pleats */}
        <div className="absolute top-0 inset-x-0 h-9 bg-black/40 border-b border-black/40 flex justify-between px-2">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="w-2.5 h-6 rounded-b bg-black/60 shadow-inner" />
          ))}
        </div>

        {/* Woven Damask Sheen & Vertical Shadows */}
        <div
          className="absolute inset-0 pointer-events-none opacity-85 transition-opacity duration-700"
          style={{
            background: `
              repeating-linear-gradient(
                90deg,
                rgba(0, 0, 0, 0.2) 0%,
                rgba(0, 0, 0, 0.65) 35%,
                rgba(255, 255, 255, 0.22) 75%,
                rgba(0, 0, 0, 0.55) 100%
              )
            `,
          }}
        />

        {/* Left Edge Shadow Overlap (when meeting the center) */}
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/70 to-transparent pointer-events-none" />

        {/* Bottom Hem Weight */}
        <div className="absolute bottom-0 inset-x-0 h-10 bg-black/40 border-t border-white/10" />
      </div>

      {/* 5. Center Badge When Curtains Are Fully Closed */}
      {!isOpen && (
        <div className="absolute z-25 inset-0 flex items-center justify-center pointer-events-none animate-fade-in">
          <div className="px-6 py-3 rounded-full bg-black/85 backdrop-blur-md border border-[#C5A880] shadow-2xl flex items-center gap-3 text-white">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5A880] animate-ping" />
            <span className="font-syne text-xs uppercase tracking-luxury text-[#DEC8AA]">
              Curtains Fully Closed • Unveiling Atelier...
            </span>
          </div>
        </div>
      )}

      {/* 6. Interactive Floating Controls & Fabric Pill (Bottom) */}
      <div className="absolute bottom-6 inset-x-0 z-30 flex flex-wrap items-center justify-center gap-3 px-4">
        {/* Color Palette Display */}
        <div className="px-4 py-2 rounded-full bg-[#100F0E]/85 backdrop-blur-md border border-[#C5A880]/40 text-[#FAF8F5] text-xs flex items-center gap-3 shadow-xl">
          <Palette className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className="text-[11px] font-medium tracking-wide">
            Curtain Shade: <strong className="text-[#C5A880]">{currentFabric.name}</strong>
          </span>
          <span className="text-[10px] text-[#8A8782] hidden sm:inline">• Hover curtains to change color</span>
        </div>

        {/* Interactive Draw Open / Close Curtains Button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="px-4 py-2 rounded-full bg-black/75 hover:bg-[#C5A880] hover:text-[#100F0E] text-[#FAF8F5] backdrop-blur-md border border-white/30 text-xs font-syne uppercase tracking-wider flex items-center gap-2 transition-all duration-300 shadow-xl"
        >
          {isOpen ? (
            <>
              <EyeOff className="w-3.5 h-3.5" />
              <span>Close Curtains</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Open Curtains</span>
            </>
          )}
        </button>
      </div>

    </section>
  );
};
