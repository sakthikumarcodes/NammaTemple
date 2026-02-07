import Papa from 'papaparse';

// Family Tree Data Structure
export type FamilyMember = {
  name: string;
  relation: 'father' | 'mother' | 'son' | 'daughter' | 'daughter-in-law' | 'son-in-law';
  spouse?: string; // For married children
};

export type FamilyGroup = {
  id: string;
  groupName: string; // e.g., "Group 1", "Family of X"
  father: string;
  mother: string;
  sons: Array<{
    name: string;
    spouse?: string;
  }>;
  daughters: Array<{
    name: string;
    spouse?: string;
  }>;
};

// Family Tree Google Sheet CSV URL
const FAMILY_SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRE6JDmis77fpA_rD9XUxR0Mz4JAh3nEfDzewh6DOU7mH2KmquFMX8vQxk0yRtrT8DQsWnUtsvNdJoq/pub?gid=2117528948&single=true&output=csv';

/**
 * Parse comma-separated or pipe-separated names with optional spouses
 * Format: "Name1:Spouse1, Name2:Spouse2" or "Name1|Name2"
 */
function parseNamesWithSpouses(value: string): Array<{ name: string; spouse?: string }> {
  if (!value || !value.trim()) return [];
  
  return value
    .split(/[,|]/)
    .map(item => {
      const parts = item.trim().split(':').map(p => p.trim());
      return {
        name: parts[0] || '',
        spouse: parts[1] || undefined,
      };
    })
    .filter(item => item.name.length > 0);
}

export async function loadFamilyData(): Promise<FamilyGroup[]> {
  try {
    const res = await fetch(FAMILY_SHEET_CSV_URL, {
      next: { revalidate: 300 }, // cache for 5 minutes
    });

    if (!res.ok) {
      console.warn('Failed to fetch family sheet data, using empty array');
      return [];
    }

    const csv = await res.text();

    const parsed = Papa.parse(csv, {
      header: true,
      skipEmptyLines: true,
    });

    const data = parsed.data as any[];

    return data
      .map((row, index) => {
        // Flexible column name matching (Tamil or English)
        const groupId =
          row['Group ID'] ??
          row['குழு ID'] ??
          row['ID'] ??
          row['குழு'] ??
          `group${index + 1}`;

        const groupName =
          row['Group Name'] ??
          row['குழு பெயர்'] ??
          row['பெயர்'] ??
          row['Name'] ??
          `Group ${index + 1}`;

        const father =
          row['Father'] ??
          row['தந்தை'] ??
          row['Father Name'] ??
          row['தந்தை பெயர்'] ??
          '';

        const mother =
          row['Mother'] ??
          row['தாய்'] ??
          row['Mother Name'] ??
          row['தாய் பெயர்'] ??
          '';

        const sonsRaw =
          row['Son'] ?? // Singular (your column name)
          row['Sons'] ??
          row['மகன்கள்'] ??
          row['Sons List'] ??
          row['மகன்கள் பட்டியல்'] ??
          '';

        const daughtersRaw =
          row['Daugher'] ?? // Misspelled (your column name)
          row['Daughter'] ??
          row['Daughters'] ??
          row['மகள்கள்'] ??
          row['Daughters List'] ??
          row['மகள்கள் பட்டியல்'] ??
          '';

        const sons = parseNamesWithSpouses(sonsRaw);
        const daughters = parseNamesWithSpouses(daughtersRaw);

        // Only include groups that have at least father or mother
        if (!father && !mother) {
          return null;
        }

        return {
          id: String(groupId).trim(),
          groupName: String(groupName).trim(),
          father: String(father).trim(),
          mother: String(mother).trim(),
          sons,
          daughters,
        } satisfies FamilyGroup;
      })
      .filter((g): g is FamilyGroup => g !== null);
  } catch (error) {
    console.error('Error loading family data:', error);
    return [];
  }
}

