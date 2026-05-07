# Phase 0 Research — 001-ai-native-portfolio

Resolves all `NEEDS CLARIFICATION` items from `plan.md` Technical Context and the design decisions in §"High-Level Design Decisions". Each entry follows `Decision / Rationale / Alternatives considered`.

---

## R1. Build tool & framework

- **Decision**: React 18 + Vite 5 + TypeScript 5.4.
- **Rationale**: Single page, no SSR, no routing per spec §6. Vite gives the smallest toolchain that still supports lazy-loading R3F, ESM-native, and one-command static deploy. React satisfies FR-160..166 modularity and is the substrate Framer Motion + R3F target.
- **Alternatives**:
  - **Next.js (App Router)** — rejected: SSR/RSC features unused, larger bundle, more config surface, and no SEO need beyond a single page that can be pre-rendered statically anyway.
  - **Astro** — rejected: islands model is appealing but Hero needs a persistent React tree for `MotionContext` + `useMousePosition`; partial hydration adds complexity for one page.
  - **SvelteKit** — rejected: ecosystem support for R3F-equivalent (`threlte`) is thinner; spec ecosystem references React-native libraries (Framer Motion).

## R2. Hero visual library

> **Superseded 2026-05-07 (rev. 3) — see R2-rev below.** Original entry preserved for traceability.

- **Decision**: React Three Fiber (R3F) + drei + three.js for primary; Canvas2D in a sibling component for fallback.
- **Rationale**: R3F renders true 3D depth/bloom expected of a "control room"; drei provides camera + line/points helpers that keep node-graph code under ~150 LOC. Canvas2D fallback shares the same `capabilities.ts` graph data, ensuring identity parity (FR-170, FR-174, FR-012).
- **Alternatives**:
  - **Vanilla three.js** — rejected: more imperative lifecycle code, more risk of leaks on unmount.
  - **PixiJS / 2D-only** — rejected: no depth cues; harder to communicate "spatial layering" per spec §1.2.
  - **CSS-only animated SVG** — kept as the **`static` performance mode** asset, not as the default.

## R2-rev. Hero visual approach (rev. 3, 2026-05-07)

- **Decision**: No 3D library, no canvas. Hero is a typography-driven wall using existing Space Grotesk + Framer Motion only.
- **Rationale**: Per spec §9.2 Option D / FR-170, the Hero pivots to "Cinematic Typography Wall". This eliminates R3F, drei, three.js, and the Canvas2D fallback from the Hero critical path. LCP risk drops to near-zero. The motion budget reallocates to letter-stagger + a 1px mouse scan beam — both pure React/CSS.
- **Net effect on dependencies**: R3F + drei + three.js are **not** added to `package.json` (they were never installed in Phase 1; the canvas fallback we shipped uses native `<canvas>` 2D context only). This rev. simply removes the Phase 2 plan to install them.
- **Disposition of the existing Canvas2D node graph (`AgentNodeGraphFallback.tsx`)**: retained but unused by Hero. Reserved as a Phase 3 candidate visual anchor for Capability Map per spec FR-170-CAP.
- **Alternatives reconsidered**:
  - **Keep Option A (R3F)** — rejected: literal "AI control room" reads dashboard-y; user feedback after Phase 1 implementation flagged this directly.
  - **Option B (Lab Orb)** — rejected for v1: still requires R3F for the volumetric core; defers the same dependency cost.
  - **Option D (this) — Cinematic Typography Wall** — chosen: matches the Digital Experimental Lab tone via restraint rather than density, ships the lowest LCP, and lets the typography itself carry the brand.

## R3. Animation library

- **Decision**: Framer Motion 11 only.
- **Rationale**: Covers Level-2 hover (`whileHover`, `layoutId`), Level-3 reveal (`useInView`), and `MagneticButton` cursor coupling. Single dependency reduces JS budget vs combining libraries.
- **Alternatives**:
  - **GSAP** — rejected: powerful but adds another runtime; no scroll-trigger feature needed beyond `useInView`. Spec §16 priority "maintainability over one-off animation tricks" disfavors a second library.
  - **Motion One** — rejected: smaller but lacks `MotionContext` + `useInView` ergonomics with React.

## R4. Styling system

- **Decision**: Tailwind CSS 3 with design tokens defined in `tailwind.config.ts → theme.extend.colors / fontSize / spacing`, mirrored to CSS custom properties in `src/styles/tokens.css`.
- **Rationale**: Single source of truth for spec §7 tokens; utility classes accelerate the modular component build; CSS vars are reachable from R3F shader code.
- **Alternatives**:
  - **CSS Modules + hand-rolled vars** — rejected: more boilerplate; lacks responsive utility ergonomics.
  - **vanilla-extract / Stitches** — rejected: build-time complexity not warranted for one page.

## R5. Typography delivery

- **Decision**: Self-host Inter Variable + Space Grotesk via `@fontsource-variable/inter` + `@fontsource/space-grotesk`. `font-display: swap`.
- **Rationale**: Avoids Google Fonts external request (privacy + LCP volatility). Variable Inter cuts weight files. Two faces is the spec §7.4 cap.
- **Alternatives**:
  - **Google Fonts CDN** — rejected: adds third-party DNS / TLS / GDPR surface.
  - **Geist Sans only** — viable; deferred as a Phase 2 perceptual A/B (`plan.md` D-Open #2).

## R6. Reduced motion + low-FPS detection

- **Decision**: `useReducedMotion` reads `window.matchMedia('(prefers-reduced-motion: reduce)')` and subscribes to changes. `usePerformanceMode` runs a 1.5s rAF probe on mount, computing rolling avg fps; if avg < 30, downgrade one tier.
- **Rationale**: Lightweight, no third-party. Probe duration short enough to not block Phase 2 Hero readiness (Hero text already painted by then).
- **Alternatives**:
  - **`navigator.deviceMemory` / `navigator.hardwareConcurrency` heuristics** — kept as a tie-breaker only; primary signal is measured fps because shipped JS is the actual bottleneck.
  - **No detection, ship full mode always** — rejected: violates FR-111 / SC-006 mobile.

## R7. Mouse / pointer interaction model

- **Decision**: `useMousePosition` exposes normalized `[-1, 1]` coords debounced via `requestAnimationFrame`. Touch events map to last-touch position. On touch-only devices, hover-driven Level-2 feedback degrades to tap (FR-031, FR-181).
- **Rationale**: rAF-debounced events stay under the 100ms feedback budget (FR-011) without throttling jitter. Single hook keeps the API surface small.
- **Alternatives**:
  - **Mousemove listener without rAF** — rejected: causes jank on devices with high-frequency mice.
  - **Pointer events native deltas** — equivalent but slightly less ergonomic across React's synthetic event boundary.

## R8. WebGL fallback trigger

- **Decision**: Test for WebGL2 context at `MotionContext` init. If unavailable OR `performanceMode === 'static'` OR `prefers-reduced-motion`, render `AgentNodeGraphFallback`.
- **Rationale**: Single decision point; no per-frame branching. Re-evaluated only on visibility change (page back from background tab).
- **Alternatives**:
  - **Try R3F, catch error, swap** — rejected: risk of FOUC/blank Hero between attempt and swap.

## R9. Immersive mode (Phase 5)

- **Decision**: `useImmersiveMode` wraps `getUserMedia({ video: true })` + MediaPipe Hands (lazy-imported). Default off; explicit user click; on permission deny, set state to `unavailable` and never re-prompt; visible disable button releases tracks via `MediaStreamTrack.stop()`.
- **Rationale**: MediaPipe Hands runs in WebAssembly + WebGL, ~3MB lazy chunk acceptable since opt-in. Aligns with FR-090..092.
- **Alternatives**:
  - **TensorFlow.js handpose** — rejected: larger model, slower inference.
  - **Skip Phase 5 entirely** — viable; spec §13 marks it optional. Decision: scaffold the hook but defer activation.

## R10. Testing stack

- **Decision**: Vitest (unit) + Playwright (E2E + a11y via `@axe-core/playwright`) + Lighthouse CI (perf gate).
- **Rationale**: Vitest matches Vite, zero-config. Playwright covers responsive viewports, WebGL-disabled mode (`--disable-webgl` flag), and reduced-motion emulation (`page.emulateMedia({ reducedMotion: 'reduce' })`).
- **Alternatives**:
  - **Jest** — rejected: extra config under Vite.
  - **Cypress** — viable but Playwright's `emulateMedia` + multi-viewport projects fits SC-005/008 directly.

## R11. Deployment target

- **Decision**: Static deploy to Netlify (primary) or any static host (Vercel, GitHub Pages, Cloudflare Pages).
- **Rationale**: Spec §6 states static deploy. Build output is `dist/` from Vite.
- **Alternatives**: None warrant evaluation; choice is reversible.

## R12. Replacement strategy for legacy files

- **Decision**: Move existing `index.html`, `styles.css`, `script.js` to `legacy/` directory; new Vite-generated `index.html` takes the root.
- **Rationale**: Preserve git history of legacy attempt; avoid accidental loss; allow side-by-side comparison during Phase 1.
- **Alternatives**:
  - **Delete outright** — rejected: irreversible.
  - **Keep in place under different name** — rejected: clutters root.

---

## Resolved `NEEDS CLARIFICATION` Items

All Technical Context entries in `plan.md` have concrete answers (no `NEEDS CLARIFICATION` markers remain). Constitution gates G1–G7 pass post-research.
