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
  Layers,
  Wrench,
  PackageCheck,
  Box,
  Sliders,
  FileText,
} from 'lucide-react';

type BedCategory = 'all' | 'storage' | 'tufted' | 'channel' | 'plaid';
type ViewMode = 'bed' | 'poster' | 'swatches';

export interface MattressSuite {
  id: string;
  order: number;
  category: ('storage' | 'tufted' | 'channel' | 'plaid')[];
  title: string;
  badge: string;
  subtitle: string;
  headboardStyle: string;
  frameSpec: string;
  mattressPairing: string;
  foamSpec: string;
  storageOption: string;
  legs: string;
  bedOnlyImage: string;
  posterImage: string;
  swatches: {
    title: string;
    image: string;
  }[];
  palette: { name: string; hex: string }[];
  features: string[];
}

const MATTRESS_SUITES: MattressSuite[] = [
  // 1. TIARA STORAGE (Cognac Leatherette)
  {
    id: 'suite-tiara-storage',
    order: 1,
    category: ['storage', 'tufted'],
    title: 'Tiara Leatherette Mattress',
    badge: 'Dual Storage Drawers',
    subtitle: 'High-wingback deep button-tufted cognac leatherette with dual-side slide-out storage drawers',
    headboardStyle: 'High-Quality Hand-Tufted Leatherite Wingback',
    frameSpec: 'Original Kiln-Dried Hardwood (Termite Resistant)',
    mattressPairing: 'Aerodream Energy Booster Dual-Tone Mattress',
    foamSpec: 'High-Density 45+ HR Foam with Gold-Binding Quilt',
    storageOption: 'Double-Sized Smooth-Glide Storage Drawers (Included)',
    legs: 'Chrome Plinth Feet & Heavy-Duty Sliding Casters',
    bedOnlyImage: '/images/mattress/tiara_storage_bed_only.jpg',
    posterImage: '/images/mattress/tiara_storage_poster.jpg',
    swatches: [
      { title: 'High Quality Leatherite', image: '/images/mattress/tiara_storage_swatch1.jpg' },
      { title: 'Double Sized Drawer Storage', image: '/images/mattress/tiara_storage_swatch2.jpg' },
    ],
    palette: [
      { name: 'Cognac Leatherette', hex: '#B55A1B' },
      { name: 'Warm Amber', hex: '#D27A34' },
      { name: 'Gold Border Tone', hex: '#C5A880' },
      { name: 'Deep Espresso', hex: '#3B2418' },
    ],
    features: [
      'Original hardwood chassis with permanent termite and borer resistance',
      'Dual-side pull-out drawers on smooth ball-bearing tracks for quilts & linens',
      'Easy-to-clean high-grade leatherette resistant to spills and humidity',
      'Pairs with Aerodream Energy Booster mattress with high-density comfort core',
    ],
  },

  // 2. TIARA CHANNEL (Mocha Fluted Channel)
  {
    id: 'suite-tiara-channel',
    order: 2,
    category: ['channel', 'storage'],
    title: 'Tiara Fluted Channel Mattress',
    badge: 'Vertical Channel Tuft',
    subtitle: 'Architectural vertical fluted headboard in mocha velvet with flared shelter wingback',
    headboardStyle: 'Elegant Vertical Channel-Tufted Headboard',
    frameSpec: 'Original Solid Hardwood with Mortise & Tenon Joists',
    mattressPairing: 'Aerodream Luxury Booster Quilted Euro-Top Mattress',
    foamSpec: 'High-Density Ergonomic HR Foam + Breathable Knit',
    storageOption: 'Dual-Side Sliding Drawers or Platform Base',
    legs: 'Chrome Steel Plinth Legs',
    bedOnlyImage: '/images/mattress/tiara_channel_bed_only.jpg',
    posterImage: '/images/mattress/tiara_channel_poster.jpg',
    swatches: [
      { title: 'Elegant Channel-Tufted Headboard', image: '/images/mattress/tiara_channel_swatch1.jpg' },
      { title: 'Durable & Sturdy Base', image: '/images/mattress/tiara_channel_swatch2.jpg' },
    ],
    palette: [
      { name: 'Mocha Velvet', hex: '#7A5844' },
      { name: 'Soft Taupe', hex: '#A88B77' },
      { name: 'Espresso Core', hex: '#3D2B22' },
      { name: 'Polished Chrome', hex: '#D7DAE0' },
    ],
    features: [
      'Padded architectural vertical flutes offer plush lumbar support for sitting up',
      'Kiln-dried hardwood construction tested to support over 450 kg',
      'Option for dual-side rolling drawers concealed seamlessly inside rails',
      'Aerodream mattress absorbs partner movement for uninterrupted deep sleep',
    ],
  },

  // 3. PLUTO (Diamond Leatherette)
  {
    id: 'suite-pluto',
    order: 3,
    category: ['tufted', 'storage'],
    title: 'Pluto Diamond Mattress',
    badge: 'Diamond Quilted Wingback',
    subtitle: 'Hand-stitched deep diamond tufting with flared wingback contour on solid hardwood carcass',
    headboardStyle: 'Fully Upholstered Stitched Diamond Headboard',
    frameSpec: 'Original Kiln-Dried Hardwood (Termite Resistant)',
    mattressPairing: 'Aerodream Multi-Layer Orthopedic Quilted Euro-Top',
    foamSpec: '45+ HR Foam with Anti-Sag Base Construction',
    storageOption: 'Dual-Side Rolling Storage Drawers or Hydraulic Lift',
    legs: 'Sturdy Steel Legs in Polished Chrome',
    bedOnlyImage: '/images/mattress/pluto_bed_only.jpg',
    posterImage: '/images/mattress/pluto_poster.jpg',
    swatches: [
      { title: 'Fully Upholstered Headboard', image: '/images/mattress/pluto_swatch1.jpg' },
      { title: 'Sturdy Plinth Base', image: '/images/mattress/pluto_swatch2.jpg' },
    ],
    palette: [
      { name: 'Rich Chocolate', hex: '#4A332A' },
      { name: 'Dark Roast', hex: '#2E1E18' },
      { name: 'Charcoal Accent', hex: '#3A3937' },
      { name: 'Mirror Chrome', hex: '#E1E4EB' },
    ],
    features: [
      'Original termite-resistant hardwood frame provides lifetime squeak-free sleep',
      'Deep diamond stitched upholstery with contoured ergonomic tilt',
      'Option for additional storage drawers on both sides of the base',
      'Multi-layer orthopedic mattress relieves spinal, hip, and shoulder tension',
    ],
  },

  // 4. EARLIE (Button-Tufted Champagne)
  {
    id: 'suite-earlie',
    order: 4,
    category: ['tufted', 'storage'],
    title: 'Earlie Button-Tufted Mattress',
    badge: 'Hand-Pleated Diamond',
    subtitle: 'Classic hand-pleated diamond button tufting in champagne cream with tailored base panel',
    headboardStyle: 'Hand-Pleated Button-Tufted Wingback Headboard',
    frameSpec: 'Original Solid Hardwood with Reinforced Cross-Bracing',
    mattressPairing: 'Aerodream Gold-Border Luxury Pillow-Top Mattress',
    foamSpec: 'Dual-Layer HR Core with High-Resilience Cushioning',
    storageOption: 'Clean Base Panel with Optional Sliding Drawers',
    legs: 'Low-Profile Brushed Steel Feet',
    bedOnlyImage: '/images/mattress/earlie_bed_only.jpg',
    posterImage: '/images/mattress/earlie_poster.jpg',
    swatches: [
      { title: 'Button-Tufted Headboard', image: '/images/mattress/earlie_swatch1.jpg' },
      { title: 'Clean Base Panel Design', image: '/images/mattress/earlie_swatch2.jpg' },
    ],
    palette: [
      { name: 'Champagne Cream', hex: '#EBE2D3' },
      { name: 'Warm Oatmeal', hex: '#C7BBAA' },
      { name: 'Gold Trim', hex: '#C5A880' },
      { name: 'Almond Taupe', hex: '#8C7F72' },
    ],
    features: [
      'Hand-anchored diamond buttons individually fastened to internal timber backing',
      'Tailored base panel creates a clean modern silhouette with zero clutter',
      'Original hardwood guarantees structural integrity against sagging and termites',
      'Gold-bordered pillow-top mattress cradles pressure points gently',
    ],
  },

  // 5. INDIGO (Forest Mocha Leatherette)
  {
    id: 'suite-indigo',
    order: 5,
    category: ['tufted', 'storage'],
    title: 'Indigo Diamond Mattress',
    badge: 'Premium Flared Wings',
    subtitle: 'Dark forest mocha leatherette with diamond cross-stitching and architectural flared wings',
    headboardStyle: 'Premium Diamond-Stitched High Flared Wingback',
    frameSpec: 'Original Termite-Proof Hardwood Carcass',
    mattressPairing: 'Aerodream Orthopedic Luxury Pillow-Top Mattress',
    foamSpec: 'High-Density HR Core with Zoned Spine Contouring',
    storageOption: 'Optional Dual-Side Storage Drawers on Both Sides',
    legs: 'Heavy-Duty Steel Base Legs',
    bedOnlyImage: '/images/mattress/indigo_bed_only.jpg',
    posterImage: '/images/mattress/indigo_poster.jpg',
    swatches: [
      { title: 'Premium Design Headboard', image: '/images/mattress/indigo_swatch1.jpg' },
      { title: 'Steel Legs', image: '/images/mattress/indigo_swatch2.jpg' },
    ],
    palette: [
      { name: 'Forest Mocha', hex: '#52433D' },
      { name: 'Dark Umber', hex: '#332722' },
      { name: 'Deep Plum Tone', hex: '#5A3B4F' },
      { name: 'Polished Steel', hex: '#BCC0C9' },
    ],
    features: [
      'High-grade leatherette finish is moisture-resistant and effortless to wipe clean',
      'Flared wingback edges create a private, cozy acoustic sleep sanctuary',
      'Tested original hardwood carcass prevents borer infestation permanently',
      'Aerodream mattress distributes body mass evenly to eliminate pressure hotspots',
    ],
  },

  // 6. AVON (Imported Scottish Tartan)
  {
    id: 'suite-avon',
    order: 6,
    category: ['plaid', 'storage'],
    title: 'Avon Scottish Tartan Mattress',
    badge: 'Imported Woven Tartan',
    subtitle: 'High-GSM imported woven Scottish plaid fabric with cushioned softened perimeter edges',
    headboardStyle: 'High-Back Curved Profile in Textured Plaid Weave',
    frameSpec: 'Solid Kiln-Dried Hardwood Structure',
    mattressPairing: 'Aerodream Energy Booster Monochrome Layered Knit',
    foamSpec: 'Multi-Layer High-Resilience Foam Core',
    storageOption: 'Dual-Side Sliding Drawers or Platform Base',
    legs: 'Concealed Heavy-Duty Low-Profile Legs',
    bedOnlyImage: '/images/mattress/avon_bed_only.jpg',
    posterImage: '/images/mattress/avon_poster.jpg',
    swatches: [
      { title: 'Imported Woven Fabric', image: '/images/mattress/avon_swatch1.jpg' },
      { title: 'Softer Edges Base', image: '/images/mattress/avon_swatch2.jpg' },
    ],
    palette: [
      { name: 'Highland Tartan', hex: '#3A3E46' },
      { name: 'Charcoal Plaid', hex: '#545964' },
      { name: 'Platinum Grey', hex: '#8E939E' },
      { name: 'Pure White Accent', hex: '#F3F5F7' },
    ],
    features: [
      'Heavyweight imported Scottish plaid fabric with tactile loomed weave',
      'Cushioned softened perimeter base protects legs against accidental bumps',
      'Built with original hardwood for decades of stable, non-squeaking support',
      'Aerodream Energy Booster mattress incorporates active ventilation airflow',
    ],
  },

  // 7. SCOT (Terracotta Heritage Plaid)
  {
    id: 'suite-scot',
    order: 7,
    category: ['plaid', 'storage'],
    title: 'Scot Heritage Plaid Mattress',
    badge: 'High-Density HR Core',
    subtitle: 'Warm terracotta and amber plaid weave engineered with high-density HR foam core',
    headboardStyle: 'Architectural Crown Wingback in High-GSM Plaid Weave',
    frameSpec: 'Original Termite-Resistant Hardwood Frame',
    mattressPairing: 'Aerodream Energy Booster with Royal Indigo Piping',
    foamSpec: 'High Density 45+ HR Foam Used (Zero Sagging)',
    storageOption: 'Dual-Side Storage Drawers on Smooth Sliders',
    legs: 'Solid Metal-Capped Timber Base Legs',
    bedOnlyImage: '/images/mattress/scot_bed_only.jpg',
    posterImage: '/images/mattress/scot_poster.jpg',
    swatches: [
      { title: 'High Density H.R Foam Used', image: '/images/mattress/scot_swatch1.jpg' },
      { title: 'Long Life Material', image: '/images/mattress/scot_swatch2.jpg' },
    ],
    palette: [
      { name: 'Terracotta Weave', hex: '#8F4E2D' },
      { name: 'Amber Plaid', hex: '#B86F46' },
      { name: 'Royal Indigo', hex: '#2C346B' },
      { name: 'Natural Sand', hex: '#D6C5B3' },
    ],
    features: [
      'Certified high-density 45+ HR foam ensures zero body indentation over years',
      'Long-life high-GSM woven fabric designed for heavy daily residential use',
      'Original hardwood chassis with solid load-bearing center joists',
      'Aerodream mattress finished with vibrant indigo perimeter piping and cool knit top',
    ],
  },
];

export const MattressPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<BedCategory>('all');
  const [selectedSuite, setSelectedSuite] = useState<MattressSuite | null>(null);
  const [viewModes, setViewModes] = useState<{ [key: string]: ViewMode }>({});
  const [activePaletteIndex, setActivePaletteIndex] = useState<{ [key: string]: number }>({});
  const [modalViewMode, setModalViewMode] = useState<ViewMode>('bed');

  React.useEffect(() => {
    if (selectedSuite) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedSuite]);

  const filteredSuites = useMemo(() => {
    if (activeCategory === 'all') return MATTRESS_SUITES;
    return MATTRESS_SUITES.filter((s) => s.category.includes(activeCategory));
  }, [activeCategory]);

  const countStorage = useMemo(
    () => MATTRESS_SUITES.filter((s) => s.category.includes('storage')).length,
    [],
  );
  const countTufted = useMemo(
    () => MATTRESS_SUITES.filter((s) => s.category.includes('tufted')).length,
    [],
  );
  const countChannel = useMemo(
    () => MATTRESS_SUITES.filter((s) => s.category.includes('channel')).length,
    [],
  );
  const countPlaid = useMemo(
    () => MATTRESS_SUITES.filter((s) => s.category.includes('plaid')).length,
    [],
  );

  const activeColorForSuite = useCallback(
    (suite: MattressSuite) => {
      const idx = activePaletteIndex[suite.id] ?? 0;
      return suite.palette[idx] || suite.palette[0];
    },
    [activePaletteIndex],
  );

  const setViewModeForSuite = (id: string, mode: ViewMode) => {
    setViewModes((prev) => ({ ...prev, [id]: mode }));
  };

  const openInspector = (suite: MattressSuite) => {
    setSelectedSuite(suite);
    setModalViewMode('bed');
  };

  return (
    <div className="pt-36 sm:pt-44 pb-28 bg-[#FAF8F5] min-h-screen text-[#1E1D1B]">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAE7E1] text-[#1E1D1B] border border-[#D3D0C9] mb-5">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className="label-caps text-[10px] tracking-luxury">
            Aerodream Sleep Systems • Original Hardwood • Termite Resistant
          </span>
        </div>

        <h1 className="font-syne text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-[1.05]">
          Luxury Mattresses
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-[#5E5C57] font-light leading-relaxed">
          Aerodream high-density orthopedic and energy booster mattresses engineered with multi-layer comfort cores, targeted spinal alignment, and custom sizes.
        </p>

        {/* Master Craft Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-[#5E5C57]">
          <span className="px-3.5 py-1.5 rounded-full bg-white border border-[#D3D0C9] font-medium flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-4 h-4 text-[#C5A880]" />
            Aerodream Orthopedic System
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-white border border-[#D3D0C9] font-medium flex items-center gap-1.5 shadow-sm">
            <PackageCheck className="w-4 h-4 text-[#C5A880]" />
            Original Hardwood (Termite Resistant)
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-white border border-[#D3D0C9] font-medium flex items-center gap-1.5 shadow-sm">
            <Layers className="w-4 h-4 text-[#C5A880]" />
            High Density H.R. Foam
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-white border border-[#D3D0C9] font-medium flex items-center gap-1.5 shadow-sm">
            <Box className="w-4 h-4 text-[#C5A880]" />
            Double Sized Drawer Storage
          </span>
        </div>
      </div>

      {/* SHOWCASE OF ALL 7 MASTER MATTRESSES */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="label-caps text-[#C5A880] text-xs">Curated Master Mattresses</span>
          <h2 className="font-syne text-3xl sm:text-5xl font-bold uppercase text-[#1E1D1B] tracking-tight mt-1">
            Aerodream Mattress Collection
          </h2>
          <p className="text-xs sm:text-sm text-[#5E5C57] mt-2 font-light">
            Crafted with original hardwood, termite resistance, multi-density comfort cores, and your choice of custom dimensions and 500+ fabric tones.
          </p>

          {/* Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {[
              { id: 'all', label: `All Mattresses (${MATTRESS_SUITES.length})` },
              { id: 'storage', label: `Storage Drawers (${countStorage})` },
              { id: 'tufted', label: `Diamond & Button Tufted (${countTufted})` },
              { id: 'channel', label: `Vertical Channel (${countChannel})` },
              { id: 'plaid', label: `Imported Scottish Tartan (${countPlaid})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as BedCategory)}
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

        {/* 3-Column Luxury Suite Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {filteredSuites.map((suite) => {
            const currentMode = viewModes[suite.id] || 'bed';
            const currentColor = activeColorForSuite(suite);

            return (
              <div
                key={suite.id}
                className="group rounded-3xl bg-white border border-[#D3D0C9] hover:border-[#C5A880] shadow-soft-luxury hover:shadow-elevated transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Image Plate with 3-Mode View Switcher */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#F2EFE9]">
                    {currentMode === 'bed' && (
                      <img
                        src={suite.bedOnlyImage}
                        alt={suite.title}
                        loading="lazy"
                        className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-105"
                      />
                    )}

                    {currentMode === 'poster' && (
                      <img
                        src={suite.posterImage}
                        alt={`${suite.title} Catalog Poster`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}

                    {currentMode === 'swatches' && (
                      <div className="w-full h-full p-3 grid grid-cols-2 gap-2 bg-[#1A1817]">
                        {suite.swatches.map((sw, i) => (
                          <div
                            key={i}
                            className="relative rounded-xl overflow-hidden border border-white/20 flex flex-col justify-end"
                          >
                            <img
                              src={sw.image}
                              alt={sw.title}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="relative z-10 p-2 bg-black/75 backdrop-blur-sm text-[9px] font-mono text-white leading-tight">
                              {sw.title}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

                    {/* Craft Badge */}
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-black/10 text-[10px] font-syne font-bold uppercase tracking-wider text-[#1E1D1B] shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{suite.badge}</span>
                    </div>

                    {/* View Mode Toggle Controls */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-md p-1 rounded-full border border-white/20 shadow-md">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setViewModeForSuite(suite.id, 'bed');
                        }}
                        className={`p-1.5 rounded-full text-[10px] font-mono transition-all ${
                          currentMode === 'bed'
                            ? 'bg-[#C5A880] text-[#141312] font-bold shadow'
                            : 'text-white/80 hover:text-white'
                        }`}
                        title="3D Staging View"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setViewModeForSuite(suite.id, 'swatches');
                        }}
                        className={`p-1.5 rounded-full text-[10px] font-mono transition-all ${
                          currentMode === 'swatches'
                            ? 'bg-[#C5A880] text-[#141312] font-bold shadow'
                            : 'text-white/80 hover:text-white'
                        }`}
                        title="Craft Close-Up Swatches"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setViewModeForSuite(suite.id, 'poster');
                        }}
                        className={`p-1.5 rounded-full text-[10px] font-mono transition-all ${
                          currentMode === 'poster'
                            ? 'bg-[#C5A880] text-[#141312] font-bold shadow'
                            : 'text-white/80 hover:text-white'
                        }`}
                        title="Official Spec Sheet Poster"
                      >
                        <FileText className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => openInspector(suite)}
                        className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all ml-0.5"
                        title="Inspect Fullscreen"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-3 inset-x-3 flex items-end justify-between text-white">
                      <div>
                        <span className="text-[10px] uppercase tracking-luxury text-[#C5A880] block font-semibold">
                          ORIGINAL HARDWOOD CARCASS
                        </span>
                        <p className="font-syne text-lg sm:text-xl font-bold tracking-tight">
                          {suite.title}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Body Specs */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs text-[#5E5C57] leading-relaxed">
                      {suite.subtitle}
                    </p>

                    {/* Detail Swatches Preview Bar */}
                    <div className="pt-2 border-t border-[#EAE7E1]">
                      <span className="text-[9px] uppercase tracking-wider text-[#8A8782] block mb-2 font-mono">
                        Craftsmanship Close-Ups
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {suite.swatches.map((sw, i) => (
                          <div
                            key={i}
                            className="rounded-xl border border-[#EAE7E1] p-1.5 bg-[#FAF8F5] flex items-center gap-2"
                          >
                            <img
                              src={sw.image}
                              alt={sw.title}
                              className="w-10 h-10 rounded-lg object-cover border border-black/10 shrink-0"
                            />
                            <span className="text-[9px] font-medium text-[#1E1D1B] leading-tight line-clamp-2">
                              {sw.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technical Specs Table */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#EAE7E1] text-[11px]">
                      <div>
                        <span className="text-[#8A8782] block text-[9px] uppercase tracking-wider">
                          Headboard
                        </span>
                        <span className="font-medium text-[#1E1D1B] truncate block">
                          {suite.headboardStyle}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#8A8782] block text-[9px] uppercase tracking-wider">
                          Base &amp; Storage
                        </span>
                        <span className="font-medium text-[#1E1D1B] truncate block">
                          {suite.storageOption}
                        </span>
                      </div>
                    </div>

                    {/* Color Swatches */}
                    <div className="pt-1">
                      <span className="text-[10px] uppercase tracking-wider text-[#8A8782] block mb-1.5">
                        Fabric Tone: <strong className="text-[#1E1D1B]">{currentColor.name}</strong>
                      </span>
                      <div className="flex items-center gap-2">
                        {suite.palette.map((swatch, idx) => {
                          const isActive = (activePaletteIndex[suite.id] ?? 0) === idx;
                          return (
                            <button
                              key={swatch.name}
                              type="button"
                              onClick={() =>
                                setActivePaletteIndex((prev) => ({ ...prev, [suite.id]: idx }))
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
                    onClick={() => openInspector(suite)}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#FAF8F5] hover:bg-[#1E1D1B] border border-[#D3D0C9] hover:border-[#1E1D1B] text-[#1E1D1B] hover:text-white text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>

                  <a
                    href={`https://wa.me/919841134665?text=${encodeURIComponent(
                      `Hello A-Decor, I would like to inquire about the ${suite.title}. Could you share pricing for King/Queen size and customization options?`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 transition-all flex items-center justify-center"
                    aria-label={`WhatsApp about ${suite.title}`}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 5: ON-SITE COT INSPECTION & SIZING CALLOUT */}
      <div className="max-w-5xl mx-auto px-6 mt-20">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#141312] text-[#FAF8F5] border border-white/10 shadow-elevated flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="label-caps text-[#C5A880] text-xs">On-Site Cot Measurement &amp; Mattress Consultation</span>
            <h3 className="font-syne text-2xl sm:text-3xl font-bold uppercase text-white tracking-tight">
              Have An Existing Cot? We Custom-Tailor To Fit
            </h3>
            <p className="text-xs text-[#D3D0C9] max-w-xl font-light leading-relaxed">
              We visit your home in Chennai, measure your wooden cot or bed recess to millimeter precision, bring firmness foam blocks, and deliver with doorstep assembly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to="/contact?service=mattress"
              className="px-6 py-3.5 rounded-full bg-[#C5A880] hover:bg-white text-[#100F0E] font-syne font-bold text-xs tracking-luxury uppercase transition-all shadow-glow-gold hover:scale-105"
            >
              Book Home Measurement
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

      {/* FULLSCREEN SENSORY INSPECTOR MODAL */}
      {selectedSuite &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
            onClick={() => setSelectedSuite(null)}
          >
            <div
              className="relative w-full max-w-5xl max-h-[92vh] rounded-3xl bg-[#1E1D1B] border border-white/20 text-[#FAF8F5] shadow-2xl overflow-y-auto flex flex-col lg:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedSuite(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-[#D90B0B] text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image Section with Mode Switcher */}
              <div className="lg:w-3/5 bg-black/40 flex flex-col items-center justify-between p-4 sm:p-6 min-h-[300px] lg:min-h-[500px]">
                {/* Mode Selector in Modal */}
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/20 mb-3">
                  <button
                    type="button"
                    onClick={() => setModalViewMode('bed')}
                    className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                      modalViewMode === 'bed'
                        ? 'bg-[#C5A880] text-[#141312] font-bold'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    3D Staging View
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalViewMode('swatches')}
                    className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                      modalViewMode === 'swatches'
                        ? 'bg-[#C5A880] text-[#141312] font-bold'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    Craft Swatches
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalViewMode('poster')}
                    className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                      modalViewMode === 'poster'
                        ? 'bg-[#C5A880] text-[#141312] font-bold'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    Full Poster Sheet
                  </button>
                </div>

                <div className="flex-1 flex items-center justify-center w-full">
                  {modalViewMode === 'bed' && (
                    <img
                      src={selectedSuite.bedOnlyImage}
                      alt={selectedSuite.title}
                      className="max-h-[55vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                    />
                  )}

                  {modalViewMode === 'poster' && (
                    <img
                      src={selectedSuite.posterImage}
                      alt={`${selectedSuite.title} Catalog Poster`}
                      className="max-h-[65vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                    />
                  )}

                  {modalViewMode === 'swatches' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
                      {selectedSuite.swatches.map((sw, i) => (
                        <div
                          key={i}
                          className="rounded-2xl border border-white/20 overflow-hidden bg-black/60 shadow-xl flex flex-col"
                        >
                          <img
                            src={sw.image}
                            alt={sw.title}
                            className="w-full aspect-[4/3] object-cover"
                          />
                          <div className="p-3 bg-black/80 text-xs font-mono text-white text-center">
                            {sw.title}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom details thumb bar */}
                <div className="mt-4 grid grid-cols-2 gap-2 w-full max-w-md">
                  {selectedSuite.swatches.map((sw, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-white/15 p-2 bg-white/5 flex items-center gap-2.5"
                    >
                      <img
                        src={sw.image}
                        alt={sw.title}
                        className="w-10 h-10 rounded-lg object-cover border border-white/10 shrink-0"
                      />
                      <span className="text-[10px] font-medium text-white leading-tight">
                        {sw.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Specs & Live Quotation Generator */}
              <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="label-caps text-[#C5A880] text-[10px]">
                        {selectedSuite.badge}
                      </span>
                      <span className="text-white/40">•</span>
                      <span className="text-[10px] font-mono text-[#8A8782] uppercase">
                        ORIGINAL HARDWOOD
                      </span>
                    </div>
                    <h3 className="font-syne text-2xl sm:text-3xl font-bold uppercase text-white tracking-tight">
                      {selectedSuite.title}
                    </h3>
                    <p className="text-xs text-[#D3D0C9] mt-1 font-light leading-relaxed">
                      {selectedSuite.subtitle}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-white/10 text-xs">
                    <div>
                      <span className="text-[#8A8782] block text-[10px] uppercase font-mono">
                        Headboard Design
                      </span>
                      <span className="text-white font-medium">{selectedSuite.headboardStyle}</span>
                    </div>
                    <div>
                      <span className="text-[#8A8782] block text-[10px] uppercase font-mono">
                        Frame Structure
                      </span>
                      <span className="text-white font-medium">{selectedSuite.frameSpec}</span>
                    </div>
                    <div>
                      <span className="text-[#8A8782] block text-[10px] uppercase font-mono">
                        Mattress Pairing
                      </span>
                      <span className="text-white font-medium">{selectedSuite.mattressPairing}</span>
                    </div>
                    <div>
                      <span className="text-[#8A8782] block text-[10px] uppercase font-mono">
                        Storage Options
                      </span>
                      <span className="text-white font-medium">{selectedSuite.storageOption}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <span className="text-[10px] uppercase text-[#8A8782] block mb-2 font-mono">
                      Craft Highlights
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#D3D0C9]">
                      {selectedSuite.features.map((feat, idx) => (
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
                      `Hello A-Decor, I would like to order or get a quote for ${selectedSuite.title} (${selectedSuite.badge}). Could you share pricing and available fabric options?`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-syne font-bold text-xs uppercase tracking-luxury flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Quote for this Mattress</span>
                  </a>

                  <Link
                    to="/contact?service=mattress"
                    className="w-full py-3 px-5 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#100F0E] font-syne font-semibold text-xs uppercase tracking-luxury flex items-center justify-center gap-2 transition-all"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Schedule Free On-Site Cot Sizing</span>
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
