export interface BrandAddress {
  street: string;
  area: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
  landmark: string;
  full?: string;
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
  caption: string;
  materialSpec?: string;
  category: 'curtains' | 'blinds' | 'wall-panels' | 'wallpaper' | 'flooring' | 'sofa';
  categoryLabel: string;
  image: string;
  aspect?: 'portrait' | 'square' | 'landscape';
  focusPosition?: string;
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
    phoneDisplay: "+91 98411 34665",
    phones: ["+919841134665"],
    whatsapp: "+919841134665",
    email: "adecorfurnishings@gmail.com",
    website: "adecorfurnishings.vercel.app",
    websiteUrl: "https://adecorfurnishings.vercel.app/",
    address: {
      street: "B-1, 201/C-34, NR dave Complex, 2nd Avenue, 11th Main Rd, Corner",
      area: "Anna Nagar",
      city: "Chennai",
      pincode: "600040",
      state: "Tamil Nadu",
      country: "India",
      landmark: "2nd Avenue & 11th Main Rd Corner",
      full: "B-1, 201/C-34, NR dave Complex, 2nd Avenue, 11th Main Rd, Corner, Anna Nagar, Chennai, Tamil Nadu 600040"
    } as BrandAddress,
    hours: {
      weekdays: "Monday – Saturday: 10:00 AM – 8:30 PM",
      sunday: "Closed on Sundays",
      full: "Monday – Saturday: 10:00 AM – 8:30 PM (Closed on Sundays)"
    },
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.224725943547!2d80.20312737508732!3d13.084939312383534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267bb0ce35e7b%3A0xd68ae9530b377b86!2sA%20decor%20-%20furnishing%20show%20room%20in%20chennai!5e0!3m2!1sen!2sus!4v1794469637948!5m2!1sen!2sus",
    googleMapsUrl: "https://maps.app.goo.gl/X3CGpwfQyAUNG1VMA",
    socials: {
      whatsapp: "https://wa.me/919841134665?text=Hello%20A-Decor%2C%20I%20would%20like%20to%20schedule%20an%20interior%20consultation.",
      instagram: "https://instagram.com/adecorperfecthome",
      facebook: "https://facebook.com/adecorperfecthome",
      youtube: "https://youtube.com/@adecorperfecthome",
      pinterest: "https://pinterest.com/adecorperfecthome",
      twitter: "https://twitter.com/adecorchennai",
      snapchat: "https://snapchat.com/add/adecorchennai"
    },
    businessCardUrl: "https://qrfy.io/p/z4HauTXZRA?utm_source=qrcode&utm_medium=images&utm_campaign=60428530",
    qrCodeImage: "/images/contact/qr_code.png?v=9"
  },

  about: {
    heroTitle: "About Us",
    headline: "Classic & Innovative Design Since 2004",
    leadParagraph:
      "A-Decor offers both classic and innovative design solutions for home/office. Our aim is to help you put together the kind of environment in which you feel both comfortable and inspired. Our service provision encompasses all aspects of home/office interiors, including curtain rods, curtains, blinds, wallpaper, wall panel, and flooring.",
    heritageParagraph:
      "We launched in 2004 and welcome clients at our Anna Nagar, Chennai location, offering an onsite design consultation and measuring service focused on your requirements anywhere in Tamil Nadu and surrounding area.",
    offerings: [
      "Home / Office",
      "Curtain Rods",
      "Curtains",
      "Blinds",
      "Wall Paper",
      "Wall Panel",
      "Flooring",
      "Re Upholstery Work",
      "Mattress",
      "Head Boards",
      "Curtains and Roman Blinds Tailoring",
      "Curtains and Roman Blinds Washing"
    ],
    featuredClientIds: ["hilton", "apollo-hospitals", "tvs", "dlf", "radisson"]
  },

  services: [
    {
      id: "curtains",
      name: "Bespoke Curtains",
      tagline: "Architectural Drapes & Custom Pleat Silhouettes",
      description: "From cascading ripple folds to regal double and triple pinch pleats, crafted with acoustic lining and whisper-quiet motorization.",
      features: ["Signature bespoke pleats", "Acoustic & blackout linings", "Somfy & Tuya smart motorization", "Hand-finished weighted hems"],
      image: "/images/core/curtains.jpg",
      badge: "Signature Craft"
    },
    {
      id: "blinds",
      name: "Roman & Motorized Blinds",
      tagline: "Tailored Stack Styles & Whisper-Quiet Automation",
      description: "Precision-engineered Roman shades in hobbled, waterfall, flat, and balloon folds with remote and smart app control.",
      features: ["Distinct folding geometries", "Solar glare & dual-light filtering", "Whisper-quiet electric lift", "Over 400 imported fabrics"],
      image: "/images/core/blinds.jpg",
      badge: "Popular"
    },
    {
      id: "upholstery-rework",
      name: "Upholstery Rework",
      tagline: "Restore Solid Frames with Precision Foam & Couture Textiles",
      description: "Never discard heirloom seating. We strip fatigued covers to the bare solid hardwood chassis, rebuild webbing and 45+ density ergonomic cores, and tailor couture textiles.",
      features: ["On-site frame assessment across Chennai", "45+ density HR ergonomic comfort cores", "Pirelli cross-webbing & coil suspension reset", "Boutique chenille, bouclé, velvet & leather"],
      image: "/images/hd/upholstery_after.jpg",
      badge: "Master Craft"
    },
    {
      id: "wall-panels",
      name: "Acoustic & Fabric Wall Panels",
      tagline: "Architectural Texture & Soundproof Luxury",
      description: "Geometric and channel padded wall panelling for master bedrooms, home theatres, and executive boardrooms.",
      features: ["Class-A sound absorption", "Geometric & rectangular channels", "Perimeter LED shadow gaps", "Flame-retardant upholstery"],
      image: "/images/core/wall_panel.jpg"
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
      tagline: "Optical Murals & Hand-Woven Textures",
      description: "Imported textured wall coverings, architectural perspective murals, and hand-woven Japanese grasscloth.",
      features: ["Seamless installation", "Scrub-resistant washable vinyl", "Bespoke size-to-wall printing", "Moisture-resistant adhesives"],
      image: "/images/core/wallpaper.jpg"
    },
    {
      id: "flooring",
      name: "Hardwood & Luxury Flooring",
      tagline: "Engineered Oak, Parquet & Chevron Planks",
      description: "Authentic oak parquet, herringbone designs, and durable acoustic waterproof luxury planks.",
      features: ["Waterproof click-lock systems", "Natural oiled European oak", "Commercial AC4/AC5 durability", "Silent acoustic underlayment"],
      image: "/images/core/flooring.jpg"
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

  windowShadeStyles: [
    {
      id: "roller-shade",
      name: "Roller Shade",
      description: "Minimalist smooth-rolling fabric panel designed for crisp architectural window lines.",
      image: "/images/blinds/shade_roller.jpg",
      bestFor: "Contemporary residences & boardrooms",
      fabricRecommendation: "Solar screen & warm stone linen",
      stackStyle: "Ultra-compact rolled cassette"
    },
    {
      id: "venetian-blind",
      name: "Venetian Blind",
      description: "Precision-tilting horizontal louvers offering effortless modulation of daylight and privacy.",
      image: "/images/blinds/shade_venetian.jpg",
      bestFor: "Studies, kitchens & sunlit suites",
      fabricRecommendation: "Honey-oak & warm anodized slat",
      stackStyle: "Rotating horizontal louver stack"
    },
    {
      id: "sheer-roman-shade",
      name: "Sheer Roman Shade",
      description: "Translucent open-weave Roman drape diffusing harsh sun into a soft morning glow.",
      image: "/images/blinds/shade_sheer_roman.jpg",
      bestFor: "Living bays & garden verandas",
      fabricRecommendation: "Translucent Belgian voile weave",
      stackStyle: "Featherlight luminous fold"
    },
    {
      id: "bamboo-shade",
      name: "Bamboo Shade",
      description: "Fine matchstick-woven natural bamboo bringing airy botanical warmth indoors.",
      image: "/images/blinds/shade_bamboo.jpg",
      bestFor: "Sunrooms, balconies & coastal lounges",
      fabricRecommendation: "Natural split-bamboo fibers",
      stackStyle: "Organic rolled bamboo drape"
    },
    {
      id: "woven-wood-shade",
      name: "Woven Wood Shade",
      description: "Rich textured reed, jute, and hardwood fibers finished with a tailored front valance.",
      image: "/images/blinds/shade_woven_wood.jpg",
      bestFor: "Heritage villas & dining salons",
      fabricRecommendation: "Hand-loomed reed & teak fibers",
      stackStyle: "Textured valance cascade"
    },
    {
      id: "roman-shade",
      name: "Roman Shade",
      description: "Structured charcoal tailoring that folds cleanly into disciplined architectural tiers.",
      image: "/images/blinds/shade_roman.jpg",
      bestFor: "Master bedrooms & executive cabins",
      fabricRecommendation: "Heavy charcoal matte canvas",
      stackStyle: "Crisp stepped fold"
    },
    {
      id: "wooden-venetian-blinds",
      name: "Wooden Venetian Blinds",
      description: "Rich Look: Adds a classic, premium, and natural elegance to your interiors. Great Light Control: Slats can be easily tilted to adjust sunlight and privacy. Durable: Strong and long-lasting with proper care.",
      image: "/images/blinds/shade_wooden_venetian.jpg",
      bestFor: "Living rooms, dining salons & executive studies",
      fabricRecommendation: "Kiln-dried solid hardwood & rich timber slats",
      stackStyle: "Precision tilting horizontal louver ladder"
    },
    {
      id: "printed-roller-blinds",
      name: "Printed Roller Blinds",
      description: "Transform your space instantly with Printed Roller Blinds! They are the ultimate blend of style and function, bringing artistic flair and seamless light control.",
      image: "/images/blinds/shade_printed_roller.jpg",
      bestFor: "Artistic feature windows, bedrooms & designer lounges",
      fabricRecommendation: "High-definition printed canvas & textured solar screen",
      stackStyle: "Ultra-compact smooth-rolling cassette"
    },
    {
      id: "printed-zebra-blinds",
      name: "Printed Zebra Blinds",
      description: "Printed Zebra Blinds are modern window treatments featuring alternating sheer and solid fabric stripes. Adding a printed design brings unique patterns, textures, or artistic motifs across stripes, giving your windows a stylish, eye-catching look with effortless light and privacy control.",
      image: "/images/blinds/shade_printed_zebra.jpg",
      bestFor: "Statement living rooms, creative spaces & modern bedrooms",
      fabricRecommendation: "Artistic loomed dual-band sheer & opaque stripes",
      stackStyle: "Continuous loop dual-stripe cassette"
    },
    {
      id: "wooden-blind",
      name: "Wooden Blind",
      description: "Kiln-dried solid hardwood slats imparting rich grain texture and heritage depth.",
      image: "/images/blinds/shade_wooden.jpg",
      bestFor: "Libraries, studies & teak interiors",
      fabricRecommendation: "Stained solid basswood grain",
      stackStyle: "Deep timber slat ladder"
    },
    {
      id: "zebra-shade",
      name: "Zebra Blind",
      description: "Alternating sheer and solid fabric stripes engineered for modern daylight modulation and privacy.",
      image: "/images/blinds/shade_zebra.jpg",
      bestFor: "Modern living rooms & design studios",
      fabricRecommendation: "Geometric border jacquard & sheer horizontal bands",
      stackStyle: "Structured fold & tape cassette"
    },
    {
      id: "dual-roller-shade",
      name: "Dual Roller Shade",
      description: "Architectural framed channel system pairing daytime glare softness with evening seclusion.",
      image: "/images/blinds/shade_dual_roller.jpg",
      bestFor: "High-rise glass & executive suites",
      fabricRecommendation: "Framed textured sunscreen",
      stackStyle: "Guided side-rail cassette"
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
      description: "Cylindrical wine-goblet headers stuffed to hold their grand sculptural form.",
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
      id: "chennai-taupe",
      name: "Chennai Sandal Taupe",
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
    heroTitle: "Upholstery Rework",
    heroSubtitle: "Strip back fatigue down to bare seasoned timber. We rebuild structural suspension, engineered 45+ density comfort cores, and French-piped tailoring.",
    beforeImage: "/images/hd/upholstery_before.jpg",
    afterImage: "/images/hd/upholstery_after.jpg",
    processSteps: [
      {
        stepNumber: "01",
        title: "Chassis Strip & Joinery Audit",
        desc: "Bare-wood stripping, mortise-and-tenon dowel tightening, and Burmese teak conditioning."
      },
      {
        stepNumber: "02",
        title: "Webbing & Coil Suspension Reset",
        desc: "Cross-tensioned Italian Pirelli elastic webbing and acoustic edge-wire reinforcement."
      },
      {
        stepNumber: "03",
        title: "45+ HR Ergonomic Core Engineering",
        desc: "Multi-density high-resilience pocket foam sculpted with breathable silk-Dacron wrap."
      },
      {
        stepNumber: "04",
        title: "French Piping & Atelier Fitting",
        desc: "Laser-matched pattern layout, double-needle saddle lockstitching, and white-glove installation."
      }
    ],
    fabricOptions: [
      { id: "emerald-plush", name: "Forest Emerald Velvet (Shown)", hex: "#1A4538" },
      { id: "velvet-petrol", name: "Deep Lagoon Velvet", hex: "#1E4B5A" },
      { id: "terracotta", name: "Madras Terracotta", hex: "#9E462F" },
      { id: "sage-chenille", name: "Sage Olive Chenille", hex: "#6E765B" },
      { id: "navy-monarch", name: "Midnight Navy Velvet", hex: "#1B2C4A" },
      { id: "charcoal-boucle", name: "Charcoal Espresso Weave", hex: "#2A2827" }
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
      description: "Custom headboards, Roman shades, and reworked lobby upholstery suites."
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
      title: "Radial Sunburst Acoustic Suite",
      caption: "Backlit radial suede headboard wall with crimson velvet inlay.",
      materialSpec: "Acoustic Suede • LED Cove",
      category: "wall-panels",
      categoryLabel: "Acoustic Panels",
      image: "/images/gallery/real_sunburst_headboard_panel.jpg",
      aspect: "landscape",
      description: "Floor-to-ceiling radial acoustic wall panels with warm halo cove lighting and carved velvet headboard."
    },
    {
      id: "gal-12",
      title: "Curved Boucle Sofa (Before & After)",
      caption: "Bare hardwood chassis skeleton transformed into textured cream boucle.",
      materialSpec: "Hardwood Carcass • Cream Boucle Upholstery",
      category: "sofa",
      categoryLabel: "Upholstery Rework",
      image: "/images/rework/rework_boucle_composite.jpg",
      aspect: "portrait",
      description: "Full skeletal timber rebuild: bare chassis structure restored, 45+ HR cushioning, and seamless cream boucle tailoring."
    },
    {
      id: "gal-13",
      title: "Royal Peacock Chaise (Before & After)",
      caption: "Workshop bentwood carcass restored to diamond-tufted peacock teal velvet.",
      materialSpec: "Diamond Tufting • Brass Nailheads • Teal Velvet",
      category: "sofa",
      categoryLabel: "Upholstery Rework",
      image: "/images/rework/rework_chaise_composite.jpg",
      aspect: "landscape",
      description: "Workshop carcass restoration: hand-tied coil spring suspension, deep diamond button tufting, and continuous brass nailhead studs on antique cabriole frame."
    },
    {
      id: "gal-2",
      title: "Iridescent Plume Accent Mural",
      caption: "Sapphire, amber, and coral relief feather wall mural.",
      materialSpec: "Non-Woven Relief Canvas",
      category: "wallpaper",
      categoryLabel: "Mural Wallpaper",
      image: "/images/gallery/real_feather_3d_mural.jpg",
      aspect: "square",
      description: "Full-wall high-relief feather mural in sapphire, ochre gold, and coral tones behind natural teak seating."
    },
    {
      id: "gal-3",
      title: "Tensioned Pergola Wave Canopy",
      caption: "Retractable wave-fold garden canopy shielding harsh noon sun.",
      materialSpec: "UV Acrylic Canvas • SS Track",
      category: "blinds",
      categoryLabel: "Pergola & Shades",
      image: "/images/gallery/real_pergola_wave_canopy.jpg",
      aspect: "portrait",
      focusPosition: "50% 25%",
      description: "Retractable wave-fold pergola canopy riding along tensioned stainless guide cables for shaded terrace dining."
    },
    {
      id: "gal-4",
      title: "Regal Magenta Bow-Pelmet & Swags",
      caption: "Plum velvet cascading swag crowned with floral bow pelmet.",
      materialSpec: "Plum Velvet • Lace Voile",
      category: "curtains",
      categoryLabel: "Swag Drapery",
      image: "/images/gallery/real_magenta_swag_pelmet.jpg",
      aspect: "portrait",
      focusPosition: "50% 20%",
      description: "Asymmetrical plum velvet swag with sculpted bow pelmet box, braided tieback, and embroidered lace sheers."
    },
    {
      id: "gal-5",
      title: "Peacock Waterfall Panoramic Mural",
      caption: "Seamless peacock, waterfall, and sakura floral wallcovering.",
      materialSpec: "Washable Seamless Linen Vinyl",
      category: "wallpaper",
      categoryLabel: "Mural Wallpaper",
      image: "/images/gallery/real_peacock_3d_mural.jpg",
      aspect: "square",
      description: "Seamless floor-to-ceiling scenic mural blending royal peacocks, azure cascades, and blossoms."
    },
    {
      id: "gal-6",
      title: "Carved Four-Poster Ivory Canopy",
      caption: "Ivory organza canopy drapes paired with bronze jacquard curtains.",
      materialSpec: "Ivory Organza • Jacquard",
      category: "curtains",
      categoryLabel: "Canopy Drapery",
      image: "/images/gallery/real_canopy_bed_sheers.jpg",
      aspect: "landscape",
      description: "Sheer ivory canopy bed drapery with soft tiebacks coordinated with metallic bronze eyelet window curtains."
    },
    {
      id: "gal-7",
      title: "Recessed Charcoal Kitchen Blinds",
      caption: "Inset charcoal roller shades fitted cleanly inside corner frames.",
      materialSpec: "Moisture-Shielded Vinyl",
      category: "blinds",
      categoryLabel: "Roller Blinds",
      image: "/images/gallery/real_kitchen_roller_blinds.jpg",
      aspect: "landscape",
      description: "Flush-mounted charcoal blockout roller shades crafted for clean glare control inside modern corner windows."
    },
    {
      id: "gal-8",
      title: "Plum Taffeta Tiered-Valance Drapes",
      caption: "Mulberry silk-taffeta panels with triple-tier ruffled headers.",
      materialSpec: "Shimmer Taffeta • Matte Pole",
      category: "curtains",
      categoryLabel: "Eyelet Curtains",
      image: "/images/gallery/real_plum_valance_drapes.jpg",
      aspect: "square",
      focusPosition: "50% 25%",
      description: "Floor-to-ceiling mulberry taffeta panels finished with triple gathered valance ruffles and stainless grommets."
    },
    {
      id: "gal-9",
      title: "Heather Ash Flange-Border Drapes",
      caption: "Stonewashed slate linen curtains edged with crisp flange trim.",
      materialSpec: "Heather Linen • Brushed Rod",
      category: "curtains",
      categoryLabel: "Linen Curtains",
      image: "/images/gallery/real_ash_flange_drapes.jpg",
      aspect: "square",
      focusPosition: "50% 25%",
      description: "Heavy stonewashed ash linen drapery detailed with continuous hand-gathered vertical flange borders."
    },
    {
      id: "gal-10",
      title: "European Oak Herringbone Parquet",
      caption: "Natural oiled European oak boards on silent underlay.",
      materialSpec: "Engineered Oak • Cork Underlay",
      category: "flooring",
      categoryLabel: "Hardwood Flooring",
      image: "/images/core/flooring.jpg",
      aspect: "landscape",
      description: "Oiled engineered oak herringbone parquet laid over acoustic silent cork underlayment."
    },
    {
      id: "gal-11",
      title: "Emerald Velvet Upholstery Rework",
      caption: "Teak chassis reset, HR core, and French-piped emerald velvet.",
      materialSpec: "45+ HR Core • Emerald Velvet",
      category: "sofa",
      categoryLabel: "Upholstery Rework",
      image: "/images/hd/upholstery_after.jpg",
      aspect: "landscape",
      description: "Full frame reinforcement, Pirelli webbing reset, 45 kg/m³ HR cushioning, and Forest Emerald velvet rework."
    },
    {
      id: "gal-fl-1",
      title: "Velvet Plush Acoustic Master Carpet",
      caption: "High-tuft wall-to-wall acoustic comfort for luxury bedrooms.",
      materialSpec: "ActionBac • Whisper-Quiet Softness",
      category: "flooring",
      categoryLabel: "Acoustic Carpet",
      image: "/images/flooring/flooring_plush_acoustic_carpet.jpg",
      aspect: "portrait",
      description: "Deep cut-pile tufted acoustic carpet laid wall-to-wall with moisture-sealed cushioned underlay for master residences."
    },
    {
      id: "gal-fl-2",
      title: "Royal Blue Banquet & Hall Carpet",
      caption: "Imperial cobalt woven jacquard with gold fleur-de-lis motifs.",
      materialSpec: "Heavy-Traffic Woven • Gold Damask",
      category: "flooring",
      categoryLabel: "Hospitality Flooring",
      image: "/images/flooring/flooring_royal_blue_banquet_carpet.jpg",
      aspect: "portrait",
      description: "Woven heavy-duty commercial banquet carpet featuring regal gold crests over deep sapphire, built for high footfall halls."
    },
    {
      id: "gal-fl-3",
      title: "Landscape Balcony Artificial Turf",
      caption: "40mm high-density verdant lawn for private balconies and terraces.",
      materialSpec: "40mm 4-Tone • Rapid Drainage",
      category: "flooring",
      categoryLabel: "Outdoor Lawn Turf",
      image: "/images/flooring/flooring_balcony_artificial_turf.jpg",
      aspect: "portrait",
      description: "Perforated rapid-drain synthetic lawn with natural root thatch texture, UV-stabilized for Chennai tropical weather."
    },
    {
      id: "gal-fl-4",
      title: "Modular Charcoal Office Carpet Tiles",
      caption: "50x50cm quarter-turned geometric acoustic loop weave.",
      materialSpec: "Reinforced Bitumen • Anti-Static Loop",
      category: "flooring",
      categoryLabel: "Modular Carpet Tile",
      image: "/images/flooring/flooring_modular_office_carpet_tile.jpg",
      aspect: "portrait",
      description: "Heavy-traffic modular acoustic carpet tiles laid in a quarter-turn parquet format for modern corporate and conference spaces."
    },
    {
      id: "gal-wp-1",
      title: "Diamond Tufted Velvet Wall Panel",
      caption: "Ice-blue Belgian velvet diamond tufting with fluted border.",
      materialSpec: "NRC 0.85 • Ice Blue Velvet",
      category: "wall-panels",
      categoryLabel: "Acoustic Wall Panels",
      image: "/images/wall-panels/panel_diamond_tufted_iceblue.jpg",
      aspect: "portrait",
      description: "Architectural floor-to-ceiling bedroom headboard wall with crystal-button tufted velvet and fluted lacquer framing."
    },
    {
      id: "gal-wp-2",
      title: "Geometric Suede & Brass Lattice",
      caption: "Charcoal acoustic micro-suede cut with PVD gold channels.",
      materialSpec: "PVD Gold Reveal • Charcoal Suede",
      category: "wall-panels",
      categoryLabel: "Acoustic Wall Panels",
      image: "/images/wall-panels/panel_charcoal_geometric_brass.jpg",
      aspect: "portrait",
      description: "Precision-milled chevron soundproofing wall panels featuring titanium-coated brass reveals and recessed cove lighting."
    },
    {
      id: "gal-wp-3",
      title: "Minimal Cashmere Flush-Door Grid",
      caption: "Seamless acoustic greige cladding with integrated hidden pivot doors.",
      materialSpec: "Concealed Pivot • Greige Suede",
      category: "wall-panels",
      categoryLabel: "Acoustic Wall Panels",
      image: "/images/wall-panels/panel_modular_greige_flushdoor.jpg",
      aspect: "landscape",
      description: "Continuous modular wall-to-wall upholstery with secret flush pivot doors for uninterrupted minimalist interior lines."
    },
    {
      id: "gal-wp-4",
      title: "Petrol Teal Chevron Fluting",
      caption: "Sculpted velvet vertical divider with diagonal brass inlays.",
      materialSpec: "PVD Brass Reveal • Teal Velvet",
      category: "wall-panels",
      categoryLabel: "Acoustic Wall Panels",
      image: "/images/wall-panels/panel_teal_chevron_brass.jpg",
      aspect: "portrait",
      description: "Deep jewel-tone plush velvet fluting accented with angular gold inlay channels and concealed backlighting."
    },
    {
      id: "gal-wpr-1",
      title: "Tropical Arch Scenic Vista",
      caption: "Panoramic hand-painted botanical palms and alpine peaks.",
      materialSpec: "Non-Woven Canvas • Zero Glare",
      category: "wallpaper",
      categoryLabel: "Mural Wallpaper",
      image: "/images/wallpaper/wallpaper_tropical_arch_mural.jpg",
      aspect: "portrait",
      description: "Classical landscape panorama framed within architectural archways, printed with light-fast archival inks."
    },
    {
      id: "gal-wpr-2",
      title: "Heritage Baroque Damask Bronze",
      caption: "Tactile high-relief baroque acanthus scroll in bronze & taupe.",
      materialSpec: "Embossed Silk Vinyl • Scrubbable",
      category: "wallpaper",
      categoryLabel: "Luxury Wallpaper",
      image: "/images/wallpaper/wallpaper_heritage_damask_bronze.jpg",
      aspect: "portrait",
      description: "European palace damask with woven-fabric relief embossing and pearl metallic sheens catching wall sconces."
    },
    {
      id: "gal-wpr-3",
      title: "Strata Mineral Stone 3D Relief",
      caption: "Tactile split-face ashlar mineral brick without structural weight.",
      materialSpec: "3D Split-Face Mineral • Travertine",
      category: "wallpaper",
      categoryLabel: "Textured Wallpaper",
      image: "/images/wallpaper/wallpaper_textured_strata_stone.jpg",
      aspect: "portrait",
      description: "Realistic warm sandstone and travertine mineral relief creating organic architectural warmth."
    },
    {
      id: "gal-wpr-4",
      title: "Mughal Pavilion & Lotus Pond Mural",
      caption: "Imperial Rajasthani jharokha with peacocks and lotus pool.",
      materialSpec: "Gold Foil Inlay • Pistachio Silk",
      category: "wallpaper",
      categoryLabel: "Gilded Silk Mural",
      image: "/images/wallpaper/wallpaper_royal_mughal_peacock.jpg",
      aspect: "portrait",
      description: "Royal miniature art illustration with hand-painted wildlife, soothing pistachio ground, and metallic gold foil leaf accents."
    }
  ] as GalleryItem[]
};
