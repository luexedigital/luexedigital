import React from "react";
import { Star, Quote } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
  return (
    <section
      data-testid="testimonials-section"
      className="relative border-t border-white/5 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-14 max-w-2xl">
          <Reveal>
            <p className="eyebrow mb-4">Client Stories</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-heading text-3xl font-bold tracking-tighter text-softwhite md:text-5xl">
              Brands that grew with
              <span className="text-gradient"> Luexe.</span>
            </h2>
          </Reveal>
        </div>

        <div className="relative mt-10 flex overflow-hidden w-full">
          {/* Fading edges for a cleaner look */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-midnight to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-midnight to-transparent" />
          
          <div className="flex w-max animate-marquee items-center group">
            {/* We render two sets of the same testimonials to create a seamless loop */}
            <div className="flex gap-6 px-3">
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={t.name + '-1'}
                  data-testid={`testimonial-${i}`}
                  className="card-luxe flex w-[350px] md:w-[400px] shrink-0 flex-col p-7 md:p-8 hover:bg-white/5 transition-colors"
                >
                  <Quote className="h-8 w-8 text-royal/70" />
                  <p className="mt-5 flex-1 font-body text-base leading-relaxed text-softwhite/90">
                    “{t.quote}”
                  </p>
                  <div className="mt-6 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        className="h-3.5 w-3.5 fill-electric text-electric"
                      />
                    ))}
                  </div>
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <p className="font-heading text-sm font-semibold text-softwhite">
                      {t.name}
                    </p>
                    <p className="font-body text-xs text-smoke">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-6 px-3" aria-hidden="true">
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={t.name + '-2'}
                  className="card-luxe flex w-[350px] md:w-[400px] shrink-0 flex-col p-7 md:p-8 hover:bg-white/5 transition-colors"
                >
                  <Quote className="h-8 w-8 text-royal/70" />
                  <p className="mt-5 flex-1 font-body text-base leading-relaxed text-softwhite/90">
                    “{t.quote}”
                  </p>
                  <div className="mt-6 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        className="h-3.5 w-3.5 fill-electric text-electric"
                      />
                    ))}
                  </div>
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <p className="font-heading text-sm font-semibold text-softwhite">
                      {t.name}
                    </p>
                    <p className="font-body text-xs text-smoke">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
