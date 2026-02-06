import Papa from 'papaparse';

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

  return (parsed.data as any[]).map(row => ({
    name: row['பெயர்']?.trim(),
    place: row['ஊர்']?.trim(),
    committed:
      Number(String(row['திருக்கொடை உறுதி']).replace(/,/g, '')) || 0,
    paid:
      Number(String(row['இது வரை கொடுத்தது']).replace(/,/g, '')) || 0,
    balance:
      Number(String(row['மீதம் கொடுக்க வேண்டியது']).replace(/,/g, '')) || 0,
  }));
  
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

