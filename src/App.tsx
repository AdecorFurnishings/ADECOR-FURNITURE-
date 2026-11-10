import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { SmoothScroll } from './components/common/SmoothScroll';
import { CustomCursor } from './components/common/CustomCursor';
import { IntroBoomLoader } from './components/common/IntroBoomLoader';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { PageTransition } from './components/common/PageTransition';

// Lazy-loaded pages for lean bundle splitting
import { HomePage } from './pages/HomePage';
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const CurtainStylesPage = lazy(() => import('./pages/CurtainStylesPage').then(m => ({ default: m.CurtainStylesPage })));
const RomanBlindsPage = lazy(() => import('./pages/RomanBlindsPage').then(m => ({ default: m.RomanBlindsPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then(m => ({ default: m.GalleryPage })));
const ClientsPage = lazy(() => import('./pages/ClientsPage').then(m => ({ default: m.ClientsPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));

// Minimal luxury skeleton fallback
const PageFallback = () => (
  <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
    <div className="w-10 h-10 border border-[#C5A880] animate-spin flex items-center justify-center">
      <div className="w-6 h-6 border border-[#1E1D1B]" />
    </div>
  </div>
);

export function App() {
  const location = useLocation();

  return (
    <SmoothScroll>
      {/* Intro Boom Particle Ripple Loader (once per session, skippable) */}
      <IntroBoomLoader />

      {/* Luxury Follower Custom Cursor */}
      <CustomCursor />

      {/* Main Luxury Layout */}
      <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E1D1B] selection:bg-[#C5A880]/30 selection:text-[#1E1D1B] relative">
        <Navbar />

        <main className="flex-1 w-full">
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <Suspense fallback={<PageFallback />}>
                <Routes location={location}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/curtain-styles" element={<CurtainStylesPage />} />
                  <Route path="/roman-blinds" element={<RomanBlindsPage />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/clients" element={<ClientsPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="*" element={<HomePage />} />
                </Routes>
              </Suspense>
            </PageTransition>
          </AnimatePresence>
        </main>

        <Footer />
        <FloatingWhatsApp />
      </div>
    </SmoothScroll>
  );
}

export default App;
