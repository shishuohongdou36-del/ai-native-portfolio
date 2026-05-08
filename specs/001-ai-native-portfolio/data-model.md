# Data Model — 001-ai-native-portfolio

This feature has no backend, no persistence, and no API. "Data" here means the **TypeScript module exports** in `src/data/*.ts` that drive every section per spec FR-161. Schemas below are the single source of truth; `tests/unit/data.shape.test.ts` enforces them.

Maps directly to spec §3.2 Key Entities.

---

## Conventions

- All modules export typed `const` values with `as const` where ordering matters.
- All free-text strings are user-replaceable placeholders; the file header is annotated with `// REPLACE ME` markers.
- No `null` / `undefined` for required fields; missing optional fields are absent rather than empty.
- IDs are stable strings (kebab-case) so anchors and node identity persist across modes (R3F ↔ Canvas2D parity per `plan.md` D2).

---

## E1. `Profile` — `data/profile.ts`

Single object, single export.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `name` | `string` | yes | spec §10.1 default `"Yao Xin"` |
| `title` | `string` | yes | spec §10.1 |
| `tagline` | `string` | yes | drives Hero `tagline` (FR-010) |
| `subline` | `string` | yes | longer Hero secondary copy |
| `location` | `string` | yes | About / Contact display |
| `email` | `string (RFC 5322)` | yes | rendered as `mailto:` |
| `github` | `string (URL)` | yes | FR-070 |
| `socials` | `Array<{ label: string; url: string; kind: 'github' \| 'x' \| 'linkedin' \| 'wechat' \| 'mastodon' \| 'email' \| 'other' }>` | yes (≥ 1 placeholder) | spec §3.2 ContactChannel reuses this |

**Validation**:

- `email` matches `/.+@.+\..+/`.
- `github` and any URL fields match `^https?://`.
- `name`, `title`, `tagline` non-empty.

---

## E2. `Capability` — `data/capabilities.ts`

Array of 6 entries (fixed by FR-030).

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `id` | `string` (kebab-case, unique) | yes | stable node identity for `AgentNodeGraph` |
| `name` | `string` | yes | display label |
| `description` | `string` | yes | one sentence (FR-031) |
| `detail` | `string` | no | optional expanded hover / focus micro-detail for Phase 3 interactions |
| `visualWeight` | `'core' \| 'supporting' \| 'domain'` | yes | spec §10.3; influences node size + group color |
| `accent` | `'cyan' \| 'violet' \| 'blue' \| 'green'` | yes | maps to `colors.accent*` token |

**Validation**:

- Exactly 6 entries.
- `id` values: `rag`, `multi-agent`, `workflow-design`, `evaluation-loop`, `ai-coding`, `insurance-ai` (locked so the Hero graph can hardcode initial layout coords by id).
- `description` ≤ 160 chars (Hero tooltip + Capability card both render it).

---

## E3. `Project` — `data/projects.ts`

Array of 3–4 entries (FR-040).

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `id` | `string` (kebab-case, unique) | yes | stable for anchors |
| `name` | `string` | yes | spec §11.1 |
| `category` | `string` | yes | category tag, spec §11.1 |
| `problem` | `string` | yes | one-line problem |
| `designed` | `string` | yes | "What I Designed" |
| `pattern` | `string` | yes | AI System Pattern |
| `role` | `string` | yes | author's role |
| `impact` | `string` | yes | placeholder for business impact |
| `accent` | `'cyan' \| 'violet' \| 'blue' \| 'green'` | yes | visual accent (FR-180 layered hover) |
| `link` | `string (URL)` | no | optional case study external link |

**Validation**:

- Length ∈ [3, 4].
- Each `accent` value should not all collide (visual distinctiveness): at most 2 entries share an accent.
- `pattern` ≤ 120 chars to fit a single tag row.

---

## E4. `MethodologyStep` — `data/methodology.ts`

Array of exactly 6 entries (FR-050, ordered).

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `step` | `string` | yes | `"01"`..`"06"` zero-padded |
| `title` | `string` | yes | spec §10.4 |
| `description` | `string` | yes | one paragraph |

**Validation**:

- `step` values strictly `01..06` in array order.
- `title` ∈ {`Problem Framing`, `Workflow Decomposition`, `Evaluation Loop`, `Bad Case Attribution`, `Strategy Refinement`, `Skill / Productization`} (these are the spec-locked titles; copy may evolve but the slot stays).

---

## E5. `WritingEntry` — `data/writing.ts`

Array of ≥ 3 entries (FR-060).

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `id` | `string` (kebab-case) | yes | |
| `title` | `string` | yes | |
| `tags` | `string[]` | yes | ≥ 1, ≤ 4 |
| `excerpt` | `string` | yes | 1–2 sentences |
| `url` | `string (URL)` | no | external link; absent → renders as "Coming soon" |
| `publishedAt` | `string (YYYY-MM-DD)` | no | optional date |

**Validation**:

- ≥ 3 entries.
- `tags` non-empty.

---

## E6. `ContactChannel` — `data/contact.ts`

Re-uses the `socials` array shape from E1 but adds primary CTA metadata.

| Export | Type | Notes |
| --- | --- | --- |
| `primaryCta` | `{ label: string; href: string }` | spec §9.4 default `Explore My Work` → `#projects` |
| `secondaryCta` | `{ label: string; href: string }` | spec §9.4 default `View Methodology` → `#methodology` |
| `channels` | `Array<{ label: string; value: string; href: string; kind: 'email' \| 'github' \| 'x' \| 'linkedin' \| 'wechat' \| 'rss' \| 'other' }>` | ≥ 3 entries (email + github + 1 placeholder, FR-070) |

**Validation**:

- `channels` length ≥ 3.
- `primaryCta.href` and `secondaryCta.href` resolve to existing section ids.

---

## Cross-Entity Invariants

- **CV1**: Every `Project.accent` value MUST be a key in the design-token color set (`cyan`, `violet`, `blue`, `green`).
- **CV2**: Every `primaryCta.href` / `secondaryCta.href` / `Navbar` anchor MUST resolve to an existing section id in `lib/constants.ts → SECTION_IDS`.
- **CV3**: `Capability.id` set MUST equal the node-id set referenced by `visuals/AgentNodeGraph.tsx` initial-layout config (graph cannot reference unknown ids).

---

## State Transitions

The page itself has no persistent state. Two transient state machines exist:

### SM1 — `performanceMode`

```
              prefers-reduced-motion?      fps probe < 30?
               yes ─────────┐               yes ─────────┐
                            ▼                            ▼
   [full] ────────────► [reduced] ───────────────────► [static]
                            ▲                            ▲
                       user toggle                  user toggle
```

- Initial: `full` unless reduced-motion OS setting is on (then `reduced`).
- Downgrades only; user toggle can force `static` directly; can be reset to `full` via toggle.
- Visual side effects: `full` uses R3F; `reduced` uses Canvas2D fallback; `static` uses an SVG illustration of the node graph.

### SM2 — `immersiveMode` (Phase 5)

```
[off] ──user click──► [requesting] ──granted──► [active]
                          │                       │
                          └──denied/error──► [unavailable]
                                                  │
                                          (no further prompts)

[active] ──user click off──► [off]   (releases MediaStreamTracks)
```

- Default `off`. Never auto-promotes.
- `unavailable` is sticky for the session (FR-091 "no repeat prompts").

---

## Contracts (see `contracts/data-contracts.md`)

The TypeScript types above are the contract; `contracts/data-contracts.md` restates them in a frozen schema-style block for non-TS readers and for `data.shape.test.ts` to reference.
