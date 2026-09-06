# Testing guide

Run platform checks from `dashboard/`:

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test
npm.cmd run build
npm.cmd run test:browser
```

Vitest covers curriculum completeness and validation, prerequisites, official URL syntax, search and filtering, unlocking, start-date calculations, required-only progress, state transitions, notes, and import/export validation.

Playwright covers first launch, opening today's lesson, adding a note, review marking, completion, updated progress, export, invalid-import rejection, and keyboard focus. Install Chromium once with `npx.cmd playwright install chromium`.

Run legacy compatibility tests from the repository root with `python -m unittest -v`.
