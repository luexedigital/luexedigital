import React from "react";
import { motion } from "framer-motion";

const MARQUEE_TEXT = [
  "WEBSITE DEVELOPMENT",
  "PERFORMANCE MARKETING",
  "LEAD GENERATION",
  "BRANDING",
  "SEO",
];

export default function Marquee() {
  // We duplicate the array to ensure seamless infinite looping
  const duplicatedText = [...MARQUEE_TEXT, ...MARQUEE_TEXT, ...MARQUEE_TEXT, ...MARQUEE_TEXT];

  return (
    <section className="relative w-full overflow-hidden border-y border-white/5 bg-midnight/50 py-4 md:py-6 backdrop-blur-md">
      <div className="absolute inset-0 z-10 pointer-events-none marquee-mask" />
      
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex items-center gap-12 px-6"
          animate={{ x: "-50%" }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedText.map((text, i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="font-heading text-sm md:text-base font-bold tracking-[0.2em] text-smoke/50 uppercase">
                {text}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-electric/40" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
