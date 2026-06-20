import React, { useEffect, useState } from "react";

/**
 * Thin neon gradient progress bar pinned to the top of the viewport that
 * fills as the user scrolls. Works with Lenis (reads native scrollY).
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf;
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0;
      setProgress(p);
      raf = null;
    };
    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      data-testid="scroll-progress"
      className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-royal via-electric to-royal"
        style={{
          transform: `scaleX(${progress})`,
          boxShadow: "0 0 12px rgba(0,229,255,0.7)",
          transition: "transform 0.08s linear",
        }}
      />
    </div>
  );
}
