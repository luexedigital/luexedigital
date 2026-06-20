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
    particles: 1500,
    shards: 6,
    bloom: true,
    bloomIntensity: 0.95,
    antialias: true,
    environment: true,
  },
  mid: {
    dpr: [1, 1.5],
    particles: 650,
    shards: 3,
    bloom: true,
    bloomIntensity: 0.7,
    antialias: true,
    environment: true,
  },
  low: {
    dpr: 1,
    particles: 220,
    shards: 0,
    bloom: false,
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
