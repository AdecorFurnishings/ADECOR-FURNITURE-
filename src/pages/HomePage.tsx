import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HeroCurtains } from '../components/home/HeroCurtains';
import { CurtainColorChanger } from '../components/home/CurtainColorChanger';
import { RomanBlindInteractive } from '../components/home/RomanBlindInteractive';
import { SofaRefurbishingSection } from '../components/home/SofaRefurbishingSection';
import { BespokeSoftFurnishingsSection } from '../components/home/BespokeSoftFurnishingsSection';
import { ClientsMarquee } from '../components/home/ClientsMarquee';
import { SITE_CONTENT } from '../data/content';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      {/* 1. Signature Hero Curtain Reveal (with pointer hover chameleon fabric color shifts & slow cinematic parting) */}
      <HeroCurtains />

      {/* 2. Editorial About Section: Short, Crisp, Punchy */}
      <section className="py-24 bg-[#FAF8F5] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Narrative (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE7E1] text-[#1E1D1B] border border-[#D3D0C9]">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="label-caps text-[10px] tracking-luxury">Est. 2004 • Nandanam, Chennai</span>
              </div>

              <h2 className="font-syne text-4xl sm:text-5xl lg:text-6xl text-[#1E1D1B] font-bold tracking-tight uppercase leading-[1.05]">
                {SITE_CONTENT.about.heroTitle}
              </h2>

              <p className="text-base sm:text-lg text-[#5E5C57] font-light leading-relaxed">
                {SITE_CONTENT.about.leadParagraph}
              </p>

              {/* Statewide Guarantee Callout */}
              <div className="p-5 rounded-2xl bg-[#EAE7E1] border border-[#D3D0C9] flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="label-caps text-[#C5A880] text-[10px]">Complimentary On-Site Service</span>
                  <p className="text-xs sm:text-sm text-[#1E1D1B] font-medium">
                    Laser measuring & fabric curation anywhere in Tamil Nadu.
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="whitespace-nowrap px-4 py-2 rounded-full bg-[#1E1D1B] text-white text-[11px] font-syne uppercase tracking-wider hover:bg-[#C5A880] hover:text-[#1E1D1B] transition-colors"
                >
                  Book Visit
                </Link>
              </div>

              {/* Value Pillars */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {SITE_CONTENT.about.values.map((v, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white border border-[#D3D0C9] shadow-sm">
                    <p className="font-syne text-sm font-bold text-[#1E1D1B]">{v.title}</p>
                    <p className="text-[11px] text-[#8A8782] mt-1 leading-snug">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: High-Definition Suite Photo & Counter Blocks (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-3xl overflow-hidden border border-[#D3D0C9] shadow-elevated group aspect-[4/3.8]">
                <img
                  src="/images/hd/headboard_suite.jpg"
                  alt="A-Decor Master Suite Nandanam"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="label-caps text-[#C5A880] text-[10px]">Architectural Master Suite</span>
                  <p className="font-editorial text-2xl mt-0.5 font-light">
                    Geometric Headboard & Ambient Cove Lighting
                  </p>
                </div>
              </div>

              {/* Key Stats Counter Grid */}
              <div className="grid grid-cols-2 gap-3">
                {SITE_CONTENT.about.stats.map((s, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-[#D3D0C9] shadow-sm">
                    <p className="font-syne text-3xl font-bold text-[#1E1D1B]">{s.value}</p>
                    <p className="label-caps text-[9px] text-[#C5A880] mt-1">{s.label}</p>
                    <p className="text-[10px] text-[#8A8782]">{s.sub}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Comprehensive Services Grid with High-Res Photos */}
      <section className="py-24 bg-[#EAE7E1]/50 border-t border-[#D3D0C9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="label-caps text-[#8A8782]">Tailored Interior Solutions</span>
              <h2 className="font-syne text-4xl sm:text-5xl text-[#1E1D1B] font-bold uppercase tracking-tight mt-2">
                Atelier Craft & Services
              </h2>
            </div>
            <Link
              to="/services"
              className="text-xs uppercase tracking-luxury text-[#1E1D1B] font-syne font-bold hover:text-[#C5A880] transition-colors"
            >
              Explore Full Specs →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SITE_CONTENT.services.map((service) => (
              <div
                key={service.id}
                className="group rounded-3xl bg-white overflow-hidden border border-[#D3D0C9] hover:border-[#C5A880] transition-all duration-300 shadow-soft-luxury hover:shadow-elevated flex flex-col justify-between"
              >
                <div>
                  {/* High-Res Photo */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-[#ECE9E2]">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    {service.badge && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#100F0E]/85 backdrop-blur-md text-[#C5A880] text-[10px] font-syne font-semibold tracking-wider uppercase border border-white/10">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <div className="p-6 space-y-2">
                    <h3 className="font-syne text-2xl font-bold uppercase text-[#1E1D1B] group-hover:text-[#C5A880] transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-xs text-[#8A8782] font-medium tracking-wide">
                      {service.tagline}
                    </p>
                    <p className="text-xs text-[#5E5C57] leading-relaxed pt-1 font-light">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-[#D3D0C9]/60 flex items-center justify-between">
                    <Link
                      to={`/services#${service.id}`}
                      className="text-[11px] uppercase tracking-luxury text-[#1E1D1B] font-syne font-bold hover:text-[#C5A880] transition-colors flex items-center gap-1.5"
                    >
                      <span>Explore Service</span>
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

      {/* 7. Nordic & Minimalist Bespoke Soft Furnishings (Inspired by NORDA) */}
      <BespokeSoftFurnishingsSection />

      {/* 8. Curated Gallery with High-Definition Photography */}
      <section className="py-24 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="label-caps text-[#8A8782]">Visual Portfolio</span>
              <h2 className="font-syne text-4xl sm:text-5xl text-[#1E1D1B] font-bold uppercase tracking-tight mt-2">
                Completed Installations
              </h2>
            </div>
            <Link
              to="/gallery"
              className="text-xs uppercase tracking-luxury text-[#1E1D1B] font-syne font-bold hover:text-[#C5A880] transition-colors"
            >
              View All Works →
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
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                </div>
                <div className="p-5">
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-[#C5A880]">
                    {item.categoryLabel}
                  </span>
                  <h4 className="font-syne text-lg font-bold uppercase text-[#1E1D1B] mt-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#8A8782] mt-0.5">{item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Enterprise Clients Marquee */}
      <ClientsMarquee />

      {/* 10. Call to Action Banner */}
      <section className="py-20 bg-[#100F0E] text-[#FAF8F5] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-5">
          <span className="label-caps text-[#C5A880] text-xs">
            Start Your Bespoke Interior Project
          </span>
          <h2 className="font-syne text-4xl sm:text-6xl text-white font-bold uppercase tracking-tight">
            Bring Timeless Elegance Home
          </h2>
          <p className="text-sm text-[#D3D0C9] max-w-xl mx-auto font-light leading-relaxed">
            Visit our Nandanam showroom or schedule our team for on-site measuring anywhere in Tamil Nadu.
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
              className="px-8 py-4 rounded-full border border-white/30 text-white font-syne font-semibold text-xs tracking-luxury uppercase hover:bg-white/10 transition-all"
            >
              Call {SITE_CONTENT.brand.phones[0]}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
