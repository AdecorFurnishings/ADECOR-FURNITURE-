import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Sparkles,
  ArrowRight,
  Pause,
  Play,
  MoveHorizontal,
  Eye,
  ZoomIn,
  X,
  Check,
  MessageCircle,
} from 'lucide-react';
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

export interface CurtainRodPiece {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  tag: string;
  finish: string;
  diameter: string;
  keySpec: string;
  composition: string;
  dimensions: string;
  recommendedRoom: string;
  image: string;
  ambientHex: string;
  finials: string[];
  palette: { name: string; hex: string }[];
  features: string[];
}

const CURTAIN_ROD_COLLECTIONS: CurtainRodPiece[] = [
  {
    id: 'rod-noble',
    order: 1,
    title: 'Noble C/G Architectural Rods',
    subtitle: 'Powder-Coated Aluminium with Spun Gold Accents',
    tag: 'Architectural Aluminium Rod',
    finish: 'Brown, Maroon, Ivory, Black, Beige & Rust with Gold',
    diameter: 'Heavy-Gauge Architectural',
    keySpec: 'Heavy-Gauge Core • Scratch-Resistant Finish',
    composition: 'Heavy-gauge extruded aluminium with SS/ABS accessories',
    dimensions: 'Custom cut-to-length up to 20 feet seamless',
    recommendedRoom: 'Living Rooms, Master Bedrooms & Double-Height Halls',
    image: '/images/curtain-rods/rod_noble_28mm_aluminum.jpg',
    ambientHex: '#B2824D',
    finials: ['Brown/Gold Round', 'Maroon/Gold Round', 'Ivory/Gold Round', 'Black/Gold Ham', 'Beige/Ham Gold', 'White/Gold Taj', 'New Rust/Gold Round'],
    palette: [
      { name: 'Noble Brass Gold', hex: '#D4AF37' },
      { name: 'Espresso Brown', hex: '#4A2C1D' },
      { name: 'Imperial Maroon', hex: '#781822' },
      { name: 'Ivory Cream', hex: '#F3EEDD' },
    ],
    features: [
      '7 luxury designer finishes with matching Ham & Taj finials',
      'Silent glide rings with inner nylon buffer for smooth silent pull',
      'Heavy-load wall and ceiling brackets supporting layered blackout drapes',
    ],
  },
  {
    id: 'rod-style-copper',
    order: 2,
    title: 'Style Copper Electro-Plated Rods',
    subtitle: 'Artisanal Stainless Steel with Lustrous Copper Sheen',
    tag: 'Style Copper SS',
    finish: 'Electro-Plated Polished & Brushed Copper',
    diameter: 'Artisanal Stainless Steel',
    keySpec: '8 Sculptural Finials (Crest, Crown, Wave, Shell)',
    composition: 'Stainless steel core with electro-plated copper sheen',
    dimensions: 'Precision customized to window frame width',
    recommendedRoom: 'Heritage Villas, Dining Salons & Neoclassical Lounges',
    image: '/images/curtain-rods/rod_style_copper_22mm.jpg',
    ambientHex: '#B87333',
    finials: ['Crest', 'Apex', 'Crown', 'Fox', 'Globe', 'Wave', 'Texa', 'Shell'],
    palette: [
      { name: 'Polished Copper', hex: '#B87333' },
      { name: 'Antique Bronze Tone', hex: '#7D4721' },
      { name: 'Rose Metallic Sheen', hex: '#D6895C' },
      { name: 'Warm Pewter Accent', hex: '#3B2F2A' },
    ],
    features: [
      '8 hand-sculpted finial designs including Texa, Globe, Wave & Shell',
      'Corrosion-resistant stainless steel core engineered for Chennai coastal climate',
      'High-luster electroplated coating that does not chip or peel over time',
    ],
  },
  {
    id: 'rod-ferro-rust',
    order: 3,
    title: 'Ferro Rust Wrought Iron Rods',
    subtitle: 'Hand-Forged Metallic Texture & Botanical Finials',
    tag: 'Forge-Hammered Wrought Iron',
    finish: 'Rust Silver, Rust Gold & Rust Copper',
    diameter: 'Solid Forged Steel',
    keySpec: 'Botanical Leaf, Star, Spear & Bow Finials',
    composition: 'High-strength solid iron core with powder-baked coating',
    dimensions: 'Custom single & double-pole brackets available',
    recommendedRoom: 'Traditional Indian, Tuscan & Rustic Luxury Interiors',
    image: '/images/curtain-rods/rod_ferro_rust_22mm.jpg',
    ambientHex: '#8C482B',
    finials: ['Botanical Leaf', 'Star Finial', 'Spear Plinth', 'Sculpted Bow'],
    palette: [
      { name: 'Rust Ochre', hex: '#8C482B' },
      { name: 'Antiqued Gilt', hex: '#C29845' },
      { name: 'Oxidized Silver Tint', hex: '#8E9194' },
      { name: 'Iron Charcoal', hex: '#262423' },
    ],
    features: [
      'Textured forge-hammered finish with authentic antique rustic character',
      'Heavy solid steel core engineered to support heavy velvet & jacquard curtains',
      'Triple-sealed anti-oxidation treatment protecting against coastal humidity',
    ],
  },
  {
    id: 'rod-marvel',
    order: 4,
    title: 'Marvel C/G Brass-Accented Rods',
    subtitle: 'Architectural Woodgrain & Electro-Plated Metallic Finishes',
    tag: 'Architectural Brass Accent',
    finish: 'Teak Grain, Walnut Bronze, Polished Gold',
    diameter: 'Architectural Hybrid Profile',
    keySpec: 'Spun Brass Finials & Silent Gliders',
    composition: 'Heavy extruded aluminium core with brass electro-sheen',
    dimensions: 'Continuous lengths with silent center brackets',
    recommendedRoom: 'Contemporary Apartments & Modern Minimalist Spaces',
    image: '/images/curtain-rods/rod_marvel_28mm.jpg',
    ambientHex: '#947A53',
    finials: ['Modern Cone', 'Dual-Tone Cylinder', 'Spun Brass Ball'],
    palette: [
      { name: 'Walnut Bronze', hex: '#523A28' },
      { name: 'Spun Brass Gold', hex: '#CBA052' },
      { name: 'Teak Natural', hex: '#8A5832' },
      { name: 'Matte Champagne', hex: '#E2D5C3' },
    ],
    features: [
      'Natural woodgrain powder coat with jewelry-grade spun brass finials',
      'Engineered for ripplefold and wave curtains with frictionless gliding',
      'Precision concealed ceiling brackets for full floor-to-ceiling drapery',
    ],
  },
  {
    id: 'rod-royal-antique',
    order: 5,
    title: 'Royal Antique Double-Pole Track System',
    subtitle: 'Dual Sheer Drape & Heavy Blackout Velvet Engineering',
    tag: 'Double-Pole Dual System',
    finish: 'Antique Brass, Burnished Bronze & Brushed Pewter',
    diameter: 'Dual Architectural Track',
    keySpec: 'Simultaneous Sheer & Blackout Layering',
    composition: 'Reinforced brass-plated steel with heavy-duty dual brackets',
    dimensions: 'Engineered for heavy double draperies up to 35kg',
    recommendedRoom: 'Master Bedrooms, Home Cinemas & Luxury Suites',
    image: '/images/curtain-rods/rod_royal_antique_28mm.jpg',
    ambientHex: '#6E5D4F',
    finials: ['Royal Acanthus', 'Fluted Crown', 'Empire Sphere'],
    palette: [
      { name: 'Antique Brass', hex: '#9E7E45' },
      { name: 'Burnished Bronze', hex: '#4D3B2F' },
      { name: 'Brushed Pewter', hex: '#7D7A75' },
      { name: 'Gilded Highlight', hex: '#DEC284' },
    ],
    features: [
      'Dual bracket system hangs whisper sheer curtains behind heavy blackout drapes',
      'Heavy load capacity tested to 35kg across wide panoramic spans',
      'Hand-finished antique burnishing with warm artisanal depth',
    ],
  },
];

export const CurtainStylesPage: React.FC = () => {
  const swatches = SITE_CONTENT.fabricSwatches;
  const count = swatches.length;

  const [activeTab, setActiveTab] = useState<'all' | 'pleats' | 'rods'>('all');
  const [palettePos, setPalettePos] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isHoldingAfterDrag, setIsHoldingAfterDrag] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOriginCardId, setDragOriginCardId] = useState<string | null>(null);
  const [lightSpot, setLightSpot] = useState<{ x: number; y: number }>({ x: 50, y: 38 });
  const [selectedRod, setSelectedRod] = useState<CurtainRodPiece | null>(null);

  const pageRef = useRef<HTMLDivElement>(null);
  const trackBarRef = useRef<HTMLDivElement>(null);
  const pleatsSectionRef = useRef<HTMLDivElement>(null);
  const rodsSectionRef = useRef<HTMLDivElement>(null);
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

  // GSAP ScrollTrigger staggered reveal
  useEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.pleat-card', {
        y: 32,
        opacity: 0,
        duration: 0.75,
        stagger: { amount: 0.45, from: 'start' },
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.pleats-grid',
          start: 'top 88%',
          once: true,
        },
      });

      gsap.from('.rod-card', {
        y: 32,
        opacity: 0,
        duration: 0.75,
        stagger: { amount: 0.45, from: 'start' },
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.rods-grid',
          start: 'top 88%',
          once: true,
        },
      });
    }, pageRef);
    return () => ctx.revert();
  }, [activeTab]);

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

  const scrollToSection = (section: 'pleats' | 'rods') => {
    if (section === 'pleats' && pleatsSectionRef.current) {
      pleatsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (section === 'rods' && rodsSectionRef.current) {
      rodsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const barGradient = `linear-gradient(90deg, ${swatches.map((s) => s.hex).join(', ')}, ${swatches[0].hex})`;
  const scrubPercent = (activeDye.wrapped / count) * 100;

  return (
    <div ref={pageRef} className="pt-36 sm:pt-44 pb-28 bg-[#FAF8F5] min-h-screen text-[#1E1D1B]">
      {/* Page Hero with Architectural Title & Subtitle */}
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAE7E1] text-[#1E1D1B] border border-[#D3D0C9] mb-5">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className="label-caps text-[10px] tracking-luxury">
            Curtain Pleats • Architectural Rods &amp; Tracks • Tailoring
          </span>
        </div>

        <h1 className="font-syne text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-[1.05]">
          Curtain Styles &amp; Rods
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-[#5E5C57] font-light leading-relaxed">
          Explore bespoke pleat silhouettes paired seamlessly with heavy-gauge architectural aluminum rods, electro-plated copper poles, and hand-forged wrought iron hardware.
        </p>

        {/* Master Section Toggle Navigation */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              setActiveTab('all');
            }}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-luxury uppercase transition-all ${
              activeTab === 'all'
                ? 'bg-[#1E1D1B] text-[#FAF8F5] shadow-md scale-105'
                : 'bg-white border border-[#D3D0C9] text-[#5E5C57] hover:border-[#1E1D1B] hover:text-[#1E1D1B]'
            }`}
          >
            All Curtains &amp; Rods
          </button>

          <button
            onClick={() => {
              setActiveTab('pleats');
              scrollToSection('pleats');
            }}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-luxury uppercase transition-all ${
              activeTab === 'pleats'
                ? 'bg-[#1E1D1B] text-[#FAF8F5] shadow-md scale-105'
                : 'bg-white border border-[#D3D0C9] text-[#5E5C57] hover:border-[#1E1D1B] hover:text-[#1E1D1B]'
            }`}
          >
            Signature Drapery Pleats (6)
          </button>

          <button
            onClick={() => {
              setActiveTab('rods');
              scrollToSection('rods');
            }}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-luxury uppercase transition-all ${
              activeTab === 'rods'
                ? 'bg-[#1E1D1B] text-[#FAF8F5] shadow-md scale-105'
                : 'bg-white border border-[#D3D0C9] text-[#5E5C57] hover:border-[#1E1D1B] hover:text-[#1E1D1B]'
            }`}
          >
            Architectural Rods &amp; Tracks (5)
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION 1: DRAPERY PLEATS & CHAMELEON DYE STUDIO */}
      {/* ========================================================= */}
      {(activeTab === 'all' || activeTab === 'pleats') && (
        <div ref={pleatsSectionRef} className="mb-24 scroll-mt-36">
          <div className="max-w-7xl mx-auto px-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D3D0C9] pb-6">
            <div>
              <span className="label-caps text-[#C5A880] text-xs">Section 01</span>
              <h2 className="font-syne text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#1E1D1B] mt-1">
                Bespoke Pleat Silhouettes
              </h2>
              <p className="text-xs text-[#5E5C57] mt-1">
                Drag horizontally across any curtain plate or the color spectrum bar to preview live fabric shades.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#8A8782]">
              <span>6 Bespoke Pleat Geometries</span>
            </div>
          </div>

          {/* Interactive Pigment Studio Bar */}
          <div className="max-w-7xl mx-auto px-6 mb-12">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#D3D0C9] shadow-soft-luxury flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
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

                {/* Quick Swatch Dots */}
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

              {/* Pause Control */}
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

          {/* Pleats Grid */}
          <div className="max-w-7xl mx-auto px-6">
            <div className="pleats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-7">
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
                      <div className="relative aspect-[48/37] overflow-hidden bg-[#ECE9E2]">
                        <img
                          src={pleat.image}
                          alt={pleat.name}
                          draggable={false}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-top brightness-[1.03] contrast-[1.05] transition-transform duration-700 group-hover:scale-[1.03] pointer-events-none"
                        />

                        {/* Fabric Hue Shift */}
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

                        {/* Fabric Multiply Depth */}
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

                        {/* Drag Sheen */}
                        <div
                          className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-0 group-hover:opacity-75 transition-opacity duration-500"
                          style={{
                            background: `radial-gradient(circle at ${lightSpot.x}% ${lightSpot.y}%, rgba(255, 248, 232, 0.55), transparent 68%)`,
                          }}
                        />

                        <div
                          className={`absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#1E1D1B]/75 backdrop-blur-md text-[#FAF8F5] text-[9px] tracking-wider uppercase flex items-center gap-1 pointer-events-none transition-opacity duration-300 ${
                            isCardDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}
                        >
                          <MoveHorizontal className="w-2.5 h-2.5 text-[#C5A880]" />
                          <span>Drag Colour</span>
                        </div>
                      </div>

                      <div className="p-6 space-y-2">
                        <h3 className="font-editorial text-2xl text-[#1E1D1B] group-hover:text-[#C5A880] transition-colors leading-tight">
                          {pleat.name}
                        </h3>
                        <p className="text-xs text-[#5E5C57] leading-relaxed line-clamp-3">
                          {pleat.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
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
        </div>
      )}

      {/* ========================================================= */}
      {/* SECTION 2: ARCHITECTURAL CURTAIN RODS & FINIAL HARDWARE */}
      {/* ========================================================= */}
      {(activeTab === 'all' || activeTab === 'rods') && (
        <div ref={rodsSectionRef} className="scroll-mt-36">
          <div className="max-w-7xl mx-auto px-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D3D0C9] pb-6">
            <div>
              <span className="label-caps text-[#C5A880] text-xs">Section 02</span>
              <h2 className="font-syne text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#1E1D1B] mt-1">
                Architectural Curtain Rods &amp; Tracks
              </h2>
              <p className="text-xs text-[#5E5C57] mt-1">
                Engineered powder-coated aluminum, electro-plated stainless steel copper, and hand-forged wrought iron.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#8A8782]">
              <span>5 Heavy-Duty Hardware Collections</span>
            </div>
          </div>

          {/* Rods Grid */}
          <div className="max-w-7xl mx-auto px-6">
            <div className="rods-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
              {CURTAIN_ROD_COLLECTIONS.map((rod) => (
                <div
                  key={rod.id}
                  className="rod-card group rounded-2xl bg-white border border-[#D3D0C9] hover:border-[#C5A880] shadow-soft-luxury hover:shadow-elevated transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Image Plate */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#ECE9E2]">
                      <img
                        src={rod.image}
                        alt={rod.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

                      {/* Material Tag Pill */}
                      <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E1D1B]/90 backdrop-blur-md border border-white/20 text-[10px] font-syne font-bold uppercase tracking-wider text-white">
                        <span>{rod.tag}</span>
                      </div>

                      {/* Inspect Button */}
                      <button
                        onClick={() => setSelectedRod(rod)}
                        className="absolute top-3.5 right-3.5 p-2 rounded-full bg-white/90 hover:bg-[#C5A880] text-[#1E1D1B] hover:text-white backdrop-blur-md transition-all shadow-md group/btn"
                        aria-label={`Inspect ${rod.title}`}
                      >
                        <ZoomIn className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                      </button>

                      {/* Bottom Info on Plate */}
                      <div className="absolute bottom-3.5 inset-x-3.5 flex items-end justify-between text-white">
                        <div>
                          <span className="text-[10px] uppercase tracking-luxury text-[#C5A880] block font-semibold">
                            {rod.tag}
                          </span>
                          <p className="font-syne text-lg sm:text-xl font-bold tracking-tight">
                            {rod.title}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Body Details */}
                    <div className="p-6 space-y-4">
                      <p className="text-xs text-[#5E5C57] leading-relaxed">
                        {rod.subtitle}. {rod.keySpec}.
                      </p>

                      {/* Finials list preview */}
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#8A8782] block mb-1">
                          Sculptural Finials:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {rod.finials.slice(0, 4).map((f, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded-md bg-[#FAF8F5] border border-[#D3D0C9] text-[10px] text-[#5E5C57]"
                            >
                              {f}
                            </span>
                          ))}
                          {rod.finials.length > 4 && (
                            <span className="px-2 py-0.5 rounded-md bg-[#EAE7E1] text-[10px] text-[#1E1D1B] font-semibold">
                              +{rod.finials.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Finish Palette */}
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#8A8782] block mb-1.5">
                          Finish Tones:
                        </span>
                        <div className="flex items-center gap-2">
                          {rod.palette.map((swatch) => (
                            <span
                              key={swatch.name}
                              className="w-5 h-5 rounded-full border border-black/20"
                              style={{ backgroundColor: swatch.hex }}
                              title={swatch.name}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-6 pt-0 flex items-center gap-2.5">
                    <button
                      onClick={() => setSelectedRod(rod)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#FAF8F5] hover:bg-[#1E1D1B] border border-[#D3D0C9] hover:border-[#1E1D1B] text-[#1E1D1B] hover:text-white text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Hardware</span>
                    </button>

                    <a
                      href={`https://wa.me/919841134665?text=${encodeURIComponent(
                        `Hello A-Decor, I would like to inquire about ${rod.title} (${rod.tag}) with custom finials and measurement.`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 transition-all flex items-center justify-center"
                      aria-label={`WhatsApp about ${rod.title}`}
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Specialist Consultation CTA */}
      <div className="max-w-3xl mx-auto px-6 mt-20 text-center">
        <Link
          to={`/contact?fabric=${encodeURIComponent(activeDye.nearest.name)}`}
          className="px-9 py-4 rounded-full bg-[#1E1D1B] hover:bg-[#C5A880] text-white hover:text-[#1E1D1B] text-xs tracking-luxury uppercase font-semibold transition-all inline-flex items-center gap-2.5 shadow-elevated"
        >
          <span>Consult with Our Drapery &amp; Rod Specialist</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* High-Definition Portal Modal for Inspecting Curtain Rods */}
      {selectedRod &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
            onClick={() => setSelectedRod(null)}
          >
            <div
              className="relative w-full max-w-5xl max-h-[92vh] rounded-3xl bg-[#1E1D1B] border border-white/20 text-[#FAF8F5] shadow-2xl overflow-y-auto flex flex-col lg:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedRod(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-[#D90B0B] text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="lg:w-3/5 bg-black/40 flex items-center justify-center p-4 sm:p-6 min-h-[300px] lg:min-h-[500px]">
                <img
                  src={selectedRod.image}
                  alt={selectedRod.title}
                  className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                />
              </div>

              <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div>
                    <span className="label-caps text-[#C5A880] text-[10px] block">
                      {selectedRod.tag}
                    </span>
                    <h3 className="font-syne text-2xl sm:text-3xl font-bold uppercase text-white tracking-tight mt-1">
                      {selectedRod.title}
                    </h3>
                    <p className="text-xs text-[#D3D0C9] mt-1 font-light leading-relaxed">
                      {selectedRod.subtitle}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-white/10 text-xs">
                    <div>
                      <span className="text-[#8A8782] block text-[10px] uppercase">Finishes Available</span>
                      <span className="text-white font-medium">{selectedRod.finish}</span>
                    </div>
                    <div>
                      <span className="text-[#8A8782] block text-[10px] uppercase">Material Composition</span>
                      <span className="text-white font-medium">{selectedRod.composition}</span>
                    </div>
                    <div>
                      <span className="text-[#8A8782] block text-[10px] uppercase">Span &amp; Bracket Options</span>
                      <span className="text-white font-medium">{selectedRod.dimensions}</span>
                    </div>
                    <div>
                      <span className="text-[#8A8782] block text-[10px] uppercase">Recommended Space</span>
                      <span className="text-white font-medium">{selectedRod.recommendedRoom}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <span className="text-[10px] uppercase text-[#8A8782] block mb-2">Sculptural Finials</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedRod.finials.map((f, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-white/10 text-xs text-[#FAF8F5]"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <span className="text-[10px] uppercase text-[#8A8782] block mb-2">Key Engineering Features</span>
                    <ul className="space-y-1.5 text-xs text-[#D3D0C9]">
                      {selectedRod.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <a
                    href={`https://wa.me/919841134665?text=${encodeURIComponent(
                      `Hello A-Decor, I would like to order or inspect samples of ${selectedRod.title} (${selectedRod.tag}).`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-syne font-bold text-xs uppercase tracking-luxury flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Hardware Order</span>
                  </a>

                  <Link
                    to="/contact"
                    className="w-full py-3 px-5 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#100F0E] font-syne font-semibold text-xs uppercase tracking-luxury flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Book On-Site Measuring</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};
