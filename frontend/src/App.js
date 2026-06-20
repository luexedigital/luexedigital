import React, { useState } from "react";
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

export default function App() {
  const perf = usePerformanceTier();
  const [loaded, setLoaded] = useState(false);

  useLenis(perf.reducedMotion);

  return (
    <div className="App grain bg-midnight font-body text-softwhite">
      <Cursor disabled={perf.tier === "low" || perf.reducedMotion} />

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
