import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Check, ArrowRight, MessageCircle, SlidersHorizontal, Info } from 'lucide-react';
import { SITE_CONTENT } from '../../data/content';
import type { FabricSwatch, CurtainPleatStyle } from '../../data/content';

export const CurtainColorChanger: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFabric, setSelectedFabric] = useState<FabricSwatch>(SITE_CONTENT.fabricSwatches[2]); // Default: Midnight Slate Velvet
  const [selectedPleat, setSelectedPleat] = useState<CurtainPleatStyle>(SITE_CONTENT.curtainPleatStyles[2]); // Default: Ripple Fold
  const [isWiping, setIsWiping] = useState(false);

  // Pleat subsets featured in interactive customizer
  const featuredPleats = SITE_CONTENT.curtainPleatStyles.slice(0, 6);

  const handleSelectFabric = (fabric: FabricSwatch) => {
    if (fabric.id === selectedFabric.id) return;
    setIsWiping(true);
    setSelectedFabric(fabric);
    setTimeout(() => setIsWiping(false), 500);
  };

  const handleGetQuote = () => {
    navigate(
      `/contact?pleat=${encodeURIComponent(selectedPleat.name)}&fabric=${encodeURIComponent(
        selectedFabric.name
      )}&hex=${encodeURIComponent(selectedFabric.hex)}`
    );
  };

  const handleWhatsAppQuote = () => {
    const text = `Hello A-Decor Nandanam! I would like a quote for bespoke curtains in *${selectedPleat.name}* pleat style with *${selectedFabric.name}* fabric (${selectedFabric.hex}).`;
    window.open(`https://wa.me/919841134665?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="py-24 bg-[#ECE9E2]/60 relative overflow-hidden border-y border-[#D3D0C9]/70">
      {/* Background ambient grain */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-25" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E1D1B] text-[#FAF8F5] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="label-caps text-[10px] tracking-luxury">Interactive Drapery Studio</span>
          </div>

          <h2 className="font-syne text-4xl sm:text-5xl lg:text-6xl text-[#1E1D1B] font-bold uppercase tracking-tight leading-tight">
            Curtain Colour & Pleat Studio
          </h2>
          <p className="mt-4 text-[#5E5C57] text-base sm:text-lg font-light leading-relaxed">
            Test curated fabrics on realistic architectural folds. Change colors and pleats in real time, then request on-site physical swatches.
          </p>
        </div>

        {/* Studio Grid: Left Window Showcase, Right Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* 1. Left Showcase: The Architectural Window & Interactive Curtain (7 cols) */}
          <div className="lg:col-span-7 bg-[#1E1D1B] rounded-2xl p-6 sm:p-10 shadow-elevated relative overflow-hidden flex flex-col items-center">
            {/* Top Room Header Bar */}
            <div className="w-full flex items-center justify-between pb-6 border-b border-white/10 text-xs text-[#FAF8F5]/80 mb-6">
              <span className="label-caps text-[10px] tracking-widest text-[#C5A880]">
                Window Visualization • Scale 1:1
              </span>
              <span className="font-mono text-[11px] text-[#D3D0C9]">
                {selectedFabric.name} • {selectedPleat.name}
              </span>
            </div>

            {/* Window Container */}
            <div className="relative w-full max-w-lg aspect-[4/5] sm:aspect-[4/4.5] rounded-xl overflow-hidden bg-white shadow-2xl border-4 border-[#2D2B28]">
              
              {/* Window Outside Scenery (Garden Villa daylight) */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#87A4B8] via-[#BFD5E2] to-[#A2B89B] overflow-hidden">
                {/* Sunlight rays */}
                <div className="absolute -top-12 -right-12 w-96 h-96 rounded-full bg-yellow-100/30 blur-3xl pointer-events-none" />
                
                {/* Distant trees & garden silhouette */}
                <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#364937]/70 to-transparent" />
                
                {/* Architectural Window Panes & Grids */}
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none">
                  <div className="border-r-2 border-b-2 border-white/60 shadow-sm" />
                  <div className="border-b-2 border-white/60 shadow-sm" />
                  <div className="border-r-2 border-white/60 shadow-sm" />
                  <div className="border-white/60 shadow-sm" />
                </div>
              </div>

              {/* Curtain Rod and Brackets */}
              <div className="absolute top-3 inset-x-3 h-3 z-30 flex items-center pointer-events-none">
                <div className="w-full h-2 rounded bg-gradient-to-r from-[#8E7048] via-[#D4B58A] to-[#8E7048] shadow-md border-t border-white/40" />
              </div>

              {/* THE CURTAINS: Dynamic Color Wipe & Shading */}
              <div className="absolute inset-x-0 top-5 bottom-0 z-20 flex justify-between pointer-events-none">
                
                {/* Left Panel */}
                <div
                  className="w-[48%] h-full relative overflow-hidden transition-all duration-500 origin-left"
                  style={{
                    backgroundColor: selectedFabric.hex,
                  }}
                >
                  {/* Fold and Shadow Displacement Map (Realistic Drapery Ribs) */}
                  <div
                    className="absolute inset-0 mix-blend-multiply opacity-85"
                    style={{
                      background: `
                        repeating-linear-gradient(
                          90deg,
                          rgba(0, 0, 0, 0.65) 0%,
                          rgba(255, 255, 255, 0.45) ${selectedPleat.id === 'ripple-fold' ? '25px' : '18px'},
                          rgba(0, 0, 0, 0.7) ${selectedPleat.id === 'ripple-fold' ? '50px' : '36px'}
                        )
                      `,
                    }}
                  />

                  {/* Top Fabric Pleat Header Geometry */}
                  <div className="absolute top-0 inset-x-0 h-10 bg-black/40 border-b border-black/30 flex justify-around items-center px-1">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className={`bg-black/60 shadow-inner ${
                          selectedPleat.id === 'grommet'
                            ? 'w-3 h-3 rounded-full border border-[#D4B58A]'
                            : selectedPleat.id === 'goblet-pleat'
                            ? 'w-3 h-6 rounded-b-md'
                            : 'w-1.5 h-6 rounded-sm'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Color wipe overlay animation */}
                  {isWiping && (
                    <div className="absolute inset-0 bg-white/40 animate-pulse pointer-events-none" />
                  )}
                </div>

                {/* Right Panel */}
                <div
                  className="w-[48%] h-full relative overflow-hidden transition-all duration-500 origin-right"
                  style={{
                    backgroundColor: selectedFabric.hex,
                  }}
                >
                  {/* Fold and Shadow Displacement Map */}
                  <div
                    className="absolute inset-0 mix-blend-multiply opacity-85"
                    style={{
                      background: `
                        repeating-linear-gradient(
                          90deg,
                          rgba(0, 0, 0, 0.7) 0%,
                          rgba(255, 255, 255, 0.45) ${selectedPleat.id === 'ripple-fold' ? '25px' : '18px'},
                          rgba(0, 0, 0, 0.65) ${selectedPleat.id === 'ripple-fold' ? '50px' : '36px'}
                        )
                      `,
                    }}
                  />

                  {/* Top Fabric Pleat Header Geometry */}
                  <div className="absolute top-0 inset-x-0 h-10 bg-black/40 border-b border-black/30 flex justify-around items-center px-1">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className={`bg-black/60 shadow-inner ${
                          selectedPleat.id === 'grommet'
                            ? 'w-3 h-3 rounded-full border border-[#D4B58A]'
                            : selectedPleat.id === 'goblet-pleat'
                            ? 'w-3 h-6 rounded-b-md'
                            : 'w-1.5 h-6 rounded-sm'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Color wipe overlay */}
                  {isWiping && (
                    <div className="absolute inset-0 bg-white/40 animate-pulse pointer-events-none" />
                  )}
                </div>
              </div>

              {/* Bottom Room Sill */}
              <div className="absolute bottom-0 inset-x-0 h-6 bg-[#383531] border-t border-[#4A4641] z-30" />
            </div>

            {/* Live Spec Bar below window */}
            <div className="mt-6 w-full flex flex-wrap items-center justify-between text-xs text-[#D3D0C9] pt-4 border-t border-white/10 gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedFabric.hex }} />
                <span>{selectedFabric.name} ({selectedFabric.textureType.toUpperCase()})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C5A880] font-medium">{selectedPleat.fullness}</span>
                <span>• {selectedPleat.aesthetic}</span>
              </div>
            </div>
          </div>

          {/* 2. Right Controls: Swatches, Pleat Styles & Quote Triggers (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Fabric Swatch Selector */}
            <div className="bg-[#FAF8F5] p-6 sm:p-7 rounded-2xl border border-[#D3D0C9] shadow-soft-luxury">
              <div className="flex items-center justify-between mb-4">
                <span className="label-caps text-[#8A8782] text-xs">
                  01 / Select Fabric Texture & Shade
                </span>
                <span className="text-xs text-[#1E1D1B] font-medium">
                  {SITE_CONTENT.fabricSwatches.length} Swatches
                </span>
              </div>

              <div className="grid grid-cols-5 gap-3">
                {SITE_CONTENT.fabricSwatches.map((fabric) => {
                  const isSelected = selectedFabric.id === fabric.id;
                  return (
                    <button
                      key={fabric.id}
                      onClick={() => handleSelectFabric(fabric)}
                      className={`relative group aspect-square rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm ${
                        isSelected
                          ? 'ring-2 ring-offset-2 ring-[#C5A880] scale-105 shadow-md'
                          : 'hover:scale-95'
                      }`}
                      style={{ backgroundColor: fabric.hex }}
                      title={`${fabric.name} (${fabric.textureType})`}
                    >
                      {isSelected && (
                        <Check
                          className={`w-4 h-4 ${
                            ['ivory-damask', 'champagne-luster'].includes(fabric.id)
                              ? 'text-black'
                              : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Selected Swatch Description */}
              <div className="mt-5 p-3.5 rounded-xl bg-[#ECE9E2]/60 border border-[#D3D0C9] text-xs">
                <p className="font-semibold text-[#1E1D1B]">{selectedFabric.name}</p>
                <p className="text-[#5E5C57] mt-1 leading-relaxed">{selectedFabric.description}</p>
              </div>
            </div>

            {/* Pleat Style Selector */}
            <div className="bg-[#FAF8F5] p-6 sm:p-7 rounded-2xl border border-[#D3D0C9] shadow-soft-luxury">
              <div className="flex items-center justify-between mb-4">
                <span className="label-caps text-[#8A8782] text-xs">
                  02 / Select Architectural Pleat
                </span>
                <SlidersHorizontal className="w-4 h-4 text-[#C5A880]" />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {featuredPleats.map((pleat) => {
                  const isSelected = selectedPleat.id === pleat.id;
                  return (
                    <button
                      key={pleat.id}
                      onClick={() => setSelectedPleat(pleat)}
                      className={`text-left p-3 rounded-xl border text-xs transition-all ${
                        isSelected
                          ? 'bg-[#1E1D1B] text-[#FAF8F5] border-[#1E1D1B] shadow-sm'
                          : 'bg-white hover:bg-[#FAF8F5] text-[#1E1D1B] border-[#D3D0C9]'
                      }`}
                    >
                      <p className="font-medium truncate">{pleat.name}</p>
                      <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-[#C5A880]' : 'text-[#8A8782]'}`}>
                        {pleat.fullness}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center gap-2 text-[11px] text-[#5E5C57]">
                <Info className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                <span>Need another pleat? We craft all 13 styles at our Nandanam atelier.</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleGetQuote}
                className="flex-1 py-4 px-6 rounded-full bg-[#1E1D1B] hover:bg-[#C5A880] text-[#FAF8F5] hover:text-[#1E1D1B] font-semibold text-xs tracking-luxury uppercase flex items-center justify-center gap-2.5 transition-all duration-300 shadow-md group"
              >
                <span>Get a Quote for this Look</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleWhatsAppQuote}
                className="py-4 px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-medium text-xs tracking-luxury uppercase flex items-center justify-center gap-2 transition-all shadow-md"
                title="Send configuration to WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
