import React from 'react';
import { Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE_CONTENT } from '../../data/content';

export const ClientsMarquee: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAF8F5] border-t border-[#D3D0C9]/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAE7E1] text-[#1E1D1B] mb-3 border border-[#D3D0C9]">
              <Building2 className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="label-caps text-[10px] tracking-luxury">Trusted Enterprise Portfolio</span>
            </div>
            <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl text-[#1E1D1B] font-bold uppercase tracking-tight">
              Trusted by Premier Establishments
            </h2>
          </div>

          <Link
            to="/contact#clients"
            className="text-xs uppercase tracking-luxury text-[#1E1D1B] font-semibold hover:text-[#C5A880] transition-colors self-start md:self-auto"
          >
            Explore Case Studies →
          </Link>
        </div>
      </div>

      {/* Infinite Smooth Scrolling Marquee Logo Strip */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Subtle left & right gradient fade */}
        <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10 pointer-events-none" />

        <div className="flex items-center gap-12 w-max animate-marquee hover:[animation-play-state:paused]">
          {/* Duplicate list 3 times for continuous loop */}
          {[...SITE_CONTENT.clients, ...SITE_CONTENT.clients, ...SITE_CONTENT.clients].map((client, idx) => (
            <div
              key={`${client.id}-${idx}`}
              className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-[#D3D0C9]/70 shadow-sm hover:shadow-lg transition-all duration-300 w-56 h-36 group shrink-0"
            >
              <img
                src={client.logoTransparent || client.logo}
                alt={client.name}
                loading="lazy"
                decoding="async"
                className="max-h-16 max-w-[160px] object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-300 opacity-70 group-hover:opacity-100"
              />
              <span className="text-[10px] tracking-widest text-[#8A8782] uppercase mt-2 group-hover:text-[#1E1D1B] transition-colors truncate max-w-[180px]">
                {client.industry}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Marquee CSS in inline style for zero-config guarantee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </section>
  );
};
