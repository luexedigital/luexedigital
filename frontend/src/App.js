import React, { useState, useEffect } from "react";
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
import SEO from "@/components/SEO";

export default function App() {
  const perf = usePerformanceTier();
  const [loaded, setLoaded] = useState(false);

  useLenis(perf.reducedMotion);

  return (
    <div className="App bg-midnight font-body text-softwhite relative selection:bg-electric/30 selection:text-white overflow-hidden">
      <SEO />
      
      {/* LAYER 5: Infinite Background Film Grain Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 mix-blend-overlay opacity-[0.03] grain" />

      <Cursor disabled={perf.tier === "low" || perf.reducedMotion} />

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
