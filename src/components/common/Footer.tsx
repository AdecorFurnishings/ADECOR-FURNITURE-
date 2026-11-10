import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Globe, ArrowUpRight } from 'lucide-react';
import { SITE_CONTENT } from '../../data/content';

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const YoutubeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
  </svg>
);

const TwitterIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#141312] text-[#FAF8F5] pt-20 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Background grain */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Top Editorial Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 border border-[#C5A880] flex items-center justify-center">
                <span className="font-editorial text-2xl text-[#FAF8F5]">A</span>
              </div>
              <span className="font-editorial text-2xl tracking-[0.2em] text-[#FAF8F5]">
                A-DECOR
              </span>
            </Link>

            <p className="text-xs text-[#D3D0C9] font-light leading-relaxed max-w-sm">
              {SITE_CONTENT.about.leadParagraph}
            </p>

            <div className="pt-2">
              <p className="label-caps text-[#C5A880] text-[10px]">On-Site Service Guarantee</p>
              <p className="text-xs text-[#8A8782] mt-1">
                Complimentary design consultation and measuring service anywhere in Tamil Nadu and surrounding regions.
              </p>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <p className="label-caps text-[#C5A880] text-[11px]">Pages</p>
            <ul className="space-y-2.5 text-xs text-[#D3D0C9]">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Our Services</Link></li>
              <li><Link to="/curtain-styles" className="hover:text-white transition-colors">13 Curtain Pleats</Link></li>
              <li><Link to="/roman-blinds" className="hover:text-white transition-colors">12 Roman Blind Styles</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition-colors">Project Gallery</Link></li>
              <li><Link to="/clients" className="hover:text-white transition-colors">Enterprise Clients</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Showroom & Contact</Link></li>
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
            <p className="label-caps text-[#C5A880] text-[11px]">Nandanam Showroom</p>
            
            <div className="space-y-3 text-xs text-[#D3D0C9]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>
                  {SITE_CONTENT.brand.address.street}, {SITE_CONTENT.brand.address.area}, Chennai - {SITE_CONTENT.brand.address.pincode}
                </span>
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
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-[10px] text-[#8A8782] leading-tight">
                <p className="text-white font-medium">Scan for Digital Card</p>
                <p>Instant phone contact & showroom navigation in Chennai.</p>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Socials & Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#8A8782]">
          
          <div className="flex items-center gap-5">
            <a href={SITE_CONTENT.brand.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#C5A880] transition-colors" aria-label="Instagram">
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a href={SITE_CONTENT.brand.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-[#C5A880] transition-colors" aria-label="Facebook">
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a href={SITE_CONTENT.brand.socials.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-[#C5A880] transition-colors" aria-label="YouTube">
              <YoutubeIcon className="w-4 h-4" />
            </a>
            <a href={SITE_CONTENT.brand.socials.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-[#C5A880] transition-colors" aria-label="Twitter">
              <TwitterIcon className="w-4 h-4" />
            </a>
          </div>

          <p className="text-center sm:text-right font-light">
            © {new Date().getFullYear()} {SITE_CONTENT.brand.legalName}. All rights reserved. Crafted for luxury living in Tamil Nadu.
          </p>

        </div>

      </div>
    </footer>
  );
};
