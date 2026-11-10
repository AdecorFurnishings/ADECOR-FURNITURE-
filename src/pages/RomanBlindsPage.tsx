import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight, Zap } from 'lucide-react';
import { RomanBlindInteractive } from '../components/home/RomanBlindInteractive';
import { SITE_CONTENT } from '../data/content';

export const RomanBlindsPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-[#FAF8F5]">
      {/* Page Hero */}
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE7E1] text-[#1E1D1B] border border-[#D3D0C9] mb-4">
          <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className="label-caps text-[10px] tracking-luxury">Roman Blind Shades Catalog</span>
        </div>
        <h1 className="font-editorial text-5xl sm:text-6xl lg:text-7xl text-[#1E1D1B] font-light tracking-tight">
          12 Signature Roman Blind Geometries
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-[#5E5C57] font-light leading-relaxed">
          From the structured simplicity of Flat and Back-Slat to the theatrical romance of Austrian and Shirred Balloon folds. Custom crafted to your exact window reveal in Chennai.
        </p>
      </div>

      {/* Interactive Folding Visualizer */}
      <RomanBlindInteractive />

      {/* Grid of All 12 Styles with Detailed Technical Cards */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
        <div className="border-b border-[#D3D0C9] pb-6 mb-10 flex items-center justify-between">
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#1E1D1B] font-light">
            All 12 Styles In Detail
          </h2>
          <span className="text-xs font-mono text-[#8A8782]">Nandanam Atelier Specs</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SITE_CONTENT.romanBlindStyles.map((style, idx) => (
            <div
              key={style.id}
              className="group rounded-3xl bg-white border border-[#D3D0C9] overflow-hidden shadow-soft-luxury hover:shadow-elevated hover:border-[#C5A880] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-[#ECE9E2]">
                  <img
                    src={style.image}
                    alt={style.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#1E1D1B]/80 backdrop-blur-md text-[#C5A880] text-xs font-medium border border-white/10">
                    {style.stackStyle}
                  </span>
                  <span className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/95 text-[#1E1D1B] flex items-center justify-center text-xs font-semibold shadow-sm">
                    {idx + 1}
                  </span>
                </div>

                {/* Info */}
                <div className="p-6 space-y-3">
                  <h3 className="font-editorial text-2xl text-[#1E1D1B] group-hover:text-[#C5A880] transition-colors">
                    {style.name} Roman Blind
                  </h3>
                  <p className="text-xs text-[#5E5C57] leading-relaxed">
                    {style.description}
                  </p>

                  <div className="pt-3 border-t border-[#D3D0C9]/60 space-y-1.5 text-xs text-[#8A8782]">
                    <p><strong className="text-[#1E1D1B]">Ideal Placement:</strong> {style.bestFor}</p>
                    <p><strong className="text-[#1E1D1B]">Fabric Texture:</strong> {style.fabricRecommendation}</p>
                  </div>
                </div>
              </div>

              {/* Action CTA */}
              <div className="p-6 pt-0">
                <Link
                  to={`/contact?blind=${encodeURIComponent(style.name)}`}
                  className="w-full py-3 px-4 rounded-xl bg-[#FAF8F5] group-hover:bg-[#1E1D1B] border border-[#D3D0C9] group-hover:border-[#1E1D1B] text-[#1E1D1B] group-hover:text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all"
                >
                  <span>Request Quote for {style.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Motorization & Smart Home Callout */}
      <div className="max-w-5xl mx-auto px-6 mt-20">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#1E1D1B] text-[#FAF8F5] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#C5A880]">
              <Zap className="w-5 h-5" />
              <span className="label-caps text-xs">Smart Home Integration</span>
            </div>
            <h3 className="font-editorial text-3xl text-white font-light">
              Automated Motorization by Somfy & Tuya
            </h3>
            <p className="text-xs sm:text-sm text-[#D3D0C9] max-w-lg leading-relaxed font-light">
              Every single Roman blind style can be upgraded with silent tubular motors, remote channel transmitters, and Alexa/Google Home voice control.
            </p>
          </div>

          <Link
            to="/contact?service=motorized-blinds"
            className="px-8 py-4 rounded-full bg-[#C5A880] text-[#141312] font-semibold text-xs tracking-luxury uppercase hover:bg-white transition-all shadow-glow-gold shrink-0"
          >
            Inquire About Motorization
          </Link>
        </div>
      </div>
    </div>
  );
};
