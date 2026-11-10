import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, Sliders, ArrowRight, Sparkles } from 'lucide-react';
import { SITE_CONTENT } from '../../data/content';
import type { RomanBlindStyle } from '../../data/content';

export const RomanBlindInteractive: React.FC = () => {
  const [selectedStyle, setSelectedStyle] = useState<RomanBlindStyle>(SITE_CONTENT.romanBlindStyles[0]); // Default: Hobbled
  const [blindLift, setBlindLift] = useState(0.28); // 0 = down, 1 = up fully stacked

  // Quick lift presets
  const handlePreset = (level: number) => {
    setBlindLift(level);
  };

  return (
    <section className="py-24 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE7E1] text-[#1E1D1B] mb-4 border border-[#D3D0C9]">
            <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="label-caps text-[10px] tracking-luxury">Craftsmanship in Motion</span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#1E1D1B] font-light tracking-tight">
            Roman Blind Folding Studio
          </h2>
          <p className="mt-4 text-[#5E5C57] text-base sm:text-lg font-light leading-relaxed">
            From classic hobbled cascades to motorized whisper-quiet automation. Pull the cord to inspect fold stacking physics across all 12 styles from our Nandanam showroom catalog.
          </p>
        </div>

        {/* Studio Workspace: Interactive Blind Window & Style Picker */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* 1. Left Interactive Blind Frame & Pull Cord (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            <div className="w-full max-w-md bg-[#ECE9E2] rounded-3xl p-6 sm:p-8 border border-[#D3D0C9] shadow-soft-luxury relative">
              
              {/* Window Header Cassette */}
              <div className="w-full h-8 rounded-t-xl bg-[#2D2B28] text-white flex items-center justify-between px-4 text-[10px] tracking-widest font-mono shadow-inner">
                <span className="text-[#C5A880] uppercase">{selectedStyle.name} SHADE</span>
                <span className="text-white/60">LIFT: {Math.round(blindLift * 100)}%</span>
              </div>

              {/* Window Panes & Blind Canvas */}
              <div className="relative w-full aspect-[3.8/4.6] bg-white rounded-b-xl overflow-hidden border-2 border-t-0 border-[#2D2B28] shadow-inner">
                
                {/* Exterior Sunlight Vista through Window */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#A5C3D6] via-[#D2E2EB] to-[#B2CDB5] flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full bg-yellow-100/40 blur-2xl pointer-events-none" />
                  <div className="absolute inset-0 grid grid-cols-2 grid-rows-3 pointer-events-none opacity-40">
                    <div className="border-r border-b border-white" />
                    <div className="border-b border-white" />
                    <div className="border-r border-b border-white" />
                    <div className="border-b border-white" />
                    <div className="border-r border-white" />
                    <div className="border-white" />
                  </div>
                </div>

                {/* THE MOVING ROMAN BLIND */}
                <div
                  className="absolute inset-x-0 top-0 transition-all duration-300 ease-out overflow-hidden shadow-2xl z-20"
                  style={{
                    height: `${(1 - blindLift * 0.72) * 100}%`,
                  }}
                >
                  <img
                    src={selectedStyle.image}
                    alt={selectedStyle.name}
                    className="w-full h-full object-cover object-top filter contrast-[1.05]"
                  />

                  {/* Horizontal Rib / Batten Shadows based on blind height */}
                  <div
                    className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-40"
                    style={{
                      background: `repeating-linear-gradient(
                        0deg,
                        rgba(0,0,0,0.6) 0px,
                        transparent 4px,
                        transparent 45px,
                        rgba(0,0,0,0.5) 50px
                      )`,
                    }}
                  />

                  {/* Bottom weighted hem bar */}
                  <div className="absolute bottom-0 inset-x-0 h-4 bg-black/40 border-t border-white/20" />
                </div>

                {/* INTERACTIVE PULL CORD (Right edge) */}
                <div className="absolute right-4 top-2 bottom-8 z-30 flex flex-col items-center">
                  {/* Cord Line */}
                  <div
                    className="w-1 bg-[#8A8782] shadow-sm rounded-full transition-all duration-200"
                    style={{
                      height: `${40 + blindLift * 180}px`,
                    }}
                  />
                  {/* Acorn / Pull Tassel */}
                  <div
                    className="w-4 h-7 -mt-1 rounded-b-md bg-gradient-to-b from-[#C5A880] to-[#8E7048] shadow-md cursor-ns-resize active:scale-110 flex items-center justify-center transition-transform"
                    title="Drag range slider to raise/lower blind"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                  </div>
                </div>

              </div>

              {/* Range Slider & Quick Action Presets */}
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs text-[#5E5C57]">
                  <span className="flex items-center gap-1 font-medium">
                    <Sliders className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Pull Cord Position</span>
                  </span>
                  <span className="font-mono text-[11px]">{Math.round(blindLift * 100)}% Stacked</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="0.88"
                  step="0.01"
                  value={blindLift}
                  onChange={(e) => setBlindLift(parseFloat(e.target.value))}
                  className="w-full accent-[#C5A880] cursor-pointer"
                />

                <div className="flex items-center justify-between pt-1 gap-2">
                  <button
                    onClick={() => handlePreset(0)}
                    className="px-3 py-1.5 rounded-lg text-xs bg-white border border-[#D3D0C9] text-[#1E1D1B] hover:border-[#1E1D1B] transition-colors"
                  >
                    Fully Drawn Down
                  </button>
                  <button
                    onClick={() => handlePreset(0.4)}
                    className="px-3 py-1.5 rounded-lg text-xs bg-white border border-[#D3D0C9] text-[#1E1D1B] hover:border-[#1E1D1B] transition-colors"
                  >
                    Half Folded
                  </button>
                  <button
                    onClick={() => handlePreset(0.85)}
                    className="px-3 py-1.5 rounded-lg text-xs bg-white border border-[#D3D0C9] text-[#1E1D1B] hover:border-[#1E1D1B] transition-colors"
                  >
                    Stacked Header
                  </button>
                </div>
              </div>

            </div>

            {/* Selected Style Detail Card */}
            <div className="w-full max-w-md mt-6 p-5 rounded-2xl bg-[#FAF8F5] border border-[#D3D0C9] text-xs">
              <div className="flex items-center justify-between border-b border-[#D3D0C9] pb-3 mb-3">
                <span className="font-editorial text-lg font-semibold text-[#1E1D1B]">{selectedStyle.name} Style</span>
                <span className="text-[#C5A880] font-medium tracking-wide">{selectedStyle.stackStyle}</span>
              </div>
              <p className="text-[#5E5C57] leading-relaxed mb-3">{selectedStyle.description}</p>
              <div className="space-y-1.5 text-[11px] text-[#8A8782]">
                <p><strong className="text-[#1E1D1B]">Best For:</strong> {selectedStyle.bestFor}</p>
                <p><strong className="text-[#1E1D1B]">Fabric Choice:</strong> {selectedStyle.fabricRecommendation}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#D3D0C9] flex justify-end">
                <Link
                  to={`/contact?blind=${encodeURIComponent(selectedStyle.name)}`}
                  className="text-[#1E1D1B] font-semibold text-xs tracking-wider uppercase hover:text-[#C5A880] transition-colors flex items-center gap-1.5"
                >
                  <span>Inquire About This Blind</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

          {/* 2. Right: Grid of All 12 Roman Blind Styles (7 cols) */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-6">
              <span className="label-caps text-[#8A8782]">
                Select From 12 Signature Roman Blind Geometries
              </span>
              <span className="text-xs font-mono text-[#1E1D1B]">{SITE_CONTENT.romanBlindStyles.length} Models</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
              {SITE_CONTENT.romanBlindStyles.map((style) => {
                const isSelected = selectedStyle.id === style.id;
                return (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style)}
                    className={`group relative text-left rounded-xl overflow-hidden border p-2.5 transition-all duration-300 ${
                      isSelected
                        ? 'border-[#C5A880] bg-[#1E1D1B] text-[#FAF8F5] shadow-lg scale-[1.02]'
                        : 'border-[#D3D0C9] bg-white hover:border-[#8A8782] text-[#1E1D1B] hover:shadow-md'
                    }`}
                  >
                    {/* Thumbnail Image from PDF */}
                    <div className="w-full aspect-square rounded-lg overflow-hidden mb-2 bg-[#ECE9E2] relative">
                      <img
                        src={style.image}
                        alt={style.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-[#C5A880]/20 pointer-events-none" />
                      )}
                    </div>

                    {/* Title */}
                    <p className="font-medium text-xs truncate group-hover:text-[#C5A880] transition-colors">
                      {style.name}
                    </p>
                    <p className={`text-[10px] truncate ${isSelected ? 'text-[#C5A880]' : 'text-[#8A8782]'}`}>
                      {style.stackStyle}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Bottom info link */}
            <div className="mt-8 p-4 rounded-xl bg-[#EAE7E1] border border-[#D3D0C9] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 text-[#5E5C57]">
                <Sparkles className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>All blinds are custom tailored to millimeter window dimensions with Somfy motorized options.</span>
              </div>
              <Link
                to="/roman-blinds"
                className="whitespace-nowrap px-4 py-2 rounded-full bg-[#1E1D1B] text-white hover:bg-[#C5A880] hover:text-[#1E1D1B] transition-colors font-medium text-[11px] tracking-wider uppercase"
              >
                View Full Specs
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
