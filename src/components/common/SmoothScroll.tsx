import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      infinite: false,
    });
    lenisRef.current = lenis;

    // Keep GSAP ScrollTrigger tightly synchronized with Lenis smooth scroll
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenisRef.current = null;
      gsap.ticker.remove(updateLenis);
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
    };
  }, []);

  // Reset scroll position synchronously (canceling Lenis inertia) on route changes
  useEffect(() => {
    if (!location.hash) {
      lenisRef.current?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
    }
    const r1 = window.setTimeout(() => ScrollTrigger.refresh(), 550);
    const r2 = window.setTimeout(() => ScrollTrigger.refresh(), 950);
    return () => {
      window.clearTimeout(r1);
      window.clearTimeout(r2);
    };
  }, [location.pathname, location.hash]);

  return <>{children}</>;
};
