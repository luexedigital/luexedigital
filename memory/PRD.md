# Luexe Digital — Premium 3D Landing Page (PRD)

## Original Problem Statement
Build an Awwwards-level premium landing page with rich 3D animations and **adaptive rendering** that does not compromise performance/mobile usability. Targets: FCP < 2s, Lighthouse > 85 mobile / > 90 desktop, 60 FPS, lazy-loaded heavy assets, respects `prefers-reduced-motion`.

Brand: **Luexe Digital** — elite performance-marketing & web-dev agency for Kuwait & the GCC. Dark, cinematic, futuristic (Apple × Linear × Tesla × Stripe). Stack requested: React, Three.js / React Three Fiber, GSAP, Framer Motion, Lenis smooth scroll. Official brand monogram provided by user.

## Architecture / Tasks Done
- Pure **frontend** single-page experience (no backend integration needed). Backend untouched (default template).
- **Adaptive rendering** via `usePerformanceTier` hook → tiers high / mid / low control dpr, particle count, glass shards, bloom, antialias, environment. `prefers-reduced-motion` → 3D canvas skipped, static glowing brand mark shown.
- **3D Hero** (`three/HeroScene.jsx`, lazy-loaded chunk): official `luexe-mark.png` as a floating, mouse-reactive glowing billboard + additive particle fields (purple/cyan), floating glass octahedra, Lightformer-based environment reflections, and selective Bloom post-processing. Inner `<Suspense>` keeps the EffectComposer stable.
- **Lenis** smooth scrolling, **GSAP** loader counter, **Framer Motion** scroll reveals + counters, custom glowing cursor, magnetic buttons, glassmorphism, neon glow, marquee, parallax case-study images.
- Sections: Loader → Hero → Stats (count-up) → Services → Process → Industries → Portfolio → Why Us → Testimonials → Final CTA → Footer. All have `data-testid`s.
- Brand logo used in navbar / loader / footer (local `/luexe-mark.png`, transparent).
- Fixed CRA5 + webpack-dev-server v5 incompatibility (stripped `onBeforeSetupMiddleware`/`onAfterSetupMiddleware`, migrated `https`→`server` in `craco.config.js`).

## User Personas
- GCC business owners / marketing directors evaluating a premium growth partner.
- Prospects on mobile and desktop expecting a fast, luxurious, trustworthy experience.

## Core Requirements (static)
Cinematic dark aesthetic, real brand monogram as hero centerpiece, adaptive 3D performance, reduced-motion support, all sections present, CTAs that route to contact (mailto) / work.

## Implemented (2026-06-20)
- Full landing page with all 11 sections, 3D brand-mark hero, adaptive tiers, smooth scroll, animations, mobile menu.
- Verified by testing agent: 100% frontend pass, 0 console/runtime errors, counters animate with no negative flash, mobile menu works, 0 horizontal overflow.

## Backlog / Remaining
- **P1**: Working lead-capture form (currently CTAs use `mailto:` — would need a backend `/api/leads` + DB + email integration).
- **P2**: Real case-study detail pages / portfolio gallery.
- **P2**: i18n (Arabic / RTL) for GCC audience.
- **P2**: Replace placeholder testimonials/metrics with real client data.
- **P3**: Lighthouse CI / image `srcset` + WebP optimization pass.

## Next Tasks
1. (If requested) Add a contact/lead form with backend + email (Resend/SendGrid).
2. Arabic/RTL localization.
3. Real portfolio content + analytics.
