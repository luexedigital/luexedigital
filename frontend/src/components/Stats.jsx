import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function CountUp({ target, prefix = "", suffix = "", inView }) {
  const [val, setVal] = useState(0);
  const isInt = Number.isInteger(target);

  useEffect(() => {
    if (!inView || typeof target !== "number") {
      if (typeof target !== "number") setVal(target);
      return undefined;
    }
    let raf;
    const duration = 2000;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, Math.max(0, (now - start) / duration));
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  if (typeof target !== "number") {
    return <span>{prefix}{target}{suffix}</span>;
  }

  const display = isInt ? Math.round(val) : val.toFixed(1);
  return (
    <span>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

const METRICS = [
  { value: 100, suffix: "+", label: "High-Converting Pages Built", sub: "Engineered for maximum ROI" },
  { value: 10, suffix: ",000+", label: "Leads Generated", sub: "Driving real business growth" },
  { value: "100%", label: "Performance-Driven", sub: "Every decision backed by data" },
  { value: "GCC", label: "Market Expertise", sub: "Deep understanding of local behavior" },
];

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      data-testid="stats-section"
      className="relative py-24 md:py-32"
    >
      <div ref={ref} className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="card-luxe glass-strong p-8 flex flex-col h-full justify-center items-center text-center group"
              data-testid={`stat-${i}`}
            >
              <div className="font-heading text-4xl font-bold tracking-tighter text-softwhite md:text-5xl mb-2">
                <span className="text-gradient-cyan">
                  <CountUp
                    target={s.value}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    inView={inView}
                  />
                </span>
              </div>
              <p className="font-body text-base font-semibold text-softwhite group-hover:text-electric transition-colors">
                {s.label}
              </p>
              <p className="mt-2 font-body text-xs text-smoke">
                {s.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
