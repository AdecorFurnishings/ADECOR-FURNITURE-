import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SeoMeta {
  title: string;
  description: string;
}

const BASE_URL = 'https://adecorfurnishings.vercel.app';

const ROUTE_SEO: Record<string, SeoMeta> = {
  '/': {
    title: 'A-Decor | Luxury Interior Furnishings & Bespoke Drapes | Anna Nagar, Chennai',
    description:
      'Since 2004 in Anna Nagar, Chennai. A-Decor crafts bespoke curtains, motorized Roman blinds, acoustic wall panels, designer headboards, luxury wallpaper, flooring & sofa rework.',
  },
  '/about': {
    title: 'About A-Decor | Since 2004 Interior Atelier in Anna Nagar, Chennai',
    description:
      'Discover A-Decor’s 20+ year Chennai heritage in custom tailoring, acoustic wall panels, architectural drapery, and bespoke soft furnishings across Tamil Nadu.',
  },
  '/services': {
    title: 'Services | Curtains, Roman Blinds, Sofa Reupholstery Work & Wall Panels | A-Decor Chennai',
    description:
      'Explore A-Decor’s complete suite: custom stitched curtains, motorized Roman blinds, sofa refurbishing & re-upholstery, upholstered headboards, wall panels, wallpaper & flooring.',
  },
  '/sofa-upholstery-rework': {
    title: 'Sofa Reupholstery Work | Custom Furniture Atelier | A-Decor Chennai',
    description:
      'Sofa restoration, 45+ HR foam replacement, frame rebuilding, custom fluted velvet sofas, daybed benches, and sofa beds in Anna Nagar, Chennai.',
  },
  '/sofa-rework': {
    title: 'Sofa Reupholstery Work | Custom Furniture Atelier | A-Decor Chennai',
    description:
      'Sofa restoration, 45+ HR foam replacement, frame rebuilding, custom fluted velvet sofas, daybed benches, and sofa beds in Anna Nagar, Chennai.',
  },
  '/upholstery-rework': {
    title: 'Sofa Reupholstery Work | Custom Furniture Atelier | A-Decor Chennai',
    description:
      'Sofa restoration, 45+ HR foam replacement, frame rebuilding, custom fluted velvet sofas, daybed benches, and sofa beds in Anna Nagar, Chennai.',
  },
  '/curtain-styles': {
    title: 'Curtain Styles & Architectural Rods | A-Decor Chennai',
    description:
      'Inspect bespoke pinch pleat, wave, ripple fold curtains with live chameleon fabric shifts, paired with heavy-gauge architectural aluminum rods & electro-plated copper hardware.',
  },
  '/roman-blinds': {
    title: 'Motorized & Handcrafted Roman Blinds | A-Decor Chennai',
    description:
      'Preview flat, hobbled, relaxed, waterfall & motorized Roman blind styles with live draw controls crafted by A-Decor in Chennai.',
  },
  '/wall-panels-wallpaper': {
    title: 'Wall Paper, Wall Panel & Headboards | A-Decor Chennai',
    description:
      'Sculptural acoustic fabric wall panels, 3D tufted velvet headboards, geometric brass reveals & panoramic wallpaper murals crafted by A-Decor in Anna Nagar, Chennai.',
  },
  '/mattress': {
    title: 'Luxury Mattresses | Aerodream Sleep Systems | A-Decor Chennai',
    description:
      'Aerodream high-density orthopedic & energy booster mattresses with multi-layer comfort cores and targeted spinal alignment in Anna Nagar, Chennai.',
  },
  '/mattresses': {
    title: 'Luxury Mattresses | Aerodream Sleep Systems | A-Decor Chennai',
    description:
      'Aerodream high-density orthopedic & energy booster mattresses with multi-layer comfort cores and targeted spinal alignment in Anna Nagar, Chennai.',
  },
  '/beds': {
    title: 'Luxury Mattresses | Aerodream Sleep Systems | A-Decor Chennai',
    description:
      'Aerodream high-density orthopedic & energy booster mattresses with multi-layer comfort cores and targeted spinal alignment in Anna Nagar, Chennai.',
  },
  '/wall-panels': {
    title: 'Acoustic Fabric Wall Panels & Velvet Headboards | A-Decor Chennai',
    description:
      'Custom acoustic fabric wall panels with NRC 0.85 sound absorption, diamond tufted velvet, and PVD brass reveals crafted by A-Decor in Chennai.',
  },
  '/wallpaper': {
    title: 'Designer Wallpaper Murals & Textured Canvases | A-Decor Chennai',
    description:
      'Panoramic landscape murals, baroque embossed damasks, 3D strata stone reliefs, and gilded silk wallpapers tailored for luxury residences in Chennai.',
  },
  '/curtain-rods-flooring': {
    title: 'Architectural Curtain Rods & Luxury Flooring | A-Decor Chennai',
    description:
      'Explore heavy-duty architectural curtain rods, electroplated copper poles, extruded silent tracks, acoustic wall-to-wall carpets & modular office carpet tiles by A-Decor in Anna Nagar, Chennai.',
  },
  '/curtain-rods': {
    title: 'Architectural Curtain Rods & Silent Tracks | A-Decor Chennai',
    description:
      'Noble architectural aluminum rods, Style Copper electroplated poles, Ferro Rust vintage finials, and architectural heavy-duty curtain tracks crafted in Chennai.',
  },
  '/flooring': {
    title: 'Luxury Carpets & Foundation Flooring | A-Decor Chennai',
    description:
      'Wall-to-wall acoustic plush carpeting, royal banquet jacquard carpets, modular commercial tiles, balcony turf, and European herringbone parquet in Chennai.',
  },
  '/gallery': {
    title: 'Project Gallery | Completed Villas, Penthouses & Offices | A-Decor Chennai',
    description:
      'Browse real luxury curtains, canopy sheers, sunburst headboards, Pergola waves & wall murals installed by A-Decor across Chennai and Tamil Nadu.',
  },
  '/clients': {
    title: 'Contact & Clients | On-Site Consultation & Corporate Portfolio | A-Decor Chennai',
    description:
      'Book an on-site window measurement & fabric consultation in Anna Nagar, Chennai or explore our enterprise client portfolio trusted by premier hotels and corporate landmarks.',
  },
  '/contact': {
    title: 'Contact & Clients | On-Site Consultation & Corporate Portfolio | A-Decor Chennai',
    description:
      'Book an on-site window measurement & fabric consultation in Anna Nagar, Chennai or explore our enterprise client portfolio trusted by premier hotels and corporate landmarks.',
  },
};

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let tag = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

export const RouteSeo: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
    const meta = ROUTE_SEO[cleanPath] ?? ROUTE_SEO['/'];
    const canonicalUrl = cleanPath === '/' ? `${BASE_URL}/` : `${BASE_URL}${cleanPath}`;

    document.title = meta.title;
    upsertMeta('name', 'title', meta.title);
    upsertMeta('name', 'description', meta.description);
    upsertMeta('property', 'og:title', meta.title);
    upsertMeta('property', 'og:description', meta.description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'twitter:title', meta.title);
    upsertMeta('property', 'twitter:description', meta.description);
    upsertMeta('property', 'twitter:url', canonicalUrl);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);
  }, [pathname]);

  return null;
};
