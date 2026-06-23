import React, { useRef, useEffect } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { useInView } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import MagneticButton from "@/components/MagneticButton";

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px", once: false });

  useEffect(() => {
    if (inView) {
      window.dispatchEvent(new CustomEvent("reveal-final-cta"));
    } else {
      window.dispatchEvent(new CustomEvent("hide-final-cta"));
    }
  }, [inView]);

  return (
    <section
      id="contact"
      ref={ref}
      data-testid="final-cta-section"
      className={`relative overflow-hidden py-32 md:py-48 transition-colors duration-1000 ${inView ? 'bg-[#050308]' : ''}`}
    >
      <div className={`pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-1000 blur-[160px] ${inView ? 'bg-royal/30 scale-110' : 'bg-royal/15'}`} />
      <div className={`pointer-events-none absolute bottom-0 left-1/4 h-[300px] w-[400px] rounded-full transition-all duration-1000 blur-[140px] ${inView ? 'bg-electric/20 scale-125' : 'bg-electric/10'}`} />

      {/* Energy Rings */}
      <div className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-royal/20 rounded-full transition-all duration-1000 ${inView ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} />
      <div className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-electric/20 rounded-full transition-all duration-1000 delay-100 ${inView ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} />

      <div className="relative mx-auto max-w-7xl px-6 text-center md:px-12 z-20">
        <Reveal>
          <p className="eyebrow mb-6">Let's Talk Growth</p>
        </Reveal>
        
        <h2 className="mx-auto max-w-4xl font-heading text-[2.6rem] font-bold leading-[0.95] tracking-tighter text-softwhite sm:text-6xl lg:text-7xl">
          <TextReveal text="Let's Build Something" delay={0.1} />
          <span className="text-gradient block mt-2">
            <TextReveal text="Extraordinary." delay={0.4} />
          </span>
        </h2>
        
        <div className="mx-auto mt-6 max-w-xl font-body text-base text-smoke md:text-lg">
          <TextReveal text="From premium websites and branding to performance marketing and lead generation, Luexe Digital creates digital experiences that help businesses scale." delay={0.6} duration={0.8} stagger={0.02} />
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              href="mailto:hello@luexedigital.com?subject=Free%20Growth%20Consultation"
              testid="final-primary-cta"
            >
              <span className="relative z-10 flex items-center gap-2 px-4 py-2 text-lg">
                Book a Free Growth Consultation
                <ArrowUpRight className="h-5 w-5" />
              </span>
              {/* Particle emitters for the button */}
              <div className="absolute inset-0 bg-gradient-to-r from-electric/20 to-royal/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8 font-body text-sm text-smoke">
            <p>
              Email us directly at{" "}
              <a
                href="mailto:hello@luexedigital.com"
                data-testid="contact-email-link"
                className="text-electric underline-offset-4 hover:underline"
              >
                hello@luexedigital.com
              </a>
            </p>
            <p className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-electric" /> WhatsApp us at{" "}
              <a
                href="https://wa.me/96512345678"
                target="_blank"
                rel="noreferrer"
                className="text-electric underline-offset-4 hover:underline"
              >
                +965 1234 5678
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
