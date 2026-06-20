import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CASE_STUDIES } from "@/lib/data";

function CaseCard({ item, index }) {
  const ref = useRef(null);
  
  // Removed `useScroll` parallax and `getBoundingClientRect` layout thrashing.
  // Using pure CSS for hover states makes it butter smooth.

  return (
    <Reveal delay={index * 0.05}>
      <motion.div
        ref={ref}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        data-testid={`case-card-${index}`}
        data-cursor="hover"
        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
      >
        {/* Image */}
        <div className="relative h-[360px] overflow-hidden md:h-[500px] rounded-t-3xl">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-70 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 to-transparent" />
          
          <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-white/5 to-white/10 opacity-50" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 z-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-lg">
              <p className="eyebrow mb-3 text-electric/80">{item.sector}</p>
              <h3 className="font-heading text-3xl font-bold tracking-tighter text-softwhite md:text-5xl">
                {item.name}
              </h3>
              <p className="mt-4 font-body text-sm text-smoke md:text-base leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="flex items-end gap-8 mt-6 lg:mt-0">
              {item.metrics.map((m) => (
                <div key={m.k} className="relative group/metric overflow-hidden">
                  <div className="font-heading text-2xl font-bold tracking-tight text-gradient-cyan md:text-4xl transition-transform duration-500 group-hover:translate-y-0 translate-y-2 opacity-80 group-hover:opacity-100">
                    {m.v}
                  </div>
                  <div className="font-body text-xs uppercase tracking-wider text-smoke/70 mt-1 transition-all duration-500 group-hover:text-smoke">
                    {m.k}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2 font-body text-sm font-semibold text-white/0 transition-all duration-500 group-hover:text-electric transform translate-y-4 group-hover:translate-y-0">
            {item.result} <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>
        
        {/* Soft reflection glare on hover */}
        <div className="absolute inset-0 z-20 pointer-events-none rounded-3xl bg-gradient-to-tr from-white/0 via-white/[0.05] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </motion.div>
    </Reveal>
  );
}

export default function CaseStudies() {
  return (
    <section
      id="work"
      data-testid="case-studies-section"
      className="relative py-24 md:py-32 z-10"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-20 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow mb-4">Case Studies</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-heading text-3xl font-bold tracking-tighter text-softwhite md:text-5xl">
                Results that speak
                <span className="text-gradient"> louder than pitches.</span>
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10">
          {CASE_STUDIES.map((item, i) => (
            <CaseCard key={item.name} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
