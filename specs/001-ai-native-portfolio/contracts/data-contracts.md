# Data Contracts — 001-ai-native-portfolio

The feature exposes no HTTP / RPC API. The only externally-visible "contracts" are the **TypeScript module shapes** that the rest of the codebase (and any future content tooling) depends on. They are frozen here.

Source of truth: `data-model.md`. This document restates the shapes as language-neutral schemas so they can be validated by `tests/unit/data.shape.test.ts` and consumed by future content pipelines.

---

## C1 — `profile` (object export from `src/data/profile.ts`)

```yaml
type: object
required: [name, title, tagline, subline, location, email, github, socials]
properties:
  name:     { type: string, minLength: 1 }
  title:    { type: string, minLength: 1 }
  tagline:  { type: string, minLength: 1 }
  subline:  { type: string, minLength: 1 }
  location: { type: string }
  email:    { type: string, format: email }
  github:   { type: string, format: uri, pattern: '^https?://' }
  socials:
    type: array
    minItems: 1
    items:
      type: object
      required: [label, url, kind]
      properties:
        label: { type: string }
        url:   { type: string, format: uri }
        kind:  { enum: [github, x, linkedin, wechat, mastodon, email, other] }
```

## C2 — `capabilities` (array export from `src/data/capabilities.ts`)

```yaml
type: array
minItems: 6
maxItems: 6
items:
  type: object
  required: [id, name, description, visualWeight, accent]
  properties:
    id:           { enum: [rag, multi-agent, workflow-design, evaluation-loop, ai-coding, insurance-ai] }
    name:         { type: string, minLength: 1 }
    description:  { type: string, minLength: 1, maxLength: 160 }
    detail:       { type: string, minLength: 1, maxLength: 180 }
    visualWeight: { enum: [core, supporting, domain] }
    accent:       { enum: [cyan, violet, blue, green] }
uniqueBy: id
```

## C3 — `projects` (array export from `src/data/projects.ts`)

```yaml
type: array
minItems: 3
maxItems: 4
items:
  type: object
  required: [id, name, category, problem, designed, pattern, role, impact, accent]
  properties:
    id:       { type: string, pattern: '^[a-z0-9-]+$' }
    name:     { type: string, minLength: 1 }
    category: { type: string, minLength: 1 }
    problem:  { type: string, minLength: 1 }
    designed: { type: string, minLength: 1 }
    pattern:  { type: string, minLength: 1, maxLength: 120 }
    role:     { type: string, minLength: 1 }
    impact:   { type: string, minLength: 1 }
    accent:   { enum: [cyan, violet, blue, green] }
    link:     { type: string, format: uri }
uniqueBy: id
constraints:
  - "no more than 2 items share the same accent"
```

## C4 — `methodology` (array export from `src/data/methodology.ts`)

```yaml
type: array
minItems: 6
maxItems: 6
items:
  type: object
  required: [step, title, description]
  properties:
    step:        { type: string, pattern: '^0[1-6]$' }
    title:       { enum:
      [Problem Framing, Workflow Decomposition, Evaluation Loop,
       Bad Case Attribution, Strategy Refinement, Skill / Productization] }
    description: { type: string, minLength: 1 }
ordered: true   # array order MUST equal step number 01..06
```

## C5 — `writing` (array export from `src/data/writing.ts`)

```yaml
type: array
minItems: 3
items:
  type: object
  required: [id, title, tags, excerpt]
  properties:
    id:          { type: string, pattern: '^[a-z0-9-]+$' }
    title:       { type: string, minLength: 1 }
    tags:        { type: array, minItems: 1, maxItems: 4, items: { type: string } }
    excerpt:     { type: string, minLength: 1 }
    url:         { type: string, format: uri }
    publishedAt: { type: string, pattern: '^\d{4}-\d{2}-\d{2}$' }
uniqueBy: id
```

## C6 — `contact` (composite export from `src/data/contact.ts`)

```yaml
type: object
required: [primaryCta, secondaryCta, channels]
properties:
  primaryCta:
    type: object
    required: [label, href]
    properties:
      label: { type: string, minLength: 1 }
      href:  { type: string, pattern: '^#' }
  secondaryCta:
    type: object
    required: [label, href]
    properties:
      label: { type: string, minLength: 1 }
      href:  { type: string, pattern: '^#' }
  channels:
    type: array
    minItems: 3
    items:
      type: object
      required: [label, value, href, kind]
      properties:
        label: { type: string }
        value: { type: string }
        href:  { type: string }
        kind:  { enum: [email, github, x, linkedin, wechat, rss, other] }
```

---

## Cross-Module Invariants (enforced by `data.shape.test.ts`)

- **INV-1**: `contact.primaryCta.href` and `contact.secondaryCta.href` MUST equal one of the section ids declared in `src/lib/constants.ts → SECTION_IDS`.
- **INV-2**: Every `Project.accent` and `Capability.accent` MUST be a key of the design-token accent set (`cyan`, `violet`, `blue`, `green`).
- **INV-3**: `capabilities[*].id` set MUST be exactly equal to the node-id set referenced by the initial layout in `src/components/visuals/AgentNodeGraph.tsx` (and its fallback). Test asserts both directions.
- **INV-4**: No `data/*.ts` module may import from `src/components/**` (one-way dependency: components depend on data, never the inverse).

---

## Versioning

This is the v1 contract. Any breaking change (renamed field, removed enum value, narrowed type) MUST bump a `DATA_CONTRACT_VERSION` constant in `src/lib/constants.ts` and update consumer components in the same PR. Additive fields (new optional properties) are non-breaking.
