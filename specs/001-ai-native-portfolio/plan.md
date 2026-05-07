# Implementation Plan: AI Native Builder Portfolio Website

**Branch**: `001-ai-native-portfolio` | **Date**: 2026-05-07 | **Spec**: `./spec.md`
**Input**: Feature specification from `specs/001-ai-native-portfolio/spec.md`

---

## Summary

Static, deeply interactive personal portfolio for an AI Product Manager / AI Native Builder, themed as a **Digital Experimental Lab / AI Agent Control Room**. Seven section single-page site (Hero, About, Capability Map, Featured Projects, Methodology, Writing, Contact) with a default Hero visual based on **Option A — Agent Node System** (graph of glowing nodes representing capability domains, mouse-reactive). Implementation honors the spec's normative §7–§16 addendum (color/typography/spacing tokens, file layout, placeholder copy, motion levels, phase ordering, anti-patterns).

**Approach**: React 18 + Vite + TypeScript + Tailwind CSS + Framer Motion as core stack; React Three Fiber for the Hero `AgentNodeGraph` visual with a Canvas2D fallback; data-file driven content; phased delivery per spec §13 (Phase 1 Foundation → Phase 5 optional immersive). No backend, no CMS — static deploy to Netlify / Vercel / GitHub Pages.

---

## Technical Context

**Language / Version**: TypeScript 5.4+, target ES2022.
**Runtime**: Browser only (evergreen Chromium / Firefox / Safari, last 2 versions). No SSR required by spec §6.
**Build Tool**: Vite 5 (fast dev, simple static output, native ESM, smaller dep tree than Next.js for a no-routing single page).
**UI Framework**: React 18 (functional components, hooks).
**Styling**: Tailwind CSS 3 with design tokens injected via `tailwind.config.ts` `theme.extend` mapped 1:1 to spec §7.1/§7.3/§7.5.
**Animation**: Framer Motion 11 for `Reveal`, scroll-driven entrances, `MagneticButton`, layered card hover. No GSAP (avoids overlap; Framer covers all spec §12 needs).
**3D / WebGL**: React Three Fiber (R3F) + drei + three.js for the Hero `AgentNodeGraph` (Option A). Lazy-loaded; not in main bundle. Canvas2D fallback at parity for the same node graph.
**Fonts**: Inter Variable (primary) + Space Grotesk (display, optional second face) — both self-hosted via `@fontsource-variable` to avoid CLS and external network dependency.
**State**: Local component state + a single `MotionContext` (provides `prefersReducedMotion`, `performanceMode: 'full' | 'reduced' | 'static'`, `immersiveEnabled`).
**Routing**: None. Single page with hash anchors per FR-002 / FR-003 / FR-165.
**Testing**: Vitest (unit, hook contracts) + Playwright (smoke + a11y + responsive + degradation). Unit coverage focused on hooks (`useReducedMotion`, `usePerformanceMode`) and data shape integrity.
**Target Platform**: Browsers, viewport 360–2560px (FR-102, SC-005).
**Project Type**: Single static frontend project.
**Performance Goals**:

- LCP ≤ 2.5s on 50 Mbps mid-tier hardware (SC-001).
- Hero text painted ≤ 1.5s, independent of WebGL (SC-002 / FR-110 / FR-174).
- Sustained ≥ 50 fps desktop; auto-degrade if < 30 fps for ≥ 1.5s (FR-111).
- Lighthouse desktop perf ≥ 85, a11y ≥ 95, mobile perf ≥ 75 (SC-006).

**Constraints**:

- No large gradient backgrounds, no neon over-glow, no random particle background (FR-132, §14.1).
- Initial JS payload (gzip) budget: ≤ 180KB excluding lazy 3D chunk; lazy 3D chunk ≤ 220KB gzip.
- No layout shift > 0.05 CLS (a11y/perf hygiene per §15.3).
- Respect `prefers-reduced-motion` globally (FR-082).
- All content from `data/*.ts`, never hardcoded in JSX (FR-161).

**Scale / Scope**: 1 page, 7 sections, ~20 components, 6 data files. Single author, English placeholder copy.

---

## Constitution Check

This workspace has no `memory/constitution.md`. Per `spec-kit-constitution` we would normally route there first, but the spec itself encodes its own normative principles in §1.3 (Anti-Goals), §7–§16 (design system, architecture, motion, anti-patterns). We treat the following spec-derived gates as the de facto constitution for this feature.

| Gate | Source | Status |
| --- | --- | --- |
| **G1 — Readability before density** | §16 priority list, FR-220 §15.5 | PASS — text rendered before 3D (FR-110/174); copy contrast ≥ 4.5:1 (FR-101/133) |
| **G2 — Modular architecture, no monolith** | §8.2 FR-160–FR-166 | PASS — file tree below mirrors §8.1; data is fully externalized |
| **G3 — Coherent identity over random effects** | §1.3 Anti-Goals, §14.1 | PASS — single design-token source, single Hero visual concept (Option A), no decorative 3D unrelated to theme |
| **G4 — Graceful degradation, never broken** | FR-012 / FR-082 / FR-091 / FR-111 / SC-007/008/009 | PASS — three explicit degradation tiers (full / reduced / static), all defined in `usePerformanceMode` |
| **G5 — Phase ordering enforced** | FR-200 §13 | PASS — tasks (next artifact) will follow Phase 1→5; immersive deferred to Phase 5, optional |
| **G6 — No reference-site copying** | FR-121, SC-010 | PASS — independent IA, original copy in `data/*`, Option A visual is generic agent-network metaphor; manual diff vs reference site documented in QA per §15.1 |
| **G7 — Accessibility floor** | FR-100/101/102, SC-006 | PASS — keyboard-reachable, visible focus rings, semantic landmarks, motion respect |

**Overall**: PASS. No Complexity Tracking entries needed.

Re-check after Phase 1 design outputs (`research.md`, `data-model.md`, `quickstart.md`): still PASS — no new violations introduced.

---

## Project Structure

### Documentation (this feature)

```text
specs/001-ai-native-portfolio/
├── spec.md
├── plan.md                  ← this file
├── research.md              ← Phase 0 output
├── data-model.md            ← Phase 1 output
├── quickstart.md            ← Phase 1 output
├── contracts/               ← Phase 1 output (data shape contracts only; no HTTP API in this feature)
│   └── data-contracts.md
├── checklists/
│   └── requirements.md
└── tasks.md                 ← Phase 2 output (NOT generated by this skill)
```

### Source Code (repository root)

```text
e:/个人网站/
├── index.html                       # Vite entry, contains <noscript> fallback per SC-007
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts                # design tokens from spec §7.1/§7.3/§7.5
├── postcss.config.js
├── public/
│   └── (static assets, og image, favicon)
├── src/
│   ├── main.tsx                      # React root + global providers
│   ├── App.tsx                       # Page shell: Navbar + 7 sections + Footer
│   ├── styles/
│   │   ├── globals.css               # Tailwind directives + base typography + reduced-motion overrides
│   │   └── tokens.css                # CSS custom props mirroring tailwind tokens (used by R3F shaders)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx            # FR-002 sticky nav, anchor links to sections
│   │   │   └── Footer.tsx            # secondary contact + legal
│   │   ├── sections/
│   │   │   ├── Hero.tsx              # FR-010..012, FR-170..175
│   │   │   ├── About.tsx             # FR-020
│   │   │   ├── CapabilityMap.tsx     # FR-030, FR-031
│   │   │   ├── FeaturedProjects.tsx  # FR-040..042, FR-180..182
│   │   │   ├── Methodology.tsx       # FR-050
│   │   │   ├── Writing.tsx           # FR-060
│   │   │   └── Contact.tsx           # FR-070, FR-071
│   │   ├── visuals/
│   │   │   ├── AgentNodeGraph.tsx        # R3F implementation (Option A)
│   │   │   ├── AgentNodeGraphFallback.tsx# Canvas2D / SVG fallback at parity
│   │   │   ├── InteractiveOrb.tsx        # Option B, lazy reserved
│   │   │   ├── ControlRoomGrid.tsx       # ambient bg accent (Option C decorations)
│   │   │   ├── CursorGlow.tsx            # global Level-2 mouse light (FR-081)
│   │   │   └── BackgroundField.tsx       # subtle ambient grid (Level 1)
│   │   └── ui/
│   │       ├── SectionHeader.tsx
│   │       ├── GlassCard.tsx          # FR-164
│   │       ├── MagneticButton.tsx     # FR-164, Level-2 feedback
│   │       ├── Tag.tsx
│   │       ├── Reveal.tsx             # FR-163, scroll-triggered Level-3 reveal
│   │       └── ExternalLink.tsx
│   ├── data/
│   │   ├── profile.ts                 # spec §10.1
│   │   ├── capabilities.ts            # spec §10.3
│   │   ├── projects.ts                # spec §11.2
│   │   ├── methodology.ts             # spec §10.4
│   │   ├── writing.ts                 # 3+ placeholder entries, FR-060
│   │   └── contact.ts                 # FR-070
│   ├── hooks/
│   │   ├── useReducedMotion.ts        # FR-082
│   │   ├── useMousePosition.ts        # FR-011, FR-081
│   │   ├── usePerformanceMode.ts      # FR-111: full / reduced / static
│   │   ├── useIsMobile.ts             # responsive breakpoint hook
│   │   └── useImmersiveMode.ts        # FR-090..092 (Phase 5, scaffolded only)
│   ├── lib/
│   │   ├── cn.ts                      # className merge helper
│   │   └── constants.ts               # section ids, breakpoints, motion timings
│   └── context/
│       └── MotionContext.tsx          # provides reducedMotion + performanceMode
└── tests/
    ├── unit/
    │   ├── usePerformanceMode.test.ts
    │   ├── useReducedMotion.test.ts
    │   └── data.shape.test.ts         # asserts data files match contracts
    └── e2e/
        ├── smoke.spec.ts              # navbar, all 7 sections render, anchors work
        ├── a11y.spec.ts               # axe-core checks each section
        ├── degradation.spec.ts        # WebGL off, JS off, reduced-motion on
        └── responsive.spec.ts         # 360 / 768 / 1280 / 2560 viewports
```

**Structure Decision**: Single static frontend project rooted at `e:/个人网站/`. Source under `src/`, tests under `tests/`. No backend, no monorepo, no separate `packages/`. Existing legacy files (`index.html`, `styles.css`, `script.js`) at the repo root will be **replaced** by the new Vite-driven `index.html` + `src/`; the legacy files should be archived to `legacy/` before scaffolding (handled in `tasks.md`).

---

## High-Level Design Decisions

### D1 — React + Vite over Next.js

The spec needs no SSR, no routing, no API routes. Vite ships a smaller toolchain, faster dev loop, simpler deploy, and avoids Next-specific abstractions that add no value here. Re-evaluable if `writing.ts` later evolves into MDX-powered articles (then migrate to Next App Router or Astro).

### D2 — Hero Visual: Cinematic Typography Wall (rev. 3, 2026-05-07)

**Original D2 (R3F + Canvas2D Agent Node System) is superseded.** Per spec §9.2 Option D / FR-170, Hero is now a typography-driven wall — zero 3D, zero canvas, zero dependency on WebGL.

Reasons for the pivot:

- Phase 1 implementation revealed the Agent Node + dashboard chrome read as "AI demo console" rather than "personal studio". The Control Room metaphor was too literal.
- Cinematic typography (à la Linear, Vercel, Read.cv) carries the same "premium / experimental studio" weight without WebGL cost or visual distraction from the copy.
- Removes R3F from the critical path entirely → zero LCP risk, no fallback decision tree for the Hero subject.

New approach:

- Hero subject = **massive responsive display type** (clamp 14–18vw for the name) using Space Grotesk Bold (already loaded) with extreme tracking (-0.04em).
- Letter-by-letter stagger reveal on first paint (≤ 600ms total per FR-080 / §12.1 Level 3).
- A single 1px mouse-tracking "scan beam" provides Level-2 feedback — implemented via Framer Motion `useMotionValue` + `useSpring`, no canvas.
- Background = solid `bg-primary` + a faint SVG noise overlay + the existing `BackgroundField` accent glows (already shipped Phase 1).
- The original `AgentNodeGraphFallback.tsx` component is **retained** but **unused by Hero**; it is reserved as a candidate visual anchor for Capability Map in Phase 3 (per spec FR-170-CAP).

Performance mode mapping:

- `full` — letter stagger + mouse scan beam + ambient backdrop drift active.
- `reduced` — letter stagger collapses to single fade, scan beam disabled, backdrop drift disabled.
- `static` — identical to `reduced` (no further degradation needed; there is no canvas to disable).

### D3 — Performance Mode State Machine

`usePerformanceMode()` exposes one of three values:

- `full` — all motion levels active, R3F enabled.
- `reduced` — Level 1 ambient disabled, Level 2 feedback simplified, Level 3 reveal kept (≤ 300ms), Canvas2D fallback used.
- `static` — all decorative motion off, single static SVG hero illustration, no requestAnimationFrame loops.

Transitions:

- Mount → detect `prefers-reduced-motion` → if reduce, start at `reduced`.
- Mount → run a 1.5s FPS probe via `requestAnimationFrame`; if avg < 30, downgrade one tier.
- User toggle in Navbar (small "minimal mode" switch) can force `static` (also helps a11y).

### D4 — Motion Layering Maps to Components

| Spec Level | Component owners |
| --- | --- |
| Level 1 Ambient | `BackgroundField`, `AgentNodeGraph` slow drift, `ControlRoomGrid` decorative panels |
| Level 2 Feedback | `MagneticButton`, `GlassCard` hover, `CursorGlow`, capability node hover |
| Level 3 Reveal | `Reveal` wrapper used by every section header + card group |

`Reveal` uses Framer Motion `useInView` with `once: true`, threshold 0.2, total duration ≤ 600ms (FR-080, §12.1 Level 3).

### D5 — Token Pipeline

`spec §7` tokens live in **one** source: `tailwind.config.ts → theme.extend`. CSS custom properties in `tokens.css` are auto-generated mirrors (manual sync at first; can be automated later with `tailwindcss-themer` if needed). R3F shaders consume the CSS vars via `getComputedStyle(document.documentElement)` to keep colors aligned.

### D6 — Immersive Mode (Phase 5) Deferral

`useImmersiveMode` is scaffolded as a no-op stub in Phase 1–4. It surfaces the toggle UI only when Phase 5 ships. This keeps FR-090/091/092 testable as "feature absent" until activation, satisfying FR-200's phase ordering.

---

## Phase-to-Artifact Mapping

| Spec Phase | Artifacts produced | Validation gate |
| --- | --- | --- |
| Phase 1 Foundation | scaffold, tokens, Navbar/Footer, 7 sections (static), data files | `tests/e2e/smoke.spec.ts` passes; all 7 anchors reachable |
| Phase 2 Hero Wow | `AgentNodeGraph` + fallback, `useMousePosition`, FPS probe | Hero text LCP ≤ 1.5s with WebGL disabled; visible mouse response < 100ms |
| Phase 3 Section Interactions | `MagneticButton`, layered project hover, methodology stagger reveal, `CursorGlow` | manual hover audit + Playwright pointer events |
| Phase 4 Performance & A11y | code-splitting, lazy R3F, axe-core sweep, focus rings, low-FPS degrade | `tests/e2e/a11y.spec.ts`, `degradation.spec.ts`, Lighthouse CI |
| Phase 5 Immersive (optional) | `useImmersiveMode`, opt-in webcam/hand-tracking | Permission-deny + unsupported-API E2E; one-click off releases tracks |

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| R3F bundle bloats LCP | Medium | High | Lazy-load behind `React.lazy`; render `AgentNodeGraphFallback` until idle; Hero text never depends on it |
| Node graph "feels like particles" (anti-pattern §14.1) | Medium | High | Node count capped at 6 (one per capability); slow drift (≤ 0.05 units/s); explicit labels; `OrbitControls` disabled — fixed framing |
| Inconsistent token usage across components | Low | Medium | ESLint rule disallowing inline hex colors in `src/components/**`; PR checklist references tokens |
| Reduced-motion users see broken animations | Low | High | `MotionContext` short-circuits all motion-bearing components; tested in `degradation.spec.ts` |
| Replacing legacy root files breaks accidental external links | Low | Low | Archive to `legacy/` and add 0-byte `.gitkeep`; new `index.html` keeps the same path |

---

## Open Decisions Deferred to `tasks.md`

- Exact node positions and edge weights in `AgentNodeGraph` (creative tuning).
- Final font face decision between Inter + Space Grotesk vs Inter only (perceptual A/B at Phase 2 sign-off).
- Whether `Writing` section links to external (Substack / personal blog) or stays placeholder until owner decides.

None of these block Phase 1 task generation.

---

## Complexity Tracking

_Empty — Constitution Check passes without violations._

---

## Next Step

Run `spec-kit-tasks` to generate `tasks.md` from this plan, ordered by Phase 1 → Phase 5 with explicit dependency edges and acceptance criteria mapped to spec FR-IDs.
