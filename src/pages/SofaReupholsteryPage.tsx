import React, { useState, useMemo, useCallback } from 'react';
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
  ShieldCheck,
  Split,
  Layers,
  Wrench,
  Hammer,
} from 'lucide-react';

type ReworkCategory = 'all' | 'rework' | 'sofas' | 'chairs' | 'sofabeds';

export interface SofaProject {
  id: string;
  order: number;
  category: 'rework' | 'sofas' | 'chairs' | 'sofabeds';
  title: string;
  subtitle: string;
  tag: string;
  finish: string;
  frameSpec: string;
  foamSpec: string;
  fabricType: string;
  dimensions: string;
  image: string;
  beforeImage?: string;
  afterImage?: string;
  compositeImage?: string;
  ambientHex: string;
  palette: { name: string; hex: string }[];
  features: string[];
}

const SOFA_COLLECTIONS: SofaProject[] = [
  // 1. REWORK: CURVED BOUCLE
  {
    id: 'sofa-boucle-rework',
    order: 1,
    category: 'rework',
    title: 'Curved Boucle Lounge Suite',
    subtitle: 'Full hardwood chassis rebuild with seamless cream boucle upholstery',
    tag: 'Before & After Rework',
    finish: 'Textured Cream Italian Boucle',
    frameSpec: 'Solid Hardwood Carcass Reinforcement',
    foamSpec: '45+ Density High-Resilience Comfort Core',
    fabricType: 'Heavyweight Tactile Boucle',
    dimensions: 'Custom 3-Seater (84" W x 38" D)',
    image: '/images/rework/rework_boucle_composite.jpg',
    beforeImage: '/images/rework/rework_boucle_frame_before.jpg',
    afterImage: '/images/rework/rework_boucle_sofa_after.jpg',
    compositeImage: '/images/rework/rework_boucle_composite.jpg',
    ambientHex: '#D9D0C3',
    palette: [
      { name: 'Cream Boucle', hex: '#EDE8E0' },
      { name: 'Warm Walnut', hex: '#523A28' },
      { name: 'Oatmeal Taupe', hex: '#C2B8A8' },
      { name: 'Cast Timber', hex: '#2B2623' },
    ],
    features: [
      'Bare skeletal frame stripped, reinforced, and re-glued',
      'Curved arm profile rebuilt with high-density padding',
      'Solid walnut plinth wing legs hand-polished',
    ],
  },

  // 2. REWORK: ROYAL CHAISE LOUNGE
  {
    id: 'sofa-chaise-rework',
    order: 2,
    category: 'rework',
    title: 'Royal Chesterfield Chaise Lounge',
    subtitle: 'Antique bentwood skeleton restored to diamond-tufted peacock teal velvet',
    tag: 'Heritage Rework',
    finish: 'Peacock Teal Silk Velvet',
    frameSpec: 'Steam-Bent Hardwood Chassis & Joists',
    foamSpec: 'Dual-Layer High-Resilience Foam + Dacron',
    fabricType: 'Stain-Resistant Commercial Velvet',
    dimensions: 'Chaise Longue (72" L x 32" W x 34" H)',
    image: '/images/rework/rework_chaise_composite.jpg',
    beforeImage: '/images/rework/rework_chaise_frame_before.jpg',
    afterImage: '/images/rework/rework_chaise_velvet_after.jpg',
    compositeImage: '/images/rework/rework_chaise_composite.jpg',
    ambientHex: '#14647A',
    palette: [
      { name: 'Peacock Teal', hex: '#166E84' },
      { name: 'Brass Stud Gold', hex: '#CBA052' },
      { name: 'Deep Espresso', hex: '#261B16' },
      { name: 'Soft Seafoam', hex: '#87BCC7' },
    ],
    features: [
      'Hand-tied coil spring base suspension reset',
      'Deep diamond-button tufting on contoured scroll back',
      'Continuous hand-hammered brass nailhead studs',
    ],
  },

  // 3. NEW: TERRACOTTA CHANNEL SOFA
  {
    id: 'sofa-terracotta-channel',
    order: 3,
    category: 'sofas',
    title: 'Terracotta Channel Tuxedo Sofa',
    subtitle: 'Architectural vertical channel-tufted sofa with gold bun feet',
    tag: 'Custom Bespoke Sofa',
    finish: 'Burnt Orange / Terracotta Velvet',
    frameSpec: 'Kiln-Dried Hardwood Internal Frame',
    foamSpec: '40D Multi-Layer Ergonomic Foam',
    fabricType: 'Lustrous Low-Pile Velvet',
    dimensions: 'Custom 3-4 Seater (90" W x 36" D)',
    image: '/images/sofa-rework/sofa_terracotta_channel_velvet.jpg',
    ambientHex: '#C64F1F',
    palette: [
      { name: 'Terracotta', hex: '#C64F1F' },
      { name: 'Polished Brass', hex: '#D4AF37' },
      { name: 'Warm Amber', hex: '#8C3512' },
      { name: 'Ivory Room Tone', hex: '#EBE5DE' },
    ],
    features: [
      'Continuous vertical channel tufting along back and seat',
      'Rolled shelter arm design with brass stud details',
      'Jewelry-grade spun brass bun feet',
    ],
  },

  // 4. NEW: FOREST GREEN CHANNEL SOFA
  {
    id: 'sofa-forest-green-channel',
    order: 4,
    category: 'sofas',
    title: 'Forest Green Channel 3-Seater',
    subtitle: 'Curved crest channel sofa with button-tufted lower apron plinth',
    tag: 'Bespoke Velvet Sofa',
    finish: 'Forest Green Matte Velvet',
    frameSpec: 'Solid Salwood & Commercial Ply Structure',
    foamSpec: '45+ HR Foam with Feather-Blend Topper',
    fabricType: 'Heavy Commercial Velvet',
    dimensions: '3-Seater (82" W x 35" D)',
    image: '/images/sofa-rework/sofa_forest_green_channel.jpg',
    ambientHex: '#2E6654',
    palette: [
      { name: 'Forest Green', hex: '#2E6654' },
      { name: 'Crisp White Legs', hex: '#F2F2F2' },
      { name: 'Deep Pine', hex: '#1C4236' },
      { name: 'Silver Marble Tone', hex: '#C2C0B8' },
    ],
    features: [
      'Contoured curved crest with padded vertical ribs',
      'Button-tufted lower apron base for structural strength',
      'Detachable high-resilience comfort seat cushions',
    ],
  },

  // 5. NEW: ROYAL BLUE BENCH
  {
    id: 'sofa-royal-blue-bench',
    order: 5,
    category: 'chairs',
    title: 'Royal Blue Tufted Velvet Bench',
    subtitle: 'Waffle-tufted bedroom & lounge daybed bench with brass plinth legs',
    tag: 'Lounge Bench',
    finish: 'Royal Sapphire Velvet',
    frameSpec: 'Reinforced Hardwood Platform Chassis',
    foamSpec: 'Ultra-Dense 45D Rebound Cushioning',
    fabricType: 'High-Luster Sapphire Velvet',
    dimensions: 'Bench (66" L x 22" W x 18" H)',
    image: '/images/sofa-rework/bench_royal_blue_velvet.jpg',
    ambientHex: '#1E498A',
    palette: [
      { name: 'Royal Blue', hex: '#1E498A' },
      { name: 'Satin Brass Plinth', hex: '#CBA052' },
      { name: 'Espresso Timber', hex: '#2E2219' },
      { name: 'Oak Flooring Tone', hex: '#BC9368' },
    ],
    features: [
      'Geometric square-tufted plush comfort seat',
      'Subtle rolled bolster ends for ergonomic support',
      'Tapered espresso legs capped with polished brass ferrules',
    ],
  },

  // 6. NEW: RUBY RED WINGBACK CHAIR
  {
    id: 'sofa-ruby-red-wingchair',
    order: 6,
    category: 'chairs',
    title: 'Ruby Red Fluted Wingback Chair',
    subtitle: 'High-back architectural reading armchair with lumbar bolster',
    tag: 'Accent Wingchair',
    finish: 'Deep Ruby Wine Velvet',
    frameSpec: 'Steam-Bent Solid Birch Wing Frame',
    foamSpec: 'Ergonomic Contoured Back Foam & Pocket Coil Seat',
    fabricType: 'Heavy Plush Silk-Feel Velvet',
    dimensions: 'Armchair (34" W x 36" D x 42" H)',
    image: '/images/sofa-rework/wingchair_ruby_red_velvet.jpg',
    ambientHex: '#8C1D2F',
    palette: [
      { name: 'Ruby Wine', hex: '#8C1D2F' },
      { name: 'Natural Oak Leg', hex: '#B58752' },
      { name: 'Deep Crimson', hex: '#5E111F' },
      { name: 'Soft Velvet Sheen', hex: '#C44D62' },
    ],
    features: [
      'High-back flared wing silhouette with vertical channel stitching',
      'Matching upholstered rectangular lumbar support cushion',
      'Splayed natural solid oak tapered legs',
    ],
  },

  // 7. NEW: GREY CONVERTIBLE SOFA BED
  {
    id: 'sofa-grey-convertible-bed',
    order: 7,
    category: 'sofabeds',
    title: 'Charcoal Grey Pull-Out Sofa Bed',
    subtitle: 'Dual-mode space-saving sofa with heavy-duty trundle bed mechanism',
    tag: 'Convertible Sofa Bed',
    finish: 'Woven Heather Grey Texture Fabric',
    frameSpec: 'Steel Trundle Mechanism & Structural Hardwood',
    foamSpec: 'High-Density Dual-Purpose Sleeping Mattress Foam',
    fabricType: 'Anti-Snag Stain-Resistant Textured Weave',
    dimensions: 'Sofa (78" W) / Bed (78" W x 60" D Queen Span)',
    image: '/images/sofa-rework/sofabed_grey_convertible.jpg',
    ambientHex: '#616368',
    palette: [
      { name: 'Heather Grey', hex: '#6B6E74' },
      { name: 'Dark Charcoal', hex: '#37393D' },
      { name: 'Natural Sand', hex: '#D1C7BA' },
      { name: 'Soft Platinum', hex: '#EAEBEF' },
    ],
    features: [
      'Smooth pull-out strap converts sofa into queen-size bed in 3 seconds',
      'Button-tufted mattress surface prevents foam migration',
      'Hidden under-seat storage for pillows and bed linen',
    ],
  },

  // 8. REWORK: EMERALD VELVET SOFA
  {
    id: 'sofa-emerald-rework',
    order: 8,
    category: 'rework',
    title: 'Emerald Velvet Mid-Century Lounge',
    subtitle: 'Vintage teak chassis reset with French-piped emerald silk velvet',
    tag: 'Frame Reset Rework',
    finish: 'Botanical Forest Emerald Velvet',
    frameSpec: 'Solid Burmese Teak Plinth & Legs',
    foamSpec: '45+ HR Foam with Dacron Wrap',
    fabricType: 'Architectural Forest Velvet',
    dimensions: '3-Seater (80" W x 36" D)',
    image: '/images/hd/upholstery_after.jpg',
    beforeImage: '/images/hd/upholstery_before.jpg',
    afterImage: '/images/hd/upholstery_after.jpg',
    compositeImage: '/images/hd/upholstery_after.jpg',
    ambientHex: '#1A4538',
    palette: [
      { name: 'Emerald Velvet', hex: '#1A4538' },
      { name: 'Polished Teak', hex: '#7D4721' },
      { name: 'Warm Cream Wall', hex: '#FAF5ED' },
      { name: 'Deep Forest', hex: '#0F261F' },
    ],
    features: [
      'Full frame stabilization and Pirelli elastic webbing reset',
      'Crisp double-stitched French piping seams on all cushions',
      'Hand-waxed solid teak base frame and tapered cylinder legs',
    ],
  },
];

export const SofaReupholsteryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ReworkCategory>('all');
  const [selectedPiece, setSelectedPiece] = useState<SofaProject | null>(null);
  const [activePaletteIndex, setActivePaletteIndex] = useState<{ [key: string]: number }>({});
  const [showBeforeAfterMode, setShowBeforeAfterMode] = useState<{ [key: string]: 'before' | 'after' }>({});

  const filteredPieces = useMemo(() => {
    if (activeCategory === 'all') return SOFA_COLLECTIONS;
    return SOFA_COLLECTIONS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const countRework = useMemo(() => SOFA_COLLECTIONS.filter((p) => p.category === 'rework').length, []);
  const countSofas = useMemo(() => SOFA_COLLECTIONS.filter((p) => p.category === 'sofas').length, []);
  const countChairs = useMemo(() => SOFA_COLLECTIONS.filter((p) => p.category === 'chairs').length, []);
  const countSofaBeds = useMemo(() => SOFA_COLLECTIONS.filter((p) => p.category === 'sofabeds').length, []);

  const activeColorForPiece = useCallback(
    (piece: SofaProject) => {
      const idx = activePaletteIndex[piece.id] ?? 0;
      return piece.palette[idx] || piece.palette[0];
    },
    [activePaletteIndex],
  );

  const toggleBeforeAfter = (id: string) => {
    setShowBeforeAfterMode((prev) => ({
      ...prev,
      [id]: prev[id] === 'before' ? 'after' : 'before',
    }));
  };

  return (
    <div className="pt-36 sm:pt-44 pb-28 bg-[#FAF8F5] min-h-screen text-[#1E1D1B]">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAE7E1] text-[#1E1D1B] border border-[#D3D0C9] mb-5">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className="label-caps text-[10px] tracking-luxury">
            Frame Restoration • 45+ HR Foam • Bespoke Upholstery
          </span>
        </div>

        <h1 className="font-syne text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-[1.05]">
          Sofa &amp; Re-Upholstery Work
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-[#5E5C57] font-light leading-relaxed">
          From full skeletal hardwood carcass rebuilds and 45+ density foam upgrades, to bespoke fluted velvet sofas, daybed benches, and custom pull-out sofa beds.
        </p>

        {/* Master Craft Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-[#5E5C57]">
          <span className="px-3 py-1 rounded-full bg-white border border-[#D3D0C9] font-medium flex items-center gap-1.5">
            <Hammer className="w-3.5 h-3.5 text-[#C5A880]" />
            Solid Carcass Reset
          </span>
          <span className="px-3 py-1 rounded-full bg-white border border-[#D3D0C9] font-medium flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
            45+ Density HR Foam
          </span>
          <span className="px-3 py-1 rounded-full bg-white border border-[#D3D0C9] font-medium flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5 text-[#C5A880]" />
            Spring &amp; Webbing Reset
          </span>
          <span className="px-3 py-1 rounded-full bg-white border border-[#D3D0C9] font-medium flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
            Anna Nagar Atelier
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {[
            { id: 'all', label: `All Projects (${SOFA_COLLECTIONS.length})` },
            { id: 'rework', label: `Before & After Reworks (${countRework})` },
            { id: 'sofas', label: `Custom Sofas (${countSofas})` },
            { id: 'chairs', label: `Benches & Chairs (${countChairs})` },
            { id: 'sofabeds', label: `Convertible Sofa Beds (${countSofaBeds})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as ReworkCategory)}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredPieces.map((piece) => {
            const currentColor = activeColorForPiece(piece);
            const isRework = piece.category === 'rework' && piece.beforeImage && piece.afterImage;
            const currentMode = showBeforeAfterMode[piece.id] || 'after';
            const displayImage = isRework
              ? currentMode === 'before'
                ? piece.beforeImage!
                : piece.afterImage!
              : piece.image;

            return (
              <div
                key={piece.id}
                className="group rounded-3xl bg-white border border-[#D3D0C9] hover:border-[#C5A880] shadow-soft-luxury hover:shadow-elevated transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Image Plate */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#ECE9E2]">
                    <img
                      src={displayImage}
                      alt={piece.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

                    {/* Tag Badge */}
                    <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/20 text-[10px] font-syne font-bold uppercase tracking-wider text-[#1E1D1B]">
                      <span>{piece.tag}</span>
                    </div>

                    {/* Interactive Before/After Toggle if Rework project */}
                    {isRework && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBeforeAfter(piece.id);
                        }}
                        className="absolute top-3.5 right-14 px-2.5 py-1 rounded-full bg-[#1E1D1B]/85 hover:bg-[#C5A880] text-white hover:text-[#1E1D1B] backdrop-blur-md text-[10px] font-mono tracking-wider uppercase transition-all shadow-md flex items-center gap-1.5"
                      >
                        <Split className="w-3 h-3" />
                        <span>{currentMode === 'before' ? 'Show After' : 'Show Before'}</span>
                      </button>
                    )}

                    {/* Inspect Button */}
                    <button
                      onClick={() => setSelectedPiece(piece)}
                      className="absolute top-3.5 right-3.5 p-2 rounded-full bg-white/90 hover:bg-[#C5A880] text-[#1E1D1B] hover:text-white backdrop-blur-md transition-all shadow-md group/btn"
                      aria-label={`Inspect ${piece.title}`}
                    >
                      <ZoomIn className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                    </button>

                    {/* Bottom Info on Plate */}
                    <div className="absolute bottom-3.5 inset-x-3.5 flex items-end justify-between text-white">
                      <div>
                        <span className="text-[10px] uppercase tracking-luxury text-[#C5A880] block font-semibold">
                          {isRework
                            ? currentMode === 'before'
                              ? 'RAW SKELETAL FRAME'
                              : 'FINISHED UPHOLSTERY'
                            : piece.finish}
                        </span>
                        <p className="font-syne text-lg sm:text-xl font-bold tracking-tight">
                          {piece.title}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs text-[#5E5C57] leading-relaxed">
                      {piece.subtitle}. Built with {piece.frameSpec.toLowerCase()} and {piece.foamSpec.toLowerCase()}.
                    </p>

                    {/* Technical Specs Table */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#EAE7E1] text-[11px]">
                      <div>
                        <span className="text-[#8A8782] block text-[9px] uppercase tracking-wider">Carcass Core</span>
                        <span className="font-medium text-[#1E1D1B] truncate block">{piece.frameSpec}</span>
                      </div>
                      <div>
                        <span className="text-[#8A8782] block text-[9px] uppercase tracking-wider">Cushioning</span>
                        <span className="font-medium text-[#1E1D1B] truncate block">{piece.foamSpec}</span>
                      </div>
                    </div>

                    {/* Color Swatches */}
                    <div className="pt-1">
                      <span className="text-[10px] uppercase tracking-wider text-[#8A8782] block mb-1.5">
                        Fabric Tone: <strong className="text-[#1E1D1B]">{currentColor.name}</strong>
                      </span>
                      <div className="flex items-center gap-2">
                        {piece.palette.map((swatch, idx) => {
                          const isActive = (activePaletteIndex[piece.id] ?? 0) === idx;
                          return (
                            <button
                              key={swatch.name}
                              type="button"
                              onClick={() =>
                                setActivePaletteIndex((prev) => ({ ...prev, [piece.id]: idx }))
                              }
                              className={`w-6 h-6 rounded-full border transition-all ${
                                isActive
                                  ? 'scale-125 border-[#1E1D1B] ring-2 ring-[#C5A880]'
                                  : 'border-black/20 hover:scale-110'
                              }`}
                              style={{ backgroundColor: swatch.hex }}
                              title={swatch.name}
                            />
                          );
                        })}
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
                      `Hello A-Decor, I would like to inquire about ${piece.title} (${piece.tag}). Could you share fabric options and quotation?`,
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

      {/* On-Site Sofa Inspection Callout */}
      <div className="max-w-5xl mx-auto px-6 mt-20">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#141312] text-[#FAF8F5] border border-white/10 shadow-elevated flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="label-caps text-[#C5A880] text-xs">On-Site Frame Assessment</span>
            <h3 className="font-syne text-2xl sm:text-3xl font-bold uppercase text-white tracking-tight">
              Have an Old Sofa? We Restore It Like New
            </h3>
            <p className="text-xs text-[#D3D0C9] max-w-xl font-light leading-relaxed">
              We visit your home in Chennai, inspect timber joinery, check foam sag, and bring genuine fabric swatches. Turnaround in 7–10 days with door-to-door delivery.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-full bg-[#C5A880] hover:bg-white text-[#100F0E] font-syne font-bold text-xs tracking-luxury uppercase transition-all shadow-glow-gold hover:scale-105"
            >
              Book Home Inspection
            </Link>
            <a
              href="tel:+919841134665"
              className="px-6 py-3.5 rounded-full border border-white/30 hover:border-white text-white font-syne font-semibold text-xs tracking-luxury uppercase hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Call Atelier</span>
            </a>
          </div>
        </div>
      </div>

      {/* High-Definition Portal Modal */}
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
                  src={selectedPiece.compositeImage || selectedPiece.image}
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
                      <span className="text-[#8A8782] block text-[10px] uppercase">Fabric &amp; Finish</span>
                      <span className="text-white font-medium">{selectedPiece.finish}</span>
                    </div>
                    <div>
                      <span className="text-[#8A8782] block text-[10px] uppercase">Internal Frame</span>
                      <span className="text-white font-medium">{selectedPiece.frameSpec}</span>
                    </div>
                    <div>
                      <span className="text-[#8A8782] block text-[10px] uppercase">Foam &amp; Suspension</span>
                      <span className="text-white font-medium">{selectedPiece.foamSpec}</span>
                    </div>
                    <div>
                      <span className="text-[#8A8782] block text-[10px] uppercase">Dimensions / Sizing</span>
                      <span className="text-white font-medium">{selectedPiece.dimensions}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <span className="text-[10px] uppercase text-[#8A8782] block mb-2">Craft Highlights</span>
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
                      `Hello A-Decor, I would like to order or get a quote for ${selectedPiece.title} (${selectedPiece.tag}).`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-syne font-bold text-xs uppercase tracking-luxury flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Quote &amp; Fabric Choice</span>
                  </a>

                  <Link
                    to="/contact"
                    className="w-full py-3 px-5 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#100F0E] font-syne font-semibold text-xs uppercase tracking-luxury flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Schedule On-Site Inspection</span>
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
