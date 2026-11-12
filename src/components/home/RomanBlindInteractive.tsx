import React, { useState, useRef, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import {
  Layers,
  Sliders,
  ArrowRight,
  Sparkles,
  Sun,
  ArrowUpDown,
  RotateCcw,
} from 'lucide-react';
import { SITE_CONTENT } from '../../data/content';
import type { RomanBlindStyle } from '../../data/content';

gsap.registerPlugin(ScrollTrigger);

interface RomanBlindInteractiveProps {
  externalSelected?: RomanBlindStyle | null;
  onSelectStyle?: (style: RomanBlindStyle) => void;
  includeShadesCollection?: boolean;
  initialTab?: 'roman' | 'shades';
  theme?: 'light' | 'dark';
  hideHeader?: boolean;
}

type BlindMechanicsKind = 'roller' | 'slatted' | 'sculpted' | 'tailored';

function getBlindMechanicsKind(styleId: string): BlindMechanicsKind {
  if (styleId.includes('roller')) {
    return 'roller';
  }
  if (
    styleId.includes('venetian') ||
    styleId.includes('wooden') ||
    styleId.includes('bamboo') ||
    styleId.includes('woven-wood') ||
    styleId.includes('pleated') ||
    styleId.includes('cellular') ||
    styleId.includes('zebra')
  ) {
    return 'slatted';
  }
  if (
    styleId.includes('hobbled') ||
    styleId.includes('austrian') ||
    styleId.includes('balloon') ||
    styleId.includes('relaxed') ||
    styleId.includes('slouched') ||
    styleId.includes('butterfly')
  ) {
    return 'sculpted';
  }
  return 'tailored';
}

function buildSideFoldPath(blindLift: number, kind: BlindMechanicsKind): string {
  const topY = 14;
  const maxSpan = 82;
  const span = Math.max(18, (1 - blindLift * 0.75) * maxSpan);
  const bottomY = topY + span;

  if (kind === 'roller') {
    return `M 30 ${topY} L 30 ${bottomY}`;
  }

  if (kind === 'slatted') {
    const rungs = 9;
    const step = span / rungs;
    let path = `M 30 ${topY}`;
    for (let i = 0; i < rungs; i++) {
      const yMid = topY + step * (i + 0.5);
      const yEnd = topY + step * (i + 1);
      const tilt = 4.5 + blindLift * 3;
      path += ` L ${30 + tilt} ${yMid.toFixed(1)} L ${30 - tilt * 0.4} ${yEnd.toFixed(1)}`;
    }
    return path;
  }

  const folds = kind === 'sculpted' ? 5 : 6;
  const step = span / folds;
  const amplitude =
    kind === 'sculpted' ? 9 + blindLift * 5 : 5 + blindLift * 4;

  let path = `M 30 ${topY}`;
  for (let i = 0; i < folds; i++) {
    const yMid = topY + step * (i + 0.5);
    const yEnd = topY + step * (i + 1);
    const xOut = i % 2 === 0 ? 30 + amplitude : 30 - amplitude * 0.35;
    path += ` Q ${xOut.toFixed(1)} ${yMid.toFixed(1)} 30 ${yEnd.toFixed(1)}`;
  }
  return path;
}

interface StyleThumbnailGridProps {
  items: RomanBlindStyle[];
  aspectClass: string;
  selectedId: string;
  isDark: boolean;
  onChoose: (style: RomanBlindStyle) => void;
}

/** Memoized architectural swatch selector — prevents card grid re-renders during scroll or cord drag */
const StyleThumbnailGrid: React.FC<StyleThumbnailGridProps> = memo(
  ({ items, aspectClass, selectedId, isDark, onChoose }) => {
    const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 100;
      const y = ((e.clientY - rect.top) / Math.max(1, rect.height)) * 100;
      e.currentTarget.style.setProperty('--glint-x', `${x}%`);
      e.currentTarget.style.setProperty('--glint-y', `${y}%`);
    };

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
        {items.map((style) => {
          const isSelected = selectedId === style.id;
          return (
            <button
              key={style.id}
              type="button"
              onClick={() => onChoose(style)}
              onPointerMove={handlePointerMove}
              className={`group relative text-left rounded-xl overflow-hidden border p-2.5 transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out hover:-translate-y-1 ${
                isSelected
                  ? isDark
                    ? 'border-[#C5A880] bg-[#C5A880]/15 text-[#FAF8F5] shadow-glow-gold scale-[1.02]'
                    : 'border-[#C5A880] bg-[#1E1D1B] text-[#FAF8F5] shadow-lg scale-[1.02]'
                  : isDark
                    ? 'border-white/10 bg-[#1D1B18] hover:border-[#C5A880]/70 text-[#FAF8F5]'
                    : 'border-[#D3D0C9] bg-white hover:border-[#C5A880] text-[#1E1D1B] hover:shadow-md'
              }`}
            >
              <div
                className={`w-full ${aspectClass} rounded-lg overflow-hidden mb-2.5 bg-[#ECE9E2] relative`}
              >
                <img
                  src={style.image}
                  alt={style.name}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
                {/* Localized daylight specular sheen tracking cursor */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-75 transition-opacity duration-300 mix-blend-soft-light"
                  style={{
                    background:
                      'radial-gradient(circle 140px at var(--glint-x, 50%) var(--glint-y, 35%), rgba(255, 248, 226, 0.85), transparent 70%)',
                  }}
                />
                {isSelected && (
                  <div className="absolute inset-0 bg-[#C5A880]/15 ring-1 ring-inset ring-[#C5A880]/60 pointer-events-none" />
                )}
              </div>

              <p className="font-medium text-xs truncate group-hover:text-[#C5A880] transition-colors">
                {style.name}
              </p>
              <p
                className={`text-[10px] truncate ${
                  isSelected ? 'text-[#DEC8AA]' : 'text-[#8A8782]'
                }`}
              >
                {style.stackStyle}
              </p>
            </button>
          );
        })}
      </div>
    );
  },
);

StyleThumbnailGrid.displayName = 'StyleThumbnailGrid';

interface ArchitecturalWindowStageProps {
  selectedStyle: RomanBlindStyle;
  isDark: boolean;
  hideHeader: boolean;
  smoothScrollProgress: MotionValue<number>;
}

/** Isolated sticky interactive window bay — handles scroll-scrubbed lift & direct cord physics without re-rendering swatch cards */
const ArchitecturalWindowStage: React.FC<ArchitecturalWindowStageProps> = memo(
  ({ selectedStyle, isDark, hideHeader, smoothScrollProgress }) => {
    const [blindLift, setBlindLift] = useState(hideHeader ? 0.34 : 0.04);
    const [hasManualControl, setHasManualControl] = useState(hideHeader);
    const [isDraggingCord, setIsDraggingCord] = useState(false);
    const [cordSwingDeg, setCordSwingDeg] = useState(0);

    const windowBoxRef = useRef<HTMLDivElement>(null);
    const lastDragYRef = useRef<number | null>(null);
    const mechanicsKind = getBlindMechanicsKind(selectedStyle.id);

    const scrollControlled = !hideHeader && !hasManualControl;

    // Frame depth perspective subtly levels out as the user scrolls deeper into the studio
    const frameTiltX = useTransform(smoothScrollProgress, [0, 0.85], [3.2, 0]);
    const frameScale = useTransform(smoothScrollProgress, [0, 0.85], [0.972, 1]);

    // Continuous mechanical travel across scroll (4% drawn closed -> 76% sunlit open stack)
    useMotionValueEvent(smoothScrollProgress, 'change', (latest) => {
      if (scrollControlled && !isDraggingCord) {
        const mapped = 0.04 + latest * 0.72;
        setBlindLift(Number(mapped.toFixed(2)));
      }
    });

    useEffect(() => {
      if (!isDraggingCord) return;

      const handleMove = (e: PointerEvent) => {
        if (!windowBoxRef.current) return;
        const rect = windowBoxRef.current.getBoundingClientRect();
        const ratioDown = Math.max(
          0.12,
          Math.min(1, (e.clientY - rect.top) / Math.max(1, rect.height)),
        );
        const computedLift = Math.max(
          0,
          Math.min(0.88, (1 - ratioDown) / 0.72),
        );
        setBlindLift(Number(computedLift.toFixed(2)));

        if (lastDragYRef.current !== null) {
          const deltaY = e.clientY - lastDragYRef.current;
          const swing = Math.max(-10, Math.min(10, deltaY * 0.7));
          setCordSwingDeg(Number(swing.toFixed(1)));
        }
        lastDragYRef.current = e.clientY;
      };

      const handleUp = () => {
        setIsDraggingCord(false);
        setCordSwingDeg(0);
        lastDragYRef.current = null;
      };

      window.addEventListener('pointermove', handleMove);
      window.addEventListener('pointerup', handleUp);
      window.addEventListener('pointercancel', handleUp);
      return () => {
        window.removeEventListener('pointermove', handleMove);
        window.removeEventListener('pointerup', handleUp);
        window.removeEventListener('pointercancel', handleUp);
      };
    }, [isDraggingCord]);

    const normalizedLift = blindLift / 0.88;
    const blindDropPercent = (1 - blindLift * 0.72) * 100;
    const daylightGlowOpacity = 0.24 + normalizedLift * 0.76;
    const foldPath = buildSideFoldPath(blindLift, mechanicsKind);
    const schematicBottomY = 14 + Math.max(18, (1 - blindLift * 0.75) * 82);
    const rollRadius = mechanicsKind === 'roller' ? 3.2 + normalizedLift * 2.4 : 0;
    const foldPatternPitch =
      mechanicsKind === 'slatted'
        ? Math.round(18 - normalizedLift * 8)
        : Math.round(48 - normalizedLift * 18);

    // Zero CSS lag while dragging OR actively linked to scroll so motion responds instantaneously
    const useSmoothPresetEase = !isDraggingCord && !scrollControlled;

    return (
      <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col items-center">
        <motion.div
          style={
            !hideHeader
              ? {
                  scale: frameScale,
                  rotateX: frameTiltX,
                  transformPerspective: 1200,
                }
              : undefined
          }
          className={`w-full max-w-md rounded-3xl p-5 sm:p-6 border relative transition-colors duration-500 ${
            isDark
              ? 'bg-[#1D1B18]/90 backdrop-blur-xl border-white/15 shadow-2xl'
              : 'bg-[#ECE9E2] border-[#D3D0C9] shadow-soft-luxury'
          }`}
        >
          {/* Ambient sunlit glow wash onto bottom apron frame */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-3 inset-x-10 h-6 rounded-full"
            style={{
              opacity: 0.1 + normalizedLift * 0.34,
              background:
                'radial-gradient(ellipse at center, rgba(197, 168, 128, 0.58), transparent 72%)',
            }}
          />

          {/* Window Header Cassette Pelmet */}
          <div className="w-full h-9 rounded-t-xl bg-[#2D2B28] text-white flex items-center justify-between px-4 text-[10px] tracking-widest font-mono shadow-inner border border-white/10">
            <span className="flex items-center gap-2 min-w-0 pr-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0" />
              <span className="text-[#C5A880] uppercase truncate">
                {selectedStyle.name}
              </span>
            </span>
            <span className="flex items-center gap-1.5 text-white/85 shrink-0">
              <Sun className="w-3 h-3 text-[#C5A880]" />
              <span>DAYLIGHT {Math.round(daylightGlowOpacity * 100)}%</span>
            </span>
          </div>

          {/* Recessed Architectural Window Jamb & Draggable Bay */}
          <div
            ref={windowBoxRef}
            onPointerDown={(e) => {
              setHasManualControl(true);
              setIsDraggingCord(true);
              lastDragYRef.current = e.clientY;
            }}
            data-cursor="DRAG"
            className={`relative w-full aspect-[4/4.85] bg-white rounded-b-xl overflow-hidden border-[5px] border-t-0 border-[#2D2B28] shadow-[inset_0_10px_22px_rgba(30,29,27,0.2)] select-none touch-none ${
              isDraggingCord ? 'cursor-ns-resize' : 'cursor-grab'
            }`}
          >
            {/* Architectural Inside-Mount Inner Shadow Jamb Strips */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-2 z-30 bg-gradient-to-r from-black/25 to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-2 z-30 bg-gradient-to-l from-black/25 to-transparent"
            />

            {/* Precision Left Jamb Vertical Travel Millimeter Ruler */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-2.5 top-3 bottom-5 w-4 z-30 flex flex-col justify-between"
            >
              {[100, 75, 50, 25, 0].map((tick) => (
                <div key={tick} className="flex items-center gap-1">
                  <span className="w-2 h-[1px] bg-[#1E1D1B]/35" />
                </div>
              ))}
              {/* Moving Brass Index Pointer aligned with blind hem */}
              <div
                className={`absolute -left-0.5 w-2 h-2 rotate-45 bg-[#C5A880] border border-[#1E1D1B]/50 shadow-sm ${
                  useSmoothPresetEase ? 'transition-all duration-300 ease-out' : 'transition-none'
                }`}
                style={{
                  top: `calc(${blindDropPercent}% - 4px)`,
                }}
              />
            </div>

            {/* Natural Daylight Exterior Vista & Volumetric Diagonal Sunbeams */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-[#A5C3D6] via-[#DCE7EE] to-[#BFD4C5] flex items-center justify-center"
              style={{ opacity: daylightGlowOpacity }}
            >
              <div
                className="w-60 h-60 rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255, 250, 232, 0.82), transparent 70%)',
                  transform: `translateY(${(0.5 - blindLift) * 28}px)`,
                }}
              />

              {/* Diagonal Volumetric Sunbeam Shafts hitting uncovered glass & sill */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  opacity: 0.25 + normalizedLift * 0.42,
                  background:
                    'repeating-linear-gradient(124deg, rgba(255,255,255,0.52) 0px, rgba(255,255,255,0.52) 16px, transparent 16px, transparent 48px)',
                }}
              />

              {/* Architectural Casement Glass Mullions */}
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-3 pointer-events-none opacity-65">
                <div className="border-r-2 border-b-2 border-white/85" />
                <div className="border-b-2 border-white/85" />
                <div className="border-r-2 border-b-2 border-white/85" />
                <div className="border-b-2 border-white/85" />
                <div className="border-r-2 border-white/85" />
                <div className="border-white/85" />
              </div>
            </div>

            {/* Cast Interior Shadow Projected Beneath Bottom Rail */}
            <div
              aria-hidden="true"
              className={`absolute inset-x-0 z-10 pointer-events-none ${
                useSmoothPresetEase ? 'transition-all duration-300 ease-out' : 'transition-none'
              }`}
              style={{
                top: `${blindDropPercent}%`,
                height: `${26 + (1 - normalizedLift) * 28}px`,
                opacity: 0.56 - normalizedLift * 0.26,
                background:
                  'linear-gradient(180deg, rgba(24,22,19,0.44) 0%, rgba(24,22,19,0.12) 48%, transparent 100%)',
              }}
            />

            {/* THE MOVING ROMAN BLIND / WINDOW SHADE */}
            <div
              className={`absolute inset-x-0 top-0 overflow-hidden shadow-2xl z-20 ${
                useSmoothPresetEase ? 'transition-all duration-300 ease-out' : 'transition-none'
              }`}
              style={{
                height: `${blindDropPercent}%`,
              }}
            >
              {/* Upward Physical Draw Travel + Tight Inside-Mount Frame Fit */}
              <img
                src={selectedStyle.image}
                alt={selectedStyle.name}
                draggable={false}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top filter contrast-[1.04] pointer-events-none origin-top"
                style={{
                  transform: `translate3d(0, ${(-normalizedLift * 14).toFixed(2)}%, 0) scale(1.07)`,
                }}
              />

              {/* Top Wrapped Cylinder Shadow for Roller Systems */}
              {mechanicsKind === 'roller' && (
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 pointer-events-none bg-gradient-to-b from-black/48 via-black/15 to-transparent"
                  style={{ height: `${10 + normalizedLift * 14}px` }}
                />
              )}

              {/* Dynamic Compression Pleat / Slat Cadence */}
              {mechanicsKind !== 'roller' && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none mix-blend-multiply"
                  style={{
                    opacity: mechanicsKind === 'slatted' ? 0.34 : 0.38,
                    background: `repeating-linear-gradient(
                      0deg,
                      rgba(0,0,0,0.48) 0px,
                      transparent ${mechanicsKind === 'slatted' ? 2 : 4}px,
                      transparent ${foldPatternPitch - 4}px,
                      rgba(0,0,0,0.38) ${foldPatternPitch}px
                    )`,
                  }}
                />
              )}

              {/* Layered Stacking Bellows Gathering Above Hem Bar */}
              {(mechanicsKind === 'sculpted' || mechanicsKind === 'tailored') && (
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-4 pointer-events-none"
                  style={{
                    height: `${24 + normalizedLift * 44}px`,
                    background:
                      mechanicsKind === 'sculpted'
                        ? 'repeating-linear-gradient(0deg, rgba(255,252,244,0.24) 0px, rgba(255,252,244,0.24) 2px, rgba(0,0,0,0.28) 8px, transparent 15px)'
                        : 'repeating-linear-gradient(0deg, rgba(255,252,244,0.16) 0px, rgba(255,252,244,0.16) 1px, rgba(0,0,0,0.24) 7px, transparent 13px)',
                  }}
                />
              )}

              {/* Weighted Bottom Hem Rail + Brushed Brass Pull Tab */}
              <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-b from-[#2D2B28]/45 via-[#1E1D1B]/68 to-[#141312]/82 border-t border-white/30 flex items-center justify-center">
                <span className="w-12 h-1.5 rounded-full bg-gradient-to-r from-[#8E7048] via-[#DEC8AA] to-[#8E7048] shadow-sm border border-white/30" />
              </div>
            </div>

            {/* Chamfered Interior Stone Window Sill Ledge */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 inset-x-0 h-3 z-10 pointer-events-none bg-gradient-to-b from-[#EFECE6] to-[#D3D0C9] border-t border-white/85 shadow-inner"
            />

            {/* Live Graphical Side-Elevation Pleat Blueprint */}
            <div
              className={`absolute bottom-4 left-3.5 z-30 p-2 rounded-xl backdrop-blur-md border pointer-events-none ${
                isDark
                  ? 'bg-[#141312]/85 border-white/15'
                  : 'bg-[#FAF8F5]/92 border-[#D3D0C9] shadow-sm'
              }`}
            >
              <svg
                width="54"
                height="92"
                viewBox="0 0 60 110"
                fill="none"
                aria-hidden="true"
              >
                <line
                  x1="10"
                  y1="14"
                  x2="10"
                  y2="96"
                  stroke={isDark ? 'rgba(255,255,255,0.12)' : 'rgba(30,29,27,0.12)'}
                  strokeWidth="1"
                  strokeDasharray="2 3"
                />
                <rect x="20" y="4" width="20" height="8" rx="2" fill="#C5A880" />
                {mechanicsKind === 'roller' && (
                  <circle cx="30" cy="14" r={rollRadius} fill="#8E7048" opacity="0.85" />
                )}
                <line
                  x1="16"
                  y1="12"
                  x2="44"
                  y2="12"
                  stroke={isDark ? 'rgba(255,255,255,0.22)' : 'rgba(30,29,27,0.22)'}
                  strokeWidth="1"
                />
                <line
                  x1="21"
                  y1="12"
                  x2="21"
                  y2={schematicBottomY}
                  stroke="#C5A880"
                  strokeWidth="0.9"
                  strokeOpacity="0.65"
                />
                <path
                  d={foldPath}
                  stroke={isDark ? '#FAF8F5' : '#1E1D1B'}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="30" cy={schematicBottomY} r="3.2" fill="#C5A880" />
              </svg>
              <span
                className={`block text-center font-mono text-[8px] tracking-wider uppercase mt-0.5 ${
                  isDark ? 'text-[#DEC8AA]' : 'text-[#5E5C57]'
                }`}
              >
                {mechanicsKind === 'roller'
                  ? 'Roller'
                  : mechanicsKind === 'slatted'
                    ? 'Louvers'
                    : 'Profile'}
              </span>
            </div>

            {/* Weighted Brass Pull Cord & Pendulum Tassel (Right track) */}
            <div className="absolute right-4 top-1 bottom-6 z-30 flex flex-col items-center pointer-events-none">
              <div className="w-2.5 h-2.5 rounded-full bg-[#2D2B28] border border-[#C5A880] shadow-sm shrink-0" />
              <div
                className="flex flex-col items-center origin-top transition-transform duration-300 ease-out"
                style={{ transform: `rotate(${cordSwingDeg}deg)` }}
              >
                <div
                  className="w-[2.5px] bg-[#8A8782] shadow-sm rounded-full"
                  style={{
                    height: `${36 + blindLift * 182}px`,
                  }}
                />
                <div className="w-4 h-7 -mt-1 rounded-b-md bg-gradient-to-b from-[#DEC8AA] via-[#C5A880] to-[#8E7048] shadow-md border border-[#FAF8F5]/30 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 px-3 py-1 rounded-full bg-[#1E1D1B]/80 backdrop-blur-md text-[#FAF8F5] text-[9px] tracking-wider uppercase flex items-center gap-1 pointer-events-none border border-white/10 whitespace-nowrap">
              <ArrowUpDown className="w-2.5 h-2.5 text-[#C5A880]" />
              <span>
                {scrollControlled ? 'Scroll or Drag Cord' : 'Drag Up / Down'}
              </span>
            </div>
          </div>

          {/* Range Slider & Presets */}
          <div className="mt-5 flex flex-col gap-3">
            <div
              className={`flex items-center justify-between text-xs ${
                isDark ? 'text-[#C4C0B8]' : 'text-[#5E5C57]'
              }`}
            >
              <span className="flex items-center gap-1.5 font-medium">
                <Sliders className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Pull Cord Lift</span>
              </span>
              <div className="flex items-center gap-2.5">
                {!hideHeader && hasManualControl && (
                  <button
                    type="button"
                    onClick={() => {
                      setHasManualControl(false);
                      setBlindLift(
                        Number((0.04 + smoothScrollProgress.get() * 0.72).toFixed(2)),
                      );
                    }}
                    className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#8A8782] hover:text-[#C5A880] transition-colors"
                  >
                    <RotateCcw className="w-2.5 h-2.5" />
                    <span>Sync Scroll</span>
                  </button>
                )}
                <span className="font-mono text-[11px]">
                  {Math.round(normalizedLift * 100)}% Raised
                </span>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="0.88"
              step="0.01"
              value={blindLift}
              onChange={(e) => {
                setHasManualControl(true);
                setBlindLift(parseFloat(e.target.value));
              }}
              aria-label="Adjust blind lift height"
              className="w-full accent-[#C5A880] cursor-pointer"
            />

            <div className="grid grid-cols-3 pt-1 gap-2">
              {[
                { label: 'Drawn Down', value: 0, active: blindLift < 0.15 },
                {
                  label: 'Half Folded',
                  value: 0.42,
                  active: blindLift >= 0.15 && blindLift < 0.65,
                },
                { label: 'Stacked Top', value: 0.85, active: blindLift >= 0.65 },
              ].map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setHasManualControl(true);
                    setBlindLift(preset.value);
                  }}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] border transition-colors ${
                    preset.active
                      ? isDark
                        ? 'bg-[#C5A880] text-[#141312] border-[#C5A880] font-semibold'
                        : 'bg-[#1E1D1B] text-white border-[#1E1D1B] font-semibold'
                      : isDark
                        ? 'bg-white/5 border-white/15 text-[#FAF8F5] hover:border-[#C5A880]'
                        : 'bg-white border-[#D3D0C9] text-[#1E1D1B] hover:border-[#1E1D1B]'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Selected Style Spec Card */}
        <div
          className={`w-full max-w-md mt-5 p-5 rounded-2xl border text-xs ${
            isDark
              ? 'bg-[#1D1B18] border-white/10 text-[#C4C0B8] shadow-xl'
              : 'bg-white border-[#D3D0C9] text-[#5E5C57] shadow-soft-luxury'
          }`}
        >
          <div
            className={`flex items-center justify-between border-b pb-3 mb-3 gap-2 ${
              isDark ? 'border-white/10' : 'border-[#D3D0C9]'
            }`}
          >
            <span
              className={`font-editorial text-lg font-semibold ${
                isDark ? 'text-[#FAF8F5]' : 'text-[#1E1D1B]'
              }`}
            >
              {selectedStyle.name}
            </span>
            <span className="text-[#C5A880] font-medium tracking-wide text-right">
              {selectedStyle.stackStyle}
            </span>
          </div>
          <p className="leading-relaxed mb-3">{selectedStyle.description}</p>
          {!hideHeader && (
            <div
              className={`space-y-1.5 text-[11px] ${
                isDark ? 'text-[#A8A39B]' : 'text-[#8A8782]'
              }`}
            >
              <p>
                <strong className={isDark ? 'text-[#FAF8F5]' : 'text-[#1E1D1B]'}>
                  Best For:
                </strong>{' '}
                {selectedStyle.bestFor}
              </p>
              <p>
                <strong className={isDark ? 'text-[#FAF8F5]' : 'text-[#1E1D1B]'}>
                  Fabric Choice:
                </strong>{' '}
                {selectedStyle.fabricRecommendation}
              </p>
            </div>
          )}

          <div
            className={`mt-4 pt-3 border-t flex justify-end ${
              isDark ? 'border-white/10' : 'border-[#D3D0C9]'
            }`}
          >
            <Link
              to={`/contact?blind=${encodeURIComponent(selectedStyle.name)}`}
              className={`font-semibold text-xs tracking-wider uppercase hover:text-[#C5A880] transition-colors flex items-center gap-1.5 ${
                isDark ? 'text-[#DEC8AA]' : 'text-[#1E1D1B]'
              }`}
            >
              <span>Enquire About This Blind</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  },
);

ArchitecturalWindowStage.displayName = 'ArchitecturalWindowStage';

export const RomanBlindInteractive: React.FC<RomanBlindInteractiveProps> = ({
  externalSelected = null,
  onSelectStyle,
  includeShadesCollection = true,
  initialTab = 'roman',
  theme = 'light',
  hideHeader = false,
}) => {
  const [internalStyle, setInternalStyle] = useState<RomanBlindStyle>(
    SITE_CONTENT.romanBlindStyles[0],
  );
  const [activeTab, setActiveTab] = useState<'roman' | 'shades'>(
    includeShadesCollection ? initialTab : 'roman',
  );
  const [syncedExternal, setSyncedExternal] = useState<RomanBlindStyle | null>(
    externalSelected,
  );

  const sectionRef = useRef<HTMLElement>(null);
  const selectedStyle = externalSelected ?? internalStyle;
  const isDark = theme === 'dark';

  if (externalSelected !== syncedExternal) {
    setSyncedExternal(externalSelected);
    if (externalSelected) {
      const isInShades = SITE_CONTENT.windowShadeStyles.some(
        (s) => s.id === externalSelected.id,
      );
      setActiveTab(isInShades ? 'shades' : 'roman');
    }
  }

  // Wide scroll sweep (0.92 enter -> 0.52 leave center) gives full uninterrupted lift choreography on Home
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.92', 'end 0.52'],
  });
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    mass: 0.9,
  });

  // GPU-composited architectural room daylight shafts casting across section wall on scroll (exact palette)
  const ambientBeamOpacity = useTransform(
    smoothScrollProgress,
    [0, 0.45, 1],
    [0.2, 0.72, 0.95],
  );
  const ambientBeamScaleY = useTransform(smoothScrollProgress, [0, 1], [0.42, 1.05]);
  const ambientBeamShiftY = useTransform(smoothScrollProgress, [0, 1], [-32, 16]);

  // One-shot crisp architectural header & brass rule draw on scroll entry
  useEffect(() => {
    if (hideHeader || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.roman-header-reveal', {
        y: 26,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      gsap.fromTo(
        '.roman-brass-rule',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.95,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [hideHeader]);

  const handleChooseStyle = (style: RomanBlindStyle) => {
    setInternalStyle(style);
    if (onSelectStyle) {
      onSelectStyle(style);
    }
  };

  const handleTabChange = (tab: 'roman' | 'shades') => {
    setActiveTab(tab);
    const targetList =
      tab === 'shades'
        ? SITE_CONTENT.windowShadeStyles
        : SITE_CONTENT.romanBlindStyles;
    const matchesCurrent = targetList.some((s) => s.id === selectedStyle.id);
    if (!matchesCurrent && targetList.length > 0) {
      handleChooseStyle(targetList[0]);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`${hideHeader ? 'py-6 sm:py-10' : 'py-20'} ${
        isDark ? 'bg-transparent text-[#FAF8F5]' : 'bg-[#FAF8F5] text-[#1E1D1B]'
      } relative overflow-x-clip`}
    >
      {/* Living Room Sunbeam & Window Mullion Wall Shadow Projection (Pure GPU transforms, zero palette changes) */}
      {!hideHeader && !isDark && (
        <motion.div
          aria-hidden="true"
          style={{
            opacity: ambientBeamOpacity,
            scaleY: ambientBeamScaleY,
            y: ambientBeamShiftY,
          }}
          className="pointer-events-none absolute inset-0 origin-top overflow-hidden"
        >
          {/* Slanted diagonal cream sunlight rays casting rightward across interior wall */}
          <div
            className="w-full h-full"
            style={{
              background:
                'repeating-linear-gradient(124deg, rgba(255,255,255,0.62) 0px, rgba(255,255,255,0.62) 54px, rgba(30,29,27,0.032) 54px, rgba(30,29,27,0.032) 128px)',
            }}
          />
          {/* Soft warm brass daylight bloom at upper center-left window origin */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 65% 55% at 28% 36%, rgba(197, 168, 128, 0.14), transparent 72%)',
            }}
          />
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {!hideHeader && (
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div
              className={`roman-header-reveal inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-4 ${
                isDark
                  ? 'bg-white/5 text-[#FAF8F5] border-white/15'
                  : 'bg-[#EAE7E1] text-[#1E1D1B] border-[#D3D0C9]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="label-caps text-[10px] tracking-luxury">
                Craftsmanship in Motion
              </span>
            </div>

            <h2
              className={`roman-header-reveal font-syne text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight ${
                isDark ? 'text-[#FAF8F5]' : 'text-[#1E1D1B]'
              }`}
            >
              Roman Blind Folding Studio
            </h2>
            <p
              className={`roman-header-reveal mt-4 text-base sm:text-lg font-light leading-relaxed ${
                isDark ? 'text-[#C4C0B8]' : 'text-[#5E5C57]'
              }`}
            >
              As you scroll, watch light sweep through the casement and lift the blind upward—or grab the hem bar and brass pull cord directly to test every Roman fold and window shade.
            </p>

            {/* Precision Architectural Calibrated Brass Rule */}
            <div className="roman-brass-rule mt-8 mx-auto max-w-md flex items-center justify-center gap-3 origin-center">
              <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C5A880] to-[#C5A880]/40" />
              <span className="w-1.5 h-1.5 rotate-45 bg-[#C5A880]" />
              <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C5A880] to-[#C5A880]/40" />
            </div>
          </div>
        )}

        {/* Studio Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* 1. Left Sticky Interactive Architectural Window Bay */}
          <ArchitecturalWindowStage
            selectedStyle={selectedStyle}
            isDark={isDark}
            hideHeader={hideHeader}
            smoothScrollProgress={smoothScrollProgress}
          />

          {/* 2. Right: Roman Folds & Window Shades Selector (7 cols) */}
          <div className="lg:col-span-7">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <span
                className={`label-caps ${isDark ? 'text-[#A8A39B]' : 'text-[#8A8782]'}`}
              >
                Select Roman Fold or Window Shade
              </span>

              {includeShadesCollection && (
                <div
                  className={`inline-flex p-1 rounded-full border self-start sm:self-auto ${
                    isDark ? 'bg-[#1D1B18] border-white/15' : 'bg-[#ECE9E2] border-[#D3D0C9]'
                  }`}
                >
                  {(
                    [
                      { id: 'roman', label: 'Roman Folds' },
                      { id: 'shades', label: 'Window Shades' },
                    ] as const
                  ).map((tab) => {
                    const active = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => handleTabChange(tab.id)}
                        className={`relative px-3.5 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                          active
                            ? isDark
                              ? 'text-[#141312]'
                              : 'text-[#FAF8F5]'
                            : isDark
                              ? 'text-[#C4C0B8] hover:text-white'
                              : 'text-[#5E5C57] hover:text-[#1E1D1B]'
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId={
                              hideHeader
                                ? 'roman-studio-page-pill'
                                : 'roman-studio-home-pill'
                            }
                            transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                            className={`absolute inset-0 rounded-full shadow-sm ${
                              isDark ? 'bg-[#C5A880]' : 'bg-[#1E1D1B]'
                            }`}
                          />
                        )}
                        <span className="relative z-10">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="space-y-8"
            >
              {activeTab === 'roman' && (
                <StyleThumbnailGrid
                  items={SITE_CONTENT.romanBlindStyles}
                  aspectClass="aspect-[4/5]"
                  selectedId={selectedStyle.id}
                  isDark={isDark}
                  onChoose={handleChooseStyle}
                />
              )}

              {includeShadesCollection && activeTab === 'shades' && (
                <StyleThumbnailGrid
                  items={SITE_CONTENT.windowShadeStyles}
                  aspectClass="aspect-[21/19]"
                  selectedId={selectedStyle.id}
                  isDark={isDark}
                  onChoose={handleChooseStyle}
                />
              )}
            </motion.div>

            <div
              className={`mt-8 p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
                isDark
                  ? 'bg-[#1D1B18] border-white/10 text-[#C4C0B8]'
                  : 'bg-[#EAE7E1] border-[#D3D0C9] text-[#5E5C57]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>
                  All blinds are custom tailored to millimeter window dimensions across Chennai &amp; Tamil Nadu.
                </span>
              </div>
              <Link
                to={`/contact?blind=${encodeURIComponent(selectedStyle.name)}`}
                className={`whitespace-nowrap px-4 py-2 rounded-full transition-colors font-semibold text-[11px] tracking-wider uppercase ${
                  isDark
                    ? 'bg-[#C5A880] text-[#141312] hover:bg-white'
                    : 'bg-[#1E1D1B] text-white hover:bg-[#C5A880] hover:text-[#1E1D1B]'
                }`}
              >
                Enquire Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
