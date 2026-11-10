import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import { HeroCurtains } from '../components/home/HeroCurtains';
import { CurtainColorChanger } from '../components/home/CurtainColorChanger';
import { RomanBlindInteractive } from '../components/home/RomanBlindInteractive';
import { SofaRefurbishingSection } from '../components/home/SofaRefurbishingSection';
import { ClientsMarquee } from '../components/home/ClientsMarquee';
import { SITE_CONTENT } from '../data/content';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      {/* 1. Signature Hero Curtain Reveal */}
      <HeroCurtains />

      {/* 2. Editorial About Section with Counters & Brand Narrative */}
      <section className="py-24 bg-[#FAF8F5] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Narrative (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE7E1] text-[#1E1D1B] border border-[#D3D0C9]">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="label-caps text-[10px] tracking-luxury">About A-Decor</span>
              </div>

              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#1E1D1B] font-light tracking-tight leading-[1.08]">
                {SITE_CONTENT.about.heroTitle}
              </h2>

              <p className="text-base sm:text-lg text-[#5E5C57] font-light leading-relaxed">
                {SITE_CONTENT.about.leadParagraph}
              </p>

              <p className="text-sm sm:text-base text-[#8A8782] font-light leading-relaxed">
                {SITE_CONTENT.about.bodyParagraph1}
              </p>

              <div className="p-5 rounded-2xl bg-[#ECE9E2]/70 border border-[#D3D0C9] text-xs sm:text-sm text-[#1E1D1B] leading-relaxed">
                <strong className="text-[#C5A880] font-semibold block mb-1">Statewide Consultation & Measuring:</strong>
                {SITE_CONTENT.about.bodyParagraph2}
              </div>

              {/* Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {SITE_CONTENT.about.values.map((v, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white border border-[#D3D0C9] shadow-sm">
                    <p className="font-editorial text-lg text-[#1E1D1B] font-medium">{v.title}</p>
                    <p className="text-xs text-[#8A8782] mt-1 leading-snug">{v.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  to="/services"
                  className="px-7 py-3.5 rounded-full bg-[#1E1D1B] text-[#FAF8F5] hover:bg-[#C5A880] hover:text-[#1E1D1B] text-xs tracking-luxury uppercase font-semibold transition-all inline-flex items-center gap-2 group shadow-md"
                >
                  <span>Explore Full Portfolio</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/contact"
                  className="text-xs tracking-luxury uppercase font-semibold text-[#1E1D1B] hover:text-[#C5A880] transition-colors py-2"
                >
                  Schedule Measuring →
                </Link>
              </div>
            </div>

            {/* Right Side: Editorial Stat Blocks & Master Bedroom Imagery (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-3xl overflow-hidden border border-[#D3D0C9] shadow-elevated group">
                <img
                  src="/images/hero/bedroom_chandelier.jpg"
                  alt="A-Decor Luxury Interior Bedroom Nandanam"
                  className="w-full aspect-[4/4.5] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="label-caps text-[#C5A880] text-[10px]">Residential Master Suite</span>
                  <p className="font-editorial text-xl sm:text-2xl mt-1 font-light">
                    Geometric Headboard & Crystal Chandelier Drapery
                  </p>
                </div>
              </div>

              {/* Key Stats Counter Grid */}
              <div className="grid grid-cols-2 gap-4">
                {SITE_CONTENT.about.stats.map((s, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white border border-[#D3D0C9] shadow-sm">
                    <p className="font-editorial text-3xl sm:text-4xl font-light text-[#1E1D1B]">{s.value}</p>
                    <p className="label-caps text-[10px] text-[#C5A880] mt-1">{s.label}</p>
                    <p className="text-[11px] text-[#8A8782] mt-0.5">{s.sub}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Comprehensive Services Grid */}
      <section className="py-24 bg-[#ECE9E2]/40 border-t border-[#D3D0C9]/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="label-caps text-[#8A8782]">Tailored Interior Solutions</span>
            <h2 className="font-editorial text-4xl sm:text-5xl text-[#1E1D1B] font-light mt-2">
              Our Interior Craft & Services
            </h2>
            <p className="text-[#5E5C57] text-base mt-3 font-light">
              Covering all facets of high-end furnishing from bespoke drapes to heirloom furniture restoration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SITE_CONTENT.services.map((service) => (
              <div
                key={service.id}
                className="group rounded-3xl bg-white overflow-hidden border border-[#D3D0C9] hover:border-[#C5A880] transition-all duration-300 shadow-soft-luxury hover:shadow-elevated flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-[16/11] overflow-hidden bg-[#EAE7E1]">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {service.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#1E1D1B]/80 backdrop-blur-md text-[#C5A880] text-[10px] font-semibold tracking-wider uppercase border border-white/10">
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-7 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-editorial text-2xl text-[#1E1D1B] group-hover:text-[#C5A880] transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-xs text-[#C5A880] font-medium tracking-wide mt-1">
                      {service.tagline}
                    </p>
                    <p className="text-xs text-[#5E5C57] mt-3 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features list */}
                    <ul className="mt-4 space-y-1.5 text-[11px] text-[#8A8782]">
                      {service.features.slice(0, 3).map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-[#C5A880] shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#D3D0C9]/60 flex items-center justify-between">
                    <Link
                      to={`/services#${service.id}`}
                      className="text-xs uppercase tracking-luxury text-[#1E1D1B] font-semibold hover:text-[#C5A880] transition-colors flex items-center gap-1.5"
                    >
                      <span>View Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive Drapery Color & Pleat Studio */}
      <CurtainColorChanger />

      {/* 5. Interactive Roman Blind Folding Studio */}
      <RomanBlindInteractive />

      {/* 6. Sofa Refurbishing & Re-Upholstery Section */}
      <SofaRefurbishingSection />

      {/* 7. Featured Gallery Teaser */}
      <section className="py-24 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="label-caps text-[#8A8782]">Curated Installations</span>
              <h2 className="font-editorial text-4xl sm:text-5xl text-[#1E1D1B] font-light mt-2">
                Gallery of Completed Works
              </h2>
            </div>
            <Link
              to="/gallery"
              className="text-xs uppercase tracking-luxury text-[#1E1D1B] font-semibold hover:text-[#C5A880] transition-colors"
            >
              View All {SITE_CONTENT.gallery.length} Projects →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SITE_CONTENT.gallery.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden border border-[#D3D0C9] bg-white shadow-soft-luxury"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#ECE9E2]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-[#C5A880]">
                    {item.categoryLabel}
                  </span>
                  <h4 className="font-editorial text-xl text-[#1E1D1B] font-medium mt-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#8A8782] mt-1">{item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Clients Marquee */}
      <ClientsMarquee />

      {/* 9. Final Call to Action Banner */}
      <section className="py-20 bg-[#1E1D1B] text-[#FAF8F5] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-6">
          <span className="label-caps text-[#C5A880] text-xs">
            Start Your Bespoke Interior Journey
          </span>
          <h2 className="font-editorial text-4xl sm:text-6xl text-white font-light tracking-tight">
            Bring Timeless Elegance To Your Home
          </h2>
          <p className="text-sm sm:text-base text-[#D3D0C9] max-w-2xl mx-auto font-light leading-relaxed">
            Visit our flagship showroom at Old No. 457, New No. 726, Nandanam, Chennai, or book our design team for an on-site measuring consultation anywhere in Tamil Nadu.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-4 rounded-full bg-[#C5A880] text-[#141312] font-semibold text-xs tracking-luxury uppercase hover:bg-white transition-all shadow-glow-gold"
            >
              Book On-Site Consultation
            </Link>
            <a
              href={`tel:${SITE_CONTENT.brand.phones[0]}`}
              className="px-8 py-4 rounded-full border border-white/30 text-white text-xs tracking-luxury uppercase hover:bg-white/10 transition-all"
            >
              Call {SITE_CONTENT.brand.phones[0]}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
