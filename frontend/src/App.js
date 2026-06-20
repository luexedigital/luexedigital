import React, { useState, useEffect, Suspense, lazy } from "react";
import { AnimatePresence } from "framer-motion";
import "@/App.css";
import { usePerformanceTier } from "@/hooks/usePerformanceTier";
import { useLenis } from "@/hooks/useLenis";
import Loader from "@/components/Loader";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Industries from "@/components/Industries";
import CaseStudies from "@/components/CaseStudies";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import LaserScroll from "@/components/LaserScroll";
import SEO from "@/components/SEO";

const GlobalBackground = lazy(() => import("@/three/GlobalBackground"));

export default function App() {
  const perf = usePerformanceTier();
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useLenis(perf.reducedMotion);

  // Global mouse tracking for spot lighting
  useEffect(() => {
    if (perf.reducedMotion || typeof window === "undefined") return;
    let ticking = false;

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const card = e.target.closest(".card-luxe");
          if (card) {
            const rect = card.getBoundingClientRect();
            card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
            card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [perf.reducedMotion]);

  return (
    <div className="App bg-midnight font-body text-softwhite relative selection:bg-electric/30 selection:text-white">
      <SEO />
      
      {/* LAYER 5: Infinite Background Film Grain Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 mix-blend-overlay opacity-[0.03] grain" />

      {/* Global Mouse Spotlight (Desktop Only) */}
      {!perf.reducedMotion && (
        <div 
          className="pointer-events-none fixed inset-0 z-[1] transition-opacity duration-300 hidden md:block"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(124, 58, 237, 0.05), rgba(0, 229, 255, 0.03), transparent 40%)`
          }}
        />
      )}

      {/* Restored Global Background */}
      {!perf.reducedMotion && (
        <Suspense fallback={null}>
          <GlobalBackground config={perf.scene} />
        </Suspense>
      )}

      <Cursor disabled={perf.tier === "low" || perf.reducedMotion} />
      <LaserScroll />

      <AnimatePresence mode="wait">
        {!loaded ? (
          <Loader key="loader" onComplete={() => setLoaded(true)} />
        ) : (
          <div key="content" className="relative z-10">
            <Navbar />
            <main>
              <Hero perf={perf} started={loaded} />
              <Marquee />
              <Stats />
              <Services />
              <Process />
              <Industries />
              <CaseStudies />
              <WhyUs />
              <Testimonials />
              <FinalCTA />
            </main>
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
