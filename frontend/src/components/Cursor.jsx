import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TRAIL_LENGTH = 8;

export default function Cursor({ disabled = false }) {
  const dotsRef = useRef([]);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const trail = useRef(Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 })));
  const ringPos = useRef({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (disabled) return undefined;
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      // Update head immediately for responsiveness
      if (dotsRef.current[0]) {
        dotsRef.current[0].style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    const onOver = (e) => {
      const interactive = e.target.closest(
        'a, button, [data-cursor="hover"], input, textarea, select'
      );
      setHovering(!!interactive);
    };

    let raf;
    const loop = () => {
      // Smooth ring follow
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }

      // Trailing dots
      let prevX = pos.current.x;
      let prevY = pos.current.y;
      
      for (let i = 1; i < TRAIL_LENGTH; i++) {
        trail.current[i].x += (prevX - trail.current[i].x) * 0.35;
        trail.current[i].y += (prevY - trail.current[i].y) * 0.35;
        
        if (dotsRef.current[i]) {
          dotsRef.current[i].style.transform = `translate(${trail.current[i].x}px, ${trail.current[i].y}px) translate(-50%, -50%)`;
        }
        
        prevX = trail.current[i].x;
        prevY = trail.current[i].y;
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
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (dotsRef.current[i] = el)}
          className={`cursor-dot cursor-dot-${i}`}
          aria-hidden="true"
        />
      ))}
      <div
        ref={ringRef}
        className={`cursor-ring ${hovering ? "hovering" : ""}`}
        aria-hidden="true"
      />
    </>
  );
}
