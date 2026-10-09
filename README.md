# Frontend Contract

Versioned frontend engineering rules and a React SPA starter for AI-assisted development.

## Commands (Node 20+)
```sh
node bin/contract.mjs create ~/Developer/new.front
node bin/contract.mjs adopt ~/Developer/existing.front
node bin/contract.mjs check ~/Developer/new.front
```
Create requires an empty destination; adopt preserves existing application files. Both pin a snapshot of the contract in the consumer. Run pnpm install in new projects. Changes to a consumer require its own commit.

Initial release v0.1.0. The UI library is a project-level decision, not a mandate to migrate old projects.
