import React, { useEffect, useRef, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Sparkles, Check, ArrowRight, Ruler } from 'lucide-react';
import { SITE_CONTENT, type ServiceItem } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
  isDarkTheme: boolean;
}

/** Tactile architectural service showcase row with pointer tilt & warm grazing sunlight sheen */
const ServiceShowcaseRow: React.FC<ServiceCardProps> = ({ service, index, isDarkTheme }) => {
  const isEven = index % 2 === 0;
  const [sheen, setSheen] = useState({ x: 50, y: 40, active: false });
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothTiltX = useSpring(tiltX, { stiffness: 165, damping: 22 });
  const smoothTiltY = useSpring(tiltY, { stiffness: 165, damping: 22 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    tiltX.set((0.5 - relY) * 5.5);
    tiltY.set((relX - 0.5) * 5.5);
    setSheen({ x: relX * 100, y: relY * 100, active: true });
  };

  const handlePointerLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    setSheen((prev) => ({ ...prev, active: false }));
  };

  return (
    <article
      id={service.id}
      className={`service-showcase-row scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center p-6 sm:p-10 lg:p-12 rounded-3xl border transition-colors duration-500 ${
        isDarkTheme
          ? 'bg-[#141312] text-[#FAF8F5] border-white/10 shadow-2xl'
          : 'bg-white text-[#1E1D1B] border-[#D3D0C9] shadow-soft-luxury'
      } ${service.id === 'upholstery-rework' ? 'ring-1 ring-[#C5A880]/60' : ''}`}
    >
      {/* Tactile Image Plate Column (6 cols) */}
      <div className={`lg:col-span-6 [perspective:1200px] ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        <motion.div
          style={{ rotateX: smoothTiltX, rotateY: smoothTiltY }}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          data-cursor="VIEW"
          className="service-image-frame relative rounded-2xl overflow-hidden aspect-[16/11] bg-[#1D1B19] shadow-elevated group cursor-pointer will-change-transform"
        >
          <img
            src={service.image}
            alt={service.name}
            loading="lazy"
            className="service-parallax-photo w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-108 will-change-transform"
          />

          {/* Living daylight beam swept across textures on hover */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 mix-blend-soft-light"
            style={{
              opacity: sheen.active ? 0.9 : 0,
              background: `radial-gradient(circle 320px at ${sheen.x}% ${sheen.y}%, rgba(255, 240, 212, 0.9), transparent 68%)`,
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

          {service.badge && (
            <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#141312]/90 backdrop-blur-md border border-[#C5A880]/50 text-[#C5A880] text-[10px] font-semibold tracking-luxury uppercase shadow-md">
              {service.badge}
            </span>
          )}
        </motion.div>
      </div>

      {/* Narrative & Features Column (6 cols) */}
      <div className={`lg:col-span-6 space-y-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
        <div>
          <span className="label-caps text-[#C5A880] text-[11px]">
            0{index + 1} // Discipline
          </span>
          <h2
            className={`font-syne text-3xl sm:text-4xl font-bold uppercase tracking-tight mt-1 ${
              isDarkTheme ? 'text-white' : 'text-[#1E1D1B]'
            }`}
          >
            {service.name}
          </h2>
          <p className="font-editorial italic text-xl text-[#9A7A4F] mt-1">
            {service.tagline}
          </p>
        </div>

        <p
          className={`text-sm leading-relaxed font-light ${
            isDarkTheme ? 'text-[#D3D0C9]' : 'text-[#5E5C57]'
          }`}
        >
          {service.description}
        </p>

        <div className="space-y-2.5 pt-2">
          <p
            className={`text-[10px] font-semibold uppercase tracking-luxury ${
              isDarkTheme ? 'text-[#DEC8AA]' : 'text-[#1E1D1B]'
            }`}
          >
            Key Craftsmanship Highlights
          </p>
          <ul
            className={`grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs ${
              isDarkTheme ? 'text-[#D3D0C9]' : 'text-[#5E5C57]'
            }`}
          >
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 flex flex-wrap items-center gap-4">
          <Link
            to={`/contact?service=${encodeURIComponent(service.id)}`}
            className={`px-6 py-3 rounded-full text-xs tracking-luxury uppercase font-syne font-bold transition-all inline-flex items-center gap-2 group ${
              isDarkTheme
                ? 'bg-[#C5A880] text-[#141312] hover:bg-white'
                : 'bg-[#1E1D1B] text-[#FAF8F5] hover:bg-[#C5A880] hover:text-[#1E1D1B]'
            }`}
          >
            <span>Request Estimate</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>

          {service.id === 'curtains' && (
            <Link
              to="/curtain-styles"
              className={`text-xs uppercase tracking-luxury font-semibold transition-colors py-2 ${
                isDarkTheme ? 'text-[#DEC8AA] hover:text-white' : 'text-[#1E1D1B] hover:text-[#C5A880]'
              }`}
            >
              View Pleat Styles →
            </Link>
          )}

          {service.id === 'blinds' && (
            <Link
              to="/roman-blinds"
              className={`text-xs uppercase tracking-luxury font-semibold transition-colors py-2 ${
                isDarkTheme ? 'text-[#DEC8AA] hover:text-white' : 'text-[#1E1D1B] hover:text-[#C5A880]'
              }`}
            >
              View Roman Blinds →
            </Link>
          )}

          {(service.id === 'wall-panels' || service.id === 'wallpaper') && (
            <Link
              to="/wall-panels-wallpaper"
              className={`text-xs uppercase tracking-luxury font-semibold transition-colors py-2 ${
                isDarkTheme ? 'text-[#DEC8AA] hover:text-white' : 'text-[#1E1D1B] hover:text-[#C5A880]'
              }`}
            >
              Explore Wall Panels &amp; Wallpaper →
            </Link>
          )}

          {service.id === 'designer-headboards' && (
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/wall-panels-wallpaper"
                className={`text-xs uppercase tracking-luxury font-semibold transition-colors py-2 ${
                  isDarkTheme ? 'text-[#DEC8AA] hover:text-white' : 'text-[#1E1D1B] hover:text-[#C5A880]'
                }`}
              >
                View Headboards →
              </Link>
              <Link
                to="/mattress"
                className={`text-xs uppercase tracking-luxury font-semibold transition-colors py-2 ${
                  isDarkTheme ? 'text-[#DEC8AA] hover:text-white' : 'text-[#1E1D1B] hover:text-[#C5A880]'
                }`}
              >
                Explore Luxury Mattresses →
              </Link>
            </div>
          )}

          {service.id === 'flooring' && (
            <Link
              to="/flooring"
              className={`text-xs uppercase tracking-luxury font-semibold transition-colors py-2 ${
                isDarkTheme ? 'text-[#DEC8AA] hover:text-white' : 'text-[#1E1D1B] hover:text-[#C5A880]'
              }`}
            >
              Explore Flooring Solutions →
            </Link>
          )}

          {service.id === 'upholstery-rework' && (
            <Link
              to="/sofa-upholstery-rework"
              className={`text-xs uppercase tracking-luxury font-semibold transition-colors py-2 ${
                isDarkTheme ? 'text-[#DEC8AA] hover:text-white' : 'text-[#1E1D1B] hover:text-[#C5A880]'
              }`}
            >
              Explore Sofa &amp; Re-Upholstery Gallery →
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export const ServicesPage: React.FC = () => {
  const location = useLocation();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.substring(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.service-image-frame').forEach((frame) => {
        gsap.fromTo(
          frame,
          { clipPath: 'inset(8% 0% 8% 0% round 20px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 16px)',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: frame,
              start: 'top 90%',
              end: 'center 52%',
              scrub: 0.7,
            },
          },
        );

        const img = frame.querySelector('.service-parallax-photo');
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.18 },
            {
              scale: 1.02,
              ease: 'none',
              scrollTrigger: {
                trigger: frame,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          );
        }
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const scrollToService = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div ref={pageRef} className="pt-36 sm:pt-44 pb-24 bg-[#FAF8F5] relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-35" />

      {/* Page Hero */}
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE7E1] text-[#1E1D1B] border border-[#D3D0C9] mb-5">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className="label-caps text-[10px] tracking-luxury">Core Interior Disciplines</span>
        </div>
        <h1 className="font-syne text-4xl sm:text-6xl lg:text-7xl text-[#1E1D1B] font-bold uppercase tracking-tight leading-[1.05]">
          Our Interior Services
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-base sm:text-lg text-[#5E5C57] font-light leading-relaxed">
          From architectural drapes and motorized shades to acoustic panelling and bespoke upholstery rework. Tailored in Chennai since 2004.
        </p>

        {/* Quick Anchor Navigation Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {SITE_CONTENT.services.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollToService(s.id)}
              className="px-4 py-2 rounded-full bg-white hover:bg-[#1E1D1B] text-[#1E1D1B] hover:text-[#DEC8AA] border border-[#D3D0C9] hover:border-[#C5A880] text-[11px] font-syne font-semibold uppercase tracking-wider transition-all shadow-sm"
            >
              0{idx + 1} · {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tactile Alternating Light/Dark Service Showcases */}
      <div className="max-w-7xl mx-auto px-6 space-y-12 sm:space-y-16 relative z-10">
        {SITE_CONTENT.services.map((service, index) => (
          <ServiceShowcaseRow
            key={service.id}
            service={service}
            index={index}
            isDarkTheme={index % 2 === 1}
          />
        ))}
      </div>

      {/* On-Site Measuring Guarantee Banner */}
      <div className="max-w-5xl mx-auto px-6 mt-24 relative z-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#141312] text-[#FAF8F5] border border-white/10 text-center space-y-4 shadow-2xl">
          <Ruler className="w-8 h-8 text-[#C5A880] mx-auto" />
          <h3 className="font-editorial text-3xl text-white font-light">
            On-Site Measuring Anywhere in Tamil Nadu
          </h3>
          <p className="text-sm text-[#D3D0C9] max-w-xl mx-auto leading-relaxed font-light">
            Whether you are outfitting a residence in Chennai or an office across Tamil Nadu, our team brings physical fabric swatch cases and precision measuring on site.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="px-7 py-3 rounded-full bg-[#C5A880] text-[#141312] hover:bg-white text-xs tracking-luxury uppercase font-syne font-bold transition-all inline-block"
            >
              Book an On-Site Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
