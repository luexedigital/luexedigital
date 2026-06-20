import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Advanced Typography Reveal Component
 * Reveals text word-by-word with translation, opacity, and blur.
 * Usage: <TextReveal text="Let's build something extraordinary." delay={0.2} />
 */
export default function TextReveal({ 
  text, 
  delay = 0, 
  duration = 0.6, 
  stagger = 0.04, 
  className = "" 
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      filter: "blur(10px)" 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { 
        duration: duration, 
        ease: [0.22, 1, 0.36, 1] 
      }
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`flex flex-wrap ${className}`}
    >
      {words.map((word, i) => (
        <span key={i} className="mr-[0.25em] overflow-hidden inline-flex last:mr-0">
          <motion.span variants={wordVariants} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}
