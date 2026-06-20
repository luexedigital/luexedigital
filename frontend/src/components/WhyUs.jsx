import React from "react";
import { Reveal } from "@/components/Reveal";
import { WHY_US } from "@/lib/data";

export default function WhyUs() {
  return (
    <section
      id="why-us"
      data-testid="why-us-section"
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
          {/* left sticky intro */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <p className="eyebrow mb-4">Why Luexe Digital</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="font-heading text-3xl font-bold leading-tight tracking-tighter text-softwhite md:text-5xl">
                  Not another agency.
                  <span className="text-gradient">
                    {" "}
                    An unfair advantage.
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 font-body text-base text-smoke md:text-lg">
                  We partner with a select group of ambitious brands across
                  Kuwait and the GCC — and treat their growth like our own. Senior
                  craft, radical transparency, and relentless execution.
                </p>
              </Reveal>
            </div>
          </div>

          {/* right grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
            {WHY_US.map((w, i) => {
              const Icon = w.icon;
              return (
                <Reveal key={w.title} delay={i * 0.06}>
                  <div
                    data-testid={`why-card-${i}`}
                    className="card-luxe h-full p-6 md:p-7"
                  >
                    <Icon
                      className="mb-5 h-6 w-6 text-electric"
                      strokeWidth={1.5}
                    />
                    <h3 className="font-heading text-lg font-semibold tracking-tight text-softwhite md:text-xl">
                      {w.title}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-smoke">
                      {w.desc}
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
