import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Check,
  X,
  Eye,
  MessageCircle,
  Phone,
  ZoomIn,
} from 'lucide-react';

type FlooringCategory = 'all' | 'acoustic' | 'hospitality' | 'turf' | 'commercial';

export interface FlooringArtPiece {
  id: string;
  order: number;
  category: 'acoustic' | 'hospitality' | 'turf' | 'commercial';
  title: string;
  subtitle: string;
  tag: string;
  finish: string;
  keySpec: string;
  composition: string;
  dimensions: string;
  recommendedRoom: string;
  image: string;
  ambientHex: string;
  palette: { name: string; hex: string }[];
  features: string[];
}

const FLOORING_COLLECTIONS: FlooringArtPiece[] = [
  {
    id: 'fl-plush-acoustic',
    order: 1,
    category: 'acoustic',
    title: 'Velvet Plush Acoustic Carpet',
    subtitle: 'High-Tuft Residential Wall-to-Wall Luxury',
    tag: 'Acoustic Carpet',
    finish: 'Cashmere Taupe Plush Cut-Pile',
    keySpec: 'Whisper-Quiet Sound Dampening • NRC 0.80',
    composition: 'ActionBac moisture-sealed cushioned underlay',
    dimensions: 'Custom wall-to-wall room installation',
    recommendedRoom: 'Master Suites, Walk-in Closets & Home Theatres',
    image: '/images/flooring/flooring_plush_acoustic_carpet.jpg',
    ambientHex: '#9E8E82',
    palette: [
      { name: 'Warm Taupe', hex: '#8F8278' },
      { name: 'Cashmere Ecru', hex: '#D2C8BF' },
      { name: 'Earthen Stone', hex: '#635952' },
      { name: 'Soft Pearl Tint', hex: '#EBE5DE' },
    ],
    features: [
      'High-density cut-pile tuft absorbing footsteps and acoustic echo',
      'Anti-microbial and stain-resistant Scotchgard fiber treatment',
      'Seamless perimeter stretch-fit with moisture-barrier underlay',
    ],
  },
  {
    id: 'fl-royal-blue-banquet',
    order: 2,
    category: 'hospitality',
    title: 'Royal Blue Banquet & Hall Carpet',
    subtitle: 'Woven Imperial Fleur-de-lis Crest Motif',
    tag: 'Hospitality Carpet',
    finish: 'Imperial Cobalt with Golden Crest Inlay',
    keySpec: 'Commercial Heavy-Traffic Jacquard Pile',
    composition: 'Commercial jute-composite reinforcement backing',
    dimensions: 'Continuous hall rolls with matched pattern repeats',
    recommendedRoom: 'Banquet Halls, Hotel Lounges & Boardrooms',
    image: '/images/flooring/flooring_royal_blue_banquet_carpet.jpg',
    ambientHex: '#1D3B73',
    palette: [
      { name: 'Imperial Cobalt', hex: '#16356E' },
      { name: 'Gilded Crest Gold', hex: '#CBA052' },
      { name: 'Midnight Deep', hex: '#0B1C3B' },
      { name: 'Alabaster Ivory', hex: '#EAE5D9' },
    ],
    features: [
      'Intricate gold fleur-de-lis motif woven into high-tensile pile',
      'Engineered for heavy footfall in corporate and hotel ballrooms',
      'Colorfast yarn dyed to resist harsh commercial cleaning',
    ],
  },
  {
    id: 'fl-balcony-artificial-turf',
    order: 3,
    category: 'turf',
    title: 'Landscape Balcony Lawn Turf',
    subtitle: '40mm High-Density All-Weather Greenery',
    tag: 'Terrace & Lawn',
    finish: '4-Tone Verdant Spring Green',
    keySpec: 'UV-Stabilized & Rapid Perforated Drainage',
    composition: 'Double PP cloth with perforated latex backing',
    dimensions: '2m & 4m roll spans tailored to balconies',
    recommendedRoom: 'Balconies, Verandahs, Courtyards & Terraces',
    image: '/images/flooring/flooring_balcony_artificial_turf.jpg',
    ambientHex: '#3D8C35',
    palette: [
      { name: 'Verdant Green', hex: '#2F7C28' },
      { name: 'Spring Olive', hex: '#589B3A' },
      { name: 'Root Thatch Tone', hex: '#877B42' },
      { name: 'Sunlit Foliage', hex: '#8FD35A' },
    ],
    features: [
      '40mm plush height with dual curly root-zone thatch',
      'Rapid-drain backing allows rain and washdown water to exit freely',
      'UV-stabilized polyethylene that stays soft barefoot in direct sunlight',
    ],
  },
  {
    id: 'fl-modular-carpet-tiles',
    order: 4,
    category: 'commercial',
    title: 'Modular Charcoal Office Carpet Tiles',
    subtitle: '50x50cm Quarter-Turn Geometric Loop Weave',
    tag: 'Commercial Modular',
    finish: 'Charcoal Heather Linear Basketweave',
    keySpec: 'Heavy-Duty Castor-Resistant Loop Weave',
    composition: 'Dimensional-stability fiberglass reinforced bitumen backing',
    dimensions: '50cm x 50cm modular interlocking squares',
    recommendedRoom: 'Corporate Offices, Conference Suites & Studios',
    image: '/images/flooring/flooring_modular_office_carpet_tile.jpg',
    ambientHex: '#4E5357',
    palette: [
      { name: 'Charcoal Heather', hex: '#44484C' },
      { name: 'Graphite Shadow', hex: '#282B2E' },
      { name: 'Silver Pinstripe', hex: '#8B9197' },
      { name: 'Office Platinum', hex: '#D2D6DA' },
    ],
    features: [
      'Quarter-turned layout creates sophisticated architectural texture',
      'Individual tile replacement without disrupting entire floor',
      'Provides underfloor cable access and castor chair durability',
    ],
  },
];

export const FlooringPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<FlooringCategory>('all');
  const [selectedPiece, setSelectedPiece] = useState<FlooringArtPiece | null>(null);

  const filteredPieces = useMemo(() => {
    if (activeCategory === 'all') return FLOORING_COLLECTIONS;
    return FLOORING_COLLECTIONS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="pt-36 sm:pt-44 pb-28 bg-[#FAF8F5] min-h-screen text-[#1E1D1B]">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAE7E1] text-[#1E1D1B] border border-[#D3D0C9] mb-5">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className="label-caps text-[10px] tracking-luxury">
            Floor Architecture • Acoustic &amp; Luxury Carpets
          </span>
        </div>

        <h1 className="font-syne text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-[1.05]">
          Luxury Flooring Solutions
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-[#5E5C57] font-light leading-relaxed">
          From wall-to-wall acoustic cut-pile carpets and commercial banquet jacquards, to all-weather landscape balcony turf and modular office carpet tiles.
        </p>

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          {[
            { id: 'all', label: 'All Flooring (4)' },
            { id: 'acoustic', label: 'Residential Acoustic' },
            { id: 'hospitality', label: 'Banquet & Hospitality' },
            { id: 'turf', label: 'Balcony Turf' },
            { id: 'commercial', label: 'Modular Office Tiles' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as FlooringCategory)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-luxury uppercase transition-all ${
                activeCategory === tab.id
                  ? 'bg-[#1E1D1B] text-[#FAF8F5] shadow-md scale-105'
                  : 'bg-white border border-[#D3D0C9] text-[#5E5C57] hover:border-[#1E1D1B] hover:text-[#1E1D1B]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Showcase */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {filteredPieces.map((piece) => {
            return (
              <div
                key={piece.id}
                className="group rounded-3xl bg-white border border-[#D3D0C9] hover:border-[#C5A880] shadow-soft-luxury hover:shadow-elevated transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Image Plate */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#ECE9E2]">
                    <img
                      src={piece.image}
                      alt={piece.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

                    {/* Tag Badge */}
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/20 text-[10px] font-syne font-bold uppercase tracking-wider text-[#1E1D1B]">
                      <span>{piece.tag}</span>
                    </div>

                    {/* Inspect Button */}
                    <button
                      onClick={() => setSelectedPiece(piece)}
                      className="absolute top-4 right-4 p-2.5 rounded-full bg-[#1E1D1B]/80 hover:bg-[#C5A880] text-white hover:text-[#1E1D1B] backdrop-blur-md transition-all shadow-md group/btn"
                      aria-label={`Inspect ${piece.title}`}
                    >
                      <ZoomIn className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                    </button>

                    {/* Bottom Plate Info */}
                    <div className="absolute bottom-4 inset-x-4 flex items-end justify-between text-white">
                      <div>
                        <span className="text-[10px] uppercase tracking-luxury text-[#C5A880] block font-semibold">
                          {piece.finish}
                        </span>
                        <p className="font-syne text-xl sm:text-2xl font-bold tracking-tight">
                          {piece.title}
                        </p>
                      </div>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[#FAF8F5]">
                        {piece.recommendedRoom.split(',')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs text-[#5E5C57] leading-relaxed">
                      {piece.subtitle}. Engineered for {piece.recommendedRoom.toLowerCase()} with {piece.keySpec.toLowerCase()}.
                    </p>

                    {/* Spec Highlights */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#EAE7E1] text-[11px]">
                      <div>
                        <span className="text-[#8A8782] block text-[9px] uppercase tracking-wider">Composition</span>
                        <span className="font-medium text-[#1E1D1B] truncate block">{piece.composition}</span>
                      </div>
                      <div>
                        <span className="text-[#8A8782] block text-[9px] uppercase tracking-wider">Installation</span>
                        <span className="font-medium text-[#1E1D1B] truncate block">{piece.dimensions}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-6 pt-0 flex items-center gap-3">
                  <button
                    onClick={() => setSelectedPiece(piece)}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#FAF8F5] hover:bg-[#1E1D1B] border border-[#D3D0C9] hover:border-[#1E1D1B] text-[#1E1D1B] hover:text-white text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>

                  <a
                    href={`https://wa.me/919841134665?text=${encodeURIComponent(
                      `Hello A-Decor, I am interested in ${piece.title} (${piece.tag}) for on-site consultation.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 transition-all flex items-center justify-center"
                    aria-label={`WhatsApp about ${piece.title}`}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* On-Site Measuring Guarantee Banner */}
      <div className="max-w-5xl mx-auto px-6 mt-20">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#141312] text-[#FAF8F5] border border-white/10 shadow-elevated flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="label-caps text-[#C5A880] text-xs">On-Site Flooring &amp; Carpet Service</span>
            <h3 className="font-syne text-2xl sm:text-3xl font-bold uppercase text-white tracking-tight">
              Precise Laser Measurement Across Tamil Nadu
            </h3>
            <p className="text-xs text-[#D3D0C9] max-w-xl font-light leading-relaxed">
              Our specialists bring physical material sample swatches, measure floor sub-bases, evaluate underlay requirements, and provide turn-key installation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-full bg-[#C5A880] hover:bg-white text-[#100F0E] font-syne font-bold text-xs tracking-luxury uppercase transition-all shadow-glow-gold hover:scale-105"
            >
              Book On-Site Visit
            </Link>
            <a
              href="tel:+919841134665"
              className="px-6 py-3.5 rounded-full border border-white/30 hover:border-white text-white font-syne font-semibold text-xs tracking-luxury uppercase hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Call Specialist</span>
            </a>
          </div>
        </div>
      </div>

      {/* High-Definition Portal Modal (Full Unclipped View) */}
      {selectedPiece &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
            onClick={() => setSelectedPiece(null)}
          >
            <div
              className="relative w-full max-w-5xl max-h-[92vh] rounded-3xl bg-[#1E1D1B] border border-white/20 text-[#FAF8F5] shadow-2xl overflow-y-auto flex flex-col lg:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPiece(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-[#D90B0B] text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image Section */}
              <div className="lg:w-3/5 bg-black/40 flex items-center justify-center p-4 sm:p-6 min-h-[300px] lg:min-h-[500px]">
                <img
                  src={selectedPiece.image}
                  alt={selectedPiece.title}
                  className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                />
              </div>

              {/* Modal Specs Section */}
              <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div>
                    <span className="label-caps text-[#C5A880] text-[10px] block">
                      {selectedPiece.tag}
                    </span>
                    <h3 className="font-syne text-2xl sm:text-3xl font-bold uppercase text-white tracking-tight mt-1">
                      {selectedPiece.title}
                    </h3>
                    <p className="text-xs text-[#D3D0C9] mt-1 font-light leading-relaxed">
                      {selectedPiece.subtitle}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-white/10 text-xs">
                    <div>
                      <span className="text-[#8A8782] block text-[10px] uppercase">Finish &amp; Texture</span>
                      <span className="text-white font-medium">{selectedPiece.finish}</span>
                    </div>
                    <div>
                      <span className="text-[#8A8782] block text-[10px] uppercase">Composition</span>
                      <span className="text-white font-medium">{selectedPiece.composition}</span>
                    </div>
                    <div>
                      <span className="text-[#8A8782] block text-[10px] uppercase">Installation Method</span>
                      <span className="text-white font-medium">{selectedPiece.dimensions}</span>
                    </div>
                    <div>
                      <span className="text-[#8A8782] block text-[10px] uppercase">Recommended Space</span>
                      <span className="text-white font-medium">{selectedPiece.recommendedRoom}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <span className="text-[10px] uppercase text-[#8A8782] block mb-2">Key Engineering Features</span>
                    <ul className="space-y-1.5 text-xs text-[#D3D0C9]">
                      {selectedPiece.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <a
                    href={`https://wa.me/919841134665?text=${encodeURIComponent(
                      `Hello A-Decor, I would like to schedule a site consultation for ${selectedPiece.title} (${selectedPiece.tag}).`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-syne font-bold text-xs uppercase tracking-luxury flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Sample Request</span>
                  </a>

                  <Link
                    to="/contact"
                    className="w-full py-3 px-5 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#100F0E] font-syne font-semibold text-xs uppercase tracking-luxury flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Book Measuring Visit</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};
