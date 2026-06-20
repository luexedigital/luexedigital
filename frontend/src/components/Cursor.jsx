import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Cursor({ disabled = false }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [clicks, setClicks] = useState([]);

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

    const onClick = (e) => {
      setClicks((prev) => [...prev, { id: Date.now(), x: e.clientX, y: e.clientY }]);
    };

    let raf;
    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.15;
      ring.current.y += (pos.current.y - ring.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("click", onClick, { passive: true });
    
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("click", onClick);
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
      <AnimatePresence>
        {clicks.map((click) => (
          <motion.div
            key={click.id}
            initial={{ scale: 0, opacity: 0.8, x: click.x, y: click.y }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onAnimationComplete={() => {
              setClicks((prev) => prev.filter((c) => c.id !== click.id));
            }}
            className="fixed pointer-events-none z-[10000] rounded-full border-2 border-electric"
            style={{
              width: 40,
              height: 40,
              marginLeft: -20,
              marginTop: -20,
              boxShadow: "0 0 15px #00E5FF",
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}
