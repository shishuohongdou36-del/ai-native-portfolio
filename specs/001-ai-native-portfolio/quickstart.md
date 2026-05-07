# Quickstart — 001-ai-native-portfolio

How to validate the feature end-to-end against the spec, locally and in CI. Targets a freshly-cloned repo at `e:/个人网站/`.

---

## Prerequisites

- Node.js 20 LTS
- pnpm 9 (or npm 10 / yarn 4 — pnpm preferred)
- Modern Chromium (for Playwright + Lighthouse runs)

---

## Bootstrap

```powershell
# from repo root
pnpm install
pnpm dev          # Vite dev server, defaults to http://localhost:5173
```

The dev server should serve a black background, the Navbar, all 7 section landmarks (Hero, About, Capability Map, Featured Projects, Methodology, Writing, Contact), and an animated Agent Node Graph in Hero. If WebGL is disabled, the Canvas2D fallback renders the same nodes.

---

## Primary Validation Flow (Happy Path)

Maps each step to spec FR / SC IDs.

1. **Hero loads, copy first** (FR-010, FR-110, FR-174, SC-002)
   - Open `http://localhost:5173`.
   - Within 1.5s, name `Yao Xin`, title, and tagline are visible.
   - The Agent Node Graph completes mounting after the text appears (verify by throttling network to "Slow 4G").

2. **Mouse drives the graph** (FR-011, FR-081, SC of "≤ 100ms response")
   - Move cursor across the Hero. Nodes parallax slightly; nearest edge brightens.
   - Hover a node — capability label tooltip shows within 100ms.

3. **Anchor navigation works** (FR-002, FR-003, FR-165)
   - Click each Navbar item: `About`, `Capability Map`, `Projects`, `Methodology`, `Writing`, `Contact`.
   - URL hash updates; scroll lands on each section header.

4. **Capability Map reveal** (FR-030, FR-031, §12 Level 3)
   - Scroll into Capability Map. The 6 capability cards stagger-reveal within ≤ 600ms total.
   - Hover (or tap on touch) any card — description expands.

5. **Project cards layered hover** (FR-040–042, FR-180)
   - Scroll into Projects. Hover any card.
   - Verify: outer border glow + inner content shift both occur (two layers, not just scale).

6. **Methodology ordered reveal** (FR-050)
   - Scroll into Methodology. Steps 01 → 06 appear in numeric order, not all at once.

7. **Writing & Contact** (FR-060, FR-070, FR-071)
   - Writing shows ≥ 3 cards with title / tags / excerpt.
   - Contact shows email + GitHub + ≥ 1 additional channel.
   - Primary CTA `Explore My Work` is keyboard-focusable and has a visible focus ring.

8. **No console errors** (§15.3)
   - DevTools console clean across the full scroll.

---

## Degradation Validation

Re-run with each toggle. All MUST keep core content readable (SC-007, SC-008).

### D1 — Reduced Motion

```powershell
# Chromium DevTools → Rendering → Emulate CSS prefers-reduced-motion: reduce
```

Expected:

- Hero swaps to Canvas2D fallback; node drift halts.
- `Reveal` components appear without translate, only opacity ≤ 200ms.
- `MagneticButton` no longer pulls toward cursor.
- All 7 sections still readable. (FR-082, SC-008)

### D2 — WebGL Disabled

```powershell
# Run Chromium with: --disable-webgl --disable-webgl2
```

Expected:

- Hero renders Canvas2D fallback only; same node identities labeled.
- No console error; no blank Hero. (FR-012)

### D3 — JavaScript Disabled

```powershell
# DevTools → Settings → Disable JavaScript
```

Expected:

- `<noscript>` block in `index.html` shows a static text version of all 7 sections (name, title, tagline, capability list, project list, methodology, writing list, contact links).
- No interactive features required. (SC-007)

### D4 — Low FPS Simulation

```powershell
# DevTools → Performance → CPU throttle 6×
```

Expected:

- Within 1.5s of mount, `usePerformanceMode` downgrades from `full` → `reduced` (Canvas2D fallback active).
- If still under 30 fps, downgrades to `static` (SVG illustration). (FR-111)

### D5 — Immersive Mode (Phase 5 only)

If Phase 5 is shipped:

- Click "Enable Immersive". Browser prompts for camera.
- Grant: hand position drives Hero parallax additionally to mouse.
- Deny: state becomes `unavailable`; no second prompt; standard mouse interaction continues. (FR-090..092)
- Click again to disable: camera indicator turns off (`MediaStreamTrack.stop()` called).

---

## Responsive Validation (SC-005)

Run Playwright project with viewports: `360 × 640`, `768 × 1024`, `1280 × 800`, `2560 × 1440`. Each viewport:

- All 7 sections render without overflow.
- Navbar collapses to a sheet menu below 768px.
- Hero stacks vertically below 768px; copy stays above the visual subject (FR-172).
- No text truncated, no element overlaps.

```powershell
pnpm test:e2e -- --project=responsive
```

---

## Accessibility Validation (FR-100/101, SC-006)

```powershell
pnpm test:e2e -- --project=a11y
```

Asserts via `@axe-core/playwright`:

- Each section has zero "serious" or "critical" issues.
- All interactive elements reachable via Tab; visible focus ring.
- Color contrast ≥ 4.5:1 for body text and primary CTA.

Manual check: navigate the full page using only the keyboard (Tab / Shift-Tab / Enter / Space). Reach every nav link, every project card, every CTA.

---

## Performance Validation (SC-001, SC-006)

```powershell
pnpm build
pnpm preview         # serves dist/ on http://localhost:4173
pnpm lhci            # Lighthouse CI against the preview server
```

Gates:

- Desktop Performance ≥ 85
- Desktop Accessibility ≥ 95
- Mobile Performance ≥ 75
- LCP ≤ 2.5s on the simulated mid-tier desktop run

---

## Anti-Plagiarism Check (SC-010)

Manual, performed before each release:

- Open `https://shoya-kajita.com/` side-by-side with the local preview.
- Verify zero overlap on: copy, project names, navigation labels, brand marks, signature layout structures, color palette ratios.
- Document the comparison snapshot in the release PR.

---

## Acceptance: All Phases Done

The feature is "done" when:

- All steps in Primary Validation pass.
- D1–D4 degradation paths validated (D5 only if Phase 5 shipped).
- Responsive, a11y, and Lighthouse CI gates green.
- §15 Final QA Checklist (5 sub-lists) signed off in the release PR.
- SC-010 anti-plagiarism check recorded.
