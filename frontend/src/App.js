import React, { useState, useEffect, Suspense, lazy } from "react";
import { AnimatePresence } from "framer-motion";
import "@/App.css";
import { usePerformanceTier } from "@/hooks/usePerformanceTier";
import { useLenis } from "@/hooks/useLenis";
import Loader from "@/components/Loader";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
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

  useLenis(perf.reducedMotion);

  // Global mouse tracking for spotlight effect on cards (Optimized)
  useEffect(() => {
    if (perf.reducedMotion) return;
    let ticking = false;

    const handleMouseMove = (e) => {
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
    <div className="App grain bg-midnight font-body text-softwhite">
      <SEO />
      
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
