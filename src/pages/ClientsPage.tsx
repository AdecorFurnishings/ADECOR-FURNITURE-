import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { SITE_CONTENT } from '../data/content';

export const ClientsPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-[#FAF8F5]">
      {/* Page Hero */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE7E1] text-[#1E1D1B] border border-[#D3D0C9] mb-4">
          <Building2 className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className="label-caps text-[10px] tracking-luxury">Corporate & Institutional Portfolio</span>
        </div>
        <h1 className="font-syne text-5xl sm:text-6xl lg:text-7xl text-[#1E1D1B] font-bold uppercase tracking-tight">
          Enterprise Clients
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-base sm:text-lg text-[#5E5C57] font-light leading-relaxed">
          For over 20 years, A-Decor has been the contract furnishing partner for India’s landmark hotels, healthcare facilities, and corporate headquarters.
        </p>
      </div>

      {/* Grid of 9 Clients */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SITE_CONTENT.clients.map((client, idx) => (
            <div
              key={client.id}
              className="p-8 rounded-3xl bg-white border border-[#D3D0C9] shadow-soft-luxury hover:shadow-elevated hover:border-[#C5A880] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Logo Frame */}
                <div className="w-full h-32 rounded-2xl bg-[#ECE9E2]/50 border border-[#D3D0C9]/60 flex items-center justify-center p-6 mb-6 group-hover:bg-[#FAF8F5] transition-colors">
                  <img
                    src={client.logoTransparent || client.logo}
                    alt={client.name}
                    className="max-h-16 max-w-full object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-108 transition-all duration-300"
                  />
                </div>

                <span className="label-caps text-[#C5A880] text-[10px]">
                  {client.industry}
                </span>
                <h3 className="font-editorial text-2xl text-[#1E1D1B] group-hover:text-[#C5A880] transition-colors mt-1 font-medium">
                  {client.name}
                </h3>

                <p className="text-xs text-[#5E5C57] leading-relaxed mt-3 font-light">
                  {client.description}
                </p>
              </div>

              <div className="pt-6 border-t border-[#D3D0C9]/60 mt-6 flex items-center justify-between text-[11px] text-[#8A8782]">
                <span className="flex items-center gap-1.5 text-[#1E1D1B] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Contract Verified</span>
                </span>
                <span className="font-mono text-[#8A8782]">Ref: AD-0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enterprise Standards & Contract Advisory Callout */}
      <div className="max-w-5xl mx-auto px-6 mt-20">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#1E1D1B] text-[#FAF8F5] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#C5A880]">
              <ShieldCheck className="w-5 h-5" />
              <span className="label-caps text-xs">Commercial Furnishing Division</span>
            </div>
            <h3 className="font-editorial text-3xl text-white font-light">
              Architectural & Bulk Tender Requirements
            </h3>
            <p className="text-xs sm:text-sm text-[#D3D0C9] max-w-lg leading-relaxed font-light">
              We cater to architects, interior design studios, real-estate builders, and turnkey hotel contractors across Tamil Nadu with specialized commercial pricing and flame-retardant certifications.
            </p>
          </div>

          <Link
            to="/contact?inquiry=enterprise"
            className="px-8 py-4 rounded-full bg-[#C5A880] text-[#141312] font-semibold text-xs tracking-luxury uppercase hover:bg-white transition-all shadow-glow-gold shrink-0 flex items-center gap-2"
          >
            <span>Inquire for Commercial Tender</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
