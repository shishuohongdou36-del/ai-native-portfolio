## What

Editorial-grade UI polish across all 6 non-Hero sections. Drops the dashboard chrome and 3-column card grids in favour of magazine-style typography and single-column ordered lists.

## Why

Phase 1 shipped functioning sections, but live preview revealed a recurring failure mode: every section read like an "AI agent dashboard" (mono labels everywhere, identical glass-card grids, "node_01 / active" footers). That texture conflicts with the *Digital Experimental Lab / studio* tone the new Hero is going for. This PR re-renders those sections to feel like a magazine spread — same data, less ornament.

Builds on top of `feat/phase-2-hero-cinematic` (PR #2). Recommended merge order: #1 → #2 → #3.

## Section deltas

- **About**: 12-col asymmetric grid. Left = pull-quote heading (`Not a designer. Not a pure engineer. A builder of AI systems.`). Right = 3 paragraphs at 19px with generous leading. No more "signal" mono panel.
- **CapabilityMap**: editorial table-of-contents row layout — `numeral / name+dot / description` columns, divided by border. Replaces the 6-card grid. Hover lifts the divider colour.
- **FeaturedProjects**: 2-col case-study cards using paragraph prose with `Designed —` and `Outcome —` inline labels, plus a footer pattern strip. Drops the dense `dl` with five mono fields per card.
- **Methodology**: single-column manifesto list with display-scale numerals (`clamp(48px, 7vw, 84px)`). Replaces the 3-col grid. Reads like a sequenced manifesto.
- **Writing**: vertical journal list — `tag row / title+excerpt / read-cta` 3-column row layout per entry. Replaces the 3-card grid.
- **Contact**: removes the `signal_open · accepting_inbound` pill, the two gradient bubble glows, and all metric-strip styling. Closing statement on the left, plain channel list on the right with hover-revealed `↗`.

## Atom changes

- **Navbar logo**: replaces the sun-rays SVG icon with a pulsing cyan dot. Name uses mono instead of display.
- All section eyebrows standardized to `0X — Name` with hairline rule prefix.
- 12-col asymmetric grid is the new section header pattern across all 6 sections.

## Retained-but-unused

- `src/components/ui/GlassCard.tsx`
- `src/components/ui/SectionHeader.tsx`

Vite tree-shakes them out of the bundle. Kept on disk to avoid repeated re-creation if future sections want them.

## Build

- JS: 291.89 KB / **93.41 KB gzip** (~0.2 KB smaller than PR #2 thanks to fewer hover variant classes)
- CSS: 31.31 KB / 6.62 KB gzip
- TypeScript errors: 0
- Build time: 2.33s

## How to verify

```bash
git checkout feat/ui-tune
pnpm install
pnpm dev
```

Manual checks:

1. **About** is now a 2-column asymmetric layout with a large heading on the left.
2. **Capability Map** is a vertical list with 6 numbered rows separated by hairlines (no glass cards).
3. **Featured Projects** still has 2 columns but each card reads as prose, not a form.
4. **Methodology** is a single column with very large numerals (01..06) on the left.
5. **Writing** is a 3-row list, no card backgrounds.
6. **Contact** has no signal pill or bubble glows — just type + channel list.
7. Navbar shows a small pulsing dot instead of the sun-rays icon.
8. All section eyebrows read `0X — Name` with a leading hairline rule.
9. DevTools → Rendering → emulate `prefers-reduced-motion: reduce` → all sections still render cleanly with single fades.
10. Mobile (≤ 767px): each section stacks; no horizontal overflow; type sizes scale via `clamp`.
11. Console clean.

## Risks / Notes

- This PR is a pure visual / structural refactor — **no spec change**, no data change, no FR violations introduced. All FR-040..070 still satisfied; `data/*.ts` shapes untouched.
- `GlassCard` and `SectionHeader` are kept on disk despite being unused; if you'd rather delete them, say the word and I'll ship a follow-up cleanup.
- Default merge order: #1 → #2 → #3. GitHub will auto-rebase later PRs as earlier ones merge.
