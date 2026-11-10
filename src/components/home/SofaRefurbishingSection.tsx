import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Sparkles, MoveHorizontal, CheckCircle2, ArrowRight, Truck, Sparkle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE_CONTENT } from '../../data/content';

export const SofaRefurbishingSection: React.FC = () => {
  // Slider position: 0 (all before) to 100 (all after)
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeFabric, setActiveFabric] = useState(SITE_CONTENT.sofaRefurbishing.fabricOptions[0]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDrag = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleDrag(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) handleDrag(e.touches[0].clientX);
    };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleDrag]);

  return (
    <section className="py-24 bg-[#100F0E] text-[#FAF8F5] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-20" />
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#C5A880]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#1E4738]/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header: Crisp & High-Impact */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C5A880]/50 text-[#C5A880] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="label-caps text-[10px] tracking-luxury text-[#FAF8F5]">
              Master Furniture Restoration
            </span>
          </div>

          <h2 className="font-syne text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#FAF8F5]">
            Sofa Refurbishing & Re-Upholstery
          </h2>
          <p className="mt-4 text-[#D3D0C9] text-base sm:text-lg font-light leading-relaxed">
            Never discard an heirloom sofa. We preserve your seasoned solid teak frame, rebuild with 40+ density ergonomic cushioning, and tailor world-class fabrics.
          </p>
        </div>

        {/* 1. Drag-to-Compare Before/After Interactive Slider with Ultra-HD Photos */}
        <div className="mb-16">
          <div className="flex items-center justify-between text-xs text-[#8A8782] mb-3 px-2">
            <span className="flex items-center gap-1.5">
              <MoveHorizontal className="w-4 h-4 text-[#C5A880]" />
              <span className="uppercase tracking-widest text-[#FAF8F5] font-syne font-semibold">
                Drag divider to inspect transformation
              </span>
            </span>
            <span className="hidden sm:inline font-mono text-[11px] text-[#C5A880]">
              High-Definition Restoration Showcase
            </span>
          </div>

          <div
            ref={containerRef}
            className="relative w-full aspect-[16/10] sm:aspect-[21/10] rounded-3xl overflow-hidden border border-white/20 shadow-2xl select-none cursor-ew-resize bg-[#181816]"
            onMouseDown={(e) => {
              setIsDragging(true);
              handleDrag(e.clientX);
            }}
            onTouchStart={(e) => {
              if (e.touches[0]) {
                setIsDragging(true);
                handleDrag(e.touches[0].clientX);
              }
            }}
            data-cursor="Drag"
          >
            {/* The "AFTER" Image (Pristine Luxury Refurbished Sofa) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={SITE_CONTENT.sofaRefurbishing.afterImage}
                alt="After: Refurbished Luxury Sofa"
                className="w-full h-full object-cover object-center filter brightness-[0.98]"
              />
              {/* Dynamic Fabric Tint Overlay */}
              <div
                className="absolute inset-0 mix-blend-color opacity-30 pointer-events-none transition-colors duration-500"
                style={{ backgroundColor: activeFabric.hex }}
              />
              {/* After Badge */}
              <div className="absolute top-5 right-5 z-10 px-4 py-1.5 rounded-full bg-emerald-950/85 backdrop-blur-md border border-emerald-400/50 text-[#C5A880] text-xs font-syne font-bold tracking-wider uppercase shadow-xl flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>After: Refurbished Luxury Velvet</span>
              </div>
            </div>

            {/* The "BEFORE" Image (Severely Damaged, Worn & Torn Sofa) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <img
                src={SITE_CONTENT.sofaRefurbishing.beforeImage}
                alt="Before: Heavily Worn, Torn & Damaged Sofa"
                className="w-full h-full object-cover object-center filter contrast-[1.05]"
              />
              {/* Before Badge */}
              <div className="absolute top-5 left-5 z-10 px-4 py-1.5 rounded-full bg-red-950/85 backdrop-blur-md border border-red-500/40 text-red-200 text-xs font-syne font-semibold tracking-wider uppercase shadow-xl flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <span>Before: Torn, Sagging & Damaged</span>
              </div>
            </div>

            {/* Draggable Divider Line & Handle */}
            <div
              className="absolute inset-y-0 w-1 bg-white shadow-[0_0_20px_rgba(255,255,255,0.9)] z-20 pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#100F0E] border-2 border-white text-white flex items-center justify-center shadow-2xl">
                <MoveHorizontal className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Fabric Recolour Swatches for Sofa */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              <span className="label-caps text-[#C5A880] text-xs">
                Preview Fabric Swatch on Sofa:
              </span>
              <span className="text-xs text-[#FAF8F5] font-syne font-bold uppercase">{activeFabric.name}</span>
            </div>

            <div className="flex items-center gap-3">
              {SITE_CONTENT.sofaRefurbishing.fabricOptions.map((opt) => {
                const isSelected = activeFabric.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setActiveFabric(opt)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform duration-300 ${
                      isSelected
                        ? 'border-white scale-125 shadow-glow-gold'
                        : 'border-transparent hover:scale-110 opacity-70'
                    }`}
                    style={{ backgroundColor: opt.hex }}
                    title={opt.name}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. Four-Step Process (Inspect, Choose Fabric, Re-upholster, Deliver) */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="label-caps text-[#C5A880] text-xs">
              Meticulous Rejuvenation
            </span>
            <h3 className="font-syne text-3xl sm:text-4xl text-[#FAF8F5] font-bold uppercase mt-1">
              How We Rebuild From The Core
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SITE_CONTENT.sofaRefurbishing.processSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#C5A880]/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-syne text-2xl font-bold text-[#C5A880] group-hover:scale-110 transition-transform">
                      {step.stepNumber}
                    </span>
                    <Sparkle className="w-4 h-4 text-white/30 group-hover:text-[#C5A880] transition-colors" />
                  </div>
                  <h4 className="font-syne text-lg font-bold text-[#FAF8F5] mb-2 uppercase leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#8A8782] leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-[11px] text-[#C5A880]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Artisan Guarantee</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Bottom Callout Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#2A2622] via-[#1E1D1B] to-[#2A2622] p-8 sm:p-12 border border-[#C5A880]/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-[#C5A880]">
              <Truck className="w-4 h-4" />
              <span className="label-caps text-xs">Complimentary Pick-Up & Delivery in Chennai</span>
            </div>
            <h4 className="font-syne text-2xl sm:text-3xl text-white font-bold uppercase">
              Ready to restore your living room suite?
            </h4>
            <p className="text-sm text-[#D3D0C9] max-w-xl font-light">
              Book a consultation at our Nandanam showroom or invite our master upholsterer for an on-site frame inspection.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/contact?service=sofa-refurbishing"
              className="px-8 py-4 rounded-full bg-[#C5A880] hover:bg-white text-[#100F0E] font-syne font-bold text-xs tracking-luxury uppercase flex items-center gap-2.5 transition-all shadow-glow-gold hover:scale-105"
            >
              <span>Schedule Free Inspection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`https://wa.me/919841134665?text=${encodeURIComponent(
                'Hello A-Decor Nandanam! I would like to enquire about sofa refurbishing for my home.'
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
