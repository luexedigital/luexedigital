import React, { useEffect, useRef } from "react";

export default function InteractiveGrid({ className = "" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      container.style.setProperty("--x", `${x}px`);
      container.style.setProperty("--y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      style={{
        maskImage: "radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), black, transparent 100%)",
        WebkitMaskImage: "radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), black, transparent 100%)",
      }}
    >
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #7C3AED 1px, transparent 1px),
            linear-gradient(to bottom, #7C3AED 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
