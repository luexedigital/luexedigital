import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import LogoMark from "@/components/LogoMark";

const EASE = [0.22, 1, 0.36, 1];

export default function Hero({ perf, started }) {
  const reduce = useReducedMotion() || perf.reducedMotion;

  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* base gradient backdrop (paints instantly, helps perceived FCP) */}
      <div className="absolute inset-0 -z-10 bg-midnight">
        {/* We keep these soft static blurs for reduced-motion or as fallbacks before 3D loads */}
        <div className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-royal/10 blur-[140px]" />
        <div className="absolute right-1/4 top-1/2 h-[420px] w-[420px] rounded-full bg-electric/5 blur-[150px]" />
      </div>

      {/* reduced-motion static centerpiece */}
      {reduce && (
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="animate-glow-pulse opacity-70">
            <LogoMark size={220} />
          </div>
        </div>
      )}

      {/* vignette */}
      <div className="hero-vignette pointer-events-none absolute inset-0 z-[1]" />

      {/* content */}
      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-7xl px-6 md:px-12">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            className="eyebrow mb-6"
          >
            Premium Websites & Performance Marketing for Businesses Ready to Scale
          </motion.p>

          <h1 className="font-heading text-5xl font-bold leading-[0.95] tracking-tighter text-softwhite sm:text-6xl lg:text-8xl">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%", filter: "blur(10px)" }}
                animate={{ y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
              >
                Luexe
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="text-gradient block"
                initial={{ y: "110%", filter: "blur(10px)" }}
                animate={{ y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
              >
                Digital
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
            className="mt-7 max-w-xl font-body text-lg text-smoke md:text-xl"
          >
            We build high-converting websites and growth systems that generate leads and elevate brands across Kuwait and the GCC.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
            className="mt-6 flex flex-wrap gap-x-3 gap-y-2 font-body text-xs uppercase tracking-[0.18em] text-smoke/80"
          >
            {[
              "Performance Marketing",
              "Web Development",
              "Lead Gen",
              "SEO",
              "CRO",
            ].map((t, i) => (
              <span key={t} className="flex items-center gap-3">
                {i !== 0 && <span className="text-royal">•</span>}
                {t}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 1.05, ease: EASE }}
            className="pointer-events-auto mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#contact" testid="hero-primary-cta">
              Book a Free Growth Consultation
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              href="#work"
              variant="secondary"
              testid="hero-secondary-cta"
            >
              View Our Work
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-smoke"
      >
        <span className="font-body text-[0.65rem] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <ArrowDown className="h-4 w-4 animate-bounce text-electric" />
      </motion.div>
    </section>
  );
}
