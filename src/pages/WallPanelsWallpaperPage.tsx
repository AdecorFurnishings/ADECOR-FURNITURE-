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
  BedDouble,
} from 'lucide-react';
import { SITE_CONTENT } from '../data/content';

type FilterCategory = 'all' | 'panel' | 'wallpaper' | 'headboard';

interface WallArtPiece {
  id: string;
  order: number;
  category: 'panel' | 'wallpaper' | 'headboard';
  title: string;
  subtitle: string;
  tag: string;
  finish: string;
  keySpec: string;
  acousticOrWashability: string;
  substrate: string;
  recommendedRoom: string;
  dimensions: string;
  image: string;
  ambientHex: string;
  palette: { name: string; hex: string }[];
  features: string[];
}

const WALL_COLLECTIONS: WallArtPiece[] = [
  // ==========================================
  // FIRST 4: USER-UPLOADED WALL PANELS (1-4)
  // ==========================================
  {
    id: 'panel-diamond-tufted-iceblue',
    order: 1,
    category: 'panel',
    title: 'Diamond Tufted Velvet',
    subtitle: 'Sculpted Boudoir Acoustic Feature',
    tag: 'Acoustic Velvet',
    finish: 'Ice Blue Belgian Velvet',
    keySpec: 'Deep Diamond Tufting',
    acousticOrWashability: 'NRC 0.85 (Echo Absorption)',
    substrate: 'High-resilience foam on marine ply',
    recommendedRoom: 'Master Suite & Luxury Bedroom',
    dimensions: 'Custom Floor-to-Ceiling Fluted Frame',
    image: '/images/wall-panels/panel_diamond_tufted_iceblue.jpg',
    ambientHex: '#7B96A8',
    palette: [
      { name: 'Ice Blue Velvet', hex: '#8EA6B4' },
      { name: 'Slate Shadow', hex: '#5B7688' },
      { name: 'Pearl Trim', hex: '#E6EEF2' },
      { name: 'Obsidian Shadow', hex: '#2A3B46' },
    ],
    features: ['Crystal-button tufting', 'Lacquer fluted millwork border', 'Integrated floating nightstands'],
  },
  {
    id: 'panel-charcoal-geometric-brass',
    order: 2,
    category: 'panel',
    title: 'Geometric Suede & Brass',
    subtitle: 'Architectural Chevron Statement',
    tag: 'Suede + Brass',
    finish: 'Charcoal Suede & Satin Brass',
    keySpec: 'PVD Brass Reveal Channels',
    acousticOrWashability: 'NRC 0.80 (Reverb Control)',
    substrate: 'High-density acoustic core & PVD extrusions',
    recommendedRoom: 'Grand Living, Lounge & Boardroom',
    dimensions: 'Full-wall symmetrical statement inset',
    image: '/images/wall-panels/panel_charcoal_geometric_brass.jpg',
    ambientHex: '#C5A880',
    palette: [
      { name: 'Charcoal Suede', hex: '#2E3136' },
      { name: 'PVD Satin Gold', hex: '#D4AF37' },
      { name: 'Warm Pewter', hex: '#6B685F' },
      { name: 'Champagne Glow', hex: '#E8DECE' },
    ],
    features: ['Precision chamfered brass lattice', 'Ultra-matte acoustic suede', 'Concealed warm cove perimeter lighting'],
  },
  {
    id: 'panel-modular-greige-flushdoor',
    order: 3,
    category: 'panel',
    title: 'Minimal Cashmere Flush',
    subtitle: 'Seamless Concealed Pivot Wall',
    tag: 'Concealed Architecture',
    finish: 'Greige Micro-Suede',
    keySpec: 'Integrated Hidden Pivot Doors',
    acousticOrWashability: 'NRC 0.75 (Vibration Damping)',
    substrate: 'Modular CNC acoustic grid on steel subframe',
    recommendedRoom: 'Penthouse Foyer, Suite & Dressing Salon',
    dimensions: 'Monolithic wall-to-wall cladding',
    image: '/images/wall-panels/panel_modular_greige_flushdoor.jpg',
    ambientHex: '#B5A593',
    palette: [
      { name: 'Cashmere Greige', hex: '#B9AB9C' },
      { name: 'Warm Taupe', hex: '#8C7B6D' },
      { name: 'Alabaster Plaster', hex: '#E2DCD5' },
      { name: 'Bronze Trim', hex: '#403B36' },
    ],
    features: ['Concealed flush pivot door systems', 'Unbroken architectural grid', 'Seamless switchplate & vent cutouts'],
  },
  {
    id: 'panel-teal-chevron-brass',
    order: 4,
    category: 'panel',
    title: 'Petrol Teal Chevron',
    subtitle: 'Fluted Velvet with Gold Inlay',
    tag: 'Sculpted Velvet',
    finish: 'Petrol Teal Velvet',
    keySpec: 'Angular PVD Brass Accents',
    acousticOrWashability: 'NRC 0.80 (Sound Attenuation)',
    substrate: 'Beveled acoustic foam on moisture-proof MDF',
    recommendedRoom: 'Dining Room, Foyer & Formal Lounge',
    dimensions: 'Vertical accent divider / Feature wall',
    image: '/images/wall-panels/panel_teal_chevron_brass.jpg',
    ambientHex: '#1E4D5A',
    palette: [
      { name: 'Petrol Teal', hex: '#184552' },
      { name: 'Brushed Brass', hex: '#D4AF37' },
      { name: 'Midnight Deep', hex: '#0F2C35' },
      { name: 'Seafoam Highlight', hex: '#A5D3DE' },
    ],
    features: ['Dynamic diagonal brass breaks', 'Deep luster jewel-tone velvet', 'Recessed backlight trough integration'],
  },

  // ==========================================
  // SECOND 4: USER-UPLOADED WALLPAPERS (5-8)
  // ==========================================
  {
    id: 'wallpaper-tropical-arch',
    order: 5,
    category: 'wallpaper',
    title: 'Tropical Arch Vista',
    subtitle: 'Panoramic Landscape Mural',
    tag: 'Scenic Mural',
    finish: 'Matte Non-Woven Canvas',
    keySpec: 'Zero-Reflection Matte Finish',
    acousticOrWashability: 'Spongeable & UV Fade-Resistant',
    substrate: 'Breathable 180gsm FSC-certified canvas',
    recommendedRoom: 'Arched Alcoves, Corridors & Dining Salons',
    dimensions: 'Custom scaled to wall geometry',
    image: '/images/wallpaper/wallpaper_tropical_arch_mural.jpg',
    ambientHex: '#3D5A45',
    palette: [
      { name: 'Deep Palm Green', hex: '#334E3B' },
      { name: 'Warm Terracotta', hex: '#D08C4A' },
      { name: 'Sage Frond', hex: '#899E75' },
      { name: 'Parchment Sky', hex: '#F5EFE6' },
    ],
    features: ['Arched architectural vista framing', 'Hand-painted tropical fauna', 'Classical alpine atmospheric depth'],
  },
  {
    id: 'wallpaper-heritage-damask',
    order: 6,
    category: 'wallpaper',
    title: 'Heritage Embossed Damask',
    subtitle: 'Baroque Jacquard Relief',
    tag: 'Embossed Vinyl',
    finish: 'Warm Bronze & Deep Taupe',
    keySpec: 'High-Relief Tactile Embossing',
    acousticOrWashability: 'Heavy-Duty Scrubbable Vinyl',
    substrate: 'Multi-layer solid vinyl on non-woven base',
    recommendedRoom: 'Grand Hallways, Stairwells & Suites',
    dimensions: 'Standard 53cm x 10m Rolls / Custom drops',
    image: '/images/wallpaper/wallpaper_heritage_damask_bronze.jpg',
    ambientHex: '#735E51',
    palette: [
      { name: 'Espresso Damask', hex: '#4B3C35' },
      { name: 'Gilded Taupe', hex: '#B5A08C' },
      { name: 'Warm Bronze', hex: '#7B675A' },
      { name: 'Pearl Cream', hex: '#F7F3EE' },
    ],
    features: ['Regal symmetrical acanthus scroll', 'Textured woven-fabric tactile effect', 'Subtle metallic pearl highlights'],
  },
  {
    id: 'wallpaper-strata-stone',
    order: 7,
    category: 'wallpaper',
    title: 'Strata Stone Relief',
    subtitle: 'Tactile Split-Face Mineral Ashlar',
    tag: '3D Mineral Texture',
    finish: 'Travertine & Sandstone',
    keySpec: 'Split-Face 3D Mineral Grain',
    acousticOrWashability: 'Washable & Scratch-Resistant',
    substrate: 'Mineral-infused textured vinyl on spun fleece',
    recommendedRoom: 'Accent Wall, Living Room & Home Office',
    dimensions: 'Continuous drops with invisible seams',
    image: '/images/wallpaper/wallpaper_textured_strata_stone.jpg',
    ambientHex: '#BAA58C',
    palette: [
      { name: 'Travertine Sand', hex: '#BFA78D' },
      { name: 'Warm Limestone', hex: '#E2D3BE' },
      { name: 'Earthy Silt', hex: '#6F604F' },
      { name: 'Ochre Vein', hex: '#9C7A54' },
    ],
    features: ['Realistic split-face ashlar stone relief', 'Organic warm matte mineral feel', 'Zero structural weight of real rock'],
  },
  {
    id: 'wallpaper-royal-mughal-peacock',
    order: 8,
    category: 'wallpaper',
    title: 'Mughal Pavilion Mural',
    subtitle: 'Imperial Jharokha & Lotus Pool',
    tag: 'Gilded Silk Mural',
    finish: 'Pistachio Silk & Gold Foil',
    keySpec: 'Gold Foil Gilded Accents',
    acousticOrWashability: 'Gently Wipeable Coated Silk',
    substrate: 'Premium textured silk weave with foil inlay',
    recommendedRoom: 'Pooja Room, Master Entrance & Dining Accent',
    dimensions: 'Custom scaled to room proportions',
    image: '/images/wallpaper/wallpaper_royal_mughal_peacock.jpg',
    ambientHex: '#7A9E7E',
    palette: [
      { name: 'Pistachio Wash', hex: '#7BA082' },
      { name: 'Imperial Peacock Blue', hex: '#0D488F' },
      { name: 'Lotus Blossom Pink', hex: '#E78484' },
      { name: 'Antique Gold Trim', hex: '#C5A880' },
    ],
    features: ['Rajasthani jharokha carved pavilion', 'Regal peacocks in blooming lotus pond', 'Gold leaf accented tropical palms'],
  },

  // ==========================================
  // EXISTING PROJECT PORTFOLIO (9-15)
  // ==========================================
  {
    id: 'panel-sunburst-headboard',
    order: 9,
    category: 'panel',
    title: 'Sunburst Radial Headboard',
    subtitle: 'Bespoke Fluted Bed Accent',
    tag: 'Bespoke Headboard',
    finish: 'Champagne & Cream Velvet',
    keySpec: 'Radial Segmented Quilting',
    acousticOrWashability: 'NRC 0.85 (Headboard Acoustic)',
    substrate: 'High-resilience contoured foam on hardwood ply',
    recommendedRoom: 'Master Bedroom Centerpiece',
    dimensions: 'Custom King / Queen Frame Flanking',
    image: '/images/gallery/real_sunburst_headboard_panel.jpg',
    ambientHex: '#C5A880',
    palette: [
      { name: 'Champagne Silk', hex: '#D6C4A6' },
      { name: 'Warm Ecru', hex: '#E8DFD1' },
      { name: 'Almond Shadow', hex: '#A89274' },
      { name: 'Dark Walnut Trim', hex: '#3C2E24' },
    ],
    features: ['Dramatic sunburst radiating tufting', 'Plush back support for reading', 'Integrated hidden cord management'],
  },
  {
    id: 'panel-slatted-charcoal',
    order: 10,
    category: 'panel',
    title: 'Acoustic Slatted Timber',
    subtitle: 'Felt & Natural Oak Rhythm',
    tag: 'Timber & Felt',
    finish: 'Natural Oak & Charcoal Felt',
    keySpec: 'Class-A Sound Absorption',
    acousticOrWashability: 'NRC 0.90 (Studio Grade)',
    substrate: 'PET recycled acoustic felt with solid veneer slats',
    recommendedRoom: 'Home Theatre, Media Lounge & Study',
    dimensions: 'Modular 2.4m & 3.0m Heights',
    image: '/images/hd/wall_panel.jpg',
    ambientHex: '#2F3136',
    palette: [
      { name: 'Natural Oak Slat', hex: '#BD9A6E' },
      { name: 'Acoustic Felt Dark', hex: '#1C1E21' },
      { name: 'Warm Timber Shadow', hex: '#7A6245' },
      { name: 'Pale Edge', hex: '#DDD2C3' },
    ],
    features: ['High-performance echo elimination', 'Natural architectural wood warmth', 'Rapid concealed clip mounting'],
  },
  {
    id: 'panel-horizontal-fluted',
    order: 11,
    category: 'panel',
    title: 'Horizontal Fluted Suede',
    subtitle: 'Linear Bedroom Backdrop',
    tag: 'Horizontal Suede',
    finish: 'Warm Greige Micro-Suede',
    keySpec: 'Continuous Linear Channels',
    acousticOrWashability: 'NRC 0.75 (Vibration Absorbing)',
    substrate: 'Segmented beveled foam core on marine backing',
    recommendedRoom: 'Bedroom Accent Wall & Headboard Band',
    dimensions: 'Custom wall-width continuous span',
    image: '/images/gallery/wallpanel_grey_horizontal.jpg',
    ambientHex: '#8A8782',
    palette: [
      { name: 'Warm Greige', hex: '#9E978F' },
      { name: 'Stone Grey', hex: '#6D6760' },
      { name: 'Alabaster Tint', hex: '#DED9D2' },
      { name: 'Dark Suede Line', hex: '#3B3632' },
    ],
    features: ['Lengthens room visual width', 'Soft acoustic cushioning behind pillows', 'Flush nightstand docking'],
  },
  {
    id: 'wallpaper-feather-mural',
    order: 12,
    category: 'wallpaper',
    title: 'Ethereal 3D Feather Plume',
    subtitle: 'Gold Leaf & Soft Relief',
    tag: 'Sculpted Mural',
    finish: 'Pearl White & Foil Gold',
    keySpec: 'Seamless 3D Relief Illusion',
    acousticOrWashability: 'Spongeable Non-Woven Textile',
    substrate: 'Heavy non-woven backing with relief ink layers',
    recommendedRoom: 'Living Room Feature & Master Suite',
    dimensions: 'Continuous mural scaled to wall size',
    image: '/images/gallery/real_feather_3d_mural.jpg',
    ambientHex: '#D8C7A5',
    palette: [
      { name: 'Pearl Plume', hex: '#EDE7DC' },
      { name: 'Warm Gilt Leaf', hex: '#CBB285' },
      { name: 'Pewter Shadow', hex: '#877B6B' },
      { name: 'Charcoal Base', hex: '#2C2B29' },
    ],
    features: ['Floating sculptural feather plume', 'Liquid metallic gold leaf veins', 'Dreamlike airy softness'],
  },
  {
    id: 'wallpaper-celestial-peacock',
    order: 13,
    category: 'wallpaper',
    title: 'Celestial Peacock Silk Tapestry',
    subtitle: 'Jeweled Botanical Tapestry',
    tag: 'Silk Tapestry',
    finish: 'Cerulean & Emerald Silk',
    keySpec: 'Fine Silk Fabric Weave',
    acousticOrWashability: 'Gently Wipeable Coated Silk',
    substrate: 'Real silk thread on non-woven spun backing',
    recommendedRoom: 'Dining Room, Foyer & Drawing Room',
    dimensions: 'Custom floor-to-ceiling panoramic drops',
    image: '/images/gallery/real_peacock_3d_mural.jpg',
    ambientHex: '#265C68',
    palette: [
      { name: 'Cerulean Plumage', hex: '#1C5B6F' },
      { name: 'Emerald Frond', hex: '#2A6F4E' },
      { name: 'Antique Gold', hex: '#BF9E5B' },
      { name: 'Warm Bone Ground', hex: '#EDE6DA' },
    ],
    features: ['High-definition silk texture', 'Deep jewel tone vibrance', 'Classical heritage ornithological art'],
  },
  {
    id: 'wallpaper-geometric-spheres',
    order: 14,
    category: 'wallpaper',
    title: 'Geometric 3D Spheres',
    subtitle: 'Trompe-l’œil Spatial Perspective',
    tag: 'Architectural 3D',
    finish: 'Marble, Sand & Gold Relief',
    keySpec: 'Expansive Visual Depth',
    acousticOrWashability: 'Washable Heavyweight Vinyl',
    substrate: 'Non-woven matte with high-resolution depth map',
    recommendedRoom: 'Modern Living Lounges & Office Partitions',
    dimensions: 'Custom wall-width proportional drop',
    image: '/images/gallery/wallpaper_3d_sphere.jpg',
    ambientHex: '#A3927B',
    palette: [
      { name: 'Travertine Orb', hex: '#BDAF9B' },
      { name: 'Warm Ochre Band', hex: '#9E8058' },
      { name: 'Cast Shadow', hex: '#4F473E' },
      { name: 'Morning Ivory', hex: '#F0ECE4' },
    ],
    features: ['Creates perception of added room depth', 'Architectural arches and floating geometries', 'Satin finish with zero glare'],
  },
  {
    id: 'wallpaper-botanical-fresco',
    order: 15,
    category: 'wallpaper',
    title: 'Botanical Fresco Canvas',
    subtitle: 'Classical Garden Mural',
    tag: 'Fine Canvas',
    finish: 'Sage & Earthen Ochre',
    keySpec: 'Natural Linen Canvas Grain',
    acousticOrWashability: 'Breathable & Wipeable Surface',
    substrate: 'Natural cellulose canvas with mineral pigments',
    recommendedRoom: 'Breakfast Nooks, Sunrooms & Guest Suites',
    dimensions: 'Bespoke panoramic murals',
    image: '/images/hd/wallpaper_art.jpg',
    ambientHex: '#5A6B53',
    palette: [
      { name: 'Sage Leaf', hex: '#63785D' },
      { name: 'Earthen Ochre', hex: '#A88B57' },
      { name: 'Deep Moss', hex: '#31442D' },
      { name: 'Warm Plaster', hex: '#EDE7DC' },
    ],
    features: ['Earthy heritage color palette', 'Subtle stucco fresco cracking effect', 'Calming bio-philic interior connection'],
  },

  // ==========================================
  // 3: BESPOKE UPHOLSTERED HEADBOARDS (9-11)
  // ==========================================
  {
    id: 'headboard-cream-fluted-platform',
    order: 9,
    category: 'headboard',
    title: 'Fluted Channel Upholstered Bed',
    subtitle: 'Floor-standing fluted headboard with matching padded side rails and footboard',
    tag: 'Custom Bed Frame',
    finish: 'Warm Cream Linen & Boucle Texture',
    keySpec: 'Vertical Channel Fluting',
    acousticOrWashability: 'High-density 40D foam • Solid plywood frame',
    substrate: 'Hardwood internal carcass with wrapped fabric rails',
    recommendedRoom: 'Master Bedroom & Luxury Suite',
    dimensions: 'Custom King / Queen sizes made-to-order',
    image: '/images/headboards/headboard_cream_fluted_platform.jpg',
    ambientHex: '#D9D0C3',
    palette: [
      { name: 'Warm Cream', hex: '#EAE3D6' },
      { name: 'Natural Linen', hex: '#D5C8B4' },
      { name: 'Soft Taupe', hex: '#A89985' },
      { name: 'Charcoal Plinth', hex: '#2A2927' },
    ],
    features: [
      'High-density padded vertical flutes',
      'Fully upholstered matching perimeter base frame',
      'Custom built to your exact mattress dimensions',
    ],
  },
  {
    id: 'headboard-blush-scallop-velvet',
    order: 10,
    category: 'headboard',
    title: 'Scallop Arch Velvet Bed',
    subtitle: 'Curved crown upholstered headboard with cushioned surround base frame',
    tag: 'Velvet Headboard',
    finish: 'Dusty Rose Plush Velvet',
    keySpec: 'Graduated Scallop Arches',
    acousticOrWashability: 'High-resilience foam • Soft velvet nap',
    substrate: 'Precision-cut structural ply frame',
    recommendedRoom: 'Guest Suite & Contemporary Bedroom',
    dimensions: 'Custom Queen / King profile',
    image: '/images/headboards/headboard_blush_scallop_velvet.jpg',
    ambientHex: '#C2888D',
    palette: [
      { name: 'Blush Velvet', hex: '#C2888D' },
      { name: 'Dusty Rose', hex: '#9E6A70' },
      { name: 'Warm Wood Ply', hex: '#C89B6D' },
      { name: 'Soft Pearl Tint', hex: '#EDE4E6' },
    ],
    features: [
      'Individually padded arched petals',
      'Padded wrap-around base frame',
      'Durable stain-resistant velvet fabric',
    ],
  },
  {
    id: 'headboard-berry-scallop-bedroom',
    order: 11,
    category: 'headboard',
    title: 'Royal Wine Scallop Platform',
    subtitle: 'Curved arch headboard with upholstered platform box base and rounded corners',
    tag: 'Platform Bed Suite',
    finish: 'Deep Wine Matte Velvet',
    keySpec: 'Arched Flutes & Rolled Base Edges',
    acousticOrWashability: 'Commercial grade velvet • 40D foam',
    substrate: 'Reinforced plywood box chassis',
    recommendedRoom: 'Master Bedroom Suite',
    dimensions: 'Custom King Size built-to-order',
    image: '/images/headboards/headboard_berry_scallop_bedroom.jpg',
    ambientHex: '#7E3A4B',
    palette: [
      { name: 'Wine Velvet', hex: '#7E3A4B' },
      { name: 'Deep Crimson', hex: '#5E2230' },
      { name: 'Matte Black Deck', hex: '#1C1C1E' },
      { name: 'Aqua Accent', hex: '#63B0C7' },
    ],
    features: [
      'Sculpted curved crest with cushioned vertical channels',
      'Deep upholstered box base with rounded front corners',
      'Engineered for long-lasting stability and comfort',
    ],
  },
];

export const WallPanelsWallpaperPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [selectedPiece, setSelectedPiece] = useState<WallArtPiece | null>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  React.useEffect(() => {
    if (selectedPiece) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPiece]);

  // Filter items
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return WALL_COLLECTIONS;
    return WALL_COLLECTIONS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const countPanel = useMemo(() => WALL_COLLECTIONS.filter((i) => i.category === 'panel').length, []);
  const countWallpaper = useMemo(() => WALL_COLLECTIONS.filter((i) => i.category === 'wallpaper').length, []);
  const countHeadboard = useMemo(() => WALL_COLLECTIONS.filter((i) => i.category === 'headboard').length, []);

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
            'radial-gradient(circle at 50% 20%, rgba(197, 168, 128, 0.08) 0%, transparent 70%), radial-gradient(circle at 80% 80%, rgba(20, 19, 18, 0.8) 0%, #11100F 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* 1. HERO HEADER: PRO-DESIGNER MINIMAL, CLEAN & CRISP */}
        {/* ========================================================= */}
        <section className="pt-6 sm:pt-10 pb-4 text-center relative max-w-4xl mx-auto">
          {/* Atelier Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C5A880]/30 bg-[#1E1D1B]/80 text-[#C5A880] text-[11px] font-mono tracking-widest uppercase mb-5 backdrop-blur-sm shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Surfaces &amp; Headboards • Anna Nagar, Chennai</span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-[#FAF8F5] tracking-tight leading-[1.1] mb-4">
            Wall Paper, Wall Panel <br className="hidden sm:inline" />
            <span className="italic font-light text-[#C5A880]">&amp; Headboards</span>
          </h1>

          <p className="text-sm sm:text-base text-[#D3D0C9] max-w-2xl mx-auto font-light leading-relaxed">
            Custom acoustic fabric wall panels, panoramic wallpaper murals, and handcrafted upholstered headboard suites tailored in Anna Nagar.
          </p>
        </section>

        {/* ========================================================= */}
        {/* 2. FILTER TABS: SMOOTH, RESPONSIVE, CRISP */}
        {/* ========================================================= */}
        <section className="py-6 flex items-center justify-between flex-wrap gap-4 border-b border-white/10 mb-8 max-w-full">
          <div className="flex items-center gap-1.5 sm:gap-2 p-1 rounded-2xl bg-[#1A1918] border border-white/10 overflow-x-auto max-w-full no-scrollbar py-1 shrink-0">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-medium transition-all ${
                activeCategory === 'all'
                  ? 'bg-[#C5A880] text-[#141312] font-semibold shadow-md'
                  : 'text-[#FAF8F5]/70 hover:text-white'
              }`}
            >
              All Works ({WALL_COLLECTIONS.length})
            </button>

            <button
              onClick={() => setActiveCategory('wallpaper')}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-medium transition-all flex items-center gap-1.5 ${
                activeCategory === 'wallpaper'
                  ? 'bg-[#C5A880] text-[#141312] font-semibold shadow-md'
                  : 'text-[#FAF8F5]/70 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Wall Paper ({countWallpaper})</span>
            </button>

            <button
              onClick={() => setActiveCategory('panel')}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-medium transition-all flex items-center gap-1.5 ${
                activeCategory === 'panel'
                  ? 'bg-[#C5A880] text-[#141312] font-semibold shadow-md'
                  : 'text-[#FAF8F5]/70 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Wall Panels ({countPanel})</span>
            </button>

            <button
              onClick={() => setActiveCategory('headboard')}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-medium transition-all flex items-center gap-1.5 ${
                activeCategory === 'headboard'
                  ? 'bg-[#C5A880] text-[#141312] font-semibold shadow-md'
                  : 'text-[#FAF8F5]/70 hover:text-white'
              }`}
            >
              <BedDouble className="w-3.5 h-3.5" />
              <span>Headboards ({countHeadboard})</span>
            </button>
          </div>

          <div className="text-xs font-mono text-[#8A8782] hidden md:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
            <span>4 Wall Paper • 4 Wall Panels • 3 Headboards</span>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. SHOWCASE GRID: PRO-DESIGNER, CRISP CAPTIONS, INTERACTIVE */}
        {/* ========================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((piece) => (
            <ArtPieceCard
              key={piece.id}
              piece={piece}
              onInspect={() => setSelectedPiece(piece)}
            />
          ))}
        </section>

        {/* ========================================================= */}
        {/* 4. RESIDENTIAL CONSULTATION CALLOUT */}
        {/* ========================================================= */}
        <section className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#1C1B19] via-[#161514] to-[#1C1B19] border border-[#C5A880]/30 relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880] block mb-2">
              Tactile On-Site Presentation
            </span>
            <h3 className="font-editorial text-2xl sm:text-3xl text-white mb-3">
              Touch &amp; Feel the Genuine Swatches at Your Residence
            </h3>
            <p className="text-xs sm:text-sm text-[#D3D0C9] mb-6 leading-relaxed">
              Photos cannot replace the tactile weight of genuine velvet and textured wall papers. Our master installers carry sample boxes with acoustic cores, velvet swatches, and wallpaper books directly to your site across Chennai and Tamil Nadu.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/919940498877?text=${encodeURIComponent(
                  'Hello A-Decor, I would like to schedule an on-site sample consultation for Wall Panels & Wallpaper in Chennai.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full bg-[#25D366] text-white hover:bg-[#20ba59] font-medium text-xs tracking-wider uppercase inline-flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Book On-Site Swatch Visit</span>
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
        <InspectorModal
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
// SUBCOMPONENT: ART PIECE CARD WITH INTERACTIVE SHEEN & CRISP CAPTION
// =========================================================================
interface ArtPieceCardProps {
  piece: WallArtPiece;
  onInspect: () => void;
}

const ArtPieceCard: React.FC<ArtPieceCardProps> = ({ piece, onInspect }) => {
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
          className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
        />

        {/* Ambient Tone Bottom Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#161514] via-[#161514]/20 to-transparent" />

        {/* Top Floating Badges */}
        <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-10 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-mono tracking-widest text-[#C5A880] border border-white/10">
            {String(piece.order).padStart(2, '0')} / {WALL_COLLECTIONS.length}
          </span>

          <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-mono tracking-wider uppercase text-white/90 border border-white/10">
            {piece.tag}
          </span>
        </div>

        {/* Hover Center Inspect Pill */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
          <span className="px-4 py-2 rounded-full bg-[#141312]/90 backdrop-blur-md border border-[#C5A880] text-[#C5A880] text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 shadow-2xl">
            <Eye className="w-3.5 h-3.5" />
            <span>Inspect Piece</span>
          </span>
        </div>
      </div>

      {/* Card Body - Short & Crisp Pro-Designer Typography */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
              {piece.category === 'headboard' ? 'Custom Headboard' : piece.category === 'panel' ? 'Acoustic Panel' : 'Mural Wallpaper'}
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
interface InspectorModalProps {
  piece: WallArtPiece;
  copiedHex: string | null;
  onCopyHex: (hex: string) => void;
  onClose: () => void;
}

const InspectorModal: React.FC<InspectorModalProps> = ({
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
        {/* Close Button (Min 44x44px touch target) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white hover:bg-[#C5A880] hover:text-[#141312] hover:border-[#C5A880] flex items-center justify-center transition-all shadow-xl"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Pro Exhibition Image Stage */}
        <div className="w-full md:w-3/5 lg:w-2/3 relative bg-[#0B0A0A] flex flex-col justify-between overflow-hidden h-[38vh] sm:h-[44vh] md:h-full shrink-0 border-b md:border-b-0 md:border-r border-white/10">
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
              {piece.category === 'headboard'
                ? 'Bespoke Upholstered Headboard'
                : piece.category === 'panel'
                  ? 'Acoustic Fabric Wall Panel'
                  : 'Designer Panoramic Wallpaper'}
            </span>
            <span className="text-[#C5A880] tracking-wider">
              Atelier Anna Nagar, Chennai
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
                <span className="text-[#8A8782]">Finish &amp; Textile</span>
                <span className="font-medium text-white text-right">{piece.finish}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-[#8A8782]">Acoustic / Care</span>
                <span className="font-medium text-[#C5A880] text-right">{piece.acousticOrWashability}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-[#8A8782]">Substrate Core</span>
                <span className="font-medium text-white text-right max-w-[60%]">{piece.substrate}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-[#8A8782]">Best Suited For</span>
                <span className="font-medium text-white text-right">{piece.recommendedRoom}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="text-[#8A8782]">Dimensions</span>
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
                  piece.category === 'headboard'
                    ? 'Bespoke Headboard'
                    : piece.category === 'panel'
                      ? 'Acoustic Wall Panel'
                      : 'Designer Wallpaper'
                }). Could we schedule an on-site inspection in Chennai?`
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
