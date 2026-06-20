import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import LogoMark from "@/components/LogoMark";

/**
 * Premium loading screen. GSAP-driven 0 → 100 counter, progress hairline,
 * then ascends out of view and signals completion.
 */
export default function Loader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const obj = useRef({ v: 0 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tl = gsap.timeline();
    tl.to(obj.current, {
      v: 100,
      duration: reduce ? 0.6 : 2.1,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.round(obj.current.v)),
      onComplete: () => setExiting(true),
    });
    return () => tl.kill();
  }, []);

  return (
    <motion.div
      data-testid="loader-screen"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-midnight"
      initial={{ y: 0 }}
      animate={exiting ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: exiting ? 0.25 : 0 }}
      onAnimationComplete={() => exiting && onComplete?.()}
    >
      {/* ambient glows */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-royal/20 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        <div className="animate-glow-pulse">
          <LogoMark size={72} />
        </div>
        <p className="eyebrow">Luexe Digital</p>
      </motion.div>

      {/* bottom row: progress */}
      <div className="absolute bottom-10 left-0 right-0 px-6 md:px-12">
        <div className="mx-auto flex max-w-7xl items-end justify-between">
          <span className="font-body text-xs uppercase tracking-[0.25em] text-smoke">
            Crafting your experience
          </span>
          <span
            data-testid="loader-counter"
            className="font-heading text-5xl font-bold tracking-tighter text-softwhite md:text-7xl"
          >
            {count}
            <span className="text-electric">%</span>
          </span>
        </div>
        <div className="mx-auto mt-5 h-px max-w-7xl overflow-hidden bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-royal to-electric transition-[width] duration-150 ease-out"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
