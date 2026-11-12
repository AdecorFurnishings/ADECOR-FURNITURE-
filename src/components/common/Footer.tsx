import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Globe, ArrowUpRight, Clock } from 'lucide-react';
import { SITE_CONTENT } from '../../data/content';
import { ADecorLogo } from './ADecorLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#141312] text-[#FAF8F5] pt-20 pb-16 border-t border-white/10 relative overflow-hidden">
      {/* Background grain */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Main Editorial Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block group" aria-label="A Decor Furnishings">
              <ADecorLogo
                variant="obsidian"
                className="h-12 sm:h-14 w-auto transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>

            <p className="text-xs text-[#D3D0C9] font-light leading-relaxed max-w-sm">
              {SITE_CONTENT.about.leadParagraph}
            </p>

            <div className="pt-2">
              <p className="label-caps text-[#C5A880] text-[10px]">On-Site Consultation & Measuring</p>
              <p className="text-xs text-[#8A8782] mt-1">
                Onsite design consultation and measuring service focused on your requirements anywhere in Tamil Nadu and surrounding area.
              </p>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <p className="label-caps text-[#C5A880] text-[11px]">Pages</p>
            <ul className="space-y-2.5 text-xs text-[#D3D0C9]">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Our Services</Link></li>
              <li><Link to="/curtain-styles" className="hover:text-white transition-colors">Curtain Pleats</Link></li>
              <li><Link to="/roman-blinds" className="hover:text-white transition-colors">Roman Blind Styles</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition-colors">Project Gallery</Link></li>
              <li><Link to="/clients" className="hover:text-white transition-colors">Enterprise Clients</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Location & Contact</Link></li>
            </ul>
          </div>

          {/* Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <p className="label-caps text-[#C5A880] text-[11px]">Bespoke Craft</p>
            <ul className="space-y-2.5 text-xs text-[#D3D0C9]">
              {SITE_CONTENT.services.map((s) => (
                <li key={s.id}>
                  <Link to={`/services#${s.id}`} className="hover:text-white transition-colors flex items-center justify-between group">
                    <span>{s.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#C5A880] transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details & QR Code (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            <p className="label-caps text-[#C5A880] text-[11px]">Location</p>
            
            <div className="space-y-3 text-xs text-[#D3D0C9]">
              <a
                href={SITE_CONTENT.brand.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 hover:text-white transition-colors group"
              >
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>
                  {SITE_CONTENT.brand.address.street}, {SITE_CONTENT.brand.address.area}, {SITE_CONTENT.brand.address.city}, {SITE_CONTENT.brand.address.state} {SITE_CONTENT.brand.address.pincode}
                  <span className="block text-[10px] uppercase tracking-wider text-[#C5A880] group-hover:text-white mt-1">
                    Open in Google Maps ↗
                  </span>
                </span>
              </a>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="block">{SITE_CONTENT.brand.hours.weekdays}</span>
                  <span className="text-[11px] text-[#8A8782]">{SITE_CONTENT.brand.hours.sunday}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a href={`tel:${SITE_CONTENT.brand.phones[0]}`} className="hover:text-white transition-colors font-mono">
                  {SITE_CONTENT.brand.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a href={`mailto:${SITE_CONTENT.brand.email}`} className="hover:text-white transition-colors">
                  {SITE_CONTENT.brand.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>{SITE_CONTENT.brand.website}</span>
              </div>
            </div>

            {/* QR Code from PDF */}
            <div className="pt-2 flex items-center gap-3">
              <div className="w-16 h-16 rounded-lg bg-white p-1 border border-white/20 shrink-0">
                <img
                  src={SITE_CONTENT.brand.qrCodeImage}
                  alt="A-Decor Contact QR Code"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-[10px] text-[#8A8782] leading-tight">
                <p className="text-white font-medium">Scan for Digital Card</p>
                <p>Instant phone contact & location directions in Chennai.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
};
