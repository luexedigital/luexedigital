import React from "react";
import { Reveal } from "@/components/Reveal";
import { SERVICES } from "@/lib/data";

export default function Services() {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-14 max-w-2xl">
          <Reveal>
            <p className="eyebrow mb-4">What We Do</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-heading text-3xl font-bold tracking-tighter text-softwhite md:text-5xl">
              A full-stack growth engine,
              <span className="text-gradient"> built for ambition.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 font-body text-base text-smoke md:text-lg">
              One senior team across strategy, media, design and engineering —
              aligned to a single metric: your growth.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const glow =
              s.accent === "electric"
                ? "group-hover:shadow-[0_0_60px_-15px_rgba(0,229,255,0.5)]"
                : "group-hover:shadow-[0_0_60px_-15px_rgba(124,58,237,0.6)]";
            return (
              <Reveal
                key={s.title}
                delay={i * 0.06}
                className={`${s.span || "lg:col-span-2"}`}
              >
                <div
                  data-testid={`service-card-${i}`}
                  data-cursor="hover"
                  className="card-luxe group h-full p-7 md:p-8"
                >
                  <div
                    className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-softwhite transition-all duration-500 ${glow}`}
                  >
                    <Icon
                      className={`h-5 w-5 ${
                        s.accent === "electric" ? "text-electric" : "text-royal"
                      }`}
                      strokeWidth={1.6}
                    />
                  </div>
                  <h3 className="font-heading text-xl font-semibold tracking-tight text-softwhite md:text-2xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-smoke md:text-[0.95rem]">
                    {s.desc}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 font-body text-[0.7rem] text-smoke"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
