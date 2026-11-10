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
    heroTitle: "Crafting Timeless Sanctuaries Since 2004",
    leadParagraph: "A-Decor offers both classic and innovative design solutions for the home and office. Our aim is to help you put together the kind of environment in which you feel both comfortable and inspired.",
    bodyParagraph1: "Our service provision encompasses all aspects of interior design, from curtains, cushions, general soft furnishings, blinds, rugs, shutters to furniture and accessories.",
    bodyParagraph2: "We launched in 2004 in Nandanam, a prime location of Chennai and are able to offer an on-site design consultation and measuring service focused on your requirements anywhere in Tamil Nadu and the surrounding area.",
    values: [
      {
        title: "Bespoke Precision",
        desc: "Every drape, slat, panel, and stitch is calibrated to millimeter tolerance for your architectural space."
      },
      {
        title: "Statewide Consultation",
        desc: "Complimentary on-site measuring and design advisory throughout Chennai, Coimbatore, and all of Tamil Nadu."
      },
      {
        title: "Artisanal Integrity",
        desc: "Over two decades of trusted patronage with India's leading hotel chains, hospitals, and luxury residences."
      }
    ],
    stats: [
      { value: "20+", label: "Years of Craft", sub: "Established 2004" },
      { value: "12,500+", label: "Bespoke Drapes & Blinds", sub: "Handcrafted in Chennai" },
      { value: "100%", label: "On-Site Measuring", sub: "Anywhere in Tamil Nadu" },
      { value: "9+", label: "Marquee Enterprise Clients", sub: "Hilton, Apollo, TVS & More" }
    ]
  },

  services: [
    {
      id: "curtains",
      name: "Bespoke Curtains",
      tagline: "Architectural Drapes & 13 Custom Pleat Silhouettes",
      description: "From cascading ripple folds to regal double and triple pinch pleats, our custom curtains elevate acoustic warmth, natural light filtration, and grandeur.",
      features: ["13 signature pleat styles", "Acoustic thermal lining & blackout options", "Motorized Somfy / Tuya smart rails", "Hand-finished hems & weighted corners"],
      image: "/images/services/curtains.jpg",
      badge: "Signature Craft"
    },
    {
      id: "blinds",
      name: "Roman & Motorized Blinds",
      tagline: "12 Tailored Stack Styles & Automated Control",
      description: "Precision-engineered Roman shades in hobbled, waterfall, flat, and balloon iterations. Available in manual cordless or whisper-quiet smart automation.",
      features: ["12 distinct Roman folding geometries", "Solar control & dual-screen light filtering", "Whisper-quiet motorized integration", "Over 400 imported linen and jacquard textures"],
      image: "/images/services/blinds.jpg",
      badge: "Popular"
    },
    {
      id: "sofa-refurbishing",
      name: "Sofa Refurbishing & Re-Upholstery",
      tagline: "Revive Your Heirloom Furniture with Master Craftsmanship",
      description: "Give your cherished sofas and armchairs a second life. We strip to the core frame, fortify joints, inject high-density memory foam, and tailor world-class fabrics.",
      features: ["Complimentary inspection & pick-up in Chennai", "High-density 40+ density ergonomic foam rebuild", "Leatherette, Italian leather & stain-resistant velvet", "4-step meticulous artisan turnaround"],
      image: "/images/sofa/sofa_after.jpg",
      badge: "New Service"
    },
    {
      id: "wall-panels",
      name: "Acoustic & Fabric Wall Panels",
      tagline: "Architectural Texture, Acoustic Solitude & Luxury",
      description: "Custom upholstered geometric and channel wall panelling. Perfect for master suites, home theatres, boardroom acoustics, and luxury feature walls.",
      features: ["Class-A sound absorption options", "Bespoke rectangular, diamond and organic channels", "Integrated LED perimeter shadow gaps", "Flame-retardant upholstery fabrics"],
      image: "/images/services/wall_panel.jpg"
    },
    {
      id: "designer-headboards",
      name: "Designer Headboards",
      tagline: "Sculptural Master Bedroom Centerpieces",
      description: "Deep button-tufted, fluted, and geometric upholstered headboards built to custom bedroom ceiling heights with matching bedside pedestals.",
      features: ["Floor-to-ceiling architectural profiles", "Deep diamond tufting & wingback silhouettes", "Integrated reading light recesses & USB ports", "Velvet, linen, bouclé, and vegan leather finishes"],
      image: "/images/services/designer_headboards.jpg"
    },
    {
      id: "wallpaper",
      name: "Designer Wallpaper",
      tagline: "3D Optical Murals, Textured Grasscloth & Metallic Foils",
      description: "Breathtaking imported wall coverings ranging from trompe-l'œil 3D geometries to organic hand-woven Japanese grasscloth and subtle metallic patinas.",
      features: ["Seamless installation without visible joins", "Washable, scrub-resistant vinyl surfaces", "Custom size-to-wall scenic mural printing", "Anti-fungal and moisture-resistant adhesives"],
      image: "/images/services/wallpaper.jpg"
    },
    {
      id: "flooring",
      name: "Hardwood & Luxury Flooring",
      tagline: "Engineered Wood, Parquet & Premium Luxury Plank",
      description: "Warm, enduring foundations for gracious living. Authentic oak parquet, herringbone patterns, and durable high-traffic luxury vinyl planks.",
      features: ["Waterproof core click-lock systems", "Natural oiled & UV-lacquered real timber veneers", "Commercial AC4/AC5 abrasion durability", "Acoustic underlayment for silent steps"],
      image: "/images/services/flooring.jpg"
    }
  ] as ServiceItem[],

  romanBlindStyles: [
    {
      id: "hobbled",
      name: "Hobbled",
      description: "Cascading, gentle loops of fabric remain soft and billowed even when the shade is fully drawn down, creating opulent, dimensional texture.",
      image: "/images/blinds/hobbled.jpg",
      bestFor: "Master living rooms and formal dining areas",
      fabricRecommendation: "Textured damask, medium-weight jacquards",
      stackStyle: "Deep cascading pleat bundle"
    },
    {
      id: "back-slat",
      name: "Back Slat",
      description: "Features horizontal structural battens sewn on the backside, leaving a perfectly unblemished front face with crisp architectural horizontal folds.",
      image: "/images/blinds/back_slat.jpg",
      bestFor: "Striped patterns and modern minimalist windows",
      fabricRecommendation: "Crisp cotton-linen blends and vertical stripes",
      stackStyle: "Tight, tailored horizontal stacking"
    },
    {
      id: "waterfall",
      name: "Waterfall",
      description: "The fabric cascades smoothly from the front of the headrail, concealing hardware entirely and descending in flowing horizontal tiers.",
      image: "/images/blinds/waterfall.jpg",
      bestFor: "Ceiling-recessed and high-window installations",
      fabricRecommendation: "Loomed textured stripes and earth-toned weaves",
      stackStyle: "Forward-projecting smooth cascade"
    },
    {
      id: "front-slat",
      name: "Front Slat",
      description: "Exposes tailored horizontal slat pockets on the front fabric surface, offering a graphic, structured rhythm that accentuates window proportions.",
      image: "/images/blinds/front_slat.jpg",
      bestFor: "Contemporary lofts and office executive suites",
      fabricRecommendation: "Structured canvas, micro-weave linens",
      stackStyle: "Crisp defined tiered fold"
    },
    {
      id: "relaxed",
      name: "Relaxed",
      description: "Unstructured at the center, the bottom hem sways into a graceful, gentle scoop curve for an effortlessly breezy European look.",
      image: "/images/blinds/relaxed.jpg",
      bestFor: "Bedrooms, country villas, and reading nooks",
      fabricRecommendation: "Soft washed linen, cotton slub, duck-egg blue",
      stackStyle: "Gentle center-draped curve"
    },
    {
      id: "motorized",
      name: "Motorized",
      description: "State-of-the-art automated electric blind mechanism with whisper-quiet tubular motor, remote control, and smartphone app synchronization.",
      image: "/images/blinds/motorized.jpg",
      bestFor: "Double-height atrium windows and smart automation suites",
      fabricRecommendation: "High-spec acoustic weave and blackout fabrics",
      stackStyle: "Effortless one-touch automated lift"
    },
    {
      id: "flat",
      name: "Flat",
      description: "A seamless single panel of fabric lies completely smooth without horizontal seams when lowered, highlighting intricate prints and embroideries.",
      image: "/images/blinds/flat.jpg",
      bestFor: "Large graphic patterns, floral prints and damask motifs",
      fabricRecommendation: "Embroidered silks, rich jacquards",
      stackStyle: "Clean bottom-up accordion stack"
    },
    {
      id: "slouched",
      name: "Slouched",
      description: "Gathers loosely and casually at the hemline with an intentional, relaxed pooling of fabric that exudes tactile softness.",
      image: "/images/blinds/slouched.jpg",
      bestFor: "Casual coastal lounges and serene morning rooms",
      fabricRecommendation: "Rich camel wool blends, heavy linens",
      stackStyle: "Casual gathered base stack"
    },
    {
      id: "butterfly",
      name: "Butterfly",
      description: "A theatrical double-winged contour where the bottom sweeps outward from two vertical pinch points like unfurled butterfly wings.",
      image: "/images/blinds/butterfly.jpg",
      bestFor: "Romantic dressing rooms, vanity spaces, and boudoirs",
      fabricRecommendation: "Crisp taffeta, silk blend shantung",
      stackStyle: "Flared dual-wing scalloped hem"
    },
    {
      id: "box-pleat-balloon",
      name: "Box Pleat Balloon",
      description: "Crisp tailored inverted box pleats along the top header create structured billowed pouches at the hem, balancing geometry and volume.",
      image: "/images/blinds/box_pleat_balloon.jpg",
      bestFor: "Classical heritage estates and formal salon windows",
      fabricRecommendation: "Gold brocade, structured satin",
      stackStyle: "Sculptural balloon scallops"
    },
    {
      id: "austrian",
      name: "Austrian",
      description: "Richer and more theatrical than a balloon, featuring continuous vertical shirring that creates multiple rows of dramatic scalloped swags.",
      image: "/images/blinds/austrian.jpg",
      bestFor: "Grand staircases, luxury suites, and theatrical interiors",
      fabricRecommendation: "Sheer organza, fine voiles, champagne satin",
      stackStyle: "Ruched cascading swags"
    },
    {
      id: "shirred-balloon",
      name: "Shirred Balloon",
      description: "A gathered pencil-pleat top header releases generous gathers into a puffy, cloud-like gathered balloon hemline with romantic fullness.",
      image: "/images/blinds/shirred_balloon.jpg",
      bestFor: "Traditional nursery, heritage colonial interiors",
      fabricRecommendation: "Lustrous gold silk, polished chintz",
      stackStyle: "Cloud-like puffed hemline"
    }
  ] as RomanBlindStyle[],

  curtainPleatStyles: [
    {
      id: "double-pinch-pleat",
      name: "Double Pinch Pleat",
      fullness: "2.0x Fullness",
      description: "Two folds pinched firmly together at the base of the heading. Elegant, refined, and slightly less formal than a triple pinch.",
      image: "/images/curtains/double_pinch_pleat.jpg",
      aesthetic: "Timeless contemporary luxury",
      hardware: "Poles with rings or concealed curtain tracks"
    },
    {
      id: "triple-pinch-pleat",
      name: "Triple Pinch Pleat",
      fullness: "2.5x - 3.0x Fullness",
      description: "The gold standard of classical drapery. Three crisp folds gathered at the base create deep, sculptural fabric columns down to the floor.",
      image: "/images/curtains/triple_pinch_pleat.jpg",
      aesthetic: "Formal, grand, stately hotel elegance",
      hardware: "Decorative brass/wrought iron drapery poles"
    },
    {
      id: "ripple-fold",
      name: "Ripple Fold",
      fullness: "1.8x - 2.2x Fullness",
      description: "Continuous S-curve waves that glide effortlessly on specialized architectural tracks with zero bunching or distortion.",
      image: "/images/curtains/ripple_fold.jpg",
      aesthetic: "Modern architectural and minimalist luxury",
      hardware: "Ceiling-recessed ripple fold track system"
    },
    {
      id: "fan-fold-pleat",
      name: "Fan Fold Pleat",
      fullness: "2.2x Fullness",
      description: "Pleats that flare gently like an open paper fan at the header, imparting geometric precision and rhythmic verticality.",
      image: "/images/curtains/fan_fold_pleat.jpg",
      aesthetic: "Transitional and neo-classical homes",
      hardware: "Track or pole mounting"
    },
    {
      id: "goblet-pleat",
      name: "Goblet Pleat",
      fullness: "2.5x Fullness",
      description: "A cylindrical wine-goblet shape formed at the heading, stuffed with wadding to hold its grand three-dimensional form permanently.",
      image: "/images/curtains/goblet_pleat.jpg",
      aesthetic: "Stately dining rooms and period properties",
      hardware: "Heavy decorative curtain rods"
    },
    {
      id: "inverted-box-pleat",
      name: "Inverted Box Pleat",
      fullness: "2.0x Fullness",
      description: "Folds meet in the back, creating a crisp, flat front panel with hidden fullness that stacks compactly when pulled open.",
      image: "/images/curtains/inverted_box_pleat.jpg",
      aesthetic: "Clean, tailored, structured architectural look",
      hardware: "Hidden ceiling tracks or modern slim rods"
    },
    {
      id: "tailored-pleat",
      name: "Tailored Pleat",
      fullness: "2.0x Fullness",
      description: "Pinching occurs at the very top edge of the drape rather than lower down, creating clean vertical falls without flair.",
      image: "/images/curtains/tailored_pleat.jpg",
      aesthetic: "Sleek metropolitan interior styling",
      hardware: "Concealed tracks and flush ceiling pelmets"
    },
    {
      id: "pinch-pleat",
      name: "Pinch Pleat",
      fullness: "2.2x Fullness",
      description: "Deep, classic single or multi-finger pleats that stack neatly and provide consistent drape spacing from ceiling to hem.",
      image: "/images/curtains/pinch_pleat.jpg",
      aesthetic: "Traditional and versatile residential drapery",
      hardware: "Standard curtain rods or tracks"
    },
    {
      id: "inverted-pleat",
      name: "Inverted Pleat",
      fullness: "1.8x Fullness",
      description: "Pleats sewn on the reverse face so the front shows flat, sleek panels that stack very tightly inside narrow window returns.",
      image: "/images/curtains/inverted_pleat.jpg",
      aesthetic: "Minimalist and compact space solutions",
      hardware: "Recessed architectural track"
    },
    {
      id: "grommet",
      name: "Grommet (Eyelet)",
      fullness: "1.8x Fullness",
      description: "Metal circular rings set directly into the fabric top, threading seamlessly onto an exposed rod for bold, easy glides.",
      image: "/images/curtains/grommet.jpg",
      aesthetic: "Casual modern, industrial loft and youth rooms",
      hardware: "Exposed metal pole (25mm - 38mm diameter)"
    },
    {
      id: "goblet",
      name: "Goblet Standard",
      fullness: "2.2x Fullness",
      description: "Classic chalice silhouette with tailored button accents, delivering sculptural elegance across high-ceiling residences.",
      image: "/images/curtains/goblet.jpg",
      aesthetic: "Regal classic and luxury master bedroom suites",
      hardware: "Traditional wooden or antique brass poles"
    },
    {
      id: "cubicle",
      name: "Cubicle / Hospital Track",
      fullness: "1.5x Fullness",
      description: "Functional top webbing with heavy-duty wheeled gliders designed for continuous smooth operation across hospital partitions and commercial bays.",
      image: "/images/curtains/cubicle.jpg",
      aesthetic: "Healthcare, clinic suites and commercial partitioning",
      hardware: "Heavy-duty extruded aluminum cubicle track"
    },
    {
      id: "rod-pocket",
      name: "Rod Pocket",
      fullness: "2.0x Fullness",
      description: "A continuous sewn fabric tunnel along the top hem that slides directly over a curtain rod, producing soft, dense gathers.",
      image: "/images/curtains/rod_pocket.jpg",
      aesthetic: "Cottage charm, stationary sidelight panels and sheer curtains",
      hardware: "Slim concealed sash or decorative pole"
    }
  ] as CurtainPleatStyle[],

  fabricSwatches: [
    {
      id: "ivory-damask",
      name: "Ivory Silk Damask",
      hex: "#F4EFE6",
      secondaryHex: "#E2DDD2",
      textureType: "silk",
      description: "Lustrous woven raw silk in soft warm ivory with a natural pearlescent sheen."
    },
    {
      id: "champagne-luster",
      name: "Champagne Luster",
      hex: "#E6DAC8",
      secondaryHex: "#CDBFA8",
      textureType: "silk",
      description: "Warm golden-undertoned champagne with delicate metallic micro-threads."
    },
    {
      id: "slate-velvet",
      name: "Midnight Slate Velvet",
      hex: "#43525B",
      secondaryHex: "#2E3A41",
      textureType: "velvet",
      description: "High-density heavy drape velvet with deep light-absorbing pile and cool architectural presence."
    },
    {
      id: "peacock-teal",
      name: "Peacock Teal Linen",
      hex: "#2F4852",
      secondaryHex: "#1E3139",
      textureType: "linen",
      description: "Artisanal loomed linen in a rich, saturated Chennai peacock teal tone."
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
      description: "Rich earth pigment reflecting traditional South Indian clay and warm sunsets."
    },
    {
      id: "nilgiri-sage",
      name: "Nilgiri Sage Chenille",
      hex: "#707E6D",
      secondaryHex: "#566254",
      textureType: "chenille",
      description: "Subtle botanical green with tactile ribbed chenille softness and tranquil calm."
    },
    {
      id: "imperial-brass",
      name: "Imperial Brass Brocade",
      hex: "#A88851",
      secondaryHex: "#856937",
      textureType: "brocade",
      description: "Opulent muted gold and brass brocade weave that catches ambient warm lighting."
    },
    {
      id: "onyx-noir",
      name: "Onyx Blackout Weave",
      hex: "#242322",
      secondaryHex: "#151413",
      textureType: "blackout",
      description: "100% total room-darkening weave with acoustic sound-dampening backing."
    },
    {
      id: "forest-emerald",
      name: "Deep Forest Emerald",
      hex: "#284235",
      secondaryHex: "#192B22",
      textureType: "velvet",
      description: "Regal jewel-toned botanical velvet ideal for moody, layered salon living spaces."
    }
  ] as FabricSwatch[],

  sofaRefurbishing: {
    heroTitle: "Bespoke Sofa Refurbishing & Re-Upholstery",
    heroSubtitle: "Save your solid teak frame, elevate your comfort, and redefine your living space with world-class fabrics.",
    beforeImage: "/images/sofa/sofa_before.jpg",
    afterImage: "/images/sofa/sofa_after.jpg",
    processSteps: [
      {
        stepNumber: "01",
        title: "On-Site Inspection & Frame Diagnosis",
        desc: "Our master carpenter visits your home or office to evaluate frame integrity, joint strength, webbing elasticity, and spring tension."
      },
      {
        stepNumber: "02",
        title: "Bespoke Fabric & Foam Curation",
        desc: "Explore hundreds of imported velvets, textured chenilles, breathable linens, and stain-guarded leathers with tailored firmness samples."
      },
      {
        stepNumber: "03",
        title: "Artisanal Re-Crafting & Structural Rebuild",
        desc: "We dismantle down to the skeleton, re-glue hardwood joints, replace worn webbing with high-gauge springs, and build fresh 40+ density ergonomic foam cores."
      },
      {
        stepNumber: "04",
        title: "White-Glove Inspection & Showroom Delivery",
        desc: "Double-needle stitching inspection, steam pressing, protective dust packaging, and careful on-site placement in your room of choice."
      }
    ],
    fabricOptions: [
      { id: "velvet-petrol", name: "Designer Slate Velvet", hex: "#3C4B4E" },
      { id: "terracotta", name: "Tuscan Terracotta", hex: "#9E563E" },
      { id: "sand-linen", name: "Warm Sandstone Linen", hex: "#C7BEB2" },
      { id: "navy-monarch", name: "Royal Navy Damask", hex: "#223547" },
      { id: "emerald-plush", name: "Forest Emerald Plush", hex: "#264134" },
      { id: "charcoal-boucle", name: "Charcoal Bouclé", hex: "#302E2D" }
    ]
  },

  clients: [
    {
      id: "hilton",
      name: "Hilton Hotels & Resorts",
      logo: "/images/clients/hilton.png",
      logoTransparent: "/images/clients/hilton_transparent.png",
      industry: "Luxury Hospitality",
      description: "Bespoke blackout drapery and acoustic fabric wall paneling for presidential suites and executive guest rooms."
    },
    {
      id: "apollo-hospitals",
      name: "Apollo Hospitals",
      logo: "/images/clients/apollo_hospitals.png",
      logoTransparent: "/images/clients/apollo_hospitals_transparent.png",
      industry: "Healthcare & Specialized Clinics",
      description: "Anti-microbial cubicle track systems, specialized hygienic privacy curtains, and executive lounge furnishings."
    },
    {
      id: "tvs",
      name: "TVS Motor Company",
      logo: "/images/clients/tvs.png",
      logoTransparent: "/images/clients/tvs_transparent.png",
      industry: "Automotive & Corporate Headquarters",
      description: "Corporate boardroom motorized solar blinds, executive conference draperies, and reception lounge re-upholstery."
    },
    {
      id: "dlf",
      name: "DLF Building India",
      logo: "/images/clients/dlf.png",
      logoTransparent: "/images/clients/dlf_transparent.png",
      industry: "Real Estate & Infrastructure",
      description: "Furnishing model luxury apartments, clubhouse window coverings, and designer reception backdrops."
    },
    {
      id: "nippo",
      name: "Nippo The Energy Powerhouse",
      logo: "/images/clients/nippo.png",
      logoTransparent: "/images/clients/nippo_transparent.png",
      industry: "Industrial Manufacturing",
      description: "Solar heat-reflective roller shades and executive office acoustic treatments."
    },
    {
      id: "vels-university",
      name: "Vels University",
      logo: "/images/clients/vels_university.png",
      logoTransparent: "/images/clients/vels_university_transparent.png",
      industry: "Higher Education & Institutions",
      description: "Main auditorium stage velvet draperies, VIP guest house furnishings, and motorized lecture hall screens."
    },
    {
      id: "radisson",
      name: "Radisson Hotels",
      logo: "/images/clients/radisson.png",
      logoTransparent: "/images/clients/radisson_transparent.png",
      industry: "Global Hospitality",
      description: "Double pinch pleat sheer and blackout drape combinations across premier banquet halls and suites."
    },
    {
      id: "ramada",
      name: "Ramada Hotels & Suites",
      logo: "/images/clients/ramada.png",
      logoTransparent: "/images/clients/ramada_transparent.png",
      industry: "Hospitality & Leisure",
      description: "Custom headboards, Roman shades, and refurbished lobby sofa sets."
    },
    {
      id: "ideal",
      name: "Ideal Beach Resort",
      logo: "/images/clients/ideal.png",
      logoTransparent: "/images/clients/ideal_transparent.png",
      industry: "Resorts & Coastal Escapes",
      description: "Moisture-resistant outdoor shades, coastal linen drapes, and teak patio furniture cushions."
    }
  ] as ClientItem[],

  gallery: [
    {
      id: "gal-1",
      title: "Regal French Window Drapes",
      category: "curtains",
      categoryLabel: "Bespoke Curtains",
      image: "/images/gallery/furnishing_curtain_blue.jpg",
      location: "Private Villa, Boat Club Road, Chennai",
      description: "Custom floor-to-ceiling gathered duck-egg blue drapes framed with ornamental tiebacks and sheer linen under-layers."
    },
    {
      id: "gal-2",
      title: "Tufted Luxury Leather Feature Wall",
      category: "wall-panels",
      categoryLabel: "Wall Panels",
      image: "/images/gallery/gallery_hero_tufted.jpg",
      location: "Penthouse Suite, Poes Garden, Chennai",
      description: "Deep diamond button-tufted leather acoustic wall paneling behind a pristine white contemporary lounge."
    },
    {
      id: "gal-3",
      title: "Sunburst Fan-Pleated Roman Shade",
      category: "blinds",
      categoryLabel: "Roman Blinds",
      image: "/images/gallery/blinds_fan_fold.jpg",
      location: "Executive Residence, Nandanam, Chennai",
      description: "Sculptural charcoal fan-pleated Roman shade casting soft filtered daylight across garden bay windows."
    },
    {
      id: "gal-4",
      title: "Chandelier Master Suite with Geometric Headboard",
      category: "wall-panels",
      categoryLabel: "Designer Headboards",
      image: "/images/hero/bedroom_chandelier.jpg",
      location: "Luxury Apartment, RA Puram, Chennai",
      description: "Floor-to-ceiling geometric fluted panel headboard with mirrored brass inlay and warm ambient backlighting."
    },
    {
      id: "gal-5",
      title: "Hardwood Walnut Floor & Tailored Hallway",
      category: "flooring",
      categoryLabel: "Hardwood Flooring",
      image: "/images/gallery/flooring_hardwood.jpg",
      location: "Bespoke Residence, ECR, Chennai",
      description: "Rich natural oil finished engineered hardwood plank with continuous grain matching."
    },
    {
      id: "gal-6",
      title: "3D Sphere Optical Illusion Wallpaper",
      category: "wallpaper",
      categoryLabel: "Wallpaper",
      image: "/images/gallery/wallpaper_3d_sphere.jpg",
      location: "Media Room, Alwarpet, Chennai",
      description: "Seamless imported 3D optical perspective mural creating boundless spatial depth."
    },
    {
      id: "gal-7",
      title: "Vortex Monochrome Wallpaper & Salon Sofa",
      category: "wallpaper",
      categoryLabel: "Wallpaper & Furniture",
      image: "/images/hero/hero_sofa_vortex.jpg",
      location: "Architectural Studio, Nungambakkam, Chennai",
      description: "Dynamic spiral mural paired with tailored off-white sofa and custom textured cushions."
    },
    {
      id: "gal-8",
      title: "Horizontal Channel Charcoal Wall System",
      category: "wall-panels",
      categoryLabel: "Wall Panels",
      image: "/images/gallery/wallpanel_grey_horizontal.jpg",
      location: "Corporate Boardroom, Anna Salai, Chennai",
      description: "High-spec acoustic padded channels wrapped in stain-resistant charcoal wool fabric."
    },
    {
      id: "gal-9",
      title: "Artisanal Sofa Re-Upholstery in Petrol Velvet",
      category: "sofa",
      categoryLabel: "Sofa Refurbishing",
      image: "/images/sofa/sofa_after.jpg",
      location: "Heritage Residence, Mylapore, Chennai",
      description: "Complete frame restoration and re-cushioning in Italian high-density velvet with bespoke contrast piping."
    }
  ] as GalleryItem[]
};
