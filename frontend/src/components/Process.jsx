import React, { useRef } from "react";
import { motion, useScroll, useInView } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { PROCESS } from "@/lib/data";

function ProcessStep({ p, index, isLeft }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px", once: false });
  const Icon = p.icon;

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-6 mb-12 md:mb-8 md:w-1/2 md:gap-0 ${
        isLeft ? "md:self-start md:pr-12" : "md:flex-row-reverse md:self-end md:pl-12"
      }`}
    >
      {/* node */}
      <div
        className="relative z-10 flex h-14 w-14 flex-none items-center justify-center rounded-full bg-graphite md:absolute md:top-1/2 md:-translate-y-1/2 transition-colors duration-700"
        style={isLeft ? { right: "-28px" } : { left: "-28px" }}
      >
        <motion.div
          initial={{ borderColor: "rgba(255,255,255,0.1)", boxShadow: "0 0 0px rgba(0,229,255,0)" }}
          animate={{
            borderColor: inView ? "rgba(0, 229, 255, 0.8)" : "rgba(255,255,255,0.1)",
            boxShadow: inView ? "0 0 30px rgba(0,229,255,0.6)" : "0 0 0px rgba(0,229,255,0)",
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 rounded-full border-2"
        />
        {/* Soft energy pulse */}
        {inView && (
          <motion.div
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border border-electric"
          />
        )}
        <Icon className={`h-5 w-5 transition-colors duration-700 ${inView ? 'text-electric' : 'text-smoke/50'}`} strokeWidth={1.6} />
      </div>

      <motion.div
        data-testid={`process-step-${index}`}
        initial={{ y: 20, opacity: 0, scale: 0.95 }}
        animate={inView ? { y: 0, opacity: 1, scale: 1 } : { y: 20, opacity: 0.5, scale: 0.95 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`card-luxe flex-1 p-6 md:p-8 relative overflow-hidden transition-all duration-700 ${isLeft ? "md:text-right" : "md:text-left"} ${inView ? "border-electric/30 shadow-[0_10px_40px_-10px_rgba(0,229,255,0.2)]" : "border-white/10"}`}
      >
        {/* Beam glow on the card edge */}
        <div className={`absolute top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-electric to-transparent transition-opacity duration-700 ${inView ? 'opacity-100' : 'opacity-0'} ${isLeft ? 'right-0' : 'left-0'}`} />

        <span className={`font-heading text-sm font-bold tracking-widest transition-colors duration-700 ${inView ? 'text-electric' : 'text-royal/50'}`}>
          {p.step}
        </span>
        <h3 className="mt-1 font-heading text-xl font-semibold tracking-tight text-softwhite md:text-2xl">
          {p.title}
        </h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-smoke">
          {p.desc}
        </p>
      </motion.div>
    </div>
  );
}

export default function Process() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section
      id="process"
      data-testid="process-section"
      className="relative border-t border-white/5 py-24 md:py-32 z-10"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-20 max-w-2xl">
          <Reveal>
            <p className="eyebrow mb-4">How We Work</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-heading text-3xl font-bold tracking-tighter text-softwhite md:text-5xl">
              A proven path from
              <span className="text-gradient"> idea to impact.</span>
            </h2>
          </Reveal>
        </div>

        <div ref={containerRef} className="relative">
          {/* center/left vertical line (base) */}
          <div className="absolute left-[27px] top-2 h-full w-px bg-white/5 md:left-1/2 md:-translate-x-1/2" />
          
          {/* animated glow line */}
          <motion.div 
            className="absolute left-[27px] top-2 w-[3px] bg-gradient-to-b from-transparent via-electric to-electric blur-[1px] origin-top md:left-1/2 md:-translate-x-1/2" 
            style={{ scaleY: scrollYProgress, height: "100%" }}
          />

          <div className="flex flex-col gap-12 md:gap-0">
            {PROCESS.map((p, i) => (
              <ProcessStep key={p.step} p={p} index={i} isLeft={i % 2 === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
