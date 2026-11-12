import React from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion';
import { Eye, Layers } from 'lucide-react';
import type { GalleryItem } from '../../data/content';

interface SpatialGalleryCardProps {
  item: GalleryItem;
  index: number;
  aspectMode?: 'natural' | 'uniform';
  onSelect?: (item: GalleryItem) => void;
}

const ASPECT_CLASS_MAP: Record<NonNullable<GalleryItem['aspect']>, string> = {
  portrait: 'aspect-[4/5]',
  square: 'aspect-square',
  landscape: 'aspect-[4/3]',
};

/**
 * Multi-plane exhibition card (`preserve-3d`).
 * Computes tilt, diorama inner image counter-parallax, dynamic wall cast shadow,
 * and specular studio light sweep solely via GPU motion values (no React state thrashing).
 */
export const SpatialGalleryCard: React.FC<SpatialGalleryCardProps> = ({
  item,
  index,
  aspectMode = 'natural',
  onSelect,
}) => {
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);
  const isHovered = useMotionValue(0);

  const springCfg = { stiffness: 190, damping: 24, mass: 0.7 };
  const smoothX = useSpring(normX, springCfg);
  const smoothY = useSpring(normY, springCfg);
  const smoothHover = useSpring(isHovered, { stiffness: 220, damping: 26 });

  // Outer frame pitch & yaw in dimensional space
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [9, -9]);

  // Diorama inner image parallax shift opposite to outer pitch (Z-depth illusion)
  const photoX = useTransform(smoothX, [-0.5, 0.5], [10, -10]);
  const photoY = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const photoScale = useTransform(smoothHover, [0, 1], [1.03, 1.09]);

  // Dynamic cast shadow drifting opposite to tilted light angle
  const shadowX = useTransform(smoothX, [-0.5, 0.5], [18, -18]);
  const shadowY = useTransform(smoothY, [-0.5, 0.5], [22, -8]);
  const shadowOpacity = useTransform(smoothHover, [0, 1], [0.06, 0.24]);

  // Live cursor-tracking studio specular glint
  const glintPctX = useTransform(smoothX, [-0.5, 0.5], [12, 88]);
  const glintPctY = useTransform(smoothY, [-0.5, 0.5], [12, 88]);
  const glintAlpha = useTransform(smoothHover, [0, 1], [0, 0.85]);
  const specularBg = useMotionTemplate`radial-gradient(circle 310px at ${glintPctX}% ${glintPctY}%, rgba(255, 245, 224, 0.55), transparent 68%)`;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    normX.set(x);
    normY.set(y);
  };

  const handlePointerEnter = () => {
    isHovered.set(1);
  };

  const handlePointerLeave = () => {
    normX.set(0);
    normY.set(0);
    isHovered.set(0);
  };

  const aspectClass =
    aspectMode === 'uniform'
      ? 'aspect-[4/3]'
      : ASPECT_CLASS_MAP[item.aspect ?? 'landscape'];

  const paddedNum = String(index + 1).padStart(2, '0');

  return (
    <div
      style={{ perspective: 1150 }}
      className="gallery-depth-slot relative w-full"
    >
      <motion.article
        onClick={() => onSelect?.(item)}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        data-cursor="INSPECT"
        className="group relative cursor-pointer rounded-3xl bg-white border border-[#D3D0C9] hover:border-[#C5A880] transition-colors duration-300 shadow-soft-luxury will-change-transform"
      >
        {/* Depth Plane -1 (Z = -26px): Dynamic architectural cast wall shadow */}
        <motion.div
          aria-hidden="true"
          style={{
            x: shadowX,
            y: shadowY,
            opacity: shadowOpacity,
            transform: 'translateZ(-26px)',
          }}
          className="pointer-events-none absolute inset-4 -z-10 rounded-3xl bg-[#141312] blur-2xl"
        />

        {/* Recessed Photo Window Chamber (Z = 0px) */}
        <div
          className={`relative ${aspectClass} overflow-hidden rounded-t-3xl bg-[#181715]`}
        >
          <motion.img
            src={item.image}
            alt={item.title}
            loading="lazy"
            decoding="async"
            draggable={false}
            style={{
              x: photoX,
              y: photoY,
              scale: photoScale,
              objectPosition: item.focusPosition || 'center center',
            }}
            className="w-full h-full object-cover will-change-transform select-none"
          />

          {/* Subtle vignette anchoring floating Z-badges */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141312]/70 via-transparent to-black/25 opacity-70 group-hover:opacity-55 transition-opacity duration-500"
          />

          {/* Live Cursor Specular Grazing Sheen */}
          <motion.div
            aria-hidden="true"
            style={{
              opacity: glintAlpha,
              background: specularBg,
            }}
            className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          />

          {/* Chamfered inner gallery frame border */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-3 rounded-2xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />

          {/* Depth Plane +2 (Z = +28px): Top-left floating discipline plaque */}
          <div
            style={{ transform: 'translateZ(28px)' }}
            className="pointer-events-none absolute top-4 left-4 right-14 flex items-center gap-2"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141312]/80 backdrop-blur-md border border-white/15 text-[#FAF8F5] text-[10px] font-mono tracking-wider uppercase shadow-md">
              <span className="text-[#C5A880] font-semibold">{paddedNum}</span>
              <span className="text-white/35">/</span>
              <span className="truncate">{item.categoryLabel}</span>
            </span>
          </div>

          {/* Depth Plane +3 (Z = +36px): Top-right inspect lens pill */}
          <div
            style={{ transform: 'translateZ(36px)' }}
            className="pointer-events-none absolute top-4 right-4 opacity-85 group-hover:opacity-100 transition-all duration-300"
          >
            <span className="w-8 h-8 rounded-full bg-[#141312]/80 backdrop-blur-md border border-[#C5A880]/50 text-[#C5A880] flex items-center justify-center shadow-lg group-hover:bg-[#C5A880] group-hover:text-[#141312] transition-colors">
              <Eye className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Depth Plane +1 (Z = +18px): Architectural Caption & Material Plaque */}
        <div
          style={{ transform: 'translateZ(18px)' }}
          className="relative p-5 sm:p-6 bg-white rounded-b-3xl space-y-2.5"
        >
          {item.materialSpec && (
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.14em] text-[#9A7A4F]">
              <Layers className="w-3 h-3 text-[#C5A880] shrink-0" />
              <span className="truncate">{item.materialSpec}</span>
            </div>
          )}

          <h3 className="font-syne text-lg sm:text-xl font-bold uppercase tracking-tight text-[#1E1D1B] group-hover:text-[#9A7A4F] transition-colors leading-snug">
            {item.title}
          </h3>

          <p className="text-xs sm:text-[13px] text-[#5E5C57] font-light leading-relaxed">
            {item.caption}
          </p>

          <div className="pt-2 border-t border-[#EAE7E1] flex items-center justify-end text-[11px] text-[#8A8782]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#1E1D1B] font-semibold group-hover:text-[#C5A880] shrink-0 transition-colors">
              Inspect ↗
            </span>
          </div>
        </div>
      </motion.article>
    </div>
  );
};
