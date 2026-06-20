import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function LaserScroll() {
  const { scrollYProgress } = useScroll();

  // Dynamically change colors based on scroll depth
  const color1 = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ["#00E5FF", "#7C3AED", "#FF007A", "#00E5FF"]
  );
  
  const color2 = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ["#7C3AED", "#FF007A", "#00E5FF", "#7C3AED"]
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <svg 
        className="w-full h-full" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="laser-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <motion.stop offset="0%" stopColor={color1} stopOpacity="0.4" />
            <motion.stop offset="50%" stopColor={color2} stopOpacity="0.8" />
            <motion.stop offset="100%" stopColor={color1} stopOpacity="1" />
          </linearGradient>

          {/* Elegant Glow */}
          <filter id="elegant-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur1" />
            <feGaussianBlur stdDeviation="0.8" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* === MAIN LASER === */}
        {/* Smooth, elegant outer aura */}
        <motion.path
          d="M 0 0 L 100 0 L 100 100 L 0 100 Z"
          fill="none"
          stroke="url(#laser-gradient)"
          strokeWidth="0.8"
          filter="url(#elegant-glow)"
          style={{ pathLength: scrollYProgress }}
        />
        
        {/* Sharp inner core for the sleek laser look */}
        <motion.path
          d="M 0 0 L 100 0 L 100 100 L 0 100 Z"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="0.15"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
    </div>
  );
}
