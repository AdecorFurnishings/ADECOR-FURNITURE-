import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageSquare, MapPin } from 'lucide-react';
import { SITE_CONTENT } from '../../data/content';
import { ADecorLogo } from './ADecorLogo';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change without cascading renders
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }

  // Lock body scroll while mobile menu is open to prevent background scrolling
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Sofa & Re-Upholstery Work', href: '/sofa-upholstery-rework' },
    { label: 'Curtain Styles & Rods', href: '/curtain-styles' },
    { label: 'Roman Blinds', href: '/roman-blinds' },
    { label: 'Wall Paper, Wall Panel & Headboards', href: '/wall-panels-wallpaper' },
    { label: 'Mattress', href: '/mattress' },
    { label: 'Flooring', href: '/flooring' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact & Clients', href: '/contact' },
  ];

  // Determine if navbar should have solid luxury dark background
  const isHomePage = location.pathname === '/';
  const shouldBeSolid = !isHomePage || isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          shouldBeSolid
            ? 'bg-[#141312] py-3.5 border-b border-white/10 shadow-lg'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5 sm:py-6'
        }`}
      >
        <div className="w-full max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-4 xl:px-6 2xl:px-8 flex items-center justify-between gap-1.5 lg:gap-2.5 xl:gap-4">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0" aria-label="A Decor Furnishings Home">
            <ADecorLogo
              variant="obsidian"
              className="h-7 sm:h-8 xl:h-9 w-auto transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </Link>

          {/* Desktop Navigation Links (All 11 in a Single Line with Clear Legibility & Spacing) */}
          <nav className="hidden lg:flex items-center gap-1.5 min-[1150px]:gap-2 xl:gap-2.5 2xl:gap-3.5 flex-nowrap shrink min-w-0">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.href ||
                (link.href === '/contact' && (location.pathname === '/contact' || location.pathname === '/clients')) ||
                (link.href === '/sofa-upholstery-rework' && (
                  location.pathname === '/sofa-upholstery-rework' ||
                  location.pathname === '/sofa-rework' ||
                  location.pathname === '/upholstery-rework' ||
                  location.pathname === '/upholstery' ||
                  location.pathname === '/sofas'
                )) ||
                (link.href === '/curtain-styles' && (
                  location.pathname === '/curtain-styles' ||
                  location.pathname === '/curtains' ||
                  location.pathname === '/curtain-rods' ||
                  location.pathname === '/curtain-tracks' ||
                  location.pathname === '/curtain-rods-flooring'
                )) ||
                (link.href === '/wall-panels-wallpaper' && (
                  location.pathname === '/wall-panels-wallpaper' ||
                  location.pathname === '/wall-panels' ||
                  location.pathname === '/wallpaper' ||
                  location.pathname === '/wallpanels' ||
                  location.pathname === '/headboards' ||
                  location.pathname === '/headboard'
                )) ||
                (link.href === '/mattress' && (
                  location.pathname === '/mattress' ||
                  location.pathname === '/mattresses' ||
                  location.pathname === '/beds' ||
                  location.pathname === '/bed-suites'
                )) ||
                (link.href === '/flooring' && (
                  location.pathname === '/flooring' ||
                  location.pathname === '/carpets'
                ));
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-[8.5px] min-[1120px]:text-[9px] min-[1240px]:text-[9.8px] xl:text-[10.2px] 2xl:text-[11.5px] tracking-[0.015em] xl:tracking-[0.03em] uppercase font-semibold transition-all relative py-1 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[#C5A880]'
                      : 'text-[#FAF8F5]/90 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-[#D90B0B] shrink-0" />
                      <span className="flex-1 h-[1.5px] bg-[#C5A880] rounded-full" />
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 z-20">
            <a
              href={`tel:${SITE_CONTENT.brand.phones[0]}`}
              aria-label={`Call ${SITE_CONTENT.brand.phones[0]}`}
              title={`Call ${SITE_CONTENT.brand.phones[0]}`}
              className="hidden 2xl:flex w-8 h-8 rounded-full border border-white/20 text-[#FAF8F5] hover:border-[#C5A880] hover:text-[#C5A880] transition-all items-center justify-center shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
            </a>

            <Link
              to="/contact"
              className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#C5A880] hover:bg-white text-[#141312] font-semibold text-[10.5px] sm:text-[11px] tracking-[0.08em] uppercase transition-all shadow-glow-gold whitespace-nowrap shrink-0 block min-w-fit"
            >
              Consultation
            </Link>

            {/* Mobile Menu Hamburger (Min 44x44px touch target) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-xl text-white hover:text-[#C5A880] transition-colors focus:outline-none shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Fullscreen Luxury Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#141312] text-[#FAF8F5] flex flex-col justify-between p-5 sm:p-8 overflow-y-auto animate-fade-in lg:hidden">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-white/10 shrink-0">
            <ADecorLogo variant="obsidian" className="h-8 sm:h-10 w-auto" />

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-white/70 hover:text-white"
              aria-label="Close Navigation Menu"
            >
              <X className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </div>

          {/* Navigation Links (Scrollable & Never Clipped) */}
          <nav className="flex-1 py-5 space-y-2 sm:space-y-3 overflow-y-auto min-h-0">
            {navLinks.map((link, idx) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-editorial text-xl sm:text-3xl text-[#FAF8F5] hover:text-[#C5A880] transition-colors flex items-center justify-between group min-h-[44px] py-1 border-b border-white/5"
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-[#8A8782] group-hover:text-[#C5A880]">
                  {idx < 9 ? `0${idx + 1}` : idx + 1}
                </span>
              </Link>
            ))}
          </nav>

          {/* Bottom Contact & Location Details */}
          <div className="pt-4 pb-4 border-t border-white/10 space-y-3 shrink-0">
            <a
              href={SITE_CONTENT.brand.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2.5 text-xs text-[#D3D0C9] hover:text-[#C5A880] transition-colors"
            >
              <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
              <span className="line-clamp-2">{SITE_CONTENT.brand.address.full}</span>
            </a>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
              <a
                href={`tel:${SITE_CONTENT.brand.phones[0]}`}
                className="min-h-[44px] flex-1 py-2.5 px-4 rounded-full bg-[#C5A880] text-[#141312] font-semibold text-xs tracking-luxury uppercase text-center flex items-center justify-center"
              >
                Call: {SITE_CONTENT.brand.phones[0]}
              </a>
              <a
                href={SITE_CONTENT.brand.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] flex-1 py-2.5 px-4 rounded-full bg-[#25D366] text-white font-medium text-xs tracking-luxury uppercase text-center flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
