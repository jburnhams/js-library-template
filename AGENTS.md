# Repository guidelines

## Project layout
- Application source lives under `src/`.
- Test-only code lives in `tests/`, organised into:
  - `tests/unit/` for fast, isolated tests that rely on mocks.
  - `tests/integration/` for slower end-to-end checks that touch external systems (files, build artifacts, etc.).
  - `tests/utils/` for shared helpers used exclusively by tests.
- Keep production code out of the test tree and vice versa.

## Testing commands
- `npm run test:unit` compiles sources plus unit tests and runs them with Node's test runner.
- `npm run test:integration` builds the browser bundles and runs the slower integration suite.
- `npm run coverage` generates coverage metrics from the unit suite only.

When adding new tests, place them in the appropriate folder above and update or create helpers inside `tests/utils/` if needed.
