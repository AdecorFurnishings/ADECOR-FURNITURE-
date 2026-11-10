import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Sparkles, MoveHorizontal, CheckCircle2, ArrowRight, Truck, Sparkle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE_CONTENT } from '../../data/content';

export const SofaRefurbishingSection: React.FC = () => {
  // Slider position: 0 (all before) to 100 (all after)
  const [sliderPos, setSliderPos] = useState(52);
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
    <section className="py-24 bg-[#141312] text-[#FAF8F5] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-20" />
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#C5A880]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#5C768D]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C5A880]/50 text-[#C5A880] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="label-caps text-[10px] tracking-luxury text-[#EAE7E1]">
              New Atelier Service
            </span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#FAF8F5]">
            Master Sofa Refurbishing & Re-Upholstery
          </h2>
          <p className="mt-4 text-[#D3D0C9] text-base sm:text-lg font-light leading-relaxed">
            Never discard an heirloom sofa. We preserve your seasoned solid teak or rosewood frame, replace tired springs with high-density ergonomic cushioning, and wrap it in timeless luxury fabric.
          </p>
        </div>

        {/* 1. Drag-to-Compare Before/After Interactive Slider */}
        <div className="mb-16">
          <div className="flex items-center justify-between text-xs text-[#8A8782] mb-3 px-2">
            <span className="flex items-center gap-1.5">
              <MoveHorizontal className="w-4 h-4 text-[#C5A880]" />
              <span className="uppercase tracking-widest text-[#EAE7E1]">Drag divider to compare transformation</span>
            </span>
            <span className="hidden sm:inline font-mono text-[11px] text-[#C5A880]/80">
              Placeholder Before/After Assets [Swappable]
            </span>
          </div>

          <div
            ref={containerRef}
            className="relative w-full aspect-[16/9] sm:aspect-[21/10] rounded-2xl overflow-hidden border border-white/15 shadow-2xl select-none cursor-ew-resize"
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
            {/* The "AFTER" Image (Full background) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={SITE_CONTENT.sofaRefurbishing.afterImage}
                alt="After: Refurbished Luxury Sofa"
                className="w-full h-full object-cover object-center filter brightness-[0.98]"
              />
              {/* Dynamic Fabric Tint Overlay */}
              <div
                className="absolute inset-0 mix-blend-color opacity-35 pointer-events-none transition-colors duration-500"
                style={{ backgroundColor: activeFabric.hex }}
              />
              {/* After Badge */}
              <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#C5A880]/60 text-[#C5A880] text-xs font-semibold tracking-wider uppercase">
                After: Refurbished Masterpiece
              </div>
            </div>

            {/* The "BEFORE" Image (Clipped on Left side) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden shadow-2xl"
              style={{ width: `${sliderPos}%` }}
            >
              <div
                className="absolute inset-y-0 left-0"
                style={{
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                }}
              >
                <img
                  src={SITE_CONTENT.sofaRefurbishing.beforeImage}
                  alt="Before: Worn Original Sofa"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              {/* Before Badge */}
              <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[#FAF8F5] text-xs font-semibold tracking-wider uppercase">
                Before: Worn & Sagging
              </div>
            </div>

            {/* Draggable Divider Line & Handle */}
            <div
              className="absolute inset-y-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-20 pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#141312] border-2 border-white text-white flex items-center justify-center shadow-2xl">
                <MoveHorizontal className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Fabric Recolour Swatches for Sofa */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              <span className="label-caps text-[#C5A880] text-xs">
                Preview Fabric Swatch on Sofa:
              </span>
              <span className="text-xs text-[#D3D0C9] font-medium">{activeFabric.name}</span>
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
            <span className="label-caps text-[#C5A880] text-xs tracking-luxury">
              Our 4-Step Rejuvenation Process
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl text-[#FAF8F5] font-light mt-2">
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
                    <span className="font-mono text-2xl font-light text-[#C5A880] group-hover:scale-110 transition-transform">
                      {step.stepNumber}
                    </span>
                    <Sparkle className="w-4 h-4 text-white/30 group-hover:text-[#C5A880] transition-colors" />
                  </div>
                  <h4 className="font-editorial text-xl font-medium text-[#FAF8F5] mb-2 leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#8A8782] leading-relaxed">
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
            <h4 className="font-editorial text-2xl sm:text-3xl text-white font-light">
              Ready to restore your cherished living room suite?
            </h4>
            <p className="text-sm text-[#D3D0C9] max-w-xl font-light">
              Book a free consultation at our Nandanam showroom or invite our master upholsterer for an on-site frame inspection at your home.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/contact?service=sofa-refurbishing"
              className="px-8 py-4 rounded-full bg-[#C5A880] hover:bg-[#FAF8F5] text-[#141312] font-semibold text-xs tracking-luxury uppercase flex items-center gap-2.5 transition-all shadow-glow-gold"
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
              className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[#FAF8F5] text-xs tracking-luxury uppercase font-medium transition-all"
            >
              WhatsApp Photos for Quote
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
