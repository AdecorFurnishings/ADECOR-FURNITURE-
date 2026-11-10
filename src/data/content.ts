export interface BrandAddress {
  street: string;
  area: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
  landmark: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
  badge?: string;
}

export interface RomanBlindStyle {
  id: string;
  name: string;
  description: string;
  image: string;
  bestFor: string;
  fabricRecommendation: string;
  stackStyle: string;
}

export interface CurtainPleatStyle {
  id: string;
  name: string;
  fullness: string;
  description: string;
  image: string;
  aesthetic: string;
  hardware: string;
}

export interface FabricSwatch {
  id: string;
  name: string;
  hex: string;
  secondaryHex?: string;
  textureType: 'velvet' | 'linen' | 'silk' | 'chenille' | 'blackout' | 'brocade';
  description: string;
}

export interface ClientItem {
  id: string;
  name: string;
  logo: string;
  logoTransparent: string;
  industry: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'curtains' | 'blinds' | 'wall-panels' | 'wallpaper' | 'flooring' | 'sofa';
  categoryLabel: string;
  image: string;
  location: string;
  description: string;
}

export const SITE_CONTENT = {
  brand: {
    name: "A-Decor",
    legalName: "A Decor Perfect Home",
    headline: "Beautiful Home",
    tagline: "Perfect Home For Your Precious Family!",
    foundedYear: 2004,
    establishedText: "Since 2004",
    phoneDisplay: "+91 98411 34665 / 95009 33322",
    phones: ["+919841134665", "+919500933322"],
    whatsapp: "+919841134665",
    email: "adecorperfecthome@gmail.com",
    website: "www.adecorperfecthome.com",
    address: {
      street: "Old No. 457, New No. 726",
      area: "Nandanam",
      city: "Chennai",
      pincode: "600 035",
      state: "Tamil Nadu",
      country: "India",
      landmark: "Prime Nandanam Corridor near Anna Salai & CIT Nagar"
    } as BrandAddress,
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.822851174987!2d80.23462117582522!3d13.03050181395561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526703565e3783%3A0xe54e3cbafc0c22d!2sNandanam%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    socials: {
      whatsapp: "https://wa.me/919841134665?text=Hello%20A-Decor%2C%20I%20would%20like%20to%20schedule%20an%20interior%20consultation.",
      instagram: "https://instagram.com/adecorperfecthome",
      facebook: "https://facebook.com/adecorperfecthome",
      youtube: "https://youtube.com/@adecorperfecthome",
      pinterest: "https://pinterest.com/adecorperfecthome",
      twitter: "https://twitter.com/adecorchennai",
      snapchat: "https://snapchat.com/add/adecorchennai"
    },
    qrCodeImage: "/images/contact/qr_code.png",
    mapImage: "/images/contact/map_nandanam.jpg"
  },

  about: {
    heroTitle: "Bespoke Interiors Since 2004",
    leadParagraph: "A-Decor crafts classic and innovative interior furnishings for homes and offices. We create environments where you feel effortlessly comfortable and inspired.",
    bodyParagraph1: "Our expertise spans bespoke curtains, soft furnishings, motorized blinds, rugs, acoustic wall panels, and master furniture reupholstery.",
    bodyParagraph2: "Founded in Nandanam, Chennai. We offer complimentary on-site design consultation and laser measuring across all of Tamil Nadu.",
    values: [
      {
        title: "Millimeter Precision",
        desc: "Tailored to your exact architectural window reveals."
      },
      {
        title: "Statewide Visits",
        desc: "On-site fabric curation across Chennai & Tamil Nadu."
      },
      {
        title: "Trusted Legacy",
        desc: "Over 20 years of craftsmanship for premier homes & luxury hotels."
      }
    ],
    stats: [
      { value: "20+", label: "Years of Craft", sub: "Est. 2004 in Nandanam" },
      { value: "12,500+", label: "Installations", sub: "Chennai & Tamil Nadu" },
      { value: "100%", label: "On-Site Measuring", sub: "Anywhere in Tamil Nadu" },
      { value: "9+", label: "Marquee Clients", sub: "Hilton, Apollo, TVS & More" }
    ]
  },

  services: [
    {
      id: "curtains",
      name: "Bespoke Curtains",
      tagline: "Architectural Drapes & 13 Custom Pleat Silhouettes",
      description: "From cascading ripple folds to regal double and triple pinch pleats, crafted with acoustic lining and whisper-quiet motorization.",
      features: ["13 signature pleats", "Acoustic & blackout linings", "Somfy & Tuya smart motorization", "Hand-finished weighted hems"],
      image: "/images/hd/curtains_sheer.jpg",
      badge: "Signature Craft"
    },
    {
      id: "blinds",
      name: "Roman & Motorized Blinds",
      tagline: "12 Tailored Stack Styles & Whisper-Quiet Automation",
      description: "Precision-engineered Roman shades in hobbled, waterfall, flat, and balloon folds with remote and smart app control.",
      features: ["12 distinct folding geometries", "Solar glare & dual-light filtering", "Whisper-quiet electric lift", "Over 400 imported fabrics"],
      image: "/images/hd/roman_blinds.jpg",
      badge: "Popular"
    },
    {
      id: "sofa-refurbishing",
      name: "Sofa Refurbishing & Re-Upholstery",
      tagline: "Revive Cherished Furniture with Master Craftsmanship",
      description: "Save your solid teak frame. We dismantle to the skeleton, fortify joints, inject 40+ density ergonomic foam, and wrap in luxury velvet or leather.",
      features: ["Free on-site inspection in Chennai", "40+ density ergonomic foam rebuild", "Italian velvet, bouclé & leather", "Free pick-up and delivery"],
      image: "/images/hd/sofa_luxury.jpg"
    },
    {
      id: "wall-panels",
      name: "Acoustic & Fabric Wall Panels",
      tagline: "Architectural Texture & Soundproof Luxury",
      description: "Geometric and channel padded wall panelling for master bedrooms, home theatres, and executive boardrooms.",
      features: ["Class-A sound absorption", "Geometric & rectangular channels", "Perimeter LED shadow gaps", "Flame-retardant upholstery"],
      image: "/images/hd/wall_panel.jpg"
    },
    {
      id: "designer-headboards",
      name: "Designer Headboards",
      tagline: "Sculptural Bedroom Centerpieces",
      description: "Floor-to-ceiling upholstered headboards with deep diamond tufting, fluting, and integrated reading light niches.",
      features: ["Architectural ceiling heights", "Deep diamond & wingback tufting", "Integrated USB & light recesses", "Velvet, linen, bouclé & leather"],
      image: "/images/hd/headboard_suite.jpg"
    },
    {
      id: "wallpaper",
      name: "Designer Wallpaper",
      tagline: "3D Optical Murals & Hand-Woven Textures",
      description: "Imported textured wall coverings, architectural 3D perspective murals, and hand-woven Japanese grasscloth.",
      features: ["Seamless installation", "Scrub-resistant washable vinyl", "Bespoke size-to-wall printing", "Moisture-resistant adhesives"],
      image: "/images/hd/wallpaper_art.jpg"
    },
    {
      id: "flooring",
      name: "Hardwood & Luxury Flooring",
      tagline: "Engineered Oak, Parquet & Chevron Planks",
      description: "Authentic oak parquet, herringbone designs, and durable acoustic waterproof luxury planks.",
      features: ["Waterproof click-lock systems", "Natural oiled European oak", "Commercial AC4/AC5 durability", "Silent acoustic underlayment"],
      image: "/images/hd/flooring_oak.jpg"
    }
  ] as ServiceItem[],

  romanBlindStyles: [
    {
      id: "hobbled",
      name: "Hobbled",
      description: "Cascading, gentle loops of fabric remain soft and billowed even when drawn down.",
      image: "/images/blinds/hobbled.jpg",
      bestFor: "Living rooms & dining salons",
      fabricRecommendation: "Textured damask & rich jacquards",
      stackStyle: "Deep cascading pleat bundle"
    },
    {
      id: "back-slat",
      name: "Back Slat",
      description: "Concealed rear battens create an unblemished front face with crisp horizontal folds.",
      image: "/images/blinds/back_slat.jpg",
      bestFor: "Minimalist and striped windows",
      fabricRecommendation: "Crisp linen & vertical stripes",
      stackStyle: "Tailored horizontal stacking"
    },
    {
      id: "waterfall",
      name: "Waterfall",
      description: "Cascades forward from the headrail, concealing hardware in descending tiers.",
      image: "/images/blinds/waterfall.jpg",
      bestFor: "Ceiling-recessed windows",
      fabricRecommendation: "Loomed textured weaves",
      stackStyle: "Smooth forward cascade"
    },
    {
      id: "front-slat",
      name: "Front Slat",
      description: "Graphic horizontal slat pockets sewn on the front face for architectural rhythm.",
      image: "/images/blinds/front_slat.jpg",
      bestFor: "Contemporary lofts & studios",
      fabricRecommendation: "Structured canvas & linens",
      stackStyle: "Defined tiered fold"
    },
    {
      id: "relaxed",
      name: "Relaxed",
      description: "Unstructured center allows the hem to sway into a graceful European curve.",
      image: "/images/blinds/relaxed.jpg",
      bestFor: "Bedrooms & reading nooks",
      fabricRecommendation: "Soft washed linen & cotton slub",
      stackStyle: "Gentle center-draped curve"
    },
    {
      id: "motorized",
      name: "Motorized",
      description: "Whisper-quiet automated electric lift with smartphone and voice control.",
      image: "/images/blinds/motorized.jpg",
      bestFor: "Double-height & smart homes",
      fabricRecommendation: "Acoustic weave & blackout",
      stackStyle: "One-touch automated lift"
    },
    {
      id: "flat",
      name: "Flat",
      description: "Seamless single panel lies completely smooth when lowered, showcasing intricate motifs.",
      image: "/images/blinds/flat.jpg",
      bestFor: "Graphic prints & florals",
      fabricRecommendation: "Embroidered silks & jacquards",
      stackStyle: "Clean accordion stack"
    },
    {
      id: "slouched",
      name: "Slouched",
      description: "Gathers casually at the hemline with an intentional, tactile pooling of fabric.",
      image: "/images/blinds/slouched.jpg",
      bestFor: "Coastal villas & morning rooms",
      fabricRecommendation: "Camel wool & heavy linens",
      stackStyle: "Casual gathered base"
    },
    {
      id: "butterfly",
      name: "Butterfly",
      description: "Theatrical double-winged contour that sweeps outward from dual pinch points.",
      image: "/images/blinds/butterfly.jpg",
      bestFor: "Vanities & dressing boudoirs",
      fabricRecommendation: "Crisp taffeta & shantung",
      stackStyle: "Flared dual-wing hem"
    },
    {
      id: "box-pleat-balloon",
      name: "Box Pleat Balloon",
      description: "Inverted box pleats at the top release into billowed pouches along the hemline.",
      image: "/images/blinds/box_pleat_balloon.jpg",
      bestFor: "Heritage estates & salons",
      fabricRecommendation: "Gold brocade & satin",
      stackStyle: "Sculptural balloon scallops"
    },
    {
      id: "austrian",
      name: "Austrian",
      description: "Continuous vertical shirring creates dramatic rows of ruched scalloped swags.",
      image: "/images/blinds/austrian.jpg",
      bestFor: "Staircases & luxury suites",
      fabricRecommendation: "Sheer organza & fine voiles",
      stackStyle: "Ruched cascading swags"
    },
    {
      id: "shirred-balloon",
      name: "Shirred Balloon",
      description: "Pencil-pleat heading releases generous gathers into a puffy cloud-like hemline.",
      image: "/images/blinds/shirred_balloon.jpg",
      bestFor: "Classic colonial residences",
      fabricRecommendation: "Lustrous gold silk & chintz",
      stackStyle: "Cloud-like puffed hemline"
    }
  ] as RomanBlindStyle[],

  curtainPleatStyles: [
    {
      id: "double-pinch-pleat",
      name: "Double Pinch Pleat",
      fullness: "2.0x Fullness",
      description: "Two folds pinched firmly together at the heading base. Elegant and versatile.",
      image: "/images/curtains/double_pinch_pleat.jpg",
      aesthetic: "Timeless contemporary luxury",
      hardware: "Poles with rings or concealed tracks"
    },
    {
      id: "triple-pinch-pleat",
      name: "Triple Pinch Pleat",
      fullness: "2.5x - 3.0x Fullness",
      description: "The classic luxury gold standard. Deep fabric columns from ceiling to floor.",
      image: "/images/curtains/triple_pinch_pleat.jpg",
      aesthetic: "Formal, grand hotel elegance",
      hardware: "Decorative brass or iron drapery poles"
    },
    {
      id: "ripple-fold",
      name: "Ripple Fold",
      fullness: "1.8x - 2.2x Fullness",
      description: "Continuous fluid S-curve waves that glide effortlessly with zero bunching.",
      image: "/images/curtains/ripple_fold.jpg",
      aesthetic: "Modern architectural minimalism",
      hardware: "Ceiling-recessed ripple fold track"
    },
    {
      id: "fan-fold-pleat",
      name: "Fan Fold Pleat",
      fullness: "2.2x Fullness",
      description: "Pleats flare like an open paper fan, imparting geometric vertical rhythm.",
      image: "/images/curtains/fan_fold_pleat.jpg",
      aesthetic: "Transitional and neo-classical",
      hardware: "Track or pole mounting"
    },
    {
      id: "goblet-pleat",
      name: "Goblet Pleat",
      fullness: "2.5x Fullness",
      description: "Cylindrical wine-goblet headers stuffed to hold their grand 3D form.",
      image: "/images/curtains/goblet_pleat.jpg",
      aesthetic: "Stately dining and period rooms",
      hardware: "Heavy decorative curtain rods"
    },
    {
      id: "inverted-box-pleat",
      name: "Inverted Box Pleat",
      fullness: "2.0x Fullness",
      description: "Folds meet in the rear, creating a flat front with compact stack-back.",
      image: "/images/curtains/inverted_box_pleat.jpg",
      aesthetic: "Tailored architectural clean look",
      hardware: "Hidden ceiling tracks or slim rods"
    },
    {
      id: "tailored-pleat",
      name: "Tailored Pleat",
      fullness: "2.0x Fullness",
      description: "Pinching occurs at the very top edge, yielding sleek vertical falls.",
      image: "/images/curtains/tailored_pleat.jpg",
      aesthetic: "Metropolitan interior styling",
      hardware: "Flush ceiling pelmets & tracks"
    },
    {
      id: "pinch-pleat",
      name: "Pinch Pleat",
      fullness: "2.2x Fullness",
      description: "Deep classic gathers delivering consistent drape spacing ceiling to hem.",
      image: "/images/curtains/pinch_pleat.jpg",
      aesthetic: "Traditional residential drapery",
      hardware: "Standard curtain rods or tracks"
    },
    {
      id: "inverted-pleat",
      name: "Inverted Pleat",
      fullness: "1.8x Fullness",
      description: "Reverse-sewn pleats that stack tightly inside narrow window returns.",
      image: "/images/curtains/inverted_pleat.jpg",
      aesthetic: "Minimalist compact solutions",
      hardware: "Recessed architectural track"
    },
    {
      id: "grommet",
      name: "Grommet (Eyelet)",
      fullness: "1.8x Fullness",
      description: "Metal eyelets set into the fabric, threading directly onto an exposed rod.",
      image: "/images/curtains/grommet.jpg",
      aesthetic: "Casual modern loft styling",
      hardware: "Exposed metal pole (25-38mm)"
    },
    {
      id: "goblet",
      name: "Goblet Standard",
      fullness: "2.2x Fullness",
      description: "Classic chalice silhouette delivering grandeur across high ceilings.",
      image: "/images/curtains/goblet.jpg",
      aesthetic: "Regal classic master suites",
      hardware: "Antique brass or wooden poles"
    },
    {
      id: "cubicle",
      name: "Cubicle / Hospital Track",
      fullness: "1.5x Fullness",
      description: "Heavy-duty wheeled gliders for smooth healthcare and commercial partition tracks.",
      image: "/images/curtains/cubicle.jpg",
      aesthetic: "Healthcare & clinical suites",
      hardware: "Extruded aluminum cubicle track"
    },
    {
      id: "rod-pocket",
      name: "Rod Pocket",
      fullness: "2.0x Fullness",
      description: "Continuous fabric tunnel gathered directly over a slender rod.",
      image: "/images/curtains/rod_pocket.jpg",
      aesthetic: "Cottage charm & sheer panels",
      hardware: "Slim concealed sash or pole"
    }
  ] as CurtainPleatStyle[],

  fabricSwatches: [
    {
      id: "ivory-damask",
      name: "Ivory Silk Damask",
      hex: "#F4EFE6",
      secondaryHex: "#E2DDD2",
      textureType: "silk",
      description: "Lustrous woven raw silk with pearlescent sheen."
    },
    {
      id: "champagne-luster",
      name: "Champagne Luster",
      hex: "#E6DAC8",
      secondaryHex: "#CDBFA8",
      textureType: "silk",
      description: "Warm golden-undertoned champagne with metallic micro-threads."
    },
    {
      id: "slate-velvet",
      name: "Midnight Slate Velvet",
      hex: "#43525B",
      secondaryHex: "#2E3A41",
      textureType: "velvet",
      description: "High-density heavy drape velvet with deep light absorption."
    },
    {
      id: "peacock-teal",
      name: "Peacock Teal Linen",
      hex: "#2F4852",
      secondaryHex: "#1E3139",
      textureType: "linen",
      description: "Artisanal loomed linen in saturated South Indian peacock teal."
    },
    {
      id: "nandanam-taupe",
      name: "Nandanam Sandal Taupe",
      hex: "#787067",
      secondaryHex: "#5E564E",
      textureType: "chenille",
      description: "Warm greige-taupe echoing the signature A-Decor architectural palette."
    },
    {
      id: "terracotta-rust",
      name: "Madras Terracotta Rust",
      hex: "#9E563E",
      secondaryHex: "#7B3E29",
      textureType: "linen",
      description: "Rich earth pigment reflecting warm sunset tones."
    },
    {
      id: "nilgiri-sage",
      name: "Nilgiri Sage Chenille",
      hex: "#707E6D",
      secondaryHex: "#566254",
      textureType: "chenille",
      description: "Botanical green with tactile ribbed softness."
    },
    {
      id: "imperial-brass",
      name: "Imperial Brass Brocade",
      hex: "#A88851",
      secondaryHex: "#856937",
      textureType: "brocade",
      description: "Opulent muted brass that catches ambient warm lighting."
    },
    {
      id: "onyx-noir",
      name: "Onyx Blackout Weave",
      hex: "#242322",
      secondaryHex: "#151413",
      textureType: "blackout",
      description: "100% total room-darkening weave with sound dampening."
    },
    {
      id: "forest-emerald",
      name: "Deep Forest Emerald",
      hex: "#284235",
      secondaryHex: "#192B22",
      textureType: "velvet",
      description: "Jewel-toned botanical velvet for layered salon living."
    }
  ] as FabricSwatch[],

  sofaRefurbishing: {
    heroTitle: "Sofa Refurbishing & Re-Upholstery",
    heroSubtitle: "Save your solid teak frame. Fortify comfort with high-density ergonomic foam and world-class fabrics.",
    beforeImage: "/images/hd/sofa_vintage.jpg",
    afterImage: "/images/hd/sofa_luxury.jpg",
    processSteps: [
      {
        stepNumber: "01",
        title: "On-Site Frame Diagnosis",
        desc: "Our master carpenter inspects joints, springs, and frame integrity."
      },
      {
        stepNumber: "02",
        title: "Fabric & Foam Curation",
        desc: "Choose from 300+ velvets, bouclés, linens, and stain-guarded leathers."
      },
      {
        stepNumber: "03",
        title: "Master Structural Rebuild",
        desc: "Dismantled to the bone, fresh webbing, and 40+ density ergonomic foam cores."
      },
      {
        stepNumber: "04",
        title: "White-Glove Delivery",
        desc: "Double-needle stitching inspection, steam press, and room placement."
      }
    ],
    fabricOptions: [
      { id: "emerald-plush", name: "Forest Emerald Plush", hex: "#1E4738" },
      { id: "velvet-petrol", name: "Designer Slate Velvet", hex: "#284C59" },
      { id: "terracotta", name: "Madras Terracotta", hex: "#9E462F" },
      { id: "sand-linen", name: "Warm Sandstone Bouclé", hex: "#D6CEC2" },
      { id: "navy-monarch", name: "Midnight Navy Silk", hex: "#1E2C42" },
      { id: "charcoal-boucle", name: "Charcoal Bouclé", hex: "#2B2928" }
    ]
  },

  clients: [
    {
      id: "hilton",
      name: "Hilton Hotels & Resorts",
      logo: "/images/clients/hilton.png",
      logoTransparent: "/images/clients/hilton_transparent.png",
      industry: "Luxury Hospitality",
      description: "Bespoke blackout drapery and acoustic fabric wall paneling for presidential suites and executive rooms."
    },
    {
      id: "apollo-hospitals",
      name: "Apollo Hospitals",
      logo: "/images/clients/apollo_hospitals.png",
      logoTransparent: "/images/clients/apollo_hospitals_transparent.png",
      industry: "Healthcare & Clinics",
      description: "Anti-microbial cubicle track systems, specialized hygienic privacy curtains, and executive lounges."
    },
    {
      id: "tvs",
      name: "TVS Motor Company",
      logo: "/images/clients/tvs.png",
      logoTransparent: "/images/clients/tvs_transparent.png",
      industry: "Automotive & Corporate",
      description: "Corporate boardroom motorized solar blinds and executive conference draperies."
    },
    {
      id: "dlf",
      name: "DLF Building India",
      logo: "/images/clients/dlf.png",
      logoTransparent: "/images/clients/dlf_transparent.png",
      industry: "Real Estate & Infrastructure",
      description: "Furnishing model luxury apartments, clubhouse coverings, and designer reception backdrops."
    },
    {
      id: "nippo",
      name: "Nippo The Energy Powerhouse",
      logo: "/images/clients/nippo.png",
      logoTransparent: "/images/clients/nippo_transparent.png",
      industry: "Manufacturing",
      description: "Solar heat-reflective roller shades and executive office acoustic treatments."
    },
    {
      id: "vels-university",
      name: "Vels University",
      logo: "/images/clients/vels_university.png",
      logoTransparent: "/images/clients/vels_university_transparent.png",
      industry: "Higher Education",
      description: "Main auditorium stage velvet draperies and VIP guest house furnishings."
    },
    {
      id: "radisson",
      name: "Radisson Hotels",
      logo: "/images/clients/radisson.png",
      logoTransparent: "/images/clients/radisson_transparent.png",
      industry: "Global Hospitality",
      description: "Double pinch pleat sheer and blackout drape combinations across premier banquet halls."
    },
    {
      id: "ramada",
      name: "Ramada Hotels & Suites",
      logo: "/images/clients/ramada.png",
      logoTransparent: "/images/clients/ramada_transparent.png",
      industry: "Hospitality & Leisure",
      description: "Custom headboards, Roman shades, and refurbished lobby sofa suites."
    },
    {
      id: "ideal",
      name: "Ideal Beach Resort",
      logo: "/images/clients/ideal.png",
      logoTransparent: "/images/clients/ideal_transparent.png",
      industry: "Resorts & Coastal Escapes",
      description: "Moisture-resistant outdoor shades, coastal linen drapes, and patio furniture cushions."
    }
  ] as ClientItem[],

  gallery: [
    {
      id: "gal-1",
      title: "Penthouse Architectural Drapes",
      category: "curtains",
      categoryLabel: "Bespoke Curtains",
      image: "/images/hd/dining_drapes.jpg",
      location: "Private Villa, Boat Club Road, Chennai",
      description: "Floor-to-ceiling tailored drapes framed with motorized tracks and sheer linen under-layers."
    },
    {
      id: "gal-2",
      title: "Contemporary Living Room & Sheers",
      category: "curtains",
      categoryLabel: "Curtains & Soft Furnishings",
      image: "/images/hd/hero_penthouse.jpg",
      location: "Penthouse Suite, Poes Garden, Chennai",
      description: "Warm daylight filtration with double pinch pleat linen sheers and bespoke salon furniture."
    },
    {
      id: "gal-3",
      title: "Modern Architectural Roman Shade",
      category: "blinds",
      categoryLabel: "Roman Blinds",
      image: "/images/hd/roman_blinds.jpg",
      location: "Executive Residence, Nandanam, Chennai",
      description: "Tailored neutral Roman shade with precise batten folds and light filtering."
    },
    {
      id: "gal-4",
      title: "Hotel Suite Geometric Headboard",
      category: "wall-panels",
      categoryLabel: "Designer Headboards",
      image: "/images/hd/headboard_suite.jpg",
      location: "Luxury Apartment, RA Puram, Chennai",
      description: "Sculptural upholstered wall headboard with integrated warm ambient backlighting."
    },
    {
      id: "gal-5",
      title: "European Oak Herringbone Parquet",
      category: "flooring",
      categoryLabel: "Hardwood Flooring",
      image: "/images/hd/flooring_oak.jpg",
      location: "Bespoke Residence, ECR, Chennai",
      description: "Natural oiled engineered oak parquet with acoustic silent underlayment."
    },
    {
      id: "gal-6",
      title: "Artistic Textured Wall Mural",
      category: "wallpaper",
      categoryLabel: "Designer Wallpaper",
      image: "/images/hd/wallpaper_art.jpg",
      location: "Media Room, Alwarpet, Chennai",
      description: "High-fashion custom scale-printed wall covering with organic textural depth."
    },
    {
      id: "gal-7",
      title: "Fluted Acoustic Wall Paneling",
      category: "wall-panels",
      categoryLabel: "Wall Panels",
      image: "/images/hd/wall_panel.jpg",
      location: "Boardroom, Anna Salai, Chennai",
      description: "Padded acoustic channels with integrated shadow reveals."
    },
    {
      id: "gal-8",
      title: "Emerald Velvet Sofa Restoration",
      category: "sofa",
      categoryLabel: "Sofa Refurbishing",
      image: "/images/hd/sofa_luxury.jpg",
      location: "Heritage Residence, Mylapore, Chennai",
      description: "Teak frame overhaul and reupholstery in Italian emerald plush velvet."
    }
  ] as GalleryItem[]
};
