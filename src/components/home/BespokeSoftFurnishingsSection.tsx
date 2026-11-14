import React, { useState } from 'react';
import { Sparkles, ArrowRight, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FurnishingItem {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  material: string;
  turnaround: string;
}

const furnishingItems: FurnishingItem[] = [
  {
    id: 'boucle-armchair',
    name: 'Bespoke Boucle Lounge Chair',
    category: 'Re-Upholstery & Frame Restoration',
    description: 'Master re-upholstered in premium Italian tactile cream boucle with handcrafted solid oak tapered legs. Fully reinforced frame with high-density ergonomic foam.',
    image: '/images/furnishings/hero-chair.webp',
    material: 'Heavy Cream Boucle & Solid Oak',
    turnaround: '7 - 10 Business Days',
  },
  {
    id: 'linen-cushion',
    name: 'Stonewashed Moss Linen Cushion',
    category: 'Custom Cushions & Soft Furnishings',
    description: 'Tailored with genuine French flax linen, piped edges, and hypoallergenic micro-down feather insert. Hand-stitched at our Anna Nagar atelier.',
    image: '/images/furnishings/cushion.webp',
    material: '100% Washed European Flax Linen',
    turnaround: '3 - 5 Business Days',
  },
  {
    id: 'pleated-shade',
    name: 'Pleated Linen Architectural Shade',
    category: 'Custom Lampshades & Pendants',
    description: 'Origami-inspired pleated linen diffuses soft ambient illumination across reading corners and dining tables. Heat-resistant internal lining.',
    image: '/images/furnishings/lamp.webp',
    material: 'Natural Pleated Linen & Brass Hardware',
    turnaround: '5 - 7 Business Days',
  },
  {
    id: 'wool-throw',
    name: 'Hand-Woven Wool & Cashmere Throw',
    category: 'Drapes & Soft Accessories',
    description: 'Organic loomed merino wool blend in subtle oat and moss stripes. The ideal tactile accent draped over bespoke sofas and window benches.',
    image: '/images/furnishings/throw.webp',
    material: 'Merino Wool & Cashmere Blend',
    turnaround: 'In Stock at Anna Nagar',
  },
  {
    id: 'oak-stool',
    name: 'Oiled Oak Atelier Accent Stool',
    category: 'Atelier Woodwork & Side Furniture',
    description: 'Turned solid oak tripod stool featuring sculpted seating comfort. Natural matte oil finish enhancing raw timber grain.',
    image: '/images/furnishings/stool.webp',
    material: 'Kiln-Dried Solid White Oak',
    turnaround: 'Made to Order',
  },
];

export const BespokeSoftFurnishingsSection: React.FC = () => {
  const [activeItem, setActiveItem] = useState<FurnishingItem>(furnishingItems[0]);

  return (
    <section className="py-24 bg-[#EAE7E1] relative overflow-hidden border-t border-[#D3D0C9]">
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-[#1E1D1B] border border-[#D3D0C9] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="label-caps text-[10px] tracking-luxury">Curated Nordic & Minimalist Touch</span>
            </div>
            <h2 className="font-syne text-4xl sm:text-5xl text-[#1E1D1B] font-bold uppercase tracking-tight">
              Quiet Comfort, Tailored Accents
            </h2>
            <p className="mt-3 text-[#5E5C57] text-base sm:text-lg font-light max-w-xl">
              Cushions, accent armchairs, tailored throws, and tactile accessories handcrafted to complement your window draperies.
            </p>
          </div>

          <Link
            to="/services#upholstery-rework"
            className="text-xs uppercase tracking-luxury text-[#1E1D1B] font-semibold hover:text-[#C5A880] transition-colors self-start md:self-auto py-2"
          >
            Explore Upholstery Rework →
          </Link>
        </div>

        {/* Interactive Split Feature Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 rounded-3xl bg-white border border-[#D3D0C9] shadow-soft-luxury">
          
          {/* Left Media Stage: Floating Transparent High-Res Product Cutout (7 cols) */}
          <div className="lg:col-span-7 relative flex flex-col items-center justify-center p-8 bg-[#F4F2EC] rounded-2xl min-h-[420px] sm:min-h-[500px] overflow-hidden group">
            {/* Ambient soft glow */}
            <div className="absolute w-72 h-72 rounded-full bg-[#C5A880]/15 blur-3xl pointer-events-none" />

            {/* Floating Image with dynamic shadow */}
            <div className="relative z-10 max-w-md w-full aspect-square flex items-center justify-center">
              <img
                src={activeItem.image}
                alt={activeItem.name}
                loading="lazy"
                decoding="async"
                className="max-h-[380px] w-auto object-contain transition-all duration-700 ease-out group-hover:scale-105 filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.18)]"
              />
            </div>

            {/* Spec pill bottom */}
            <div className="absolute bottom-4 inset-x-4 flex items-center justify-between px-4 py-2 rounded-full bg-white/80 backdrop-blur-md text-[11px] font-mono text-[#5E5C57] border border-[#D3D0C9]">
              <span>MATERIAL: {activeItem.material}</span>
              <span className="text-[#C5A880] font-semibold">{activeItem.turnaround}</span>
            </div>
          </div>

          {/* Right Selector Column & Details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Active Item Information */}
            <div className="space-y-3">
              <span className="label-caps text-[#C5A880] text-[10px]">
                {activeItem.category}
              </span>
              <h3 className="font-syne text-3xl sm:text-4xl text-[#1E1D1B] font-bold uppercase leading-snug">
                {activeItem.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#5E5C57] leading-relaxed font-light">
                {activeItem.description}
              </p>
            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="space-y-3 pt-2">
              <span className="label-caps text-[#8A8782] text-[10px]">
                Select Piece to Inspect:
              </span>
              <div className="grid grid-cols-5 gap-2.5">
                {furnishingItems.map((item) => {
                  const isSelected = item.id === activeItem.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveItem(item)}
                      className={`relative aspect-square rounded-xl p-1.5 border transition-all duration-300 ${
                        isSelected
                          ? 'border-[#1E1D1B] bg-[#FAF8F5] shadow-md ring-2 ring-[#C5A880]'
                          : 'border-[#D3D0C9] bg-[#FAF8F5] hover:border-[#8A8782] opacity-75 hover:opacity-100'
                      }`}
                      title={item.name}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-[#D3D0C9] flex flex-col sm:flex-row gap-3">
              <Link
                to={`/contact?inquiry=${encodeURIComponent(activeItem.name)}`}
                className="flex-1 py-3.5 px-6 rounded-full bg-[#1E1D1B] hover:bg-[#C5A880] text-white hover:text-[#1E1D1B] font-semibold text-xs tracking-luxury uppercase flex items-center justify-center gap-2 transition-all shadow-md group"
              >
                <span>Order Custom Piece</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href={`https://wa.me/919841134665?text=${encodeURIComponent(
                  `Hello A-Decor Anna Nagar! I would like to order / inquire about the ${activeItem.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-medium text-xs tracking-luxury uppercase flex items-center justify-center gap-2 transition-all"
                title="Ask about this piece on WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
