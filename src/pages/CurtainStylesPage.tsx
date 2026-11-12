import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowRight, Pause, Play, MoveHorizontal } from 'lucide-react';
import { SITE_CONTENT } from '../data/content';
import type { FabricSwatch } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const full = clean.length === 3
    ? clean.split('').map((c) => c + c).join('')
    : clean;
  const num = parseInt(full, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function interpolateHex(hexA: string, hexB: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(hexA);
  const [r2, g2, b2] = hexToRgb(hexB);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function getRelativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function samplePaletteAt(swatches: FabricSwatch[], pos: number) {
  const count = swatches.length;
  const wrapped = ((pos % count) + count) % count;
  const idxA = Math.floor(wrapped);
  const idxB = (idxA + 1) % count;
  const frac = wrapped - idxA;

  const swatchA = swatches[idxA];
  const swatchB = swatches[idxB];
  const hex = interpolateHex(swatchA.hex, swatchB.hex, frac);
  const nearest = frac < 0.5 ? swatchA : swatchB;
  const lum = getRelativeLuminance(hex);

  // Calibrate color & multiply intensity so highlights keep silk texture and deep shades stay rich
  const colorOpacity = Math.max(0.45, Math.min(0.88, 0.9 - lum * 0.42));
  const multiplyOpacity = Math.max(0.14, Math.min(0.54, (1 - lum) * 0.58));

  return {
    hex,
    nearest,
    wrapped,
    colorOpacity,
    multiplyOpacity,
  };
}

export const CurtainStylesPage: React.FC = () => {
  const swatches = SITE_CONTENT.fabricSwatches;
  const count = swatches.length;

  const [palettePos, setPalettePos] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isHoldingAfterDrag, setIsHoldingAfterDrag] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOriginCardId, setDragOriginCardId] = useState<string | null>(null);
  const [lightSpot, setLightSpot] = useState<{ x: number; y: number }>({ x: 50, y: 38 });

  const pageRef = useRef<HTMLDivElement>(null);
  const trackBarRef = useRef<HTMLDivElement>(null);
  const resumeTimeoutRef = useRef<number | null>(null);
  const dragStateRef = useRef<{
    active: boolean;
    mode: 'card' | 'bar' | null;
    startX: number;
    startPos: number;
    moved: boolean;
  }>({
    active: false,
    mode: null,
    startX: 0,
    startPos: 0,
    moved: false,
  });

  const activeDye = samplePaletteAt(swatches, palettePos);

  // Periodic smooth architectural fabric color shift (always ON unless paused or dragging)
  useEffect(() => {
    if (isPaused || isDragging || isHoldingAfterDrag) return;
    const timer = window.setInterval(() => {
      setPalettePos((prev) => {
        const nextIdx = (Math.floor(((prev % count) + count) % count) + 1) % count;
        return nextIdx;
      });
    }, 1800);
    return () => window.clearInterval(timer);
  }, [isPaused, isDragging, isHoldingAfterDrag, count]);

  // Brief settle hold right after manual pointer drag before periodic flow continues
  const holdAfterInteraction = useCallback(() => {
    if (resumeTimeoutRef.current !== null) {
      window.clearTimeout(resumeTimeoutRef.current);
    }
    setIsHoldingAfterDrag(true);
    resumeTimeoutRef.current = window.setTimeout(() => {
      setIsHoldingAfterDrag(false);
    }, 2200);
  }, []);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current !== null) {
        window.clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  // Global window drag tracking for frictionless scrubbing across cards and spectrum bar
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!dragStateRef.current.active) return;

      if (dragStateRef.current.mode === 'bar' && trackBarRef.current) {
        const rect = trackBarRef.current.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / Math.max(1, rect.width)));
        setPalettePos(ratio * count);
        setLightSpot({ x: ratio * 100, y: 35 });
        return;
      }

      const deltaX = e.clientX - dragStateRef.current.startX;
      if (Math.abs(deltaX) > 4) {
        dragStateRef.current.moved = true;
      }

      // Sweep through the full palette over ~260px of horizontal pointer drag
      const stepDelta = (deltaX / 260) * count;
      const nextPos = (((dragStateRef.current.startPos + stepDelta) % count) + count) % count;
      setPalettePos(nextPos);
      setLightSpot({
        x: Math.max(10, Math.min(90, 50 + (deltaX / 280) * 40)),
        y: Math.max(15, Math.min(75, 38 + ((e.clientY % 120) / 120 - 0.5) * 18)),
      });
    };

    const handlePointerUp = () => {
      if (!dragStateRef.current.active) return;
      const didMove = dragStateRef.current.moved || dragStateRef.current.mode === 'bar';
      dragStateRef.current.active = false;
      dragStateRef.current.mode = null;
      setIsDragging(false);
      setDragOriginCardId(null);

      if (didMove) {
        holdAfterInteraction();
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [count, holdAfterInteraction]);

  // GSAP ScrollTrigger staggered reveal for architectural drapery cards
  useEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.pleat-card', {
        y: 32,
        opacity: 0,
        duration: 0.75,
        stagger: { amount: 0.55, from: 'start' },
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.pleats-grid',
          start: 'top 88%',
          once: true,
        },
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const startCardDrag = (pleatId: string, e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('a, button')) return;
    if (resumeTimeoutRef.current !== null) {
      window.clearTimeout(resumeTimeoutRef.current);
    }
    dragStateRef.current = {
      active: true,
      mode: 'card',
      startX: e.clientX,
      startPos: palettePos,
      moved: false,
    };
    setIsDragging(true);
    setDragOriginCardId(pleatId);
  };

  const startBarDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!trackBarRef.current) return;
    if (resumeTimeoutRef.current !== null) {
      window.clearTimeout(resumeTimeoutRef.current);
    }
    const rect = trackBarRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / Math.max(1, rect.width)));
    setPalettePos(ratio * count);
    dragStateRef.current = {
      active: true,
      mode: 'bar',
      startX: e.clientX,
      startPos: ratio * count,
      moved: true,
    };
    setIsDragging(true);
  };

  const selectSwatch = (index: number) => {
    setPalettePos(index);
    holdAfterInteraction();
  };

  const barGradient = `linear-gradient(90deg, ${swatches.map((s) => s.hex).join(', ')}, ${swatches[0].hex})`;
  const scrubPercent = (activeDye.wrapped / count) * 100;

  return (
    <div ref={pageRef} className="pt-36 sm:pt-44 pb-24 bg-[#FAF8F5] min-h-screen">
      {/* Page Hero with generous clearance under sticky header */}
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE7E1] text-[#1E1D1B] border border-[#D3D0C9] mb-5">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className="label-caps text-[10px] tracking-luxury">Curtain Styles • Choose Your Pleat</span>
        </div>

        <h1 className="font-syne text-4xl sm:text-6xl lg:text-7xl text-[#1E1D1B] font-bold uppercase tracking-tight leading-[1.05]">
          Signature Drapery Pleats
        </h1>

        <p className="mt-4 max-w-xl mx-auto text-base sm:text-lg text-[#5E5C57] font-light leading-relaxed">
          The pleat defines light filtration, fabric fall, and window geometry. Drag across any curtain or the pigment bar below to preview bespoke tones.
        </p>
      </div>

      {/* Pro-Designer Interactive Fabric Pigment Studio Bar */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-[#D3D0C9] shadow-soft-luxury flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Active Shade Indicator */}
          <div className="flex items-center justify-between lg:justify-start gap-3.5 min-w-[230px]">
            <div className="flex items-center gap-3">
              <span
                className="w-9 h-9 rounded-full border-2 border-[#1E1D1B]/15 shadow-inner shrink-0 transition-colors duration-300"
                style={{ backgroundColor: activeDye.hex }}
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="label-caps text-[9px] text-[#8A8782] tracking-widest">
                    Live Drapery Dye
                  </span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isDragging
                        ? 'bg-[#C5A880] scale-125'
                        : !isPaused
                          ? 'bg-emerald-600 animate-pulse'
                          : 'bg-[#8A8782]'
                    }`}
                  />
                </div>
                <p className="font-editorial text-lg text-[#1E1D1B] leading-tight">
                  {activeDye.nearest.name}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsPaused((v) => !v)}
              aria-pressed={isPaused}
              className={`lg:hidden px-3.5 py-1.5 rounded-full border text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                isPaused
                  ? 'bg-[#1E1D1B] border-[#1E1D1B] text-white'
                  : 'bg-[#FAF8F5] border-[#D3D0C9] text-[#1E1D1B]'
              }`}
            >
              {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
              <span>{isPaused ? 'Resume' : 'Pause'}</span>
            </button>
          </div>

          {/* Continuous Pointer-Draggable Spectrum Scrubber */}
          <div className="flex-1 flex flex-col gap-2">
            <div
              ref={trackBarRef}
              onPointerDown={startBarDrag}
              data-cursor="DRAG"
              role="slider"
              aria-label="Drag to preview curtain fabric colour"
              aria-valuemin={0}
              aria-valuemax={count}
              aria-valuenow={Math.round(activeDye.wrapped)}
              tabIndex={0}
              className="relative h-7 rounded-full cursor-ew-resize select-none touch-none border border-[#D3D0C9] shadow-inner overflow-visible flex items-center"
              style={{ background: barGradient }}
            >
              <div
                className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#FAF8F5] border-2 border-[#1E1D1B] shadow-md pointer-events-none ${
                  isDragging ? 'scale-125' : 'transition-all duration-500 ease-out'
                }`}
                style={{ left: `${scrubPercent}%` }}
              />
            </div>

            {/* Quick Swatch Dots & Prompt */}
            <div className="flex items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
                {swatches.map((sw, idx) => {
                  const active = activeDye.nearest.id === sw.id;
                  return (
                    <button
                      key={sw.id}
                      type="button"
                      onClick={() => selectSwatch(idx)}
                      title={sw.name}
                      aria-label={`Select ${sw.name}`}
                      className={`w-4 h-4 rounded-full border transition-transform ${
                        active
                          ? 'scale-125 border-[#1E1D1B] ring-2 ring-[#C5A880]/60'
                          : 'border-black/20 hover:scale-110'
                      }`}
                      style={{ backgroundColor: sw.hex }}
                    />
                  );
                })}
              </div>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-[#8A8782] uppercase tracking-wider shrink-0">
                <MoveHorizontal className="w-3 h-3 text-[#C5A880]" />
                Drag anywhere on curtains
              </span>
            </div>
          </div>

          {/* Pause Control Only (Periodic Colour Cycling stays ON automatically) */}
          <button
            type="button"
            onClick={() => setIsPaused((v) => !v)}
            aria-pressed={isPaused}
            className={`hidden lg:inline-flex px-4 py-2.5 rounded-xl border text-[11px] font-semibold uppercase tracking-wider items-center gap-2 transition-colors shrink-0 ${
              isPaused
                ? 'bg-[#1E1D1B] border-[#1E1D1B] text-white hover:bg-[#C5A880] hover:text-[#1E1D1B] hover:border-[#C5A880]'
                : 'bg-[#FAF8F5] hover:bg-[#1E1D1B] text-[#1E1D1B] hover:text-white border-[#D3D0C9] hover:border-[#1E1D1B]'
            }`}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>
        </div>
      </div>

      {/* Responsive Showcase Grid of All Drapery Pleats */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="pleats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SITE_CONTENT.curtainPleatStyles.map((pleat) => {
            const isCardDragging = isDragging && dragOriginCardId === pleat.id;
            const transitionClass = isDragging
              ? 'transition-[background-color,opacity] duration-75 ease-linear'
              : 'transition-[background-color,opacity] duration-700 ease-out';

            return (
              <div
                key={pleat.id}
                onPointerDown={(e) => startCardDrag(pleat.id, e)}
                data-cursor="DRAG"
                className={`pleat-card group rounded-2xl bg-white border overflow-hidden shadow-soft-luxury hover:shadow-elevated transition-all duration-300 flex flex-col justify-between select-none touch-pan-y cursor-grab active:cursor-grabbing ${
                  isCardDragging
                    ? 'border-[#C5A880] scale-[1.015] shadow-elevated'
                    : 'border-[#D3D0C9] hover:border-[#C5A880]'
                }`}
              >
                <div>
                  {/* Full Unclipped Top-to-Fold Curtain Visual with Realistic Dual-Blend Dye */}
                  <div className="relative aspect-[48/37] overflow-hidden bg-[#ECE9E2]">
                    <img
                      src={pleat.image}
                      alt={pleat.name}
                      draggable={false}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top brightness-[1.03] contrast-[1.05] transition-transform duration-700 group-hover:scale-[1.03] pointer-events-none"
                    />

                    {/* Fabric Hue Shift (Preserves woven texture & fold depth) */}
                    <div
                      className={`absolute inset-0 pointer-events-none mix-blend-color ${transitionClass}`}
                      style={{
                        backgroundColor: activeDye.hex,
                        opacity: activeDye.colorOpacity,
                        maskImage:
                          'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.62) 13%, black 24%)',
                        WebkitMaskImage:
                          'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.62) 13%, black 24%)',
                      }}
                    />

                    {/* Fabric Richness & Shade Saturation (Rich deep velour/linen depth) */}
                    <div
                      className={`absolute inset-0 pointer-events-none mix-blend-multiply ${transitionClass}`}
                      style={{
                        backgroundColor: activeDye.hex,
                        opacity: activeDye.multiplyOpacity,
                        maskImage:
                          'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.45) 14%, black 26%)',
                        WebkitMaskImage:
                          'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.45) 14%, black 26%)',
                      }}
                    />

                    {/* Interactive Atelier Grazing Sheen responding to drag */}
                    <div
                      className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-0 group-hover:opacity-75 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at ${lightSpot.x}% ${lightSpot.y}%, rgba(255, 248, 232, 0.55), transparent 68%)`,
                      }}
                    />

                    {/* Subtle hover/drag hint pill along bottom corner (never occluding top rod hardware) */}
                    <div
                      className={`absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#1E1D1B]/75 backdrop-blur-md text-[#FAF8F5] text-[9px] tracking-wider uppercase flex items-center gap-1 pointer-events-none transition-opacity duration-300 ${
                        isCardDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <MoveHorizontal className="w-2.5 h-2.5 text-[#C5A880]" />
                      <span>Drag Colour</span>
                    </div>
                  </div>

                  {/* Clean Editorial Details (No 2x/3x fullness, aesthetic, or track/pole metadata) */}
                  <div className="p-5 space-y-2">
                    <h3 className="font-editorial text-2xl text-[#1E1D1B] group-hover:text-[#C5A880] transition-colors leading-tight">
                      {pleat.name}
                    </h3>
                    <p className="text-xs text-[#5E5C57] leading-relaxed line-clamp-3">
                      {pleat.description}
                    </p>
                  </div>
                </div>

                {/* Action Button passing selected pleat and live active fabric tone */}
                <div className="p-5 pt-0">
                  <Link
                    to={`/contact?pleat=${encodeURIComponent(pleat.name)}&fabric=${encodeURIComponent(activeDye.nearest.name)}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#FAF8F5] group-hover:bg-[#1E1D1B] border border-[#D3D0C9] group-hover:border-[#1E1D1B] text-[#1E1D1B] group-hover:text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Select for Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Specialist Consultation CTA Only (Decor Guide Removed) */}
      <div className="max-w-3xl mx-auto px-6 mt-20 text-center">
        <Link
          to={`/contact?fabric=${encodeURIComponent(activeDye.nearest.name)}`}
          className="px-9 py-4 rounded-full bg-[#1E1D1B] hover:bg-[#C5A880] text-white hover:text-[#1E1D1B] text-xs tracking-luxury uppercase font-semibold transition-all inline-flex items-center gap-2.5 shadow-elevated"
        >
          <span>Consult with Our Drapery Specialist</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
