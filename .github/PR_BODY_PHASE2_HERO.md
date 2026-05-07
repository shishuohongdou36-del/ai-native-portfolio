## What

Pivot Hero from **Option A — Agent Node System** to **Option D — Cinematic Typography Wall** (zero 3D, zero canvas). Updates spec, plan, research, and checklist; replaces `Hero.tsx`; adds two thin visual components (`ScanBeam`, `NoiseOverlay`).

## Why

Phase 1 implementation showed the Agent Node + dashboard chrome read as "AI demo console" rather than "personal studio / lab". User feedback after live preview confirmed the gap with the reference site comes from concept density, not from missing R3F. Pivoting to typography-first restraint matches the *Digital Experimental Lab* tone via composition rather than ornament, removes R3F from the critical path, and keeps LCP near zero.

Refs spec FR-170 (rev. 3), FR-170-NOTE, FR-170-CAP, FR-171–175 (rev. 3), plan.md D2 (rev. 3), research.md R2-rev.

## Spec / plan deltas

- `spec.md` §9.2 adds **Option D — Cinematic Typography Wall**; FR-170 default flips from A → D; FR-171/172/173/174/175 rephrased to fit a typography subject; new pivot annotation block before §7.
- `plan.md` D2 fully rewritten to remove R3F from Hero critical path; performance-mode mapping for Option D added.
- `research.md` R2 marked superseded; new **R2-rev** added with rationale, dependency impact, and disposition of the existing `AgentNodeGraphFallback.tsx` (retained, reserved for Capability Map in Phase 3 per FR-170-CAP).
- `checklists/requirements.md` records rev. 3 delta; PASS WITH NOTE.

## Implementation deltas

- New `src/components/visuals/ScanBeam.tsx` — 1px diagonal scan beam following cursor with damped spring (`useMotionValue` + `useSpring`). Hidden on touch / motion-disabled. Pure DOM, no canvas.
- New `src/components/visuals/NoiseOverlay.tsx` — inline SVG `feTurbulence` film grain, ~0.3 KB gzipped.
- Replaced `src/components/sections/Hero.tsx` with the Cinematic Typography Wall:
  - Top meta strip (year + role + location), film-slate styling.
  - **Subject**: `Yao` / `Xin.` set in Space Grotesk Bold at `clamp(64px, 15vw, 200px)`, tracking `-0.045em`, second line in cyan→violet gradient.
  - Sub-headline: `Builder of AI systems.` at `clamp(28px, 5vw, 72px)`.
  - Letter-by-letter stagger reveal (35ms per char, total ≤ 600ms per FR-080) with blur-in. Collapses to single fade under `prefers-reduced-motion` (FR-082).
  - 3 numbered ticker lines (00 / 01 / 02) carry the previous tagline + capability index + positioning.
  - Two CTAs (`Explore My Work`, `View Methodology`) preserve previous routing.
  - Bottom strip = "available" pulse + scroll cue + email — minimal.
- `AgentNodeGraphFallback.tsx` retained on disk, no longer imported by Hero. Phase 3 will adopt it for Capability Map per FR-170-CAP.

## Build size

- JS: 290.56 KB / **93.62 KB gzip** (essentially flat vs Phase 1's 93.57 KB — typography-only Hero adds no new dependency)
- CSS: 29.08 KB / 6.37 KB gzip
- TypeScript errors: 0
- Build time: 2.22s

## How to verify

```bash
git checkout feat/phase-2-hero-cinematic
pnpm install
pnpm dev   # http://localhost:5173
```

Manual checks:

1. Hero loads; first visible content is the meta strip + role line + the name "Yao Xin." (letter-stagger from blur).
2. Sub-headline `Builder of AI systems.` reveals after the name.
3. Mouse moves → a faint diagonal line follows it with spring damping (visible on dark areas).
4. CTAs still scroll-anchor to `#projects` and `#methodology`.
5. Bottom strip shows pulse + scroll cue + email.
6. DevTools → Rendering → emulate `prefers-reduced-motion: reduce` → no letter stagger, no scan beam, copy fades in once.
7. Mobile (≤ 767px): name still dominant, ticker lines stack, no horizontal overflow.
8. Console clean.

## Out of scope (next PRs)

- Section-level polish (About / Methodology / Capability density) — coming in `feat/ui-tune` parallel branch.
- Repurposing `AgentNodeGraphFallback` for Capability Map — Phase 3.
- Lighthouse / a11y / Vitest / Playwright — Phase 4.

## Risks / Notes

- Pivot intentionally **deletes the R3F line item** from Phase 2 scope. If you change your mind on the Hero theme later, R2-rev preserves the original R2 record so we can revert without re-research.
- Bottom-strip email is the placeholder `replace-with-your-email@example.com`; will swap when owner provides real address.
- Letter-stagger uses 0.55s per char with 35ms stagger over a short string. Total ≤ 600ms confirmed (~440ms for the longest line).
