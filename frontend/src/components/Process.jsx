import React from "react";
import { Reveal } from "@/components/Reveal";
import { PROCESS } from "@/lib/data";

export default function Process() {
  return (
    <section
      id="process"
      data-testid="process-section"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-royal/10 blur-[140px]" />
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-16 max-w-2xl">
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

        <div className="relative">
          {/* center/left vertical line */}
          <div className="process-line absolute left-[27px] top-2 h-full w-px md:left-1/2 md:-translate-x-1/2" />

          <div className="flex flex-col gap-12 md:gap-0">
            {PROCESS.map((p, i) => {
              const Icon = p.icon;
              const left = i % 2 === 0;
              return (
                <Reveal
                  key={p.step}
                  delay={0.05}
                  className={`relative flex items-start gap-6 md:w-1/2 md:gap-0 ${
                    left ? "md:self-start md:pr-12" : "md:flex-row-reverse md:self-end md:pl-12"
                  } md:my-8`}
                >
                  {/* node */}
                  <div className="relative z-10 flex h-14 w-14 flex-none items-center justify-center rounded-full border border-white/10 bg-graphite md:absolute md:top-1/2 md:-translate-y-1/2"
                    style={left ? { right: "-28px" } : { left: "-28px" }}
                  >
                    <Icon className="h-5 w-5 text-electric" strokeWidth={1.6} />
                  </div>

                  <div
                    data-testid={`process-step-${i}`}
                    className={`card-luxe flex-1 p-6 md:p-7 ${left ? "md:text-right" : "md:text-left"}`}
                  >
                    <span className="font-heading text-sm font-bold tracking-widest text-royal">
                      {p.step}
                    </span>
                    <h3 className="mt-1 font-heading text-xl font-semibold tracking-tight text-softwhite md:text-2xl">
                      {p.title}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-smoke">
                      {p.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
