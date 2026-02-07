# Temple Donation App

A small Next.js app to track temple donation progress, relatives contributions, and expected expenses (forecast) from Google Sheets (published as CSV).

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Pages

- **Home**: `/` — summary tiles (includes total expected expenses as the first tile)
- **Pangali**: `/pangali` — list/table of pangalis and donation status
- **Analytics**: `/analytics` — charts/aggregation view
- **Relatives**: `/relatives` — relatives contribution list
- **Expenses (Forecast)**: `/expenses` — forecast/expected expenses table + total
- **Family Tree**: `/family` — family/clan tree with collapsible groups

## Data source (Google Sheets CSV)

URLs are configured in `lib/loadPangaliData.ts` and `lib/loadFamilyData.ts`:

- **Pangali**: `GOOGLE_SHEET_CSV_URL` (gid `2111386729`)
- **Relatives**: `RELATIVES_SHEET_CSV_URL` (gid `2094582560`)
- **Expenses / Forecast**: `EXPENSES_SHEET_CSV_URL` (gid `1013571637`)
- **Family Tree**: `FAMILY_SHEET_CSV_URL` (gid - update in `lib/loadFamilyData.ts`)

### Family Tree Google Sheet Format

Create a new tab in your Google Sheet with the following columns (Tamil or English headers work):

| Group ID | Group Name / குழு பெயர் | Father / தந்தை | Mother / தாய் | Sons / மகன்கள் | Daughters / மகள்கள் |
|----------|------------------------|----------------|---------------|----------------|---------------------|
| group1 | Family of X | Father Name | Mother Name | Son1:Spouse1, Son2 | Daughter1:Spouse1, Daughter2 |
| group2 | Family of Y | Father Name 2 | Mother Name 2 | Son1, Son2:Spouse2 | Daughter1 |

**Format for Sons/Daughters:**
- Use comma (`,`) or pipe (`|`) to separate multiple children
- Use colon (`:`) to separate name from spouse (e.g., `Son1:Spouse1, Son2`)
- Example: `Son1:Wife1, Son2:Wife2, Son3` or `Daughter1:Husband1, Daughter2`

**Column name flexibility:**
- Supports both Tamil and English column names
- Examples: `Father` / `தந்தை`, `Sons` / `மகன்கள்`, etc.

Your forecast CSV example:
`https://docs.google.com/spreadsheets/d/e/2PACX-1vRE6JDmis77fpA_rD9XUxR0Mz4JAh3nEfDzewh6DOU7mH2KmquFMX8vQxk0yRtrT8DQsWnUtsvNdJoq/pub?gid=1013571637&single=true&output=csv`

## Number formatting

All ₹ values are formatted in **Indian grouping** (e.g. `10,00,000`) via `lib/formatINR.ts`.
