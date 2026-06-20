import React from "react";
import { Reveal } from "@/components/Reveal";
import { INDUSTRIES } from "@/lib/data";

export default function Industries() {
  const row = [...INDUSTRIES, ...INDUSTRIES];
  return (
    <section
      data-testid="industries-section"
      className="relative border-y border-white/5 py-20 md:py-24"
    >
      <div className="mx-auto mb-12 max-w-7xl px-6 md:px-12">
        <Reveal>
          <p className="eyebrow mb-4">Industries We Serve</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-2xl font-heading text-3xl font-bold tracking-tighter text-softwhite md:text-5xl">
            Trusted across the Gulf's most
            <span className="text-gradient"> demanding sectors.</span>
          </h2>
        </Reveal>
      </div>

      <div className="marquee-mask relative flex overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-4 pr-4">
          {row.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <div
                key={i}
                className="flex flex-none items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-6 py-4"
              >
                <Icon className="h-5 w-5 text-electric" strokeWidth={1.6} />
                <span className="font-heading text-lg font-medium tracking-tight text-softwhite md:text-xl">
                  {ind.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
