import React from "react";
import { Sparkles } from "lucide-react";

const SERVICES = [
  "PERFORMANCE MARKETING",
  "WEBSITE DEVELOPMENT",
  "LEAD GENERATION",
  "SEO & CRO",
  "BRANDING & CREATIVE",
  "PAID SOCIAL",
  "GOOGLE ADS",
  "META ADS",
];

// Duplicate items enough times to ensure seamless infinite scroll
// For a screen width of 1920px, 4-8 copies is usually plenty.
const ROW_ITEMS = [...SERVICES, ...SERVICES, ...SERVICES, ...SERVICES];

export default function ServicesTicker() {
  return (
    <section className="relative w-full overflow-hidden border-y border-transparent py-6 group bg-gradient-to-b from-[#020515] to-black">
      {/* 1px Gradient Borders (simulated via absolute positioning) */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-electric via-royal to-electric opacity-60" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-royal via-electric to-royal opacity-60" />
      
      {/* Deep noise / faint grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwem0xIDF2MjJoMjJWMXoiIGZpbGw9IiM0NjRkNmYiIGZpbGwtb3BhY2l0eT0iMC4xIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] mix-blend-screen" />
      
      {/* Edge fade masks */}
      <div className="absolute inset-0 z-10 pointer-events-none marquee-mask" />
      
      <div className="flex flex-col gap-5">
        {/* TOP ROW: Scrolls Left */}
        <div className="flex whitespace-nowrap">
          <div className="flex items-center gap-10 px-5 animate-marquee-left group-hover:[animation-play-state:paused]">
            {ROW_ITEMS.map((service, i) => (
              <div key={`top-${i}`} className="flex items-center gap-10">
                <span className="flex items-center font-heading text-sm md:text-base font-bold tracking-[0.25em] text-white/90 uppercase">
                  <Sparkles className="h-4 w-4 text-electric mr-3" />
                  {service}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-electric shadow-[0_0_8px_#00E5FF] opacity-80" />
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM ROW: Scrolls Right */}
        <div className="flex whitespace-nowrap">
          <div className="flex items-center gap-10 px-5 animate-marquee-right group-hover:[animation-play-state:paused]">
            {ROW_ITEMS.map((service, i) => (
              <div key={`bottom-${i}`} className="flex items-center gap-10">
                <span className="flex items-center font-heading text-sm md:text-base font-bold tracking-[0.25em] text-white/90 uppercase">
                  <Sparkles className="h-4 w-4 text-royal mr-3" />
                  {service}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-royal shadow-[0_0_8px_#7C3AED] opacity-80" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
