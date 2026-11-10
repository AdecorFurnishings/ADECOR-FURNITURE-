import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { SITE_CONTENT } from '../../data/content';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#1E1D1B] text-[#FAF8F5] text-xs py-2 px-3.5 rounded-full shadow-elevated border border-white/10 animate-fade-in">
          <span>Need design advice? Chat on WhatsApp</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-white/50 hover:text-white p-0.5"
            aria-label="Close tooltip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* WhatsApp Floating Action Button */}
      <a
        href={SITE_CONTENT.brand.socials.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with A-Decor on WhatsApp"
        className="relative group w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {/* Pulsing ambient ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" />
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
};
