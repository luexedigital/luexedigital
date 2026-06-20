import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Scroll-triggered reveal wrapper. Honors prefers-reduced-motion by rendering
 * a plain element with no transform animation.
 */
export function Reveal({
  children,
  delay = 0,
  y = 36,
  className = "",
  as = "div",
  once = true,
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-70px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Staggered word-by-word headline reveal.
 */
export function RevealText({ text, className = "", delay = 0 }) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{text}</span>;

  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.06,
              ease: EASE,
            }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}
