import React, { useState } from 'react';
import { Sparkles, X, MapPin, ArrowRight, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE_CONTENT } from '../data/content';
import type { GalleryItem } from '../data/content';

export const GalleryPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filterOptions = [
    { id: 'all', label: 'All Projects' },
    { id: 'curtains', label: 'Curtains' },
    { id: 'blinds', label: 'Roman Blinds' },
    { id: 'wall-panels', label: 'Wall Panels' },
    { id: 'wallpaper', label: 'Wallpaper' },
    { id: 'flooring', label: 'Flooring' },
    { id: 'sofa', label: 'Sofa Refurbishing' },
  ];

  const filteredItems = activeFilter === 'all'
    ? SITE_CONTENT.gallery
    : SITE_CONTENT.gallery.filter((item) => item.category === activeFilter);

  return (
    <div className="pt-28 pb-24 bg-[#FAF8F5]">
      {/* Page Hero */}
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE7E1] text-[#1E1D1B] border border-[#D3D0C9] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className="label-caps text-[10px] tracking-luxury">Portfolio of Completed Works</span>
        </div>
        <h1 className="font-editorial text-5xl sm:text-6xl lg:text-7xl text-[#1E1D1B] font-light tracking-tight">
          A-Decor Interior Gallery
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-[#5E5C57] font-light leading-relaxed">
          Explore bespoke draperies, acoustic panels, master headboards, and reupholstered suites delivered across Chennai and Tamil Nadu.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-10">
          {filterOptions.map((opt) => {
            const isActive = activeFilter === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setActiveFilter(opt.id)}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? 'bg-[#1E1D1B] text-[#FAF8F5] shadow-md'
                    : 'bg-white hover:bg-[#ECE9E2] text-[#5E5C57] border border-[#D3D0C9]'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Masonry / Responsive Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-white border border-[#D3D0C9] shadow-soft-luxury hover:shadow-elevated transition-all duration-500 flex flex-col justify-between"
              data-cursor="View"
            >
              {/* Image with zoom and hover overlay */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#ECE9E2]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                
                {/* Gradient scrim & quick view badge */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-[#1E1D1B] text-xs font-semibold tracking-wider uppercase flex items-center gap-2 shadow-lg">
                    <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>View Details</span>
                  </span>
                </div>

                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#1E1D1B]/80 backdrop-blur-md text-[#C5A880] text-[10px] font-semibold tracking-wider uppercase border border-white/10">
                  {item.categoryLabel}
                </span>
              </div>

              {/* Card Meta */}
              <div className="p-6">
                <h3 className="font-editorial text-2xl text-[#1E1D1B] group-hover:text-[#C5A880] transition-colors leading-snug">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-[#8A8782] mt-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{item.location}</span>
                </div>
                <p className="text-xs text-[#5E5C57] mt-3 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#FAF8F5] rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="md:w-3/5 bg-black flex items-center justify-center">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full max-h-[70vh] object-cover"
              />
            </div>

            {/* Modal Content */}
            <div className="md:w-2/5 p-8 flex flex-col justify-between">
              <div>
                <span className="label-caps text-[#C5A880] text-[10px]">
                  {selectedItem.categoryLabel}
                </span>
                <h3 className="font-editorial text-3xl text-[#1E1D1B] font-light mt-1">
                  {selectedItem.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-[#8A8782] mt-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{selectedItem.location}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#5E5C57] leading-relaxed mt-4 font-light">
                  {selectedItem.description}
                </p>
              </div>

              <div className="pt-8 border-t border-[#D3D0C9] mt-8">
                <Link
                  to={`/contact?project=${encodeURIComponent(selectedItem.title)}`}
                  className="w-full py-3.5 px-6 rounded-full bg-[#1E1D1B] hover:bg-[#C5A880] text-white hover:text-[#1E1D1B] text-xs font-semibold tracking-luxury uppercase flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <span>Request Similar Custom Design</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
