import React from 'react';
import { MessageCircle } from 'lucide-react';
import { SITE_CONTENT } from '../../data/content';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-3 group">
      {/* Hover-revealed tooltip so it never covers hero controls at rest */}
      <div className="hidden sm:flex items-center bg-[#1E1D1B]/95 backdrop-blur-md text-[#FAF8F5] text-xs py-2 px-3.5 rounded-full shadow-elevated border border-white/15 opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap">
        <span>Need design advice? Chat on WhatsApp</span>
      </div>

      {/* WhatsApp Floating Action Button */}
      <a
        href={SITE_CONTENT.brand.socials.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with A-Decor on WhatsApp"
        className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-300"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
      </a>
    </div>
  );
};
