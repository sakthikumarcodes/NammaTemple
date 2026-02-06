'use client';

import { useState, useMemo } from 'react';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import type { Expense } from '@/lib/loadPangaliData';
import { formatINR } from '@/lib/formatINR';

type SortOption = 'name' | 'amount' | 'spent' | 'remaining';

export default function ExpensesClient({ data }: { data: Expense[] }) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('remaining');

  const totalForecast = data.reduce((s, e) => s + e.amount, 0);
  const totalSpent = data.reduce((s, e) => s + e.spent, 0);
  const totalRemaining = data.reduce((s, e) => s + e.remaining, 0);

  const filteredAndSorted = useMemo(() => {
    let filtered = data.filter(e =>
      e.item.toLowerCase().includes(search.toLowerCase())
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.item.localeCompare(b.item);
        case 'amount':
          return b.amount - a.amount;
        case 'spent':
          return b.spent - a.spent;
        case 'remaining':
          return b.remaining - a.remaining;
        default:
          return 0;
      }
    });

    return filtered;
  }, [data, search, sortBy]);

  return (
    <BackgroundWrapper images={['/assets/temple.jpg']}>
      <div className="min-h-screen p-3 sm:p-5">
        <h1 className="text-2xl sm:text-3xl font-serif mb-2">🧾 எதிர்பார்க்கப்படும் செலவுகள்</h1>
        <p className="text-xs sm:text-sm text-slate-600 mb-4 sm:mb-6">
          Forecast / Expected expenses (Excel sheet)
        </p>

        {/* Search and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <input
            type="text"
            placeholder="செலவு வகையை தேடவும்…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as SortOption)}
            className="w-full sm:w-48 px-4 py-2 rounded-lg border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <option value="remaining">மீதம் (அதிகம்)</option>
            <option value="amount">தொகை (அதிகம்)</option>
            <option value="spent">செலவு (அதிகம்)</option>
            <option value="name">பெயர் (A-Z)</option>
          </select>
        </div>

        <div className="bg-white/90 rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-slate-200">
            <div className="text-sm">
              <div className="text-slate-500 mb-1">Items</div>
              <div className="font-semibold text-slate-900 text-lg">{data.length}</div>
            </div>
            <div className="text-sm">
              <div className="text-slate-500 mb-1">மொத்த கணிப்பு</div>
              <div className="font-semibold text-indigo-700 text-lg">
                ₹{formatINR(totalForecast)}
              </div>
            </div>
            <div className="text-sm">
              <div className="text-slate-500 mb-1">இதுவரை செலவு</div>
              <div className="font-semibold text-green-700 text-lg">
                ₹{formatINR(totalSpent)}
              </div>
            </div>
            <div className="text-sm">
              <div className="text-slate-500 mb-1">மீதம்</div>
              <div className="font-semibold text-red-700 text-lg">
                ₹{formatINR(totalRemaining)}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[600px] sm:min-w-[680px] w-full text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-700">
                <tr className="border-t border-slate-200">
                  <th className="p-2 sm:p-3 text-left">செலவு வகை</th>
                  <th className="p-2 sm:p-3 text-right">தொகை (₹)</th>
                  <th className="p-2 sm:p-3 text-right hidden sm:table-cell">இதுவரை செலவு</th>
                  <th className="p-2 sm:p-3 text-right">மீதம்</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSorted.map((e, i) => {
                  const progress = e.amount > 0 ? (e.spent / e.amount) * 100 : 0;
                  return (
                    <tr key={i} className="border-t border-slate-200 text-slate-800 hover:bg-slate-50">
                      <td className="p-2 sm:p-3">
                        <div className="font-medium">{e.item}</div>
                        {e.amount > 0 && (
                          <div className="mt-1 sm:mt-2">
                            <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-500 mb-1">
                              <span>முன்னேற்றம்</span>
                              <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="h-1 sm:h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  progress >= 100
                                    ? 'bg-green-500'
                                    : progress >= 50
                                    ? 'bg-yellow-500'
                                    : 'bg-red-500'
                                }`}
                                style={{ width: `${Math.min(progress, 100)}%` }}
                              />
                            </div>
                          </div>
                        )}
                        {/* Mobile: Show spent inline */}
                        <div className="sm:hidden mt-1 text-xs text-green-700">
                          செலவு: ₹{formatINR(e.spent)}
                        </div>
                      </td>
                      <td className="p-2 sm:p-3 text-right font-semibold">
                        ₹{formatINR(e.amount)}
                      </td>
                      <td className="p-2 sm:p-3 text-right text-green-700 hidden sm:table-cell">
                        ₹{formatINR(e.spent)}
                      </td>
                      <td className="p-2 sm:p-3 text-right text-red-700 font-medium">
                        ₹{formatINR(e.remaining)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {filteredAndSorted.length === 0 && (
          <div className="mt-10 text-center">
            <p className="text-slate-500 text-sm">
              {search
                ? 'பொருந்தும் செலவு விவரங்கள் இல்லை'
                : 'செலவு விவரங்கள் இல்லை (Forecast sheet tab / gid சரிபார்க்கவும்)'}
            </p>
          </div>
        )}
      </div>
    </BackgroundWrapper>
  );
}


