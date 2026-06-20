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

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <div
                data-testid={`testimonial-${i}`}
                className="card-luxe flex h-full flex-col p-7 md:p-8"
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
