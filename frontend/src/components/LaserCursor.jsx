import React, { useEffect, useRef } from "react";

const PURPLE = [124, 58, 237];
const CYAN = [0, 229, 255];

function mix(a, b, t) {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

/**
 * Neon "laser" trail that follows the cursor. A tapering, glowing purple→cyan
 * streak rendered on a full-screen canvas, with extra sparks emitted on scroll.
 * Disabled on touch / reduced-motion / low-tier devices.
 */
export default function LaserCursor({ disabled = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (disabled) return undefined;
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let iw = window.innerWidth;
    let ih = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      iw = window.innerWidth;
      ih = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = iw * dpr;
      canvas.height = ih * dpr;
      canvas.style.width = iw + "px";
      canvas.style.height = ih + "px";
    };
    resize();

    const mouse = { x: iw / 2, y: ih / 2 };
    const head = { x: iw / 2, y: ih / 2 };
    const trail = [];
    const sparks = [];
    const TRAIL_LEN = 26;
    let moved = false;

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      moved = true;
    };

    let scrollVel = 0;
    let lastScroll = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      scrollVel = Math.min(40, Math.abs(y - lastScroll));
      lastScroll = y;
      // emit sparks from the laser head while scrolling
      const n = scrollVel > 6 ? 2 : 1;
      for (let i = 0; i < n; i++) {
        sparks.push({
          x: head.x,
          y: head.y,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4 - 1,
          life: 1,
          c: Math.random(),
        });
      }
      if (sparks.length > 120) sparks.splice(0, sparks.length - 120);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);

    let raf;
    const loop = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, iw, ih);

      head.x += (mouse.x - head.x) * 0.32;
      head.y += (mouse.y - head.y) * 0.32;

      if (moved) {
        trail.push({ x: head.x, y: head.y });
        if (trail.length > TRAIL_LEN) trail.shift();
      }

      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 1; i < trail.length; i++) {
        const t = i / trail.length; // 0 = tail, 1 = head
        const [r, g, b] = mix(PURPLE, CYAN, t);
        ctx.beginPath();
        ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
        ctx.lineTo(trail[i].x, trail[i].y);
        ctx.lineWidth = 0.6 + t * 4.4;
        ctx.strokeStyle = `rgba(${r},${g},${b},${0.12 + t * 0.65})`;
        ctx.shadowBlur = 6 + t * 14;
        ctx.shadowColor = `rgba(${r},${g},${b},0.9)`;
        ctx.stroke();
      }

      // bright laser head
      if (trail.length > 1) {
        ctx.beginPath();
        ctx.arc(head.x, head.y, 2.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(234,253,255,0.95)";
        ctx.shadowBlur = 16;
        ctx.shadowColor = "rgba(0,229,255,0.95)";
        ctx.fill();
      }

      // sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.95;
        s.vy = s.vy * 0.95 + 0.06;
        s.life -= 0.025;
        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        const [r, g, b] = mix(PURPLE, CYAN, s.c);
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.6 * s.life + 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${s.life})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${r},${g},${b},0.9)`;
        ctx.fill();
      }

      scrollVel *= 0.9;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
    };
  }, [disabled]);

  if (disabled) return null;

  return (
    <canvas
      ref={canvasRef}
      data-testid="laser-cursor"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9997,
        pointerEvents: "none",
      }}
    />
  );
}
