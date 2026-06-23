import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { SERVICES } from "@/lib/data";

function AnimatedIcon({ title }) {
  if (title === "Performance Marketing") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-royal">
        <motion.path
          d="M3 17l6-6 4 4 8-8"
          strokeDasharray="30"
          initial={{ strokeDashoffset: 30 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
        <motion.path d="M17 7h4v4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }} />
      </svg>
    );
  }
  if (title === "Website Development") {
    return (
      <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-electric"
        animate={{ rotateY: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 8h18" />
        <path d="M8 4v4" />
      </motion.svg>
    );
  }
  if (title.includes("Branding")) {
    return (
      <motion.svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-electric"
        animate={{ borderRadius: ["0%", "50%", "0%"], rotate: [0, 90, 180] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M12 2L2 12l10 10 10-10L12 2z" />
      </motion.svg>
    );
  }
  if (title.includes("Lead")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-royal">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
        <motion.circle cx="12" cy="12" r="10" stroke="cyan" strokeWidth="2" strokeDasharray="4 60"
          animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
      </svg>
    );
  }
  return <div className="w-6 h-6 rounded-full border border-current" />;
}

function TiltCard({ service, index }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const glow = service.accent === "electric"
    ? "group-hover:shadow-[0_0_40px_-10px_rgba(0,229,255,0.4)]"
    : "group-hover:shadow-[0_0_40px_-10px_rgba(124,58,237,0.4)]";

  return (
    <Reveal delay={index * 0.06} className={`${service.span || "lg:col-span-2"}`} style={{ perspective: 1200 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="card-luxe group h-full p-7 md:p-8 relative bg-graphite/40 border border-white/10 overflow-hidden"
      >
        <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.05] transition-all duration-500 ${glow}`}>
          <AnimatedIcon title={service.title} />
        </div>
        <h3 className="font-heading text-xl font-semibold tracking-tight text-softwhite md:text-2xl" style={{ transform: "translateZ(30px)" }}>
          {service.title}
        </h3>
        <p className="mt-3 font-body text-sm leading-relaxed text-smoke md:text-[0.95rem]" style={{ transform: "translateZ(20px)" }}>
          {service.desc}
        </p>
        <div className="mt-6 flex flex-wrap gap-2" style={{ transform: "translateZ(40px)" }}>
          {service.tags.map((t) => (
            <span key={t} className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 font-body text-[0.7rem] text-smoke">
              {t}
            </span>
          ))}
        </div>
        
        {/* Soft reflection layer */}
        <div className="absolute inset-0 z-10 pointer-events-none rounded-2xl bg-gradient-to-tr from-white/0 via-white/[0.03] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>
    </Reveal>
  );
}

export default function Services() {
  return (
    <section id="services" data-testid="services-section" className="relative py-24 md:py-32 z-10">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-14 max-w-2xl">
          <Reveal>
            <p className="eyebrow mb-4">What We Do</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-heading text-3xl font-bold tracking-tighter text-softwhite md:text-5xl">
              A full-stack growth engine,
              <span className="text-gradient"> built for ambition.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 font-body text-base text-smoke md:text-lg">
              One senior team across strategy, media, design and engineering —
              aligned to a single metric: your growth.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-8 md:gap-6 md:grid-cols-2 lg:grid-cols-6">
          {SERVICES.map((s, i) => (
            <TiltCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
