import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { PORTFOLIO } from "@/lib/data";

function CaseCard({ item, index }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <Reveal delay={index * 0.05}>
      <div
        ref={ref}
        data-testid={`portfolio-card-${index}`}
        data-cursor="hover"
        className="group relative overflow-hidden rounded-3xl border border-white/10"
      >
        {/* parallax image */}
        <div className="relative h-[320px] overflow-hidden md:h-[460px]">
          <motion.img
            src={item.image}
            alt={item.name}
            loading="lazy"
            style={reduce ? undefined : { y }}
            className="absolute inset-0 h-[120%] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight/70 to-transparent" />
        </div>

        {/* content */}
        <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-3">{item.sector}</p>
              <h3 className="font-heading text-3xl font-bold tracking-tighter text-softwhite md:text-5xl">
                {item.name}
              </h3>
              <p className="mt-3 max-w-md font-body text-sm text-smoke md:text-base">
                {item.desc}
              </p>
            </div>

            <div className="flex items-end gap-6">
              {item.metrics.map((m) => (
                <div key={m.k}>
                  <div className="font-heading text-2xl font-bold tracking-tight text-gradient-cyan md:text-3xl">
                    {m.v}
                  </div>
                  <div className="font-body text-xs uppercase tracking-wider text-smoke">
                    {m.k}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 font-body text-sm font-medium text-electric opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            {item.result} <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Portfolio() {
  return (
    <section
      id="work"
      data-testid="portfolio-section"
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow mb-4">Selected Work</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-heading text-3xl font-bold tracking-tighter text-softwhite md:text-5xl">
                Results that speak
                <span className="text-gradient"> louder than pitches.</span>
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {PORTFOLIO.map((item, i) => (
            <CaseCard key={item.name} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
