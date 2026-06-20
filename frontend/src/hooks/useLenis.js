import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Mounts Lenis smooth scrolling. Disabled when reduced motion is requested
 * so the OS preference is respected (native scrolling takes over).
 */
export function useLenis(disabled = false) {
  useEffect(() => {
    if (disabled) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // anchor links -> smooth scroll
    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href");
      if (id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el, { offset: -80 });
        }
      }
    };
    document.addEventListener("click", onClick);

    window.__lenis = lenis;
    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      window.__lenis = null;
    };
  }, [disabled]);
}
