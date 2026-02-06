import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export type Pangali = {
  name: string;
  place: string;
  committed: number;
  paid: number;
  balance: number;
};

export function loadPangaliData(): Pangali[] {
  const filePath = path.join(process.cwd(), 'public/data/pangali.csv');
  const csv = fs.readFileSync(filePath, 'utf8');

  const parsed = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  });

  return (parsed.data as any[]).map(row => ({
    name: row['பெயர்']?.trim(),
    place: row['ஊர்']?.trim(),
    committed: Number(
      String(row['திருக்கொடை உறுதி']).replace(/,/g, '')
    ) || 0,
    paid: Number(
      String(row['இது வரை கொடுத்தது']).replace(/,/g, '')
    ) || 0,
    balance: Number(
      String(row['மீதம் கொடுக்க வேண்டியது']).replace(/,/g, '')
    ) || 0,
  }));
}
