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

## Data source (Google Sheets CSV)

URLs are configured in `lib/loadPangaliData.ts`:

- **Pangali**: `GOOGLE_SHEET_CSV_URL` (gid `2111386729`)
- **Relatives**: `RELATIVES_SHEET_CSV_URL` (gid `2094582560`)
- **Expenses / Forecast**: `EXPENSES_SHEET_CSV_URL` (gid `1013571637`)

Your forecast CSV example:
`https://docs.google.com/spreadsheets/d/e/2PACX-1vRE6JDmis77fpA_rD9XUxR0Mz4JAh3nEfDzewh6DOU7mH2KmquFMX8vQxk0yRtrT8DQsWnUtsvNdJoq/pub?gid=1013571637&single=true&output=csv`

## Number formatting

All ₹ values are formatted in **Indian grouping** (e.g. `10,00,000`) via `lib/formatINR.ts`.
