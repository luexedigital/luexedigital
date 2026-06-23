import React, { useRef, useEffect } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useInView } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";
import MagneticButton from "@/components/MagneticButton";

export default function FinalCTA() {
  const ref = useRef(null);
  const [submitted, setSubmitted] = useState(false);
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
          <div className="mx-auto mt-16 max-w-xl text-left">
            {!submitted ? (
              <form
                action="https://formspree.io/f/placeholder" // Replace with real Formspree endpoint
                method="POST"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                  // In a real implementation, you would use fetch() here
                  // to submit to Formspree, then setSubmitted(true).
                }}
                className="card-luxe glass-strong p-8 flex flex-col gap-5 rounded-2xl"
              >
                <div>
                  <label htmlFor="name" className="block font-body text-xs uppercase tracking-wider text-smoke mb-2">Full Name</label>
                  <input required type="text" id="name" name="name" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="business" className="block font-body text-xs uppercase tracking-wider text-smoke mb-2">Business Name</label>
                  <input required type="text" id="business" name="business" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric transition-colors" placeholder="Acme Corp" />
                </div>
                <div>
                  <label htmlFor="need" className="block font-body text-xs uppercase tracking-wider text-smoke mb-2">What do you need?</label>
                  <select required id="need" name="need" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-electric transition-colors appearance-none">
                    <option value="" disabled selected className="text-black">Select an option</option>
                    <option value="Performance Marketing" className="text-black">Performance Marketing</option>
                    <option value="Website Development" className="text-black">Website Development</option>
                    <option value="Both" className="text-black">Both</option>
                    <option value="Not Sure" className="text-black">Not Sure</option>
                  </select>
                </div>
                <button type="submit" className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white text-midnight font-bold py-4 transition-transform hover:scale-[1.02]">
                  Send Message <ArrowRight className="h-5 w-5" />
                </button>
              </form>
            ) : (
              <div className="card-luxe glass-strong p-8 text-center rounded-2xl border-electric/50">
                <h3 className="font-heading text-2xl font-bold text-white mb-2">Message Sent</h3>
                <p className="font-body text-smoke">We'll be in touch within 24 hours.</p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
