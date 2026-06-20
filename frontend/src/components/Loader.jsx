import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import LogoMark from "@/components/LogoMark";

export default function Loader({ onComplete }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setTimeout(() => setExiting(true), 500);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => setExiting(true),
    });

    // 1. Single cyan particle appears
    tl.fromTo(".particle-core", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.5)" });
    
    // 2. Particle multiplies (simulated by splitting out rings/dots)
    tl.to(".particle-split", { scale: 1.5, opacity: 0.5, duration: 0.4, stagger: 0.1, ease: "power2.out" }, "-=0.1");
    
    // 3. Assemble: L + D Monogram
    tl.to(".particle-container", { scale: 0.1, opacity: 0, duration: 0.3, ease: "power3.in" }, "+=0.1");
    tl.fromTo(".loader-logo", { scale: 0.8, opacity: 0, filter: "blur(10px)" }, { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.5, ease: "power2.out" }, "-=0.1");
    
    // 4. LUEXE DIGITAL appears
    tl.fromTo(".loader-text", { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.2");
    
    // Wait briefly before exiting
    tl.to({}, { duration: 0.3 });

    return () => tl.kill();
  }, []);

  return (
    <motion.div
      data-testid="loader-screen"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-midnight"
      initial={{ opacity: 1 }}
      animate={exiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onAnimationComplete={() => exiting && onComplete?.()}
    >
      <div className="relative flex flex-col items-center justify-center h-40">
        
        {/* The initial particle system */}
        <div className="particle-container absolute inset-0 flex items-center justify-center">
          <div className="particle-split absolute w-4 h-4 rounded-full bg-electric blur-[2px]" style={{ transform: 'translate(-20px, -20px)' }} />
          <div className="particle-split absolute w-4 h-4 rounded-full bg-royal blur-[2px]" style={{ transform: 'translate(20px, 20px)' }} />
          <div className="particle-split absolute w-4 h-4 rounded-full bg-electric blur-[2px]" style={{ transform: 'translate(-20px, 20px)' }} />
          <div className="particle-split absolute w-4 h-4 rounded-full bg-royal blur-[2px]" style={{ transform: 'translate(20px, -20px)' }} />
          <div className="particle-core relative z-10 w-3 h-3 rounded-full bg-[#00E5FF] shadow-[0_0_20px_#00E5FF]" />
        </div>

        {/* The assembled logo */}
        <div className="loader-logo opacity-0 absolute inset-0 flex flex-col items-center justify-center">
          <div className="animate-glow-pulse mb-6">
            <LogoMark size={72} />
          </div>
          <p className="loader-text font-heading text-lg tracking-[0.25em] text-softwhite uppercase mt-4">
            Luexe Digital
          </p>
        </div>
      </div>
    </motion.div>
  );
}
