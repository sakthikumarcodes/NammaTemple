import Papa from 'papaparse';

/** Trim BOM / whitespace so CSV headers from Sheets match reliably */
function sanitizeKeys(row: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(row)) {
    const nk = String(k).replace(/^\uFEFF/, '').trim();
    out[nk] = v;
  }
  return out;
}

function parseMoney(raw: unknown): number {
  const s = String(raw ?? '')
    .replace(/,/g, '')
    .replace(/₹/g, '')
    .replace(/\s/g, '')
    .trim();
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
}

function pickCell(row: Record<string, unknown>, keys: string[]): number {
  for (const key of keys) {
    const v = row[key];
    if (v !== undefined && v !== null && String(v).trim() !== '') {
      const n = parseMoney(v);
      if (!Number.isNaN(n)) return n;
    }
  }
  return 0;
}

function pickString(row: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const v = row[key];
    if (v !== undefined && v !== null && String(v).trim() !== '') {
      return String(v).trim();
    }
  }
  return '';
}

const COL_NAME = ['பெயர்', 'Name'];
const COL_PLACE = ['ஊர்', 'Place'];
const COL_COMMITTED = ['திருக்கொடை உறுதி', 'Committed', 'உறுதி தொகை'];
const COL_PAID = [
  'இது வரை கொடுத்தது',
  'இதுவரை கொடுத்தது',
  'கொடுத்தது',
  'Paid',
  'Received',
  'வழங்கியது',
];
const COL_BALANCE = ['மீதம் கொடுக்க வேண்டியது', 'மீதம்', 'Balance', 'Pending'];

export type Pangali = {
  name: string;
  place: string;
  committed: number;
  paid: number;
  balance: number;
};

export type Relative = {
  name: string;
  relation: string;
  forecast: number;
  given: number;
};

export type Expense = {
  item: string;
  amount: number; // Forecast/Expected total
  spent: number; // இதுவரை செலவு
  remaining: number; // மீதம்
};

// 🔁 Replace with your published Google Sheet CSV URL
const GOOGLE_SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRE6JDmis77fpA_rD9XUxR0Mz4JAh3nEfDzewh6DOU7mH2KmquFMX8vQxk0yRtrT8DQsWnUtsvNdJoq/pub?gid=2111386729&single=true&output=csv';

// Relatives tab (separate sheet tab / gid)
const RELATIVES_SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRE6JDmis77fpA_rD9XUxR0Mz4JAh3nEfDzewh6DOU7mH2KmquFMX8vQxk0yRtrT8DQsWnUtsvNdJoq/pub?gid=2094582560&single=true&output=csv';

// Expected Expenses / Forecast tab (set the correct gid for your sheet tab)
// NOTE: If this gid is wrong, expenses page will show empty (or error if fetch fails).
const EXPENSES_SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRE6JDmis77fpA_rD9XUxR0Mz4JAh3nEfDzewh6DOU7mH2KmquFMX8vQxk0yRtrT8DQsWnUtsvNdJoq/pub?gid=1013571637&single=true&output=csv';

export async function loadPangaliData(): Promise<Pangali[]> {
  const res = await fetch(GOOGLE_SHEET_CSV_URL, {
    next: { revalidate: 30 }, // cache for 5 minutes
  });

  if (!res.ok) {
    throw new Error('Failed to fetch Google Sheet data');
  }

  const csv = await res.text();

  const parsed = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  });

  const rows = (parsed.data as Record<string, unknown>[])
    .map(sanitizeKeys)
    .map(row => ({
      name: pickString(row, COL_NAME),
      place: pickString(row, COL_PLACE),
      committed: pickCell(row, COL_COMMITTED),
      paid: pickCell(row, COL_PAID),
      balance: pickCell(row, COL_BALANCE),
    }))
    .filter(p => p.name.length > 0);

  return rows;
}

export async function loadRelativesData(): Promise<Relative[]> {
  const res = await fetch(RELATIVES_SHEET_CSV_URL, {
    next: { revalidate: 300 }, // cache for 5 minutes
  });

  if (!res.ok) {
    throw new Error('Failed to fetch relatives sheet data');
  }

  const csv = await res.text();

  const parsed = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  });

  return (parsed.data as any[]).map(row => ({
    name: row['பெயர்']?.trim(),
    relation: row['உறவு']?.trim(),
    forecast: Number(String(row['கணிக்கப்பட்ட தொகை']).replace(/,/g, '')) || 0,
    given: Number(String(row['வழங்கியது']).replace(/,/g, '')) || 0,
  }));
}

export async function loadExpensesData(): Promise<Expense[]> {
  const res = await fetch(EXPENSES_SHEET_CSV_URL, {
    next: { revalidate: 300 }, // cache for 5 minutes
  });

  if (!res.ok) {
    throw new Error('Failed to fetch expenses sheet data');
  }

  const csv = await res.text();

  const parsed = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  });

  const data = parsed.data as any[];

  return data
    .map(row => {
      // Forecast sheet headers (from your CSV):
      // செலவு வகை, தொகை (₹), இதுவரை செலவு, மீதம்
      const item =
        row['செலவு வகை'] ??
        row['Item'] ??
        row['Details'] ??
        row['செலவு விபரம்'] ??
        row['விபரம்'] ??
        row['பொருள்'] ??
        '';

      // Parse amounts (all may have commas)
      const amountRaw =
        row['தொகை (₹)'] ??
        row['Amount'] ??
        row['Forecast'] ??
        row['Expected'] ??
        row['செலவு'] ??
        row['தொகை'] ??
        0;

      const spentRaw =
        row['இதுவரை செலவு'] ??
        row['Spent'] ??
        row['Paid'] ??
        0;

      const remainingRaw =
        row['மீதம்'] ??
        row['Remaining'] ??
        row['Balance'] ??
        0;

      const amount = Number(String(amountRaw).replace(/,/g, '').trim()) || 0;
      const spent = Number(String(spentRaw).replace(/,/g, '').trim()) || 0;
      const remaining = Number(String(remainingRaw).replace(/,/g, '').trim()) || 0;

      return {
        item: String(item).trim(),
        amount,
        spent,
        remaining: remaining || (amount - spent), // Calculate if not provided
      } satisfies Expense;
    })
    .filter(r => r.item.length > 0 || r.amount > 0);
}

