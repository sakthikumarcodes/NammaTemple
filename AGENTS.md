## Cursor Cloud specific instructions

**Product**: Temple Donation App — a Next.js dashboard that tracks temple donation progress, relatives' contributions, and expected expenses. Data is fetched at runtime from publicly published Google Sheets (CSV). No database, no backend API, no authentication.

**Single service**: Next.js dev server on port 3000.

### Commands

See `package.json` scripts and `README.md` for standard commands:
- **Dev server**: `npm run dev` (port 3000)
- **Build**: `npm run build`
- **Lint**: `npx eslint` (pre-existing lint warnings/errors exist in the codebase)
- **No automated tests** are configured in this repository

### Non-obvious notes

- **Internet required**: All page data is fetched server-side from Google Sheets CSV URLs. Without internet, pages will error or show empty.
- **ISR caching**: Pages use Next.js ISR with 30s–5min revalidation intervals; data may be stale during dev. Hard-refresh or restart the dev server to force a re-fetch.
- **Recharts build warnings**: During `next build`, Recharts logs harmless "width(-1) and height(-1)" warnings for chart components rendered server-side — these can be ignored.
- **ESLint v9 flat config**: The project uses the new ESLint flat config format (`eslint.config.mjs`). Run lint with `npx eslint` (no `.eslintrc` file exists).
