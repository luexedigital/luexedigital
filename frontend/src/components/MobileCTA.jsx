import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function MobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[90] md:hidden"
        >
          <a
            href="#contact"
            className="flex w-full items-center justify-center gap-2 bg-gradient-to-r from-electric to-royal py-4 px-6 text-center font-heading text-lg font-bold text-white shadow-[0_-10px_30px_rgba(124,58,237,0.3)]"
          >
            Book a Free Call
            <ArrowUpRight className="h-5 w-5" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
