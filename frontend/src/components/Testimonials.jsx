import React, { useEffect, useCallback } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Reveal } from "@/components/Reveal";
import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);
    return () => clearInterval(autoplay);
  }, [emblaApi]);

  return (
    <section
      data-testid="testimonials-section"
      className="relative border-t border-white/5 py-24 md:py-32 z-10"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
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
          
          <Reveal delay={0.1}>
            <div className="flex items-center gap-3">
              <button
                onClick={scrollPrev}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-softwhite transition-colors hover:bg-white/10"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={scrollNext}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-softwhite transition-colors hover:bg-white/10"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </Reveal>
        </div>

        <div className="relative mt-10 w-full">
          {/* Fading edges for a cleaner look */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 md:w-32 bg-gradient-to-r from-midnight to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 md:w-32 bg-gradient-to-l from-midnight to-transparent" />
          
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  className="relative flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 pl-6"
                >
                  <div className="card-luxe glass-strong h-full flex flex-col p-8 md:p-10 transition-transform duration-500 hover:-translate-y-2">
                    <Quote className="h-10 w-10 text-royal/60 mb-6" />
                    <p className="flex-1 font-body text-base md:text-lg leading-relaxed text-softwhite/90">
                      “{t.quote}”
                    </p>
                    <div className="mt-8 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          className="h-4 w-4 fill-electric text-electric"
                        />
                      ))}
                    </div>
                    <div className="mt-6 border-t border-white/10 pt-5">
                      <p className="font-heading text-base font-semibold text-softwhite">
                        {t.name}
                      </p>
                      <p className="font-body text-sm text-smoke mt-1">{t.role}</p>
                    </div>
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
