import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Layers, ArrowRight, Eye, SunMedium } from 'lucide-react';
import { RomanBlindInteractive } from '../components/home/RomanBlindInteractive';
import { SITE_CONTENT } from '../data/content';
import type { RomanBlindStyle } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

interface BlindCardProps {
  styleItem: RomanBlindStyle;
  aspectClass: string;
  onPreview: (style: RomanBlindStyle) => void;
}

/** GPU-composited architectural blind card — silky 60fps scroll with hover solar glint */
const BlindArchitectureCard: React.FC<BlindCardProps> = ({
  styleItem,
  aspectClass,
  onPreview,
}) => {
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 100;
    const y = ((e.clientY - rect.top) / Math.max(1, rect.height)) * 100;
    e.currentTarget.style.setProperty('--sun-x', `${x}%`);
    e.currentTarget.style.setProperty('--sun-y', `${y}%`);
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className="blind-card group rounded-3xl bg-white border border-[#D3D0C9] hover:border-[#C5A880] shadow-soft-luxury hover:shadow-elevated hover:-translate-y-1.5 transition-[transform,box-shadow,border-color] duration-300 ease-out overflow-hidden flex flex-col justify-between will-change-transform"
    >
      <div>
        {/* Crisp Unclipped Full Window Frame Photograph */}
        <div className={`relative ${aspectClass} overflow-hidden bg-[#ECE9E2]`}>
          <img
            src={styleItem.image}
            alt={styleItem.name}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />

          {/* Directional Warm Sunbeam Glint on Hover */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-0 group-hover:opacity-80 transition-opacity duration-300"
            style={{
              background:
                'radial-gradient(circle 260px at var(--sun-x, 50%) var(--sun-y, 38%), rgba(255, 245, 218, 0.9), transparent 68%)',
            }}
          />

          {/* Subtle Louver Reflection Sweep on Hover */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            style={{
              background:
                'repeating-linear-gradient(125deg, rgba(255,248,232,0.5) 0px, rgba(255,248,232,0.5) 14px, transparent 14px, transparent 42px)',
            }}
          />

          {/* Interactive Preview Action */}
          <button
            type="button"
            onClick={() => onPreview(styleItem)}
            className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-[#1E1D1B]/85 hover:bg-[#C5A880] text-[#FAF8F5] hover:text-[#1E1D1B] text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1.5 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-md"
          >
            <Eye className="w-3 h-3" />
            <span>Preview Fold</span>
          </button>
        </div>

        {/* Clean Title & Concise Copy Only (No Ideal Placement / Finish & Texture) */}
        <div className="p-5 sm:p-6 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-editorial text-2xl text-[#1E1D1B] group-hover:text-[#C5A880] transition-colors leading-tight">
              {styleItem.name}
            </h3>
            <span className="mt-2 w-2 h-2 rounded-full bg-[#C5A880]/70 group-hover:scale-125 transition-transform shrink-0" />
          </div>

          <p className="text-xs text-[#5E5C57] leading-relaxed">
            {styleItem.description}
          </p>
        </div>
      </div>

      {/* Direct Enquiry Action */}
      <div className="p-5 sm:p-6 pt-0">
        <Link
          to={`/contact?blind=${encodeURIComponent(styleItem.name)}`}
          className="w-full py-2.5 px-4 rounded-xl bg-[#FAF8F5] group-hover:bg-[#1E1D1B] border border-[#D3D0C9] group-hover:border-[#1E1D1B] text-[#1E1D1B] group-hover:text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-colors duration-300"
        >
          <span>Enquire for {styleItem.name}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
};

export const RomanBlindsPage: React.FC = () => {
  const [studioStyle, setStudioStyle] = useState<RomanBlindStyle | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const studioRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ['start start', 'end end'],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const louverAngle = useTransform(smoothProgress, [0, 1], [-8, 12]);

  const handlePreviewInStudio = (style: RomanBlindStyle) => {
    setStudioStyle(style);
    if (studioRef.current) {
      studioRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.blinds-hero-reveal', {
        y: 24,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });

      gsap.utils.toArray<HTMLElement>('.blinds-collection-grid').forEach((grid) => {
        const cards = grid.querySelectorAll('.blind-card');
        if (!cards.length) return;

        gsap.from(cards, {
          y: 26,
          opacity: 0,
          duration: 0.55,
          stagger: { amount: 0.3, from: 'start' },
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: grid,
            start: 'top 90%',
            once: true,
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="relative pt-36 sm:pt-44 pb-24 bg-[#FAF8F5] text-[#1E1D1B] min-h-screen"
    >
      {/* Lightweight Top Scroll Progress Brass Thread */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#C5A880] via-[#1E1D1B] to-[#C5A880] origin-left z-50 pointer-events-none"
        style={{ scaleX: smoothProgress }}
      />

      {/* Architectural Page Hero */}
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <div className="blinds-hero-reveal inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE7E1] text-[#1E1D1B] border border-[#D3D0C9] mb-5">
          <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className="label-caps text-[10px] tracking-luxury">Roman Blinds &amp; Window Shades Catalog</span>
        </div>

        <h1 className="blinds-hero-reveal font-syne text-4xl sm:text-6xl lg:text-7xl text-[#1E1D1B] font-bold uppercase tracking-tight leading-[1.04]">
          Roman Blind Geometries
        </h1>

        <p className="blinds-hero-reveal mt-4 max-w-2xl mx-auto text-base sm:text-lg text-[#5E5C57] font-light leading-relaxed">
          From sculpted Soft Roman pleats to architectural Timber, Bamboo, Cellular, and Solar shades. Pull the cord below or preview any style in motion.
        </p>

        {/* Scroll-Animated Architectural Louver Slat Divider */}
        <div className="blinds-hero-reveal mt-8 flex items-center justify-center gap-3">
          <span className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent to-[#C5A880]" />
          <motion.svg
            width="40"
            height="24"
            viewBox="0 0 40 24"
            fill="none"
            style={{ rotate: louverAngle }}
            aria-hidden="true"
          >
            <line x1="6" y1="5" x2="34" y2="8" stroke="#1E1D1B" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="6" y1="11" x2="34" y2="14" stroke="#C5A880" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="6" y1="17" x2="34" y2="20" stroke="#1E1D1B" strokeWidth="1.5" strokeLinecap="round" />
          </motion.svg>
          <span className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent to-[#C5A880]" />
        </div>
      </div>

      {/* Interactive Pull-Cord Folding Studio */}
      <div ref={studioRef} className="scroll-mt-28">
        <RomanBlindInteractive
          externalSelected={studioStyle}
          onSelectStyle={setStudioStyle}
          includeShadesCollection
          initialTab="roman"
          theme="light"
          hideHeader
        />
      </div>

      {/* Collection I: Tailored Roman Silhouettes */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
        <div className="border-b border-[#D3D0C9] pb-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="label-caps text-[10px] text-[#C5A880] tracking-widest block mb-1.5">
              Collection 01 • Soft Drapery Architecture
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#1E1D1B] font-light">
              Tailored Roman Silhouettes
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#8A8782]">
            <SunMedium className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Anna Nagar Atelier Collection</span>
          </span>
        </div>

        <div className="blinds-collection-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-7">
          {SITE_CONTENT.romanBlindStyles.map((styleItem) => (
            <BlindArchitectureCard
              key={styleItem.id}
              styleItem={styleItem}
              aspectClass="aspect-[4/5]"
              onPreview={handlePreviewInStudio}
            />
          ))}
        </div>
      </section>

      {/* Collection II: Architectural Window Shades */}
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <div className="border-b border-[#D3D0C9] pb-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="label-caps text-[10px] text-[#C5A880] tracking-widest block mb-1.5">
              Collection 02 • Textured, Timber &amp; Technical Systems
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#1E1D1B] font-light">
              Architectural Window Shades
            </h2>
          </div>
          <span className="text-xs font-mono text-[#8A8782]">
            Custom-Fit Daylight Filtering
          </span>
        </div>

        <div className="blinds-collection-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
          {SITE_CONTENT.windowShadeStyles.map((styleItem) => (
            <BlindArchitectureCard
              key={styleItem.id}
              styleItem={styleItem}
              aspectClass="aspect-[21/19]"
              onPreview={handlePreviewInStudio}
            />
          ))}
        </div>
      </section>

      {/* Standalone Enquiry CTA Only */}
      <div className="max-w-3xl mx-auto px-6 mt-24 text-center">
        <Link
          to={
            studioStyle
              ? `/contact?blind=${encodeURIComponent(studioStyle.name)}`
              : '/contact?service=roman-blinds'
          }
          className="px-10 py-4 rounded-full bg-[#1E1D1B] hover:bg-[#C5A880] text-white hover:text-[#1E1D1B] text-xs tracking-luxury uppercase font-semibold transition-all duration-300 inline-flex items-center gap-2.5 shadow-elevated"
        >
          <span>Enquire About Custom Blinds &amp; Shades</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
