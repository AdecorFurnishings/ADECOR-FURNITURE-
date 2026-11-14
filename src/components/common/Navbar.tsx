import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageSquare, MapPin } from 'lucide-react';
import { SITE_CONTENT } from '../../data/content';

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

  const navLinks = [
    { label: 'Home', href: '/', shortLabel: 'Home' },
    { label: 'About Us', href: '/about', shortLabel: 'About' },
    { label: 'Services', href: '/services', shortLabel: 'Services' },
    { label: 'Curtain Styles', href: '/curtain-styles', shortLabel: 'Curtains' },
    { label: 'Roman Blinds', href: '/roman-blinds', shortLabel: 'Blinds' },
    { label: 'Wall Panels & Wallpaper', href: '/wall-panels-wallpaper', shortLabel: 'Panels & Paper' },
    { label: 'Rods & Flooring', href: '/curtain-rods-flooring', shortLabel: 'Rods & Floor' },
    { label: 'Gallery', href: '/gallery', shortLabel: 'Gallery' },
    { label: 'Contact & Clients', href: '/contact', shortLabel: 'Contact' },
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-2 lg:gap-3 xl:gap-4">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center group shrink-0" aria-label="A Decor Furnishings Home">
            <div className="relative overflow-hidden rounded-lg border border-white/20 shadow-md bg-[#FAF8F5] transition-all duration-300 group-hover:scale-[1.03] group-hover:border-[#C5A880] group-hover:shadow-[0_4px_20px_rgba(197,168,128,0.3)]">
              <img
                src="/images/logo/adecor_official_logo.jpg"
                alt="A Decor Furnishings"
                className="h-7 sm:h-8 xl:h-9 w-auto block object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2.5 2xl:gap-3.5">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.href ||
                (link.href === '/contact' && (location.pathname === '/contact' || location.pathname === '/clients')) ||
                (link.href === '/wall-panels-wallpaper' && (
                  location.pathname === '/wall-panels-wallpaper' ||
                  location.pathname === '/wall-panels' ||
                  location.pathname === '/wallpaper' ||
                  location.pathname === '/wallpanels'
                )) ||
                (link.href === '/curtain-rods-flooring' && (
                  location.pathname === '/curtain-rods-flooring' ||
                  location.pathname === '/curtain-rods' ||
                  location.pathname === '/flooring' ||
                  location.pathname === '/carpets' ||
                  location.pathname === '/curtain-tracks'
                ));
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-[9px] xl:text-[10.5px] 2xl:text-[11px] tracking-[0.04em] xl:tracking-[0.08em] uppercase font-medium transition-all relative py-1 whitespace-nowrap ${
                    isActive
                      ? 'text-[#C5A880]'
                      : 'text-[#FAF8F5]/80 hover:text-white'
                  }`}
                >
                  <span className="hidden xl:inline">{link.label}</span>
                  <span className="xl:hidden">{link.shortLabel}</span>
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
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <a
              href={`tel:${SITE_CONTENT.brand.phones[0]}`}
              aria-label={`Call ${SITE_CONTENT.brand.phones[0]}`}
              title={`Call ${SITE_CONTENT.brand.phones[0]}`}
              className="hidden 2xl:flex w-9 h-9 rounded-full border border-white/20 text-[#FAF8F5] hover:border-[#C5A880] hover:text-[#C5A880] transition-all items-center justify-center shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
            </a>

            <Link
              to="/contact"
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#C5A880] hover:bg-[#FAF8F5] text-[#141312] font-semibold text-[10px] sm:text-[11px] tracking-[0.1em] sm:tracking-[0.14em] uppercase transition-all shadow-glow-gold whitespace-nowrap shrink-0"
            >
              Consultation
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-xl text-white hover:text-[#C5A880] transition-colors focus:outline-none shrink-0"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Fullscreen Luxury Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#141312] text-[#FAF8F5] flex flex-col justify-between p-8 overflow-y-auto animate-fade-in lg:hidden">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="overflow-hidden rounded-lg border border-white/20 shadow-md bg-[#FAF8F5]">
              <img
                src="/images/logo/adecor_official_logo.jpg"
                alt="A Decor Furnishings"
                className="h-8 w-auto block object-contain"
              />
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-white/70 hover:text-white"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-6 my-auto py-8">
            {navLinks.map((link, idx) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-editorial text-3xl sm:text-4xl text-[#FAF8F5] hover:text-[#C5A880] transition-colors flex items-center justify-between group"
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-[#8A8782] group-hover:text-[#C5A880]">
                  0{idx + 1}
                </span>
              </Link>
            ))}
          </nav>

          {/* Bottom Contact & Location Details */}
          <div className="pt-6 border-t border-white/10 space-y-4">
            <a
              href={SITE_CONTENT.brand.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2.5 text-xs text-[#D3D0C9] hover:text-[#C5A880] transition-colors"
            >
              <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
              <span>
                {SITE_CONTENT.brand.address.street}, {SITE_CONTENT.brand.address.area}, {SITE_CONTENT.brand.address.city}, {SITE_CONTENT.brand.address.state} {SITE_CONTENT.brand.address.pincode}
              </span>
            </a>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`tel:${SITE_CONTENT.brand.phones[0]}`}
                className="flex-1 py-3 px-5 rounded-full bg-[#C5A880] text-[#141312] font-semibold text-xs tracking-luxury uppercase text-center"
              >
                Call: {SITE_CONTENT.brand.phones[0]}
              </a>
              <a
                href={SITE_CONTENT.brand.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-5 rounded-full bg-[#25D366] text-white font-medium text-xs tracking-luxury uppercase text-center flex items-center justify-center gap-2"
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
