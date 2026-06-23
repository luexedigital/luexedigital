import React, { useEffect, useCallback, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Reveal } from "@/components/Reveal";
import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();

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
              {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <div
                  key={i}
                  className="relative flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 pl-6"
                >
                  <div className={`card-luxe glass-strong h-full flex flex-col p-8 md:p-10 transition-all duration-500 hover:-translate-y-2 ${i === selectedIndex ? 'scale-105 border-electric/30 bg-white/[0.04]' : 'scale-95 opacity-50'} origin-center`}>
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
                    <div className="mt-6 flex items-center gap-4 border-t border-white/10 pt-5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-royal to-electric text-lg font-bold text-white">
                        {t.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-heading text-base font-semibold text-softwhite whitespace-nowrap">
                            {t.name}
                          </p>
                          <span className="flex items-center gap-1 rounded-full bg-electric/10 px-2 py-0.5 text-[10px] font-medium text-electric whitespace-nowrap">
                            <CheckCircle2 className="h-3 w-3" /> Verified
                          </span>
                        </div>
                        <p className="font-body text-sm text-smoke mt-1">{t.role}</p>
                      </div>
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
