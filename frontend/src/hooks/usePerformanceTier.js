import { useEffect, useState } from "react";

/**
 * Detects a device performance tier + reduced-motion preference so the
 * 3D scene and animations can adapt:
 *   tier: "high" | "mid" | "low"
 *   reducedMotion: boolean
 *   isMobile: boolean
 * Plus a derived `scene` config consumed by the R3F hero.
 */
function detect() {
  if (typeof window === "undefined") {
    return { tier: "high", reducedMotion: false, isMobile: false };
  }

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const ua = navigator.userAgent || "";
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const isMobile =
    /Mobi|Android|iPhone|iPod|iPad|Windows Phone/i.test(ua) ||
    (coarse && window.innerWidth < 900);

  const cores = navigator.hardwareConcurrency || 4;
  const mem = navigator.deviceMemory || 4;
  const w = window.innerWidth;

  let tier = "high";
  if (isMobile) {
    tier = "low";
  } else if (cores <= 4 || mem <= 4 || w < 1024) {
    tier = "mid";
  } else if (cores <= 6 || mem <= 6) {
    tier = "mid";
  }

  return { tier, reducedMotion, isMobile };
}

const SCENE_CONFIG = {
  high: {
    dpr: [1, 2],
    particles: 1000,
    shards: 0,
    bloom: true,
    bloomIntensity: 0.95,
    antialias: true,
    environment: true,
  },
  mid: {
    dpr: [1, 1], // strictly cap DPR at 1 for mid devices
    particles: 400,
    shards: 0,
    bloom: true,
    bloomIntensity: 0.6,
    antialias: false,
    environment: false, // Turn off heavy environment reflections
  },
  low: {
    dpr: [0.75, 1], // downscale below native if needed
    particles: 120, // vastly reduced geometry for low end
    shards: 0,
    bloom: false, // Absolutely no bloom
    bloomIntensity: 0,
    antialias: false,
    environment: false,
  },
};

export function usePerformanceTier() {
  const [state, setState] = useState(() => detect());

  useEffect(() => {
    setState(detect());
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setState(detect());
    mq.addEventListener?.("change", onChange);
    window.addEventListener("resize", onChange, { passive: true });
    return () => {
      mq.removeEventListener?.("change", onChange);
      window.removeEventListener("resize", onChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scene = SCENE_CONFIG[state.tier] || SCENE_CONFIG.high;
  return { ...state, scene };
}
