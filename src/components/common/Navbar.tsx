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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Curtain Styles', href: '/curtain-styles' },
    { label: 'Roman Blinds', href: '/roman-blinds' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Clients', href: '/clients' },
    { label: 'Contact', href: '/contact' },
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
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Brand Logo & Monogram */}
          <Link to="/" className="flex items-center gap-3.5 group">
            {/* Architectural framed monogram */}
            <div className="relative w-10 h-10 border border-[#C5A880] flex items-center justify-center bg-[#141312] transition-transform duration-300 group-hover:scale-105 shadow-sm">
              <div className="absolute inset-1 border border-white/30" />
              <span className="font-editorial text-2xl font-light text-[#FAF8F5]">A</span>
            </div>

            <div className="flex flex-col">
              <span className="font-editorial text-xl sm:text-2xl tracking-[0.2em] font-normal text-[#FAF8F5] leading-none group-hover:text-[#C5A880] transition-colors">
                A-DECOR
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#C5A880] font-medium mt-1">
                Nandanam • Chennai
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-xs tracking-luxury uppercase font-medium transition-all relative py-1 ${
                    isActive
                      ? 'text-[#C5A880]'
                      : 'text-[#FAF8F5]/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-[1.5px] bg-[#C5A880] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="hidden sm:flex items-center gap-3.5">
            <a
              href={`tel:${SITE_CONTENT.brand.phones[0]}`}
              className="px-4 py-2 rounded-full border border-white/20 text-[#FAF8F5] hover:border-[#C5A880] hover:text-[#C5A880] text-xs tracking-wider transition-all flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="font-mono text-[11px]">{SITE_CONTENT.brand.phones[0]}</span>
            </a>

            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-full bg-[#C5A880] hover:bg-[#FAF8F5] text-[#141312] font-semibold text-xs tracking-luxury uppercase transition-all shadow-glow-gold"
            >
              Consultation
            </Link>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-white hover:text-[#C5A880] transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </header>

      {/* Mobile Fullscreen Luxury Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#141312] text-[#FAF8F5] flex flex-col justify-between p-8 overflow-y-auto animate-fade-in lg:hidden">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 border border-[#C5A880] flex items-center justify-center">
                <span className="font-editorial text-xl text-[#FAF8F5]">A</span>
              </div>
              <span className="font-editorial text-lg tracking-widest text-[#FAF8F5]">A-DECOR</span>
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

          {/* Bottom Contact & Showroom Details */}
          <div className="pt-6 border-t border-white/10 space-y-4">
            <div className="flex items-start gap-2.5 text-xs text-[#D3D0C9]">
              <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
              <span>{SITE_CONTENT.brand.address.street}, {SITE_CONTENT.brand.address.area}, Chennai - 600035</span>
            </div>

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
