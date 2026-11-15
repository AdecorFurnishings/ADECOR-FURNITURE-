import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeroCurtains } from '../components/home/HeroCurtains';
import { AboutScrollExperience } from '../components/about/AboutScrollExperience';
import { CoreFurnishingsExperience } from '../components/home/CoreFurnishingsExperience';
import { RomanBlindInteractive } from '../components/home/RomanBlindInteractive';
import { SofaRefurbishingSection } from '../components/home/SofaRefurbishingSection';
import { ClientsMarquee } from '../components/home/ClientsMarquee';
import { SpatialGalleryCard } from '../components/gallery/SpatialGalleryCard';
import { SITE_CONTENT } from '../data/content';
import { ADecorLogo, AtelierFrameBox } from '../components/common/ADecorLogo';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      {/* 1. Signature Hero Curtain Reveal (with pointer hover chameleon fabric color shifts & slow cinematic parting) */}
      <HeroCurtains />

      {/* 2. Scroll-Driven Editorial About Section: Exact Narrative & Select Clients */}
      <AboutScrollExperience mode="section" />

      {/* 3. Core Interior Disciplines: Sensory Asymmetric Material Gallery */}
      <CoreFurnishingsExperience />

      {/* 5. Interactive Roman Blind Folding Studio */}
      <RomanBlindInteractive />

      {/* 6. Upholstery Rework & Frame Restoration Section */}
      <SofaRefurbishingSection />

      {/* 7. Curated Gallery with High-Definition Photography */}
      <section className="py-24 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="label-caps text-[#8A8782]">Visual Portfolio</span>
              <h2 className="font-syne text-4xl sm:text-5xl text-[#1E1D1B] font-bold uppercase tracking-tight mt-2">
                Portfolio Works
              </h2>
            </div>
            <Link
              to="/gallery"
              className="text-xs uppercase tracking-luxury text-[#1E1D1B] font-syne font-bold hover:text-[#C5A880] transition-colors"
            >
              View All Works →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
            {SITE_CONTENT.gallery.slice(0, 6).map((item, idx) => (
              <SpatialGalleryCard
                key={item.id}
                item={item}
                index={idx}
                aspectMode="uniform"
                onSelect={() => navigate('/gallery')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 9. Enterprise Clients Marquee */}
      <ClientsMarquee />

      {/* 10. Call to Action Banner */}
      <section className="py-20 bg-[#100F0E] text-[#FAF8F5] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <AtelierFrameBox bottomLabel="A DECOR FURNISHINGS • ANNA NAGAR" variant="dark" showKeystone={false}>
            <div className="text-center space-y-5">
              <div className="flex justify-center">
                <ADecorLogo variant="obsidian" className="h-12 sm:h-14 w-auto" />
              </div>
              <span className="block label-caps text-[#C5A880] text-xs pt-1">
                Start Your Bespoke Interior Project
              </span>
              <h2 className="font-syne text-4xl sm:text-6xl text-white font-bold uppercase tracking-tight">
                Bring Timeless Elegance Home
              </h2>
              <p className="text-sm text-[#D3D0C9] max-w-xl mx-auto font-light leading-relaxed">
                Visit our Anna Nagar location or schedule our team for on-site measuring anywhere in Tamil Nadu.
              </p>
              <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 rounded-full bg-[#C5A880] hover:bg-white text-[#100F0E] font-syne font-bold text-xs tracking-luxury uppercase transition-all shadow-glow-gold hover:scale-105"
                >
                  Book On-Site Consultation
                </Link>
                <a
                  href={`tel:${SITE_CONTENT.brand.phones[0]}`}
                  className="px-8 py-4 rounded-full border border-white/30 hover:border-[#D90B0B] text-white font-syne font-semibold text-xs tracking-luxury uppercase hover:bg-white/10 transition-all"
                >
                  Call {SITE_CONTENT.brand.phones[0]}
                </a>
              </div>
            </div>
          </AtelierFrameBox>
        </div>
      </section>
    </div>
  );
};
