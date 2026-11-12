import React, { useState, useRef, useCallback, memo } from 'react';
import {
  Sparkles,
  MoveHorizontal,
  ArrowRight,
  ShieldCheck,
  Lock,
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

const ANATOMY_HOTSPOTS: HotspotDiagnostic[] = [
  {
    id: 'armrest-piping',
    label: 'Armrest Seam & Bolster',
    xPercent: 15.5,
    yPercent: 55,
    beforeState: 'Split left corner seam exposing yellow sponge & missing bolster',
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
    afterState: 'Mortise-checked Burmese teak plinth hand-conditioned & French-polished',
  },
];

/** Pixel-matched Before/After horizontal swipe & lock stage with targeted upholstery pigment preview */
const BeforeAfterStage: React.FC = memo(() => {
  // Starts dead-center 50/50 split; locks firmly at any left/right drag position (0..100)
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeFabric, setActiveFabric] = useState(
    SITE_CONTENT.sofaRefurbishing.fabricOptions[0],
  );
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

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

  const isNaturalDefault =
    activeFabric.id === SITE_CONTENT.sofaRefurbishing.fabricOptions[0].id;
  const activeHotspot =
    ANATOMY_HOTSPOTS.find((h) => h.id === activeHotspotId) ?? null;

  return (
    <div className="mb-20">
      {/* Top Toolbar: Swipe Prompt & Left/Right Lock Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#8A8782] mb-3.5 px-1">
        <span className="flex items-center gap-2">
          <MoveHorizontal className="w-4 h-4 text-[#C5A880]" />
          <span className="uppercase tracking-widest text-[#FAF8F5] font-syne font-semibold">
            Swipe Divider Left / Right to Lock &amp; Compare
          </span>
        </span>

        {/* Lock Presets: Lock Before (Left) | Split 50/50 | Lock After (Right) */}
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/[0.05] border border-white/15">
          {[
            { label: 'Before', pos: 100, active: sliderPos >= 92 },
            { label: '50 / 50', pos: 50, active: sliderPos > 8 && sliderPos < 92 },
            { label: 'After', pos: 0, active: sliderPos <= 8 },
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

      {/* Exact 16:9 Architectural Transformation Viewport (Pointer-Captured & Locked) */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        data-cursor="DRAG"
        className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-white/15 shadow-2xl select-none touch-none cursor-ew-resize bg-[#181715]"
      >
        {/* RIGHT SIDE / BASE LAYER — AFTER: Emerald Velvet Master Rework */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={SITE_CONTENT.sofaRefurbishing.afterImage}
            alt="After: Forest Emerald Velvet Bespoke Upholstery Rework"
            draggable={false}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center pointer-events-none"
          />

          {/* Targeted Envelope Dye Mask — shifts ONLY sofa textile while walls & teak frame stay pure */}
          <div
            aria-hidden="true"
            className="absolute inset-0 mix-blend-color pointer-events-none transition-all duration-500"
            style={{
              backgroundColor: activeFabric.hex,
              opacity: isNaturalDefault ? 0 : 0.85,
              clipPath:
                'polygon(12.2% 78.2%, 12.2% 47.5%, 16.5% 44.5%, 20.5% 34.5%, 80.5% 34.5%, 84% 44.5%, 89% 47.5%, 89% 78.2%)',
            }}
          />

          <div
            className={`absolute top-4 sm:top-5 right-4 sm:right-5 z-10 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#141312]/88 backdrop-blur-md border border-[#C5A880]/60 text-[#FAF8F5] text-[10px] sm:text-xs font-syne font-bold tracking-wider uppercase shadow-xl flex items-center gap-2 transition-opacity duration-200 ${
              sliderPos > 90 ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
            <span>After: {activeFabric.name.replace(' (Shown)', '')} Rework</span>
          </div>
        </div>

        {/* LEFT SIDE CLIPPED LAYER — BEFORE: Worn, Stained, Frayed Seam & Sagged Sofa */}
        <div
          className={`absolute inset-0 overflow-hidden pointer-events-none ${
            isDragging ? 'transition-none' : 'transition-[clip-path] duration-300 ease-out'
          }`}
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <img
            src={SITE_CONTENT.sofaRefurbishing.beforeImage}
            alt="Before: Split Arm Seam, Coffee Stain, Sagged Foam & Scuffed Timber"
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
            <span>Before: Worn, Stained &amp; Sagged</span>
          </div>
        </div>

        {/* Interactive Anatomical Diagnostic Hotspots */}
        <div className="hidden sm:block absolute inset-0 z-20 pointer-events-none">
          {ANATOMY_HOTSPOTS.map((spot) => {
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
          {/* Live split readout badge at bottom of handle */}
          <div className="hidden sm:flex absolute bottom-3 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#100F0E]/90 border border-[#C5A880]/40 text-[9px] font-mono text-[#DEC8AA] whitespace-nowrap shadow-md pointer-events-none">
            {Math.round(sliderPos)}% Before / {Math.round(100 - sliderPos)}% After
          </div>
        </div>
      </div>

      {/* Tactile Textile Finish Bar */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/10">
        <div className="flex items-center gap-3">
          <span
            className="w-5 h-5 rounded-full border border-white/30 shrink-0"
            style={{ backgroundColor: activeFabric.hex }}
          />
          <div>
            <span className="block label-caps text-[#C5A880] text-[10px]">
              Preview Rework Textile Finish
            </span>
            <span className="text-xs sm:text-sm text-[#FAF8F5] font-syne font-bold uppercase">
              {activeFabric.name}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {SITE_CONTENT.sofaRefurbishing.fabricOptions.map((opt) => {
            const isSelected = activeFabric.id === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setActiveFabric(opt);
                  if (sliderPos > 75) {
                    setSliderPos(35);
                  }
                }}
                aria-label={opt.name}
                className={`w-8 h-8 rounded-full border-2 transition-transform duration-300 ${
                  isSelected
                    ? 'border-[#C5A880] scale-120 shadow-glow-gold'
                    : 'border-white/20 hover:scale-110 opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: opt.hex }}
                title={opt.name}
              />
            );
          })}
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
            {SITE_CONTENT.sofaRefurbishing.heroSubtitle}
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

        <BeforeAfterStage />

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

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/contact?service=upholstery-rework"
              className="px-8 py-4 rounded-full bg-[#C5A880] hover:bg-white text-[#100F0E] font-syne font-bold text-xs tracking-luxury uppercase flex items-center gap-2.5 transition-all shadow-glow-gold hover:scale-105"
            >
              <span>Schedule Frame Audit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`https://wa.me/919841134665?text=${encodeURIComponent(
                'Hello A-Decor Anna Nagar! I would like an estimate for upholstery rework for my seating suite.',
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[#FAF8F5] text-xs font-syne font-semibold tracking-luxury uppercase transition-all"
            >
              WhatsApp Photos for Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Backwards-compatible named export alias
export const SofaRefurbishingSection = UpholsteryReworkSection;
