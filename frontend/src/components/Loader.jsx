import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setTimeout(() => onComplete?.(), 500);
      return;
    }

    let start = null;
    const duration = 2200; // 2.2 seconds total loading sequence

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progressTime = timestamp - start;
      const percentage = Math.min((progressTime / duration) * 100, 100);
      
      // Premium Expo ease-out for the number counter
      const easeOutExpo = percentage === 100 ? 1 : 1 - Math.pow(2, -10 * (percentage / 100));
      setProgress(Math.floor(easeOutExpo * 100));

      if (progressTime < duration) {
        window.requestAnimationFrame(step);
      } else {
        // Hold at 100% for a tiny beat before firing complete
        setTimeout(() => onComplete?.(), 300);
      }
    };
    window.requestAnimationFrame(step);
  }, [onComplete]);

  return (
    <motion.div
      data-testid="loader-screen"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-[#050308] p-8 md:p-12 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", opacity: 0, scale: 0.95 }}
      transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Cinematic Vignette & Core Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[800px] md:h-[800px] bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.1)_0%,transparent_60%)] rounded-full pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />

      {/* Header */}
      <div className="w-full flex justify-between items-center opacity-40 text-[10px] md:text-xs font-body tracking-[0.3em] uppercase text-softwhite z-10">
        <span>Luexe Digital</span>
        <span>Premium Web Experience</span>
      </div>

      {/* Main Percentage Counter */}
      <div className="flex-1 flex flex-col items-center justify-center w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          <h1 className="text-[20vw] md:text-[14vw] font-heading font-bold text-softwhite tracking-tighter leading-none">
            {progress}
          </h1>
          <span className="absolute top-4 -right-8 md:-right-12 text-xl md:text-4xl text-electric font-heading font-bold">
            %
          </span>
        </motion.div>
      </div>

      {/* Footer / Progress Bar */}
      <div className="w-full max-w-lg flex flex-col gap-6 z-10">
        <div className="flex justify-between text-[10px] md:text-xs tracking-[0.2em] text-smoke/50 uppercase">
          <span>Loading Environment</span>
          <span>{progress === 100 ? "Ready" : "Initializing"}</span>
        </div>
        
        {/* Sleek track */}
        <div className="h-[2px] w-full bg-white/5 overflow-hidden rounded-full relative">
          <motion.div 
            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-royal to-electric"
            style={{ width: `${progress}%` }}
            layout
          />
          
          {/* Scanning light flare effect over the bar */}
          <motion.div
            className="absolute top-0 bottom-0 w-20 bg-white/50 blur-md"
            animate={{ 
              x: ["-100%", "500%"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
