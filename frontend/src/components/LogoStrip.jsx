import React from "react";
import Marquee from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";

// Placeholder empty logos using simple styled divs
const PLACEHOLDER_LOGOS = [
  "Acme Corp",
  "Global Tech",
  "Nexus Inc",
  "Zenith",
  "Aura Digital",
];

export default function LogoStrip() {
  return (
    <section className="relative py-16 md:py-20 z-10 bg-[#060606]">
      <div className="mx-auto max-w-7xl px-6 md:px-12 mb-8 text-center">
        <Reveal>
          <p className="font-heading text-[0.65rem] uppercase tracking-[0.3em] text-smoke/60">
            Trusted By
          </p>
        </Reveal>
      </div>
      
      <Marquee
        items={PLACEHOLDER_LOGOS}
        duration={40}
        className="py-4 opacity-70"
        separator={null}
        renderItem={(item) => (
          <div className="flex h-12 w-32 items-center justify-center opacity-50 transition-opacity duration-300 hover:opacity-100">
            {/* Replace this div with an actual <img> tag when client logos are available */}
            <span className="font-heading text-xl font-bold tracking-widest text-white/80">
              {item}
            </span>
          </div>
        )}
      />
    </section>
  );
}
