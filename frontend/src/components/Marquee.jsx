import React from "react";
import { motion } from "framer-motion";

const DEFAULT_TEXT = [
  "WEBSITE DEVELOPMENT",
  "PERFORMANCE MARKETING",
  "LEAD GENERATION",
  "BRANDING",
  "SEO",
];

export default function Marquee({
  items = DEFAULT_TEXT,
  duration = 30,
  className = "border-y border-white/5 bg-midnight/50 py-4 md:py-6 backdrop-blur-md",
  itemClassName = "font-heading text-sm md:text-base font-bold tracking-[0.2em] text-smoke/50 uppercase",
  separator = <span className="h-1.5 w-1.5 rounded-full bg-electric/40" />,
  renderItem = null,
}) {
  const duplicatedText = [...items, ...items, ...items, ...items];

  return (
    <section className={`relative w-full overflow-hidden ${className}`}>
      <div className="absolute inset-0 z-10 pointer-events-none marquee-mask" />
      
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex items-center gap-12 px-6"
          animate={{ x: "-50%" }}
          transition={{
            duration: duration,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedText.map((item, i) => (
            <div key={i} className="flex items-center gap-12">
              {renderItem ? renderItem(item, i) : (
                <span className={itemClassName}>
                  {item}
                </span>
              )}
              {separator && separator}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
