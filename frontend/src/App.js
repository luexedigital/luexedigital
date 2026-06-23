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
import LogoStrip from "@/components/LogoStrip";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import LaserScroll from "@/components/LaserScroll";
import SEO from "@/components/SEO";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileCTA from "@/components/MobileCTA";
import ExitIntentPopup from "@/components/ExitIntentPopup";

const RESULTS_TEXT = [
  "₹12.4M+ Revenue Generated",
  "14,500+ Leads Delivered",
  "220% Avg Conversion Lift",
  "40% Reduction in CPL",
  "5.4x Average ROAS",
];

export default function App() {
  const perf = usePerformanceTier();
  const [loaded, setLoaded] = useState(false);

  useLenis(perf.reducedMotion);

  return (
    <div className="App bg-midnight font-body text-softwhite relative selection:bg-electric/30 selection:text-white overflow-hidden">
      <SEO />
      <ScrollProgress />
      <WhatsAppButton />
      <MobileCTA />
      <ExitIntentPopup />
      
      {/* LAYER 5: Infinite Background Film Grain Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] grain" />

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
              
              {/* Results Ticker */}
              <Marquee 
                items={RESULTS_TEXT} 
                duration={50} 
                className="border-y border-white/5 bg-[#030303] py-3"
                itemClassName="font-heading text-xs md:text-sm font-bold tracking-widest text-electric uppercase"
                separator={<span className="text-royal font-bold">•</span>}
              />
              
              <Stats />
              <div className="h-24 w-full bg-gradient-to-b from-transparent via-black/40 to-transparent pointer-events-none" />
              <Services />
              <div className="h-24 w-full bg-gradient-to-b from-transparent via-black/40 to-transparent pointer-events-none" />
              <Process />
              <div className="h-24 w-full bg-gradient-to-b from-transparent via-black/40 to-transparent pointer-events-none" />
              <Industries />
              <div className="h-24 w-full bg-gradient-to-b from-transparent via-black/40 to-transparent pointer-events-none" />
              <CaseStudies />
              <div className="h-24 w-full bg-gradient-to-b from-transparent via-black/40 to-transparent pointer-events-none" />
              <WhyUs />
              <div className="h-24 w-full bg-gradient-to-b from-transparent via-black/40 to-transparent pointer-events-none" />
              
              {/* Client Logo Strip */}
              <LogoStrip />
              
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
