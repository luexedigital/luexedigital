import React from "react";
import { Instagram, Linkedin, Twitter, MapPin } from "lucide-react";
import LogoMark from "@/components/LogoMark";
import { NAV_LINKS } from "@/lib/data";

const SERVICE_LINKS = [
  "Performance Marketing",
  "Website Development",
  "Branding & Creative",
  "Lead Generation",
  "SEO & Conversion",
];

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="relative border-t border-white/5 bg-graphite/40 pt-16"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-12 pb-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href="#top" className="inline-flex">
              <LogoMark size={40} withWordmark />
            </a>
            <p className="mt-5 max-w-sm font-body text-sm leading-relaxed text-smoke">
              An elite digital growth partner for ambitious brands across Kuwait
              and the GCC. Strategy, design and engineering under one roof.
            </p>
            <div className="mt-5 flex items-center gap-2 font-body text-sm text-smoke">
              <MapPin className="h-4 w-4 text-electric" />
              Kuwait City, Kuwait
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-body text-xs uppercase tracking-[0.2em] text-smoke">
              Navigate
            </h4>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    data-testid={`footer-nav-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                    className="font-body text-sm text-softwhite/80 transition-colors hover:text-electric"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-body text-xs uppercase tracking-[0.2em] text-smoke">
              Services
            </h4>
            <ul className="mt-5 space-y-3">
              {SERVICE_LINKS.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="font-body text-sm text-softwhite/80 transition-colors hover:text-electric"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/5 py-8 md:flex-row">
          <p className="font-body text-xs text-smoke">
            © {new Date().getFullYear()} Luexe Digital. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {[
              { icon: Instagram, label: "instagram" },
              { icon: Linkedin, label: "linkedin" },
              { icon: Twitter, label: "twitter" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#top"
                aria-label={label}
                data-testid={`footer-social-${label}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-smoke transition-all duration-300 hover:border-electric/50 hover:text-electric"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* oversized wordmark watermark */}
      <div className="pointer-events-none select-none overflow-hidden">
        <p className="-mb-4 translate-y-1/4 text-center font-heading text-[18vw] font-bold leading-none tracking-tighter text-white/[0.025] md:-mb-10">
          LUEXE
        </p>
      </div>
    </footer>
  );
}
