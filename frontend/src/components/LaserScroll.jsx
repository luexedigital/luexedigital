import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function LaserScroll() {
  const { scrollYProgress } = useScroll();

  // We map the total scroll progress (0 to 1) across the 4 borders of the screen.
  // Top border draws left to right.
  const topScale = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  // Right border draws top to bottom.
  const rightScale = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);
  // Bottom border draws right to left.
  const bottomScale = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);
  // Left border draws bottom to top.
  const leftScale = useTransform(scrollYProgress, [0.75, 1], [0, 1]);

  // A sleek static box-shadow for the laser glow is infinitely faster than SVG feGaussianBlur
  const laserGlow = "0 0 10px rgba(0,229,255,0.6), 0 0 20px rgba(124,58,237,0.4)";

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Top Laser */}
      <motion.div 
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#00E5FF] to-[#7C3AED]"
        style={{ 
          width: "100%", 
          scaleX: topScale, 
          transformOrigin: "left", 
          boxShadow: laserGlow 
        }}
      />
      {/* Right Laser */}
      <motion.div 
        className="absolute top-0 right-0 w-[2px] bg-gradient-to-b from-[#7C3AED] to-[#FF007A]"
        style={{ 
          height: "100%", 
          scaleY: rightScale, 
          transformOrigin: "top", 
          boxShadow: laserGlow 
        }}
      />
      {/* Bottom Laser */}
      <motion.div 
        className="absolute bottom-0 right-0 h-[2px] bg-gradient-to-l from-[#FF007A] to-[#00E5FF]"
        style={{ 
          width: "100%", 
          scaleX: bottomScale, 
          transformOrigin: "right", 
          boxShadow: laserGlow 
        }}
      />
      {/* Left Laser */}
      <motion.div 
        className="absolute bottom-0 left-0 w-[2px] bg-gradient-to-t from-[#00E5FF] to-[#00E5FF]"
        style={{ 
          height: "100%", 
          scaleY: leftScale, 
          transformOrigin: "bottom", 
          boxShadow: laserGlow 
        }}
      />
    </div>
  );
}
