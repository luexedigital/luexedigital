import React, { useEffect, useRef, useState } from "react";

/**
 * Custom glowing cursor (dot + lerped ring). Auto-hides on touch devices and
 * when reduced motion / low-tier is requested via the `disabled` prop.
 */
export default function Cursor({ disabled = false }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (disabled) return undefined;
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    const onOver = (e) => {
      const interactive = e.target.closest(
        'a, button, [data-cursor="hover"], input, textarea'
      );
      setHovering(!!interactive);
    };

    let raf;
    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.18;
      ring.current.y += (pos.current.y - ring.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [disabled]);

  if (disabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div
        ref={ringRef}
        className={`cursor-ring ${hovering ? "hovering" : ""}`}
        aria-hidden="true"
      />
    </>
  );
}
