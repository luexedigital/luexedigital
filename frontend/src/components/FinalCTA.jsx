import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";

export default function FinalCTA() {
  return (
    <section
      id="contact"
      data-testid="final-cta-section"
      className="relative overflow-hidden py-28 md:py-40"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-royal/15 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-[300px] w-[400px] rounded-full bg-electric/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 text-center md:px-12">
        <Reveal>
          <p className="eyebrow mb-6">Let's Talk Growth</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto max-w-4xl font-heading text-[2.6rem] font-bold leading-[0.95] tracking-tighter text-softwhite sm:text-6xl lg:text-7xl">
            Let's build something
            <span className="text-gradient"> legendary.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl font-body text-base text-smoke md:text-lg">
            Book a free, no-pressure growth consultation. We'll audit your funnel,
            map the opportunity, and show you exactly how we'd scale your brand.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              href="mailto:luexedigital@gmail.com?subject=Free%20Growth%20Consultation"
              testid="final-primary-cta"
            >
              Book a Free Growth Consultation
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href="#work" variant="secondary" testid="final-secondary-cta">
              View Our Work
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 font-body text-sm text-smoke">
            Or email us directly at{" "}
            <a
              href="mailto:luexedigital@gmail.com"
              data-testid="contact-email-link"
              className="text-electric underline-offset-4 hover:underline"
            >
              luexedigital@gmail.com
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
