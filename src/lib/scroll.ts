import Lenis from 'lenis';
import { useEffect } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Returns a scrollTo that uses Lenis when active, native smooth otherwise.
// Do not call before hydration from effect-less contexts.
export function scrollToY(y: number, lenis: Lenis | null) {
  if (lenis) {
    lenis.scrollTo(y);
  } else {
    window.scrollTo({ top: y, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }
}

// Smooth scroll for the whole page. Skipped entirely under reduced motion.
export function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // store for consumers (Header/HeroWork dot nav)
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);
}

export function getLenis(): Lenis | null {
  return (window as unknown as { __lenis?: Lenis }).__lenis ?? null;
}

// Smoothly scroll to a CSS selector or '#top'.
export function scrollToSelector(selector: string) {
  if (selector === '#top' || selector === '#') {
    scrollToY(0, getLenis());
    return;
  }
  const el = document.querySelector(selector);
  if (el) {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el as HTMLElement, { offset: 0 });
    else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }
}
