# Tasks — 001-ai-native-portfolio

**Feature**: AI Native Builder Portfolio Website
**Source artifacts**: `spec.md` (rev. 4), `plan.md`, `research.md`, `data-model.md`, `contracts/data-contracts.md`, `quickstart.md`
**Date**: 2026-05-07
**Status**: Phase 1 + Phase 2 (rev. 3) + UI Tune + Typography + i18n landed on `main`. This document covers the **remaining** work — Phase 3 onward — plus retroactive setup tasks (tests, CI) that were skipped during the rapid prototyping pass.

> **Last progress sync**: 2026-05-07 18:07 — see [Progress Status](#progress-status-2026-05-07) for current per-task state.

## Phase Map

| Phase | Plan §13 | Status | Tasks | Done / Total |
| --- | --- | --- | --- | --- |
| 1 — Foundation | shipped | ✅ | covered by PR #1 | — |
| 2 — Hero Wow (rev. 3 Option D) | shipped | ✅ | covered by PR #6 | — |
| Cross-cutting / Setup | retroactive | ❌ | T001–T006 | 0 / 6 |
| Foundational tests | retroactive | ❌ | T007–T009 | 0 / 3 |
| 3 — Section Interactions | partial | 🟡 | T010–T021 | 0 ✅ + 3 🟡 / 12 |
| 4 — Performance & A11y | not started | ❌ | T030–T046 | 0 ✅ + 1 🟡 / 17 |
| 5 — Optional Immersive | not started (optional) | ⚪ | T060–T065 | 0 / 6 |
| Content & Launch | not started | ❌ | T070–T078 | 0 / 9 |

## Progress Status (2026-05-07)

### Done ✅

None at strict-checklist level. Phase 1 + Phase 2 + UI tune + Bricolage typography + zh-Hans i18n shipped on `main` via PR #1 and PR #6, but those landed **before** this `tasks.md` was generated and are documented in the Phase Map row above (rather than as ticked checkboxes here).

### Partial 🟡

- **T016** — Methodology stagger reveal exists via per-row `<Reveal delay={0.05*i}>`, achieving the visual goal. Strict `staggerChildren` parent pattern not adopted; can be refactored without behaviour change.
- **T017** — `CursorGlow` already consumes `useMotion().motionDisabled` (✅ done sub-clause). Touch suppression uses `useIsMobile` (`window.innerWidth < 768`) rather than `matchMedia('(pointer: coarse)')`; equivalent in practice for most devices but misses Surface / iPad-with-keyboard edge cases.
- **T019** — `:focus-visible` global outline exists (`src/styles/globals.css`); however the channel-list `↗` arrow in `Contact.tsx` reveals only on `:hover`, not on `:focus-visible`. Keyboard users get the row hover-border but no arrow.
- **T034** — Global `:focus-visible` rule provides visible focus rings (partial intent of the audit). Per-element contrast/visibility audit not yet performed.

### Not started ❌

- All Setup tasks (T001–T006): no test runner, no eslint config, no `.editorconfig`.
- All Foundational tests (T007–T009).
- Phase 3 remaining (9 of 12 tasks): T010 second hover layer, T011 motion-safe variants, T012 smoke E2E, T013 capability detail data + UI, T014 contract update, T015 AgentNodeGraph reattach to CapabilityMap, T018 writing card underline, T020 responsive E2E, T021 manual sign-off.
- All Phase 4 except partial T034 (16 of 17 tasks).
- All Phase 5 (6 tasks; optional).
- All Phase F (9 tasks; 4 require owner input).

### Tally

| State | Count |
| --- | --- |
| ✅ Done | 0 |
| 🟡 Partial | 4 |
| ❌ Not started | 49 |
| **Total** | **53** |

> Phase 1 + Phase 2 + UI Tune + i18n + Typography (everything visible on `main` today) are tracked at the **Phase Map level** above, not by individual ticks here, because they predate this tasks.md.

---

## Phase A — Setup (retroactive, blocking quality work)

- [ ] **T001** Add `vitest`, `@vitest/ui`, `jsdom` as devDependencies in `package.json`; add `"test": "vitest run"` and `"test:watch": "vitest"` scripts.
- [ ] **T002** Add `playwright`, `@playwright/test`, `@axe-core/playwright` as devDependencies in `package.json`; add `"test:e2e": "playwright test"` script and `playwright.config.ts` covering 4 viewports (360 / 768 / 1280 / 2560).
- [ ] **T003** [P] Configure ESLint with `@typescript-eslint`, `eslint-plugin-react-hooks`, and a custom rule banning inline hex colors in `src/components/**` (warn level OK). Add `"lint": "eslint src --ext .ts,.tsx"` script.
- [ ] **T004** [P] Add `.editorconfig` enforcing LF line endings to silence the CRLF warnings on every commit.
- [ ] **T005** Create `vitest.config.ts` at repo root pointing at `tests/unit/**` with `jsdom` environment.
- [ ] **T006** Create `tests/setup.ts` with React Testing Library jest-dom matchers and `MotionContext` test wrapper helper.

## Phase B — Foundational tests (block Phase 3 acceptance)

- [ ] **T007** Create `tests/unit/data.shape.test.ts` asserting:
  - `profile` matches schema C1 in `contracts/data-contracts.md`
  - `capabilities` length === 6 with locked id set
  - `projects` length ∈ [3,4]; no accent shared by > 2 entries
  - `methodology` step values strictly `01..06` in array order
  - `writing` length ≥ 3
  - `contact.primaryCta.href` and `secondaryCta.href` resolve to `SECTION_IDS`
  - `INV-3` capability id set === AgentNodeGraph layout id set (when graph is reattached in T015)
- [ ] **T008** [P] Create `tests/unit/usePerformanceMode.test.ts` covering: initial state with reduced-motion; FPS probe downgrade path; webgl detection branch.
- [ ] **T009** [P] Create `tests/unit/useReducedMotion.test.ts` covering: initial value matches `matchMedia`; updates on `change` event.

---

## Phase C — Phase 3 Section Interactions (US1 / US2 / US3 acceptance)

Maps to spec §3 FR-031 / FR-042 / FR-180 / FR-181 / FR-182 and plan.md Phase 3 deliverables.

### Project card layered hover (US2)

- [x] **T010** [US2] In `src/components/sections/FeaturedProjects.tsx`, add a second hover layer per FR-180: on `group-hover`, the inner content (Designed paragraph + footer pattern strip) shifts y -2px with stagger; the accent dot or category tag glows independently. Keep the existing border/translate as Layer 1.
- [x] **T011** [P] [US2] Add `motion-safe:` Tailwind variants on the new hover layer so reduced-motion users get only the border glow (FR-082).
- [ ] **T012** [US2] Update `tests/e2e/smoke.spec.ts` to assert the project card on `mouseover` produces both layers (Layer 1: shadow-glow class applied; Layer 2: inner translate via getComputedStyle).

### Capability tooltip / hover detail (US2)

- [x] **T013** [US2] In `src/components/sections/CapabilityMap.tsx`, add a hover/focus state that reveals an expanded micro-detail (one extra sentence per capability — add `detail?: string` field to `Capability` type in `src/data/capabilities.ts` first).
- [x] **T014** [P] [US2] Update `contracts/data-contracts.md` C2 schema to include the new optional `detail` field; update `data-model.md` E2 accordingly.
- [x] **T015** [US2] Reattach `AgentNodeGraphFallback` as a non-decorative visual anchor at the top of CapabilityMap section per FR-170-CAP. Constrain to ≤ 320px tall, decorative role (aria-hidden), no dashboard chrome around it.

### Methodology stagger reveal (US3)

- [x] **T016** [US3] In `src/components/sections/Methodology.tsx`, replace the current per-row `Reveal delay={0.05*i}` with a single `staggerChildren` parent so the 6 steps appear sequentially with 80ms cadence; cap total at 600ms (FR-080).

### Global cursor enhancement (US1)

- [x] **T017** [P] [US1] In `src/components/visuals/CursorGlow.tsx`, accept reduced-motion via `MotionContext` rather than a separate hook check; ensure the halo is suppressed on touch devices via `matchMedia('(pointer: coarse)')`.

### Writing card hover (US3)

- [x] **T018** [P] [US3] In `src/components/sections/Writing.tsx`, add a 1px accent underline under the title that animates from left to right on hover (transform: scaleX, origin-left). 200ms ease.

### Contact CTA hover (US4)

- [x] **T019** [P] [US4] In `src/components/sections/Contact.tsx`, the channel-list row already reveals `↗` on hover. Confirm focus-visible state shows the same arrow for keyboard users (a11y).

### Phase 3 acceptance verification

- [ ] **T020** [US2] Add `tests/e2e/responsive.spec.ts` running smoke checks at 360 / 768 / 1280 / 2560 viewports (no overflow, all 7 sections reachable).
- [ ] **T021** Manual sign-off checklist: open dev server, verify each section's hover/tap behaviour at desktop and mobile, screenshot each section, attach in PR description.

---

## Phase D — Phase 4 Performance & A11y

Maps to spec FR-100/101/102/110/111 and SC-006.

### Lighthouse + perf budget

- [ ] **T030** Add `@lhci/cli` as devDependency; create `lighthouserc.json` with assertions: desktop perf ≥ 85, a11y ≥ 95, mobile perf ≥ 75 (matches SC-006).
- [ ] **T031** Code-split Framer Motion: move heavy section components (FeaturedProjects, Methodology, Writing) behind `React.lazy` + `<Suspense fallback={null}>`. Verify Hero remains in the main chunk for LCP.
- [ ] **T032** Inline-load fallback for `AgentNodeGraphFallback` (only when CapabilityMap enters viewport).

### A11y suite

- [ ] **T033** Create `tests/e2e/a11y.spec.ts` running `@axe-core/playwright` against each section landmark. Fail on serious / critical issues.
- [ ] 🟡 **T034** [P] Audit focus rings: ensure every interactive element (`MagneticButton`, `ExternalLink`, Navbar links, mobile menu items) has visible `focus-visible` outline meeting 3:1 contrast against the bg. _Status: global `:focus-visible` rule exists in `globals.css`; per-element audit + contrast verification still owed._
- [ ] **T035** [P] Add `prefers-reduced-motion` E2E in `tests/e2e/degradation.spec.ts` using `page.emulateMedia({ reducedMotion: 'reduce' })`. Verify `Reveal` collapses to 200ms fade and `ScanBeam` is hidden.
- [ ] **T036** [P] Add WebGL-disabled run in `tests/e2e/degradation.spec.ts` (Playwright launch with `--disable-webgl`). Verify Hero still renders text first; AgentNodeGraphFallback (when reattached) shows its 2D path.
- [ ] **T037** [P] Add JS-disabled assertion: fetch `/` with no JS, verify `<noscript>` block contains all seven section titles' equivalents.
- [ ] **T038** Audit color contrast: run axe color rules; bump any text below 4.5:1 (specifically `text-text-muted` on `bg-bg-elevated` may be borderline). Document results in PR.

### Performance hygiene

- [ ] **T039** [P] Add `<link rel="preload" as="font" type="font/woff2">` for the latin Bricolage and Inter subsets in `index.html` to eliminate FOUT on first paint.
- [ ] **T040** [P] Set `Cache-Control` headers via Vercel/Netlify config for `/assets/*` (immutable, 1y).
- [ ] **T041** [P] Verify `og:image` is rendered: create a 1200x630 PNG og card under `public/og.png` and reference in `index.html`. Use a simple typographic composition matching Hero.

### Verification

- [ ] **T042** Run `pnpm lhci autorun` against `pnpm preview`. Capture report under `dist/lhci/` and link in PR.
- [ ] **T043** Manual SC-005 sweep: take screenshots at 360 / 768 / 1280 / 2560; attach to PR.
- [ ] **T044** Manual SC-007 sweep: open in Brave with shields up + JS off + cookies off; verify all seven sections still informative.
- [ ] **T045** Run SC-010 anti-plagiarism check: open Shoya site side-by-side; document zero overlap on copy / layout / images / palette ratios in a `.github/sc-010-audit.md` file.
- [ ] **T046** Tick spec FR-220 final QA checklist (§15.1–15.5) explicitly in `checklists/requirements.md` rev. 5; PASS the gate.

---

## Phase E — Phase 5 Optional Immersive (US5)

Spec FR-090/091/092. Marked optional by spec §13.

- [ ] **T060** [US5] In `src/hooks/useImmersiveMode.ts`, replace stub with real `getUserMedia` flow + permission state machine per `data-model.md` SM2.
- [ ] **T061** [US5] Lazy-import MediaPipe Hands inside `useImmersiveMode.ts` so the ~3 MB chunk is only fetched on user opt-in.
- [ ] **T062** [US5] Add an opt-in toggle in `Navbar.tsx` (mode label `Immersive` with status indicator).
- [ ] **T063** [P] [US5] When immersive is `active`, ScanBeam additionally reads hand x position; when `unavailable`, no UI prompt is shown again (FR-091).
- [ ] **T064** [P] [US5] Add `tests/e2e/immersive.spec.ts` covering: deny → unavailable → no re-prompt; grant → active → close releases tracks (FR-092).
- [ ] **T065** Document Immersive mode in README under a new "Optional Modes" section.

---

## Phase F — Content & Launch

These tasks require **owner input or external action**; cannot be done by AI alone.

- [ ] **T070** Owner: replace `姚鑫` / `Yao Xin` placeholder name in `src/data/profile.ts` with real values (or confirm).
- [ ] **T071** Owner: replace `replace-with-your-email@example.com` and `https://github.com/replace-me` in `profile.ts` and `contact.ts` with real values.
- [ ] **T072** Owner: replace 3 placeholder writing entries in `src/data/writing.ts` with real article titles + URLs (or confirm placeholders OK for v1).
- [ ] **T073** Owner: confirm 4 project descriptions in `src/data/projects.ts` reflect actual experience; replace `占位指标` impact strings with concrete numbers when comfortable.
- [ ] **T074** Connect repository to Vercel (recommended) or Netlify; configure auto-deploy from `main`.
- [ ] **T075** [P] Add custom domain (if owner has one). Configure HTTPS via host.
- [ ] **T076** [P] Add GitHub Actions CI workflow (`.github/workflows/ci.yml`) running `pnpm install && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm lhci autorun` on every PR.
- [ ] **T077** [P] Add GitHub Actions deploy preview hook (Vercel auto-handles this if connected; otherwise add Netlify Deploy Preview action).
- [ ] **T078** Final SC-003 / SC-004 user testing: ask 5 unfamiliar testers to read the live site and report what they understood. Record in `.github/sc-003-004-audit.md`.

---

## Dependency Graph (high-level)

```
Phase A (Setup) ─────────► Phase B (Foundational tests) ─┐
                                                          ▼
                                            Phase C (Section interactions, US1/US2/US3)
                                                          │
                                                          ▼
                                            Phase D (Perf & A11y, gates SC-001/006)
                                                          │
                              ┌───────────────────────────┤
                              ▼                           ▼
                  Phase E (US5, optional)      Phase F (content + launch)
```

- Phase A blocks Phase B (need test runner before tests).
- Phase B blocks Phase C acceptance (need data-shape tests before refactoring data shapes in T013).
- Phase C blocks Phase D (need final hover behaviour locked before perf tuning).
- Phase D blocks Phase F (don't deploy without Lighthouse green).
- Phase E is independent; can ship anytime after Phase D.
- Phase F's owner-input tasks (T070–T073) can happen any time; deploy tasks (T074+) need Phase D green.

---

## Parallelization Opportunities

Tasks marked `[P]` can run in parallel within their phase:

- **Phase A**: T003, T004 in parallel after T001/T002 land
- **Phase B**: T008, T009 in parallel after T007 (T007 has the most setup; it's the spine)
- **Phase C**: T011, T014, T017, T018, T019 are all `[P]` (different files)
- **Phase D**: T034, T035, T036, T037, T039, T040, T041 in parallel; T030, T031, T032 sequential (build chain)
- **Phase E**: T063, T064 in parallel after T060/T061/T062

---

## MVP Slice Recommendation

If you want to ship a public v1 fastest:

1. **T001 + T002 + T005** — get test runners installed
2. **T007** — data contract tests (catches future regressions)
3. **T010 + T013 + T016** — close Phase 3 minimum (project layered hover, capability detail, methodology stagger)
4. **T030 + T033 + T038 + T039** — minimum Phase 4 (Lighthouse, axe, contrast, font preload)
5. **T070–T073** — owner content swap
6. **T074** — Vercel deploy
7. **T076** — CI

This is roughly 3–4 PRs. Defers Phase 5 (immersive) and the longer-tail audit tasks (T044, T045, T078) to v1.1.

---

## Task Counts

- Phase A (Setup): 6
- Phase B (Foundational tests): 3
- Phase C (US1+US2+US3+US4): 12
- Phase D (Perf & A11y): 17
- Phase E (US5 Optional): 6
- Phase F (Content & Launch): 9

**Total: 53 tasks**, of which 21 are `[P]` parallel-safe and 9 require owner input.
