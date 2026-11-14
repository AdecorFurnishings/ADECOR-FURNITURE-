import React, { useState, useRef, useCallback, memo } from 'react';
import {
  Sparkles,
  MoveHorizontal,
  ArrowRight,
  ShieldCheck,
  Lock,
  Columns,
  Split,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SITE_CONTENT } from '../../data/content';

interface HotspotDiagnostic {
  id: string;
  label: string;
  xPercent: number;
  yPercent: number;
  beforeState: string;
  afterState: string;
}

interface ReworkProject {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  beforeTitle: string;
  afterTitle: string;
  beforeImage: string;
  afterImage: string;
  compositeImage: string;
  description: string;
  specs: string[];
  hotspots: HotspotDiagnostic[];
}

const REWORK_PROJECTS: ReworkProject[] = [
  {
    id: 'boucle-sofa',
    name: 'Curved Boucle Lounge Suite',
    tagline: 'Bare Hardwood Chassis ➔ Modern Cream Boucle',
    badge: 'Chassis Rebuild',
    beforeTitle: 'Before: Bare Hardwood Carcass & Skeleton',
    afterTitle: 'After: Sculpted Cream Boucle Masterpiece',
    beforeImage: '/images/rework/rework_boucle_frame_before.jpg',
    afterImage: '/images/rework/rework_boucle_sofa_after.jpg',
    compositeImage: '/images/rework/rework_boucle_composite.jpg',
    description:
      'Full skeletal timber reinforcement. We reconstructed the curved arm profile, integrated high-density multi-layer cushioning, and custom-tailored heavy textured boucle over sculpted walnut wing legs.',
    specs: ['Kiln-Dried Hardwood Skeleton', '45+ Density HR Foam', 'Textured Italian Boucle', 'Hand-Polished Teak Legs'],
    hotspots: [
      {
        id: 'curved-arms',
        label: 'Sculpted Curved Armrest',
        xPercent: 18,
        yPercent: 48,
        beforeState: 'Precision CNC-cut ribbed structural wood with zero padding',
        afterState: 'Seamlessly wrapped in curved high-density foam & tactile boucle',
      },
      {
        id: 'comfort-cushion',
        label: 'Dual 45+ HR Comfort Core',
        xPercent: 50,
        yPercent: 65,
        beforeState: 'Open hardwood cross-bracing and spring support zone',
        afterState: 'Dual-layer 45 kg/m³ high-resilience foam wrapped in Dacron silk',
      },
      {
        id: 'teak-wings',
        label: 'Solid Teak Wing Legs',
        xPercent: 18,
        yPercent: 88,
        beforeState: 'Structural timber leg mountings aligned to chassis',
        afterState: 'Hand-finished walnut-toned curved wing plinths',
      },
    ],
  },
  {
    id: 'chaise-lounge',
    name: 'Royal Chesterfield Chaise Lounge',
    tagline: 'Workshop Raw Skeleton ➔ Peacock Teal Velvet',
    badge: 'Heritage Restoration',
    beforeTitle: 'Before: Workshop Skeletal Framework',
    afterTitle: 'After: Royal Peacock Teal Velvet Chaise',
    beforeImage: '/images/rework/rework_chaise_frame_before.jpg',
    afterImage: '/images/rework/rework_chaise_velvet_after.jpg',
    compositeImage: '/images/rework/rework_chaise_composite.jpg',
    description:
      'Workshop carcass restoration. Replaced fatigue with hand-tied coil spring suspension, deep-pleat diamond button tufting, and continuous brass nailhead studs on hand-turned cabriole legs.',
    specs: ['Bentwood Back Arch', 'Hand-Folded Diamond Tufts', 'Brass Nailhead Studding', 'Carved Cabriole Legs'],
    hotspots: [
      {
        id: 'scallop-crest',
        label: 'Bentwood Scallop Crest',
        xPercent: 78,
        yPercent: 30,
        beforeState: 'Raw steam-bent hardwood profile in carpenter atelier',
        afterState: 'Plush diamond-tufted bolster backrest in royal teal velvet',
      },
      {
        id: 'tufted-chassis',
        label: 'Tensile Spring Base',
        xPercent: 42,
        yPercent: 62,
        beforeState: 'Open timber joists awaiting coil suspension tie-downs',
        afterState: 'Deep-cushioned long seat with firm ergonomic support',
      },
      {
        id: 'brass-cabriole',
        label: 'Studs & Cabriole Legs',
        xPercent: 12,
        yPercent: 88,
        beforeState: 'Rough-hewn timber cabriole legs before sanding',
        afterState: 'Polished espresso cabriole legs with hand-hammered brass studs',
      },
    ],
  },
  {
    id: 'emerald-settee',
    name: 'Mid-Century Teak Settee',
    tagline: 'Worn, Stained & Sagged ➔ Forest Emerald Velvet',
    badge: 'Atelier Classical',
    beforeTitle: 'Before: Worn, Stained & Sagged',
    afterTitle: 'After: Forest Emerald Velvet Rework',
    beforeImage: '/images/hd/upholstery_before.jpg',
    afterImage: '/images/hd/upholstery_after.jpg',
    compositeImage: '/images/hd/upholstery_after.jpg',
    description:
      'Complete strip-down to bare Burmese teak. Rebuilt Pirelli webbing, new 45+ HR ergonomic core, and French-piped emerald velvet tailoring.',
    specs: ['Burmese Teak Plinth', 'Pirelli Elastic Webbing', 'French-Piped Seams', 'Stain-Resistant Velvet'],
    hotspots: [
      {
        id: 'armrest-piping',
        label: 'Armrest Seam & Bolster',
        xPercent: 15.5,
        yPercent: 55,
        beforeState: 'Split corner seam exposing yellow sponge & missing bolster',
        afterState: 'Matched emerald bolsters & taut double-needle French piping',
      },
      {
        id: 'hr-core',
        label: '45+ HR Comfort Core',
        xPercent: 52,
        yPercent: 63,
        beforeState: 'Stained & sagging cushions with flattened foam resilience',
        afterState: 'Multi-density 45 kg/m³ HR core wrapped in breathable Dacron silk',
      },
      {
        id: 'timber-chassis',
        label: 'Seasoned Teak Chassis',
        xPercent: 34,
        yPercent: 81.5,
        beforeState: 'Dry, bleached & scuffed exposed timber rail and tapered legs',
        afterState: 'Burmese teak plinth hand-conditioned & French-polished',
      },
    ],
  },
];

/** Pixel-matched Before/After horizontal swipe stage supporting multiple showcase projects */
const BeforeAfterStage: React.FC = memo(() => {
  const [activeProjectId, setActiveProjectId] = useState<string>('boucle-sofa');
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side'>('slider');

  const containerRef = useRef<HTMLDivElement>(null);

  const activeProject =
    REWORK_PROJECTS.find((p) => p.id === activeProjectId) ?? REWORK_PROJECTS[0];

  const updateSliderFromClientX = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / Math.max(1, rect.width)) * 100));
    setSliderPos(Number(percentage.toFixed(2)));
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    updateSliderFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateSliderFromClientX(e.clientX);
  };

  const handlePointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setIsDragging(false);
  };

  const handleSliderKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPos((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPos((prev) => Math.min(100, prev + 5));
    }
  };

  const activeHotspot =
    activeProject.hotspots.find((h) => h.id === activeHotspotId) ?? null;

  const handleNextProject = () => {
    const currentIdx = REWORK_PROJECTS.findIndex((p) => p.id === activeProjectId);
    const nextIdx = (currentIdx + 1) % REWORK_PROJECTS.length;
    setActiveProjectId(REWORK_PROJECTS[nextIdx].id);
    setActiveHotspotId(null);
    setSliderPos(50);
  };

  const handlePrevProject = () => {
    const currentIdx = REWORK_PROJECTS.findIndex((p) => p.id === activeProjectId);
    const prevIdx = (currentIdx - 1 + REWORK_PROJECTS.length) % REWORK_PROJECTS.length;
    setActiveProjectId(REWORK_PROJECTS[prevIdx].id);
    setActiveHotspotId(null);
    setSliderPos(50);
  };

  return (
    <div className="mb-20">
      {/* Mobile Top Left Navigation Hint & Project Counter */}
      <div className="flex sm:hidden items-center justify-between w-full mb-3 px-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/40 text-[#C5A880] text-[11px] font-mono tracking-wider uppercase shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D90B0B] animate-ping" />
          <span>Swipe Right ➔ for Projects 02 &amp; 03</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handlePrevProject}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-[#C5A880] text-white hover:text-black transition-all"
            aria-label="Previous project"
            title="Previous project"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono text-[#FAF8F5] font-semibold px-1">
            0{REWORK_PROJECTS.findIndex((p) => p.id === activeProjectId) + 1}/0{REWORK_PROJECTS.length}
          </span>
          <button
            type="button"
            onClick={handleNextProject}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-[#C5A880] text-white hover:text-black transition-all"
            aria-label="Next project"
            title="Next project"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 1. Project Selector Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#1C1B19] border border-white/10 w-full sm:w-auto overflow-x-auto no-scrollbar scroll-smooth">
          {REWORK_PROJECTS.map((proj, idx) => {
            const isSelected = proj.id === activeProjectId;
            return (
              <button
                key={proj.id}
                type="button"
                onClick={() => {
                  setActiveProjectId(proj.id);
                  setActiveHotspotId(null);
                  setSliderPos(50);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-syne uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 shrink-0 ${
                  isSelected
                    ? 'bg-[#C5A880] text-[#100F0E] font-bold shadow-md'
                    : 'text-[#D3D0C9] hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="font-mono text-[10px] opacity-70">0{idx + 1}</span>
                <span>{proj.name}</span>
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle: Slider vs Side-by-Side */}
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/[0.05] border border-white/15 shrink-0">
          <button
            type="button"
            onClick={() => setViewMode('slider')}
            className={`px-3 py-1.5 rounded-full text-[10px] font-syne font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              viewMode === 'slider'
                ? 'bg-[#C5A880] text-[#100F0E] shadow-sm'
                : 'text-[#C4C0B8] hover:text-white'
            }`}
          >
            <Split className="w-3 h-3" />
            <span>Interactive Slider</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('side-by-side')}
            className={`px-3 py-1.5 rounded-full text-[10px] font-syne font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              viewMode === 'side-by-side'
                ? 'bg-[#C5A880] text-[#100F0E] shadow-sm'
                : 'text-[#C4C0B8] hover:text-white'
            }`}
          >
            <Columns className="w-3 h-3" />
            <span>Side-by-Side</span>
          </button>
        </div>
      </div>

      {/* 2. SLIDER VIEW MODE */}
      {viewMode === 'slider' && (
        <>
          {/* Top Toolbar: Swipe Prompt & Left/Right Lock Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#8A8782] mb-3.5 px-1">
            <span className="flex items-center gap-2">
              <MoveHorizontal className="w-4 h-4 text-[#C5A880]" />
              <span className="uppercase tracking-widest text-[#FAF8F5] font-syne font-semibold text-[11px]">
                Swipe Divider Left / Right to Inspect Framework vs Finish
              </span>
            </span>

            {/* Lock Presets: Lock Before (Left) | Split 50/50 | Lock After (Right) */}
            <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/[0.05] border border-white/15">
              {[
                { label: 'Before Frame', pos: 100, active: sliderPos >= 92 },
                { label: '50 / 50', pos: 50, active: sliderPos > 8 && sliderPos < 92 },
                { label: 'After Finish', pos: 0, active: sliderPos <= 8 },
              ].map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setIsDragging(false);
                    setSliderPos(preset.pos);
                  }}
                  className={`px-3 py-1 rounded-full text-[10px] font-syne font-semibold uppercase tracking-wider transition-all flex items-center gap-1 ${
                    preset.active
                      ? 'bg-[#C5A880] text-[#100F0E] shadow-sm'
                      : 'text-[#C4C0B8] hover:text-white'
                  }`}
                >
                  {preset.active && <Lock className="w-2.5 h-2.5" />}
                  <span>{preset.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Exact Architectural Transformation Viewport (Pointer-Captured & Locked) */}
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            className="relative w-full aspect-[16/9] sm:aspect-[1.9/1] rounded-3xl overflow-hidden border border-white/15 shadow-2xl select-none touch-none cursor-ew-resize bg-[#181715]"
          >
            {/* RIGHT SIDE / BASE LAYER — AFTER: Completed Luxury Upholstery */}
            <div className="absolute inset-0 w-full h-full bg-[#181715] flex items-center justify-center">
              <img
                src={activeProject.afterImage}
                alt={activeProject.afterTitle}
                draggable={false}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center pointer-events-none"
              />

              <div
                className={`absolute top-4 sm:top-5 right-4 sm:right-5 z-10 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#141312]/88 backdrop-blur-md border border-[#C5A880]/60 text-[#FAF8F5] text-[10px] sm:text-xs font-syne font-bold tracking-wider uppercase shadow-xl flex items-center gap-2 transition-opacity duration-200 ${
                  sliderPos > 90 ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
                <span>{activeProject.afterTitle}</span>
              </div>
            </div>

            {/* LEFT SIDE CLIPPED LAYER — BEFORE: Raw Wooden Frame / Workshop Chassis */}
            <div
              className={`absolute inset-0 overflow-hidden pointer-events-none bg-[#181715] flex items-center justify-center ${
                isDragging ? 'transition-none' : 'transition-[clip-path] duration-300 ease-out'
              }`}
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <img
                src={activeProject.beforeImage}
                alt={activeProject.beforeTitle}
                draggable={false}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center"
              />
              <div
                className={`absolute top-4 sm:top-5 left-4 sm:left-5 z-10 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#1E1D1B]/88 backdrop-blur-md border border-white/25 text-[#D3D0C9] text-[10px] sm:text-xs font-syne font-semibold tracking-wider uppercase shadow-xl flex items-center gap-2 transition-opacity duration-200 ${
                  sliderPos < 10 ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#C87D55]" />
                <span>{activeProject.beforeTitle}</span>
              </div>
            </div>

            {/* Interactive Anatomical Diagnostic Hotspots */}
            <div className="hidden sm:block absolute inset-0 z-20 pointer-events-none">
              {activeProject.hotspots.map((spot) => {
                const isSelected = activeHotspotId === spot.id;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveHotspotId(isSelected ? null : spot.id);
                    }}
                    onMouseEnter={() => setActiveHotspotId(spot.id)}
                    onMouseLeave={() => setActiveHotspotId(null)}
                    aria-label={`Inspect ${spot.label}`}
                    style={{ left: `${spot.xPercent}%`, top: `${spot.yPercent}%` }}
                    className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 group"
                  >
                    <span
                      className={`flex items-center justify-center w-6 h-6 rounded-full border transition-all duration-300 ${
                        isSelected
                          ? 'bg-[#C5A880] border-white text-[#100F0E] scale-125 shadow-glow-gold'
                          : 'bg-[#100F0E]/85 border-[#C5A880] text-[#FAF8F5] hover:scale-115'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    </span>
                    {!isSelected && (
                      <span className="absolute inset-0 rounded-full border border-[#C5A880]/70 animate-ping pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Floating Diagnostic Comparison Tooltip */}
            {activeHotspot && (
              <div className="hidden sm:block absolute bottom-4 left-4 right-4 md:left-auto md:right-5 md:w-80 z-30 p-3.5 rounded-2xl bg-[#141312]/92 backdrop-blur-md border border-[#C5A880]/55 shadow-2xl pointer-events-none text-left">
                <p className="font-syne text-xs font-bold uppercase tracking-wider text-[#C5A880]">
                  {activeHotspot.label}
                </p>
                <p className="mt-1.5 text-[11px] text-[#A8A39B] leading-snug">
                  <span className="uppercase font-mono text-[9px] text-white/60 mr-1.5">Before:</span>
                  {activeHotspot.beforeState}
                </p>
                <p className="mt-1 text-[11px] text-[#FAF8F5] leading-snug">
                  <span className="uppercase font-mono text-[9px] text-[#C5A880] mr-1.5">Rework:</span>
                  {activeHotspot.afterState}
                </p>
              </div>
            )}

            {/* Brass Divider Line & Keyboard-Accessible Handle */}
            <div
              role="slider"
              tabIndex={0}
              aria-label="Before and After upholstery rework split comparison"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(sliderPos)}
              onKeyDown={handleSliderKeyDown}
              className={`absolute inset-y-0 w-[2px] bg-[#C5A880] shadow-[0_0_24px_rgba(197,168,128,0.9)] z-20 focus:outline-none ${
                isDragging ? 'transition-none' : 'transition-[left] duration-300 ease-out'
              }`}
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#100F0E] border-2 border-[#C5A880] text-[#FAF8F5] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                <MoveHorizontal className="w-4 h-4 text-[#C5A880]" />
              </div>
              <div className="hidden sm:flex absolute bottom-3 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#100F0E]/90 border border-[#C5A880]/40 text-[9px] font-mono text-[#DEC8AA] whitespace-nowrap shadow-md pointer-events-none">
                {Math.round(sliderPos)}% Before / {Math.round(100 - sliderPos)}% After
              </div>
            </div>
          </div>
        </>
      )}

      {/* 3. SIDE-BY-SIDE CARDS VIEW MODE */}
      {viewMode === 'side-by-side' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          {/* Card 1: Before Frame */}
          <div className="rounded-3xl bg-[#161514] border border-white/10 overflow-hidden shadow-xl flex flex-col">
            <div className="relative aspect-[16/10] bg-[#0A0909] overflow-hidden">
              <img
                src={activeProject.beforeImage}
                alt={activeProject.beforeTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[#D3D0C9] text-[10px] font-mono uppercase tracking-wider">
                Phase 1: Bare Skeleton Frame
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C87D55]">
                  Structural Chassis
                </span>
                <h4 className="font-syne text-lg text-white font-bold mt-1">
                  {activeProject.beforeTitle}
                </h4>
                <p className="text-xs text-[#8A8782] mt-2 leading-relaxed">
                  Timber carcass alignment, joint doweling, and frame reinforcement in our Anna Nagar workshop prior to suspension installation.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: After Finish */}
          <div className="rounded-3xl bg-[#161514] border border-[#C5A880]/50 overflow-hidden shadow-xl flex flex-col">
            <div className="relative aspect-[16/10] bg-[#0A0909] overflow-hidden">
              <img
                src={activeProject.afterImage}
                alt={activeProject.afterTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#C5A880] text-[#C5A880] text-[10px] font-mono uppercase tracking-wider">
                Phase 2: Master Upholstery Rework
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
                  Finished Masterpiece
                </span>
                <h4 className="font-syne text-lg text-white font-bold mt-1">
                  {activeProject.afterTitle}
                </h4>
                <p className="text-xs text-[#D3D0C9] mt-2 leading-relaxed">
                  Complete upholstery overhaul with 45+ HR resilience foam, tailored high-wear luxury textile, and hand-conditioned timber plinth.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Active Project Details & Specs Bar */}
      <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
              {activeProject.badge}
            </span>
            <span className="text-xs text-white/40">•</span>
            <span className="text-xs text-[#8A8782] font-mono">{activeProject.name}</span>
          </div>
          <p className="text-xs sm:text-sm text-[#D3D0C9] font-light leading-relaxed">
            {activeProject.description}
          </p>
        </div>

        {/* Specs Chips */}
        <div className="flex flex-wrap gap-2 shrink-0">
          {activeProject.specs.map((spec, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-lg bg-[#141312] border border-white/10 text-[10px] font-mono text-[#FAF8F5]/80"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

BeforeAfterStage.displayName = 'BeforeAfterStage';

export const UpholsteryReworkSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#100F0E] text-[#FAF8F5] relative overflow-x-clip border-t border-white/10">
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-20" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A880]/50 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C5A880]/50 text-[#C5A880] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="label-caps text-[10px] tracking-luxury text-[#FAF8F5]">
              Atelier Structural Restoration
            </span>
          </div>

          <h2 className="font-syne text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#FAF8F5]">
            {SITE_CONTENT.sofaRefurbishing.heroTitle}
          </h2>
          <p className="mt-4 text-[#D3D0C9] text-base sm:text-lg font-light leading-relaxed">
            From raw structural carcasses and workshop skeletons to tailored luxury living suites. We rebuild frame suspension, high-resilience comfort cores, and bespoke fabric tailoring.
          </p>

          <div className="mt-8 mx-auto max-w-md flex items-center justify-center">
            <svg viewBox="0 0 360 12" className="w-full h-3 overflow-visible" aria-hidden="true">
              <motion.line
                x1="0"
                y1="6"
                x2="360"
                y2="6"
                stroke="#C5A880"
                strokeWidth="1.2"
                strokeDasharray="6 6"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.75 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
              />
              <circle cx="180" cy="6" r="3" fill="#C5A880" />
            </svg>
          </div>
        </div>

        {/* Multi-Project Before/After Stage */}
        <BeforeAfterStage />

        {/* Atelier CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#23201D] via-[#1B1917] to-[#23201D] p-8 sm:p-12 border border-[#C5A880]/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-[#C5A880] text-xs font-mono uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Full Strip-Down · Master Frame Guarantee · Bespoke Tailoring</span>
            </div>
            <h4 className="font-syne text-2xl sm:text-3xl text-white font-bold uppercase">
              Ready to rework your living room centerpiece?
            </h4>
            <p className="text-sm text-[#D3D0C9] max-w-xl font-light">
              Book a master upholsterer at our Anna Nagar atelier or send suite photos for an itemized frame, foam, and yardage estimate.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/sofa-upholstery-rework"
              className="px-7 py-3.5 rounded-full bg-[#C5A880] hover:bg-white text-[#100F0E] font-syne font-bold text-xs tracking-luxury uppercase flex items-center gap-2 transition-all shadow-glow-gold hover:scale-105"
            >
              <span>Explore All Sofa &amp; Rework Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/contact?service=upholstery-rework"
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[#FAF8F5] text-xs font-syne font-semibold tracking-luxury uppercase transition-all"
            >
              Schedule Frame Audit
            </Link>

            <a
              href={`https://wa.me/919841134665?text=${encodeURIComponent(
                'Hello A-Decor Anna Nagar! I would like an estimate for upholstery rework for my seating suite.',
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/40 text-xs font-syne font-semibold tracking-luxury uppercase transition-all flex items-center gap-2"
            >
              WhatsApp Photos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Backwards-compatible named export alias
export const SofaRefurbishingSection = UpholsteryReworkSection;
