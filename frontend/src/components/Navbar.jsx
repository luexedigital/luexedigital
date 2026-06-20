import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import LogoMark from "@/components/LogoMark";
import MagneticButton from "@/components/MagneticButton";
import { NAV_LINKS } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      data-testid="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 md:px-12 ${
          scrolled
            ? "my-3 rounded-full border border-white/10 bg-graphite/60 py-3 backdrop-blur-xl"
            : "py-6"
        }`}
      >
        <a href="#top" data-testid="nav-logo" className="flex items-center">
          <LogoMark size={36} withWordmark />
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
              className="group relative font-body text-sm text-smoke transition-colors hover:text-softwhite"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-royal to-electric transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <MagneticButton
            href="#contact"
            testid="nav-cta-button"
            className="!px-6 !py-3 text-xs"
          >
            Book a Call <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
        </div>

        <button
          data-testid="nav-mobile-toggle"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-softwhite lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mx-4 mt-2 rounded-2xl border border-white/10 bg-graphite/90 p-6 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-5">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-heading text-2xl font-semibold text-softwhite"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                data-testid="mobile-cta-button"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-softwhite px-6 py-3.5 text-sm font-semibold text-midnight"
              >
                Book a Free Consultation <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
