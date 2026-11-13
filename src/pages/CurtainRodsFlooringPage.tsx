import React, { useState, useMemo, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Layers,
  Check,
  X,
  Eye,
  Compass,
  ArrowRight,
  MessageCircle,
  Phone,
  ZoomIn,
} from 'lucide-react';
import { SITE_CONTENT } from '../data/content';

type FilterCategory = 'all' | 'flooring' | 'rods';

interface HardwareArtPiece {
  id: string;
  order: number;
  category: 'flooring' | 'rods';
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

const HARDWARE_COLLECTIONS: HardwareArtPiece[] = [
  // ==========================================
  // FIRST 4: USER FLOORING IMAGES (1 - 4)
  // ==========================================
  {
    id: 'fl-plush-acoustic',
    order: 1,
    category: 'flooring',
    title: 'Velvet Plush Acoustic Carpet',
    subtitle: 'High-Tuft Residential Wall-to-Wall Luxury',
    tag: 'Acoustic Carpet',
    finish: 'Cashmere Taupe Plush Cut-Pile',
    keySpec: 'Whisper-Quiet Sound Dampening',
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
      'High-density cut-pile tuft absorbing footsteps and echo',
      'Anti-microbial and stain-resistant Scotchgard fiber treatment',
      'Seamless perimeter stretch-fit with moisture-barrier underlay',
    ],
  },
  {
    id: 'fl-royal-blue-banquet',
    order: 2,
    category: 'flooring',
    title: 'Royal Blue Banquet & Hall Carpet',
    subtitle: 'Woven Imperial Fleur-de-lis Crest Motif',
    tag: 'Hospitality Carpet',
    finish: 'Imperial Cobalt with Golden Crest Inlay',
    keySpec: 'Commercial Heavy-Traffic Jacquard',
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
    category: 'flooring',
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
    category: 'flooring',
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

  // ==========================================
  // NEXT 5: CURTAIN RODS & TRACKS (5 - 9)
  // ==========================================
  {
    id: 'rod-noble-28mm',
    order: 5,
    category: 'rods',
    title: 'Noble C/G 28mm Architectural Rods',
    subtitle: 'Powder-Coated Aluminum with Gold Accents',
    tag: '28mm Aluminum Rod',
    finish: 'Brown, Maroon, Ivory, Black, Beige & Rust with Gold',
    keySpec: '28mm Diameter • Scratch-Resistant Finish',
    composition: 'Heavy-gauge extruded aluminum with SS/ABS accessories',
    dimensions: 'Custom cut-to-length up to 20 feet seamless',
    recommendedRoom: 'Living Rooms, Master Bedrooms & Double-Height Halls',
    image: '/images/curtain-rods/rod_noble_28mm_aluminum.jpg',
    ambientHex: '#B2824D',
    palette: [
      { name: 'Noble Brass Gold', hex: '#D4AF37' },
      { name: 'Espresso Brown', hex: '#4A2C1D' },
      { name: 'Imperial Maroon', hex: '#781822' },
      { name: 'Ivory Cream', hex: '#F3EEDD' },
    ],
    features: [
      '7 luxury designer finishes with matching Ham & Taj finials',
      'Silent glide rings with inner nylon buffer for smooth silent pull',
      'Heavy-load wall and ceiling brackets supporting layered blackout drapes',
    ],
  },
  {
    id: 'rod-style-copper-22mm',
    order: 6,
    category: 'rods',
    title: 'Style Copper 22mm Electro-Plated Rods',
    subtitle: 'Artisanal Stainless Steel with Copper Lustre',
    tag: '22mm Copper SS',
    finish: 'Electro-Plated Polished & Brushed Copper',
    keySpec: '8 Sculptural Finials (Crest, Crown, Wave, Shell)',
    composition: 'Stainless steel core with electro-plated copper sheen',
    dimensions: 'Precision customized to window frame width',
    recommendedRoom: 'Heritage Villas, Dining Salons & Neoclassical Lounges',
    image: '/images/curtain-rods/rod_style_copper_22mm.jpg',
    ambientHex: '#B87333',
    palette: [
      { name: 'Polished Copper', hex: '#B87333' },
      { name: 'Antique Bronze Tone', hex: '#7D4721' },
      { name: 'Rose Metallic Sheen', hex: '#D6895C' },
      { name: 'Warm Pewter Accent', hex: '#3B2F2A' },
    ],
    features: [
      '8 hand-sculpted finial designs including Texa, Globe, Wave & Shell',
      'Corrosion-resistant stainless steel core engineered for Chennai coastal climate',
      'High-luster electroplated coating that does not chip or peel over time',
    ],
  },
  {
    id: 'rod-ferro-rust-22mm',
    order: 7,
    category: 'rods',
    title: 'Ferro Rust 22mm Wrought Iron Rods',
    subtitle: 'Hand-Forged Metallic Texture & Botanical Finials',
    tag: '22mm Wrought Iron',
    finish: 'Rust Silver, Rust Gold & Rust Copper',
    keySpec: 'Botanical Leaf, Star, Spear & Bow Finials',
    composition: 'High-strength solid iron core with powder-baked coating',
    dimensions: 'Custom single & double-pole brackets available',
    recommendedRoom: 'Traditional Indian, Tuscan & Rustic Luxury Interiors',
    image: '/images/curtain-rods/rod_ferro_rust_22mm.jpg',
    ambientHex: '#8C482B',
    palette: [
      { name: 'Rust Ochre', hex: '#8C482B' },
      { name: 'Antiqued Gilt', hex: '#C29845' },
      { name: 'Oxidized Silver Tint', hex: '#8E9194' },
      { name: 'Iron Charcoal', hex: '#262423' },
    ],
    features: [
      'Authentic rustic hand-patinated texture with fleur and leaf crests',
      'Solid heavy-iron rigidity eliminating pole sag over wide window spans',
      'Available in single and dual drapery bracket configurations',
    ],
  },
  {
    id: 'rod-jumbo-track-architectural',
    order: 8,
    category: 'rods',
    title: 'Jumbo Track Architectural Extrusions',
    subtitle: 'Heavy-Duty Concealed Ripple-Fold Track Systems',
    tag: 'Architectural Track',
    finish: 'Ivory, Gold, Rose Gold, Champagne, Black & Ferro Silver',
    keySpec: 'Silent Ball-Bearing Wheeled Runners',
    composition: 'Industrial-grade extruded aluminum track profile',
    dimensions: 'Continuous spans with seamless track connectors',
    recommendedRoom: 'Ceiling Pelmets, Floor-to-Ceiling Ripple Folds & Offices',
    image: '/images/curtain-rods/rod_jumbo_track_architectural.jpg',
    ambientHex: '#C5A880',
    palette: [
      { name: 'Champagne Gold', hex: '#C8A56E' },
      { name: 'Rose Gold Hue', hex: '#C98F7A' },
      { name: 'Architectural Matte Black', hex: '#1E1E1E' },
      { name: 'Pearl Ivory White', hex: '#F0ECE4' },
    ],
    features: [
      '8 designer metallic track profiles for visible or recessed ceiling mounting',
      'Precision ball-bearing wheeled runners ensuring whisper-quiet drapery glide',
      'Supports ultra-heavy lined velvet curtains without friction or catching',
    ],
  },
  {
    id: 'rod-regular-28mm-anodized',
    order: 9,
    category: 'rods',
    title: 'Regular 28mm Anodized Aluminum Rods',
    subtitle: 'Fluted Architectural Modern Minimalist Poles',
    tag: '28mm Anodized',
    finish: 'Silver, Copper & Gold Anodized Lustre',
    keySpec: 'Fluted Linear Profile with Taj & Ham Finials',
    composition: 'Anodized hardened aircraft-grade aluminum alloy',
    dimensions: 'Cut-to-size with matched wall & center supports',
    recommendedRoom: 'Contemporary Apartments, Eyelet Curtains & Bedrooms',
    image: '/images/curtain-rods/rod_regular_28mm_anodized.jpg',
    ambientHex: '#D4AF37',
    palette: [
      { name: 'Anodized Gold', hex: '#D4AF37' },
      { name: 'Polished Silver', hex: '#CCCCCC' },
      { name: 'Warm Copper Bronze', hex: '#A85F3B' },
      { name: 'Graphite Shadow', hex: '#2E2D2B' },
    ],
    features: [
      'Linear fluted aesthetic extrusion giving modern architectural refinement',
      'Electrolytic anodized finish will never tarnish, oxidize or fade',
      'Interchangeable finial modular system (Round, Taj, and Ham shapes)',
    ],
  },

  // ==========================================
  // ITEM 10: EUROPEAN OAK HERRINGBONE (FLOORING)
  // ==========================================
  {
    id: 'fl-european-oak',
    order: 10,
    category: 'flooring',
    title: 'European Oak Herringbone Parquet',
    subtitle: 'Triple-Ply Engineered Hardwood on Silent Cork',
    tag: 'Hardwood Parquet',
    finish: 'Natural Matte UV Oiled European Oak',
    keySpec: 'Herringbone & Chevron Acoustic System',
    composition: 'Hardwood wear layer on cross-ply birch with cork base',
    dimensions: 'Precision tongue-and-groove interlocking blocks',
    recommendedRoom: 'Penthouses, Living Salons, Dining Rooms & Libraries',
    image: '/images/core/flooring.jpg',
    ambientHex: '#BD9A6E',
    palette: [
      { name: 'Natural Honey Oak', hex: '#BD9A6E' },
      { name: 'Smoked Amber Grain', hex: '#7A5B3B' },
      { name: 'Pale Cork Tone', hex: '#DECFB8' },
      { name: 'Dark Knot Shadow', hex: '#3A271B' },
    ],
    features: [
      'Authentic European white oak wear layer with brushed natural grain',
      'Integrated acoustic cork underlayment eliminates footstep resonance',
      'Engineered multi-ply core prevents expansion during Chennai monsoons',
    ],
  },
];

export const CurtainRodsFlooringPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [selectedPiece, setSelectedPiece] = useState<HardwareArtPiece | null>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // Filter collections
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return HARDWARE_COLLECTIONS;
    return HARDWARE_COLLECTIONS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const countFlooring = useMemo(() => HARDWARE_COLLECTIONS.filter((i) => i.category === 'flooring').length, []);
  const countRods = useMemo(() => HARDWARE_COLLECTIONS.filter((i) => i.category === 'rods').length, []);

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#11100F] text-[#FAF8F5] pt-24 pb-20 selection:bg-[#C5A880]/30 selection:text-white relative overflow-hidden">
      {/* Background subtle noise & soft radial glow */}
      <div
        className="pointer-events-none fixed inset-0 opacity-40 -z-10"
        style={{
          background:
            'radial-gradient(circle at 50% 15%, rgba(197, 168, 128, 0.08) 0%, transparent 70%), radial-gradient(circle at 80% 80%, rgba(20, 19, 18, 0.8) 0%, #11100F 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* 1. HERO HEADER: PRO-DESIGNER MINIMAL, CLEAN & CRISP */}
        {/* ========================================================= */}
        <section className="pt-6 sm:pt-10 pb-6 text-center relative max-w-4xl mx-auto">
          {/* Atelier Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C5A880]/30 bg-[#1E1D1B]/80 text-[#C5A880] text-[11px] font-mono tracking-widest uppercase mb-5 backdrop-blur-sm shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Atelier Hardware &amp; Foundation Surfaces • Anna Nagar, Chennai</span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-[#FAF8F5] tracking-tight leading-[1.1] mb-4">
            Curtain Rods <br className="hidden sm:inline" />
            <span className="italic font-light text-[#C5A880]">&amp; Luxury Flooring</span>
          </h1>

          <p className="text-sm sm:text-base text-[#D3D0C9] max-w-2xl mx-auto font-light leading-relaxed">
            Architectural drapery hardware and high-comfort foundation flooring. From heavy-duty extruded silent tracks
            and electroplated copper poles to wall-to-wall acoustic carpeting and modular corporate tiles.
          </p>
        </section>

        {/* ========================================================= */}
        {/* 2. FILTER TABS: SMOOTH, RESPONSIVE, CRISP */}
        {/* ========================================================= */}
        <section className="py-6 flex items-center justify-between flex-wrap gap-4 border-b border-white/10 mb-8">
          <div className="flex items-center gap-2 p-1 rounded-2xl bg-[#1A1918] border border-white/10">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-medium transition-all ${
                activeCategory === 'all'
                  ? 'bg-[#C5A880] text-[#141312] font-semibold shadow-md'
                  : 'text-[#FAF8F5]/70 hover:text-white'
              }`}
            >
              All Hardware &amp; Surfaces ({HARDWARE_COLLECTIONS.length})
            </button>

            <button
              onClick={() => setActiveCategory('flooring')}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-medium transition-all flex items-center gap-1.5 ${
                activeCategory === 'flooring'
                  ? 'bg-[#C5A880] text-[#141312] font-semibold shadow-md'
                  : 'text-[#FAF8F5]/70 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Flooring &amp; Carpets ({countFlooring})</span>
            </button>

            <button
              onClick={() => setActiveCategory('rods')}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-medium transition-all flex items-center gap-1.5 ${
                activeCategory === 'rods'
                  ? 'bg-[#C5A880] text-[#141312] font-semibold shadow-md'
                  : 'text-[#FAF8F5]/70 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Curtain Rods &amp; Tracks ({countRods})</span>
            </button>
          </div>

          <div className="text-xs font-mono text-[#8A8782] hidden md:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
            <span>First 4 Flooring Works • Next 5 Architectural Rods</span>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. SHOWCASE GRID: PRO-DESIGNER, CRISP CAPTIONS, INTERACTIVE */}
        {/* ========================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((piece) => (
            <HardwareCard
              key={piece.id}
              piece={piece}
              onInspect={() => setSelectedPiece(piece)}
            />
          ))}
        </section>

        {/* ========================================================= */}
        {/* 4. RESIDENTIAL & COMMERCIAL CONSULTATION CALLOUT */}
        {/* ========================================================= */}
        <section className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#1C1B19] via-[#161514] to-[#1C1B19] border border-[#C5A880]/30 relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880] block mb-2">
              On-Site Hardware &amp; Flooring Presentation
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl text-white mb-3">
              Inspect Rod Profiles &amp; Carpet Swatches at Your Site
            </h3>
            <p className="text-xs sm:text-sm text-[#D3D0C9] mb-6 leading-relaxed">
              Every ceiling recess, pelmet box, and window arch requires precise hardware specification. Our master installers carry sample rod cross-sections, finial specimens, and carpet tuft swatches directly to your residence or commercial project across Chennai.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/919841134665?text=${encodeURIComponent(
                  'Hello A-Decor, I would like to schedule an on-site consultation for Curtain Rods and Flooring in Chennai.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full bg-[#25D366] text-white hover:bg-[#20ba59] font-medium text-xs tracking-wider uppercase inline-flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Book On-Site Hardware Visit</span>
              </a>

              <a
                href={`tel:${SITE_CONTENT.brand.phones[0]}`}
                className="px-5 py-3 rounded-full border border-white/20 text-white hover:border-[#C5A880] hover:text-[#C5A880] font-medium text-xs tracking-wider uppercase inline-flex items-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C5A880]" />
                <span>Call {SITE_CONTENT.brand.phones[0]}</span>
              </a>

              <Link
                to="/contact"
                className="px-5 py-3 rounded-full bg-[#C5A880] text-[#141312] hover:bg-white font-semibold text-xs tracking-wider uppercase inline-flex items-center gap-1.5 transition-colors shadow-glow-gold"
              >
                <span>Full Atelier Contact</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* ========================================================= */}
      {/* 5. FULLSCREEN SENSORY INSPECTOR MODAL */}
      {/* ========================================================= */}
      {selectedPiece && (
        <HardwareModal
          piece={selectedPiece}
          copiedHex={copiedHex}
          onCopyHex={handleCopyHex}
          onClose={() => setSelectedPiece(null)}
        />
      )}
    </div>
  );
};

// =========================================================================
// SUBCOMPONENT: HARDWARE ART PIECE CARD WITH SPECULAR SHEEN
// =========================================================================
interface HardwareCardProps {
  piece: HardwareArtPiece;
  onInspect: () => void;
}

const HardwareCard: React.FC<HardwareCardProps> = ({ piece, onInspect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [sheenPos, setSheenPos] = useState<{ x: number; y: number; opacity: number }>({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSheenPos({ x, y, opacity: 1 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSheenPos((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onInspect}
      className="group relative rounded-3xl bg-[#161514] border border-white/10 hover:border-[#C5A880]/70 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col shadow-xl hover:shadow-2xl hover:-translate-y-1"
    >
      {/* Specular light sheen following cursor */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        style={{
          opacity: sheenPos.opacity,
          background: `radial-gradient(circle 280px at ${sheenPos.x}% ${sheenPos.y}%, rgba(255, 255, 255, 0.18), transparent 70%)`,
        }}
      />

      {/* Media Frame */}
      <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-[#0A0909]">
        <img
          src={piece.image}
          alt={piece.title}
          loading="lazy"
          className="w-full h-full object-cover sm:object-contain bg-[#0D0C0B] transition-all duration-700 ease-out group-hover:scale-105"
        />

        {/* Ambient Tone Bottom Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#161514] via-[#161514]/20 to-transparent pointer-events-none" />

        {/* Top Floating Badges */}
        <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-10 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-mono tracking-widest text-[#C5A880] border border-white/10">
            {String(piece.order).padStart(2, '0')} / {HARDWARE_COLLECTIONS.length}
          </span>

          <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-mono tracking-wider uppercase text-white/90 border border-white/10">
            {piece.tag}
          </span>
        </div>

        {/* Hover Center Inspect Pill */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
          <span className="px-4 py-2 rounded-full bg-[#141312]/90 backdrop-blur-md border border-[#C5A880] text-[#C5A880] text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 shadow-2xl">
            <Eye className="w-3.5 h-3.5" />
            <span>Inspect Finish</span>
          </span>
        </div>
      </div>

      {/* Card Body - Crisp Pro-Designer Typography */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
              {piece.category === 'flooring' ? 'Flooring & Carpet' : 'Curtain Hardware'}
            </span>
            <span className="text-[10px] font-mono text-[#8A8782]">{piece.keySpec}</span>
          </div>

          <h3 className="font-editorial text-xl sm:text-2xl text-white tracking-tight group-hover:text-[#C5A880] transition-colors">
            {piece.title}
          </h3>

          <p className="text-xs text-[#D3D0C9] mt-1 font-light line-clamp-1">{piece.subtitle}</p>
        </div>

        {/* Crisp Specs Bar */}
        <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-[11px]">
          <span className="text-[#8A8782] truncate max-w-[65%]">{piece.finish}</span>
          <span className="font-mono text-[#C5A880] uppercase tracking-wider text-[10px] flex items-center gap-1">
            <span>Details</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// SUBCOMPONENT: FULLSCREEN LUXURY INSPECTOR MODAL
// =========================================================================
interface HardwareModalProps {
  piece: HardwareArtPiece;
  copiedHex: string | null;
  onCopyHex: (hex: string) => void;
  onClose: () => void;
}

const HardwareModal: React.FC<HardwareModalProps> = ({
  piece,
  copiedHex,
  onCopyHex,
  onClose,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoomLevel === 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const toggleZoom = () => {
    setZoomLevel((prev) => (prev === 1 ? 2.2 : 1));
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/95 backdrop-blur-2xl animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#141312] border border-[#C5A880]/40 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row text-[#FAF8F5] my-auto h-[92vh] max-h-[760px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-10 h-10 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white hover:bg-[#C5A880] hover:text-[#141312] hover:border-[#C5A880] flex items-center justify-center transition-all shadow-xl"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Pro Exhibition Image Stage */}
        <div className="w-full md:w-3/5 lg:w-2/3 relative bg-[#0B0A0A] flex flex-col justify-between overflow-hidden h-[48vh] md:h-full shrink-0 border-b md:border-b-0 md:border-r border-white/10">
          {/* Ambient blurred backdrop so there are zero harsh black voids */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 blur-3xl scale-125 pointer-events-none"
            style={{ backgroundImage: `url(${piece.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A0A] via-transparent to-[#0B0A0A]/70 pointer-events-none" />

          {/* Interactive Zoomable Image Stage */}
          <div
            className="relative flex-1 w-full h-full overflow-hidden cursor-zoom-in flex items-center justify-center p-3 sm:p-5 lg:p-7"
            onClick={toggleZoom}
            onMouseMove={handleImageMouseMove}
          >
            <img
              src={piece.image}
              alt={piece.title}
              className="relative z-10 max-w-full max-h-full w-auto h-auto object-contain rounded-xl shadow-2xl border border-white/10 transition-transform duration-200"
              style={{
                transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                transform: zoomLevel > 1 ? `scale(${zoomLevel})` : 'scale(1)',
              }}
            />

            {/* Zoom helper label */}
            <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
              <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono text-[#C5A880] border border-white/15 flex items-center gap-1.5 shadow-md">
                <ZoomIn className="w-3 h-3" />
                <span>{zoomLevel > 1 ? 'Click to Reset' : 'Zoom 2.2x'}</span>
              </span>
            </div>
          </div>

          {/* Bottom Info Bar inside modal */}
          <div className="relative z-20 px-4 py-2 bg-[#141312]/95 backdrop-blur-md border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
            <span className="text-[#A5A19B] uppercase tracking-wider">
              {piece.category === 'flooring' ? 'Flooring & Acoustic Foundation' : 'Architectural Curtain Hardware'}
            </span>
            <span className="text-[#C5A880] tracking-wider">
              A-Decor Atelier
            </span>
          </div>
        </div>

        {/* Right Column: Pro-Designer Specifications & Inquiries */}
        <div className="w-full md:w-2/5 lg:w-1/3 p-5 sm:p-6 overflow-y-auto flex flex-col justify-between flex-1 md:h-full bg-[#141312]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#C5A880]/15 text-[#C5A880] text-[10px] font-mono uppercase tracking-widest border border-[#C5A880]/30">
                Piece #{String(piece.order).padStart(2, '0')}
              </span>
              <span className="text-xs font-mono text-[#8A8782] uppercase">{piece.tag}</span>
            </div>

            <h2 className="font-editorial text-2xl sm:text-3xl text-white tracking-tight leading-snug">
              {piece.title}
            </h2>

            <p className="text-xs sm:text-sm text-[#D3D0C9] mt-1 font-light">{piece.subtitle}</p>

            {/* Extracted Swatch Color Palette */}
            <div className="mt-5 p-3.5 rounded-2xl bg-[#1A1918] border border-white/5">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#C5A880] mb-2.5">
                <span>Material Tone Palette</span>
                <span>Click to Copy Hex</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {piece.palette.map((swatch) => (
                  <button
                    key={swatch.hex}
                    onClick={() => onCopyHex(swatch.hex)}
                    className="group/swatch text-left p-1 rounded-xl hover:bg-white/5 transition-colors relative"
                    title={`Copy ${swatch.name} (${swatch.hex})`}
                  >
                    <div
                      className="w-full h-8 rounded-lg border border-white/20 shadow-sm relative overflow-hidden"
                      style={{ backgroundColor: swatch.hex }}
                    >
                      {copiedHex === swatch.hex && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-[#C5A880]" />
                        </div>
                      )}
                    </div>
                    <p className="text-[10px] font-mono text-[#8A8782] truncate mt-1">{swatch.hex}</p>
                    <p className="text-[9px] text-white/70 truncate">{swatch.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Specs Grid */}
            <div className="mt-5 space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-[#8A8782]">Finish &amp; Texture</span>
                <span className="font-medium text-white text-right max-w-[60%]">{piece.finish}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-[#8A8782]">Core Key Spec</span>
                <span className="font-medium text-[#C5A880] text-right">{piece.keySpec}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-[#8A8782]">Composition</span>
                <span className="font-medium text-white text-right max-w-[60%]">{piece.composition}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-[#8A8782]">Best Suited For</span>
                <span className="font-medium text-white text-right max-w-[60%]">{piece.recommendedRoom}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-[#8A8782]">Dimensions &amp; Spans</span>
                <span className="font-medium text-white text-right">{piece.dimensions}</span>
              </div>
            </div>

            {/* Features bullet list */}
            <div className="mt-4">
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#8A8782] mb-1.5">Key Highlights</p>
              <ul className="space-y-1">
                {piece.features.map((feat, i) => (
                  <li key={i} className="text-xs text-[#D3D0C9] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
            <a
              href={`https://wa.me/919841134665?text=${encodeURIComponent(
                `Hello A-Decor, I would like to inquire about "${piece.title}" (${
                  piece.category === 'flooring' ? 'Flooring & Carpet' : 'Curtain Rod & Hardware'
                }). Could we schedule an on-site sample presentation in Chennai?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire This Piece via WhatsApp</span>
            </a>

            <div className="flex gap-2">
              <a
                href={`tel:${SITE_CONTENT.brand.phones[0]}`}
                className="flex-1 py-2.5 px-3 rounded-full border border-white/20 text-[#D3D0C9] hover:border-[#C5A880] hover:text-[#C5A880] text-[11px] font-medium tracking-wider uppercase text-center transition-colors flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Call Atelier</span>
              </a>

              <Link
                to="/contact"
                onClick={onClose}
                className="flex-1 py-2.5 px-3 rounded-full bg-[#C5A880] hover:bg-white text-[#141312] text-[11px] font-semibold tracking-wider uppercase text-center transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Book Site Visit</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
