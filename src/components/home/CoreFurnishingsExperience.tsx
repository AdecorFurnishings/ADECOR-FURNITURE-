import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export interface CoreDiscipline {
  id: string;
  indexLabel: string;
  name: string;
  image: string;
  link: string;
  ambientHex: string;
  colSpanClass: string;
  aspectClass: string;
  parallaxDirection: -1 | 1;
}

const CORE_DISCIPLINES: CoreDiscipline[] = [
  {
    id: 'curtains',
    indexLabel: '01',
    name: 'Curtains',
    image: '/images/core/curtains.jpg',
    link: '/curtain-styles',
    ambientHex: '#9E825E',
    colSpanClass: 'lg:col-span-7',
    aspectClass: 'aspect-[4/3] lg:aspect-[16/10]',
    parallaxDirection: -1,
  },
  {
    id: 'blinds',
    indexLabel: '02',
    name: 'Blinds',
    image: '/images/core/blinds.jpg',
    link: '/roman-blinds',
    ambientHex: '#4F697D',
    colSpanClass: 'lg:col-span-5',
    aspectClass: 'aspect-[4/3] lg:aspect-auto lg:h-full',
    parallaxDirection: 1,
  },
  {
    id: 'wallpaper',
    indexLabel: '03',
    name: 'Wallpaper',
    image: '/images/core/wallpaper.jpg',
    link: '/wall-panels-wallpaper',
    ambientHex: '#8B755E',
    colSpanClass: 'lg:col-span-4',
    aspectClass: 'aspect-[5/4]',
    parallaxDirection: -1,
  },
  {
    id: 'wall-panels',
    indexLabel: '04',
    name: 'Wall Panel',
    image: '/images/core/wall_panel.jpg',
    link: '/wall-panels-wallpaper',
    ambientHex: '#635B52',
    colSpanClass: 'lg:col-span-4',
    aspectClass: 'aspect-[5/4]',
    parallaxDirection: 1,
  },
  {
    id: 'flooring',
    indexLabel: '05',
    name: 'Flooring',
    image: '/images/core/flooring.jpg',
    link: '/curtain-rods-flooring',
    ambientHex: '#A87B49',
    colSpanClass: 'lg:col-span-4',
    aspectClass: 'aspect-[5/4]',
    parallaxDirection: -1,
  },
];

interface SpatialPlateProps {
  item: CoreDiscipline;
  isDimmed: boolean;
  isHighlighted: boolean;
  sectionProgress: ReturnType<typeof useSpring>;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

/** Individual full-bleed architectural bay with pointer tilt, live grazing sheen & counter-parallax */
const SpatialDisciplinePlate: React.FC<SpatialPlateProps> = ({
  item,
  isDimmed,
  isHighlighted,
  sectionProgress,
  onHoverStart,
  onHoverEnd,
}) => {
  const [sheen, setSheen] = useState({ x: 50, y: 50, active: false });
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothTiltX = useSpring(tiltX, { stiffness: 170, damping: 22 });
  const smoothTiltY = useSpring(tiltY, { stiffness: 170, damping: 22 });

  // Bounded opposing vertical scroll drift safely under grid gap so plates never touch
  const driftY = useTransform(
    sectionProgress,
    [0, 1],
    item.parallaxDirection === -1 ? [11, -11] : [-11, 11],
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    tiltX.set((0.5 - relY) * 6);
    tiltY.set((relX - 0.5) * 6);
    setSheen({ x: relX * 100, y: relY * 100, active: true });
  };

  const handlePointerLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    setSheen((prev) => ({ ...prev, active: false }));
    onHoverEnd();
  };

  return (
    <motion.div
      style={{ y: driftY }}
      className={`${item.colSpanClass} h-full [perspective:1200px] will-change-transform`}
    >
      <motion.div
        style={{ rotateX: smoothTiltX, rotateY: smoothTiltY }}
        className="w-full h-full will-change-transform"
      >
        <Link
          to={item.link}
          data-cursor="VIEW"
          onMouseEnter={onHoverStart}
          onFocus={onHoverStart}
          onBlur={onHoverEnd}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className={`core-shutter-bay group relative block w-full ${item.aspectClass} rounded-3xl overflow-hidden bg-[#1D1B19] border transition-all duration-700 ${
            isHighlighted
              ? 'border-[#C5A880] shadow-glow-gold'
              : 'border-white/10 hover:border-[#C5A880]/70 shadow-2xl'
          } ${isDimmed ? 'opacity-60 saturate-75 scale-[0.985]' : 'opacity-100 saturate-100 scale-100'}`}
        >
          {/* Full-Bleed Architectural Photograph */}
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="core-bay-img w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-108 will-change-transform"
          />

          {/* Interactive Warm Sunlight / Material Texture Glint */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 mix-blend-soft-light"
            style={{
              opacity: sheen.active ? 0.9 : 0,
              background: `radial-gradient(circle 300px at ${sheen.x}% ${sheen.y}%, rgba(255, 242, 214, 0.92), transparent 68%)`,
            }}
          />

          {/* Deep Architectural Edge & Velvet Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/25 transition-opacity duration-500 pointer-events-none" />

          {/* Top Coordinates & Magnetic Arrow Pill */}
          <div className="absolute top-5 inset-x-5 flex items-center justify-between z-10 pointer-events-none">
            <span className="px-3 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/15 font-mono text-[10px] tracking-widest text-[#DEC8AA]">
              {item.indexLabel}
            </span>

            <span className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#C5A880] group-hover:border-[#C5A880] group-hover:text-[#141312] transition-all duration-500 group-hover:scale-110">
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>

          {/* Floating Bold Name Alone over Velvet Floor */}
          <div className="absolute bottom-6 inset-x-6 sm:bottom-7 sm:inset-x-7 z-10 pointer-events-none">
            <h3 className="font-syne text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-[#FAF8F5] group-hover:text-[#DEC8AA] transition-colors duration-300 leading-none">
              {item.name}
            </h3>
            <div className="mt-3 h-[2px] w-8 group-hover:w-20 bg-[#C5A880] transition-all duration-500 rounded-full" />
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export const CoreFurnishingsExperience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeDiscipline =
    CORE_DISCIPLINES.find((d) => d.id === activeId) ?? CORE_DISCIPLINES[0];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 95, damping: 24 });

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Hairline draw on header entry
      gsap.fromTo(
        '.core-header-rule',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            end: 'top 42%',
            scrub: 0.7,
          },
        },
      );

      // Shutter-mask reveal + inner push-out depth scrub on each core photography bay
      gsap.utils.toArray<HTMLElement>('.core-shutter-bay').forEach((bay, idx) => {
        gsap.fromTo(
          bay,
          { clipPath: 'inset(9% 0% 9% 0% round 26px)', opacity: 0.7 },
          {
            clipPath: 'inset(0% 0% 0% 0% round 24px)',
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bay,
              start: 'top 92%',
              end: 'top 45%',
              scrub: 0.65 + idx * 0.05,
            },
          },
        );

        const img = bay.querySelector('.core-bay-img');
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.18 },
            {
              scale: 1.02,
              ease: 'none',
              scrollTrigger: {
                trigger: bay,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-28 bg-[#121110] text-[#FAF8F5] border-t border-white/10 overflow-hidden"
    >
      {/* Living Atmospheric Aura Mirroring Currently Focused Discipline Across Whole Section */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          key={activeDiscipline.image}
          src={activeDiscipline.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover opacity-[0.16] blur-3xl scale-115 transition-all duration-1000 ease-out"
        />
        <div
          className="absolute inset-0 transition-colors duration-1000"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 45%, ${activeDiscipline.ambientHex}28, #121110 78%)`,
          }}
        />
        <div className="absolute inset-0 bg-grain opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#C5A880]" />
              <span className="label-caps text-[#C5A880] text-[10px]">
                Core Interior Disciplines
              </span>
            </div>
            <h2 className="font-syne text-4xl sm:text-5xl lg:text-6xl text-white font-bold uppercase tracking-tight leading-none">
              Bespoke Furnishings
            </h2>
          </div>

          <Link
            to="/services"
            className="text-xs uppercase tracking-luxury text-[#DEC8AA] font-syne font-bold hover:text-white transition-colors self-start lg:self-auto"
          >
            Explore Full Specs →
          </Link>
        </div>

        {/* Drawing Architectural Brass Rule */}
        <div className="core-header-rule h-[1px] w-full bg-gradient-to-r from-[#C5A880]/70 via-white/15 to-transparent origin-left mb-10" />

        {/* Interactive Index Pulse Pills (Bidirectionally syncs ambient aura & bay spotlight) */}
        <div className="flex flex-wrap items-center gap-2.5 mb-12">
          {CORE_DISCIPLINES.map((item) => {
            const isActive = activeId === item.id;
            return (
              <Link
                key={item.id}
                to={item.link}
                onMouseEnter={() => setActiveId(item.id)}
                onMouseLeave={() => setActiveId(null)}
                onFocus={() => setActiveId(item.id)}
                onBlur={() => setActiveId(null)}
                className={`px-4 py-2 rounded-full text-[11px] font-syne font-semibold uppercase tracking-wider border transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#C5A880] text-[#141312] border-[#C5A880] shadow-glow-gold'
                    : 'bg-white/5 text-[#D3D0C9] border-white/10 hover:border-[#C5A880]/60 hover:text-white'
                }`}
              >
                <span className="font-mono text-[10px] opacity-70">{item.indexLabel}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Asymmetric 5-Bay Full-Bleed Architectural Exhibition */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-7 lg:gap-8 items-stretch">
          {CORE_DISCIPLINES.map((item) => (
            <SpatialDisciplinePlate
              key={item.id}
              item={item}
              sectionProgress={smoothProgress}
              isDimmed={activeId !== null && activeId !== item.id}
              isHighlighted={activeId === item.id}
              onHoverStart={() => setActiveId(item.id)}
              onHoverEnd={() => setActiveId(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
