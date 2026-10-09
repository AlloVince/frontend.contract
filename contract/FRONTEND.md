# Frontend Contract v0.1.0

## Default architecture
React + TypeScript + Vite, static SPA first. SSR/SSG/server runtime requires a documented use case and approval. Frontend and API remain independently deployable. Use React Router; every independent screen must have a URL, work on direct visit and refresh, support browser history, and have a 404. Static hosting must rewrite SPA routes to index.html without intercepting API/assets.

## Components and UX
Use one maintained UI library and project theme tokens; do not introduce competing libraries, magic colors, repeated CSS hacks, or !important without documented exceptions. Give business regions meaningful React component names. Prefer semantic elements and accessible labels. Use data-testid only for stable regions not reliably addressable semantically. Provide loading, empty, error, and not-found states. Custom SVG/Canvas is allowed for domain visualizations, not to recreate common controls.

## Data and tests
Use standard request/cache libraries when justified; validate external data at boundaries. No production fake data hiding missing API integration. Completion requires typecheck, lint, build, browser checks for deep links, navigation, history and 404, plus visual review for changed screens. Report unavailable checks as gaps, not passes. Agent must never claim completion without evidence.

## Adoption
New projects use strict mode. Existing projects use incremental mode: preserve application code and record legacy exceptions in BASELINE.md. Upgrades are explicit, per-project and versioned.
