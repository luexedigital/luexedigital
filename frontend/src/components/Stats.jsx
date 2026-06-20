import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/data";

function CountUp({ target, prefix = "", suffix = "", inView }) {
  const [val, setVal] = useState(0);
  const isInt = Number.isInteger(target);

  useEffect(() => {
    if (!inView) return undefined;
    let raf;
    const duration = 1700;
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

  const display = isInt ? Math.round(val) : val.toFixed(1);
  return (
    <span>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      data-testid="stats-section"
      className="relative border-y border-white/5 bg-graphite/40 py-20 md:py-24"
    >
      <div ref={ref} className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
              data-testid={`stat-${i}`}
            >
              <div className="font-heading text-4xl font-bold tracking-tighter text-softwhite md:text-6xl">
                <span className="text-gradient-cyan">
                  <CountUp
                    target={s.value}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    inView={inView}
                  />
                </span>
              </div>
              <p className="mt-3 font-body text-sm font-medium text-softwhite md:text-base">
                {s.label}
              </p>
              <p className="mt-1 font-body text-xs text-smoke">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
