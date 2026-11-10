import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Ruler } from 'lucide-react';
import { SITE_CONTENT } from '../data/content';

export const CurtainStylesPage: React.FC = () => {

  return (
    <div className="pt-28 pb-24 bg-[#FAF8F5]">
      {/* Page Hero */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE7E1] text-[#1E1D1B] border border-[#D3D0C9] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className="label-caps text-[10px] tracking-luxury">Curtain Styles • Choose Your Pleat</span>
        </div>
        <h1 className="font-syne text-5xl sm:text-6xl lg:text-7xl text-[#1E1D1B] font-bold uppercase tracking-tight">
          13 Signature Drapery Pleats
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-base sm:text-lg text-[#5E5C57] font-light leading-relaxed">
          The pleat defines light filtration, fabric fall, and window geometry. Explore our complete tailoring repertoire.
        </p>
      </div>

      {/* Grid of 13 Curtain Pleats */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SITE_CONTENT.curtainPleatStyles.map((pleat, idx) => (
            <div
              key={pleat.id}
              className="group rounded-2xl bg-white border border-[#D3D0C9] overflow-hidden shadow-soft-luxury hover:shadow-elevated hover:border-[#C5A880] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Pleat Image from PDF Brochure */}
                <div className="relative aspect-square overflow-hidden bg-[#ECE9E2]">
                  <img
                    src={pleat.image}
                    alt={pleat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#1E1D1B]/80 backdrop-blur-md text-[#C5A880] text-[10px] font-mono border border-white/10">
                    {pleat.fullness}
                  </span>
                  <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/90 text-[#1E1D1B] flex items-center justify-center text-[10px] font-semibold">
                    {idx + 1}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 space-y-2.5">
                  <h3 className="font-editorial text-2xl text-[#1E1D1B] group-hover:text-[#C5A880] transition-colors leading-tight">
                    {pleat.name}
                  </h3>
                  <p className="text-xs text-[#5E5C57] leading-relaxed line-clamp-3">
                    {pleat.description}
                  </p>

                  <div className="pt-2 border-t border-[#D3D0C9]/60 space-y-1 text-[11px] text-[#8A8782]">
                    <p><strong className="text-[#1E1D1B]">Aesthetic:</strong> {pleat.aesthetic}</p>
                    <p><strong className="text-[#1E1D1B]">Track / Pole:</strong> {pleat.hardware}</p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <Link
                  to={`/contact?pleat=${encodeURIComponent(pleat.name)}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#FAF8F5] group-hover:bg-[#1E1D1B] border border-[#D3D0C9] group-hover:border-[#1E1D1B] text-[#1E1D1B] group-hover:text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all"
                >
                  <span>Select for Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Drapery Fullness Guide */}
      <div className="max-w-5xl mx-auto px-6 mt-20">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#ECE9E2] border border-[#D3D0C9] space-y-6">
          <div className="flex items-center gap-3 text-[#C5A880]">
            <Ruler className="w-6 h-6" />
            <span className="label-caps text-xs text-[#1E1D1B]">The A-Decor Guide to Fabric Fullness</span>
          </div>

          <h3 className="font-editorial text-3xl text-[#1E1D1B] font-light">
            Why Fullness Defines Stately Drapery
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#5E5C57] leading-relaxed">
            <div className="p-4 rounded-xl bg-white border border-[#D3D0C9]">
              <strong className="text-sm font-semibold text-[#1E1D1B] block mb-1">1.8x – 2.0x Fullness</strong>
              Ideal for clean, tailored modern looks such as Ripple Fold and Inverted Box Pleat. Uses less stack-back width on either side of the window, leaving more daylight unblocked.
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#D3D0C9]">
              <strong className="text-sm font-semibold text-[#1E1D1B] block mb-1">2.2x – 2.5x Fullness</strong>
              The classic luxury sweet spot. Offers rich, undulating folds, excellent acoustic sound dampening, and substantial thermal retention.
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#D3D0C9]">
              <strong className="text-sm font-semibold text-[#1E1D1B] block mb-1">3.0x Fullness (Bespoke Stately)</strong>
              Our highest tier for presidential hotel suites and double-height living areas. Employs Triple Pinch or Goblet pleats with rich interlining.
            </div>
          </div>

          <div className="pt-2 text-center">
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full bg-[#1E1D1B] hover:bg-[#C5A880] text-white hover:text-[#1E1D1B] text-xs tracking-luxury uppercase font-semibold transition-all inline-block shadow-md"
            >
              Consult with Our Drapery Specialist
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
