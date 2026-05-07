# AI Native Portfolio

A futuristic, immersive personal site for an **AI Product Manager / AI Native Builder**, themed as a *Digital Experimental Lab / AI Agent Control Room*.

> Status: **Spec-Driven Development (SDD) phase**. Implementation has not yet started; this repository currently holds the full feature specification and technical plan. Code scaffolding follows in Phase 1 of `specs/001-ai-native-portfolio/plan.md`.

---

## What's in this repo

```
specs/001-ai-native-portfolio/
├── spec.md                 # Feature specification (§1–§16)
├── plan.md                 # Implementation plan + tech stack decisions
├── research.md             # Phase 0 research (R1–R12)
├── data-model.md           # Data entities & state machines
├── contracts/
│   └── data-contracts.md   # Frozen data shape contracts
├── quickstart.md           # End-to-end validation flow
└── checklists/
    └── requirements.md     # Quality checklist (PASS WITH NOTE)

index.html  styles.css  script.js   # Legacy v0 site (will be archived to `legacy/` in Phase 1)
site-*.png                          # Snapshots of legacy v0
```

---

## Concept

- **Theme**: Digital Experimental Lab / AI Agent Control Room
- **Stack (planned)**: React 18 + Vite 5 + TypeScript 5.4 + Tailwind 3 + Framer Motion 11 + R3F (Hero) + Canvas2D fallback
- **Hero visual**: Agent Node System — 6 glowing nodes (one per capability) connected as a live agent network, mouse-reactive, with reduced-motion / WebGL-off / low-FPS fallbacks
- **Sections**: Hero · About · Capability Map · Featured Projects · Methodology · Writing · Contact

See `specs/001-ai-native-portfolio/spec.md` for the full normative spec.

---

## Roadmap (per `plan.md`)

- **Phase 1 — Foundation**: scaffold, design tokens, Navbar/Footer, 7 sections (static, data-driven)
- **Phase 2 — Hero Wow Effect**: `AgentNodeGraph` (R3F) + Canvas2D fallback + mouse interaction
- **Phase 3 — Section Interactions**: layered hover, stagger reveal, magnetic CTA
- **Phase 4 — Performance & A11y**: lazy 3D, reduced-motion, low-FPS degrade, Lighthouse gates
- **Phase 5 — Optional Immersive Mode**: opt-in webcam / hand tracking with graceful fallback

---

## Contributing

All changes — including by the repository owner — go through pull requests. See [`CONTRIBUTING.md`](./CONTRIBUTING.md).

---

## License

TBD.
