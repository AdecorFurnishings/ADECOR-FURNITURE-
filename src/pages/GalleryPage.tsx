import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  Sparkles,
  X,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
} from 'framer-motion';
import { SITE_CONTENT } from '../data/content';
import type { GalleryItem } from '../data/content';
import { SpatialGalleryCard } from '../components/gallery/SpatialGalleryCard';
import { ADecorLogo } from '../components/common/ADecorLogo';

/** Interactive Exhibition Lightbox Modal supporting keyboard navigation and cursor tilt inspection */
const SpatialLightboxModal: React.FC<{
  item: GalleryItem;
  currentIndex: number;
  total: number;
  onClose: () => void;
  onStep: (delta: number) => void;
}> = ({ item, currentIndex, total, onClose, onStep }) => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const hover = useMotionValue(0);

  const tiltX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 160, damping: 24 });
  const tiltY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 160, damping: 24 });
  const gx = useTransform(mx, [-0.5, 0.5], [15, 85]);
  const gy = useTransform(my, [-0.5, 0.5], [15, 85]);
  const gAlpha = useSpring(useTransform(hover, [0, 1], [0, 0.65]), { stiffness: 180, damping: 24 });
  const lightBeam = useMotionTemplate`radial-gradient(circle 340px at ${gx}% ${gy}%, rgba(255, 245, 224, 0.55), transparent 68%)`;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onStep(1);
      if (e.key === 'ArrowLeft') onStep(-1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, onStep]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-[#FAF8F5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col md:flex-row my-auto h-[92vh] max-h-[760px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-10 h-10 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-[#C5A880] hover:text-[#141312] transition-colors border border-white/20 shadow-lg"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Darkroom Inspection Stage */}
        <div
          style={{ perspective: 1200 }}
          onPointerMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            mx.set((e.clientX - rect.left) / rect.width - 0.5);
            my.set((e.clientY - rect.top) / rect.height - 0.5);
          }}
          onPointerEnter={() => hover.set(1)}
          onPointerLeave={() => {
            mx.set(0);
            my.set(0);
            hover.set(0);
          }}
          className="relative w-full md:w-3/5 lg:w-2/3 bg-[#0D0C0B] p-3 sm:p-6 flex items-center justify-center h-[48vh] md:h-full overflow-hidden shrink-0 border-b md:border-b-0 md:border-r border-black/10"
        >
          {/* Ambient blurred backdrop eliminates black void */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 blur-2xl scale-125 pointer-events-none"
            style={{ backgroundImage: `url(${item.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0B] via-transparent to-[#0D0C0B]/60 pointer-events-none" />

          <motion.div
            style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}
            className="relative z-10 w-full h-full flex items-center justify-center"
          >
            <img
              src={item.image}
              alt={item.title}
              draggable={false}
              className="max-h-full max-w-full w-auto h-auto object-contain rounded-xl shadow-2xl border border-white/10"
            />
            <motion.div
              aria-hidden="true"
              style={{ opacity: gAlpha, background: lightBeam }}
              className="pointer-events-none absolute inset-0 rounded-xl mix-blend-soft-light"
            />
          </motion.div>

          {/* Modal Prev/Next Arrows */}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={() => onStep(-1)}
                aria-label="Previous gallery project"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/70 hover:bg-[#C5A880] text-white hover:text-[#141312] border border-white/15 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onStep(1)}
                aria-label="Next gallery project"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/70 hover:bg-[#C5A880] text-white hover:text-[#141312] border border-white/15 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Right Caption & Specification Plaque */}
        <div className="w-full md:w-2/5 lg:w-1/3 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto flex-1 md:h-full bg-[#FAF8F5]">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2 pr-8">
              <span className="label-caps text-[#9A7A4F] text-[10px]">
                {item.categoryLabel}
              </span>
              <span className="text-[11px] font-mono text-[#8A8782]">
                {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>

            <h3 className="font-editorial text-3xl sm:text-4xl text-[#1E1D1B] font-light leading-tight">
              {item.title}
            </h3>

            <p className="text-sm text-[#5E5C57] leading-relaxed font-light border-l-2 border-[#C5A880] pl-3.5">
              {item.caption}
            </p>

            <p className="text-xs sm:text-sm text-[#5E5C57] leading-relaxed font-light">
              {item.description}
            </p>

            {item.materialSpec && (
              <div className="p-3.5 rounded-2xl bg-[#ECE9E2]/70 border border-[#D3D0C9]">
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#9A7A4F] mb-1">
                  <Layers className="w-3 h-3 text-[#C5A880]" />
                  <span>Material Specification</span>
                </div>
                <p className="text-xs text-[#1E1D1B] font-medium">
                  {item.materialSpec}
                </p>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-[#D3D0C9] mt-6">
            <Link
              to={`/contact?project=${encodeURIComponent(item.title)}`}
              className="w-full py-3.5 px-6 rounded-full bg-[#1E1D1B] hover:bg-[#C5A880] text-white hover:text-[#1E1D1B] text-xs font-semibold tracking-luxury uppercase flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <span>Request Similar Custom Design</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export const GalleryPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const wallRef = useRef<HTMLDivElement>(null);

  const filterOptions = [
    { id: 'all', label: 'All Projects' },
    { id: 'curtains', label: 'Curtains' },
    { id: 'blinds', label: 'Blinds & Canopies' },
    { id: 'wall-panels', label: 'Wall Panels' },
    { id: 'wallpaper', label: 'Wallpapers' },
    { id: 'flooring', label: 'Flooring' },
    { id: 'sofa', label: 'Upholstery Rework' },
  ];

  const filteredItems = useMemo(
    () =>
      activeFilter === 'all'
        ? SITE_CONTENT.gallery
        : SITE_CONTENT.gallery.filter((item) => item.category === activeFilter),
    [activeFilter],
  );

  // Subtle multi-plane vertical column parallax during scroll across the 3-column architectural wall
  const { scrollYProgress } = useScroll({
    target: wallRef,
    offset: ['start end', 'end start'],
  });
  const colOuterY = useTransform(scrollYProgress, [0, 1], [14, -18]);
  const colCenterY = useTransform(scrollYProgress, [0, 1], [-14, 18]);

  // Split filtered items across 3 left-to-right columns so row 1 shows items 1, 2, 3 without clipping transforms
  const columns = useMemo(() => {
    const cols: { item: GalleryItem; index: number }[][] = [[], [], []];
    filteredItems.forEach((item, idx) => {
      cols[idx % 3].push({ item, index: idx });
    });
    return cols;
  }, [filteredItems]);

  const selectedIndex = selectedItem
    ? filteredItems.findIndex((g) => g.id === selectedItem.id)
    : -1;

  const stepSelected = (delta: number) => {
    if (selectedIndex < 0 || filteredItems.length === 0) return;
    const nextIdx = (selectedIndex + delta + filteredItems.length) % filteredItems.length;
    setSelectedItem(filteredItems[nextIdx]);
  };

  return (
    <div className="pt-36 sm:pt-44 pb-24 bg-[#FAF8F5] min-h-screen">
      {/* Page Hero with generous clearance under sticky header */}
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white text-[#1E1D1B] border border-[#D3D0C9] shadow-sm mb-5">
          <ADecorLogo variant="crimson" className="h-5 w-auto" />
          <span className="h-3.5 w-[1px] bg-[#D3D0C9]" />
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className="label-caps text-[10px] tracking-luxury">Real Installations</span>
        </div>
        <h1 className="font-syne text-4xl sm:text-6xl lg:text-7xl text-[#1E1D1B] font-bold uppercase tracking-tight leading-[1.05]">
          Portfolio Works
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-[#5E5C57] font-light leading-relaxed">
          Completed interior installations crafted with bespoke fabrics, tailored wall finishes, and architectural daylight control.
        </p>

        {/* Controls Bar: Centered Discipline Filter Pills */}
        <div className="mt-10 flex items-center justify-center border-y border-[#D3D0C9]/70 py-5">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {filterOptions.map((opt) => {
              const isActive = activeFilter === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setActiveFilter(opt.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                    isActive
                      ? 'bg-[#1E1D1B] text-[#FAF8F5] shadow-md'
                      : 'bg-white hover:bg-[#ECE9E2] text-[#5E5C57] border border-[#D3D0C9]'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Exhibition Canvas */}
      <div ref={wallRef} className="max-w-7xl mx-auto px-6">
        {/* Desktop staggered 3-column architectural depth wall; single/2-col unified flow below lg */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-7 items-start">
          {columns.map((colItems, colIdx) => (
            <motion.div
              key={colIdx}
              style={{ y: colIdx === 1 ? colCenterY : colOuterY }}
              className={`space-y-7 ${colIdx === 1 ? 'lg:mt-8' : ''}`}
            >
              {colItems.map(({ item, index }) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 26, rotateX: 6 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  style={{ perspective: 1150 }}
                >
                  <SpatialGalleryCard
                    item={item}
                    index={index}
                    aspectMode="natural"
                    onSelect={setSelectedItem}
                  />
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:hidden items-start">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpatialGalleryCard
                item={item}
                index={index}
                aspectMode="natural"
                onSelect={setSelectedItem}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Studio Lightbox */}
      {selectedItem && selectedIndex >= 0 && (
        <SpatialLightboxModal
          item={selectedItem}
          currentIndex={selectedIndex}
          total={filteredItems.length}
          onClose={() => setSelectedItem(null)}
          onStep={stepSelected}
        />
      )}
    </div>
  );
};
