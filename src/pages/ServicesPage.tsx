import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Sparkles, Check, ArrowRight, Ruler } from 'lucide-react';
import { SITE_CONTENT } from '../data/content';

export const ServicesPage: React.FC = () => {
  const location = useLocation();

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

  return (
    <div className="pt-28 pb-24 bg-[#FAF8F5]">
      {/* Page Hero */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE7E1] text-[#1E1D1B] border border-[#D3D0C9] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className="label-caps text-[10px] tracking-luxury">End-to-End Interior Atelier</span>
        </div>
        <h1 className="font-syne text-5xl sm:text-6xl lg:text-7xl text-[#1E1D1B] font-bold uppercase tracking-tight">
          Our Atelier Services
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-base sm:text-lg text-[#5E5C57] font-light leading-relaxed">
          From architectural drapes and motorized shades to acoustic panelling and master sofa restorations. Tailored in Chennai since 2004.
        </p>
      </div>

      {/* Services List with Detailed Deep-Dives */}
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        {SITE_CONTENT.services.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={service.id}
              id={service.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center p-8 sm:p-12 rounded-3xl bg-white border border-[#D3D0C9] shadow-soft-luxury ${
                service.id === 'sofa-refurbishing' ? 'ring-2 ring-[#C5A880]/50' : ''
              }`}
            >
              {/* Media Column (6 cols) */}
              <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="relative rounded-2xl overflow-hidden aspect-[16/11] bg-[#ECE9E2] shadow-md group">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {service.badge && (
                    <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#1E1D1B] text-[#C5A880] text-xs font-semibold tracking-wider uppercase shadow-md">
                      {service.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Text & Features Column (6 cols) */}
              <div className={`lg:col-span-6 space-y-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div>
                  <span className="label-caps text-[#C5A880] text-[11px]">
                    Service 0{index + 1}
                  </span>
                  <h2 className="font-editorial text-3xl sm:text-4xl text-[#1E1D1B] font-light mt-1">
                    {service.name}
                  </h2>
                  <p className="text-sm font-medium text-[#8A8782] tracking-wide mt-1">
                    {service.tagline}
                  </p>
                </div>

                <p className="text-sm text-[#5E5C57] leading-relaxed font-light">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 pt-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#1E1D1B]">Key Craftsmanship Highlights:</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#5E5C57]">
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
                    className="px-6 py-3 rounded-full bg-[#1E1D1B] hover:bg-[#C5A880] text-[#FAF8F5] hover:text-[#1E1D1B] text-xs tracking-luxury uppercase font-semibold transition-all inline-flex items-center gap-2 group"
                  >
                    <span>Request Estimate</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>

                  {service.id === 'curtains' && (
                    <Link
                      to="/curtain-styles"
                      className="text-xs uppercase tracking-luxury text-[#1E1D1B] font-semibold hover:text-[#C5A880] transition-colors py-2"
                    >
                      View 13 Pleat Styles →
                    </Link>
                  )}

                  {service.id === 'blinds' && (
                    <Link
                      to="/roman-blinds"
                      className="text-xs uppercase tracking-luxury text-[#1E1D1B] font-semibold hover:text-[#C5A880] transition-colors py-2"
                    >
                      View 12 Roman Blinds →
                    </Link>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* On-Site Guarantee Callout */}
      <div className="max-w-5xl mx-auto px-6 mt-24">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#ECE9E2] border border-[#D3D0C9] text-center space-y-4">
          <Ruler className="w-8 h-8 text-[#C5A880] mx-auto" />
          <h3 className="font-editorial text-3xl text-[#1E1D1B] font-light">
            On-Site Measuring Anywhere in Tamil Nadu
          </h3>
          <p className="text-sm text-[#5E5C57] max-w-xl mx-auto leading-relaxed font-light">
            Whether you are outfitting a luxury villa on ECR Chennai or an executive office in Coimbatore, our team arrives with physical fabric swatch cases and laser measuring precision.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="px-7 py-3 rounded-full bg-[#1E1D1B] text-white hover:bg-[#C5A880] hover:text-[#1E1D1B] text-xs tracking-luxury uppercase font-semibold transition-all inline-block"
            >
              Book an On-Site Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
