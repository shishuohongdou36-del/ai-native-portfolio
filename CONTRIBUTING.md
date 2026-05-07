# Contributing

This repository follows a **PR-only workflow**. `main` is the source of truth and must always be releasable. All changes — by the owner included — land via pull request.

## Branch Naming

Use prefixed, kebab-case branch names:

| Prefix | When to use | Example |
| --- | --- | --- |
| `feat/` | New feature or section | `feat/hero-agent-node-graph` |
| `fix/` | Bug fix | `fix/reduced-motion-flash` |
| `docs/` | Spec / README / CONTRIBUTING edits | `docs/spec-update-capability-copy` |
| `refactor/` | Internal restructure, no behavior change | `refactor/extract-reveal-component` |
| `perf/` | Performance work | `perf/lazy-r3f-hero` |
| `chore/` | Tooling, deps, config | `chore/bump-vite-5.2` |

## Commit Messages

Conventional Commits style:

```
<type>(<optional scope>): <imperative summary>

[optional body explaining why]
[optional footer: refs #issue, BREAKING CHANGE: ...]
```

Examples:

- `feat(hero): add AgentNodeGraph R3F implementation`
- `docs(spec): integrate addendum §7–§16 into 001-ai-native-portfolio`
- `fix(motion): respect prefers-reduced-motion in CursorGlow`

## Pull Request Workflow

1. Create a branch from `main` using the prefix above.
2. Make focused commits (one concern per PR; split large changes).
3. Push and open a PR targeting `main`.
4. PR description must include:
   - **What** changed (one sentence).
   - **Why** (link to spec FR / SC IDs when applicable, e.g. `Implements FR-170, FR-174`).
   - **How to verify** (steps from `quickstart.md` if relevant).
   - Screenshots / GIFs for any visible UI change.
5. Wait for CI green (when CI lands in Phase 1).
6. Self-review using the checklist below before merging.
7. **Squash merge** into `main`. Delete the branch after merge.

## PR Self-Review Checklist

Before merging, confirm:

- [ ] Spec FR / SC references in the PR description match what's actually changed.
- [ ] No content hardcoded in JSX — everything passes through `src/data/*.ts` (FR-161).
- [ ] No inline hex colors in components — only design tokens (spec §7.1).
- [ ] Reduced-motion path tested when motion code touched (FR-082).
- [ ] Mobile + desktop both manually checked when UI touched (FR-102).
- [ ] No new console errors / warnings.
- [ ] No new dependencies without justification in the PR description.

## Spec Changes

Edits to `specs/001-ai-native-portfolio/spec.md` are first-class changes and follow the same PR rules. When the spec changes:

- Bump `requirements.md` validation date and add a revision note.
- If the change is breaking for downstream artifacts (`plan.md`, `data-model.md`, etc.), update those in the **same** PR.
- Tag the PR with the `spec` label.

## Release

There is no formal release process during the SDD phase. Once Phase 4 ships, releases are tagged `v0.x.y` on `main` after Lighthouse + a11y gates pass.
