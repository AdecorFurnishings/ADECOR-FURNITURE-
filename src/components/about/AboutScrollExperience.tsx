import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  useAnimationFrame,
  useMotionValue,
} from 'framer-motion';
import { ArrowRight, MapPin, Building2 } from 'lucide-react';
import { SITE_CONTENT } from '../../data/content';

gsap.registerPlugin(ScrollTrigger);

interface VelocityRibbonProps {
  items: string[];
  baseVelocity: number;
}

/** Kinetic horizontal typography band whose speed and lean react physically to scroll velocity */
const VelocityScopeRibbon: React.FC<VelocityRibbonProps> = ({ items, baseVelocity }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 48, stiffness: 320 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4.5], { clamp: false });
  const skewX = useTransform(smoothVelocity, [-1500, 1500], [-6, 6]);
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) directionFactor.current = -1;
    else if (vf > 0) directionFactor.current = 1;

    moveBy += moveBy * Math.min(Math.abs(vf), 6);
    let next = baseX.get() + moveBy;
    if (next <= -33.3333) next += 33.3333;
    if (next > 0) next -= 33.3333;
    baseX.set(next);
  });

  const xPercent = useTransform(baseX, (v) => `${v}%`);
  const repeated = [...items, ...items, ...items];

  return (
    <div className="w-full overflow-hidden py-2.5 select-none">
      <motion.div
        style={{ x: xPercent, skewX }}
        className="flex items-center gap-7 w-max will-change-transform"
      >
        {repeated.map((label, idx) => (
          <div key={`${label}-${idx}`} className="flex items-center gap-7 shrink-0">
            <span className="font-editorial italic text-2xl sm:text-4xl lg:text-[2.6rem] text-[#1E1D1B]/85 hover:text-[#9A7A4F] transition-colors tracking-normal">
              {label}
            </span>
            <span className="w-1.5 h-1.5 rotate-45 bg-[#C5A880] shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

interface AboutScrollExperienceProps {
  mode: 'page' | 'section';
}

export const AboutScrollExperience: React.FC<AboutScrollExperienceProps> = ({ mode }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroPlateRef = useRef<HTMLDivElement>(null);
  const [yearDisplay, setYearDisplay] = useState(2004);
  const [sheenCoords, setSheenCoords] = useState({ x: 50, y: 35, active: false });

  const isFullPage = mode === 'page';
  const selectClients = SITE_CONTENT.clients.filter((c) =>
    SITE_CONTENT.about.featuredClientIds.includes(c.id),
  );

  // Scroll physics bindings for parallax depth, rotating seal, compass caliper & tailor gauge
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 95, damping: 24 });
  const heroFrameY = useTransform(smoothProgress, [0, 1], [54, -64]);
  const insetSheerY = useTransform(smoothProgress, [0, 1], [-32, 48]);
  const sealRotation = useTransform(smoothProgress, [0, 1], [0, 220]);
  const compassRotation = useTransform(smoothProgress, [0, 1], [0, 180]);
  const waveShiftX = useTransform(smoothProgress, [0, 1], ['0%', '-18%']);
  const caliperNeedleX = useTransform(smoothProgress, [0.15, 0.75], ['4%', '96%']);

  // Pointer spatial tilt + living warm window-light glint on primary image frame
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothTiltX = useSpring(tiltX, { stiffness: 160, damping: 20 });
  const smoothTiltY = useSpring(tiltY, { stiffness: 160, damping: 20 });

  const handlePlatePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    tiltX.set((0.5 - relY) * 7);
    tiltY.set((relX - 0.5) * 7);
    setSheenCoords({ x: relX * 100, y: relY * 100, active: true });
  };

  const handlePlatePointerLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    setSheenCoords((prev) => ({ ...prev, active: false }));
  };

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Editorial paragraph glide & contrast settle (pure ink typography — zero marker bars)
      gsap.fromTo(
        '.about-editorial-copy',
        { opacity: isFullPage ? 0.72 : 0.25, y: isFullPage ? 16 : 36 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.22,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-narrative-block',
            start: isFullPage ? 'top 95%' : 'top 84%',
            end: isFullPage ? 'bottom 48%' : 'bottom 52%',
            scrub: 0.7,
          },
        },
      );

      // 2. Drawing hairline rule across section
      gsap.fromTo(
        '.about-hairline-draw',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-narrative-block',
            start: isFullPage ? 'top 90%' : 'top 76%',
            end: 'bottom 50%',
            scrub: 0.8,
          },
        },
      );

      // 3. Shutter iris clip-path unveil & room push-in zoom on main interior plate
      gsap.fromTo(
        heroPlateRef.current,
        { clipPath: 'inset(6% 7% 6% 7% round 28px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 24px)',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heroPlateRef.current,
            start: 'top 90%',
            end: 'center 42%',
            scrub: 0.8,
          },
        },
      );

      gsap.fromTo(
        '.about-hero-plate-img',
        { scale: 1.2 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: heroPlateRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );

      // 4. Smooth 2004 founding numeral roll counter
      const yearObj = { val: 1998 };
      gsap.to(yearObj, {
        val: 2004,
        duration: 1.0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-year-trigger',
          start: 'top 90%',
          once: true,
        },
        onUpdate: () => setYearDisplay(Math.round(yearObj.val)),
      });

      // 6. Select clients staggered dark-stage veil entrance
      gsap.fromTo(
        '.about-client-tile',
        { y: 45, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-clients-stage',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isFullPage]);

  return (
    <div
      ref={sectionRef}
      className={`w-full relative overflow-hidden bg-[#FAF8F5] ${isFullPage ? 'pt-36 sm:pt-44' : 'py-24'}`}
    >
      {/* Fixed Left Architectural Brass Progress Thread (Desktop /about Page) */}
      {isFullPage && (
        <div
          aria-hidden="true"
          className="hidden xl:flex fixed left-5 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-3 pointer-events-none mix-blend-difference"
        >
          <span className="text-[9px] font-mono tracking-widest text-[#C5A880] -rotate-90 origin-center mb-4">
            02 // ABOUT
          </span>
          <div className="w-[2px] h-28 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleY: smoothProgress }}
              className="w-full h-full bg-[#C5A880] origin-top"
            />
          </div>
        </div>
      )}

      {/* Subtle Ambient Paper Grain & Architectural Glow */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />

      {/* MOVEMENT 1: BREATHING EDITORIAL COPY + DAYLIGHT ATELIER IMAGE FRAME */}
      <section className={`max-w-7xl mx-auto px-6 relative z-10 ${isFullPage ? 'pb-20 sm:pb-24' : 'pb-16 sm:pb-20'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Narrative Column (6 cols) — Clean Unmarked Verbatim Copy */}
          <div className="lg:col-span-6 space-y-8 about-narrative-block relative">
            {/* Ghosted Architectural "2004" Backdrop */}
            <span
              aria-hidden="true"
              className="hidden sm:block absolute -top-10 -left-4 font-syne text-[7.5rem] lg:text-[9.5rem] font-bold text-[#EAE7E1] select-none pointer-events-none leading-none -z-10"
            >
              2004
            </span>

            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#C5A880]" />
              <span className="label-caps text-[10px] tracking-[0.28em] text-[#8A8782]">
                Anna Nagar, Chennai • Since 2004
              </span>
            </div>

            {isFullPage ? (
              <h1 className="font-syne text-5xl sm:text-6xl lg:text-7xl text-[#1E1D1B] font-bold tracking-tight uppercase leading-[0.96]">
                About Us
              </h1>
            ) : (
              <h2 className="font-syne text-4xl sm:text-5xl lg:text-6xl text-[#1E1D1B] font-bold tracking-tight uppercase leading-[1.02]">
                About Us
              </h2>
            )}

            {/* Paragraph 1: Verbatim prose styled cleanly with editorial serif italics */}
            <p className="about-editorial-copy font-editorial text-2xl sm:text-[1.95rem] lg:text-[2.15rem] text-[#1E1D1B] font-light leading-[1.42]">
              A-Decor offers both{' '}
              <em className="italic font-normal text-[#1E1D1B]">classic and innovative design solutions</em>{' '}
              for <span className="font-normal">home/office</span>. Our aim is to help you put together the kind of environment in which you feel both{' '}
              <em className="italic font-normal text-[#1E1D1B]">comfortable and inspired</em>. Our service provision encompasses all aspects of{' '}
              <span className="font-normal">home/office</span> interiors, including{' '}
              <em className="italic font-normal text-[#1E1D1B]">
                curtain rods, curtains, blinds, wallpaper, wall panel, and flooring
              </em>
              .
            </p>

            {/* Kinetic Architectural Caliper Divider reacting to scroll */}
            <div className="flex items-center gap-4 py-1">
              <motion.span
                style={{ rotate: compassRotation }}
                className="w-2.5 h-2.5 border border-[#C5A880] bg-[#FAF8F5] shrink-0 block"
              />
              <div className="about-hairline-draw flex-1 h-[1px] bg-gradient-to-r from-[#C5A880] via-[#D3D0C9] to-transparent origin-left" />
            </div>

            {/* Paragraph 2: Heritage & onsite promise */}
            <p className="about-editorial-copy text-base sm:text-lg text-[#5E5C57] font-light leading-relaxed">
              Founded in <span className="font-medium text-[#1E1D1B]">2004 in Chennai</span>, our Anna Nagar flagship location offers an{' '}
              <span className="font-medium text-[#1E1D1B]">onsite design consultation and measuring service</span>{' '}
              focused on your requirements anywhere in{' '}
              <span className="font-medium text-[#1E1D1B]">Tamil Nadu and surrounding area</span>.
            </p>

            {/* Refined Action Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="px-7 py-3.5 rounded-full bg-[#1E1D1B] hover:bg-[#C5A880] text-[#FAF8F5] hover:text-[#1E1D1B] font-syne font-bold text-xs tracking-luxury uppercase transition-all inline-flex items-center gap-2.5 shadow-soft-luxury group"
              >
                <span>Book Onsite Consultation</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              {!isFullPage && (
                <Link
                  to="/about"
                  className="px-6 py-3.5 rounded-full border border-[#1E1D1B]/25 hover:border-[#C5A880] text-[#1E1D1B] font-syne font-semibold text-xs tracking-luxury uppercase transition-all"
                >
                  Experience Full Page →
                </Link>
              )}
            </div>
          </div>

          {/* Interactive & Multi-Depth Daylight Atelier Image Frame (6 cols) */}
          <div className="lg:col-span-6 relative pt-4 lg:pt-0 [perspective:1200px]">
            {/* Rotating Scroll-Driven Anna Nagar Craftsman Stamp */}
            <motion.div
              style={{ rotate: sealRotation }}
              className="hidden sm:flex absolute -top-6 -right-3 lg:-right-6 z-20 w-28 h-28 rounded-full items-center justify-center pointer-events-none select-none"
            >
              <svg viewBox="0 0 120 120" className="w-full h-full">
                <defs>
                  <path
                    id="aboutSealPath"
                    d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
                  />
                </defs>
                <circle cx="60" cy="60" r="56" fill="#141312" fillOpacity="0.94" stroke="#D90B0B" strokeWidth="1.2" />
                <circle cx="60" cy="60" r="52" fill="none" stroke="#C5A880" strokeWidth="0.6" strokeOpacity="0.55" />
                <text
                  fill="#DEC8AA"
                  fontSize="6.7"
                  fontWeight="700"
                  letterSpacing="1.65"
                  className="uppercase font-sans"
                >
                  <textPath href="#aboutSealPath">
                    A DECOR FURNISHINGS • ANNA NAGAR • EST 2004 •
                  </textPath>
                </text>
                {/* Crimson [A] Center Keystone */}
                <rect x="46" y="47" width="28" height="25" fill="#D90B0B" />
                <path
                  d="M 60 51 L 68 68 L 63.5 68 L 62 64.2 L 58 64.2 L 56.5 68 L 52 68 Z M 60 56.5 L 58.6 61 L 61.4 61 Z"
                  fill="#FFFFFF"
                  fillRule="evenodd"
                />
              </svg>
            </motion.div>

            {/* Primary Spatial Tilt + Window Sunbeam Sheen Plate */}
            <motion.div
              style={{ y: heroFrameY, rotateX: smoothTiltX, rotateY: smoothTiltY }}
              onPointerMove={handlePlatePointerMove}
              onPointerLeave={handlePlatePointerLeave}
              className="relative will-change-transform cursor-pointer group"
            >
              <div
                ref={heroPlateRef}
                className="relative rounded-3xl overflow-hidden border border-[#D3D0C9] shadow-elevated aspect-[4/4.5] bg-[#141312]"
              >
                <img
                  src="/images/hd/headboard_suite.jpg"
                  alt="A-Decor Classic and Innovative Design Solutions — Anna Nagar, Chennai"
                  decoding="async"
                  className="about-hero-plate-img w-full h-full object-cover will-change-transform transition-filter duration-700 group-hover:contrast-[1.04]"
                />

                {/* Warm filtered window-sunlight sheen responding to cursor */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500 mix-blend-soft-light"
                  style={{
                    opacity: sheenCoords.active ? 0.85 : 0.25,
                    background: `radial-gradient(circle 340px at ${sheenCoords.x}% ${sheenCoords.y}%, rgba(255, 240, 212, 0.85), transparent 70%)`,
                  }}
                />

                {/* Soft cinematic bottom shadow veil */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />

                {/* Minimal Architectural Caption & Animated 2004 Numeral */}
                <div className="about-year-trigger absolute bottom-0 inset-x-0 p-6 sm:p-8 flex items-end justify-between text-white">
                  <div>
                    <span className="label-caps text-[#C5A880] text-[10px] block">
                      Prime Location • Chennai
                    </span>
                    <p className="font-syne text-4xl sm:text-5xl font-bold tracking-tight mt-0.5 tabular-nums">
                      {yearDisplay}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-[#FAF8F5]">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Tamil Nadu</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Secondary Sheer Drape Overlay Plate floating at contrasting scroll depth */}
            <motion.div
              style={{ y: insetSheerY }}
              className="hidden sm:block absolute -bottom-10 -left-8 z-20 w-48 aspect-[4/5] rounded-2xl overflow-hidden border-[3px] border-[#FAF8F5] shadow-2xl bg-[#1E1D1B] group"
            >
              <img
                src="/images/hd/curtains_sheer.jpg"
                alt="Home / Office Interior Furnishings"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-4">
                <span className="font-editorial italic text-lg text-[#FAF8F5] leading-tight">
                  Home / Office
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MOVEMENT 2: ARCHITECTURAL MEASURING HORIZON & VELOCITY-REACTIVE SCOPE RIBBONS */}
      <section className="relative z-10 py-10 border-y border-[#D3D0C9] bg-[#EAE7E1]/65 overflow-hidden">
        {/* Scroll-driven tailor measuring rule + gliding brass marker */}
        <div className="max-w-7xl mx-auto px-6 pb-8">
          <div className="relative h-8 border-b border-[#B5B1A8]/70 flex items-end justify-between text-[9px] font-mono text-[#8A8782] select-none">
            {Array.from({ length: 13 }).map((_, tickIdx) => (
              <div key={tickIdx} className="flex flex-col items-center gap-1">
                <span className="hidden sm:inline">{tickIdx % 2 === 0 ? `${String(tickIdx * 2).padStart(2, '0')}'` : ''}</span>
                <span className={`w-[1px] bg-[#8A8782]/70 ${tickIdx % 2 === 0 ? 'h-3' : 'h-1.5'}`} />
              </div>
            ))}
            <motion.div
              style={{ left: caliperNeedleX }}
              className="absolute bottom-0 -translate-x-1/2 flex flex-col items-center pointer-events-none"
            >
              <span className="w-2.5 h-2.5 rotate-45 bg-[#C5A880] shadow-sm mb-1" />
              <span className="w-[1.5px] h-4 bg-[#1E1D1B]" />
            </motion.div>
          </div>
        </div>

        {/* Flowing Silk Contour Wave background responding subtly to scroll */}
        <div aria-hidden="true" className="relative w-full h-8 -mt-4 mb-2 overflow-hidden opacity-35 pointer-events-none">
          <motion.svg
            style={{ x: waveShiftX }}
            viewBox="0 0 1440 48"
            className="w-[125%] h-full text-[#9A7A4F]"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M0 24 Q 90 2, 180 24 T 360 24 T 540 24 T 720 24 T 900 24 T 1080 24 T 1260 24 T 1440 24"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </motion.svg>
        </div>

        <VelocityScopeRibbon items={SITE_CONTENT.about.offerings} baseVelocity={-1.6} />
        <VelocityScopeRibbon
          items={[...SITE_CONTENT.about.offerings].reverse()}
          baseVelocity={1.4}
        />
      </section>

      {/* MOVEMENT 3: ATMOSPHERIC DARK STAGE — "SOME OF OUR CLIENTS" (5 SELECT CLIENTS) */}
      <section className="about-clients-stage bg-[#141312] text-[#FAF8F5] py-20 border-y border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-25" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-[#C5A880]/40 mb-3">
                <Building2 className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="label-caps text-[10px] text-[#DEC8AA]">Selected Associations</span>
              </div>
              <h3 className="font-syne text-3xl sm:text-5xl text-white font-bold uppercase tracking-tight">
                Some of Our Clients
              </h3>
            </div>

            <Link
              to="/contact#clients"
              className="text-xs uppercase tracking-luxury text-[#C5A880] hover:text-white transition-colors font-syne font-semibold inline-flex items-center gap-2 self-start md:self-auto"
            >
              <span>View All Clients</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {selectClients.map((client) => (
              <div
                key={client.id}
                className="about-client-tile group p-6 rounded-2xl bg-[#1E1D1B] border border-white/10 hover:border-[#C5A880] transition-all duration-500 flex flex-col justify-between min-h-[180px]"
              >
                <div className="h-20 rounded-xl bg-[#FAF8F5] flex items-center justify-center p-4 overflow-hidden">
                  <img
                    src={client.logoTransparent || client.logo}
                    alt={client.name}
                    loading="lazy"
                    decoding="async"
                    className="max-h-12 max-w-full object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                  />
                </div>
                <div className="pt-4">
                  <span className="label-caps text-[9px] text-[#C5A880] block">
                    {client.industry}
                  </span>
                  <p className="font-syne text-sm font-bold text-white uppercase tracking-tight mt-1 group-hover:text-[#DEC8AA] transition-colors">
                    {client.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
