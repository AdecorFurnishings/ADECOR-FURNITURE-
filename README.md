# A-Decor (A Decor Perfect Home) — Luxury Digital Experience

A premium, award-level, fully responsive web application crafted for **A-Decor** (A Decor Perfect Home), a luxury interior furnishing atelier established in **2004** in **Nandanam, Chennai, Tamil Nadu**.

---

## 🏛️ Brand Heritage & Business Facts (From PDF Brochure)

- **Brand Name**: A-Decor
- **Legal Entity**: A Decor Perfect Home
- **Tagline**: *"Perfect Home For Your Precious Family!"*
- **Headline**: *"Beautiful Home"*
- **Established**: 2004 in Nandanam, Chennai (20+ Years of Craftsmanship)
- **Flagship Showroom Address**: Old No. 457, New No. 726, Nandanam, Chennai - 600 035, Tamil Nadu, India (Near Anna Salai & CIT Nagar)
- **Direct Showroom Phones**: `+91 98411 34665` / `+91 95009 33322`
- **Email**: `adecorperfecthome@gmail.com`
- **Website**: `www.adecorperfecthome.com`
- **Statewide Service Guarantee**: On-site design consultation and laser measuring service anywhere across Chennai, Coimbatore, Madurai, Trichy, and all of Tamil Nadu.
- **Enterprise Clientele**: Hilton Hotels & Resorts, Apollo Hospitals, TVS, DLF Building India, Nippo, Vels University, Radisson, Ramada, Ideal.
- **Atelier Services**:
  1. Bespoke Curtains (13 Signature Pleat Geometries)
  2. Roman & Motorized Blinds (12 Folding Styles)
  3. Acoustic & Fabric Wall Panels
  4. Designer Master Headboards
  5. Designer 3D & Textured Wallpaper
  6. Hardwood & Luxury Flooring
  7. **New Service**: Master Sofa Refurbishing & Re-Upholstery (Heirloom frame restoration, 40+ density ergonomic memory foam, and luxury fabric re-covering)

---

## 🎨 Creative Direction & Design System

- **Palette**:
  - Warm Greige: `#D3D0C9` / `#E5E3DC`
  - Taupe Grey: `#8A8782` / `#5E5C57`
  - Off-White / Cream: `#FAF8F5` / `#ECE9E2`
  - Deep Charcoal: `#1E1D1B` / `#141312`
  - Refined Accent (Muted Brass / Gold): `#C5A880` / `#DEC8AA` / `#9A7A4F`
  - Heritage Accent (Dusty Peacock Blue): `#5C768D` / `#8FA5B8`
- **Typography**:
  - Display & Headings: `Cormorant Garamond` (weights 300, 400, 500, 600, italic) & `Playfair Display`
  - UI Labels & Monograms: Wide-tracked uppercase small caps (`letter-spacing: 0.25em` to `0.35em`)
  - Body & Microcopy: `Inter`
- **Aesthetic Rhythm**: Editorial magazine spacing, dark/light section alternation, subtle SVG film grain texture overlay (`.bg-grain`), fine hairline borders, and soft shadows.

---

## ⚡ Tech Stack & Architecture

- **Core**: Vite 8 + React 19 + TypeScript
- **Styling**: Tailwind CSS v3 with custom design tokens, CSS variables, and fluid typography
- **Smooth Scroll**: Lenis v1 (optimized easing, touch-multiplier, auto-pause on modal)
- **Transitions**: Framer Motion route animations
- **Icons**: Lucide React + custom inline luxury SVG glyphs
- **Routing**: React Router DOM v7 with code-split lazy routes
- **Performance**: 60fps animations, WebP/compressed JPG assets, zero console errors, zero layout shifts.

---

## 🎭 10 Signature Motion & Interaction Features

1. **Intro "Boom" Loader** (`/src/components/common/IntroBoomLoader.tsx`):
   - Monogram "A" inside a double-bordered architectural frame pulses with ambient golden glow.
   - At 900ms, bursts with brand-colored particle confetti (`#C5A880`, `#D3D0C9`, `#8A8782`).
   - Circular expanding ripple clip-path smoothly reveals the home page.
   - Cached via `sessionStorage` (shows once per session, with a "Skip Intro" button).
2. **Hero Curtain Reveal** (`/src/components/home/HeroCurtains.tsx`):
   - Twin silk-sheen curtains hanging from a realistic brass pole with finials.
   - User can drag left or right curtains with touch or mouse (spring physics).
   - Auto-opens gently on load. Behind the curtains is the "Beautiful Home" room vortex with interactive parallax.
   - Quick action controls: "Open Fully", "Parted", "Draw Close".
3. **Interactive Curtain Colour & Pleat Customizer** (`/src/components/home/CurtainColorChanger.tsx`):
   - Architectural window framing garden daylight.
   - 10 fabric swatches (Ivory Silk, Champagne Luster, Midnight Slate Velvet, Peacock Teal, Nandanam Taupe, Madras Terracotta, Nilgiri Sage, Imperial Brass, Onyx Blackout, Forest Emerald).
   - Real-time fabric color wipe that preserves shadows, folds, and highlights via SVG multiply maps.
   - 6 switchable pleat silhouettes (Double Pinch, Triple Pinch, Ripple Fold, Goblet, Grommet, Inverted Box).
   - Live "Get a Quote for this Look" button that pre-fills the contact form and WhatsApp message.
4. **Roman Blind Folding Studio** (`/src/components/home/RomanBlindInteractive.tsx`):
   - Interactive pull-cord with acorn tassel that raises and lowers the shade from 0% to 100%.
   - Realistic tiered stacking folds that compress as the shade rises.
   - Switch between all 12 Roman blind styles from the PDF brochure.
5. **Sofa Refurbishing Before/After Section** (`/src/components/home/SofaRefurbishingSection.tsx`):
   - Interactive drag-to-compare vertical split slider (worn original sofa vs. refurbished luxury sofa).
   - 6 sofa fabric recolour swatches (Slate Velvet, Terracotta, Sandstone Linen, Navy Damask, Emerald, Bouclé).
   - 4-step artisan process cards (Inspect, Choose Fabric, Re-upholster, Deliver).
   - Free Chennai pick-up and delivery badge.
6. **Luxury Follower Custom Cursor** (`/src/components/common/CustomCursor.tsx`):
   - Spring-interpolated follower ring that expands and reveals dynamic context labels (`DRAG`, `VIEW`, `OPEN`).
   - Automatically disabled on touch screens and under `prefers-reduced-motion`.
7. **Page Transitions** (`/src/components/common/PageTransition.tsx`):
   - Smooth curtain-slide and staggered text reveals on route transitions.
8. **Marquee Tickers & Scroll Storytelling** (`/src/components/home/ClientsMarquee.tsx`):
   - Infinite marquee logo ticker featuring 9 enterprise clients with grayscale-to-color hover reveals.
   - Counter metrics: Since 2004, 12,500+ Drapes, 100% On-Site Measuring.
9. **Filterable Gallery with Lightbox** (`/src/pages/GalleryPage.tsx`):
   - Filter by All, Curtains, Blinds, Wall Panels, Wallpaper, Flooring, Sofa Refurbishing.
   - Lightbox modal displaying full-res image, Chennai location, and direct quote trigger.
10. **Showroom & Local Contact Concierge** (`/src/pages/ContactPage.tsx` & `FloatingWhatsApp.tsx`):
    - Instant WhatsApp inquiry generation with pre-populated specs from the interactive studios.
    - Embedded interactive Google Map of Nandanam showroom.
    - Direct phone click-to-call, email, and digital QR code from the client's brochure.

---

## 📁 File Structure

```
A DECOR SHOP/
├── public/
│   ├── favicon.svg
│   ├── images/
│   │   ├── logo/
│   │   │   └── logo.png (Original brochure header logo)
│   │   ├── hero/
│   │   │   ├── hero_sofa_vortex.jpg (Page 1 Beautiful Home hero)
│   │   │   ├── bedroom_chandelier.jpg (Page 5 Master Suite hero)
│   │   │   └── tufted_wall_sofa.jpg (Page 2 Gallery hero)
│   │   ├── blinds/ (All 12 Roman blind crops)
│   │   │   ├── hobbled.jpg, back_slat.jpg, waterfall.jpg, front_slat.jpg,
│   │   │   ├── relaxed.jpg, motorized.jpg, flat.jpg, slouched.jpg,
│   │   │   └── butterfly.jpg, box_pleat_balloon.jpg, austrian.jpg, shirred_balloon.jpg
│   │   ├── curtains/ (All 13 Pleat crops)
│   │   │   ├── double_pinch_pleat.jpg, triple_pinch_pleat.jpg, ripple_fold.jpg,
│   │   │   ├── fan_fold_pleat.jpg, goblet_pleat.jpg, inverted_box_pleat.jpg,
│   │   │   ├── tailored_pleat.jpg, pinch_pleat.jpg, inverted_pleat.jpg,
│   │   │   └── grommet.jpg, goblet.jpg, cubicle.jpg, rod_pocket.jpg
│   │   ├── clients/ (All 9 Client logos + transparent PNGs)
│   │   │   ├── hilton.png, apollo_hospitals.png, tvs.png,
│   │   │   ├── dlf.png, nippo.png, vels_university.png,
│   │   │   └── radisson.png, ramada.png, ideal.png
│   │   ├── gallery/ (Furnishing drapes, wall panels, hardwood, 3D wallpapers)
│   │   ├── services/ (Curtains, blinds, wall panel, headboards, wallpaper, flooring)
│   │   ├── sofa/ (sofa_before.jpg, sofa_after.jpg)
│   │   └── contact/ (qr_code.png, map_nandanam.jpg)
├── src/
│   ├── data/
│   │   └── content.ts (Single source of truth for all text, products, and prices)
│   ├── components/
│   │   ├── common/ (Navbar, Footer, CustomCursor, IntroBoomLoader, FloatingWhatsApp, SmoothScroll, PageTransition)
│   │   └── home/ (HeroCurtains, CurtainColorChanger, RomanBlindInteractive, SofaRefurbishingSection, ClientsMarquee)
│   ├── pages/ (HomePage, ServicesPage, CurtainStylesPage, RomanBlindsPage, GalleryPage, ClientsPage, ContactPage)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── scripts/
│   ├── process_assets.py (Python asset extractor from PDF)
│   ├── create_sofa_assets.py (Sofa before/after graphic generator)
│   └── capture_screenshots.js (Automated Puppeteer visual audit)
└── package.json
```

---

## 🖼️ Placeholder Assets Inventory (Easy Swap Guide)

The following assets are placeholders generated or extracted from the low-res areas of the brochure. To replace any of them with studio photographs, overwrite the file at the specified path:

| Placeholder File Path | Purpose | Recommended Replacement Specs |
|---|---|---|
| `/public/images/sofa/sofa_before.jpg` | Worn sofa for before/after slider | 1200x800px, high-res worn leather/fabric couch |
| `/public/images/sofa/sofa_after.jpg` | Refurbished sofa for slider | 1200x800px, matching angle upholstered sofa |
| `/public/images/services/curtains.jpg` | Curtains service card | 800x1200px portrait, high-res drapes with window |
| `/public/images/hero/hero_sofa_vortex.jpg` | Hero room reveal backdrop | 1920x1080px, luxury living room interior |
| `/public/images/contact/map_nandanam.jpg` | Static fallback map | 1200x800px showroom exterior or map snapshot |

All text, client listings, and product details can be modified in a single file:  
👉 **`/src/data/content.ts`**

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v24.6.0)
- npm 9+ (tested on npm 11.5.1)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build & Verification
```bash
npm run build
npm run preview
```

### 4. Deploy
The `dist/` directory is production-ready for deployment to Vercel, Netlify, Cloudflare Pages, or AWS S3:
- **Vercel**: Run `vercel` or link GitHub repository
- **Netlify**: Set build command `npm run build` and publish directory `dist`
- **Single Page Application Rewrite**: Ensure `/*` rewrites to `/index.html`.
