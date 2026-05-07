## What

Phase 1 — Foundation. Vite + React + TS + Tailwind + Framer Motion scaffold with a fully data-driven 7-section single page.

## Why

Implements `specs/001-ai-native-portfolio/plan.md` Phase 1 acceptance gate. Maps to spec FR-001..080 (IA, navigation, all seven sections rendered from `src/data/*`, mobile responsive, motion respect).

## What's in

- Tooling: Vite 5, React 18, TypeScript 5.5, Tailwind 3, Framer Motion 11, self-hosted Inter Variable + Space Grotesk
- Design tokens: `tailwind.config.ts` ↔ `src/styles/tokens.css` (spec §7.1 / §7.3 / §7.5, FR-130..152)
- Motion infra: `MotionProvider` with `useReducedMotion` + `usePerformanceMode` three-tier state machine (`full` / `reduced` / `static`, FR-082, FR-111)
- Data layer: 6 typed modules (`profile / capabilities / projects / methodology / writing / contact`), zero hardcoded copy in JSX (FR-161)
- Layout: sticky `Navbar` (mobile sheet menu) + `Footer` (FR-002, FR-165)
- Visuals: `BackgroundField` (ambient grid + accent glows), `CursorGlow` (Level-2 mouse halo), `AgentNodeGraphFallback` (Canvas2D, 6 capability nodes, mouse-reactive — primary R3F implementation lands in Phase 2)
- Sections: Hero / About / CapabilityMap / FeaturedProjects / Methodology / Writing / Contact
- UI atoms: `Reveal`, `GlassCard`, `MagneticButton`, `Tag`, `SectionHeader`, `ExternalLink`
- Legacy v0 archived under `legacy/`

## How to verify

From `quickstart.md`:

```bash
pnpm install
pnpm dev          # http://localhost:5173 — black bg, Hero with name + agent-node graph + CTAs
```

Manual checks:

1. All 6 navbar links scroll to corresponding section anchor.
2. Hero shows `Yao Xin` + `AI Native Builder` + tagline + 6-node graph that responds to mouse.
3. Capability Map renders 6 cards with stagger reveal.
4. Project cards show problem / designed / pattern / role / impact fields.
5. Methodology shows 6 steps `01..06`.
6. Writing shows 3 placeholder cards.
7. Contact panel has email + GitHub + X CTAs.
8. Mobile (≤ 767px): nav collapses to sheet, Hero stacks vertically.
9. DevTools → Rendering → emulate `prefers-reduced-motion: reduce` → no decorative motion.
10. `pnpm build` succeeds; no console errors.

## Build size

- JS: 291 kB / **93.57 kB gzip** (within plan.md initial budget of ≤ 180 kB excluding lazy 3D — plenty of headroom)
- CSS: 29.69 kB / 6.41 kB gzip

## Out of scope (later phases)

- R3F primary `AgentNodeGraph` (Phase 2)
- Layered project hover, capability node tooltips, full magnetic CTA (Phase 3)
- Lazy loading split, low-FPS auto-degrade verification, Lighthouse CI (Phase 4)
- Webcam / hand tracking (Phase 5, optional)
- Vitest / Playwright suites (lands with Phase 4)

## Risks / Notes

- Spec FR-200 phase ordering honoured: Phase 1 ships static, no R3F yet. Hero currently uses the Canvas2D fallback as its primary visual; this is the same visual that Phase 2 keeps as fallback, so identity stays stable.
- Bundle currently includes all of Framer Motion eagerly. Phase 4 will codesplit if needed.
- Copy is placeholder English per FR-120; ready for owner to swap.
