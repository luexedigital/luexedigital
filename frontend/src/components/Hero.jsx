import React, { Suspense, lazy } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import LogoMark from "@/components/LogoMark";

const HeroScene = lazy(() => import("@/three/HeroScene"));

const EASE = [0.22, 1, 0.36, 1];

export default function Hero({ perf, started }) {
  const reduce = useReducedMotion() || perf.reducedMotion;
  const showCanvas = started && !reduce;

  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* base gradient backdrop (paints instantly, helps perceived FCP) */}
      <div className="absolute inset-0 -z-10 bg-midnight">
        <div className="absolute left-1/2 top-1/3 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.15)_0%,transparent_60%)]" />
        <div className="absolute right-0 top-1/2 h-[600px] w-[600px] translate-x-1/4 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.1)_0%,transparent_60%)]" />
      </div>

      {/* 3D canvas (lazy) */}
      {showCanvas && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Suspense fallback={null}>
            <HeroScene config={perf.scene} />
          </Suspense>
        </div>
      )}

      {/* reduced-motion static centerpiece */}
      {reduce && (
        <div className="absolute inset-0 z-0 flex items-center justify-center">
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
