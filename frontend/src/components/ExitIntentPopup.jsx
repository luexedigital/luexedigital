import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only run on desktop where exit intent is detectable
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Check if already shown this session
    if (sessionStorage.getItem("exit_intent_shown") === "true") return;

    const onMouseLeave = (e) => {
      if (e.clientY < 10) {
        setShow(true);
        sessionStorage.setItem("exit_intent_shown", "true");
        window.removeEventListener("mouseleave", onMouseLeave);
      }
    };

    window.addEventListener("mouseleave", onMouseLeave);
    return () => window.removeEventListener("mouseleave", onMouseLeave);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 hidden md:flex">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShow(false)}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0c]/90 p-10 shadow-2xl backdrop-blur-xl"
          >
            <button
              onClick={() => setShow(false)}
              className="absolute right-6 top-6 text-smoke transition-colors hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>

            <p className="eyebrow mb-2">Before You Go —</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white mb-4">
              Get a free audit of your current digital presence.
            </h2>
            <p className="font-body text-smoke mb-8">
              No pitch. Just clarity on where you're losing conversions and how to fix it.
            </p>

            <a
              href="#contact"
              onClick={() => setShow(false)}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 font-semibold text-black transition-all hover:bg-gray-200"
            >
              Claim Free Audit
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            
            {/* Glow effect */}
            <div className="pointer-events-none absolute -bottom-1/2 -left-1/2 h-full w-full rounded-full bg-electric/20 blur-[100px]" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
