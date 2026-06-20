import React, { useState, useEffect } from "react";
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
import Portfolio from "@/components/Portfolio";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import LaserScroll from "@/components/LaserScroll";
import SEO from "@/components/SEO";

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
      <Cursor disabled={perf.tier === "low" || perf.reducedMotion} />
      <LaserScroll />

      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      <Navbar />

      <main>
        <Hero perf={perf} started={loaded} />
        <Stats />
        <Services />
        <Process />
        <Industries />
        <Portfolio />
        <WhyUs />
        <Testimonials />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
